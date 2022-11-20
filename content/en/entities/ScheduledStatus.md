---
title: ScheduledStatus
description: Represents a status that will be published at a future scheduled date.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/scheduledstatus",
  "/entities/ScheduledStatus",
  "/api/entities/scheduledstatus",
  "/api/entities/ScheduledStatus",
]
---

## Example

<!--
TODO: figure out where params are coming from and in what order
-->

Returned from `POST /api/v1/statuses?status=test post&scheduled_at=2022-09-29`

```json
{
  "id": "1",
  "scheduled_at": "2022-09-29T00:00:00.000Z",
  "params": {
    "text": "test post",
    "media_ids": null,
    "sensitive": null,
    "spoiler_text": null,
    "visibility": null,
    "language": null,
    "scheduled_at": null,
    "poll": null,
    "idempotency": null,
    "with_rate_limit": false,
    "in_reply_to_id": null,
    "application_id": 3
  },
  "media_attachments": []
}
```

Returned from `GET /api/v1/scheduled_statuses`:

```json
{
  "id": "1",
  "scheduled_at": "2022-09-29T00:00:00.000Z",
  "params": {
    "poll": null,
    "text": "test post",
    "language": null,
    "media_ids": null,
    "sensitive": null,
    "visibility": null,
    "idempotency": null,
    "scheduled_at": null,
    "spoiler_text": null,
    "application_id": 3,
    "in_reply_to_id": null,
    "with_rate_limit": false
  },
  "media_attachments": []
}
```

## Required attributes

### `id` {#id}

**Description:** ID of the scheduled status in the database.\
**Type:** String (cast from an integer but not guaranteed to be a number)\
**Version history:**\
2.7.0 - added

### `scheduled_at` {#scheduled_at}

**Description:** ID of the status in the database.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
2.7.0 - added

### `params` {#params}

**Description:** The parameters to be used when the status is posted.\
**Type:** Hash\
**Version history:**\
2.7.0 - added

### `media_attachments` {#media_attachments}

**Description:** Media that will be attached when the status is posted.\
**Type:** Array of [MediaAttachment]({{< relref "entities/MediaAttachment" >}})\
**Version history:**\
2.7.0 - added

## See also

{{< page-relref ref="methods/statuses#create" caption="POST /api/v1/statuses (with `scheduled_at` parameter)" >}}

{{< page-relref ref="methods/scheduled_statuses" caption="scheduled_statuses API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/scheduled_status_serializer.rb" caption="app/serializers/rest/scheduled_status_serializer.rb" >}}



