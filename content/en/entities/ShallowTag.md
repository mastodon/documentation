---
title: ShallowTag
description: Minimal representation of a hashtag.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/shallowtag",
  "/entities/ShallowTag",
  "/api/entities/shallowtag",
  "/api/entities/ShallowTag",
]
---

## Example

```json
{
  "name": "nowplaying",
  "url": "https://mastodon.social/tags/nowplaying"
}
```

## Attributes

### `name` {#name}

**Description:** The value of the hashtag after the # sign.\
**Type:** String\
**Version history:**\
4.6.0 - added

### `url` {#url}

**Description:** A link to the hashtag on the local server.\
**Type:** String (URL)\
**Version history:**\
4.6.0 - added

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/shallow_tag_serializer.rb" caption="app/serializers/rest/shallow_tag_serializer.rb" >}}
