---
title: AsyncRefresh
description: Status of an asynchronous refresh.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/AsyncRefresh",
  "/api/entities/AsyncRefresh",
]
---

## Example

```json
{
  "async_refresh": {
    "id": "ImNvbnRleHQ6MTEzNjQwNTczMzAzNzg1MTc4OnJlZnJlc2gi--c526259eb4a1f3ef0d4b91cf8c99bf501330a815",
    "status": "running",
    "result_count": 2
  }
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the async refresh\
**Type:** String\
**Version history:**\
4.4.0 - added

### `status` {#status}

**Description:** Status of the async refresh.\
**Type:** String (Enumerable oneOf)\
`running` = A background job is still running to perform the async refresh, new results could become available\
`finished` = The background job performing this async refresh has finished, no new results can be expected from this job\
**Version history:**\
4.4.0 - added

### `result_count` {#result_count}

**Description:** Optional number of results already created/fetched as part of this async refresh.\
**Type:** {{<nullable>}} integer\
**Version history:**\
4.4.0 - added
