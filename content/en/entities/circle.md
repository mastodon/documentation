---
title: Circle
description: Represents a collection of some users that follow the authenticated user.
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

### `id` {#id}

**Description:** The internal database ID of the circle.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\

### `title` {#title}

**Description:** The user-defined title of the circle.\
**Type:** String\
**Version history:**\
2.1.0 - added

## See also

{{< page-ref page="methods/circles.md" >}}
