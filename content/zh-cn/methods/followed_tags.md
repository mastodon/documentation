---
title: followed_tags API 方法
description: 查看你关注的话题标签。
menu:
  docs:
    weight: 120
    name: followed_tags
    parent: methods-accounts
    identifier: methods-followed_tags
aliases: [
  "/methods/followed_tags",
  "/api/methods/followed_tags",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看所有关注的话题标签 {#get}

```http
GET /api/v1/followed_tags HTTP/1.1
```

列出你关注的全部话题话题标签。

**返回：** [Tag]({{< relref "entities/Tag" >}}) 数组\
**OAuth:** 用户令牌 + `read:follows`\
**版本历史：**\
4.0.0 - 添加\
4.1.0 - 添加分页标头

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 查询参数

max_id 
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 100 个话题标签。最多 200 个话题标签。

#### 响应
##### 200: OK

关注的话题标签列表

```json
[
  {
    "name": "Test",
    "url": "http://mastodon.example/tags/test",
    "history": [
      {
        "day": "1668556800",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668470400",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668384000",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668297600",
        "accounts": "1",
        "uses": "1"
      },
      {
        "day": "1668211200",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668124800",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668038400",
        "accounts": "0",
        "uses": "0"
      }
    ],
    "following": true
  },
  // ...
]
```

由于 TagFollow ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。 有关更多信息，请参阅[通过API响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <http://mastodon.example/api/v1/followed_tags?limit=1&max_id=2>; rel="next", <http://mastodon.example/api/v1/followed_tags?limit=1&since_id=2>; rel="prev"
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参考

{{< page-relref ref="methods/tags#follow" caption="POST /api/v1/tags/:id/follow" >}}

{{< page-relref ref="methods/tags#unfollow" caption="POST /api/v1/tags/:id/unfollow" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/followed_tags_controller.rb" caption="app/controllers/api/v1/followed_tags_controller.rb" >}}

{{< translation-status-zh-cn raw_title="followed_tags API methods" raw_link="/methods/followed_tags/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
