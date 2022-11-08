---
title: admin/domain_blocks API methods
description: Disallow certain domains to federate.
menu:
  docs:
    name: admin/domain_blocks
    parent: methods-admin
    identifier: methods-admin-domain_blocks
aliases: [
	"/methods/admin/domain_blocks",
	"/api/methods/admin/domain_blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

{{< hint style="danger" >}}
This page is under construction.
{{< /hint >}}

## List all blocked domains {#get}

```http
GET https://mastodon.example/api/v1/admin/domain_blocks HTTP/1.1
```

Show information about all blocked domains.

**Returns:** Array of [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:read:domain_blocks`\
**Permissions:** Manage Federation\ <!-- TODO: verify -->
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

<!-- TODO: sample response -->

```json

```

##### 403: Forbidden

Authorized user is not allowed to perform this action, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

---

## Get a single blocked domain {#get-one}

```http
GET https://mastodon.example/api/v1/admin/domain_blocks/:id HTTP/1.1
```
Show information about a single blocked domain.

**Returns:** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:read:domain_blocks`\
**Permissions:** Manage Federation\ <!-- TODO: verify -->
**Version history:**\
4.0.0 - added

##### Path parameters

:id
: {{<required>}} String. The ID of the DomainBlock in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

<!-- TODO: sample response -->

```json

```

##### 403: Forbidden

Authorized user is not allowed to perform this action, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

DomainBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## Block a domain from federating {#create}

```http
POST https://mastodon.example/api/v1/admin/domain_blocks HTTP/1.1
```

Add a domain to the list of domains blocked from federating.

**Returns:** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:write:domain_blocks`\
**Permissions:** Manage Federation\ <!-- TODO: verify -->
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

domain
: {{<required>}} String. The domain to block federation with.

severity
: TODO:

reject_media
: TODO:

reject_reports
: TODO:

private_comment
: TODO:

public_comment
: TODO:

obfuscate
: TODO:

#### Response
##### 200: OK

Domain has been blocked from federating.

<!-- TODO: sample response -->

```json

```

##### 403: Forbidden

Authorized user is not allowed to perform this action, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

The domain parameter was not provided

```json
{
	"error": "Validation failed: Domain can't be blank"
}
```

##### 500: Server error

The domain provided contains an invalid character

<!--
TODO: remove when fixed
https://github.com/mastodon/mastodon/issues/19175
-->

---

## Update a domain block {#update}

```http
PUT https://mastodon.example/api/v1/admin/domain_blocks/:id HTTP/1.1
```

Change parameters for an existing domain block.

**Returns:** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:write:domain_blocks`\
**Permissions:** Manage Federation\ <!-- TODO: verify -->
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the DomainAllow in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

severity
: TODO:

reject_media
: TODO:

reject_reports
: TODO:

private_comment
: TODO:

public_comment
: TODO:

obfuscate
: TODO:

---

## Remove a domain block {#delete}

```http
DELETE https://mastodon.example/api/v1/admin/domain_blocks/:id HTTP/1.1
```

Lift a block against a domain.

**Returns:** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:write:domain_blocks`\
**Permissions:** Manage Federation\ <!-- TODO: verify -->
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the DomainAllow in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The domain has been removed from the block list

<!-- TODO: sample response -->

```json

```
##### 403: Forbidden

Authorized user is not allowed to perform this action, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

DomainBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/domain_blocks_controller.rb" caption="app/controllers/api/v1/admin/domain_blocks_controller.rb" >}}