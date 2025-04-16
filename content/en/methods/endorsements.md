---
title: endorsements API methods
description: Feature other profiles on your own profile. See also accounts/:id/{pin,unpin}
menu:
  docs:
    weight: 90
    name: endorsements
    parent: methods-accounts
    identifier: methods-endorsements
aliases: [
  "/methods/endorsements",
  "/api/methods/endorsements",
  "/methods/accounts/endorsements",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View currently featured profiles {#get}

```http
GET /api/v1/endorsements HTTP/1.1
```

Accounts that the user is currently featuring on their profile.

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** User token + `read:accounts`\
**Version history:**\
2.5.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Query parameters

max_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

Sample call with limit=2.

```json
[
  {
    "id": "952529",
    "username": "alayna",
    "acct": "alayna@desvox.es",
    "display_name": "Alayna Desirae",
    "locked": true,
    "bot": false,
    "created_at": "2019-10-26T23:12:06.570Z",
    "note": "experiencing ________ difficulties<br>22y/o INFP in Oklahoma",
    "url": "https://desvox.es/users/alayna",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/952/529/original/6534122046d050d5.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/952/529/original/6534122046d050d5.png",
    "header": "https://files.mastodon.social/accounts/headers/000/952/529/original/496f1f817e042ade.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/952/529/original/496f1f817e042ade.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 955,
    "last_status_at": "2019-11-23T07:05:50.682Z",
    "emojis": [],
    "fields": []
  },
  {
    "id": "832844",
    "username": "a9",
    "acct": "a9@broadcast.wolfgirl.engineering",
    "display_name": "vivienne :collar: ",
    "locked": true,
    "bot": false,
    "created_at": "2019-06-12T18:55:12.053Z",
    "note": "borderline nsfw, considered a schedule I drug by nixon<br>waiting for the year of the illumos desktop",
    "url": "https://broadcast.wolfgirl.engineering/users/a9",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/832/844/original/ae1de0b8fb63d1c6.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/832/844/original/ae1de0b8fb63d1c6.png",
    "header": "https://files.mastodon.social/accounts/headers/000/832/844/original/5088e4a16e6d8736.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/832/844/original/5088e4a16e6d8736.png",
    "followers_count": 43,
    "following_count": 67,
    "statuses_count": 5906,
    "last_status_at": "2019-11-23T05:23:47.911Z",
    "emojis": [
      {
        "shortcode": "collar",
        "url": "https://files.mastodon.social/custom_emojis/images/000/106/920/original/80953b9cd96ec4dc.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/106/920/static/80953b9cd96ec4dc.png",
        "visible_in_picker": true
      }
    ],
    "fields": []
  }
]
```

Because AccountPin IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/endorsements?limit=2&max_id=832844>; rel="next", <https://mastodon.example/api/v1/endorsements?limit=2&since_id=952529>; rel="prev"
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

{{< page-relref ref="methods/accounts#endorsements" caption="GET /api/v1/accounts/:id/endorsements" >}}

{{< page-relref ref="methods/accounts#endorse" caption="POST /api/v1/accounts/:id/endorse" >}}

{{< page-relref ref="methods/accounts#unendorse" caption="POST /api/v1/accounts/:id/unendorse" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/endorsements_controller.rb" caption="app/controllers/api/v1/endorsements_controller.rb" >}}
