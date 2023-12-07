---
title: scheduled_statuses API methods
description: Manage statuses that were scheduled to be published at a future date.
menu:
  docs:
    weight: 30
    name: scheduled_statuses
    parent: methods-statuses
    identifier: methods-scheduled_statuses
aliases: [
  "/methods/scheduled_statuses",
  "/api/methods/scheduled_statuses",
  "/methods/statuses/scheduled_statuses",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View scheduled statuses {#get}

```http
GET /api/v1/scheduled_statuses HTTP/1.1
```

**Returns:** Array of [ScheduledStatus]({{< relref "entities/scheduledstatus" >}})\
**OAuth:** User token + `read:statuses`\
**Version history:**\
2.7.0 - added\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

#### Response
##### 200: OK

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## View a single scheduled status {#get-one}

```http
GET /api/v1/scheduled_statuses/:id HTTP/1.1
```

**Returns:** [ScheduledStatus]({{< relref "entities/scheduledstatus" >}})\
**OAuth:** User token + `read:statuses`\
**Version history:**\
2.7.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the ScheduledStatus in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

ScheduledStatus is not owned by you or does not exist

```json
{
  "error": "Record not found"
}
```

---

## Update a scheduled status's publishing date {#update}

```http
PUT /api/v1/scheduled_statuses/:id HTTP/1.1
```

**Returns:** [ScheduledStatus]({{< relref "entities/scheduledstatus" >}})\
**OAuth:** User token + `write:statuses`\
**Version history:**\
2.7.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the ScheduledStatus in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

scheduled_at
: String. ISO 8601 Datetime at which the status will be published. Must be at least 5 minutes into the future.

#### Response
##### 200: OK

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

ScheduledStatus is not owned by you or does not exist

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Scheduled at The scheduled date must be in the future"
}
```

---

## Cancel a scheduled status {#cancel}

```http
DELETE /api/v1/scheduled_statuses/:id HTTP/1.1
```

**Returns:** Empty\
**OAuth:** User token + `write:statuses`\
**Version history:**\
2.7.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the ScheduledStatus in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

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

ScheduledStatus is not owned by you or does not exist

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< page-relref ref="methods/statuses#create" caption="POST /api/v1/statuses (`scheduled_at` parameter)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/scheduled_statuses_controller.rb" caption="app/controllers/api/v1/scheduled_statuses_controller.rb" >}}