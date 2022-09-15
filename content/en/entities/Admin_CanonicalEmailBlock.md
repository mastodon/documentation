---
title: Admin::CanonicalEmailBlock
description: Represents a canonical email block (hashed).
menu:
  docs:
    parent: entities
---

## Example

```javascript
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
3.6.0 - added

### `canonical_email_hash` {#canonical_email_hash}

**Description:** The SHA256 hash of the canonical email address.\
**Type:** String (SHA256)\
**Version history:**\
3.6.0 - added

## See also

{{< page-relref ref="methods/admin/canonical_email_blocks" caption="/api/v1/admin/canonical_email_blocks" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/main/app/serializers/rest/admin/canonical_email_block_serializer.rb" caption="app/serializers/rest/admin/canonical_email_block_serializer.rb" >}}