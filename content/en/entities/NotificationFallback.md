---
title: Notification
description: Represents a notification of an event relevant to the user.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/NotificationFallback",
  "/api/entities/NotificationFallback",
]
---

## Attributes

### `title`

**Description:** Localized fallback title for the notification, for instance “Alice added you to a collection”.\
**Type:** String\
**Version history:**\
4.6.0 - added

### `summary`

**Description:** Localized fallback summary for the notification, for instance “You're on an app that does not support the most recent version of Mastodon. Sign in to the Mastodon web app for full functionality.”\
**Type:** {{<nullable>}} String\
**Version history:**\
4.6.0 - added

### `details`

**Description:** Localized details for the notifications, to be displayed when clicking the notification, for instance.\
**Type:** {{<nullable>}} String\
**Version history:**\
4.6.0 - added

## See also

{{< page-relref ref="methods/notifications" caption="notifications API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/concerns/notification_fallback_concern.rb" caption="app/serializers/concerns/notification_fallback_concern.rb" >}}



