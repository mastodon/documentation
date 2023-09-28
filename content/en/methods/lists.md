---
title: lists API methods
description: >-
  View and manage lists. See also: /api/v1/timelines/list/id for loading a list
  timeline.
menu:
  docs:
    weight: 20
    name: lists
    parent: methods-timelines
    identifier: methods-lists
aliases: [
  "/methods/lists",
  "/api/methods/lists",
  "/methods/timelines/lists",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View your lists {#get}

```http
GET /api/v1/lists HTTP/1.1
```

Fetch all lists that the user owns.

**Returns:** Array of [List]({{< relref "entities/list" >}})\
**OAuth:** User token + `read:lists`\
**Version history:**\
2.1.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Use `id` as a parameter for related API calls.

```json
[
  {
    "id": "12249",
    "title": "Friends",
    "replies_policy": "followed",
    "exclusive": false
  },
  {
    "id": "13585",
    "title": "test",
    "replies_policy": "list",
    "exclusive": true
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

## Show a single list {#get-one}

```http
GET /api/v1/lists/:id HTTP/1.1
```

Fetch the list with the given ID. Used for verifying the title of a list, and which replies to show within that list.

**Returns:** [List]({{< relref "entities/list" >}})\
**OAuth:** User token + `read:lists`\
**Version history:**\
2.1.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the List in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The list 12249 exists and is owned by you

```json
{
  "id": "12249",
  "title": "Friends",
  "replies_policy": "followed",
  "exclusive": false
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

List does not exist or is not owned by you

```json
{
  "error": "Record not found"
}
```

---

## Create a list {#create}

```http
POST /api/v1/lists HTTP/1.1
```

Create a new list.

**Returns:** [List]({{< relref "entities/list" >}})\
**OAuth:** User token + `write:lists`\
**Version history:**\
2.1.0 - added\
3.3.0 - added `replies_policy`\
4.2.0 - added `exclusive`

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

title
: {{<required>}} String. The title of the list to be created.

replies_policy
: String. One of `followed`, `list`, or `none`. Defaults to `list`.

exclusive
: Boolean. Whether members of this list need to get removed from the “Home” feed

#### Response
##### 200: OK

A sample list was created with a `title` of "test".

```json
{
  "id": "13585",
  "title": "test",
  "replies_policy": "list"
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

If the title is missing:

```json
{
  "error": "Validation failed: Title can't be blank"
}
```

If the replies_policy is not understood:

```json
{
  "error": "'some' is not a valid replies_policy"
}
```
-->

---

## Update a list {#update}

```http
PUT /api/v1/lists/:id HTTP/1.1
```

Change the title of a list, or which replies to show.

**Returns:** [List]({{< relref "entities/list" >}})\
**OAuth:** User token + `write:lists`\
**Version history:**\
2.1.0 - added\
3.3.0 - added `replies_policy`

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the List in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

title
: {{<required>}} String. The title of the list to be created.

replies_policy
: String. One of `followed`, `list`, or `none`. Defaults to `list`.

#### Response
##### 200: OK

The `title` of list 13585 was successfully updated to "testing"

```json
{
  "id": "13585",
  "title": "test",
  "replies_policy": "list"
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

If the `title` is missing:

```json
{
  "error": "Validation failed: Title can't be blank"
}
```

If the `replies_policy` is not understood:

```json
{
  "error": "'some' is not a valid replies_policy"
}
```

---

## Delete a list {#delete}

```http
DELETE /api/v1/lists/:id HTTP/1.1
```

**Returns:** empty object\
**OAuth:** User token + `write:lists`\
**Version history:**\
2.1.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the List in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

List was successfully deleted

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

##### 404: Not found

List does not exist or is not owned by you


```json
{
  "error": "Record not found"
}
```

---

## View accounts in a list {#accounts}

```http
GET /api/v1/lists/:id/accounts HTTP/1.1
```

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** User token + `read:lists`\
**Version history:**\
2.1.0 - added\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the List in the database.

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
: Integer. Maximum number of results. Defaults to 40 accounts. Max 80 accounts. Set to 0 in order to get all accounts without pagination.

#### Response
##### 200: OK

```json
[
  {
    "id": "952529",
    "username": "alayna",
    "acct": "alayna@desvox.es",
    // ...
  },
  {
    "id": "917388",
    "username": "cole",
    "acct": "cole@be.cutewith.me",
    // ...
  },
  {
    "id": "869022",
    "username": "alayna",
    "acct": "alayna@be.cutewith.me",
    // ...
  },
  {
    "id": "832844",
    "username": "a9",
    "acct": "a9@broadcast.wolfgirl.engineering",
    // ...
  },
  {
    "id": "482403",
    "username": "amic",
    "acct": "amic@nulled.red",
    // ...
  }
]
```

Because you do not know beforehand which Accounts are included in a List, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/lists/12249/accounts?max_id=106931203247163945>; rel="next", <https://mastodon.example/api/v1/lists/12249/accounts?since_id=108632085572655915>; rel="prev"
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

List does not exist or is not owned by you.


```json
{
  "error": "Record not found"
}
```

---

## Add accounts to a list {#accounts-add}

```http
POST /api/v1/lists/:id/accounts HTTP/1.1
```

Add accounts to the given list. Note that the user must be following these accounts.

**Returns:** empty object\
**OAuth:** User token + `write:lists`\
**Version history:**\
2.1.0 - added

### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the List in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

account_ids[]
: {{<required>}} Array of String. The accounts that should be added to the list.

#### Response
##### 200: OK

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

##### 404: Not found

You are not following a given account ID, or you do not own the list ID, or list/account ID does not exist

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

An Account with one of the provided IDs is already in the list

```json
{
  "error": "Validation failed: Account has already been taken"
}
```

---

## Remove accounts from list {#accounts-remove}

```http
DELETE /api/v1/lists/:id/accounts HTTP/1.1
```

Remove accounts from the given list.

**Returns:** empty object\
**OAuth:** User token + `write:lists`\
**Version history:**\
2.1.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the List in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

account_ids[]
: {{<required>}} Array of String. The accounts that should be removed from the list.

#### Response
##### 200: OK

Account was successfully removed from the list, or it was already not in the list.

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

##### 404: Not found

List is not owned by you or does not exist

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< page-relref ref="methods/accounts#lists" caption="GET /api/v1/accounts/:id/lists" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/lists_controller.rb" caption="app/controllers/api/v1/lists_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/lists/accounts_controller.rb" caption="app/controllers/api/v1/lists/accounts_controller.rb" >}}
