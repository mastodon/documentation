---
title: Notification
description: 表示与用户相关的事件通知。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/notification",
  "/entities/Notification",
  "/entities/notification",
  "/entities/Notification",
]
---

## 属性

### `id` {#id}

**描述:** 数据库中通知的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证是一个数字)\
**版本历史:**\
0.9.9 - 添加

### `type` {#type}

**描述:** 导致通知的事件类型。\
**类型:** 字符串 (可枚举 oneOf)\
`mention` = 有人在他们的嘟文中提到了你\
`status` = 你启用了发嘟通知的用户发布了嘟文\
`reblog` = 有人转发了你的一条嘟文\
`follow` = 有人关注了你\
`follow_request` = 有人请求关注你\
`favourite` = 有人喜欢了你的一条嘟文\
`poll` = 你投票或创建的投票已结束\
`update` = 你转发的嘟文已被编辑\
`admin.sign_up` = 有人注册了（可选择发送给管理员）\
`admin.report` = 有新的举报被提交\
`severed_relationships` = 由于管理或屏蔽事件，你的一些关注关系已被切断\
`moderation_warning` = 管理员已对你的帐户采取了行动或向你发送了警告\
**版本历史:**\
0.9.9 - 添加\
2.8.0 - 添加 `poll`\
3.1.0 - 添加 `follow_request`\
3.3.0 - 添加 `status`\
3.5.0 - 添加 `update` and `admin.sign_up`\
4.0.0 - 添加 `admin.report`\
4.3.0 - 添加 `severed_relationships` and `moderation_warning`

### `group_key` {#group_key}

**描述:** 类似通知共享的群组键，用于分组通知功能。应被视为不透明，但可以假定未分组的通知具有 `group_key` 形式 `ungrouped-{notification_id}`。
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

### `created_at` {#created_at}

**描述:** 通知的时间戳。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
0.9.9 - 添加

### `account` {#account}

**描述:** 执行了生成通知的操作的帐户。\
**类型:** [Account]({{< relref "entities/Account" >}})\
**版本历史:**\
0.9.9 - 添加

### `status` {{%optional%}} {#status}

**描述:** 作为通知对象的嘟文。当通知的 `type` 为 `favourite`、`reblog`、`status`、`mention`、`poll` 或 `update` 时附加。\
**类型:** [Status]({{< relref "entities/Status" >}})\
**版本历史:**\
0.9.9 - 添加

### `report` {{%optional%}} {#report}

**描述:** 作为通知对象的举报。当通知的 `type` 为 `admin.report` 时附加。\
**类型:** [Report]({{< relref "entities/Report" >}})\
**版本历史:**\
4.0.0 - 添加

### `event` {{%optional%}} {#relationship_severance_event}

**描述:** 导致关注关系中断的事件摘要。当通知的 `type` 为 `severed_relationships` 时附加。\
**类型:** [RelationshipSeveranceEvent]({{< relref "entities/RelationshipSeveranceEvent" >}})\
**版本历史:**\
4.3.0 - 添加

### `moderation_warning` {{%optional%}} {#moderation_warning}

**描述:** 导致通知的管理警告。当通知的 `type` 为 `moderation_warning` 时附加。\
**类型:** [AccountWarning]({{< relref "entities/AccountWarning" >}})\
**版本历史:**\
4.3.0 - 添加

## 示例

### Mention

```json

  {
    "id": "34975861",
    "type": "mention",
    "created_at": "2019-11-23T07:49:02.064Z",
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    "status": {
      "id": "103186126728896492",
      "created_at": "2019-11-23T07:49:01.940Z",
      "in_reply_to_id": "103186038209478945",
      "in_reply_to_account_id": "14715",
      // ...
    }
  }
```

### Favourite

```json
  {
    "id": "34975535",
    "type": "favourite",
    "created_at": "2019-11-23T07:29:18.903Z",
    "account": {
      "id": "297420",
      "username": "haskal",
      "acct": "haskal@cybre.space",
      // ...
    },
    "status": {
      "id": "103186046267791694",
      "created_at": "2019-11-23T07:28:34.210Z",
      // ...
      "account": {
        "id": "14715",
        "username": "trwnh",
        "acct": "trwnh",
        // ...
      },
      // ...
    }
  }
```

## 另请参考

{{< page-relref ref="methods/notifications" caption="notifications API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/notification_serializer.rb" caption="app/serializers/rest/notification_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Notification" raw_link="/entities/Notification/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
