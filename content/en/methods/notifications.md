---
title: notifications
description: Receive notifications for activity on your account or statuses.
menu:
  docs:
    weight: 50
    parent: methods
    identifier: methods-notifications
---

## Get all notifications {#get-all}

```http
GET https://mastodon.example/api/v1/notifications HTTP/1.1
```

Notifications concerning the user. This API returns Link headers containing links to the next/previous page. However, the links can also be constructed dynamically using query params and `id` values.\
\
Types to filter include \(`follow`, `favourite`, `reblog`, `mention`, `poll`, `follow_request`, `status`, `admin.signup`\)

**Returns:** Array of Notification\
**OAuth:** User token + `read:notifications`\
**Version history:**\
0.0.0 - added\
2.6.0 - add `min_id`\
2.9.0 - add `account_id`\
3.1.0 - add `follow_request` type\
3.3.0 - add `status` type\
3.5.0 - add `types`; add `admin.signup` type

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

### Query parameters

max_id 
: String. Return results older than this ID

since_id
: String. Return results newer than this ID

min_id
: String. Return results immediately newer than this ID

limit
: String. Maximum number of results to return. Default: 20.

types
: Array. Types to include in the result.

exclude_types
: Array. Types to exclude from the results.

account_id
: String. Return only notifications received from the specified account.

#### Response

Sample call with limit=2.

```http
GET https://mastodon.social/api/v1/notifications?limit=2 HTTP/1.1
Authorization: Bearer xxx
```

##### 200: Success

The response body contains one page of notifications. You can use the HTTP Link header for further pagination.

```http
Link: <https://mastodon.social/api/v1/notifications?max_id=34975535>; rel="next", <https://mastodon.social/api/v1/notifications?min_id=34975861>;
```

```javascript
[
  {
    "id": "34975861",
    "type": "mention",
    "created_at": "2019-11-23T07:49:02.064Z",
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      ...
    },
    "status": {
      "id": "103186126728896492",
      "created_at": "2019-11-23T07:49:01.940Z",
      "in_reply_to_id": "103186038209478945",
      "in_reply_to_account_id": "14715",
      ...
      "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
      ...
      "account": {
        "id": "971724",
        "username": "zsc",
        "acct": "zsc",
        ...
      },
      ...
      "mentions": [
        {
          "id": "14715",
          "username": "trwnh",
          "url": "https://mastodon.social/@trwnh",
          "acct": "trwnh"
        }
      ],
      ...
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
      ...
    },
    "status": {
      "id": "103186046267791694",
      "created_at": "2019-11-23T07:28:34.210Z",
      "in_reply_to_id": "103186044372624124",
      "in_reply_to_account_id": "297420",
      ...
      "account": {
        "id": "14715",
        "username": "trwnh",
        "acct": "trwnh",
        ...
      }
    }
  }
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

## Get a single notification {#get-one}

```http
GET https://mastodon.example/api/v1/notification/:id HTTP/1.1
```

View information about a notification with a given ID.

**Returns:** Notification\
**OAuth:** User token + `read:notifications`\
**Version history:**\
0.0.0 - added

#### Request

##### Path parameters
:id
: {{<required>}} ID of the notification in the database.

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: Success

A single Notification

```javascript
{
  "id": "34975861",
  "type": "mention",
  "created_at": "2019-11-23T07:49:02.064Z",
  "account": {
    "id": "971724",
    "username": "zsc",
    "acct": "zsc",
    ...
  },
  "status": {
    "id": "103186126728896492",
    "created_at": "2019-11-23T07:49:01.940Z",
    "in_reply_to_id": "103186038209478945",
    "in_reply_to_account_id": "14715",
    ...
    "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
    ...
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      ...
    },
    ...
    "mentions": [
      {
        "id": "14715",
        "username": "trwnh",
        "url": "https://mastodon.social/@trwnh",
        "acct": "trwnh"
      }
    ],
    ...
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## Dismiss all notifications {#dismiss-all}

```http
POST https://mastodon.example/api/v1/notifications/clear HTTP/1.1
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

##### 200: Success

Notifications successfully cleared.

```javascript
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## Dismiss a single notification {#dismiss-one}

```http
POST https://mastodon.example/api/v1/notifications/:id/dismiss HTTP/1.1
```

Dismiss a single notification from the server.

**Returns:** empty object\
**OAuth:** User token + `write:notifications`\
**Version history:**\
1.3.0 - added

#### Request

##### Path parameters
:id
: {{<required>}} ID of the notification in the database.

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: Success

Notification with given ID successfully dismissed

```javascript
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

### (DEPRECATED) Dismiss a single notification {#dismiss-one-deprecated}

```http
POST https://mastodon.example/api/v1/notifications/dismiss HTTP/1.1
```

Dismiss a single notification from the server.

**Returns:** empty object\
**OAuth:** User token + `write:notifications`\
**Version history**:\
0.0.0 - available\
3.0.0 - removed

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters
:id
: {{<required>}} String. ID of the notification in the database.

#### Response

##### 200: Success

Notification with given ID successfully dismissed

```javascript
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```