---
title: Appeal
description: Appeal against a moderation action.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/Appeal",
  "/api/entities/Appeal",
]
---

## Attributes

### `text` {#text}

**Description:** Text of the appeal from the moderated account to the moderators.\
**Type:** String\
**Version history:**\
4.3.0 - added

### `state` {#state}

**Description:** State of the appeal.\
**Type:** String (Enumerable oneOf)\
`approved` = The appeal has been approved by a moderator\
`rejected` = The appeal has been rejected by a moderator\
`pending` = The appeal has been submitted, but neither approved nor rejected yet\
**Version history:**\
4.3.0 - added
