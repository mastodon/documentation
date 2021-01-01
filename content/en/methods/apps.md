---
title: apps
description: Register client applications that can be used to obtain OAuth tokens.
menu:
  docs:
    weight: 10
    parent: methods
    identifier: methods-apps
---

{{< api-method method="post" host="https://mastodon.example" path="/api/v1/apps" title="Create an application" >}}
{{< api-method-description >}}

Create a new application to obtain OAuth2 credentials.

**Returns:** Application, with `client_id` and `client_secret`\
**OAuth:** Public\
**Version history:**\
0.0.0 - added\
2.7.2 - now returns `vapid_key`

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="client_name" type="string" required=true >}}
A name for your application
{{< endapi-method-parameter >}}
{{< api-method-parameter name="redirect_uris" type="string" required=true >}}
Where the user should be redirected after authorization. To display the authorization code to the user instead of redirecting to a web page, use `urn:ietf:wg:oauth:2.0:oob` in this parameter.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="scopes" type="string" required=false >}}
Space separated list of scopes. If none is provided, defaults to `read`.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="website" type="string" required=false >}}
A URL to the homepage of your app
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Store the `client_id` and `client_secret` in your cache, as these will be used to obtain OAuth tokens.
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

If a required parameter is missing or improperly formatted, the request will fail.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Validation failed: Redirect URI must be an absolute URI."
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/apps/verify_credentials" title="Verify your app works" >}}
{{< api-method-description >}}

Confirm that the app's OAuth2 credentials work.

**Returns:** Application\
**OAuth level:** App token\
**Version history:**\
2.0.0 - added\
2.7.2 - now returns `vapid_key`

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;app token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

If the Authorization header was provided with a valid token, you should see your app returned as an Application entity.
{{< endapi-method-response-example-description >}}


```javascript
{
  "name": "test app",
  "website": null,
  "vapid_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

If the Authorization header contains an invalid token, is malformed, or is not present, an error will be returned indicating an authorization failure.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


