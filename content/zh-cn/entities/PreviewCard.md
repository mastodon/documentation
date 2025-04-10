---
title: PreviewCard
description: 表示使用来自 URL 的 OpenGraph 标签生成的富媒体预览卡片。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/card",
  "/entities/Card",
  "/entities/previewcard",
  "/entities/PreviewCard",
  "/api/entities/card",
  "/api/entities/Card",
  "/api/entities/previewcard",
  "/api/entities/PreviewCard",
]
---

## 示例

### 视频

```json
{
  "url": "https://www.youtube.com/watch?v=OMv_EPMED8Y",
  "title": "♪ Brand New Friend (Christmas Song!)",
  "description": "",
  "type": "video",
  "author_name": "YOGSCAST Lewis & Simon",
  "author_url": "https://www.youtube.com/user/BlueXephos",
  "provider_name": "YouTube",
  "provider_url": "https://www.youtube.com/",
  "html": "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/OMv_EPMED8Y?feature=oembed\" frameborder=\"0\" allowfullscreen=\"\"></iframe>",
  "width": 480,
  "height": 270,
  "image": "https://files.mastodon.social/preview_cards/images/014/179/145/original/9cf4b7cf5567b569.jpeg",
  "embed_url": "",
  "blurhash": "UvK0HNkV,:s9xBR%njog0fo2W=WBS5ozofV@"
}
```

### 图片

```json
{
  "url": "https://www.flickr.com/photos/tomfenskephotography/49088768431/",
  "title": "Oregon",
  "description": "",
  "type": "photo",
  "author_name": "Tom Fenske Photography",
  "author_url": "https://www.flickr.com/photos/tomfenskephotography/",
  "provider_name": "Flickr",
  "provider_url": "https://www.flickr.com/",
  "html": "",
  "width": 1024,
  "height": 427,
  "image": "https://files.mastodon.social/preview_cards/images/014/287/139/original/651b1c6976817824.jpeg",
  "embed_url": "https://live.staticflickr.com/65535/49088768431_6a4322b3bb_b.jpg",
  "blurhash": "UnE{@jt6M_oIAhjYs+ayT2WBf9ayRkkDXAj["
}
```

### 链接

```json
{
  "url": "https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code",
  "title": "‘I lost my £193,000 inheritance – with one wrong digit on my sort code’",
  "description": "When Peter Teich’s money went to another Barclays customer, the bank offered £25 as a token gesture",
  "type": "link",
  "authors": [],
  "author_name": "",
  "author_url": "",
  "provider_name": "",
  "provider_url": "",
  "html": "",
  "width": 0,
  "height": 0,
  "image": null,
  "embed_url": "",
  "blurhash": null
}
```

## 属性

### `url` {#url}

**描述:** 链接资源的地址。\
**类型:** 字符串 (URL)\
**版本历史:**\
1.0.0 - 添加

### `title` {#title}

**描述:** 链接资源的标题。\
**类型:** 字符串\
**版本历史:**\
1.0.0 - 添加

### `description` {#description}

**描述:** 预览的描述。\
**类型:** 字符串\
**版本历史:**\
1.0.0 - 添加

### `type` {#type}

**描述:** 预览卡片的类型。\
**类型:** 字符串 (可枚举, oneOf)\
`link` = 链接 OEmbed\
`photo` = 图片 OEmbed\
`video` = 视频 OEmbed\
`rich` = iframe OEmbed。当前不接受，因此实际上不会显示。\
**版本历史:**\
1.3.0 - 添加

### `authors` {#authors}

**描述:** 原始资源的作者的 Fediverse 账号。\
**类型:** Array of [PreviewCardAuthor]({{< relref "entities/PreviewCardAuthor">}})\
**版本历史:**\
4.3.0 - 添加

### `author_name` {#author_name}

**描述:** 原始资源的作者。自 4.3.0 起已弃用，客户端应改用 `authors`。\
**类型:** 字符串\
**版本历史:**\
1.3.0 - 添加\
4.3.0 - deprecated

### `author_url` {#author_url}

