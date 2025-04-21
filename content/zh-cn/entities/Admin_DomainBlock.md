---
title: Admin::DomainBlock
description: 表示被限制联合的域名。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-domainblock",
  "/entities/Admin-DomainBlock",
  "/entities/admin_domainblock",
  "/entities/Admin_DomainBlock",
  "/api/entities/admin-domainblock",
  "/api/entities/Admin-DomainBlock",
  "/api/entities/admin_domainblock",
  "/api/entities/Admin_DomainBlock",
]
---

## 示例

```json
{
  "id": "1",
  "domain": "example.com",
  "digest": "a379a6f6eeafb9a55e378c118034e2751e682fab9f2d30ab13d2125586ce1947",
  "created_at": "2022-11-16T08:15:34.238Z",
  "severity": "noop",
  "reject_media": false,
  "reject_reports": false,
  "private_comment": null,
  "public_comment": null,
  "obfuscate": false
}
```

## 属性

### `id` {#id}

**描述:** 数据库中 DomainBlock 的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证一定是数字)\
**版本历史:**\
4.0.0 - 添加

### `domain` {#domain}

**描述:** 不允许进行联合的域名。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `digest` {#digest}

**描述:** 不允许进行联合的域名的 sha256 十六进制摘要。\
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

### `created_at` {#created_at}

**描述:** 该域名被阻止进行联合的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.0.0 - 添加

### `severity` {#severity}

**描述:** 将应用于此域名屏蔽的策略。\
**类型:** 字符串 (可枚举的 oneOf)\
`silence` = 默认情况下，来自此域名的帐户发布的嘟文将被隐藏\
`suspend` = 来自此域名的所有传入数据将被拒绝\
`noop` = 不执行任何操作。允许拒绝媒体或举报\
**版本历史:**\
4.0.0 - 添加

### `reject_media` {#reject_media}

**描述:** 是否拒绝来自此域名的媒体附件\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

### `reject_reports` {#reject_reports}

**描述:** 是否拒绝来自此域名的举报\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

### `private_comment` {#private_comment}

**描述:** \
**类型:** {{<nullable>}} 字符串\
**版本历史:**\
4.0.0 - 添加

### `public_comment` {#public_comment}

**描述:** \
**类型:** {{<nullable>}} 字符串\
**版本历史:**\
4.0.0 - 添加

### `obfuscate` {#obfuscate}

**描述:** 是否在公开展示时混淆该被屏蔽的域名\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref page="methods/admin/domain_blocks" caption="admin/domain_blocks API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/domain_block_serializer.rb" caption="app/serializers/rest/admin/domain_block_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::DomainBlock" raw_link="/entities/Admin_DomainBlock/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
