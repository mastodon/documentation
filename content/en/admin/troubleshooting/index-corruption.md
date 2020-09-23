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

You can check whether your indexes are valid using [PostgreSQL's `amcheck` module](https://www.postgresql.org/docs/10/amcheck.html): as the database server's super user, connect to your Mastodon database and issue the following:

```SQL
CREATE EXTENSION IF NOT EXISTS amcheck;
SELECT bt_index_check(c.oid)
FROM pg_index i
JOIN pg_class c ON i.indexrelid = c.oid
WHERE c.relname IN ('index_account_domain_blocks_on_account_id_and_domain',
  'index_account_proofs_on_account_and_provider_and_username',
  'index_accounts_on_username_and_domain_lower', 'index_accounts_on_uri',
  'index_accounts_on_url', 'index_conversations_on_uri',
  'index_custom_emoji_categories_on_name',
  'index_custom_emojis_on_shortcode_and_domain',
  'index_devices_on_access_token_id', 'index_domain_allows_on_domain',
  'index_domain_blocks_on_domain', 'index_email_domain_blocks_on_domain',
  'index_invites_on_code', 'index_markers_on_user_id_and_timeline',
  'index_media_attachments_on_shortcode', 'index_preview_cards_on_url',
  'index_statuses_on_uri', 'index_tags_on_name_lower',
  'index_tombstones_on_uri', 'index_unavailable_domains_on_domain',
  'index_users_on_email', 'index_webauthn_credentials_on_external_id'
);
```

If this raises an error, your database is corrupted and needs fixing. If it does not, you may need to perform more involved checks to be sure.
Unlike the previous checks, those more involved checks will lock tables when running, thus interfering with the availability of your instance.

```SQL
CREATE EXTENSION IF NOT EXISTS amcheck;
SELECT bt_index_parent_check(c.oid)
FROM pg_index i
JOIN pg_class c ON i.indexrelid = c.oid
WHERE c.relname IN ('index_account_domain_blocks_on_account_id_and_domain',
  'index_account_proofs_on_account_and_provider_and_username',
  'index_accounts_on_username_and_domain_lower', 'index_accounts_on_uri',
  'index_accounts_on_url', 'index_conversations_on_uri',
  'index_custom_emoji_categories_on_name',
  'index_custom_emojis_on_shortcode_and_domain',
  'index_devices_on_access_token_id', 'index_domain_allows_on_domain',
  'index_domain_blocks_on_domain', 'index_email_domain_blocks_on_domain',
  'index_invites_on_code', 'index_markers_on_user_id_and_timeline',
  'index_media_attachments_on_shortcode', 'index_preview_cards_on_url',
  'index_statuses_on_uri', 'index_tags_on_name_lower',
  'index_tombstones_on_uri', 'index_unavailable_domains_on_domain',
  'index_users_on_email', 'index_webauthn_credentials_on_external_id'
);
```

## Fixing the issue {#fixing}

Unless you take action, if you are affected, your database could get more and more inconsistent as the time pass. Therefore, it is important to fix it as soon as possible.

Before attempting to fix your database, stop Mastodon and make a backup of your database. Then, you may try running `tootctl maintenance fix-duplicates`.
This tool will walk through the database to find duplicate and fix them. In some cases, those operations are destructive.
In the most destructive cases, you will be asked to chose which record to keep. In all cases, walking through the whole database in search of duplicates is an extremely long operation.

Once the script has finished running, you should consider re-creating your database with safe collation settings.

## Re-creating the database with safe collation settings {#recreating}

While not required, you may want to re-create your database with `C` for `ctype` and `collation`, in order to avoid similar issues in the future.

TODO: pg_dump, edit config/database.yml, run db:setup
