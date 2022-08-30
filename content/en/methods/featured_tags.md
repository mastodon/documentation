---
title: featured_tags
description: Feature tags that you use frequently.
menu:
  docs:
    weight: 100
    parent: methods-accounts
aliases: [/methods/accounts/featured_tags/]
---

## View your featured tags {#get}

```http
GET https://mastodon.example/api/v1/featured_tags HTTP/1.1
```

**Returns:** Array of [FeaturedTag]({{< relref "entities/featuredtag" >}})\
**OAuth:** User token + `read:accounts`\
**Version history:**\
3.0.0 - added

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: Success

```javascript
[
  {
    "id": "627",
    "name": "nowplaying",
    "statuses_count": 36,
    "last_status_at": "2019-11-15T07:14:43.524Z"
  }
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## Feature a tag {#feature}

```http
POST https://mastodon.example/api/v1/featured_tags HTTP/1.1
```

**Returns:** [FeaturedTag]({{< relref "entities/featuredtag" >}})\
**OAuth:** User token + `write:accounts`\
**Version history:**\
3.0.0 - added

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

name
: {{<required>}} String. The hashtag to be featured, without the hash sign.

#### Response
##### 200: Success

A FeaturedTag will be created with the specified `name`.

```javascript
{
  "id": "13174",
  "name": "circasurvive",
  "statuses_count": 11,
  "last_status_at": "2019-11-15T06:20:32.769Z"
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

If `name` is not a valid hashtag, e.g. contains illegal characters or only numbers

```javascript
{
  "error": "Validation failed: Tag is invalid"
}
```

---

## Unfeature a tag {unfeature}

```http
DELETE https://mastodon.example/api/v1/featured_tags/:id HTTP/1.1
```

**Returns:** empty object\
**OAuth:** User token + `write:accounts`\
**Version history:**\
3.0.0 - added



---


{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/featured_tags/:id" title="Unfeature a tag" >}}
{{< api-method-description >}}

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the FeaturedTag to be unfeatured.

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: Success

An empty object will be returned if the featured tag was successfully deleted.

```javascript
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

If the ID does not exist or is not owned by you

```javascript
{
  "error": "Record not found"
}
```

---

## View suggested tags to feature {#suggestions}

```http
GET https://mastodon.example/api/v1/featured_tags/suggestions HTTP/1.1
```

Shows your 10 most-used tags, with usage history for the past week.

**Returns:** Array of [Tag]({{< relref "entities/tag" >}}) with [History]({{< relref "entities/history" >}})\
**OAuth:** User token + `read:accounts`\
**Version history:**\
3.0.0 - added

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: Success

Truncated results to first and last tag.

```javascript
[
  {
    "name": "nowplaying",
    "url": "https://mastodon.social/tags/nowplaying",
    "history": [
      {
        "day": "1574553600",
        "uses": "200",
        "accounts": "31"
      },
      {
        "day": "1574467200",
        "uses": "272",
        "accounts": "39"
      },
      {
        "day": "1574380800",
        "uses": "345",
        "accounts": "40"
      },
      {
        "day": "1574294400",
        "uses": "366",
        "accounts": "46"
      },
      {
        "day": "1574208000",
        "uses": "226",
        "accounts": "32"
      },
      {
        "day": "1574121600",
        "uses": "217",
        "accounts": "42"
      },
      {
        "day": "1574035200",
        "uses": "214",
        "accounts": "34"
      }
    ]
  },
  ...
  {
    "name": "mastothemes",
    "url": "https://mastodon.social/tags/mastothemes",
    "history": [
      {
        "day": "1574553600",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574467200",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574380800",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574294400",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574208000",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574121600",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574035200",
        "uses": "0",
        "accounts": "0"
      }
    ]
  }
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/featured_tags_controller.rb" caption="app/controllers/api/v1/featured_tags_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/featured_tags" caption="app/controllers/api/v1/featured_tags/" >}}