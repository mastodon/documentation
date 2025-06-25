---
title: domain_blocks API 方法
description: 管理用户屏蔽的域名。
menu:
  docs:
    weight: 50
    name: domain_blocks
    parent: methods-accounts
    identifier: methods-domain_blocks
aliases: [
  "/methods/domain_blocks",
  "/api/methods/domain_blocks",
  "/methods/accounts/domain_blocks"]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 获取域名屏蔽列表 {#get}

```http
GET /api/v1/domain_blocks HTTP/1.1
```

查看用户已屏蔽的域名。

**返回:** 字符串数组\
**OAuth:** 用户令牌 + `read:blocks` 或 `follow`\
**版本:**\
1.4.0 - 添加\
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
: 整数。 要返回的最大结果数。 默认为 100 个被屏蔽的域名。 最大值为 200 个被屏蔽的域名。

#### 响应
##### 200: OK

使用 limit=2 的示例调用。

```json
["nsfw.social","artalley.social"]
```

由于 AccountDomainBlock ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头以加载更旧或更新的结果。 有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/domain_blocks?limit=2&max_id=16194>; rel="next", <https://mastodon.example/api/v1/domain_blocks?limit=2&since_id=16337>; rel="prev"
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

---

## 屏蔽域名 {#block}

```http
POST /api/v1/domain_blocks HTTP/1.1
```

屏蔽域名以：
- 隐藏来自该域名的所有公开嘟文
- 隐藏来自该域名的所有通知
- 删除来自该域名的所有关注者
- 阻止关注来自该域名的新用户（但不会删除现有的关注关系）

**返回:** 空\
**OAuth:** 用户令牌 + `write:blocks` 或 `follow`\
**版本:**\
1.4.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，并使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

domain
: {{<required>}} 字符串。 要屏蔽的域名。

#### 响应
##### 200: OK

若调用成功，将返回一个空对象。 请注意，即使域名已被屏蔽、域名不存在或域名不是合法域名，调用也会成功。

```json
{}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

若未提供 `domain`，则请求将失败。

```json
{
  "error": "Validation failed: Domain can't be blank"
}
```

若 `domain` 包含空格，则请求将失败。

```json
{
  "error": "Validation failed: Domain is not a valid domain name"
}
```

---

## 取消屏蔽域名 {#unblock}

```http
DELETE /api/v1/domain_blocks HTTP/1.1
```

若域名存在于用户的已屏蔽域名数组中，则删除域名屏蔽。

**返回:** 空\
**OAuth:** 用户令牌 + `write:blocks` 或 `follow`\
**版本历史记录:**\
1.4.0 - 添加

##### 标头

Authorization
: {{<required>}} 提供此标头，并使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

domain
: {{<required>}} 字符串。 要取消屏蔽的域名。

#### 响应
##### 200: OK

若调用成功，将返回一个空对象。 请注意，即使该域名此前未被屏蔽，调用也会成功。

```json
{}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

若未提供 `domain`，则请求将失败。

```json
{
  "error": "Validation failed: Domain can't be blank"
}
```

若 `domain` 包含空格，则请求将失败。

```json
{
  "error": "Validation failed: Domain is not a valid domain name"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/domain_blocks_controller.rb" caption="app/controllers/api/v1/domain_blocks_controller.rb" >}}

{{< translation-status-zh-cn raw_title="domain_blocks API methods" raw_link="/methods/domain_blocks/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
