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

## Example

```json
{
  "id": "1",
  "domain": "example.com",
  "digest": "a379a6f6eeafb9a55e378c118034e2751e682fab9f2d30ab13d2125586ce1947",
  "created_at": "2022-11-16T08:15:34.238Z",
  "severity": "noop",
  "reject_media": false,
  "reject_reports": false,
  "private_comment": null,
  "public_comment": null,
  "obfuscate": false
}
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

### `digest` {#digest}

**Description:** The sha256 hex digest of the domain that is not allowed to federated.\
**Type:** String\
**Version history:**\
4.3.0 - added

### `created_at` {#created_at}

**Description:** When the domain was blocked from federating.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

### `severity` {#severity}

**Description:** The policy to be applied by this domain block.\
**Type:** String (Enumerable oneOf)\
`silence` = Account statuses from this domain will be hidden by default\
`suspend` = All incoming data from this domain will be rejected\
`noop` = Do nothing. Allows for rejecting media or reports\
**Version history:**\
4.0.0 - added

### `reject_media` {#reject_media}

**Description:** Whether to reject media attachments from this domain\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

### `reject_reports` {#reject_reports}

**Description:** Whether to reject reports from this domain\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

### `private_comment` {#private_comment}

**Description:** \
**Type:** {{<nullable>}} String\
**Version history:**\
4.0.0 - added

### `public_comment` {#public_comment}

**Description:** \
**Type:** {{<nullable>}} String\
**Version history:**\
4.0.0 - added

### `obfuscate` {#obfuscate}

**Description:** Whether to obfuscate public displays of this domain block\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref page="methods/admin/domain_blocks" caption="admin/domain_blocks API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/domain_block_serializer.rb" caption="app/serializers/rest/admin/domain_block_serializer.rb" >}}
