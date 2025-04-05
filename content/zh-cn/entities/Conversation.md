---
title: Conversation
description: 表示具有“私下提及”可见性的会话。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/conversation",
	"/entities/Conversation",
  "/api/entities/conversation",
	"/api/entities/Conversation",
]
---

## 示例

```json
{
  "id": "418450",
  "unread": true,
  "accounts": [
    {
      "id": "482403",
      "username": "amic",
      "acct": "amic@nulled.red",
      // ...
    }
  ],
  "last_status": {
    "id": "103196583826321184",
    "created_at": "2019-11-25T04:08:24.000Z",
    "in_reply_to_id": "103196540587943467",
    "in_reply_to_account_id": "14715",
    // ...
  }
}
```

## 属性

### `id` {#id}

**描述:** 数据库中会话的 ID。\
**类型:** 字符串（从整数转换而来，但不保证是一个数字）\
**版本历史:**\
2.6.0 - 添加

### `unread` {#unread}

**描述:** 会话当前是否标记为未读？\
**类型:** 布尔值\
**版本历史:**\
2.6.0 - 添加

### `accounts` {#accounts}

**描述:** 会话的参与者。\
**类型:** [Account]({{< relref "entities/Account" >}}) 数组\
**版本历史:**\
2.6.0 - 添加

### `last_status` {#last_status}

**描述:** 会话中的最后一条嘟文。\
**类型:** {{<nullable>}} [Status]({{< relref "entities/Status" >}})\
**版本历史:**\
2.6.0 - 添加

## 参见

{{< page-relref ref="methods/conversations" caption="会话 API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/conversation_serializer.rb" caption="app/serializers/rest/conversation_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Conversation" raw_link="/entities/Conversation/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
