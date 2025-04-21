---
title: Admin::EmailDomainBlock
description: 表示一个不能用于注册的电子邮件域名。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-emaildomainblock",
  "/entities/Admin-EmailDomainBlock",
  "/entities/admin_emaildomainblock",
  "/entities/Admin_EmailDomainBlock",
  "/api/entities/admin-emaildomainblock",
  "/api/entities/Admin-EmailDomainBlock",
  "/api/entities/admin_emaildomainblock",
  "/api/entities/Admin_EmailDomainBlock",
]
---

## 示例

```json
{
  "id": "1",
  "domain": "foo",
  "created_at": "2022-11-16T06:09:36.176Z",
  "history": [
    {
      "day": "1668556800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668470400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668384000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668297600",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668211200",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668124800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668038400",
      "accounts": "0",
      "uses": "0"
    }
  ]
}
```

## 属性

### `id` {#id}

**描述:** 数据库中 EmailDomainBlock 的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证一定是数字)\
**版本历史:**\
4.0.0 - 添加

### `domain` {#domain}

**描述:** 不允许用于注册的电子邮件域名。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `created_at` {#created_at}

**描述:** 该电子邮件域名何时被禁止用于注册。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.0.0 - 添加

### `history` {#history}

**描述:** 给定日期（通常是过去一周）的使用统计信息。\
**类型:** 哈希值的数组\
**版本历史:**\
4.0.0 - 添加

#### `history[][day]` {#history-day}

**描述:** 给定日期午夜的 UNIX 时间戳。\
**类型:** 字符串 (UNIX 时间戳)\
**版本历史:**\
4.0.0 - 添加

#### `history[][accounts]` {#history-accounts}

**描述:** 当天使用该电子邮件域名尝试注册的帐户数。\
**类型:** 字符串 (从整数转换而来)\
**版本历史:**\
4.0.0 - 添加

#### `history[][uses]` {#history-uses}

**描述:** 当天该电子邮件域名的 IP 注册尝试次数。\
**类型:** 字符串 (从整数转换而来)\
**版本历史:**\
4.0.0 - 添加

## 另请参考

{{< page-relref page="methods/admin/email_domain_blocks" caption="admin/email_domain_blocks API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/email_domain_block_serializer.rb" caption="app/serializers/rest/admin/email_domain_block_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::EmailDomainBlock" raw_link="/entities/Admin_EmailDomainBlock/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
