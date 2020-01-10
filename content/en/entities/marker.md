---
title: Marker
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "home": {
    "last_read_id": "103194548672408537",
    "version": 462,
    "updated_at": "2019-11-24T19:39:39.337Z"
  },
  "notifications": {
    "last_read_id": "35050107",
    "version": 356,
    "updated_at": "2019-11-25T13:47:31.333Z"
  }
}
```

## Base attributes

### `home` <a id="home"></a>

**Description:** Information about the user's position in the home timeline.
**Type:** Hash
**Version history:** Added in 3.0.0

### `notifications` <a id="notifications"></a>

**Description:** Information about the user's position in their notifications.
**Type:** Hash
**Version history:** Added in 3.0.0

## Nested attributes

### `last_read_id` <a id="last_read_id"></a>

**Description:** The ID of the most recently viewed entity.
**Type:** String \(cast from integer but not guaranteed to be a number\)
**Version history:** Added in 3.0.0

### `updated_at` <a id="updated_at"></a>

**Description:** The timestamp of when the marker was set.
**Type:** String \(ISO 8601 Datetime\)
**Version history:** Added in 3.0.0

### `version` <a id="version"></a>

**Description:** Used for locking to prevent write conflicts.
**Type:** Number
**Version history:** Added in 3.0.0

## See also

{{< page-ref page="methods/timelines/markers.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/marker_serializer.rb" caption="app/serializers/rest/marker\_serializer.rb" >}}



