---
title: NotificationRequest
description: 表示来自特定用户的被过滤的通知组。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/NotificationRequest",
]
---

## 属性

### `id` {#id}

**描述:** 数据库中通知请求的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证为数字)\
**版本历史:**\
4.3.0 - 添加

### `created_at` {#created_at}

**描述:** 通知请求的时间戳，即来自该用户的第一个被过滤的通知的创建时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.3.0 - 添加

### `updated_at` {#updated_at}

**描述:** 上次更新通知请求的时间戳。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.3.0 - 添加

### `account` {#account}

**描述:** 执行了生成过滤通知的操作的帐户。\
**类型:** [Account]({{< relref "entities/Account" >}})\
**版本历史:**\
4.3.0 - 添加

### `notifications_count` {#notifications_count}

**描述:** 此帐户有多少通知被过滤。\
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

### `last_status` {{%optional%}} {#last_status}

**描述:** 与该帐户的过滤通知关联的最新嘟文。\
**类型:** [Status]({{< relref "entities/Status" >}})\
**版本历史:**\
4.3.0 - 添加

## 示例

```json

{
  "id": "112456967201894256",
  "created_at": "2024-05-17T14:45:41.171Z",
  "updated_at": "2024-05-17T14:45:41.171Z",
  "notifications_count": "1",
  "account": {
    "id": "971724",
    "username": "zsc",
    "acct": "zsc",
    // ...
  },
  "last_status": {
    "id": "103186126728896492",
    "created_at": "2019-11-23T07:49:01.940Z",
    "in_reply_to_id": "103186038209478945",
    "in_reply_to_account_id": "14715",
    // ...
    "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
    // ...
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    // ...
    "mentions": [
      {
        "id": "14715",
        "username": "trwnh",
        "url": "https://mastodon.social/@trwnh",
        "acct": "trwnh"
      }
    ],
    // ...
  }
}

```

## 另请参阅

{{< page-relref ref="methods/notifications" caption="notifications API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/notification_request_serializer.rb" caption="app/serializers/rest/notification_request_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="NotificationRequest" raw_link="/entities/NotificationRequest/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
