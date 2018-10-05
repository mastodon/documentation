---
title: Filters
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/filters

Text filters the user has configured that potentially must be applied client-side.

Returns array of [Filter]({{< relref "entities.md#filter" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:filters" version="0.0.0" >}}

## POST /api/v1/filters

Create a new filter.

Returns [Filter]({{< relref "entities.md#filter" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:filters" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `phrase` | Keyword or phrase to filter | Required |
| `context` | Array of strings that means filtering context. Each string is one of `home`, `notifications`, `public`, `thread`. At least one context must be specified. | Required |
| `irreversible` | Irreversible filtering will only work in `home` and `notifications` contexts by fully dropping the records. Otherwise, filtering is up to the client. | Optional |
| `whole_word` | Whether to consider word boundaries when matching | Optional |
| `expires_in` | Number that indicates seconds. Filter will be expire in seconds after API processed. Null or blank string means "don't change" | Optional |

## GET /api/v1/filters/:id

A text filter.

Returns [Filter]({{< relref "entities.md#filter" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:filters" version="0.0.0" >}}

## PUT /api/v1/filters/:id

Update a text filter.

Returns [Filter]({{< relref "entities.md#filter" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:filters" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `phrase` | Keyword or phrase to filter | Required |
| `context` | Array of strings that means filtering context. Each string is one of `home`, `notifications`, `public`, `thread`. At least one context must be specified. | Required |
| `irreversible` | Irreversible filtering will only work in `home` and `notifications` contexts by fully dropping the records. Otherwise, filtering is up to the client. | Optional |
| `whole_word` | Whether to consider word boundaries when matching | Optional |
| `expires_in` | Number that indicates seconds. Filter will be expire in seconds after API processed. Null or blank string means "don't change" | Optional |

## DELETE /api/v1/filters/:id

Delete a text filter.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:filters" version="0.0.0" >}}
