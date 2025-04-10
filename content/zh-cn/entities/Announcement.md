---
title: Announcement
description: 表示管理员设置的公告。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/announcement",
	"/entities/Announcement",
  "/api/entities/announcement",
	"/api/entities/Announcement",
]
---

## 示例

```json
{
  "id": "8",
  "content": "<p>Looks like there was an issue processing audio attachments without embedded art since yesterday due to an experimental new feature. That issue has now been fixed, so you may see older posts with audio from other servers pop up in your feeds now as they are being finally properly processed. Sorry!</p>",
  "starts_at": null,
  "ends_at": null,
  "all_day": false,
  "published_at": "2020-07-03T01:27:38.726Z",
  "updated_at": "2020-07-03T01:27:38.752Z",
  "read": true,
  "mentions": [],
  "statuses": [],
  "tags": [],
  "emojis": [],
  "reactions": [
    {
      "name": "bongoCat",
      "count": 9,
      "me": false,
      "url": "https://files.mastodon.social/custom_emojis/images/000/067/715/original/fdba57dff7576d53.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/067/715/static/fdba57dff7576d53.png"
    },
    {
      "name": "thonking",
      "count": 1,
      "me": false,
      "url": "https://files.mastodon.social/custom_emojis/images/000/098/690/original/a8d36edc4a7032e8.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/098/690/static/a8d36edc4a7032e8.png"
    },
    {
      "name": "AAAAAA",
      "count": 1,
      "me": false,
      "url": "https://files.mastodon.social/custom_emojis/images/000/071/387/original/AAAAAA.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/071/387/static/AAAAAA.png"
    },
    {
      "name": "🤔",
      "count": 1,
      "me": true
    }
  ]
}
```

## 属性

### `id` {#id}

**描述:** 数据库中公告的 ID。\
**类型:** 字符串（从整数转换而来，但不保证一定是数字）\
**版本历史:**\
3.1.0 - 添加

### `content` {#content}

**描述:** 公告的文本内容。\
**类型:** 字符串 (HTML)\
**版本历史:**\
3.1.0 - 添加

### `starts_at` {#starts_at}

**描述:** 公告开始的时间。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime)) 或 null\
**版本历史:**\
3.1.0 - 添加

### `ends_at` {#ends_at}

**描述:** 公告结束的时间。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime)) 或 null\
**版本历史:**\
3.1.0 - 添加

### `published` {#published}

**描述:** 公告当前是否处于发布状态。\
**类型:** 布尔值\
**版本历史:**\
3.1.0 - 添加

### `all_day` {#all_day}

**描述:** 公告是否应仅在日期上开始和结束，而不是在特定的时间点开始和结束。如果没有 `starts_at` 或 `ends_at` 时间，则为 false。\
**类型:** 布尔值\
**版本历史:**\
3.1.0 - 添加

### `published_at` {#created_at}

**描述:** 公告发布的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
3.1.0 - 添加

### `updated_at` {#updated_at}

**描述:** 公告上次更新的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
3.1.0 - 添加

### `read` {{%optional%}} {#read}

**描述:** 当前已读该公告的用户。\
**类型:** 布尔值\
**版本历史:**\
3.1.0 - 添加

### `mentions` {#mentions}

**描述:** 公告文本中提及的帐户。\
**类型:** Array of [Announcement::Account](#Account)\
**版本历史:**\
3.1.0 - 添加

### `statuses` {#statuses}

**描述:** 公告文本中链接的嘟文。\
**类型:** Array of [Announcement::Status](#Status)\
**版本历史:**\
3.1.0 - 添加

### `tags` {#tags}

**描述:** 公告文本中链接的话题标签。\
**类型:** Array of [Status::Tag]({{< relref "entities/Status#Tag" >}})\
**版本历史:**\
3.1.0 - 添加

### `emojis` {#emojis}

**描述:** 公告文本中使用的自定义表情。\
**类型:** Array of [CustomEmoji]({{< relref "entities/CustomEmoji" >}})\
**版本历史:**\
3.1.0 - 添加

### `reactions` {#reactions}

**描述:** 附加到公告的表情回应。\
**类型:** Array of [Reaction]({{< relref "entities/Reaction" >}})\
**版本历史:**\
3.1.0 - 添加

## Announcement::Account attributes {#Account}

### `id` {#Account-id}

**描述:** 被提及用户的帐户 ID。\
**类型:** 字符串（从整数转换而来，但不保证一定是数字）\
**版本历史:**\
3.1.0 - 添加

### `username` {#Account-username}

**描述:** 被提及用户的用户名。\
**类型:** 字符串\
**版本历史:**\
3.1.0 - 添加

### `url` {#Account-url}

**描述:** 被提及用户的账户位置。\
**类型:** 字符串 (URL)\
**版本历史:**\
3.1.0 - 添加

### `acct` {#Account-acct}

**描述:** 被提及用户的 webfinger acct: URI。对于本站用户，等同于 `username`；对于外站用户，等同于 `username@domain`。\
**类型:** 字符串\
**版本历史:**\
3.1.0 - 添加

## Announcement::Status attributes {#Status}

### `id` {#Status-id}

**描述:** 数据库中附加嘟文的 ID。\
**类型:** 字符串（从整数转换而来，但不保证一定是数字）\
**版本历史:**\
3.1.0 - 添加

### `url` {#Status-url}

**描述:** 附加嘟文的 URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
3.1.0 - 添加

## 参见

{{< page-relref ref="methods/announcements" caption="公告 API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/announcement_serializer.rb" caption="app/serializers/rest/announcement_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Announcement" raw_link="/entities/Announcement/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
