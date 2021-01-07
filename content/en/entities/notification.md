---
title: Notification
description: Represents a notification of an event relevant to the user.
menu:
  docs:
    parent: entities
---

## Example

{{< code title="excerpt from GET notifications" >}}
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
      ...
      },
      "account": {
        "id": "14715",
        "username": "trwnh",
        "acct": "trwnh",
        ...
      },
      ...
    }
  },
  ...
]
```
{{< /code >}}

## Required attributes

### `id` {#id}

**Description:** The id of the notification in the database.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:**\
0.9.9 - added

### `type` {#type}

**Description:** The type of event that resulted in the notification.\
**Type:** String \(Enumerable oneOf\)\
`follow` = Someone followed you\
`follow_request` = Someone requested to follow you\
`mention` = Someone mentioned you in their status\
`reblog` = Someone boosted one of your statuses\
`favourite` = Someone favourited one of your statuses\
`poll` = A poll you have voted in or created has ended\
`status` = Someone you enabled notifications for has posted a status\
**Version history:**\
0.9.9 - added\
2.8.0 - added `poll`\
3.1.0 - added `follow_request`\
3.3.0 - added `status`

### `created_at` {#created_at}

**Description:** The timestamp of the notification.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
0.9.9 - added

### `account` {#account}

**Description:** The account that performed the action that generated the notification.\
**Type:** [Account]({{< relref "account.md" >}})\
**Version history:**\
0.9.9 - added

## Optional attributes

### `status` {#status}

**Description:** Status that was the object of the notification, e.g. in mentions, reblogs, favourites, or polls.\
**Type:** [Status]({{< relref "status.md" >}})\
**Version history:**\
0.9.9 - added

## See also

{{< page-ref page="account.md" >}}

{{< page-ref page="status.md" >}}

{{< page-ref page="methods/notifications.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/notification_serializer.rb" caption="app/serializers/rest/notification\_serializer.rb" >}}



