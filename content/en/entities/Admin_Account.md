---
title: Admin::Account
description: Admin-level information about a given account.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-account",
  "/entities/Admin-Account",
  "/entities/admin_account",
  "/entities/Admin_Account",
  "/api/entities/admin-account",
  "/api/entities/Admin-Account",
  "/api/entities/admin_account",
  "/api/entities/Admin_Account",
]
---

## Example

```json
{
  "id": "108965278956942133",
  "username": "admin",
  "domain": null,
  "created_at": "2022-09-08T23:03:26.762Z",
  "email": "admin@mastodon.local",
  "ip": "192.168.42.1",
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
  "ips": [
    {
      "ip": "192.168.42.1",
      "used_at": "2022-09-15T01:38:58.851Z"
    }
  ],
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
**Version history:**\
2.9.1 - added

### `username` {#username}

**Description:** The username of the account.\
**Type:** String\
**Version history:**\
2.9.1 - added

### `domain` {#domain}

**Description:** The domain of the account, if it is remote.\
**Type:** {{<nullable>}} String, or null for local accounts\
**Version history:**\
2.9.1 - added

### `created_at` {#created_at}

**Description:** When the account was first discovered.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
2.9.1 - added

### `email` {#email}

**Description:** The email address associated with the account.\
**Type:** String\
**Version history:**\
2.9.1 - added

### `ip` {#ip}

**Description:** The IP address last used to login to this account.\
**Type:** {{<nullable>}} String\
**Version history:**\
2.9.1 - added\
3.5.0 - return type changed from String to [Admin::Ip]({{< relref "entities/Admin_Ip" >}}) due to a bug\
4.0.0 - bug fixed, return type is now a String again

### `ips` {#ip}

**Description:** All known IP addresses associated with this account.\
**Type:** Array of [Admin::Ip]({{< relref "entities/Admin_Ip" >}})\
**Version history:**\
3.5.0 - added

### `locale` {#locale}

**Description:** The locale of the account.\
**Type:** String (well-formed BCP 47 language tag, but parts other than language subtag may be discarded)\
**Version history:**\
2.9.1 - added
4.1.0 - accept BCP 47

### `invite_request` {#invite_request}

**Description:** The reason given when requesting an invite (for instances that require manual approval of registrations)\
**Type:** {{<nullable>}} String\
**Version history:**\
2.9.1 - added

### `role` {#role}

**Description:** The current role of the account.\
**Type:** [Role]({{<relref "entities/role">}})\
**Version history:**\
2.9.1 - added, returns a String (enumerable, oneOf `user` `moderator` `admin`)\
4.0.0 - now uses Role entity

### `confirmed` {#confirmed}

**Description:** Whether the account has confirmed their email address.\
**Type:** Boolean\
**Version history:**\
2.9.1 - added

### `approved` {#approved}

**Description:** Whether the account is currently approved.\
**Type:** Boolean\
**Version history:**\
2.9.1 - added

### `disabled` {#disabled}

**Description:** Whether the account is currently disabled.\
**Type:** Boolean\
**Version history:**\
2.9.1 - added

### `silenced` {#silenced}

**Description:** Whether the account is currently silenced.
**Type:** Boolean\
**Version history:**\
2.9.1 - added

### `suspended` {#suspended}

**Description:** Whether the account is currently suspended.\
**Type:** Boolean\
**Version history:**\
2.9.1 - added

### `account` {#account}

**Description:** User-level information about the account.\
**Type:** [Account]({{< relref "entities/account" >}})\
**Version history:**\
2.9.1 - added

### `created_by_application_id` {{%optional%}} {#created_by_application_id}

**Description:** The ID of the [Application]({{< relref "entities/application" >}}) that created this account, if applicable.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
2.9.1 - added

### `invited_by_account_id` {{%optional%}} {#invited_by_account_id}

**Description:** The ID of the [Account]({{< relref "entities/account" >}}) that invited this user, if applicable.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
2.9.1 - added

## See also

{{< page-relref ref="methods/admin/accounts" caption="admin/accounts API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/account_serializer.rb" caption="app/serializers/rest/admin/account_serializer.rb" >}}