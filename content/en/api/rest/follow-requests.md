---
title: Follow requests
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/follow_requests

Accounts that have requested to follow the user.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:follows follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## POST /api/v1/follow_requests/:id/authorize

Allow the account to follow the user.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:follows follow" version="0.0.0" >}}

## POST /api/v1/follow_requests/:id/reject

Do not allow the account to follow the user.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:follows follow" version="0.0.0" >}}
