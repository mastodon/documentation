---
title: Backing up your server
description: Setting up regular backups (optional, but not really)
menu:
  docs:
    weight: 80
    parent: admin
---

For any real-world use, you should make sure to regularly backup your Mastodon server.

## Overview {#overview}

Things that need to be backed up in order of importance:

1. PostgreSQL database
2. Application secrets from the `.env.production` file or equivalent
3. User-uploaded files
4. Redis database

## Failure modes {#failure}

There are two failure types that people in general may guard for: The failure of the hardware, such as data corruption on the disk; and human and software error, such as wrongful deletion of particular piece of data. In this documentation, only the former type is considered.

A lost PostgreSQL database is complete game over. Mastodon stores all the most important data in the PostgreSQL database. If the database disappears, all the accounts, posts and followers on your server will disappear with it.

If you lose application secrets, some functions of Mastodon will stop working for your users, they will be logged out, two-factor authentication will become unavailable, Web Push API subscriptions will stop working.

If you lose user-uploaded files, you will lose avatars, headers, and media attachments, but Mastodon _will_ work moving forward.

Losing the Redis database is almost harmless: The only irrecoverable data will be the contents of the Sidekiq queues and scheduled retries of previously failed jobs. The home and list feeds are stored in Redis, but can be regenerated with tootctl.

The best backups are so-called off-site backups, i.e. ones that are not stored on the same machine as Mastodon itself. If the server you are hosted on goes on fire and the hard disk drive explodes, backups stored on that same hard drive won’t be of much use.

## Backing up application secrets {#env}

Application secrets are the easiest to backup, since they never change. You only need to store `.env.production` somewhere safe.

## Backing up PostgreSQL {#postgresql}

PostgreSQL is at risk of data corruption from power cuts, hard disk drive failure, and botched schema migrations. For that reason, occassionally making a backup with `pg_dump` or `pg_dumpall` is recommended.

For high-availability setups, it is possible to use hot streaming replication to have a second PostgreSQL server with always up-to-date data, ready to be switched over to if the other server goes down.

## Backing up user-uploaded files {#media}

If you are using an external object storage provider such as Amazon S3, Google Cloud or Wasabi, then you don’t need to worry about backing those up. The respective companies are responsible for handling hardware failures.

If you are using local file storage, then it’s up to you to make copies of the sizeable `public/system` directory, where uploaded files are stored by default.

## Backing up Redis {#redis}

Backing up Redis is easy. Redis regularly writes to `/var/lib/redis/dump.rdb` which is the only file you need to make a copy of.


## Let's Encrypt files {#letsencrypt}

Backing up Let's Encrypt key file, certificate files, and account credentials is just as easy; make a secure copy of the `/etc/letsencrypt`. Do this as soon as the certificate gets renewed by certbot.
