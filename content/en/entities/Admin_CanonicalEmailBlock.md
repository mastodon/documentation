---
title: Admin::CanonicalEmailBlock
description: Represents a canonical email block (hashed).
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-canonicalemailblock",
  "/entities/Admin-CanonicalEmailBlock",
  "/entities/admin_canonicalemailblock",
  "/entities/Admin_CanonicalEmailBlock",
  "/api/entities/admin-canonicalemailblock",
  "/api/entities/Admin-CanonicalEmailBlock",
  "/api/entities/admin_canonicalemailblock",
  "/api/entities/Admin_CanonicalEmailBlock",
]
---

## Example

```json
{
	"id": "2",
	"canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the email block in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.0.0 - added

### `canonical_email_hash` {#canonical_email_hash}

**Description:** The SHA256 hash of the canonical email address.\
**Type:** String (SHA256)\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/admin/canonical_email_blocks" caption="admin/canonical_email_blocks API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/canonical_email_block_serializer.rb" caption="app/serializers/rest/admin/canonical_email_block_serializer.rb" >}}