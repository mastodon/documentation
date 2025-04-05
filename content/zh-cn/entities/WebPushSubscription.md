---
title: WebPushSubscription
description: 表示一个对流式推送的订阅。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/pushsubscription",
  "/entities/PushSubscription",
  "/entities/webpushsubscription",
  "/entities/WebPushSubscription",
  "/api/entities/pushsubscription",
  "/api/entities/PushSubscription",
  "/api/entities/webpushsubscription",
  "/api/entities/WebPushSubscription",
]
---

## 示例

```json
{
  "id": 328183,
  "endpoint": "https://yourdomain.example/listener",
  "standard": true,
  "alerts": {
    "follow": false,
    "favourite": false,
    "reblog": false,
    "mention": true,
    "poll": false
  },
  "server_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```

## 属性

### `id` {#id}

**描述:** Web Push 订阅在数据库中的ID。\
**类型:** 字符串 (从整数转换而来，但不保证一定为数字)\
**版本历史:**\
2.4.0 - 添加

### `endpoint` {#endpoint}

**描述:** 推送通知将发送到的地址。\
**类型:** 字符串（URL）\
**版本历史:**\
2.4.0 - 添加

### `standard` {#standard}

**描述:** 推送消息是否遵循标准化规范 (RFC8030+RFC8291+RFC8292)。若为 `false`，则遵循该规范的旧版本（RFC8291 的第 4 版草案和 RFC8292 的第 1 版草案）。
**类型:** 布尔值\
**版本历史:**\
4.4.0 - 添加

### `server_key` {#server_key}

**描述:** 流式推送实例的 VAPID 密钥。\
**类型:** 字符串\
**版本历史:**\
2.4.0 - 添加

### `alerts` {#alerts}

**描述:** 哪些提醒会被传递到 `endpoint`。\
**类型:** 哈希\
**版本历史:**\
2.4.0 - 添加\
2.8.0 - 添加 `alerts[poll]`\
3.1.0 - 添加 `alerts[follow_request]`\
3.3.0 - 添加 `alerts[status]`\
3.5.0 - 添加 `alerts[update]` 和 `alerts[admin.sign_up]`\
4.0.0 - 添加 `alerts[admin.report]`

#### `alerts[mention]` {#mention}

**描述:** 当有人在嘟文中提及你时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
2.4.0 - 添加

#### `alerts[status]` {#status}

**描述:** 当启用了发嘟通知的帐户发布嘟文时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
3.3.0 - 添加

#### `alerts[reblog]` {#reblog}

**描述:** 当你创建的嘟文被其他人转发时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
2.4.0 - 添加

#### `alerts[follow]` {#follow}

**描述:** 当有人关注你时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
2.4.0 - 添加

#### `alerts[follow_request]` {#follow_request}

**描述:** 当有人请求关注你时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
3.1.0 - 添加

#### `alerts[favourite]` {#favourite}

**描述:** 当你创建的嘟文被其他人喜欢时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
2.4.0 - 添加

#### `alerts[poll]` {#poll}

**描述:** 当你投票或创建的投票结束时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
2.8.0 - 添加

#### `alerts[update]` {#update}

**描述:** 当你互动过的嘟文被编辑时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
3.5.0 - 添加

#### `alerts[admin.sign_up]` {#admin-sign_up}

**描述:** 当有新用户注册时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
3.5.0 - 添加

#### `alerts[admin.report]` {#admin-report}

**描述:** 当提交新的举报时，是否接收推送通知？\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref ref="methods/push" caption="push API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/web_push_subscription_serializer.rb" caption="app/serializers/rest/web_push_subscription_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="WebPushSubscription" raw_link="/entities/WebPushSubscription/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
