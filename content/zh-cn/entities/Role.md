---
title: Role
description: 表示带有自定义权限设定的用户组。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/role",
	"/entities/Role",
	"/api/entities/role",
	"/api/entities/Role",
]
---

## 示例

```json
{
	"id": "3",
	"name": "Owner",
	"color": "#ff3838",
	"permissions": "1048575",
	"highlighted": true
}
```

## 属性

### `id` {#id}

**描述:** 数据库中用户组的 ID。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `name` {#name}

**描述:** 用户组的名称。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `color` {#color}

**描述:** 分配给此用户组的十六进制代码。如果未分配十六进制代码，则字符串将为空。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `permissions` {#permissions}

**描述:** 一个位掩码，表示授予该用户组的所有权限的总和。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `highlighted` {#highlighted}

**描述:** 是否在用户账户页上公开显示该用户组徽章。\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

## 权限标志

要确定特定用户组可用的权限，请将 `permissions` 属性转换为二进制，然后从最低有效位开始进行比较。为了方便起见（并防止术语变得太长），权限将在下面使用十六进制值表示。

0x1
: **Administrator（管理员）**。拥有此权限的用户将绕过所有权限。

0x2
: **Devops（运维）**。允许用户访问 Sidekiq 和 PgHero 仪表板。

0x4
: **View Audit Log（查看审计日志）**。允许用户查看管理员操作的历史记录。

0x8
: **View Dashboard（查看仪表板）**。允许用户访问仪表板和各种指标。

0x10
: **Manage Reports（管理举报）**。允许用户审查举报并对其执行管理操作。

0x20
: **Manage Federation（管理联合）**。允许用户阻止或允许与其他域的联合，并控制可交付性。

0x40
: **Manage Settings（管理设置）**。允许用户更改站点设置。

0x80
: **Manage Blocks（管理屏蔽）**。允许用户屏蔽电子邮件提供商和 IP 地址。

0x100
: **Manage Taxonomies（管理热门内容）**。允许用户查看热门内容并更新话题标签设置。

0x200
: **Manage Appeals（管理申诉）**。允许用户审查针对管理操作的申诉。

0x400
: **Manage Users（管理用户）**。允许用户查看其他用户的详细信息并对其执行管理操作。

0x800
: **Manage Invites（管理邀请）**。允许用户浏览和停用邀请链接。

0x1000
: **Manage Rules（管理规则）**。允许用户更改实例规则。

0x2000
: **Manage Announcements（管理公告）**。允许用户管理实例上的公告。

0x4000
: **Manage Custom Emojis（管理自定义表情）**。允许用户管理实例上的自定义表情。

0x8000
: **Manage Webhooks（管理 Webhook）**。允许用户为管理事件设置 Webhook。

0x10000
: **Invite Users（邀请用户）**。允许用户邀请新人加入实例。

0x20000
: **Manage Roles（管理用户组）**。允许用户管理和分配权限低于其用户组权限的用户组。

0x40000
: **Manage User Access（管理用户权限）**。允许用户禁用其他用户的双因素身份验证、更改其电子邮件地址和重置其密码。

0x80000
: **Delete User Data（删除用户数据）**。允许用户立即删除其他用户的数据。

## 另请参见

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/role_serializer.rb" caption="app/serializers/rest/role_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Role" raw_link="/entities/Role/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
