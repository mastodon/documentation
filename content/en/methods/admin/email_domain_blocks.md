---
title: email_domain_blocks API methods
description: Disallow certain email domains from signing up.
menu:
  docs:
    name: email_domain_blocks
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

## List all blocked email domains {#get}

```http
GET /api/v1/admin/email_domain_blocks HTTP/1.1
```

Show information about all email domains blocked from signing up.

**Returns:** Array of [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth:** User token + `admin:read:email_domain_blocks`\
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
    "domain": "foo",
    "created_at": "2022-11-16T06:09:36.176Z",
    "history": [
      {
        "day": "1668556800",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668470400",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668384000",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668297600",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668211200",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668124800",
        "accounts": "0",
        "uses": "0"
      },
      {
        "day": "1668038400",
        "accounts": "0",
        "uses": "0"
      }
    ]
  },
  // ...
]
```

##### 403: Forbidden

Authorized user is not allowed to perform this action, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

---

## Get a single blocked email domain {#get-one}

```http
GET /api/v1/admin/email_domain_blocks/:id HTTP/1.1
```
Show information about a single email domain that is blocked from signups.

**Returns:** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth:** User token + `admin:read:email_domain_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.1.0 - added

##### Path parameters

:id
: {{<required>}} String. The ID of the DomainBlock in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "id": "1",
  "domain": "foo",
  "created_at": "2022-11-16T06:09:36.176Z",
  "history": [
    {
      "day": "1668556800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668470400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668384000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668297600",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668211200",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668124800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668038400",
      "accounts": "0",
      "uses": "0"
    }
  ]
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

EmailDomainBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## Block an email domain from signups {#create}

```http
POST /api/v1/admin/email_domain_blocks HTTP/1.1
```

Add a domain to the list of email domains blocked from signups.

**Returns:** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth:** User token + `admin:write:email_domain_blocks`\
**Permissions:** Manage Blocks\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Form data parameters

domain
: {{<required>}} String. The domain to block federation with.

#### Response
##### 200: OK

Email domain has been blocked from signups.

```json
{
  "id": "1",
  "domain": "foo",
  "created_at": "2022-11-16T06:09:36.176Z",
  "history": [
    {
      "day": "1668556800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668470400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668384000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668297600",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668211200",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668124800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1668038400",
      "accounts": "0",
      "uses": "0"
    }
  ]
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

Alternatively, the domain provided contains an invalid character

```json
{
  "error": "Validation failed: Domain is invalid, Domain is not a valid domain name"
}
```

---

## Delete an email domain block {#delete}

```http
DELETE /api/v1/admin/email_domain_blocks/:id HTTP/1.1
```

Lift a block against an email domain.

**Returns:** [Admin::EmailDomainBlock]({{< relref "entities/Admin_EmailDomainBlock" >}})\
**OAuth:** User token + `admin:write:email_domain_blocks`\
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

The email domain has been removed from the block list

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

EmailDomainBlock with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/email_domain_blocks_controller.rb" caption="app/controllers/api/v1/admin/email_domain_blocks_controller.rb" >}}