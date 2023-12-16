---
title: Account
description: Represents a user of Mastodon and their associated profile.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/source/",
  "/entities/Source/",
  "/entities/field/",
  "/entities/Field/",
  "/entities/account",
  "/entities/Account",
  "/entities/credentialaccount",
  "/entities/CredentialAccount",
  "/entities/mutedaccount",
  "/entities/MutedAccount",
  "/api/entities/source/",
  "/api/entities/Source/",
  "/api/entities/field/",
  "/api/entities/Field/",
  "/api/entities/account",
  "/api/entities/Account",
  "/api/entities/credentialaccount",
  "/api/entities/CredentialAccount",
  "/api/entities/mutedaccount",
  "/api/entities/MutedAccount",
]
---

## Example

```json
{
  "id": "23634",
  "username": "noiob",
  "acct": "noiob@awoo.space",
  "display_name": "ikea shark fan account",
  "locked": false,
  "bot": false,
  "created_at": "2017-02-08T02:00:53.274Z",
  "note": "<p>:ms_rainbow_flag:​ :ms_bisexual_flagweb:​ :ms_nonbinary_flag:​ <a href=\"https://awoo.space/tags/awoo\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>awoo</span}.space <a href=\"https://awoo.space/tags/admin\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>admin</span} ~ <a href=\"https://awoo.space/tags/bi\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>bi</span} ~ <a href=\"https://awoo.space/tags/nonbinary\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>nonbinary</span} ~ compsci student ~ likes video <a href=\"https://awoo.space/tags/games\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>games</span} and weird/ old electronics and will post obsessively about both ~ avatar by <span class=\"h-card\"><a href=\"https://weirder.earth/@dzuk\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>dzuk</span}</span></p>",
  "url": "https://awoo.space/@noiob",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "header": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "header_static": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "followers_count": 547,
  "following_count": 404,
  "statuses_count": 28468,
  "last_status_at": "2019-11-17",
  "emojis": [
    {
      "shortcode": "ms_rainbow_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/028/691/original/6de008d6281f4f59.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/028/691/static/6de008d6281f4f59.png",
      "visible_in_picker": true
    },
    {
      "shortcode": "ms_bisexual_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/050/744/original/02f94a5fca7eaf78.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/050/744/static/02f94a5fca7eaf78.png",
      "visible_in_picker": true
    },
    {
      "shortcode": "ms_nonbinary_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/105/099/original/8106088bd4782072.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/105/099/static/8106088bd4782072.png",
      "visible_in_picker": true
    }
  ],
  "fields": [
    {
      "name": "Pronouns",
      "value": "they/them",
      "verified_at": null
    },
    {
      "name": "Alt",
      "value": "<span class=\"h-card\"><a href=\"https://cybre.space/@noiob\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>noiob</span}</span>",
      "verified_at": null
    },
    {
      "name": "Bots",
      "value": "<span class=\"h-card\"><a href=\"https://botsin.space/@darksouls\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>darksouls</span}</span>, <span class=\"h-card\"><a href=\"https://botsin.space/@nierautomata\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>nierautomata</span}</span>, <span class=\"h-card\"><a href=\"https://mastodon.social/@fedi\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>fedi</span}</span>, code for <span class=\"h-card\"><a href=\"https://botsin.space/@awoobot\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>awoobot</span}</span>",
      "verified_at": null
    },
    {
      "name": "Website",
      "value": "<a href=\"http://shork.xyz\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">http://</span><span class=\"\">shork.xyz</span><span class=\"invisible\"></span}",
      "verified_at": "2019-11-10T10:31:10.744+00:00"
    }
  ]
}
```

## Attributes

### `id` {#id}

**Description:** The account id.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
0.1.0 - added

### `username` {#username}

