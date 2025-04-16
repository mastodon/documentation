---
title: admin/domain_blocks API 方法
description: 禁止某些域名参与联合。
menu:
  docs:
    name: domain_blocks
    parent: methods-admin
    identifier: methods-admin-domain_blocks
aliases: [
	"/methods/admin/domain_blocks",
	"/api/methods/admin/domain_blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 列出所有被屏蔽的域名 {#get}

```http
GET /api/v1/admin/domain_blocks HTTP/1.1
```

显示所有被屏蔽的域名的信息。

**返回：** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}}) 数组\
**OAuth：** 用户令牌 + `admin:read:domain_blocks`\
**权限：** 管理联合\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 查询参数

max_id 
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 100 个屏蔽域名。最多 200 个屏蔽域名。

#### 响应

##### 200: OK

```json
[
  {
    "id": "1",
    "domain": "example.com",
    "digest": "a379a6f6eeafb9a55e378c118034e2751e682fab9f2d30ab13d2125586ce1947",
    "created_at": "2022-11-16T08:15:34.238Z",
    "severity": "noop",
    "reject_media": false,
    "reject_reports": false,
    "private_comment": null,
    "public_comment": null,
    "obfuscate": false
  },
  // ...
]
```

由于 DomainBlock ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头以加载较旧或较新的结果。 有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <http://mastodon.example/api/v1/admin/domain_blocks?limit=2&max_id=2>; rel="next", <http://mastodon.example/api/v1/admin/domain_blocks?limit=2&since_id=1>; rel="prev"
```

##### 403: Forbidden

授权用户无权执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

---

## 获取单个被屏蔽的域名 {#get-one}

```http
GET /api/v1/admin/domain_blocks/:id HTTP/1.1
```
显示有关单个被屏蔽域名的信息。

**返回：** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth：** 用户令牌 + `admin:read:domain_blocks`\
**权限：** 管理联合\
**版本历史：**\
4.0.0 - 添加

##### 路径参数

:id
: {{<required>}} 字符串。 数据库中 DomainBlock 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "1",
  "domain": "example.com",
  "digest": "a379a6f6eeafb9a55e378c118034e2751e682fab9f2d30ab13d2125586ce1947",
  "created_at": "2022-11-16T08:15:34.238Z",
  "severity": "noop",
  "reject_media": false,
  "reject_reports": false,
  "private_comment": null,
  "public_comment": null,
  "obfuscate": false
}
```

##### 403: Forbidden

授权用户无权执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

不存在具有给定 ID 的 DomainBlock

```json
{
  "error": "Record not found"
}
```

---

## 阻止域名参与联合 {#create}

```http
POST /api/v1/admin/domain_blocks HTTP/1.1
```

将域名添加到被阻止参与联合的域名列表中。

**返回：** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:domain_blocks`\
**权限：** 管理联合\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

domain
: {{<required>}} 字符串。 要阻止联合的域名。

severity
: 字符串。 是否对域名应用 `silence`、`suspend` 或 `noop`。 默认为 `silence`

reject_media
: 布尔值。 是否应拒绝媒体附件。 默认为 false

reject_reports
: 布尔值。 是否应拒绝来自此域名的举报。 默认为 false

private_comment
: 字符串。 关于此域名屏蔽的私密注释，仅管理员可见。

public_comment
: 字符串。 关于此域名屏蔽的公开注释，可以选择在“关于”页面上显示。

obfuscate
: 布尔值。 是否在公开显示时部分遮挡该域名。 默认为 false

#### 响应
##### 200: OK

该域名已被阻止参与联合。

```json
{
  "id": "1",
  "domain": "example.com",
  "digest": "a379a6f6eeafb9a55e378c118034e2751e682fab9f2d30ab13d2125586ce1947",
  "created_at": "2022-11-16T08:15:34.238Z",
  "severity": "noop",
  "reject_media": false,
  "reject_reports": false,
  "private_comment": null,
  "public_comment": null,
  "obfuscate": false
}
```

##### 403: Forbidden

授权用户无权执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity-缺少参数

未提供域名参数

```json
{
  "error": "Validation failed: Domain can't be blank"
}
```

##### 422: Unprocessable entity-已有域名屏蔽

域名参数已包含在现有的域名屏蔽中。

```json
{
  "error": "You have already imposed stricter limits on example.com."
  "existing_domain_block": {
    "id": "1",
    "domain": "example.com",
    "digest": "a379a6f6eeafb9a55e378c118034e2751e682fab9f2d30ab13d2125586ce1947",
    "created_at": "2022-11-16T08:15:34.238Z",
    "severity": "noop",
    "reject_media": false,
    "reject_reports": false,
    "private_comment": null,
    "public_comment": null,
    "obfuscate": false
  }
}
```

---

## 更新域名屏蔽 {#update}

```http
PUT /api/v1/admin/domain_blocks/:id HTTP/1.1
```

更改现有域名屏蔽的参数。

**返回：** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:domain_blocks`\
**权限：** 管理联合\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。 数据库中 DomainAllow 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

severity
: 字符串。 是否对域名应用 `silence`、`suspend` 或 `noop`。 默认为 `silence`

reject_media
: 布尔值。 是否应拒绝媒体附件。 默认为 false

reject_reports
: 布尔值。 是否应拒绝来自此域名的举报。 默认为 false

private_comment
: 字符串。 关于此域名屏蔽的私密注释，仅管理员可见。

public_comment
: 字符串。 关于此域名屏蔽的公开注释，可以选择在“关于”页面上显示。

obfuscate
: 布尔值。 是否在公开显示时部分审查该域名。 默认为 false

#### 响应
##### 200: OK

域名屏蔽已更新

```json
{
  "id": "1",
  "domain": "example.com",
  "digest": "a379a6f6eeafb9a55e378c118034e2751e682fab9f2d30ab13d2125586ce1947",
  "created_at": "2022-11-16T08:15:34.238Z",
  "severity": "noop",
  "reject_media": false,
  "reject_reports": false,
  "private_comment": null,
  "public_comment": null,
  "obfuscate": false
}
```

##### 403: Forbidden

授权用户无权执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 500: 实例错误
<!-- TODO: remove when https://github.com/mastodon/mastodon/issues/21775 is fixed -->
屏蔽级别无效

---

## 删除域名屏蔽 {#delete}

```http
DELETE /api/v1/admin/domain_blocks/:id HTTP/1.1
```

取消对域名的屏蔽。

**返回：** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:domain_blocks`\
**权限：** 管理联合\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。 数据库中 DomainAllow 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

该域名已从屏蔽列表中删除

```json
{}
```
##### 403: Forbidden

授权用户无权执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

不存在具有给定 ID 的 DomainBlock

```json
{
  "error": "Record not found"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/domain_blocks_controller.rb" caption="app/controllers/api/v1/admin/domain_blocks_controller.rb" >}}
{{< translation-status-zh-cn raw_title="domain_blocks API methods" raw_link="/methods/admin/domain_blocks/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
