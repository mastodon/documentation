---
title: Admin::Report
description: Admin-level information about a filed report.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{}
```

## Attributes

### `id` <a id="id"></a>

**Description:** The ID of the report in the database.
**Type:** String \(cast from an integer, but not guaranteed to be a number\)
**Version history:** Added in 2.9.1

### `action_taken` <a id="action_taken"></a>

**Description:** The action
**Type:** String \(Enumerable oneOf\)
**Version history:** Added in 2.9.1

### `comment` <a id="comment"></a>

**Description:** An optional reason for reporting.
**Type:** String
**Version history:** Added in 2.9.1

### `created_at` <a id="created_at"></a>

**Description:** The time the report was filed.
**Type:** String \(ISO 8601 Datetime\)
**Version history:** Added in 2.9.1

### `updated_at` <a id="updated_at"></a>

**Description:** The time of last action on this report.
**Type:** String \(ISO 8601 Datetime\)
**Version history:** Added in 2.9.1

### `account` <a id="account"></a>

**Description:** The account which filed the report.
**Type:** [Account](account.md)
**Version history:** Added in 2.9.1

### `target_account` <a id="target_account"></a>

**Description:** The account being reported.
**Type:** [Account](account.md)
**Version history:** Added in 2.9.1

### `assigned_account` <a id="assigned_account"></a>

**Description:** The account of the moderator assigned to this report.
**Type:** [Account](account.md)
**Version history:** Added in 2.9.1

### `action_taken_by_account` <a id="action_taken_by_account"></a>

**Description:** The action taken by the moderator who handled the report.
**Type:** String \(Enumerable oneOf\)
**Version history:** Added in 2.9.1

### `statuses` <a id="statuses"></a>

**Description:** Statuses attached to the report, for context.
**Type:** Array of [Status](status.md)
**Version history:** Added in 2.9.1

## See also

{{< page-ref page="methods/admin.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/admin/report_serializer.rb" caption="app/serializers/rest/admin/report\_serializer.rb" >}}



