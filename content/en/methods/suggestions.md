---
title: suggestions
description: >-
  Server-generated suggestions on who to follow, based on previous positive
  interactions.
menu:
  docs:
    weight: 120
    parent: methods-accounts
aliases: [/methods/accounts/suggestions/]
---

## View follow suggestions {#get}

```http
GET https://mastodon.example/api/v1/suggestions HTTP/1.1
```

Accounts the user has had past positive interactions with, but is not yet following.

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** User token + `read`\
**Version history:**\
2.4.3 - added

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

limit
: Integer. Maximum number of results to return. Defaults to 40.

#### Response
##### 200: OK

```javascript
[
  {
    "id": "332766",
    "username": "kaniini",
    "acct": "kaniini@pleroma.site",
    ...
  },
  {
    "id": "689455",
    "username": "interneteh",
    "acct": "interneteh@sunbeam.city",
    ...
  },
  {
    "id": "764276",
    "username": "Dee",
    "acct": "Dee@fedi.underscore.world",
    ...
  },
  ...
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## Remove a suggestion {#remove}

```http
DELETE https://mastodon.example/api/v1/suggestions/:account_id HTTP/1.1
```

Remove an account from follow suggestions.

**Returns:** n/a\
**OAuth:** User token + `read`\
**Version history:**\
2.4.3 - added

#### Request

##### Path parameters

:account_id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

A successful call will return an empty object. Note the call will be successful even if the account id provided is invalid or is not a suggested account.

```javascript
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/suggestions_controller.rb" caption="app/controllers/api/v1/suggestions_controller.rb" >}}

{{< page-relref ref="methods/accounts#follow" caption="POST /api/v1/accounts/:id/follow" >}}