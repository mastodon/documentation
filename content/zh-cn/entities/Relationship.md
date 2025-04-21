---
title: Relationship
description: 表示账户之间的关系，例如关注/屏蔽/隐藏等。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/relationship",
  "/entities/Relationship",
  "/api/entities/relationship",
  "/api/entities/Relationship",
]
---

## 示例

```json
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "requested_by": false,
  "domain_blocking": false,
  "endorsed": false,
  "note": ""
}
```

## 属性

### `id` {#id}

**描述:** 账户 ID。\
**类型:** 字符串 (从整数转换而来，但不保证一定是数字)\
**版本历史:**
0.6.0 - 添加

### `following` {#following}

**描述:** 你是否正在关注此用户？\
**类型:** 布尔值\
**版本历史:**
0.6.0 - 添加

### `showing_reblogs` {#showing_reblogs}

**描述:** 你是否在你的首页时间线中接收此用户的转发？\
**类型:** 布尔值\
**版本历史:**
2.1.0 - 添加

### `notifying` {#notifying}

**描述:** 你是否为此用户启用了通知？\
**类型:** 布尔值\
**版本历史:**
3.3.0 - 添加

### `languages` {#languages}

**描述:** 你正在关注此用户的哪些语言？\
**类型:** 字符串数组 (ISO 639-1 双字符语言代码)\
**版本历史:**
4.0.0 - 添加

### `followed_by` {#followed_by}

**描述:** 此用户是否正在关注你？\
**类型:** 布尔值\
**版本历史:**
0.6.0 - 添加

### `blocking` {#blocking}

**描述:** 你是否正在屏蔽此用户？\
**类型:** 布尔值\
**版本历史:**
0.6.0 - 添加

### `blocked_by` {#blocked_by}

**描述:** 此用户是否正在屏蔽你？\
**类型:** 布尔值\
**版本历史:**
2.8.0 - 添加

### `muting` {#muting}

**描述:** 你是否正在隐藏此用户？\
**类型:** 布尔值\
**版本历史:**
1.1.0 - 添加

### `muting_notifications` {#muting_notifications}

**描述:** 你是否正在隐藏来自此用户的通知？\
**类型:** 布尔值\
**版本历史:**
2.1.0 - 添加

### `requested` {#requested}

**描述:** 你是否有对此用户待处理的关注请求？\
**类型:** 布尔值\
**版本历史:**
0.9.9 - 添加

### `requested_by` {#requested_by}

**描述:** 此用户是否请求关注你？\
**类型:** 布尔值\
**版本历史:**
4.1.0 - 添加

### `domain_blocking` {#domain_blocking}

**描述:** 你是否正在屏蔽此用户的域名？\
**类型:** 布尔值\
**版本历史:**
1.4.0 - 添加

### `endorsed` {#endorsed}

**描述:** 你是否在你的账户上推荐此用户？\
**类型:** 布尔值\
**版本历史:**
2.5.0 - 添加

### `note` {#note}

**描述:** 此用户的账户简介\
**类型:** 字符串\
**版本历史:**
3.2.0 - 添加

## 参见

{{< page-relref ref="methods/accounts#relationships" caption="GET /api/v1/accounts/relationships" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/relationship_serializer.rb" caption="app/serializers/rest/relationship_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Relationship" raw_link="/entities/Relationship/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
