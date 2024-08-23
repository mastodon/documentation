---
title: notifications API alpha methods
description: Receive notifications for activity on your account or statuses.
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

{{< hint style="warning" >}}
This page documents API endpoints that are not finalized. We welcome feedback on them and you are free to implement them, but we recommend not having these implementations in a release, as they are likely to change and we will not ensure backward compatibility if they do.
{{</ hint >}}

## Get all grouped notifications {#get-grouped}

```http
GET /api/v2_alpha/notifications HTTP/1.1
```

Return grouped notifications concerning the user. This API returns Link headers containing links to the next/previous page. However, the links can also be constructed dynamically using query params and `id` values.

Notifications of type `favourite` or `reblog` with the same type and the same target made in a similar timeframe are given a same `group_key` by the server, and querying this endpoint will return aggregated notifications, with only one object per `group_key`.

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

**Returns:** [GroupedNotificationsResults](#GroupedNotificationsResults)\
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
: Integer. Maximum number of results to return. Defaults to 40 notifications. Max 80 notifications.

types[]
: Array of String. Types to include in the result.

exclude_types[]
: Array of String. Types to exclude from the results.

account_id
: String. Return only notifications received from the specified account.

expand_accounts
: String. One of `full` (default) or `partial_avatars`. When set to `partial_avatars`, some accounts will not be rendered in full in the returned `accounts` list but will be instead returned in stripped-down form in the `partial_accounts` list. The most recent account in a notification group is always rendered in full in the `accounts` attribute.

#### Response

Sample call with limit=2.

```http
GET https://mastodon.social/api/v2_alpha/notifications?limit=2 HTTP/1.1
Authorization: Bearer xxx
```

##### 200: OK

The response body contains one page of grouped notifications. You can use the HTTP Link header for further pagination.

```http
Link: <https://mastodon.social/api/v2_alpha/notifications?limit=2&max_id=196012>; rel="next", <https://mastodon.social/api/v2_alpha/notifications?limit=2&min_id=196014>; rel="prev";
```

```json
{
  "accounts": [
    {
      "id": "16",
      "username": "eve",
      "acct": "eve",
      // …
    },
    {
      "id": "3547",
      "username": "alice",
      "acct": "alice",
      // …
    },
    {
      "id": "31460",
      "username": "bob",
      "acct": "bob",
      // …
    },
    {
      "id": "36509",
      "username": "mallory",
      "acct": "mallory",
      // …
    }
  ],
  "statuses": [
    {
      "id": "113010503322889311",
      "created_at": "2024-08-23T08:57:12.057Z",
      "account": {
        "id": "55911",
        "username": "user",
        "acct": "user",
        // …
      },
      // …
    },
    {
      "id": "113006771938929950",
      "created_at": "2024-08-22T17:08:15.654Z",
      "account": {
        "id": "55911",
        "username": "user",
        "acct": "user",
        // …
      },
      // …
    }
  ],
  "notification_groups": [
    {
      "group_key": "favourite-113010503322889311-479000",
      "notifications_count": 2,
      "type": "favourite",
      "most_recent_notification_id": 196014,
      "page_min_id": "196013",
      "page_max_id": "196014",
      "latest_page_notification_at": "2024-08-23T08:59:56.743Z",
      "sample_account_ids": [
        "16",
        "3547"
      ],
      "status_id": "113010503322889311"
    },
    {
      "group_key": "favourite-113006771938929950-478999",
      "notifications_count": 2,
      "type": "favourite",
      "most_recent_notification_id": 196012,
      "page_min_id": "196012",
      "page_max_id": "196012",
      "latest_page_notification_at": "2024-08-23T08:16:32.112Z",
      "sample_account_ids": [
        "31460",
        "36509"
      ],
      "status_id": "113006771938929950"
    }
  ]
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

## Get a single notification group {#get-notification-group}

```http
GET /api/v2_alpha/notifications/:group_key HTTP/1.1
```

View information about a specific notification group with a given group key.

**Returns:** [NotificationGroup]({{< relref "entities/NotificationGroup" >}})\
**OAuth:** User token + `read:notifications`\
**Version history:**\
4.3.0 - added

#### Request

##### Path parameters

:group_key
: {{<required>}} String. The group key of the notification group.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

A single notification group

TODO

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Dismiss a single notification group {#dismiss-group}

```http
POST /api/v2_alpha/notifications/:group_key/dismiss HTTP/1.1
```

Dismiss a single notification group from the server.

**Returns:** Empty\
**OAuth:** User token + `write:notifications`\
**Version history:**\
4.3.0 - added

#### Request

##### Path parameters

:group_key
: {{<required>}} String. The group key of the notifications to discard.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

Upon a successful request, notifications with the given group key are successfully dismissed.

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

## Get the number of unread notifications {#unread-group-count}

```http
GET /api/v2_alpha/notifications/unread_count HTTP/1.1
```

Get the (capped) number of unread notification groups for the current user.
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

## `GroupedNotificationsResults` entity {#GroupedNotificationsResults}

### Attributes

#### `accounts`

**Description:** Accounts referenced by grouped notifications.\
**Type:** Array of [Account]({{< relref "entities/Account" >}})\
**Version history:**\
4.3.0 - added

#### `partial_accounts` {{%optional%}}

**Description:** Partial accounts referenced by grouped notifications. Those are only returned when requesting grouped notifications with `expand_accounts=partial_avatars`.
**Type:** Array of [PartialAccountWithAvatar](#PartialAccountWithAvatar)\
**Version history:**\
4.3.0 - added

#### `statuses`

**Description:** Statuses referenced by grouped notifications.\
**Type:** Array of [Status]({{< relref "entities/Status" >}}}\
**Version history:**\
4.3.0 - added

#### `notification_groups`

**Description:** The grouped notifications themselves.
**Type:** [NotificationGroup](#NotificationGroup)\
**Version history:**
4.3.0 - added

### Examples

TODO

---

## `PartialAccountWithAvatar` entity {#PartialAccountWithAvatar}

These are stripped-down versions of [Account]({{< relref "entities/Account" >}}) that only contain what is necessary to display a list of avatars, as well as a few other useful properties. The aim is to cut back on expensive server-side serialization and reduce the network payload size of notification groups. 

### Attributes

#### `id`

**Description:** The account id.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.3.0 - added

#### `acct`

**Description:** The Webfinger account URI. Equal to `username` for local users, or `username@domain` for remote users.\
**Type:** String\
**Version history:**\
4.3.0 - added

#### `url`

**Description:** The location of the user's profile page.\
**Type:** String (URL)\
**Version history:**\
4.3.0 - added

#### `avatar`

**Description:** An image icon that is shown next to statuses and in the profile.\
**Type:** String (URL)\
**Version history:**\
4.3.0 - added

#### `avatar_static`

**Description:** A static version of the avatar. Equal to `avatar` if its value is a static image; different if `avatar` is an animated GIF.\
**Type:** String (URL)\
**Version history:**\
4.3.0 - added

#### `locked`

**Description:** Whether the account manually approves follow requests.\
**Type:** Boolean\
**Version history:**\
4.3.0 - added

#### `bot`

**Description:** Indicates that the account may perform automated actions, may not be monitored, or identifies as a robot.\
**Type:** Boolean\
**Version history:**\
4.3.0 - added

### Examples

TODO

--

## `NotificationGroup` entity {#NotificationGroup}

### Attributes

TODO

### Examples

TODO

---

## See also

{{< page-relref ref="methods/notifications" caption="Released notifications API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2_alpha/notifications_controller.rb" caption="app/controllers/api/v2_alpha/notifications_controller.rb" >}}
