---
title: Scheduled Statuses
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/scheduled_statuses

Get scheduled statuses.

Returns array of [ScheduledStatus]({{< relref "entities.md#scheduledstatus" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:statuses" version="2.7.0" >}}

## GET /api/v1/scheduled_statuses/:id

Get scheduled status.

Returns [ScheduledStatus]({{< relref "entities.md#scheduledstatus" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:statuses" version="2.7.0" >}}

## PUT /api/v1/scheduled_statuses/:id

Update Scheduled status. Only `scheduled_at` can be changed. To change the content, delete it and post a new status.

Returns [ScheduledStatus]({{< relref "entities.md#scheduledstatus" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:statuses" version="2.7.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `scheduled_at` | Timestamp string to schedule posting of status (ISO 8601) | Optional |

## DELETE /api/v1/scheduled_statuses/:id

Remove Scheduled status.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:statuses" version="2.7.0" >}}
