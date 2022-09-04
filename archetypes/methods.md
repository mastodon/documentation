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

```javascript
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

##### 404: Not found

SOMETHING is not owned by you or does not exist

```javascript
{
  "error": "Record not found"
}
```

##### 410: Gone

##### 422: Unprocessable entity

##### 503: Service unavailable

```javascript
{
  "error": "There was a temporary problem serving your request, please try again"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/SOMETHING_controller.rb" caption="app/controllers/api/v1/SOMETHING_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/SOMETHING" caption="app/controllers/api/v1/SOMETHING/" >}}

{{< page-relref ref="methods/SOMETHING#anchor" caption="POST /api/v1/something/" >}}