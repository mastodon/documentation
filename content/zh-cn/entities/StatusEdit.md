---
title: StatusEdit
description: 表示已被编辑的嘟文的一个修订版本。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/statusedit",
	"/entities/StatusEdit",
	"/api/entities/statusedit",
	"/api/entities/StatusEdit",
]
---

## 示例

```json
{
	"content": "<p>this is a status that has been edited three times. this time a poll has been added.</p>",
	"spoiler_text": "",
	"sensitive": false,
	"created_at": "2022-09-05T00:03:32.480Z",
	"poll": {
		"options": [
		{
			"title": "cool"
		},
		{
			"title": "uncool"
		},
		{
			"title": "spiderman (this option has been changed)"
		}
		]
	},
	"account": {
		"id": "14715",
		"username": "trwnh",
		"acct": "trwnh",
		"display_name": "infinite love ⴳ",
		// ...
	},
	"media_attachments": [],
	"emojis": []
}
```

## 属性

### `content` {#content}

**描述:** 此修订版本中嘟文的内容。\
**类型:** 字符串 (HTML)\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

### `spoiler_text` {#spoiler_text}

**描述:** 此修订版本中的主题或内容警告。\
**类型:** 字符串 (HTML)\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

### `sensitive` {#sensitive}

**描述:** 此修订版本中嘟文是否标记为敏感。\
**类型:** 布尔值\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

### `created_at` {#created_at}

**描述:** 发布此修订版本的时间戳。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

### `account` {#account}

**描述:** 发布此修订版本的帐户。\
**类型:** [Account]({{<relref "entities/Account">}})\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

### `poll` {{%optional%}} {#poll}

**描述:** 此修订版本中的投票。请注意，更改投票选项的编辑将被合并为一次编辑，因为此操作会重置投票。\
**类型:** Hash\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

#### `poll.options[]` {#poll-options}

**描述:** 此修订版本中的投票选项。\
**类型:** 哈希值的数组\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

#### `poll.options[].title` {#poll-options-title}

**描述:** 投票选项的文本。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

### `media_attachments` {#media_attachments}

**描述:** 此修订版本中的媒体附件。\
**类型:** Array of [MediaAttachment]({{<relref "entities/MediaAttachment">}})\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

### `emojis` {#emojis}

**描述:** 当前修订版本中使用的任何自定义表情。\
**类型:** Array of [CustomEmoji]({{<relref "entities/CustomEmoji">}})\
**版本历史:**\
3.5.0 - 添加
**版本历史：**\
3.5.0 - 添加

## 另请参阅

{{< page-relref ref="methods/statuses#history" caption="GET /api/v1/statuses/:id/history" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/status_edit_serializer.rb" caption="app/serializers/rest/status_edit_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="StatusEdit" raw_link="/entities/StatusEdit/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
