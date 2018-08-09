Migration guide
====

Sometimes, for various reasons, you may want to migrate your Mastodon instance from one server to another. Fortunately this is not too difficult of a process, although it may result in some downtime.

**Note:** this guide was written with Ubuntu Server 16.04 in mind; your mileage may vary for other setups.

Basic steps
----

1. Set up a new Mastodon server using the [Production Guide](https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Production-guide.md) (however, don't run `db:setup`).
2. Stop Mastodon on the old server (e.g. `systemctl stop 'mastodon-*.service'`).
3. Dump and load the Postgres database using the instructions below.
4. Copy the `system/` files using the instructions below.
5. Run `RAILS_ENV=production bundle exec rails mastodon:feeds:build` to rebuild the home timelines for each user.
6. Start Mastodon on the new server.
7. Update your DNS settings to point to the new server.
8. Update or copy your Nginx configuration, re-run LetsEncrypt as necessary.
9. Enjoy your new server!

Detailed steps
----

### What data needs to be migrated

At a high level, you'll need to copy over the following:

- The `~/live/public/system` directory, which contains user-uploaded images and videos
- The Postgres database (using [pg\_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html))
- The `~/live/.env.production` file, which contains server config and secrets

Less crucially, you'll proably also want to copy the following for convenience:

- The nginx config (under `/etc/nginx/sites-available/default`)
- The systemd config files (`/etc/systemd/system/mastodon-*.service`), which may contain your server tweaks and customizations
- The pgbouncer configuration under `/etc/pgbouncer` (if you're using it)



### Dump and load Postgres

Instead of running `db:setup`, we're going to create an empty Postgres database using the `template0` database (which is useful when restoring a Postgres dump, [as described in the pg\_dump documentation](https://www.postgresql.org/docs/9.1/static/backup-dump.html#BACKUP-DUMP-RESTORE)).

Run this as the `mastodon` user on your new system:

```bash
createdb -T template0 mastodon_production
```

Next, create a Postgres dump on the old system (again, as the `mastodon` user):

```bash
pg_dump mastodon_production > dump.sql
```

Copy the `dump.sql` file over, using `scp` or `rsync`. Then on the new system, run:

```bash
psql mastodon_production < dump.sql
```

This will copy the Postgres database from the old system to the new one. You may see a warning about `no privileges could be revoked for "public"`, but [you can ignore it](https://confluence.atlassian.com/bamkb/errors-or-warnings-appear-when-importing-postgres-database-dump-829036698.html).

Note that you will need to re-run this process from scratch (i.e. on a fresh database) if the old database changes after the dump.

#### Dump and load as a different Postgres user

If the Postgres username on the old server is different from the Postgres username on the new server, then you will have to use a slightly different technique. Run this to dump:

```bash
pg_dump -Fc mastodon_production -f backup.dump
```

Create the database like normal:

```bash
createdb -T template0 mastodon_production
```

Then load the dump using a special mode where the new user overwrites the old user (`--no-owner --role=<new_username>`), and only public schemas are used (`-n public`):

```bash
pg_restore -U <new_username> -n public --no-owner --role=<new_username> -d mastodon_production backup.dump
```

(Replace `<new_username>` with the new Postgres username above.)

### Copy `system/` files

This will probably take some time, and you'll want to avoid re-copying unnecessarily, so using `rsync` is recommended. On your old machine, as the `mastodon` user, run:

```bash
rsync -avz ~/live/public/system/ mastodon@example.com:~/live/public/system/
```

You'll want to re-run this if any of the files on the old server change.

You can also copy over any other important files, such as `.env.production` and the nginx, systemd, and pgbouncer config files.

### During migration

You can edit the `~/live/public/500.html` page on the old machine if you want to show a nice error message to let existing users know that a migration is in progress.

You'll probably also want to set the DNS TTL to something small (30-60 minutes) about a day in advance, so that DNS can propagate quickly once you point it to the new IP address.

### After migrating

You can check [whatsmydns.net](http://whatsmydns.net/) to see the progress of DNS propagation. To jumpstart the process, you can always edit your own `/etc/hosts` file to point to your new server so you can start playing around with it early.
