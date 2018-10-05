---
title: Endorsements
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/endorsements

Accounts the user chose to endorse.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:account" version="0.0.0" >}}

### Pagination

{{< api_pagination >}}
