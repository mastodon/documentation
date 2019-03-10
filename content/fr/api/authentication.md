---
title: Authentication
description: How to authenticate with OAuth 2 on Mastodon
menu:
  docs:
    parent: api
    weight: 1
---

Mastodon is federated, therefore you can't be expected to manually register your application on all potential servers your users might want to login on. For this reason, there is an open app registration API, so obtaining OAuth 2 credentials for OAuth 2 authorization can be automated.

Make sure that you allow your users to specify the domain they want to connect to before login. Use that domain to acquire a client id/secret for OAuth 2 and then proceed with normal OAuth 2 also using that domain to build the URLs.

Mastodon supports the following OAuth 2 flows:

- **Authorization code flow**: For end-users
- **Password grant flow**: For bots and other single-user applications
- **Client credentials flow**: For applications that do not act on behalf of users

## OAuth 2 endpoints

The following descriptions are taken from the [Doorkeeper documentation](https://github.com/doorkeeper-gem/doorkeeper/wiki/API-endpoint-descriptions-and-examples). Mastodon uses Doorkeeper to implement OAuth 2.

### GET /oauth/authorize

Redirect here with `response_type=code`, `client_id`, `client_secret`, `redirect_uri`, `scope`. Displays an authorization form to the user. If approved, it will create and return an authorization code, then redirect to the desired `redirect_uri`, or show the authorization code if `urn:ietf:wg:oauth:2.0:oob` was requested.

### POST /oauth/token

Post here with `authorization_code` for authorization code grant type or `username` and `password` for password grant type. Returns an access token. This corresponds to the token endpoint, section 3.2 of the OAuth 2 RFC.

### POST /oauth/revoke

Post here with client credentials (in basic auth or in params `client_id` and `client_secret`) to revoke an access token. This corresponds to the token endpoint, using the OAuth 2.0 Token Revocation RFC (RFC 7009).

## Example authorization code flow

1. Get `client_id` and `client_secret` from your local cache. If you don't have the two, you need to [register the application]({{< relref "api/rest/apps.md#post-api-v1-apps" >}}). Store `client_id` and `client_secret` in your local cache for next time. We actually don't need the `id` returned from this call.
1. Tell the user to visit `/oauth/authorize` with parameters `scope`, `response_type=code`, `redirect_uri`, and your `client_id`. The user clicks on the URL and gets shown a page asking them to authorize your app for the scopes you requested. If the user clicks on the right button, they are redirected back to your `redirect_uri` with a `code` param in the query string. That is the authorization code.
1. Send a POST request to `/oauth/token` with the parameters `client_id`, `client_secret`, `grant_type=authorization_code`, `code`, `redirect_uri`. Save the `access_token` you get back in your local cache. Note that an authorization code can only be used once. If it has been used already, you need to repeat step two to get a new one.

Once you have the access token, add the HTTP header `Authorization: Bearer ...` to any API call.

## Common gotchas

- The OAuth param name is `scope`, but when registering the application using Mastodon's REST API, the param name is `scopes`. The OAuth param can be a subset of the scopes you registered initially, but cannot include anything that wasn't in the original set.
- The OAuth param name is `redirect_uri`, but when registering the application using Mastodon's REST API, the param name is `redirect_uris`. The latter can actually consist of multiple allowed URIs, separated by newlines.
- The `redirect_uri` in all OAuth requests must either be the same as the one registered with the application, or one of them, if you registered multiple URIs separated by newlines with the application.