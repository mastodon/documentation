---
title: oauth API methods
description: Generate and manage OAuth tokens.
menu:
  docs:
    weight: 10
    name: oauth
    parent: methods-apps
    identifier: methods-oauth
aliases: [
  "/methods/oauth",
  "/api/methods/oauth",
  "/methods/apps/oauth",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Authorize a user {#authorize}

```http
GET /oauth/authorize HTTP/1.1
```

Displays an authorization form to the user. If approved, it will create and return an authorization code, then redirect to the desired `redirect_uri`, or show the authorization code if `urn:ietf:wg:oauth:2.0:oob` was requested. The authorization code can be used while requesting a token to obtain access to user-level methods.

**Returns:** String (URL) or HTML response\
**OAuth:** Public\
**Version history:**\
0.1.0 - added\
2.6.0 - added `force_login`\
3.5.0 - added `lang`

#### Request
##### Query parameters

response_type
: {{<required>}} String. Should be set equal to `code`.

client_id
: {{<required>}} String. The client ID, obtained during app registration.

redirect_uri
: {{<required>}} String. Set a URI to redirect the user to. If this parameter is set to `urn:ietf:wg:oauth:2.0:oob` then the authorization code will be shown instead. Must match one of the `redirect_uris` declared during app registration.

scope
: String. List of requested OAuth scopes, separated by spaces (or by pluses, if using query parameters). Must be a subset of `scopes` declared during app registration. If not provided, defaults to `read`.

force_login
: Boolean. Forces the user to re-login, which is necessary for authorizing with multiple accounts from the same instance.

lang
: String. The ISO 639-1 two-letter language code to use while rendering the authorization form.

#### Response
##### 200: OK

The authorization code will be returned as a query parameter named `code`.

```http
redirect_uri?code=qDFUEaYrRK5c-HNmTCJbAzazwLRInJ7VHFat0wcMgCU
```

##### 400: Client error

If the authorization code is incorrect or has been used already, the request will fail.

```json
{
  "error": "invalid_grant",
  "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
}
```

---

## Obtain a token {#token}

```http
POST /oauth/token HTTP/1.1
```

Obtain an access token, to be used during API calls that are not public.

**Returns:** [Token]({{< relref "entities/token" >}})\
**OAuth:** Public\
**Version history:**\
0.1.0 - added

#### Request
##### Form data parameters

grant_type
: {{<required>}} String. Set equal to `authorization_code` if `code` is provided in order to gain user-level access. Otherwise, set equal to `client_credentials` to obtain app-level access only.

code
: String. A user authorization code, obtained via [GET /oauth/authorize](#authorize).

client_id
: {{<required>}} String. The client ID, obtained during app registration.

client_secret
: {{<required>}} String. The client secret, obtained during app registration.

redirect_uri
: {{<required>}} String. Set a URI to redirect the user to. If this parameter is set to urn:ietf:wg:oauth:2.0:oob then the token will be shown instead. Must match one of the `redirect_uris` declared during app registration.

scope
: String. List of requested OAuth scopes, separated by spaces (or by pluses, if using query parameters). If `code` was provided, then this must be equal to the `scope` requested from the user. Otherwise, it must be a subset of `scopes` declared during app registration. If not provided, defaults to `read`.

#### Response
##### 200: OK

Store this access_token for later use with auth-required methods. The token should be passed as an HTTP `Authorization` header when making API calls, with the value `Bearer access_token`

```json
{
  "access_token": "ZA-Yj3aBD8U8Cm7lKUp-lm9O9BmDgdhHzDeqsY8tlL0",
  "token_type": "Bearer",
  "scope": "read write follow push",
  "created_at": 1573979017
}
```

##### 400: Client error

If you try to request a scope that was not included when registering the app, the request will fail.

```json
{
  "error": "invalid_scope",
  "error_description": "The requested scope is invalid, unknown, or malformed."
}
```

##### 401: Unauthorized

If client_id and client_secret do not match or are invalid, the request will fail.

```json
{
  "error": "invalid_client",
  "error_description": "Client authentication failed due to unknown client, no client authentication included, or unsupported authentication method."
}
```

---

## Revoke a token {#revoke}

```http
POST /oauth/revoke HTTP/1.1
```

Revoke an access token to make it no longer valid for use.

**Returns:** Empty\
**OAuth:** Public\
**Version history:**\
x.x.x - added

#### Request
##### Form data parameters

client_id
: {{<required>}} String. The client ID, obtained during app registration.

client_secret
: {{<required>}} String. The client secret, obtained during app registration.

token
: {{<required>}} String. The previously obtained token, to be invalidated.

#### Response
##### 200: OK

If you own the provided token, the API call will provide an empty response. This operation is idempotent, so calling this API multiple times will still return OK.

```json
{}
```

##### 403: Forbidden

If you provide a token you do not own, or no token at all, the API call will return a 403 error.

```json
{
  "error": "unauthorized_client",
  "error_description": "You are not authorized to revoke this token"
}
```

---

## See also

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/authorizations_controller.rb" caption="app/controllers/oauth/authorizations_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/authorized_applications_controller.rb" caption="app/controllers/oauth/authorized_applications_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/tokens_controller.rb" caption="app/controllers/oauth/tokens_controller.rb" >}}