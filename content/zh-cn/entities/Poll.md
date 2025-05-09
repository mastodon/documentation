---
title: Poll
description: 表示被附加到嘟文的投票。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/poll",
  "/entities/Poll",
  "/api/entities/poll",
  "/api/entities/Poll",
]
---

## 示例

```json
{
  "id": "34830",
  "expires_at": "2019-12-05T04:05:08.302Z",
  "expired": true,
  "multiple": false,
  "votes_count": 10,
  "voters_count": null,
  "voted": true,
  "own_votes": [
    1
  ],
  "options": [
    {
      "title": "accept",
      "votes_count": 6
    },
    {
      "title": "deny",
      "votes_count": 4
    }
  ],
  "emojis": []
}
```

## 属性

### `id` {#id}

**描述:** 数据库中投票的ID。\
**类型:** 字符串（从整数转换而来，但不保证是数字）\
**版本历史:**\
2.8.0 - 添加

### `expires_at` {#expires_at}

**描述:** 投票结束的时间。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime))，如果投票永不结束，则为 null\
**版本历史:**\
2.8.0 - 添加

### `expired` {#expired}

**描述:** 投票当前是否已结束？\
**类型:** 布尔值\
**版本历史:**\
2.8.0 - 添加

### `multiple` {#multiple}

**描述:** 投票是否允许多选？\
**类型:** 布尔值\
**版本历史:**\
2.8.0 - 添加

### `votes_count` {#votes_count}

**描述:** 投票收到的票数。\
**类型:** 整数\
**版本历史:**\
2.8.0 - 添加

### `voters_count` {#voters_count}

**描述:** 在一个多选投票中，有多少个独立账户进行了投票。\
**类型:** {{<nullable>}} 整数，如果 `multiple` 为 false，则为 null。\
**版本历史:**\
2.8.0 - 添加

### `options` {#options}

**描述:** 投票的选项。\
**类型:** [Poll::Option](#Option) 数组\
**版本历史:**\
2.8.0 - 添加

### `emojis` {#emojis}

**描述:** 用于渲染投票选项的自定义表情。\
**类型:** [CustomEmoji]({{< relref "entities/CustomEmoji" >}}) 数组\
**版本历史:**\
2.8.0 - 添加

### `voted` {{%optional%}} {#voted}

**描述:** 当使用用户令牌调用对应的 API 时，该令牌的授权用户是否已投票？\
**类型:** 布尔值\
**版本历史:**\
2.8.0 - 添加

### `own_votes` {{%optional%}} {#own_votes}

**描述:** 当使用用户令牌调用对应的 API 时，该令牌的授权用户选择了哪些选项？ 包含 `options` 的索引值数组。\
**类型:** 整数数组\
**版本历史:**\
2.8.0 - 添加

## Poll::Option 属性 {#Option}

### `title` {#option-title}

**描述:** 投票选项的文本值。\
**类型:** 字符串\
**版本历史:**\
2.8.0 - 添加

#### `votes_count` {#option-votes_count}

**描述:** 此选项收到的总票数。\
**类型:** {{<nullable>}} 整数，如果结果尚未发布，则为 null。\
**版本历史:**\
2.8.0 - 添加

## 参见

{{< page-relref ref="entities/Status#poll" caption="嘟文 (`poll` 属性)" >}}

{{< page-relref ref="methods/polls" caption="polls API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/poll_serializer.rb" caption="app/serializers/rest/poll_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Poll" raw_link="/entities/Poll/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
