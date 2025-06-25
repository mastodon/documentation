---
title: measures API 方法
description: 获取关于实例的统计指标。
menu:
  docs:
    name: measures
    parent: methods-admin
    identifier: methods-admin-measures
aliases: [
  "/methods/admin/measures",
  "/api/methods/admin/measures",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 获取统计数据 {#get}

```http
POST /api/v1/admin/measures HTTP/1.1
```

获取你的实例的统计数据。

**返回：** [Admin::Measure]({{< relref "entities/Admin_Measure" >}})数组\
**OAuth:** 用户令牌 + `admin:read`\
**权限：** 查看管理面板\
**版本历史：**\
3.5.0 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

keys[]
: {{<required>}} 字符串数组。通过对应的键字符串请求特定类别的统计数据。支持的类别包括：
- `active_users` = 当前时间段内你实例上的活跃用户总数
- `new_users` = 当前时间段内加入你实例的用户数
- `interactions` = 当前时间段内本站嘟文的总互动数（喜欢、转发、回复）
- `opened_reports` = 当前时间段内提交的举报总数
- `resolved_reports` = 当前时间段内已解决的举报总数
- `tag_accounts` = 当前时间段内在至少一条嘟文中使用过话题标签的总帐户数
- `tag_uses` = 当前时间段内使用话题标签的嘟文总数
- `tag_servers` = 当前时间段内使用话题标签的嘟文的外站实例总数
- `instance_accounts` = 当前时间段内来自外站域名的帐户总数
- `instance_media_attachments` = 当前时间段内来自外站域名的媒体附件使用的总空间
- `instance_reports` = 当前时间段内针对来自外站域名的帐户提交的举报总数
- `instance_statuses` = 当前时间段内来自外站域名的嘟文总数
- `instance_follows` = 当前时间段内本站用户关注来自外站域名的帐户总数
- `instance_followers` = 当前时间段内来自外站域名的帐户关注本站帐户总数

start_at
: {{<required>}} ([Datetime](/api/datetime-format#datetime)) 字符串。时间段的开始日期。若提供了时间，将被忽略。

end_at
: {{<required>}} ([Datetime](/api/datetime-format#datetime)) 字符串。时间段的结束日期。若提供了时间，将被忽略。

tag_accounts[id]
: 字符串。当 `tag_accounts` 是请求的键之一时，你必须提供一个话题标签 ID，以获取在给定时间段内有多少帐户在至少一条嘟文中使用了该话题标签的数据。

tag_uses[id]
: 字符串。当 `tag_uses` 是请求的键之一时，你必须提供一个话题标签 ID，以获取在给定时间段内有多少嘟文使用了该话题标签的数据。

tag_servers[id]
: 字符串。当 `tag_servers` 是请求的键之一时，你必须提供一个话题标签 ID，以获取在给定时间段内有多少实例在至少一条嘟文中使用了该话题标签的数据。

instance_accounts[domain]
: 字符串。当 `instance_accounts` 是请求的键之一时，你必须提供一个外站域名，以获取在给定时间段内从该实例发现了多少帐户的数据。

instance_media_attachments[domain]
: 字符串。当 `instance_media_attachments` 是请求的键之一时，你必须提供一个外站域名，以获取在给定时间段内该实例的媒体附件使用了多少空间的数据。

instance_reports[domain]
: 字符串。当 `instance_reports` 是请求的键之一时，你必须提供一个外站域名，以获取在给定时间段内针对该实例的帐户提交了多少举报的数据。

instance_statuses[domain]
: 字符串。当 `instance_statuses` 是请求的键之一时，你必须提供一个外站域名，以获取在给定时间段内有多少嘟文来自该实例的数据。

instance_follows[domain]
: 字符串。当 `instance_follows` 是请求的键之一时，你必须提供一个外站域名，以获取在给定时间段内本站帐户对来自该实例的帐户执行了多少关注的数据。

instance_followers[domain]
: 字符串。当 `instance_followers` 是请求的键之一时，你必须提供一个外站域名，以获取在给定时间段内来自该实例的帐户对本站帐户执行了多少关注的数据。

#### 响应
##### 200: OK

返回每个数据的数量数据，包括聚合数据以及按数据桶划分的数据。

```json
[
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
      // ...
    ]
  },
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
      // ...
    ]
  },
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
      // ...
    ]
  },
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
      // ...
    ]
  },
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
      // ...
    ]
  },
  {
    "key": "tag_accounts",
    "unit": null,
    "total": "1",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00Z",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "tag_uses",
    "unit": null,
    "total": "2",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00Z",
        "value": "0"
      },
      // ...
    ]
  },
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
      // ...
    ]
  },
  {
    "key": "instance_accounts",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
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
      // ...
    ]
  },
  {
    "key": "instance_reports",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "instance_statuses",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "instance_follows",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "instance_followers",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  }
]
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

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/measures_controller.rb" caption="app/controllers/api/v1/admin/measures_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/measure.rb" caption="app/lib/admin/metrics/measure.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/measure/" caption="app/lib/admin/metrics/measure/" >}}

{{< translation-status-zh-cn raw_title="measures API methods" raw_link="/methods/admin/measures/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
