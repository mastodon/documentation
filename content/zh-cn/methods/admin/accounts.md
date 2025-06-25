---
title: admin/accounts API 方法
description: 使用帐户执行管理操作。
menu:
  docs:
    name: accounts
    parent: methods-admin
    identifier: methods-admin-accounts
aliases: [
  "/methods/admin/accounts",
  "/api/methods/admin/accounts",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看帐户 (v1) {#v1}

```http
GET /api/v1/admin/accounts HTTP/1.1
```

查看所有帐户，可以选择匹配某些筛选条件，一次最多 100 个。可以使用响应中的 HTTP Link 标头进行分页。有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}}) 数组\
**OAuth：** 用户令牌 + `admin:read:accounts`\
**权限：** 管理用户\
**版本历史：**\
2.9.1 - 添加\
3.3.0 - 添加 `sensitized`\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

##### 查询参数

local
: 布尔值. 筛选本站帐户？

remote
: 布尔值. 筛选外站帐户？

active
: 布尔值. 筛选当前活跃的帐户？

pending
: 布尔值. 筛选当前待批准的帐户？

disabled
: 布尔值. 筛选当前已禁用的帐户？

silenced
: 布尔值. 筛选当前已隐藏的帐户？

suspended
: 布尔值. 筛选当前已封禁的帐户？

sensitized
: 布尔值. 筛选强制标记为敏感的帐户？

username
: 字符串. 搜索给定的用户名。

display_name
: 字符串. 搜索给定的昵称。

by_domain
: 字符串. 按给定的域名筛选。

email
: 字符串. 查找具有此电子邮件的用户。

ip
: 字符串. 查找具有此 IP 地址的用户。

staff
: 布尔值. 筛选职员帐户？

max_id
: 字符串. 返回的所有结果都将小于此 ID。事实上设置结果的上限。

since_id
: 字符串. 返回的所有结果都将大于此 ID。事实上设置结果的下限。

min_id
: 字符串. 返回与此 ID 相邻且更新的结果。事实上在此 ID 处设置游标并向前分页。

limit
: Integer. 要返回的最大结果数。默认为 100 个帐户。最多 200 个帐户。

#### 响应
##### 200: OK

