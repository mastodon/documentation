---
title: Tag
description: Represents a hashtag used within the content of a status.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/tag",
  "/entities/Tag",
  "/api/entities/tag",
  "/api/entities/Tag",
]
---

## Example

```json
{
  "name": "nowplaying",
  "url": "https://mastodon.social/tags/nowplaying",
  "history": [
    {
      "day": "1574553600",
      "uses": "200",
      "accounts": "31"
    },
    {
      "day": "1574467200",
      "uses": "272",
      "accounts": "39"
    },
    {
      "day": "1574380800",
      "uses": "345",
      "accounts": "40"
    },
    {
      "day": "1574294400",
      "uses": "366",
      "accounts": "46"
    },
    {
      "day": "1574208000",
      "uses": "226",
      "accounts": "32"
    },
    {
      "day": "1574121600",
      "uses": "217",
      "accounts": "42"
    },
    {
      "day": "1574035200",
      "uses": "214",
      "accounts": "34"
    }
  ],
  "following": false
}
```

## Attributes

### `name` {#name}

**Description:** The value of the hashtag after the \# sign.\
**Type:** String\
**Version history:**\
0.9.0 - added

### `url` {#url}

**Description:** A link to the hashtag on the instance.\
**Type:** String (URL)\
**Version history:**\
0.9.0 - added

### `history` {#history}

**Description:** Usage statistics for given days (typically the past week).\
**Type:** Array of Hash\
**Version history:**\
2.4.1 - added

#### `history[][day]` {#history-day}

**Description:** UNIX timestamp on midnight of the given day.\
**Type:** String (UNIX timestamp)\
**Version history:**\
2.4.1 - added

#### `history[][uses]` {#history-uses}

**Description:** The counted usage of the tag within that day.\
**Type:** String (cast from an integer)\
**Version history:**\
2.4.1 - added

#### `history[][accounts]` {#history-accounts}

**Description:** The total of accounts using the tag within that day.\
**Type:** String (cast from an integer)\
**Version history:**\
2.4.1 - added

### `following` {{%optional%}} {#following}

**Description:** Whether the current token's authorized user is following this tag.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="entities/Search#tags" caption="Search (`tags` attribute)" >}}

{{< page-relref ref="methods/tags" caption="tags API methods" >}}

<!--
TODO: This one may be replaced with FeaturedTag
https://github.com/mastodon/mastodon/pull/19221
-->
{{< page-relref ref="methods/featured_tags#suggestions" caption="GET /api/v1/featured_tags/suggestions" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/tag_serializer.rb" caption="app/serializers/rest/tag_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/tag.rb" caption="app/models/tag.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/trends/history.rb" caption="app/models/trends/history.rb" >}}