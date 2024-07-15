---
title: timelines API methods
description: Read and view timelines of statuses.
menu:
  docs:
    weight: 40
    name: timelines
    parent: methods
    identifier: methods-timelines
aliases: [
  "/methods/timelines",
  "/api/methods/timelines",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View public timeline {#public}

```http
GET /api/v1/timelines/public HTTP/1.1
```

View public statuses.

**Returns:** Array of [Status]({{<relref "entities/status">}})\
**OAuth:** Public. Requires app token + `read:statuses` if the instance has disabled public preview.\
**Version history:**\
0.0.0 - added\
2.3.0 - added `only_media`\
2.6.0 - add `min_id`\
3.0.0 - auth is required if public preview is disabled\
3.1.4 - added `remote`\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

local
: Boolean. Show only local statuses? Defaults to false.

remote
: Boolean. Show only remote statuses? Defaults to false.

only_media
: Boolean. Show only statuses with media attached? Defaults to false.

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

#### Response
##### 200: OK

Sample API call with limit=2

```json
[
  {
    "id": "103206804533200177",
    "created_at": "2019-11-26T23:27:31.000Z",
    // ...
    "visibility": "public",
    // ...
  },
  {
    "id": "103206804086086361",
    "created_at": "2019-11-26T23:27:32.000Z",
    // ...
    "visibility": "public",
    // ...
  }
]
```

---

## View hashtag timeline {#tag}

```http
GET /api/v1/timelines/tag/:hashtag HTTP/1.1
```

View public statuses containing the given hashtag.

**Returns:** Array of [Status]({{<relref "entities/status">}})\
**OAuth:** Public. Requires app token + `read:statuses` if the instance has disabled public preview.\
**Version history:**\
0.0.0 - added\
2.3.0 - added `only_media`\
2.6.0 - add `min_id`\
2.7.0 - add `any[]`, `all[]`, `none[]` for additional tags\
3.0.0 - auth is required if public preview is disabled\
3.3.0 - both `min_id` and `max_id` can be used at the same time now. add `remote`

#### Request

##### Path parameters

:hashtag
: {{<required>}} String. The name of the hashtag (not including the # symbol).

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

any[]
: Array of String. Return statuses that contain any of these additional tags.

all[]
: Array of String. Return statuses that contain all of these additional tags.

none[]
: Array of String. Return statuses that contain none of these additional tags.

local
: Boolean. Return only local statuses? Defaults to false.

remote
: Boolean. Return only remote statuses? Defaults to false.

only_media
: Boolean. Return only statuses with media attachments? Defaults to false.

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

#### Response
##### 200: OK

Sample timeline for the hashtag #cats and limit=2

```json
[
  {
    "id": "103206185588894565",
    "created_at": "2019-11-26T20:50:15.866Z",
    // ...
    "visibility": "public",
    // ...
    "content": "<p><a href=\"https://mastodon.social/tags/cats\" class=\"mention hashtag\" rel=\"tag\">#<span>cats</span></a></p>",
    // ...
    "tags": [
      {
        "name": "cats",
        "url": "https://mastodon.social/tags/cats"
      }
    ],
    // ...
  },
  {
    "id": "103203659567597966",
    "created_at": "2019-11-26T10:07:49.000Z",
    // ...
    "visibility": "public",
    // ...
    "content": "<p>Caught on the hop. 😺 </p><p><a href=\"https://chaos.social/tags/Qualit%C3%A4tskatzen\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Qualitätskatzen</span></a> <a href=\"https://chaos.social/tags/cats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>cats</span></a> <a href=\"https://chaos.social/tags/mastocats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>mastocats</span></a> <a href=\"https://chaos.social/tags/catsofmastodon\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>catsofmastodon</span></a> <a href=\"https://chaos.social/tags/Greece\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Greece</span></a> <a href=\"https://chaos.social/tags/Agistri\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Agistri</span></a><br>(photo: <span class=\"h-card\"><a href=\"https://chaos.social/@kernpanik\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>kernpanik</span></a></span> | license: CC BY-NC-SA 4.0)</p>",
    // ...
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
    // ...
  }
]
```

##### 404: Not found

Hashtag does not exist

```json
{
  "error": "Record not found"
}
```

---

## View home timeline {#home}

```http
GET /api/v1/timelines/home HTTP/1.1
```

View statuses from followed users and hashtags.

**Returns:** Array of [Status]({{<relref "entities/status">}})\
**OAuth:** User + `read:statuses`\
**Version history:**\
0.0.0 - added\
2.6.0 - add `min_id`\
3.3.0 - both `min_id` and `max_id` can be used at the same time now
4.0.0 - as users can now follow hashtags, statuses from non-followed users may appear in the timeline

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

#### Response
##### 200: OK

Statuses in your home timeline will be returned

```json
[
  {
    "id": "103206791453397862",
    "created_at": "2019-11-26T23:24:13.113Z",
    // ...
  },
  // ...
]
```

##### 206: Partial content

Home feed is regenerating

```text
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## View link timeline {#link}

```http
GET /api/v1/timelines/link?url=:url HTTP/1.1
```

View public statuses containing a link to the specified currently-trending article. This only lists statuses from people who have opted in to discoverability features.

**Returns:** Array of [Status]({{<relref "entities/status">}})\
**OAuth:** Public. Requires app token + `read:statuses` if the instance has disabled public preview.\
**Version history:**\
4.3.0 - added

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

url
: {{<required>}} String. The URL of the trending article.

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

#### Response
##### 200: OK

##### 404: Not found

The provided URL is not currently trending.

```json
{
  "error": "Record not found"
}
```

---

## View list timeline {#list}

```http
GET /api/v1/timelines/list/:list_id HTTP/1.1
```

View statuses in the given list timeline.

**Returns:** Array of [Status]({{<relref "entities/status">}})\
**OAuth:** User token + `read:lists`\
**Version history:**\
2.1.0 - added\
2.6.0 - add `min_id`\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

#### Request

##### Path parameters

:list_id
: {{<required>}} String. Local ID of the List in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

#### Response
##### 200: OK

Statuses in this list will be returned.

```json
[
  {
    "id": "103206791453397862",
    "created_at": "2019-11-26T23:24:13.113Z",
    // ...
  },
  // ...
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

List is not owned by you or does not exist

```json
{
  "error": "Record not found"
}
```

---

## (DEPRECATED) View direct timeline {#direct}

```http
GET /api/v1/timelines/direct HTTP/1.1
```

View statuses with a "direct" privacy, from your account or in your notifications.

**Returns:** Array of [Status]({{<relref "entities/status">}})\
**OAuth:** User token + `read:statuses`\
**Version history:**\
x.x.x - added\
2.6.0 - add `min_id`. deprecated in favor of [Conversations API]({{<relref "methods/conversations">}})\
3.0.0 - removed

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

#### Response
##### 200: OK

Statuses with direct visibility, authored by you or mentioning you. Statuses are not grouped by conversation, but are returned in chronological order.

```json
[
  {
    "id": "103206185588894565",
    "created_at": "2019-11-26T20:50:15.866Z",
    // ...
    "visibility": "direct",
    // ...
  },
  // ...
]
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

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/timelines/home_controller.rb" caption="app/controllers/api/v1/timelines/home_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/timelines/list_controller.rb" caption="app/controllers/api/v1/timelines/list_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/timelines/public_controller.rb" caption="app/controllers/api/v1/timelines/public_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/timelines/tag_controller.rb" caption="app/controllers/api/v1/timelines/tag_controller.rb" >}}
