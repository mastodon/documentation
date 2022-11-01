---
title: Statuses Configuration
description: Instance configuration options for statuses
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "statuses": {
    "max_characters": 500,
    "max_media_attachments": 4,
    "characters_reserved_per_url": 23
  },
}
```

## Required attributes

### `max_characters` {#max_characters}

**Description:** Maximum permitted number of characters in a status.\
**Type:** Number\
**Version history:** Added in 3.5.0

### `max_media_attachments` {#max_media_attachments}

**Description:** Maximum permitted number of media attachments per status.\
**Type:** Number\
**Version history:** Added in 3.5.0

### `characters_reserved_per_url` {#characters_reserved_per_url}

**Description:** How many characters each URL reserves in a status.\
**Type:** Number\
**Version history:** Added in 3.5.0

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance\_serializer.rb" >}}





