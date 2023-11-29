---
title: WebPushSubscription
description: Represents a subscription to the push streaming server.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/pushsubscription",
  "/entities/PushSubscription",
  "/entities/webpushsubscription",
  "/entities/WebPushSubscription",
  "/api/entities/pushsubscription",
  "/api/entities/PushSubscription",
  "/api/entities/webpushsubscription",
  "/api/entities/WebPushSubscription",
]
---

## Example

```json
{
  "id": 328183,
  "endpoint": "https://yourdomain.example/listener",
  "alerts": {
    "follow": false,
    "favourite": false,
    "reblog": false,
    "mention": true,
    "poll": false
  },
  "server_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the Web Push subscription in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
2.4.0 - added

### `endpoint` {#endpoint}

**Description:** Where push alerts will be sent to.\
**Type:** String (URL)\
**Version history:**\
2.4.0 - added

### `server_key` {#server_key}

**Description:** The streaming server's VAPID key.\
**Type:** String\
**Version history:**\
2.4.0 - added

### `alerts` {#alerts}

**Description:** Which alerts should be delivered to the `endpoint`.\
**Type:** Hash\
**Version history:**\
2.4.0 - added\
2.8.0 - added `alerts[poll]`\
3.1.0 - added `alerts[follow_request]`\
3.3.0 - added `alerts[status]`\
3.5.0 - added `alerts[update]` and `alerts[admin.sign_up]`\
4.0.0 - added `alerts[admin.report]`

#### `alerts[mention]` {#mention}

**Description:** Receive a push notification when someone else has mentioned you in a status?\
**Type:** Boolean\
**Version history:**\
2.4.0 - added

#### `alerts[status]` {#status}

**Description:** Receive a push notification when a subscribed account posts a status?\
**Type:** Boolean\
**Version history:**\
3.3.0 - added

#### `alerts[reblog]` {#reblog}

**Description:** Receive a push notification when a status you created has been boosted by someone else?\
**Type:** Boolean\
**Version history:**\
2.4.0 - added

#### `alerts[follow]` {#follow}

**Description:** Receive a push notification when someone has followed you?\
**Type:** Boolean\
**Version history:**\
2.4.0 - added

#### `alerts[follow_request]` {#follow_request}

**Description:** Receive a push notification when someone has requested to followed you?\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

#### `alerts[favourite]` {#favourite}

**Description:** Receive a push notification when a status you created has been favourited by someone else?\
**Type:** Boolean\
**Version history:**\
2.4.0 - added

#### `alerts[poll]` {#poll}

**Description:** Receive a push notification when a poll you voted in or created has ended?\
**Type:** Boolean\
**Version history:**\
2.8.0 - added

#### `alerts[update]` {#update}

**Description:** Receive a push notification when a status you interacted with has been edited?\
**Type:** Boolean\
**Version history:**\
3.5.0 - added

#### `alerts[admin.sign_up]` {#admin-sign_up}

**Description:** Receive a push notification when a new user has signed up?\
**Type:** Boolean\
**Version history:**\
3.5.0 - added

#### `alerts[admin.report]` {#admin-report}

**Description:** Receive a push notification when a new report has been filed?\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/push" caption="push API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/web_push_subscription_serializer.rb" caption="app/serializers/rest/web_push_subscription_serializer.rb" >}}



