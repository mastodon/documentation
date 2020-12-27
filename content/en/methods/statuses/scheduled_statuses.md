---
title: scheduled_statuses
description: Schedule statuses for your instance to publish later.
menu:
  docs:
    weight: 30
    parent: methods-statuses
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/scheduled_statuses" title="View scheduled statuses" >}}
{{< api-method-description >}}

**Returns:** Array of ScheduledStatus\
**OAuth:** User token + `read:statuses`\
**Version history:**\
2.7.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="limit" type="number" required=false >}}
Max number of results to return. Defaults to 20.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than ID
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
Return results newer than ID
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than ID
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "3221",
    "scheduled_at": "2019-12-05T12:33:01.000Z",
    "params": {
      "poll": null,
      "text": "test content",
      "media_ids": null,
      "sensitive": null,
      "visibility": null,
      "idempotency": null,
      "scheduled_at": null,
      "spoiler_text": null,
      "application_id": 596551,
      "in_reply_to_id": null
    },
    "media_attachments": []
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
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
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/scheduled_statuses/:id" title="View a single scheduled status" >}}
{{< api-method-description >}}

**Returns:** ScheduledStatus\
**OAuth:** User token + `read:statuses`\
**Version history:**\
2.7.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the scheduled status in the database.
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
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "3221",
  "scheduled_at": "2019-12-05T12:33:01.000Z",
  "params": {
    "poll": null,
    "text": "test content",
    "media_ids": null,
    "sensitive": null,
    "visibility": null,
    "idempotency": null,
    "scheduled_at": null,
    "spoiler_text": null,
    "application_id": 596551,
    "in_reply_to_id": null
  },
  "media_attachments": []
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}
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
{{< api-method method="put" host="https://mastodon.example" path="/api/v1/scheduled_statuses/:id" title="Schedule a status" >}}
{{< api-method-description >}}

**Returns:** ScheduledStatus\
**OAuth:** User token + `write:statuses`\
**Version history:**\
2.7.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the Status to be scheduled
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="scheduled_at" type="string" required=false >}}
ISO 8601 Datetime at which the status will be published. Must be at least 5 minutes into the future.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "3221",
  "scheduled_at": "2019-12-05T13:33:01.000Z",
  "params": {
    "poll": null,
    "text": "test content",
    "media_ids": null,
    "sensitive": null,
    "visibility": null,
    "idempotency": null,
    "scheduled_at": null,
    "spoiler_text": null,
    "application_id": 596551,
    "in_reply_to_id": null
  },
  "media_attachments": []
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Validation failed: Scheduled at The scheduled date must be in the future"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/scheduled_statuses/:id" title="Cancel a scheduled status" >}}
{{< api-method-description >}}

**Returns:** empty object\
**OAuth:** User token + `write:statuses`\
**Version history:**\
2.7.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the scheduled status in the database.
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

No ScheduledStatus at that id, or you do not own it
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


