---
title: admin/trends API methods
description: TODO
menu:
  docs:
    name: trends
    parent: methods-admin
    identifier: methods-admin-trends
aliases: [
  "/methods/admin/measures",
  "/api/methods/admin/measures",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View trending links {#links}

```http
GET /api/v1/admin/trends/links HTTP/1.1
```

Links that have been shared more than others, including unapproved and unreviewed links.

**Returns:** Array of [Trends::Link]({{< relref "entities/PreviewCard#trends-link" >}})\
**OAuth:** User token + `admin:read`\
**Permissions:** Manage Taxonomies\
**Version history:**\
3.5.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
[
  {
    "url": "https://twitter.com/arufa_faru/status/1594262272007753728",
    "title": "ARuFa on Twitter",
    "description": "“言葉をマネするぬいぐるみを改造してエレキギターを直接繋いでみました”",
    "type": "link",
    "author_name": "",
    "author_url": "",
    "provider_name": "Twitter",
    "provider_url": "",
    "html": "",
    "width": 400,
    "height": 225,
    "image": "https://media.chitter.xyz/cache/preview_cards/images/002/162/720/original/b5360261e8ce17fc.jpeg",
    "embed_url": "",
    "blurhash": "UNFiDM~o-oD%x[xtaxM|xaNHRkjsoft7ofWB",
    "history": [
      {
        "day": "1669507200",
        "accounts": "9",
        "uses": "9"
      },
      {
        "day": "1669420800",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1669334400",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1669248000",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1669161600",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1669075200",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668988800",
        "accounts": "0",
        "uses": "0"
      }
    ]
  },
  // ...
]
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

## View trending statuses {#statuses}

```http
GET /api/v1/admin/trends/statuses HTTP/1.1
```

Statuses that have been interacted with more than others, including unapproved and unreviewed statuses.

**Returns:** Array of [Status]({{< relref "entities/Status" >}})\
**OAuth:** User token + `admin:read`\
**Permissions:** Manage Taxonomies\
**Version history:**\
3.5.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
[
  {
    "id": "109415512969053017",
    "created_at": "2022-11-27T11:23:52.000Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    // ...
    "account": {
      "id": "109332240210946752",
      // ...
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  },
  // ...
]
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

## View trending tags {#tags}

```http
GET /api/v1/admin/trends/tags HTTP/1.1
```

Tags that are being used more frequently within the past week, including unapproved and unreviewed tags.

**Returns:** Array of [Admin::Tag]({{< relref "entities/Tag#admin" >}})\
**OAuth:** User token + `admin:read`\
**Permissions:** Manage Taxonomies\
**Version history:**\
3.5.0 - added\
4.0.0 - Returns an array of Tag due to a bug\
4.1.0 - Bug fixed <!-- TODO: https://github.com/mastodon/mastodon/pull/18943 -->

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
[
  {
    "name": "caturday",
    "url": "https://mastodon.example/tags/caturday",
    "history": [
      {
        "day": "1669507200",
        "accounts": "53",
        "uses": "56"
      },
      {
        "day": "1669420800",
        "accounts": "142",
        "uses": "171"
      },
      {
        "day": "1669334400",
        "accounts": "11",
        "uses": "11"
      },
      {
        "day": "1669248000",
        "accounts": "8",
        "uses": "9"
      },
      {
        "day": "1669161600",
        "accounts": "8",
        "uses": "20"
      },
      {
        "day": "1669075200",
        "accounts": "11",
        "uses": "11"
      },
      {
        "day": "1668988800",
        "accounts": "17",
        "uses": "22"
      }
    ],
    "id": "802",
    "trendable": true,
    "usable": true,
    "requires_review": false
  },
]
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/trends/links_controller.rb" caption="app/controllers/api/v1/admin/trends/links_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/trends/statuses_controller.rb" caption="app/controllers/api/v1/admin/trends/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/trends/tags_controller.rb" caption="app/controllers/api/v1/admin/trends/tags_controller.rb" >}}