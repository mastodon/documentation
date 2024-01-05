---
title: admin/accounts API methods
description: Perform moderation actions with accounts.
menu:
  docs:
    name: accounts
    parent: methods-admin
    identifier: methods-admin-accounts
aliases: [
  "/methods/admin/accounts",
  "/api/methods/admin/accounts",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View accounts (v1) {#v1}

```http
GET /api/v1/admin/accounts HTTP/1.1
```

View all accounts, optionally matching certain criteria for filtering, up to 100 at a time. Pagination may be done with the HTTP Link header in the response. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

**Returns:** Array of [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:read:accounts`\
**Permissions:** Manage Users\
**Version history:**\
2.9.1 - added\
3.3.0 - added `sensitized`\
4.0.0 - support custom roles and permissions

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

local
: Boolean. Filter for local accounts?

remote
: Boolean. Filter for remote accounts?

active
: Boolean. Filter for currently active accounts?

pending
: Boolean. Filter for currently pending accounts?

disabled
: Boolean. Filter for currently disabled accounts?

silenced
: Boolean. Filter for currently silenced accounts?

suspended
: Boolean. Filter for currently suspended accounts?

sensitized
: Boolean. Filter for accounts force-marked as sensitive?

username
: String. Search for the given username

display_name
: String. Search for the given display name

by_domain
: String. Filter by the given domain

email
: String. Lookup a user with this email

ip
: String. Lookup users with this IP address

staff
: Boolean. Filter for staff accounts?

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 100 accounts. Max 200 accounts.

#### Response
##### 200: OK

```json
[
  {
    "id": "108267707882207829",
    "username": "trwnh",
    "domain": null,
    "created_at": "2022-05-08T18:21:56.870Z",
    "email": "trwnh@mastodon.local",
    "ip": {
      "user_id": 2,
      "ip": "192.168.42.1",
      "used_at": "2022-05-08T18:21:56.944Z"
    },
    "role": "user",
    "confirmed": false,
    "suspended": false,
    "silenced": false,
    "disabled": false,
    "approved": true,
    "locale": "en",
    "invite_request": null,
    "ips": [
      {
        "ip": "192.168.42.1",
        "used_at": "2022-05-08T18:21:56.944Z"
      }
    ],
    "account": {
      "id": "108267707882207829",
      "username": "trwnh",
      "acct": "trwnh",
      // ...
    }
  },
  {
    "id": "108267695853695427",
    "username": "admin",
    "domain": null,
    "created_at": "2022-05-08T18:18:53.221Z",
    "email": "admin@mastodon.local",
    "ip": {
      "user_id": 1,
      "ip": "192.168.42.1",
      "used_at": "2022-09-08T16:10:38.621Z"
    },
    "role": "admin",
    "confirmed": true,
    "suspended": false,
    "silenced": false,
    "disabled": false,
    "approved": true,
    "locale": null,
    "invite_request": null,
    "ips": [
      {
        "ip": "192.168.42.1",
        "used_at": "2022-09-08T16:10:38.621Z"
      }
    ],
    "account": {
      "id": "108267695853695427",
      "username": "admin",
      "acct": "admin",
      // ...
    }
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

---

## View accounts (v2) {#v2}

```http
GET /api/v2/admin/accounts HTTP/1.1
```

View all accounts, optionally matching certain criteria for filtering, up to 100 at a time. Pagination may be done with the HTTP Link header in the response. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

**Returns:** Array of [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:read:accounts`\
**Permissions:** Manage Users\
**Version history:**\
3.5.0 - added\
4.0.0 - added `role_ids`. Support custom roles and permissions

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

origin
: String. Filter for `local` or `remote` accounts.

status
: String. Filter for `active`, `pending`, `disabled`, `silenced`, or `suspended` accounts.

permissions
: String. Filter for accounts with `staff` permissions (users that can manage reports).

role_ids[]
: Array of String. Filter for users with these roles.

invited_by
: String. Lookup users invited by the account with this ID.

username
: String. Search for the given username.

display_name
: String. Search for the given display name.

by_domain
: String. Filter by the given domain.

email
: String. Lookup a user with this email.

ip
: String. Lookup users with this IP address.

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 100 accounts. Max 200 accounts.

#### Response
##### 200: OK

```json
[
  {
    "id": "108267695853695427",
    "username": "admin",
    "domain": null,
    "created_at": "2022-05-08T18:18:53.221Z",
    "email": "admin@mastodon.local",
    "ip": {
      "user_id": 1,
      "ip": "192.168.42.1",
      "used_at": "2022-09-08T16:10:38.621Z"
    },
    "role": {
		"id": 3,
		"name": "Owner",
		"color": "#3584e4",
		"position": 1000,
		"permissions": 1,
		"highlighted": true,
		"created_at": "2022-09-08T22:48:07.983Z",
		"updated_at": "2022-09-09T10:45:13.226Z"
	},
    "confirmed": true,
    "suspended": false,
    "silenced": false,
    "disabled": false,
    "approved": true,
    "locale": null,
    "invite_request": null,
    "ips": [
      {
        "ip": "192.168.42.1",
        "used_at": "2022-09-08T16:10:38.621Z"
      }
    ],
    "account": {
      "id": "108267695853695427",
      "username": "admin",
      "acct": "admin",
      // ...
    }
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

---

## View a specific account {#get-one}

```http
GET /api/v1/admin/accounts/:id HTTP/1.1
```

View admin-level information about the given account.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:read:accounts`\
**Permissions:** Manage Users\
**Version history:**\
2.9.1 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
	"id": "108267695853695427",
	"username": "admin",
	"domain": null,
	"created_at": "2022-05-08T18:18:53.221Z",
	"email": "admin@mastodon.local",
	"ip": {
		"user_id": 1,
		"ip": "192.168.42.1",
		"used_at": "2022-09-08T16:10:38.621Z"
	},
	"role": {
		"id": 3,
		"name": "Owner",
		"color": "",
		"position": 1000,
		"permissions": 1,
		"highlighted": true,
		"created_at": "2022-09-08T22:48:07.983Z",
		"updated_at": "2022-09-08T22:48:07.983Z"
	},
	"confirmed": true,
	"suspended": false,
	"silenced": false,
	"disabled": false,
	"approved": true,
	"locale": null,
	"invite_request": null,
	"ips": [
		{
			"ip": "192.168.42.1",
			"used_at": "2022-09-08T16:10:38.621Z"
		}
	],
	"account": {
		"id": "108267695853695427",
		"username": "admin",
		"acct": "admin",
		// ...
	}
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

Account does not exist

```json
{
	"error": "Record not found"
}
```

---

## Approve a pending account {#approve}

```http
POST /api/v1/admin/accounts/:id/approve HTTP/1.1
```

Approve the given local account if it is currently pending approval.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Permissions:** Manage Users\
**Version history:**\
2.9.1 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The account is now approved

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  // ...
  "approved": true,
  // ...
}
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header, or account is currently not pending.

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

Account does not exist

```json
{
	"error": "Record not found"
}
```

---

## Reject a pending account {#reject}

```http
POST /api/v1/admin/accounts/:id/reject HTTP/1.1
```

Reject the given local account if it is currently pending approval.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Permissions:** Manage Users\
**Version history:**\
2.9.1 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "id": "108965436418975594",
  "username": "badguy",
  "domain": null,
  "created_at": "2022-09-08T23:43:29.427Z",
  "email": "badguy@mastodon.local",
  "ip": null,
  "role": {
    "id": -99,
    "name": "",
    "color": "",
    "position": -1,
    "permissions": 65536,
    "highlighted": false,
    "created_at": "2022-09-08T22:48:07.977Z",
    "updated_at": "2022-09-08T22:48:07.977Z"
  },
  "confirmed": true,
  "suspended": false,
  "silenced": false,
  "disabled": false,
  "approved": false,
  "locale": "en",
  "invite_request": "i am going to commit crimes",
  "ips": [],
  "account": {
    "id": "108965436418975594",
    "username": "badguy",
    "acct": "badguy",
    "display_name": "",
    "locked": false,
    "bot": false,
    "discoverable": null,
    "group": false,
    "created_at": "2022-09-08T00:00:00.000Z",
    "note": "",
    "url": "http://mastodon.local/@badguy",
    "avatar": "http://mastodon.local/avatars/original/missing.png",
    "avatar_static": "http://mastodon.local/avatars/original/missing.png",
    "header": "http://mastodon.local/headers/original/missing.png",
    "header_static": "http://mastodon.local/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 0,
    "last_status_at": null,
    "emojis": [],
    "fields": []
  }
}
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header, or the account is not currently pending.

```json
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

Account does not exist

```json
{
  "error": "Record not found"
}
```

---

## Delete an account {#delete}

```http
DELETE /api/v1/admin/accounts/:id HTTP/1.1
```

Permanently delete data for a suspended account.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Permissions:** Delete User Data\
**Version history:**\
3.3.0 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The account's data has been deleted.

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  "email": "goody@mastodon.local",
  "ip": {
    "user_id": 3,
    "ip": "192.168.42.1",
    "used_at": "2022-09-08T23:42:04.761Z"
  },
  "role": {
    "id": -99,
    "name": "",
    "color": "",
    "position": -1,
    "permissions": 65536,
    "highlighted": false,
    "created_at": "2022-09-08T22:48:07.977Z",
    "updated_at": "2022-09-08T22:48:07.977Z"
  },
  "confirmed": true,
  "suspended": true,
  "silenced": false,
  "disabled": false,
  "approved": true,
  "locale": "en",
  "invite_request": "this is a compelling reason",
  "ips": [
    {
      "ip": "192.168.42.1",
      "used_at": "2022-09-08T23:42:04.761Z"
    }
  ],
  "account": {
    "id": "108965430868193066",
    "username": "goody",
    "acct": "goody",
    "display_name": "",
    "locked": false,
    "bot": false,
    "discoverable": false,
    "group": false,
    "created_at": "2022-09-08T00:00:00.000Z",
    "note": "",
    "url": "http://mastodon.local/@goody",
    "avatar": "http://mastodon.local/avatars/original/missing.png",
    "avatar_static": "http://mastodon.local/avatars/original/missing.png",
    "header": "http://mastodon.local/headers/original/missing.png",
    "header_static": "http://mastodon.local/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 0,
    "last_status_at": null,
    "suspended": true,
    "emojis": [],
    "fields": []
  }
}
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header, or account was already deleted.

```json
{
  "error": "This action is not allowed"
}
```

---

## Perform an action against an account {#action}

```http
POST /api/v1/admin/accounts/:id/action HTTP/1.1
```

Perform an action against an account and log this action in the moderation history. Also resolves any open reports against this account.

**Returns:** Empty\
**OAuth:** User token + `admin:write:accounts`\
**Permissions:** Manage Users, Manage Reports\
**Version history:**\
2.9.1 - added\
3.3.0 - add `sensitive` as a possible `type`\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

type
: {{<required>}} String. The type of action to be taken: `none`, `sensitive`, `disable`, `silence`, or `suspend`.

report_id
: String. The ID of an associated report that caused this action to be taken.

warning_preset_id
: String. The ID of a preset warning.

text
: String. Additional clarification for why this action was taken.

send_email_notification
: Boolean. Should an email be sent to the user with the above information?

#### Response
##### 200: OK

The action was successfully taken

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

Account or Report with given ID does not exist

```json
{
  "error": "Record not found"
}
```

##### 422: Server error

`type` is not provided or is not understood

```json
{
  "error": "Record invalid"
}
```

---

## Enable a currently disabled account {#enable}

```http
POST /api/v1/admin/accounts/:id/enable HTTP/1.1
```

Re-enable a local account whose login is currently disabled.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Permissions:** Manage Users\
**Version history:**\
2.9.1 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Account was enabled, or was already enabled.

```json
{
	"id": "108965430868193066",
	"username": "goody",
	"domain": null,
	"created_at": "2022-09-08T23:42:04.731Z",
	// ...
	"disabled": false,
	// ...
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

Account does not exist

```json
{
  "error": "Record not found"
}
```

---

## Unsilence an account {#unsilence}

```http
POST /api/v1/admin/accounts/:id/unsilence HTTP/1.1
```

Unsilence an account if it is currently silenced.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Permissions:** Manage Users\
**Version history:**\
2.9.1 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Account was unsilenced, or was already not silenced

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  // ...
  "silenced": false,
  // ...
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

Account does not exist

```json
{
  "error": "Record not found"
}
```

---

## Unsuspend an account {#unsuspend}

```http
POST /api/v1/admin/accounts/:id/unsuspend HTTP/1.1
```

Unsuspend a currently suspended account.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Permissions:** Manage Users\
**Version history:**\
2.9.1 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Account successfully unsuspended

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  // ...
  "suspended": false,
  // ...
}
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header, or Account is not currently suspended

```json
{
	"error": "This action is not allowed"
}
```

##### 404: Not found

Account does not exist

```json
{
	"error": "Record not found"
}
```

---

## Unmark an account as sensitive {#unsensitive}

```http
POST /api/v1/admin/accounts/:id/unsensitive HTTP/1.1
```

Stops marking an account's posts as sensitive, if it was previously flagged as sensitive.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Permissions:** Manage Users\
**Version history:**\
3.3.0 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The account is no longer marked as sensitive, or was already not marked as sensitive.

```json
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  // ...
  "sensitized": false,
  // ...
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

Account does not exist

```json
{
	"error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/accounts_controller.rb" caption="app/controllers/api/v1/admin/accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/account_actions_controller.rb" caption="app/controllers/api/v1/admin/account_actions_controller.rb" >}}