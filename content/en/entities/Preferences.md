---
title: Preferences
summary: Represents a user's preferences.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/preferences",
  "/entities/Preferences",
  "/api/entities/preferences",
  "/api/entities/Preferences",
]
---

## Example

```json
{
  "posting:default:visibility": "public",
  "posting:default:sensitive": false,
  "posting:default:language": null,
  "reading:expand:media": "default",
  "reading:expand:spoilers": false
}
```

## Attributes

### `posting:default:visibility` {#posting-default-visibility}

**Description:** Default visibility for new posts. Equivalent to [CredentialAccount#source\[privacy\]]({{< relref "entities/Account#source-privacy" >}}).\
**Type:** String (Enumerable, oneOf)\
`public` = Public post\
`unlisted` = Unlisted post\
`private` = Followers-only post\
`direct` = Direct post\
**Version history:**\
2.8.0 - added

### `posting:default:sensitive` {#posting-default-sensitive}

**Description:** Default sensitivity flag for new posts. Equivalent to [CredentialAccount#source\[sensitive\]]({{< relref "entities/Account#source-sensitive" >}}).\
**Type:** Boolean\
**Version history:**\
2.8.0 - added

### `posting:default:language` {#posting-default-language}

**Description:** Default language for new posts. Equivalent to [CredentialAccount#source\[language\]]({{< relref "entities/Account#source-language" >}})\
**Type:** {{<nullable>}} String (ISO 639-1 language two-letter code), or null\
**Version history:**\
2.8.0 - added

### `reading:expand:media` {#reading-expand-media}

**Description:** Whether media attachments should be automatically displayed or blurred/hidden.\
**Type:** String (Enumerable, oneOf)\
`default` = Hide media marked as sensitive\
`show_all` = Always show all media by default, regardless of sensitivity\
`hide_all` = Always hide all media by default, regardless of sensitivity\
**Version history:**\
2.8.0 - added

### `reading:expand:spoilers` {#reading-expand-spoilers}

**Description:** Whether CWs should be expanded by default.\
**Type:** Boolean\
**Version history:**\
2.8.0 - added

## See also

{{< page-relref ref="methods/preferences" caption="preferences API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/preferences_serializer.rb" caption="app/serializers/rest/preferences_serializer.rb" >}}



