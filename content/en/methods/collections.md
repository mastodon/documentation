---
title: collections API methods
description: Manage collections of accounts to be recommended to others.
menu:
  docs:
    name: collections
    parent: methods
    identifier: methods-collections
aliases: ["/methods/collections", "/api/methods/collections"]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Create a Collection {#create}

```http
POST /api/v1/collections HTTP/1.1
```

Create a new Collection.

**Returns:** [WrappedCollection]({{< relref "entities/Collection#WrappedCollection" >}})\
**OAuth:** User token + `write:collections`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request {#create-request-example}

Example request:

```http
POST /api/v1/collections HTTP/1.1
Content-Type: application/json

{
  "name": "Nice accounts",
  "description": "These accounts are very nice",
  "language": "en",
  "tag_name": "#accounts",
  "sensitive": false,
  "discoverable": true,
  "account_ids": ["112658193342215767", "117628196343117789"]
}
```

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Form data parameters

name
: {{<required>}} String. A name for this Collection, max. 40 characters 

description
: String. A longer description of this Collection, max. 100 characters

language
: String. One of Mastodon's supported language codes (two letter ISO 639-1 plus exceptions)

tag_name
: String. A single hashtag that describes the Collection

sensitive
: Boolean. Whether this Collection should be marked as sensitive

discoverable
: Boolean. Whether this Collection should appear on the user's profile, in search results and other discovery mechanisms

account_ids
: Array of String. IDs of the accounts to feature in this Collection

#### Response

##### 200: OK

```json
{
  "collection": {
    "id": "116131056935959117",
    "account_id": "113668893442515793",
    "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
    "url": "https://example.com/collections/116131056935959117",
    "name": "Nice accounts",
    "description": "These accounts are very nice",
    "language": "en",
    "local": true,
    "sensitive": false,
    "discoverable": true,
    "tag": {
      "name": "accounts",
      "url": "https://example.com/tags/accounts"
    },
    "item_count": 2,
    "items": [
      // ...
    ],
    "created_at": "2026-02-25T11:35:01.394Z",
    "updated_at": "2026-02-25T11:35:01.394Z"
  }
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

HTTP status `422` is returned in case of validation errors. The response includes a JSON object with a general error messages and per-attribute details.

Example:

```json
{
  "error": {
    "error": "Validation failed: Name is too long (maximum is 40 characters)",
    "details": {
      "name": [
        {
          "error": "ERR_TOO_LONG",
          "description": "is too long (maximum is 40 characters)"
        }
      ]
    }
  }
}
```

See [Register an account]({{< relref "methods/accounts#create" >}}) for a list of error codes.

---

## Get a single Collection {#get_collection}

```http
GET /api/v1/collections/:id HTTP/1.1
```

**Returns:** [CollectionWithAccounts]({{< relref "entities/CollectionWithAccounts" >}})\
**OAuth:** Public or user token + `read:collections` for authorized access\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response

##### 200: OK

This returns an object with the actual Collection plus a list of Account objects that include all accounts in the Collection plus the owner.

When making an authorized request, the items in the Collection will be tailored to user making the request. This means it will not include items blocked by that user and when requesting a Collection owned by this user, it will include items in the `pending` state.

When requesting other user's Collections or when making anonymous requests, only items in the `accepted` state will be returned.

```json
{
  "accounts": [
    // ...
  ],
  "collection": {
    "id": "116131056935959117",
    "account_id": "113668893442515793",
    "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
    "url": "https://example.com/collections/116131056935959117",
    "name": "Nice accounts",
    "description": "These accounts are very nice",
    "language": "en",
    "local": true,
    "sensitive": false,
    "discoverable": true,
    "tag": {
      "name": "accounts",
      "url": "https://example.com/tags/accounts"
    },
    "item_count": 2,
    "items": [
      // ...
    ],
    "created_at": "2026-02-25T11:35:01.394Z",
    "updated_at": "2026-02-25T11:35:01.394Z"
  }
}
```

## Get all Collections from a given account {#get_collections}

```http
GET /api/v1/:account_id/collections HTTP/1.1
```

**Returns:** [Collections]({{< relref "entities/Collection#Collections" >}})\
**OAuth:** Public or user token + `read:collections` for authorized access\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Query parameters

limit
: Integer. Maximum number of results. Defaults to 40 Collections. Max 80 accounts.

offset
: Integer. Skip the first n results. Defaults to 0.

#### Response

##### 200: OK

This returns an object with a list of Collections. The result will only include Collections where [`discoverable`]({{< relref "entities/Collection#discoverable" >}}) is set to `true`, unless `:account_id` is the ID of the requesting account.

When making an authorized request, the items in the Collections will be tailored to the user making the request. See ["Get a single Collection"](#get_collection) above for a detailed description.

If there is more than one page of results, a `Link` header will be included with references to the next and/or previous page of results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```json
{
  "collections:": [
    {
      "id": "116131056935959117",
      "account_id": "113668893442515793",
      "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
      "url": "https://example.com/collections/116131056935959117",
      "name": "Nice accounts",
      "description": "These accounts are very nice",
      "language": "en",
      "local": true,
      "sensitive": false,
      "discoverable": true,
      "tag": {
        "name": "accounts",
        "url": "https://example.com/tags/accounts"
      },
      "item_count": 2,
      "items": [
        // ...
      ],
      "created_at": "2026-02-25T11:35:01.394Z",
      "updated_at": "2026-02-25T11:35:01.394Z"
    },
    // ...
  ]
}
```

---

## Get all Collections the current account is featured in {#in_collections}

```http
GET /api/v1/:account_id/in_collections HTTP/1.1
```

**Returns:** [Collections]({{< relref "entities/Collection#Collections" >}})\
**OAuth:** User token + `read:collections`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Query parameters

limit
: Integer. Maximum number of results. Defaults to 40 Collections. Max 80 accounts.

offset
: Integer. Skip the first n results. Defaults to 0.

#### Response

##### 200: OK

This returns an object with a list of Collections.

The items in the Collections will be tailored to the user making the request. See ["Get a single Collection"](#get_collection) above for a detailed description.

If there is more than one page of results, a `Link` header will be included with references to the next and/or previous page of results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```json
{
  "collections:": [
    {
      "id": "116131056935959117",
      "account_id": "113668893442515793",
      "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
      "url": "https://example.com/collections/116131056935959117",
      "name": "Nice accounts",
      "description": "These accounts are very nice",
      "language": "en",
      "local": true,
      "sensitive": false,
      "discoverable": true,
      "tag": {
        "name": "accounts",
        "url": "https://example.com/tags/accounts"
      },
      "item_count": 2,
      "items": [
        // ...
      ],
      "created_at": "2026-02-25T11:35:01.394Z",
      "updated_at": "2026-02-25T11:35:01.394Z"
    },
    // ...
  ]
}
```

---

## Update a Collection {#update_collection}

```http
PATCH /api/v1/collections/:id HTTP/1.1
```

Update an existing Collection.

**Returns:** [WrappedCollection]({{< relref "entities/Collection#WrappedCollection" >}})\
**OAuth:** User token + `write:collections`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request

Example request:

```http
PATCH /api/v1/collections/116131056935959117 HTTP/1.1
Content-Type: application/json

{
  "name": "Nice accounts",
  "description": "These accounts are very nice",
  "language": "en",
  "tag_name": "#accounts",
  "sensitive": false,
  "discoverable": true
}
```

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Form data parameters

name
: String. A name for this Collection, max. 40 characters 

description
: String. A longer description of this Collection, max. 100 characters

language
: String. One of Mastodon's supported language codes (two letter ISO 639-1 plus exceptions)

tag_name
: String. A single hashtag that describes the Collection

sensitive
: Boolean. Whether this Collection should be marked as sensitive

discoverable
: Boolean. Whether this Collection should appear in search results and other discovery mechanisms

#### Response

##### 200: OK

```json
{
  "collection": {
    "id": "116131056935959117",
    "account_id": "113668893442515793",
    "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
    "url": "https://example.com/collections/116131056935959117",
    "name": "Nice accounts",
    "description": "These accounts are very nice",
    "language": "en",
    "local": true,
    "sensitive": false,
    "discoverable": true,
    "tag": {
      "name": "accounts",
      "url": "https://example.com/tags/accounts"
    },
    "item_count": 2,
    "items": [
      // ...
    ],
    "created_at": "2026-02-25T11:35:01.394Z",
    "updated_at": "2026-02-25T11:35:01.394Z"
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

Trying to update a Collection owned by a different user.

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

HTTP status `422` is returned in case of validation errors. The response includes a JSON object with a general error messages and per-attribute details.

Example:

```json
{
  "error": {
    "error": "Validation failed: Name is too long (maximum is 40 characters)",
    "details": {
      "name": [
        {
          "error": "ERR_TOO_LONG",
          "description": "is too long (maximum is 40 characters)"
        }
      ]
    }
  }
}
```

See [Register an account]({{< relref "methods/accounts#create" >}}) for a list of error codes.


---

## Delete a Collection {#delete_collection}

```http
DELETE /api/v1/collections/:id HTTP/1.1
```

Delete a Collection.

**Returns:** Empty\
**OAuth:** User token + `write:collections`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request

Example request:

```http
DELETE /api/v1/collections/116131056935959117 HTTP/1.1
```

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response

##### 200: OK

The Collection was deleted.

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

Trying to delete a Collection owned by a different user.

```json
{
  "error": "This action is not allowed"
}
```

---

## Add an account to a Collection {#add_account}

```http
POST /api/v1/collections/:collection_id/items HTTP/1.1
```

Add an account to a Collection.

**Returns:** [WrappedCollectionItem]({{< relref "entities/CollectionItem#WrappedCollectionItem" >}})\
**OAuth:** User token + `write:collections`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request

Example request:

```http
POST /api/v1/collections/116131056935959117/items HTTP/1.1
Content-Type: application/json

{
  "account_id": "112658193342215767"
}
```

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Form data parameters

account_id
: String. ID of the account to add to this Collection

#### Response

##### 200: OK

```json
{
  "collection_item": {
    "id": "116151066915353115",
    "account_id": "112658193342215767",
    "state": "accepted",
    "created_at": "2026-02-25T11:35:01.394Z",
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

Trying to add to a Collection owned by a different user.

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

HTTP status `422` is returned in case of validation errors, i.e. when it was not possible to add the given account or the given ID was unknown. The response includes a JSON object with a general error messages.

Example:

```json
{
  "error": "`account_id` parameter is missing"
}
```

---

## Remove account from a Collection {#remove_account}

```http
DELETE /api/v1/collections/:collection_id/items/:id HTTP/1.1
```

Remove an account from a Collection.

**Returns:** Empty\
**OAuth:** User token + `write:collections`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request

Example request:

```http
DELETE /api/v1/collections/116131056935959117/items/116151066915353115 HTTP/1.1
```

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response

##### 200: OK

The account was removed.

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

Trying to remove an item from a Collection owned by a different user.

```json
{
  "error": "This action is not allowed"
}
```

---

## Revoke inclusion in a Collection {#revoke_item}

```http
POST /api/v1/collections/:collection_id/items/:id/revoke HTTP/1.1
```

Remove the current user from a Collection created by a different user.

**Returns:** Empty\
**OAuth:** User token + `write:collections`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10) - added

#### Request

Example request:

```http
POST /api/v1/collections/116131056935959117/items/116151066915353115/revoke HTTP/1.1
```

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response

##### 200: OK

The account was removed.

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

Trying to remove an item from a Collection that does not include the current user.

```json
{
  "error": "This action is not allowed"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/collections_controller.rb" caption="app/controllers/api/v1/collections_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/collection_items_controller.rb" caption="app/controllers/api/v1/collection_items_controller.rb" >}}

