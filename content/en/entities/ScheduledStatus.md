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

## Attributes

### `id` {#id}

**Description:** ID of the scheduled status in the database.\
**Type:** String (cast from an integer but not guaranteed to be a number)\
**Version history:**\
2.7.0 - added

### `scheduled_at` {#scheduled_at}

**Description:** The timestamp for when the status will be posted.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
2.7.0 - added

### `params` {#params}

**Description:** The parameters that were used when scheduling the status, to be used when the status is posted.\
**Type:** Hash\
**Version history:**\
2.7.0 - added

#### `params[text]` {#params-text}

**Description:** Text to be used as status content.\
**Type:** String\
**Version history:**\
2.7.0 - added

#### `params[poll]` {#params-poll}

**Description:** Poll to be attached to the status.\
**Type:** {{<nullable>}} Hash\
**Version history:**\
2.8.0 - added

##### `params[poll][options[]]` {#params-poll-options}

**Description:** The poll options to be used.\
**Type:** Array of String\
**Version history:**\
2.8.0 - added

##### `params[poll][expires_in]` {#params-poll-expires_in}

**Description:** How many seconds the poll should last before closing.\
**Type:** String (cast from integer)\
**Version history:**\
2.8.0 - added

##### `params[poll][multiple]` {#params-poll-multiple}

**Description:** Whether the poll allows multiple choices.\
**Type:** {{<optional>}} Boolean\
**Version history:**\
2.8.0 - added

##### `params[poll][hide_totals]` {#params-poll-hide_totals}

**Description:** Whether the poll should hide total votes until after voting has ended.\
**Type:** {{<optional>}} Boolean\
**Version history:**\
2.8.0 - added

#### `params[media_ids]` {#params-media_ids}

**Description:** IDs of the MediaAttachments that will be attached to the status.\
**Type:** {{<nullable>}} Array of String\
**Version history:**\
2.7.0 - added

#### `params[sensitive]` {#params-sensitive}

**Description:** Whether the status will be marked as sensitive.\
**Type:** {{<nullable>}} Boolean\
**Version history:**\
2.7.0 - added

#### `params[spoiler_text]` {#params-spoiler_text}

**Description:** The text of the content warning or summary for the status.\
**Type:** {{<nullable>}} String\
**Version history:**\
2.7.0 - added

#### `params[visibility]` {#params-visibility}

**Description:** The visibility that the status will have once it is posted.\
**Type:** String (Enumerable oneOf)\
`public` = Visible to everyone, shown in public timelines.\
`unlisted` = Visible to public, but not included in public timelines.\
`private` = Visible to followers only, and to any mentioned users.\
`direct` = Visible only to mentioned users.\
**Version history:**\
2.7.0 - added

#### `params[in_reply_to_id]` {#params-in_reply_to_id}

**Description:** ID of the Status that will be replied to.\
**Type:** {{<nullable>}} Integer\
**Version history:**\
2.7.0 - added

#### `params[language]` {#params-language}

**Description:** The language that will be used for the status.\
**Type:** {{<nullable>}} String (ISO 639-1 two-letter language code)\
**Version history:**\
2.7.0 - added

#### `params[application_id]` {{%deprecated%}} {#params-application_id}

**Description:** Internal ID of the Application that posted the status. Provided for historical compatibility only and can be ignored.\
**Type:** Integer\
**Version history:**\
2.7.0 - added

#### `params[scheduled_at]` {#params-scheduled_at}

**Description:** When the status will be scheduled. This will be null because the status is only scheduled once.\
**Type:** {{<nullable>}} Null\
**Version history:**\
2.7.0 - added

#### `params[idempotency]` {#params-idempotency}

**Description:** Idempotency key to prevent duplicate statuses.\
**Type:** {{<nullable>}} String\
**Version history:**\
2.7.0 - added

#### `params[with_rate_limit]` {#params-with_rate_limit}

**Description:** Whether the status should be rate limited (defaults to true, controls whether to apply status creation rate limit).\
**Type:** Boolean\
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



