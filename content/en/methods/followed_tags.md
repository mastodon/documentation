---
title: followed_tags API methods
description: View your followed hashtags.
menu:
  docs:
    weight: 120
    name: followed_tags
    parent: methods-accounts
    identifier: methods-followed_tags
aliases: [
  "/methods/followed_tags",
  "/api/methods/followed_tags",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View all followed tags {#get}

```http
GET /api/v1/followed_tags HTTP/1.1
```

List your followed hashtags.

**Returns:** Array of [Tag]({{< relref "entities/Tag" >}})\
**OAuth:** User token + `read:follows`\
**Version history:**\
4.0.0 - added\
4.1.0 - add pagination headers

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

min_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 100 tags. Max 200 tags.

#### Response
##### 200: OK

List of followed hashtags

```json
[
  {
    "name": "Test",
    "url": "http://mastodon.example/tags/test",
    "history": [
      {
        "day": "1668556800",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668470400",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668384000",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668297600",
        "accounts": "1",
        "uses": "1"
      },
      {
        "day": "1668211200",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668124800",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668038400",
        "accounts": "0",
        "uses": "0"
      }
    ],
    "following": true
  },
  // ...
]
```

Because TagFollow IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <http://mastodon.example/api/v1/followed_tags?limit=1&max_id=2>; rel="next", <http://mastodon.example/api/v1/followed_tags?limit=1&since_id=2>; rel="prev"
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

{{< page-relref ref="methods/tags#follow" caption="POST /api/v1/tags/:id/follow" >}}

{{< page-relref ref="methods/tags#unfollow" caption="POST /api/v1/tags/:id/unfollow" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/followed_tags_controller.rb" caption="app/controllers/api/v1/followed_tags_controller.rb" >}}
