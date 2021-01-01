---
title: search
description: 'Search for content in accounts, statuses and hashtags.'
menu:
  docs:
    weight: 60
    parent: methods
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v2/search" title="Search results" >}}
{{< api-method-description >}}

**Returns:** Results\
**OAuth:** User token + `read:search`\
**Version history:**\
2.4.1 - added, limit hardcoded to 5\
2.8.0 - add type, limit, offset, min_id, max_id, account_id\
3.0.0 - add `exclude_unreviewed` param

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="account_id" type="string" required=false >}}
If provided, statuses returned will be authored only by this account
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than this id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than this id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="type" type="string" required=false >}}
Enum\(accounts, hashtags, statuses\)
{{< endapi-method-parameter >}}
{{< api-method-parameter name="exclude_unreviewed" type="boolean" required=false >}}
Filter out unreviewed tags? Defaults to false. Use true when trying to find trending tags.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="q" type="string" required=true >}}
The search query
{{< endapi-method-parameter >}}
{{< api-method-parameter name="resolve" type="boolean" required=false >}}
Attempt WebFinger lookup. Defaults to false.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="integer" required=false >}}
Maximum number of results to load, per type. Defaults to 20. Max 40.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="offset" type="integer" required=false >}}
Offset in search results. Used for pagination. Defaults to 0.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="following" type="boolean" required=false >}}
Only include accounts that the user is following. Defaults to false.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Truncated results of a sample search for "cats" with limit=2.
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/search" title="\(DEPRECATED\) Search results" >}}
{{< api-method-description >}}

**Returns:** Results, but hashtags is an array of strings instead of an array of Tag.\
**OAuth:** User token + `read:search`\
**Version history:**\
1.1 - added, limit hardcoded to 5\
1.5.0 - now requires authentication\
2.8.0 - added limit, pagination, and account options\
3.0.0 - removed; use v2 instead

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="q" type="string" required=true >}}
The search query
{{< endapi-method-parameter >}}
{{< api-method-parameter name="resolve" type="string" required=false >}}
Attempt Webfinger lookup. Defaults to false.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Max number of results to load per type. Defaults to 20
{{< endapi-method-parameter >}}
{{< api-method-parameter name="type" type="string" required=false >}}
Enum\(accounts,hashtags,statuses\)
{{< endapi-method-parameter >}}
{{< api-method-parameter name="offset" type="string" required=false >}}
Offset in search results.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than this id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than this id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="account_id" type="string" required=false >}}
Return statuses only from this account
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

v1 search was deprecated because hashtags were returned as strings instead of as Tag entities.
{{< endapi-method-response-example-description >}}


```javascript
{
  "accounts": [...],
  "statuses": [...],
  "hashtags": ["cats","catsofmastodon"]
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


