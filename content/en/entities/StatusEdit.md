---
title: StatusEdit
description: Represents a revision of a status that has been edited.
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

## Example

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

## Attributes

### `content` {#content}

**Description:** The content of the status at this revision.\
**Type:** String (HTML)\
**Version history:**\
3.5.0 - added

### `spoiler_text` {#spoiler_text}

**Description:** The content of the subject or content warning at this revision.\
**Type:** String (HTML)\
**Version history:**\
3.5.0 - added

### `sensitive` {#sensitive}

**Description:** Whether the status was marked sensitive at this revision.\
**Type:** Boolean\
**Version history:**\
3.5.0 - added

### `created_at` {#created_at}

**Description:** The timestamp of when the revision was published.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.5.0 - added

### `account` {#account}

**Description:** The account that published this revision.\
**Type:** [Account]({{<relref "entities/Account">}})\
**Version history:**\
3.5.0 - added

### `poll` {{%optional%}} {#poll}

**Description:** The current state of the poll options at this revision. Note that edits changing the poll options will be collapsed together into one edit, since this action resets the poll.\
**Type:** Hash\
**Version history:**\
3.5.0 - added

#### `poll.options[]` {#poll-options}

**Description:** The poll options at this revision.\
**Type:** Array of Hash\
**Version history:**\
3.5.0 - added

#### `poll.options[].title` {#poll-options-title}

**Description:** The text for a poll option.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `media_attachments` {#media_attachments}

**Description:** The current state of the media attachments at this revision.\
**Type:** Array of [MediaAttachment]({{<relref "entities/MediaAttachment">}})\
**Version history:**\
3.5.0 - added

### `emojis` {#emojis}

**Description:** Any custom emoji that are used in the current revision.\
**Type:** Array of [CustomEmoji]({{<relref "entities/CustomEmoji">}})\
**Version history:**\
3.5.0 - added

## See also

{{< page-relref ref="methods/statuses#history" caption="GET /api/v1/statuses/:id/history" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/status_edit_serializer.rb" caption="app/serializers/rest/status_edit_serializer.rb" >}}

