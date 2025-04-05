---
title: bookmarks API 方法
description: 查看你的书签。另请参阅 statuses/:id/{bookmark,unbookmark}
menu:
  docs:
    weight: 10
    name: bookmarks
    parent: methods-accounts
    identifier: methods-bookmarks
aliases: [
  "/methods/bookmarks",
  "/api/methods/bookmarks",
  "/methods/accounts/bookmarks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看已添加书签的嘟文 {#get}

```http
GET /api/v1/bookmarks HTTP/1.1
```

用户已添加书签的嘟文。

**返回：** [Status]({{< relref "entities/status" >}})数组\
**OAuth：** 用户令牌 + `read:bookmarks`\
**版本历史：**\
3.1.0 - 添加\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

### 请求
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
: 整数。要返回的最大结果数。默认为 20 条嘟文。最大 40 条嘟文。

#### 响应
##### 200: OK

```json
[
  {
    "id": "108724195870225687",
    "created_at": "2022-07-28T09:12:47.000Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    // ...
  },
  {
    "id": "108200780982641655",
    "created_at": "2022-04-26T22:41:28.492Z",
    "in_reply_to_id": "108200775562138405",
    "in_reply_to_account_id": "806143",
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    // ...
  },
  // ...
]
```

由于书签 ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。 有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/bookmarks?max_id=23771>; rel="next", <https://mastodon.example/api/v1/bookmarks?min_id=370065>; rel="prev"
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参阅

{{< page-relref ref="methods/statuses#bookmark" caption="POST /api/v1/statuses/:id/bookmark" >}}

{{< page-relref ref="methods/statuses#unbookmark" caption="POST /api/v1/statuses/:id/unbookmark" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/bookmarks_controller.rb" caption="app/controllers/api/v1/bookmarks_controller.rb" >}}

{{< translation-status-zh-cn raw_title="bookmarks API methods" raw_link="/methods/bookmarks/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
