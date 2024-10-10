---
title: ip_blocks API methods
description: Disallow certain IP address ranges from signing up.
menu:
  docs:
    name: ip_blocks
    parent: methods-admin
    identifier: methods-admin-ip_blocks
aliases: [
	"/methods/admin/domain_blocks",
	"/api/methods/admin/domain_blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## List all IP blocks {#get}

```http
GET /api/v1/admin/ip_blocks HTTP/1.1
```

Show information about all blocked IP ranges.

**Returns:** Array of [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:read:ip_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

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
    "ip": "8.8.8.8/32",
    "severity": "no_access",
    "comment": "",
    "created_at": "2022-11-16T07:22:00.501Z",
    "expires_at": null
  },
  // ...
]
```

Because IpBlock IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <http://mastodon.example/api/v1/admin/ip_blocks?limit=2&max_id=2>; rel="next", <http://mastodon.example/api/v1/admin/ip_blocks?limit=2&since_id=1>; rel="prev"
```

##### 403: Forbidden

Authorized user is not allowed to perform this action, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

---

## Get a single IP block {#get-one}

```http
GET /api/v1/admin/ip_blocks/:id HTTP/1.1
```

Show information about a single IP block.

**Returns:** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:read:ip_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

##### Path parameters

:id
: {{<required>}} String. The ID of the IpBlock in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "id": "1",
  "ip": "8.8.8.8/32",
  "severity": "no_access",
  "comment": "",
  "created_at": "2022-11-16T07:22:00.501Z",
  "expires_at": null
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

IpBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## Block an IP address range from signing up {#create}

```http
POST /api/v1/admin/ip_blocks HTTP/1.1
```

Add an IP address range to the list of IP blocks.

**Returns:** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:write:ip_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Form data parameters

ip
: String. The IP address and prefix to block. Defaults to `0.0.0.0/32`

severity
: {{<required>}} String. The policy to apply to this IP range: `sign_up_requires_approval`, `sign_up_block`, or `no_access`

comment
: String. The reason for this IP block.

expires_in
: Integer. The number of seconds in which this IP block will expire.

#### Response
##### 200: OK

IP has been blocked from signups.

```json
{
  "id": "1",
  "ip": "8.8.8.8/32",
  "severity": "no_access",
  "comment": "",
  "created_at": "2022-11-16T07:22:00.501Z",
  "expires_at": null
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

IP has already been blocked, and/or no severity was provided

```json
{
  "error": "Validation failed: Severity can't be blank, Ip has already been taken"
}
```

---

## Update a domain block {#update}

```http
PUT /api/v1/admin/ip_blocks/:id HTTP/1.1
```

Change parameters for an existing IP block.

**Returns:** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:write:ip_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the IpBlock in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Form data parameters

ip
: String. The IP address and prefix to block. Defaults to `0.0.0.0/32`

severity
: String. The policy to apply to this IP range: `sign_up_requires_approval`, `sign_up_block`, or `no_access`

comment
: String. The reason for this IP block.

expires_in
: Integer. The number of seconds in which this IP block will expire.

#### Response
##### 200: OK

IP block has been updated

```json
{
  "id": "1",
  "ip": "8.8.4.4/32",
  "severity": "no_access",
  "comment": "",
  "created_at": "2022-11-16T07:22:00.501Z",
  "expires_at": null
}
```

##### 403: Forbidden

Authorized user is not allowed to perform this action, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

---

## Delete an IP block {#delete}

```http
DELETE /api/v1/admin/ip_blocks/:id HTTP/1.1
```

Lift a block against an IP range.

**Returns:** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:write:domain_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the DomainAllow in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The IP has been removed from the block list

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

IpBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/ip_blocks_controller.rb" caption="app/controllers/api/v1/admin/ip_blocks_controller.rb" >}}