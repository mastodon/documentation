---
title: Poll
description: Represents a poll attached to a status.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/poll",
  "/entities/Poll",
  "/api/entities/poll",
  "/api/entities/Poll",
]
---

## Example

```json
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
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
2.8.0 - added

### `expires_at` {#expires_at}

**Description:** When the poll ends.\
**Type:** {{<nullable>}} String ([Datetime](/api/datetime-format#datetime)), or null if the poll does not end\
**Version history:**\
2.8.0 - added

### `expired` {#expired}

**Description:** Is the poll currently expired?\
**Type:** Boolean\
**Version history:**\
2.8.0 - added

### `multiple` {#multiple}

**Description:** Does the poll allow multiple-choice answers?\
**Type:** Boolean\
**Version history:**\
2.8.0 - added

### `votes_count` {#votes_count}

**Description:** How many votes have been received.\
**Type:** Integer\
**Version history:**\
2.8.0 - added

### `voters_count` {#voters_count}

**Description:** How many unique accounts have voted on a multiple-choice poll.\
**Type:** {{<nullable>}} Integer, or null if `multiple` is false.\
**Version history:**\
2.8.0 - added

### `options` {#options}

**Description:** Possible answers for the poll.\
**Type:** Array of [Poll::Option](#Option)\
**Version history:**\
2.8.0 - added

### `emojis` {#emojis}

**Description:** Custom emoji to be used for rendering poll options.\
**Type:** Array of [CustomEmoji]({{< relref "entities/CustomEmoji" >}})\
**Version history:**\
2.8.0 - added

### `voted` {{%optional%}} {#voted}

**Description:** When called with a user token, has the authorized user voted?\
**Type:** Boolean\
**Version history:**\
2.8.0 - added

### `own_votes` {{%optional%}} {#own_votes}

**Description:** When called with a user token, which options has the authorized user chosen? Contains an array of index values for `options`.\
**Type:** Array of Integer\
**Version history:**\
2.8.0 - added

## Poll::Option attributes {#Option}

### `title` {#option-title}

**Description:** The text value of the poll option.\
**Type:** String\
**Version history:**\
2.8.0 - added

#### `votes_count` {#option-votes_count}

**Description:** The total number of received votes for this option.\
**Type:** {{<nullable>}} Integer, or null if results are not published yet.\
**Version history:**\
2.8.0 - added

## See also

{{< page-relref ref="entities/Status#poll" caption="Status (`poll` attribute)" >}}

{{< page-relref ref="methods/polls" caption="polls API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/poll_serializer.rb" caption="app/serializers/rest/poll_serializer.rb" >}}





