---
title: custom_emojis
description: >-
  Each site can define and upload its own custom emoji to be attached to
  profiles or statuses.
menu:
  docs:
    weight: 30
    parent: methods-instance
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/custom_emojis" title="Custom emoji" >}}
{{< api-method-description >}}

Returns custom emojis that are available on the server.

**Returns:** Array of Emoji\
**OAuth:** Public\
**Version history:**\
2.0.0 - added\
3.0.0 - optional `category` added to response

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample response from mastodon.social
{{< endapi-method-response-example-description >}}


```javascript
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
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


