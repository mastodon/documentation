---
title: Admin::Ip
description: 表示与用户关联的 IP 地址。
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

## 示例

```json
{
	"ip": "192.168.42.1",
	"used_at": "2022-09-15T01:38:58.851Z"
}
```

## 属性

### `ip` {#id}

**描述:** IP 地址。\
**类型:** 字符串 (IP 地址)\
**版本历史:**\
3.5.0 - 添加

### `used_at` {#used_at}

**描述:** 此 IP 地址最后一次被对应帐户使用时的时间戳。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
3.5.0 - 添加

## 参见

{{< page-relref ref="entities/Admin_Account#ips" caption="Admin::Account (`ips` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/ip_serializer.rb" caption="app/serializers/rest/admin/ip_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::Ip" raw_link="/entities/Admin_Ip/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
