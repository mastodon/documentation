---
title: bookmarks API methods
summary: View your bookmarks. See also statuses/:id/{bookmark,unbookmark}
menu:
  docs:
    weight: 10
    name: bookmarks
    parent: methods-accounts
    identifier: methods-bookmarks
aliases: [
  "/methods/bookmarks",
  "/api/methods/bookmarks",
  "/methods/accounts/bookmarks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View bookmarked statuses {#get}

```http
GET /api/v1/bookmarks HTTP/1.1
```

Statuses the user has bookmarked.

**Returns:** Array of [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `read:bookmarks`\
**Version history:**\
3.1.0 - added\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

### Request
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

```json
[
  {
    "id": "108724195870225687",
    "created_at": "2022-07-28T09:12:47.000Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    // ...
  },
  {
    "id": "108200780982641655",
    "created_at": "2022-04-26T22:41:28.492Z",
    "in_reply_to_id": "108200775562138405",
    "in_reply_to_account_id": "806143",
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    // ...
  },
  // ...
]
```

Because Bookmark IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/bookmarks?max_id=23771>; rel="next", <https://mastodon.example/api/v1/bookmarks?min_id=370065>; rel="prev"
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

{{< page-relref ref="methods/statuses#bookmark" caption="POST /api/v1/statuses/:id/bookmark" >}}

{{< page-relref ref="methods/statuses#unbookmark" caption="POST /api/v1/statuses/:id/unbookmark" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/bookmarks_controller.rb" caption="app/controllers/api/v1/bookmarks_controller.rb" >}}