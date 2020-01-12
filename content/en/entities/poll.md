---
title: Poll
description: Represents a poll attached to a status.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "id": "34830",
  "expires_at": "2019-12-05T04:05:08.302Z",
  "expired": true,
  "multiple": false,
  "votes_count": 10,
  "voters_count": null,
  "voted": true,
  "own_votes": [
    1
  ],
  "options": [
    {
      "title": "accept",
      "votes_count": 6
    },
    {
      "title": "deny",
      "votes_count": 4
    }
  ],
  "emojis": []
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the poll in the database.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:** Added in 2.8.0

### `expires_at` {#expires_at}

**Description:** When the poll ends.\
**Type:** String \(ISO 8601 Datetime\), or null if the poll does not end\
**Version history:** Added in 2.8.0

### `expired` {#expired}

**Description:** Is the poll currently expired?\
**Type:** Boolean\
**Version history:** Added in 2.8.0

### `multiple` {#multiple}

**Description:** Does the poll allow multiple-choice answers?\
**Type:** Boolean\
**Version history:** Added in 2.8.0

### `votes_count` {#votes_count}

**Description:** How many votes have been received.\
**Type:** Number\
**Version history:** Added in 2.8.0

### `voters_count` {#voters_count}

**Description:** How many unique accounts have voted on a multiple-choice poll.\
**Type:** Number, or null if `multiple` is false.\
**Version history:** Added in 2.8.0

### `voted` {#voted}

**Description:** When called with a user token, has the authorized user voted?\
**Type:** Boolean, or null if no current user\
**Version history:** Added in 2.8.0

### `own_votes` {#own_votes}

**Description:** When called with a user token, which options has the authorized user chosen? Contains an array of index values for `options`.\
**Type:** Array of Number, or null if no current user\
**Version history:** Added in 2.8.0

### `options[]` {#options}

**Description:** Possible answers for the poll.\
**Type:** Array of Hash\
**Version history:** Added in 2.8.0

#### `options[][title]`

The text value of the poll option. String.

#### `options[][votes_count]`

The number of received votes for this option. Number, or null if results are not published yet.

### `emojis` {#emojis}

**Description:** Custom emoji to be used for rendering poll options.\
**Type:** Array of Emoji\
**Version history:** Added in 2.8.0

## See also

* [Status\#poll](status.md#poll)
* [/api/v1/polls]({{< relref "../methods/statuses/polls.md" >}})

{{< page-ref page="status.md" >}}

{{< page-ref page="methods/statuses/polls.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/poll_serializer.rb" caption="app/serializers/rest/poll\_serializer.rb" >}}





