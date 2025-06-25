---
title: retention API 方法
description: 展示对应时段的留存率数据。
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

## 计算留存率数据 {#create}

```http
POST /api/v1/admin/retention HTTP/1.1
```

为给定的时间段和桶生成留存率数据报告。

**返回:** [Admin::Cohort]({{< relref "entities/Admin_Cohort" >}}) 数组\
**OAuth:** 用户令牌 + `admin:read`\
**权限:** 查看管理面板\
**版本历史:**\
3.5.0 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### Form data parameters

start_at
: {{<required>}} ([Datetime](/api/datetime-format#datetime)) 字符串。时间段的开始日期。若提供了时间，则将被忽略。

end_at
: {{<required>}} ([Datetime](/api/datetime-format#datetime)) 字符串。时间段的结束日期。若提供了时间，则将被忽略。

frequency
: {{<required>}} 字符串（枚举值之一）。指定是否使用 `day` 或 `month` 存储桶。若提供任何其他值，则默认为 `day`。

#### 响应
##### 200: OK

2022 年 9 月的每月留存率数据，假设 2 个用户在 2022 年 9 月注册，并且在该月至少活跃一次。

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

2022 年 9 月 8 日至 2022 年 9 月 14 日之间的一周的每日留存率数据，假设 2 个用户在 2022 年 9 月 8 日注册，并且其中 1 个用户在 2022 年 9 月 9 日之后停止活跃。

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

若缺少任何参数，同类组计算将失败并返回一个空数组。

```json
[]
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/retention_controller.rb" caption="app/controllers/api/v1/admin/retention_controller.rb" >}}

{{< translation-status-zh-cn raw_title="retention API methods" raw_link="/methods/admin/retention/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
