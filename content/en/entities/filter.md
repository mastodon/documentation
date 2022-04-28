---
title: Filter
description: Represents a user-defined filter for determining which statuses should not be shown to the user.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": "2019-11-26T09:08:06.254Z",
  "irreversible": true
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the filter in the database.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:** Added in 2.4.3

### `phrase` {#phrase}

**Description:** The text to be filtered.\
**Type:** String\
**Version history:** Added in 2.4.3

### `context` {#context}

**Description:** The contexts in which the filter should be applied.\
**Type:** Array of String \(Enumerable anyOf\)\
`home` = home timeline and lists\
`notifications` = notifications timeline\
`public` = public timelines\
`thread` = expanded thread of a detailed status\
**Version history:** Added in 2.4.3

### `expires_at` {#expires_at}

**Description:** When the filter should no longer be applied\
**Type:** String \(ISO 8601 Datetime\), or null if the filter does not expire\
**Version history:** Added in 2.4.3

### `irreversible` {#irreversible}

**Description:** Should matching entities in home and notifications be dropped by the server?\
**Type:** Boolean\
**Version history:** Added in 2.4.3

### `whole_word` {#whole_word}

**Description:** Should the filter consider word boundaries?\
**Type:** Boolean\
**Version history:** Added in 2.4.3

## Implementation notes

If `whole_word` is true , client app should do:

* Define ‘word constituent character’ for your app. In the official implementation, it’s `[A-Za-z0-9_]` in JavaScript, and `[[:word:]]` in Ruby. Ruby uses the POSIX character class \(Letter \| Mark \| Decimal\_Number \| Connector\_Punctuation\).
* If the phrase starts with a word character, and if the previous character before matched range is a word character, its matched range should be treated to not match.
* If the phrase ends with a word character, and if the next character after matched range is a word character, its matched range should be treated to not match.

Please check `app/javascript/mastodon/selectors/index.js` and `app/lib/feed_manager.rb` in the Mastodon source code for more details.

## See also

{{< page-ref page="methods/accounts/filters.md" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/master/app/lib/feed_manager.rb" caption="app/lib/feed\_manager.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/master/app/javascript/mastodon/selectors/index.js" caption="app/javascript/mastodon/selectors/index.js" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/master/app/serializers/rest/filter_serializer.rb" caption="app/serializers/rest/filter\_serializer.rb" >}}



