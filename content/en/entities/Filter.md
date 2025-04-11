---
title: Filter
description: Represents a user-defined filter for determining which statuses should not be shown to the user.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/filter",
	"/entities/Filter",
	"/api/entities/filter",
	"/api/entities/Filter",
]
---

## Example

```json
{
	"id": "19972",
	"title": "Test filter",
	"context": [
		"home"
	],
	"expires_at": "2022-09-20T17:27:39.296Z",
	"filter_action": "warn",
	"keywords": [
		{
			"id": "1197",
			"keyword": "bad word",
			"whole_word": false
		}
	],
	"statuses": [
		{
			"id": "1",
			"status_id": "109031743575371913"
		}
    ]
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the Filter in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.0.0 - added

### `title` {#title}

**Description:** A title given by the user to name the filter.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `context` {#context}

**Description:** The contexts in which the filter should be applied.\
**Type:** Array of String (Enumerable, anyOf)\
`home` = home timeline and lists\
`notifications` = notifications timeline\
`public` = public timelines\
`thread` = expanded thread of a detailed status\
`account` = when viewing a profile\
**Version history:**\
4.0.0 - added

### `expires_at` {#expires_at}

**Description:** When the filter should no longer be applied.\
**Type:** {{<nullable>}} String ([Datetime](/api/datetime-format#datetime)), or null if the filter does not expire\
**Version history:**\
4.0.0 - added

### `filter_action` {#filter_action}

**Description:** The action to be taken when a status matches this filter.\
**Type:** String (Enumerable, oneOf)\
`warn` = show a warning that identifies the matching filter by `title`, and allow the user to expand the filtered status. This is the default (and unknown values should be treated as equivalent to `warn`).\
`hide` = do not show this status if it is received\
`blur` = hide/blur media attachments with a warning identifying the matching filter by `title`\
**Version history:**\
4.0.0 - added\
4.4.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 5) - added `blur` value to `filter_action` attribute

### `keywords` {#keywords}

**Description:** The keywords grouped under this filter.\
**Type:** Array of [FilterKeyword]({{< relref "entities/FilterKeyword" >}})\
**Version history:**\
4.0.0 - added

### `statuses` {#statuses}

**Description:** The statuses grouped under this filter.\
**Type:** Array of [FilterStatus]({{< relref "entities/FilterStatus" >}})\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="api/guidelines#filters" caption="Implementation guidelines for filters" >}}

{{< page-relref ref="entities/V1_Filter" caption="V1::Filter (for Mastodon 3.5 and earlier)" >}}

{{< page-relref ref="methods/filters" caption="/api/v2/filters methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/filter_serializer.rb" caption="app/serializers/rest/filter_serializer.rb" >}}
