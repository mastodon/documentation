---
title: Report
description: 举报用户和/或嘟文，供审核员采取行动。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/report",
  "/entities/Report",
  "/api/entities/report",
  "/api/entities/Report",
]
---

## 示例

```json
{
  "id": "48914",
  "action_taken": false,
  "action_taken_at": null,
  "category": "spam",
  "comment": "Spam account",
  "forwarded": false,
  "created_at": "2022-08-25T09:56:16.763Z",
  "status_ids": [
    "108882889550545820"
  ],
  "rule_ids": null,
  "target_account": {
    "id": "108366849347798387",
    "username": "Baluke",
    "acct": "Baluke",
    "display_name": "Baluke Dental Studios",
    "locked": false,
    "bot": false,
    "discoverable": false,
    "group": false,
    "created_at": "2022-05-26T00:00:00.000Z",
    "note": "<p>Baluke Dental Studios is a full service dental lab offering fabrication, staining, and digital services. Advanced technologies and a meticulous process ensure reduced chair time, lower costs, and better patient outcomes with beautiful smiles. Talk to a representative today.</p><p><a href=\"https://baluke.com/\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">baluke.com/</span><span class=\"invisible\"></span></a></p>",
    "url": "https://mastodon.social/@Baluke",
    "avatar": "https://files.mastodon.social/accounts/avatars/108/366/849/347/798/387/original/dbcfe99ed5def0f4.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/108/366/849/347/798/387/original/dbcfe99ed5def0f4.png",
    "header": "https://static-cdn.mastodon.social/headers/original/missing.png",
    "header_static": "https://static-cdn.mastodon.social/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 38,
    "last_status_at": "2022-08-25",
    "emojis": [],
    "fields": []
  }
}
```

## 属性

### `id` {#id}

**描述:** 数据库中举报的 ID。\
**类型:** 字符串 (从整数转换而来)\
**版本历史:**
1.1.0 - 添加

### `action_taken` {#action_taken}

**描述:** 是否已采取行动。\
**类型:** 布尔值\
**版本历史:**
1.1.0 - 添加

### `action_taken_at` {#action_taken_at}

**描述:** 针对举报采取行动的时间。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime)) or null\
**版本历史:**
4.0.0 - 添加

### `category` {#category}

**描述:** 举报的一般原因。\
**类型:** 字符串 (可枚举的 oneOf)\
`spam` = 不受欢迎或重复的内容\
`violation` = 违反了特定规则\
`other` = 其他原因\
**版本历史:**
4.0.0 - 添加

### `comment` {#comment}

**描述:** 举报的原因。\
**类型:** 字符串\
**版本历史:**
4.0.0 - 添加

### `forwarded` {#forwarded}

**描述:** 举报是否已转发到外站。\
**类型:** 布尔值\
**版本历史:**
4.0.0 - 添加

### `created_at` {#created_at}

**描述:** 举报的创建时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**
4.0.0 - 添加

### `status_ids` {#status_ids}

**描述:** 附加到此举报的嘟文 ID，用于提供额外上下文信息。\
**类型:** {{<nullable>}} Array of String (从整数转换而来), or null\
**版本历史:**
4.0.0 - 添加

### `rule_ids` {#rule_ids}

**描述:** 此举报中引用的、被违反的规则 ID。\
**类型:** {{<nullable>}} Array of String (从整数转换而来), or null\
**版本历史:**
4.0.0 - 添加

### `target_account` {#target_account}

**描述:** 被举报的帐户。\
**类型:** [Account]({{< relref "entities/account" >}})\
**版本历史:**
4.0.0 - 添加

## 参见

{{< page-relref ref="methods/reports" caption="举报 API 方法" >}}

{{< page-relref ref="entities/Notification#report" caption="通知 (`report` 属性)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/report_serializer.rb" caption="app/serializers/rest/report_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Report" raw_link="/entities/Report/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
