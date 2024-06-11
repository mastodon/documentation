---
title: Using the admin CLI
description: tootctl commands that can be run from the CLI.
menu:
  docs:
    weight: 60
    parent: admin
---

The command-line interface of Mastodon is an executable file called `tootctl` residing in the `bin` directory within the Mastodon root directory. You must specify which environment you intend to use whenever you execute it by specifying the `RAILS_ENV` environment variable. Unless you are a developer working on a local machine, you need to use `RAILS_ENV=production`. If you are sure that you will never need another environment (for development, testing, or staging), you can add it to your `.bashrc` file for convenience, e.g.:

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

If so, you won’t need to specify it each time inline. Otherwise, calls to `tootctl` will usually go like this, assuming that the Mastodon code is checked out in `/home/mastodon/live`:

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

## Base CLI

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/base.rb" caption="lib/mastodon/cli/base.rb" >}}


---


### `tootctl self-destruct` {#self-destruct}

Erase this server from the federation by broadcasting account Delete activities to all known other servers. This allows a "clean exit" from running a Mastodon server, as it leaves next to no cache behind on other servers. This command is always interactive and requires confirmation twice.

No local data is actually deleted because emptying the database or deleting the entire VPS is faster. If you run this command and then continue to operate the instance anyway, then there will be a state mismatch that might lead to glitches and issues with federation.

{{< hint style="danger" >}}
**Make sure you know exactly what you are doing before running this command.** This operation is NOT reversible, and it can take a long time. The server will be in a BROKEN STATE after this command finishes. A running Sidekiq process is required, so do not shut down the server until the queues are fully cleared.
{{< /hint >}}

`--dry-run`
: Print expected results only, without performing any actions.

**Version history:**\
2.8.0 - added


---


### `tootctl --version` {#version}

Show the version of the currently running Mastodon instance.

**Version history:**\
2.7.0 - added


---


## Accounts CLI {#accounts}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/accounts.rb" caption="lib/mastodon/cli/accounts.rb" >}}


---


### `tootctl accounts rotate` {#accounts-rotate}

Generate and broadcast new RSA keys, as part of security maintenance.

`USERNAME`
: Local username for an account.

`--all`
: Can be provided instead of `USERNAME` to rotate keys for all local accounts.

**Version history:**\
2.5.0 - added


---


### `tootctl accounts create` {#accounts-create}

Create a new user account with the given `USERNAME` and provided `--email`.

`USERNAME`
: Local username for the new account. {{<required>}}

`--email EMAIL`
: Email address to be attached to the user. {{<required>}}

`--confirmed`
: Skip sending the confirmation email and activate the account immediately.

`--role ROLE`
: Define the new account's custom role by providing the `name` of that [Role]({{< relref "entities/Role" >}}). Default roles include `Owner`, `Admin`, and `Moderator` (case-sensitive).

`--reattach`
: Reuse an old USERNAME after its account has been deleted.

`--force`
Forcefully delete any existing account with this `USERNAME` and reattach the new account in place of the (just-deleted) account.

`--skip-sign-in-token`
: Forcefully ensure that the user is never asked for an e-mailed security code.

**Version history:**\
2.6.0 - added\
4.0.0 - `--role` no longer takes hard-coded `user`, `moderator`, or `admin` roles. Specify the name of the custom Role instead (case-sensitive).


---


### `tootctl accounts modify` {#accounts-modify}

Modify a user account's role, email, active status, approval mode, or 2FA requirement.

`USERNAME`
: Local username for the account. {{<required>}}

`--role ROLE`
: Define the existing account's custom role by providing the `name` of that [Role]({{< relref "entities/Role" >}}). Default roles include `Owner`, `Admin`, and `Moderator` (case-sensitive).

`--remove-role`
: Removes the current role from the user.

`--email EMAIL`
: Update the user's email address to `EMAIL`.

`--confirm`
: Skip confirmation email, when used with `--email`.

`--disable`
: Lock `USERNAME` out of their account.

`--enable`
: Unlock `USERNAME`'s account if it is currently disabled.

`--approve`
: Approve `USERNAME`'s account, if you are/were in approval mode.

`--disable-2fa`
: Remove additional factors and allow login with a password.

`--reset-password`
: Resets the password of the given account.

`--skip-sign-in-token`
: Forcefully ensure that the user is never asked for an e-mailed security code.

