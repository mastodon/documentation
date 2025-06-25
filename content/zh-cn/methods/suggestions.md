---
title: suggestions API 方法
description: >-
  实例根据之前积极的互动关系生成的关注建议。
menu:
  docs:
    weight: 120
    name: suggestions
    parent: methods-accounts
    identifier: methods-suggestions
aliases: [
  "/methods/suggestions",
  "/api/methods/suggestions",
  "/methods/accounts/suggestions",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看关注建议 (v2) {#v2}

```http
GET /api/v2/suggestions HTTP/1.1
```

由站点工作人员推荐的，或者用户之前与之有过积极互动但尚未关注的帐户。

**返回：**[Suggestion]({{< relref "entities/Suggestion" >}}) 数组\
**OAuth：**用户令牌 + `read`\
**版本历史：**\
3.4.0 - 添加

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，并带有 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 查询参数

limit
: 整数。要返回的最大结果数。默认为 40 个帐户。最多 80 个帐户。

#### 响应
##### 200: OK

```json
[
  {
    "source": "past_interactions",
    "account": {
      "id": "784058",
      "username": "katie",
      "acct": "katie@pleroma.voidlurker.net",
      // ...
  },
  // ...
  {
    "source": "global",
    "account": {
      "id": "108194863260762493",
      "username": "thunderbird",
      "acct": "thunderbird@mastodon.online",
      // ...
  }
]
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

---

## 移除建议 {#remove}

```http
DELETE /api/v1/suggestions/:account_id HTTP/1.1
```

从关注建议中移除一个帐户。

**返回：**空\
**OAuth：**用户令牌 + `read`\
**版本历史：**\
2.4.3 - 添加

#### 请求

##### 路径参数

:account_id
: {{<required>}} 字符串。数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，并带有 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

成功调用将返回一个空对象。请注意，即使提供的帐户 ID 无效或并非建议的帐户，调用也会成功。

```json
{}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

---

## 查看关注建议 (v1) {{%deprecated%}} {#v1}

```http
GET /api/v1/suggestions HTTP/1.1
```

用户过去与之有过积极互动但尚未关注的帐户。

**返回：**[Account]({{< relref "entities/Account" >}}) 数组\
**OAuth：**用户令牌 + `read`\
**版本历史：**\
2.4.3 - 添加\
3.4.0 - 弃用

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，并带有 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 查询参数

limit
: 整数。要返回的最大结果数。默认为 40 个帐户。最多 80 个帐户。

#### 响应
##### 200: OK

```json
[
  {
    "id": "332766",
    "username": "kaniini",
    "acct": "kaniini@pleroma.site",
    // ...
  },
  {
    "id": "689455",
    "username": "interneteh",
    "acct": "interneteh@sunbeam.city",
    // ...
  },
  {
    "id": "764276",
    "username": "Dee",
    "acct": "Dee@fedi.underscore.world",
    // ...
  },
  // ...
]
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

{{< page-relref ref="methods/accounts#follow" caption="POST /api/v1/accounts/:id/follow" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/suggestions_controller.rb" caption="app/controllers/api/v2/suggestions_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/suggestions_controller.rb" caption="app/controllers/api/v1/suggestions_controller.rb" >}}

{{< translation-status-zh-cn raw_title="suggestions API methods" raw_link="/methods/suggestions/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
