---
title: Admin::Cohort
description: 表示一组留存指标。
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

## 示例

以下是 2022 年 9 月的月度留存数据示例，假设有 2 位用户在 2022 年 9 月注册，并在该月至少活跃过一次。

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

以下是 2022 年 9 月 8 日至 2022 年 9 月 14 日这一周的每日留存数据示例，假设有 2 位用户在 2022 年 9 月 8 日注册，其中 1 位用户在 2022 年 9 月 9 日后停止活跃。

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

## 属性

### `period` {#period}

**描述:** 周期开始的时间戳，午夜。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
3.5.0 - 添加

### `frequency` {#frequency}

**描述:** 返回数据的时间段大小。\
**类型:** 字符串 (可枚举 oneOf)\
`day` = 每日\
`month` = 每月\
**版本历史:**\
3.5.0 - 添加

### `data` {#data}

**描述:** 在给定周期内注册的用户的留存数据。\
**类型:** Array of [CohortData](#CohortData)\
**版本历史:**\
3.5.0 - 添加

## CohortData entity attributes {#CohortData}

### `date` {#date}

**描述:** 时间段开始的时间戳，午夜。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
3.5.0 - 添加

### `rate` {#rate}

**描述:** 在指定 `period` 内注册并在给定 `date` 时间段内活跃的用户的百分比。\
**类型:** 数值\
**版本历史:**\
3.5.0 - 添加

### `value` {#value}

**描述:** 在指定的 `period` 内注册并在给定的 `date` 时间段内活跃的用户人数。\
**类型:** 整数\
**版本历史:**\
3.5.0 - 添加

## 另请参考

{{< page-relref ref="methods/admin/retention" caption="admin/retention API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/cohort_serializer.rb" caption="app/serializers/rest/admin/cohort_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::Cohort" raw_link="/entities/Admin_Cohort/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
