---
title: follow_requests API methods
description: View and manage follow requests.
menu:
  docs:
    weight: 80
    name: follow_requests
    parent: methods-accounts
    identifier: methods-follow_requests
aliases: [
  "/methods/follow_requests",
  "/api/methods/follow_requests",
  "/methods/accounts/follow_requests",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View pending follow requests {#get}

```http
GET /api/v1/follow_requests HTTP/1.1
```

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** User token + `read:follows` or `follow`\
**Version history:**\
0.0.0 - added

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

Sample call for Accounts that are requesting a follow, with limit=2

```json
[
  {
    "id":"108119793981152178",
    "username":"spcpro3022",
    "acct":"spcpro3022@shitposter.club",
    "display_name":"spcpro3022",
    // ...
  },
  {
    "id":"106780475844882270",
    "username":"EricStoner",
    "acct":"EricStoner@freeatlantis.com",
    "display_name":"EricStoner",
    // ...
  }
]
```

Because FollowRequest IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/follow_requests?limit=2&max_id=7163058>; rel="next", <https://mastodon.example/api/v1/follow_requests?limit=2&since_id=7275607>; rel="prev"
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Accept follow request {#accept}

```http
POST /api/v1/follow_requests/:account_id/authorize HTTP/1.1
```

**Returns:** [Relationship]({{< relref "entities/relationship" >}})\
**OAuth:** User token + `write:follows` or `follow`\
**Version history:**\
0.0.0 - added\
3.0.0 - now returns Relationship instead of nothing

#### Request

##### Path parameters

:account_id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Your Relationship with this account should be updated so that you are `followed_by` this account.

```json
{
  "id": "8889777",
  "following": false,
  "showing_reblogs": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

No pending follow request from that account ID

```json
{
  "error": "Record not found"
}
```

---

## Reject follow request {#reject}

```http
POST /api/v1/follow_requests/:account_id/reject HTTP/1.1
```

**Returns:** [Relationship]({{< relref "entities/relationship" >}})\
**OAuth:** User token + `write:follows` or `follow`\
**Version history:**\
0.0.0 - added\
3.0.0 - now returns Relationship instead of nothing

#### Request

##### Path parameters

:account_id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Your Relationship with this account should be unchanged.

```json
{
  "id": "8889777",
  "following": false,
  "showing_reblogs": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

No pending follow request from that account ID

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/follow_requests_controller.rb" caption="app/controllers/api/v1/follow_requests_controller.rb" >}}