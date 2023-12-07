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

* Web (Puma)
* Streaming API
* Background processing (Sidekiq)

### Web (Puma) {#web}

The web process serves short-lived HTTP requests for most of the application. The following environment variables control it:

* `WEB_CONCURRENCY` controls the number of worker processes
* `MAX_THREADS` controls the number of threads per process

Threads share the memory of their parent process. Different processes allocate their own memory, though they share some memory via copy-on-write. A larger number of threads maxes out your CPU first, a larger number of processes maxes out your RAM first.

These values affect how many HTTP requests can be served at the same time.

In terms of throughput, more processes are better than more threads.

### Streaming API {#streaming}

The streaming API handles long-lived HTTP and WebSockets connections, through which clients receive real-time updates. The following environment variables control it:

* `STREAMING_CLUSTER_NUM` controls the number of worker processes
* `STREAMING_API_BASE_URL` controls the base URL of the streaming API

One process can handle a reasonably high number of connections. The streaming API can be hosted on a different subdomain if you want to e.g. avoid the overhead of nginx proxying the connections.

### Background processing (Sidekiq) {#sidekiq}

Many tasks in Mastodon are delegated to background processing to ensure the HTTP requests are fast, and to prevent HTTP request aborts from affecting the execution of those tasks. Sidekiq is a single process, with a configurable number of threads.

#### Number of threads {#sidekiq-threads}

While the amount of threads in the web process affects the responsiveness of the Mastodon instance to the end-user, the amount of threads allocated to background processing affects how quickly posts can be delivered from the author to anyone else, how soon e-mails are sent out, etc.

The amount of threads is not controlled by an environment variable in this case, but a command line argument in the invocation of Sidekiq, e.g.:

```bash
bundle exec sidekiq -c 15
```

Would start the sidekiq process with 15 threads. Please mind that each threads needs to be able to connect to the database, which means that the database pool needs to be large enough to support all the threads. The database pool size is controlled with the `DB_POOL` environment variable and must be at least the same as the number of threads.

#### Queues {#sidekiq-queues}

Sidekiq uses different queues for tasks of varying importance, where importance is defined by how much it would impact the user experience of your server’s local users if the queue wasn’t working, in order of descending importance:

| Queue | Significance |
| :--- | :--- |
| `default` | All tasks that affect local users |
| `push` | Delivery of payloads to other servers |
| `mailers` | Delivery of e-mails |
| `pull` | Lower priority tasks such as handling imports, backups, resolving threads, deleting users, forwarding replies |
| `scheduler` | Doing cron jobs like refreshing trending hashtags and cleaning up logs |
| `ingress` | Incoming remote activities. Lower priority than the default queue so local users still see their posts when the server is under load |

