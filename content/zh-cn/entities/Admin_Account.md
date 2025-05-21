---
title: Admin::Account
description: 给定账户在管理视图下的信息。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-account",
  "/entities/Admin-Account",
  "/entities/admin_account",
  "/entities/Admin_Account",
  "/api/entities/admin-account",
  "/api/entities/Admin-Account",
  "/api/entities/admin_account",
  "/api/entities/Admin_Account",
]
---

## 示例

```json
{
  "id": "108965278956942133",
  "username": "admin",
  "domain": null,
  "created_at": "2022-09-08T23:03:26.762Z",
  "email": "admin@mastodon.local",
  "ip": "192.168.42.1",
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
      "used_at": "2022-09-15T01:38:58.851Z"
    }
  ],
  "account": {
    "id": "108965278956942133",
    "username": "admin",
    "acct": "admin",
    "display_name": "",
    "locked": false,
    "bot": false,
    "discoverable": null,
    "group": false,
    "created_at": "2022-09-08T00:00:00.000Z",
    "note": "",
    "url": "http://mastodon.local/@admin",
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

## 属性

### `id` {#id}

**描述:** 数据库中账户的 ID。\
**类型:** 字符串（从整数转换而来，但不保证一定为数字）\
**版本历史:**\
2.9.1 - 添加

### `username` {#username}

**描述:** 账户的用户名。\
**类型:** 字符串\
**版本历史:**\
2.9.1 - 添加

### `domain` {#domain}

**描述:** 外站账户的域名。\
**类型:** {{<nullable>}} 字符串，对本站账户为 null\
**版本历史:**\
2.9.1 - 添加

### `created_at` {#created_at}

**描述:** 账户首次被发现的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
2.9.1 - 添加

### `email` {#email}

**描述:** 与账户关联的电子邮件地址。\
**类型:** 字符串\
**版本历史:**\
2.9.1 - 添加

### `ip` {#ip}

**描述:** 最后一次登录此账户使用的 IP 地址。\
**类型:** {{<nullable>}} 字符串\
**版本历史:**\
2.9.1 - 添加\
3.5.0 - 由于一个错误，返回类型从 String 更改为 [Admin::Ip]({{< relref "entities/Admin_Ip" >}})\
4.0.0 - 错误已修复，返回类型现在再次为 String

### `ips` {#ip}

**描述:** 与此账户关联的所有已知 IP 地址。\
**类型:** [Admin::Ip]({{< relref "entities/Admin_Ip" >}}) 数组\
**版本历史:**\
3.5.0 - 添加

### `locale` {#locale}

**描述:** 账户的语言设置。\
**类型:** 字符串（ISO 639 Part 1 双字符语言代码）\
**版本历史:**\
2.9.1 - 添加

### `invite_request` {#invite_request}

**描述:** 请求邀请时给出的理由（对于需要手动批准注册的实例）\
**类型:** {{<nullable>}} 字符串\
**版本历史:**\
2.9.1 - 添加

### `role` {#role}

**描述:** 账户的当前用户组。\
**类型:** [Role]({{<relref "entities/role">}})\
**版本历史:**\
2.9.1 - 添加，返回一个 String (可枚举，`user` `moderator` `admin` 其中之一)\
4.0.0 - 现在使用 Role 实体

### `confirmed` {#confirmed}

**描述:** 账户是否已确认其电子邮件地址。\
**类型:** 布尔值\
**版本历史:**\
2.9.1 - 添加

### `approved` {#approved}

**描述:** 账户当前是否已批准。\
**类型:** 布尔值\
**版本历史:**\
2.9.1 - 添加

### `disabled` {#disabled}

**描述:** 账户当前是否已被禁用。\
**类型:** 布尔值\
**版本历史:**\
2.9.1 - 添加

### `silenced` {#silenced}

**描述:** 账户当前是否已被隐藏。
**类型:** 布尔值\
**版本历史:**\
2.9.1 - 添加

### `suspended` {#suspended}

**描述:** 账户当前是否已被封禁。\
**类型:** 布尔值\
**版本历史:**\
2.9.1 - 添加

### `account` {#account}

**描述:** 关于账户的用户级信息。\
**类型:** [Account]({{< relref "entities/account" >}})\
**版本历史:**\
2.9.1 - 添加

### `created_by_application_id` {{%optional%}} {#created_by_application_id}

**描述:** 创建此帐户的 [Application]({{< relref "entities/application" >}}) 的 ID（如果适用）。\
**类型:** 字符串（从整数转换而来，但不保证一定为数字）\
**版本历史:**\
2.9.1 - 添加

### `invited_by_account_id` {{%optional%}} {#invited_by_account_id}

**描述:** 邀请此用户的 [Account]({{< relref "entities/account" >}}) 的 ID（如果适用）。\
**类型:** 字符串（从整数转换而来，但不保证一定为数字）\
**版本历史:**\
2.9.1 - 添加

## 另请参考

{{< page-relref ref="methods/admin/accounts" caption="admin/accounts API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/account_serializer.rb" caption="app/serializers/rest/admin/account_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::Account" raw_link="/entities/Admin_Account/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
