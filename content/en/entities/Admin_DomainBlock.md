---
title: Admin::DomainBlock
description: Represents a domain limited from federating.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-domainblock",
  "/entities/Admin-DomainBlock",
  "/entities/admin_domainblock",
  "/entities/Admin_DomainBlock",
  "/api/entities/admin-domainblock",
  "/api/entities/Admin-DomainBlock",
  "/api/entities/admin_domainblock",
  "/api/entities/Admin_DomainBlock",
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

### `domain` {#domain}

**Description:** The domain that is not allowed to federate.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `created_at` {#created_at}

**Description:** When the domain was allowed to federate.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

### `severity` {#severity}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

### `reject_media` {#reject_media}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

### `reject_reports` {#reject_reports}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

### `private_comment` {#private_comment}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

### `public_comment` {#public_comment}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

### `obfuscate` {#obfuscate}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

## See also

{{< page-relref page="methods/admin/domain_blocks" caption="admin/domain_blocks API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/domain_blocks_serializer.rb" caption="app/serializers/rest/admin/domain_blocks_serializer.rb" >}}