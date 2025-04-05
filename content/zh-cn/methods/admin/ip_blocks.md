---
title: ip_blocks API 方法
description: 禁止某些 IP 地址段注册。
menu:
  docs:
    name: ip_blocks
    parent: methods-admin
    identifier: methods-admin-ip_blocks
aliases: [
	"/methods/admin/domain_blocks",
	"/api/methods/admin/domain_blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 列出所有 IP 屏蔽 {#get}

```http
GET /api/v1/admin/ip_blocks HTTP/1.1
```

显示有关所有被屏蔽的 IP 段的信息。

**返回：** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}}) 数组\
**OAuth：** 用户令牌 + `admin:read:ip_blocks`\
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
    "ip": "8.8.8.8/32",
    "severity": "no_access",
    "comment": "",
    "created_at": "2022-11-16T07:22:00.501Z",
    "expires_at": null
  },
  // ...
]
```

由于 IpBlock ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。 有关更多信息，请参阅[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <http://mastodon.example/api/v1/admin/ip_blocks?limit=2&max_id=2>; rel="next", <http://mastodon.example/api/v1/admin/ip_blocks?limit=2&since_id=1>; rel="prev"
```

##### 403: Forbidden

授权用户不允许执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

---

## 获取单个 IP 屏蔽条目 {#get-one}

```http
GET /api/v1/admin/ip_blocks/:id HTTP/1.1
```

显示有关单个 IP 屏蔽的信息。

**返回：** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth：** 用户令牌 + `admin:read:ip_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 IpBlock 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "1",
  "ip": "8.8.8.8/32",
  "severity": "no_access",
  "comment": "",
  "created_at": "2022-11-16T07:22:00.501Z",
  "expires_at": null
}
```

##### 403: Forbidden

授权用户不允许执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

具有给定 ID 的 IpBlock 不存在

```json
{
	"error": "Record not found"
}
```

---

## 屏蔽 IP 地址段 {#create}

```http
POST /api/v1/admin/ip_blocks HTTP/1.1
```

将 IP 地址段添加到 IP 屏蔽列表。

**返回：** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:ip_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

ip
: 字符串。要屏蔽的 IP 地址和前缀。默认为 `0.0.0.0/32`

severity
: {{<required>}} 字符串。应用于此 IP 段的策略：`sign_up_requires_approval`、`sign_up_block` 或 `no_access`

comment
: 字符串。此 IP 屏蔽的原因。

expires_in
: 整数。此 IP 屏蔽距离过期的秒数。

#### 响应
##### 200: OK

IP 已被屏蔽注册。

```json
{
  "id": "1",
  "ip": "8.8.8.8/32",
  "severity": "no_access",
  "comment": "",
  "created_at": "2022-11-16T07:22:00.501Z",
  "expires_at": null
}
```

##### 403: Forbidden

授权用户不允许执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

IP 已被屏蔽，并且/或者未提供严重性

```json
{
  "error": "Validation failed: Severity can't be blank, Ip has already been taken"
}
```

---

## 更新 IP 屏蔽 {#update}

```http
PUT /api/v1/admin/ip_blocks/:id HTTP/1.1
```

更改现有 IP 屏蔽的参数。

**返回：** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:ip_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 IpBlock 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

ip
: 字符串。要屏蔽的 IP 地址和前缀。默认为 `0.0.0.0/32`

severity
: 字符串。应用于此 IP 段的策略：`sign_up_requires_approval`、`sign_up_block` 或 `no_access`

comment
: 字符串。此 IP 屏蔽的原因。

expires_in
: 整数。此 IP 屏蔽距离过期的秒数。

#### 响应
##### 200: OK

IP 屏蔽已更新

```json
{
  "id": "1",
  "ip": "8.8.4.4/32",
  "severity": "no_access",
  "comment": "",
  "created_at": "2022-11-16T07:22:00.501Z",
  "expires_at": null
}
```

##### 403: Forbidden

授权用户不允许执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

---

## 删除 IP 屏蔽 {#delete}

```http
DELETE /api/v1/admin/ip_blocks/:id HTTP/1.1
```

解除对 IP 段的屏蔽。

**返回：** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:domain_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 DomainAllow 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已从屏蔽列表中删除 IP

```json
{}
```
##### 403: Forbidden

授权用户不允许执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

具有给定 ID 的 IpBlock 不存在

```json
{
	"error": "Record not found"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/ip_blocks_controller.rb" caption="app/controllers/api/v1/admin/ip_blocks_controller.rb" >}}

{{< translation-status-zh-cn raw_title="ip_blocks API methods" raw_link="/methods/admin/ip_blocks/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}

