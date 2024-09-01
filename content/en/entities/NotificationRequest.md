---
title: NotificationRequest
description: Represents a group of filtered notifications from a specific user.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/NotificationRequest",
]
---

## Attributes

### `id` {#id}

**Description:** The id of the notification request in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.3.0 - added

### `created_at` {#created_at}

**Description:** The timestamp of the notification request, i.e. when the first filtered notification from that user was created.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.3.0 - added

### `updated_at` {#updated_at}

**Description:** The timestamp of when the notification request was last updated.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.3.0 - added

### `account` {#account}

**Description:** The account that performed the action that generated the filtered notifications.\
**Type:** [Account]({{< relref "entities/Account" >}})\
**Version history:**\
4.3.0 - added

### `notifications_count` {#notifications_count}

**Description:** How many of this account's notifications were filtered.\
**Type:** String\
**Version history:**\
4.3.0 - added

### `last_status` {{%optional%}} {#last_status}

**Description:** Most recent status associated with a filtered notification from that account.\
**Type:** [Status]({{< relref "entities/Status" >}})\
**Version history:**\
4.3.0 - added

## Example

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

## See also

{{< page-relref ref="methods/notifications" caption="notifications API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/notification_request_serializer.rb" caption="app/serializers/rest/notification_request_serializer.rb" >}}
