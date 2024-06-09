---
title: tags API methods
description: View information about or follow/unfollow hashtags.
menu:
  docs:
    weight: 120
    name: tags
    parent: methods-accounts
    identifier: methods-tags
aliases: [
  "/methods/tags",
  "/api/methods/tags",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View information about a single tag {#get}

```http
GET /api/v1/tags/:id HTTP/1.1
```

Show a hashtag and its associated information

**Returns:** [Tag]({{< relref "entities/Tag" >}})\
**OAuth:** Public, or User token\
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The name of the hashtag.

##### Headers

Authorization
: Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "name": "Test",
  "url": "http://mastodon.example/tags/test",
  "history": [
    {
      "day": "1668556800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668470400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668384000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668297600",
      "accounts": "1",
      "uses": "1"
    },
    {
      "day": "1668211200",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668124800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668038400",
      "accounts": "0",
      "uses": "0"
    }
  ],
  "following": false
}
```

---

## Follow a hashtag {#follow}

```http
POST /api/v1/tags/:id/follow HTTP/1.1
```

Follow a hashtag. Posts containing a followed hashtag will be inserted into your home timeline.

**Returns:** [Tag]({{< relref "entities/Tag" >}})\
**OAuth:** User token + `write:follows`\
**Version history:**\
4.0.0 - added\
4.1.0 - this action is now idempotent

#### Request

##### Path parameters

:id
: {{<required>}} String. The name of the hashtag.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Tag has been successfully followed

```json
{
  "name": "Test",
  "url": "http://mastodon.example/tags/test",
  "history": [
    {
      "day": "1668556800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668470400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668384000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668297600",
      "accounts": "1",
      "uses": "1"
    },
    {
      "day": "1668211200",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668124800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668038400",
      "accounts": "0",
      "uses": "0"
    }
  ],
  "following": true
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Prior to 4.1.0: Tag was already followed

```json
{
  "error": "Duplicate record"
}
```

---

## Unfollow a hashtag {#unfollow}

```http
POST /api/v1/tags/:id/unfollow HTTP/1.1
```

Unfollow a hashtag. Posts containing this hashtag will no longer be inserted into your home timeline.

**Returns:** [Tag]({{< relref "entities/Tag" >}})\
**OAuth:** User token + `write:follows`\
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The name of the hashtag.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Tag has been successfully unfollowed, or was already unfollowed

```json
{
  "name": "Test",
  "url": "http://mastodon.example/tags/test",
  "history": [
    {
      "day": "1668556800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668470400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668384000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668297600",
      "accounts": "1",
      "uses": "1"
    },
    {
      "day": "1668211200",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668124800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668038400",
      "accounts": "0",
      "uses": "0"
    }
  ],
  "following": false
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< page-relref ref="methods/followed_tags#get" caption="GET /api/v1/followed_tags" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/tags_controller.rb" caption="app/controllers/api/v1/tags_controller.rb" >}}

