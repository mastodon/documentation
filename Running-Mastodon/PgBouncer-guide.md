PgBouncer Guide
====

The following guide explains how to use [PgBouncer](https://pgbouncer.github.io/) as an efficient connection pooler on top of Postgres. For a bit of background, you might read ["Scaling Mastodon"](https://medium.com/@Gargron/scaling-mastodon-1becde463090) which briefly describes this approach.

Why you might need PgBouncer
----

If you start running out of available Postgres connections (the default is 100) then you may find PgBouncer to be a good solution. This document describes some common gotchas as well as good configuration defaults for Mastodon.

Note that you can check "PgHero" in the administration view to see how many Postgres connections are currently being used. Typically Mastodon uses as many connections as there are threads both in Puma, Sidekiq and the streaming API combined.

Installing PgBouncer
-----

On Debian and Ubuntu:

    sudo apt install pgbouncer

Restarting:

    sudo systemctl restart pgbouncer

(Note that this guide assumes you aren't using Docker.)

Configuring PgBouncer
-----

### Setting a password

First off, if your `mastodon` user in Postgres is set up wthout a password, you will need to set a password. There seems to be no way to use PgBouncer with an empty password.

Here's how you might reset the password:

    psql -p 5432 -U mastodon mastodon_production -w

Then:

    ALTER USER "mastodon" WITH PASSWORD 'password';

Then `\q` to quit.

### Configuring PgBouncer

PgBouncer has two config files: `pgbouncer.ini` and `userlist.txt` both in `/etc/pgbouncer/`. The first contains the configuration, whereas the second just contains a list of usernames and passwords.

#### Configuring userlist.txt

As long as you specify a user/password in pgbouncer.ini later, the values in userlist.txt do *not* have to correspond to real PostgreSQL roles. You can arbitrarily define users and passwords, but you can reuse the "real" credentials for simplicity's sake. Add the `mastodon` user to the `userlist.txt`:

    "mastodon" "md5d75bb2be2d7086c6148944261a00f605"

Here we're using the md5 scheme, where the md5 password is just the md5sum of `password + username` with the string `md5` prepended. For instance, to derive the hash for user `mastodon` with password `password`, you can do:

```bash
# ubuntu, debian, etc.
echo -n "passwordmastodon" | md5sum
# macOS, openBSD, etc.
md5 -s "passwordmastodon"
```

Then just add `md5` to the beginning of that.

You'll also want to create a `pgbouncer` admin user to log in to the PgBouncer admin database. So here's a sample `userlist.txt`:

```
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
"pgbouncer" "md5a45753afaca0db833a6f7c7b2864b9d9"
```

In both cases the password is just `password`.

#### Configuring pgbouncer.ini

Add a line under `[databases]` listing the Postgres databases you want to connect to. Here we'll just have PgBouncer use the same username/password and database name to connect to the underlying Postgres database:

```ini
[databases]

mastodon_production = host=127.0.0.1 port=5432 dbname=mastodon_production user=mastodon password=password
```

The `listen_addr` and `listen_port` tells PgBouncer which address/port to accept connections. The defaults are fine:

```ini
listen_addr = 127.0.0.1
listen_port = 6432
```

Put `md5` as the `auth_type` (assuming you're using the md5 format in `userlist.txt`):

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

Don't forget to reload or restart pgbouncer after making your changes:

    service pgbouncer reload

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

> **Gotcha:** You cannot use pgBouncer to perform db:migrate tasks. But this is easy to work around. If your postgres and pgbouncer are on the same host, it can be as simple as defining `DB_PORT=5432` together with `RAILS_ENV=production` when calling the task, for example: `RAILS_ENV=production DB_PORT=5432 bundle exec rails db:migrate` (you can specify `DB_HOST` too if it's different, etc)

### Administering PgBouncer

The easiest way to reboot is:

    sudo service pgbouncer restart

But if you've set up a PgBouncer admin user, you can also connect as the admin:

    psql -p 6432 -U pgbouncer pgbouncer

And then do:

    RELOAD;

Then use `\q` to quit.

### Resources

- ["Scaling Mastodon"](https://medium.com/@Gargron/scaling-mastodon-1becde463090)
- [PgBouncer documentation](https://pgbouncer.github.io/)
- [Connection Pooling in PostgreSQL using pgbouncer](https://www.slideshare.net/sameerkasi200x/5th-pugs-meetupjuly2014pgbouncer)
- [PgBouncer on the Postgres wiki](https://wiki.postgresql.org/wiki/PgBouncer)
