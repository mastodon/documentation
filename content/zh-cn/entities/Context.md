---
title: Context
description: 表示给定嘟文周围的树状结构。用于重建嘟文的嘟文串。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/context",
	"/entities/Context",
  "/api/entities/context",
	"/api/entities/Context",
]
---

## 示例

```json
{
  "ancestors": [
    {
      "id": "103188938570975982",
      "created_at": "2019-11-23T19:44:00.124Z",
      "in_reply_to_id": null,
      // ...
    },
    {
      "id": "103188971072973252",
      "created_at": "2019-11-23T19:52:23.398Z",
      "in_reply_to_id": "103188938570975982",
      // ...
    },
    {
      "id": "103188982235527758",
      "created_at": "2019-11-23T19:55:08.208Z",
      "in_reply_to_id": "103188971072973252",
      // ...
    }
  ],
  "descendants": [
    {
      "id": "103189026958574542",
      "created_at": "2019-11-23T20:06:36.011Z",
      "in_reply_to_id": "103189005915505698",
      // ...
    }
  ]
}
```

## 属性

### `ancestors` {#ancestors}

**描述:** 嘟文串中的上级嘟文。\
**类型:** [Status]({{< relref "entities/Status" >}})数组\
**版本历史:**\
0.6.0 - 添加

### `descendants` {#descendants}

**描述:** 嘟文串中的下级嘟文。\
**类型:** [Status]({{< relref "entities/Status" >}})数组\
**版本历史:**\
0.6.0 - 添加

## 另请参阅

{{< page-relref ref="methods/statuses#context" caption="GET /api/v1/statuses/:id/context" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/context_serializer.rb" caption="app/serializers/rest/context_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Context" raw_link="/entities/Context/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
