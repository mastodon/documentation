---
title: FeaturedTag
description: Represents a hashtag that is featured on a profile.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "id": "627",
  "name": "nowplaying",
  "statuses_count": 36,
  "last_status_at": "2019-11-15T07:14:43.524Z"
}
```

## Attributes

### `id` {#id}

**Description:** The internal ID of the featured tag in the database.\
**Type:** String \(cast from integer but not guaranteed to be a number\)\
**Version history:** Added in 3.0.0

### `name` {#name}

**Description:** The name of the hashtag being featured.\
**Type:** String\
**Version history:** Added in 3.0.0

### `url` {#url}

**Description:** A link to all statuses by a user that contain this hashtag.\
**Type:** String (URL)\
**Version history:** Added in 3.3.0

### `statuses_count` {#statuses_count}

**Description:** The number of authored statuses containing this hashtag.\
**Type:** Number\
**Version history:** Added in 3.0.0

### `last_status_at` {#last_status_at}

**Description:** The timestamp of the last authored status containing this hashtag.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:** Added in 3.0.0

## See also

{{< page-ref page="methods/accounts/featured_tags.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/featured_tag_serializer.rb" caption="app/serializers/rest/featured\_tag\_serializer.rb" >}}





