---
title: List
description: Represents a list of some users that the authenticated user follows.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/list",
  "/entities/List",
  "/api/entities/list",
  "/api/entities/List",
]
---

## Example

```json
{
  "id": "12249",
  "title": "Friends"
}
```

## Attributes

### `id` {#id}

**Description:** The internal database ID of the list.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
2.1.0 - added

### `title` {#title}

**Description:** The user-defined title of the list.\
**Type:** String\
**Version history:**\
2.1.0 - added

### `replies_policy` {#replies_policy}

**Description:** Which replies should be shown in the list.\
**Type:** String (Enumerable oneOf)\
`followed` = Show replies to any followed user\
`list` = Show replies to members of the list\
`none` = Show replies to no one\
**Version history:**\
3.3.0 - added

## See also

{{< page-relref ref="methods/accounts#lists" caption="GET /api/v1/accounts/:id/lists" >}}

{{< page-relref ref="methods/lists" caption="lists API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/list_serializer.rb" caption="app/serializers/rest/list_serializer.rb" >}}



