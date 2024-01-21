---
title: Admin::Cohort
description: Represents a retention metric.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-cohort",
  "/entities/Admin-Cohort",
  "/entities/admin_cohort",
  "/entities/Admin_Cohort",
  "/api/entities/admin-cohort",
  "/api/entities/Admin-Cohort",
  "/api/entities/admin_cohort",
  "/api/entities/Admin_Cohort",
]
---

## Example

Monthly retention data for the month of 2022-09, given that 2 users registered during 2022-09 and were active at least once during that month.

```json
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
```

Daily retention data for the week between 2022-09-08 and 2022-09-14, given that 2 users registered on 2022-09-08 and 1 of those users stopped being active after 2022-09-09.

```json
{
	"period": "2022-09-08T00:00:00+00:00",
	"frequency": "day",
	"data": [
		{
			"date": "2022-09-08T00:00:00+00:00",
			"rate": 1.0,
			"value": "2"
		},
		{
			"date": "2022-09-09T00:00:00+00:00",
			"rate": 1.0,
			"value": "2"
		},
		{
			"date": "2022-09-10T00:00:00+00:00",
			"rate": 0.5,
			"value": "1"
		},
		{
			"date": "2022-09-11T00:00:00+00:00",
			"rate": 0.5,
			"value": "1"
		},
		{
			"date": "2022-09-12T00:00:00+00:00",
			"rate": 0.5,
			"value": "1"
		},
		{
			"date": "2022-09-13T00:00:00+00:00",
			"rate": 0.5,
			"value": "1"
		},
		{
			"date": "2022-09-14T00:00:00+00:00",
			"rate": 0.5,
			"value": "1"
		}
	]
}
```

## Attributes

### `period` {#period}

**Description:** The timestamp for the start of the period, at midnight.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.5.0 - added

### `frequency` {#frequency}

**Description:** The size of the bucket for the returned data.\
**Type:** String (Enumerable oneOf)\
`day` = Daily buckets\
`month` = Monthly buckets\
**Version history:**\
3.5.0 - added

### `data` {#data}

**Description:** Retention data for users who registered during the given period.\
**Type:** Array of [CohortData](#CohortData)\
**Version history:**\
3.5.0 - added

## CohortData entity attributes {#CohortData}

### `date` {#date}

**Description:** The timestamp for the start of the bucket, at midnight.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.5.0 - added

### `rate` {#rate}

**Description:** The percentage rate of users who registered in the specified `period` and were active for the given `date` bucket.\
**Type:** Number\
**Version history:**\
3.5.0 - added

### `value` {#value}

**Description:** How many users registered in the specified `period` and were active for the given `date` bucket.\
**Type:** Integer\
**Version history:**\
3.5.0 - added

## See also

{{< page-relref ref="methods/admin/retention" caption="admin/retention API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/cohort_serializer.rb" caption="app/serializers/rest/admin/cohort_serializer.rb" >}}
