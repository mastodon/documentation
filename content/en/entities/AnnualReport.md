---
title: AnnualReport
description: Represents a summary of a user's activity during a given year.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/annual_report",
  "/entities/AnnualReport",
  "/entities/wrapped_annual_reports",
  "/entities/WrappedAnnualReports",
  "/api/entities/AnnualReport",
  "/api/entities/WrappedAnnualReports",
]
---

## Example

```json
{
    "year": 2025,
    "data": {
    "archetype": "oracle",
    "time_series": [
        {
        "month": 12,
        "statuses": 7123,
        "followers": 48
        }
    ],
    "top_hashtags": [
        {
        "name": "Mastodon",
        "count": 12
        }
    ],
    "top_statuses": {
        "by_reblogs": "114348347829110933",
        "by_replies": null,
        "by_favourites": null
    }
    },
    "schema_version": 2,
    "share_url": "https://example.com/@Foobar/wrapstodon/2025/7fa0231c0f206390",
    "account_id": "55911"
}
```

## Attributes

### `year` {#year}

**Description:** The year this report is from.\
**Type:** Integer\
**Version history:**\
4.3.0 - added

### `data` {#data}

**Description:** The raw data contained in the report. The schema of that data is dependent on the value of `schema_version`.\
**Type:** Hash\
**Version history:**\
4.3.0 - added\
4.6.0 - added schema version 2

#### `data[archetype]` {#data-archetype}

**Description:** Archetype the user corresponds to. This is meant to represent a playful and very coarse overview of the user's posting habits over the year.\
**Type:** String (Enumerable, oneOf)\
`lurker` = TODO\
`booster` = TODO\
`pollster` = TODO\
`replier` = TODO\
`oracle` = TODO\
**Version history:**\
4.3.0 - added

#### `data[type_distribution]` {#date-type_distribution}

**Description:** Provides a breakdown of the user's posts statistics over the year. Only available in schema version 1.\
**Type:** Hash\
**Version history:**\
4.3.0 - added\
4.6.0 - removed in schema version 2

#### `data[top_statuses]` {#data-top_statuses}

**Description:** Provides a breakdown of the user's most-interacted statuses by type of interaction (reblogs, favourites, replies) over the year.\
**Type:** Hash\
**Version history:**\
4.3.0 - added\
4.6.0 - changed in schema version 2 to only include `by_reblogs`, and allow “Quiet public” posts to appear

#### `data[most_used_apps]` {#data-most_used_apps}

**Description:** Provides a breakdown of the apps the user used the most for posting statuses over the year. Only available in schema version 1.\
**Type:** Array of Hash\
**Version history:**\
4.3.0 - added\
4.6.0 - removed in schema version 2

#### `data[commonly_interacted_with_accounts]` {#data-commonly_interacted_with_accounts}

**Description:** Provides a breakdown of the accounts the user have the most frequently replied to over the year. Only available in schema version 1.\
**Type:** Array of Hash\
**Version history:**\
4.3.0 - added\
4.6.0 - removed in schema version 2

#### `data[time_series]` {#data-time_series}

**Description:** Provides a breakdown of new statuses, follows and followers per month.\
**Type:** Array of Hash\
**Version history:**\
4.3.0 - added\
4.6.0 - changed to remove `following` in schema version 2

#### `data[top_hashtags]` {#data-top_hashtags}

**Description:** Provides a breakdown of the user's most frequently used hashtags over the year.\
**Type:** Array of Hash\
**Version history:**\
4.3.0 - added\
4.6.0 - changed to be limited to a single hashtag in schema version 2

#### `data[most_reblogged_accounts]` {#data-most_reblogged_accounts}

**Description:** Provides a breakdown of the accounts the user has reblogged the most over the year. Only available in schema version 1.\
**Type:** Array of Hash\
**Version history:**\
4.3.0 - added\
4.6.0 - removed in schema version 2

#### `data[percentiles]` {#data-percentiles}

**Description:** Which percentile of the most prolific posters on the same server the user is in. Only available in schema version 1.\
**Type:** Float\
**Version history:**\
4.3.0 - added\
4.6.0 - removed in schema version 2

### `schema_version` {#schema_version}

**Description:** The schema version of the report, defines how to interpret `data`.\
**Type:** Integer\
**Version history:**\
4.3.0 - added\
4.6.0 - added schema version 2

### `share_url` {#share_url}

**Description:** An optional link to a shareable version of the report.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.6.0 - added

### `account_id` {#account_id}

**Description:** The account ID the report is about.\
**Type:** String (cast from an integer but not guaranteed to be a number)\
**Version history:**\
4.6.0 - added

## WrappedAnnualReports entity {#WrappedAnnualReports}

One or more [AnnualReport]({{< relref "entities/AnnualReport" >}}) wrapped in an object with relevant [Account]({{< relref "entities/Account" >}}) and [Status]({{< relref "entities/Status" >}}) entities.

### Example

```json
{
  "annual_reports": [
    {
      "year": 2025,
      "data": {
        "archetype": "oracle",
        "time_series": [
          {
            "month": 12,
            "statuses": 7123,
            "followers": 48
          }
        ],
        "top_hashtags": [
          {
            "name": "Mastodon",
            "count": 12
          }
        ],
        "top_statuses": {
          "by_reblogs": "114348347829110933",
          "by_replies": null,
          "by_favourites": null
        }
      },
      "schema_version": 2,
      "share_url": "https://example.com/@Foobar/wrapstodon/2025/7fa0231c0f206390",
      "account_id": "55911"
    }
  ],
  "accounts": [
    /* Relevant Account entities */
  ],
  "statuses": [
    /* Relevant Status entities */
  ]
}
```

### `annual_reports`

**Description:** Full AnnualReport entities for the reports.\
**Type:** Array of [AnnualReport]({{< relref "entities/AnnualReport" >}})\
**Version history:**\
4.3.0 - added

### `accounts`

**Description:** Full Account entities for the accounts mentioned in the reports.\
**Type:** Array of [Account]({{< relref "entities/Account" >}})\
**Version history:**\
4.3.0 - added

### `statuses`

**Description:** Full Status entities for the statuses mentioned in the reports.\
**Type:** Array of [Status]({{< relref "entities/Status" >}})\
**Version history:**\
4.3.0 - added

## See also

{{< page-relref ref="methods/annual_reports" caption="Annual reports API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/annual_report_serializer.rb" caption="app/serializers/rest/annual_report_serializer.rb" >}}
