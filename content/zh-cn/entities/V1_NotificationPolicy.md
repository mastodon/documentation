---
title: V1::NotificationPolicy
description: 表示用户的通知过滤策略。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/v1_NotificationPolicy",
]
---

{{< hint style="warning" >}}
此版本的通知过滤策略 API 已弃用，且未在任何版本中发布。请参考[当前版本]({{< relref "entities/NotificationPolicy">}}) 。
{{</ hint >}}

## 属性

### `filter_not_following` {#filter_not_following}

**描述:** 是否过滤来自用户未关注帐户的通知。\
**类型:** 布尔值\
**版本历史:**\
4.3.0 - 添加

### `filter_not_followers` {#filter_not_followers}

**描述:** 是否过滤来自未关注用户的帐户的通知。\
**类型:** 布尔值\
**版本历史:**\
4.3.0 - 添加

### `filter_new_accounts` {#filter_new_accounts}

**描述:** 是否过滤来自过去 30 天内创建的帐户的通知。\
**类型:** 布尔值\
**版本历史:**\
4.3.0 - 添加

### `filter_private_mentions` {#filter_private_mentions}

**描述:** 是否过滤私下提及的通知。对由用户发起的私下提及的回复，以及用户关注的帐户发起的私下提及永远不会被过滤。\
**类型:** 布尔值\
**版本历史:**\
4.3.0 - 添加

### `summary` {#summary}

**描述:** 已过滤通知的摘要
**类型:** Hash\
**版本历史:**\
4.3.0 - 添加

### `summary[pending_requests_count]` {#pending_requests_count}

**描述:** 用户收到但未忽略的已过滤通知的来源帐户的数量。上限为 100。
**类型:** 整数\
**版本历史:**\
4.3.0 - 添加

### `summary[pending_notifications_count]` {#pending_notifications_count}

**描述:** 未忽略的已过滤通知的总数。可能不准确。
**类型:** 整数\
**版本历史:**\
4.3.0 - 添加

## 示例

```json

{
  "filter_not_following": false,
  "filter_not_followers": false,
  "filter_new_accounts": false,
  "filter_private_mentions": true,
  "summary": {
    "pending_requests_count": 0,
    "pending_notifications_count": 0
  }
}

```

## 另请参考

{{< page-relref ref="entities/NotificationPolicy" caption="NotificationPolicy（已发布版本）" >}}

{{< page-relref ref="methods/notifications" caption="notifications API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/v1/notification_policy_serializer.rb" caption="app/serializers/rest/v1/notification_policy_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="V1::NotificationPolicy" raw_link="/entities/V1_NotificationPolicy/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
