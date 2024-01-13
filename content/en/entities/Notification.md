---
title: Notification
description: Represents a notification of an event relevant to the user.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/notification",
  "/entities/Notification",
  "/entities/notification",
  "/entities/Notification",
]
---

## Attributes

### `id` {#id}

**Description:** The id of the notification in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
0.9.9 - added

### `type` {#type}

**Description:** The type of event that resulted in the notification.\
**Type:** String (Enumerable oneOf)\
`mention` = Someone mentioned you in their status\
`status` = Someone you enabled notifications for has posted a status\
`reblog` = Someone boosted one of your statuses\
`follow` = Someone followed you\
`follow_request` = Someone requested to follow you\
`favourite` = Someone favourited one of your statuses\
`poll` = A poll you have voted in or created has ended\
`update` = A status you interacted with has been edited\
`admin.sign_up` = Someone signed up (optionally sent to admins)\
`admin.report` = A new report has been filed\
`severed_relationships` = Some of your follow relationships have been severed as a result of a moderation or block event\
**Version history:**\
0.9.9 - added\
2.8.0 - added `poll`\
3.1.0 - added `follow_request`\
3.3.0 - added `status`\
3.5.0 - added `update` and `admin.sign_up`\
4.0.0 - added `admin.report`\
4.3.0 - added `severed_relationships`

### `created_at` {#created_at}

**Description:** The timestamp of the notification.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
0.9.9 - added

### `account` {#account}

**Description:** The account that performed the action that generated the notification.\
**Type:** [Account]({{< relref "entities/Account" >}})\
**Version history:**\
0.9.9 - added

### `status` {{%optional%}} {#status}

**Description:** Status that was the object of the notification. Attached when `type` of the notification is `favourite`, `reblog`, `status`, `mention`, `poll`, or `update`.\
**Type:** [Status]({{< relref "entities/Status" >}})\
**Version history:**\
0.9.9 - added

### `report` {{%optional%}} {#report}

**Description:** Report that was the object of the notification. Attached when `type` of the notification is `admin.report`.\
**Type:** [Report]({{< relref "entities/Report" >}})\
**Version history:**\
4.0.0 - added

### `relationship_severance_event` {{%optional%}} {#relationship_severance_event}

**Description:** Summary of the event that caused follow relationships to be severed. Attached when `type` of the notification is `severed_relationships`.\
**Type:** [RelationshipSeveranceEvent]({{< relref "entities/RelationshipSeveranceEvent" >}})\
**Version history:**\
4.3.0 - added

## Examples

### Mention

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
    }
  }
```

### Favourite

```json
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
      // ...
      "account": {
        "id": "14715",
        "username": "trwnh",
        "acct": "trwnh",
        // ...
      },
      // ...
    }
  }
```

## See also

{{< page-relref ref="methods/notifications" caption="notifications API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/notification_serializer.rb" caption="app/serializers/rest/notification_serializer.rb" >}}