```json
[
  {
    "id": "108267707882207829",
    "username": "trwnh",
    "domain": null,
    "created_at": "2022-05-08T18:21:56.870Z",
    "email": "trwnh@mastodon.local",
    "ip": {
      "user_id": 2,
      "ip": "192.168.42.1",
      "used_at": "2022-05-08T18:21:56.944Z"
    },
    "role": "user",
    "confirmed": false,
    "suspended": false,
    "silenced": false,
    "disabled": false,
    "approved": true,
    "locale": "en",
    "invite_request": null,
    "ips": [
      {
        "ip": "192.168.42.1",
        "used_at": "2022-05-08T18:21:56.944Z"
      }
    ],
    "account": {
      "id": "108267707882207829",
      "username": "trwnh",
      "acct": "trwnh",
      // ...
    }
  },
  {
    "id": "108267695853695427",
    "username": "admin",
    "domain": null,
    "created_at": "2022-05-08T18:18:53.221Z",
    "email": "admin@mastodon.local",
    "ip": {
      "user_id": 1,
      "ip": "192.168.42.1",
      "used_at": "2022-09-08T16:10:38.621Z"
    },
    "role": "admin",
    "confirmed": true,
    "suspended": false,
    "silenced": false,
    "disabled": false,
    "approved": true,
    "locale": null,
    "invite_request": null,
    "ips": [
      {
        "ip": "192.168.42.1",
        "used_at": "2022-09-08T16:10:38.621Z"
      }
    ],
    "account": {
      "id": "108267695853695427",
      "username": "admin",
      "acct": "admin",
      // ...
    }
  }
]
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失

```json
{
  "error": "This action is not allowed"
}
```

---

## 查看帐户 (v2) {#v2}

```http
GET /api/v2/admin/accounts HTTP/1.1
```

查看所有帐户，可以选择匹配某些筛选条件，一次最多 100 个。可以使用响应中的 HTTP Link 标头进行分页。有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}}) 数组\
**OAuth：** 用户令牌 + `admin:read:accounts`\
**权限：** 管理用户\
**版本历史：**\
3.5.0 - 添加\
4.0.0 - 添加 `role_ids`。支持自定义用户组和权限

#### 请求

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

##### 查询参数

origin
: 字符串. 筛选 `local` 或 `remote` 帐户。

status
: 字符串. 筛选 `active`、`pending`、`disabled`、`silenced` 或 `suspended` 帐户。

permissions
: 字符串. 筛选具有 `staff` 权限的帐户（可以管理举报的用户）。

role_ids[]
: Array of String. 筛选具有这些用户组的用户。

invited_by
: 字符串. 查找由此 ID 的帐户邀请的用户。

username
: 字符串. 搜索给定的用户名。

display_name
: 字符串. 搜索给定的昵称。

by_domain
: 字符串. 按给定的域名筛选。

email
: 字符串. 查找具有此电子邮件的用户。

ip
: 字符串. 查找具有此 IP 地址的用户。

max_id
: 字符串. 返回的所有结果都将小于此 ID。事实上设置结果的上限。

since_id
: 字符串. 返回的所有结果都将大于此 ID。事实上设置结果的下限。

min_id
: 字符串. 返回与此 ID 相邻且更新的结果。事实上在此 ID 处设置游标并向前分页。

limit
: Integer. 要返回的最大结果数。默认为 100 个帐户。最多 200 个帐户。

#### 响应
##### 200: OK

```json
[
  {
    "id": "108267695853695427",
    "username": "admin",
    "domain": null,
    "created_at": "2022-05-08T18:18:53.221Z",
    "email": "admin@mastodon.local",
    "ip": {
      "user_id": 1,
      "ip": "192.168.42.1",
      "used_at": "2022-09-08T16:10:38.621Z"
    },
    "role": {
		"id": 3,
		"name": "Owner",
		"color": "#3584e4",
		"position": 1000,
		"permissions": 1,
		"highlighted": true,
		"created_at": "2022-09-08T22:48:07.983Z",
		"updated_at": "2022-09-09T10:45:13.226Z"
	},
    "confirmed": true,
    "suspended": false,
    "silenced": false,
    "disabled": false,
    "approved": true,
    "locale": null,
    "invite_request": null,
    "ips": [
      {
        "ip": "192.168.42.1",
        "used_at": "2022-09-08T16:10:38.621Z"
      }
    ],
    "account": {
      "id": "108267695853695427",
      "username": "admin",
      "acct": "admin",
      // ...
    }
  }
]
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失

```json
{
  "error": "This action is not allowed"
}
```

---

## 查看特定帐户 {#get-one}

```http
GET /api/v1/admin/accounts/:id HTTP/1.1
```

查看有关给定帐户的管理级别的的信息。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth：** 用户令牌 + `admin:read:accounts`\
**权限：** 管理用户\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
	"id": "108267695853695427",
	"username": "admin",
	"domain": null,
	"created_at": "2022-05-08T18:18:53.221Z",
	"email": "admin@mastodon.local",
	"ip": {
		"user_id": 1,
		"ip": "192.168.42.1",
		"used_at": "2022-09-08T16:10:38.621Z"
	},
	"role": {
		"id": 3,
		"name": "Owner",
		"color": "",
		"position": 1000,
		"permissions": 1,
		"highlighted": true,
		"created_at": "2022-09-08T22:48:07.983Z",
		"updated_at": "2022-09-08T22:48:07.983Z"
	},
	"confirmed": true,
	"suspended": false,
	"silenced": false,
	"disabled": false,
	"approved": true,
	"locale": null,
	"invite_request": null,
	"ips": [
		{
			"ip": "192.168.42.1",
			"used_at": "2022-09-08T16:10:38.621Z"
		}
	],
	"account": {
		"id": "108267695853695427",
		"username": "admin",
		"acct": "admin",
		// ...
	}
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

