---
title: Database index corruption
description: How to recover from database index corruption.
menu:
  docs:
    weight: 10
    parent: admin-troubleshooting
---

A somewhat common configuration issue can lead to index corruption throughout the database. This page attempts to explain why this may occur and how to fix it.

## Locale data and collation {#explanation}

Textual values in the database, such as usernames, or toot identifiers, are compared using so-called collation rules defining how characters are ordered and how to change their case.
When setting up a database, Mastodon will use the database server's default locale settings, including the default collation rules, which often is defined by the operating system's settings.

Unfortunately, in late 2018, a `glibc` update changed the collation rules for many locales, which means databases using an affected locale would now order textual values differently.
Since the database indexes are algorithmic structures which rely on the ordering of the values they are indexing, some of them would become inconsistent.

More information: https://wiki.postgresql.org/wiki/Locale_data_changes https://postgresql.verite.pro/blog/2018/08/27/glibc-upgrade.html

## Am I affected by this issue? {#am-i-affected}

If your database is not using `C` or `POSIX` for its collation setting (which you can check with `SELECT datcollate FROM pg_database WHERE datname = current_database();`),
your indexes may be inconsistent, if you ever ran with a version of glibc prior to 2.28 and did not immediately reindex your databases after updating.

If you did not ever use a version of glibc older than 2.28, you are not affected, but using a collation setting different from `C` or `POSIX` exposes you to a similar issue in the future.

## Fixing the issue {#fixing}

Unless you take action, if you are affected, your database could get more and more inconsistent as the time pass. Therefore, it is important to fix it as soon as possible.

Before attempting to fix your database, stop Mastodon and make a backup of your database. Then, you may try running `tootctl maintenance fix-duplicates`.
This tool will walk through the database to find duplicate and fix them. In some cases, those operations are destructive.
In the most destructive cases, you will be asked to chose which record to keep. In all cases, walking through the whole database in search of duplicates is an extremely long operation.

Once the script has finished running, you should consider re-creating your database with safe collation settings.

## Re-creating the database with safe collation settings {#recreating}

TODO
