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

Mastodon supports the following OAuth 2 flows:

* **Authorization code flow**: For end-users
* **Password grant flow**: For bots and other single-user applications
* **Client credentials flow**: For applications that do not act on behalf of users

To obtain an OAuth token for a Mastodon website, make sure that you allow your users to specify the domain they want to connect to before login. Use that domain to [acquire a client id/secret]({{< relref "../methods/apps/#create-an-application" >}}) and then [proceed with normal OAuth 2]({{< relref "../methods/apps/oauth.md" >}}).

## OAuth 2 endpoints implemented {#implementation}

The following descriptions are taken from the [Doorkeeper documentation](https://github.com/doorkeeper-gem/doorkeeper/wiki/API-endpoint-descriptions-and-examples). Mastodon uses Doorkeeper to implement OAuth 2. For more information on how to use these endpoints, see the [API documentation for OAuth.]({{< relref "../methods/apps/oauth.md" >}})

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/config/initializers/doorkeeper.rb" caption="Doorkeeper config initializer" >}}

### [GET /oauth/authorize]({{< relref "../methods/apps/oauth.md#authorize-a-user" >}})

Displays an authorization form to the user. If approved, it will create and return an authorization code, then redirect to the desired `redirect_uri`, or show the authorization code if `urn:ietf:wg:oauth:2.0:oob` was requested.

### [POST /oauth/token]({{< relref "../methods/apps/oauth.md#obtain-a-token" >}}) {#post-oauth-token}

Obtain an access token. This corresponds to the token endpoint, section 3.2 of the OAuth 2 RFC.

### [POST /oauth/revoke]({{< relref "../methods/apps/oauth.md#revoke-token" >}}) {#post-oauth-revoke}

Post here with client credentials to revoke an access token. This corresponds to the token endpoint, using the OAuth 2.0 Token Revocation RFC \(RFC 7009\).

## Common gotchas {#gotchas}

* When registering an application using Mastodon's REST API, there is a `scopes` parameter. When interfacing with OAuth endpoints, you must use the `scope` parameter instead, and this parameter's value must be a subset of the `scopes` registered with the app. You cannot include anything that wasn't in the original set.
* When registering an application using Mastodon's REST API, there is a `redirect_uris` parameter. When interfacing with OAuth endpoints, you must use the `redirect_uri` parameter instead, and this parameter's value must be one of the `redirect_uris` registered with the app.

