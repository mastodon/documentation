---
title: Search
description: Represents the results of a search.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/results",
  "/entities/Results",
  "/entities/search",
  "/entities/Search",
  "/api/entities/results",
  "/api/entities/Results",
  "/api/entities/search",
  "/api/entities/Search",
]
---

## Example

Truncated sample search for q=cats limit=2

```json
{
  "accounts": [
    {
      "id": "180744",
      "username": "catstar",
      "acct": "catstar@catgram.jp",
      "display_name": "catstar",
      // ...
    },
    {
      "id": "214293",
      "username": "catsareweird",
      "acct": "catsareweird",
      "display_name": "Cats Are Weird",
      // ...
    }
  ],
  "statuses": [
    {
      "id": "103085519055545958",
      "created_at": "2019-11-05T13:23:09.000Z",
      // ...
      "content": "<p>cats<br>cats never change</p>",
      // ...
    },
    {
      "id": "101068121469614510",
      "created_at": "2018-11-14T06:31:48.000Z",
      // ...
      "spoiler_text": "Cats",
      // ...
      "content": "<p>Cats are inherently good at self-care. </p><p><a href=\"https://mspsocial.net/tags/cats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>cats</span}</p>",
      // ...
    },
    // ...
  ],
  "hashtags": [
    {
      "name": "cats",
      "url": "https://mastodon.social/tags/cats",
      "history": [
        {
          "day": "1574553600",
          "uses": "10",
          "accounts": "9"
        },
        // ...
      ]
    },
    {
      "name": "catsofmastodon",
      "url": "https://mastodon.social/tags/catsofmastodon",
      "history": [
        {
          "day": "1574553600",
          "uses": "6",
          "accounts": "5"
        },
        // ...
      ]
    }
  ]
}
```

## Attributes

### `accounts` {#accounts}

**Description:** Accounts which match the given query\
**Type:** Array of [Account]({{< relref "entities/Account" >}})\
**Version history:**\
1.1.0 - added

### `statuses` {#statuses}

**Description:** Statuses which match the given query\
**Type:** Array of [Status]({{< relref "entities/Status" >}})\
**Version history:**\
1.1.0 - added

### `hashtags` {#hashtags}

**Description:** Hashtags which match the given query\
**Type:** Array of [Tag]({{< relref "entities/Tag" >}})\
**Version history:**\
1.1.0 - added\
2.4.1 - v1/search deprecated because it returns Array of String. v2/search added which returns Array of Tag.\
3.0.0 - v1 removed

## See also

{{< page-relref ref="methods/search" caption="search API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/search_serializer.rb" caption="app/serializers/rest/search_serializer.rb" >}}



