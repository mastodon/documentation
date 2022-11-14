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
  "uri": "mastodon.social",
  "title": "Mastodon",
  "short_description": "Server run by the main developers of the project <img draggable=\"false\" alt=\"🐘\" class=\"emojione\" src=\"https://mastodon.social/emoji/1f418.svg\" /> It is not focused on any particular niche interest - everyone is welcome as long as you follow our code of conduct!",
  "description": "Server run by the main developers of the project <img draggable=\"false\" alt=\"🐘\" class=\"emojione\" src=\"https://mastodon.social/emoji/1f418.svg\" /> It is not focused on any particular niche interest - everyone is welcome as long as you follow our code of conduct!",
  "email": "staff@mastodon.social",
  "version": "3.0.1",
  "urls": {
    "streaming_api": "wss://mastodon.social"
  },
  "stats": {
    "user_count": 415526,
    "status_count": 17085754,
    "domain_count": 11834
  },
  "thumbnail": "https://files.mastodon.social/site_uploads/files/000/000/001/original/vlcsnap-2018-08-27-16h43m11s127.png",
  "languages": [
    "en"
  ],
  "registrations": true,
  "approval_required": false,
  "invites_enabled": false,
  "contact_account": {
    "id": "1",
    "username": "Gargron",
    "acct": "Gargron",
    "display_name": "Eugen",
    "locked": false,
    "bot": false,
    "created_at": "2016-03-16T14:34:26.392Z",
    "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
    "url": "https://mastodon.social/@Gargron",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "followers_count": 317112,
    "following_count": 453,
    "statuses_count": 60903,
    "last_status_at": "2019-11-26T21:14:44.522Z",
    "emojis": [],
    "fields": [
      {
        "name": "Patreon",
        "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span}",
        "verified_at": null
      },
      {
        "name": "Homepage",
        "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span}",
        "verified_at": "2019-07-15T18:29:57.191+00:00"
      }
    ]
  }
}
```

## Required attributes

### `uri` {#uri}

**Description:** The domain name of the instance.\
**Type:** String\
**Version history:** Added in 1.1.0

### `title` {#title}

**Description:** The title of the website.\
**Type:** String\
**Version history:** Added in 1.1.0

### `description` {#description}

**Description:** Admin-defined description of the Mastodon site.\
**Type:** String\
**Version history:** Added in 1.1.0

### `short_description` {#short_description}

**Description:** A shorter description defined by the admin.\
**Type:** String\
**Version history:** Added in 2.9.2

### `email` {#email}

**Description:** An email that may be contacted for any inquiries.\
**Type:** String\
**Version history:** Added in 1.1.0

### `version` {#version}

**Description:** The version of Mastodon installed on the instance.\
**Type:** String\
**Version history:** Added in 1.3.0

### `languages` {#languages}

**Description:** Primary languages of the website and its staff.\
**Type:** Array of String \(ISO 639 Part 1-5 language codes\)\
**Version history:** Added in 2.3.0

### `registrations` {#registrations}

**Description:** Whether registrations are enabled.\
**Type:** Boolean\
**Version history:** Added in 2.7.2

### `approval_required` {#approval_required}

**Description:** Whether registrations require moderator approval.\
**Type:** Boolean\
**Version history:** Added in 2.9.2

### `invites_enabled` {#invites_enabled}

**Description:** Whether invites are enabled.\
**Type:** Boolean\
**Version history:** Added in 3.1.4

### `urls` {#urls}

**Description:** URLs of interest for clients apps.\
**Type:** Hash \(`streaming_api`\)\
**Version history:** Added in 1.4.2

#### `urls[streaming_api]` {#streaming_api}

Websockets address for push streaming. String \(URL\).

### `stats` {#stats}

**Description:** Statistics about how much information the instance contains.\
**Type:** Hash \(`user_count`, `status_count`, `domain_count`\)\
**Version history:** Added in 1.6.0

#### `user_count` {#user_count}

Users registered on this instance. Number.

#### `status_count` {#status_count}

Statuses authored by users on instance. Number.

#### `domain_count` {#domain_count}

Domains federated with this instance. Number.

## Optional attributes

### `thumbnail` {#thumbnail}

**Description:** Banner image for the website.\
**Type:** String \(URL\) or null\
**Version history:** Added in 1.6.1

### `contact_account` {#contact_account}

**Description:** A user that can be contacted, as an alternative to `email`.\
**Type:** [Account]({{< relref "account.md" >}}) or null\
**Version history:** Added in 2.3.0

## See also

{{< page-ref page="methods/instance.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance\_serializer.rb" >}}



