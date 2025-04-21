---
title: custom_emojis API 方法
description: >-
  每个站点都可以定义和上传自己的自定义表情，以便附加到个人资料或嘟文。
menu:
  docs:
    weight: 30
    name: custom_emojis
    parent: methods-instance
    identifier: methods-custom_emojis
aliases: [
  "/methods/custom_emojis",
  "/api/methods/custom_emojis",
  "/methods/instance/custom_emojis"
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看所有自定义表情 {#get}

```http
GET /api/v1/custom_emojis HTTP/1.1
```

返回实例上可用的自定义表情。

**返回：** [CustomEmoji]({{< relref "entities/CustomEmoji" >}})数组\
**OAuth：** 公开\
**版本历史：**\
2.0.0 - 添加\
3.0.0 - 响应中添加了可选的 `category`

#### 响应
##### 200: OK

来自 mastodon.social 的示例响应

```json
[
  {
    "shortcode": "aaaa",
    "url": "https://files.mastodon.social/custom_emojis/images/000/007/118/original/aaaa.png",
    "static_url": "https://files.mastodon.social/custom_emojis/images/000/007/118/static/aaaa.png",
    "visible_in_picker": true
  },
  {
    "shortcode": "AAAAAA",
    "url": "https://files.mastodon.social/custom_emojis/images/000/071/387/original/AAAAAA.png",
    "static_url": "https://files.mastodon.social/custom_emojis/images/000/071/387/static/AAAAAA.png",
    "visible_in_picker": true
  },

  // [...]

  {
    "shortcode": "blobaww",
    "url": "https://files.mastodon.social/custom_emojis/images/000/011/739/original/blobaww.png",
    "static_url": "https://files.mastodon.social/custom_emojis/images/000/011/739/static/blobaww.png",
    "visible_in_picker": true,
    "category": "Blobs"
  },

  // [...]

  {
    "shortcode": "yikes",
    "url": "https://files.mastodon.social/custom_emojis/images/000/031/275/original/yikes.png",
    "static_url": "https://files.mastodon.social/custom_emojis/images/000/031/275/static/yikes.png",
    "visible_in_picker": true
  },
  {
    "shortcode": "ziltoid",
    "url": "https://files.mastodon.social/custom_emojis/images/000/017/094/original/05252745eb087806.png",
    "static_url": "https://files.mastodon.social/custom_emojis/images/000/017/094/static/05252745eb087806.png",
    "visible_in_picker": true
  }
]
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/custom_emojis_controller.rb" caption="app/controllers/api/v1/custom_emojis_controller.rb" >}}

{{< translation-status-zh-cn raw_title="custom_emojis API methods" raw_link="/methods/custom_emojis/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
