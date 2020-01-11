---
title: ScheduledStatus
description: Represents a status that will be published at a future scheduled date.
menu:
  docs:
    parent: entities
---

{{< hint style="warning" >}}
This page is currently under construction.
{{< /hint >}}

## Example

```javascript
{
  "id": "3221",
  "scheduled_at": "2019-12-05T12:33:01.000Z",
  "params": {
    "text": "test content",
    "media_ids": null,
    "sensitive": null,
    "spoiler_text": null,
    "visibility": null,
    "scheduled_at": null,
    "poll": null,
    "idempotency": null,
    "in_reply_to_id": null,
    "application_id": 596551
  },
  "media_attachments": []
}
```

## Required attributes

### id {#id}

**Description:** ID of the scheduled status in the database.\
**Type:** String \(cast from an integer but not guaranteed to be a number\)\
**Version history:** Added in 2.7.0

### scheduled\_at

**Description:** ID of the status in the database.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:** Added in 2.7.0

### params

#### params\[text\]

#### params\[visibility\]

#### params\[application\_id\]

### media\_attachments

## Optional attributes

### params

#### in\_reply\_to\_id

#### media\_ids

#### sensitive

#### spoiler\_text

#### scheduled\_at

## ScheduledStatus {#scheduledstatus}

| Attribute | Type | Nullable | Added in |
| :--- | :--- | :--- | :--- |
| `id` | String | No | 2.7.0 |
| `scheduled_at` | String \(Datetime\) | No | 2.7.0 |
| `params` | [StatusParams]() | No | 2.7.0 |
| `media_attachments` | Array of [Attachment]() | No | 2.7.0 |

### StatusParams {#statusparams}

| Attribute | Type | Nullable | Added in |
| :--- | :--- | :--- | :--- |
| `text` | String | No | 2.7.0 |
| `in_reply_to_id` | String |  | 2.7.0 |
| `media_ids` | Array of String |  | 2.7.0 |
| `sensitive` | Boolean |  | 2.7.0 |
| `spoiler_text` | String |  | 2.7.0 |
| `visibility` | [String \(Enum\)]() | No | 2.7.0 |
| `scheduled_at` | String \(Datetime\) |  | 2.7.0 |
| `application_id` | String | No | 2.7.0 |

## See also

{{< page-ref page="methods/statuses/scheduled_statuses.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/scheduled_status_serializer.rb" caption="app/serializers/rest/scheduled\_status\_serializer.rb" >}}



