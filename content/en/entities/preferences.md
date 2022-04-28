---
title: Preferences
description: Represents a user's preferences.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "posting:default:visibility": "public",
  "posting:default:sensitive": false,
  "posting:default:language": null,
  "reading:expand:media": "default",
  "reading:expand:spoilers": false
}
```

## Attributes

### `posting:default:visibility` {#visibility}

**Description:** Default visibility for new posts. Equivalent to [Source\#privacy]({{< relref "source.md#privacy" >}}).\
**Type:** String \(Enumerable, oneOf\)\
`public` = Public post\
`unlisted` = Unlisted post\
`private` = Followers-only post\
`direct` = Direct post\
**Version history:** Added in 2.8.0

### `posting:default:sensitive` {#sensitive}

**Description:** Default sensitivity flag for new posts. Equivalent to [Source\#sensitive]({{< relref "source.md#sensitive" >}}).\
**Type:** Boolean\
**Version history:** Added in 2.8.0

### `posting:default:language` {#language}

**Description:** Default language for new posts. Equivalent to [Source\#language]({{< relref "source.md#language" >}})\
**Type:** String \(ISO 639-1 language two-letter code\), or null\
**Version history:** Added in 2.8.0

### `reading:expand:media` {#media}

**Description:** Whether media attachments should be automatically displayed or blurred/hidden.\
**Type:** String \(Enumerable, oneOf\)\
`default` = Hide media marked as sensitive\
`show_all` = Always show all media by default, regardless of sensitivity\
`hide_all` = Always hide all media by default, regardless of sensitivity\
**Version history:** Added in 2.8.0

### `reading:expand:spoilers` {#cw}

**Description:** Whether CWs should be expanded by default.\
**Type:** Boolean\
**Version history:** Added in 2.8.0

## See also

* [GET /api/v1/accounts/verify\_credentials]({{< relref "../methods/accounts.md#verify-account-credentials" >}})
* [PATCH /api/v1/accounts/update\_credentials]({{< relref "../methods/accounts.md#update-account-credentials" >}})
* [GET /api/v1/preferences]({{< relref "../methods/accounts/preferences.md#view-user-preferences" >}})

{{< page-ref page="methods/accounts/preferences.md" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/master/app/serializers/rest/preferences_serializer.rb" caption="app/serializers/rest/preferences\_serializer.rb" >}}



