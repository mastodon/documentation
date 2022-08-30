---
title: filters
description: Create and manage filters.
menu:
  docs:
    weight: 60
    parent: methods-accounts
aliases: [/methods/accounts/filters/]
---

## View your filters {#get}

```http
GET https://mastodon.example/api/v1/filters HTTP/1.1
```

**Returns:** List of [Filter]({{< relref "entities/filter" >}})\
**OAuth:** User token + `read:filters`\
**Version history:**\
2.4.3 - added

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Excerpts of various filters in different contexts.

```javascript
[
  {
    "id": "6191",
    "phrase": ":eurovision2019:",
    "context": [
      "home"
    ],
    "whole_word": true,
    "expires_at": "2019-05-21T13:47:31.333Z",
    "irreversible": false
  },
  ...
  {
    "id": "5580",
    "phrase": "@twitter.com",
    "context": [
      "home",
      "notifications",
      "public",
      "thread"
    ],
    "whole_word": false,
    "expires_at": null,
    "irreversible": true
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

## View a single filter {#get-one}

```http
GET https://mastodon.example/api/v1/filters/:id HTTP/1.1
```

**Returns:** [Filter]({{< relref "entities/filter" >}})\
**OAuth:** User token + `read:filters`\
**Version history:**\
2.4.3 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Filter in the database.

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```javascript
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": "2019-11-26T09:08:06.254Z",
  "irreversible": true
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Filter ID does not exist, or is not owned by you

```javascript
{
  "error": "Record not found"
}
```

---

## Create a filter {#create}

```http
POST https://mastodon.example/api/v1/filters HTTP/1.1
```

**Returns:** [Filter]({{< relref "entities/filter" >}})\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added\
3.1.0 - added `account` context to filter in profile views

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

phrase
: {{<required>}} String. The text to be filtered.

context
: {{<required>}} Array. Array of enumerable strings `home`, `notifications`, `public`, `thread`, `account`. At least one context must be specified.

irreversible
: Boolean. Should the server irreversibly drop matching entities from home and notifications? Defaults to false.

whole_word
: Boolean. Should the filter consider word boundaries? Defaults to false.

expires_in
: Integer. Number of seconds from now that the filter should expire. Otherwise, `null` for a filter that doesn't expire.

#### Response
##### 200: OK

The newly-created filter will be returned.

```javascript
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": "2019-11-26T09:08:06.254Z",
  "irreversible": true
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

If phrase is not provided properly:

```javascript
{
  "error": "Validation failed: Phrase can't be blank"
}
```

If context is not provided properly:

```javascript
{
  "error": "Validation failed: Context can't be blank, Context None or invalid context supplied"
}
```

---

## Update a filter {#update}

```http
PUT https://mastodon.example/api/v1/filters/:id HTTP/1.1
```

Replaces a filter's parameters in-place.

**Returns:** [Filter]({{< relref "entities/filter" >}})\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added\
3.1.0 - added `account` context to filter in profile views

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Filter in the database.

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

phrase
: {{<required>}} String. The text to be filtered.

context
: {{<required>}} Array. Array of enumerable strings `home`, `notifications`, `public`, `thread`, `account`. At least one context must be specified.

irreversible
: Boolean. Should the server irreversibly drop matching entities from home and notifications? Defaults to false.

whole_word
: Boolean. Should the filter consider word boundaries? Defaults to false.

expires_in
: Integer. Number of seconds from now that the filter should expire. Otherwise, `null` for a filter that doesn't expire.

#### Response
##### 200: OK

Filter updated

```javascript
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": null,
  "irreversible": true
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Filter does not exist or is not owned by you

```javascript
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

If phrase is not provided properly:

```javascript
{
  "error": "Validation failed: Phrase can't be blank"
}
```

If context is not provided properly:

```javascript
{
  "error": "Validation failed: Context can't be blank, Context None or invalid context supplied"
}
```

---

## Remove a filter {#delete}

```http
DELETE https://mastodon.example/api/v1/filters/:id HTTP/1.1
```

**Returns:** empty object\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the SOMETHING in the database.

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The filter has been deleted successfully, so an empty object will be returned.

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

##### 404: Not found

Filter does not exist or is not owned by you

```javascript
{
  "error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/filters_controller.rb" caption="app/controllers/api/v1/filters_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/filters" caption="app/controllers/api/v1/filters/" >}}