---
title: admin/reports API 方法
description: 根据举报执行管理操作。
menu:
  docs:
    name: reports
    parent: methods-admin
    identifier: methods-admin-reports
aliases: [
  "/methods/admin/reports",
  "/api/methods/admin/reports",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看所有举报 {#get}

```http
GET /api/v1/admin/reports HTTP/1.1
```

查看所有举报的信息。

**返回：** [Admin::Report]({{< relref "entities/Admin_Report" >}}) 数组\
**OAuth:** 用户令牌 + `admin:read:reports`\
**权限：** 管理举报\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

resolved
: 布尔值。是否过滤已解决的举报？

account_id
: 字符串。筛选由此帐户提交的举报。

target_account_id
: 字符串。筛选以此帐户为目标账户的举报。

max_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 100 个举报。最大为 200 个举报。

#### 响应
##### 200: OK

```json
[
	{
		"id": "3",
		"action_taken": false,
		"action_taken_at": null,
		"category": "spam",
		"comment": "",
		"forwarded": false,
		"created_at": "2022-09-09T21:19:23.085Z",
		"updated_at": "2022-09-09T21:19:23.085Z",
		"account": {
			"id": "108965218747268792",
			"username": "admin",
			"domain": null,
			"created_at": "2022-09-08T22:48:07.985Z",
			"email": "admin@mastodon.local",
			// ...
			"account": {
				"id": "108965218747268792",
				"username": "admin",
				"acct": "admin",
				// ...
			}
		},
		"target_account": {
			"id": "108965430868193066",
			"username": "goody",
			"domain": null,
			"created_at": "2022-09-08T23:42:04.731Z",
			"email": "goody@mastodon.local",
			// ...
			"account": {
				"id": "108965430868193066",
				"username": "goody",
				"acct": "goody",
				// ...
			}
		},
		"assigned_account": null,
		"action_taken_by_account": null,
		"statuses": [],
		"rules": []
	},
	// ...
]
```

由于举报 ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载更早或更新的结果。 有关更多信息，请参考[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <http://mastodon.example/api/v1/admin/reports?limit=2&max_id=2>; rel="next", <http://mastodon.example/api/v1/admin/reports?limit=2&since_id=1>; rel="prev"
```

##### 403: Forbidden

授权用户不允许执行此操作，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

---

## 查看单个举报 {#get-one}

```http
GET /api/v1/admin/reports/:id HTTP/1.1
```

**返回：** [Admin::Report]({{< relref "entities/Admin_Report" >}})\
**OAuth:** 用户令牌 + `admin:read:reports`\
**权限：** 管理举报\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中举报的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "2",
  "action_taken": true,
  "action_taken_at": "2022-09-09T21:38:54.679Z",
  "category": "spam",
  "comment": "",
  "forwarded": false,
  "created_at": "2022-09-09T21:19:44.021Z",
  "updated_at": "2022-09-09T21:38:54.681Z",
  "account": {
    "id": "108965218747268792",
    "username": "admin",
    "domain": null,
    "created_at": "2022-09-08T22:48:07.985Z",
    "email": "admin@mastodon.local",
    // ...
    "account": {
      "id": "108965218747268792",
      "username": "admin",
      "acct": "admin",
      // ...
    }
  },
  "target_account": {
    "id": "108965430868193066",
    "username": "goody",
    "domain": null,
    "created_at": "2022-09-08T23:42:04.731Z",
    "email": "goody@mastodon.local",
    // ...
    "account": {
      "id": "108965430868193066",
      "username": "goody",
      "acct": "goody",
      // ...
    }
  },
  "assigned_account": null,
  "action_taken_by_account": {
    "id": "108965218747268792",
    "username": "admin",
    "domain": null,
    "created_at": "2022-09-08T22:48:07.985Z",
    "email": "admin@mastodon.local",
    // ...
    "account": {
      "id": "108965218747268792",
      "username": "admin",
      "acct": "admin",
      // ...
    }
  },
  "statuses": [],
  "rules": []
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

## 更新举报 {#update}

```http
PUT /api/v1/admin/reports/:id HTTP/1.1
```

更改举报的元数据。

**返回：** [Admin::Report]({{< relref "entities/Admin_Report" >}})\
**OAuth:** 用户令牌 + `admin:write:reports`\
**权限：** 管理举报\
**版本历史：**\
3.5.0 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中举报的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

category
: 字符串。将举报的分类更改为 `spam`、`violation` 或 `other`。

rule_ids[]
: 整数数组。对于 `violation` 类别的举报，指定违反的确切规则的 ID。规则及其 ID 可通过 [GET /api/v1/instance/rules]({{< relref "methods/instance#rules" >}}) 和 [GET /api/v1/instance]({{< relref "methods/instance#get" >}}) 获取。

#### 响应
##### 200: OK

举报类别和/或规则 ID 现在应该已更新。

```json
{
  "id": "3",
  "action_taken": false,
  "action_taken_at": null,
  "category": "other",
  // ...
  "rules": []
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

## 将举报分配给自己 {#assign_to_self}

```http
POST /api/v1/admin/reports/:id/assign_to_self HTTP/1.1
```

声明对此举报的处理权。

**返回：** [Admin::Report]({{< relref "entities/Admin_Report" >}})\
**OAuth:** 用户令牌 + `admin:write:reports`\
**权限：** 管理举报\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中举报的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

举报现在应该已分配给你，或者它已经分配给你。

```json
{
  "id": "3",
  "action_taken": false,
  "action_taken_at": null,
  "category": "other",
  "comment": "",
  "forwarded": false,
  "created_at": "2022-09-09T21:21:01.204Z",
  "updated_at": "2022-09-11T14:39:01.531Z",
  // ...
  "assigned_account": {
    "id": "108965218747268792",
    "username": "admin",
    "domain": null,
    "created_at": "2022-09-08T22:48:07.985Z",
    "email": "admin@mastodon.local",
    // ...
    "account": {
      "id": "108965218747268792",
      "username": "admin",
      "acct": "admin",
      // ...
    }
  },
  "action_taken_by_account": null,
  "statuses": [],
  "rules": []
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

## 取消举报分配 {#unassign}

```http
POST /api/v1/admin/reports/:id/unassign HTTP/1.1
```

取消分配举报，以便其他人可以认领它。

**返回：** [Admin::Report]({{< relref "entities/Admin_Report" >}})\
**OAuth:** 用户令牌 + `admin:write:reports`\
**权限：** 管理举报\
**版本历史：**\
2.9.1 - 添加
4.  0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中举报的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

举报应该不再分配给你，或者它已经没有分配给任何人。

```json
{
  "id": "3",
  "action_taken": false,
  "action_taken_at": null,
  "category": "other",
  "comment": "",
  "forwarded": false,
  "created_at": "2022-09-09T21:21:01.204Z",
  "updated_at": "2022-09-11T14:39:01.531Z",
  // ...
  "assigned_account": null,
  "action_taken_by_account": null,
  "statuses": [],
  "rules": []
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

## 将举报标记为已解决 {#resolve}

```http
POST /api/v1/admin/reports/:id/resolve HTTP/1.1
```

将举报标记为已解决，无需采取进一步措施。

**返回：** [Admin::Report]({{< relref "entities/Admin_Report" >}})\
**OAuth:** 用户令牌 + `admin:write:reports`\
**权限：** 管理举报\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中举报的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

举报现在已解决，或者它已经解决。

```json
{
  "id": "2",
  "action_taken": true,
  "action_taken_at": "2022-09-11T14:46:22.936Z",
  "category": "spam",
  "comment": "",
  "forwarded": false,
  "created_at": "2022-09-09T21:19:44.021Z",
  "updated_at": "2022-09-11T14:46:22.945Z",
  // ...
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

## 重新打开已关闭的举报 {#reopen}

```http
POST /api/v1/admin/reports/:id/reopen HTTP/1.1
```

若举报已关闭，则重新打开当前已关闭的举报。

**返回：** [Admin::Report]({{< relref "entities/Admin_Report" >}})\
**OAuth:** 用户令牌 + `admin:write:reports`\
**权限：** 管理举报\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中举报的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

该举报不再有任何已采取的措施，或者它已经没有任何已采取的措施。

```json
{
  "id": "2",
  "action_taken": false,
  "action_taken_at": null,
  "category": "spam",
  "comment": "",
  "forwarded": false,
  "created_at": "2022-09-09T21:19:44.021Z",
  "updated_at": "2022-09-11T14:42:21.855Z",
  // ...
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

## 另请参考

{{< page-relref ref="methods/admin/accounts#action" caption="POST /api/v1/admin/accounts/:id/action" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/reports_controller.rb" caption="app/controllers/api/v1/admin/reports_controller.rb" >}}

{{< translation-status-zh-cn raw_title="reports API methods" raw_link="/methods/admin/reports/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
