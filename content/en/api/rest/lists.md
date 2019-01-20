---
title: Lists
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/lists

User's lists.

Returns array of [List]({{< relref "entities.md#list" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:lists" version="2.1.0" >}}

## GET /api/v1/accounts/:id/lists

User's lists that a given account is part of.

Returns array of [List]({{< relref "entities.md#list" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:lists" version="2.1.0" >}}

## GET /api/v1/lists/:id/accounts

Accounts that are in a given list.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:lists" version="2.1.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

>If you specify a `limit` of `0` in the query, all accounts will be returned without pagination. Otherwise, standard account pagination rules apply.

{{< api_pagination >}}

## GET /api/v1/lists/:id

Returns [List]({{< relref "entities.md#list" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:lists" version="2.1.0" >}}

## POST /api/v1/lists

Create a new list.

Returns [List]({{< relref "entities.md#list" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:lists" version="2.1.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `title` | The title of the list | Required |

## PUT /api/v1/lists/:id

Update a list.

Returns [List]({{< relref "entities.md#list" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:lists" version="2.1.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `title` | The title of the list | Required |

## DELETE /api/v1/lists/:id

Remove a list.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:lists" version="2.1.0" >}}

## POST /api/v1/lists/:id/accounts

Add accounts to a list.

> Only accounts already followed by the user can be added to a list.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:lists" version="2.1.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `account_ids` | Array of account IDs | Required |

## DELETE /api/v1/lists/:id/accounts

Remove accounts from a list.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:lists" version="2.1.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `account_ids` | Array of account IDs | Required |
