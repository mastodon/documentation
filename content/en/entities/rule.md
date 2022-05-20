---
title: Rule
description: Represents a rule that server users should follow.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
	"id": "2",
	"text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
}
```

## Base attributes

### `id` {#name}

**Description:** An identifier for the rule.\
**Type:** String (cast from integer)\
**Version history:** Added in 3.4.0

### `text` {#url}

**Description:** The rule to be followed.\
**Type:** String \
**Version history:** Added in 3.4.0

## See also

{{< page-ref page="methods/instance.md" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/rule.rb" caption="app/models/rule.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/rule_serializer.rb" caption="app/serializers/rest/rule_serializer.rb" >}}



