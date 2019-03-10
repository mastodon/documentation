---
title: Polls
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/polls/:id

Returns [Poll]({{< relref "entities.md#poll" >}})

### Resource information

{{< api_method_info auth="No" user="No" scope="read read:statuses" version="2.8.0" >}}

## POST /api/v1/polls/:id/votes

Vote on a poll.

Returns [Poll]({{< relref "entities.md#poll" >}})

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `choices` | Array of choice indices | Required |

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:statuses" version="2.8.0" >}}