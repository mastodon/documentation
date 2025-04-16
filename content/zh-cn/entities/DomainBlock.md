---
title: DomainBlock
description: 表示实例屏蔽的域名。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/domainblock",
  "/entities/DomainBlock",
  "/api/entities/domainblock",
  "/api/entities/DomainBlock",
]
---

## 示例

```json
{
  "domain":"daji******.com",
  "digest":"3752f63a7079d60c2de5dceb8bd7608e86a15544eb78a494a482041c3684b37f",
  "severity":"suspend",
  "comment":"Inappropriate content"
}
```

## 属性

### `domain` {#domain}

**描述:** 被屏蔽的域名。 这可能会被混淆或由部分删节。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `digest` {#digest}

**描述:** 域字符串的 SHA256 哈希摘要。\
**类型:** 字符串 (SHA256)\
**版本历史:**\
4.0.0 - 添加

### `severity` {#severity}

**描述:** 域名屏蔽的级别。\
**类型:** 字符串 (Enumerable, oneOf)\
`silence` = 来自此域的用户将从时间线、话题标签和通知中隐藏（除非你关注了该用户）。\
`suspend` = 来自此域名的传入消息将被拒绝并完全丢弃。\
**版本历史:**\
4.0.0 - 添加

### `comment` {{%optional%}} {#comment}

**描述:** 域名屏蔽的可选原因。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

## 另请参阅

{{< page-relref ref="methods/instance#domain_blocks" caption="GET /api/v1/instance/domain_blocks" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/domain_block_serializer.rb" caption="app/serializers/rest/domain_block_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="DomainBlock" raw_link="/entities/DomainBlock/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
