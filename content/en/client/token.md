---
title: Obtaining client app access
description: Getting accustomed to the basics of authentication and authorization.
menu:
  docs:
    weight: 30
    parent: client
---

## Authentication and authorization {#auth}

Up until this point, we've been working with publicly available information, but not all information is public. Some information requires permission before viewing it, in order to audit who is requesting that information (and to potentially revoke or deny access).

This is where [OAuth]({{< relref "spec/oauth" >}}) comes in. OAuth is a mechanism for generating access tokens that can be used to _authenticate (verify)_ that a request is coming from a specific client, and ensure that the requested action is _authorized (allowed)_ by the server's access control policies.

## Creating our application {#app}

The first thing we will need to do is to register an application, in order to be able to generate access tokens later. The application can be created like so:

```bash
curl -X POST \
	-F 'client_name=Test Application' \
	-F 'redirect_uris=urn:ietf:wg:oauth:2.0:oob' \
	-F 'scopes=read write push' \
	-F 'website=https://myapp.example' \
	https://mastodon.example/api/v1/apps
```

In the above example, we specify the client name and website, which will be shown on statuses if applicable. But more importantly, note the following two parameters:

* `redirect_uris` has been set to the "out of band" token generation, which means that any generated tokens will have to be copied and pasted manually. The parameter is called `redirect_uris` because it is possible to define more than one redirect URI, but when generating the token, we will need to provide a URI that is included within this list.
* `scopes` allow us to define what permissions we can request later. However, the requested scope later can be a subset of these registered scopes. See [OAuth Scopes]({{< relref "api/oauth-scopes" >}}) for more information.

We should see an Application entity returned, but for now, we only care about client_id and client_secret. These values will be used to generate access tokens, so they should be cached for later use. See [POST /api/v1/apps]({{< relref "methods/apps#create" >}}) for more details on registering applications.

## Example authentication code flow {#flow}

Now that we have an application, let's obtain an access token that will authenticate our requests as that client application. To do so, use [POST /oauth/token]({{< relref "methods/oauth#token" >}}) like so:

```bash
curl -X POST \
	-F 'client_id=your_client_id_here' \
	-F 'client_secret=your_client_secret_here' \
	-F 'redirect_uri=urn:ietf:wg:oauth:2.0:oob' \
	-F 'grant_type=client_credentials' \
	https://mastodon.example/oauth/token
```

Note the following:

* `client_id` and `client_secret` were provided in the response text when you registered your application.
* `redirect_uri` must be one of the URIs defined when registering the application.
* We are requesting a `grant_type` of `client_credentials`, which defaults to giving us the `read` scope.

The response of this method is a [Token]({{< relref "entities/token" >}}) entity. We will need the `access_token` value. Once you have the access token, save it in your local cache. To use it in requests, add the HTTP header `Authorization: Bearer ...` to any API call that requires OAuth (i.e., one that is not publicly accessible). Let's verify that our obtained credentials are working by calling [GET /api/v1/apps/verify_credentials]({{< relref "methods/apps#verify_credentials" >}}):

```bash
curl \
	-H 'Authorization: Bearer our_access_token_here' \
	https://mastodon.example/api/v1/apps/verify_credentials
```

If we've obtained our token and formatted our request correctly, we should see our details returned to us as an [Application]({{< relref "entities/application" >}}) entity.

## What we can do with authentication {#methods}

With our authenticated client application, we can view relations of an account with [GET /api/v1/accounts/:id/following]({{< relref "methods/accounts#following" >}}) and [GET /api/v1/accounts/:id/followers]({{< relref "methods/accounts#followers" >}}). Also, some instances may require authentication for methods that would otherwise be public, so if you encountered any authentication errors while playing around with public methods, then those methods should now work.

