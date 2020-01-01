---
title: Status
description: Represents a status posted by an account.
menu:
  docs:
    parent: entities
---

## Example

```javascript
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
  "content": "<p>&quot;I lost my inheritance with one wrong digit on my sort code&quot;</p><p><a href=\"https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">theguardian.com/money/2019/dec</span><span class=\"invisible\">/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code</span></a></p>",
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

## Base attributes

### `id`

**Description:** ID of the status in the database.
**Type:** String \(cast from an integer but not guaranteed to be a number\)
**Version history:** Added in 0.1.0

### `uri`

**Description:** URI of the status used for federation.
**Type:** String
**Version history:** Added in 0.1.0

### `created_at`

**Description:** HTML-encoded status content.
**Type:** String \(ISO 8601 Datetime\)
**Version history:** Added in 0.1.0

### `account`

**Description:** The account that authored this status.
**Type:** [Account](account.md)
**Version history:** Added in 0.1.0

### `content`

**Description:** HTML-encoded status content.
**Type:** String \(HTML\)
**Version history:** Added in 0.1.0

### `text`

**Description:** Plain-text source of a status. Returned instead of `content` when status is deleted, so the user may redraft from the source text without the client having to reverse-engineer the original text from the HTML content.
**Type:** String
**Version history:** Added in 2.9.0

### `visibility`

**Description:** HTML-encoded status content.
**Type:** String \(Enumerable oneOf\)
- `public` = Visible to everyone, shown in public timelines.
- `unlisted` = Visible to public, but not included in public timelines.
- `private` = Visible to followers only, and to any mentioned users.
- `direct` = Visible only to mentioned users.
**Version history:** Added in 0.9.9

### `sensitive`

**Description:** Is this status marked as sensitive content?
**Type:** Boolean
**Version history:** Added in 0.9.9

### `spoiler_text`

**Description:** Subject or summary line, below which status content is collapsed until expanded.
**Type:** String
**Version history:** Added in 1.0.0

### `media_attachments`

**Description:** Media that is attached to this status.
**Type:** Array of [Attachment](attachment.md)
**Version history:** Added in 0.6.0

### `application`

**Description:** The application used to post this status.
**Type:** [Application](application.md)
**Version history:** Added in 0.9.9

## Rendering attributes

### `mentions`

**Description:** Mentions of users within the status content.
**Type:** Array of [Mention]({{< relref "mention.md" >}})
**Version history:** Added in 0.6.0

### `tags`

**Description:** Hashtags used within the status content.
**Type:** Array of [Tag](tag.md)
**Version history:** Added in 0.9.0

### `emojis`

**Description:** Custom emoji to be used when rendering status content.
**Type:** Array of [Emoji](emoji.md)
**Version history:** Added in 2.0.0

## Informational attributes

### `reblogs_count`

**Description:** How many boosts this status has received.
**Type:** Number
**Version history:** Added in 0.1.0

### `favourites_count`

**Description:** How many favourites this status has received.
**Type:** Number
**Version history:** Added in 0.1.0

### `replies_count`

**Description:** How many replies this status has received.
**Type:** Number
**Version history:** Added in 2.5.0

## Nullable attributes

### `url`

**Description:** A link to the status's HTML representation.
**Type:** String \(URL\)
**Version history:** Added in 0.1.0

### `in_reply_to_id`

**Description:** ID of the status being replied.
**Type:** String \(cast from an integer but not guaranteed to be a number\)
**Version history:** Added in 0.1.0

### `in_reply_to_account_id`

**Description:** ID of the account being replied to.
**Type:** String \(cast from an integer but not guaranteed to be a number\)
**Version history:** Added in 1.0.0

### `reblog`

**Description:** ID of the status in the database.
**Type:** [Status](status.md)
**Version history:** Added in 0.1.0

### `poll`

**Description:** The poll attached to the status.
**Type:** [Poll]({{< relref "poll.md" >}})
**Version history:** Added in 2.8.0

### `card`

**Description:** Preview card for links included within status content.
**Type:** [Card]({{< relref "card.md" >}})
**Version history:** Added in 2.6.0

### `language`

**Description:** A link to the status's HTML representation.
**Type:** String \(ISO 639 Part 1 two-letter language code\)
**Version history:** Added in 1.4.0

## Authorized user attributes

### `favourited`

**Description:** Have you favourited this status?
**Type:** Boolean
**Version history:** Added in 0.1.0

### `reblogged`

**Description:** Have you boosted this status?
**Type:** Boolean
**Version history:** Added in 0.1.0

### `muted`

**Description:** Have you muted notifications for this status's conversation?
**Type:** Boolean
**Version history:** Added in 1.4.0

### `bookmarked`

**Description:** Have you bookmarked this status?
**Type:** Boolean
**Version history:** Added in 3.1.0

### `pinned`

**Description:** Have you pinned this status? Only appears if the status is pinnable.
**Type:** Boolean
**Version history:** Added in 1.6.0

## See also

* GET accounts/:id/statuses
* GET /api/v2/search

{{< page-ref page="methods/statuses.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/status_serializer.rb" caption="app/serializers/rest/status\_serializer.rb" >}}



