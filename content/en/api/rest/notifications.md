---
title: Notifications
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/notifications

Notifications concerning the user.

Returns array of [Notification]({{< relref "entities.md#notification" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:notifications" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `max_id` | Return results older than ID | Optional ||
| `since_id` | Return results newer than ID | Optional ||
| `min_id` | Return results immediately newer than ID | Optional ||
| `limit` | Maximum number of results | Optional | 20 |
| `exclude_types` | Array of types to exclude (e.g. `follow`, `favourite`, `reblog`, `mention`) | Optional ||
| `account_id` | account id of user to include | Optional ||

### Pagination

{{< api_dynamic_pagination >}}

## GET /api/v1/notifications/:id

Returns [Notification]({{< relref "entities.md#notification" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:notifications" version="0.0.0" >}}

## POST /api/v1/notifications/clear

Delete all notifications from the server.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:notifications" version="0.0.0" >}}

## POST /api/v1/notifications/dismiss

Delete a single notification from the server.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:notifications" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `id` | Notification ID | Required |

## POST /api/v1/push/subscription

Add a Web Push API subscription to receive notifications. See also: [Web Push API]({{< relref "push.md" >}})

> Each access token can have one push subscription. If you create a new subscription, the old subscription is deleted.

Returns [Push Subscription]({{< relref "entities.md#push-subscription" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="push" version="2.4.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `subscription[endpoint]` | Endpoint URL that called when notification is happen. | Required |
| `subscription[keys][p256dh]` | User agent public key. Base64 encoded string of public key of ECDH key using 'prime256v1' curve. | Required |
| `subscription[keys][auth]` | Auth secret. Base64 encoded string of 16 bytes of random data. | Required |
| `data[alerts][follow]` | Boolean of whether you want to receive follow notification event. | Optional |
| `data[alerts][favourite]` | Boolean of whether you want to receive favourite notification event. | Optional |
| `data[alerts][reblog]` | Boolean of whether you want to receive reblog notification event. | Optional |
| `data[alerts][mention]` | Boolean of whether you want to receive mention notification event. | Optional |

## GET /api/v1/push/subscription

Returns [Push Subscription]({{< relref "entities.md#push-subscription" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="push" version="2.4.0" >}}

## PUT /api/v1/push/subscription

Update current Web Push API subscription. Only the `data` part can be updated, e.g. which types of notifications are desired. To change fundamentals, a new subscription must be created instead.

Returns [Push Subscription]({{< relref "entities.md#push-subscription" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="push" version="2.4.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `data[alerts][follow]` | Boolean of whether you want to receive follow notification event. | Optional |
| `data[alerts][favourite]` | Boolean of whether you want to receive favourite notification event. | Optional |
| `data[alerts][reblog]` | Boolean of whether you want to receive reblog notification event. | Optional |
| `data[alerts][mention]` | Boolean of whether you want to receive mention notification event. | Optional |

## DELETE /api/v1/push/subscription

Remove the current Web Push API subscription.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="push" version="2.4.0" >}}
