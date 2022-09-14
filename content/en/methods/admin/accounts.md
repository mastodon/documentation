---
title: accounts
description: Perform moderation actions with accounts.
menu:
  docs:
    parent: methods-admin
    identifier: methods-admin-accounts
---

<!--
TODO: wrong token currently returns HTML and 403 instead of JSON and 401
https://github.com/mastodon/mastodon/issues/19142
-->

## View accounts (v1) {#v1}

```http
GET https://mastodon.example/api/v1/admin/accounts HTTP/1.1
```

View all accounts, optionally matching certain criteria for filtering, up to 100 at a time. Pagination may be done with the HTTP Link header in the response.

**Returns:** Array of [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:read:accounts`\
**Version history:**\
2.9.1 - added\
3.3.0 - added `sensitized`

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
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

min_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 100.

#### Response
##### 200: OK

```javascript
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
      ...
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
      ...
    }
  }
]
```

##### 403: Forbidden

Invalid or missing access token.

```javascript
{
  "error": "This action is not allowed"
}
```

---

## View accounts (v2) {#v2}

```http
GET https://mastodon.example/api/v2/admin/accounts HTTP/1.1
```

View all accounts, optionally matching certain criteria for filtering, up to 100 at a time. Pagination may be done with the HTTP Link header in the response.

**Returns:** Array of [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:read:accounts`\
**Version history:**\
3.5.0 - added\
3.6.0 - added `role_ids`

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

role_ids
: String. Filter for users with these roles.

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
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

min_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 100.

#### Response
##### 200: OK

```javascript
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
      ...
    }
  }
]
```

##### 403: Forbidden

Invalid or missing access token.

```javascript
{
  "error": "This action is not allowed"
}
```

---

## View a specific account {#get-one}

```http
GET https://mastodon.example/api/v1/admin/accounts/:id HTTP/1.1
```

View admin-level information about the given account.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:read:accounts`\
**Version history:**\
2.9.1 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```javascript
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
		...
	}
}
```

##### 403: Forbidden

Invalid or missing access token.

```javascript
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

Account does not exist

```javascript
{
	"error": "Record not found"
}
```

---

## Approve a pending account {#approve}

```http
POST https://mastodon.example/api/v1/admin/accounts/:id/approve HTTP/1.1
```

Approve the given local account if it is currently pending approval.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

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

```javascript
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  ...
  "approved": true,
  ...
}
```

##### 403: Forbidden

Invalid or missing access token, or the account is not currently pending.

```javascript
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

Account does not exist

```javascript
{
	"error": "Record not found"
}
```

---

## Reject a pending account {#reject}

```http
POST https://mastodon.example/api/v1/admin/accounts/:id/reject HTTP/1.1
```

Reject the given local account if it is currently pending approval.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```javascript
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

Invalid or missing access token, or the account is not currently pending.

```javascript
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

Account does not exist

```javascript
{
  "error": "Record not found"
}
```

---

## Delete an account {#delete}

```http
DELETE https://mastodon.example/api/v1/admin/accounts/:id HTTP/1.1
```

Permanently delete data for a suspended account.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
3.3.0 - added

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

```javascript
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

You cannot delete this account's data, or it was already deleted. Or, the access token is missing or invalid.

```javascript
{
  "error": "This action is not allowed"
}
```

---

## Perform an action against an account {#action}

```http
POST https://mastodon.example/api/v1/admin/accounts/:id/action HTTP/1.1
```

Perform an action against an account and log this action in the moderation history. Also resolves any open reports against this account.

**Returns:** empty object\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added\
3.3.0 - add `sensitive` as a possible `type`

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

```javascript
{}
```

##### 403: Forbidden

Invalid or missing access token.

```javascript
{
  "error": "This action is not allowed"
}
```

##### 404: Not found

Account does not exist

<!--
TODO: this also happens when report_id is not found, but the action is still taken
https://github.com/mastodon/mastodon/issues/19145
-->

```javascript
{
  "error": "Record not found"
}
```

##### 500: Server error

<!--
TODO: This should be a 422
https://github.com/mastodon/mastodon/issues/19143
-->

`type` is not provided or is not understood

---

## Enable a currently disabled account {#enable}

```http
POST https://mastodon.example/api/v1/admin/accounts/:id/enable HTTP/1.1
```

Re-enable a local account whose login is currently disabled.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

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

```javascript
{
	"id": "108965430868193066",
	"username": "goody",
	"domain": null,
	"created_at": "2022-09-08T23:42:04.731Z",
	...
	"disabled": false,
	...
}
```

##### 404: Not found

Account does not exist

```javascript
{
  "error": "Record not found"
}
```

---

## Unsilence an account {#unsilence}

```http
POST https://mastodon.example/api/v1/admin/accounts/:id/unsilence HTTP/1.1
```

Unsilence an account if it is currently silenced.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

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

```javascript
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  ...
  "silenced": false,
  ...
}
```

##### 404: Not found

Account does not exist

```javascript
{
  "error": "Record not found"
}
```

---

## Unsuspend an account {#unsuspend}

```http
POST https://mastodon.example/api/v1/admin/accounts/:id/unsuspend HTTP/1.1
```

Unsuspend a currently suspended account.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

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

```javascript
{
  "id": "108965430868193066",
  "username": "goody",
  "domain": null,
  "created_at": "2022-09-08T23:42:04.731Z",
  ...
  "suspended": false,
  ...
}
```

##### 403: Forbidden

Account is not currently suspended

```javascript
{
	"error": "This action is not allowed"
}
```

##### 404: Not found

Account does not exist

```javascript
{
	"error": "Record not found"
}
```

---

## Unmark an account as sensitive {#unsensitive}

```http
POST https://mastodon.example/api/v1/admin/accounts/:id/unsensitive HTTP/1.1
```

Stops marking an account's posts as sensitive, if it was previously flagged as sensitive.

**Returns:** [Admin::Account]({{<relref "entities/Admin_Account">}})\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
3.3.0 - added

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

<!--
TODO: There is no way to know if an account is marked sensitive
https://github.com/mastodon/mastodon/issues/19148
-->

##### 404: Not found

Account does not exist

```javascript
{
	"error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/accounts_controller.rb" caption="app/controllers/api/v1/admin/accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/account_actions_controller.rb" caption="app/controllers/api/v1/admin/account_actions_controller.rb" >}}