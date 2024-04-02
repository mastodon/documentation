---
title: instance API methods
description: Discover information about a Mastodon website.
menu:
  docs:
    weight: 70
    name: instance
    parent: methods
    identifier: methods-instance
aliases: [
  "/methods/instance",
  "/api/methods/instance",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View server information {#v2}

```http
GET /api/v2/instance
```

Obtain general information about the server.

**Returns:** [Instance]({{< relref "entities/Instance" >}})\
**OAuth:** Public\
**Version history:**\
4.0.0 - added

#### Response

##### 200: OK

```json
{
  "domain": "mastodon.social",
  "title": "Mastodon",
  "version": "4.0.0rc1",
  "source_url": "https://github.com/mastodon/mastodon",
  "description": "The original server operated by the Mastodon gGmbH non-profit",
  "usage": {
    "users": {
      "active_month": 123122
    }
  },
  "thumbnail": {
    "url": "https://files.mastodon.social/site_uploads/files/000/000/001/@1x/57c12f441d083cde.png",
    "blurhash": "UeKUpFxuo~R%0nW;WCnhF6RjaJt757oJodS$",
    "versions": {
      "@1x": "https://files.mastodon.social/site_uploads/files/000/000/001/@1x/57c12f441d083cde.png",
      "@2x": "https://files.mastodon.social/site_uploads/files/000/000/001/@2x/57c12f441d083cde.png"
    }
  },
  "languages": [
    "en"
  ],
  "configuration": {
    "urls": {
      "streaming": "wss://mastodon.social"
    },
    "vapid": {
      "public_key": "BCkMmVdKDnKYwzVCDC99Iuc9GvId-x7-kKtuHnLgfF98ENiZp_aj-UNthbCdI70DqN1zUVis-x0Wrot2sBagkMc="
    },
    "accounts": {
      "max_featured_tags": 10,
      "max_pinned_statuses": 4
    },
    "statuses": {
      "max_characters": 500,
      "max_media_attachments": 4,
      "characters_reserved_per_url": 23
    },
    "media_attachments": {
      "supported_mime_types": [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/heic",
        "image/heif",
        "image/webp",
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/ogg",
        "audio/wave",
        "audio/wav",
        "audio/x-wav",
        "audio/x-pn-wave",
        "audio/vnd.wave",
        "audio/ogg",
        "audio/vorbis",
        "audio/mpeg",
        "audio/mp3",
        "audio/webm",
        "audio/flac",
        "audio/aac",
        "audio/m4a",
        "audio/x-m4a",
        "audio/mp4",
        "audio/3gpp",
        "video/x-ms-asf"
      ],
      "image_size_limit": 10485760,
      "image_matrix_limit": 16777216,
      "video_size_limit": 41943040,
      "video_frame_rate_limit": 60,
      "video_matrix_limit": 2304000
    },
    "polls": {
      "max_options": 4,
      "max_characters_per_option": 50,
      "min_expiration": 300,
      "max_expiration": 2629746
    },
    "translation": {
      "enabled": true
    }
  },
  "registrations": {
    "enabled": false,
    "approval_required": false,
    "message": null
  },
  "contact": {
    "email": "staff@mastodon.social",
    "account": {
      "id": "1",
      "username": "Gargron",
      "acct": "Gargron",
      "display_name": "Eugen 💀",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "group": false,
      "created_at": "2016-03-16T00:00:00.000Z",
      "note": "<p>Founder, CEO and lead developer <span class=\"h-card\"><a href=\"https://mastodon.social/@Mastodon\" class=\"u-url mention\">@<span>Mastodon</span></a></span>, Germany.</p>",
      "url": "https://mastodon.social/@Gargron",
      "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
      "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
      "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
      "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
      "followers_count": 133026,
      "following_count": 311,
      "statuses_count": 72605,
      "last_status_at": "2022-10-31",
      "noindex": false,
      "emojis": [],
      "fields": [
        {
          "name": "Patreon",
          "value": "<a href=\"https://www.patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        }
      ]
    }
  },
  "rules": [
    {
      "id": "1",
      "text": "Sexually explicit or violent media must be marked as sensitive when posting"
    },
    {
      "id": "2",
      "text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
    },
    {
      "id": "3",
      "text": "No incitement of violence or promotion of violent ideologies"
    },
    {
      "id": "4",
      "text": "No harassment, dogpiling or doxxing of other users"
    },
    {
      "id": "5",
      "text": "No content illegal in Germany"
    },
    {
      "id": "7",
      "text": "Do not share intentionally false or misleading information"
    }
  ]
}
```


---

## List of connected domains {#peers}

```http
GET /api/v1/instance/peers HTTP/1.1
```

Domains that this instance is aware of.

**Returns:** Array of String\
**OAuth:** Public\
**Version history:**\
2.1.2 - added\
3.0.0 - requires user token if instance is in whitelist mode

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

```json
["tilde.zone","mspsocial.net",...,"conf.tube"]
```

##### 401: Unauthorized

If the instance is in whitelist mode and the Authorization header is missing or invalid

```json
{
  "error": "This API requires an authenticated user"
}
```

---

## Weekly activity {#activity}

```http
GET /api/v1/instance/activity HTTP/1.1
```

Instance activity over the last 3 months, binned weekly.

**Returns:** Array of Hash\
**OAuth:** Public\
**Version history:**\
2.1.2 - added\
3.0.0 - requires user token if instance is in whitelist mode

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Each hash in the array will contain the following attributes:

week
: String (UNIX Timestamp). Midnight at the first day of the week.

statuses
: String (cast from an integer). The number of Statuses created since the week began.

logins
: String (cast from an integer). The number of user logins since the week began.

registrations
: String (cast from an integer). The number of user registrations since the week began.

```json
[
  {
    "week": "1574640000",
    "statuses": "37125",
    "logins": "14239",
    "registrations": "542"
  },
  {
    "week": "1574035200",
    "statuses": "244447",
    "logins": "28820",
    "registrations": "4425"
  },
  {
    "week": "1573430400",
    "statuses": "270615",
    "logins": "35388",
    "registrations": "8781"
  },
  {
    "week": "1572825600",
    "statuses": "309722",
    "logins": "44433",
    "registrations": "26165"
  },
  {
    "week": "1572220800",
    "statuses": "116227",
    "logins": "19739",
    "registrations": "2926"
  },
  {
    "week": "1571616000",
    "statuses": "119932",
    "logins": "19247",
    "registrations": "3188"
  },
  {
    "week": "1571011200",
    "statuses": "117892",
    "logins": "19164",
    "registrations": "3107"
  },
  {
    "week": "1570406400",
    "statuses": "109092",
    "logins": "18763",
    "registrations": "2986"
  },
  {
    "week": "1569801600",
    "statuses": "107554",
    "logins": "19614",
    "registrations": "2904"
  },
  {
    "week": "1569196800",
    "statuses": "118067",
    "logins": "19703",
    "registrations": "3295"
  },
  {
    "week": "1568592000",
    "statuses": "110199",
    "logins": "19791",
    "registrations": "3026"
  },
  {
    "week": "1567987200",
    "statuses": "106029",
    "logins": "19089",
    "registrations": "2769"
  }
]
```

##### 401: Unauthorized

If the instance is in whitelist mode and the Authorization header is missing or invalid

```json
{
  "error": "This API requires an authenticated user"
}
```

---

## List of rules {#rules}


```http
GET /api/v1/instance/rules HTTP/1.1
```

Rules that the users of this service should follow.

**Returns:** Array of [Rule]({{< relref "entities/rule" >}})\
**OAuth:** Public\
**Version history:**\
3.4.0 - added

#### Response
##### 200: OK

```json
[
  {
    "id": "1",
    "text": "Sexually explicit or violent media must be marked as sensitive when posting"
  },
  {
    "id": "2",
    "text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
  },
  {
    "id": "3",
    "text": "No incitement of violence or promotion of violent ideologies"
  },
  {
    "id": "4",
    "text": "No harassment, dogpiling or doxxing of other users"
  },
  {
    "id": "5",
    "text": "No content illegal in Germany"
  },
  {
    "id": "7",
    "text": "Do not share intentionally false or misleading information"
  }
]
```

---

## View moderated servers {#domain_blocks}

```http
GET /api/v1/instance/domain_blocks HTTP/1.1
```

Obtain a list of domains that have been blocked.

**Returns:** Array of [DomainBlock]({{< relref "entities/DomainBlock" >}})\
**OAuth:** Public, or User token if limited to users\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The complete list of domains blocked by this instance

```json
[
  {
    "domain":"birb.elfenban.de",
    "digest":"5d2c6e02a0cced8fb05f32626437e3d23096480b47efbba659b6d9e80c85d280",
    "severity":"suspend",
    "comment":"Third-party bots"
  },
  {
    "domain":"birdbots.leptonics.com",
    "digest":"ce019d8d32cce8e369ac4367f4dc232103e6f489fbdd247fb99f9c8a646078a4",
    "severity":"suspend",
    "comment":"Third-party bots"
  },
  // ...
]
```

##### 401: Unauthorized

Invalid or missing Authorization header, if the admin has chosen to show domain blocks to users.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

The admin has chosen to show domain blocks to no one. The response body is empty; only the HTTP 404 error code is relevant.

```text
```

---

## View extended description {#extended_description}

```http
GET /api/v1/instance/extended_description HTTP/1.1
```

Obtain an extended description of this server

**Returns:** [ExtendedDescription]({{< relref "entities/ExtendedDescription" >}})\
**OAuth:** Public\
**Version history:**\
4.0.0 - added

#### Response
##### 200: OK

```json
{
  "updated_at":"2022-11-03T04:09:07Z",
  "content":"<p>For inquiries not related specifically to the operation of this server, such as press inquiries, please contact <a href=\"mailto:press@joinmastodon.org\">press@joinmastodon.org</a>.</p>\n\n<h2>Funding</h2>\n\n<p>This server is crowdfunded by <a href=\"https://patreon.com/mastodon\">Patreon donations</a>. For a list of sponsors, see <a href=\"https://joinmastodon.org/sponsors\">joinmastodon.org</a>.</p>\n\n<h2>Reporting and moderation</h2>\n\n<p>When reporting accounts, please make sure to include at least a few posts that show rule-breaking behaviour, when applicable. If there is any additional context that might help make a decision, please also include it in the comment. This is especially important when the content is in a language nobody on the moderation team speaks.</p>\n\n<p>We usually handle reports within 24 hours. Please mind that you are not notified when a report you have made has led to a punitive action, and that not all punitive actions are externally visible. For first time offenses, we may opt to delete offending content, escalating to harsher measures on repeat offenses.</p>\n\n<h2>Impressum</h2>\n\n<p>Mastodon gGmbH<br>\nMühlenstraße 8a<br>\n14167 Berlin<br>\nGermany</p>\n\n<p>E-Mail-Adresse: hello@joinmastodon.org</p>\n\n<p>Vertretungsberechtigt: Eugen Rochko (Geschäftsführer)</p>\n\n<p>Umsatzsteuer Identifikationsnummer (USt-ID): DE344258260</p>\n\n<p>Handelsregister<br>\nGeführt bei: Amtsgericht Charlottenburg<br>\nNummer: HRB 230086 B</p>\n"
}
```

---

## View translation languages {#translation_languages}

```http
GET /api/v1/instance/translation_languages HTTP/1.1
```

Translation language pairs supported by the translation engine used by the server.

**Returns:** Object with source language codes as keys and arrays of target language codes as values.\
**OAuth:** Public\
**Version history:**\
4.2.0 - added

#### Response
##### 200: OK

All source and target language pairs supported by the server.

In the following sample response showing support for translating a status written in English (`en`) into German (`de`) or Spanish (`es`). The source language code `und` indicates that the server supports auto-detection the language of statuses with an empty `language` attribute and translating these into either British English (`en-GB`), German or Spanish.

```json
{
  "en": ["de", "es"],
  // [...]
  "und": ["en-GB", "de", "es"]
}
```

---

## (DEPRECATED) View server information (V1) {#v1}

```http
GET /api/v1/instance HTTP/1.1
```

Obtain general information about the server.

**Returns:** [V1::Instance]({{< relref "entities/V1_Instance" >}})\
**OAuth:** Public\
**Version history:**\
1.1.0 - added\
3.0.0 - requires user token if instance is in whitelist mode\
3.1.4 - added `invites_enabled` to response\
3.4.0 - added `rules`\
3.4.2 - added `configuration`\
4.0.0 - deprecated. added `configuration[accounts]`.

#### Response

##### 200: OK

```json
{
  "uri":"mastodon.social",
  "title":"Mastodon",
  "short_description":"The original server operated by the Mastodon gGmbH non-profit",
  "description":"",
  "email":"staff@mastodon.social",
  "version":"3.5.3",
  "urls":{
    "streaming_api":"wss://mastodon.social"
  },
  "stats":{
    "user_count":812303,
    "status_count":38151616,
    "domain_count":25255
  },
  "thumbnail":"https://files.mastodon.social/site_uploads/files/000/000/001/original/vlcsnap-2018-08-27-16h43m11s127.png",
  "languages":[
    "en"
  ],
  "registrations":false,
  "approval_required":false,
  "invites_enabled":true,
  "configuration":{
    "statuses":{
      "max_characters":500,
      "max_media_attachments":4,
      "characters_reserved_per_url":23
    },
    "media_attachments":{
      "supported_mime_types":[
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/ogg",
        "audio/wave",
        "audio/wav",
        "audio/x-wav",
        "audio/x-pn-wave",
        "audio/vnd.wave",
        "audio/ogg",
        "audio/vorbis",
        "audio/mpeg",
        "audio/mp3",
        "audio/webm",
        "audio/flac",
        "audio/aac",
        "audio/m4a",
        "audio/x-m4a",
        "audio/mp4",
        "audio/3gpp",
        "video/x-ms-asf"
      ],
      "image_size_limit":10485760,
      "image_matrix_limit":16777216,
      "video_size_limit":41943040,
      "video_frame_rate_limit":60,
      "video_matrix_limit":2304000
    },
    "polls":{
      "max_options":4,
      "max_characters_per_option":50,
      "min_expiration":300,
      "max_expiration":2629746
    }
  },
  "contact_account":{
    "id":"1",
    "username":"Gargron",
    "acct":"Gargron",
    "display_name":"Eugen",
    "locked":false,
    "bot":false,
    "discoverable":true,
    "group":false,
    "created_at":"2016-03-16T00:00:00.000Z",
    "note":"\u003cp\u003eFounder, CEO and lead developer \u003cspan class=\"h-card\"\u003e\u003ca href=\"https://mastodon.social/@Mastodon\" class=\"u-url mention\"\u003e@\u003cspan\u003eMastodon\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e, Germany.\u003c/p\u003e",
    "url":"https://mastodon.social/@Gargron",
    "avatar":"https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
    "avatar_static":"https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
    "header":"https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "header_static":"https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "followers_count":118944,
    "following_count":305,
    "statuses_count":72309,
    "last_status_at":"2022-08-24",
    "emojis":[
      
    ],
    "fields":[
      {
        "name":"Patreon",
        "value":"\u003ca href=\"https://www.patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"\u003e\u003cspan class=\"invisible\"\u003ehttps://www.\u003c/span\u003e\u003cspan class=\"\"\u003epatreon.com/mastodon\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e",
        "verified_at":null
      }
    ]
  },
  "rules":[
    {
      "id":"1",
      "text":"Sexually explicit or violent media must be marked as sensitive when posting"
    },
    {
      "id":"2",
      "text":"No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
    },
    {
      "id":"3",
      "text":"No incitement of violence or promotion of violent ideologies"
    },
    {
      "id":"4",
      "text":"No harassment, dogpiling or doxxing of other users"
    },
    {
      "id":"5",
      "text":"No content illegal in Germany"
    },
    {
      "id":"7",
      "text":"Do not share intentionally false or misleading information"
    }
  ]
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances_controller.rb" caption="app/controllers/api/v1/instances_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/activity_controller.rb" caption="app/controllers/api/v1/instances/activity_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/peers_controller.rb" caption="app/controllers/api/v1/instances/peers_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/rules_controller.rb" caption="app/controllers/api/v1/instances/rules_controller.rb" >}}
