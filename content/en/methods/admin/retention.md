---
title: retention API methods
description: Show retention data over time.
menu:
  docs:
    name: retention
    parent: methods-admin
    identifier: methods-admin-retention
aliases: [
  "/methods/admin/retention",
  "/api/methods/admin/retention",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Calculate retention data {#create}

```http
POST /api/v1/admin/retention HTTP/1.1
```

Generate a retention data report for a given time period and bucket.

**Returns:** Array of [Admin::Cohort]({{< relref "entities/Admin_Cohort" >}})\
**OAuth:** User token + `admin:read`\
**Permissions:** View Dashboard\
**Version history:**\
3.5.0 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

##### Form data parameters

start_at
: {{<required>}} String (ISO 8601 Datetime). The start date for the time period. If a time is provided, it will be ignored.

end_at
: {{<required>}} String (ISO 8601 Datetime). The end date for the time period. If a time is provided, it will be ignored.

frequency
: {{<required>}} String (Enumerable oneOf). Specify whether to use `day` or `month` buckets. If any other value is provided, defaults to `day`.

#### Response
##### 200: OK

Monthly retention data for the month of 2022-09, given that 2 users registered during 2022-09 and were active at least once during that month.

```json
[
	{
		"period": "2022-09-01T00:00:00+00:00",
		"frequency": "month",
		"data": [
			{
					"date": "2022-09-01T00:00:00+00:00",
					"rate": 1.0,
					"value": "2"
			}
		]
	}
]
```

Daily retention data for the week between 2022-09-08 and 2022-09-14, given that 2 users registered on 2022-09-08 and 1 of those users stopped being active after 2022-09-09.

```json
[
  {
    "period": "2022-09-08T00:00:00+00:00",
    "frequency": "day",
    "data": [
      {
        "date": "2022-09-08T00:00:00+00:00",
        "rate": 1,
        "value": "2"
      },
      {
        "date": "2022-09-09T00:00:00+00:00",
        "rate": 1,
        "value": "2"
      },
      {
        "date": "2022-09-10T00:00:00+00:00",
        "rate": 0.5,
        "value": "1"
      },
      // ...
      {
        "date": "2022-09-14T00:00:00+00:00",
        "rate": 0.5,
        "value": "1"
      }
    ]
  },
  {
    "period": "2022-09-09T00:00:00+00:00",
    "frequency": "day",
    "data": [
      {
        "date": "2022-09-09T00:00:00+00:00",
        "rate": 0,
        "value": "0"
      },
		// ...
      {
        "date": "2022-09-14T00:00:00+00:00",
        "rate": 0,
        "value": "0"
      }
    ]
  },
  {
    "period": "2022-09-10T00:00:00+00:00",
    "frequency": "day",
    "data": [
      {
        "date": "2022-09-10T00:00:00+00:00",
        "rate": 0,
        "value": "0"
      },
		// ...
      {
        "date": "2022-09-14T00:00:00+00:00",
        "rate": 0,
        "value": "0"
      }
    ]
  },
  // ...
  {
    "period": "2022-09-14T00:00:00+00:00",
    "frequency": "day",
    "data": [
      {
        "date": "2022-09-14T00:00:00+00:00",
        "rate": 0,
        "value": "0"
      }
    ]
  }
]
```

If any of the parameters are missing, cohort calculation will fail and an empty array will be returned.

```json
[]
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/retention_controller.rb" caption="app/controllers/api/v1/admin/retention_controller.rb" >}}