---
title: V1::Filter
description: 表示用户自定义的过滤规则，用于确定哪些嘟文不应向用户显示。包含单个关键词或短语。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/v1_filter/",
  "/entities/V1_Filter",
  "/api/entities/v1_filter/",
  "/api/entities/V1_Filter",
]
---

## 示例

```json
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": "2019-11-26T09:08:06.254Z",
  "irreversible": true
}
```

## 属性

### `id` {#id}

**描述:** 数据库中过滤规则的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证一定是数字)\
**版本历史:**\
2.4.3 - 添加

### `phrase` {#phrase}

**描述:** 要过滤的文本。\
**类型:** 字符串\
**版本历史:**\
2.4.3 - 添加

### `context` {#context}

**描述:** 过滤规则的应用场景。\
**类型:** 字符串数组 (可枚举的 anyOf)\
`home` = 首页时间线和列表\
`notifications` = 通知时间线\
`public` = 公共时间线\
`thread` = 展开后的嘟文串\
`account` = 查看账户时\
**版本历史:**\
2.4.3 - 添加\
3.1.0 - 添加 `account`

### `expires_at` {#expires_at}

**描述:** 过滤规则应不再生效的时间。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime))，如果过滤规则永不过期，则为 null\
**版本历史:**\
2.4.3 - 添加

### `irreversible` {#irreversible}

**描述:** 实例是否应该删除首页和通知中该过滤规则命中的实体？请参阅[过滤规则实现指引]({{< relref "api/guidelines#filters" >}})。\
**类型:** 布尔值\
**版本历史:**\
2.4.3 - 添加

### `whole_word` {#whole_word}

**描述:** 过滤规则是否应考虑单词边界？请参阅[过滤规则实现指引]({{< relref "api/guidelines#filters" >}})。\
**类型:** 布尔值\
**版本历史:**\
2.4.3 - 添加

## 另请参阅

{{< page-relref ref="api/guidelines#filters" caption="过滤规则实现指引" >}}

{{< page-relref ref="methods/filters#v1" caption="v1 过滤规则 API" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/v1/filter_serializer.rb" caption="app/serializers/rest/v1/filter_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="V1::Filter" raw_link="/entities/V1_Filter/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
