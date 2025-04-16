---
title: CustomEmoji
description: 表示一个自定义表情。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/emoji",
  "/entities/Emoji",
	"/entities/customemoji",
  "/entities/CustomEmoji",
  "/api/entities/emoji",
  "/api/entities/Emoji",
	"/api/entities/customemoji",
  "/api/entities/CustomEmoji",
]
---

## 示例

```json
{
  "shortcode": "blobaww",
  "url": "https://files.mastodon.social/custom_emojis/images/000/011/739/original/blobaww.png",
  "static_url": "https://files.mastodon.social/custom_emojis/images/000/011/739/static/blobaww.png",
  "visible_in_picker": true,
  "category": "Blobs"
}
```

## 属性

### `shortcode` {#shortcode}

**描述:** 自定义表情的名称。\
**类型:** 字符串\
**版本历史:**\
2.0.0 - 添加

### `url` {#url}

**描述:** 自定义表情的链接。\
**类型:** 字符串 (URL)\
**版本历史:**\
2.0.0 - 添加

### `static_url` {#static_url}

**描述:** 自定义表情的静态副本的链接。\
**类型:** 字符串 (URL)\
**版本历史:**\
2.0.0 - 添加

### `visible_in_picker` {#visible_in_picker}

**描述:** 此表情是否在选择器中可见或不公开列出。\
**类型:** 布尔值\
**版本历史:**\
2.0.0 - 添加

### `category` {#category}

**描述:** 用于在选择器中对自定义表情进行排序。\
**类型:** {{<nullable>}} 字符串\
**版本历史:**\
3.0.0 - 添加

## 参见

{{< page-relref ref="methods/custom_emojis" caption="GET /api/v1/custom_emojis" >}}

{{< page-relref ref="entities/Status#emojis" caption="Status (`emojis` attribute)" >}}

{{< page-relref ref="entities/Announcement#emojis" caption="Announcement (`emojis` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/custom_emoji_serializer.rb" caption="app/serializers/rest/custom_emoji_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="CustomEmoji" raw_link="/entities/CustomEmoji/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
