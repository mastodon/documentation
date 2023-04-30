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
4.0.0 - added `admin.report` type

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: String. Return results older than this ID

since_id
: String. Return results newer than this ID

min_id
: String. Return results immediately newer than this ID

limit
: Integer. Maximum number of results to return. Defaults to 40 notifications. Max notifications depends on the limit param.

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

**Returns:** empty object\
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

**Returns:** empty object\
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

**Returns:** empty object\
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

## See also

{{< page-relref ref="methods/push" caption="push API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/notifications_controller.rb" caption="app/controllers/api/v1/notifications_controller.rb" >}}
