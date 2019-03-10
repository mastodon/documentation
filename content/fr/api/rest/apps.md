---
title: Apps
menu:
  docs:
    parent: rest-api
    weight: 10
---

## POST /api/v1/apps

Create a new application to obtain OAuth2 credentials.

Returns [App]({{< relref "entities.md#app" >}}) with `client_id` and `client_secret`

### Resource information

{{< api_method_info auth="No" user="No" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `client_name` | Name of your application | Required |
| `redirect_uris` | Where the user should be redirected after authorization | Required |
| `scopes` | Space separated list of [scopes]({{< relref "permissions.md" >}}) | Required |
| `website` | URL to the homepage of your app | Optional |

> To display the authorization code to the end-user instead of redirecting to a web page, use `urn:ietf:wg:oauth:2.0:oob` in `redirect_uris`

## GET /api/v1/apps/verify_credentials

Confirm that the app's OAuth2 credentials work.

Returns [App]({{< relref "entities.md#app" >}})

### Resource information

{{< api_method_info auth="Yes" user="No" version="2.0.0" >}}
