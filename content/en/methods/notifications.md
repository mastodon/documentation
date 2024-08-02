---
title: notifications API methods
description: Receive notifications for activity on your account or statuses.
menu:
  docs:
    weight: 50
    name: notifications
    parent: methods
    identifier: methods-notifications
aliases: [
  "/methods/notifications",
  "/api/methods/notifications",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Get all notifications {#get}

```http
GET /api/v1/notifications HTTP/1.1
```

Notifications concerning the user. This API returns Link headers containing links to the next/previous page. However, the links can also be constructed dynamically using query params and `id` values.

Types to filter include:
- `mention` = Someone mentioned you in their status
- `status` = Someone you enabled notifications for has posted a status
- `reblog` = Someone boosted one of your statuses
- `follow` = Someone followed you
- `follow_request` = Someone requested to follow you
- `favourite` = Someone favourited one of your statuses
- `poll` = A poll you have voted in or created has ended
- `update` = A status you boosted with has been edited
- `admin.sign_up` = Someone signed up (optionally sent to admins)
- `admin.report` = A new report has been filed

**Returns:** Array of [Notification]({{< relref "entities/Notification" >}})\
**OAuth:** User token + `read:notifications`\
**Version history:**\
0.0.0 - added\
2.6.0 - added `min_id`\
2.9.0 - added `account_id`\
3.1.0 - added `follow_request` type\
3.3.0 - added `status` type; both `min_id` and `max_id` can be used at the same time now\
3.5.0 - added `types`; add `update` and `admin.sign_up` types\
4.0.0 - added `admin.report` type\
4.1.0 - notification limit changed from 15 (max 30) to 40 (max 80)

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
: Integer. Maximum number of results to return. Defaults to 40 notifications. Max 80 notifications.

types[]
: Array of String. Types to include in the result.

exclude_types[]
: Array of String. Types to exclude from the results.

account_id
: String. Return only notifications received from the specified account.

#### Response

Sample call with limit=2.

```http
GET https://mastodon.social/api/v1/notifications?limit=2 HTTP/1.1
Authorization: Bearer xxx
```

##### 200: OK

The response body contains one page of notifications. You can use the HTTP Link header for further pagination.

```http
Link: <https://mastodon.example/api/v1/notifications?max_id=34975535>; rel="next", <https://mastodon.example/api/v1/notifications?min_id=34975861>;
```

```json
[
  {
    "id": "34975861",
    "type": "mention",
    "created_at": "2019-11-23T07:49:02.064Z",
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    "status": {
      "id": "103186126728896492",
      "created_at": "2019-11-23T07:49:01.940Z",
      "in_reply_to_id": "103186038209478945",
      "in_reply_to_account_id": "14715",
      // ...
      "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
      // ...
      "account": {
        "id": "971724",
        "username": "zsc",
        "acct": "zsc",
        // ...
      },
      // ...
      "mentions": [
        {
          "id": "14715",
          "username": "trwnh",
          "url": "https://mastodon.social/@trwnh",
          "acct": "trwnh"
        }
      ],
      // ...
    }
  },
  {
    "id": "34975535",
    "type": "favourite",
    "created_at": "2019-11-23T07:29:18.903Z",
    "account": {
      "id": "297420",
      "username": "haskal",
      "acct": "haskal@cybre.space",
      // ...
    },
    "status": {
      "id": "103186046267791694",
      "created_at": "2019-11-23T07:28:34.210Z",
      "in_reply_to_id": "103186044372624124",
      "in_reply_to_account_id": "297420",
      // ...
      "account": {
        "id": "14715",
        "username": "trwnh",
        "acct": "trwnh",
        // ...
      }
    }
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

## Get a single notification {#get-one}

```http
GET /api/v1/notifications/:id HTTP/1.1
```

View information about a notification with a given ID.

**Returns:** [Notification]({{< relref "entities/Notification" >}})\
**OAuth:** User token + `read:notifications`\
**Version history:**\
0.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Notification in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

A single Notification

```json
{
  "id": "34975861",
  "type": "mention",
  "created_at": "2019-11-23T07:49:02.064Z",
  "account": {
    "id": "971724",
    "username": "zsc",
    "acct": "zsc",
    // ...
  },
  "status": {
    "id": "103186126728896492",
    "created_at": "2019-11-23T07:49:01.940Z",
    "in_reply_to_id": "103186038209478945",
    "in_reply_to_account_id": "14715",
    // ...
    "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
    // ...
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    // ...
    "mentions": [
      {
        "id": "14715",
        "username": "trwnh",
        "url": "https://mastodon.social/@trwnh",
        "acct": "trwnh"
      }
    ],
    // ...
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Dismiss all notifications {#clear}

```http
POST /api/v1/notifications/clear HTTP/1.1
```

Clear all notifications from the server.

**Returns:** Empty\
**OAuth:** User token + `write:notifications`\
**Version history:**\
0.0.0 - added

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

Notifications successfully cleared.

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Dismiss a single notification {#dismiss}

```http
POST /api/v1/notifications/:id/dismiss HTTP/1.1
```

Dismiss a single notification from the server.

**Returns:** Empty\
**OAuth:** User token + `write:notifications`\
**Version history:**\
1.3.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Notification in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

Notification with given ID successfully dismissed

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## (REMOVED) Dismiss a single notification {#dismiss-deprecated}

```http
POST /api/v1/notifications/dismiss HTTP/1.1
```

Dismiss a single notification from the server.

**Returns:** Empty\
**OAuth:** User token + `write:notifications`\
**Version history**:\
0.0.0 - available\
1.3.0 - deprecated in favor of [notifications/:id/dismiss](#dismiss)
3.0.0 - removed

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters
id
: {{<required>}} String. The ID of the notification in the database.

#### Response

##### 200: OK

Notification with given ID successfully dismissed

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Get the number of unread notifications {#unread-count}

```http
GET /api/v1/notifications/unread_count HTTP/1.1
```

Get the (capped) number of unread notifications for the current user.
A notification is considered unread if it is more recent than the [notifications read marker]({{< relref "methods/markers" >}}).
Because the count is dependant on the parameters, it is computed every time and is thus a relatively slow operation (although faster than getting the full corresponding notifications), therefore the number of returned notifications is capped.

**Returns:** Hash with a single key of `count`\
**OAuth:** User token + `read:notifications`\
**Version history**:\
4.3.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

limit
: Integer. Maximum number of results to return. Defaults to 100 notifications. Max 1000 notifications.

types[]
: Array of String. Types of notifications that should count towards unread notifications.

exclude_types[]
: Array of String. Types of notifications that should not count towards unread notifications.

account_id
: String. Only count unread notifications received from the specified account.

#### Response

##### 200: OK

The response body contains the capped count of unread notifications.

```json
{
  "count": 42,
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Get the filtering policy for notifications {#get-policy}

```http
GET /api/v1/notifications/policy HTTP/1.1
```

Notifications filtering policy for the user.

**Returns:** [NotificationPolicy]({{< relref "entities/NotificationPolicy" >}})\
**OAuth:** User token + `read:notifications`\
**Version history:**\
4.3.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

The response body contains the current notifications filtering policy for the user.

```json
{
  "filter_not_following": false,
  "filter_not_followers": false,
  "filter_new_accounts": false,
  "filter_private_mentions": true,
  "summary": {
    "pending_requests_count": 0,
    "pending_notifications_count": 0
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

## Update the filtering policy for notifications

```http
PATCH /api/v1/notifications/policy HTTP/1.1
```

Update the user's notifications filtering policy.

**Returns:** [NotificationPolicy]({{< relref "entities/NotificationPolicy" >}})\
**OAuth:** User token + `write:notifications`\
**Version history:**\
4.3.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Form data parameters

filter_not_following
: Boolean. Whether to filter notifications from accounts the user is not following.

filter_not_followers
: Boolean. Whether to filter notifications from accounts that are not following the user.

filter_new_accounts
: Boolean. Whether to filter notifications from accounts created in the past 30 days.

filter_private_mentions
: Boolean. Whether to filter notifications from private mentions. Replies to private mentions initiated by the user, as well as accounts the user follows, are never filtered.


#### Response

##### 200: OK

The response body contains the updated notifications filtering policy for the user.

```json
{
  "filter_not_following": false,
  "filter_not_followers": false,
  "filter_new_accounts": false,
  "filter_private_mentions": true,
  "summary": {
    "pending_requests_count": 0,
    "pending_notifications_count": 0
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Get all notification requests {#get-requests}

```http
GET /api/v1/notifications/requests HTTP/1.1
```

Notification requests for notifications filtered by the user's policy. This API returns Link headers containing links to the next/previous page.

**Returns:** Array of [NotificationRequest]({{< relref "entities/NotificationRequest" >}})\
**OAuth:** User token + `read:notifications`\
**Version history:**\
4.3.0 - added

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
: Integer. Maximum number of results to return. Defaults to 40 notification requests. Max 80 notification requests.

#### Response

##### 200: OK

The response body contains one page of notification requests. You can use the HTTP Link header for further pagination.

```http
Link: <https://mastodon.example/api/v1/notifications/requests?max_id=112456967201894256>; rel="next", <https://mastodon.example/api/v1/notifications/requests?min_id=112456967201894256>; rel="prev"
```

```json
[
  {
    "id": "112456967201894256",
    "created_at": "2024-05-17T14:45:41.171Z",
    "updated_at": "2024-05-17T14:45:41.171Z",
    "notifications_count": "1",
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    "last_status": {
      "id": "103186126728896492",
      "created_at": "2019-11-23T07:49:01.940Z",
      "in_reply_to_id": "103186038209478945",
      "in_reply_to_account_id": "14715",
      // ...
      "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
      // ...
      "account": {
        "id": "971724",
        "username": "zsc",
        "acct": "zsc",
        // ...
      },
      // ...
      "mentions": [
        {
          "id": "14715",
          "username": "trwnh",
          "url": "https://mastodon.social/@trwnh",
          "acct": "trwnh"
        }
      ],
      // ...
    }
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

## Get a single notification request {#get-one-request}

```http
GET /api/v1/notifications/requests/:id HTTP/1.1
```

View information about a notification request with a given ID.

**Returns:** [NotificationRequest]({{< relref "entities/NotificationRequest" >}})\
**OAuth:** User token + `read:notifications`\
**Version history:**\
4.3.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Notification in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

A single notification request.

```json
  {
    "id": "112456967201894256",
    "created_at": "2024-05-17T14:45:41.171Z",
    "updated_at": "2024-05-17T14:45:41.171Z",
    "notifications_count": "1",
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    "last_status": {
      "id": "103186126728896492",
      "created_at": "2019-11-23T07:49:01.940Z",
      "in_reply_to_id": "103186038209478945",
      "in_reply_to_account_id": "14715",
      // ...
      "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
      // ...
      "account": {
        "id": "971724",
        "username": "zsc",
        "acct": "zsc",
        // ...
      },
      // ...
      "mentions": [
        {
          "id": "14715",
          "username": "trwnh",
          "url": "https://mastodon.social/@trwnh",
          "acct": "trwnh"
        }
      ],
      // ...
    }
  }
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Accept a single notification request {#accept-request}

```http
POST /api/v1/notifications/requests/:id/accept HTTP/1.1
```

Accept a notification request, which merges the filtered notifications from that user back into the main notification and accepts any future notification from them.

**Returns:** Empty\
**OAuth:** User token + `write:notifications`\
**Version history:**\
4.3.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Notification in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

A single notification request.

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Dismiss a single notification request {#dismiss-request}

```http
POST /api/v1/notifications/requests/:id/dismiss HTTP/1.1
```

Dismiss a notification request, which hides it and prevent it from contributing to the pending notification requests count.

**Returns:** Empty\
**OAuth:** User token + `write:notifications`\
**Version history:**\
4.3.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Notification in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

A single notification request.

```json
{}
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

{{< page-relref ref="methods/push" caption="push API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/notifications_controller.rb" caption="app/controllers/api/v1/notifications_controller.rb" >}}
