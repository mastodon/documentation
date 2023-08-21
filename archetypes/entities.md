---
title: "{{ replace .Name "-" " " | title }}"
description: 
menu:
  docs:
    parent: entities
aliases: [
  "/api/entities/SOMETHING",
  "/api/entities/something",
]
---

## Example

```json
```

## Attributes

### `id` {#id}

**Description:** The ID of the SOMETHING in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
x.x.x - added

## See also

{{< page-relref ref="methods/SOMETHING#anchor" caption="POST /api/v1/something/" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/SOMETHING_serializer.rb" caption="app/serializers/rest/SOMETHING_serializer.rb" >}}