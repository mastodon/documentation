---
title: FilterResult
description: 表示关键词与给定嘟文匹配的过滤规则。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/filterresult",
	"/entities/FilterResult",
  "/api/entities/filterresult",
	"/api/entities/FilterResult",
]
---

## 示例

```json
{
  "filter": {
    "id": "3",
    "title": "Hide completely",
    "context": [
      "home"
    ],
    "expires_at": "2022-09-20T17:27:39.296Z",
    "filter_action": "hide"
  },
  "keyword_matches": [
    "bad word"
  ],
  "status_matches": [
    "109031743575371913"
  ]
}
```

## 属性

### `filter` {#filter}

**描述:** 命中的过滤规则。\
**类型:** [Filter]({{< relref "entities/Filter" >}})\
**版本历史:**\
4.0.0 - 添加

### `keyword_matches` {#keyword_matches}

**描述:** 过滤规则中命中的关键词。\
**类型:** {{<nullable>}} 字符串数组，或 null\
**版本历史:**\
4.0.0 - 添加

### `status_matches` {#status_matches}

**描述:** 过滤规则中命中的嘟文 ID。\
**类型:** {{<nullable>}} 字符串数组，或 null\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref ref="api/guidelines#filters" caption="过滤规则实现指引" >}}

{{< page-relref ref="methods/filters" caption="/api/v2/filters 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/filter_result_serializer.rb" caption="app/serializers/rest/filter_result_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="FilterResult" raw_link="/entities/FilterResult/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
