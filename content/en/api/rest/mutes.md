---
title: Mutes
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/mutes

Accounts the user has muted.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read:mutes follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## POST /api/v1/accounts/:id/mute

Mute an account.

Returns [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:mutes follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `notifications` | Whether the mute will mute notifications or not | Optional | true |

## POST /api/v1/accounts/:id/unmute

Unmute an account.

Returns [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:mutes follow" version="0.0.0" >}}
