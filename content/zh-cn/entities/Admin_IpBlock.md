---
title: Admin::IpBlock
description: 表示一个不能用于注册的 IP 地址段。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-ipblock",
  "/entities/Admin-IpBlock",
  "/entities/admin_ipblock",
  "/entities/Admin_IpBlock",
  "/api/entities/admin-ipblock",
  "/api/entities/Admin-IpBlock",
  "/api/entities/admin_ipblock",
  "/api/entities/Admin_IpBlock",
]
---

## 示例

```json
{
  "id": "1",
  "ip": "8.8.8.8/32",
  "severity": "no_access",
  "comment": "",
  "created_at": "2022-11-16T07:22:00.501Z",
  "expires_at": null
}
```

## 属性

### `id` {#id}

**描述:** 数据库中 DomainBlock 的 ID。\
**类型:** 字符串（从整数转换而来，但不保证是一个数字）\
**版本历史:**\
4.0.0 - 添加

### `ip` {#ip}

**描述:** 不允许进行联合的 IP 地址段。\
**类型:** 字符串（IP 地址和前缀）\
**版本历史:**\
4.0.0 - 添加

### `severity` {#severity}

**描述:** 与此 IP 段关联的策略。\
**类型:** 字符串（枚举，oneOf）\
`sign_up_requires_approval` = 来自此 IP 段的任何注册的账户都需要手动批准。\
`sign_up_block` = 将拒绝来自此 IP 段的任何注册。\
`no_access` = 将完全拒绝来自此 IP 段的任何活动。\
**版本历史:**\
4.0.0 - 添加

### `comment` {#comment}

**描述:** 此 IP 块的记录原因。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `created_at` {#created_at}

**描述:** IP 屏蔽的创建时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.0.0 - 添加

### `expires_at` {#expires_at}

**描述:** IP 屏蔽的过期时间。\
**类型:** {{<nullable>}} ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref page="methods/admin/ip_blocks" caption="admin/ip_blocks API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/ip_block_serializer.rb" caption="app/serializers/rest/admin/ip_block_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::IpBlock" raw_link="/entities/Admin_IpBlock/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
