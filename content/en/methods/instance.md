---
title: instance
description: Informational endpoint to discover information about a Mastodon website.
menu:
  docs:
    weight: 70
    parent: methods
    identifier: methods-instance
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/instance" title="Fetch instance" >}}
{{< api-method-description >}}

Information about the server.

**Returns:** Instance\
**OAuth:** Public\
**Version history:**\
1.1.0 - added\
3.0.0 - requires user token if instance is in whitelist mode\
3.1.4 - added `invites_enabled` to response
3.4.0 - added `rules`

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "uri": "mastodon.social",
  "title": "Mastodon",
  "short_description": "The original server operated by the Mastodon gGmbH non-profit",
  "description": "",
  "email": "staff@mastodon.social",
  "version": "3.5.1",
  "urls": {
    "streaming_api": "wss://mastodon.social"
  },
  "stats": {
    "user_count": 685873,
    "status_count": 35761624,
    "domain_count": 23275
  },
  "thumbnail": "https://files.mastodon.social/site_uploads/files/000/000/001/original/vlcsnap-2018-08-27-16h43m11s127.png",
  "languages": [
    "en"
  ],
  "registrations": true,
  "approval_required": false,
  "invites_enabled": true,
  "configuration": {
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
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/ogg",
        "audio/wave",
        "audio/wav",
        "audio/x-wav",
        "audio/x-pn-wave",
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
    }
  },
  "contact_account": {
    "id": "1",
    "username": "Gargron",
    "acct": "Gargron",
    "display_name": "Eugen",
    "locked": false,
    "bot": false,
    "discoverable": true,
    "group": false,
    "created_at": "2016-03-16T00:00:00.000Z",
    "note": "<p>Founder, CEO and lead developer <span class=\"h-card\"><a href=\"https://mastodon.social/@Mastodon\" class=\"u-url mention\">@<span>Mastodon</span></a></span>, Germany.</p>",
    "url": "https://mastodon.social/@Gargron",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/ccb05a778962e171.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/ccb05a778962e171.png",
    "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "followers_count": 112026,
    "following_count": 282,
    "statuses_count": 72488,
    "last_status_at": "2022-05-01",
    "emojis": [],
    "fields": [
      {
        "name": "Patreon",
        "value": "<a href=\"https://www.patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
        "verified_at": null
      }
    ]
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
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/instance/peers" title="List of connected domains" >}}
{{< api-method-description >}}

Domains that this instance is aware of.

**Returns:** Array of String\
**OAuth:** Public\
**Version history:**\
2.1.2 - added\
3.0.0 - requires user token if instance is in whitelist mode

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
["tilde.zone","mspsocial.net",...,"conf.tube"]
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/instance/activity" title="Weekly activity" >}}
{{< api-method-description >}}

Instance activity over the last 3 months, binned weekly.

**Returns:** Array of Activity\
**OAuth:** Public\
**Version history:**\
2.1.2 - added\
3.0.0 - requires user token if instance is in whitelist mode

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```
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
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/instance/rules" title="List of rules" >}}
{{< api-method-description >}}

Rules that the users of this service should follow.

**Returns:** Array of Rule\
**OAuth:** Public\
**Version history:**\
3.4.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


