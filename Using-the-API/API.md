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
  - [Favourites](#favourites)
  - [Follow Requests](#follow-requests)
  - [Follows](#follows)
  - [Instances](#instances)
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
  - [Error](#error)
  - [Instance](#instance)
  - [Mention](#mention)
  - [Notification](#notification)
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

When a file parameter is mentioned, a form-encoded upload is expected.

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

Returns the authenticated user's [Account](#account).

#### Updating the current user:

    PATCH /api/v1/accounts/update_credentials

Form data:

| Field          | Description                               | Optional   |
| -------------- | ----------------------------------------- | ---------- |
| `display_name` | The name to display in the user's profile | yes        |
| `note`         | A new biography for the user              | yes        |
| `avatar`       | An avatar for the user                    | yes        |
| `header`       | A header image for the user               | yes        |

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
| `exclude_replies` | Skip statuses that reply to other statuses                   | yes        |
| `max_id`          | Get a list of statuses with ID less than this value          | yes        |
| `since_id`        | Get a list of statuses with ID greater than this value       | yes        |
| `limit`           | Maximum number of statuses to get (Default 20, Max 40)       | yes        |

> **Note:** `max_id` and `since_id` for next and previous pages are provided in the `Link` header. However, it is possible to use the `id` of the returned objects to construct your own URLs.

Returns an array of [Statuses](#status).

#### Following/unfollowing an account:

    POST /api/v1/accounts/:id/follow
    POST /api/v1/accounts/:id/unfollow

Returns the target account's [Relationship](#relationship).

#### Blocking/unblocking an account:

    POST /api/v1/accounts/:id/block
    POST /api/v1/accounts/:id/unblock

Returns the target account's [Relationship](#relationship).

#### Muting/unmuting an account:

    POST /api/v1/accounts/:id/mute
    POST /api/v1/accounts/:id/unmute

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

### Follows

#### Following a remote user:

    POST /api/v1/follows

Form data:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `uri`             | `username@domain` of the person you want to follow                  | no         |

Returns the local representation of the followed account, as an [Account](#account).

### Instances

#### Getting instance information:

    GET /api/v1/instance

Returns the current [Instance](#instance).

Does not require authentication.

### Media

#### Uploading a media attachment:

    POST /api/v1/media

Form data:

| Field             | Description                                                         | Optional   |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| `file`            | Media to be uploaded                                                | no         |

Returns an [Attachment](#attachment) that can be used when creating a status.

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
| `comment`         | A comment to associate with the report (until 1000 characters)      | no         |

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

If `q` is a URL, Mastodon will attempt to fetch the provided account or status. Otherwise, it will do a local account and hashtag search.

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
| `media_ids`       | Array of media IDs to attach to the status (maximum 4)                   | yes        |
| `sensitive`       | Set this to mark the media of the status as NSFW                         | yes        |
| `spoiler_text`    | Text to be shown as a warning before the actual content                  | yes        |
| `visibility`       | Either "direct", "private", "unlisted" or "public"                      | yes        |

Returns the new [Status](#status).

#### Deleting a status:

    DELETE /api/v1/statuses/:id

Returns an empty object.

#### Reblogging/unreblogging a status:

    POST /api/v1/statuses/:id/reblog
    POST /api/v1/statuses/:id/unreblog

Returns the target [Status](#status).

#### Favouriting/unfavouriting a status:

    POST /api/v1/statuses/:id/favourite
    POST /api/v1/statuses/:id/unfavourite

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

Query parameters:

| Field             | Description                                                                         | Optional   |
| ----------------- | ----------------------------------------------------------------------------------- | ---------- |
| `local`           | Only return statuses originating from this instance (public and tag timelines only) | yes        |
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
| `meta`                   | `small` and `original` containing: `width`, `height`, `size`, `aspect`            | yes      |

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

### Error

| Attribute                | Description                        | Nullable |
| ------------------------ | ---------------------------------- | -------- |
| `error`                  | A textual description of the error | no       |

### Instance

| Attribute                | Description                                                              | Nullable |
| ------------------------ | ------------------------------------------------------------------------ | -------- |
| `uri`                    | URI of the current instance                                              | no       |
| `title`                  | The instance's title                                                     | no       |
| `description`            | A description for the instance                                           | no       |
| `email`                  | An email address which can be used to contact the instance administrator | no       |
| `version`                | The Mastodon version used by instance.                                   | no       |
| `urls`                   | `streaming_api`                                                          | no       |

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

### Relationship

| Attribute                | Description                                                  | Nullable |
| ------------------------ | ------------------------------------------------------------ | -------- |
| `id`                     | Target account id                                            | no       |
| `following`              | Whether the user is currently following the account          | no       |
| `followed_by`            | Whether the user is currently being followed by the account  | no       |
| `blocking`               | Whether the user is currently blocking the account           | no       |
| `muting`                 | Whether the user is currently muting the account             | no       |
| `requested`              | Whether the user has requested to follow the account         | no       |
| `domain_blocking`        | Whether the user is currently blocking the user's domain     | no       |

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
| `url`                    | URL to the status page (can be remote)                                        | no       |
| `account`                | The [Account](#account) which posted the status                               | no       |
| `in_reply_to_id`         | `null` or the ID of the status it replies to                                  | yes      |
| `in_reply_to_account_id` | `null` or the ID of the account it replies to                                 | yes      |
| `reblog`                 | `null` or the reblogged [Status](#status)                                     | yes      |
| `content`                | Body of the status; this will contain HTML (remote HTML already sanitized)    | no       |
| `created_at`             | The time the status was created                                               | no       |
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

### Tag

| Attribute                | Description                                  | Nullable |
| ------------------------ | -------------------------------------------- | -------- |
| `name`                   | The hashtag, not including the preceding `#` | no       |
| `url`                    | The URL of the hashtag                       | no       |
