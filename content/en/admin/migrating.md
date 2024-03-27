---
title: Migrating to a new machine
description: Copying your Mastodon installation to a new server without losing anything.
menu:
  docs:
    weight: 90
    parent: admin
---

Sometimes, for various reasons, you may want to migrate your Mastodon instance from one server to another. Fortunately, this is not too difficult of a process, although it may result in some downtime.

{{< hint style="info" >}}
This guide was written with Ubuntu Server in mind; your mileage may vary for other setups.
{{< /hint >}}

## Basic steps {#basic-steps}

1. Set up a new Mastodon server using the [Production Guide]({{< relref "install" >}}) (however, don’t run `mastodon:setup` and only leave the PostgreSQL service running).
2. Stop Mastodon on the old server (e.g. `systemctl stop 'mastodon-*.service'`).
3. Dump and load the PostgreSQL database using the instructions below.
4. Copy the `system/` files using the instructions below. (Note: if you’re using S3, you can skip this step.)
5. Copy the `.env.production` file.
6. Save the Redis database, stop the Redis service, and copy the Redis database from `/var/lib/redis/` to the new server.
7. Run `RAILS_ENV=production bundle exec rails assets:precompile` to compile Mastodon
8. Start Mastodon and Redis on the new server.
9. Run `RAILS_ENV=production ./bin/tootctl feeds build` to rebuild the home timelines for each user.
10. Run `RAILS_ENV=production ./bin/tootctl search deploy` to rebuild your Elasticsearch indices (Note: if you are not using Elasticsearch, you can skip this step.)
11. Update your DNS settings to point to the new server.
12. Update or copy your Nginx configuration, and re-run LetsEncrypt as necessary.
13. Enjoy your new server!

## Detailed steps {#detailed-steps}

### Stop the Mastodon services  

```bash
systemctl stop 'mastodon-*.service'
```

### What data needs to be migrated {#what-data-needs-to-be-migrated}

At a high level, you’ll need to copy over the following:

* The `~/live/public/system` directory, which contains user-uploaded images and videos (if using S3, you don’t need this)
* The PostgreSQL database (using [pg_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html))
* The `~/live/.env.production` file, which contains server config and secrets
* The Redis database in the `/var/lib/redis/` directory, which contains unproccessed Sidekiq jobs.

Less crucially, you’ll probably also want to copy the following for convenience:

* The nginx config (under `/etc/nginx/sites-available/mastodon`)
* The SSL certificates for your domain (under `/etc/letsencrypt/live/` if using LetsEncrypt)
* The systemd config files (`/etc/systemd/system/mastodon-*.service`), which may contain your server tweaks and customizations
* The PgBouncer configuration under `/etc/pgbouncer` (if you’re using it)

### Dump and load PostgreSQL {#dump-and-load-postgresql}

Instead of running `mastodon:setup`, we’re going to create an empty PostgreSQL database using the `template0` database (which is useful when restoring a PostgreSQL dump, [as described in the pg_dump documentation](https://www.postgresql.org/docs/9.1/static/backup-dump.html#BACKUP-DUMP-RESTORE)).  

If you are using a password for your PostgreSQL user, you may want to configure the `mastodon` user on your new system to use the same password as your old system for convenience:

```bash
sudo -u postgres psql  
ALTER USER mastodon WITH PASSWORD 'YOUR_PASSWORD';  
\q
```

Run this as the `mastodon` user on your old system:

```bash
pg_dump -Fc mastodon_production -f backup.dump
```

Copy the `backup.dump` file over, using `rsync` or `scp`. Then on the new system, create an empty database as the `mastodon` user:

```bash
createdb -T template0 mastodon_production
```

Then import it (replace # in -j# with the number of CPUs in your system to improve restore performance):

```bash
pg_restore -Fc -j# -U mastodon -n public --no-owner --role=mastodon \
  -d mastodon_production backup.dump
```

(Note that if the username is not `mastodon` on the new server, you should change the `-U` AND `--role` values above. It’s okay if the username is different between the two servers.)

### Copy files {#copy-files}

This will probably take some time, and you’ll want to avoid re-copying unnecessarily, so using `rsync` is recommended. On your old machine, as the `mastodon` user, run:

```bash
rsync -avz ~/live/public/system/ mastodon@example.com:~/live/public/system/
```

You’ll want to re-run this if any of the files on the old server change.  

You should also copy over the `.env.production` file, which contains secrets.

Now copy your Redis database over (adjust the location of your Redis database as needed). On your old machine, as the `root` user, run:

```bash
redis-cli
SAVE
EXIT
systemctl stop redis-server.service
rsync -avz /var/lib/redis/ root@example.com:/var/lib/redis
```

Optionally, you may copy over the nginx, systemd, and PgBouncer config files, or rewrite them from scratch.

### During migration {#during-migration}

You can edit the `~/live/public/500.html` page on the old machine if you want to show a nice error message to let existing users know that a migration is in progress.

You’ll probably also want to set the DNS TTL to something small (30-60 minutes) about a day in advance, so that DNS can propagate quickly once you point it to the new IP address.

### After migrating {#after-migrating}

Run the following commands as your mastodon user:  

```bash
RAILS_ENV=production bundle exec rails assets:precompile  
```

Now run the following commands as your root user:

```bash
systemctl daemon-reload
systemctl start redis-server  
systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming  
systemctl restart nginx
```

Once your server is back online, you can rebuild the home feeds for users (this can take a long time depending on the number of users.)

```bash
RAILS_ENV=production ./bin/tootctl feeds build
```

If you use Elasticsearch, run the following command to rebuild the indices (this can take a long time depending on the number of statuses you have.)

```bash
RAILS_ENV=production ./bin/tootctl search deploy
```

You can check [whatsmydns.net](https://whatsmydns.net/) to see the progress of DNS propagation. To jumpstart the process, you can always edit your own `/etc/hosts` file to point to your new server so you can start playing around with it early.

