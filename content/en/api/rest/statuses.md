---
title: Statuses
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/statuses/:id

Returns [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="No" user="No" scope="read read:statuses" version="0.0.0" >}}

## GET /api/v1/statuses/:id/context

What the status replies to, and replies to it.

Returns [Context]({{< relref "entities.md#context" >}})

### Resource information

{{< api_method_info auth="No" user="No" scope="read read:statuses" version="0.0.0" >}}

## GET /api/v1/statuses/:id/card

Link preview card for a status, if available.

Returns [Card]({{< relref "entities.md#card" >}})

### Resource information

{{< api_method_info auth="No" user="No" scope="read read:statuses" version="0.0.0" >}}

## GET /api/v1/statuses/:id/reblogged_by

Accounts that reblogged the status.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="No" user="No" scope="read read:statuses" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## GET /api/v1/statuses/:id/favourited_by

Accounts that favourited the status.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="No" user="No" scope="read read:statuses" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## POST /api/v1/statuses

Publish a new status.

Returns [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:statuses" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `status` | The text of the status | Optional\* |
| `in_reply_to_id` | ID of the status you want to reply to | Optional |
| `media_ids` | Array of media IDs to attach to the status | Optional\* |
| `sensitive` | Mark the media in the status as sensitive | Optional |
| `spoiler_text` | Text to be shown as a warning before the actual content | Optional |
| `visibility` | One of `direct`, `private`, `unlisted` `public` | Optional |
| `language` | Override language code of the toot (ISO 639-2) | Optional |

> You must provide either `status` or `media_ids`, completely empty statuses are not allowed.

### Idempotency

In order to prevent duplicate statuses, this endpoint accepts an `Idempotency-Key` header, which should be set to a unique string for each new status. In the event of a network error, a request can be retried with the same `Idempotency-Key`. Only one status will be created regardless of how many requests with the same `Idempotency-Key` did go through.

See <https://stripe.com/blog/idempotency> for more on idempotency and idempotency keys.

## DELETE /api/v1/statuses/:id

Remove a status. The status may still be available a short while after the call.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:statuses" version="0.0.0" >}}

## POST /api/v1/statuses/:id/reblog

Reblog a status.

Returns [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:statuses" version="0.0.0" >}}

## POST /api/v1/statuses/:id/unreblog

Undo the reblog of a status.

Returns [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:statuses" version="0.0.0" >}}

## POST /api/v1/statuses/:id/pin

Pin user's own status to user's profile.

Returns [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:accounts" version="0.0.0" >}}

## POST /api/v1/statuses/:id/unpin

Remove pinned status from user's profile.

Returns [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:accounts" version="0.0.0" >}}
