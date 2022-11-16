---
title: domain_allows API methods
description: Allow certain domains to federate.
menu:
  docs:
    name: domain_allows
    parent: methods-admin
    identifier: methods-admin-domain_allows
aliases: [
	"/methods/admin/domain_allows",
	"/api/methods/admin/domain_allows",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## List all allowed domains {#get}

```http
GET https://mastodon.example/api/v1/admin/domain_allows HTTP/1.1
```

Show information about all allowed domains.

**Returns:** Array of [Admin::DomainAllow]({{< relref "entities/Admin_DomainAllow" >}})\
**OAuth:** User token + `admin:read:domain_allows`\
**Permissions:** Manage Federation\
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

```json
[
	{
		"id": "2",
		"domain": "mastodon",
		"created_at": "2022-09-14T21:24:15.360Z"
	},
	{
		"id": "1",
		"domain": "mastodon.social",
		"created_at": "2022-09-14T21:23:02.755Z"
	}
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

## Get a single allowed domain {#get-one}

```http
GET https://mastodon.example/api/v1/admin/domain_allows/:id HTTP/1.1
```
Show information about a single allowed domain.

**Returns:** [Admin::DomainAllow]({{< relref "entities/Admin_DomainAllow" >}})\
**OAuth:** User token + `admin:read:domain_allows`\
**Permissions:** Manage Federation\
**Version history:**\
4.0.0 - added

##### Path parameters

:id
: {{<required>}} String. The ID of the DomainAllow in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
	"id": "1",
	"domain": "mastodon.social",
	"created_at": "2022-09-14T21:23:02.755Z"
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

DomainAllow with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## Allow a domain to federate {#create}

```http
POST https://mastodon.example/api/v1/admin/domain_allows HTTP/1.1
```

Add a domain to the list of domains allowed to federate, to be used when the instance is in allow-list federation mode.

**Returns:** [Admin::DomainAllow]({{< relref "entities/Admin_DomainAllow" >}})\
**OAuth:** User token + `admin:write:domain_allows`\
**Permissions:** Manage Federation\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

domain
: {{<required>}} String. The domain to allow federation with.

#### Response
##### 200: OK

Domain has been allowed to federate, or was already allowed to federate

```json
{
	"id": "1",
	"domain": "mastodon.social",
	"created_at": "2022-09-14T21:23:02.755Z"
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

##### 500: Server error

The domain provided contains an invalid character

<!--
TODO: remove when fixed
https://github.com/mastodon/mastodon/issues/19175
-->

---

## Delete an allowed domain {#delete}

```http
DELETE https://mastodon.example/api/v1/admin/domain_allows/:id HTTP/1.1
```

Delete a domain from the allowed domains list.

**Returns:** [Admin::DomainAllow]({{< relref "entities/Admin_DomainAllow" >}})\
**OAuth:** User token + `admin:write:domain_allows`\
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

The allowed domain has been removed from the allow list

```json
{
	"id": "4",
	"domain": "*",
	"created_at": "2022-09-14T21:32:44.945Z"
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

DomainAllow with the given ID does not exist

```json
{
	"error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/domain_allows_controller.rb" caption="app/controllers/api/v1/admin/domain_allows_controller.rb" >}}