帐户不存在

```json
{
	"error": "Record not found"
}
```

---

## 批准待批准的帐户 {#approve}

```http
POST /api/v1/admin/accounts/:id/approve HTTP/1.1
```

若给定的本站帐户当前正在等待批准，则批准该帐户。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth：** 用户令牌 + `admin:write:accounts`\
**权限：** 管理用户\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

该帐户现已批准

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  // ...
  "approved": true,
  // ...
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失，或者帐户当前未决。

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

帐户不存在

```json
{
	"error": "Record not found"
}
```

---

## 拒绝待批准的帐户 {#reject}

```http
POST /api/v1/admin/accounts/:id/reject HTTP/1.1
```

若给定的本站帐户当前正在等待批准，则拒绝该帐户。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth：** 用户令牌 + `admin:write:accounts`\
**权限：** 管理用户\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "108965436418975594",
  "username": "badguy",
  "domain": null,
  "created_at": "2022-09-08T23:43:29.427Z",
  "email": "badguy@mastodon.local",
  "ip": null,
  "role": {
    "id": -99,
    "name": "",
    "color": "",
    "position": -1,
    "permissions": 65536,
    "highlighted": false,
    "created_at": "2022-09-08T22:48:07.977Z",
    "updated_at": "2022-09-08T22:48:07.977Z"
  },
  "confirmed": true,
  "suspended": false,
  "silenced": false,
  "disabled": false,
  "approved": false,
  "locale": "en",
  "invite_request": "i am going to commit crimes",
  "ips": [],
  "account": {
    "id": "108965436418975594",
    "username": "badguy",
    "acct": "badguy",
    "display_name": "",
    "locked": false,
    "bot": false,
    "discoverable": null,
    "group": false,
    "created_at": "2022-09-08T00:00:00.000Z",
    "note": "",
    "url": "http://mastodon.local/@badguy",
    "avatar": "http://mastodon.local/avatars/original/missing.png",
    "avatar_static": "http://mastodon.local/avatars/original/missing.png",
    "header": "http://mastodon.local/headers/original/missing.png",
    "header_static": "http://mastodon.local/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 0,
    "last_status_at": null,
    "emojis": [],
    "fields": []
  }
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失，或者帐户当前未决。

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

帐户不存在

```json
{
  "error": "Record not found"
}
```

---

## 删除帐户 {#delete}

```http
DELETE /api/v1/admin/accounts/:id HTTP/1.1
```

永久删除已封禁帐户的数据。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth：** 用户令牌 + `admin:write:accounts`\
**权限：** 删除用户数据\
**版本历史：**\
3.3.0 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已删除帐户的数据。

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  "email": "goody@mastodon.local",
  "ip": {
    "user_id": 3,
    "ip": "192.168.42.1",
    "used_at": "2022-09-08T23:42:04.761Z"
  },
  "role": {
    "id": -99,
    "name": "",
    "color": "",
    "position": -1,
    "permissions": 65536,
    "highlighted": false,
    "created_at": "2022-09-08T22:48:07.977Z",
    "updated_at": "2022-09-08T22:48:07.977Z"
  },
  "confirmed": true,
  "suspended": true,
  "silenced": false,
  "disabled": false,
  "approved": true,
  "locale": "en",
  "invite_request": "this is a compelling reason",
  "ips": [
    {
      "ip": "192.168.42.1",
      "used_at": "2022-09-08T23:42:04.761Z"
    }
  ],
  "account": {
    "id": "108965430868193066",
    "username": "goody",
    "acct": "goody",
    "display_name": "",
    "locked": false,
    "bot": false,
    "discoverable": false,
    "group": false,
    "created_at": "2022-09-08T00:00:00.000Z",
    "note": "",
    "url": "http://mastodon.local/@goody",
    "avatar": "http://mastodon.local/avatars/original/missing.png",
    "avatar_static": "http://mastodon.local/avatars/original/missing.png",
    "header": "http://mastodon.local/headers/original/missing.png",
    "header_static": "http://mastodon.local/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 0,
    "last_status_at": null,
    "suspended": true,
    "emojis": [],
    "fields": []
  }
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失，或者帐户已被删除。

