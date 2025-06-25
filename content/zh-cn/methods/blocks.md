---
title: blocks API 方法
description: 查看你的屏蔽用户列表。另请参阅 accounts/:id/{block,unblock}
menu:
  docs:
    weight: 40
    name: blocks
    parent: methods-accounts
    identifier: methods-blocks
aliases: [
  "/methods/blocks",
  "/api/methods/blocks",
  "/methods/accounts/blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看屏蔽用户 {#get}

```http
GET /api/v1/blocks HTTP/1.1
```

**返回:** [Account]({{< relref "entities/account" >}}) 数组\
**OAuth:** 用户令牌 + `read:blocks`\
**版本历史:**\
0.0.0 - 添加\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

#### 请求

##### 请求头

Authorization
: {{<required>}} 提供此标头，并将值设为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 40 个帐户。最大 80 个帐户。

#### 响应
##### 200: OK

使用 limit=2 的示例调用。

```json
[
  {
    "id": "585315",
    "username": "admin",
    "acct": "admin@happylittle.cloudns.cc",
    "display_name": "☁️  ⛅ Happy Little Clouds ⛅ ☁️",
    // ...
  },
  {
    "id": "650568",
    "username": "Nikolai_Kingsley",
    "acct": "Nikolai_Kingsley@dobbs.town",
    "display_name": "Rev.Dr. Nikolai Kingsley",
    // ...
  }
]
```

由于屏蔽 ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。 有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/blocks?limit=2&max_id=441449>; rel="next", <https://mastodon.example/api/v1/blocks?limit=2&since_id=444808>; rel="prev"
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

{{< page-relref ref="methods/accounts#block" caption="POST /api/v1/accounts/:id/block" >}}

{{< page-relref ref="methods/accounts#unblock" caption="POST /api/v1/accounts/:id/unblock" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/blocks_controller.rb" caption="app/controllers/api/v1/blocks_controller.rb" >}}

{{< translation-status-zh-cn raw_title="blocks API methods" raw_link="/methods/blocks/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
