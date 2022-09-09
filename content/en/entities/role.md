---
title: Role
description: Represents a custom user role that grants permissions.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
	"id": 3,
	"name": "Owner",
	"color": "#ff3838",
	"position": 1000,
	"permissions": 1,
	"highlighted": true,
	"created_at": "2022-09-08T22:48:07.983Z",
	"updated_at": "2022-09-08T22:48:07.983Z"
},
```

## Attributes

### `id` {#id}

**Description:** The ID of the Role in the database.\
**Type:** Integer\
**Version history:**\
3.6.0 - added

### `name` {#name}

**Description:** The name of the role.\
**Type:** String\
**Version history:**\
3.6.0 - added

### `color` {#color}

**Description:** The hex code assigned to this role. If no hex code is assigned, the string will be empty.\
**Type:** String\
**Version history:**\
3.6.0 - added

### `position` {#position}

**Description:** An index for the role's position. The higher the position, the more priority the role has over other roles.\
**Type:** Integer\
**Version history:**\
3.6.0 - added