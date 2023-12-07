---
title: Admin::IpBlock
description: Represents an IP address range that cannot be used to sign up.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-ipblock",
  "/entities/Admin-IpBlock",
  "/entities/admin_ipblock",
  "/entities/Admin_IpBlock",
  "/api/entities/admin-ipblock",
  "/api/entities/Admin-IpBlock",
  "/api/entities/admin_ipblock",
  "/api/entities/Admin_IpBlock",
]
---

## Example

```json
{
  "id": "1",
  "ip": "8.8.8.8/32",
  "severity": "no_access",
  "comment": "",
  "created_at": "2022-11-16T07:22:00.501Z",
  "expires_at": null
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the DomainBlock in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.0.0 - added

### `ip` {#ip}

**Description:** The IP address range that is not allowed to federate.\
**Type:** String (IP address and prefix)\
**Version history:**\
4.0.0 - added

### `severity` {#severity}

**Description:** The associated policy with this IP block.\
**Type:** String (Enumerable, oneOf)\
`sign_up_requires_approval` = Any signup from this IP range will create a pending account\
`sign_up_block` = Any signup from this IP range will be rejected\
`no_access` = Any activity from this IP range will be rejected entirely\
**Version history:**\
4.0.0 - added

### `comment` {#comment}

**Description:** The recorded reason for this IP block.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `created_at` {#created_at}

**Description:** When the IP block was created.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

### `expires_at` {#expires_at}

**Description:** When the IP block will expire.\
**Type:** {{<nullable>}} String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref page="methods/admin/ip_blocks" caption="admin/ip_blocks API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/ip_block_serializer.rb" caption="app/serializers/rest/admin/ip_block_serializer.rb" >}}