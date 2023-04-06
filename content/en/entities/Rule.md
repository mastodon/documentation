---
title: Rule
description: Represents a rule that server users should follow.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/rule",
	"/entities/Rule",
	"/api/entities/rule",
	"/api/entities/Rule",
]
---

## Example

```json
{
	"id": "2",
	"text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
}
```

## Attributes

### `id` {#name}

**Description:** An identifier for the rule.\
**Type:** String (cast from integer, but not guaranteed to be a number)\
**Version history:**\
3.4.0 - added

### `text` {#url}

**Description:** The rule to be followed.\
**Type:** String \
**Version history:**\
3.4.0 - added

## See also

{{< page-relref ref="methods/instance#rules" caption="GET /api/v1/instance/rules" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/rule.rb" caption="app/models/rule.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/rule_serializer.rb" caption="app/serializers/rest/rule_serializer.rb" >}}




