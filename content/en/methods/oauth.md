---
title: OAuth API methods
description: Generate and manage OAuth tokens.
menu:
  docs:
    weight: 10
    name: oauth
    parent: methods-apps
    identifier: methods-oauth
aliases: ["/methods/oauth", "/api/methods/oauth", "/methods/apps/oauth"]
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
4.3.0 - added support for PKCE parameters

#### Request

##### Query parameters

response_type
: {{<required>}} String. Should be set equal to `code`.

client_id
: {{<required>}} String. The client ID, obtained during app registration.

redirect_uri
: {{<required>}} String. Set a URI to redirect the user to. If this parameter is set to `urn:ietf:wg:oauth:2.0:oob` then the authorization code will be shown instead. Must match one of the `redirect_uris` declared during app registration.

scope<
: String. List of requested [OAuth scopes]({{< relref "api/oauth-scopes" >}}), separated by spaces (or by pluses, if using query parameters). Must be a subset of `scopes` declared during app registration. If not provided, defaults to `read`.

state
: String. Arbitrary value to passthrough to your server when the user authorizes or rejects the authorization request.

code_challenge
: String. The [PKCE code challenge]({{< relref "spec/oauth#pkce" >}}) for the authorization request.

code_challenge_method
: String. Must be `S256`, as this is the only code challenge method that is supported by Mastodon for PKCE.

force_login
: Boolean. Forces the user to re-login, which is necessary for authorizing with multiple accounts from the same instance.

lang
: String. The ISO 639-1 two-letter language code to use while rendering the authorization form.

#### Response

##### 200: OK

The authorization code will be returned as a query parameter named `code`.

{{< hint style="warning" >}}
Treat the `code` query parameter as if it were a password, you should ensure that it is not logged in request logs.
{{< /hint >}}

```http
redirect_uri?code=qDFUEaYrRK5c-HNmTCJbAzazwLRInJ7VHFat0wcMgCU
```

If the state parameter was used, then this will also be present in the URI when the client is redirected.

```http
redirect_uri?code=qDFUEaYrRK5c-HNmTCJbAzazwLRInJ7VHFat0wcMgCU&state=example
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
4.3.0 - added support for PKCE parameter

#### Request

##### Form data parameters

grant_type
: {{<required>}} String. Set equal to `authorization_code` if `code` is provided in order to gain user-level access. Otherwise, set equal to `client_credentials` to obtain app-level access only.

code
: {{<required>}} String. A user authorization code, obtained from the redirect after an [Authorization request](#authorize) is approved. May alternatively be displayed to the user if `urn:ietf:wg:oauth:2.0:oob` is used as the `redirect_uri`.

client_id
: {{<required>}} String. The client ID, obtained during app registration.

client_secret
: {{<required>}} String. The client secret, obtained during app registration.

redirect_uri
: {{<required>}} String. Must match the `redirect_uri` used during the [Authorization request](#authorize).

code_verifier
: String. Required if [PKCE]({{< relref "spec/oauth#pkce" >}}) is used during the authorization request. This is the code verifier which was used to create the `code_challenge` using the `code_challenge_method` for the authorization request.

scope
: String. When `grant_type` is set to `client_credentials`, the list of requested OAuth scopes, separated by spaces (or pluses, if using query parameters). Must be a subset of the scopes requested at the time the application was created. If omitted, it defaults to `read`. Has no effect when `grant_type` is `authorization_code`.

#### Response

##### 200: OK

Store this `access_token` for later use with methods that require authentication. The token should be passed as an HTTP `Authorization` header when making API calls, with the value `Bearer <access_token>`

{{< hint style="warning" >}}
Treat the `access_token` as if it were a password. We recommend you encrypt this value when storing in your cache, to prevent credential exposure.\
\
Additionally, you should ensure that the `code` parameter is not logged.
{{< /hint >}}

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
0.1.0 - added

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

## Discover OAuth Server Configuration {#authorization-server-metadata}

```http
GET /.well-known/oauth-authorization-server HTTP/1.1
```

Returns the OAuth 2 Authorization Server Metadata for the Mastodon server, as defined by [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414#section-3.2).

We include the additional non-standard property of `app_registration_endpoint` which refers to the [POST /api/v1/apps]({{% relref ref="methods/apps#create" %}}) endpoint, since we don't currently support the standard `registration_endpoint` endpoint for [Dynamic Client Registration](https://oauth.net/2/dynamic-client-registration/).

The properties exposed by this endpoint can help you better integrate with the Mastodon API, such as allowing for negotiation of `scopes` across different versions of Mastodon.

{{< hint style="info" >}}
**Example:** You want to use the `profile` scope, but also want to support older Mastodon servers that don't have that scope and would need `read:accounts` instead. You could discover whether a server supports that scope by making a request this endpoint.
{{< /hint >}}

**Returns:** JSON as per the above description\
**OAuth:** Public\
**Version history:**\
4.3.0 - added

#### Response

##### 200: OK

```json
{
  "issuer": "https://social.example/",
  "service_documentation": "https://docs.joinmastodon.org/",
  "authorization_endpoint": "https://social.example/oauth/authorize",
  "token_endpoint": "https://social.example/oauth/token",
  "app_registration_endpoint": "https://social.example/api/v1/apps",
  "revocation_endpoint": "https://social.example/oauth/revoke",
  "scopes_supported": [
    "read",
    "write",
    "write:accounts",
    "write:blocks",
    "write:bookmarks",
    "write:conversations",
    "write:favourites",
    "write:filters",
    "write:follows",
    "write:lists",
    "write:media",
    "write:mutes",
    "write:notifications",
    "write:reports",
    "write:statuses",
    "read:accounts",
    "read:blocks",
    "read:bookmarks",
    "read:favourites",
    "read:filters",
    "read:follows",
    "read:lists",
    "read:mutes",
    "read:notifications",
    "read:search",
    "read:statuses",
    "follow",
    "push",
    "profile",
    "admin:read",
    "admin:read:accounts",
    "admin:read:reports",
    "admin:read:domain_allows",
    "admin:read:domain_blocks",
    "admin:read:ip_blocks",
    "admin:read:email_domain_blocks",
    "admin:read:canonical_email_blocks",
    "admin:write",
    "admin:write:accounts",
    "admin:write:reports",
    "admin:write:domain_allows",
    "admin:write:domain_blocks",
    "admin:write:ip_blocks",
    "admin:write:email_domain_blocks",
    "admin:write:canonical_email_blocks"
  ],
  "response_types_supported": ["code"],
  "response_modes_supported": ["query", "fragment", "form_post"],
  "code_challenge_methods_supported": [
    "S256"
  ],
  "grant_types_supported": [
    "authorization_code",
    "client_credentials"
  ],
  "token_endpoint_auth_methods_supported": [
    "client_secret_basic",
    "client_secret_post"
  ]
}
```

##### Older Mastodon Versions – 404: Not Found

On Mastodon versions before 4.3.0, requesting this endpoint will result in a `404 Not Found` error.

Instead, you will need to "guess" what that server supports, instead of discovering supported OAuth 2 endpoints, grant flows & scopes dynamically.

You may want to fallback to the [Instance Metadata endpoint]({{% relref ref="methods/instance#v2" %}}) to try to discover what Mastodon version the server is running by parsing the `version` field; however, this is very brittle and not recommended.

---

## See also

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/authorizations_controller.rb" caption="app/controllers/oauth/authorizations_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/authorized_applications_controller.rb" caption="app/controllers/oauth/authorized_applications_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/tokens_controller.rb" caption="app/controllers/oauth/tokens_controller.rb" >}}
