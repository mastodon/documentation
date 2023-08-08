---
title: Reaction
description: Represents an emoji reaction to an Announcement.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/announcementreaction",
  "/entities/AnnouncementReaction",
  "/entities/reaction",
  "/entities/Reaction",
  "/api/entities/announcementreaction",
  "/api/entities/AnnouncementReaction",
  "/api/entities/reaction",
  "/api/entities/Reaction",
]
---

## Example

```json
[
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
]
```

## Attributes

### `name` {#name}

**Description:** The emoji used for the reaction. Either a unicode emoji, or a custom emoji's shortcode.\
**Type:** String\
**Version history:**\
3.1.0 - added

### `count` {#count}

**Description:** The total number of users who have added this reaction.\
**Type:** Integer\
**Version history:**\
3.1.0 - added

### `me` {{%optional%}} {#me}

**Description:** If there is a currently authorized user: Have you added this reaction?\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `url` {{%optional%}} {#url}

**Description:** If the reaction is a custom emoji: A link to the custom emoji.\
**Type:** String (URL)\
**Version history:**\
3.1.0 - added

### `static_url` {{%optional%}} {#static_url}

**Description:** If the reaction is a custom emoji: A link to a non-animated version of the custom emoji.\
**Type:** String (URL)\
**Version history:**\
3.1.0 - added

## See also

{{< page-relref ref="methods/announcements#put-reactions" caption="Add a reaction to an announcement" >}}

{{< page-relref ref="methods/announcements#delete-reactions" caption="Delete a reaction from an announcement" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/reaction_serializer.rb" caption="app/serializers/rest/reaction_serializer.rb" >}}