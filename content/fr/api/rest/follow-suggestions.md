---
title: Follow suggestions
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/suggestions

Accounts the user had past positive interactions with, but is not following yet.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read" version="2.4.3" >}}

## DELETE /api/v1/suggestions/:account_id

Remove account from suggestions.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read" version="2.4.3" >}}
