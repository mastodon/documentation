---
title: Admin::Report
description: 关于已提交举报的管理级信息。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-report",
  "/entities/Admin-Report",
  "/entities/admin_report",
  "/entities/Admin_Report",
  "/api/entities/admin-report",
  "/api/entities/Admin-Report",
  "/api/entities/admin_report",
  "/api/entities/Admin_Report",
]
---

## 示例

```json
{
  "id": "1",
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
}
```

## 属性

### `id` {#id}

**描述:** 数据库中举报的ID。\
**类型:** 字符串 (从整数转换而来，但不保证是一个数字)\
**版本历史:**\
2.9.1 - 添加

### `action_taken` {#action_taken}

**描述:** 是否针对此举报采取行动并解决此举报。\
**类型:** 布尔值\
**版本历史:**\
2.9.1 - 添加

### `action_taken_at` {#action_taken_at}

**描述:** 如果当前举报已解决，则为采取行动的时间。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime)) 或 null\
**版本历史:**\
2.9.1 - 添加

### `category` {#category}

**描述:** 举报被归类到的类别。\
**类型:** 字符串 (可枚举的 oneOf)\
`spam` = 恶意、虚假或重复的内容\
`violation` = 违反一条或多条特定的 [`规则`](#rules)\
`other` = 默认（兜底）类别\
**版本历史:**\
3.5.0 - 添加

### `comment` {#comment}

**描述:** 可选，举报理由。\
**类型:** 字符串\
**版本历史:**\
2.9.1 - 添加

### `forwarded` {#forwarded}

**描述:** 举报是否被转发到外站实例。\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

### `created_at` {#created_at}

**描述:** 提交举报的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
2.9.1 - 添加

### `updated_at` {#updated_at}

**描述:** 此举报上一次操作的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
2.9.1 - 添加

### `account` {#account}

**描述:** 提交举报的帐户。\
**类型:** [Admin::Account]({{< relref "entities/Admin_Account" >}})\
**版本历史:**\
2.9.1 - 添加

### `target_account` {#target_account}

**描述:** 被举报的帐户。\
**类型:** [Admin::Account]({{< relref "entities/Admin_Account" >}})\
**版本历史:**\
2.9.1 - 添加

### `assigned_account` {#assigned_account}

**描述:** 分配给此举报的审核员的帐户。\
**类型:** {{<nullable>}} [Admin::Account]({{< relref "entities/Admin_Account" >}}) 或 null\
**版本历史:**\
2.9.1 - 添加

### `action_taken_by_account` {#action_taken_by_account}

**描述:** 处理举报的审核员的帐户。\
**类型:** {{<nullable>}} [Admin::Account]({{< relref "entities/Admin_Account" >}}) 或 null\
**版本历史:**\
2.9.1 - 添加

### `statuses` {#statuses}

**描述:** 附加到举报的嘟文，用于提供上下文信息。\
**类型:** [Status]({{< relref "entities/Status" >}}) 数组\
**版本历史:**\
2.9.1 - 添加

### `rules` {#rules}

**描述:** 附加到举报的规则，用于提供上下文信息。\
**类型:** [Rule]({{< relref "entities/Rule" >}}) 数组\
**版本历史:**\
3.5.0 - 添加

## 参见

{{< page-relref page="methods/admin/reports" caption="admin/reports API 方法">}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/report_serializer.rb" caption="app/serializers/rest/admin/report_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::Report" raw_link="/entities/Admin_Report/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
