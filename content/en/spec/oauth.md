---
title: OAuth
description: An open standard for token-based authentication and authorization on the Internet
menu:
  docs:
    weight: 50
    parent: spec
---

## What is OAuth? {#intro}

The Mastodon API has many methods that require authentication from a client or authorization from a user. This is accomplished with OAuth 2.0, an authorization framework described in [RFC 6749](https://tools.ietf.org/html/rfc6749) that allows third-party applications to obtain limited access to an HTTP service on behalf of a resource owner, through the use of a standardized authorization flow that generates a client access token to be used with HTTP requests.

To obtain an OAuth token for a Mastodon website, make sure that you allow your users to specify the domain they want to connect to before login. Use that domain to [acquire a client id/secret]({{< relref "methods/apps#create" >}}) and then [proceed with normal OAuth 2]({{< relref "methods/oauth" >}}).

## OAuth 2 client types {#client-types}

OAuth 2 defines two client types: `confidential` and `public`, based on their ability to authenticate securely with the authorization server (i.e., ability to maintain the confidentiality of their client credentials). Confidential clients are allowed to use the [client credentials grant flow]({{<relref "client/token#flow" >}}), where as public clients cannot.

At present Mastodon only supports confidential clients, however [work is underway](https://github.com/mastodon/mastodon/pull/30329) to add support for public clients.

## OAuth 2 endpoints implemented {#implementation}

The following descriptions are taken from the [Doorkeeper documentation](https://github.com/doorkeeper-gem/doorkeeper/wiki/API-endpoint-descriptions-and-examples). Mastodon uses Doorkeeper to implement OAuth 2. For more information on how to use these endpoints, see the [API documentation for OAuth.]({{< relref "methods/oauth" >}})

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/config/initializers/doorkeeper.rb" caption="Doorkeeper config initializer" >}}

### Authorization Server Metadata endpoint ([RFC 8414](https://www.rfc-editor.org/rfc/rfc8414.html)) {#authorization-server-metadata}

Returns a JSON document representing the configuration of the OAuth 2 server in Mastodon. Information includes `scopes` available for use when [registering Applications]({{% relref "methods/apps#create" %}}) or requesting [access tokens]({{% relref "methods/oauth#token" %}}), `grant_types_supported` which are can be used when requesting access tokens, and various endpoints for interacting with the Mastodon OAuth server, such as `authorization_endpoint` and `token_endpoint`.

**Version history:**\
4.3.0 - added

{{< page-relref ref="methods/oauth#authorization-server-metadata" caption="GET /.well-known/oauth-authorization-server" >}}

### Dynamic Client Registration endpoint ([RFC 7591](https://www.rfc-editor.org/rfc/rfc7591.html)) {#dynamic-client-registration}

At present, Mastodon does not support the Dynamic Client Registration protocol, however it does support a proprietary endpoint for registering an OAuth Application.

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

### Authorization endpoint ([RFC 6749 Section 3.1](https://www.rfc-editor.org/rfc/rfc6749.html#section-3.1)) {#authorization}

Displays an authorization form to the user. If approved, it will create and return an authorization code, then redirect to the desired `redirect_uri`, or show the authorization code if `urn:ietf:wg:oauth:2.0:oob` was requested.

{{< page-relref ref="methods/oauth#authorize" caption="GET /oauth/authorize" >}}

### Token endpoint ([RFC 6749 Section 3.2](https://www.rfc-editor.org/rfc/rfc6749.html#section-3.2)) {#token}

Obtain an access token. Mastodon supports the following OAuth 2 flows:

Authorization code flow
: For end-users

Client credentials flow
: For applications that do not act on behalf of users

Mastodon has historically supported the Password Grant flow, however, usage is [not recommended](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics#name-resource-owner-password-cre) by the OAuth 2 Specification authors due to security issues, and has subsequently been removed from future versions of Mastodon. Instead, it is recommended that you create an OAuth Application for that user, and use the generated Access Token for interacting with the API.

{{< page-relref ref="methods/oauth#token" caption="POST /oauth/token" >}}

### Token revocation endpoint ([RFC 7009 Section 2](https://www.rfc-editor.org/rfc/rfc7009.html#section-2)) {#revoke}

Post here with client credentials to revoke an access token.

{{< page-relref ref="methods/oauth#revoke" caption="POST /oauth/revoke" >}}

## Common gotchas {#gotchas}

- When registering an application using Mastodon's REST API, there is a `scopes` parameter. When interfacing with OAuth endpoints, you must use the `scope` parameter instead, and this parameter's value must be a subset of the `scopes` registered with the app. You cannot include anything that wasn't in the original set.
- When registering an application using Mastodon's REST API, there is a `redirect_uris` parameter. When interfacing with OAuth endpoints, you must use the `redirect_uri` parameter instead, and this parameter's value must be one of the `redirect_uris` registered with the app.
