---
title: canonical_email_blocks API 方法
description: 通过哈希值屏蔽某些电子邮件地址。
menu:
  docs:
    name: canonical_email_blocks
    parent: methods-admin
    identifier: methods-admin-canonical_email_blocks
aliases: [
  "/methods/admin/canonical_email_blocks",
  "/api/methods/admin/canonical_email_blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 列出所有标准电子邮件屏蔽 {#get}

```http
GET /api/v1/admin/canonical_email_blocks HTTP/1.1
```

**返回：** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}}) 数组\
**OAuth：** 用户令牌 + `admin:read:canonical_email_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id 
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 100 个屏蔽。最多 200 个屏蔽。

#### 响应
##### 200: OK

```json
[
  {
    "id": "1",
    "canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
  },
  // ...
]
```

由于 CanonicalEmailBlock ID 通常不通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头以加载较旧或较新的结果。有关详细信息，请参阅[通过 API 响应分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <http://mastodon.example/api/v1/admin/canonical_email_blocks?limit=2&max_id=2>; rel="next", <http://mastodon.example/api/v1/admin/canonical_email_blocks?limit=2&since_id=1>; rel="prev"
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

---

## 显示单个标准电子邮件屏蔽 {#get-one}

```http
GET /api/v1/admin/canonical_email_blocks/:id HTTP/1.1
```

**返回：** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth：** 用户令牌 + `admin:read:canonical_email_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 Admin::CanonicalEmailBlock 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "1",
  "canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

标准电子邮件屏蔽不存在或已被删除

```json
{
  "error": "Record not found"
}
```

---

## 测试 {#test}

```http
POST /api/v1/admin/canonical_email_blocks/test HTTP/1.1
```

标准并哈希电子邮件地址。

**返回：** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}}) 数组\
**OAuth：** 用户令牌 + `admin:read:canonical_email_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

email
: {{<required>}} 字符串。要进行规范化和哈希的电子邮件地址。

#### 响应
##### 200: OK

返回所有匹配的标准电子邮件屏蔽。

```json
[
  {
    "id": "1",
    "canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
  }
]
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 500: Server error
<!-- TODO: remove when https://github.com/mastodon/mastodon/issues/21774 is fixed -->
未提供电子邮件

---

## 屏蔽标准电子邮件 {#create}

```http
POST /api/v1/admin/canonical_email_blocks HTTP/1.1
```

**返回：** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:canonical_email_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

email
: {{<required>}} 字符串。要进行规范化、哈希和屏蔽的电子邮件地址。若提供了此参数，则将忽略 `canonical_email_hash`。

canonical_email_hash
: 字符串。要测试的哈希值。若未提供 `email`，则需要此参数。

#### 响应
##### 200: OK

标准电子邮件已成功屏蔽

```json
{
  "id": "1",
  "canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

标准电子邮件哈希已被屏蔽

```json
{
  "error":"Validation failed: Canonical email hash has already been taken"
}
```

---

## 删除标准电子邮件屏蔽 {#delete}

```http
DELETE /api/v1/admin/canonical_email_blocks/:id HTTP/1.1
```

**返回：** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:canonical_email_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 Admin::CanonicalEmailBlock 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

标准电子邮件屏蔽已成功删除。

```json
{}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

标准电子邮件屏蔽不存在或已被删除

```json
{
  "error": "Record not found"
}
```

---

## 另请参阅

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/canonical_email_blocks_controller.rb" caption="app/controllers/api/v1/admin/canonical_email_blocks_controller.rb" >}}

{{< translation-status-zh-cn raw_title="canonical_email_blocks API methods" raw_link="/methods/admin/canonical_email_blocks/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
