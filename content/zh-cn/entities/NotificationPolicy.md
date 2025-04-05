---
title: NotificationPolicy
description: 表示用户的通知过滤策略。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/NotificationPolicy",
]
---

## 属性

### `for_not_following` {#for_not_following}

**描述:** 是否 `accept`（接受）、`filter`（过滤）或 `drop`（丢弃）来自用户未关注帐户的通知。`drop` 将完全阻止通知对象的创建（不会阻止底层活动），`filter` 会将其标记为已过滤，而 `accept` 不会影响其处理。\
**类型:** 字符串 (`accept`, `filter` or `drop` 之一)\
**版本历史:**\
4.3.0 - 新增

### `for_not_followers` {#for_not_followers}

**描述:** 是否 `accept`（接受）、`filter`（过滤）或 `drop`（丢弃）来自未关注用户的帐户的通知。`drop` 将完全阻止通知对象的创建（不会阻止底层活动），`filter` 会将其标记为已过滤，而 `accept` 不会影响其处理。\
**类型:** 字符串 (`accept`, `filter` or `drop` 之一)\
**版本历史:**\
4.3.0 - 新增

### `for_new_accounts` {#for_new_accounts}

**描述:** 是否 `accept`（接受）、`filter`（过滤）或 `drop`（丢弃）来自过去 30 天内创建的帐户的通知。`drop` 将完全阻止通知对象的创建（不会阻止底层活动），`filter` 会将其标记为已过滤，而 `accept` 不会影响其处理。\
**类型:** 字符串 (`accept`, `filter` or `drop` 之一)\
**版本历史:**\
4.3.0 - 新增

### `for_private_mentions` {#for_private_mentions}

**描述:** 是否 `accept`（接受）、`filter`（过滤）或 `drop`（丢弃）来自私有提及的通知。`drop` 将完全阻止通知对象的创建（不会阻止底层活动），`filter` 会将其标记为已过滤，而 `accept` 不会影响其处理。对用户发起的私有提及的回复，以及用户关注的帐户，始终被允许，无论此值如何。\
**类型:** 字符串 (`accept`, `filter` or `drop` 之一)\
**版本历史:**\
4.3.0 - 新增

### `for_limited_accounts` {#for_limited_accounts}

**描述:** 是否 `accept`（接受）、`filter`（过滤）或 `drop`（丢弃）来自被管理员限制的帐户的通知。`drop` 将完全阻止通知对象的创建（不会阻止底层活动），`filter` 会将其标记为已过滤，而 `accept` 不会影响其处理。\
**类型:** 字符串 (`accept`, `filter` or `drop` 之一)\
**版本历史:**\
4.3.0 - 新增

### `summary` {#summary}

**描述:** 已过滤通知的摘要。\
**类型:** Hash\
**版本历史:**\
4.3.0 - 新增

### `summary[pending_requests_count]` {#pending_requests_count}

**描述:** 用户收到的过滤后且未处理通知的来源帐户的数量。上限为 100。\
**类型:** 整数\
**版本历史:**\
4.3.0 - 新增

### `summary[pending_notifications_count]` {#pending_notifications_count}

**描述:** 过滤后未处理的通知总数。可能不准确。\
**类型:** 整数\
**版本历史:**\
4.3.0 - 新增

## 示例

```json

{
  "for_not_following": "accept",
  "for_not_followers": "accept",
  "for_new_accounts": "accept",
  "for_private_mentions": "drop",
  "for_limited_accounts": "filter",
  "summary": {
    "pending_requests_count": 0,
    "pending_notifications_count": 0
  }
}

```

## 另请参考

{{< page-relref ref="methods/notifications" caption="notifications API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/notification_policy_serializer.rb" caption="app/serializers/rest/notification_policy_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="NotificationPolicy" raw_link="/entities/NotificationPolicy/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
