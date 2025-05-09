---
title: Translation
description: 表示机器翻译某些嘟文内容的结果
menu:
  docs:
    parent: entities
aliases: [
  "/api/entities/Translation",
  "/api/entities/translation",
]
---

## 示例

包含内容警告和媒体的嘟文翻译

```json
{
  "content": "<p>Hello world</p>",
  "spoiler_text": "Greatings ahead",
  "media_attachments": [
    {
      "id": "22345792",
      "description": "Status author waving at the camera"
    }
  ],
  "poll": null,
  "detected_source_language": "es",
  "provider": "DeepL.com"
}
```

包含投票的嘟文翻译：
```json
{
  "content": "<p>Should I stay or should I go?</p>",
  "spoiler_text": "",
  "media_attachments": [],
  "poll": {
    "id": "34858",
    "options": [
      {
        "title": "Stay" 
      },
      {
        "title": "Go"
      }
    ]
  },
  "detected_source_language": "ja",
  "provider": "DeepL.com"
}
```


## 属性

### `content` {#content}

**描述:** 嘟文的HTML编码的翻译内容。\
**类型:** 字符串 (HTML)\
**版本历史:**\
4.0.0 - 添加

### `spoiler_text` {#spoiler_text}

**描述:** 嘟文翻译后的内容警告。\
**类型:** 字符串\
**版本历史:**\
4.2.0 - 添加

### `poll` {{%optional%}} {#poll}

**描述:** 嘟文翻译后的投票。\
**类型:** [Translation::Poll](#Poll)\
**版本历史:**\
4.2.0 - 添加

### `media_attachments` {#media_attachments}

**描述:** 嘟文翻译后的媒体描述。\
**类型:** [Translation::Attachment](#Attachment) 的数组\
**版本历史:**\
4.2.0 - 添加

### `detected_source_language` {#detected_source_language}

**描述:** 源文本的语言，由机器翻译提供商自动检测。\
**类型:** 字符串 (ISO 639 语言代码)\
**版本历史:**\
4.0.0 - 添加

### `provider` {#provider}

**描述:** 机器翻译提供商。
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

## Translation::Poll 属性 {#Poll}

### `id` {#Poll-id}

**描述:** 投票的 ID。\
**类型:** 字符串（从整数转换而来，但不保证是数字）\
**版本历史:**\
4.2.0 - 添加

### `options` {#Poll-options}

**描述:** 翻译后的投票选项。\
**类型:** [Translation::Poll::Option](#Option) 的数组\
**版本历史:**\
4.2.0 - 添加

## Translation::Poll::Option 属性 {#Option}

### `title` {#Option-title}

**描述:** 投票选项的翻译后的标题。\
**类型:** 字符串\
**版本历史:**\
4.2.0 - 添加

## Translation::Attachment 属性 {#Attachment}

### `id` {#Attachment-id}

**描述:** 附件的 id。\
**类型:** 字符串（从整数转换而来，但不保证是数字）\
**版本历史:**\
4.2.0 - 添加

### `description` {#Attachment-description}

**描述:** 媒体附件翻译后的描述。\
**类型:** 字符串\
**版本历史:**\
4.2.0 - 添加

## 参见

{{< page-relref ref="methods/statuses#translate" caption="POST /api/v1/statuses/:id/translate" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/translation_serializer.rb" caption="app/serializers/rest/translation_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Translation" raw_link="/entities/Translation/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
