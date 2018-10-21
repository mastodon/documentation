---
title: Post-installation steps
description: What to do after the installation of Mastodon is complete
menu:
  docs:
    parent: administration
    weight: 3
---

## Using the command-line interface

The command-line interface of Mastodon is an executable file called `tootctl` residing in the `bin` directory within the Mastodon root directory. You must specify which environment you intend to use whenever you execute it by specifying the `RAILS_ENV` environment variable. Unless you are a developer working on a local machine, you need to use `RAILS_ENV=production`. If you are sure that you will never need another environment (for development, testing, or staging), you can add it to your `.bashrc` file for convenience, e.g.:

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

If so, you won't need to specify it each time inline. Otherwise, calls to `tootctl` will usually go like this, assuming that the Mastodon code is checked out in `/home/mastodon/live`:

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

## Creating an admin account
### In the browser

After signing up in the browser, you will need to use the command line to give your newly created account admin privileges. Assuming your username is `alice`:

```bash
RAILS_ENV=production bin/tootctl accounts modify alice --role admin
```

### From the command line

You can create a new account using the command-line interface.

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role admin
```

A randomly generated password will be shown in the terminal.

## Filling in server information

After logging in, navigate to the **Site settings** page. While there are no technical requirements for filling in this information, it is considered crucial for operating a server for humans.

|Setting|Meaning|
|-------|-------|
|Contact username|Your username so people know who owns the server|
|Business e-mail|An e-mail address so people locked out of their accounts, or people without accounts, can contact you|
|Instance description|Why did you start this server? Who is it for? What makes it different?|
|Custom extended information|You can put all sorts of information in here but a **code of conduct** is recommended|

After you fill these in, simply hit "Save changes".

## Setting up regular backups (optional, but not really)

For any real-world use, you should make sure to regularly backup your Mastodon server.

### Overview

Things that need to be backed up in order of importance:

1. PostgreSQL database
2. Application secrets from the `.env.production` file or equivalent
3. User-uploaded files
4. Redis database

### Failure modes

There are two failure types that people in general may guard for: The failure of the hardware, such as data corruption on the disk; and human and software error, such as wrongful deletion of particular piece of data. In this documentation, only the former type is considered.

A lost PostgreSQL database is complete game over. Mastodon stores all the most important data in the PostgreSQL database. If the database disappears, all the accounts, posts and followers on your server will disappear with it.

If you lose application secrets, some functions of Mastodon will stop working for your users, they will be logged out, two-factor authentication will become unavailable, Web Push API subscriptions will stop working.

If you lose user-uploaded files, you will lose avatars, headers, and media attachments, but Mastodon *will* work moving forward.

Losing the Redis database is almost harmless: The only irrecoverable data will be the contents of the Sidekiq queues and scheduled retries of previously failed jobs. The home and list feeds are stored in Redis, but can be regenerated with tootctl.

The best backups are so-called off-site backups, i.e. ones that are not stored on the same machine as Mastodon itself. If the server you are hosted on goes on fire and the hard disk drive explodes, backups stored on that same hard drive won't be of much use.

### Backing up application secrets

Application secrets are the easiest to backup, since they never change. You only need to store `.env.production` somewhere safe.

### Backing up PostgreSQL

PostgreSQL is at risk of data corruption from power cuts, hard disk drive failure, and botched schema migrations. For that reason, occassionally making a backup with `pg_dump` or `pg_dumpall` is recommended.

For high-availability setups, it is possible to use hot streaming replication to have a second PostgreSQL server with always up-to-date data, ready to be switched over to if the other server goes down.

### Backing up user-uploaded files

If you are using an external object storage provider such as Amazon S3, Google Cloud or Wasabi, then you don't need to worry about backing those up. The respective companies are responsible for handling hardware failures.

If you are using local file storage, then it's up to you to make copies of the sizeable `public/system` directory, where uploaded files are stored by default.

### Backing up Redis

Backing up Redis is easy. Redis regularly writes to `/var/lib/redis/dump.rdb` which is the only file you need to make a copy of.
