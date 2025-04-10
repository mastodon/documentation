---
title: 用户组
description: 通过管理员仪表板管理用户组。
menu:
  docs:
    parent: admin
---

# 用户组 {#roles}
数据库初始化时，用户组是从[`~/config/roles.yml`](https://github.com/mastodon/mastodon/blob/main/config/roles.yml)中的值派生的。

{{< page-ref page="entities/Role" >}}

生成的[默认用户组](#default-roles)有`所有者`、`管理员`和`协管员`。

可以使用*用户组*(`/admin/roles`)页面上的[添加用户组](#add-role)来创建用户组及其属性。

![](/assets/admin-roles-ui.png)

可以使用[编辑用户组](#edit-role)功能更改现有用户组的属性。

## 默认用户组 {#default-roles}
### 基础用户组（*默认权限*） {#default-base-role}

影响所有用户，包括没有分配用户组的用户。

此用户组唯一可修改的权限标识是**邀请用户**。启用此权限允许所有用户发送邀请。

基础用户组的优先级为`0`，此值不能更改。

### 所有者 {#default-owner-role}

被分配了**管理员**权限标识的用户组，绕过所有权限检查。具有所有者用户组的用户拥有每一个[权限标识](/entities/Role/#permission-flags)。

可以更改该用户组的*名称*、*徽章颜色*和*显示徽章*属性。该用户组的权限不能被编辑/撤销。

所有者用户组具有最高的[优先级](#role-priority)(`1000`)。所有者可以修改任何其他用户组的属性。创建的用户组不能超越所有者用户组，因为新的和现有用户组的[用户组优先级](#role-priority)必须 <= `999`。

### 管理员 {#default-admin-role}

被分配了所有**审核**和**管理**权限标识的用户组。

此用户组的**DevOps**权限标识默认禁用，但可以由**所有者**(或具有更高优先级的自定义用户组)启用。

可以更改该用户组的*名称*、*徽章颜色*和*显示徽章*属性。

管理员用户组的优先级为`100`。

### 协管员 {#default-moderator-role}

被分配了某些**审核**权限标识的用户组。这些权限标识包括...
- **查看仪表板**
- **查看审计日志**
- **管理用户**
- **管理举报**
- **管理分类**

可以更改该用户组的*名称*、*徽章颜色*和*显示徽章*属性。

协管员用户组的优先级为`10`。

## 添加用户组 {#add-role}

`admin/roles/new`页面允许创建自定义用户组。

![](/assets/admin-roles-new-ui.png)

### 输入字段 {#add-role-input-fields}

{{< page-relref ref="entities/Role#name" caption="名称">}}

可以存在重复的用户组名称。它们在数据库中通过`id`区分，该`id`不能从网页界面设置。

{{< page-relref ref="entities/Role#color" caption="徽章颜色">}}

### 优先级 {#role-priority}

- 默认为`0`
  - 不能 > `999`
  - 可以是任何负整数值
- 两个用户组可以具有相同的优先级值

> "在特定情况下，由更高优先级的用户组决定冲突解决方式。某些操作只能对优先级较低的用户组执行。"

{{< page-relref ref="entities/Role#highlighted" caption="在账户页面显示用户组徽章">}}

{{< page-relref ref="entities/Role#permissions" caption="权限">}}


## 编辑用户组 {#edit-role}

![](/assets/admin-roles-edit-ui.png)

可以使用用户组列表中的*编辑*来编辑现有用户组及其属性。[输入字段](#add-role-input-fields)可以更改和保存，就像创建新用户组时一样。也可以使用此表单删除用户组。

![](/assets/admin-roles-edit-role-ui.png)

具有**管理用户组**权限的已登录用户始终能够看到每个用户组，但不能修改超过或等于其分配用户组[优先级](#role-priority)的用户组。

{{< translation-status-zh-cn raw_title="Roles" raw_link="/admin/roles/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
