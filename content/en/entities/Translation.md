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

## Examples

Translation of status with content warning and media

```json
{
  "content": "<p>Hello world</p>",
  "spoiler_text": "Greatings ahead",
  "media_attachments": [
    {
      "id": "22345792",
      "description": "Status author waving at the camera"
    }
  ],
  "poll": null,
  "detected_source_language": "es",
  "provider": "DeepL.com"
}
```

Translation of status with poll:
```json
{
  "content": "<p>Should I stay or should I go?</p>",
  "spoiler_text": "",
  "media_attachments": [],
  "poll": {
    "id": "34858",
    "options": [
      {
        "title": "Stay" 
      },
      {
        "title": "Go"
      }
    ]
  },
  "detected_source_language": "ja",
  "provider": "DeepL.com"
}
```


## Attributes

### `content` {#content}

**Description:** HTML-encoded translated content of the status.\
**Type:** String (HTML)\
**Version history:**\
4.0.0 - added

### `spoiler_text` {#spoiler_text}

**Description:** The translated spoiler warning of the status.\
**Type:** String\
**Version history:**\
4.2.0 - added

### `poll` {{%optional%}} {#poll}

**Description:** The translated poll of the status.\
**Type:** [Translation::Poll](#Poll)\
**Version history:**\
4.2.0 - added

### `media_attachments` {#media_attachments}

**Description:** The translated media descriptions of the status.\
**Type:** Array of [Translation::Attachment](#Attachment)\
**Version history:**\
4.2.0 - added

### `detected_source_language` {#detected_source_language}

**Description:** The language of the source text, as auto-detected by the machine translation provider.\
**Type:** String (ISO 639 language code)\
**Version history:**\
4.0.0 - added

### `provider` {#provider}

**Description:** The service that provided the machine translation.
**Type:** String\
**Version history:**\
4.0.0 - added

## Translation::Poll attributes {#Poll}

### `id` {#Poll-id}

**Description:** The ID of the poll.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.2.0 - added

### `options` {#Poll-options}

**Description:** The translated poll options.\
**Type:** Array of [Translation::Poll::Option](#Option)\
**Version history:**\
4.2.0 - added

## Translation::Poll::Option attributes {#Option}

### `title` {#Option-title}

**Description:** The translated title of the poll option.\
**Type:** String\
**Version history:**\
4.2.0 - added

## Translation::Attachment attributes {#Attachment}

### `id` {#Attachment-id}

**Description:** The id of the attachment.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.2.0 - added

### `description` {#Attachment-description}

**Description:** The translated description of the attachment.\
**Type:** String\
**Version history:**\
4.2.0 - added

## See also

{{< page-relref ref="methods/statuses#translate" caption="POST /api/v1/statuses/:id/translate" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/translation_serializer.rb" caption="app/serializers/rest/translation_serializer.rb" >}}