**Version history:**\
2.6.0 - added\
3.1.2 - added `--reset-password`\
4.0.0 - `--role` no longer takes hard-coded `user`, `moderator`, or `admin` roles. Specify the name of the custom Role instead (case-sensitive). Remove the current role with `--remove-role`.


---


### `tootctl accounts delete` {#accounts-delete}

Delete a user account with the given USERNAME.

`USERNAME`
: Local username for the new account. {{<required>}}

**Version history:**\
2.6.0 - added


---


### `tootctl accounts backup` {#accounts-backup}

Request a backup for a user account with the given USERNAME. The backup will be created in Sidekiq asynchronously, and the user will receive an email with a link to it once it's done.

`USERNAME`
: Local username for the new account. {{<required>}}

**Version history:**\
2.6.0 - added


---


### `tootctl accounts cull` {#accounts-cull}

Remove remote accounts that no longer exist. Queries every single remote account in the database to determine if it still exists on the origin server, and if it doesn't, then remove it from the database. Accounts that have had confirmed activity within the last week are excluded from the checks, in case the server is just down.

`DOMAIN[...]`
: Optionally pass specific domains to cull

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--dry-run`
: Print expected results only, without performing any actions.

**Version history:**\
2.6.0 - added\
2.8.0 - add `--dry-run`\
3.5.0 - add the ability to pass specific domains


---


### `tootctl accounts refresh` {#accounts-refresh}

Refetch remote user data and files for one or multiple accounts.

`USERNAME`
: username@domain for the remote account.

`--all`
: Can be provided instead of `USERNAME` to refresh all remote accounts.

`--domain DOMAIN`
: Can be provided instead of `USERNAME`. Operate only on remote accounts from this `DOMAIN`.

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--verbose`
: Print additional information while a task is processing.

`--dry-run`
: Print expected results only, without performing any actions.

**Version history:**\
2.6.0 - added


---


### `tootctl accounts merge` {#accounts-merge}

Merge two remote accounts into one. This is primarily meant to fix duplicates caused by other servers changing their domain. By default, this only works if the public key is the same, but this can be overridden.

`FROM`
: username@domain for the remote account to be removed. {{<required>}}

`TO`
: username@domain for the remote account to be kept. {{<required>}}

`--force`
: Override the public key check.

**Version history:**\
3.3.0 - added


---


### `tootctl accounts follow` {#accounts-follow}

Force all local accounts to follow a local account specified by username.

`USERNAME`
: Local username. {{<required>}}

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--verbose`
: Print additional information while task is processing.

**Version history:**\
2.7.0 - added\
3.0.0 - now uses `USERNAME` instead of `ACCT`


---


### `tootctl accounts unfollow` {#accounts-unfollow}

Force all local accounts to unfollow an account specified by their address.

`ACCT`
: `username@domain` address. {{<required>}}

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--verbose`
: Print additional information while task is processing.

**Version history:**\
2.7.0 - added


---


### `tootctl accounts reset-relationships` {#accounts-reset-relationships}

Reset all follow and/or follower relationships for a local account.

`USERNAME`
: Local username.

`--follows`
: Force `USERNAME` to unfollow everyone, then re-follow them.

`--followers`
: Remove all of `USERNAME`'s followers.

**Version history:**\
2.8.0 - added


---


### `tootctl accounts approve` {#accounts-approve}

Approve new registrations when instance is in approval mode.

`USERNAME`
: Local username.

`--number N`
: Approve the N earliest pending registrations.

`--all`
: Approve all pending registrations.

**Version history:**\
2.8.0 - added


---


### `tootctl accounts prune` {#accounts-prune}

Prune remote accounts that never interacted with local users

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--dry-run`
: Print expected results only, without performing any actions.

**Version history:**\
2.8.0 - added


---


## Cache CLI {#cache}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/cache.rb" caption="lib/mastodon/cli/cache.rb" >}}


---


### `tootctl cache clear` {#cache-clear}

Clear out the cache storage.

**Version history:**\
2.8.1 - added


---


### `tootctl cache recount` {#cache-recount}

Update hard-cached counters of TYPE by counting referenced records from scratch. It may take a very long time to finish, depending on the size of the database. Accounts will have their follower, following, and status counts refreshed. Statuses will have their reply, boost, and favourite counts refreshed.

`TYPE`
: Either `accounts` or `statuses`. {{<required>}}

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--verbose`
: Print additional information while task is processing.

**Version history:**\
3.0.0 - added


