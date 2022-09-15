---
title: Admin::Account
description: Admin-level information about a given account.
menu:
  docs:
    parent: entities
aliases: [/entities/admin-account/]
---

## Example

```javascript
{
  "id": "108965278956942133",
  "username": "admin",
  "domain": null,
  "created_at": "2022-09-08T23:03:26.762Z",
  "email": "admin@mastodon.local",
  "ip": null,
  "role": {
    "id": 3,
    "name": "Owner",
    "color": "",
    "position": 1000,
    "permissions": 1,
    "highlighted": true,
    "created_at": "2022-09-08T22:48:07.983Z",
    "updated_at": "2022-09-08T22:48:07.983Z"
  },
  "confirmed": true,
  "suspended": false,
  "silenced": false,
  "disabled": false,
  "approved": true,
  "locale": null,
  "invite_request": null,
  "ips": [],
  "account": {
    "id": "108965278956942133",
    "username": "admin",
    "acct": "admin",
    "display_name": "",
    "locked": false,
    "bot": false,
    "discoverable": null,
    "group": false,
    "created_at": "2022-09-08T00:00:00.000Z",
    "note": "",
    "url": "http://mastodon.local/@admin",
    "avatar": "http://mastodon.local/avatars/original/missing.png",
    "avatar_static": "http://mastodon.local/avatars/original/missing.png",
    "header": "http://mastodon.local/headers/original/missing.png",
    "header_static": "http://mastodon.local/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 0,
    "last_status_at": null,
    "emojis": [],
    "fields": []
  }
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the account in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:** Added in 2.9.1

### `username` {#username}

**Description:** The username of the account.\
**Type:** String\
**Version history:** Added in 2.9.1

### `domain` {#domain}

**Description:** The domain of the account.\
**Type:** String\
**Version history:** Added in 2.9.1

### `created_at` {#created_at}

**Description:** When the account was first discovered.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:** Added in 2.9.1

### `email` {#email}

**Description:** The email address associated with the account.\
**Type:** String\
**Version history:** Added in 2.9.1

### `ip` {#ip}

**Description:** The IP address last used to login to this account.\
**Type:** String\
**Version history:** Added in 2.9.1

### `locale` {#locale}

**Description:** The locale of the account.\
**Type:** String \(ISO 639 Part 1 two-letter language code\)\
**Version history:** Added in 2.9.1

### `invite_request` {#invite_request}

**Description:** Invite request text ???\
**Type:** String\
**Version history:** Added in 2.9.1

## State attributes

### `role` {#role}

**Description:** The current role of the account.\
**Type:** [Role]({{<relref "entities/role">}})\
**Version history:**\
2.9.1 - added, can be `user` `moderator` or `admin`
3.6.0 - now uses Role entity

### `confirmed` {#confirmed}

**Description:** Whether the account has confirmed their email address.\
**Type:** Boolean\
**Version history:** Added in 2.9.1

### `approved` {#approved}

**Description:** Whether the account is currently approved.\
**Type:** Boolean\
**Version history:** Added in 2.9.1

### `disabled` {#disabled}

**Description:** Whether the account is currently disabled.\
**Type:** Boolean\
**Version history:** Added in 2.9.1

### `silenced` {#silenced}

**Description:** Whether the account is currently silenced.
**Type:** Boolean\
**Version history:** Added in 2.9.1

### `suspended` {#suspended}

**Description:** Whether the account is currently suspended.\
**Type:** Boolean\
**Version history:** Added in 2.9.1

### `account` {#account}

**Description:** User-level information about the account.\
**Type:** Account\
**Version history:** Added in 2.9.1

## Nullable attributes

### `created_by_application_id` {#created_by_application_id}

**Description:** The ID of the application that created this account.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:** Added in 2.9.1

### `invited_by_account_id` {#invited_by_account_id}

**Description:** The ID of the account that invited this user\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:** Added in 2.9.1

## See also

{{< page-ref page="methods/admin.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/admin/account_serializer.rb" caption="app/serializers/rest/admin/account\_serializer.rb" >}}