**Description:** The username of the account, not including domain.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `acct` {#acct}

**Description:** The Webfinger account URI. Equal to `username` for local users, or `username@domain` for remote users.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `url` {#url}

**Description:** The location of the user's profile page.\
**Type:** String (URL)\
**Version history:**\
0.1.0 - added

### `display_name` {#display_name}

**Description:** The profile's display name.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `note` {#note}

**Description:** The profile's bio or description.\
**Type:** String (HTML)\
**Version history:**\
0.1.0 - added

### `avatar` {#avatar}

**Description:** An image icon that is shown next to statuses and in the profile.\
**Type:** String (URL)\
**Version history:**\
0.1.0 - added

### `avatar_static` {#avatar_static}

**Description:** A static version of the avatar. Equal to `avatar` if its value is a static image; different if `avatar` is an animated GIF.\
**Type:** String (URL)\
**Version history:**\
1.1.2 - added

### `header` {#header}

**Description:** An image banner that is shown above the profile and in profile cards.\
**Type:** String (URL)\
**Version history:**\
0.1.0 - added

### `header_static` {#header_static}

**Description:** A static version of the header. Equal to `header` if its value is a static image; different if `header` is an animated GIF.\
**Type:** String (URL)\
**Version history:**\
1.1.2 - added

### `locked` {#locked}

**Description:** Whether the account manually approves follow requests.\
**Type:** Boolean\
**Version history:**\
0.1.0 - added

### `fields` {#fields}

**Description:** Additional metadata attached to a profile as name-value pairs.\
**Type:** Array of [Field](#Field)\
**Version history:**\
2.4.0 - added

### `emojis` {#emojis}

**Description:** Custom emoji entities to be used when rendering the profile.\
**Type:** Array of [CustomEmoji]({{< relref "entities/CustomEmoji" >}})\
**Version history:**\
2.4.0 - added

### `bot` {#bot}

**Description:** Indicates that the account may perform automated actions, may not be monitored, or identifies as a robot.\
**Type:** Boolean\
**Version history:**\
2.4.0 - added

### `group` {#group}

**Description:** Indicates that the account represents a Group actor.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

### `discoverable` {#discoverable}

**Description:** Whether the account has opted into discovery features such as the profile directory.\
**Type:** {{<nullable>}} Boolean\
**Version history:**\
3.1.0 - added

### `noindex` {{%optional%}} {#noindex}

**Description:** Whether the local user has opted out of being indexed by search engines.\
**Type:** {{<nullable>}} Boolean\
**Version history:**\
4.0.0 - added

### `moved` {{%optional%}} {#moved}

**Description:** Indicates that the profile is currently inactive and that its user has moved to a new account.\
**Type:** {{<nullable>}} [Account]({{< relref "entities/Account" >}}), or null if the profile is suspended.\
**Version history:**\
2.1.0 - added

### `suspended` {{%optional%}} {#suspended}

**Description:** An extra attribute returned only when an account is suspended.\
**Type:**  Boolean\
**Version history:**\
3.3.0 - added

### `limited` {{%optional%}} {#limited}

**Description:** An extra attribute returned only when an account is silenced. If true, indicates that the account should be hidden behind a warning screen.\
**Type:** Boolean\
**Version history:**\
3.5.3 - added

### `created_at` {#created_at}

**Description:** When the account was created.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
0.1.0 - added\
3.4.0 - now resolves to midnight instead of an exact time

### `last_status_at` {#last_status_at}

**Description:** When the most recent status was posted.\
**Type:** {{<nullable>}} String (ISO 8601 Date), or null if no statuses\
**Version history:**\
3.0.0 - added\
3.1.0 - now returns date only, no time

### `statuses_count` {#statuses_count}

**Description:** How many statuses are attached to this account.\
**Type:** Integer\
**Version history:**\
0.1.0 - added

### `followers_count` {#followers_count}

**Description:** The reported followers of this profile.\
**Type:** Integer\
**Version history:**\
0.1.0 - added

### `following_count` {#following_count}

**Description:** The reported follows of this profile.\
**Type:** Integer\
**Version history:**\
0.1.0 - added

## CredentialAccount entity attributes {#CredentialAccount}

```json
{
  "id": "14715",
  "username": "trwnh",
  "acct": "trwnh",
  "display_name": "infinite love ⴳ",
  // ...
  "note": "<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>",
  // ...
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": "",
    "note": "i have approximate knowledge of many things. perpetual student. (nb/ace/they)\r\n\r\nxmpp/email: a@trwnh.com\r\nhttps://trwnh.com\r\nhelp me live: https://liberapay.com/trwnh or paypal\r\n\r\n- my triggers are moths and glitter\r\n- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise\r\n- dm me if i did something wrong, so i can improve\r\n- purest person on fedi, do not lewd in my presence",
    "fields": [
      {
        "name": "Website",
        "value": "https://trwnh.com",
        "verified_at": "2019-08-29T04:14:55.571+00:00"
      },
      {
        "name": "Portfolio",
        "value": "https://abdullahtarawneh.com",
        "verified_at": "2021-02-11T20:34:13.574+00:00"
      },
      {
        "name": "Fan of:",
        "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo's Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
        "verified_at": null
      },
      {
        "name": "What to expect:",
        "value": "talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i'm just here to hang out and talk to cool people! and to spill my thoughts.",
        "verified_at": null
      }
    ],
    "follow_requests_count": 5
  },
  // ...
  "fields": [
    {
      "name": "Website",
      "value": "<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-08-29T04:14:55.571+00:00"
    },
    {
      "name": "Portfolio",
      "value": "<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2021-02-11T20:34:13.574+00:00"
    },
    {
      "name": "Fan of:",
      "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
      "verified_at": null
    },
    {
      "name": "What to expect:",
      "value": "talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.",
      "verified_at": null
    }
  ],
  "role": {
    "id": "-99",
    "name": "",
    "permissions": "65536",
    "color": "",
    "highlighted": false
  }
}
```

### `source` {#source}

**Description:** An extra attribute that contains source values to be used with API methods that [verify credentials]({{< relref "methods/accounts#verify_credentials" >}}) and [update credentials]({{< relref "methods/accounts#update_credentials" >}}).\
**Type:** Hash\
**Version history:**\
2.4.0 - added

#### `source[note]` {#source-note}

**Description:** Profile bio, in plain-text instead of in HTML.\
**Type:** String\
**Version history:**\
1.5.0 - added

#### `source[fields]` {#source-fields}

**Description:** Metadata about the account.\
**Type:** Array of [Field](#Field)\
**Version history:**\
2.4.0 - added

#### `source[privacy]` {#source-privacy}

**Description:** The default post privacy to be used for new statuses.\
**Type:** String (Enumerable, oneOf)\
`public` = Public post\
`unlisted` = Unlisted post\
`private` = Followers-only post\
`direct` = Direct post\
**Version history:**\
1.5.0 - added

#### `source[sensitive]` {#source-sensitive}

**Description:** Whether new statuses should be marked sensitive by default.\
**Type:** Boolean\
**Version history:**\
1.5.0 - added

#### `source[language]` {#source-language}

**Description:** The default posting language for new statuses.\
**Type:** String (ISO 639-1 language two-letter code) or empty string\
**Version history:**\
2.4.2 - added

#### `source[follow_requests_count]` {#follow_requests_count}

**Description:** The number of pending follow requests.\
**Type:** Integer\
**Version history:**\
3.0.0 - added

### `role` {#role}

**Description:** The role assigned to the currently authorized user.\
**Type:** [Role]({{< relref "entities/Role" >}})\
**Version history:**\
4.0.0 - added

## MutedAccount entity attributes {#MutedAccount}

### `mute_expires_at` {#mute_expires_at}

**Description:** When a timed mute will expire, if applicable.\
**Type:** {{<nullable>}} String (ISO 8601 Datetime), or null if the mute is indefinite\
**Version history:**\
3.3.0 - added

## Field entity attributes {#Field}

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

{{< page-relref ref="methods/accounts" caption="accounts API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/account_serializer.rb" caption="app/serializers/rest/account_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/credential_account_serializer.rb" caption="app/serializers/rest/credential_account_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/muted_account_serializer.rb" caption="app/serializers/rest/muted_account_serializer.rb" >}}
