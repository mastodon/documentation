---
title: search API methods
description: Search for content in accounts, statuses and hashtags.
menu:
  docs:
    weight: 60
    name: search
    parent: methods
    identifier: methods-search
aliases: [
  "/methods/search",
  "/api/methods/search",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Perform a search {#v2}

```http
GET /api/v2/search HTTP/1.1
```

**Returns:** [Search]({{< relref "entities/Search" >}})\
**OAuth:** Public (without `resolve` or `offset`), or User token + `read:search`\
**Version history:**\
2.4.1 - added, limit hardcoded to 5\
2.8.0 - add `type`, `limit`, `offset`, `min_id`, `max_id`, `account_id`\
3.0.0 - add `exclude_unreviewed` param\
3.3.0 - `min_id` and `max_id` can be used together\
4.0.0 - no longer requires a user token. Without a valid user token, you cannot use the `resolve` or `offset` parameters.

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
: Boolean. Only relevant if `type` includes `accounts`. If `true` and (a) the search query is for a remote account (e.g., `someaccount@someother.server`) and (b) the local server does not know about the account, [WebFinger](/spec/webfinger) is used to try and resolve the account at `someother.server`. This provides the best recall at higher latency. If `false` only accounts the server knows about are returned.

following
: Boolean. Only include accounts that the user is following? Defaults to false.

account_id
: String. If provided, will only return statuses authored by this account.

exclude_unreviewed
: Boolean. Filter out unreviewed tags? Defaults to false. Use true when trying to find trending tags.

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return, per type. Defaults to 20 results per category. Max 40 results per category.

offset
: Integer. Skip the first n results.

#### Response
##### 200: OK

Truncated results of a sample search for "cats" with limit=2.

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
      "content": "<p>Cats are inherently good at self-care. </p><p><a href=\"https://mspsocial.net/tags/cats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>cats</span></a></p>",
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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## (REMOVED) Search results (v1) {#v1}

```http
GET /api/v1/search HTTP/1.1
```

**Returns:** [Search]({{< relref "entities/Search" >}}), but `hashtags` is an array of strings instead of an array of Tag.\
**OAuth:** User token + `read:search`\
**Version history:**\
1.1 - added, limit hardcoded to 5\
1.5.0 - now requires authentication\
2.4.1 - deprecated in favor of [v2 search](#v2)\
2.8.0 - added `limit`, pagination, and account options\
3.0.0 - removed; use [v2 search](#v2) instead

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
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return, per type. Defaults to 20 results per category. Max 40 results per category.

offset
: Integer. Offset in search results, used for pagination. Defaults to 0.

#### Response
##### 200: OK

v1 search was deprecated because hashtags were returned as strings instead of as Tag entities.

```json
{
  "accounts": [...],
  "statuses": [...],
  "hashtags": ["cats","catsofmastodon"]
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< page-relref ref="methods/accounts#search" caption="GET /api/v1/accounts/search" >}}

{{< page-relref ref="methods/accounts#lookup" caption="GET /api/v1/accounts/lookup" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/search_controller.rb" caption="app/controllers/api/v2/search_controller.rb" >}}
