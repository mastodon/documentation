---
title: Using the admin CLI
description: tootctl commands that can be run from the CLI.
menu:
  docs:
    weight: 60
    parent: admin
---
---

The command-line interface of Mastodon is an executable file called `tootctl` residing in the `bin` directory within the Mastodon root directory. You must specify which environment you intend to use whenever you execute it by specifying the `RAILS_ENV` environment variable. Unless you are a developer working on a local machine, you need to use `RAILS_ENV=production`. If you are sure that you will never need another environment \(for development, testing, or staging\), you can add it to your `.bashrc` file for convenience, e.g.:

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

If so, you won’t need to specify it each time inline. Otherwise, calls to `tootctl` will usually go like this, assuming that the Mastodon code is checked out in `/home/mastodon/live`:

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

## Base CLI

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/cli.rb" caption="lib/cli.rb" >}}

### `tootctl self-destruct` {#self-destruct}

Erase this server from the federation by broadcasting account Delete activities to all known other servers. This allows a "clean exit" from running a Mastodon server, as it leaves next to no cache behind on other servers. This command is always interactive and requires confirmation twice.

No local data is actually deleted, because emptying the database or deleting the entire VPS is faster. If you run this command then continue to operate the instance anyway, then there will be a state mismatch that might lead to glitches and issues with federation.

{{< hint style="danger" >}}
**Make sure you know exactly what you are doing before running this command.** This operation is NOT reversible, and it can take a long time. The server will be in a BROKEN STATE after this command finishes. A running Sidekiq process is required, so do not shut down the server until the queues are fully cleared.
{{< /hint >}}

**Version history:**
* 2.8.0 - added

| Option | Description |
| :--- | :--- |
| `--dry_run` | Print expected results only, without performing any actions. |

### `tootctl --version` {#version}

Show the version of the currently running Mastodon instance.

**Version history:**
* 2.7.0 - added

## Accounts CLI {#accounts}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/accounts_cli.rb" caption="lib/mastodon/accounts\_cli.rb" >}}

### `tootctl accounts rotate` {#accounts-rotate}

Generate and broadcast new RSA keys, as part of security maintenance.

**Version history:**
* 2.5.0 - added

| Option | Description |
| :--- | :--- |
| `USERNAME` | Local username for an account. |
| `--all` | Can be provided instead of USERNAME to rotate keys for all local accounts. |

### `tootctl accounts create` {#accounts-create}

Create a new user account with given USERNAME and provided --email.

**Version history:**
* 2.6.0 - added

| Option | Description |
| :--- | :--- |
| `USERNAME`      | Local username for the new account. Required. |
| `--email EMAIL` | Email address to be attached to the user. Required. |
| `--confirmed`   | Skip sending the confirmation email and activate the account immediately. |
| `--role ROLE`   | Define the new account as a `user`, `moderator`, or `admin`. Defaults to `user`. |
| `--reattach`    | Reuse an old USERNAME after its account has been deleted. |
| `--force`       | Forcefully delete any existing account with this USERNAME and reattach the new account in place of the \(just-deleted\) account. |

### `tootctl accounts modify` {#accounts-modify}

Modify a user account's role, email, active status, approval mode, or 2FA requirement.

**Version history:**
* 2.6.0 - added
* 3.1.2 - added `--reset-password`

| Option | Description |
| :--- | :--- |
| `USERNAME` | Local username for the account. Required. |
| `--role ROLE` | Define the account as a `user`, `moderator`, or `admin`. |
| `--email EMAIL` | Update the user's email address to EMAIL. |
| `--confirm` | Skip confirmation email, when used with --email. |
| `--disable` | Lock USERNAME out of their account. |
| `--enable` | Unlock USERNAME's account if it is currently disabled. |
| `--approve` | Approve the account, if you are/were in approval mode. |
| `--disable-2fa` | Remove additional factors and allow login with password. |
| `--reset-password` | Resets the password of the given account.|

### `tootctl accounts delete` {#accounts-delete}

Delete a user account with given USERNAME.

**Version history:**
* 2.6.0 - added

| Option | Description |
| :--- | :--- |
| `USERNAME` | Local username for the account. Required. |

### `tootctl accounts backup` {#accounts-backup}

