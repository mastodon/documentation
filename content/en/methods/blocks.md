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
GET https://mastodon.example/api/v1/blocks HTTP/1.1
```

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
: Integer. Maximum number of results to return. Defaults to 40.

#### Response
##### 200: OK

Sample call with limit=2. Because block IDs are private, you must parse the HTTP `Link` header to find next and previous pages.

```http
Link: <https://mastodon.social/api/v1/blocks?limit=2&max_id=441449>; rel="next", <https://mastodon.social/api/v1/blocks?limit=2&since_id=444808>; rel="prev"
```

```json
[
  {
    "id": "585315",
    "username": "admin",
    "acct": "admin@happylittle.cloudns.cc",
    "display_name": "☁️  ⛅ Happy Little Clouds ⛅ ☁️",
    "locked": false,
    "bot": false,
    "created_at": "2018-11-09T21:37:50.982Z",
    "note": "Novice programmer. Freedom lover. Distributed network software enthusiast.",
    "url": "https://happylittle.cloudns.cc/users/admin",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/585/315/original/5a2d62acfe7f6e7d.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/585/315/original/5a2d62acfe7f6e7d.png",
    "header": "https://files.mastodon.social/accounts/headers/000/585/315/original/122940e256a42ac8.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/585/315/original/122940e256a42ac8.png",
    "followers_count": 25,
    "following_count": 41,
    "statuses_count": 173,
    "last_status_at": "2019-11-21T14:59:07.345Z",
    "emojis": [],
    "fields": []
  },
  {
    "id": "650568",
    "username": "Nikolai_Kingsley",
    "acct": "Nikolai_Kingsley@dobbs.town",
    "display_name": "Rev.Dr. Nikolai Kingsley",
    "locked": false,
    "bot": false,
    "created_at": "2018-12-15T02:25:57.424Z",
    "note": "<p>Justifiability is in the hands of the beholder<br>And you just don't know what people will do next<br> - todd rundgren, \"Zen Archer\"</p>",
    "url": "https://dobbs.town/@Nikolai_Kingsley",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/650/568/original/2e80c95aab9f8071.gif",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/650/568/static/2e80c95aab9f8071.png",
    "header": "https://files.mastodon.social/accounts/headers/000/650/568/original/10c19760ca5bbae5.jpeg",
    "header_static": "https://files.mastodon.social/accounts/headers/000/650/568/original/10c19760ca5bbae5.jpeg",
    "followers_count": 135,
    "following_count": 130,
    "statuses_count": 10807,
    "last_status_at": "2019-11-23T08:07:34.745Z",
    "emojis": [],
    "fields": []
  }
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

{{< page-relref ref="methods/accounts#block" caption="POST /api/v1/accounts/:id/block" >}}

{{< page-relref ref="methods/accounts#unblock" caption="POST /api/v1/accounts/:id/unblock" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/blocks_controller.rb" caption="app/controllers/api/v1/blocks_controller.rb" >}}