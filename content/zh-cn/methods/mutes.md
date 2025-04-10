---
title: mutes API 方法
description: 查看你的隐藏列表。另请参阅 accounts/:id/{mute,unmute}
menu:
  docs:
    weight: 30
    name: mutes
    parent: methods-accounts
    identifier: methods-mutes
aliases: [
  "/methods/mutes",
  "/api/methods/mutes",
  "/methods/accounts/mutes",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看已隐藏账户 {#get}

```http
GET /api/v1/mutes HTTP/1.1
```

用户已隐藏的账户。

**返回：** [Account]({{<relref "entities/Account">}}) 数组\
**OAuth：** 用户令牌 + `read:mutes` 或 `follow`\
**版本历史：**\
0.0.0 - 添加\
3.3.0 - 添加 `mute_expires_at`

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，内容为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: **内部参数。** 使用 HTTP `Link`标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link`标头进行分页。

limit
: Integer 类型。要返回的最大结果数。 默认为 40 个账户。 最大值为 80 个账户。

#### 响应
##### 200: OK

limit=2 的示例响应。

```json
[
  {
    "id": "963076",
    "username": "Simia91",
    "acct": "Simia91",
    "display_name": "",
    // ...
  },
  {
    "id": "1001524",
    "username": "hakogamae",
    "acct": "hakogamae",
    "display_name": "Hakogamae 🔞",
    // ...
  }
]
```

由于隐藏 ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。 有关更多信息，请参阅 [通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/mutes?limit=2&max_id=317646>; rel="next", <https://mastodon.example/api/v1/mutes?limit=2&since_id=317647>; rel="prev"
```

##### 401: Unauthorized

无效或缺少的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参阅

{{< page-relref ref="methods/accounts#mute" caption="POST /api/v1/accounts/:id/mute" >}}

{{< page-relref ref="methods/accounts#unmute" caption="POST /api/v1/accounts/:id/unmute" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/mutes_controller.rb" caption="app/controllers/api/v1/mutes_controller.rb" >}}

{{< translation-status-zh-cn raw_title="mutes API methods" raw_link="/methods/mutes/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
