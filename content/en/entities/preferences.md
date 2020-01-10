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

### `posting:default:visibility` <a id="visibility"></a>

**Description:** Default visibility for new posts. Equivalent to [Source\#privacy](source.md#privacy).\
**Type:** String \(Enumerable, oneOf\)\
`public` = Public post\
`unlisted` = Unlisted post\
`private` = Followers-only post\
`direct` = Direct post\
**Version history:** Added in 2.8.0

### `posting:default:sensitive` <a id="sensitive"></a>

**Description:** Default sensitivity flag for new posts. Equivalent to [Source\#sensitive](source.md#sensitive).\
**Type:** Boolean\
**Version history:** Added in 2.8.0

### `posting:default:language` <a id="language"></a>

**Description:** Default language for new posts. Equivalent to [Source\#language](source.md#language)\
**Type:** String \(ISO 639-1 language two-letter code\), or null\
**Version history:** Added in 2.8.0

### `reading:expand:media` <a id="media"></a>

**Description:** Whether media attachments should be automatically displayed or blurred/hidden.\
**Type:** String \(Enumerable, oneOf\)\
`default` = Hide media marked as sensitive\
`show_all` = Always show all media by default, regardless of sensitivity\
`hide_all` = Always hide all media by default, regardless of sensitivity\
**Version history:** Added in 2.8.0

### `reading:expand:spoilers` <a id="cw"></a>

**Description:** Whether CWs should be expanded by default.\
**Type:** Boolean\
**Version history:** Added in 2.8.0

## See also

* [GET /api/v1/accounts/verify\_credentials](../methods/accounts/#verify-account-credentials)
* [PATCH /api/v1/accounts/update\_credentials](../methods/accounts/#update-account-credentials)
* [GET /api/v1/preferences](../methods/accounts/preferences.md#view-user-preferences)

{{< page-ref page="methods/accounts/preferences.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/preferences_serializer.rb" caption="app/serializers/rest/preferences\_serializer.rb" >}}



