---
title: Admin::Report
description: Admin-level information about a filed report.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-report",
  "/entities/Admin-Report",
  "/entities/admin_report",
  "/entities/Admin_Report",
  "/api/entities/admin-report",
  "/api/entities/Admin-Report",
  "/api/entities/admin_report",
  "/api/entities/Admin_Report",
]
---

## Example

```json
{
  "id": "1",
  "action_taken": false,
  "action_taken_at": null,
  "category": "spam",
  "comment": "",
  "forwarded": false,
  "created_at": "2022-09-09T21:19:23.085Z",
  "updated_at": "2022-09-09T21:19:23.085Z",
  "account": {
    "id": "108965218747268792",
    "username": "admin",
    "domain": null,
    "created_at": "2022-09-08T22:48:07.985Z",
    "email": "admin@mastodon.local",
    // ...
    "account": {
      "id": "108965218747268792",
      "username": "admin",
      "acct": "admin",
      // ...
    }
  },
  "target_account": {
    "id": "108965430868193066",
    "username": "goody",
    "domain": null,
    "created_at": "2022-09-08T23:42:04.731Z",
    "email": "goody@mastodon.local",
    // ...
    "account": {
      "id": "108965430868193066",
      "username": "goody",
      "acct": "goody",
      // ...
    }
  },
  "assigned_account": null,
  "action_taken_by_account": null,
  "statuses": [],
  "rules": []
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the report in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
2.9.1 - added

### `action_taken` {#action_taken}

**Description:** Whether an action was taken to resolve this report.\
**Type:** Boolean\
**Version history:**\
2.9.1 - added

### `action_taken_at` {#action_taken_at}

**Description:** When an action was taken, if this report is currently resolved.\
**Type:** {{<nullable>}} String ([Datetime](/api/datetime-format#datetime)) or null\
**Version history:**\
2.9.1 - added

### `category` {#category}

**Description:** The category under which the report is classified.\
**Type:** String (Enumerable oneOf)\
`spam` = Malicious, fake, or repetitive content\
`violation` = Violates one or more specific [`rules`](#rules)\
`other` = The default (catch-all) category\
**Version history:**\
3.5.0 - added

### `comment` {#comment}

**Description:** An optional reason for reporting.\
**Type:** String\
**Version history:**\
2.9.1 - added

### `forwarded` {#forwarded}

**Description:** Whether a report was forwarded to a remote instance.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

### `created_at` {#created_at}

**Description:** The time the report was filed.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
2.9.1 - added

### `updated_at` {#updated_at}

**Description:** The time of last action on this report.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
2.9.1 - added

### `account` {#account}

**Description:** The account which filed the report.\
**Type:** [Admin::Account]({{< relref "entities/Admin_Account" >}})\
**Version history:**\
2.9.1 - added

### `target_account` {#target_account}

**Description:** The account being reported.\
**Type:** [Admin::Account]({{< relref "entities/Admin_Account" >}})\
**Version history:**\
2.9.1 - added

### `assigned_account` {#assigned_account}

**Description:** The account of the moderator assigned to this report.\
**Type:** {{<nullable>}} [Admin::Account]({{< relref "entities/Admin_Account" >}}) or null\
**Version history:**\
2.9.1 - added

### `action_taken_by_account` {#action_taken_by_account}

**Description:** The account of the moderator who handled the report.\
**Type:** {{<nullable>}} [Admin::Account]({{< relref "entities/Admin_Account" >}}) or null\
**Version history:**\
2.9.1 - added

### `statuses` {#statuses}

**Description:** Statuses attached to the report, for context.\
**Type:** Array of [Status]({{< relref "entities/Status" >}})\
**Version history:**\
2.9.1 - added

### `rules` {#rules}

**Description:** Rules attached to the report, for context.\
**Type:** Array of [Rule]({{< relref "entities/Rule" >}})\
**Version history:**\
3.5.0 - added

## See also

{{< page-relref page="methods/admin/reports" caption="admin/reports API methods">}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/report_serializer.rb" caption="app/serializers/rest/admin/report_serializer.rb" >}}



