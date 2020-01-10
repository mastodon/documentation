---
title: PushSubscription
description: Represents a subscription to the push streaming server.
menu:
  docs:
    parent: entities
---

## Example

```javascript
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

## Required attributes <a id="push-subscription"></a>

### `id` <a id="id"></a>

**Description:** The id of the push subscription in the database.
**Type:** String \(cast from an integer, but not guaranteed to be a number\)
**Version history:** Added in 2.4.0

### `endpoint` <a id="endpoint"></a>

**Description:** Where push alerts will be sent to.
**Type:** String \(URL\)
**Version history:** Added in 2.4.0

### `server_key` <a id="server_key"></a>

**Description:** The streaming server's VAPID key.
**Type:** String
**Version history:** Added in 2.4.0

### `alerts` <a id="alerts"></a>

**Description:** Which alerts should be delivered to the `endpoint`.
**Type:** Hash
**Version history:** Added in 2.4.0. `alerts[poll]` added in 2.8.0.

#### `alerts[follow]`

Receive a push notification when someone has followed you? Boolean.

#### `alerts[favourite]`

Receive a push notification when a status you created has been favourited by someone else? Boolean.

#### `alerts[mention]`

Receive a push notification when someone else has mentioned you in a status? Boolean.

#### `alerts[reblog]`

Receive a push notification when a status you created has been boosted by someone else? Boolean.

#### `alerts[poll]`

Receive a push notification when a poll you voted in or created has ended? Boolean. Added in 2.8.0

## See also

{{< page-ref page="methods/notifications/push.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/web_push_subscription_serializer.rb" caption="app/serializers/rest/web\_push\_subscription\_serializer.rb" >}}



