---
title: Status
description: Represents a status posted by an account.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/mention",
  "/entities/Mention",
  "/entities/status",
  "/entities/Status",
  "/api/entities/mention",
  "/api/entities/Mention",
  "/api/entities/status",
  "/api/entities/Status",
]
---

## Example

```json
{
  "id": "103270115826048975",
  "created_at": "2019-12-08T03:48:33.901Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/Gargron/statuses/103270115826048975",
  "url": "https://mastodon.social/@Gargron/103270115826048975",
  "replies_count": 5,
  "reblogs_count": 6,
  "favourites_count": 11,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "content": "<p>&quot;I lost my inheritance with one wrong digit on my sort code&quot;</p><p><a href=\"https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">theguardian.com/money/2019/dec</span><span class=\"invisible\">/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code</span}</p>",
  "reblog": null,
  "application": {
    "name": "Web",
    "website": null
  },
  "account": {
    "id": "1",
    "username": "Gargron",
    "acct": "Gargron",
    "display_name": "Eugen",
    "locked": false,
    "bot": false,
    "discoverable": true,
    "group": false,
    "created_at": "2016-03-16T14:34:26.392Z",
    "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
    "url": "https://mastodon.social/@Gargron",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "followers_count": 322930,
    "following_count": 459,
    "statuses_count": 61323,
    "last_status_at": "2019-12-10T08:14:44.811Z",
    "emojis": [],
    "fields": [
      {
        "name": "Patreon",
        "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span}",
        "verified_at": null
      },
      {
        "name": "Homepage",
        "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span}",
        "verified_at": "2019-07-15T18:29:57.191+00:00"
      }
    ]
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": {
    "url": "https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code",
    "title": "‘I lost my £193,000 inheritance – with one wrong digit on my sort code’",
    "description": "When Peter Teich’s money went to another Barclays customer, the bank offered £25 as a token gesture",
    "type": "link",
    "author_name": "",
    "author_url": "",
    "provider_name": "",
    "provider_url": "",
    "html": "",
    "width": 0,
    "height": 0,
    "image": null,
    "embed_url": ""
  },
  "poll": null
}
```

## Attributes

### `id` {#id}

**Description:** ID of the status in the database.\
**Type:** String (cast from an integer but not guaranteed to be a number)\
**Version history:**\
0.1.0 - added

### `uri` {#uri}