The default queues and their priorities are stored in [config/sidekiq.yml](https://github.com/mastodon/mastodon/blob/main/config/sidekiq.yml), but can be overridden by the command-line invocation of Sidekiq, e.g.:

```bash
bundle exec sidekiq -q default
```

To run just the `default` queue.

The way Sidekiq works with queues, it first checks for tasks from the first queue, and if there are none, checks the next queue. This means, if the first queue is overfilled, the other queues will lag behind.

As a solution, it is possible to start different Sidekiq processes for the queues to ensure truly parallel execution, by e.g. creating multiple systemd services for Sidekiq with different arguments.

**Make sure you only have one `scheduler` queue running!!**


## Transaction pooling with pgBouncer {#pgbouncer}

### Why you might need PgBouncer {#pgbouncer-why}

If you start running out of available Postgres connections (the default is 100) then you may find PgBouncer to be a good solution. This document describes some common gotchas as well as good configuration defaults for Mastodon.

Note that you can check “PgHero” in the administration view to see how many Postgres connections are currently being used. Typically Mastodon uses as many connections as there are threads both in Puma, Sidekiq and the streaming API combined.

### Installing PgBouncer {#pgbouncer-install}

On Debian and Ubuntu:

```bash
sudo apt install pgbouncer
```

### Configuring PgBouncer {#pgbouncer-config}

#### Setting a password {#pgbouncer-password}

First off, if your `mastodon` user in Postgres is set up without a password, you will need to set a password.

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

As long as you specify a user/password in pgbouncer.ini later, the values in userlist.txt do _not_ have to correspond to real PostgreSQL roles. You can arbitrarily define users and passwords, but you can reuse the “real” credentials for simplicity’s sake. Add the `mastodon` user to the `userlist.txt`:

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
```

Here we’re using the md5 scheme, where the md5 password is just the md5sum of `password + username` with the string `md5` prepended. For instance, to derive the hash for user `mastodon` with password `password`, you can do:

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

In both cases the password is just `password`.

#### Configuring pgbouncer.ini {#pgbouncer-ini}

Edit `/etc/pgbouncer/pgbouncer.ini`

Add a line under `[databases]` listing the Postgres databases you want to connect to. Here we’ll just have PgBouncer use the same username/password and database name to connect to the underlying Postgres database:

```text
[databases]
mastodon_production = host=127.0.0.1 port=5432 dbname=mastodon_production user=mastodon password=password
```

The `listen_addr` and `listen_port` tells PgBouncer which address/port to accept connections. The defaults are fine:

```text
listen_addr = 127.0.0.1
listen_port = 6432
```

Put `md5` as the `auth_type` (assuming you’re using the md5 format in `userlist.txt`):

Make sure the `pgbouncer` user is an admin:

**This next part is very important!** The default pooling mode is session-based, but for Mastodon we want transaction-based. In other words, a Postgres connection is created when a transaction is created and dropped when the transaction is done. So you’ll want to change the `pool_mode` from `session` to `transaction`:

Next up, `max_client_conn` defines how many connections PgBouncer itself will accept, and `default_pool_size` puts a limit on how many Postgres connections will be opened under the hood. (In PgHero the number of connections reported will correspond to `default_pool_size` because it has no knowledge of PgBouncer.)

The defaults are fine to start, and you can always increase them later:

```text
max_client_conn = 100
default_pool_size = 20
```

Don’t forget to reload or restart pgbouncer after making your changes:

```bash
sudo systemctl reload pgbouncer
```

#### Debugging that it all works {#pgbouncer-debug}

You should be able to connect to PgBouncer just like you would with Postgres:

```bash
psql -p 6432 -U mastodon mastodon_production
```

And then use your password to log in.

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

Next up, configure Mastodon to use port 6432 (PgBouncer) instead of 5432 (Postgres) and you should be good to go:

```bash
DB_HOST=localhost
DB_USER=mastodon
DB_NAME=mastodon_production
DB_PASS=password
DB_PORT=6432
```

{{< hint style="warning" >}}
You cannot use pgBouncer to perform `db:migrate` tasks. But this is easy to work around. If your postgres and pgbouncer are on the same host, it can be as simple as defining `DB_PORT=5432` together with `RAILS_ENV=production` when calling the task, for example: `RAILS_ENV=production DB_PORT=5432 bundle exec rails db:migrate` (you can specify `DB_HOST` too if it’s different, etc)
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

Redis is used widely throughout the application, but some uses are more important than others. Home feeds, list feeds, and Sidekiq queues as well as the streaming API are backed by Redis and that’s important data you wouldn’t want to lose (even though the loss can be survived, unlike the loss of the PostgreSQL database - never lose that!). However, Redis is also used for volatile cache. If you are at a stage of scaling up where you are worried about whether your Redis can handle everything, you can use a different Redis database for the cache. In the environment, you can specify `CACHE_REDIS_URL` or individual parts like `CACHE_REDIS_HOST`, `CACHE_REDIS_PORT` etc. Unspecified parts fallback to the same values as without the cache prefix.

As far as configuring the Redis database goes, basically you can get rid of background saving to disk, since it doesn’t matter if the data gets lost on restart and you can save some disk I/O on that. You can also add a maximum memory limit and a key eviction policy, for that, see this guide: [Using Redis as an LRU cache](https://redis.io/topics/lru-cache)

## Seperate Redis for Sidekiq {#redis-sidekiq}

Redis is used in Sidekiq to keep track of its locks and queue. Although in general the performance gain is not that big, some instances may benefit from having a seperate Redis instance for Sidekiq.

In the environment file, you can specify `SIDEKIQ_REDIS_URL` or individual parts like `SIDEKIQ_REDIS_HOST`, `SIDEKIQ_REDIS_PORT` etc. Unspecified parts fallback to the same values as without the `SIDEKIQ_` prefix.

Creating a seperate Redis instance for Sidekiq is relatively simple:

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

Make a copy of the Redis configuration file for the new Sidekiq Redis instance

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

Update your environment, add the following line:

```bash
SIDEKIQ_REDIS_URL=redis://127.0.0.1:6479/
```

Restart Mastodon to use the new Redis instance, make sure to restart both web and Sidekiq (otherwise, one of them will still be working from the wrong instance):

```bash
systemctl restart mastodon-web.service
systemctl restart redis-sidekiq.service
```

## Read-replicas {#read-replicas}

To reduce the load on your Postgresql server, you may wish to setup hot streaming replication (read replica). [See this guide for an example](https://cloud.google.com/community/tutorials/setting-up-postgres-hot-standby). You can make use of the replica in Mastodon in these ways:

* The streaming API server does not issue writes at all, so you can connect it straight to the replica (it is not querying the database very often anyway, so the impact of this is small).
* Use the Makara driver in the web and Sidekiq processes, so that writes go to the master database, while reads go to the replica. Let’s talk about that.

You will have to edit the `config/database.yml` file and replace the `production` section as follows:

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

Make sure the URLs point to wherever your PostgreSQL servers are. You can add multiple replicas. You could have a locally installed pgBouncer with configuration to connect to two different servers based on database name, e.g. “mastodon” going to master, “mastodon_replica” going to the replica, so in the file above both URLs would point to the local pgBouncer with the same user, password, host and port, but different database name. There are many possibilities how this could be setup! For more information on Makara, [see their documentation](https://github.com/taskrabbit/makara#databaseyml).

{{< hint style="warning" >}}
Sidekiq cannot reliably use read-replicas because even the tiniest replication lag leads to failing jobs due to queued up records not being found.
{{< /hint >}}

