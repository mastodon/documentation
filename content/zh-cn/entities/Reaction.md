---
title: Reaction
description: 表示对公告的一个表情回应。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/announcementreaction",
  "/entities/AnnouncementReaction",
  "/entities/reaction",
  "/entities/Reaction",
  "/api/entities/announcementreaction",
  "/api/entities/AnnouncementReaction",
  "/api/entities/reaction",
  "/api/entities/Reaction",
]
---

## 示例

```json
[
    {
      "name": "bongoCat",
      "count": 9,
      "me": false,
      "url": "https://files.mastodon.social/custom_emojis/images/000/067/715/original/fdba57dff7576d53.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/067/715/static/fdba57dff7576d53.png"
    },
    {
      "name": "🤔",
      "count": 1,
      "me": true
    }
]
```

## 属性

### `name` {#name}

**描述:** 用于回应的表情。可以是 Unicode 表情，也可以是自定义表情的短代码。\
**类型:** 字符串\
**版本历史:**\
3.1.0 - 添加

### `count` {#count}

**描述:** 添加此回应的用户总数。\
**类型:** 整数\
**版本历史:**\
3.1.0 - 添加

### `me` {{%optional%}} {#me}

**描述:** 如果存在当前已授权用户：该授权用户是否添加了此回应？\
**类型:** 布尔值\
**版本历史:**\
3.1.0 - 添加

### `url` {{%optional%}} {#url}

**描述:** 如果回应是自定义表情：指向自定义表情的链接。\
**类型:** 字符串 (URL)\
**版本历史:**\
3.1.0 - 添加

### `static_url` {{%optional%}} {#static_url}

**描述:** 如果回应是自定义表情：指向非动画版本自定义表情的链接。\
**类型:** 字符串 (URL)\
**版本历史:**\
3.1.0 - 添加

## 参见

{{< page-relref ref="methods/announcements#put-reactions" caption="向公告添加回应" >}}

{{< page-relref ref="methods/announcements#delete-reactions" caption="从公告中删除回应" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/reaction_serializer.rb" caption="app/serializers/rest/reaction_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Reaction" raw_link="/entities/Reaction/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