Request a backup for a user account with given USERNAME. The backup will be created in Sidekiq asynchronously, and the user will receive an email with a link to it once it's done.

**Version history:**
* 2.6.0 - added

| Option | Description |
| :--- | :--- |
| `USERNAME` | Local username for the account. Required. |

### `tootctl accounts cull` {#accounts-cull}

Remove remote accounts that no longer exist. Queries every single remote account in the database to determine if it still exists on the origin server, and if it doesn't, then remove it from the database. Accounts that have had confirmed activity within the last week are excluded from the checks, in case the server is just down.

**Version history:**
* 2.6.0 - added
* 2.8.0 - add `--dry_run`

| Option | Description |
| :--- | :--- |
| `--concurrency N` | The number of workers to use for this task. Defaults to N=5. |
| `--dry_run` | Print expected results only, without performing any actions. |

### `tootctl accounts refresh` {#accounts-refresh}

Refetch remote user data and files for one or multiple accounts.

**Version history:**
* 2.6.0 - added

| Option | Description |
| :--- | :--- |
| `USERNAME` | Username for the remote accout. |
| `--all` | Can be provided instead of USERNAME to refresh all remote accounts. |
| `--domain DOMAIN` | Can be provided instead of USERNAME. Operate only on remote accounts from this DOMAIN. |
| `--concurrency N` | The number of workers to use for this task. Defaults to N=5. |
| `--verbose` | Print additional information while task is processing. |
| `--dry_run` | Print expected results only, without performing any actions. |

### `tootctl accounts follow` {#accounts-follow}

Force all local accounts to follow a local account specified by username.

**Version history:**
* 2.7.0 - added
* 3.0.0 - now uses USERNAME instead of ACCT

| Option | Description |
| :--- | :--- |
| `USERNAME` | Local username |
| `--concurrency N` | The number of workers to use for this task. Defaults to N=5. |
| `--verbose` | Print additional information while task is processing. |

### `tootctl accounts unfollow` {#accounts-unfollow}

Force all local accounts to unfollow an account specified by their address.

**Version history:**
* 2.7.0 - added

| Option | Description |
| :--- | :--- |
| `ACCT` | `username@domain` address |
| `--concurrency N` | The number of workers to use for this task. Defaults to N=5. |
| `--verbose` | Print additional information while task is processing. |

### `tootctl accounts reset-relationships` {#accounts-reset-relationships}

Reset all follow and/or follower relationships for a local account.

**Version history:**
* 2.8.0 - added

| Option | Description |
| :--- | :--- |
| `USERNAME` | Local username |
| `--follows` | Force USERNAME to unfollow everyone, then re-follow them. |
| `--followers` | Remove all of USERNAME's followers. |

### `tootctl accounts approve` {#accounts-approve}

Approve new registrations when instance is in approval mode.

**Version history:**
* 2.8.0 - added

| Option | Description |
| :--- | :--- |
| `USERNAME` | Approve the pending account with this username. |
| `--number N` | Approve the N most recent registrations. |
| `--all` | Approve all pending registrations. |

## Cache CLI {#cache}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/cache_cli.rb" caption="lib/mastodon/cache\_cli.rb" >}}

### `tootctl cache clear` {#cache-clear}

Clear out the cache storage.

**Version history:**
* 2.8.1 - added

### `tootctl cache recount` {#cache-recount}

Update hard-cached counters of TYPE by counting referenced records from scratch. It may take a very long time to finish, depending on the size of the database. Accounts will have their follower, following, and status counts refreshed. Statuses will have their reply, boost, and favourite counts refreshed.

**Version history:**
* 3.0.0 - added

| Option | Description |
| :--- | :--- |
| TYPE | Either `accounts` or `statuses` |
| `--concurrency N` | The number of workers to use for this task. Defaults to N=5. |
| `--verbose` | Print additional information while task is processing. |

## Domains CLI {#domains}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/domains_cli.rb" caption="lib/mastodon/domains\_cli.rb" >}}

### `tootctl domains purge` {#domains-purge}

Remove all accounts from a given DOMAIN without leaving behind any records. Unlike a suspension, if the DOMAIN still exists in the wild, it means the accounts could return if they are resolved again.

