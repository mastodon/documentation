---
title: scheduled_statuses API 方法
description: 管理计划在未来日期发布的嘟文。
menu:
  docs:
    weight: 30
    name: scheduled_statuses
    parent: methods-statuses
    identifier: methods-scheduled_statuses
aliases: [
  "/methods/scheduled_statuses",
  "/api/methods/scheduled_statuses",
  "/methods/statuses/scheduled_statuses",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看定时嘟文 {#get}

```http
GET /api/v1/scheduled_statuses HTTP/1.1
```

**返回：** [ScheduledStatus]({{< relref "entities/scheduledstatus" >}}) 数组\
**OAuth：** 用户令牌 + `read:statuses`\
**版本历史：**\
2.7.0 - 添加\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，并附带 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。返回的所有结果都将小于此 ID。 事实上设置了结果的上限。

since_id
: 字符串。返回的所有结果都将大于此 ID。 事实上设置了结果的下限。

min_id
: 字符串。返回与此 ID 相邻且更新的结果。事实上在此 ID 处设置一个游标并向前分页。

limit
: 整数。要返回的最大结果数。默认为 20 个嘟文。最多允许 40 个嘟文。

#### 响应
##### 200: OK

```json
[
  {
    "id": "3221",
    "scheduled_at": "2019-12-05T12:33:01.000Z",
    "params": {
      "poll": null,
      "text": "test content",
      "media_ids": null,
      "sensitive": null,
      "visibility": null,
      "idempotency": null,
      "scheduled_at": null,
      "spoiler_text": null,
      "application_id": 596551,
      "in_reply_to_id": null
    },
    "media_attachments": []
  }
]
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

---

## 查看单条定时嘟文 {#get-one}

```http
GET /api/v1/scheduled_statuses/:id HTTP/1.1
```

**返回：** [ScheduledStatus]({{< relref "entities/scheduledstatus" >}})\
**OAuth：** 用户令牌 + `read:statuses`\
**版本历史：**\
2.7.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 ScheduledStatus 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，并附带 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "3221",
  "scheduled_at": "2019-12-05T12:33:01.000Z",
  "params": {
    "poll": null,
    "text": "test content",
    "media_ids": null,
    "sensitive": null,
    "visibility": null,
    "idempotency": null,
    "scheduled_at": null,
    "spoiler_text": null,
    "application_id": 596551,
    "in_reply_to_id": null
  },
  "media_attachments": []
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

该 ScheduledStatus 不属于你或不存在

```json
{
  "error": "Record not found"
}
```

---

## 更新定时嘟文的发布时间 {#update}

```http
PUT /api/v1/scheduled_statuses/:id HTTP/1.1
```

**返回：** [ScheduledStatus]({{< relref "entities/scheduledstatus" >}})\
**OAuth：** 用户令牌 + `write:statuses`\
**版本历史：**\
2.7.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 ScheduledStatus 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，并附带 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

scheduled_at
: 字符串。嘟文将要发布的 [DateTime](/api/datetime-format#datetime)。必须至少在未来 5 分钟之后。

#### 响应
##### 200: OK

```json
{
  "id": "3221",
  "scheduled_at": "2019-12-05T13:33:01.000Z",
  "params": {
    "poll": null,
    "text": "test content",
    "media_ids": null,
    "sensitive": null,
    "visibility": null,
    "idempotency": null,
    "scheduled_at": null,
    "spoiler_text": null,
    "application_id": 596551,
    "in_reply_to_id": null
  },
  "media_attachments": []
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

ScheduledStatus 不属于你或不存在

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Scheduled at The scheduled date must be in the future"
}
```

---

## 撤销定时嘟文 {#cancel}

```http
DELETE /api/v1/scheduled_statuses/:id HTTP/1.1
```

**返回：** 空\
**OAuth：** 用户令牌 + `write:statuses`\
**版本历史：**\
2.7.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 ScheduledStatus 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，并附带 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

该 ScheduledStatus 不属于你或不存在

```json
{
  "error": "Record not found"
}
```

---

## 另请参阅

{{< page-relref ref="methods/statuses#create" caption="POST /api/v1/statuses (`scheduled_at` 参数)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/scheduled_statuses_controller.rb" caption="app/controllers/api/v1/scheduled_statuses_controller.rb" >}}

{{< translation-status-zh-cn raw_title="scheduled_statuses API methods" raw_link="/methods/scheduled_statuses/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