**Description:** URI of the status used for federation.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `created_at` {#created_at}

**Description:** The date when this status was created.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
0.1.0 - added

### `account` {#account}

**Description:** The account that authored this status.\
**Type:** [Account]({{< relref "entities/Account" >}})\
**Version history:**\
0.1.0 - added

### `content` {#content}

**Description:** HTML-encoded status content.\
**Type:** String (HTML)\
**Version history:**\
0.1.0 - added

### `visibility` {#visibility}

**Description:** Visibility of this status.\
**Type:** String (Enumerable oneOf)\
`public` = Visible to everyone, shown in public timelines.\
`unlisted` = Visible to public, but not included in public timelines.\
`private` = Visible to followers only, and to any mentioned users.\
`direct` = Visible only to mentioned users.\
**Version history:**\
0.9.9 - added

### `sensitive` {#sensitive}

**Description:** Is this status marked as sensitive content?\
**Type:** Boolean\
**Version history:**\
0.9.9 - added

### `spoiler_text` {#spoiler_text}

**Description:** Subject or summary line, below which status content is collapsed until expanded.\
**Type:** String\
**Version history:**\
1.0.0 - added

### `media_attachments` {#media_attachments}

**Description:** Media that is attached to this status.\
**Type:** Array of [MediaAttachment]({{< relref "entities/MediaAttachment" >}})\
**Version history:**\
0.6.0 - added

### `application` {{%optional%}} {#application}

**Description:** The application used to post this status.\
**Type:** Hash\
**Version history:**\
0.9.9 - added

#### `application[name]` {#application-name}

**Description:** The name of the application that posted this status.\
**Type:** String\
**Version history:**\
0.9.9 - added

#### `application[website]` {#application-website}

**Description:** The website associated with the application that posted this status.\
**Type:** {{<nullable>}} String (URL) or null\
**Version history:**\
0.9.9 - added\
3.5.1 - this property is now nullable

### `mentions` {#mentions}

**Description:** Mentions of users within the status content.\
**Type:** Array of [Status::Mention](#Mention)\
**Version history:**\
0.6.0 - added

### `tags` {#tags}

**Description:** Hashtags used within the status content.\
**Type:** Array of [Status::Tag](#Tag)\
**Version history:**\
0.6.0 - added

### `emojis` {#emojis}

**Description:** Custom emoji to be used when rendering status content.\
**Type:** Array of [CustomEmoji]({{< relref "entities/CustomEmoji" >}})\
**Version history:**\
2.0.0 - added

### `reblogs_count` {#reblogs_count}

**Description:** How many boosts this status has received.\
**Type:** Integer\
**Version history:**\
0.1.0 - added

### `favourites_count` {#favorites_count}

**Description:** How many favourites this status has received.\
**Type:** Integer\
**Version history:**\
0.1.0 - added

### `replies_count` {#replies_count}

**Description:** How many replies this status has received.\
**Type:** Integer\
**Version history:**\
2.5.0 - added

### `url` {#url}

**Description:** A link to the status's HTML representation.\
**Type:** {{<nullable>}} String (URL) or null\
**Version history:**\
0.1.0 - added

### `in_reply_to_id` {#in_reply_to_id}

**Description:** ID of the status being replied to.\
**Type:** {{<nullable>}} String (cast from an integer but not guaranteed to be a number) or null\
**Version history:**\
0.1.0 - added

### `in_reply_to_account_id` {#in_reply_to_account_id}

**Description:** ID of the account that authored the status being replied to.\
**Type:** {{<nullable>}} String (cast from an integer but not guaranteed to be a number) or null\
**Version history:**\
0.1.0 - added

### `reblog` {#reblog}

**Description:** The status being reblogged.\
**Type:** {{<nullable>}} [Status]({{< relref "entities/status" >}}) or null\
**Version history:**\
0.1.0 - added

### `poll` {#poll}

**Description:** The poll attached to the status.\
**Type:** {{<nullable>}} [Poll]({{< relref "entities/Poll" >}}) or null\
**Version history:**\
2.8.0 - added

### `card` {#card}

**Description:** Preview card for links included within status content.\
**Type:** {{<nullable>}} [PreviewCard]({{< relref "entities/PreviewCard" >}}) or null\
**Version history:**\
2.6.0 - added

### `language` {#language}

**Description:** Primary language of this status.\
**Type:** {{<nullable>}} String (ISO 639 Part 1 two-letter language code) or null\
**Version history:**\
1.4.0 - added

### `text` {#text}

**Description:** Plain-text source of a status. Returned instead of `content` when status is deleted, so the user may redraft from the source text without the client having to reverse-engineer the original text from the HTML content.\
**Type:** {{<nullable>}} String or null\
**Version history:**\
2.9.0 - added

### `edited_at` {#edited_at}

**Description:** Timestamp of when the status was last edited.\
**Type:** {{<nullable>}} String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
3.5.0 - added

### `favourited` {{%optional%}} {#favourited}

**Description:** If the current token has an authorized user: Have you favourited this status?\
**Type:** Boolean\
**Version history:**\
0.1.0 - added

### `reblogged` {{%optional%}} {#reblogged}

**Description:** If the current token has an authorized user: Have you boosted this status?\
**Type:** Boolean\
**Version history:**\
0.1.0 - added

### `muted` {{%optional%}} {#muted}

**Description:** If the current token has an authorized user: Have you muted notifications for this status's conversation?\
**Type:** Boolean\
**Version history:**\
1.4.0 - added

### `bookmarked` {{%optional%}} {#bookmarked}

**Description:** If the current token has an authorized user: Have you bookmarked this status?\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `pinned` {{%optional%}} {#pinned}

**Description:** If the current token has an authorized user: Have you pinned this status? Only appears if the status is pinnable.\
**Type:** Boolean\
**Version history:**\
1.6.0 - added

### `filtered` {{%optional%}} {#filtered}

**Description:** If the current token has an authorized user: The filter and keywords that matched this status.\
**Type:** Array of [FilterResult]({{< relref "entities/FilterResult" >}})\
**Version history:**\
4.0.0 - added

## Status::Mention attributes {#Mention}

### `id` {#Mention-id}

**Description:** The account ID of the mentioned user.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
0.6.0 - added

### `username` {#Mention-username}

**Description:** The username of the mentioned user.\
**Type:** String\
**Version history:**\
0.6.0 - added

### `url` {#Mention-url}

**Description:** The location of the mentioned user's profile.\
**Type:** String (URL)\
**Version history:**\
0.6.0 - added

### `acct` {#Mention-acct}

**Description:** The webfinger acct: URI of the mentioned user. Equivalent to `username` for local users, or `username@domain` for remote users.\
**Type:** String\
**Version history:**\
0.6.0 - added

## Status::Tag attributes {#Tag}

### `name` {#Tag-name}

**Description:** The value of the hashtag after the # sign.\
**Type:** String\
**Version history:**\
0.9.0 - added

### `url` {#Tag-url}

**Description:** A link to the hashtag on the instance.\
**Type:** String (URL)\
**Version history:**\
0.9.0 - added

## See also

{{< page-relref ref="methods/accounts#statuses" caption="GET /api/v1/accounts/:id/statuses" >}}

{{< page-relref ref="methods/search#v2" caption="POST /api/v2/search/" >}}

{{< page-relref ref="methods/statuses" caption="statuses methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/status_serializer.rb" caption="app/serializers/rest/status_serializer.rb" >}}
