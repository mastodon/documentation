---
title: timelines
description: Read and view timelines of statuses.
menu:
  docs:
    weight: 40
    parent: methods
    identifier: methods-timelines
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/timelines/public" title="Public timeline" >}}
{{< api-method-description >}}

**Returns:** Array of Status\
**OAuth:** Public. Requires app token + `read:statuses` if the instance has disabled public preview.\
**Version history:**\
0.0.0 - added\
2.3.0 - added `only_media`\
2.6.0 - add `min_id`\
3.0.0 - auth is required if public preview is disabled\
3.1.4 - added `remote`\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="local" type="boolean" required=false >}}
Show only local statuses? Defaults to false.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="remote" type="boolean" required=false >}}
Show only remote statuses? Defaults to false.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="only_media" type="boolean" required=false >}}
Show only statuses with media attached? Defaults to false.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than this id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
Return results newer than this id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than this id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="integer" required=false >}}
Maximum number of results to return. Defaults to 20.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample API call with limit=2
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "103206804533200177",
    "created_at": "2019-11-26T23:27:31.000Z",
    ...
    "visibility": "public",
    ...
  },
  {
    "id": "103206804086086361",
    "created_at": "2019-11-26T23:27:32.000Z",
    ...
    "visibility": "public",
    ...
  }
]
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/timelines/tag/:hashtag" title="Hashtag timeline" >}}
{{< api-method-description >}}

View public statuses containing the given hashtag.

**Returns:** Array of Status\
**OAuth:** Public. Requires app token + `read:statuses` if the instance has disabled public preview.\
**Version history:**\
0.0.0 - added\
2.3.0 - added `only_media`\
2.6.0 - add `min_id`\
3.0.0 - auth is required if public preview is disabled\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":hashtag" type="string" required=true >}}
Content of a \#hashtag, not including \# symbol.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="local" type="boolean" required=false >}}
If true, return only local statuses. Defaults to false.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="only_media" type="boolean" required=false >}}
If true, return only statuses with media attachments. Defaults to false.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than this ID.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
Return results newer than this ID.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than this ID.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="integer" required=false >}}
Maximum number of results to return. Defaults to 20.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample timeline for the hashtag \#cats and limit=2
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "103206185588894565",
    "created_at": "2019-11-26T20:50:15.866Z",
    ...
    "visibility": "public",
    ...
    "content": "<p><a href=\"https://mastodon.social/tags/cats\" class=\"mention hashtag\" rel=\"tag\">#<span>cats</span></a></p>",
    ...
    "tags": [
      {
        "name": "cats",
        "url": "https://mastodon.social/tags/cats"
      }
    ],
    ...
  },
  {
    "id": "103203659567597966",
    "created_at": "2019-11-26T10:07:49.000Z",
    ...
    "visibility": "public",
    ...
    "content": "<p>Caught on the hop. 😺 </p><p><a href=\"https://chaos.social/tags/Qualit%C3%A4tskatzen\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Qualitätskatzen</span></a> <a href=\"https://chaos.social/tags/cats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>cats</span></a> <a href=\"https://chaos.social/tags/mastocats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>mastocats</span></a> <a href=\"https://chaos.social/tags/catsofmastodon\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>catsofmastodon</span></a> <a href=\"https://chaos.social/tags/Greece\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Greece</span></a> <a href=\"https://chaos.social/tags/Agistri\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Agistri</span></a><br>(photo: <span class=\"h-card\"><a href=\"https://chaos.social/@kernpanik\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>kernpanik</span></a></span> | license: CC BY-NC-SA 4.0)</p>",
    ...
    "tags": [
      {
        "name": "qualitätskatzen",
        "url": "https://mastodon.social/tags/qualit%C3%A4tskatzen"
      },
      {
        "name": "cats",
        "url": "https://mastodon.social/tags/cats"
      },
      {
        "name": "mastocats",
        "url": "https://mastodon.social/tags/mastocats"
      },
      {
        "name": "catsofmastodon",
        "url": "https://mastodon.social/tags/catsofmastodon"
      },
      {
        "name": "greece",
        "url": "https://mastodon.social/tags/greece"
      },
      {
        "name": "agistri",
        "url": "https://mastodon.social/tags/agistri"
      }
    ],
    ...
  }
]
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/timelines/home" title="Home timeline" >}}
{{< api-method-description >}}

View statuses from followed users.

**Returns:** Array of Status\
**OAuth:** User + `read:statuses`\
**Version history:**\
0.0.0 - added\
2.6.0 - add `min_id`\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
Return results newer than id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than id
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Maximum number of results to return. Defaults to 20.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="local" type="boolean" required=false >}}
Return only local statuses?
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Statuses in your home timeline will be returned
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "103206791453397862",
    "created_at": "2019-11-26T23:24:13.113Z",
    ...
  },
  ...
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=206 >}}
{{< api-method-response-example-description >}}

Home feed is regenerating
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
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
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/timelines/list/:list_id" title="List timeline" >}}
{{< api-method-description >}}

View statuses in the given list timeline.

**Returns:** Array of Status\
**OAuth:** User token + `read:lists`\
**Version history:**\
2.1.0 - added\
2.6.0 - add `min_id`\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":list_id" type="string" required=true >}}
Local ID of the list in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than this ID.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
Return results newer than this ID.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than this ID.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="integer" required=false >}}
Maximum number of results to return. Defaults to 20.Return results older than this ID.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Statuses in this list will be returned.
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "103206791453397862",
    "created_at": "2019-11-26T23:24:13.113Z",
    ...
  },
  ...
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
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
{{< api-method method="get" host="" path="/api/v1/timelines/direct" title="\[DEPRECATED\] Direct timeline" >}}
{{< api-method-description >}}

View statuses with a "direct" privacy, from your account or in your notifications.

**Returns:** Array of Status\
**OAuth:** User token + `read:statuses`\
**Version history:**\
x.x.x - added\
2.6.0 - add `min_id`. deprecated in favor of conversations\
3.0.0 - removed

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Maximum number of results to return. Defaults to 20.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than ID
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
Return results newer than ID
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than ID
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Statuses with direct visibility, authored by you or mentioning you. Statuses are not grouped by conversation, but are simply returned in chronological order.
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "103206185588894565",
    "created_at": "2019-11-26T20:50:15.866Z",
    ...
    "visibility": "direct",
    ...
  },
  ...
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
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


