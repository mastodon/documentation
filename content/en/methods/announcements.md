---
title: announcements API methods
description: For announcements set by administration.
menu:
  docs:
    weight: 90
    name: announcements
    parent: methods-instance
    identifier: methods-announcements
aliases: [
  "/methods/announcements",
  "/api/methods/announcements",
  "/methods/instance/announcements",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View all announcements {#get}

```http
GET /api/v1/announcements HTTP/1.1
```

See all currently active announcements set by admins.

**Returns:** Array of [Announcement]({{< relref "entities/announcement">}})\
**OAuth:** User token\
**Version history:**\
3.1.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Currently active announcements

```json
[
  {
    "id": "8",
    "content": "<p>Looks like there was an issue processing audio attachments without embedded art since yesterday due to an experimental new feature. That issue has now been fixed, so you may see older posts with audio from other servers pop up in your feeds now as they are being finally properly processed. Sorry!</p>",
    "starts_at": null,
    "ends_at": null,
    "all_day": false,
    "published_at": "2020-07-03T01:27:38.726Z",
    "updated_at": "2020-07-03T01:27:38.752Z",
    "read": true,
    "mentions": [],
    "statuses": [],
    "tags": [],
    "emojis": [],
    "reactions": [
      {
        "name": "bongoCat",
        "count": 9,
        "me": false,
        "url": "https://files.mastodon.social/custom_emojis/images/000/067/715/original/fdba57dff7576d53.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/067/715/static/fdba57dff7576d53.png"
      },
      {
        "name": "thonking",
        "count": 1,
        "me": false,
        "url": "https://files.mastodon.social/custom_emojis/images/000/098/690/original/a8d36edc4a7032e8.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/098/690/static/a8d36edc4a7032e8.png"
      },
      {
        "name": "AAAAAA",
        "count": 1,
        "me": false,
        "url": "https://files.mastodon.social/custom_emojis/images/000/071/387/original/AAAAAA.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/071/387/static/AAAAAA.png"
      },
      {
        "name": "🤔",
        "count": 1,
        "me": true
      }
    ]
  }
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Dismiss an announcement {#dismiss}

```http
POST /api/v1/announcements/:id/dismiss HTTP/1.1
```

Allows a user to mark the announcement as read.

**Returns:** Empty\
**OAuth:** User token + `write:accounts`\
**Version history:**\
3.1.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Announcement in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK
```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Announcement with given ID does not exist

```json
{
  "error": "Record not found"
}
```

---

## Add a reaction to an announcement {#put-reactions}

```http
PUT /api/v1/announcements/:id/reactions/:name HTTP/1.1
```

React to an announcement with an emoji.

**Returns:** Empty\
**OAuth:** User token + `write:favourites`\
**Version history:**\
3.1.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Announcement in the database.

:name
: {{<required>}} String. Unicode emoji, or the shortcode of a custom emoji.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Announcement with given ID does not exist

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Name is not a recognized emoji"
}
```

---

## Remove a reaction from an announcement {#delete-reactions}

```http
DELETE /api/v1/announcements/:id/reactions/:name HTTP/1.1
```

Undo a react emoji to an announcement.

**Returns:** Empty\
**OAuth:** User token + `write:favourites`\
**Version history:**\
3.1.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Announcement in the database.

:name
: {{<required>}} String. Unicode emoji, or the shortcode of a custom emoji.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Announcement with given ID does not exist

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Name is not a recognized emoji"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/announcements_controller.rb" caption="app/controllers/api/v1/announcements_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/announcements/reactions_controller.rb" caption="app/controllers/api/v1/announcements/reactions_controller.rb" >}}
