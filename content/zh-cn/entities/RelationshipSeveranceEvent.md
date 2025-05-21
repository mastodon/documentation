---
title: RelationshipSeveranceEvent
description: 导致关注关系断开的管理或屏蔽事件的摘要。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/RelationshipSeveranceEvent",
  "/api/entities/RelationshipSeveranceEvent",
]
---

## 属性

### `id` {#id}

**描述:** 数据库中关系断开事件的 ID。\
**类型:** 字符串 (从整数转换而来)\
**版本历史:**\
4.3.0 - 添加

### `type` {#type}

**描述:** 事件类型。\
**类型:** 字符串 (可枚举的 oneOf)\
`domain_block` = 审核员封禁了整个域名\
`user_domain_block` = 用户屏蔽了整个域名\
`account_suspension` = 审核员封禁了特定帐户\
**版本历史:**\
4.3.0 - 添加

### `purged` {#purged}

**描述:** 由于导致该事件的问题已被清除，断开的关系列表是否不可用。\
**类型:** 布尔值\
**版本历史:**\
4.3.0 - 添加

### `target_name` {#target_name}

**描述:** 审核/屏蔽事件的目标名称。 这可以是域名或用户名，具体取决于事件类型。\
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

### `followers_count` {#followers_count}

**描述:** 由于该事件而被移除的关注者数量。\
**类型:** 整数\
**版本历史:**\
4.3.0 - 添加

### `following_count` {#following_count}

**描述:** 用户由于该事件而停止关注的帐户数量。\
**类型:** 整数\
**版本历史:**\
4.3.0 - 添加

### `created_at` {#created_at}

**描述:** 事件发生的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.3.0 - 添加

{{< translation-status-zh-cn raw_title="RelationshipSeveranceEvent" raw_link="/entities/RelationshipSeveranceEvent/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
