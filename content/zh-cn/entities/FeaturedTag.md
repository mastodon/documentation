---
title: FeaturedTag
description: 表示账户上显示的精选话题标签。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/featuredtag",
	"/entities/FeaturedTag",
  "/api/entities/featuredtag",
	"/api/entities/FeaturedTag",
]
---

## 示例

```json
{
  "id": "627",
  "name": "nowplaying",
  "url": "https://mastodon.social/@trwnh/tagged/nowplaying",
  "statuses_count": "70",
  "last_status_at": "2022-08-29"
}
```

## 属性

### `id` {#id}

**描述:** 精选话题标签在数据库中的内部 ID。\
**类型:** 字符串（从整数转换而来，但不保证一定是数字）\
**版本历史:**\
3.0.0 - 添加

### `name` {#name}

**描述:** 精选话题标签的名称。\
**类型:** 字符串\
**版本历史:**\
3.0.0 - 添加

### `url` {#url}

**描述:** 指向用户包含此话题标签的所有嘟文的链接。\
**类型:** 字符串 (URL)\
**版本历史:**\
3.3.0 - 添加

### `statuses_count` {#statuses_count}

**描述:** 包含此话题标签的已发布嘟文的数量。\
**类型:** 字符串\
**版本历史:**\
3.0.0 - 添加

### `last_status_at` {#last_status_at}

**描述:** 包含此话题标签的最新发布嘟文的日期。\
**类型:** 字符串 ([Date](/api/datetime-format#date))\
**版本历史:**\
3.0.0 - 添加

## 另请参阅

{{< page-relref ref="methods/featured_tags" caption="featured_tags API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/featured_tag_serializer.rb" caption="app/serializers/rest/featured_tag_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="FeaturedTag" raw_link="/entities/FeaturedTag/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
