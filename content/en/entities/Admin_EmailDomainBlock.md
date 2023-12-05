---
title: Admin::EmailDomainBlock
description: Represents an email domain that cannot be used to sign up.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-emaildomainblock",
  "/entities/Admin-EmailDomainBlock",
  "/entities/admin_emaildomainblock",
  "/entities/Admin_EmailDomainBlock",
  "/api/entities/admin-emaildomainblock",
  "/api/entities/Admin-EmailDomainBlock",
  "/api/entities/admin_emaildomainblock",
  "/api/entities/Admin_EmailDomainBlock",
]
---

## Example

```json
{
  "id": "1",
  "domain": "foo",
  "created_at": "2022-11-16T06:09:36.176Z",
  "history": [
    {
      "day": "1668556800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668470400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668384000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668297600",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668211200",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668124800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668038400",
      "accounts": "0",
      "uses": "0"
    }
  ]
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the EmailDomainBlock in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.0.0 - added

### `domain` {#domain}

**Description:** The email domain that is not allowed to be used for signups.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `created_at` {#created_at}

**Description:** When the email domain was disallowed from signups.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

### `history` {#history}

**Description:** Usage statistics for given days (typically the past week).\
**Type:** Array of Hash\
**Version history:**\
4.0.0 - added

#### `history[][day]` {#history-day}

**Description:** UNIX timestamp on midnight of the given day.\
**Type:** String (UNIX timestamp)\
**Version history:**\
4.0.0 - added

#### `history[][accounts]` {#history-accounts}

**Description:** The counted accounts signup attempts using that email domain within that day.\
**Type:** String (cast from an integer)\
**Version history:**\
4.0.0 - added

#### `history[][uses]` {#history-uses}

**Description:** The counted IP signup attempts of that email domain within that day.\
**Type:** String (cast from an integer)\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref page="methods/admin/email_domain_blocks" caption="admin/email_domain_blocks API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/email_domain_block_serializer.rb" caption="app/serializers/rest/admin/email_domain_block_serializer.rb" >}}