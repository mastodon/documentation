---
title: Profile
description: Represents the current user's profile, with source values for all the editable fields.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/profile",
  "/entities/Profile",
  "/api/entities/profile",
  "/api/entities/Profile",
]
---

## Example

```json
{
  "id": "116222600881276277",
  "display_name": "Documentation user",
  "note": "I'm only here as an example for documentation",
  "fields": [
    {
      "name": "pronouns",
      "value": "it/its",
      "verified_at": null
    }
  ],
  "avatar": null,
  "avatar_static": null,
  "avatar_description": "",
  "header": null,
  "header_static": null,
  "header_description": "",
  "locked": false,
  "bot": false,
  "hide_collections": null,
  "discoverable": true,
  "indexable": true,
  "show_media": true,
  "show_media_replies": true,
  "show_featured": true,
  "attribution_domains": [
    "articles.example.com"
  ],
  "featured_tags": [
    {
      "id": "1",
      "name": "foo",
      "url": "https://example.com/@darrel_metz0/tagged/foo",
      "statuses_count": "0",
      "last_status_at": null
    }
  ]
}
```

## Attributes

### `id` {#id}

**Description:** The account id.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.6.0 - added

### `display_name` {#display_name}

**Description:** The profile's display name.\
**Type:** String\
**Version history:**\
4.6.0 - added

### `note` {#note}

**Description:** The profile's bio or description. Unlike for [Account]({{< relref "entities/Account">}}), this is the raw unprocessed text, not the rendered HTML.\
**Type:** String (raw text)\
**Version history:**\
4.6.0 - added

### `fields` {#fields}

**Description:** Metadata about the account. Those contain the raw unprocessed names and values.\
**Type:** Array of [Field](#Field)\
**Version history:**\
4.6.0 - added

### `avatar` {#avatar}

**Description:** An image icon that is shown next to statuses and in the profile. Unlike for [Account]({{< relref "entities/Account">}}), this is nullable and will be null if the avatar is unset.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.6.0 - added

### `avatar_static` {#avatar_static}

**Description:** A static version of the avatar. Unlike for [Account]({{< relref "entities/Account">}}), this is nullable and will be null if the avatar is unset.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.6.0 - added

### `avatar_description` {#avatar_description}

**Description:** A textual description of the avatar, to be used for the visually impaired or when avatars do not load.\
**Type:** String\
**Version history:**\
4.6.0 - added

### `header` {#header}

**Description:** An image banner that is shown above the profile and in profile cards. Unlike for [Account]({{< relref "entities/Account">}}), this is nullable and will be null if the header is unset.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.6.0 - added

### `header_static` {#header_static}

**Description:** A static version of the header. Unlike for [Account]({{< relref "entities/Account">}}), this is nullable and will be null if the header is unset.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.6.0 - added

### `header_description` {#header_description}

**Description:** A textual description of the profile header, to be used for the visually impaired or when avatars do not load.\
**Type:** String\
**Version history:**\
4.6.0 - added

### `locked` {#locked}

**Description:** Whether the account manually approves follow requests.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `bot` {#bot}

**Description:** Indicates that the account may perform automated actions, may not be monitored, or identifies as a robot. This is determined by the account's `actor_type` being set to 'Application' or 'Service'.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `hide_collections` {#hide_collections}

**Description:** Whether the user hides the contents of their follows and followers collections.\
**Type:** {{<nullable>}} Boolean\
**Version history:**\
4.6.0 - added

### `discoverable` {#discoverable}

**Description:** Whether the account has opted into discovery features such as the profile directory.\
**Type:** {{<nullable>}} Boolean\
**Version history:**\
4.6.0 - added

### `indexable` {#indexable}

**Description:** Whether the account allows indexing by search engines.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `show_media` {#show_media}

**Description:** Whether the account wishes to have a “Media” tab with media attachments on their profile.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `show_media_replies` {#show_media_replies}

**Description:** Whether the account wishes to have replies in the “Media” tab on their profile.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `show_featured` {#show_featured}

**Description:** Whether the account wishes to have a “Featured” tab on their profile.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `attribution_domains` {#attribution_domains}

**Description:** Domains of websites allowed to credit the account.\
**Type:** Array of String\
**Version history:**\
4.6.0 - added

## Field entity attributes {#Field}

### `name` {#name}

**Description:** The key of a given field's key-value pair. This is the raw string before processing, not HTML.\
**Type:** String\
**Version history:**\
4.6.0 - added

### `value` {#value}

**Description:** The value associated with the `name` key. This is the raw string before processing, not HTML.\
**Type:** String\
**Version history:**\
4.6.0 - added

### `verified_at` {#verified_at}

**Description:** Timestamp of when the server verified a URL value for a rel="me" link.\
**Type:** {{<nullable>}} String ([Datetime](/api/datetime-format#datetime)) if `value` is a verified URL. Otherwise, null.\
**Version history:**\
4.6.0 - added

## See also

{{< page-relref ref="methods/profile#extended_description" caption="GET /api/v1/profile" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/profile_serializer.rb" caption="app/serializers/rest/profile_serializer.rb" >}}