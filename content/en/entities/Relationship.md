---
title: Relationship
description: Represents the relationship between accounts, such as following / blocking / muting / etc.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/relationship",
  "/entities/Relationship",
  "/api/entities/relationship",
  "/api/entities/Relationship",
]
---

## Example

```json
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "requested_by": false,
  "domain_blocking": false,
  "endorsed": false,
  "note": ""
}
```

## Attributes

### `id` {#id}

**Description:** The account ID.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
0.6.0 - added

### `following` {#following}

**Description:** Are you following this user?\
**Type:** Boolean\
**Version history:**\
0.6.0 - added

### `showing_reblogs` {#showing_reblogs}

**Description:** Are you receiving this user's boosts in your home timeline?\
**Type:** Boolean\
**Version history:**\
2.1.0 - added

### `notifying` {#notifying}

**Description:** Have you enabled notifications for this user?\
**Type:** Boolean\
**Version history:**\
3.3.0 - added

### `languages` {#languages}

**Description:** Which languages are you following from this user?\
**Type:** Array of String (ISO 639-1 language two-letter code)\
**Version history:**\
4.0.0 - added

### `followed_by` {#followed_by}

**Description:** Are you followed by this user?\
**Type:** Boolean\
**Version history:**\
0.6.0 - added

### `blocking` {#blocking}

**Description:** Are you blocking this user?\
**Type:** Boolean\
**Version history:**\
0.6.0 - added

### `blocked_by` {#blocked_by}

**Description:** Is this user blocking you?\
**Type:** Boolean\
**Version history:**\
2.8.0 - added

### `muting` {#muting}

**Description:** Are you muting this user?\
**Type:** Boolean\
**Version history:**\
1.1.0 - added

### `muting_notifications` {#muting_notifications}

**Description:** Are you muting notifications from this user?\
**Type:** Boolean\
**Version history:**\
2.1.0 - added

### `requested` {#requested}

**Description:** Do you have a pending follow request for this user?\
**Type:** Boolean\
**Version history:**\
0.9.9 - added

### `requested_by` {#requested_by}

**Description:** Has this user requested to follow you?\
**Type:** Boolean\
**Version history:**\
4.1.0 - added

### `domain_blocking` {#domain_blocking}

**Description:** Are you blocking this user's domain?\
**Type:** Boolean\
**Version history:**\
1.4.0 - added

### `endorsed` {#endorsed}

**Description:** Are you featuring this user on your profile?\
**Type:** Boolean\
**Version history:**\
2.5.0 - added

### `note` {#note}

**Description:** This user's profile bio\
**Type:** String\
**Version history:**\
3.2.0 - added

## See also

{{< page-relref ref="methods/accounts#relationships" caption="GET /api/v1/accounts/relationships" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/relationship_serializer.rb" caption="app/serializers/rest/relationship_serializer.rb" >}}
