---
title: Filter
description: 表示用户定义的过滤规则，用于确定哪些嘟文不应向用户显示。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/filter",
	"/entities/Filter",
	"/api/entities/filter",
	"/api/entities/Filter",
]
---

## 示例

```json
{
	"id": "19972",
	"title": "Test filter",
	"context": [
		"home"
	],
	"expires_at": "2022-09-20T17:27:39.296Z",
	"filter_action": "warn",
	"keywords": [
		{
			"id": "1197",
			"keyword": "bad word",
			"whole_word": false
		}
	],
	"statuses": [
		{
			"id": "1",
			"status_id": "109031743575371913"
		}
    ]
}
```

## 属性

### `id` {#id}

**描述:** 数据库中过滤规则的 ID。\
**类型:** 字符串 (从整数强制转换，但不保证一定是数字)\
**版本历史:**\
4.0.0 - 添加

### `title` {#title}

**描述:** 用户为过滤规则指定的标题。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `context` {#context}

**描述:** 过滤规则的应用到场景。\
**类型:** 字符串数组 (可枚举，anyOf)\
`home` = 首页时间线和列表\
`notifications` = 通知时间线\
`public` = 公共时间线\
`thread` = 展开的嘟文串\
`account` = 查看账户时\
**版本历史:**\
4.0.0 - 添加

### `expires_at` {#expires_at}

**描述:** 过滤规则何时不再生效。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime))，如果过滤规则永不过期，则为 null\
**版本历史:**\
4.0.0 - 添加

### `filter_action` {#filter_action}

**描述:** 当嘟文与此过滤规则匹配时要采取的操作。\
**类型:** 字符串 (可枚举，oneOf)\
`warn` = 显示警告，警告内容为命中的过滤规则的标题，并允许用户展开被过滤的嘟文。这是默认值（并且未知值应被视为等同于“warn”）。\
`hide` = 如果匹配到对应的嘟文，则不显示\
`blur` = 隐藏/模糊媒体附件，并显示警告，警告内容为命中的过滤规则的标题
**版本历史:**\
4.0.0 - 添加\
4.4.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 5) - 将 `blur` 值添加到 `filter_action` 属性

### `keywords` {#keywords}

**描述:** 此过滤规则下的关键词。\
**类型:** [FilterKeyword]({{< relref "entities/FilterKeyword" >}}) 数组\
**版本历史:**\
4.0.0 - 添加

### `statuses` {#statuses}

**描述:** 此过滤规则下的嘟文。\
**类型:** [FilterStatus]({{< relref "entities/FilterStatus" >}}) 数组\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref ref="api/guidelines#filters" caption="过滤的实现指引" >}}

{{< page-relref ref="entities/V1_Filter" caption="V1::Filter（适用于 Mastodon 3.5 及更早版本）" >}}

{{< page-relref ref="methods/filters" caption="/api/v2/filters 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/filter_serializer.rb" caption="app/serializers/rest/filter_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Filter" raw_link="/entities/Filter/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
