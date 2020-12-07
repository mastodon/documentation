---
title: oauth
description: Generate and manage OAuth tokens.
menu:
  docs:
    weight: 10
    parent: methods-apps
---

{{< api-method method="get" host="https://mastodon.example" path="/oauth/authorize" title="Authorize a user" >}}
{{< api-method-description >}}

Displays an authorization form to the user. If approved, it will create and return an authorization code, then redirect to the desired `redirect_uri`, or show the authorization code if `urn:ietf:wg:oauth:2.0:oob` was requested. The authorization code can be used while requesting a token to obtain access to user-level methods.

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="force_login" type="string" required=false >}}
Added in 2.6.0. Forces the user to re-login, which is necessary for authorizing with multiple accounts from the same instance.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="response_type" type="string" required=true >}}
Should be set equal to `code`.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="client_id" type="string" required=true >}}
Client ID, obtained during app registration.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="redirect_uri" type="string" required=true >}}
Set a URI to redirect the user to. If this parameter is set to `urn:ietf:wg:oauth:2.0:oob` then the authorization code will be shown instead. Must match one of the redirect URIs declared during app registration.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="scope" type="string" required=false >}}
List of requested OAuth scopes, separated by spaces \(or by pluses, if using query parameters\). Must be a subset of scopes declared during app registration. If not provided, defaults to `read`.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

The authorization code will be returned as a query parameter named `code`.
{{< endapi-method-response-example-description >}}


```http
redirect_uri?code=qDFUEaYrRK5c-HNmTCJbAzazwLRInJ7VHFat0wcMgCU
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=400 >}}
{{< api-method-response-example-description >}}

If the authorization code is incorrect or has been used already, the request will fail.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "invalid_grant",
  "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/oauth/token" title="Obtain a token" >}}
{{< api-method-description >}}

Returns an access token, to be used during API calls that are not public.

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="client_id" type="string" required=true >}}
Client ID, obtained during app registration
{{< endapi-method-parameter >}}
{{< api-method-parameter name="client_secret" type="string" required=true >}}
Client secret, obtained during app registration
{{< endapi-method-parameter >}}
{{< api-method-parameter name="redirect_uri" type="string" required=true >}}
Set a URI to redirect the user to. If this parameter is set to urn:ietf:wg:oauth:2.0:oob then the token will be shown instead. Must match one of the redirect URIs declared during app registration.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="scope" type="string" required=false >}}
List of requested OAuth scopes, separated by spaces. Must be a subset of scopes declared during app registration. If not provided, defaults to `read`.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="code" type="string" required=false >}}
A user authorization code, obtained via /oauth/authorize
{{< endapi-method-parameter >}}
{{< api-method-parameter name="grant_type" type="string" required=true >}}
Set equal to `authorization_code` if `code` is provided in order to gain user-level access. Otherwise, set equal to `client_credentials` to obtain app-level access only.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Store this access_token for later use with auth-required methods. The token should be passed as an HTTP `Authorization` header when making API calls, with the value `Bearer access_token`
{{< endapi-method-response-example-description >}}


```javascript
{
  "access_token": "ZA-Yj3aBD8U8Cm7lKUp-lm9O9BmDgdhHzDeqsY8tlL0",
  "token_type": "Bearer",
  "scope": "read write follow push",
  "created_at": 1573979017
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=400 >}}
{{< api-method-response-example-description >}}

If you try to request a scope that was not included when registering the app, the request will fail.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "invalid_scope",
  "error_description": "The requested scope is invalid, unknown, or malformed."
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

If client_id and client_secret do not match or are invalid, the request will fail.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "invalid_client",
  "error_description": "Client authentication failed due to unknown client, no client authentication included, or unsupported authentication method."
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/oauth/revoke" title="Revoke token" >}}
{{< api-method-description >}}

Revoke an access token to make it no longer valid for use.

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="client_id" type="string" required=true >}}
Client ID, obtained during app registration
{{< endapi-method-parameter >}}
{{< api-method-parameter name="client_secret" type="string" required=true >}}
Client secret, obtained during app registration
{{< endapi-method-parameter >}}
{{< api-method-parameter name="token" type="string" required=true >}}
The previously obtained token, to be invalidated
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

If you own the provided token, the API call will provide an empty response. This operation is idempotent, so calling this API multiple times will still return OK.
{{< endapi-method-response-example-description >}}


```javascript
{}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=403 >}}
{{< api-method-response-example-description >}}

If you provide a token you do not own, or no token at all, the API call will return a 403 error.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "unauthorized_client",
  "error_description": "You are not authorized to revoke this token"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}

