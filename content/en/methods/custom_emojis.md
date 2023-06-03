---
title: custom_emojis API methods
summary: >-
  Each site can define and upload its own custom emoji to be attached to
  profiles or statuses.
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

## View all custom emoji {#get}

```http
GET /api/v1/custom_emojis HTTP/1.1
```

Returns custom emojis that are available on the server.

**Returns:** Array of [CustomEmoji]({{< relref "entities/CustomEmoji" >}})\
**OAuth:** Public\
**Version history:**\
2.0.0 - added\
3.0.0 - optional `category` added to response

#### Response
##### 200: OK

Sample response from mastodon.social

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

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/custom_emojis_controller.rb" caption="app/controllers/api/v1/custom_emojis_controller.rb" >}}