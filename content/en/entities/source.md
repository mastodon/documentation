---
title: Source
description: Represents display or publishing preferences of user's own account. Returned as an additional entity when verifying and updated credentials, as an attribute of Account.
menu:
  docs:
    parent: entities
---

## Example

{{< code title="Excerpt from GET accounts/verify\_credentials" >}}
```javascript
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": "",
    "note": "i have approximate knowledge of many things. perpetual student. (nb/ace/they)\r\n\r\nxmpp/email: a@trwnh.com\r\nhttps://trwnh.com\r\nhelp me live: https://liberapay.com/at or https://paypal.me/trwnh\r\n\r\n- my triggers are moths and glitter\r\n- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise\r\n- dm me if i did something wrong, so i can improve\r\n- purest person on fedi, do not lewd in my presence\r\n- #1 ami cole fan account\r\n\r\n:fatyoshi:",
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
    "follow_requests_count": 0
  }
```
{{< /code >}}

## Base attributes

### `note` {#note"}

**Description:** Profile bio.\
**Type:** String\
**Version history:** Added in 1.5.0

### `fields` {#fields"}

**Description:** Metadata about the account.\
**Type:** Array of [Field]({{< relref "field.md" >}})\
**Version history:** Added in 2.4.0

## Nullable attributes

### `privacy` {#privacy"}

**Description:** The default post privacy to be used for new statuses.\
**Type:** String \(Enumerable, oneOf\)\
`public` = Public post\
`unlisted` = Unlisted post\
`private` = Followers-only post\
`direct` = Direct post\
**Version history:** Added in 1.5.0

### `sensitive` {#sensitive"}

**Description:** Whether new statuses should be marked sensitive by default.\
**Type:** Boolean\
**Version history:** Added in 1.5.0

### `language` {#language"}

**Description:** The default posting language for new statuses.\
**Type:** String \(ISO 639-1 language two-letter code\)\
**Version history:** Added in 2.4.2

### `follow_requests_count` {#follow_requests_count"}

**Description:** The number of pending follow requests.\
**Type:** Number\
**Version history:** Added in 3.0.0

## See also

* [Account\#source](account.md#source)
* [POST /api/v1/accounts/verify\_credentials](../methods/accounts/#verify-account-credentials)
* [PATCH /api/v1/accounts/update\_credentials](../methods/accounts/#update-account-credentials)

{{< page-ref page="account.md" >}}



