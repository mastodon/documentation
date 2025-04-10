---
title: email_domain_blocks API 方法
description: 禁止使用某些电子邮件域名注册。
menu:
  docs:
    name: email_domain_blocks
    parent: methods-admin
    identifier: methods-admin-email_domain_blocks
aliases: [
	"/methods/admin/email_domain_blocks",
	"/api/methods/admin/email_domain_blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 列出所有被屏蔽的电子邮件域名 {#get}

```http
GET /api/v1/admin/email_domain_blocks HTTP/1.1
```

显示有关所有被屏蔽注册的电子邮件域名信息。

**返回：** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}}) 数组\
**OAuth：** 用户令牌 + `admin:read:email_domain_blocks`\
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
: 整数。要返回的最大结果数。默认为 100 个屏蔽条目。最大 200 个屏蔽条目。

#### 响应

##### 200: OK

```json
[
  {
    "id": "1",
    "domain": "foo",
    "created_at": "2022-11-16T06:09:36.176Z",
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
        "accounts": "0",
        "uses": "0"
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
    ]
  },
  // ...
]
```

##### 403: Forbidden

授权用户不允许执行此操作，或缺少或无效的 Authorization 标头。

```json
{
  "error": "This action is not allowed"
}
```

---

## 获取单个被屏蔽的电子邮件域名 {#get-one}

```http
GET /api/v1/admin/email_domain_blocks/:id HTTP/1.1
```
显示有关被屏蔽注册的单个电子邮件域名信息。

**返回：** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth：** 用户令牌 + `admin:read:email_domain_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.1.0 - 添加

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 DomainBlock 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "1",
  "domain": "foo",
  "created_at": "2022-11-16T06:09:36.176Z",
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
      "accounts": "0",
      "uses": "0"
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
  ]
}
```

##### 403: Forbidden

授权用户不允许执行此操作，或缺少或无效的 Authorization 标头。

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

具有给定 ID 的 EmailDomainBlock 不存在

```json
{
	"error": "Record not found"
}
```

---

## 屏蔽电子邮件域名 {#create}

```http
POST /api/v1/admin/email_domain_blocks HTTP/1.1
```

将域名添加到被屏蔽的电子邮件域名列表中。

**返回：** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:email_domain_blocks`\
**权限：** 管理屏蔽\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

domain
: {{<required>}} 字符串。要屏蔽与其联合的域名。

#### 响应
##### 200: OK

电子邮件域名已被屏蔽注册。

```json
{
  "id": "1",
  "domain": "foo",
  "created_at": "2022-11-16T06:09:36.176Z",
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
      "accounts": "0",
      "uses": "0"
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
  ]
}
```

##### 403: Forbidden

授权用户不允许执行此操作，或缺少或无效的 Authorization 标头。

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

未提供 domain 参数

```json
{
	"error": "Validation failed: Domain can't be blank"
}
```

或者，提供的域名包含无效字符

```json
{
  "error": "Validation failed: Domain is invalid, Domain is not a valid domain name"
}
```

---

## 删除电子邮件域名屏蔽 {#delete}

```http
DELETE /api/v1/admin/email_domain_blocks/:id HTTP/1.1
```

取消对电子邮件域名的屏蔽。

**返回：** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth：** 用户令牌 + `admin:write:email_domain_blocks`\
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

电子邮件域名已从屏蔽列表中删除

```json
{}
```
##### 403: Forbidden

授权用户不允许执行此操作，或缺少或无效的 Authorization 标头。

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

具有给定 ID 的 EmailDomainBlock 不存在

```json
{
	"error": "Record not found"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/email_domain_blocks_controller.rb" caption="app/controllers/api/v1/admin/email_domain_blocks_controller.rb" >}}

{{< translation-status-zh-cn raw_title="email_domain_blocks API methods" raw_link="/methods/admin/email_domain_blocks/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
