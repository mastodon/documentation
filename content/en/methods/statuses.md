---
title: statuses
description: 'Publish, interact, and view information about statuses.'
menu:
  docs:
    weight: 30
    parent: methods
    identifier: methods-statuses
---

{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses" title="Publish new status" >}}
{{< api-method-description >}}

Post a new status.

**Returns:** Status. When `scheduled_at` is present, ScheduledStatus is returned instead.\
**OAuth:** User + `write:statuses`\
**Version history:**\
0.0.0 - added\
2.7.0 - `scheduled_at` added\
2.8.0 - `poll` added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Idempotency-Key" type="string" required=false >}}
Prevent duplicate submissions of the same status. Idempotency keys are stored for up to 1 hour, and can be any arbitrary string. Consider using a hash or UUID generated client-side.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="status" type="string" required=true >}}
Text content of the status. If `media_ids` is provided, this becomes optional. Attaching a `poll` is optional while `status` is provided.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="media_ids\[\]" type="array" required=true >}}
Array of Attachment ids to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="poll\[options\]\[\]" type="array" required=true >}}
Array of possible answers. If provided, `media_ids` cannot be used, and `poll[expires_in]` must be provided.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="poll\[expires_in\]" type="number" required=true >}}
Duration the poll should be open, in seconds. If provided, `media_ids` cannot be used, and `poll[options]` must be provided.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="poll\[multiple\]" type="boolean" required=false >}}
Allow multiple choices?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="poll\[hide_totals\]" type="boolean" required=false >}}
Hide vote counts until the poll ends?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="in_reply_to_id" type="string" required=false >}}
ID of the status being replied to, if status is a reply
{{< endapi-method-parameter >}}
{{< api-method-parameter name="sensitive" type="boolean" required=false >}}
Mark status and attached media as sensitive?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="spoiler_text" type="string" required=false >}}
Text to be shown as a warning or subject before the actual content. Statuses are generally collapsed behind this field.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="visibility" type="string" required=false >}}
Visibility of the posted status. Enumerable oneOf public, unlisted, private, direct.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="scheduled_at" type="string" required=false >}}
ISO 8601 Datetime at which to schedule a status. Providing this paramter will cause ScheduledStatus to be returned instead of Status. Must be at least 5 minutes in the future.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="language" type="string" required=false >}}
ISO 639 language code for this status.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status will be posted with chosen parameters. If scheduled_at is provided, then a ScheduledStatus will be returned instead.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="status" >}}
```javascript
{
  "id": "103254962155278888",
  "created_at": "2019-12-05T11:34:47.196Z",
  ...
  "content": "<p>test content</p>",
  ...
  "application": {
    "name": "test app",
    "website": null
  },
  ...
}
```
{{< endtab >}}

{{< tab title="scheduled_at ScheduledStatus" >}}
```javascript
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
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/statuses/:id" title="View specific status" >}}
{{< api-method-description >}}

View information about a status.

**Returns:** Status\
**OAuth:** Public for public statuses, user token + `read:statuses` for private statuses\
**Version history:**\
0.0.0 - added\
2.7.0 - public statuses no longer require token

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=false >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

instance is in whitelist mode
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "This API requires an authenticated user"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/statuses/:id" title="Delete status" >}}
{{< api-method-description >}}

Delete one of your own statuses.

**Returns:** Status with source `text` and `media_attachments` or `poll`\
**OAuth:** User token + `write:statuses`\
**Version history:**\
0.0.0 - added\
2.9.0 - return source properties, for use with delete and redraft

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database. Must be owned by authenticated account.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Note the special properties `text` and `media_attachments` or `poll` which may be used to repost the status, e.g. in case of delete-and-redraft functionality. With POST /api/v1/statuses, use `text` as the value for `status` parameter, `media_attachments[n]["id"]` for the `media_ids` array parameter, and `poll` properties with the corresponding parameters \(e.g. `poll[multiple]` and `poll[options]`, with a new `poll[expires_in]` and `poll[hide_totals]` per user input.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="with media" >}}
```javascript
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
    ...
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
{{< endtab >}}

