---
title: "{{ replace .Name "-" " " | title }}"
summary: 
menu:
  docs:
    parent: methods
aliases: [
  "/api/methods/SOMETHING",
  "/api/methods/something",
]
---

## What the method does {#anchor}

```http
GET /api/v1/example HTTP/1.1
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
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses or 40 accounts. Max twice the default limit.

##### Form data parameters

#### Response
##### 200: OK

```json
```

Because SOMETHING IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/SOMETHING?max_id=441449>; rel="next", <https://mastodon.example/api/v1/SOMETHING?since_id=444808>; rel="prev"
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