---
title: FeaturedTag
description: Represents a hashtag that is featured on a profile.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/featuredtag",
	"/entities/FeaturedTag",
  "/api/entities/featuredtag",
	"/api/entities/FeaturedTag",
]
---

## Example

```json
{
  "id": "627",
  "name": "nowplaying",
  "url": "https://mastodon.social/@trwnh/tagged/nowplaying",
  "statuses_count": "70",
  "last_status_at": "2022-08-29T12:03:35.061Z"
}
```

## Attributes

### `id` {#id}

**Description:** The internal ID of the featured tag in the database.\
**Type:** String (cast from integer but not guaranteed to be a number)\
**Version history:**\
3.0.0 - added

### `name` {#name}

**Description:** The name of the hashtag being featured.\
**Type:** String\
**Version history:**\
3.0.0 - added

### `url` {#url}

**Description:** A link to all statuses by a user that contain this hashtag.\
**Type:** String (URL)\
**Version history:**\
3.3.0 - added

### `statuses_count` {#statuses_count}

**Description:** The number of authored statuses containing this hashtag.\
**Type:** String\
**Version history:**\
3.0.0 - added

### `last_status_at` {#last_status_at}

**Description:** The date of the last authored status containing this hashtag.\
**Type:** String ([Date](/api/datetime-format#date))\
**Version history:**\
3.0.0 - added

## See also

{{< page-relref ref="methods/featured_tags" caption="featured_tags API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/featured_tag_serializer.rb" caption="app/serializers/rest/featured_tag_serializer.rb" >}}





