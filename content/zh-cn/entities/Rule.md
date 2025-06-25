---
title: Rule
description: 表示实例用户应遵守的规则。
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

## 示例

```json
{
	"id": "2",
	"text": "No racism, sexism, homophobia, transphobia, ableism, xenophobia, or casteism.",
	"hint": "Transphobic behavior such as intentional misgendering and deadnaming is strictly prohibited. Promotion of \"conversion therapy\" is strictly prohibited. Criticism of governments and religions is permissible unless being used as a proxy for discrimination."
}
```

## 属性

### `id` {#id}

**描述:** 规则的标识符。\
**类型:** 字符串 (从整数转换而来，但不保证一定是数字)\
**版本历史:**\
3.4.0 - 添加

### `text` {#text}

**描述:** 需要遵守的规则内容。\
**类型:** 字符串 \
**版本历史:**\
3.4.0 - 添加

### `hint` {#hint}

**描述:** 规则的详细描述。\
**类型:** 字符串 \
**版本历史:**\
4.3.0 - 添加

## 参见

{{< page-relref ref="methods/instance#rules" caption="GET /api/v1/instance/rules" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/rule.rb" caption="app/models/rule.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/rule_serializer.rb" caption="app/serializers/rest/rule_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Rule" raw_link="/entities/Rule/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
