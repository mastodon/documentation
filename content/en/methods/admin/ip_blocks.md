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

{{< hint style="danger" >}}
This page is under construction.
{{< /hint >}}

## List all IP blocks {#get}

```http
GET https://mastodon.example/api/v1/admin/ip_blocks HTTP/1.1
```

Show information about all blocked domains.

**Returns:** Array of [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:read:ip_blocks`\
**Permissions:** Manage Blocks\ <!-- TODO: verify -->
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

## Get a single IP block {#get-one}

```http
GET https://mastodon.example/api/v1/admin/ip_blocks/:id HTTP/1.1
```
Show information about a single IP block.

**Returns:** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:read:ip_blocks`\
**Permissions:** Manage Blocks\ <!-- TODO: verify -->
**Version history:**\
4.0.0 - added

##### Path parameters

:id
: {{<required>}} String. The ID of the IpBlock in the database.

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

IpBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## Block an IP address range from signing up {#create}

```http
POST https://mastodon.example/api/v1/admin/ip_blocks HTTP/1.1
```

Add an IP address range to the list of IP blocks.

**Returns:** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:write:ip_blocks`\
**Permissions:** Manage Blocks\ <!-- TODO: verify -->
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

ip
: TODO:

severity
: TODO:

comment
: TODO:

expires_in
: TODO:

#### Response
##### 200: OK

IP has been blocked from signups.

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

The ip parameter was not provided

<!-- TODO: sample response -->

```json

```

---

## Update a domain block {#update}

```http
PUT https://mastodon.example/api/v1/admin/ip_blocks/:id HTTP/1.1
```

Change parameters for an existing IP block.

**Returns:** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:write:ip_blocks`\
**Permissions:** Manage Blocks\ <!-- TODO: verify -->
**Version history:**\
4.0.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the IpBlock in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

ip
: TODO:

severity
: TODO:

comment
: TODO:

expires_in
: TODO:

---

## Delete an IP block {#delete}

```http
DELETE https://mastodon.example/api/v1/admin/ip_blocks/:id HTTP/1.1
```

Lift a block against an IP range.

**Returns:** [Admin::IpBlock]({{< relref "entities/Admin_IpBlock" >}})\
**OAuth:** User token + `admin:write:domain_blocks`\
**Permissions:** Manage Blocks\ <!-- TODO: verify -->
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

The IP has been removed from the block list

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

IpBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/ip_blocks_controller.rb" caption="app/controllers/api/v1/admin/ip_blocks_controller.rb" >}}