---
title: Admin::Measure
summary: Represents quantitative data about the server.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-measure",
  "/entities/Admin-Measure",
  "/entities/admin_measure",
  "/entities/Admin_Measure",
  "/api/entities/admin-measure",
  "/api/entities/Admin-Measure",
  "/api/entities/admin_measure",
  "/api/entities/Admin_Measure",
]
---

## Attributes

### `key` {#key}

**Description:** The unique keystring for the requested measure.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `unit` {#unit}

**Description:** The units associated with this data item's value, if applicable.\
**Type:** {{<nullable>}} String or null\
**Version history:**\
3.5.0 - added

### `total` {#total}

**Description:** The numeric total associated with the requested measure.\
**Type:** String (cast from integer)\
**Version history:**\
3.5.0 - added

### `human_value` {{%optional%}} {#data-human_value}

**Description:** A human-readable formatted value for this data item.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `previous_total` {{%optional%}} {#previous_total}

**Description:** The numeric total associated with the requested measure, in the previous period. Previous period is calculated by subtracting the start_at and end_at dates, then offsetting both start and end dates backwards by the length of the time period.\
**Type:** String (cast from integer)\
**Version history:**\
3.5.0 - added

### `data` {#data}

**Description:** The data available for the requested measure, split into daily buckets.\
**Type:** Array of Hash\
**Version history:**\
3.5.0 - added

#### `data[][date]` {#data-date}

**Description:** Midnight on the requested day in the time period.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.5.0 - added

#### `data[][value]` {#data-value}

**Description:** The numeric value for the requested measure.\
**Type:** String (cast from integer)\
**Version history:**\
3.5.0 - added

## Examples

### `active_users`

Total active users on your instance within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "active_users",
  "unit": null,
  "total": "2",
  "previous_total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00Z",
      "value": "1"
    },
    {
      "date": "2022-09-18T00:00:00Z",
      "value": "1"
    },
    {
      "date": "2022-09-19T00:00:00Z",
      "value": "1"
    },
    {
      "date": "2022-09-20T00:00:00Z",
      "value": "2"
    },
    {
      "date": "2022-09-21T00:00:00Z",
      "value": "1"
    }
  ]
}
```

### `new_users`

Users who joined your instance within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "new_users",
  "unit": null,
  "total": "2",
  "previous_total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "1"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "1"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

### `interactions`

Total interactions (favourites, boosts, replies) on local statuses within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "interactions",
  "unit": null,
  "total": "0",
  "previous_total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-18T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00Z",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00Z",
      "value": "0"
    }
  ]
}
```

### `opened_reports`

Total reports filed within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
        "key": "opened_reports",
        "unit": null,
        "total": "0",
        "previous_total": "0",
        "data": [
            {
                "date": "2022-09-14T00:00:00.000+00:00",
                "value": "0"
            },
            {
                "date": "2022-09-15T00:00:00.000+00:00",
                "value": "0"
            },
            {
                "date": "2022-09-16T00:00:00.000+00:00",
                "value": "0"
            },
            {
                "date": "2022-09-17T00:00:00.000+00:00",
                "value": "0"
            },
            {
                "date": "2022-09-18T00:00:00.000+00:00",
                "value": "0"
            },
            {
                "date": "2022-09-19T00:00:00.000+00:00",
                "value": "0"
            },
            {
                "date": "2022-09-20T00:00:00.000+00:00",
                "value": "0"
            },
            {
                "date": "2022-09-21T00:00:00.000+00:00",
                "value": "0"
            },
            {
                "date": "2022-09-22T00:00:00.000+00:00",
                "value": "0"
            }
        ]
    }
```

### `resolved_reports`

Total reports resolved within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "resolved_reports",
  "unit": null,
  "total": "0",
  "previous_total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

### `tag_accounts`

Total accounts who used a tag in at least one status within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "tag_accounts",
  "unit": null,
  "total": "1",
  "previous_total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "1"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

### `tag_uses`

Total statuses which used a tag within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "tag_uses",
  "unit": null,
  "total": "2",
  "previous_total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "1"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "1"
    }
  ]
}
```

### `tag_servers`

Total remote origin servers for statuses which used a tag within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "tag_servers",
  "unit": null,
  "total": "0",
  "previous_total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

### `instance_accounts`

Total accounts originating from a remote domain within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "instance_accounts",
  "unit": null,
  "total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

### `instance_media_attachments`

Total space used by media attachments from a remote domain within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "instance_media_attachments",
  "unit": "bytes",
  "total": "0",
  "human_value": "0 Bytes",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": ""
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": ""
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": ""
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": ""
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": ""
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": ""
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": ""
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": ""
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": ""
    }
  ]
}
```

### `instance_reports`
Total reports filed against accounts from a remote domain within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "instance_reports",
  "unit": null,
  "total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

### `instance_statuses`

Total statuses originating from a remote domain within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "instance_statuses",
  "unit": null,
  "total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

### `instance_follows`

Total accounts from a remote domain followed by a local user within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "instance_follows",
  "unit": null,
  "total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

### `instance_followers`

Total local accounts followed by accounts from a remote domain within the time period starting at 2022-09-14 and ending at 2022-09-22

```json
{
  "key": "instance_followers",
  "unit": null,
  "total": "0",
  "data": [
    {
      "date": "2022-09-14T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-15T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-16T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-17T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-18T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-19T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-20T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-21T00:00:00.000+00:00",
      "value": "0"
    },
    {
      "date": "2022-09-22T00:00:00.000+00:00",
      "value": "0"
    }
  ]
}
```

## See also

{{< page-relref ref="methods/admin/dimensions" caption="admin/dimensions API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/measure_serializer.rb" caption="app/serializers/rest/admin/measure_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/measure.rb" caption="app/lib/admin/metrics/measure.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/measure/" caption="app/lib/admin/metrics/measure/" >}}