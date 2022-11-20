---
title: admin/trends API methods
description: TODO
menu:
  docs:
    name: admin/trends
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

{{< hint style="danger" >}}
This page is under construction.
{{< /hint >}}

## View trending links {#links}

```http
GET https://mastodon.example/api/v1/admin/trends/links HTTP/1.1
```

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

<!-- TODO: -->
```json
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
GET https://mastodon.example/api/v1/admin/trends/statuses HTTP/1.1
```

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

<!-- TODO: -->
```json
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
GET https://mastodon.example/api/v1/admin/trends/tags HTTP/1.1
```

**Returns:** Array of [Tag]({{< relref "entities/Tag" >}})\
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

<!-- TODO: -->
```json
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