**Version history:**
* 2.6.0 - added
* 2.8.0 - add `--whitelist_mode`
* 2.9.0 - remove custom emoji as well
* 3.0.0 - accept multiple domains

| Option | Description |
| :--- | :--- |
| `DOMAIN[...]` | Domains to purge, separated by space. |
| `--whitelist_mode` | Can be provided instead of DOMAIN. Instead of purging from a single domain, all accounts from domains that are not whitelisted will be removed from the database. Use this after enabling whitelist mode and defining your whitelist. |
| `--concurrency N` | The number of workers to use for this task. Defaults to 5. |
| `--verbose` | Print additional information while task is processing. |
| `--dry_run` | Print expected results only, without performing any actions. |

### `tootctl domains crawl` {#domains-crawl}

Crawl the known fediverse by using Mastodon REST API endpoints that expose all known peers, and collect statistics from those peers, as long as those peers support those API endpoints. When no START is given, the command uses the server's own database of known peers to seed the crawl. Returns total servers, total registered users, total active users in the last week, and total users joined in the last week.

**Version history:**
* 2.7.0 - added
* 3.0.0 - add `--exclude_suspended`

| Option | Description |
| :--- | :--- |
| START | Optionally start from a different domain name. |
| `--concurrency N` | The number of workers to use for this task. Defaults to 50. |
| `--format FORMAT` | Control how results are returned. `summary` will print a summary. `domains` will return a newline-delimited list of all discovered peers. `json` will dump aggregated raw data. Defaults to `summary`. |
| `--exclude_suspended` | Do not include instances that you have suspended in the output. Also includes any subdomains. |

## Emoji CLI {#emoji}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/emoji_cli.rb" caption="lib/mastodon/emoji\_cli.rb" >}}

### `tootctl emoji import` {#emoji-import}

Imports custom emoji from a .tar.gz archive at a given path. The archive should contain PNG or GIF files no larger than 50KB, and the shortcode will be set equal to the filename minus the extension, with optional prefixes and/or suffixes.

**Version history:**
* 2.5.0 - added

| Option | Description |
| :--- | :--- |
| `PATH` | Path to a .tar.gz archive containing pictures. |
| `--prefix PREFIX` | Add PREFIX to the beginning of generated shortcodes. |
| `--suffix SUFFIX` | Add SUFFIX to the end of generated shortcodes. |
| `--overwrite` | Instead of skipping existing emoji, replace them with any discovered emoji with the same shortcode. |
| `--unlisted` | Processed emoji will not be shown in the emoji picker, but will be usable only by their direct shortcode. |
| `--category CATEGORY` | Group the processed emoji under CATEGORY in the picker. |

### `tootctl emoji purge` {#emoji-purge}

Remove all custom emoji.

**Version history:**
* 2.8.0 - added
* 3.1.0 - add `--remote_only`

| Option | Description |
| :--- | :--- |
| `--remote_only` | If provided, remove only from remote domains. |

## Feeds CLI {#feeds}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/feeds_cli.rb" caption="lib/mastodon/feeds\_cli.rb" >}}

### `tootctl feeds build` {#feeds-build}

Build home and list feeds for one or all users. Feeds will be built from the database and cached in-memory with Redis. Mastodon manages home feeds for active users automatically.

**Version history:**
* 2.6.0 - added

| Option | Description |
| :--- | :--- |
| `USERNAME` | Local username whose feeds will be regenerated. |
| `--all` | Can be provided instead of USERNAME to refresh all local accounts' feeds. |
| `--concurrency N` | The number of workers to use for this task. Defaults to N=5. |
| `--verbose` | Print additional information while task is processing. |
| `--dry_run` | Print expected results only, without performing any actions. |

### `tootctl feeds clear` {#feeds-clear}

Remove all home and list feeds from Redis.

**Version history:**
* 2.6.0 - added

## Media CLI {#media}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/media_cli.rb" caption="lib/mastodon/media\_cli.rb" >}}

### `tootctl media remove` {#media-remove}

Remove locally cached copies of media attachments from other servers.

**Version history:**
* 2.5.0 - added
* 2.6.2 - show freed disk space

| Option | Description |
| :--- | :--- |
| `--days` | How old media attachments have to be before they are removed. Defaults to 7. |
| `--concurrency N` | The number of workers to use for this task. Defaults to 5. |
| `--verbose` | Print additional information while task is processing. |
| `--dry_run` | Print expected results only, without performing any actions. |