{{< tab title="with poll" >}}
```javascript
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
    ...
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
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status already deleted, does not exist, or is not owned by you
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/statuses/:id/context" title="Parent and child statuses" >}}
{{< api-method-description >}}

View statuses above and below this status in the thread.

**Returns:** Context\
**OAuth:** Public for public statuses. User token + `read:statuses` for private statuses.\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=false >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "ancestors": [
    {
      "id": "103188938570975982",
      "created_at": "2019-11-23T19:44:00.124Z",
      "in_reply_to_id": null,
      "in_reply_to_account_id": null,
      ...
    },
    {
      "id": "103188971072973252",
      "created_at": "2019-11-23T19:52:23.398Z",
      "in_reply_to_id": "103188938570975982",
      "in_reply_to_account_id": "634458",
      ...
    },
    {
      "id": "103188982235527758",
      "created_at": "2019-11-23T19:55:08.208Z",
      "in_reply_to_id": "103188971072973252",
      "in_reply_to_account_id": "14715",
      ...
    }
  ],
  "descendants": [
    {
      "id": "103189026958574542",
      "created_at": "2019-11-23T20:06:36.011Z",
      "in_reply_to_id": "103189005915505698",
      "in_reply_to_account_id": "634458",
      ...
    }
  ]
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/statuses/:id/reblogged_by" title="Boosted by" >}}
{{< api-method-description >}}

View who boosted a given status.

**Returns:** Array of Account\
**OAuth:** Public
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "711345",
    "username": "Norman_Doors",
    "acct": "Norman_Doors@witches.live",
    ...
  },
  ...
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/statuses/:id/favourited_by" title="Favourited by" >}}
{{< api-method-description >}}

View who favourited a given status.

**Returns:** Array of Account\
**OAuth:** Public\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "828600",
    "username": "fructose_dealer",
    "acct": "fructose_dealer@radical.town",
    ...
  },
  ...
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/favourite" title="Favourite" >}}
{{< api-method-description >}}

Add a status to your favourites list.

**Returns:** Status\
**OAuth:** User token + `write:favourites`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status favourited or was already favourited
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": true,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/unfavourite" title="Undo favourite" >}}
{{< api-method-description >}}

Remove a status from your favourites list.

**Returns:** Status\
**OAuth:** User token + `write:favourites`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status unfavourited or was already not favourited
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/reblog" title="Boost" >}}
{{< api-method-description >}}

Reshare a status.

**Returns:** Status\
**OAuth:** User token + `write:statuses`\
**Version history:**\
0.0.0 - added\
2.8.0 - add `visibility` parameter

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="visibility" type="string" required=false >}}
any visibility except limited or direct \(i.e. public, unlisted, private\). Defaults to public. Currently unused in UI.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status has been reblogged. Note that the top-level id has changed. The id of the boosted status is now inside the `reblog` property. The top-level id is the id of the reblog itself. Also note that reblogs cannot be pinned.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "103254401326800919",
  "created_at": "2019-12-05T09:12:09.625Z",
  ...
  "favourited": false,
  "reblogged": true,
  "muted": false,
  "bookmarked": false,
  ...
  "reblog": {
    "id": "99734435964706331",
    "created_at": "2018-03-23T17:38:40.700Z",
    ...
    "favourited": false,
    "reblogged": true,
    "muted": false,
    "bookmarked": false,
    "pinned": false,
    ...
  },
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/unreblog" title="Undo boost" >}}
{{< api-method-description >}}

Undo a reshare of a status.

**Returns:** Status\
**OAuth:** User token + `write:statuses`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status no longer reblogged
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status deleted, does not exist, or no reblog exists
{{< endapi-method-response-example-description >}}


```javascript
{
 "error":  "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/bookmark" title="Bookmark" >}}
{{< api-method-description >}}

Privately bookmark a status.

**Returns:** Status\
**OAuth:** User token + `write:bookmarks`\
**Version history:**\
3.1.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the status in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status bookmarked
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": true,
  "pinned": false,
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/unbookmark" title="Undo bookmark" >}}
{{< api-method-description >}}

Remove a status from your private bookmarks.

**Returns:** Status\
**OAuth:** User token + `write:bookmarks`\
**Version history:**\
3.1.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name="id" type="string" required=true >}}
ID of the status in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, is private, or was already not bookmarked
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/mute" title="Mute conversation" >}}
{{< api-method-description >}}

Do not receive notifications for the thread that this status is part of. Must be a thread in which you are a participant.

**Returns:** Status\
**OAuth:** User token + `write:mutes`\
**Version history:**\
1.4.2 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status's conversation muted, or was already muted
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": false,
  "reblogged": false,
  "muted": true,
  "bookmarked": false,
  "pinned": false,
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/unmute" title="Unmute conversation" >}}
{{< api-method-description >}}

Start receiving notifications again for the thread that this status is part of.

**Returns:** Status\
**OAuth:** User token + `write:mutes`\
**Version history:**\
1.4.2 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status's conversation unmuted, or was already unmuted
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/pin" title="Pin to profile" >}}
{{< api-method-description >}}

Feature one of your own public statuses at the top of your profile.

**Returns:** Status\
**OAuth:** User token + `write:accounts`\
**Version history:**\
1.6.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database. The status should be public and authored by the authorized account.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status pinned. Note the status is not a reblog and its authoring account is your own.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": true,
  ...
  "reblog": null,
  ...
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    ...
  },
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or you are not authorized to see it.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

Status is not owned by you, or is not public. You cannot pin one of your private statuses because private statuses cannot be fetched from remote sites, and must be delivered.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="Not yours" >}}
```javascript
{
  "error": "Validation failed: Someone else's toot cannot be pinned"
}
```
{{< endtab >}}

{{< tab title="Private" >}}
```javascript
{
  "error": "Validation failed: Non-public toot cannot be pinned"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/statuses/:id/unpin" title="Unpin to profile" >}}
{{< api-method-description >}}

Unfeature a status from the top of your profile.

**Returns:** Status\
**OAuth:** User token + `write:accounts`\
**Version history:**\
1.6.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of a status in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Status unpinned, or was already not pinned
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  ...
  "reblog": null,
  ...
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    ...
  },
  ...
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


## Deprecated methods

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/statuses/:id/card" title="Preview card" >}}
{{< api-method-description >}}

**Returns:** Card\
**OAuth:** Public\
**Version history:**\
0.0.0 - added\
2.6.0 - deprecated in favor of card property inlined on Status entity\
3.0.0 - removed

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the status in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status does not exist, is deleted, or is private
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


