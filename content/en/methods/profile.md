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
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

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
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

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
