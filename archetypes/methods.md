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
**Version history:**\

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the SOMETHING in the database.

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

min_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: String. Maximum number of results to return. Defaults to 40.

##### Form data parameters

#### Response
##### 200: Success

```javascript
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

SOMETHING is not owned by you or does not exist

```javascript
{"error":"Record not found"}
```

##### 410: Gone

##### 422: Unprocessable entity

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/SOMETHING_controller.rb" caption="app/controllers/api/v1/SOMETHING_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/SOMETHING" caption="app/controllers/api/v1/SOMETHING/" >}}

{{< page-relref ref="methods/SOMETHING#anchor" caption="POST /api/v1/something/" >}}