---


## Domains CLI {#domains}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/domains.rb" caption="lib/mastodon/cli/domains.rb" >}}


---


### `tootctl domains purge` {#domains-purge}

Remove all accounts from a given DOMAIN without leaving behind any records. Unlike a suspension, if the DOMAIN still exists in the wild, it means the accounts could return if they are resolved again.

`DOMAIN[...]`
: Domains to purge, separated by space.

`--by-uri`
: Match domains in the actor URI rather than in the Webfinger address.

`--limited-federation-mode`
: Can be provided instead of DOMAIN. Instead of purging from a single domain, all accounts from domains that are not allow-listed will be removed from the database. Use this after enabling limited federation mode and defining your allow-list.

`--concurrency N`
: The number of workers to use for this task. Defaults to 5.

`--verbose`
: Print additional information while task is processing.

`--dry-run`
: Print expected results only, without performing any actions.

**Version history:**\
2.6.0 - added\
2.8.0 - add `--whitelist-mode`\
2.9.0 - remove custom emoji as well\
3.0.0 - accept multiple domains\
3.2.0 - rename `--whitelist-mode` to `--limited-federation-mode`\
3.5.0 - add `--by-uri`


---


### `tootctl domains crawl` {#domains-crawl}

Crawl the known fediverse by using Mastodon REST API endpoints that expose all known peers, and collect statistics from those peers, as long as those peers support those API endpoints. When no START is given, the command uses the server's own database of known peers to seed the crawl. Returns total servers, total registered users, total active users in the last week, and total users joined in the last week.

`START`
: Optionally start from a different domain name.

`--exclude-suspended`
: Do not include instances that you have suspended in the output. Also includes any subdomains.

`--concurrency N`
: The number of workers to use for this task. Defaults to N=50.

`--format FORMAT`
: Control how results are returned. `summary` will print a summary. `domains` will return a newline-delimited list of all discovered peers. `json` will dump aggregated raw data. Defaults to `summary`.

**Version history:**\
2.7.0 - added\
3.0.0 - add `--exclude-suspended`


---


## Email domain blocks CLI {#email-domain-blocks}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/email_domain_blocks.rb" caption="lib/mastodon/cli/email_domain_blocks.rb" >}}


---


### `tootctl email-domain-blocks list` {#email-domain-blocks-list}

List all currently blocked email domains.

**Version history:**\
3.2.0 - added


---


### `tootctl email-domain-blocks add` {#email-domain-blocks-add}

Add entries to the email domain blocklist.

`DOMAIN[...]`
: Email domains to block, separated by space. {{<required>}}

`--with-dns-records`
: If provided, will also lookup A, AAAA, and MX records and block them as well.

**Version history:**\
3.2.0 - added


---


### `tootctl email-domain-blocks remove` {#email-domain-blocks-remove}

Remove entries from the e-mail domain blocklist.

`DOMAIN[...]`
: Email domains to unblock, separated by space. {{<required>}}

**Version history:**\
3.2.0 - added


---


## Emoji CLI {#emoji}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/emoji.rb" caption="lib/mastodon/cli/emoji.rb" >}}


---


### `tootctl emoji export` {#emoji-export}

Exports custom emoji to `export.tar.gz` at PATH.

`PATH`
: Path to create a .tar.gz archive containing pictures. {{<required>}}

`--overwrite`
: Overwrite any existing archive at `PATH`.

`--category CATEGORY`
: Export only the specified `CATEGORY`. If not provided, will export all emoji.

**Version history:**\
3.1.4 - added


---


### `tootctl emoji import` {#emoji-import}

Imports custom emoji from a .tar.gz archive at a given path. The archive should contain PNG or GIF files no larger than 50KB, and the shortcode will be set equal to the filename minus the extension, with optional prefixes and/or suffixes.

`PATH`
: Path to create a .tar.gz archive containing pictures. {{<required>}}

`--prefix PREFIX`
: Add PREFIX to the beginning of generated shortcodes.

`--suffix SUFFIX`
: Add SUFFIX to the end of generated shortcodes.

`--overwrite`
: Instead of skipping existing emoji, replace them with any discovered emoji with the same shortcode.

`--category CATEGORY`
: Group the processed emoji under CATEGORY in the picker.

`--unlisted`
: Processed emoji will not be shown in the emoji picker, but will be usable only by their direct shortcode.

**Version history:**\
2.5.0 - added


