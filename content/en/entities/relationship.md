---
title: Relationship
description: >-
  Represents the relationship between accounts, such as following / blocking /
  muting / etc.
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
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

## Required attributes <a id="relationship"></a>

### `id` <a id="id"></a>

**Description:** The account id.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:** Added in 0.6.0

### `following` <a id="following"></a>

**Description:** Are you following this user?\
**Type:** Boolean\
**Version history:** Added in 0.6.0

### `requested` <a id="requested"></a>

**Description:** Do you have a pending follow request for this user?\
**Type:** Boolean\
**Version history:** Added in 0.9.9

### `endorsed` <a id="endorsed"></a>

**Description:** Are you featuring this user on your profile?\
**Type:** Boolean\
**Version history:** Added in 2.5.0

### `followed_by` <a id="followed_by"></a>

**Description:** Are you followed by this user?\
**Type:** Boolean\
**Version history:** Added in 0.6.0

### `muting` <a id="muting"></a>

**Description:** Are you muting this user?\
**Type:** Boolean\
**Version history:** Added in 1.1.0

### `muting_notifications` <a id="muting_notifications"></a>

**Description:** Are you muting notifications from this user?\
**Type:** Boolean\
**Version history:** Added in 2.1.0

### `showing_reblogs` <a id="showing_reblogs"></a>

**Description:** Are you receiving this user's boosts in your home timeline?\
**Type:** Boolean\
**Version history:** Added in 2.1.0

### `blocking` <a id="blocking"></a>

**Description:** Are you blocking this user?\
**Type:** Boolean\
**Version history:** Added in 0.6.0

### `domain_blocking` <a id="domain_blocking"></a>

**Description:** Are you blocking this user's domain?\
**Type:** Boolean\
**Version history:** Added in 1.4.0

### `blocked_by` <a id="blocked_by"></a>

**Description:** Is this user blocking you?\
**Type:** Boolean\
**Version history:** Added in 2.8.0

## See also

* [GET /api/v1/accounts/relationships](../methods/accounts/#check-relationships-to-other-accounts)

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/relationship_serializer.rb" caption="app/serializers/rest/relationship\_serializer.rb" >}}



