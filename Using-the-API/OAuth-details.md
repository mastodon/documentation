OAuth details
=============

We use the [Doorkeeper gem for OAuth](https://github.com/doorkeeper-gem/doorkeeper/wiki), so you can refer to their docs on specifics of the end-points.

The API is divided up into access scopes:

* write
  * write:accounts
    * `PUT /api/v1/accounts/verify_credentials`
    * `POST /api/v1/statuses/:id/pin`
    * `POST /api/v1/statuses/:id/unpin`
  * write:blocks
    * `POST /api/v1/accounts/:id/block`
    * `POST /api/v1/accounts/:id/unblock`
    * `POST|DELETE /api/v1/domain_blocks`
  * write:favourites
    * `POST /api/v1/statuses/:id/favourite`
    * `POST /api/v1/statuses/:id/unfavourite`
  * write:filters
    * `POST /api/v1/filters`
    * `PUT|DELETE /api/v1/filters/:id`
  * write:follows
    * `POST /api/v1/accounts/:id/follow`
    * `POST /api/v1/accounts/:id/unfollow`
    * `POST /api/v1/follows`
    * `POST /api/v1/follow_requests/:id/authorize`
    * `POST /api/v1/follow_requests/:id/reject`
  * write:lists
    * `POST|DELETE /api/v1/lists/:id/accounts`
    * `POST /api/v1/lists`
    * `PUT|DELETE /api/v1/lists/:id`
  * write:media
    * `POST /api/v1/media`
    * `PUT /api/v1/media/:id`
  * write:mutes
    * `POST /api/v1/statuses/:id/mute`
    * `POST /api/v1/statuses/:id/unmute`
    * `POST /api/v1/accounts/:id/mute`
    * `POST /api/v1/accounts/:id/unmute`
  * write:notifications
    * `POST /api/v1/notifications/clear`
    * `POST /api/v1/notifications/:id/dismiss`
  * write:reports
    * `POST /api/v1/reports`
  * write:statuses
    * `POST /api/v1/statuses/:id/reblog`
    * `POST /api/v1/statuses/:id/unreblog`
    * `POST /api/v1/statuses`
    * `DELETE /api/v1/statuses/:id`
* read
  * read:accounts
    * `GET /api/v1/accounts/verify_credentials`
    * `GET /api/v1/accounts/:id/followers`
    * `GET /api/v1/accounts/:id/following`
    * `GET /api/v1/accounts/search`
    * `GET /api/v1/statuses/:id/favourited_by`
    * `GET /api/v1/statuses/:id/reblogged_by`
    * `GET /api/v1/accounts/:id`
  * read:blocks
    * `GET /api/v1/blocks`
    * `GET /api/v1/domain_blocks`
  * read:favourites
    * `GET /api/v1/favourites`
  * read:filters
    * `GET /api/v1/filters`
    * `GET /api/v1/filters/:id`
  * read:follows
    * `GET /api/v1/accounts/relationships`
    * `GET /api/v1/follow_requests`
  * read:lists
    * `GET /api/v1/accounts/:id/lists`
    * `GET /api/v1/lists/:id/accounts`
    * `GET /api/v1/lists`
    * `GET /api/v1/lists/:id`
  * read:mutes
    * `GET /api/v1/mutes`
  * read:notifications
    * `GET /api/v1/notifications`
    * `GET /api/v1/notifications/:id`
  * read:reports
    * `GET /api/v1/reports`
  * read:search
    * `GET /api/v1/search`
    * `GET /api/v2/search`
  * read:statuses
    * `GET /api/v1/accounts/:id/statuses`
    * `GET /api/v1/timelines/direct`
    * `GET /api/v1/timelines/home`
    * `GET /api/v1/timelines/list/:id`
    * `GET /api/v1/statuses/:id`
    * `GET /api/v1/statuses/:id/context`
    * `GET /api/v1/statuses/:id/card`
* follow (legacy)
  * read:blocks
  * read:follows
  * read:mutes
  * write:blocks
  * write:follows
  * write:mutes
* push

Multiple scopes can be requested during the authorization phase with the `scope` query param (space-separate the scopes). If you do not specify a `scope` in your authorization request, the resulting access token will default to `read` access.

You need an access token. To get one, use the following workflow:

1. Get `client_id` and `client_secret` from your local cache. If you don't have the two, you need to [register the application](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#registering-an-application). Store `client_id` and `client_secret` in your local cache for next time. We actually don't need the `id` returned from this call.
1. Tell the user to visit `/oauth/authorize` with parameters `scope=read write follow` (URL encode the space to `%20`, of course), `response_type=code`, `redirect_uri=urn:ietf:wg:oauth:2.0:oob` (assuming you don't want to redirect your users elsewhere), `client_id=<client_id>`. The user clicks on the URL and gets shown a page asking them to authorize your app for reading, writing, and following (assuming this is the scope you requested, feel free to request less). If the user clicks on the right button, they get back a code. Store this code as your `authorization_code`.
1. Send a POST request to `/oauth/token` with the parameters `client_id=<client_id>`, `client_secret=<client_secret>`, `grant_type=authorization_code`, `code=<authorization_code>`, `redirect_uri=urn:ietf:wg:oauth:2.0:oob`. Save the `access_token` you get back in your local cache. Note that an authorization code can only be used once. If it has been used already, you need to repeat step #2 to get a new one.

Once you have the access token,  add the HTTP header `Authorization: Bearer <access_token>` to any API call. If you want to check access token validity, one simple way to do it is [getting the current user](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#getting-the-current-user).
