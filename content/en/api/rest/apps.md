---
title: Apps API
menu:
  docs:
    parent: api
    weight: 10
---

## POST /api/v1/apps

Create a new application to obtain OAuth2 credentials.

Returns [App]({{< relref "entities.md#app" >}}) with `client_id` and `client_secret`

### Resource information

{{< api_method_info auth="No" user="No" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `client_name` | Name of your application | Required ||
| `redirect_uris` | Where the user should be redirected after authorization (for no redirect, use `urn:ietf:wg:oauth:2.0:oob`) | Required ||
| `scopes` | Space separated list of [scopes]({{< relref "permissions.md" >}}) | Required ||
| `website` | URL to the homepage of your app | Optional ||
