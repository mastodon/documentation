---
title: FilterStatus
description: 表示一条嘟文 ID，如果匹配，则应采取过滤规则操作。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/filterstatus",
	"/entities/FilterStatus",
	"/api/entities/filterstatus",
	"/api/entities/FilterStatus",
]
---

## 示例

```json
{
	"id": "1",
	"status_id": "109031743575371913"
}
```

## 属性

### `id` {#id}

**描述:** 数据库中 FilterStatus 的 ID。\
**类型:** 字符串（从整数转换而来，但不保证是一个数字）\
**版本历史:**\
4.0.0 - 添加

### `status_id` {#keyword}

**描述:** 将被过滤的嘟文的 ID。\
**类型:** 字符串（从整数转换而来，但不保证是一个数字）\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref ref="api/guidelines#filters" caption="过滤规则实现指引" >}}

{{< page-relref ref="methods/filters" caption="/api/v2/filters 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/filter_status_serializer.rb" caption="app/serializers/rest/filter_status_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="FilterStatus" raw_link="/entities/FilterStatus/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
