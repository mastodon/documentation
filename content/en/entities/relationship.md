---
title: Relationship
description: Represents the relationship between accounts, such as following / blocking / muting / etc.
menu:
  docs:
    parent: entities
---

## Example

```javascript
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
  "domain_blocking": false,
  "endorsed": false,
  "note": ""
}
```

## Required attributes

### `id`

**Description:** The account id.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:**\
0.6.0 - added

### `following`

**Description:** Are you following this user?\
**Type:** Boolean\
**Version history:**\
0.6.0 - added

### `requested`

**Description:** Do you have a pending follow request for this user?\
**Type:** Boolean\
**Version history:**\
0.9.9 - added

### `endorsed`

**Description:** Are you featuring this user on your profile?\
**Type:** Boolean\
**Version history:**\
2.5.0 - added

### `followed_by` {#followed_by}

**Description:** Are you followed by this user?\
**Type:** Boolean\
**Version history:**\
0.6.0 - added

### `muting`

**Description:** Are you muting this user?\
**Type:** Boolean\
**Version history:** Added in 1.1.0

### `muting_notifications` {#muting_notifications}

**Description:** Are you muting notifications from this user?\
**Type:** Boolean\
**Version history:**\
2.1.0 - added

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

### `blocking`

**Description:** Are you blocking this user?\
**Type:** Boolean\
**Version history:**\
0.6.0 - added

### `domain_blocking` {#domain_blocking}

**Description:** Are you blocking this user's domain?\
**Type:** Boolean\
**Version history:**\
1.4.0 - added

### `blocked_by` {#blocked_by}

**Description:** Is this user blocking you?\
**Type:** Boolean\
**Version history:**\
2.8.0 - added

### `note`

**Description:** Is this user blocking you?\
**Type:** String\
**Version history:**\
3.2.0 - added

## See also

* [GET /api/v1/accounts/relationships]({{< relref "../methods/accounts.md#check-relationships-to-other-accounts" >}})

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/relationship_serializer.rb" caption="app/serializers/rest/relationship\_serializer.rb" >}}



