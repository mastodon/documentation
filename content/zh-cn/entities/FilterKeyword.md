---
title: FilterKeyword
description: 表示一个关键词，如果匹配，则应采取过滤规则操作。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/filterkeyword",
	"/entities/FilterKeyword",
	"/api/entities/filterkeyword",
	"/api/entities/FilterKeyword",
]
---

## 示例

```json
{
	"id": "1197",
	"keyword": "bad word",
	"whole_word": false
}
```

## 属性

### `id` {#id}

**描述:** 数据库中 FilterKeyword 的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证一定为数字)\
**版本历史:**\
4.0.0 - 添加

### `keyword` {#keyword}

**描述:** 要匹配的短语。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `whole_word` {#whole_word}

**描述:** 过滤规则是否应考虑单词边界？ 请参阅[过滤规则实现指引]({{< relref "api/guidelines#filters" >}})。\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref ref="api/guidelines#filters" caption="过滤规则实现指引" >}}

{{< page-relref ref="methods/filters" caption="/api/v2/filters 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/filter_keyword_serializer.rb" caption="app/serializers/rest/filter_keyword_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="FilterKeyword" raw_link="/entities/FilterKeyword/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
