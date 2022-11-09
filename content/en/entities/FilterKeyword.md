---
title: FilterKeyword
description: Represents a keyword that, if matched, should cause the filter action to be taken.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/filterkeyword",
	"/entities/FilterKeyword",
	"/api/entities/filterkeyword",
	"/api/entities/FilterKeyword",
]
---

## Example

```json
{
	"id": "1197",
	"keyword": "bad word",
	"whole_word": false
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the FilterKeyword in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.0.0 - added

### `keyword` {#keyword}

**Description:** The phrase to be matched against.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `whole_word` {#whole_word}

**Description:** Should the filter consider word boundaries? See [implementation guidelines for filters]({{< relref "api/guidelines#filters" >}}).\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="api/guidelines#filters" caption="Implementation guidelines for filters" >}}

{{< page-relref ref="methods/filters" caption="/api/v2/filters methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/filter_keyword_serializer.rb" caption="app/serializers/rest/filter_keyword_serializer.rb" >}}