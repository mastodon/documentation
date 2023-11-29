---
title: Admin::Ip
description: Represents an IP address associated with a user.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-ip",
  "/entities/Admin-Ip",
  "/entities/admin_ip",
  "/entities/Admin_Ip",
  "/api/entities/admin-ip",
  "/api/entities/Admin-Ip",
  "/api/entities/admin_ip",
  "/api/entities/Admin_Ip",
]
---

## Example

```json
{
	"ip": "192.168.42.1",
	"used_at": "2022-09-15T01:38:58.851Z"
}
```

## Attributes

### `ip` {#id}

**Description:** The IP address.\
**Type:** String (IP address)\
**Version history:**\
3.5.0 - added

### `used_at` {#used_at}

**Description:** The timestamp of when the IP address was last used for this account.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.5.0 - added

## See also

{{< page-relref ref="entities/Admin_Account#ips" caption="Admin::Account (`ips` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/ip_serializer.rb" caption="app/serializers/rest/admin/ip_serializer.rb" >}}