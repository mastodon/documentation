---
title: CustomEmoji
description: Represents a custom emoji.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/emoji",
  "/entities/Emoji",
	"/entities/customemoji",
  "/entities/CustomEmoji",
  "/api/entities/emoji",
  "/api/entities/Emoji",
	"/api/entities/customemoji",
  "/api/entities/CustomEmoji",
]
---

## Example

```json
{
  "shortcode": "blobaww",
  "url": "https://files.mastodon.social/custom_emojis/images/000/011/739/original/blobaww.png",
  "static_url": "https://files.mastodon.social/custom_emojis/images/000/011/739/static/blobaww.png",
  "visible_in_picker": true,
  "category": "Blobs"
}
```

## Attributes

### `shortcode` {#shortcode}

**Description:** The name of the custom emoji.\
**Type:** String\
**Version history:**\
2.0.0 - added

### `url` {#url}

**Description:** A link to the custom emoji.\
**Type:** String (URL)\
**Version history:**\
2.0.0 - added

### `static_url` {#static_url}

**Description:** A link to a static copy of the custom emoji.\
**Type:** String (URL)\
**Version history:**\
2.0.0 - added

### `visible_in_picker` {#visible_in_picker}

**Description:** Whether this Emoji should be visible in the picker or unlisted.\
**Type:** Boolean\
**Version history:**\
2.0.0 - added

### `category` {#category}

**Description:** Used for sorting custom emoji in the picker.\
**Type:** {{<nullable>}} String\
**Version history:**\
3.0.0 - added

## See also

{{< page-relref ref="methods/custom_emojis" caption="GET /api/v1/custom_emojis" >}}

{{< page-relref ref="entities/Status#emojis" caption="Status (`emojis` attribute)" >}}

{{< page-relref ref="entities/Announcement#emojis" caption="Announcement (`emojis` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/custom_emoji_serializer.rb" caption="app/serializers/rest/custom_emoji_serializer.rb" >}}





