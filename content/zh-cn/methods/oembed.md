---
title: oembed API 方法
description: 用于生成 OEmbed 预览。
menu:
  docs:
    weight: 110
    name: oembed
    parent: methods
    identifier: methods-oembed
aliases: [
  "/methods/oembed",
  "/api/methods/oembed",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 以 JSON 格式获取 OEmbed 信息 {#get}

```http
GET /api/oembed HTTP/1.1
```

**返回：** OEmbed 元数据\
**OAuth：** 公开\
**版本历史：**\
1.0.0 - 添加

#### 请求
##### 查询参数

url
: {{<required>}} 字符串。嘟文的 URL。

maxwidth
: 数字。iframe 的宽度。默认为 400

maxheight
: 数字。iframe 的高度。默认为 null

#### 响应
##### 200: OK

表示 OEmbed “富媒体 (rich)” 预览，带有相关的 iframe 和元数据。

```json
{
  "type": "rich",
  "version": "1.0",
  "title": "trwnh 的新嘟文",
  "author_name": "infinite love ⴳ",
  "author_url": "https://mastodon.social/@trwnh",
  "provider_name": "mastodon.social",
  "provider_url": "https://mastodon.social/",
  "cache_age": 86400,
  "html": "<iframe src=\"https://mastodon.social/@trwnh/99664077509711321/embed\" class=\"mastodon-embed\" style=\"max-width: 100%; border: 0\" width=\"400\" allowfullscreen=\"allowfullscreen\"></iframe><script src=\"https://mastodon.social/embed.js\" async=\"async\"></script>",
  "width": 400,
  "height": null
}
```

##### 404: Not found

对于给定的 URL，未找到嘟文

```json
{
  "error": "Record not found"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/oembed_controller.rb" caption="app/controllers/api/oembed_controller.rb" >}}

{{< translation-status-zh-cn raw_title="oembed API methods" raw_link="/methods/oembed/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
