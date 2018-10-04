---
title: Favourites API
menu:
  docs:
    parent: api
    weight: 10
---

## GET /api/v1/favourites

Returns array of [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:favourites" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 20 |

### Pagination

{{< api_pagination >}}
