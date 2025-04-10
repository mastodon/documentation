---
title: follow_requests API 方法
description: 查看和管理关注请求。
menu:
  docs:
    weight: 80
    name: follow_requests
    parent: methods-accounts
    identifier: methods-follow_requests
aliases: [
  "/methods/follow_requests",
  "/api/methods/follow_requests",
  "/methods/accounts/follow_requests",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看待处理的关注请求 {#get}

```http
GET /api/v1/follow_requests HTTP/1.1
```

**返回：** [Account]({{< relref "entities/account" >}}) 数组\
**OAuth：** 用户令牌 + `read:follows` 或 `follow`\
**版本历史：**\
0.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 40 个帐户。最大 80 个帐户。

#### 响应
##### 200: OK

请求关注的帐户的示例调用，其中 limit=2

```json
[
  {
    "id":"108119793981152178",
    "username":"spcpro3022",
    "acct":"spcpro3022@shitposter.club",
    "display_name":"spcpro3022",
    // ...
  },
  {
    "id":"106780475844882270",
    "username":"EricStoner",
    "acct":"EricStoner@freeatlantis.com",
    "display_name":"EricStoner",
    // ...
  }
]
```

由于 FollowRequest ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。有关更多信息，请参阅[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/follow_requests?limit=2&max_id=7163058>; rel="next", <https://mastodon.example/api/v1/follow_requests?limit=2&since_id=7275607>; rel="prev"
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

---

## 接受关注请求 {#accept}

```http
POST /api/v1/follow_requests/:account_id/authorize HTTP/1.1
```

**返回：** [Relationship]({{< relref "entities/relationship" >}})\
**OAuth：** 用户令牌 + `write:follows` 或 `follow`\
**版本历史：**\
0.0.0 - 添加\
3.0.0 - 现在返回 Relationship，而不是什么都不返回

#### 请求

##### 路径参数

:account_id
: {{<required>}} 字符串。数据库中 Account 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

你与此帐户的关系应已更新，现在你与该帐户的关系为 `followed_by`。

```json
{
  "id": "8889777",
  "following": false,
  "showing_reblogs": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

没有来自该帐户 ID 的待处理关注请求

```json
{
  "error": "Record not found"
}
```

---

## 拒绝关注请求 {#reject}

```http
POST /api/v1/follow_requests/:account_id/reject HTTP/1.1
```

**返回：** [Relationship]({{< relref "entities/relationship" >}})\
**OAuth：** 用户令牌 + `write:follows` 或 `follow`\
**版本历史：**\
0.0.0 - 添加\
3.0.0 - 现在返回 Relationship，而不是什么都不返回

#### 请求

##### 路径参数

:account_id
: {{<required>}} 字符串。数据库中 Account 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

你与此帐户的关系应保持不变。

```json
{
  "id": "8889777",
  "following": false,
  "showing_reblogs": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

没有来自该帐户 ID 的待处理关注请求

```json
{
  "error": "Record not found"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/follow_requests_controller.rb" caption="app/controllers/api/v1/follow_requests_controller.rb" >}}

{{< translation-status-zh-cn raw_title="follow_requests API methods" raw_link="/methods/follow_requests/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
