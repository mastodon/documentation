---
title: StatusSource
description: 以纯文本形式表示嘟文的来源。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/statussource",
  "/entities/StatusSource",
  "/api/entities/statussource",
  "/api/entities/StatusSource",
]
---

## 示例

```json
{
  "id": "108942703571991143",
  "text": "this is a status that will be edited",
  "spoiler_text": ""
}
```

## 属性

### `id` {#id}

**描述:** 嘟文在数据库中的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证一定为数字)\
**版本历史:**\
3.5.0 - 新增

### `text` {#text}

**描述:** 用于构成嘟文的纯文本。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 新增

### `spoiler_text` {#spoiler_text}

**描述:** 用于构成嘟文的主题或内容警告的纯文本。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 新增

## 参见

{{< page-relref ref="methods/statuses#source" caption="GET /api/v1/statuses/:id/source" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/status_source_serializer.rb" caption="app/serializers/rest/status_source_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="StatusSource" raw_link="/entities/StatusSource/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
