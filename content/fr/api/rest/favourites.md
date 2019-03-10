---
title: Favourites
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/favourites

Statuses the user has favourited.

Returns array of [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:favourites" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 20 |

### Pagination

{{< api_pagination >}}

## POST /api/v1/statuses/:id/favourite

Favourite a status.

Returns [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:favourites" version="0.0.0" >}}

## POST /api/v1/statuses/:id/unfavourite

Undo the favourite of a status.

Returns [Status]({{< relref "entities.md#status" >}})
