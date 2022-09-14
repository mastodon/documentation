---
title: AnnouncementReaction
description: Represents an emoji reaction to an Announcement.
menu:
  docs:
    parent: entities
---

## Example
```javascript
{
  "name": "bongoCat",
  "count": 9,
  "me": false,
  "url": "https://files.mastodon.social/custom_emojis/images/000/067/715/original/fdba57dff7576d53.png",
  "static_url": "https://files.mastodon.social/custom_emojis/images/000/067/715/static/fdba57dff7576d53.png"
},
{
  "name": "🤔",
  "count": 1,
  "me": true
}
```

## Base attributes

### `name`

**Description:** The emoji used for the reaction. Either a unicode emoji, or a custom emoji's shortcode.\
**Type:** String\
**Version history:**\
3.1.0 - added

### `count`

**Description:** The total number of users who have added this reaction.\
**Type:** Number\
**Version history:**\
3.1.0 - added

### `me`

**Description:** Whether the authorized user has added this reaction to the announcement.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

## Custom emoji attributes

### `url`

**Description:** A link to the custom emoji.\
**Type:** String \(URL\)\
**Version history:**\
3.1.0 - added

### `static_url` {#static_url}

**Description:** A link to a non-animated version of the custom emoji.\
**Type:** String \(URL\)\
**Version history:**\
3.1.0 - added