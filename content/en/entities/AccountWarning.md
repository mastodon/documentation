---
title: AccountWarning
description: Moderation warning against a particular account.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/AccountWarning",
  "/api/entities/AccountWarning",
]
---

## Attributes

### `id` {#id}

**Description:** The ID of the account warning.\
**Type:** String (cast from integer)\
**Version history:**\
4.3.0 - added

### `action` {#action}

**Description:** Action taken against the account.\
**Type:** String (Enumerable oneOf)\
`none` = No action was taken, this is a simple warning\
`disable` = The account has been disabled\
`mark_statuses_as_sensitive` = Specific posts from the target account have been marked as sensitive\
`delete_statuses` = Specific statuses from the target account have been deleted\
`sensitive` = All posts from the target account are marked as sensitive\
`silence` = The target account has been limited\
`suspend` = The target account has been suspended\
**Version history:**\
4.3.0 - added

### `text` {#text}

**Description:** Message from the moderator to the target account.\
**Type:** String\
**Version history:**\
4.3.0 - added

### `status_ids` {#status_ids}

**Description:** List of status IDs that are relevant to the warning. When `action` is `mark_statuses_as_sensitive` or `delete_statuses`, those are the affected statuses. If the action is `delete_statuses` then they have been irrevocably deleted (irrespective of the appeal state), and will be inaccessible to the client.\
**Type:** {{<nullable>}} Array of String (cast from integer), or null\
**Version history:**\
4.3.0 - added

### `target_account` {#target_account}

**Description:** Account against which a moderation decision has been taken. If this `AccountWarning` is present in a [Notification](/entities/Notification/) then this is always the same as the authenticated account that requested the notification.\
**Type:** [Account]({{< relref "entities/Account" >}})\
**Version history:**\
4.3.0 - added

### `appeal` {#appeal}

**Description:** Appeal submitted by the target account, if any.\
**Type:** {{<nullable>}} [Appeal]({{< relref "entities/Appeal" >}}), or null\
**Version history:**\
4.3.0 - added

### `created_at` {#created_at}

**Description:** When the event took place.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
4.3.0 - added
