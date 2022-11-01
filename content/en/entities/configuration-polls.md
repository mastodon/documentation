---
title: Polls Configuration
description: Instance configuration options for polls
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "polls": {
    "max_options": 4,
    "max_characters_per_option": 50,
    "min_expiration": 300,
    "max_expiration": 2629746
  }
}
```

## Required attributes

### `max_options` {#max_options}

**Description:** Maximum permitted number of options in a poll.\
**Type:** Number\
**Version history:** Added in 3.5.0

### `max_characters_per_option` {#max_characters_per_option}

**Description:** Maximum permitted characters per poll option.\
**Type:** Number\
**Version history:** Added in 3.5.0

### `min_expiration` {#min_expiration}

**Description:** The shortest permitted poll expiration time in seconds.\
**Type:** Number\
**Version history:** Added in 3.5.0

### `max_expiration` {#max_expiration}

**Description:** The longest permitted poll expiration time in seconds.\
**Type:** Number\
**Version history:** Added in 3.5.0

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance\_serializer.rb" >}}





