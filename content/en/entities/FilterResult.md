---
title: FilterResult
description: Represents a filter whose keywords matched a given status.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/filterresult",
	"/entities/FilterResult",
  "/api/entities/filterresult",
	"/api/entities/FilterResult",
]
---

## Example

```json
{
  "filter": {
    "id": "3",
    "title": "Hide completely",
    "context": [
      "home"
    ],
    "expires_at": "2022-09-20T17:27:39.296Z",
    "filter_action": "hide"
  },
  "keyword_matches": [
    "bad word"
  ],
  "status_matches": [
    "109031743575371913"
  ]
}
```

## Attributes

### `filter` {#filter}

**Description:** The filter that was matched.\
**Type:** [Filter]({{< relref "entities/Filter" >}})\
**Version history:**\
4.0.0 - added

### `keyword_matches` {#keyword_matches}

**Description:** The keyword within the filter that was matched.\
**Type:** {{<nullable>}} Array of String, or null\
**Version history:**\
4.0.0 - added

### `status_matches` {#status_matches}

**Description:** The status ID within the filter that was matched.\
**Type:** {{<nullable>}} Array of String, or null\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="api/guidelines#filters" caption="Implementation guidelines for filters" >}}

{{< page-relref ref="methods/filters" caption="/api/v2/filters methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/filter_result_serializer.rb" caption="app/serializers/rest/filter_result_serializer.rb" >}}