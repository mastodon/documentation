---
title: Marker
description: Represents the last read position within a user's timelines.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/marker",
  "/entities/Marker",
  "/api/entities/marker",
  "/api/entities/Marker",
]
---

## Example

```json
{
  "last_read_id": "103194548672408537",
  "version": 462,
  "updated_at": "2019-11-24T19:39:39.337Z"
}
```

## Attributes

### `last_read_id` {#last_read_id}

**Description:** The ID of the most recently viewed entity.\
**Type:** String (cast from integer but not guaranteed to be a number)\
3.0.0 - added

### `version` {#version}

**Description:** An incrementing counter, used for locking to prevent write conflicts.\
**Type:** Integer\
**Version history:**\
3.0.0 - added

### `updated_at` {#updated_at}

**Description:** The timestamp of when the marker was set.\
**Type:** String (ISO 8601 Datetime)\
3.0.0 - added

## See also

{{< page-relref ref="methods/markers" caption="markers API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/marker_serializer.rb" caption="app/serializers/rest/marker_serializer.rb" >}}



