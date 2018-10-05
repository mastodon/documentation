---
title: Search
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v2/search

Search for content in accounts, statuses and hashtags.

Returns [Results]({{< relref "entities.md#results" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:search" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `q` | The search query | Required ||
| `resolve` | Attempt WebFinger look-up | Optional |false|
