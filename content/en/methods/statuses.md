
---
title: statuses API methods
description: Publish, interact, and view information about statuses.
menu:
  docs:
    weight: 30
    name: statuses
    parent: methods
    identifier: methods-statuses
aliases: [
  "/methods/statuses",
  "/api/methods/statuses",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Post a new status {#create}

```http
POST /api/v1/statuses HTTP/1.1
```

Publish a status with the given parameters.

**Returns:** [Status]({{<relref "entities/status">}}). When `scheduled_at` is present, [ScheduledStatus]({{<relref "entities/scheduledstatus">}}) is returned instead.\
**OAuth:** User + `write:statuses`\
**Version history:**\
0.0.0 - added\
2.7.0 - `scheduled_at` added\
2.8.0 - `poll` added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

Idempotency-Key
: Provide this header with any arbitrary string to prevent duplicate submissions of the same status. Consider using a hash or UUID generated client-side. Idempotency keys are stored for up to 1 hour.

##### Form data parameters

status
: {{<required>}} String. The text content of the status. If `media_ids` is provided, this becomes optional. Attaching a `poll` is optional while `status` is provided.

media_ids[]
: {{<required>}} Array of String. Include Attachment IDs to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used.

poll[options][]
: {{<required>}} Array of String. Possible answers to the poll. If provided, `media_ids` cannot be used, and `poll[expires_in]` must be provided.

poll[expires_in]
: {{<required>}} Integer. Duration that the poll should be open, in seconds. If provided, `media_ids` cannot be used, and `poll[options]` must be provided.

poll[multiple]
: Boolean. Allow multiple choices? Defaults to false.

poll[hide_totals]
: Boolean. Hide vote counts until the poll ends? Defaults to false.

in_reply_to_id
: String. ID of the status being replied to, if status is a reply.

sensitive
: Boolean. Mark status and attached media as sensitive? Defaults to false.

spoiler_text
: String. Text to be shown as a warning or subject before the actual content. Statuses are generally collapsed behind this field.

visibility
: String. Sets the visibility of the posted status to `public`, `unlisted`, `private`, `direct`.

language
: String. ISO 639 language code for this status.

scheduled_at
: String. ISO 8601 Datetime at which to schedule a status. Providing this parameter will cause ScheduledStatus to be returned instead of Status. Must be at least 5 minutes in the future.

#### Response
##### 200: OK

Status will be posted with chosen parameters:

```json
{
  "id": "103254962155278888",
  "created_at": "2019-12-05T11:34:47.196Z",
  // ...
  "content": "<p>test content</p>",
  // ...
  "application": {
    "name": "test app",
    "website": null
  },
  // ...
}
```

If scheduled_at is provided, then a ScheduledStatus will be returned instead:

```json
{
  "id": "3221",
  "scheduled_at": "2019-12-05T12:33:01.000Z",
  "params": {
    "text": "test content",
    "media_ids": null,
    "sensitive": null,
    "spoiler_text": null,
    "visibility": null,
    "scheduled_at": null,
    "poll": null,
    "idempotency": null,
    "in_reply_to_id": null,
    "application_id": 596551
  },
  "media_attachments": []
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Text can't be blank"
}
```

---

## View a single status {#get}

```http
GET /api/v1/statuses/:id HTTP/1.1
```

Obtain information about a status.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** Public for public statuses, user token + `read:statuses` for private statuses\
**Version history:**\
0.0.0 - added\
2.7.0 - public statuses no longer require token

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "id": "1",
  "created_at": "2016-03-16T14:44:31.580Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/Gargron/statuses/1",
  "url": "https://mastodon.social/@Gargron/1",
  "replies_count": 7,
  "reblogs_count": 98,
  "favourites_count": 112,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "content": "<p>Hello world</p>",
  "reblog": null,
  "application": null,
  "account": {
    "id": "1",
    "username": "Gargron",
    "acct": "Gargron",
    "display_name": "Eugen",
    "locked": false,
    "bot": false,
    "created_at": "2016-03-16T14:34:26.392Z",
    "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
    "url": "https://mastodon.social/@Gargron",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "followers_count": 320472,
    "following_count": 453,
    "statuses_count": 61163,
    "last_status_at": "2019-12-05T03:03:02.595Z",
    "emojis": [],
    "fields": [
      {
        "name": "Patreon",
        "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
        "verified_at": null
      },
      {
        "name": "Homepage",
        "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span></a>",
        "verified_at": "2019-07-15T18:29:57.191+00:00"
      }
    ]
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": null
}
```

##### 401: Unauthorized

Instance is in authorized-fetch mode.

```json
{
  "error": "This API requires an authenticated user"
}
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

---

## Delete a status {#delete}

```http
DELETE /api/v1/statuses/:id HTTP/1.1
```

Delete one of your own statuses.

**Returns:** [Status]({{< relref "entities/status" >}}) with source `text` and `poll` or `media_attachments`\
**OAuth:** User token + `write:statuses`\
**Version history:**\
0.0.0 - added\
2.9.0 - return source properties, for use with delete and redraft

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Note the special properties `text` and `poll` or `media_attachments` which may be used to repost the status, e.g. in case of delete-and-redraft functionality. With [POST /api/v1/statuses](#create), use `text` as the value for `status` parameter, `media_attachments[n]["id"]` for the `media_ids` array parameter, and `poll` properties with the corresponding parameters (e.g. `poll[multiple]` and `poll[options]`, with a new `poll[expires_in]` and `poll[hide_totals]` per user input.

Example of deleting a media post:

```json
{
  "id": "103254193998341330",
  "created_at": "2019-12-05T08:19:26.052Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/trwnh/statuses/103254193998341330",
  "url": "https://mastodon.social/@trwnh/103254193998341330",
  "replies_count": 0,
  "reblogs_count": 0,
  "favourites_count": 0,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  "text": "test",
  "reblog": null,
  "application": {
    "name": "Web",
    "website": null
  },
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    // ...
  },
  "media_attachments": [
    {
      "id": "22345792",
      "type": "image",
      "url": "https://files.mastodon.social/media_attachments/files/022/345/792/original/57859aede991da25.jpeg",
      "preview_url": "https://files.mastodon.social/media_attachments/files/022/345/792/small/57859aede991da25.jpeg",
      "remote_url": null,
      "text_url": "https://mastodon.social/media/2N4uvkuUtPVrkZGysms",
      "meta": {
        "original": {
          "width": 640,
          "height": 480,
          "size": "640x480",
          "aspect": 1.3333333333333333
        },
        "small": {
          "width": 461,
          "height": 346,
          "size": "461x346",
          "aspect": 1.3323699421965318
        },
        "focus": {
          "x": -0.27,
          "y": 0.51
        }
      },
      "description": "test media description",
      "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
    }
  ],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": null
}
```

Example of deleting a poll:

```json
{
  "id": "103254222827484720",
  "created_at": "2019-12-05T08:26:45.958Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/trwnh/statuses/103254222827484720",
  "url": "https://mastodon.social/@trwnh/103254222827484720",
  "replies_count": 0,
  "reblogs_count": 0,
  "favourites_count": 0,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  "text": "test",
  "reblog": null,
  "application": {
    "name": "Web",
    "website": null
  },
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    // ...
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": {
    "id": "34858",
    "expires_at": "2019-12-06T08:26:45.945Z",
    "expired": false,
    "multiple": false,
    "votes_count": 1,
    "voters_count": 1,
    "voted": true,
    "own_votes": [],
    "options": [
      {
        "title": "test 1",
        "votes_count": 1
      },
      {
        "title": "test 2",
        "votes_count": 0
      }
    ],
    "emojis": []
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status is not owned by you or does not exist

```json
{
  "error": "Record not found"
}
```

---

## Get parent and child statuses in context {#context}

```http
GET /api/v1/statuses/:id/context HTTP/1.1
```

View statuses above and below this status in the thread.

**Returns:** [Context]({{< relref "entities/context" >}})\
**OAuth:** Public for public statuses limited to 40 ancestors and 60 descendants with a maximum depth of 20. User token + `read:statuses` for up to 4,096 ancestors, 4,096 descendants, unlimited depth, and private statuses.\
**Version history:**\
0.0.0 - added
4.0.0 - limit unauthenticated requests

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "ancestors": [
    {
      "id": "103188938570975982",
      "created_at": "2019-11-23T19:44:00.124Z",
      "in_reply_to_id": null,
      "in_reply_to_account_id": null,
      // ...
    },
    {
      "id": "103188971072973252",
      "created_at": "2019-11-23T19:52:23.398Z",
      "in_reply_to_id": "103188938570975982",
      "in_reply_to_account_id": "634458",
      // ...
    },
    {
      "id": "103188982235527758",
      "created_at": "2019-11-23T19:55:08.208Z",
      "in_reply_to_id": "103188971072973252",
      "in_reply_to_account_id": "14715",
      // ...
    }
  ],
  "descendants": [
    {
      "id": "103189026958574542",
      "created_at": "2019-11-23T20:06:36.011Z",
      "in_reply_to_id": "103189005915505698",
      "in_reply_to_account_id": "634458",
      // ...
    }
  ]
}
```

##### 404: Not found

Status is private or does not exist

```json
{
  "error": "Record not found"
}
```

---

## Translate a status {#translate}

```http
POST /api/v1/statuses/:id/translate HTTP/1.1
```

Translate the status content into some language.

**Returns:** [Translation]({{< relref "entities/translation" >}})\
**OAuth:** App token + `read:statuses`\
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Form data parameters

lang
: String (ISO 639 language code). The status content will be translated into this language. Defaults to the user's current locale.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Translating a status in Spanish with content warning and media into English

```json
{
  "content": "<p>Hello world</p>",
  "spoiler_text": "Greatings ahead",
  "media_attachments": [
    {
      "id": 22345792,
      "description": "Status author waving at the camera"
    }
  ],
  "poll": null,
  "detected_source_language": "es",
  "provider": "DeepL.com"
}
```

Translating a status with poll into English

```json
{
  "content": "<p>Should I stay or should I go?</p>",
  "spoiler_text": null,
  "media_attachments": [],
  "poll": [
    {
      "id": 34858,
      "options": [
        {
          "title": "Stay" 
        },
        {
          "title": "Go"
        }
      ]
    }
  ],
  "detected_source_language": "ja",
  "provider": "DeepL.com"
}
```

##### 404: Not found

Status is private or does not exist

```json
{
  "error": "Record not found"
}
```

##### 503: Service unavailable

The translation request failed

```json
{
  "error": "Service Unavailable"
}
```

---

## See who boosted a status {#reblogged_by}

```http
GET /api/v1/statuses/:id/reblogged_by HTTP/1.1
```

View who boosted a given status.

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** Public for public statuses. User token + `read:statuses` for private statuses.
**Version history:**\
0.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

A list of accounts that boosted the status

```json
[
  {
    "id": "711345",
    "username": "Norman_Doors",
    "acct": "Norman_Doors@witches.live",
    // ...
  },
  // ...
]
```

Because reblogged Status IDs are generally not known ahead of time, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/statuses/109404970108594430/reblogged_by?limit=2&max_id=109406336446186031>; rel="next", <https://mastodon.example/api/v1/statuses/109404970108594430/reblogged_by?limit=2&since_id=109408462939099398>; rel="prev"
```

##### 404: Not found

Status does not exist or is private

```json
{
  "error": "Record not found"
}
```

---

## See who favourited a status {#favourited_by}

```http
GET /api/v1/statuses/:id/favourited_by HTTP/1.1
```

View who favourited a given status.

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** Public for public statuses. User token + `read:statuses` for private statuses.\
**Version history:**\
0.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

A list of accounts who favourited the status

```json
[
  {
    "id": "828600",
    "username": "fructose_dealer",
    "acct": "fructose_dealer@radical.town",
    // ...
  },
  // ...
]
```

Because Favourite IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/statuses/109419880690343548/favourited_by?limit=1&max_id=53286827>; rel="next", <https://mastodon.example/api/v1/statuses/109419880690343548/favourited_by?limit=1&since_id=53286827>; rel="prev"
```

##### 404: Not found

Status does not exist or is private

```json
{
  "error": "Record not found"
}
```

---

## Favourite a status {#favourite}

```http
POST /api/v1/statuses/:id/favourite HTTP/1.1
```

Add a status to your favourites list.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:favourites`\
**Version history:**\
0.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status favourited or was already favourited

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": true,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private

```json
{
  "error": "Record not found"
}
```

---

## Undo favourite of a status {#unfavourite}

```http
POST /api/v1/statuses/:id/unfavourite HTTP/1.1
```

Remove a status from your favourites list.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:favourites`\
**Version history:**\
0.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status unfavourited or was already not favourited

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private

```json
{
  "error": "Record not found"
}
```

---

## Boost a status {#boost}

```http
POST /api/v1/statuses/:id/reblog HTTP/1.1
```

Reshare a status on your own profile.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:statuses`\
**Version history:**\
0.0.0 - added\
2.8.0 - add `visibility` parameter

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

visibility
: String. Any visibility except `limited` or `direct` (i.e. `public`, `unlisted`, `private`). Defaults to public. Currently unused in UI.

#### Response
##### 200: OK

Status has been reblogged. Note that the top-level id has changed. The id of the boosted status is now inside the `reblog` property. The top-level id is the id of the reblog itself. Also note that reblogs cannot be pinned.

```json
{
  "id": "103254401326800919",
  "created_at": "2019-12-05T09:12:09.625Z",
  // ...
  "favourited": false,
  "reblogged": true,
  "muted": false,
  "bookmarked": false,
  // ...
  "reblog": {
    "id": "99734435964706331",
    "created_at": "2018-03-23T17:38:40.700Z",
    // ...
    "favourited": false,
    "reblogged": true,
    "muted": false,
    "bookmarked": false,
    "pinned": false,
    // ...
  },
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private

```json
{
  "error": "Record not found"
}
```

---

## Undo boost of a status {#unreblog}

```http
POST /api/v1/statuses/:id/unreblog HTTP/1.1
```

Undo a reshare of a status.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:statuses`\
**Version history:**\
0.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status unboosted or was already not boosted

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private

```json
{
  "error": "Record not found"
}
```

---

## Bookmark a status {#bookmark}

```http
POST /api/v1/statuses/:id/bookmark HTTP/1.1
```

Privately bookmark a status.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:bookmarks`\
**Version history:**\
3.1.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status bookmarked or was already bookmarked

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": true,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Undo bookmark of a status {#unbookmark}

```http
POST /api/v1/statuses/:id/unbookmark HTTP/1.1
```

Remove a status from your private bookmarks.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:bookmarks`\
**Version history:**\
3.1.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status was unbookmarked or was already not bookmarked

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

---

## Mute a conversation {#mute}

```http
POST /api/v1/statuses/:id/mute HTTP/1.1
```

Do not receive notifications for the thread that this status is part of. Must be a thread in which you are a participant.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:mutes`\
**Version history:**\
1.4.2 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status's conversation muted, or was already muted

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": true,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

---

## Unmute a conversation {#unmute}

```http
POST /api/v1/statuses/:id/unmute HTTP/1.1
```

Start receiving notifications again for the thread that this status is part of.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:mutes`\
**Version history:**\
1.4.2 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status's conversation unmuted, or was already unmuted

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

---

## Pin status to profile {#pin}

```http
POST /api/v1/statuses/:id/pin HTTP/1.1
```

Feature one of your own public statuses at the top of your profile.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:accounts`\
**Version history:**\
1.6.0 - added\
3.5.0 - you can now pin private posts

#### Request

##### Path parameters

:id
: {{<required>}} String. The local ID of the Status in the database. The status should be authored by the authorized account.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status pinned. Note the status is not a reblog and its authoring account is your own.

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": true,
  // ...
  "reblog": null,
  // ...
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    // ...
  },
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

Status is not owned by you:

```json
{
  "error": "Validation failed: Someone else's post cannot be pinned"
}
```

Prior to 3.5.0, you could not pin one of your private statuses because private statuses could not be fetched from remote sites, and must have been delivered. (3.5.0 added a mechanism to fetch statuses on behalf of an account.)

```json
{
  "error": "Validation failed: Non-public toot cannot be pinned"
}
```

---

## Unpin status from profile {#unpin}

```http
POST /api/v1/statuses/:id/unpin HTTP/1.1
```

Unfeature a status from the top of your profile.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:accounts`\
**Version history:**\
1.6.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The local ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Status unpinned, or was already not pinned

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
  "reblog": null,
  // ...
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    // ...
  },
  // ...
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

---

## Edit a status {#edit}

```http
PUT /api/v1/statuses/:id HTTP/1.1
```

Edit a given status to change its text, sensitivity, media attachments, or poll. Note that editing a poll's options will reset the votes.

**Returns:** [Status]({{< relref "entities/status" >}})\
**OAuth:** User token + `write:statuses`\
**Version history:**\
3.5.0 - added\
4.0.0 - add `language`

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Status in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

status
: String. The plain text content of the status.

spoiler_text
: String. The plain text subject or content warning of the status.

sensitive
: Boolean. Whether the status should be marked as sensitive.

language
: String. ISO 639 language code for the status.

media_ids[]
: Array of String. Include Attachment IDs to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used.

media_attributes[][]
: Array of String. Each array includes id, description, and focus.

poll[options][]
: Array of String. Possible answers to the poll. If provided, `media_ids` cannot be used, and `poll[expires_in]` must be provided.

poll[expires_in]
: Integer. Duration that the poll should be open, in seconds. If provided, `media_ids` cannot be used, and `poll[options]` must be provided.

poll[multiple]
: Boolean. Allow multiple choices? Defaults to false.

poll[hide_totals]
: Boolean. Hide vote counts until the poll ends? Defaults to false.

#### Response
##### 200: OK

Status has been successfully edited.

```json
{
  "id": "108942703571991143",
  "created_at": "2022-09-04T23:22:13.704Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/trwnh/statuses/108942703571991143",
  "url": "https://mastodon.social/@trwnh/108942703571991143",
  "replies_count": 3,
  "reblogs_count": 1,
  "favourites_count": 6,
  "edited_at": "2022-09-05T00:33:20.309Z",
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  "content": "<p>this is a status that has been edited multiple times to change the text, add a poll, and change poll options.</p>",
  "filtered": [],
  "reblog": null,
  "application": {
    "name": "SubwayTooter",
    "website": null
  },
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    // ...
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": null
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist, is private, or is not owned by you.

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Text can't be blank"
}
```

---

## View edit history of a status {#history}

```http
GET /api/v1/statuses/:id/history HTTP/1.1
```

Get all known versions of a status, including the initial and current states.

**Returns:** Array of [StatusEdit]({{< relref "entities/statusedit" >}})\
**OAuth:** Public for public statuses, user token + `read:statuses` for private statuses\
**Version history:**\
3.5.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The local ID of the Status in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
[
  {
    "content": "<p>this is a status that will be edited</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-04T23:22:13.704Z",
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  },
  {
    "content": "<p>this is a status that has been edited</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-04T23:22:42.555Z",
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  },
  {
    "content": "<p>this is a status that has been edited twice</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-04T23:22:55.956Z",
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  },
  {
    "content": "<p>this is a status that has been edited three times. this time a poll has been added.</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-05T00:01:48.160Z",
    "poll": {
      "options": [
        {
          "title": "cool"
        },
        {
          "title": "uncool"
        },
        {
          "title": "spiderman"
        }
      ]
    },
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  },
  {
    "content": "<p>this is a status that has been edited three times. this time a poll has been added.</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-05T00:03:32.480Z",
    "poll": {
      "options": [
        {
          "title": "cool"
        },
        {
          "title": "uncool"
        },
        {
          "title": "spiderman (this option has been changed)"
        }
      ]
    },
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  }
]
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

---

## View status source {#source}

```http
GET /api/v1/statuses/:id/source HTTP/1.1
```

Obtain the source properties for a status so that it can be edited.

**Returns:** [StatusSource]({{< relref "entities/statussource" >}})\
**OAuth:** App token + `read:statuses`\
**Version history:**\
3.5.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The local ID of the Status in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "id": "108942703571991143",
  "text": "this is a status that will be edited",
  "spoiler_text": ""
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

---

## (DEPRECATED) Fetch preview card {#card}

```http
GET /api/v1/statuses/:id/card HTTP/1.1
```

**Returns:** [PreviewCard]({{< relref "entities/PreviewCard" >}})\
**OAuth:** Public for public statuses, user token + `read:statuses` for private statuses\
**Version history:**\
0.0.0 - added\
2.6.0 - deprecated in favor of card property inlined on Status entity\
3.0.0 - removed

#### Request

##### Path parameters

:id
: {{<required>}} String. The local ID of the Status in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "url": "https://www.youtube.com/watch?v=OMv_EPMED8Y",
  "title": "♪ Brand New Friend (Christmas Song!)",
  "description": "",
  "type": "video",
  "author_name": "YOGSCAST Lewis & Simon",
  "author_url": "https://www.youtube.com/user/BlueXephos",
  "provider_name": "YouTube",
  "provider_url": "https://www.youtube.com/",
  "html": "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/OMv_EPMED8Y?feature=oembed\" frameborder=\"0\" allowfullscreen=\"\"></iframe>",
  "width": 480,
  "height": 270,
  "image": "https://files.mastodon.social/preview_cards/images/014/179/145/original/9cf4b7cf5567b569.jpeg",
  "embed_url": ""
}
```

##### 404: Not found

Status does not exist or is private.

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses_controller.rb" caption="app/controllers/api/v1/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/bookmarks_controller.rb" caption="app/controllers/api/v1/statuses/bookmarks_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/favourited_by_accounts_controller.rb" caption="app/controllers/api/v1/statuses/favourited_by_accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/favourites_controller.rb" caption="app/controllers/api/v1/statuses/favourites_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/histories_controller.rb" caption="app/controllers/api/v1/statuses/histories_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/mutes_controller.rb" caption="app/controllers/api/v1/statuses/mutes_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/pins_controller.rb" caption="app/controllers/api/v1/statuses/pins_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/reblogged_by_accounts_controller.rb" caption="app/controllers/api/v1/statuses/reblogged_by_accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/reblogs_controller.rb" caption="app/controllers/api/v1/statuses/reblogs_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/sources_controller.rb" caption="app/controllers/api/v1/statuses/sources_controller.rb" >}}

