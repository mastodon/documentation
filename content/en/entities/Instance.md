---
title: Instance
description: Represents the software instance of Mastodon running on this domain.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/instance",
  "/entities/Instance",
  "/api/entities/instance",
  "/api/entities/Instance",
]
---

## Example

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

## Attributes

### `domain` {#domain}

**Description:** The domain name of the instance.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `title` {#title}

**Description:** The title of the website.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `version` {#version}

**Description:** The version of Mastodon installed on the instance.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `source_url` {#source_url}

**Description:** The URL for the source code of the software running on this instance, in keeping with AGPL license requirements.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

### `description` {#description}

**Description:** A short, plain-text description defined by the admin.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `usage` {#usage}

**Description:** Usage data for this instance.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `usage[users]` {#users}

**Description:** Usage data related to users on this instance.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `usage[users][active_month]` {#active_month}

**Description:** The number of active users in the past 4 weeks.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

### `thumbnail` {#thumbnail}

**Description:** An image used to represent this instance.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `thumbnail[url]` {#thumbnail-url}

**Description:** The URL for the thumbnail image.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

#### `thumbnail[blurhash]` {{<optional>}} {#blurhash}

**Description:** A hash computed by [the BlurHash algorithm](https://github.com/woltapp/blurhash), for generating colorful preview thumbnails when media has not been downloaded yet.\
**Type:** String (Blurhash)\
**Version history:**\
4.0.0 - added

#### `thumbnail[versions]` {{<optional>}} {#thumbnail-versions}

**Description:** Links to scaled resolution images, for high DPI screens.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `thumbnail[versions][@1x]` {{<optional>}} {#1x}

**Description:** The URL for the thumbnail image at 1x resolution.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

##### `thumbnail[versions][@2x]` {{<optional>}} {#2x}

**Description:** The URL for the thumbnail image at 2x resolution.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

### `languages` {#languages}

**Description:** Primary languages of the website and its staff.\
**Type:** Array of String (ISO 639-1 two-letter code)\
**Version history:**\
4.0.0 - added

### `configuration` {#configuration}

**Description:** Configured values and limits for this website.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `configuration[urls]` {#urls}

**Description:** URLs of interest for clients apps.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[urls][streaming]` {#streaming}

**Description:** The Websockets URL for connecting to the streaming API.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

### `configuration[vapid][public_key]` {#vapid_public_key}
**Description:** The instances VAPID public key, used for push notifications, the same as [WebPushSubscription#server_key]({{< relref "entities/WebPushSubscription#server_key" >}}).\
**Type:** String\
**Version history:**\
4.3.0 - added

#### `configuration[accounts]` {#accounts}

**Description:** Limits related to accounts.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[accounts][max_featured_tags]` {#max_featured_tags}

**Description:** The maximum number of featured tags allowed for each account.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[accounts][max_pinned_statuses]` {#max_pinned_statuses}

**Description:** The maximum number of pinned statuses for each account.\
**Type:** Integer\
**Version history:**\
4.3.0 - added

#### `configuration[statuses]` {#statuses}

**Description:** Limits related to authoring statuses.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[statuses][max_characters]` {#max_characters}

**Description:** The maximum number of allowed characters per status.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[statuses][max_media_attachments]` {#max_media_attachments}

**Description:** The maximum number of media attachments that can be added to a status.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[statuses][characters_reserved_per_url]` {#characters_reserved_per_url}

**Description:** Each URL in a status will be assumed to be exactly this many characters.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

#### `configuration[media_attachments]` {#media_attachments}

**Description:** Hints for which attachments will be accepted.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][supported_mime_types]` {#supported_mime_types}

**Description:** Contains MIME types that can be uploaded.\
**Type:** Array of String\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][image_size_limit]` {#image_size_limit}

**Description:** The maximum size of any uploaded image, in bytes.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][image_matrix_limit]` {#image_matrix_limit}

**Description:** The maximum number of pixels (width times height) for image uploads.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][video_size_limit]` {#video_size_limit}

**Description:** The maximum size of any uploaded video, in bytes.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][video_frame_rate_limit]` {#video_frame_rate_limit}

**Description:** The maximum frame rate for any uploaded video.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][video_matrix_limit]` {#video_matrix_limit}

**Description:** The maximum number of pixels (width times height) for video uploads.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

#### `configuration[polls]` {#polls}

**Description:** Limits related to polls.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[polls][max_options]` {#max_options}

**Description:** Each poll is allowed to have up to this many options.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[polls][max_characters_per_option]` {#max_characters_per_option}

**Description:** Each poll option is allowed to have this many characters.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[polls][min_expiration]` {#min_expiration}

**Description:** The shortest allowed poll duration, in seconds.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[polls][max_expiration]` {#max_expiration}

**Description:** The longest allowed poll duration, in seconds.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

#### `configuration[translation]` {#translation}

**Description:** Hints related to translation.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[translation][enabled]` {#translation-enabled}

**Description:** Whether the Translations API is available on this instance.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

### `registrations`

**Description:** Information about registering for this website.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `registrations[enabled]` {#registrations-enabled}

**Description:** Whether registrations are enabled.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

#### `registrations[approval_required]` {#approval_required}

**Description:** Whether registrations require moderator approval.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

#### `registrations[message]` {#registrations-message}

**Description:** A custom message to be shown when registrations are closed.\
**Type:** {{<nullable>}} String (HTML) or null\
**Version history:**\
4.0.0 - added

### `contact` {#contact}

**Description:** Hints related to contacting a representative of the website.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `contact[email]` {#contact-email}

**Description:** An email address that can be messaged regarding inquiries or issues.\
**Type:** String (Email)\
**Version history:**\
4.0.0 - added

#### `contact[account]` {#contact-account}

**Description:** An account that can be contacted natively over the network regarding inquiries or issues.\
**Type:** {{<nullable>}} [Account]({{< relref "entities/Account" >}}) or null\
**Version history:**\
4.0.0 - added

### `rules` {#rules}

**Description:** An itemized list of rules for this website.\
**Type:** Array of [Rule]({{< relref "entities/Rule" >}})\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/instance#v2" caption="GET /api/v2/instance" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance_serializer.rb" >}}
