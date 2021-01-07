---
title: filters
description: Create and manage filters.
menu:
  docs:
    weight: 60
    parent: methods-accounts
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/filters" title="View all filters" >}}
{{< api-method-description >}}

**Returns:** Filter\
**OAuth:** User token + `read:filters`\
**Version history:**\
2.4.3 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Excerpts of various filters in different contexts.
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/filters/:id" title="View a single filter" >}}
{{< api-method-description >}}

**Returns:** Filter\
**OAuth:** User token + `read:filters`\
**Version history:**\
2.4.3 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Filter returned successfully
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Filter ID does not exist, or is not owned by you
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/filters" title="Create a filter" >}}
{{< api-method-description >}}

**Returns:** Filter\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="phrase" type="string" required=true >}}
Text to be filtered
{{< endapi-method-parameter >}}
{{< api-method-parameter name="context" type="array" required=true >}}
Array of enumerable strings `home`, `notifications`, `public`, `thread`. At least one context must be specified.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="irreversible" type="boolean" required=false >}}
Should the server irreversibly drop matching entities from home and notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="whole_word" type="boolean" required=false >}}
Consider word boundaries?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="expires_in" type="integer" required=false >}}
Number of seconds from now the filter should expire. Otherwise, null for a filter that doesn't expire.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

The newly-created filter will be returned.
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

If phrase or context are not provided properly
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="phrase" >}}
```javascript
{
  "error": "Validation failed: Phrase can't be blank"
}
```
{{< endtab >}}

{{< tab title="context" >}}
```javascript
{
  "error": "Validation failed: Context can't be blank, Context None or invalid context supplied"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="put" host="https://mastodon.example" path="/api/v1/filters/:id" title="Update a filter" >}}
{{< api-method-description >}}

**Returns:** Filter\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name="id" type="string" required=true >}}
ID of the filter in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="phrase" type="string" required=true >}}
Text to be filtered
{{< endapi-method-parameter >}}
{{< api-method-parameter name="context" type="array" required=true >}}
Array of enumerable strings `home`, `notifications`, `public`, `thread`. At least one context must be specified.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="irreversible" type="boolean" required=false >}}
Should the server irreversibly drop matching entities from home and notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="whole_word" type="boolean" required=false >}}
Consider word boundaries?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="expires_in" type="integer" required=false >}}
Number of seconds from now the filter should expire. Otherwise, null for a filter that doesn't expire.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Filter updated successfully
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

The filter does not exist or is not owned by you
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

If phrase or context are not provided properly
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="phrase" >}}
```javascript
{
  "error": "Validation failed: Phrase can't be blank"
}
```
{{< endtab >}}

{{< tab title="context" >}}
```javascript
{
  "error": "Validation failed: Context can't be blank, Context None or invalid context supplied"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/filters/:id" title="Remove a filter" >}}
{{< api-method-description >}}

**Returns:** Filter\
**OAuth:** User token + `write:filters`\
**Version history:**\
2.4.3 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name="id" type="string" required=true >}}
ID of the filter in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

The filter has been deleted successfully, so an empty object will be returned.
{{< endapi-method-response-example-description >}}


```javascript
{}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

The filter does not exist or is not owned by you
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


