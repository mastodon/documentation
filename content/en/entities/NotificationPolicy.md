---
title: NotificationPolicy
description: Represents the notification filtering policy of the user.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/NotificationPolicy",
]
---

## Attributes

### `for_not_following` {#for_not_following}

**Description:** Whether to `accept`, `filter` or `drop` notifications from accounts the user is not following. `drop` will prevent creation of the notification object altogether (without preventing the underlying activity), `filter` will cause it to be marked as filtered, and `accept` will not affect its processing.\
**Type:** String (one of `accept`, `filter` or `drop`)\
**Version history:**\
4.3.0 - added

### `for_not_followers` {#for_not_followers}

**Description:** Whether to `accept`, `filter` or `drop` notifications from accounts that are not following the user. `drop` will prevent creation of the notification object altogether (without preventing the underlying activity), `filter` will cause it to be marked as filtered, and `accept` will not affect its processing.\
**Type:** String (one of `accept`, `filter` or `drop`)\
**Version history:**\
4.3.0 - added

### `for_new_accounts` {#for_new_accounts}

**Description:** Whether to `accept`, `filter` or `drop` notifications from accounts created in the past 30 days. `drop` will prevent creation of the notification object altogether (without preventing the underlying activity), `filter` will cause it to be marked as filtered, and `accept` will not affect its processing.\
**Type:** String (one of `accept`, `filter` or `drop`)\
**Version history:**\
4.3.0 - added

### `for_private_mentions` {#for_private_mentions}

**Description:** Whether to `accept`, `filter` or `drop` notifications from private mentions. `drop` will prevent creation of the notification object altogether (without preventing the underlying activity), `filter` will cause it to be marked as filtered, and `accept` will not affect its processing. Replies to private mentions initiated by the user, as well as accounts the user follows, are always allowed, regardless of this value.\
**Type:** String (one of `accept`, `filter` or `drop`)\
**Version history:**\
4.3.0 - added

### `for_limited_accounts` {#for_limited_accounts}

**Description:** Whether to `accept`, `filter` or `drop` notifications from accounts that were limited by a moderator. `drop` will prevent creation of the notification object altogether (without preventing the underlying activity), `filter` will cause it to be marked as filtered, and `accept` will not affect its processing.\
**Type:** String (one of `accept`, `filter` or `drop`)\
**Version history:**\
4.3.0 - added

### `summary` {#summary}

**Description:** Summary of the filtered notifications\
**Type:** Hash\
**Version history:**\
4.3.0 - added

### `summary[pending_requests_count]` {#pending_requests_count}

**Description:** Number of different accounts from which the user has non-dismissed filtered notifications. Capped at 100.\
**Type:** Integer\
**Version history:**\
4.3.0 - added

### `summary[pending_notifications_count]` {#pending_notifications_count}

**Description:** Number of total non-dismissed filtered notifications. May be inaccurate.\
**Type:** Integer\
**Version history:**\
4.3.0 - added

## Example

```json

{
  "for_not_following": "accept",
  "for_not_followers": "accept",
  "for_new_accounts": "accept",
  "for_private_mentions": "drop",
  "for_limited_accounts": "filter",
  "summary": {
    "pending_requests_count": 0,
    "pending_notifications_count": 0
  }
}

```

## See also

{{< page-relref ref="methods/notifications" caption="notifications API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/notification_policy_serializer.rb" caption="app/serializers/rest/notification_policy_serializer.rb" >}}
