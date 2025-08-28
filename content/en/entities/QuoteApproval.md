---
title: QuoteApproval
description: Summary of a status' quote approval policy and how it applies to the requesting user.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/quote_approval",
]
---

## Example

```json
{
  "automatic": ["public"],
  "manual": [],
  "current_user": "automatic"
}
```

## Attributes

### `automatic` {#automatic}

**Description:** Describes who is expected to be able to quote that status and have the quote automatically authorized. An empty list means that nobody is expected to be able to quote this post.\
**Type:** Array of String (Enumerable, anyOf)\
`public` = Anybody is expected to be able to quote this status and have the quote be automatically accepted.\
`followers` = Followers are expected to be able to quote this status and have the quote be automatically accepted.\
`unknown` = The underlying quote policy is too complex for Mastodon to represent. Some accounts that do not fit in the above categories may be able to quote and have the quote be automatically accepted.\
**Version history:**\
4.5.0 - added

### `manual` {#manual}

**Description:** Describes who is expected to have their quotes of this status be manually reviewed by the author before being accepted. An empty list means that nobody is expected to be able to quote this post.\
**Type:** Array of String (Enumerable, anyOf)\
`public` = Anybody is expected to be able to quote this status, but have the quote be accepted only after manual review.\
`followers` = Followers are expected to be able to quote this status, but have the quote be accepted only after manual review.\
`unknown` = The underlying quote policy is too complex for Mastodon to represent. Some accounts that do not fit in the above categories may be allowed to quote with manual review.\
**Version history:**\
4.5.0 - added

### `current_user` {#current_user}

**Description:** Describes how this status' quote policy applies to the current user.\
**Type:** String (Enumerable, oneOf)\
`automatic` = The requesting user is expected to be allowed to quote and have their quote be automatically accepted.\
`manual` = The requesting user is expected to be allowed to quote after manual review of the post by the quoted status' author.\
`denied` = The requesting user is not expected to be allowed to quote this post. Mastodon will return an error if you attempt to do so.\
`unknown` = The underlying quote policy is too complex for Mastodon to represent. This should be treated as `denied` unless you are targeting “power users”.\
**Version history:**\
4.5.0 - added
