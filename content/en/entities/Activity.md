---
title: Activity
description: Represents a weekly bucket of instance activity.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "week": "1574640000",
  "statuses": "37125",
  "logins": "14239",
  "registrations": "542"
}
```

## Attributes

### `week` {#week}

**Description:** Midnight at the first day of the week.\
**Type:** String (UNIX Timestamp)\
**Version history:**\
2.1.2 - added

### `statuses` {#statuses}

**Description:** Statuses created since the week began.\
**Type:** String (cast from an integer)\
**Version history:**\
2.1.2 - added

### `logins` {#logins}

**Description:** User logins since the week began.\
**Type:** String (cast from an integer)\
**Version history:**\
2.1.2 - added

### `registrations` {#registrations}

**Description:** User registrations since the week began.\
**Type:** String (cast from an integer)\
**Version history:**\
2.1.2 - added

## See also

{{< page-relref ref="methods/instance#activity" caption="GET /api/v1/instance/activity" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/controllers/api/v1/instances/activity_controller.rb" caption="app/controllers/api/v1/instances/activity_controller.rb" >}}



