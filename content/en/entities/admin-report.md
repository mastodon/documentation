---
title: Admin::Report
description: Admin-level information about a filed report.
menu:
  docs:
    parent: entities
---

## Example

```javascript
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
    ...
    "account": {
      "id": "108965218747268792",
      "username": "admin",
      "acct": "admin",
      ...
    }
  },
  "target_account": {
    "id": "108965430868193066",
    "username": "goody",
    "domain": null,
    "created_at": "2022-09-08T23:42:04.731Z",
    "email": "goody@mastodon.local",
    ...
    "account": {
      "id": "108965430868193066",
      "username": "goody",
      "acct": "goody",
      ...
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
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:** Added in 2.9.1

### `action_taken` {#action_taken}

**Description:** The action taken to resolve this report.\
**Type:** String \(Enumerable oneOf\)\
**Version history:** Added in 2.9.1

### `comment` {#comment}

**Description:** An optional reason for reporting.\
**Type:** String\
**Version history:** Added in 2.9.1

### `created_at` {#created_at}

**Description:** The time the report was filed.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:** Added in 2.9.1

### `updated_at` {#updated_at}

**Description:** The time of last action on this report.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:** Added in 2.9.1

### `account` {#account}

**Description:** The account which filed the report.\
**Type:** [Account]({{< relref "account.md" >}})\
**Version history:** Added in 2.9.1

### `target_account` {#target_account}

**Description:** The account being reported.\
**Type:** [Account]({{< relref "account.md" >}})\
**Version history:** Added in 2.9.1

### `assigned_account` {#assigned_account}

**Description:** The account of the moderator assigned to this report.\
**Type:** [Account]({{< relref "account.md" >}})\
**Version history:** Added in 2.9.1

### `action_taken_by_account` {#action_taken_by_account}

**Description:** The action taken by the moderator who handled the report.\
**Type:** String \(Enumerable oneOf\)\
**Version history:** Added in 2.9.1

### `statuses` {#statuses}

**Description:** Statuses attached to the report, for context.\
**Type:** Array of [Status]({{< relref "status.md" >}})\
**Version history:** Added in 2.9.1

## See also

{{< page-ref page="methods/admin/reports" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/admin/report_serializer.rb" caption="app/serializers/rest/admin/report_serializer.rb" >}}



