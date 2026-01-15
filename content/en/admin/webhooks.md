---
title: Webhooks
description: Real-time notifications for application events.
menu:
  docs:
    weight: 120
    parent: admin
---

## Managing webhooks

Webhooks are managed from the **Administration > Webhooks** area in the admin UI.

To add an endpoint, provide the URL where the webhook should be sent, the
relevant event(s) to notify about, and (optionally) a payload template to
control the JSON which is generated and sent. By default, the JSON will be a
serialization of the record which caused the webhook to be sent.

## Receiving webhooks

When a relevant event is generated, the webhook payload will be sent via `POST`
to the registered URL.

An `X-Hub-Signature` header adopted from the [WebSub spec] will be included and
can be used to verify that the payloads are authentic.

## Events

The events are named after the system events which trigger them.

Supported events include:

* `account.approved`
* `account.created`
* `account.updated`
* `report.created`
* `report.updated`
* `status.created`
* `status.updated`

## Example payload

```json
{
  "event": "report.created",
  "created_at": "2023-10-26T13:34:00.351Z",
  "object": {
    "id": "8437",
    "action_taken": false,
    "action_taken_at": null,
    "category": "violation",
    "comment": "",
    "forwarded": true,
    "created_at": "2023-10-26T13:34:00.348Z",
    "updated_at": "2023-10-26T13:34:00.348Z",
    "account": {
      "id": "123456789",
      "username": "bobisaburger",
      "domain": null,
      "created_at": "2023-07-13T04:39:22.493Z",
      "email": "bobisaburger@emailservice.com",
      "ip": "12.34.56.78",
      "confirmed": true,
      "suspended": false,
      "silenced": false,
      "sensitized": false,
      "disabled": false,
      "approved": true,
      "locale": "en",
      "invite_request": "I would love to be a member of your instance!",
      "ips": [
        {
          "ip": "12.34.56.78",
          "used_at": "2023-07-13T04:45:31.835Z"
        },
        {
          "ip": "98.76.54.32",
          "used_at": "2023-07-13T04:39:22.722Z"
        }
      ],
      "account": {
        "id": "123456789",
        "username": "bobisaburger",
        "acct": "bobisaburger",
        "display_name": "bobisaburger",
        "locked": false,
        "bot": false,
        "discoverable": null,
        "group": false,
        "created_at": "2023-07-13T00:00:00.000Z",
        "note": "",
        "url": "https://mastodonwebsite/@bobisaburger",
        "uri": "https://mastodonwebsite/users/bobisaburger",
        "avatar": "https://locationofavatar.com/image.jpg",
        "avatar_static": "https://locationofavatar.com/image.jpg",
        "header": "locationofheader.com/image.jpg",
        "header_static": "locationofheader.com/image.jpg",
        "followers_count": 100,
        "following_count": 200,
        "statuses_count": 9,
        "last_status_at": "2023-08-05",
        "noindex": true,
        "emojis": [],
        "roles": [],
        "fields": []
      },
      "role": {
        "id": "-99",
        "name": "",
        "permissions": "65536",
        "color": "",
        "highlighted": false
      }
    },
    "target_account": {
      "id": "123454321",
      "username": "cheeseperson",
      "domain": "someothermastodonsite.com",
      "created_at": "2023-08-20T00:00:00.000Z",
      "email": null,
      "ip": null,
      "confirmed": null,
      "suspended": false,
      "silenced": false,
      "sensitized": false,
      "disabled": null,
      "approved": null,
      "locale": null,
      "invite_request": null,
      "ips": null,
      "account": {
        "id": "123454321",
        "username": "cheeseperson",
        "acct": "cheeseperson@someothermastodonsite.com",
        "display_name": "cheeseperson",
        "locked": false,
        "bot": false,
        "discoverable": false,
        "group": false,
        "created_at": "2023-08-20T00:00:00.000Z",
        "note": "",
        "url": "https://someothermastodonsite.com/@cheeseperson",
        "uri": "https://someothermastodonsite.com/users/cheeseperson",
        "avatar": "https://someothermastadonsite.com/avatars/original/missing.png",
        "avatar_static": "https://someothermastadonsite.com/avatars/original/missing.png",
        "header": "locationofheader.com/image.jpg",
        "header_static": "locationofheader.com/image.jpg",
        "followers_count": 2,
        "following_count": 2,
        "statuses_count": 95,
        "last_status_at": "2023-10-26",
        "emojis": [],
        "fields": []
      },
      "role": null
    },
    "assigned_account": null,
    "action_taken_by_account": null,
    "statuses": [
      {
        "id": "12345678987654321",
        "created_at": "2023-10-26T11:29:13.000Z",
        "in_reply_to_id": "1918282746465",
        "in_reply_to_account_id": "101010101010",
        "sensitive": false,
        "spoiler_text": "",
        "visibility": "public",
        "language": "de",
        "uri": "https://someothermastodonsite.com/users/cheeseperson/statuses/111301083360371621",
        "url": "https://someothermastodonsite.com/@cheeseperson/111301083360371621",
        "replies_count": 0,
        "reblogs_count": 0,
        "favourites_count": 0,
        "edited_at": "2023-10-26T11:30:31.000Z",
        "content": "<p>Here is some content</p>",
        "reblog": null,
        "account": {
          "id": "123454321",
          "username": "cheeseperson",
          "acct": "cheeseperson@someothermastodonsite.com",
          "display_name": "cheeseperson",
          "locked": false,
          "bot": false,
          "discoverable": false,
          "group": false,
          "created_at": "2023-08-20T00:00:00.000Z",
          "note": "",
          "url": "https://someothermastodonsite.com/@cheeseperson",
          "uri": "https://someothermastodonsite.com/users/cheeseperson",
          "avatar": "https://someothermastadonsite.com/avatars/original/missing.png",
          "avatar_static": "https://someothermastadonsite.com/avatars/original/missing.png",
          "header": "locationofheader.com/image.jpg",
          "header_static": "locationofheader.com/image.jpg",
          "followers_count": 2,
          "following_count": 2,
          "statuses_count": 95,
          "last_status_at": "2023-10-26",
          "emojis": [],
          "fields": []
        },
        "media_attachments": [],
        "mentions": [
          {
            "id": "101010101010",
            "username": "thirdperson",
            "url": "https://thirdpersonsinstance.com/@thirdperson",
            "acct": "thirdperson@emailwebsite.com"
          }
        ],
        "tags": [],
        "emojis": [],
        "card": null,
        "poll": null
      }
    ],
    "rules": [
      {
        "id": "2",
        "text": "Don't be a meanie!"
      }
    ]
  }
}
```

### Custom templates

Instead of the default JSON, custom templates can be used to generate webhook
payloads. The templates can access the values from the default payload by using
a double-braces interpolation syntax. For example, a simple custom template
might look like:

```json
{ "content": "Hello {{object.username}}" }
```

In this example, the `{{object.username}}` would be replaced via interpolation
with the corresponding value from the original event payload.

[WebSub spec]: https://www.w3.org/TR/websub/
