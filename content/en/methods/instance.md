---
title: instance
description: Informational endpoint to discover information about a Mastodon website.
menu:
  docs:
    weight: 70
    parent: methods
    identifier: methods-instance
---

## General information {#get}

```http
GET https://mastodon.example/api/v1/instance HTTP/1.1
```

Information about the server.

**Returns:** [Instance]({{< relref "entities/instance" >}})\
**OAuth:** Public\
**Version history:**\
1.1.0 - added\
3.0.0 - requires user token if instance is in whitelist mode\
3.1.4 - added `invites_enabled` to response\
3.4.0 - added `rules`\
3.4.2 - added `configuration`

#### Response

##### 200: Success

```javascript
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

## List of connected domains {#peers}

```http
GET https://mastodon.example/api/v1/instance/peers HTTP/1.1
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

##### 200: Success

```javascript
["tilde.zone","mspsocial.net",...,"conf.tube"]
```

##### 401: Unauthorized

If the instance is in whitelist mode and the Authorization header is missing or invalid

```javascript
{
  "error": "This API requires an authenticated user"
}
```

---

## Weekly activity {#activity}

```http
GET https://mastodon.example/api/v1/instance/activity HTTP/1.1
```

Instance activity over the last 3 months, binned weekly.

**Returns:** Array of [Activity]({{< relref "entities/activity" >}})\
**OAuth:** Public\
**Version history:**\
2.1.2 - added\
3.0.0 - requires user token if instance is in whitelist mode

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: Success

```javascript
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

```javascript
{
  "error": "This API requires an authenticated user"
}
```

---

## List of rules {#rules}


```http
GET https://mastodon.example/api/v1/instance/rules HTTP/1.1
```

Rules that the users of this service should follow.

**Returns:** Array of [Rule]({{< relref "entities/rule" >}})\
**OAuth:** Public\
**Version history:**\
3.4.0 - added

#### Response
##### 200: Success

```javascript
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

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances_controller.rb" caption="app/controllers/api/v1/instances_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances" caption="app/controllers/api/v1/instances/" >}}