### `tootctl media remove-orphans` {#media-remove-orphans}

Scans for files that do not belong to existing media attachments, and remove them. Please mind that some storage providers charge for the necessary API requests to list objects. Also, this operation requires iterating over every single file individually, so it will be slow.

**Version history:**
* 3.1.0 - added

| Option | Description |
| :--- | :--- |
| `--start_after` | The Paperclip attachment key where the loop will start. Use this option if the command was interrupted before. |
| `--dry_run` | Print expected results only, without performing any actions. |

### `tootctl media refresh` {#media-refresh}

Refetch remote media attachments from other servers. You must specify the source of media attachments with either --status, --account, or --domain. If an attachment already exists in the database, it will not be overwritten unless you use --force.

**Version history:**
* 3.0.0 - added
* 3.0.1 - add `--force` and skip already downloaded attachments by default

| Option | Description |
| :--- | :--- |
| `--account ACCT` | String `username@domain` handle of the account |
| `--domain DOMAIN` | FQDN string |
| `--status ID` | Local numeric ID of the status in the database. |
| `--concurrency N` | The number of workers to use for this task. Defaults to 5. |
| `--verbose` | Print additional information while task is processing.  |
| `--dry_run` | Print expected results only, without performing any actions. |
| `--force` | Force redownload the remote resource and overwrite the local attachment. |

### `tootctl media usage` {#media-usage}

Calculate disk space consumed by Mastodon.

**Version history:**
* 3.0.1 - added

### `tootctl media lookup` {#media-lookup}

Prompts for a media URL, then looks up where the media is displayed.

**Version history:**
* 3.1.0 - added

## Preview Cards CLI {#preview_cards}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/preview_cards_cli.rb" caption="lib/mastodon/preview\_cards\_cli.rb" >}}

### `tootctl preview_cards remove` {#preview_cards-remove}

Remove local thumbnails for preview cards.

**Version history:**
* 3.0.0 - added

| Option | Description |
| :--- | :--- |
| `--days` | How old media attachments have to be before they are removed. Defaults to 180. \(NOTE: it is not recommended to delete preview cards within the last 14 days, because preview cards will not be refetched unless the link is reposted after 2 weeks from last time.\) |
| `--concurrency N` | The number of workers to use for this task. Defaults to 5. |
| `--verbose` | Print additional information while task is processing. |
| `--dry_run` | Print expected results only, without performing any actions. |
| `--link` | Only delete link-type preview cards; leave video and photo cards untouched. |

## Search CLI {#search}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/search_cli.rb" caption="lib/mastodon/search\_cli.rb" >}}

### `tootctl search deploy` {#search-deploy}

Create or update an ElasticSearch index and populate it. If ElasticSearch is empty, this command will create the necessary indices and then import data from the database into those indices. This command will also upgrade indices if the underlying schema has been changed since the last run.

**Version history:**
* 2.8.0 - added
* 3.0.0 - add `--processes` for parallelization

| Option | Description |
| :--- | :--- |
| `--processes N` | Parallelize execution of the command. Defaults to N=2. Can also specify `auto` to derive a number based on available CPUs. |

## Settings CLI {#settings}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/settings_cli.rb" caption="lib/mastodon/settings\_cli.rb" >}}

### `tootctl settings registrations open` {#settings-registrations-open}

Opens registrations.

**Version history:**
* 2.6.0 - added

### `tootctl settings registrations close` {#settings-registrations-close}

Closes registrations.

**Version history:**
* 2.6.0 - added

## Statuses CLI {#statuses}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/statuses_cli.rb" caption="lib/mastodon/statuses\_cli.rb" >}}

### `tootctl statuses remove` {#statuses-remove}

Remove unreferenced statuses from the database, such as statuses that came from relays or from users who are no longer followed by any local accounts, and have not been replied to or otherwise interacted with.

This is a computationally heavy procedure that creates extra database indices before commencing, and removes them afterward.

**Version history:**
* 2.8.0 - added

| Option | Description |
| :--- | :--- |
| `--days` | How old statuses have to be before they are removed. Defaults to 90. |

