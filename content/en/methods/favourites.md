---
title: favourites API methods
description: View your favourites. See also statuses/:id/{favourite,unfavourite}
menu:
  docs:
    weight: 20
    name: favourites
    parent: methods-accounts
    identifier: methods-favourites
aliases: [
  "/methods/favourites",
  "/api/methods/favourites",
  "/methods/accounts/favourites",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View favourited statuses {#get}

```http
GET /api/v1/favourites HTTP/1.1
```

Statuses the user has favourited.

**Returns:** Array of [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `read:favourites`\
**Version:**\
0.0.0 - added\
2.6.0 - `min_id` added\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

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
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

#### Response
##### 200: OK

An example call with limit=2.

```json
[
  {
    "id": "103186075217296344",
    "created_at": "2019-11-23T07:35:52.000Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "unlisted",
    "language": "enCy",
    "uri": "https://cybre.space/users/haskal/statuses/103186075002013902",
    "url": "https://cybre.space/@haskal/103186075002013902",
    "replies_count": 0,
    "reblogs_count": 1,
    "favourites_count": 1,
    "favourited": true,
    "reblogged": false,
    "muted": false,
    "bookmarked": false,
    "content": "<p>the pirate gay</p>",
    "reblog": null,
    "account": {
      "id": "297420",
      "username": "haskal",
      "acct": "haskal@cybre.space",
      "display_name": "soft nb friend :blobcatsleep:",
      // ...
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  },
  {
    "id": "103186044372624124",
    "created_at": "2019-11-23T07:28:03.000Z",
    // ...
    "content": "<p>cute,,,</p>",
    "reblog": null,
    "account": {
      "id": "297420",
      "username": "haskal",
      "acct": "haskal@cybre.space",
      "display_name": "soft nb friend :blobcatsleep:",
      "locked": false,
      "bot": false,
      // ...
    },
    // ...
  }
]
```

Because Favourite IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/favourites?limit=2&max_id=23716836>; rel="next", <https://mastodon.example/api/v1/favourites?limit=2&min_id=23716978>; rel="prev"
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

{{< page-relref ref="methods/statuses#favourite" caption="POST /api/v1/statuses/:id/favourite" >}}

{{< page-relref ref="methods/statuses#unfavourite" caption="POST /api/v1/statuses/:id/unfavourite" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/favourites_controller.rb" caption="app/controllers/api/v1/favourites_controller.rb" >}}