---
title: markers
description: Save and restore your position in timelines.
menu:
  docs:
    weight: 30
    parent: methods-timelines
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/markers" title="Get saved timeline position" >}}
{{< api-method-description >}}

**Returns:** Marker\
**OAuth:** User token + `read:statuses`\
**Version history:**\
3.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="timeline" type="array" required=true >}}
Array of markers to fetch. String enum anyOf `home`, `notifications`. If not provided, an empty object will be returned.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

timeline\[\] = \["home", "notifications"\]
{{< endapi-method-response-example-description >}}


```javascript
{
  "notifications": {
    "last_read_id": "35098814",
    "version": 361,
    "updated_at": "2019-11-26T22:37:25.239Z"
  },
  "home": {
    "last_read_id": "103206604258487607",
    "version": 468,
    "updated_at": "2019-11-26T22:37:25.235Z"
  }
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
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/markers" title="Save position in timeline" >}}
{{< api-method-description >}}

**Returns:** Marker\
**OAuth:** User token + `write:statuses`\
**Version history:**\
3.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="home\[last_read_id\]" type="string" required=false >}}
ID of the last status read in the home timeline.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="notifications\[last_read_id\]" type="string" required=false >}}
ID of the last notification read.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Calling this API with home\[last_read_id\] causes a marker to be created for the home timeline.
{{< endapi-method-response-example-description >}}


```javascript
{
  "home": {
    "last_read_id": "103194548672408537",
    "version": 462,
    "updated_at": "2019-11-24T19:39:39.337Z"
  }
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
{{< api-method-response-example httpCode=409 >}}
{{< api-method-response-example-description >}}

If object is stale while being updated, an error will occur.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Conflict during update, please try again"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


