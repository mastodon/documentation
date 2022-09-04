---
title: search
description: 'Search for content in accounts, statuses and hashtags.'
menu:
  docs:
    weight: 60
    parent: methods
---

# Perform a search {#v2}

```http
GET https://mastodon.example/api/v2/search HTTP/1.1
```

**Returns:** [Results]({{< relref "entities/results" >}})\
**OAuth:** User token + `read:search`\
**Version history:**\
2.4.1 - added, limit hardcoded to 5\
2.8.0 - add `type`, `limit`, `offset`, `min_id`, `max_id`, `account_id`\
3.0.0 - add `exclude_unreviewed` param\
3.3.0 - `min_id` and `max_id` can be used together
<!--
3.6.0 - no longer requires a user token
-->

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

q
: {{<required>}} String. The search query.

type
: String. Specify whether to search for only `accounts`, `hashtags`, `statuses`

resolve
: Boolean. Attempt WebFinger lookup? Defaults to false.

following
: Boolean. Only include accounts that the user is following? Defaults to false.

account_id
: String. If provided, will only return statuses authored by this account.

exclude_unreviewed
: Boolean. Filter out unreviewed tags? Defaults to false. Use true when trying to find trending tags.

max_id 
: String. Return results older than this ID.

min_id
: String. Return results immediately newer than this ID.

limit
: Integer. Maximum number of results to return, per type. Defaults to 20. Max 40.

offset
: Integer. Offset in search results, used for pagination. Defaults to 0.

#### Response
##### 200: OK

Truncated results of a sample search for "cats" with limit=2.

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

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## (DEPRECATED) Search results (v1) {#v1}

```http
GET https://mastodon.example/api/v1/search HTTP/1.1
```

**Returns:** [Results]({{< relref "entities/results" >}}), but `hashtags` is an array of strings instead of an array of Tag.\
**OAuth:** User token + `read:search`\
**Version history:**\
1.1 - added, limit hardcoded to 5\
1.5.0 - now requires authentication\
2.8.0 - added `limit`, pagination, and account options\
3.0.0 - removed; use v2 instead

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

q
: {{<required>}} String. The search query.

type
: String. Specify whether to search for only `accounts`, `hashtags`, `statuses`

resolve
: Boolean. Attempt WebFinger lookup? Defaults to false.

account_id
: String. If provided, will only return statuses authored by this account.

max_id 
: String. Return results older than this ID.

min_id
: String. Return results immediately newer than this ID.

limit
: Integer. Maximum number of results to return, per type. Defaults to 20. Max 40.

offset
: Integer. Offset in search results, used for pagination. Defaults to 0.

#### Response
##### 200: OK

v1 search was deprecated because hashtags were returned as strings instead of as Tag entities.

```javascript
{
  "accounts": [...],
  "statuses": [...],
  "hashtags": ["cats","catsofmastodon"]
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/search_controller.rb" caption="app/controllers/api/v2/search_controller.rb" >}}

{{< page-relref ref="methods/accounts#search" caption="GET /api/v1/accounts/search" >}}

{{< page-relref ref="methods/accounts#lookup" caption="GET /api/v1/accounts/lookup" >}}