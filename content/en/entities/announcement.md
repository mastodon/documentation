---
title: Announcement
description: Represents an announcement set by an administrator.
menu:
  docs:
    parent: entities
---

## Example
```javascript
```

## Base attributes

### `id`

**Description:** The announcement id.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:**\
3.1.0 - added

### `text`

**Description:** The content of the announcement.\
**Type:** String\
**Version history:**\
3.1.0 - added

### `published`

**Description:** Whether the announcement is currently active.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `all_day`

**Description:** Whether the announcement has a start/end time.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `created_at`

**Description:** When the announcement was created.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added

### `updated_at`

**Description:** When the announcement was last updated.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added

## Optional attributes

### `scheduled_at`

**Description:** When the future announcement was scheduled.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added

### `starts_at`

**Description:** When the future announcement will start.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added

### `ends_at`

**Description:** When the future announcement will end.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.1.0 - added