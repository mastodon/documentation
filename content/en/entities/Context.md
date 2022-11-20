---
title: Context
description: Represents the tree around a given status. Used for reconstructing threads of statuses.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/context",
	"/entities/Context",
  "/api/entities/context",
	"/api/entities/Context",
]
---

## Example

```json
{
  "ancestors": [
    {
      "id": "103188938570975982",
      "created_at": "2019-11-23T19:44:00.124Z",
      "in_reply_to_id": null,
      // ...
    },
    {
      "id": "103188971072973252",
      "created_at": "2019-11-23T19:52:23.398Z",
      "in_reply_to_id": "103188938570975982",
      // ...
    },
    {
      "id": "103188982235527758",
      "created_at": "2019-11-23T19:55:08.208Z",
      "in_reply_to_id": "103188971072973252",
      // ...
    }
  ],
  "descendants": [
    {
      "id": "103189026958574542",
      "created_at": "2019-11-23T20:06:36.011Z",
      "in_reply_to_id": "103189005915505698",
      // ...
    }
  ]
}
```

## Attributes

### `ancestors` {#ancestors}

**Description:** Parents in the thread.\
**Type:** Array of [Status]({{< relref "entities/Status" >}})\
**Version history:**\
0.6.0 - added

### `descendants` {#descendants}

**Description:** Children in the thread.\
**Type:** Array of [Status]({{< relref "entities/Status" >}})\
**Version history:**\
0.6.0 - added

## See also

{{< page-relref ref="methods/statuses#context" caption="GET /api/v1/statuses/:id/context" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/context_serializer.rb" caption="app/serializers/rest/context_serializer.rb" >}}