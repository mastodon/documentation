---
title: blocks API methods
description: View your blocks. See also accounts/:id/{block,unblock}
menu:
  docs:
    weight: 40
    name: blocks
    parent: methods-accounts
    identifier: methods-blocks
aliases: [
  "/methods/blocks",
  "/api/methods/blocks",
  "/methods/accounts/blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View blocked users {#get}

```http
GET /api/v1/blocks HTTP/1.1
```

Returns your blocked accounts.

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** User token + `read:blocks`\
**Version history:**\
0.0.0 - added\
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
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

Sample call with limit=2.

```json
[
  {
    "id": "585315",
    "username": "admin",
    "acct": "admin@happylittle.cloudns.cc",
    "display_name": "☁️  ⛅ Happy Little Clouds ⛅ ☁️",
    // ...
  },
  {
    "id": "650568",
    "username": "Nikolai_Kingsley",
    "acct": "Nikolai_Kingsley@dobbs.town",
    "display_name": "Rev.Dr. Nikolai Kingsley",
    // ...
  }
]
```

Because Block IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/blocks?limit=2&max_id=441449>; rel="next", <https://mastodon.example/api/v1/blocks?limit=2&since_id=444808>; rel="prev"
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

{{< page-relref ref="methods/accounts#block" caption="POST /api/v1/accounts/:id/block" >}}

{{< page-relref ref="methods/accounts#unblock" caption="POST /api/v1/accounts/:id/unblock" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/blocks_controller.rb" caption="app/controllers/api/v1/blocks_controller.rb" >}}