---


### `tootctl emoji purge` {#emoji-purge}

Remove all custom emojis.

`--remote-only`
: If provided, remove only from remote domains.

**Version history:**\
2.8.0 - added\
3.1.0 - add `--remote-only`


---


## Feeds CLI {#feeds}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/feeds.rb" caption="lib/mastodon/cli/feeds.rb" >}}


---


### `tootctl feeds build` {#feeds-build}

Build home and list feeds for one or all users. Feeds will be built from the database and cached in-memory with Redis. Mastodon manages home feeds for active users automatically.

`USERNAME`
: Local username whose feeds will be regenerated.

`--all`
: Can be provided instead of `USERNAME` to refresh all remote accounts.

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--verbose`
: Print additional information while task is processing.

`--dry-run`
: Print expected results only, without performing any actions.

**Version history:**\
2.6.0 - added


---


### `tootctl feeds clear` {#feeds-clear}

Remove all home and list feeds from Redis.

**Version history:**\
2.6.0 - added


---


## Maintenance CLI {#maintenance}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/maintenance.rb" caption="lib/mastodon/cli/maintenance.rb" >}}


---


### `tootctl maintenance fix-duplicates` {#maintenance-fix-duplicates}

Fix corrupted database indexes that may have been caused due to changing collation rules. Deletes or merges duplicate accounts, statuses, emojis, etc. Mastodon has to be stopped to run this task, which will take a long time and may be destructive. This is useful if your database indexes are corrupted because of issues such as <https://wiki.postgresql.org/wiki/Locale_data_changes>.

**Version history:**\
3.3.0 - added


---


## Media CLI {#media}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/media.rb" caption="lib/mastodon/cli/media.rb" >}}


---


### `tootctl media remove` {#media-remove}

Removes locally cached copies of media attachments, avatars or profile headers from other servers. By default, only media attachments are removed.

`--days N`
: How old media attachments have to be before they are removed. In case of avatars and headers, how old the last webfinger request and update to the user has to be before they are removed. Defaults to 7.

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--prune-profiles`
: Instead of media attachments, remove locally cached copies of avatars and headers from other servers. Cannot be combined with `--remove-headers`.

`--remove-headers`
: Instead of media attachments, remove locally cached copies of headers from other servers. Cannot be combined with `--prune-profiles`.

`--include-follows`
: Override the default behavior of `--prune-profiles` and `--remove-headers` to remove locally cached copies of avatars (and headers) from other servers, irrespective of follow status (by default, they are only removed from accounts that are not followed by or following anyone locally). Can only be used with `--prune-profiles` or `--remove-headers`.

`--verbose`
: Print additional information while task is processing.

`--dry-run`
: Print expected results only, without performing any actions.

**Version history:**\
2.5.0 - added\
2.6.2 - show freed disk space\
4.1.0 - added --prune-profiles, --remove-headers, and --include-follows.


---


### `tootctl media remove-orphans` {#media-remove-orphans}

Scans for files that do not belong to existing media attachments, and remove them. Please mind that some storage providers charge for the necessary API requests to list objects. Also, this operation requires iterating over every single file individually, so it will be slow.

`--start-after`
: The Paperclip attachment key where the loop will start. Use this option if the command was interrupted before.

`--dry-run`
: Print expected results only, without performing any actions.

`--prefix`
: Traverse only a specific prefix of files in the system.

`--fix-permissions`
: Sets S3 ACL to be default according to environment variables.

**Version history:**\
3.1.0 - added\
3.1.3 - added `--prefix`\
3.3.0 - added `--fix-permissions`


---


### `tootctl media refresh` {#media-refresh}

Refetch remote media attachments from other servers. You must specify the source of media attachments with either `--status`, `--account`, `--domain`, or `--days`. If an attachment already exists in the database, it will not be overwritten unless you use `--force`.  

`--account ACCT`
: String `username@domain` handle of the account

`--domain DOMAIN`
: FQDN string

`--status ID`
: Local numeric ID of the status in the database.

`--days N`
: The number of days to limit this task to.
  
`--concurrency N`
: The number of workers to use for this task. Defaults to 5.

`--verbose`
: Print additional information while task is processing.

`--dry-run`
: Print expected results only, without performing any actions.

`--force`
: Force redownload the remote resource and overwrite the local attachment.

**Version history:**\
3.0.0 - added\
3.0.1 - add `--force` and skip already downloaded attachments by default\
4.0.0 - add `--days`


