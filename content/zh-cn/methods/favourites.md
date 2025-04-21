---
title: favourites API 方法
description: 查看你的喜欢。另请参阅 statuses/:id/{favourite,unfavourite}
menu:
  docs:
    weight: 20
    name: favourites
    parent: methods-accounts
    identifier: methods-favourites
aliases: [
  "/methods/favourites",
  "/api/methods/favourites",
  "/methods/accounts/favourites",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看喜欢的嘟文 {#get}

```http
GET /api/v1/favourites HTTP/1.1
```

用户喜欢的嘟文。

**返回：** [Status]({{< relref "entities/status" >}}) 数组\
**OAuth:** 用户令牌 + `read:favourites`\
**版本：**\
0.0.0 - 添加\
2.6.0 - 添加 `min_id`\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，并使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 查询参数

max_id 
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 20 条嘟文。最多 40 条嘟文。

#### 响应
##### 200: OK

一个 limit=2 的示例调用。

```json
[
  {
    "id": "103186075217296344",
    "created_at": "2019-11-23T07:35:52.000Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "unlisted",
    "language": "enCy",
    "uri": "https://cybre.space/users/haskal/statuses/103186075002013902",
    "url": "https://cybre.space/@haskal/103186075002013902",
    "replies_count": 0,
    "reblogs_count": 1,
    "favourites_count": 1,
    "favourited": true,
    "reblogged": false,
    "muted": false,
    "bookmarked": false,
    "content": "<p>the pirate gay</p>",
    "reblog": null,
    "account": {
      "id": "297420",
      "username": "haskal",
      "acct": "haskal@cybre.space",
      "display_name": "soft nb friend :blobcatsleep:",
      // ...
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  },
  {
    "id": "103186044372624124",
    "created_at": "2019-11-23T07:28:03.000Z",
    // ...
    "content": "<p>cute,,,</p>",
    "reblog": null,
    "account": {
      "id": "297420",
      "username": "haskal",
      "acct": "haskal@cybre.space",
      "display_name": "soft nb friend :blobcatsleep:",
      "locked": false,
      "bot": false,
      // ...
    },
    // ...
  }
]
```

由于喜欢 ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。有关更多信息，请参阅[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/favourites?limit=2&max_id=23716836>; rel="next", <https://mastodon.example/api/v1/favourites?limit=2&min_id=23716978>; rel="prev"
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参阅

{{< page-relref ref="methods/statuses#favourite" caption="POST /api/v1/statuses/:id/favourite" >}}

{{< page-relref ref="methods/statuses#unfavourite" caption="POST /api/v1/statuses/:id/unfavourite" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/favourites_controller.rb" caption="app/controllers/api/v1/favourites_controller.rb" >}}

{{< translation-status-zh-cn raw_title="favourites API methods" raw_link="/methods/favourites/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
