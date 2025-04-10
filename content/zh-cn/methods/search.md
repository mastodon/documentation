---
title: search API 方法
description: 在帐户、嘟文和话题标签中搜索内容。
menu:
  docs:
    weight: 60
    name: search
    parent: methods
    identifier: methods-search
aliases: [
  "/methods/search",
  "/api/methods/search",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 执行搜索 {#v2}

```http
GET /api/v2/search HTTP/1.1
```

**返回：** [Search]({{< relref "entities/Search" >}})\
**OAuth：** 公开（不带 `resolve` 或 `offset`），或用户令牌 + `read:search`\
**版本历史：**\
2.4.1 - 添加，`limit` 硬编码为 5\
2.8.0 - 添加 `type`、`limit`、`offset`、`min_id`、`max_id`、`account_id`\
3.0.0 - 添加 `exclude_unreviewed` 参数\
3.3.0 - `min_id` 和 `max_id` 可以一起使用\
4.0.0 - 不再需要用户令牌。若没有有效的用户令牌，则无法使用 `resolve` 或 `offset` 参数。

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，并在其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

q
: {{<required>}} 字符串。搜索关键词。

type
: 字符串。指定是否仅搜索 `accounts`、`hashtags`、`statuses`。

resolve
: 布尔值。仅当 `type` 包含 `accounts` 时相关。若为 `true` 且 (a) 搜索关键词是针对外站帐户（例如，`someaccount@someother.server`），并且 (b) 本站实例不知晓该帐户，则使用 [WebFinger](/spec/webfinger) 尝试在 `someother.server` 解析该帐户。这在较高延迟下提供最佳搜素成功率。若为 `false`，则仅返回实例知晓的帐户。

following
: 布尔值。是否仅包括用户正在关注的帐户？默认为 false。

account_id
: 字符串。若提供，则仅返回此帐户撰写的嘟文。

exclude_unreviewed
: 布尔值。是否过滤掉未经审核的话题标签？默认为 false。在尝试查找热门话题标签时使用 true。

max_id
: 字符串。返回的所有结果都将小于此 ID。事实上设置了结果的上限。

min_id
: 字符串。返回与此 ID 相邻且更新的结果。事实上在此 ID 处设置一个游标并向前分页。

limit
: 整数。每个类型要返回的最大结果数。默认为每个类别 20 个结果。每个类别最多 40 个结果。

offset
: 整数。跳过前 n 个结果。

#### 响应
##### 200: OK

对 "cats" 进行的示例搜索的结果（已截断），limit=2。

```json
{
  "accounts": [
    {
      "id": "180744",
      "username": "catstar",
      "acct": "catstar@catgram.jp",
      "display_name": "catstar",
      // ...
    },
    {
      "id": "214293",
      "username": "catsareweird",
      "acct": "catsareweird",
      "display_name": "Cats Are Weird",
      // ...
    }
  ],
  "statuses": [
    {
      "id": "103085519055545958",
      "created_at": "2019-11-05T13:23:09.000Z",
      // ...
      "content": "<p>cats<br>cats never change</p>",
      // ...
    },
    {
      "id": "101068121469614510",
      "created_at": "2018-11-14T06:31:48.000Z",
      // ...
      "spoiler_text": "Cats",
      // ...
      "content": "<p>Cats are inherently good at self-care. </p><p><a href=\"https://mspsocial.net/tags/cats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>cats</span></a></p>",
      // ...
  ],
  "hashtags": [
    {
      "name": "cats",
      "url": "https://mastodon.social/tags/cats",
      "history": [
        {
          "day": "1574553600",
          "uses": "10",
          "accounts": "9"
        },
        // ...
      ]
    },
    {
      "name": "catsofmastodon",
      "url": "https://mastodon.social/tags/catsofmastodon",
      "history": [
        {
          "day": "1574553600",
          "uses": "6",
          "accounts": "5"
        },
        // ...
      ]
    }
  ]
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## 执行搜索 (v1) {{%removed%}} {#v1}

```http
GET /api/v1/search HTTP/1.1
```

**返回：** [Search]({{< relref "entities/Search" >}})，但 `hashtags` 是一个字符串数组，而不是 Tag 数组。\
**OAuth：** 用户令牌 + `read:search`\
**版本历史：**\
1.1 - 添加，`limit` 硬编码为 5\
1.5.0 - 现在需要身份验证\
2.4.1 - 弃用，建议使用 [v2 搜索](#v2)\
2.8.0 - 添加 `limit`、分页和帐户选项\
3.0.0 - 移除；请改用 [v2 搜索](#v2)

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，并在其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

q
: {{<required>}} 字符串。搜索关键词。

type
: 字符串。指定是否仅搜索 `accounts`、`hashtags`、`statuses`。

resolve
: 布尔值。是否尝试 WebFinger 查找？默认为 false。

account_id
: 字符串。若提供，则仅返回此帐户撰写的嘟文。

max_id
: 字符串。返回的所有结果都将小于此 ID。事实上设置了结果的上限。

min_id
: 字符串。返回与此 ID 相邻且更新的结果。事实上在此 ID 处设置一个游标并向前分页。

limit
: 整数。每个类型要返回的最大结果数。默认为每个类别 20 个结果。每个类别最多 40 个结果。

offset
: 整数。搜索结果中的偏移量，用于分页。默认为 0。

#### 响应
##### 200: OK

v1 搜索已被弃用，因为话题标签作为字符串而不是 Tag 实体返回。

```json
{
  "accounts": [...],
  "statuses": [...],
  "hashtags": ["cats","catsofmastodon"]
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参考

{{< page-relref ref="methods/accounts#search" caption="GET /api/v1/accounts/search" >}}

{{< page-relref ref="methods/accounts#lookup" caption="GET /api/v1/accounts/lookup" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/search_controller.rb" caption="app/controllers/api/v2/search_controller.rb" >}}

{{< translation-status-zh-cn raw_title="search API methods" raw_link="/methods/search/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
