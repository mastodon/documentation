---
title: FilterStatus
description: Represents a status ID that, if matched, should cause the filter action to be taken.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/filterstatus",
	"/entities/FilterStatus",
	"/api/entities/filterstatus",
	"/api/entities/FilterStatus",
]
---

## Example

```json
{
	"id": "1",
	"status_id": "109031743575371913"
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the FilterStatus in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.0.0 - added

### `status_id` {#keyword}

**Description:** The ID of the Status that will be filtered.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="api/guidelines#filters" caption="Implementation guidelines for filters" >}}

{{< page-relref ref="methods/filters" caption="/api/v2/filters methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/filter_status_serializer.rb" caption="app/serializers/rest/filter_status_serializer.rb" >}}