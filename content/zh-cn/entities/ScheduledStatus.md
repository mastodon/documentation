---
title: ScheduledStatus
description: 表示一条计划在未来日期发布的嘟文。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/scheduledstatus",
  "/entities/ScheduledStatus",
  "/api/entities/scheduledstatus",
  "/api/entities/ScheduledStatus",
]
---

## 示例

`POST /api/v1/statuses?status=test post&scheduled_at=2022-09-29` 返回：

```json
{
  "id": "1",
  "scheduled_at": "2022-09-29T00:00:00.000Z",
  "params": {
    "text": "test post",
    "media_ids": null,
    "sensitive": null,
    "spoiler_text": null,
    "visibility": null,
    "language": null,
    "scheduled_at": null,
    "poll": null,
    "idempotency": null,
    "with_rate_limit": false,
    "in_reply_to_id": null,
    "application_id": 3
  },
  "media_attachments": []
}
```

`GET /api/v1/scheduled_statuses` 返回：

```json
{
  "id": "1",
  "scheduled_at": "2022-09-29T00:00:00.000Z",
  "params": {
    "poll": null,
    "text": "test post",
    "language": null,
    "media_ids": null,
    "sensitive": null,
    "visibility": null,
    "idempotency": null,
    "scheduled_at": null,
    "spoiler_text": null,
    "application_id": 3,
    "in_reply_to_id": null,
    "with_rate_limit": false
  },
  "media_attachments": []
}
```

## 属性

### `id` {#id}

**描述:** 数据库中定时嘟文的 ID。\
**类型:** 字符串 (由整数转换而来，但不保证为数字)\
**版本历史:**\
2.7.0 - 添加

### `scheduled_at` {#scheduled_at}

**描述:** 嘟文计划被发布的 Unix 时间戳。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
2.7.0 - 添加

### `params` {#params}

**描述:** 调度嘟文时使用的参数，将在发布嘟文时使用。\
**类型:** 哈希\
**版本历史:**\
2.7.0 - 添加

#### `params[text]` {#params-text}

**描述:** 将用作嘟文内容的文本。\
**类型:** 字符串\
**版本历史:**\
2.7.0 - 添加

#### `params[poll]` {#params-poll}

**描述:** 要附加到嘟文的投票。\
**类型:** {{<nullable>}} 哈希\
**版本历史:**\
2.8.0 - 添加

##### `params[poll][options[]]` {#params-poll-options}

**描述:** 要使用的投票选项。\
**类型:** 字符串数组\
**版本历史:**\
2.8.0 - 添加

##### `params[poll][expires_in]` {#params-poll-expires_in}

**描述:** 投票在关闭前应持续多少秒。\
**类型:** 字符串（从整数转换）\
**版本历史:**\
2.8.0 - 添加

##### `params[poll][multiple]` {#params-poll-multiple}

**描述:** 投票是否允许多选。\
**类型:** {{<optional>}} 布尔值\
**版本历史:**\
2.8.0 - 添加

##### `params[poll][hide_totals]` {#params-poll-hide_totals}

**描述:** 投票是否应隐藏总票数，直到投票结束后再显示。\
**类型:** {{<optional>}} 布尔值\
**版本历史:**\
2.8.0 - 添加

#### `params[media_ids]` {#params-media_ids}

**描述:** 将附加到嘟文的 MediaAttachment 的 ID。\
**类型:** {{<nullable>}} 字符串数组\
**版本历史:**\
2.7.0 - 添加

#### `params[sensitive]` {#params-sensitive}

**描述:** 嘟文是否将被标记为敏感。\
**类型:** {{<nullable>}} 布尔值\
**版本历史:**\
2.7.0 - 添加

#### `params[spoiler_text]` {#params-spoiler_text}

**描述:** 嘟文的内容警告或摘要的文本。\
**类型:** {{<nullable>}} 字符串\
**版本历史:**\
2.7.0 - 添加

#### `params[visibility]` {#params-visibility}

**描述:** 嘟文发布后将具有的可见性。\
**类型:** 字符串 (可枚举 oneOf)\
`public` = 对所有人可见，显示在公共时间线中。\
`unlisted` = 对公众可见，但不包含在公共时间线中。\
`private` = 仅对关注者和任何被提及的用户可见。\
`direct` = 仅对被提及的用户可见。\
**版本历史:**\
2.7.0 - 添加

#### `params[in_reply_to_id]` {#params-in_reply_to_id}

**描述:** 将回复的嘟文的 ID。\
**类型:** {{<nullable>}} 整数\
**版本历史:**\
2.7.0 - 添加

#### `params[language]` {#params-language}

**描述:** 将用于嘟文的语言。\
**类型:** {{<nullable>}} 字符串 (ISO 639-1 双字母语言代码)\
**版本历史:**\
2.7.0 - 添加

#### `params[application_id]` {{%deprecated%}} {#params-application_id}

**描述:** 发布嘟文的应用的内部 ID。 仅为保留后向兼容性提供，可以忽略。\
**类型:** 整数\
**版本历史:**\
2.7.0 - 添加

#### `params[scheduled_at]` {#params-scheduled_at}

**描述:** 嘟文的定时发布时间。 这将为 null，因为嘟文只被计划一次。\
**类型:** {{<nullable>}} Null\
**版本历史:**\
2.7.0 - 添加

#### `params[idempotency]` {#params-idempotency}

**描述:** 幂等性键，用于防止重复发布嘟文。\
**类型:** {{<nullable>}} 字符串\
**版本历史:**\
2.7.0 - 添加

#### `params[with_rate_limit]` {{%deprecated%}} {#params-with_rate-limit}

**描述:** 嘟文创建是否受速率限制。 仅为保留后向兼容性提供，可以忽略。\
**类型:** 布尔值\
**版本历史:**\
2.7.0 - 添加

### `media_attachments` {#media_attachments}

**描述:** 发布嘟文时将附加的媒体。\
**类型:** [MediaAttachment]({{< relref "entities/MediaAttachment" >}}) 数组\
**版本历史:**\
2.7.0 - 添加

## 参见

{{< page-relref ref="methods/statuses#create" caption="POST /api/v1/statuses (带有 `scheduled_at` 参数)" >}}

{{< page-relref ref="methods/scheduled_statuses" caption="scheduled_statuses API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/scheduled_status_serializer.rb" caption="app/serializers/rest/scheduled_status_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="ScheduledStatus" raw_link="/entities/ScheduledStatus/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