**描述:** 指向原始资源作者的链接。自 4.3.0 起已弃用，客户端应改用 `authors`。\
**类型:** 字符串 (URL)\
**版本历史:**\
1.3.0 - 添加\
4.3.0 - deprecated

### `provider_name` {#provider_name}

**描述:** 原始资源的提供者。\
**类型:** 字符串\
**版本历史:**\
1.3.0 - 添加

### `provider_url` {#provider_url}

**描述:** 指向原始资源提供者的链接。\
**类型:** 字符串 (URL)\
**版本历史:**\
1.3.0 - 添加

### `html` {#html}

**描述:** 用于生成预览卡片的 HTML。\
**类型:** 字符串 (HTML)\
**版本历史:**\
1.3.0 - 添加

### `width` {#height}

**描述:** 预览的宽度，以像素为单位。\
**类型:** 整数\
**版本历史:**\
1.3.0 - 添加

### `height` {#height}

**描述:** 预览的高度，以像素为单位。\
**类型:** 整数\
**版本历史:**\
1.3.0 - 添加

### `image` {#image}

**描述:** 预览缩略图。\
**类型:** {{<nullable>}} 字符串 (URL)\
**版本历史:**\
1.0.0 - 添加

### `embed_url` {#embed_url}

**描述:** 用于照片嵌入，替代自定义的 `html`。\
**类型:** 字符串 (URL)\
**版本历史:**\
2.1.0 - 添加

### `blurhash` {#blurhash}

**描述:** 由 [BlurHash 算法](https://github.com/woltapp/blurhash)计算出的哈希值，用于在媒体尚未下载时生成彩色预览缩略图。\
**类型:** {{<nullable>}} 字符串\
**版本历史:**\
3.2.0 - 添加

## Trends::Link 实体属性 {#trends-link}

```json
{
  "url": "https://www.nbcnews.com/specials/plan-your-vote-2022-elections/index.html",
  "title": "Plan Your Vote: 2022 Elections",
  "description": "Everything you need to know about the voting rules where you live, including registration, mail-in voting, changes since 2020, and more.",
  "type": "link",
  "author_name": "NBC News",
  "author_url": "",
  "provider_name": "NBC News",
  "provider_url": "",
  "html": "",
  "width": 400,
  "height": 225,
  "image": "https://files.mastodon.social/cache/preview_cards/images/045/027/478/original/0783d5e91a14fd49.jpeg",
  "embed_url": "",
  "blurhash": "UcQmF#ay~qofj[WBj[j[~qof9Fayofofayay",
  "history": [
    {
      "day": "1661817600",
      "accounts": "7",
      "uses": "7"
    },
    {
      "day": "1661731200",
      "accounts": "23",
      "uses": "23"
    },
    {
      "day": "1661644800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1661558400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1661472000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1661385600",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1661299200",
      "accounts": "0",
      "uses": "0"
    }
  ]
}
```

### `history` {#history}

**描述:** 给定日期的使用统计信息（通常是过去一周）。\
**类型:** 哈希值的数组\
**版本历史:**\
3.5.0 - 添加

#### `history[][day]` {#history-day}

**描述:** 给定日期午夜的 UNIX 时间戳。\
**类型:** 字符串 (UNIX 时间戳)\
**版本历史:**\
3.5.0 - 添加

#### `history[][accounts]` {#history-accounts}

**描述:** 当天使用该链接的已计数帐户数。\
**类型:** 字符串 (从整数转换而来)\
**版本历史:**\
3.5.0 - 添加

#### `history[][uses]` {#history-uses}

**描述:** 当天使用该链接的已计数嘟文数。\
**类型:** 字符串 (从整数转换而来)\
**版本历史:**\
3.5.0 - 添加

## 参见

{{< page-relref ref="entities/Status#card" caption="Status (`card` 属性)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/preview_card_serializer.rb" caption="app/serializers/rest/preview_card_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/trends/link_serializer.rb" caption="app/serializers/rest/trends/link_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/trends/links.rb" caption="app/models/trends/links.rb" >}}

{{< translation-status-zh-cn raw_title="PreviewCard" raw_link="/entities/PreviewCard/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
