---
title: Annual reports (Wrapstodon) API
description: Generate and fetch Wrapstodon reports
menu:
  docs:
    name: Annual reports
    parent: methods
    identifier: methods-annual-reports
aliases: [
  "/methods/annual_reports",
  "/api/methods/annual_reports",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

This page is about Annual Reports, also called “Wrapstodon” in the user interface.
This is an optional feature that, if enabled by the server administrator, offers users to consolidate what is currently stored of their yearly activity into a report that can be shared.
The feature is offered between the 10th and 31st December of every year to users with sufficient activity.

## Get all annual reports {#index}

```http
GET /api/v1/annual_reports HTTP/1.1
```

Returns all of the current user's generated annual reports, if any.

**Returns:** [WrappedAnnualReports]({{< relref "entities/AnnualReport#WrappedAnnualReports" >}})\
**OAuth:** User token + `read:accounts`\
**Version history:**\
4.3.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

A [WrappedAnnualReports]({{< relref "entities/AnnualReport#WrappedAnnualReports" >}}) with all generated reports for the current user.

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
    },
    {
      "year": 2026,
      "data": {
        "archetype": "oracle",
        "time_series": [
          {
            "month": 12,
            "statuses": 6241,
            "followers": 42
          }
        ],
        "top_hashtags": [
          {
            "name": "Cats",
            "count": 13
          }
        ],
        "top_statuses": {
          "by_reblogs": "116680004222523313",
          "by_replies": null,
          "by_favourites": null
        }
      },
      "schema_version": 2,
      "share_url": "https://example.com/@Foobar/wrapstodon/2026/dd6a5b58ec0e3c12",
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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

## Get a single annual report {#get}

```http
GET /api/v1/annual_reports/:year HTTP/1.1
```

Returns the current user's generated annual report for the given year, if it exists.

**Returns:** [WrappedAnnualReports]({{< relref "entities/AnnualReport#WrappedAnnualReports" >}})\
**OAuth:** User token + `read:accounts`\
**Version history:**\
4.4.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Path parameters

:year
: {{<required>}} String. The year for the annual report.

#### Response

##### 200: OK

A [WrappedAnnualReports]({{< relref "entities/AnnualReport#WrappedAnnualReports" >}}) with a single report, corresponding to the requested year.

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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

The current user has no generated report for the requested year.

## Get the state of an annual report {#get-state}

```http
GET /api/v1/annual_reports/:year/state HTTP/1.1
```

Returns the state of the annual report for the current user and given year.

**Returns:** Hash with a single `state` key with a value of String (Enumerable, oneOf `available`, `generating`, `eligible`, or `ineligible`)\
**OAuth:** User token + `read:accounts`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 8) - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Path parameters

:year
: {{<required>}} String. The year for the annual report.

#### Response

##### 200: OK

A [WrappedAnnualReports]({{< relref "entities/AnnualReport#WrappedAnnualReports" >}}) with a single report, corresponding to the requested year.

```json
{
  "state": "available"
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

## Mark an annual report as read {#read}

```http
POST /api/v1/annual_reports/:year/read HTTP/1.1
```

Marks the user's generated annual report for the given year as read.

**Returns:** Empty\
**OAuth:** User token + `write:accounts`\
**Version history:**\
4.3.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Path parameters

:year
: {{<required>}} String. The year for the annual report.

#### Response

##### 200: OK

The annual report has successfully been marked as read.

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

The current user has no generated report for the specified year.

## Generate a new annual report {generate}

```http
POST /api/v1/annual_reports/:year/generate HTTP/1.1
```

Generate the user's annual report for the specified year.

**Returns:** Empty\
**OAuth:** User token + `write:accounts`\
**Version history:**\
4.6.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 8) - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Path parameters

:year
: {{<required>}} String. The year for the annual report.

#### Response

##### 200: OK

The requested annual report is either already generated or ineligible for generation.

##### 202: Accepted

The requested annual report is currently generating.

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/annual_reports_controller.rb" caption="app/controllers/api/v1/annual_reports_controller.rb" >}}
