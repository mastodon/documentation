---
title: trends API 方法
description: 查看当前使用频率高于平常的话题标签。
menu:
  docs:
    weight: 10
    name: trends
    parent: methods-instance
    identifier: methods-trends
aliases: [
  "/methods/trends",
  "/api/methods/trends",
  "/methods/instance/trends",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看热门话题标签 {#tags}

```http
GET /api/v1/trends/tags HTTP/1.1
```

过去一周内使用频率较高的话题标签。

**返回：** [Tag]({{< relref "entities/Tag" >}}) 数组\
**OAuth：** 公开\
**版本历史：**\
3.0.0 - 新增\
3.5.0 - 方法签名从 `GET /api/v1/trends` 更改为 `GET /api/v1/trends/tags`。 前者是一个已弃用的别名，将来可能会被删除。

#### 请求

##### 查询参数

limit
: 整数。返回的最大结果数。默认为 10 个标签。最多 20 个标签。

offset
: 整数。跳过前 n 个结果。

#### 响应
##### 200: OK

```json
[
  {
    "name": "hola",
    "url": "https://mastodon.social/tags/hola",
    "history": [
      {
        "day": "1574726400",
        "uses": "13",
        "accounts": "10"
      },
      // ...
    ]
  },
  {
    "name": "SaveDotOrg",
    "url": "https://mastodon.social/tags/SaveDotOrg",
    "history": [
      {
        "day": "1574726400",
        "uses": "9",
        "accounts": "9"
      },
      // ...
    ]
  },
  {
    "name": "introduction",
    "url": "https://mastodon.social/tags/introduction",
    "history": [
      {
        "day": "1574726400",
        "uses": "15",
        "accounts": "14"
      },
      // ...
    ]
  },
  // ...
]
```

---

## 查看热门嘟文 {#statuses}

```http
GET /api/v1/trends/statuses HTTP/1.1
```

与其他嘟文相比，互动量更高的嘟文。

**返回：** [Status]({{< relref "entities/Status" >}}) 数组\
**OAuth：** 公开\
**版本历史：**\
3.5.0 - 新增

#### 请求
##### 查询参数

limit
: 整数。返回的最大结果数。默认为 20 个嘟文。最多 40 个嘟文。

offset
: 整数。跳过前 n 个结果。

#### 响应
##### 200: OK

```json
[
  {
    "id": "108910940413327534",
    "created_at": "2022-08-30T08:44:26.366Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    // ...
    "content": "<p>In order to prevent such incidents from happening in the future, we are implementing a fixed set of internal guidelines which must be met before any media content can be shared on our social media platforms. The distribution of material which promotes a message of racism or sexism is unacceptable. We can do better and in the future we will do better.</p><p>We apologize again for this incident and can assure you that it will not happen again.</p><p>Your Tutanota Team</p>",
    // ...
  },
  // ...
]
```

---

## 查看热门链接 {#links}

```http
GET /api/v1/trends/links HTTP/1.1
```

与其他链接相比，被分享次数更多的链接。

**返回：** [Trends::Link]({{< relref "entities/PreviewCard#trends-link" >}}) 数组\
**OAuth：** 公开\
**版本历史：**\
3.5.0 - 新增

#### 请求
##### 查询参数

limit
: 整数。返回的最大结果数。默认为 10 个链接。最多 20 个链接。

offset
: 整数。跳过前 n 个结果。

#### 响应
##### 200: OK

```json
[
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
  },
  // ...
]
```

---

## 另请参阅

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/trends/links_controller.rb" caption="app/controllers/api/v1/trends/links_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/trends/statuses_controller.rb" caption="app/controllers/api/v1/trends/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/trends/tags_controller.rb" caption="app/controllers/api/v1/trends/tags_controller.rb" >}}

{{< translation-status-zh-cn raw_title="trends API methods" raw_link="/methods/trends/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
