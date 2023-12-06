---
title: Admin::DomainAllow
description: Represents a domain allowed to federate.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-domainallow",
  "/entities/Admin-DomainAllow",
  "/entities/admin_domainallow",
  "/entities/Admin_DomainAllow",
  "/api/entities/admin-domainallow",
  "/api/entities/Admin-DomainAllow",
  "/api/entities/admin_domainallow",
  "/api/entities/Admin_DomainAllow",
]
---

## Example

```json
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
4.0.0 - added

### `domain` {#domain}

**Description:** The domain that is allowed to federate.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `created_at` {#created_at}

**Description:** When the domain was allowed to federate.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref page="methods/admin/domain_allows" caption="admin/domain_allows API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/domain_allow_serializer.rb" caption="app/serializers/rest/admin/domain_allow_serializer.rb" >}}