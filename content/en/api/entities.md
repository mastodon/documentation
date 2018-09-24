---
title: Entities
menu:
  docs:
    parent: api
    weight: 3
---

- All IDs are encoded as strings
- All datetimes are in ISO8601 format
- All HTML strings are sanitized by the server
- All language codes are in ISO6391 format

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
| `value` | String |{{< no >}}|2.4.0|
| `verified_at` | String (Datetime) |{{< yes >}}|2.6.0|

## Application

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `name` | String |{{< no >}}||
| `website` | String (URL) |{{< yes >}}||

## Attachment

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` |  String |{{< no >}}||
| `type` | [String (Enum)](#type) |{{< no >}}||
| `url` | String (URL) |{{< no >}}||
| `remote_url` | String (URL) |{{< yes >}}||
| `preview_url` | String (URL) |{{< no >}}||
| `text_url` | String (URL) |{{< yes >}}||
| `meta` | [Hash](#meta) |{{< yes >}}||
| `description` | String |{{< yes >}}||

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
| `url` | String (URL) |{{< no >}}||
| `title` | String |{{< no >}}||
| `description` | String |{{< no >}}||
| `image` | String (URL) |{{< yes >}}||
| `type` | [String (Enum)](#type-1) |{{< no >}}||
| `author_name` | String |{{< yes >}}||
| `author_url` | String (URL) |{{< yes >}}||
| `provider_name` | String |{{< yes >}}||
| `provider_url` | String (URL) |{{< yes >}}||
| `html` | String (HTML) |{{< yes >}}||
| `width` | Number |{{< yes >}}||
| `height` | Number |{{< yes >}}||

### Type

- `link`
- `photo`
- `video`
- `rich`

## Context

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `ancestors` | Array of [Status](#status) |{{< no >}}||
| `descendants` | Array of [Status](#status) |{{< no >}}||

## Emoji

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `shortcode` | String |{{< no >}}||
| `static_url` | String (URL) |{{< no >}}||
| `url` | String (URL) |{{< no >}}||
| `visible_in_picker` | Boolean |{{< no >}}||

## Error

The most important part of an error response is the HTTP status code. Standard semantics are followed. The body of an error is a JSON object with this structure:

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `error` | String |{{< no >}}||

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
| `uri` | String |{{< no >}}||
| `title` | String |{{< no >}}||
| `description` | String |{{< no >}}||
| `email` | String |{{< no >}}||
| `version` | String |{{< no >}}||
| `urls` | [Hash](#urls) |{{< no >}}||
| `languages` | Array of String (ISO6391) |{{< no >}}||
| `contact_account` | [Account](#account) |{{< no >}}||

### URLs

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
|`streaming_api`| String (URL) |{{< no >}}||

## List

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}||
| `title` | String |{{< no >}}||

## Mention

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `url` | String (URL) |{{< no >}}||
| `username` | String |{{< no >}}||
| `acct` | String |{{< no >}}||
| `id` | String |{{< no >}}||

## Notification

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}|
| `type` | [String (Enum)](#type-2) |{{< no >}}|
| `created_at` | String (Datetime) |{{< no >}}|
| `account` | [Account](#account) |{{< no >}}|
| `status` | [Status](#status) |{{< yes >}}|

### Type

- `follow`
- `mention`
- `reblog`
- `favourite`

## Push subscription

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}||
| `endpoint` | String (URL) |{{< no >}}||
| `server_key` | String |{{< no >}}||
| `alerts` | [Hash](#alerts) |{{< no >}}||

### Alerts

???

## Relationship

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}||
| `following` | Boolean |{{< no >}}||
| `followed_by` | Boolean |{{< no >}}||
| `blocking` | Boolean |{{< no >}}||
| `muting` | Boolean |{{< no >}}||
| `muting_notifications` | Boolean |{{< no >}}||
| `requested` | Boolean |{{< no >}}||
| `domain_blocking` | Boolean |{{< no >}}||
| `showing_reblogs` | Boolean |{{< no >}}||
| `endorsed` | Boolean |{{< no >}}|2.5.0|

## Results

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `accounts` | Array of [Account](#account) |{{< no >}}||
| `statuses` | Array of [Status](#status)  |{{< no >}}||
| `hashtags` | Array of String |{{< no >}}||

> **Note:** The v2 API returns an array of [Tag](#tag) for the `hashtags` attribute.

## Status

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `id` | String |{{< no >}}||
| `uri` | String |{{< no >}}||
| `url` | String (URL) |{{< yes >}}||
| `account` | [Account](#account) |{{< no >}}||
| `in_reply_to_id` | String |{{< yes >}}||
| `in_reply_to_account_id` | String |{{< yes >}}||
| `reblog` | [Status](#status) |{{< yes >}}||
| `content` | String (HTML) |{{< no >}}||
| `created_at` | String (Datetime) |{{< no >}}||
| `emojis` | Array of [Emoji](#emoji) |{{< no >}}||
| `replies_count` | Number |{{< no >}}||
| `reblogs_count` | Number |{{< no >}}||
| `favourites_count` | Number |{{< no >}}||
| `reblogged` | Boolean |{{< yes >}}||
| `favourited` | Boolean |{{< yes >}}||
| `muted` | Boolean |{{< yes >}}||
| `sensitive` | Boolean |{{< no >}}||
| `spoiler_text` | String |{{< no >}}||
| `visibility` | [String (Enum)](#visibility) |{{< no >}}||
| `media_attachments` | Array of [Attachment](#attachment) |{{< no >}}||
| `mentions` | Array of [Mention](#mention) |{{< no >}}||
| `tags` | Array of [Tag](#tag) |{{< no >}}||
| `application` | [Application](#application) |{{< no >}}||
| `language` | String (ISO6391) |{{< yes >}}||
| `pinned` | Boolean |{{< yes >}}||

### Visibility

- `public`
- `unlisted`
- `private`
- `direct`

## Tag

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `name` | String |{{< no >}}||
| `url` | String (URL) |{{< no >}}||
| `history` | Array of [History](#history) |{{< yes >}}|2.4.1|

### History

|Attribute|Type|Nullable|Added in|
|---------|-----------|:------:|:------:|
| `day` | String (UNIX timestamp) |{{< no >}}|2.4.1|
| `uses` | Number |{{< no >}}|2.4.1|
| `accounts` | Number |{{< no >}}|2.4.1|
