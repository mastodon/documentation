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

When `scheduled_at` option is present,
Returns [ScheduledStatus]({{< relref "entities.md#scheduledstatus" >}}) 

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:statuses" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Added in|
|----|-----------|:------:|:------:|
| `status` | The text of the status | Optional\* |
| `in_reply_to_id` | ID of the status you want to reply to | Optional |
| `media_ids` | Array of media IDs to attach to the status | Optional\* |
| `poll` | Nested parameters to attach a poll to the status | Optional\* |2.8.0|
| `sensitive` | Mark the media in the status as sensitive | Optional |
| `spoiler_text` | Text to be shown as a warning before the actual content | Optional |
| `visibility` | One of `direct`, `private`, `unlisted` `public` | Optional |
| `scheduled_at` | Timestamp string to schedule posting of status (ISO 8601) | Optional |2.7.0|
| `language` | Override language code of the toot (ISO 639-2) | Optional |

> You must provide either `status` or `media_ids`, completely empty statuses are not allowed. Polls require a `status` and cannot be combined with `media_ids`.

Poll parameters:

|Name|Description|Required|
|----|-----------|:------:|
| `poll[options]` | Array of poll answer strings | Required |
| `poll[expires_in]` | Duration the poll should be open for in seconds | Required |
| `poll[multiple]` | Whether multiple choices should be allowed | Optional |
| `poll[hide_totals]` | Whether to hide totals until the poll ends | Optional |

### Idempotency

In order to prevent duplicate statuses, this endpoint accepts an `Idempotency-Key` header, which should be set to a unique string for each new status. In the event of a network error, a request can be retried with the same `Idempotency-Key`. Only one status will be created regardless of how many requests with the same `Idempotency-Key` did go through.

See <https://stripe.com/blog/idempotency> for more on idempotency and idempotency keys.

### Scheduled status

Allows users to schedule a toot (with media attachments) to be published at a certain future date.

The scheduled date must be at least 5 minutes into the future. At most, 300 toots can be scheduled at the same time. Only 50 toots can be scheduled for any given day.

When `scheduled_at` option is present, instead of creating a status, we only run status validation, and if it passes, we create an entry in scheduled_statuses which encodes the status attributes.  Every 5 minutes, a scheduler iterates over the scheduled_statuses table to fetch the ones due in the next 5 minutes, and push them into a more precise Sidekiq queue. In Sidekiq, the individual statuses are created, with media attachments being unassigned from the scheduled status and assigned to the real one.

This option was added since v2.7.0.

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

{{< api_method_info auth="Yes" user="Yes" scope="write write:accounts" version="1.6.0" >}}

## POST /api/v1/statuses/:id/unpin

Remove pinned status from user's profile.

Returns [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:accounts" version="1.6.0" >}}
