---
title: List
description: 表示用户所关注的一些用户的列表。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/list",
  "/entities/List",
  "/api/entities/list",
  "/api/entities/List",
]
---

## 示例

```json
{
  "id": "12249",
  "title": "Friends"
}
```

## 属性

### `id` {#id}

**描述:** 列表的内部数据库 ID。\
**类型:** 字符串（从整数转换而来，但不保证是一个数字）\
**版本历史:**\
2.1.0 - 添加

### `title` {#title}

**描述:** 用户自定义的列表标题。\
**类型:** 字符串\
**版本历史:**\
2.1.0 - 添加

### `replies_policy` {#replies_policy}

**描述:** 应在列表中显示哪些回复。\
**类型:** 字符串（可枚举的 oneOf）\
`followed` = 显示对任何已关注用户的回复\
`list` = 显示对列表成员的回复\
`none` = 不显示对任何人的回复\
**版本历史:**\
3.3.0 - 添加

## 参见

{{< page-relref ref="methods/accounts#lists" caption="GET /api/v1/accounts/:id/lists" >}}

{{< page-relref ref="methods/lists" caption="lists API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/list_serializer.rb" caption="app/serializers/rest/list_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="List" raw_link="/entities/List/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
