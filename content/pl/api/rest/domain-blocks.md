---
title: Domain blocks
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/domain_blocks

Domains the user has blocked.

Returns array of string.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:blocks follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## POST /api/v1/domain_blocks

Block a domain to hide all public posts from it, all notifications from it, and remove all followers from it.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:blocks follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `domain` | Domain to block| Required |

## DELETE /api/v1/domain_blocks

Remove a domain block.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:blocks follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `domain` | Domain to unblock| Required |
