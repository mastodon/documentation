---
title: lists API 方法
description: >-
  查看和管理列表。另请参阅：/api/v1/timelines/list/id 以加载列表时间线。
menu:
  docs:
    weight: 20
    name: lists
    parent: methods-timelines
    identifier: methods-lists
aliases: [
  "/methods/lists",
  "/api/methods/lists",
  "/methods/timelines/lists",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看你的列表 {#get}

```http
GET /api/v1/lists HTTP/1.1
```

获取用户拥有的所有列表。

**返回：**[List]({{< relref "entities/list" >}})数组\
**OAuth：**用户令牌 + `read:lists`\
**版本历史记录：**\
2.1.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

使用 `id` 作为相关 API 调用的参数。

```json
[
  {
    "id": "12249",
    "title": "Friends",
    "replies_policy": "followed",
    "exclusive": false
  },
  {
    "id": "13585",
    "title": "test",
    "replies_policy": "list",
    "exclusive": true
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

## 显示单个列表 {#get-one}

```http
GET /api/v1/lists/:id HTTP/1.1
```

获取具有给定 ID 的列表。用于验证列表的标题，以及在该列表中显示哪些回复。

**返回：**[List]({{< relref "entities/list" >}})\
**OAuth：**用户令牌 + `read:lists`\
**版本历史记录：**\
2.1.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中列表的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

列表 12249 存在并且由你拥有

```json
{
  "id": "12249",
  "title": "Friends",
  "replies_policy": "followed",
  "exclusive": false
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

列表不存在或你并未拥有此列表

```json
{
  "error": "Record not found"
}
```

---

## 创建列表 {#create}

```http
POST /api/v1/lists HTTP/1.1
```

创建一个新列表。

**返回：**[List]({{< relref "entities/list" >}})\
**OAuth：**用户令牌 + `write:lists`\
**版本历史记录：**\
2.1.0 - 添加\
3.3.0 - 添加 `replies_policy`\
4.2.0 - 添加 `exclusive`

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

title
: {{<required>}} 字符串。要创建的列表的标题。

replies_policy
: 字符串。`followed`、`list` 或 `none` 之一。默认为 `list`。

exclusive
: 布尔值。此列表的成员的嘟文是否需要从首页时间线中删除

#### 响应
##### 200: OK

使用标题 “test” 创建了一个示例列表。

```json
{
  "id": "13585",
  "title": "test",
  "replies_policy": "list",
  "exclusive": false
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

若缺少标题：

```json
{
  "error": "Validation failed: Title can't be blank"
}
```

若 replies_policy 非法：

```json
{
  "error": "'some' is not a valid replies_policy"
}
```
-->

---

## 更新列表 {#update}

```http
PUT /api/v1/lists/:id HTTP/1.1
```

更改列表的标题，或更改回复显示范围。

**返回：**[List]({{< relref "entities/list" >}})\
**OAuth：**用户令牌 + `write:lists`\
**版本历史记录：**\
2.1.0 - 添加\
3.3.0 - 添加 `replies_policy`

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中列表的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

title
: {{<required>}} 字符串。要创建的列表的标题。

replies_policy
: 字符串。`followed`、`list` 或 `none` 之一。默认为 `list`。

exclusive
: 布尔值。此列表的成员的嘟文是否需要从首页时间线中移除。

#### 响应
##### 200: OK

列表 13585 的 `title` 已成功更新为“testing”

```json
{
  "id": "13585",
  "title": "test",
  "replies_policy": "list",
  "exclusive": false
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

若缺少 `title`：

```json
{
  "error": "Validation failed: Title can't be blank"
}
```

若 `replies_policy` 非法：

```json
{
  "error": "'some' is not a valid replies_policy"
}
```

---

## 删除列表 {#delete}

```http
DELETE /api/v1/lists/:id HTTP/1.1
```

**返回：**空\
**OAuth：**用户令牌 + `write:lists`\
**版本历史记录：**\
2.1.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中列表的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

列表已成功删除

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

##### 404: Not found

列表不存在或你并未拥有此列表


```json
{
  "error": "Record not found"
}
```

---

## 查看列表中的帐户 {#accounts}

```http
GET /api/v1/lists/:id/accounts HTTP/1.1
```

**返回：**[帐户]({{< relref "entities/account" >}})数组\
**OAuth：**用户令牌 + `read:lists`\
**版本历史记录：**\
2.1.0 - 添加\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中列表的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 查询参数

max_id 
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。结果的最大数量。默认为 40 个帐户。最多 80 个帐户。设置为 0 以获取所有帐户而不进行分页。

#### 响应
##### 200: OK

```json
[
  {
    "id": "952529",
    "username": "alayna",
    "acct": "alayna@desvox.es",
    // ...
  },
  {
    "id": "917388",
    "username": "cole",
    "acct": "cole@be.cutewith.me",
    // ...
  },
  {
    "id": "869022",
    "username": "alayna",
    "acct": "alayna@be.cutewith.me",
    // ...
  },
  {
    "id": "832844",
    "username": "a9",
    "acct": "a9@broadcast.wolfgirl.engineering",
    // ...
  },
  {
    "id": "482403",
    "username": "amic",
    "acct": "amic@nulled.red",
    // ...
  }
]
```

因为你事先不知道列表中包含哪些帐户，你必须解析 HTTP `Link` 标头才能加载旧的或较新的结果。有关更多信息，请参见 [通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/lists/12249/accounts?max_id=106931203247163945>; rel="next", <https://mastodon.example/api/v1/lists/12249/accounts?since_id=108632085572655915>; rel="prev"
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

列表不存在或你并未拥有此列表。


```json
{
  "error": "Record not found"
}
```

---

## 将帐户添加到列表 {#accounts-add}

```http
POST /api/v1/lists/:id/accounts HTTP/1.1
```

将帐户添加到给定列表。请注意，用户必须已关注这些帐户。

**返回：**空\
**OAuth：**用户令牌 + `write:lists`\
**版本历史记录：**\
2.1.0 - 添加

### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中列表的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

account_ids[]
: {{<required>}} 字符串数组。应添加到列表中的帐户。

#### 响应
##### 200: OK

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

##### 404: Not found

你没有关注给定 ID 的账户，或者你并未拥有给定 ID 的列表，或者对应列表/帐户 ID 不存在

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

具有提供的 ID 之一的帐户已在列表中

```json
{
  "error": "Validation failed: Account has already been taken"
}
```

---

## 从列表删除帐户 {#accounts-remove}

```http
DELETE /api/v1/lists/:id/accounts HTTP/1.1
```

从给定列表中删除帐户。

**返回：**空\
**OAuth：**用户令牌 + `write:lists`\
**版本历史记录：**\
2.1.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中列表的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

account_ids[]
: {{<required>}} 字符串数组。应从列表中删除的帐户。

#### 响应
##### 200: OK

已成功从列表中删除帐户，或者该帐户已经不在列表中。

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

##### 404: Not found

你并未拥有此列表或列表不存在

```json
{
  "error": "Record not found"
}
```

---

## 另请参阅

{{< page-relref ref="methods/accounts#lists" caption="GET /api/v1/accounts/:id/lists" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/lists_controller.rb" caption="app/controllers/api/v1/lists_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/lists/accounts_controller.rb" caption="app/controllers/api/v1/lists/accounts_controller.rb" >}}

{{< translation-status-zh-cn raw_title="lists API methods" raw_link="/methods/lists/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
