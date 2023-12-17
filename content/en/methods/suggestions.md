---
title: suggestions API methods
description: >-
  Server-generated suggestions on who to follow, based on previous positive
  interactions.
menu:
  docs:
    weight: 120
    name: suggestions
    parent: methods-accounts
    identifier: methods-suggestions
aliases: [
  "/methods/suggestions",
  "/api/methods/suggestions",
  "/methods/accounts/suggestions",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View follow suggestions (v2) {#v2}

```http
GET /api/v2/suggestions HTTP/1.1
```

Accounts that are promoted by staff, or that the user has had past positive interactions with, but is not yet following.

**Returns:** Array of [Suggestion]({{< relref "entities/Suggestion" >}})\
**OAuth:** User token + `read`\
**Version history:**\
3.4.0 - added

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

limit
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

```json
[
  {
    "source": "past_interactions",
    "account": {
      "id": "784058",
      "username": "katie",
      "acct": "katie@pleroma.voidlurker.net",
      // ...
  },
  // ...
  {
    "source": "global",
    "account": {
      "id": "108194863260762493",
      "username": "thunderbird",
      "acct": "thunderbird@mastodon.online",
      // ...
  }
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Remove a suggestion {#remove}

```http
DELETE /api/v1/suggestions/:account_id HTTP/1.1
```

Remove an account from follow suggestions.

**Returns:** Empty\
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

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## (DEPRECATED) View follow suggestions (v1) {#v1}

```http
GET /api/v1/suggestions HTTP/1.1
```

Accounts the user has had past positive interactions with, but is not yet following.

**Returns:** Array of [Account]({{< relref "entities/Account" >}})\
**OAuth:** User token + `read`\
**Version history:**\
2.4.3 - added\
3.4.0 - deprecated

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

limit
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

```json
[
  {
    "id": "332766",
    "username": "kaniini",
    "acct": "kaniini@pleroma.site",
    // ...
  },
  {
    "id": "689455",
    "username": "interneteh",
    "acct": "interneteh@sunbeam.city",
    // ...
  },
  {
    "id": "764276",
    "username": "Dee",
    "acct": "Dee@fedi.underscore.world",
    // ...
  },
  // ...
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< page-relref ref="methods/accounts#follow" caption="POST /api/v1/accounts/:id/follow" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/suggestions_controller.rb" caption="app/controllers/api/v2/suggestions_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/suggestions_controller.rb" caption="app/controllers/api/v1/suggestions_controller.rb" >}}

