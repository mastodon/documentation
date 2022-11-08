---
title: admin/email_domain_blocks API methods
description: Disallow certain email domains from signing up.
menu:
  docs:
    name: admin/email_domain_blocks
    parent: methods-admin
    identifier: methods-admin-email_domain_blocks
aliases: [
	"/methods/admin/email_domain_blocks",
	"/api/methods/admin/email_domain_blocks",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

{{< hint style="danger" >}}
This page is under construction.
{{< /hint >}}

## List all blocked email domains {#get}

```http
GET https://mastodon.example/api/v1/admin/email_domain_blocks HTTP/1.1
```

Show information about all blocked email domains.

**Returns:** Array of [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth:** User token + `admin:read:email_domain_blocks`\
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

## Get a single blocked domain {#get-one}

```http
GET https://mastodon.example/api/v1/admin/email_domain_blocks/:id HTTP/1.1
```
Show information about a single blocked domain.

**Returns:** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth:** User token + `admin:read:email_domain_blocks`\
**Permissions:** Manage Blocks\ <!-- TODO: verify -->
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

EmailDomainBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## Block an email domain from signups {#create}

```http
POST https://mastodon.example/api/v1/admin/email_domain_blocks HTTP/1.1
```

Add a domain to the list of email domains blocked from signups.

**Returns:** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth:** User token + `admin:write:email_domain_blocks`\
**Permissions:** Manage Blocks\ <!-- TODO: verify -->
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

domain
: {{<required>}} String. The domain to block federation with.

#### Response
##### 200: OK

Email domain has been blocked from signups.

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

## Delete an email domain block {#delete}

```http
DELETE https://mastodon.example/api/v1/admin/email_domain_allows/:id HTTP/1.1
```

Lift a block against an email domain.

**Returns:** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth:** User token + `admin:write:email_domain_blocks`\
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

The email domain has been removed from the block list

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

EmailDomainBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/email_domain_blocks_controller.rb" caption="app/controllers/api/v1/admin/email_domain_blocks_controller.rb" >}}