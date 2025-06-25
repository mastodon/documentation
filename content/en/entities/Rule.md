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
	"text": "No racism, sexism, homophobia, transphobia, ableism, xenophobia, or casteism.",
	"hint": "Transphobic behavior such as intentional misgendering and deadnaming is strictly prohibited. Promotion of \"conversion therapy\" is strictly prohibited. Criticism of governments and religions is permissible unless being used as a proxy for discrimination.",
	"translations": {
		"fr": {
			"text": "Pas de racisme, sexisme, homophobie, transphobie, validisme, xénophobie ou casteisme.",
			"hint": "Les comportements transhobes tels que le deadnaming intentionel sont formellement interdits. La promotion des « thérapies de conversion » est formellement interdite. La critique des gouvernements et des religions est permise à moins qu'elle ne soit utilisée comme excuse pour de la discrimination."
		}
	}
}
```

## Attributes

### `id` {#id}

**Description:** An identifier for the rule.\
**Type:** String (cast from integer, but not guaranteed to be a number)\
**Version history:**\
3.4.0 - added

### `text` {#text}

**Description:** The rule to be followed.\
**Type:** String \
**Version history:**\
3.4.0 - added

### `hint` {#hint}

**Description:** Longer-form description of the rule.\
**Type:** String \
**Version history:**\
4.3.0 - added

### `translations` {#translations}

**Description:** Available translations for this rule's `text` and `hint`, as a Hash where keys are locale codes and values are hashes with `text` and `hint` keys.\
**Type:** Hash\
**Version history:**\
4.4.0 - added

## See also

{{< page-relref ref="methods/instance#rules" caption="GET /api/v1/instance/rules" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/rule.rb" caption="app/models/rule.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/rule_serializer.rb" caption="app/serializers/rest/rule_serializer.rb" >}}




