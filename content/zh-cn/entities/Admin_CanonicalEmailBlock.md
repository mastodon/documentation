---
title: Admin::CanonicalEmailBlock
description: 表示一个标准电子邮件屏蔽（将被哈希处理）。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-canonicalemailblock",
  "/entities/Admin-CanonicalEmailBlock",
  "/entities/admin_canonicalemailblock",
  "/entities/Admin_CanonicalEmailBlock",
  "/api/entities/admin-canonicalemailblock",
  "/api/entities/Admin-CanonicalEmailBlock",
  "/api/entities/admin_canonicalemailblock",
  "/api/entities/Admin_CanonicalEmailBlock",
]
---

## 示例

```json
{
	"id": "2",
	"canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
}
```

## 属性

### `id` {#id}

**描述:** 数据库中电子邮件屏蔽的 ID。\
**类型:** 字符串 (从整数转换，但不能保证是数字)\
**版本历史:**\
4.0.0 - 添加

### `canonical_email_hash` {#canonical_email_hash}

**描述:** 标准电子邮件地址的 SHA256 哈希值。\
**类型:** 字符串 (SHA256)\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref ref="methods/admin/canonical_email_blocks" caption="admin/canonical_email_blocks API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/canonical_email_block_serializer.rb" caption="app/serializers/rest/admin/canonical_email_block_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::CanonicalEmailBlock" raw_link="/entities/Admin_CanonicalEmailBlock/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
