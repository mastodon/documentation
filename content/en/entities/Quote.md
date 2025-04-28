---
title: Quote
description: Represents a user-defined filter for determining which statuses should not be shown to the user.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/quote",
]
---

## Example

```json
{
  "state": "accepted",
  "status": {
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
      "fields": []
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  }
}
```

## Attributes

### `state` {#state}

**Description:** The state of the quote.\
**Type:** String (Enumerable, oneOf)\
`pending` = The quote has not been acknowledged by the quoted account yet, and requires authorization before being displayed.\
`accepted` = The quote has been accepted and can be displayed. This is the only case where `status` is non-null.\
`rejected` = The quote has been explicitly rejected by the quoted account, and cannot be displayed.\
`revoked` = The quote has been previously accepted, but is now revoked, and thus cannot be displayed.\
`deleted` = The quote has been approved, but the quoted post itself has now been deleted.\
`unauthorized` = The quote has been approved, but cannot be displayed because the user is not authorized to see it.
**Version history:**\
4.4.0 - added

### `status` {#status}

**Description:** The status being quoted, if the quote has been accepted. This will be `null`, unless the `state` attribute is `accepted`.\
**Type:** {{<nullable>}} [Status]({{< relref "entities/status" >}}) or null\
**Version history:**\
4.4.0 - added

## See also

{{< page-relref ref="entities/shallow_quote" caption="ShallowQuote" >}}
{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/quote_serializer.rb" caption="app/serializers/rest/quote_serializer.rb" >}}
