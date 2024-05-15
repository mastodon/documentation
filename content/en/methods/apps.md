---
title: apps API methods
description: Register client applications that can be used to obtain OAuth tokens.
menu:
  docs:
    weight: 10
    name: apps
    parent: methods
    identifier: methods-apps
aliases: ["/methods/apps", "/api/methods/apps"]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Create an application {#create}

```http
POST /api/v1/apps HTTP/1.1
```

Create a new application to obtain OAuth2 credentials.

**Returns:** [Application]({{< relref "entities/Application" >}})\
**OAuth:** Public\
**Version history:**\
0.0.0 - added\
2.7.2 - now returns `vapid_key`\
4.3.0 - deprecated `vapid_key`, please see [api/v2/instance]({{< relref "methods/Instance#v2">}})\
4.3.0 - added support for multiple `redirect_uris` in Form data parameters\
4.3.0 - added `redirect_uris` response property\
4.3.0 - deprecated `redirect_uri` response property, since this can be a non-URI if multiple `redirect_uris` are registered

#### Request

Example request:

```
POST /api/v1/apps HTTP/1.1
Content-Type: application/json

{
  "client_name": "Test Application",
  "redirect_uris": ["https://app.example/callback", "https://app.example/register"],
  "scopes": "read write push",
  "website": "https://app.example"
}
```

##### Form data parameters

client_name
: {{<required>}} String. A name for your application

redirect_uris
: {{<required>}} String or Array of Strings. Where the user should be redirected after authorization. To display the authorization code to the user instead of redirecting to a web page, use `urn:ietf:wg:oauth:2.0:oob` in this parameter.

scopes
: String. Space separated list of scopes. If none is provided, defaults to `read`. See [OAuth Scopes]({{< relref "api/oauth-scopes" >}}) for a list of possible scopes.

website
: String. A URL to the homepage of your app

#### Response

##### 200: OK

Store the `client_id` and `client_secret` in your cache, as these will be used to obtain OAuth tokens.

{{< hint style="warning" >}}
Treat the `client_id` and `client_secret` properties as if they are passwords. We recommend you encrypt these when storing in your cache, to prevent credential exposure.
{{< /hint >}}

```json
{
  "id": "563419",
  "name": "Test Application",
  "website": "https://app.example",
  "scopes": ["read", "write", "push"],
  "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
  "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob"],
  "client_id": "TWhM-tNSuncnqN7DBJmoyeLnk6K3iJJ71KKXxgL1hPM",
  "client_secret": "ZEaFUFmF0umgBX1qKJDjaU99Q31lDkOU8NutzTOoliw"
}
```

Or with multiple redirect URIs:

```json
{
  "id": "563419",
  "name": "Test Application",
  "website": "https://app.example",
  "scopes": ["read", "write", "push"],
  "redirect_uri": "https://app.example/callback\nhttps://app.example/register",
  "redirect_uris": [
    "https://app.example/callback",
    "https://app.example/register"
  ],
  "client_id": "TWhM-tNSuncnqN7DBJmoyeLnk6K3iJJ71KKXxgL1hPM",
  "client_secret": "ZEaFUFmF0umgBX1qKJDjaU99Q31lDkOU8NutzTOoliw"
}
```

{{< hint style="info" >}}
The `redirect_uri` property in the above examples is considered deprecated as of 4.3.0 and should not be used, instead use the `redirect_uris` property.
{{< /hint >}}

##### 422: Unprocessable entity

If a required parameter is missing or improperly formatted, the request will fail.

```json
{
  "error": "Validation failed: Redirect URI must be an absolute URI."
}
```

---

## Verify your app works {#verify_credentials}

```http
GET /api/v1/apps/verify_credentials HTTP/1.1
```

Confirm that the app's OAuth2 credentials work.

**Returns:** [Application]({{< relref "entities/application" >}}), but without `client_secret`\
**OAuth level:** App token\
**Version history:**\
2.0.0 - added\
2.7.2 - now returns `vapid_key`\
4.3.0 - deprecated `vapid_key`, please see [api/v2/instance]({{< relref "methods/Instance#v2">}})\
4.3.0 - removed the need to have `read` scope to access this API, now any valid App token can be used
4.3.0 - added `client_id`, `scopes` and `redirect_uris` properties

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <app token>` to gain authorized access to this API method. `<app token>` may be either a `client_credential` or `access_token` returned from [`/oauth/token`]({{< relref "methods/oauth#token" >}})

#### Response

##### 200: OK

If the Authorization header was provided with a valid token, you should see your app returned as an Application entity.

```json
{
  "name": "Test Application",
  "website": "https://app.example",
  "scopes": ["read", "write", "push"],
  "redirect_uris": [
    "https://app.example/callback",
    "https://app.example/register"
  ],
  "client_id": "TWhM-tNSuncnqN7DBJmoyeLnk6K3iJJ71KKXxgL1hPM"
}
```

##### 401: Unauthorized

If the Authorization header contains an invalid token, is malformed, or is not present, an error will be returned indicating an authorization failure.

```json
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/apps_controller.rb" caption="app/controllers/api/v1/apps_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/apps/credentials_controller.rb" caption="app/controllers/api/v1/apps/credentials_controller.rb" >}}
