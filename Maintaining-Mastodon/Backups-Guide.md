# Mastodon Backups Guide

A production Mastodon instance has several pieces of data that needs to be
regularly backed up to protect against data loss.

Data that needs to be backed up regularly:
* PostgreSQL database
* User generated content (images, avatars, headers)

Data that needs to be backed up at least once:
* Mastodon application secrets (see
  [Production Guide](../Running-Mastodon/Production-Guide.md) for more details)

In the following sub-sections, some suggestions on how to backup all of this
data will be provided.

## PostgreSQL database

Mastodon uses a PostgreSQL database as it's relational database. This database
needs to be backed up regularly.

We will be providing two methods that can be used to backup your Mastodon
PostgreSQL database.

### wal-e

[wal-e](https://github.com/wal-e/wal-e) is a program that is, "designed to
perform continuous archiving of PostgreSQL WAL files and base backups."

wal-e allows you to store the backups on services such as [AWS S3](https://aws.amazon.com/s3/) or it's work-alikes.

The documentation provided by wal-e is excellent, so it is recommended to read
[it](https://github.com/wal-e/wal-e/blob/master/README.rst) for help with
configuring wal-e.

#### wal-e configuration example

One example of a wal-e backup schedule and retention is to do daily base backups
with retention of the last seven base backups into a AWS S3 bucket.

What this example looks like as a cron job:

```
@daily envdir /etc/wal-e.d/env /usr/local/bin/wal-e backup-push /var/lib/postgresql/9.5/
@weekly envdir /etc/wal-e.d/env /usr/local/bin/wal-e delete --confirm retain 7
```

### pg_dump

[pg_dump](https://www.postgresql.org/docs/9.5/static/app-pgdump.html) is an utility that comes with PostgreSQL that can be used extract the contents of a
PostgreSQL database.

Please read the documentation page linked above for all relevant usage details.

Here is an example:
```sh
# Dump Mastodon's PostgreSQL database into a SQL-script file
pg_dump mastodon_production > mastodon_production.sql
```

If you are looking for a pre-written set of scripts to maintain PostgreSQL backups using pg_dump, you can find them [here](https://wiki.postgresql.org/wiki/Automated_Backup_on_Linux).

## User generated content (images, avatars, headers)

Day to day usage of a production Mastodon instance will result in user
generated content such as images, user avatars and headers. This data needs
to be backed up regularly.

If the [Production Guide](../Running-Mastodon/Production-Guide.md) is used, this
content will be stored in `/home/mastodon/live/public/system`.

Various methods can be used to back up this directory, here are some:
* [rsync](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps) to an offsite backup server
* Synced to an AWS S3 bucket using the [AWS CLI tool](http://docs.aws.amazon.com/cli/latest/reference/s3/sync.html)

## Mastodon application secrets

It is also highly recommended to keep your application configuration file
.env.production backed up.

If you the [Production Guide](../Running-Mastodon/Production-Guide.md) is used
this file is stored in `/home/mastodon/live/.env.production`.

That file contains application secrets used for things like 2 factor authentication and VAPID keys used for Web Push notifications.
