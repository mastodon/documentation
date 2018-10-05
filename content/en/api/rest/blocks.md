---
title: Blocks
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/blocks

Accounts the user has blocked.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read:blocks follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## POST /api/v1/accounts/:id/block

Block an account.

Returns [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:blocks follow" version="0.0.0" >}}

## POST /api/v1/accounts/:id/unblock

Unblock an account.

Returns [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:blocks follow" version="0.0.0" >}}
