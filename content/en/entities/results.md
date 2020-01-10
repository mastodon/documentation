---
title: Results
description: Represents the results of a search.
menu:
  docs:
    parent: entities
---

## Example

{{< code title="Truncated sample search for q=cats limit=2" >}}
```javascript
{
  "accounts": [
    {
      "id": "180744",
      "username": "catstar",
      "acct": "catstar@catgram.jp",
      "display_name": "catstar",
      ...

    },
    {
      "id": "214293",
      "username": "catsareweird",
      "acct": "catsareweird",
      "display_name": "Cats Are Weird",
      ...

    }
  ],
  "statuses": [
    {
      "id": "103085519055545958",
      "created_at": "2019-11-05T13:23:09.000Z",
      ...

      "content": "<p>cats<br>cats never change</p>",
      ...

    },
    {
      "id": "101068121469614510",
      "created_at": "2018-11-14T06:31:48.000Z",
      ...

      "spoiler_text": "Cats",
      ...

      "content": "<p>Cats are inherently good at self-care. </p><p><a href=\"https://mspsocial.net/tags/cats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>cats</span></a></p>",
      ...

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
        ...

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
        ...

      ]
    }
  ]
}
```
{{< /code >}}

## Required attributes

### `accounts` <a id="accounts"></a>

**Description:** Accounts which match the given query\
**Type:** Array of [Account](account.md)\
**Version history:** Added in x.x.x

### `statuses` <a id="statuses"></a>

**Description:** Statuses which match the given query\
**Type:** Array of [Status](status.md)\
**Version history:** Added in x.x.x

### `hashtags` <a id="hashtags"></a>

**Description:** Hashtags which match the given query\
**Type:** Array of [Tag](tag.md) \(v2\). Array of String \(v1\).\
**Version history:** v1 added in 1.1.0 and deprecated in 3.0.0. v2 added in 2.4.1 and replaced v1 in 3.0.0.

## See also

{{< page-ref page="methods/search.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/search_serializer.rb" caption="app/serializers/rest/search\_serializer.rb" >}}



