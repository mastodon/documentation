---
title: follow_requests
description: View and manage follow requests.
menu:
  docs:
    weight: 80
    parent: methods-accounts
aliases: [/methods/accounts/follow_requests/]
---

## View pending follow requests {#get}

```http
GET https://mastodon.example/api/v1/follow_requests HTTP/1.1
```

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** User token + `read:follows` or `follow`\
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
: Number. Maximum number of results to return. Defaults to 40. Paginate using the HTTP Link header.

#### Response
##### 200: Success

Accounts that are requesting a follow

```http
Link: <https://mastodon.social/api/v1/follow_requests?max_id=23716836>; rel="next", <https://mastodon.social/api/v1/follow_requests?min_id=23716978>; rel="prev"
```

```javascript
[
  {
    "id": "8889777",
    "username": "example",
    "acct": "example@social.example",
    ...
  },
  ...
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## Accept follow request {#accept}

```http
POST https://mastodon.example/api/v1/follow_requests/:account_id/authorize HTTP/1.1
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
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: Success

Your Relationship with this account should be updated so that you are `followed_by` this account.

```javascript
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

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

No pending follow request from that account ID

```javascript
{
  "error": "Record not found"
}
```

---

## Reject follow request {#reject}

```http
POST https://mastodon.example/api/v1/follow_requests/:account_id/reject HTTP/1.1
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
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: Success

Your Relationship with this account should be unchanged.

```javascript
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

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

No pending follow request from that account ID

```javascript
{
  "error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/follow_requests_controller.rb" caption="app/controllers/api/v1/follow_requests_controller.rb" >}}