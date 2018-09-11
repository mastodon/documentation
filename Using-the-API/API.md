API overview
============

## Contents

- [Available libraries](#available-libraries)
- [Notes](#notes)
- [Methods](#methods)
  - [Accounts](#accounts)
  - [Apps](#apps)
  - [Blocks](#blocks)
  - [Domain blocks](#domain-blocks)
  - [Endorsements](#endorsements)
  - [Favourites](#favourites)
  - [Filters](#filters)
  - [Follow Requests](#follow-requests)
  - [Follow Suggestions](#follow-suggestions)
  - [Follows](#follows)
  - [Instances](#instances)
    - [Custom Emojis](#custom-emojis)
  - [Lists](#lists)
  - [Media](#media)
  - [Mutes](#mutes)
  - [Notifications](#notifications)
  - [Reports](#reports)
  - [Search](#search)
  - [Statuses](#statuses)
  - [Timelines](#timelines)
- [Entities](#entities)
  - [Account](#account)
  - [Application](#application)
  - [Attachment](#attachment)
  - [Card](#card)
  - [Context](#context)
  - [Emoji](#emoji)
  - [Error](#error)
  - [Filter](#filter)
  - [Instance](#instance)
  - [List](#list)
  - [Mention](#mention)
  - [Notification](#notification)
  - [Push Subscription](#push-subscription)
  - [Relationship](#relationship)
  - [Results](#results)
  - [Status](#status)
  - [Tag](#tag)

___

## Available libraries

There are several libraries to interact with the Mastodon API. The list of libraries can be found on the [Libraries page](Libraries.md).

___

## Notes

###### Parameter types

When an array parameter is mentioned, the Rails convention of specifying array parameters in query strings is meant.
For example, a ruby array like `foo = [1, 2, 3]` should be encoded in the params as `foo[]=1&foo[]=2&foo[]=3`, with empty square brackets.

When sending binary data, such as files, Mastodon expects clients to use the `multipart/form-data` MIME type. This applies to media attachments, account avatars and account headers.

###### Selecting ranges

For most `GET` operations that return arrays, the query parameters `max_id` and `since_id` can be used to specify the range of IDs to return.
API methods that return collections of items can return a `Link` header containing URLs for the `next` and `prev` pages.
See the [Link header RFC](https://tools.ietf.org/html/rfc5988) for more information.

###### Errors

If the request you make doesn't go through, Mastodon will usually respond with an [Error](#error).

___

## Methods

### Accounts

#### Fetching an account:

    GET /api/v1/accounts/:id

Returns an [Account](#account).

#### Getting the current user:

    GET /api/v1/accounts/verify_credentials

Returns the authenticated user's [Account](#account) with an extra attribute `source` which contains these keys:

| Attribute   | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| `privacy`   | Selected preference: Default privacy of new toots              |
| `sensitive` | Selected preference: Mark media as sensitive by default?       |
| `note`      | Plain-text version of the account's `note`                     |
| `fields`    | Array of profile metadata, each element has 'name' and 'value' |

#### Updating the current user:

    PATCH /api/v1/accounts/update_credentials

Form data:

| Field          | Description                                                       | Optional   |
| -------------- | ----------------------------------------------------------------- | ---------- |
| `display_name` | The name to display in the user's profile                         | yes        |
| `note`         | A new biography for the user                                      | yes        |
| `avatar`       | An avatar for the user (encoded using `multipart/form-data`)      | yes        |
| `header`       | A header image for the user (encoded using `multipart/form-data`) | yes        |
| `locked`       | Manually approve followers?                                       | yes        |
| `source`       | (2.4 or later) extra `source` attribute from `verify_credentials` | yes        |
| `fields_attributes[0][name]` | (2.4 or later) Label of profile metadata field.     | yes        |
| `fields_attributes[0][value]` | (2.4 or later) Value of profile metadata field.    | yes        |

> **Note:** [0]…[3] is allowed in parameter name of fields_attributes. [] is not allowed.


Returns the authenticated user's [Account](#account).

#### Getting an account's followers:

    GET /api/v1/accounts/:id/followers

Query parameters:

| Field      | Description                                                    | Optional   |
| ---------- | -------------------------------------------------------------- | ---------- |
| `max_id`   | Get a list of followers with ID less than this value           | yes        |
| `since_id` | Get a list of followers with ID greater than this value        | yes        |
| `limit`    | Maximum number of followers to get (Default 40, Max 80)        | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. It is **not** possible to use the `id` of the returned objects to construct your own URLs, because the results are sorted by an internal key.

Returns an array of [Accounts](#account).

#### Getting who account is following:

    GET /api/v1/accounts/:id/following

Query parameters:

| Field      | Description                                                    | Optional   |
| ---------- | -------------------------------------------------------------- | ---------- |
| `max_id`   | Get a list of followings with ID less than this value          | yes        |
| `since_id` | Get a list of followings with ID greater than this value       | yes        |
| `limit`    | Maximum number of followings to get (Default 40, Max 80)       | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. It is **not** possible to use the `id` of the returned objects to construct your own URLs, because the results are sorted by an internal key.

Returns an array of [Accounts](#account).

#### Getting an account's statuses:

    GET /api/v1/accounts/:id/statuses

Query parameters:

| Field             | Description                                                  | Optional   |
| ----------------- | -----------------------------------------------------------  | ---------- |
| `only_media`      | Only return statuses that have media attachments             | yes        |
| `pinned`          | Only return statuses that have been pinned                   | yes        |
| `exclude_replies` | Skip statuses that reply to other statuses                   | yes        |
| `max_id`          | Get a list of statuses with ID less than this value          | yes        |
| `since_id`        | Get a list of statuses with ID greater than this value       | yes        |
| `limit`           | Maximum number of statuses to get (Default 20, Max 40)       | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. However, it is possible to use the `id` of the returned objects to construct your own URLs.

Returns an array of [Statuses](#status).

#### Following an account:

    POST /api/v1/accounts/:id/follow
    
| Field          | Description                               | Optional   |
| -------------- | ----------------------------------------- | ---------- |
| `reblogs` | Determines whether the followed account's reblogs will show up in the home timeline | yes        |

Returns the target account's [Relationship](#relationship).

#### Unfollowing an account:

    POST /api/v1/accounts/:id/unfollow

Returns the target account's [Relationship](#relationship).

#### Blocking/unblocking an account:

    POST /api/v1/accounts/:id/block
    POST /api/v1/accounts/:id/unblock

Returns the target account's [Relationship](#relationship).

#### Muting/unmuting an account:

    POST /api/v1/accounts/:id/mute
    
    Form data:

| Field          | Description                               | Optional   |
| -------------- | ----------------------------------------- | ---------- |
| `notifications` | Determines whether the mute will mute notifications or not. Default(true) | yes        |

Returns the target account's [Relationship](#relationship).
    
    POST /api/v1/accounts/:id/unmute

Returns the target account's [Relationship](#relationship).

#### Endorsing/unendorsing an account:

    POST /api/v1/accounts/:id/pin
    POST /api/v1/accounts/:id/unpin
    
Returns the target account's [Relationship](#relationship).

#### Getting an account's relationships:

    GET /api/v1/accounts/relationships

Query parameters:

| Field | Description                   | Optional   |
| ----- | ----------------------------  | ---------- |
| `id`  | Account IDs (can be an array) | no         |

Returns an array of [Relationships](#relationship) of the current user to a list of given accounts.

#### Searching for accounts:

    GET /api/v1/accounts/search

Query parameters:

| Field             | Description                                                   | Optional   |
| ----------------- | ------------------------------------------------------------- | ---------- |
| `q`               | What to search for                                            | no         |
| `limit`           | Maximum number of matching accounts to return (default: `40`) | yes        |
| `following`       | Limit the search to following (boolean, default `false`)      | yes        |

Returns an array of matching [Accounts](#accounts).

Will lookup an account remotely if the search term is in the `username@domain` format and not yet in the database.

### Apps

#### Registering an application:

    POST /api/v1/apps

Form data:

| Field             | Description                                                                                                                                                   | Optional   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `client_name`     | Name of your application                                                                                                                                      | no         |
| `redirect_uris`   | Where the user should be redirected after authorization (for no redirect, use `urn:ietf:wg:oauth:2.0:oob`)                                                    | no         |
| `scopes`          | This can be a space-separated list of the following items: "read", "write" and "follow" (see [this page](OAuth-details.md) for details on what the scopes do) | no         |
| `website`         | URL to the homepage of your app                                                                                                                               | yes        |

Creates a new OAuth app.

Returns `id`, `client_id` and `client_secret` which can be used with [OAuth authentication in your 3rd party app](Testing-with-cURL.md).

These values should be requested in the app itself from the API for each new app install + mastodon domain combo, and stored in the app for future requests.

### Blocks

#### Fetching a user's blocks:

    GET /api/v1/blocks

Query parameters:

| Field             | Description                                                   | Optional   |
| ----------------- | ------------------------------------------------------------- | ---------- |
| `max_id`          | Get a list of blocks with ID less than this value             | yes        |
| `since_id`        | Get a list of blocks with ID greater than this value          | yes        |
| `limit`           | Maximum number of blocks to get (Default 40, Max 80)          | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. It is **not** possible to use the `id` of the returned objects to construct your own URLs, because the results are sorted by an internal key.

Returns an array of [Accounts](#account) blocked by the authenticated user.

### Domain blocks

#### Fetching a user's blocked domains:

    GET /api/v1/domain_blocks

Query parameters:

| Field             | Description                                                   | Optional   |
| ----------------- | ------------------------------------------------------------- | ---------- |
| `max_id`          | Get a list of blocks with ID less than this value             | yes        |
| `since_id`        | Get a list of blocks with ID greater than this value          | yes        |
| `limit`           | Maximum number of blocks to get (Default 40, Max 80)          | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. It is **not** possible to use the `id` of the returned objects to construct your own URLs, because the results are sorted by an internal key.

Returns an array of strings.

#### Blocking a domain

    POST /api/v1/domain_blocks

Parameters:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `domain`          | Domain to block                                                     | no         |

Returns an empty object.

#### Unblocking a domain

    DELETE /api/v1/domain_blocks

Parameters:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `domain`          | Domain to unblock                                                   | no         |

Returns an empty object.

### Endorsements

#### Fetching a user's endorsed accounts

    GET /api/v1/endorsements
    
Returns an array of [Accounts](#account) endorsed by the authenticated user.

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. However, it is possible to use the `id` of the returned objects to construct your own URLs.

### Favourites

#### Fetching a user's favourites:

    GET /api/v1/favourites

Query parameters:

| Field             | Description                                                    | Optional   |
| ----------------- | -------------------------------------------------------------- | ---------- |
| `max_id`          | Get a list of favourites with ID less than this value          | yes        |
| `since_id`        | Get a list of favourites with ID greater than this value       | yes        |
| `limit`           | Maximum number of favourites to get (Default 20, Max 40)       | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. It is **not** possible to use the `id` of the returned objects to construct your own URLs, because the results are sorted by an internal key.

Returns an array of [Statuses](#status) favourited by the authenticated user.

### Filters

####  Fetching a list of filters:

    GET /api/v1/filters

> **Note:** This API does not provide pagenation.

Returns an array of [Filters](#filter).

#### Creating a filter.

    POST /api/v1/filters

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `phrase`          | String that contains keyword or phrase.         | no         |
| `context`         | Array of strings that means filtering context. Each string is one of 'home', 'notifications', 'public', 'thread'. At least one context must be specified. | no.         |
| `irreversible`    | Boolean that indicates irreversible filtering on server side.     | yes        |
| `whole_word`           | Boolean that indicates word match.     | yes        |
| `expires_in`           | Number that indicates seconds. Filter will be expire in seconds after API processed. Null or blank string means "don't change". Default is unlimited. | yes        |

Returns a [Filter](#filter).

Notes:

* The public context refers to both the local and the federated [timelines](#timelines); the home context refers to the home timeline. The thread context happens when looking at a status in [context](#context). No context applies when looking at the [statuses of an account](#getting-an-accounts-statuses).
* Clients must do their own filtering based on these filters. The server will apply "irreversible" filters for home and notifications context. Anything else is still up to the client to filter!
* Expired filters are not deleted by the server. They should no longer be applied but they are still stored by the server. It is up to clients to delete these filters eventually.

#### Get a filter.

    GET /api/v1/filters/:id

Returns a [Filter](#filter).

#### Update a filter.

    PUT /api/v1/filters/:id

The parameter is same with 'POST /api/v1/filters'.

> **Note:** Currently there is noway to remove expires from existing filter.

Returns a [Filter](#filter).

#### Delete a filter.

    DELETE /api/v1/filters/:id

Returns a empty object.

### Follow Requests

#### Fetching a list of follow requests:

    GET /api/v1/follow_requests

Query parameters:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `max_id`          | Get a list of follow requests with ID less than this value          | yes        |
| `since_id`        | Get a list of follow requests with ID greater than this value       | yes        |
| `limit`           | Maximum number of requests to get (Default 40, Max 80)              | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. It is **not** possible to use the `id` of the returned objects to construct your own URLs, because the results are sorted by an internal key.

Returns an array of [Accounts](#account) which have requested to follow the authenticated user.

#### Authorizing or rejecting follow requests:

    POST /api/v1/follow_requests/:id/authorize
    POST /api/v1/follow_requests/:id/reject

Returns an empty object.

### Follow Suggestions

#### Fetching a list of follow suggestions:

    GET /api/v1/suggestions

Query parameters:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |

> **Note:** This API does not provide pagenation.

Returns an array of [Accounts](#account) which is suggested.

#### Delete a user from follow suggestions:

    DELETE /api/v1/suggestions/:account_id

Returns an empty object.

### Follows

#### Following a remote user:

    POST /api/v1/follows

Form data:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `uri`             | `username@domain` of the person you want to follow                  | no         |

Returns the local representation of the followed account, as an [Account](#account).

### Instances

#### Getting current instance information:

    GET /api/v1/instance

Returns the current [Instance](#instance).

Does not require authentication.

### Custom Emojis

#### Getting current instance's custom emojis:

    GET /api/v1/custom_emojis

Returns a list of [Emoji](#emoji)

Does not require authentication.

### Lists

#### Retrieving lists

    GET /api/v1/lists

Returns at most 50 [Lists](#list) without pagination.

#### Retrieving lists by membership

    GET /api/v1/accounts/:id/lists
    
Returns at most 50 [Lists](#list) without pagination.

#### Retrieving accounts in a list

    GET /api/v1/lists/:id/accounts

Returns [Accounts](#account) in the list. If you specify `limit=0` in the query, all accounts will be returned without pagination. Otherwise, standard account pagination rules apply.

#### Retrieving a list

    GET /api/v1/lists/:id

Returns the specified [List](#list).

#### Creating and updating a list

    POST /api/v1/lists
    PUT /api/v1/lists/:id

Form data:

| Field            | Description           | Optional  |
| ---------------- | --------------------- | --------- |
| `title`          | The title of the list | no        |

Returns a new or updated [List](#list).

#### Deleting a list

    DELETE /api/v1/lists/:id

Returns an empty object.

#### Adding/removing accounts to/from a list

    POST /api/v1/lists/:id/accounts
    DELETE /api/v1/lists/:id/accounts

Form data:

| Field            | Description                               | Optional  |
| ---------------- | ----------------------------------------- | --------- |
| `account_ids`    | [Array](#parameter-types) of account IDs  | no        |

> **Note:** Only accounts already followed by the authenticated user can be added to a list.

Returns an empty object.

### Media

#### Uploading a media attachment:

    POST /api/v1/media

Form data:

| Field             | Description                                                               | Optional   |
| ----------------- | ------------------------------------------------------------------------- | ---------- |
| `file`            | Media to be uploaded (encoded using `multipart/form-data`)                | no         |
| `description`     | A plain-text description of the media, for accessibility (max 420 chars)  | yes        |
| `focus`           | Focal point: Two floating points, comma-delimited                         | yes        |

Returns an [Attachment](#attachment) that can be used when creating a status.

#### Updating a media attachment:

    PUT /api/v1/media/:id

Form data:

| Field             | Description                                                               | Optional   |
| ----------------- | ------------------------------------------------------------------------- | ---------- |
| `description`     | A plain-text description of the media, for accessibility (max 420 chars)  | yes        |
| `focus`           | Focal point: Two floating points, comma-delimited                         | yes        |

Can only be done before the media is attached to a status. Returns an [Attachment](#attachment) that can be used when creating a status.

#### Focal points

Server-side preview images are never cropped, to support a variety of apps and user interfaces. Therefore, the cropping must be done by those apps. To crop intelligently, focal points can be used to ensure a certain section of the image is always within the cropped viewport. [See this for how to let users select focal point coordinates](https://github.com/jonom/jquery-focuspoint#1-calculate-your-images-focus-point).

### Mutes

#### Fetching a user's mutes:

    GET /api/v1/mutes

Query parameters:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `max_id`          | Get a list of mutes with ID less than this value                    | yes        |
| `since_id`        | Get a list of mutes with ID greater than this value                 | yes        |
| `limit`           | Maximum number of mutes to get (Default 40, Max 80)                 | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. It is **not** possible to use the `id` of the returned objects to construct your own URLs, because the results are sorted by an internal key.

Returns an array of [Accounts](#account) muted by the authenticated user.

### Notifications

#### Fetching a user's notifications:

    GET /api/v1/notifications

Query parameters:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `max_id`          | Get a list of notifications with ID less than this value            | yes        |
| `since_id`        | Get a list of notifications with ID greater than this value         | yes        |
| `limit`           | Maximum number of notifications to get (Default 15, Max 30)         | yes        |
| `exclude_types`   | Array of notifications to exclude (Allowed values: "follow", "favourite", "reblog", "mention")          | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. However, it is possible to use the `id` of the returned objects to construct your own URLs.

Returns a list of [Notifications](#notification) for the authenticated user.

#### Getting a single notification:

    GET /api/v1/notifications/:id

Returns the [Notification](#notification).

#### Clearing notifications:

    POST /api/v1/notifications/clear

Deletes all notifications from the Mastodon server for the authenticated user.
Returns an empty object.

#### Dismissing a single notification:

    POST /api/v1/notifications/dismiss
    
Form data:

| Field | Description                   | Optional   |
| ----- | ----------------------------  | ---------- |
| `id`  | Notification ID | no         |    

Deletes a single notification from the Mastodon server for the authenticated user.
Returns an empty object.

#### Adding push subscription

    POST /api/v1/push/subscription

Form data: 

| Field                        | Description                                                                                           | Optional |
| ---------------------------- | ----------------------------------------------------------------------------------------------------  | -------- |
| `subscription[endpoint]`     | Endpoint URL that called when notification is happen.                                                 | no       |
| `subscription[keys][p256dh]` | User agent public key. Base64 encoded string of public key of ECDH key that using 'prime256v1' curve. | no       |
| `subscription[keys][auth]`   | Auth secret. Base64 encoded string of 16 bytes random data.                                           | no       |
| `data[alerts][follow]`       | Boolean of whether you want to receive follow notification event.                         | ?        |
| `data[alerts][favourite]`    | Boolean of whether you want to receive favourite notification event.                      | ?        |
| `data[alerts][reblog]`       | Boolean of whether you want to receive reblog notification event.                         | ?        |
| `data[alerts][mention]`      | Boolean of whether you want to receive mention notification event.                        | ?        |

Returns the [Push Subscription](#push-subscription).

Each access token can have one push subscription.
If you post new subscription. the old subscription is deleted.

The endpoint URL is called when notification event is happen,
and its payload is encrypted according to The Web Push Protocol.
see also:
- https://developers.google.com/web/updates/2016/03/web-push-encryption
- https://developers.google.com/web/fundamentals/push-notifications/web-push-protocol

#### Get current push subscription status

    GET /api/v1/push/subscription

Returns the [Push Subscription](#push-subscription).

#### Updating push subscription

    PUT /api/v1/push/subscription

Returns the [Push Subscription](#push-subscription).

This API updates 'data' part of push subscription.
If you want to change 'subscription', you have to use 'POST /api/v1/push/subscription'.

#### Removing push subscription

    DELETE /api/v1/push/subscription

This API removes push subscription that bind to access token.



### Reports

#### Fetching a user's reports:

    GET /api/v1/reports

Returns a list of [Reports](#report) made by the authenticated user. (This method is not entirely implemented and contains no useful information at this point)

#### Reporting a user:

    POST /api/v1/reports

Form data:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `account_id`      | The ID of the account to report                                     | no         |
| `status_ids`      | The IDs of statuses to report (can be an array)                     | no         |
| `comment`         | A comment to associate with the report (up to 1000 characters)      | no         |

Returns the finished [Report](#report).

### Search

#### Searching for content:

    GET /api/v1/search

Form data:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `q`               | The search query                                                    | no         |
| `resolve`         | Whether to resolve non-local accounts (default: don't resolve)      | yes        |

Returns [Results](#results).

If `q` is a URL, Mastodon will attempt to fetch the provided account or status. Otherwise, it will search for local accounts and hashtags, and if your instance allows it it will search for toots you've written, boosted, favourited or were mentioned in.

    GET /api/v2/search

Same as above, but returns [Results](#results) with [Tag](#tag) objects in the hashtag attribute.

### Statuses

#### Fetching a status:

    GET /api/v1/statuses/:id

Returns a [Status](#status).

Does not require authentication.

#### Getting status context:

    GET /api/v1/statuses/:id/context

Returns a [Context](#context).

Does not require authentication.

#### Getting a card associated with a status:

    GET /api/v1/statuses/:id/card

Returns a [Card](#card).

Does not require authentication.

#### Getting who reblogged/favourited a status:

    GET /api/v1/statuses/:id/reblogged_by
    GET /api/v1/statuses/:id/favourited_by

Query parameters:

| Field             | Description                                                              | Optional   |
| ----------------- | ------------------------------------------------------------------------ | ---------- |
| `max_id`          | Get a list of reblogged/favourited with ID less than this value          | yes        |
| `since_id`        | Get a list of reblogged/favourited with ID greater than this value       | yes        |
| `limit`           | Maximum number of reblogged/favourited to get (Default 40, Max 80)       | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. It is **not** possible to use the `id` of the returned objects to construct your own URLs, because the results are sorted by an internal key.

Returns an array of [Accounts](#account).

Does not require authentication.

#### Posting a new status:

    POST /api/v1/statuses

Form data:

| Field             | Description                                                              | Optional   |
| ----------------- | ------------------------------------------------------------------------ | ---------- |
| `status`          | The text of the status                                                   | no         |
| `in_reply_to_id`  | local ID of the status you want to reply to                              | yes        |
| `media_ids`       | [Array](#parameter-types) of media IDs to attach to the status (maximum 4)| yes        |
| `sensitive`       | Set this to mark the media of the status as NSFW                         | yes        |
| `spoiler_text`    | Text to be shown as a warning before the actual content                  | yes        |
| `visibility`      | Either "direct", "private", "unlisted" or "public"                       | yes        |
| `language`        | ISO 639-2 language code of the toot, to skip automatic detection         | yes        |

Returns the new [Status](#status).

> **Note:** In order to prevent duplicate statuses, this endpoint accepts an `Idempotency-Key` header, which should be set to a unique string for each new status. In the event of a network error, a request can be retried with the same `Idempotency-Key`. Only one status will be created regardless of how many requests with the same `Idempotency-Key` did go through.
>
> See <https://stripe.com/blog/idempotency> for more on idempotency and idempotency keys.

#### Deleting a status:

    DELETE /api/v1/statuses/:id

Returns an empty object.

#### Reblogging/unreblogging a status:

    POST /api/v1/statuses/:id/reblog
    POST /api/v1/statuses/:id/unreblog

Reblog: Returns the reblog [Status](#status).

Unreblog: Returns the target [Status](#status).

#### Favouriting/unfavouriting a status:

    POST /api/v1/statuses/:id/favourite
    POST /api/v1/statuses/:id/unfavourite

Returns the target [Status](#status).

#### Pinning/unpinning a status:

    POST /api/v1/statuses/:id/pin
    POST /api/v1/statuses/:id/unpin

Returns the target [Status](#status).

#### Muting/unmuting a conversation of a status

    POST /api/v1/statuses/:id/mute
    POST /api/v1/statuses/:id/unmute

Only makes sense for statuses featured inside notifications directed at the user. Muting a status will prevent replies to it, favourites and replies of it from appearing in the user's notifications.

Returns the target [Status](#status).

### Timelines

#### Retrieving a timeline:

    GET /api/v1/timelines/home
    GET /api/v1/timelines/public
    GET /api/v1/timelines/tag/:hashtag
    GET /api/v1/timelines/list/:list_id
    GET /api/v1/timelines/direct

Query parameters:

| Field             | Description                                                                         | Optional   |
| ----------------- | ----------------------------------------------------------------------------------- | ---------- |
| `local`           | Only return statuses originating from this instance (public and tag timelines only) | yes        |
| `only_media`      | Only return statuses that have media attachments (public and tag timelines only)    | yes        |
| `max_id`          | Get a list of timelines with ID less than this value                                | yes        |
| `since_id`        | Get a list of timelines with ID greater than this value                             | yes        |
| `limit`           | Maximum number of statuses on the requested timeline to get (Default 20, Max 40)    | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. However, it is possible to use the `id` of the returned objects to construct your own URLs.

Returns an array of [Statuses](#status), most recent ones first.

Public and tag timelines do not require authentication.

___

## Entities

> **Note:** Some attributes in the entity payload can have ``null`` value and are marked as _nullable_ on the tables below. Attributes that are not nullable are guaranteed to return a valid value.

### Account

| Attribute                | Description                                                                        | Nullable |
| ------------------------ | ---------------------------------------------------------------------------------- | -------- |
| `id`                     | The ID of the account                                                              | no       |
| `username`               | The username of the account                                                        | no       |
| `acct`                   | Equals `username` for local users, includes `@domain` for remote ones              | no       |
| `display_name`           | The account's display name                                                         | no       |
| `locked`                 | Boolean for when the account cannot be followed without waiting for approval first | no       |
| `created_at`             | The time the account was created                                                   | no       |
| `followers_count`        | The number of followers for the account                                            | no       |
| `following_count`        | The number of accounts the given account is following                              | no       |
| `statuses_count`         | The number of statuses the account has made                                        | no       |
| `note`                   | Biography of user                                                                  | no       |
| `url`                    | URL of the user's profile page (can be remote)                                     | no       |
| `avatar`                 | URL to the avatar image                                                            | no       |
| `avatar_static`          | URL to the avatar static image (gif)                                               | no       |
| `header`                 | URL to the header image                                                            | no       |
| `header_static`          | URL to the header static image (gif)                                               | no       |
| `emojis`                 | Array of [Emoji](#emoji) in account username and note                              | no       |
| `moved`                  | If the owner decided to switch accounts, new account is in this attribute          | yes      |
| `fields`                 | Array of profile metadata field, each element has 'name' and 'value'               | yes      |
| `bot`                    | Boolean to indicate that the account performs automated actions                    | yes      |


### Application

| Attribute                | Description             | Nullable |
| ------------------------ | ----------------------- | -------- |
| `name`                   | Name of the app         | no       |
| `website`                | Homepage URL of the app | yes      |

### Attachment

| Attribute                | Description                                                                       | Nullable |
| ------------------------ | --------------------------------------------------------------------------------- | -------- |
| `id`                     | ID of the attachment                                                              | no       |
| `type`                   | One of: "image", "video", "gifv", "unknown"                                       | no       |
| `url`                    | URL of the locally hosted version of the image                                    | no       |
| `remote_url`             | For remote images, the remote URL of the original image                           | yes      |
| `preview_url`            | URL of the preview image                                                          | no       |
| `text_url`               | Shorter URL for the image, for insertion into text (only present on local images) | yes      |
| `meta`                   | See **attachment metadata** below                                                 | yes      |
| `description`            | A description of the image for the visually impaired (maximum 420 characters), or `null` if none provided  | yes      |

**Attachment metadata:**

May contain `small` and `original` (referring to the preview and the original file). Images may contain `width`, `height`, `size`, `aspect`, while videos (including GIFV) may contain `width`, `height`, `frame_rate`, `duration` and `bitrate`. There may be another top-level object, `focus` with the coordinates `x` and `y`. These coordinates can be used for smart thumbnail cropping, [see this for reference](https://github.com/jonom/jquery-focuspoint#1-calculate-your-images-focus-point).

> **Note**: When the type is "unknown", it is likely only `remote_url` is available and local `url` is missing

### Card

| Attribute                | Description                                | Nullable |
| ------------------------ | ------------------------------------------ | -------- |
| `url`                    | The url associated with the card           | no       |
| `title`                  | The title of the card                      | no       |
| `description`            | The card description                       | no       |
| `image`                  | The image associated with the card, if any | yes      |
| `type`                   | "link", "photo", "video", or "rich"        | no       |
| `author_name`            | OEmbed data                                | yes      |
| `author_url`             | OEmbed data                                | yes      |
| `provider_name`          | OEmbed data                                | yes      |
| `provider_url`           | OEmbed data                                | yes      |
| `html`                   | OEmbed data                                | yes      |
| `width`                  | OEmbed data                                | yes      |
| `height`                 | OEmbed data                                | yes      |

### Context

| Attribute                | Description                                                                         | Nullable |
| ------------------------ | ----------------------------------------------------------------------------------- | -------- |
| `ancestors`              | The ancestors of the status in the conversation, as a list of [Statuses](#status)   | no       |
| `descendants`            | The descendants of the status in the conversation, as a list of [Statuses](#status) | no       |

### Emoji

| Attribute                | Description                                              | Nullable |
|--------------------------|----------------------------------------------------------|----------|
| `shortcode`              | The shortcode of the emoji                               | no       |
| `static_url`             | URL to the emoji static image                            | no       |
| `url`                    | URL to the emoji image                                   | no       |
| `visible_in_picker`      | Boolean that indicates if the emoji is visible in picker | no       |

### Error

The most important part of an error response is the HTTP status code. Standard semantics are followed. The body of an error is a JSON object with this structure:

| Attribute                | Description                        | Nullable |
| ------------------------ | ---------------------------------- | -------- |
| `error`                  | A textual description of the error | no       |

### Filter

| Attribute                | Description                        | Nullable |
| ------------------------ | ---------------------------------- | -------- |
| `id`                  | ID of the filter | no       |
| `phrase`                  | Keyword or phrase | no       |
| `context`                  | Array of strings that indicate filter context. each string is ont of 'home', 'notifications', 'public', 'thread'  | no       |
| `expires_at`                  | String such as "2018-07-06T00:59:13.161Z" that indicates when this filter is expired.  | yes       |
| `irreversible`                  | Boolean that indicates irreversible server side filtering. | no       |
| `whole_word`                  | Boolean that indicates word match.  | no       |

If `whole_word` is true , client app should do:
- Define 'Word constituent character' for your app. In official implementation, it's [A-Za-z0-9_] for JavaScript, it's [[:word:]] for Ruby. In Ruby case it's POSIX character class (Letter | Mark | Decimal_Number | Connector_Punctuation). 
- If the phrase starts with word character, and if the previous character before matched range is word character, its matched range should treat to not match.
- If the phrase ends with word character, and if the next character after matched range is word character, its matched range should treat to not match.

Please check app/javascript/mastodon/selectors/index.js and app/lib/feed_manager.rb for more details.
Most case client apps are compared to WebUI(JS), they should obey to JS implementation.

### Instance

| Attribute                | Description                                                              | Nullable |
| ------------------------ | ------------------------------------------------------------------------ | -------- |
| `uri`                    | URI of the current instance                                              | no       |
| `title`                  | The instance's title                                                     | no       |
| `description`            | A description for the instance                                           | no       |
| `email`                  | An email address which can be used to contact the instance administrator | no       |
| `version`                | The Mastodon version used by instance.                                   | no       |
| `urls`                   | `streaming_api`                                                          | no       |
| `languages`              | Array of ISO 6391 language codes the instance has chosen to advertise    | no       |
| `contact_account`        | [Account](#account) of the admin or another contact person               | no       |

### List

| Attribute | Description       | Nullable |
|-----------|-------------------|----------|
| `id`      | ID of the list    | no       |
| `title`   | Title of the list | no       |

### Mention

| Attribute                | Description                                                           | Nullable |
| ------------------------ | --------------------------------------------------------------------- | -------- |
| `url`                    | URL of user's profile (can be remote)                                 | no       |
| `username`               | The username of the account                                           | no       |
| `acct`                   | Equals `username` for local users, includes `@domain` for remote ones | no       |
| `id`                     | Account ID                                                            | no       |

### Notification

| Attribute                | Description                                                           | Nullable |
| ------------------------ | --------------------------------------------------------------------- | -------- |
| `id`                     | The notification ID                                                   | no       |
| `type`                   | One of: "mention", "reblog", "favourite", "follow"                    | no       |
| `created_at`             | The time the notification was created                                 | no       |
| `account`                | The [Account](#account) sending the notification to the user          | no       |
| `status`                 | The [Status](#status) associated with the notification, if applicable | yes      |

### Push Subscription
| Attribute                | Description                                                     | Nullable |
| ------------------------ | --------------------------------------------------------------- | -------- |
| `id`                     | The push subscription ID                                        | no       |
| `endpoint`               | The endpoint URL                                                | no       |
| `server_key`             | The server public key for signature verification. (not for decoding) | no  |
| `alerts`                 | Map of 'notification event type' and 'push is requested or not' | ?        |

### Relationship

| Attribute                | Description                                                  | Nullable |
| ------------------------ | ------------------------------------------------------------ | -------- |
| `id`                     | Target account id                                            | no       |
| `following`              | Whether the user is currently following the account          | no       |
| `followed_by`            | Whether the user is currently being followed by the account  | no       |
| `blocking`               | Whether the user is currently blocking the account           | no       |
| `muting`                 | Whether the user is currently muting the account             | no       |
| `muting_notifications`   | Whether the user is also muting notifications                | no       |
| `requested`              | Whether the user has requested to follow the account         | no       |
| `domain_blocking`        | Whether the user is currently blocking the accounts's domain | no       |
| `showing_reblogs`        | Whether the user's reblogs will show up in the home timeline | no       |
| `endorsed`               | Whether the user is currently endorsing the account          | no       |

### Report

| Attribute                | Description                                | Nullable |
| ------------------------ | ------------------------------------------ | -------- |
| `id`                     | The ID of the report                       | no       |
| `action_taken`           | The action taken in response to the report | no       |

### Results

| Attribute                | Description                              | Nullable |
| ------------------------ | ---------------------------------------- | -------- |
| `accounts`               | An array of matched [Accounts](#account) | no      |
| `statuses`               | An array of matched [Statuses](#status)  | no      |
| `hashtags`               | An array of matched hashtags, as strings | no      |

### Status

| Attribute                | Description                                                                   | Nullable |
| ------------------------ | ----------------------------------------------------------------------------- | -------- |
| `id`                     | The ID of the status                                                          | no       |
| `uri`                    | A Fediverse-unique resource ID                                                | no       |
| `url`                    | URL to the status page (can be remote)                                        | yes      |
| `account`                | The [Account](#account) which posted the status                               | no       |
| `in_reply_to_id`         | `null` or the ID of the status it replies to                                  | yes      |
| `in_reply_to_account_id` | `null` or the ID of the account it replies to                                 | yes      |
| `reblog`                 | `null` or the reblogged [Status](#status)                                     | yes      |
| `content`                | Body of the status; this will contain HTML (remote HTML already sanitized)    | no       |
| `created_at`             | The time the status was created                                               | no       |
| `emojis`                 | An array of [Emoji](#emoji)                                                   | no       |
| `replies_count`          | The number of replies for the status                                          | no       |
| `reblogs_count`          | The number of reblogs for the status                                          | no       |
| `favourites_count`       | The number of favourites for the status                                       | no       |
| `reblogged`              | Whether the authenticated user has reblogged the status                       | yes      |
| `favourited`             | Whether the authenticated user has favourited the status                      | yes      |
| `muted`                  | Whether the authenticated user has muted the conversation this status from    | yes      |
| `sensitive`              | Whether media attachments should be hidden by default                         | no       |
| `spoiler_text`           | If not empty, warning text that should be displayed before the actual content | no       |
| `visibility`             | One of: `public`, `unlisted`, `private`, `direct`                             | no       |
| `media_attachments`      | An array of [Attachments](#attachment)                                        | no       |
| `mentions`               | An array of [Mentions](#mention)                                              | no       |
| `tags`                   | An array of [Tags](#tag)                                                      | no       |
| `application`            | [Application](#application) from which the status was posted                  | yes      |
| `language`               | The detected language for the status, if detected                             | yes      |
| `pinned`                 | Whether this is the pinned status for the account that posted it              | yes      |

> **NOTE**: When `spoiler_text` is present, `sensitive` is true 

> **NOTE**: `in_reply_to_id` and `in_reply_to_account_id` are `null` if the status that is replied to is unknown

### Tag

| Attribute                | Description                                  | Nullable |
| ------------------------ | -------------------------------------------- | -------- |
| `name`                   | The hashtag, not including the preceding `#` | no       |
| `url`                    | The URL of the hashtag                       | no       |
| `history`                | Array of daily usage history. Not included in statuses | yes |

> **NOTE**: Each object in `history` has the following structure: `day` (UNIX timestamp), `uses` (total statuses using that hashtag during that day), and `accounts` (total unique accounts using that hashtag during that day). Last 7 days.
