---
title: List
description: Represents a list of some users that the authenticated user follows.
menu:
  docs:
    parent: entities
---

## Example

```javascript
  {
    "id": "12249",
    "title": "Friends"
  }
```

## Required attributes

### `id`

**Description:** The internal database ID of the list.
**Type:** String \(cast from an integer, but not guaranteed to be a number\)
**Version history:** Added in 2.1.0

### `title`

**Description:** The user-defined title of the list.
**Type:** String
**Version history:** Added in 2.1.0

## See also

{{< page-ref page="methods/timelines/lists.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/list_serializer.rb" caption="app/serializers/rest/list\_serializer.rb" >}}



