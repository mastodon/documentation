Migration guide
====

Sometimes, for various reasons, you may want to migrate your Mastodon instance from one server to another. Fortunately this is not too difficult of a process, although it may result in some downtime for your users.

**Note:** this guide was written with Ubuntu Server 16.04 in mind; your mileage may vary for other setups.

What needs to be migrated
---

At a high level, you'll need to copy over the following:

- The `~/live/public/system` directory, which contains user-uploaded images and videos
- The Postgres database (using [pg\_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html))
- The `~/live/.env.production` file, which contains server config and secrets

Less crucially, you'll proably also want to copy the following for convenience:

- The nginx config (under `/etc/nginx/sites-available/default`)
- The systemd config files (`/etc/systemd/system/mastodon-*.service`), which may contain your server tweaks and customizations
- The pgbouncer configuration under `/etc/pgbouncer` (if you're using it)

Preliminary steps
----

All of the following steps can be taken without any downtime for your existing server.

First, follow the [Production Guide](https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Production-guide.md) to set up a brand-new Mastodon server. However, don't set up a new Postgres database using `db:setup`; we're going to copy it over instead.

### Dump and load Postgres

Create an empty Postgres database using the `template0` database (which is useful when restoring a Postgres dump, [as described in the pg\_dump documentation](https://www.postgresql.org/docs/9.1/static/backup-dump.html#BACKUP-DUMP-RESTORE)). You'll want to run this as the `mastodon` user on your new system:

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

Note that you will need to re-run this process from scratch (i.e. with a new database) if the old database changes after the dump. So you may want to use a test database first to play around with.

### Copy `system/` files

This will probably take a while, and you'll want to avoid re-copying unnecessarily, so using `rsync` is recommended. On your old machine, as the `mastodon` user:

```bash
rsync -avz ~/live/public/system/ mastodon@example.com:~/live/public/system/
```

You'll want to re-run this if any of the files on the old server change.

You can also copy over any other important files, such as `.env.production` and the nginx, systemd, and pgbouncer config files.

Migration process
----

This will require some downtime, but will ensure that everything is cleanly copied over. What you'll want to do is:

1. Stop Mastodon on the old server (e.g. `systemctl stop 'mastodon-*.service'`). You can edit the `~/live/public/500.html` page if you want to show a nice error message to let existing users know that a migration is in progress.
2. Dump and load the Postgres database using the instructions above.
3. Sync the `system/` files using the instructions above.
4. Run `RAILS_ENV=production bundle exec rails mastodon:feeds:build` to rebuild the home timelines for each user. (Note this may take some time.)
4. Start Mastodon on the new server.
4. Update your DNS settings to point to the new server. (Note that you will probably want to change the TTL to something like 30-60 minutes about a day in advance to ensure that DNS propagation happens quickly.)
5. Enjoy your new server!

You can check [whatsmydns.net](http://whatsmydns.net/) to see the progress of DNS propagation. To jumpstart the process, you can always edit your own `/etc/hosts` file to point to your new server so you can start playing around with it early.
