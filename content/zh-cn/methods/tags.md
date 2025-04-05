---
title: tags API 方法
description: 查看关于话题标签的信息或关注/取消关注话题标签。
menu:
  docs:
    weight: 120
    name: tags
    parent: methods-accounts
    identifier: methods-tags
aliases: [
  "/methods/tags",
  "/api/methods/tags",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看单个话题标签的信息 {#get}

```http
GET /api/v1/tags/:id HTTP/1.1
```

显示一个话题标签及其相关信息

**返回：** [Tag]({{< relref "entities/Tag" >}})\
**OAuth：** 公开访问，或要求用户令牌\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。话题标签的名称。

##### 标头

Authorization
: 提供此标头并附带 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
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
  "following": false
}
```

---

## 关注一个话题标签 {#follow}

```http
POST /api/v1/tags/:id/follow HTTP/1.1
```

关注一个话题标签。包含已关注话题标签的嘟文将被插入到你的主页时间线中。

**返回：** [Tag]({{< relref "entities/Tag" >}})\
**OAuth：** 用户令牌 + `write:follows`\
**版本历史：**\
4.0.0 - 添加\
4.1.0 - 此操作现在是幂等的

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。话题标签的名称。

##### 标头

Authorization
: {{<required>}} 提供此标头并附带 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已成功关注该话题标签

```json
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
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

在 4.1.0 之前：该话题标签已被关注

```json
{
  "error": "Duplicate record"
}
```

---

## 取消关注一个话题标签 {#unfollow}

```http
POST /api/v1/tags/:id/unfollow HTTP/1.1
```

取消关注一个话题标签。包含此话题标签的嘟文将不再被插入到你的主页时间线中。

**返回：** [Tag]({{< relref "entities/Tag" >}})\
**OAuth：** 用户令牌 + `write:follows`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。话题标签的名称。

##### 标头

Authorization
: {{<required>}} 提供此标头并附带 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已成功取消关注该话题标签，或原本就未关注该话题标签

```json
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
  "following": false
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参考

{{< page-relref ref="methods/followed_tags#get" caption="GET /api/v1/followed_tags" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/tags_controller.rb" caption="app/controllers/api/v1/tags_controller.rb" >}}

{{< translation-status-zh-cn raw_title="tags API methods" raw_link="/methods/tags/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
