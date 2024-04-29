---
title: Role
description: Represents a custom user role that grants permissions.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/role",
	"/entities/Role",
	"/api/entities/role",
	"/api/entities/Role",
]
---

## Example

```json
{
	"id": "3",
	"name": "Owner",
	"color": "#ff3838",
	"permissions": "1048575",
	"highlighted": true
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the Role in the database.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `name` {#name}

**Description:** The name of the role.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `color` {#color}

**Description:** The hex code assigned to this role. If no hex code is assigned, the string will be empty.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `permissions` {#permissions}

**Description:** A bitmask that represents the sum of all permissions granted to the role.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `highlighted` {#highlighted}

**Description:** Whether the role is publicly visible as a badge on user profiles.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

## Permission flags

To determine the permissions available to a certain role, convert the `permissions` attribute to binary and compare from the least significant bit upwards. For convenience (and to prevent the terms from growing too long), permissions will be presented below using hexadecimal values.

0x1
: **Administrator**. Users with this permission bypass all permissions.

0x2
: **Devops**. Allows users to access Sidekiq and PgHero dashboards.

0x4
: **View Audit Log**. Allows users to see history of admin actions.

0x8
: **View Dashboard**. Allows users to access the dashboard and various metrics.

0x10
: **Manage Reports**. Allows users to review reports and perform moderation actions against them.

0x20
: **Manage Federation**. Allows users to block or allow federation with other domains, and control deliverability.

0x40
: **Manage Settings**. Allows users to change site settings.

0x80
: **Manage Blocks**. Allows users to block e-mail providers and IP addresses.

0x100
: **Manage Taxonomies**. Allows users to review trending content and update hashtag settings.

0x200
: **Manage Appeals**. Allows users to review appeals against moderation actions.

0x400
: **Manage Users**. Allows users to view other users' details and perform moderation actions against them.

0x800
: **Manage Invites**. Allows users to browse and deactivate invite links.

0x1000
: **Manage Rules**. Allows users to change server rules.

0x2000
: **Manage Announcements**. Allows users to manage announcements on the server.

0x4000
: **Manage Custom Emojis**. Allows users to manage custom emojis on the server.

0x8000
: **Manage Webhooks**. Allows users to set up webhooks for administrative events.

0x10000
: **Invite Users**. Allows users to invite new people to the server.

0x20000
: **Manage Roles**. Allows users to manage and assign roles below theirs.

0x40000
: **Manage User Access**. Allows users to disable other users' two-factor authentication, change their e-mail address, and reset their password.

0x80000
: **Delete User Data**. Allows users to delete other users' data without delay.

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/role_serializer.rb" caption="app/serializers/rest/role_serializer.rb" >}}
