---
title: Accounts
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/accounts/:id

Returns [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="No" user="No" scope="read read:accounts" version="0.0.0" >}}

## GET /api/v1/accounts/verify_credentials

User's own account.

Returns [Account]({{< relref "entities.md#account" >}}) with an extra `source` attribute.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:accounts" version="0.0.0" >}}

## PATCH /api/v1/accounts/update_credentials

Update user's own account.

Returns [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:accounts" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `display_name` | Display name | Optional |
| `note` | Biography | Optional |
| `avatar` | Avatar encoded using `multipart/form-data` | Optional |
| `header` | Header image encoded using `multipart/form-data` | Optional |
| `locked` | Enable follow requests | Optional |
| `source` | Extra preferences | Optional |
| `fields_attributes` | Profile metadata | Optional |

## GET /api/v1/accounts/:id/followers

Accounts which follow the given account.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="No" scope="read read:accounts" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## GET /api/v1/accounts/:id/following

Accounts which the given account is following.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="No" scope="read read:accounts" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## GET /api/v1/accounts/:id/statuses

An account's statuses.

Returns array of [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="No" scope="read read:statuses" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `only_media` | Only return statuses that have media attachments | Optional |false|
| `pinned` | Only return statuses that have been pinned | Optional |false|
| `exclude_replies` | Skip statuses that reply to other statuses | Optional |false|
| `max_id` | Return results older than ID | Optional ||
| `since_id` | Return results newer than ID | Optional ||
| `limit` | Maximum number of results | Optional | 20 |

### Pagination

{{< api_dynamic_pagination >}}

## POST /api/v1/accounts/:id/follow

Follow an account.

Returns [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:follows follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `reblogs` | Whether the followed account's reblogs will show up in the home timeline | Optional | true |

## POST /api/v1/accounts/:id/unfollow

Unfollow an account.

Returns [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:follows follow" version="0.0.0" >}}

## GET /api/v1/accounts/relationships

Relationship of the user to the given accounts in regards to following, blocking, muting, etc.

Returns array of [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:follows" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `id` | Array of account IDs | Required |

## GET /api/v1/accounts/search

Search for matching accounts by username, domain and display name.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:accounts" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `q` | What to search for | Required ||
| `limit` | Maximum number of results | Optional | 40 |
| `resolve` | Attempt WebFinger look-up | Optional | false |
| `following` | Only who the user is following | Optional | false |