```json
{
  "error": "This action is not allowed"
}
```

---

## 对帐户执行操作 {#action}

```http
POST /api/v1/admin/accounts/:id/action HTTP/1.1
```

对帐户执行操作，并将此操作记录在管理历史记录中。还会解决针对此帐户的任何未处理的举报。

**返回：** 空\
**OAuth：** 用户令牌 + `admin:write:accounts`\
**权限：** 管理用户，管理举报\
**版本历史：**\
2.9.1 - 添加\
3.3.0 - 添加 `sensitive` 作为可能的 `type`\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

##### 表单数据参数

type
: {{<required>}} 字符串. 要执行的操作的类型：`none`、`sensitive`、`disable`、`silence` 或 `suspend`。

report_id
: 字符串. 导致采取此操作的相关举报的 ID。

warning_preset_id
: 字符串. 预设警告的 ID。

text
: 字符串. 采取此操作的原因的其他说明。

send_email_notification
: 布尔值. 是否应将包含上述信息的电子邮件发送给用户？

#### 响应
##### 200: OK

该操作已成功执行

```json
{}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

具有给定 ID 的帐户或举报不存在

```json
{
  "error": "Record not found"
}
```

##### 422: Server error

未提供 `type` 或无法识别

```json
{
  "error": "Record invalid"
}
```

---

## 启用当前已停用的帐户 {#enable}

```http
POST /api/v1/admin/accounts/:id/enable HTTP/1.1
```

重新启用当前已停用的本站帐户。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth：** 用户令牌 + `admin:write:accounts`\
**权限：** 管理用户\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已启用的帐户。

```json
{
	"id": "108965430868193066",
	"username": "goody",
	"domain": null,
	"created_at": "2022-09-08T23:42:04.731Z",
	// ...
	"disabled": false,
	// ...
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

帐户不存在

```json
{
  "error": "Record not found"
}
```

---

## 取消帐户的隐藏 {#unsilence}

```http
POST /api/v1/admin/accounts/:id/unsilence HTTP/1.1
```

若帐户当前已隐藏，则取消隐藏。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth：** 用户令牌 + `admin:write:accounts`\
**权限：** 管理用户\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已取消帐户的隐藏，或未被隐藏

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  // ...
  "silenced": false,
  // ...
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

帐户不存在

```json
{
  "error": "Record not found"
}
```

---

## 取消封禁帐户 {#unsuspend}

```http
POST /api/v1/admin/accounts/:id/unsuspend HTTP/1.1
```

取消封禁当前已封禁的帐户。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth：** 用户令牌 + `admin:write:accounts`\
**权限：** 管理用户\
**版本历史：**\
2.9.1 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

帐户成功取消封禁

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  // ...
  "suspended": false,
  // ...
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失，或者帐户当前未封禁

```json
{
	"error": "This action is not allowed"
}
```

##### 404: Not found

帐户不存在

```json
{
	"error": "Record not found"
}
```

---

## 取消将帐户标记为敏感 {#unsensitive}

```http
POST /api/v1/admin/accounts/:id/unsensitive HTTP/1.1
```

若账户之前已标记为敏感，则停止将帐户的嘟文标记为敏感。

**返回：** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth：** 用户令牌 + `admin:write:accounts`\
**权限：** 管理用户\
**版本历史：**\
3.3.0 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串. 数据库中帐户的 ID。

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

该帐户不再标记为敏感，或者未标记为敏感。

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  // ...
  "sensitized": false,
  // ...
}
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或丢失

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

帐户不存在

```json
{
	"error": "Record not found"
}
```

---

## 另请参阅

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/accounts_controller.rb" caption="app/controllers/api/v1/admin/accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/account_actions_controller.rb" caption="app/controllers/api/v1/admin/account_actions_controller.rb" >}}

{{< translation-status-zh-cn raw_title="accounts API methods" raw_link="/methods/admin/accounts/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
