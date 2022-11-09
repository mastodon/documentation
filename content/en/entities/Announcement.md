---
title: Announcement
description: Represents an announcement set by an administrator.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/announcement",
	"/entities/Announcement",
  "/api/entities/announcement",
	"/api/entities/Announcement",
]
---

## Example
```json
{
  "id": "8",
  "content": "<p>Looks like there was an issue processing audio attachments without embedded art since yesterday due to an experimental new feature. That issue has now been fixed, so you may see older posts with audio from other servers pop up in your feeds now as they are being finally properly processed. Sorry!</p>",
  "starts_at": null,
  "ends_at": null,
  "all_day": false,
  "published_at": "2020-07-03T01:27:38.726Z",
  "updated_at": "2020-07-03T01:27:38.752Z",
  "read": true,
  "mentions": [],
  "statuses": [],
  "tags": [],
  "emojis": [],
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

## Attributes

### `id` {#id}

**Description:** The ID of the announcement in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
3.1.0 - added

### `content` {#content}

**Description:** The text of the announcement.\
**Type:** String (HTML)\
**Version history:**\
3.1.0 - added

### `starts_at` {#starts_at}

**Description:** When the announcement will start.\
**Type:** {{<nullable>}} String (ISO 8601 Datetime) or null\
**Version history:**\
3.1.0 - added

### `ends_at` {#ends_at}

**Description:** When the announcement will end.\
**Type:** {{<nullable>}} String (ISO 8601 Datetime) or null\
**Version history:**\
3.1.0 - added

### `published` {#published}

**Description:** Whether the announcement is currently active.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `all_day` {#all_day}

**Description:** Whether the announcement should start and end on dates only instead of datetimes. Will be false if there is no `starts_at` or `ends_at` time.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `published_at` {#created_at}

**Description:** When the announcement was published.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.1.0 - added

### `updated_at` {#updated_at}

**Description:** When the announcement was last updated.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.1.0 - added

### `read` {{%optional%}} {#read}

**Description:** Whether the announcement has been read by the current user.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `mentions` {#mentions}

**Description:** Accounts mentioned in the announcement text.\
**Type:** Array of [Announcement::Account](#Account)\
**Version history:**\
3.1.0 - added

### `statuses` {#statuses}

**Description:** Statuses linked in the announcement text.\
**Type:** Array of [Announcement::Status](#Status)\
**Version history:**\
3.1.0 - added

### `tags` {#tags}

**Description:** Tags linked in the announcement text.\
**Type:** Array of [Status::Tag]({{< relref "entities/Status#Tag" >}})\
**Version history:**\
3.1.0 - added

### `emojis` {#emojis}

**Description:** Custom emoji used in the announcement text.\
**Type:** Array of [CustomEmoji]({{< relref "entities/CustomEmoji" >}})\
**Version history:**\
3.1.0 - added

### `reactions` {#reactions}

**Description:** Emoji reactions attached to the announcement.\
**Type:** Array of [Reaction]({{< relref "entities/Reaction" >}})\
**Version history:**\
3.1.0 - added

## Announcement::Account attributes {#Account}

### `id` {#Account-id}

**Description:** The account ID of the mentioned user.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
3.1.0 - added

### `username` {#Account-username}

**Description:** The username of the mentioned user.\
**Type:** String\
**Version history:**\
3.1.0 - added

### `url` {#Account-url}

**Description:** The location of the mentioned user's profile.\
**Type:** String (URL)\
**Version history:**\
3.1.0 - added

### `acct` {#Account-acct}

**Description:** The webfinger acct: URI of the mentioned user. Equivalent to `username` for local users, or `username@domain` for remote users.\
**Type:** String\
**Version history:**\
3.1.0 - added

## Announcement::Status attributes {#Status}

### `id` {#Status-id}

**Description:** The ID of an attached Status in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
3.1.0 - added

### `url` {#Status-url}

**Description:** The URL of an attached Status.\
**Type:** String (URL)\
**Version history:**\
3.1.0 - added

## See also

{{< page-relref ref="methods/announcements" caption="announcements API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/announcement_serializer.rb" caption="app/serializers/rest/announcement_serializer.rb" >}}