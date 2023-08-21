---
title: mutes API methods
description: View your mutes. See also accounts/:id/{mute,unmute}
menu:
  docs:
    weight: 30
    name: mutes
    parent: methods-accounts
    identifier: methods-mutes
aliases: [
  "/methods/mutes",
  "/api/methods/mutes",
  "/methods/accounts/mutes",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View muted accounts {#get}

```http
GET /api/v1/mutes HTTP/1.1
```

Accounts the user has muted.

**Returns:** Array of [Account]({{<relref "entities/Account">}})\
**OAuth:** User token + `read:mutes` or `follow`\
**Version history:**\
0.0.0 - added\
3.3.0 - added `mute_expires_at`

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

Sample response with limit=2.

```json
[
  {
    "id": "963076",
    "username": "Simia91",
    "acct": "Simia91",
    "display_name": "",
    // ...
  },
  {
    "id": "1001524",
    "username": "hakogamae",
    "acct": "hakogamae",
    "display_name": "Hakogamae 🔞",
    // ...
  }
]
```

Because Mute IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/mutes?limit=2&max_id=317646>; rel="next", <https://mastodon.example/api/v1/mutes?limit=2&since_id=317647>; rel="prev"
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

{{< page-relref ref="methods/accounts#mute" caption="POST /api/v1/accounts/:id/mute" >}}

{{< page-relref ref="methods/accounts#unmute" caption="POST /api/v1/accounts/:id/unmute" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/mutes_controller.rb" caption="app/controllers/api/v1/mutes_controller.rb" >}}