PgBouncer Guide
====

The following guide explains how to use [PgBouncer](https://pgbouncer.github.io/) as an efficient connection pooler on top of Postgres. For a bit of background, you might read ["Scaling Mastodon"](https://medium.com/@Gargron/scaling-mastodon-1becde463090) which briefly describes this approach.

Why you might need PgBouncer
----

If you start running out of available Postgres connections (the default is 100) then you may find PgBouncer to be a good solution. This document describes some common gotchas as well as good configuration defaults for Mastodon.

Note that you can check "PgHero" in the administration view to see how many Postgres connections are currently being used.

Installing PgBouncer
-----

On Ubuntu/Debian:

    sudo apt install pgbouncer

Then:

    nano /etc/default/pgbouncer
    START=1

Starting:

    sudo service pgbouncer start

(Note that this guide assumes you aren't using Docker.)

Configuring PgBouncer
-----

### Setting a password

First off, if your `mastodon` user in Postgres is set up wthout a password, you will need to set a password. There seems to be no way to use PgBouncer with an empty password.

Here's how you might reset the password:

    su - postgres
    psql
    ALTER USER mastodon WITH PASSWORD 'pineapple';
    \q
    exit


### Configuring PgBouncer

PgBouncer has two config files: `pgbouncer.ini` and `userlist.txt` both in `/etc/pgbouncer/`. The first contains the configuration, whereas the second just contains a list of usernames and passwords.

#### Configuring userlist.txt

Add the `mastodon` user to the `userlist.txt`:

    "mastodon" "pineapple"

You'll also want to create a `pgbouncer` admin user to log in to the PgBouncer admin database. So here's a sample `userlist.txt`:

```
"mastodon" "pineapple"
"pgbouncer" "p4ssw0rd"
```

#### Configuring pgbouncer.ini

Add a line under `[databases]` listing the Postgres databases you want to connect to. Here we'll just have PgBouncer use the same username/password and database name to connect to the underlying Postgres database:

```ini
[databases]

mastodon_production = host=127.0.0.1 port=5432 dbname=mastodon_production user=mastodon password=pineapple
```

The `listen_addr` and `listen_port` tells PgBouncer which address/port to accept connections. The defaults are fine:

```ini
listen_addr = 127.0.0.1
listen_port = 6432
```

Put `md5` as the `auth_type`:

```ini
auth_type = md5
```

Make sure the `pgbouncer` user is an admin:

```ini
admin_users = pgbouncer
```

**This next part is very important!** The default pooling mode is session-based, but for Mastodon we want transaction-based. In other words, a Postgres connection is created when a transaction is created and dropped when the transaction is done. So you'll want to change the `pool_mode` from `session` to `transaction`:

```ini
pool_mode = transaction
```

Next up, `max_client_conn` defines how many connections PgBouncer itself will accept, and `default_pool_size` puts a limit on how many Postgres connections will be opened under the hood. (In PgHero the number of connections reported will correspond to `default_pool_size` because it has no knowledge of PgBouncer.)

The defaults are fine to start, and you can always increase them later:

```ini
max_client_conn = 100
default_pool_size = 20
```

### Debugging that it all works

You should be able to connect to PgBouncer just like you would with Postgres:

    psql -p 6432 -U mastodon mastodon_production

And then use your password to log in.

You can also check the PgBouncer logs like so:

    tail -f /var/log/postgresql/pgbouncer.log

### Configuring Mastodon to talk to PgBouncer

In your `.env.production` file, first off make sure that this is set:

```bash
PREPARED_STATEMENTS=false
```

Since we're using transaction-based pooling, we can't use prepared statements.

Next up, configure Mastodon to use port 6432 (PgBouncer) instead of 5432 (Postgres) and you should be good to go:

```bash
DB_HOST=localhost
DB_USER=mastodon
DB_NAME=mastodon_production
DB_PASS=password
DB_PORT=6432
```

After you need to restart your Mastodon services for the system to assume the `.env.production` changes:

    systemctl restart mastodon-web.service mastodon-sidekiq.service mastodon-streaming.service

Your instance should be working and using PgBouncer.

### Administering PgBouncer

The easiest way to reboot is:

    sudo service pgbouncer restart

But if you've set up a PgBouncer admin user, you can also connect as the admin:

    psql -p 6432 -U pgbouncer pgbouncer
    
And then do:

    RELOAD;

If you want to see if PgBouncer is working, you can use:

    SHOW STATS;

The total_request should not be 0.

There are plenty other values you may wish to look at, like:
    
    SHOW SERVERS;
    SHOW CLIENTS;
    SHOW POOLS;
    SHOW LISTS;

### Resources

- ["Scaling Mastodon"](https://medium.com/@Gargron/scaling-mastodon-1becde463090)
- [PgBouncer documentation](https://pgbouncer.github.io/)
- [Connection Pooling in PostgreSQL using pgbouncer](https://www.slideshare.net/sameerkasi200x/5th-pugs-meetupjuly2014pgbouncer)
- [PgBouncer on the Postgres wiki](https://wiki.postgresql.org/wiki/PgBouncer)
