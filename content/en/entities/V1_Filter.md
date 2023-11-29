---
title: V1::Filter
description: Represents a user-defined filter for determining which statuses should not be shown to the user. Contains a single keyword or phrase.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/v1_filter/",
  "/entities/V1_Filter",
  "/api/entities/v1_filter/",
  "/api/entities/V1_Filter",
]
---

## Example

```json
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": "2019-11-26T09:08:06.254Z",
  "irreversible": true
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the filter in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
2.4.3 - added

### `phrase` {#phrase}

**Description:** The text to be filtered.\
**Type:** String\
**Version history:**\
2.4.3 - added

### `context` {#context}

**Description:** The contexts in which the filter should be applied.\
**Type:** Array of String (Enumerable anyOf)\
`home` = home timeline and lists\
`notifications` = notifications timeline\
`public` = public timelines\
`thread` = expanded thread of a detailed status\
`account` = when viewing a profile\
**Version history:**\
2.4.3 - added\
3.1.0 - added `account`

### `expires_at` {#expires_at}

**Description:** When the filter should no longer be applied.\
**Type:** {{<nullable>}} String (ISO 8601 Datetime), or null if the filter does not expire\
**Version history:**\
2.4.3 - added

### `irreversible` {#irreversible}

**Description:** Should matching entities in home and notifications be dropped by the server? See [implementation guidelines for filters]({{< relref "api/guidelines#filters" >}}).\
**Type:** Boolean\
**Version history:**\
2.4.3 - added

### `whole_word` {#whole_word}

**Description:** Should the filter consider word boundaries? See [implementation guidelines for filters]({{< relref "api/guidelines#filters" >}}).\
**Type:** Boolean\
**Version history:**\
2.4.3 - added

## See also

{{< page-relref ref="api/guidelines#filters" caption="Implementation guidelines for filters" >}}

{{< page-relref ref="methods/filters#v1" caption="v1 filters API" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/v1/filter_serializer.rb" caption="app/serializers/rest/v1/filter_serializer.rb" >}}



