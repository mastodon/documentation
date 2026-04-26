---
title: profile API methods
description: Methods concerning profiles.
menu:
  docs:
    weight: 20
    name: profile
    parent: methods
    identifier: methods-profile
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Get current user profile

```http
GET /api/v1/profile HTTP/1.1
```

**Returns:** [Profile]({{< relref "entities/Profile">}})\
**OAuth:** User token + `profile` or `read:accounts`\
**Version history:**
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 8) - added\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 9) - added `avatar_description` and `header_description`

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response

##### 200: OK

The current user's profile is returned.

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

### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
	"error": "The access token is invalid"
}
```

---

## Update current user profile

```http
PATCH /api/v1/profile
```

Update the current user's profile.

**Returns:** [Profile]({{< relref "entities/Profile">}})\
**OAuth:** User token + `write:accounts`\
**Version history:**
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 8) - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Form data parameters

display_name
: String. The display name to use for the profile.

note
: String. The account bio.

avatar
: Avatar image encoded using `multipart/form-data`

avatar_description
: String. A plain-text description of the avatar, for accessibility purposes.

header
: Header image encoded using `multipart/form-data`

header_description
: String. A plain-text description of the header, for accessibility purposes.

locked
: Boolean. Whether manual approval of follow requests is required.

bot
: Boolean. Whether the account has a bot flag.

discoverable
: Boolean. Whether the account should be shown in the profile directory.

hide_collections
: Boolean. Whether to hide followers and followed accounts.

indexable
: Boolean. Whether public posts should be searchable to anyone.

show_media
: Boolean. Whether a “Media” tab with media attachments should be shown on this profile.

show_media_replies
: Boolean. Whether media attachments in replies should be shown in the “Media” tab of this profile.

show_featured
: Boolean. Whether a “Featured” tab should be shown on this profile.

attribution_domains[]
: Array of String. Domains of websites allowed to credit the account. Maximum of 10 domains.

fields_attributes
: Array of Hash. The profile fields to be set. Each hash includes `name` and `value`. By default, max 4 fields (specified in [Instance#max_profile_fields]({{< relref "entities/Instance#max_profile_fields" >}})).

fields_attributes[:index][name]
: String. The name of the profile field. By default, max 255 characters (specified in [Instance#profile_field_name_limit]({{< relref "entities/Instance#profile_field_name_limit" >}})).

fields_attributes[:index][value]
: String. The value of the profile field. By default, max 255 characters (specified in [Instance#profile_field_value_limit]({{< relref "entities/Instance#profile_field_value_limit" >}})).

#### Response

##### 200: OK

Returns the updated profile.

##### 401: Unauthorized

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Delete profile avatar

```http
DELETE /api/v1/profile/avatar HTTP/1.1
```

**Returns:** [CredentialAccount]({{< relref "entities/Account#CredentialAccount">}})\
**OAuth:** User token + `write:accounts`\
**Version history:**\
4.2.0 - added

Deletes the avatar associated with the user's profile.

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Path parameters

#### Response

##### 200: OK

The avatar was successfully deleted from the user's profile. If there were no avatar associated with the profile, the response will still indicate a successful deletion.

```json
{
  "id": "110357222516183152",
  "username": "rob",
  "acct": "rob",
  "display_name": "",
  "locked": false,
  "bot": false,
  "discoverable": false,
  "group": false,
  "created_at": "2023-05-12T00:00:00.000Z",
  "note": "",
  "url": "http://localhost:3000/@rob",
  "uri": "http://localhost:3000/users/rob",
  "avatar": "http://localhost:3000/avatars/original/missing.png",
  "avatar_static": "http://localhost:3000/avatars/original/missing.png",
  "header": "http://localhost:3000/system/accounts/headers/110/357/222/516/183/152/original/0cd99648c23005ed.png",
  "header_static": "http://localhost:3000/system/accounts/headers/110/357/222/516/183/152/original/0cd99648c23005ed.png",
  "followers_count": 14,
  "following_count": 2,
  "statuses_count": 10,
  "last_status_at": "2023-06-26",
  "noindex": false,
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": null,
    "note": "",
    "fields": [],
    "follow_requests_count": 0
  },
  "emojis": [],
  "roles": [],
  "fields": [],
  "role": {
    "id": "-99",
    "name": "",
    "permissions": "65536",
    "color": "",
    "highlighted": false
  }
}
```

### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
	"error": "The access token is invalid"
}
```

---

## Delete profile header

```http
DELETE /api/v1/profile/header HTTP/1.1
```

**Returns:** [CredentialAccount]({{< relref "entities/Account#CredentialAccount">}})\
**OAuth:** User token + `write:accounts`\
**Version history:**\
4.2.0 - added

Deletes the header image associated with the user's profile.

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Path parameters

#### Response

##### 200: OK

The header was successfully deleted from the user's profile. If there were no header associated with the profile, the response will still indicate a successful deletion.

```json
{
  "id": "110357222516183152",
  "username": "rob",
  "acct": "rob",
  "display_name": "",
  "locked": false,
  "bot": false,
  "discoverable": false,
  "group": false,
  "created_at": "2023-05-12T00:00:00.000Z",
  "note": "",
  "url": "http://localhost:3000/@rob",
  "uri": "http://localhost:3000/users/rob",
  "avatar": "http://localhost:3000/avatars/original/missing.png",
  "avatar_static": "http://localhost:3000/avatars/original/missing.png",
  "header": "http://localhost:3000/headers/original/missing.png",
  "header_static": "http://localhost:3000/headers/original/missing.png",
  "followers_count": 14,
  "following_count": 2,
  "statuses_count": 10,
  "last_status_at": "2023-06-26",
  "noindex": false,
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": null,
    "note": "",
    "fields": [],
    "follow_requests_count": 0
  },
  "emojis": [],
  "roles": [],
  "fields": [],
  "role": {
    "id": "-99",
    "name": "",
    "permissions": "65536",
    "color": "",
    "highlighted": false
  }
}
```

### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
	"error": "The access token is invalid"
}
```
