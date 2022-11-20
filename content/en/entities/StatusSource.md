---
title: StatusSource
description: Represents a status's source as plain text.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/statussource",
  "/entities/StatusSource",
  "/api/entities/statussource",
  "/api/entities/StatusSource",
]
---

## Example

```json
{
  "id": "108942703571991143",
  "text": "this is a status that will be edited",
  "spoiler_text": ""
}
```

## Attributes

### `id` {#id}

**Description:** ID of the status in the database.\
**Type:** String (cast from an integer but not guaranteed to be a number)\
**Version history:**\
3.5.0 - added

### `text` {#text}

**Description:** The plain text used to compose the status.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `spoiler_text` {#spoiler_text}

**Description:** The plain text used to compose the status's subject or content warning.\
**Type:** String\
**Version history:**\
3.5.0 - added

## See also

{{< page-relref ref="methods/statuses#source" caption="GET /api/v1/statuses/:id/source" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/status_source_serializer.rb" caption="app/serializers/rest/status_source_serializer.rb" >}}