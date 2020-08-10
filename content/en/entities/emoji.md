---
title: Emoji
description: Represents a custom emoji.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "shortcode": "blobaww",
  "url": "https://files.mastodon.social/custom_emojis/images/000/011/739/original/blobaww.png",
  "static_url": "https://files.mastodon.social/custom_emojis/images/000/011/739/static/blobaww.png",
  "visible_in_picker": true,
  "category": "Blobs"
}
```

## Required attributes

### `shortcode` {#shortcode}

**Description:** The name of the custom emoji.\
**Type:** String\
**Version history:** Added in 2.0.0

### `url` {#url}

**Description:** A link to the custom emoji.\
**Type:** String \(URL\)\
**Version history:** Added in 2.0.0

### `static_url` {#static_url}

**Description:** A link to a static copy of the custom emoji.\
**Type:** String \(URL\)\
**Version history:** Added in 2.0.0

### `visible_in_picker` {#visible_in_picker}

**Description:** Whether this Emoji should be visible in the picker or unlisted.\
**Type:** Boolean\
**Version history:** Added in 2.0.0

## Optional attributes

### `category` {#category}

**Description:** Used for sorting custom emoji in the picker.\
**Type:** String\
**Version history:** Added in 3.0.0

## See also

* [Status\#emojis]({{< relref "status.md#emojis" >}})

{{< page-ref page="status.md" >}}

{{< page-ref page="methods/instance/custom_emojis.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/custom_emoji_serializer.rb" caption="app/serializers/rest/custom\_emoji\_serializer.rb" >}}





