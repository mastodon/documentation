---
title: Instance
description: Represents the software instance of Mastodon running on this domain.
menu:
  docs:
    parent: entities
---

## Example

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

## Required attributes

### `uri` {#uri}

**Description:** The domain name of the instance.\
**Type:** String\
**Version history:**\
1.1.0 - added

### `title` {#title}

**Description:** The title of the website.\
**Type:** String\
**Version history:**\
1.1.0 - added

### `description` {#description}

**Description:** Admin-defined description of the Mastodon site.\
**Type:** String\
**Version history:**\
1.1.0 - added

### `short_description` {#short_description}

**Description:** A shorter description defined by the admin.\
**Type:** String\
**Version history:**\
2.9.2 - added

### `email` {#email}

**Description:** An email that may be contacted for any inquiries.\
**Type:** String\
**Version history:**\
1.1.0 - added

### `version` {#version}

**Description:** The version of Mastodon installed on the instance.\
**Type:** String\
**Version history:**\
1.3.0 - added

### `languages` {#languages}

**Description:** Primary languages of the website and its staff.\
**Type:** Array of String \(ISO 639 Part 1-5 language codes\)\
**Version history:**\
2.3.0 - added

### `registrations` {#registrations}

**Description:** Whether registrations are enabled.\
**Type:** Boolean\
**Version history:**\
2.7.2 - added

### `approval_required` {#approval_required}

**Description:** Whether registrations require moderator approval.\
**Type:** Boolean\
**Version history:**\
2.9.2 - added

### `invites_enabled` {#invites_enabled}

**Description:** Whether invites are enabled.\
**Type:** Boolean\
**Version history:**\
3.1.4 - added

### `urls` {#urls}

**Description:** URLs of interest for clients apps.\
**Type:** Hash \(`streaming_api`\)\
**Version history:**\
1.4.2 - added

#### `urls.streaming_api` {#streaming_api}

Websockets address for push streaming. String \(URL\).

### `stats` {#stats}

**Description:** Statistics about how much information the instance contains.\
**Type:** Hash \(`user_count`, `status_count`, `domain_count`\)\
**Version history:**\
1.6.0 - added

#### `stats.user_count` {#user_count}

Users registered on this instance. Number.

#### `stats.status_count` {#status_count}

Statuses authored by users on instance. Number.

#### `stats.domain_count` {#domain_count}

Domains federated with this instance. Number.

## Optional attributes

### `thumbnail` {#thumbnail}

**Description:** Banner image for the website.\
**Type:** String (URL)\
**Version history:**\
1.6.1 - added

### `contact_account` {#contact_account}

**Description:** A user that can be contacted, as an alternative to `email`.\
**Type:** [Account]({{< relref "account.md" >}})\
**Version history:**\
2.3.0 - added

### `rules` {#rules}

**Description:** Simple list of rules for this website\
**Type:** Array of [Rule]({{< relref "rule.md" >}})\
**Version history:**\
3.4.0 - added

### `configuration` {#configuration}

**Description:** Configured values and limits for this website.\
**Type:** Hash\
**Version history:**
3.4.2 - added

#### `configuration.statuses` {#statuses}

Hash. Limits related to authoring statuses.

##### `configuration.statuses.max_characters` {#max_characters}

Number. The maximum number of allowed characters per status.

##### `configuration.statuses.max_media_attachments` {#max_media_attachments}

Number. The maximum number of media attachments that can be added to a status.

##### `configuration.statuses.characters_reserved_per_url` {#characters_reserved_per_url}

Number. Each URL in a status will be assumed to be exactly this many characters.

#### `configuration.media_attachments` {#media_attachments}

Hash. Hints for which attachments will be accepted.

##### `configuration.media_attachments.supported_mime_types` {#supported_mime_types}

Array of String. Contains MIME types that can be uploaded.

##### `configuration.media_attachments.image_size_limit` {#image_size_limit}

Number. The maximum size of any uploaded image, in bytes.

##### `configuration.media_attachments.image_matrix_limit` {#image_matrix_limit}

Number. The maximum number of pixels (width times height) for image uploads.

##### `configuration.media_attachments.video_size_limit` {#video_size_limit}

Number. The maximum size of any uploaded video, in bytes.

##### `configuration.media_attachments.video_frame_rate_limit` {#video_frame_rate_limit}

Number. The maximum frame rate for any uploaded video.

##### `configuration.media_attachments.video_matrix_limit` {#video_matrix_limit}

Number. The maximum number of pixels (width times height) for video uploads.

#### `configuration.polls` {#polls}

Hash. Limits related to polls.

##### `configuration.polls.max_options` {#max_options}

Number. Each poll is allowed to have up to this many options.

##### `configuration.polls.max_characters_per_option` {#max_characters_per_option}

Number. Each poll option is allowed to have this many characters.

##### `configuration.polls.min_expiration` {#min_expiration}

Number. The shortest allowed poll duration, in seconds.

##### `configuration.polls.max_expiration` {#max_expiration}

Number. The longest allowed poll duration, in seconds.

## See also

{{< page-ref page="methods/instance.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance\_serializer.rb" >}}



