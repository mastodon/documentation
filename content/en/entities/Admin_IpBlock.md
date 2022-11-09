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

{{< hint style="danger" >}}
This page is under construction.
{{< /hint >}}

## Example

<!-- TODO: sample response -->

```json

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
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

### `comment` {#comment}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

### `created_at` {#created_at}

**Description:** When the domain was allowed to federate.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

### `expires_at` {#expires_at}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

## See also

{{< page-relref page="methods/admin/ip_blocks" caption="admin/ip_blocks API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/ip_blocks_serializer.rb" caption="app/serializers/rest/admin/ip_blocks_serializer.rb" >}}