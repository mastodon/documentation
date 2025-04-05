---
title: markers API 方法
description: 保存和恢复你在时间线中的位置。
menu:
  docs:
    weight: 30
    name: markers
    parent: methods-timelines
    identifier: methods-markers
aliases: [
  "/methods/markers",
  "/api/methods/markers",
  "/methods/timelines/markers",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 获取已保存的时间线位置 {#get}

```http
GET /api/v1/markers HTTP/1.1
```

获取当前在时间线中的位置。

**返回：** 时间线键和其关联的 [Marker]({{< relref "entities/Marker" >}}) 的哈希值\
**OAuth:** 用户令牌 + `read:statuses`\
**版本历史：**\
3.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，内容为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

timeline[]
: 字符串数组。指定应获取 marker 的时间线。可能的值：`home`、`notifications`。若未提供，将返回一个空对象。

#### 响应
##### 200: OK

一个带有 `?timeline[]=home&timeline[]=notifications` 的请求

```json
{
  "notifications": {
    "last_read_id": "35098814",
    "version": 361,
    "updated_at": "2019-11-26T22:37:25.239Z"
  },
  "home": {
    "last_read_id": "103206604258487607",
    "version": 468,
    "updated_at": "2019-11-26T22:37:25.235Z"
  }
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

---

## 保存你在时间线中的位置 {#create}

```http
POST /api/v1/markers HTTP/1.1
```

保存当前在时间线中的位置。

**返回：** [Marker]({{< relref "entities/marker" >}})\
**OAuth:** 用户令牌 + `write:statuses`\
**版本历史：**\
3.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，内容为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

home[last_read_id]
: 字符串。在首页时间线中读取的最后一条嘟文的 ID。

notifications[last_read_id]
: 字符串。读取的最后一条通知的 ID。

#### 响应
##### 200: OK

使用 `home[last_read_id]` 调用此 API 将导致为首页时间线创建一个 marker。

```json
{
  "home": {
    "last_read_id": "103194548672408537",
    "version": 462,
    "updated_at": "2019-11-24T19:39:39.337Z"
  }
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

### 409: Conflict

若在更新时对象已过时，则会发生错误。

```json
{
  "error": "Conflict during update, please try again"
}
```

---

## 另请参阅

{{< page-relref ref="methods/timelines#home" caption="GET /api/v1/timelines/home (带有 `min_id` 或 `since_id` 参数)" >}}

{{< page-relref ref="methods/notifications#get" caption="GET /api/v1/notifications (带有 `min_id` 或 `since_id` 参数)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/markers_controller.rb" caption="app/controllers/api/v1/markers_controller.rb" >}}

{{< translation-status-zh-cn raw_title="markers API methods" raw_link="/methods/markers/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
