---
title: Announcement
description: Represents an announcement set by an administrator.
menu:
  docs:
    parent: entities
---

## Example
```javascript
{
  "id": "8",
  "text": "<p>Looks like there was an issue processing audio attachments without embedded art since yesterday due to an experimental new feature. That issue has now been fixed, so you may see older posts with audio from other servers pop up in your feeds now as they are being finally properly processed. Sorry!</p>",
  "is_published": false,
  "starts_at": null,
  "ends_at": null,
  "all_day": false,
  "created_at": "2020-07-03T01:27:38.726Z",
  "updated_at": "2020-07-03T01:27:38.752Z",
  "read": true,
  "reactions": [
    {
      "name": "bongoCat",
      "count": 9,
      "me": false,
      "url": "https://files.mastodon.social/custom_emojis/images/000/067/715/original/fdba57dff7576d53.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/067/715/static/fdba57dff7576d53.png"
    },
    {
      "name": "thonking",
      "count": 1,
      "me": false,
      "url": "https://files.mastodon.social/custom_emojis/images/000/098/690/original/a8d36edc4a7032e8.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/098/690/static/a8d36edc4a7032e8.png"
    },
    {
      "name": "AAAAAA",
      "count": 1,
      "me": false,
      "url": "https://files.mastodon.social/custom_emojis/images/000/071/387/original/AAAAAA.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/071/387/static/AAAAAA.png"
    },
    {
      "name": "🤔",
      "count": 1,
      "me": true
    }
  ]
}
```

## Base attributes

### `id`

**Description:** The announcement id.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:**\
3.1.0 - added

### `text`

**Description:** The content of the announcement.\
**Type:** String\
**Version history:**\
3.1.0 - added

### `published`

**Description:** Whether the announcement is currently active.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `all_day` {#all_day}

**Description:** Whether the announcement has a start/end time.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `created_at` {#created_at}

**Description:** When the announcement was created.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added

### `updated_at` {#updated_at}

**Description:** When the announcement was last updated.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added

### `read`

**Description:** Whether the announcement has been read by the user.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `reactions`

**Description:** Emoji reactions attached to the announcement.\
**Type:** Array of AnnouncementReaction\
**Version history:**\
3.1.0 - added


## Optional attributes

### `scheduled_at` {#scheduled_at}

**Description:** When the future announcement was scheduled.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added

### `starts_at` {#starts_at}

**Description:** When the future announcement will start.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added

### `ends_at` {#ends_at}

**Description:** When the future announcement will end.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added
