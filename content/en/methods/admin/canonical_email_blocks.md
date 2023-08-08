---
title: canonical_email_blocks API methods
description: Block certain email addresses by their hash.
menu:
  docs:
    name: canonical_email_blocks
    parent: methods-admin
    identifier: methods-admin-canonical_email_blocks
aliases: [
  "/methods/admin/canonical_email_blocks",
  "/api/methods/admin/canonical_email_blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## List all canonical email blocks {#get}

```http
GET /api/v1/admin/canonical_email_blocks HTTP/1.1
```

**Returns:** Array of [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth:** User token + `admin:read:canonical_email_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

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
: Integer. Maximum number of results to return. Defaults to 100 blocks. Max 200 blocks.

#### Response
##### 200: OK

```json
[
  {
    "id": "1",
    "canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
  },
  // ...
]
```

Because CanonicalEmailBlock IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <http://mastodon.example/api/v1/admin/canonical_email_blocks?limit=2&max_id=2>; rel="next", <http://mastodon.example/api/v1/admin/canonical_email_blocks?limit=2&since_id=1>; rel="prev"
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

---

## Show a single canonical email block {#get-one}

```http
GET /api/v1/admin/canonical_email_blocks/:id HTTP/1.1
```

**Returns:** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth:** User token + `admin:read:canonical_email_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Admin::CanonicalEmailBlock in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "id": "1",
  "canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
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

Canonical email block does not exist or was already deleted

```json
{
  "error": "Record not found"
}
```

---

## Test {#test}

```http
POST /api/v1/admin/canonical_email_blocks/test HTTP/1.1
```

Canoniocalize and hash an email address.

**Returns:** Array of [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth:** User token + `admin:read:canonical_email_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

email
: {{<required>}} String. The email to canonicalize and hash.

#### Response
##### 200: OK

All matching canonical email blocks are returned.

```json
[
  {
    "id": "1",
    "canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
  }
]
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

##### 500: Server error
<!-- TODO: remove when https://github.com/mastodon/mastodon/issues/21774 is fixed -->
No email was provided

---

## Block a canonical email {#create}

```http
POST /api/v1/admin/canonical_email_blocks HTTP/1.1
```

**Returns:** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth:** User token + `admin:write:canonical_email_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

email
: {{<required>}} String. The email to canonicalize, hash, and block. If this parameter is provided, `canonical_email_hash` will be ignored.

canonical_email_hash
: String. The hash to test against. If `email` is not provided, this parameter is required.

#### Response
##### 200: OK

Canonical email has been successfully blocked

```json
{
  "id": "1",
  "canonical_email_hash": "b344e55d11b3fc25d0d53194e0475838bf17e9be67ce3e6469956222d9a34f9c"
}
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

Canonical email hash is already blocked

```json
{
  "error":"Validation failed: Canonical email hash has already been taken"
}
```

---

## Delete a canonical email block {#delete}

```http
DELETE /api/v1/admin/canonical_email_blocks/:id HTTP/1.1
```

**Returns:** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth:** User token + `admin:write:canonical_email_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Admin::CanonicalEmailBlock in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Canonical email block successfully deleted.

```json
{}
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

Canonical email block does not exist or was already deleted

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/canonical_email_blocks_controller.rb" caption="app/controllers/api/v1/admin/canonical_email_blocks_controller.rb" >}}