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

{{< hint style="danger" >}}
This page is under construction.
{{< /hint >}}

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

limit
: Integer. Maximum number of results to return. Defaults to 100.

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

---

## Test {#test}

```http
POST /api/v1/admin/canonical_email_blocks/test HTTP/1.1
```

**Returns:** [Admin::CanonicalEmailBlock]({{< relref "entities/Admin_CanonicalEmailBlock" >}})\
**OAuth:** User token + `admin:read:canonical_email_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

parameter
: TODO:

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
: TODO:

canonical_email_hash
: TODO:

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

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/canonical_email_blocks_controller.rb" caption="app/controllers/api/v1/admin/canonical_email_blocks_controller.rb" >}}