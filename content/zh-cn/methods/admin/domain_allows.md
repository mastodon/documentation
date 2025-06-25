---
title: domain_allows API 方法
description: 允许特定域名进行联合。
menu:
  docs:
    name: domain_allows
    parent: methods-admin
    identifier: methods-admin-domain_allows
aliases: [
	"/methods/admin/domain_allows",
	"/api/methods/admin/domain_allows",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 列出所有允许的域名 {#get}

```http
GET /api/v1/admin/domain_allows HTTP/1.1
```

显示关于所有允许的域名的信息。

**返回:** [Admin::DomainAllow]({{< relref "entities/Admin_DomainAllow" >}}) 数组\
**OAuth:** 用户令牌 + `admin:read:domain_allows`\
**权限:** 管理联合\
**版本历史:**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含`Bearer <user_token>`，以获得对此API方法的访问授权。

##### 查询参数

max_id 
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。 默认为 100 个允许的域名。 最大 200 个允许的域名。

#### 响应

##### 200: OK

```json
[
	{
		"id": "2",
		"domain": "mastodon",
		"created_at": "2022-09-14T21:24:15.360Z"
	},
	{
		"id": "1",
		"domain": "mastodon.social",
		"created_at": "2022-09-14T21:23:02.755Z"
	}
]
```

由于 DomainAllow ID 通常不通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头以加载较旧或较新的结果。 有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <http://mastodon.example/api/v1/admin/domain_allows?limit=2&max_id=2>; rel="next", <http://mastodon.example/api/v1/admin/domain_allows?limit=2&since_id=1>; rel="prev"
```

##### 403: Forbidden

授权用户不允许执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

---

## 获取单个允许的域名 {#get-one}

```http
GET /api/v1/admin/domain_allows/:id HTTP/1.1
```
显示有关单个允许的域名的信息。

**返回:** [Admin::DomainAllow]({{< relref "entities/Admin_DomainAllow" >}})\
**OAuth:** 用户令牌 + `admin:read:domain_allows`\
**权限:** 管理联合\
**版本历史:**\
4.0.0 - 添加

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 DomainAllow 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含`Bearer <user_token>`，以获得对此API方法的访问授权。

#### 响应
##### 200: OK

```json
{
	"id": "1",
	"domain": "mastodon.social",
	"created_at": "2022-09-14T21:23:02.755Z"
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

具有给定 ID 的 DomainAllow 不存在

```json
{
	"error": "Record not found"
}
```

---

## 允许一个域名进行联合 {#create}

```http
POST /api/v1/admin/domain_allows HTTP/1.1
```

将一个域名添加到允许进行联合的域名列表中，当实例处于有限联合模式时使用。

**返回:** [Admin::DomainAllow]({{< relref "entities/Admin_DomainAllow" >}})\
**OAuth:** 用户令牌 + `admin:write:domain_allows`\
**权限:** 管理联合\
**版本历史:**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含`Bearer <user_token>`，以获得对此API方法的访问授权。

##### 表单数据参数

domain
: {{<required>}} 字符串。要允许与其进行联合的域名。

#### 响应
##### 200: OK

域名已被允许进行联合，或者已经被允许进行联合

```json
{
	"id": "1",
	"domain": "mastodon.social",
	"created_at": "2022-09-14T21:23:02.755Z"
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

未提供域名参数或域名参数无效

```json
{
	"error": "Validation failed: Domain can't be blank"
}
```

---

## 删除一个允许的域名 {#delete}

```http
DELETE /api/v1/admin/domain_allows/:id HTTP/1.1
```

从允许的域名列表中删除一个域名。

**返回:** [Admin::DomainAllow]({{< relref "entities/Admin_DomainAllow" >}})\
**OAuth:** 用户令牌 + `admin:write:domain_allows`\
**权限:** 管理联合\
**版本历史:**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 DomainAllow 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含`Bearer <user_token>`，以获得对此API方法的访问授权。

#### 响应
##### 200: OK

允许的域名已从允许列表中删除

```json
{
	"id": "4",
	"domain": "*",
	"created_at": "2022-09-14T21:32:44.945Z"
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

具有给定 ID 的 DomainAllow 不存在

```json
{
	"error": "Record not found"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/domain_allows_controller.rb" caption="app/controllers/api/v1/admin/domain_allows_controller.rb" >}}

{{< translation-status-zh-cn raw_title="domain_allows API methods" raw_link="/methods/admin/domain_allows/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