---


### `tootctl media usage` {#media-usage}

Calculate disk space consumed by Mastodon.

**Version history:**
3.0.1 - added


---


### `tootctl media lookup` {#media-lookup}

Prompts for a media URL, then looks up the status where the media is displayed.

**Version history:**\
3.1.0 - added


---


## Preview Cards CLI {#preview_cards}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/preview_cards.rb" caption="lib/mastodon/cli/preview_cards.rb" >}}


---


### `tootctl preview_cards remove` {#preview_cards-remove}

Remove local thumbnails for preview cards.

`--days N`
: How old media attachments have to be before they are removed. Defaults to 180. (NOTE: it is not recommended to delete preview cards within the last 14 days, because preview cards will not be refetched unless the link is reposted after 2 weeks from last time.)

`--concurrency N`
: The number of workers to use for this task. Defaults to N=5.

`--verbose`
: Print additional information while task is processing.

`--dry-run`
: Print expected results only, without performing any actions.

`--link`
: Only delete link-type preview cards; leave video and photo cards untouched.

**Version history:**\
3.0.0 - added


---


## Search CLI {#search}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/search.rb" caption="lib/mastodon/cli/search.rb" >}}


---


### `tootctl search deploy` {#search-deploy}

Create or update an Elasticsearch index and populate it. If Elasticsearch is empty, this command will create the necessary indices and then import data from the database into those indices. This command will also upgrade indices if the underlying schema has been changed since the last run.

`--batch-size`
: Defaults to 100. A higher batch size can make Elasticsearch process records more quickly, with less load on the PostgreSQL database, but can increase memory pressure on the Elasticsearch nodes during indexing.

`--only INDEX`
: Specify an index name [`instances`, `accounts`, `tags`, `statuses`, `public_statuses`] to create or update only that index.

`--concurrency N`
: Parallelize execution of the command on multiple threads. Defaults to 5.

`--import`
:Import data from the database to the index
 
`--clean`
:Remove outdated documents from the index

`--reset-chewy`
:Reset Chewy's internal index

**Version history:**
2.8.0 - added\
3.0.0 - add `--processes` for parallelization\
3.3.0 - options changed\
3.5.0 - add `--batch-size`\
3.5.3 - switched `--batch-size` default from 1000 to 100 and `--concurrency` from 2 to 5, added `--import` and `--clean`\
4.2.0 - added `instances` and `public_statuses` options to `--only`, added `--reset-chewy`


---


## Settings CLI {#settings}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/settings.rb" caption="lib/mastodon/cli/settings.rb" >}}


---


### `tootctl settings registrations open` {#settings-registrations-open}

Opens registrations.

**Version history:**\
2.6.0 - added


---


### `tootctl settings registrations close` {#settings-registrations-close}

Closes registrations.

**Version history:**\
2.6.0 - added


---


### `tootctl settings registrations approved` {#settings-registrations-approved}

Set registration to require approval.

**Version history:**\
3.5.2 - added

`--require_reason`
: If true, users must enter a reason when registering.


---


## Statuses CLI {#statuses}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/statuses.rb" caption="lib/mastodon/cli/statuses.rb" >}}


---


### `tootctl statuses remove` {#statuses-remove}

Remove unreferenced statuses from the database, such as statuses that came from relays or from users who are no longer followed by any local accounts, and have not been replied to or otherwise interacted with.

This is a computationally heavy procedure that creates extra database indices before commencing, and removes them afterward.

`--days N`
: How old statuses have to be before they are removed. Defaults to 90.

`--skip-media-remove`
: Skips removing the media, in case S3 errors out. Defaults to false.

**Version history:**\
2.8.0 - added\
3.1.3 - added `--skip-media-remove`\
3.5.0 - now removes orphaned records and performs additional cleanup tasks


---


## Upgrade CLI {#upgrade}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/upgrade.rb" caption="lib/mastodon/cli/upgrade.rb" >}}


---


### `tootctl upgrade storage-schema` {#upgrade-storage-schema}

Upgrade the storage schema to store all non-local media resources in a top-level cache directory. WARNING: This is optional, and only for deployments made before v3.1.4. This command can incur massive object storage costs due to moving potentially terabytes of data.

`--verbose`
: Print additional information while task is processing.

`--dry-run`
: Print expected results only, without performing any actions.

**Version history:**\
3.1.4 - added
