---
title: AccountWarning
description: 针对特定帐户的管理警告。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/AccountWarning",
  "/api/entities/AccountWarning",
]
---

## 属性

### `id` {#id}

**描述：** 数据库中帐户警告的 ID。\
**类型：** 字符串（从整数转换而来）\
**版本历史：**\
4.3.0 - 添加

### `action` {#action}

**描述：** 对帐户采取的措施。\
**类型：** 字符串（枚举类型 oneOf）\
`none` = 未采取任何措施，这只是一个简单的警告\
`disable` = 目标账户被停用\
`mark_statuses_as_sensitive` = 来自目标帐户的特定嘟文已被标记为敏感\
`delete_statuses` = 来自目标帐户的特定嘟文已被删除\
`sensitive` = 来自目标帐户的所有嘟文都被标记为敏感\
`silence` = 目标帐户已被限制\
`suspend` = 目标帐户已被封禁\
**版本历史：**\
4.3.0 - 添加

### `text` {#text}

**描述：** 管理员向目标帐户发送的消息。\
**类型：** 字符串\
**版本历史：**\
4.3.0 - 添加

### `status_ids` {#status_ids}

**描述：** 与警告相关的嘟文 ID 列表。当 `action` 为 `mark_statuses_as_sensitive` 或 `delete_statuses` 时，该字段表示受影响的嘟文。\
**类型：** {{<nullable>}} 字符串数组（从整数转换而来），或 null\
**版本历史：**\
4.3.0 - 添加

### `target_account` {#target_account}

**描述：** 管理操作针对的目标帐户。\
**类型：** [Account]({{< relref "entities/Account" >}})\
**版本历史：**\
4.3.0 - 添加

### `appeal` {#appeal}

**描述：** 目标帐户提交的申诉（如有）。\
**类型：** {{<nullable>}} [Appeal]({{< relref "entities/Appeal" >}})，或 null\
**版本历史：**\
4.3.0 - 添加

### `created_at` {#created_at}

**描述：** 事件发生的时间。\
**类型：** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史：**\
4.3.0 - 添加

{{< translation-status-zh-cn raw_title="AccountWarning" raw_link="/entities/AccountWarning/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
