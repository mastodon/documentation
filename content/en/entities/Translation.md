---
title: Translation
description: Represents the result of machine translating some status content
menu:
  docs:
    parent: entities
aliases: [
  "/api/entities/Translation",
  "/api/entities/translation",
]
---

## Example

```json
{
  "content": "<p>Hola mundo</p>",
  "detected_source_language": "en",
  "provider": "DeepL.com"
}
```

## Attributes

### `content` {#content}

**Description:** The translated text of the status.\
**Type:** String (HTML)\
**Version history:**\
4.0.0 - added

### `detected_source_language` {#detected_source_language}

**Description:** The language of the source text, as auto-detected by the machine translation provider.\
**Type:** String (well-formed BCP 47 language tag, but parts other than language subtag may be discarded)\
**Version history:**\
4.0.0 - added
4.1.0 - accept BCP 47

### `provider` {#provider}

**Description:** The service that provided the machine translation.
**Type:** String\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/statuses#translate" caption="POST /api/v1/statuses/:id/translate" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/translation_serializer.rb" caption="app/serializers/rest/translation_serializer.rb" >}}