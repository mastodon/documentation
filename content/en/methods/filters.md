---
title: filters
description: Create and manage filters.
menu:
  docs:
    weight: 60
    parent: methods-accounts
    identifier: methods-filters
aliases: ["/methods/filters", "/methods/accounts/filters"]
---

## Server-side (v2) methods {#v2}

Since Mastodon 3.6, filters can contain multiple keywords and are matched server-side. Clients apply the filter action based on [the status's `filtered` attribute]({{< relref "entities/Status#filtered" >}}).

---

### View all filters {#get}

<!--
TODO:
-->

```http
GET https://mastodon.example/api/v2/filters HTTP/1.1
```

---

### View a specific filter {#get-one}

<!--
TODO:
-->

```http
GET https://mastodon.example/api/v2/filters/:id HTTP/1.1
```

---

### Create a filter {#create}

<!--
TODO:
-->

```http
POST https://mastodon.example/api/v2/filters HTTP/1.1
```

---

### Update a filter {#update}

<!--
TODO:
-->

```http
PUT https://mastodon.example/api/v2/filters/:id HTTP/1.1
```

---

### Delete a filter {#delete}

<!--
TODO:
-->

```http
DELETE https://mastodon.example/api/v2/filters/:id HTTP/1.1
```

---

### View keywords added to a filter {#keywords-get}

<!--
TODO:
-->

```http
GET https://mastodon.example/api/v2/filters/:id/keywords HTTP/1.1
```

---

### View a single keyword within a filter {#keywords-get-one}

<!--
TODO:
-->

```http
GET https://mastodon.example/api/v1/filters/keywords/:id HTTP/1.1
```

---

### Add a keyword to a filter {#keywords-create}

<!--
TODO:
-->

```http
POST https://mastodon.example/api/v2/filters/:filter_id/keywords/:id HTTP/1.1
```

---

### Edit a keyword within a filter {#keywords-update}

<!--
TODO:
-->

```http
PUT https://mastodon.example/api/v1/filters/keywords/:id HTTP/1.1
```

---

### Remove keywords from a filter {#keywords-get}

<!--
TODO:
-->

```http
DELETE https://mastodon.example/api/v1/filters/keywords/:id HTTP/1.1
```

---

## Client-side (v1) methods {#v1}

Prior to Mastodon 3.6, matching filters was done client-size and filters could only contain one phrase to filter against.

---

### View your filters {#get-v1}

```http
GET https://mastodon.example/api/v1/filters HTTP/1.1
```

**Returns:** List of [V1::Filter]({{< relref "entities/V1_Filter" >}})\
**OAuth:** User token + `read:filters`\
**Version history:**\
2.4.3 - added\
3.6.0 - deprecated. For compatibility purposes, now returns a List of V1::Filter, with each V1::Filter representing one FilterKeyword (with the `keyword` being presented in the `phrase` attribute)

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Excerpts of various filters in different contexts.

```json
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

```json
{
  "error": "The access token is invalid"
}
```

---

### View a single filter {#get-one-v1}

```http
GET https://mastodon.example/api/v1/filters/:id HTTP/1.1
```

**Returns:** [V1::Filter]({{< relref "entities/V1_Filter" >}})\
**OAuth:** User token + `read:filters`\
**Version history:**\
2.4.3 - added\
3.6.0 - deprecated. For compatibility purposes, now returns a V1::Filter representing one FilterKeyword (with the `keyword` being presented in the `phrase` attribute)

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the FilterKeyword in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
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

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Filter ID does not exist, or is not owned by you

```json
{
  "error": "Record not found"
}
```

---

### Create a filter {#create-v1}

```http
POST https://mastodon.example/api/v1/filters HTTP/1.1
```

**Returns:** [V1::Filter]({{< relref "entities/V1_Filter" >}})\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added\
3.1.0 - added `account` context to filter in profile views\
3.6.0 - deprecated. For compatibility purposes, now returns a V1::Filter representing one FilterKeyword (with the `keyword` being presented in the `phrase` attribute). This method will create a Filter that contains only one FilterKeyword. The `title` of the Filter and the `keyword` of the FilterKeyword will be set equal to the `phrase` provided.

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

phrase
: {{<required>}} String. The text to be filtered.

context[]
: {{<required>}} Array of String. Where the filter should be applied. Specify at least one of `home`, `notifications`, `public`, `thread`, `account`.

irreversible
: Boolean. Should the server irreversibly drop matching entities from home and notifications? Defaults to false.

whole_word
: Boolean. Should the filter consider word boundaries for this keyword? Defaults to false.

expires_in
: Integer. Number of seconds from now that the filter should expire. Otherwise, `null` for a filter that doesn't expire.

#### Response
##### 200: OK

The newly-created filter will be returned.

```json
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

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

If phrase is not provided properly:

```json
{
  "error": "Validation failed: Phrase can't be blank"
}
```

If context is not provided properly:

```json
{
  "error": "Validation failed: Context can't be blank, Context None or invalid context supplied"
}
```

---

### Update a filter {#update-v1}

```http
PUT https://mastodon.example/api/v1/filters/:id HTTP/1.1
```

Replaces a filter's parameters in-place.

**Returns:** [V1::Filter]({{< relref "entities/V1_Filter" >}})\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added\
3.1.0 - added `account` context to filter in profile views\
3.6.0 - deprecated. or compatibility purposes, now returns a V1::Filter representing one FilterKeyword (with the `keyword` being presented in the `phrase` attribute). This method will return an error if you attempt to change `expires_in`, `irreversible`, or `context` for a filter with multiple keywords. Changing `phrase` and `whole_word` is always safe.

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the FilterKeyword in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

phrase
: {{<required>}} String. The text to be filtered.

context[]
: {{<required>}} Array of String. Specify at least one of `home`, `notifications`, `public`, `thread`, `account`.

irreversible
: Boolean. Should the server irreversibly drop matching entities from home and notifications? Defaults to false.

whole_word
: Boolean. Should the filter consider word boundaries? Defaults to false.

expires_in
: Integer. Number of seconds from now that the filter should expire. Otherwise, `null` for a filter that doesn't expire.

#### Response
##### 200: OK

Filter updated

```json
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

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Filter does not exist or is not owned by you

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

If phrase is not provided properly:

```json
{
  "error": "Validation failed: Phrase can't be blank"
}
```

If context is not provided properly:

```json
{
  "error": "Validation failed: Context can't be blank, Context None or invalid context supplied"
}
```

---

### Remove a filter {#delete-v1}

```http
DELETE https://mastodon.example/api/v1/filters/:id HTTP/1.1
```

**Returns:** empty object\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added\
3.6.0 - deprecated. This method will delete only the FilterKeyword from its parent Filter. To delete the parent Filter, you must use the v2 filters API.

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

Filter does not exist or is not owned by you

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< page-relref ref="api/guidelines#filters" caption="Implementation guidelines for filters" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/filters_controller.rb" caption="app/controllers/api/v2/filters_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/filters/keywords_controller.rb" caption="app/controllers/api/v1/filters/keywords_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/filters/statuses_controller.rb" caption="app/controllers/api/v1/filters/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/filters_controller.rb" caption="app/controllers/api/v1/filters_controller.rb" >}}