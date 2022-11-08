---
title: "{{ replace .Name "-" " " | title }}"
description: 
menu:
  docs:
    parent: methods
---

## What the method does {#anchor}

```http
GET https://mastodon.example/api/v1/example HTTP/1.1
```

**Returns:** [SOMETHING]({{< relref "entities/SOMETHING" >}})\
**OAuth:** User token + `oauth:scope`\
**Permissions:** Manage ???\
**Version history:**\
x.x.x - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the SOMETHING in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

**Internal parameter.** Use HTTP `Link` header for pagination.

max_id 
: String. Return results older than ID.

since_id
: String. Return results newer than ID.

min_id
: String. Return results immediately newer than ID.

limit
: Integer. Maximum number of results to return. Defaults to 20. Max 40.

##### Form data parameters

#### Response
##### 200: OK

```json
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

SOMETHING is not owned by you or does not exist

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

##### 422: Unprocessable entity

##### 429: Rate limited

```json
{
  "error": "Too many requests"
}
```

##### 503: Service unavailable

```json
{
  "error": "There was a temporary problem serving your request, please try again"
}
```

---

## See also

{{< page-relref ref="methods/SOMETHING#anchor" caption="POST /api/v1/something/" >}}

{{< page-ref page="client/authorized" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/SOMETHING_controller.rb" caption="app/controllers/api/v1/SOMETHING_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/SOMETHING" caption="app/controllers/api/v1/SOMETHING/" >}}