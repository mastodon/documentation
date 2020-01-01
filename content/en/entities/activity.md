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

### `week`

**Description:** Midnight at the first day of the week.
**Type:** String \(UNIX Timestamp\)
**Version history:** Added in 2.1.2

### `statuses`

**Description:** Statuses created since the week began.
**Type:** String \(cast from an integer\)
**Version history:** Added in 2.1.2

### `logins`

**Description:** User logins since the week began.
**Type:** String \(cast from an integer\)
**Version history:** Added in 2.1.2

### `registrations`

**Description:** User registrations since the week began.
**Type:** String \(cast from an integer\)
**Version history:** Added in 2.1.2

## See also

* [GET /api/v1/instance/activity](../methods/instance/#weekly-activity)

{{< page-ref page="methods/instance.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/controllers/api/v1/instances/activity_controller.rb" caption="app/controllers/api/v1/instances/activity\_controller.rb" >}}



