---
title: Tag
description: 表示嘟文内容中使用的话题标签。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/tag",
  "/entities/Tag",
  "/api/entities/tag",
  "/api/entities/Tag",
]
---

## 示例

```json
{
  "name": "nowplaying",
  "url": "https://mastodon.social/tags/nowplaying",
  "history": [
    {
      "day": "1574553600",
      "uses": "200",
      "accounts": "31"
    },
    {
      "day": "1574467200",
      "uses": "272",
      "accounts": "39"
    },
    {
      "day": "1574380800",
      "uses": "345",
      "accounts": "40"
    },
    {
      "day": "1574294400",
      "uses": "366",
      "accounts": "46"
    },
    {
      "day": "1574208000",
      "uses": "226",
      "accounts": "32"
    },
    {
      "day": "1574121600",
      "uses": "217",
      "accounts": "42"
    },
    {
      "day": "1574035200",
      "uses": "214",
      "accounts": "34"
    }
  ],
  "following": false
}
```

## 属性

### `name` {#name}

**描述:** # 符号后的话题标签名。\
**类型:** 字符串\
**版本历史:**\
0.9.0 - 添加

### `url` {#url}

**描述:** 实例上话题标签的链接。\
**类型:** 字符串 (URL)\
**版本历史:**\
0.9.0 - 添加

### `history` {#history}

**描述:** 给定时间段（通常为过去一周）的使用统计信息。\
**类型:** 哈希值的数组\
**版本历史:**\
2.4.1 - 添加

#### `history[][day]` {#history-day}

**描述:** 给定时间段午夜的 UNIX 时间戳。\
**类型:** 字符串 (UNIX 时间戳)\
**版本历史:**\
2.4.1 - 添加

#### `history[][uses]` {#history-uses}

**描述:** 该话题标签在当前时段被使用的次数。\
**类型:** 字符串 (从整数转换而来)\
**版本历史:**\
2.4.1 - 添加

#### `history[][accounts]` {#history-accounts}

**描述:** 当前时段使用该话题标签的帐户总数。\
**类型:** 字符串 (从整数转换而来)\
**版本历史:**\
2.4.1 - 添加

### `following` {{%optional%}} {#following}

**描述:** 当前令牌的授权用户是否正在关注此话题标签。\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

## Admin::Tag 属性 {#admin}

```json
{
  "name": "caturday",
  "url": "https://mastodon.example/tags/caturday",
  "history": [
    {
      "day": "1669507200",
      "accounts": "53",
      "uses": "56"
    },
    {
      "day": "1669420800",
      "accounts": "142",
      "uses": "171"
    },
    {
      "day": "1669334400",
      "accounts": "11",
      "uses": "11"
    },
    {
      "day": "1669248000",
      "accounts": "8",
      "uses": "9"
    },
    {
      "day": "1669161600",
      "accounts": "8",
      "uses": "20"
    },
    {
      "day": "1669075200",
      "accounts": "11",
      "uses": "11"
    },
    {
      "day": "1668988800",
      "accounts": "17",
      "uses": "22"
    }
  ],
  "id": "802",
  "trendable": true,
  "usable": true,
  "requires_review": false
}
```

### `id` {#id}

**描述:** 话题标签在数据库中的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证是数字)\
**版本历史:**\
3.5.0 - 添加

### `trendable` {#trendable}

**描述:** 该话题标签是否已被批准成为热门话题标签。\
**类型:** 布尔值\
**版本历史:**\
3.5.0 - 添加

### `usable` {#usable}

**描述:** 是否未禁用自动链接到此话题标签。\
**类型:** 布尔值\
**版本历史:**\
3.5.0 - 添加

### `requires_review` {#requires_review}

**描述:** 该话题标签是否尚未被批准成为成为热门话题标签。\
**类型:** 布尔值\
**版本历史:**\
3.5.0 - 添加

## 参见

{{< page-relref ref="entities/Search#tags" caption="搜索（`tags` 属性）" >}}

{{< page-relref ref="methods/tags" caption="tags API 方法" >}}

{{< page-relref ref="methods/featured_tags#suggestions" caption="GET /api/v1/featured_tags/suggestions" >}}

{{< translation-status-zh-cn raw_title="Tag" raw_link="/entities/Tag/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
