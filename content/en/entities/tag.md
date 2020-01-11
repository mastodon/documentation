---
title: Tag
description: Represents a hashtag used within the content of a status.
menu:
  docs:
    parent: entities
---

## Example

```javascript
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
  ]
}
```

## Base attributes

### `name` {#name"}

**Description:** The value of the hashtag after the \# sign.\
**Type:** String\
**Version history:** Added in 0.9.0

### `url` {#url"}

**Description:** A link to the hashtag on the instance.\
**Type:** String \(URL\)\
**Version history:** Added in 0.9.0

## Optional attributes

### `history` {#history"}

**Description:** Usage statistics for given days.\
**Type:** Array of [History]({{< relref "history.md" >}})\
**Version history:** Added in 2.4.1

## See also

* [Status\#tags](status.md#tags)
* [GET /api/v1/featured\_tags/suggestions](../methods/accounts/featured_tags.md#suggested-tags-to-feature)

{{< page-ref page="status.md" >}}

{{< page-ref page="methods/search.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/tag_serializer.rb" caption="app/serializers/rest/tag\_serializer.rb" >}}



