---
title: admin/domain_blocks API methods
description: Disallow certain domains to federate.
menu:
  docs:
    name: domain_blocks
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

## List all blocked domains {#get}

```http
GET /api/v1/admin/domain_blocks HTTP/1.1
```

Show information about all blocked domains.

**Returns:** Array of [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:read:domain_blocks`\
**Permissions:** Manage Federation\
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
    "domain": "example.com",
    "created_at": "2022-11-16T08:15:34.238Z",
    "severity": "noop",
    "reject_media": false,
    "reject_reports": false,
    "private_comment": null,
    "public_comment": null,
    "obfuscate": false
  },
  // ...
]
```

Because DomainBlock IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <http://mastodon.example/api/v1/admin/domain_blocks?limit=2&max_id=2>; rel="next", <http://mastodon.example/api/v1/admin/domain_blocks?limit=2&since_id=1>; rel="prev"
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
GET /api/v1/admin/domain_blocks/:id HTTP/1.1
```
Show information about a single blocked domain.

**Returns:** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:read:domain_blocks`\
**Permissions:** Manage Federation\
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

```json
{
  "id": "1",
  "domain": "example.com",
  "created_at": "2022-11-16T08:15:34.238Z",
  "severity": "noop",
  "reject_media": false,
  "reject_reports": false,
  "private_comment": null,
  "public_comment": null,
  "obfuscate": false
}
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
POST /api/v1/admin/domain_blocks HTTP/1.1
```

Add a domain to the list of domains blocked from federating.

**Returns:** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:write:domain_blocks`\
**Permissions:** Manage Federation\
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
: String. Whether to apply a `silence`, `suspend`, or `noop` to the domain. Defaults to `silence`

reject_media
: Boolean. Whether media attachments should be rejected. Defaults to false

reject_reports
: Boolean. Whether reports from this domain should be rejected. Defaults to false

private_comment
: String. A private note about this domain block, visible only to admins.

public_comment
: String. A public note about this domain block, optionally shown on the about page.

obfuscate
: Boolean. Whether to partially censor the domain when shown in public. Defaults to false

#### Response
##### 200: OK

Domain has been blocked from federating.

```json
{
  "id": "1",
  "domain": "example.com",
  "created_at": "2022-11-16T08:15:34.238Z",
  "severity": "noop",
  "reject_media": false,
  "reject_reports": false,
  "private_comment": null,
  "public_comment": null,
  "obfuscate": false
}
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

---

## Update a domain block {#update}

```http
PUT /api/v1/admin/domain_blocks/:id HTTP/1.1
```

Change parameters for an existing domain block.

**Returns:** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:write:domain_blocks`\
**Permissions:** Manage Federation\
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
: String. Whether to apply a `silence`, `suspend`, or `noop` to the domain. Defaults to `silence`

reject_media
: Boolean. Whether media attachments should be rejected. Defaults to false

reject_reports
: Boolean. Whether reports from this domain should be rejected. Defaults to false

private_comment
: String. A private note about this domain block, visible only to admins.

public_comment
: String. A public note about this domain block, optionally shown on the about page.

obfuscate
: Boolean. Whether to partially censor the domain when shown in public. Defaults to false

#### Response
##### 200: OK

Domain block has been updated

```json
{
  "id": "1",
  "domain": "example.com",
  "created_at": "2022-11-16T08:15:34.238Z",
  "severity": "noop",
  "reject_media": false,
  "reject_reports": false,
  "private_comment": null,
  "public_comment": null,
  "obfuscate": false
}
```

##### 403: Forbidden

Authorized user is not allowed to perform this action, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

##### 500: Server error
<!-- TODO: remove when https://github.com/mastodon/mastodon/issues/21775 is fixed -->
Invalid severity

---

## Remove a domain block {#delete}

```http
DELETE /api/v1/admin/domain_blocks/:id HTTP/1.1
```

Lift a block against a domain.

**Returns:** [Admin::DomainBlock]({{< relref "entities/Admin_DomainBlock" >}})\
**OAuth:** User token + `admin:write:domain_blocks`\
**Permissions:** Manage Federation\
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

```json
{}
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