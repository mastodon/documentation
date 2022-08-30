---
title: apps
description: Register client applications that can be used to obtain OAuth tokens.
menu:
  docs:
    weight: 10
    parent: methods
    identifier: methods-apps
---

## Create an application {#create}

```http
POST https://mastodon.example/api/v1/apps HTTP/1.1
```

Create a new application to obtain OAuth2 credentials.

**Returns:** [Application]({{< relref "entities/application" >}}), with `client_id` and `client_secret`\
**OAuth:** Public\
**Version history:**\
0.0.0 - added\
2.7.2 - now returns `vapid_key`

#### Request
##### Form data parameters

client_name
: {{<required>}} String. A name for your application

redirect_uris
: {{<required>}} String. Where the user should be redirected after authorization. To display the authorization code to the user instead of redirecting to a web page, use `urn:ietf:wg:oauth:2.0:oob` in this parameter.

scopes
: String. Space separated list of scopes. If none is provided, defaults to `read`. See [OAuth Scopes]({{< relref "api/oauth-scopes" >}}) for a list of possible scopes.

website
: String. A URL to the homepage of your app

#### Response
##### 200: OK

Store the `client_id` and `client_secret` in your cache, as these will be used to obtain OAuth tokens.

```javascript
{
  "id": "563419",
  "name": "test app",
  "website": null,
  "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
  "client_id": "TWhM-tNSuncnqN7DBJmoyeLnk6K3iJJ71KKXxgL1hPM",
  "client_secret": "ZEaFUFmF0umgBX1qKJDjaU99Q31lDkOU8NutzTOoliw",
  "vapid_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```

##### 422: Unprocessable entity

If a required parameter is missing or improperly formatted, the request will fail.

```javascript
{
  "error": "Validation failed: Redirect URI must be an absolute URI."
}
```

---

## Verify your app works {#verify_credentials}

```http
GET https://mastodon.example/api/v1/apps/verify_credentials HTTP/1.1
```

Confirm that the app's OAuth2 credentials work.

**Returns:** [Application]({{< relref "entities/application" >}})\
**OAuth level:** App token\
**Version history:**\
2.0.0 - added\
2.7.2 - now returns `vapid_key`

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

If the Authorization header was provided with a valid token, you should see your app returned as an Application entity.

```javascript
{
  "name": "test app",
  "website": null,
  "vapid_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```

##### 401: Unauthorized

If the Authorization header contains an invalid token, is malformed, or is not present, an error will be returned indicating an authorization failure.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/apps_controller.rb" caption="app/controllers/api/v1/apps_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/apps" caption="app/controllers/api/v1/apps/" >}}