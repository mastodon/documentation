---
title: Field
description: Represents a profile field as a name-value pair with optional verification.
menu:
  docs:
    parent: entities
---

## Example

```javascript
    "fields": [
      {
        "name": "Website",
        "value": "https://trwnh.com",
        "verified_at": "2019-08-29T04:14:55.571+00:00"
      },
      {
        "name": "Sponsor",
        "value": "https://liberapay.com/at",
        "verified_at": "2019-11-15T10:06:15.557+00:00"
      },
      {
        "name": "Fan of:",
        "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo's Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
        "verified_at": null
      },
      {
        "name": "Main topics:",
        "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i'm just here to hang out and talk to cool people!",
        "verified_at": null
      }
    ],
```

## Attributes

### `name` {#name}

**Description:** The key of a given field's key-value pair.\
**Type:** String\
**Version history:**\
2.4.0 - added

### `value` {#value}

**Description:** The value associated with the `name` key.\
**Type:** String (HTML)\
**Version history:**\
2.4.0 - added

### `verified_at` {#verified_at}

**Description:** Timestamp of when the server verified a URL value for a rel="me" link.\
**Type:** {{<nullable>}} String (ISO 8601 Datetime) if `value` is a verified URL. Otherwise, null.\
**Version history:**\
2.6.0 - added

## See also

{{< page-relref ref="entities/Account#fields" caption="Account#fields" >}}

{{< page-relref ref="entities/Source#fields" caption="Source#fields" >}}



