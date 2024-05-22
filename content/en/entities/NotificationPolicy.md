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

### `filter_not_following` {#filter_not_following}

**Description:** Whether to filter notifications from accounts the user is not following.\
**Type:** Boolean\
**Version history:**\
4.3.0 - added

### `filter_not_followers` {#filter_not_followers}

**Description:** Whether to filter notifications from accounts that are not following the user.\
**Type:** Boolean\
**Version history:**\
4.3.0 - added

### `filter_new_accounts` {#filter_new_accounts}

**Description:** Whether to filter notifications from accounts created in the past 30 days.\
**Type:** Boolean\
**Version history:**\
4.3.0 - added

### `filter_private_mentions` {#filter_private_mentions}

**Description:** Whether to filter notifications from private mentions. Replies to private mentions initiated by the user, as well as accounts the user follows, are never filtered.\
**Type:** Boolean\
**Version history:**\
4.3.0 - added

### `summary` {#summary}

**Description:** Summary of the filtered notifications
**Type:** Hash\
**Version history:**\
4.3.0 - added

### `summary[pending_requests_count]` {#pending_requests_count}

**Description:** Number of different accounts from which the user has non-dismissed filtered notifications. Capped at 100.
**Type:** Integer\
**Version history:**\
4.3.0 - added

### `summary[pending_notifications_count]` {#pending_notifications_count}

**Description:** Number of total non-dismissed filtered notifications. May be inaccurate.
**Type:** Integer\
**Version history:**\
4.3.0 - added

## Example

```json

{
  "filter_not_following": false,
  "filter_not_followers": false,
  "filter_new_accounts": false,
  "filter_private_mentions": true,
  "summary": {
    "pending_requests_count": 0,
    "pending_notifications_count": 0
  }
}

```

## See also

{{< page-relref ref="methods/notifications" caption="notifications API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/notification_policy_serializer.rb" caption="app/serializers/rest/notification_policy_serializer.rb" >}}



