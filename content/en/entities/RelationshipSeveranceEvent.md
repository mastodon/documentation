---
title: RelationshipSeveranceEvent
description: Summary of a moderation or block event that caused follow relationships to be severed.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/RelationshipSeveranceEvent",
  "/api/entities/RelationshipSeveranceEvent",
]
---

## Attributes

### `id` {#id}

**Description:** The ID of the relationship severance event in the database.\
**Type:** String (cast from integer)\
**Version history:**\
4.3.0 - added

### `type` {#type}

**Description:** Type of event.\
**Type:** String (Enumerable oneOf)\
`domain_block` = A moderator suspended a whole domain\
`user_domain_block` = The user blocked a whole domain\
`account_suspension` = A moderator suspended a specific account\
**Version history:**\
4.3.0 - added

### `purged` {#purged}

**Description:** Whether the list of severed relationships is unavailable because the underlying issue has been purged.\
**Type:** Boolean\
**Version history:**\
4.3.0 - added

### `target_name` {#target_name}

**Description:** Name of the target of the moderation/block event. This is either a domain name or a user handle, depending on the event type.\
**Type:** String\
**Version history:**\
4.3.0 - added

### `relationships_count` {{%optional%}} {#relationships_count}

**Description:** Number of follow relationships (in either direction) that were severed.\
**Type:** Integer\
**Version history:**\
4.3.0 - added

### `created_at` {#created_at}

**Description:** When the event took place.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.3.0 - added
