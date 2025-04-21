---
title: admin/trends API 方法
description: TODO
menu:
  docs:
    name: trends
    parent: methods-admin
    identifier: methods-admin-trends
aliases: [
  "/methods/admin/measures",
  "/api/methods/admin/measures",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看热门链接 {#links}

```http
GET /api/v1/admin/trends/links HTTP/1.1
```

比其他链接分享更多的链接，包括未批准和未审核的链接。

**返回:** [Trends::Link]({{< relref "entities/PreviewCard#trends-link" >}}) 数组\
**OAuth:** 用户令牌 + `admin:read`\
**权限:** 管理分类\
**版本历史:**\
3.5.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "url": "https://twitter.com/arufa_faru/status/1594262272007753728",
    "title": "ARuFa on Twitter",
    "description": "“言葉をマネするぬいぐるみを改造してエレキギターを直接繋いでみました”",
    "type": "link",
    "author_name": "",
    "author_url": "",
    "provider_name": "Twitter",
    "provider_url": "",
    "html": "",
    "width": 400,
    "height": 225,
    "image": "https://media.chitter.xyz/cache/preview_cards/images/002/162/720/original/b5360261e8ce17fc.jpeg",
    "embed_url": "",
    "blurhash": "UNFiDM~o-oD%x[xtaxM|xaNHRkjsoft7ofWB",
    "history": [
      {
        "day": "1669507200",
        "accounts": "9",
        "uses": "9"
      },
      {
        "day": "1669420800",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1669334400",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1669248000",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1669161600",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1669075200",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668988800",
        "accounts": "0",
        "uses": "0"
      }
    ]
  },
  // ...
]
```

##### 403: Forbidden

授权用户缺少权限，或 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

## 查看热门嘟文 {#statuses}

```http
GET /api/v1/admin/trends/statuses HTTP/1.1
```

比其他嘟文互动更多的嘟文，包括未批准和未审核的嘟文。

**返回:** [Status]({{< relref "entities/Status" >}}) 数组\
**OAuth:** 用户令牌 + `admin:read`\
**权限:** 管理分类\
**版本历史:**\
3.5.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "id": "109415512969053017",
    "created_at": "2022-11-27T11:23:52.000Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    // ...
    "account": {
      "id": "109332240210946752",
      // ...
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  },
  // ...
]
```

##### 403: Forbidden

授权用户缺少权限，或 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

## 查看热门话题标签 {#tags}

```http
GET /api/v1/admin/trends/tags HTTP/1.1
```

过去一周内使用频率更高的话题标签，包括未批准和未审核的话题标签。

**返回:** [Admin::Tag]({{< relref "entities/Tag#admin" >}}) 数组\
**OAuth:** 用户令牌 + `admin:read`\
**权限:** 管理分类\
**版本历史:**\
3.5.0 - 添加\
4.0.0 - 由于错误，返回 Tag 数组\
4.1.0 - 修复错误 <!-- TODO: https://github.com/mastodon/mastodon/pull/18943 -->

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "name": "caturday",
    "url": "https://mastodon.example/tags/caturday",
    "history": [
      {
        "day": "1669507200",
        "accounts": "53",
        "uses": "56"
      },
      {
        "day": "1669420800",
        "accounts": "142",
        "uses": "171"
      },
      {
        "day": "1669334400",
        "accounts": "11",
        "uses": "11"
      },
      {
        "day": "1669248000",
        "accounts": "8",
        "uses": "9"
      },
      {
        "day": "1669161600",
        "accounts": "8",
        "uses": "20"
      },
      {
        "day": "1669075200",
        "accounts": "11",
        "uses": "11"
      },
      {
        "day": "1668988800",
        "accounts": "17",
        "uses": "22"
      }
    ],
    "id": "802",
    "trendable": true,
    "usable": true,
    "requires_review": false
  },
]
```

##### 403: Forbidden

授权用户缺少权限，或 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/trends/links_controller.rb" caption="app/controllers/api/v1/admin/trends/links_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/trends/statuses_controller.rb" caption="app/controllers/api/v1/admin/trends/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/trends/tags_controller.rb" caption="app/controllers/api/v1/admin/trends/tags_controller.rb" >}}

{{< translation-status-zh-cn raw_title="trends API methods" raw_link="/methods/admin/trends/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
