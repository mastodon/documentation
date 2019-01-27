---
title: Entities
description: Overview of entities returned from Mastodon's REST API
menu:
  docs:
    parent: api
    weight: 3
---

- All IDs are encoded as string representations of integers.
    - IDs can be sorted first by size, and then lexically, to produce a chronological ordering of resources.
- All datetimes are in ISO 8601 format
- All HTML strings are sanitized by the server
- All language codes are in ISO 6391 format

## Account

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|0.1.0|
| `username` | String |{{< no >}}|0.1.0|
| `acct` | String |{{< no >}}|0.1.0|
| `display_name` | String |{{< no >}}|0.1.0|
| `locked` | Boolean |{{< no >}}|0.1.0|
| `created_at` | String (Datetime) |{{< no >}}|0.1.0|
| `followers_count` | Number |{{< no >}}|0.1.0|
| `following_count` | Number |{{< no >}}|0.1.0|
| `statuses_count` | Number |{{< no >}}|0.1.0|
| `note` | String |{{< no >}}|0.1.0|
| `url` | String (URL) |{{< no >}}|0.1.0|
| `avatar` | String (URL) |{{< no >}}|0.1.0|
| `avatar_static` | String (URL) |{{< no >}}|1.1.2|
| `header` | String (URL) |{{< no >}}|0.1.0|
| `header_static` | String (URL) |{{< no >}}|1.1.2|
| `emojis` | Array of [Emoji](#emoji) |{{< no >}}|2.4.0|
| `moved` | [Account](#account) |{{< yes >}}|2.1.0|
| `fields` | Array of [Hash](#field) |{{< yes >}}|2.4.0|
| `bot` | Boolean |{{< yes >}}|2.4.0|

### Field

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `name` | String |{{< no >}}|2.4.0|
| `value` | String (HTML) |{{< no >}}|2.4.0|
| `verified_at` | String (Datetime) |{{< yes >}}|2.6.0|

### Source

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `privacy` | String |{{< yes >}}|1.5.0|
| `sensitive` | Boolean |{{< yes >}}|1.5.0|
| `language` | String (ISO6391) |{{< yes >}}|2.4.2|
| `note` | String |{{< no >}}|1.5.0|
| `fields` | Array of Hash |{{< no >}}|2.4.0|

### Token

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `access_token` | String |{{< no >}}|0.1.0|
| `token_type` | String |{{< no >}}|0.1.0|
| `scope` | String |{{< no >}}|0.1.0|
| `created_at` | Number |{{< no >}}|0.1.0|

## Application

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `name` | String |{{< no >}}|0.9.9|
| `website` | String (URL) |{{< yes >}}|0.9.9|

## Attachment

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` |  String |{{< no >}}|0.6.0|
| `type` | [String (Enum)](#type) |{{< no >}}|0.6.0|
| `url` | String (URL) |{{< no >}}|0.6.0|
| `remote_url` | String (URL) |{{< yes >}}|0.6.0|
| `preview_url` | String (URL) |{{< no >}}|0.6.0|
| `text_url` | String (URL) |{{< yes >}}|0.6.0|
| `meta` | [Hash](#meta) |{{< yes >}}|1.5.0|
| `description` | String |{{< yes >}}|2.0.0|

### Type

- `unknown`
- `image`
- `gifv`
- `video`

### Meta

May contain subtrees `small` and `original`.

Images may contain `width`, `height`, `size`, `aspect`, while videos (including GIFV) may contain `width`, `height`, `frame_rate`, `duration` and `bitrate`.

There may be another top-level object, `focus` with the coordinates `x` and `y`. These coordinates can be used for smart thumbnail cropping, [see this for reference](https://github.com/jonom/jquery-focuspoint#1-calculate-your-images-focus-point).

## Card

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `url` | String (URL) |{{< no >}}|1.0.0|
| `title` | String |{{< no >}}|1.0.0|
| `description` | String |{{< no >}}|1.0.0|
| `image` | String (URL) |{{< yes >}}|1.0.0|
| `type` | [String (Enum)](#type-1) |{{< no >}}|1.3.0|
| `author_name` | String |{{< yes >}}|1.3.0|
| `author_url` | String (URL) |{{< yes >}}|1.3.0|
| `provider_name` | String |{{< yes >}}|1.3.0|
| `provider_url` | String (URL) |{{< yes >}}|1.3.0|
| `html` | String (HTML) |{{< yes >}}|1.3.0|
| `width` | Number |{{< yes >}}|1.3.0|
| `height` | Number |{{< yes >}}|1.3.0|

### Type

- `link`
- `photo`
- `video`
- `rich`

## Context

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `ancestors` | Array of [Status](#status) |{{< no >}}|0.6.0|
| `descendants` | Array of [Status](#status) |{{< no >}}|0.6.0|

## Emoji

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `shortcode` | String |{{< no >}}|2.0.0|
| `static_url` | String (URL) |{{< no >}}|2.0.0|
| `url` | String (URL) |{{< no >}}|2.0.0|
| `visible_in_picker` | Boolean |{{< no >}}|2.1.0|

## Error

The most important part of an error response is the HTTP status code. Standard semantics are followed. The body of an error is a JSON object with this structure:

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `error` | String |{{< no >}}|0.6.0|

## Filter

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|2.4.3|
| `phrase` | String |{{< no >}}|2.4.3|
| `context` | Array of [String (Enum)](#context) |{{< no >}}|2.4.3|
| `expires_at` | String (Datetime) |{{< yes >}}|2.4.3|
| `irreversible` | Boolean |{{< no >}}|2.4.3|
| `whole_word` | Boolean |{{< no >}}|2.4.3|

### Context

- `home`
- `notifications`
- `public`
- `thread`

### Implementation notes

If `whole_word` is true , client app should do:

- Define 'word constituent character' for your app. In the official implementation, it's `[A-Za-z0-9_]` in JavaScript, and `[[:word:]]` in Ruby. In Ruby case it's the POSIX character class (Letter | Mark | Decimal_Number | Connector_Punctuation).
- If the phrase starts with a word character, and if the previous character before matched range is a word character, its matched range should be treated to not match.
- If the phrase ends with a word character, and if the next character after matched range is a word character, its matched range should be treated to not match.

Please check `app/javascript/mastodon/selectors/index.js` and `app/lib/feed_manager.rb` in the Mastodon source code for more details.

## Instance

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `uri` | String |{{< no >}}|1.1.0|
| `title` | String |{{< no >}}|1.1.0|
| `description` | String |{{< no >}}|1.1.0|
| `email` | String |{{< no >}}|1.1.0|
| `version` | String |{{< no >}}|1.3.0|#
| `thumbnail` | String (URL) |{{< yes >}}|1.6.1|
| `urls` | [Hash](#urls) |{{< no >}}|1.4.2|
| `stats` | [Hash](#stats) |{{< no >}}|1.6.0|
| `languages` | Array of String (ISO6391) |{{< no >}}|2.3.0|
| `contact_account` | [Account](#account) |{{< yes >}}|2.3.0|

### URLs

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
|`streaming_api`| String (URL) |{{< no >}}|1.4.2|

### Stats

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
|`user_count`| Number |{{< no >}}|1.6.0|
|`status_count`| Number |{{< no >}}|1.6.0|
|`domain_count`| Number |{{< no >}}|1.6.0|

## List

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|2.1.0|
| `title` | String |{{< no >}}|2.1.0|

## Mention

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `url` | String (URL) |{{< no >}}|0.6.0|
| `username` | String |{{< no >}}|0.6.0|
| `acct` | String |{{< no >}}|0.6.0|
| `id` | String |{{< no >}}|0.6.0|

## Notification

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|0.9.9|
| `type` | [String (Enum)](#type-2) |{{< no >}}|0.9.9|
| `created_at` | String (Datetime) |{{< no >}}|0.9.9|
| `account` | [Account](#account) |{{< no >}}|0.9.9|
| `status` | [Status](#status) |{{< yes >}}|0.9.9|

### Type

- `follow`
- `mention`
- `reblog`
- `favourite`

## Push subscription

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|2.4.0|
| `endpoint` | String (URL) |{{< no >}}|2.4.0|
| `server_key` | String |{{< no >}}|2.4.0|
| `alerts` | [Hash](#alerts) |{{< no >}}|2.4.0|

### Alerts

???

## Relationship

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|0.6.0|
| `following` | Boolean |{{< no >}}|0.6.0|
| `followed_by` | Boolean |{{< no >}}|0.6.0|
| `blocking` | Boolean |{{< no >}}|0.6.0|
| `muting` | Boolean |{{< no >}}|1.1.0|
| `muting_notifications` | Boolean |{{< no >}}|2.1.0|
| `requested` | Boolean |{{< no >}}|0.9.9|
| `domain_blocking` | Boolean |{{< no >}}|1.4.0|
| `showing_reblogs` | Boolean |{{< no >}}|2.1.0|
| `endorsed` | Boolean |{{< no >}}|2.5.0|

## Results

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `accounts` | Array of [Account](#account) |{{< no >}}|1.1.0|
| `statuses` | Array of [Status](#status)  |{{< no >}}|1.1.0|
| `hashtags` | Array of [Tag](#tag) |{{< no >}}|1.1.0|

## Status

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|0.1.0|
| `uri` | String |{{< no >}}|0.1.0|
| `url` | String (URL) |{{< yes >}}|0.1.0|
| `account` | [Account](#account) |{{< no >}}|0.1.0|
| `in_reply_to_id` | String |{{< yes >}}|0.1.0|
| `in_reply_to_account_id` | String |{{< yes >}}|1.0.0|
| `reblog` | [Status](#status) |{{< yes >}}|0.1.0|
| `content` | String (HTML) |{{< no >}}|0.1.0|
| `created_at` | String (Datetime) |{{< no >}}|0.1.0|
| `emojis` | Array of [Emoji](#emoji) |{{< no >}}|2.0.0|
| `replies_count` | Number |{{< no >}}|2.5.0|
| `reblogs_count` | Number |{{< no >}}|0.1.0|
| `favourites_count` | Number |{{< no >}}|0.1.0|
| `reblogged` | Boolean |{{< yes >}}|0.1.0|
| `favourited` | Boolean |{{< yes >}}|0.1.0|
| `muted` | Boolean |{{< yes >}}|1.4.0|
| `sensitive` | Boolean |{{< no >}}|0.9.9|
| `spoiler_text` | String |{{< no >}}|1.0.0|
| `visibility` | [String (Enum)](#visibility) |{{< no >}}|0.9.9|
| `media_attachments` | Array of [Attachment](#attachment) |{{< no >}}|0.6.0|
| `mentions` | Array of [Mention](#mention) |{{< no >}}|0.6.0|
| `tags` | Array of [Tag](#tag) |{{< no >}}|0.9.0|
| `card` | [Card](#card) |{{< yes >}}|2.6.0|
| `application` | [Application](#application) |{{< no >}}|0.9.9|
| `language` | String (ISO6391) |{{< yes >}}|1.4.0|
| `pinned` | Boolean |{{< yes >}}|1.6.0|

### Visibility

- `public`
- `unlisted`
- `private`
- `direct`

## ScheduledStatus

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|2.7.0|
| `scheduled_at` | String (Datetime) |{{< no >}}|2.7.0|
| `params` | Array of [Hash](#statusparams) |{{< no >}}|2.7.0|
| `media_attachments` | Array of [Attachment](#attachment) |{{< no >}}|2.7.0|

### StatusParams

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `text` | String |{{< no >}}|2.7.0|
| `in_reply_to_id` | String |{{< yes >}}|2.7.0|
| `media_ids` | Array of String |{{< yes >}}|2.7.0|
| `sensitive` | Boolean |{{< yes >}}|2.7.0|
| `spoiler_text` | String |{{< yes >}}|2.7.0|
| `visibility` | [String (Enum)](#visibility) |{{< no >}}|2.7.0|
| `scheduled_at` | String (Datetime) |{{< yes >}}|2.7.0|
| `application_id` | String |{{< no >}}|2.7.0|

## Tag

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `name` | String |{{< no >}}|0.9.0|
| `url` | String (URL) |{{< no >}}|0.9.0|
| `history` | Array of [History](#history) |{{< yes >}}|2.4.1|

### History

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `day` | String (UNIX timestamp) |{{< no >}}|2.4.1|
| `uses` | Number |{{< no >}}|2.4.1|
| `accounts` | Number |{{< no >}}|2.4.1|

### Conversation

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String  |{{< no >}}|2.6.0|
| `accounts` | Array of [Account](#account) |{{< no >}}|2.6.0|
| `last_status` | [Status](#status) |{{< yes >}}|2.6.0|
| `unread` | Boolean |{{< no >}}|2.6.0|
