---
title: Scaling up your server
descriptions: Optimizations that can be done to serve more users.
menu:
  docs:
    weight: 100
    parent: admin
---

## Managing concurrency {#concurrency}

Mastodon has three types of processes:

- Web (Puma)
- Streaming API
- Background processing (Sidekiq)

### Web (Puma) {#web}

The web process serves short-lived HTTP requests for most of the application. The following environment variables control it:

- `WEB_CONCURRENCY` controls the number of worker processes
- `MAX_THREADS` controls the number of threads per process

Threads share the memory of their parent process. Different processes allocate their own memory, though they share some memory via copy-on-write. A larger number of threads maxes out your CPU first, and a larger number of processes maxes out your RAM first.

These values affect how many HTTP requests can be served at the same time.

In terms of throughput, more processes are better than more threads.

### Streaming API {#streaming}

The streaming API handles long-lived HTTP and WebSocket connections, through which clients receive real-time updates. The following environment variables control it:

- `STREAMING_API_BASE_URL` controls the base URL of the streaming API
- `PORT` controls the port the streaming server will listen on, by default 4000. The `BIND` and `SOCKET` environment variables are also able to be used.
- Additionally, the shared [database](/admin/config#postgresql) and [Redis](/admin/config#redis) environment variables are used.

The streaming API can use a different subdomain if you want to by setting `STREAMING_API_BASE_URL`. This allows you to have one load balancer for streaming and one for web/API requests. However, this also requires applications to correctly request the streaming URL from the [instance endpoint](/methods/instance/#v2), instead of assuming that it's hosted on the same host as the Web API.

One process of the streaming server can handle a reasonably high number of connections and throughput, but if you find that a single process isn't handling your instance's load, you can run multiple processes by varying the `PORT` number of each, and then using nginx to load balance traffic to each of those instances. For example, a community of about 50,000 accounts with 10,000-20,000 monthly active accounts, you'll typically have an average concurrent load of about 800-1200 streaming connections.

The streaming server also exposes a [Prometheus](https://prometheus.io/) endpoint on `/metrics` with a lot of metrics to help you understand the current load on your Mastodon streaming server, some key metrics are:

- `mastodon_streaming_connected_clients`: This is the number of connected clients, tagged by client type (websocket or eventsource)
- `mastodon_streaming_connected_channels`: This is the number of "channels" that are currently subscribed (note that this is much higher than connected clients due to how our internal "system" channels currently work)
- `mastodon_streaming_messages_sent_total`: This is the total number of messages sent to clients since last restart.
- `mastodon_streaming_redis_messages_received_total`: This is the number of messages received from Redis pubsub, and intended to complement [monitoring Redis directly](https://sysdig.com/blog/redis-prometheus/).

{{< hint style="info" >}}
The more streaming server processes that you run, the more database connections will be consumed on PostgreSQL, so you'll likely want to use PgBouncer, as documented below.
{{< /hint >}}

An example nginx configuration to route traffic to three different processes on `PORT` 4000, 4001, and 4002 is as follows:

```text
upstream streaming {
    least_conn;
    server 127.0.0.1:4000 fail_timeout=0;
    server 127.0.0.1:4001 fail_timeout=0;
    server 127.0.0.1:4002 fail_timeout=0;
}
```

If you're using the distributed systemd files, then you can start up multiple streaming servers with the following commands:

```bash
$ sudo systemctl start mastodon-streaming@4000.service
$ sudo systemctl start mastodon-streaming@4001.service
$ sudo systemctl start mastodon-streaming@4002.service
```

By default, `sudo systemctl start mastodon-streaming` starts just one process on port 4000, equivalent to running `sudo systemctl start mastodon-streaming@4000.service`.

{{< hint style="warning" >}}
Previous versions of Mastodon had a `STREAMING_CLUSTER_NUM` environment variable that made the streaming server use clustering, which started multiple worker processes and used node.js to load balance them.

This interacted with the other settings in ways which made capacity planning difficult, especially when it comes to database connections and CPU resources. By default, the streaming server would consume resources on all available CPUs which could cause contention with other software running on that server. Another common issue was that misconfiguring the `STREAMING_CLUSTER_NUM` would exhaust your database connections by opening up a connection pool per cluster worker process, so a `STREAMING_CLUSTER_NUM` of `5` and `DB_POOL` of `10` would potentially consume 50 database connections.

Now a single streaming server process will only use at maximum `DB_POOL` PostgreSQL connections, and scaling is handled by running more instances of the streaming server.
{{< /hint >}}

### Background processing (Sidekiq) {#sidekiq}

Many tasks in Mastodon are delegated to background processing to ensure the HTTP requests are fast, and to prevent HTTP request aborts from affecting the execution of those tasks. Sidekiq is a single process, with a configurable number of threads.

#### Number of threads {#sidekiq-threads}

While the number of threads in the web process affects the responsiveness of the Mastodon instance to the end-user, the number of threads allocated to background processing affects how quickly posts can be delivered from the author to anyone else, how soon e-mails are sent out, etc.

The number of threads is not regulated by an environment variable, but rather through a command line argument when invoking Sidekiq, as shown in the following example:

```bash
bundle exec sidekiq -c 15
```

This would initiate the Sidekiq process with 15 threads. It is important to note that each thread requires a database connection, so this requires a large database pool. The size of this pool is managed by the `DB_POOL` environment variable, which should be set to a value at least equal to the number of threads.

#### Queues {#sidekiq-queues}

Sidekiq uses different queues for tasks of varying importance, where importance is defined by how much it would impact the user experience of your server’s local users if the queue wasn’t working. The queues are listed here, in order of descending importance:

`default`
: All tasks that affect local users.

`push`
: Delivery of payloads to other servers.

`ingress`
: Incoming remote activities. Lower priority than the default queue, so that local users still see their posts when the server is under load.

`mailers`
: Delivery of e-mails.

`pull`
: Lower priority tasks, such as handling imports, backups, resolving threads, deleting users, forwarding replies.

`scheduler`
: Handling cron jobs, such as refreshing trending hashtags and cleaning up logs.

The default queues and their priorities are stored in [config/sidekiq.yml](https://github.com/mastodon/mastodon/blob/main/config/sidekiq.yml), but can be overridden by the command-line invocation of Sidekiq, e.g.:

```bash
bundle exec sidekiq -q default
```

This command will run just the `default` queue.

Sidekiq processes queues by first checking for tasks in the first queue, and if it finds none, it then checks the subsequent queue. Therefore, if the first queue is overfilled, tasks in the other queues may experience delays.

It is possible to start different Sidekiq processes for the queues to ensure truly parallel execution, by e.g. creating multiple systemd services for Sidekiq with different arguments.

{{< hint style="warning" >}}
You may run as many Sidekiq processes with as many threads as necessary to efficiently process running jobs, however the `scheduler` queue should never be run in more than one Sidekiq process at a time.
{{< /hint >}}

## Transaction pooling with PgBouncer {#pgbouncer}

### Why you might need PgBouncer {#pgbouncer-why}

If you start running out of available PostgreSQL connections (the default is 100) then you may find PgBouncer to be a good solution. This document describes some common gotchas, as well as good configuration defaults for Mastodon.

User roles with `DevOps` permissions in Mastodon can monitor the current usage of PostgreSQL connections through the PgHero link in the Administration view. Generally, the number of connections open is equal to the total threads in Puma, Sidekiq, and the streaming API combined.

### Installing PgBouncer {#pgbouncer-install}

On Debian and Ubuntu:

```bash
sudo apt install pgbouncer
```

### Configuring PgBouncer {#pgbouncer-config}

#### Setting a password {#pgbouncer-password}

Firstly, if your `mastodon` user in PostgreSQL is set up without a password, you will need to set a password.

Here’s how you might reset the password:

```bash
psql -p 5432 -U mastodon mastodon_production -w
```

Then (obviously, use a different password than the word “password”):

```sql
ALTER USER mastodon WITH PASSWORD 'password';
```

Then `\q` to quit.

#### Configuring userlist.txt {#pgbouncer-userlist}

Edit `/etc/pgbouncer/userlist.txt`

As long as you specify a user/password in `pgbouncer.ini` later, the values in `userlist.txt` do _not_ have to correspond to real PostgreSQL roles. You can arbitrarily define users and passwords, but you can reuse the “real” credentials for simplicity’s sake. Add the `mastodon` user to the `userlist.txt`:

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
```

Here we’re using the md5 scheme, where the md5 password is just the md5sum of `password + username` with the string `md5` prepended. For instance, to derive the hash for user `mastodon` with password `password`:

```bash
# ubuntu, debian, etc.
echo -n "passwordmastodon" | md5sum
# macOS, openBSD, etc.
md5 -s "passwordmastodon"
```

Then just add `md5` to the beginning of that.

You’ll also want to create a `pgbouncer` admin user to log in to the PgBouncer admin database. So here’s a sample `userlist.txt`:

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
"pgbouncer" "md5a45753afaca0db833a6f7c7b2864b9d9"
```

In both cases, the password is just `password`.

#### Configuring pgbouncer.ini {#pgbouncer-ini}

Edit `/etc/pgbouncer/pgbouncer.ini`

Add a line under `[databases]` listing the PostgreSQL databases you want to connect to. Here we’ll just have PgBouncer use the same username/password and database name to connect to the underlying PostgreSQL database:

```ini
[databases]
mastodon_production = host=127.0.0.1 port=5432 dbname=mastodon_production user=mastodon password=password
```

The `listen_addr` and `listen_port` tell PgBouncer which address/port to accept connections. The defaults are fine:

```ini
listen_addr = 127.0.0.1
listen_port = 6432
```

Put `md5` as the `auth_type` (assuming you’re using the md5 format in `userlist.txt`):

```ini
auth_type = md5
```

Make sure the `pgbouncer` user is an admin:

```ini
admin_users = pgbouncer
```

Mastodon requires a different pooling mode than the default session-based one. Specifically, it needs a transaction-based pooling mode. This means that a PostgreSQL connection is established at the start of a transaction and terminated upon its completion. Therefore, it is essential to change the `pool_mode` setting from `session` to `transaction`:

```ini
pool_mode = transaction
```

Next up, `max_client_conn` defines how many connections PgBouncer itself will accept, and `default_pool_size` puts a limit on how many PostgreSQL connections will be opened under the hood. (In PgHero the number of connections reported will correspond to `default_pool_size` because it has no knowledge of PgBouncer.)

The defaults are fine to start, and you can always increase them later:

```ini
max_client_conn = 100
default_pool_size = 20
```

Don’t forget to reload or restart PgBouncer after making your changes:

```bash
sudo systemctl reload pgbouncer
```

#### Debugging that it all works {#pgbouncer-debug}

You should be able to connect to PgBouncer just like you would with PostgreSQL:

```bash
psql -p 6432 -U mastodon mastodon_production
```

Then use your password to log in.

You can also check the PgBouncer logs like so:

```bash
tail -f /var/log/postgresql/pgbouncer.log
```

#### Configuring Mastodon to talk to PgBouncer {#pgbouncer-mastodon}

In your `.env.production` file, first off make sure that this is set:

```bash
PREPARED_STATEMENTS=false
```

Since we’re using transaction-based pooling, we can’t use prepared statements.

Next up, configure Mastodon to use port 6432 (PgBouncer) instead of 5432 (PostgreSQL) and you should be good to go:

```bash
DB_HOST=localhost
DB_USER=mastodon
DB_NAME=mastodon_production
DB_PASS=password
DB_PORT=6432
```

{{< hint style="warning" >}}
You cannot use PgBouncer to perform `db:migrate` tasks, but this is easy to work around. If your PostgreSQL and PgBouncer are on the same host, it can be as simple as defining `DB_PORT=5432` together with `RAILS_ENV=production` when calling the task, for example: `RAILS_ENV=production DB_PORT=5432 bundle exec rails db:migrate` (you can specify `DB_HOST` too if it’s different, etc)
{{< /hint >}}

#### Administering PgBouncer {#pgbouncer-admin}

The easiest way to reboot is:

```bash
sudo systemctl restart pgbouncer
```

But if you’ve set up a PgBouncer admin user, you can also connect as the admin:

```bash
psql -p 6432 -U pgbouncer pgbouncer
```

And then do:

```sql
RELOAD;
```

Then use `\q` to quit.

## Separate Redis for cache {#redis}

Redis is used widely throughout the application, but some uses are more important than others. Home feeds, list feeds, and Sidekiq queues as well as the streaming API are backed by Redis and that’s important data you wouldn’t want to lose (even though the loss can be survived, unlike the loss of the PostgreSQL database - never lose that!).

Redis is also used for volatile caching. If you are scaling up and you are concerned about Redis's capacity to handle the load, you can allocate a separate Redis database specifically for caching. To do this, set `CACHE_REDIS_URL` in the environment, or define individual components such as `CACHE_REDIS_HOST`, `CACHE_REDIS_PORT`, etc.

Unspecified components will default to their values without the cache prefix.

When configuring the Redis database for caching, it is possible to disable background saving to disk, as data loss on restart is not critical in this context, and this can save some disk I/O. Additionally, consider setting a maximum memory limit and implementing a key eviction policy. For more details on these configurations, refer to this guide: [Using Redis as an LRU cache](https://redis.io/topics/lru-cache)

## Separate Redis for Sidekiq {#redis-sidekiq}

Redis is used in Sidekiq to keep track of its locks and queue. Although in general the performance gain is not that big, some instances may benefit from having a separate Redis instance for Sidekiq.

In the environment file, you can specify `SIDEKIQ_REDIS_URL` or individual parts like `SIDEKIQ_REDIS_HOST`, `SIDEKIQ_REDIS_PORT` etc. Unspecified parts fallback to the same values as without the `SIDEKIQ_` prefix.

Creating a separate Redis instance for Sidekiq is relatively simple:

Start by making a copy of the default redis systemd service:

```bash
cp /etc/systemd/system/redis.service /etc/systemd/system/redis-sidekiq.service
```

In the `redis-sidekiq.service` file, change the following values:

```bash
ExecStart=/usr/bin/redis-server /etc/redis/redis-sidekiq.conf --supervised systemd --daemonize no
PIDFile=/run/redis/redis-server-sidekiq.pid
ReadWritePaths=-/var/lib/redis-sidekiq
Alias=redis-sidekiq.service
```

Make a copy of the Redis configuration file for the new Sidekiq Redis instance:

```bash
cp /etc/redis/redis.conf /etc/redis/redis-sidekiq.conf
```

In this `redis-sidekiq.conf` file, change the following values:

```bash
port 6479
pidfile /var/run/redis/redis-server-sidekiq.pid
logfile /var/log/redis/redis-server-sidekiq.log
dir /var/lib/redis-sidekiq
```

Before starting the new Redis instance, create a data directory:

```bash
mkdir /var/lib/redis-sidekiq
chown redis /var/lib/redis-sidekiq
```

Start the new Redis instance:

```bash
systemctl enable --now redis-sidekiq
```

Update your environment, and add the following line:

```bash
SIDEKIQ_REDIS_URL=redis://127.0.0.1:6479/
```

Restart Mastodon to use the new Redis instance. Ensure that you restart both web and Sidekiq (otherwise, one of them will still be working from the wrong instance):

```bash
systemctl restart mastodon-web.service
systemctl restart redis-sidekiq.service
```

## Read-replicas {#read-replicas}

To reduce the load on your PostgreSQL server, you may wish to set up hot streaming replication (read replica). [See this guide for an example](https://cloud.google.com/community/tutorials/setting-up-postgres-hot-standby).

### Mastodon >= 4.2

Mastodon has built-in replica support starting with version 4.2. You can use the same configuration for every service (Sidekiq included), and some queries will be directed to your read-only replica, when possible, using Rails's built-in replica support. If your replica is lagging behind for more than a few seconds, then the app will stop sending it queries until it catches up.

To configure it, use the following environment variables:

```
REPLICA_DB_HOST
REPLICA_DB_PORT
REPLICA_DB_NAME
REPLICA_DB_USER
REPLICA_DB_PASS
```

Alternatively, you can also use `REPLICA_DATABASE_URL` if you want to configure them all using the same variable.

Once done, this is all good and you should start seeing requests against your replica server!

### Mastodon <= 4.1

For Mastodon versions before 4.2, you can make use of the replica in Mastodon in these ways:

- The streaming API server does not issue writes at all, so you can connect it straight to the replica (it is not querying the database very often anyway, so the impact of this is small).
- Use the Makara driver in the web and Sidekiq processes, so that writes go to the master database, while reads go to the replica. Let’s talk about that.

{{< hint style="warning" >}}
Read replicas are currently not supported for the Sidekiq processes, and using them will lead to failing jobs and data loss.
{{< /hint >}}

You will have to use a separate `config/database.yml` file for the web processes, and edit it to replace the `production` section as follows:

```yaml
production:
  <<: *default
  adapter: postgresql_makara
  prepared_statements: false
  makara:
    id: postgres
    sticky: true
    connections:
      - role: master
        blacklist_duration: 0
        url: postgresql://db_user:db_password@db_host:db_port/db_name
      - role: slave
        url: postgresql://db_user:db_password@db_host:db_port/db_name
```

Make sure that the URLs point to the correct locations for your PostgreSQL servers. You can add multiple replicas. You could have a locally-installed PgBouncer with a configuration to connect to two different servers based on the database name, e.g. “mastodon” going to the primary, “mastodon_replica” going to the replica, so in the file above both URLs would point to the local PgBouncer with the same user, password, host and port, but different database name. There are many possibilities for how this could be set up. For more information on Makara, [see their documentation](https://github.com/taskrabbit/makara#databaseyml).

{{< hint style="warning" >}}
Make sure the sidekiq processes run with the stock `config/database.yml` to avoid failing jobs and data loss!
{{< /hint >}}

## Using a web load balancer

Cloud providers like DigitalOcean, AWS, Hetzner, etc., offer virtual load balancing solutions that distribute network traffic across multiple servers, but provide a single public IP address.

Scaling your deployment to provision multiple web/Puma servers behind one of these virtual load balancers can help provide more consistent performance by reducing the risk that a single server may become overwhelmed by user traffic, and decrease downtime when performing maintenance or upgrades. You should consult your provider documentation on how to setup and configure a load balancer, but consider that you need to configure your load balancer to monitor the health of the backend web/Puma nodes, otherwise you may send traffic to a service that is not responsive.

The following endpoints are available to monitor for this purpose:

- **Web/Puma:** `/health`
- **Streaming API:** `/api/v1/streaming/health`

These endpoints should both return an HTTP status code of 200, and the text `OK` as a result.

{{< hint style="info" >}}
You can also use these endpoints for health checks with a third-party monitoring/alerting utility.
{{< /hint >}}
