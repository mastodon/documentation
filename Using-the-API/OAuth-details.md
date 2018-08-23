OAuth details
=============

We use the [Doorkeeper gem for OAuth](https://github.com/doorkeeper-gem/doorkeeper/wiki), so you can refer to their docs on specifics of the end-points.

The API is divided up into access scopes:

- `read`: Read data
- `write`: Post statuses and upload media for statuses
- `follow`: Follow, unfollow, block, unblock

Multiple scopes can be requested during the authorization phase with the `scope` query param (space-separate the scopes). If you do not specify a `scope` in your authorization request, the resulting access token will default to `read` access.

You need an access token. To get one, use the following workflow:

1. Get `client_id` and `client_secret` from your local cache. If you don't have the two, you need to [register the application](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#registering-an-application). Store `client_id` and `client_secret` in your local cache for next time. We actually don't need the `id` returned from this call.
1. Tell the user to visit `/oauth/authorize` with parameters `scope=read write follow` (URL encode the space to `%20`, of course), `response_type=code`, `redirect_uri=urn:ietf:wg:oauth:2.0:oob` (assuming you don't want to redirect your users elsewhere), `client_id=<client_id>`. The user clicks on the URL and gets shown a page asking them to authorize your app for reading, writing, and following (assuming this is the scope you requested, feel free to request less). If the user clicks on the right button, they get back a code. Store this code as your `authorization_code`.
1. Send a POST request to `/oauth/token` with the parameters `client_id=<client_id>`, `client_secret=<client_secret>`, `grant_type=authorization_code`, `code=<authorization_code>`, `redirect_uri=urn:ietf:wg:oauth:2.0:oob`. Save the `access_token` you get back in your local cache. Note that an authorization code can only be used once. If it has been used already, you need to repeat step #2 to get a new one.

Once you have the access token,  add the HTTP header `Authorization: Bearer <access_token>` to any API call. If you want to check access token validity, one simple way to do it is [getting the current user](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#getting-the-current-user).
