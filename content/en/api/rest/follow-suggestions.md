---
title: Follow suggestions API
menu:
  docs:
    parent: api
    weight: 10
---

## GET /api/v1/suggestions

Accounts the user had past positive interactions with, but is not following yet.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read" version="0.0.0" >}}

## DELETE /api/v1/suggestions/:account_id

Remove account from suggestions.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read" version="0.0.0" >}}
