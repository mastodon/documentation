---
title: Logging in with an account
description: How to obtain authorization from a user and perform actions on their behalf.
menu:
  docs:
    weight: 40
    parent: client
---

## Scopes explained {#scopes}

When we register our app and when we authorize our user, we need to define what exactly our generated token will have permission to do. This is done through the use of OAuth scopes. Each API method has an associated scope, and can only be called if the token being used for authorization has been generated with the corresponding scope.

Scopes must be a subset. When we created our app, we specified `read write push` -- we could request all available scopes by specifying `read write push`, but it is a better idea to only request what your app will actually need through granular scopes. See [OAuth Scopes]({{< relref "api/oauth-scopes" >}}) for a full list of scopes. Each API method's documentation will also specify the OAuth access level and scope required to call it.

## **Example authorization code flow** {#flow}

This is similar to the authentication flow from before, but this time, we need to obtain authorization from a user as well.

### Client ID and secret {#client}

First, if you have not already registered a client application, then see [Creating our application]({{< relref "client/token#creating-our-application" >}}) on the previous page or go directly to [POST /api/v1/apps]({{< relref "methods/apps#create" >}}) for the full documentation of that method. We will need the `client_id` and `client_secret` for our application.

### Authorize the user {#login}

To authorize a user, request [GET /oauth/authorize]({{< relref "methods/oauth#authorize" >}}) in a browser with the following query parameters:

```bash
https://mastodon.example/oauth/authorize
?client_id=CLIENT_ID
&scope=read+write+push
&redirect_uri=urn:ietf:wg:oauth:2.0:oob
&response_type=code
```

Note the following:

* `client_id` was obtained when registering our application.
* `scope` must be a subset of our registered app's registered scopes. It is a good idea to only request what you need. See [OAuth Scopes]({{< relref "api/oauth-scopes" >}}) for more information.
* `redirect_uri` is one of the URIs we registered with our app. We are still using "out of band" for this example, which means we will have to manually copy and paste the resulting code, but if you registered your application with a URI that you control, then the code will be returned as a query parameter `code` and can be logged by your request handler. See the response section of the API method documentation for more information on this.

### Obtain the token {#token}

Now that we have an authorization `code`, let's obtain an access token that will authenticate our requests as the authorized user. To do so, use [POST /oauth/token]({{< relref "methods/oauth#token" >}}) like before, but pass the authorization code we just obtained:

```bash
curl -X POST \
	-F 'client_id=your_client_id_here' \
	-F 'client_secret=your_client_secret_here' \
	-F 'redirect_uri=urn:ietf:wg:oauth:2.0:oob' \
	-F 'grant_type=authorization_code' \
	-F 'code=user_authzcode_here' \
	-F 'scope=read write push' \
	https://mastodon.example/oauth/token
```

Note the following:

* `client_id` and `client_secret` were provided in the response text when you registered your application.
* `redirect_uri` must be one of the URIs defined when registering the application.
* We are requesting a `grant_type` of `authorization_code`, which still defaults to giving us the `read` scope. However, while authorizing our user, we requested a certain `scope` -- pass the exact same value here.
* The `code` can only be used once. If you need to obtain a new token, you will need to have the user authorize again by repeating the above [Authorize the user]({{< relref "client/authorized#authorize-the-user" >}}) step.

The response of this method is a [Token]({{< relref "entities/token" >}}) entity. We will need the `access_token` value. Once you have the access token, save it in your local cache. To use it in requests, add the HTTP header `Authorization: Bearer ...` to any API call that requires OAuth (i.e., one that is not publicly accessible). Let's verify that our obtained credentials are working by calling [GET /api/v1/accounts/verify_credentials]({{< relref "methods/accounts#verify_credentials" >}}):

```bash
curl \
	-H 'Authorization: Bearer our_access_token_here' \
	https://mastodon.example/api/v1/accounts/verify_credentials
```

If we've obtained our token and formatted our request correctly, we should see our details returned to us as an [Account]({{< relref "entities/account" >}}) entity, with the `source` parameter included.

## Performing actions as the authorized user {#actions}

With our OAuth token for the authorized user, we can now perform any action as that user that is within our token's scope.

### Publish and delete statuses {#statuses}

* See [POST /api/v1/statuses]({{< relref "methods/statuses#create" >}}) for how to create statuses.
  * See [/api/v1/media]({{< relref "methods/media" >}}) for creating media attachments.
  * See [/api/v1/scheduled_statuses]({{< relref "methods/scheduled_statuses" >}}) for managing scheduled statuses.

### Interact with timelines {#timelines}

* See [/api/v1/timelines]({{< relref "methods/timelines" >}}) for accessing timelines.
* See [/api/v1/markers]({{< relref "methods/markers" >}}) for saving and loading positions in timelines.
* See [/api/v1/statuses]({{< relref "methods/statuses" >}}) for performing actions on statuses.
  * See [/api/v1/polls]({{< relref "methods/polls" >}}) for viewing and voting on polls.
* See [/api/v1/lists]({{< relref "methods/lists" >}}) for obtaining list IDs to use with [GET /api/v1/timelines/list/:list_id]({{< relref "methods/timelines#list" >}}).
* See [/api/v1/conversations]({{< relref "methods/conversations" >}}) for obtaining direct conversations.
* See [/api/v1/favourites]({{< relref "methods/favourites" >}}) for listing favourites.
* See [/api/v1/bookmarks]({{< relref "methods/bookmarks" >}}) for listing bookmarks.

### Interact with other users {#accounts}

* See [/api/v1/accounts]({{< relref "methods/accounts" >}}) for performing actions on other users.
* See [/api/v1/follow_requests]({{< relref "methods/follow_requests" >}}) for handling follow requests.
* See [/api/v1/mutes]({{< relref "methods/mutes" >}}) for listing mutes.
* See [/api/v1/blocks]({{< relref "methods/blocks" >}}) for listing blocks.

### Receive notifications {#notifications}

* See [/api/v1/notifications]({{< relref "methods/notifications" >}}) for managing a user's notifications.
* See [/api/v1/push]({{< relref "methods/push" >}}) for subscribing to push notifications.

### Discovery features {#discovery}

* See [/api/v2/search]({{< relref "methods/search#v2" >}}) for querying resources.
* See [/api/v1/suggestions]({{< relref "methods/suggestions" >}}) for suggested accounts to follow.

### User safety features {#safety}

* See [/api/v1/filters]({{< relref "methods/filters" >}}) for managing filtered keywords.
* See [/api/v1/domain_blocks]({{< relref "methods/domain_blocks" >}}) for managing blocked domains.
* See [/api/v1/reports]({{< relref "methods/reports" >}}) for creating reports.
* See [/api/v1/admin]({{< relref "methods/admin" >}}) for moderator actions.

### Manage account info {#manage}

* See [/api/v1/endorsements]({{< relref "methods/endorsements" >}}) for managing a user profile's featured accounts.
* See [/api/v1/featured_tags]({{< relref "methods/featured_tags" >}}) for managing a user profile's featured hashtags.
* See [/api/v1/preferences]({{< relref "methods/preferences" >}}) for reading user preferences.

