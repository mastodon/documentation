---
title: Marker
description: 表示用户在时间线中最后阅读的位置。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/marker",
  "/entities/Marker",
  "/api/entities/marker",
  "/api/entities/Marker",
]
---

## 示例

```json
{
  "last_read_id": "103194548672408537",
  "version": 462,
  "updated_at": "2019-11-24T19:39:39.337Z"
}
```

## 属性

### `last_read_id` {#last_read_id}

**描述:** 最近查看的实体的 ID。\
**类型:** 字符串（从整数转换而来，但不保证一定是数字）\
3.0.0 - 添加

### `version` {#version}

**描述:** 一个递增的计数器，用于锁定以防止写冲突。\
**类型:** 整数\
**版本历史:**\
3.0.0 - 添加

### `updated_at` {#updated_at}

**描述:** 标记被设置的时间戳。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
3.0.0 - 添加

## 参见

{{< page-relref ref="methods/markers" caption="markers API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/marker_serializer.rb" caption="app/serializers/rest/marker_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Marker" raw_link="/entities/Marker/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
