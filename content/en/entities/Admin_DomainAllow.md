---
title: Admin::DomainAllow
description: Represents a domain allowed to federate.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
	"id": "1",
	"domain": "mastodon.social",
	"created_at": "2022-09-14T21:23:02.755Z"
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the DomainAllow in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
3.6.0 - added

### `domain` {#domain}

**Description:** The domain that is allowed to federate.\
**Type:** String\
**Version history:**\
3.6.0 - added

### `created_at` {#created_at}

**Description:** When the domain was allowed to federate.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.6.0 - added

## See also

{{< page-relref page="methods/admin/domain_allows" caption="/api/v1/admin/domain_allows" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/main/app/serializers/rest/admin/domain_allows_serializer.rb" caption="app/serializers/rest/admin/domain_allows_serializer.rb" >}}