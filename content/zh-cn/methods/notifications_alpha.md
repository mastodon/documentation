---
title: notifications API 方法 (Alpha)
description: 接收关于你的帐户或嘟文活动的通知。
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

{{< hint style="warning" >}}
此页面记录了实验性的 API 端点，仅供历史参考。若你想在客户端中实现分组通知功能，请参阅[最终版本]({{< relref "methods/grouped_notifications" >}})。
{{</ hint >}}

本页介绍分组通知，我们已在服务端实现该功能，以便：
- 使跨客户端分组保持一致
- 客户端不会遇到浏览整个页面却没有产生任何新组的问题；相反，通知已经在服务端进行了去重

API 的结构与非分组通知略有不同，因为大型通知组通常涉及相同的帐户，将帐户移动到根键可以避免大量重复，从而减少服务端的工作量和网络负载。

## 获取所有分组通知 {#get-grouped}

```http
GET /api/v2_alpha/notifications HTTP/1.1
```

返回与用户相关的分组通知。此 API 返回包含指向下一页/上一页链接的 Link 标头。但是，链接也可以使用查询参数和 `id` 值嘟文构建。

在相似的时间段内，类型和目标相同，且类型为 `favourite` 或 `reblog` 的通知会被实例赋予相同的 `group_key`，查询此端点将返回聚合的通知，每个 `group_key` 只有一个对象。其他通知类型（如 `follow`）将来可能会被分组。

要筛选的类型包括：
- `mention` = 有人在其嘟文中提到了你
- `status` = 你启用了通知的人发布了嘟文
- `reblog` = 有人转发了你的某条嘟文
- `follow` = 有人关注了你
- `follow_request` = 有人请求关注你
- `favourite` = 有人喜欢了你的某条嘟文
- `poll` = 你投票或创建的投票已结束
- `update` = 你转发的嘟文已被编辑
- `admin.sign_up` = 有人注册了（可根据具体配置发送给管理员）
- `admin.report` = 已提交新的举报

**返回：** [GroupedNotificationsResults](#GroupedNotificationsResults)\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
4.3.0-beta.1 - 添加\
4.3.0-beta.2 - 弃用

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。返回的所有结果都将是关于严格早于此通知 ID 的通知。事实上设置结果的上限。

since_id
: 字符串。返回的所有结果都将是关于严格晚于此通知 ID 的通知。事实上设置结果的下限。

min_id
: 字符串。返回关于紧邻在此通知 ID 之后的新通知的结果。事实上在此 ID 处设置一个游标并向前分页。

limit
: 整数。要返回的最大结果数。默认为 40 个通知。最多 80 个通知组。

types[]
: 字符串数组。要包含在结果中的类型。

exclude_types[]
: 字符串数组。要从结果中排除的类型。

account_id
: 字符串。仅返回从指定帐户收到的通知。

expand_accounts
: 字符串。`full`（默认）或 `partial_avatars` 之一。设置为 `partial_avatars` 时，某些帐户将不会在返回的 `accounts` 列表中完整呈现，而是以精简形式在 `partial_accounts` 列表中返回。通知组中最新的帐户始终在 `accounts` 属性中完整呈现。

grouped_types[]
: 字符串数组。限制可以分组的通知类型。若你的客户端不支持某些通知类型分组，请使用此选项。若省略，实例将对它支持的所有类型的通知（目前，`favourite` 和 `reblog`）进行分组。若你不希望进行任何通知分组，请改用 [GET `/api/v1/notifications`]({{< relref "methods/notifications#get" >}})。

#### 响应

使用 limit=2 的示例调用。

```http
GET https://mastodon.social/api/v2_alpha/notifications?limit=2 HTTP/1.1
Authorization: Bearer xxx
```

##### 200: OK

响应体包含一页分组通知。你可以使用 HTTP Link 标头进行进一步的分页。

```http
Link: <https://mastodon.social/api/v2_alpha/notifications?limit=2&max_id=196012>; rel="next", <https://mastodon.social/api/v2_alpha/notifications?limit=2&min_id=196014>; rel="prev";
```

```json
{
  "accounts": [
    {
      "id": "16",
      "username": "eve",
      "acct": "eve",
      // …
    },
    {
      "id": "3547",
      "username": "alice",
      "acct": "alice",
      // …
    },
    {
      "id": "31460",
      "username": "bob",
      "acct": "bob",
      // …
    },
    {
      "id": "36509",
      "username": "mallory",
      "acct": "mallory",
      // …
    }
  ],
  "statuses": [
    {
      "id": "113010503322889311",
      "created_at": "2024-08-23T08:57:12.057Z",
      "account": {
        "id": "55911",
        "username": "user",
        "acct": "user",
        // …
      },
      // …
    },
    {
      "id": "113006771938929950",
      "created_at": "2024-08-22T17:08:15.654Z",
      "account": {
        "id": "55911",
        "username": "user",
        "acct": "user",
        // …
      },
      // …
    }
  ],
  "notification_groups": [
    {
      "group_key": "favourite-113010503322889311-479000",
      "notifications_count": 2,
      "type": "favourite",
      "most_recent_notification_id": 196014,
      "page_min_id": "196013",
      "page_max_id": "196014",
      "latest_page_notification_at": "2024-08-23T08:59:56.743Z",
      "sample_account_ids": [
        "16",
        "3547"
      ],
      "status_id": "113010503322889311"
    },
    {
      "group_key": "favourite-113006771938929950-478999",
      "notifications_count": 2,
      "type": "favourite",
      "most_recent_notification_id": 196012,
      "page_min_id": "196012",
      "page_max_id": "196012",
      "latest_page_notification_at": "2024-08-23T08:16:32.112Z",
      "sample_account_ids": [
        "31460",
        "36509"
      ],
      "status_id": "113006771938929950"
    }
  ]
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## 获取单个通知组 {#get-notification-group}

```http
GET /api/v2_alpha/notifications/:group_key HTTP/1.1
```

查看有关具有给定分组键的特定通知组的信息。

**返回：** [GroupedNotificationsResults](#GroupedNotificationsResults)
**OAuth：** 用户令牌 + `read:notifications`
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### 请求

##### 路径参数

:group_key
: {{<required>}} 字符串。通知组的分组键。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user token>`，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

成功时，返回一个带有单个通知组的 [GroupedNotificationsResults](#GroupedNotificationsResults)。

```json
{
  "accounts": [
    {
      "id": "16",
      "username": "eve",
      "acct": "eve",
      // …
    },
    {
      "id": "3547",
      "username": "alice",
      "acct": "alice",
      // …
    }
  ],
  "statuses": [
    {
      "id": "113010503322889311",
      "created_at": "2024-08-23T08:57:12.057Z",
      "account": {
        "id": "55911",
        "username": "user",
        "acct": "user",
        // …
      },
      // …
    }
  ],
  "notification_groups": [
    {
      "group_key": "favourite-113010503322889311-479000",
      "notifications_count": 2,
      "type": "favourite",
      "most_recent_notification_id": 196014,
      "sample_account_ids": [
        "16",
        "3547"
      ],
      "status_id": "113010503322889311"
    }
  ]
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## 忽略单个通知组 {#dismiss-group}

```http
POST /api/v2_alpha/notifications/:group_key/dismiss HTTP/1.1
```

忽略单个通知组。

**返回：** 空
**OAuth：** 用户令牌 + `write:notifications`
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### 请求

##### 路径参数

:group_key
: {{<required>}} 字符串。要丢弃的通知的分组键。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user token>`，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

成功请求后，具有给定分组键的通知将被成功忽略。

```json
{}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## 获取未读通知的数量 {#unread-group-count}

```http
GET /api/v2_alpha/notifications/unread_count HTTP/1.1
```

获取当前用户的（上限）未读通知组的数量。
若通知比[通知读取标记]({{< relref "methods/markers" >}})更新，则认为该通知未读。
由于计数取决于具体参数，因此每次请求都会重新计算，因此这是一个相对较慢的操作（尽管比获取完整的相应通知更快），因此返回的通知数量受到限制。

**返回：** 具有单个 `count` 键的哈希
**OAuth：** 用户令牌 + `read:notifications`
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user token>`，以获得对此 API 方法的访问授权。

##### 查询参数

limit
: 整数。要返回的最大结果数。默认为 100 个通知。最多 1000 个通知。

types[]
: 字符串数组。应计入未读通知的通知类型。

exclude_types[]
: 字符串数组。不应计入未读通知的通知类型。

account_id
: 字符串。仅计算从指定帐户收到的未读通知。

grouped_types[]
: 字符串数组。限制可以分组的通知类型。若你的客户端不支持某些通知类型分组，请使用此选项。若省略，实例将对它支持的所有类型的通知（目前支持 `favourite` 和 `reblog`）进行分组。若你不希望进行任何通知分组，请改用 [GET `/api/v1/notifications/unread_count`]({{< relref "methods/notifications#unread-count" >}})。

#### 响应

##### 200: OK

响应体包含未读通知的上限计数。

```json
{
  "count": 42,
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## `GroupedNotificationsResults` 实体 {#GroupedNotificationsResults}

### 属性

#### `accounts`

**描述：** 分组通知引用的帐户。
**类型：** [Account]({{< relref "entities/Account" >}}) 数组
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `partial_accounts` {{%optional%}}

**描述：** 分组通知引用的部分帐户。仅在请求带有 `expand_accounts=partial_avatars` 的分组通知时返回。
**类型：** [PartialAccountWithAvatar](#PartialAccountWithAvatar) 数组
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `statuses`

**描述：** 分组通知引用的嘟文。
**类型：** [Status]({{< relref "entities/Status" >}}) 数组
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `notification_groups`

**描述：** 分组通知本身。
**类型：** [NotificationGroup](#NotificationGroup)
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

### 示例

TODO

---

## `PartialAccountWithAvatar` 实体 {#PartialAccountWithAvatar}

这些是 [Account]({{< relref "entities/Account" >}})  的精简版本，仅包含显示头像列表以及其他一些有用的属性所需的内容。构造此实体旨在减少昂贵的服务端序列化，并减小通知组的网络负载大小。

### 属性

#### `id`

**描述：** 帐户 ID。
**类型：** 字符串（从整数转换而来，但不保证是数字）
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `acct`

**描述：** Webfinger 帐户 URI。对于本站用户，等于 `username`，对于外站用户，等于 `username@domain`。
**类型：** 字符串
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `url`

**描述：** 用户个人资料页面的位置。
**类型：** 字符串 (URL)
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `avatar`

**描述：** 显示在嘟文旁边和个人资料中的图像图标。
**类型：** 字符串 (URL)
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `avatar_static`

**描述：** 头像的静态版本。若其值为静态图像，则等于 `avatar`；若 `avatar` 是动画 GIF，则不同。
**类型：** 字符串 (URL)
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `locked`

**描述：** 该帐户是否手动批准关注请求。
**类型：** 布尔值
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `bot`

**描述：** 指示该帐户可能执行自动化操作，可能未被监控，或标识为机器人。
**类型：** 布尔值
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

### 示例

TODO

--

## `NotificationGroup` 实体 {#NotificationGroup}

### 属性

#### `group_key`

**描述：** 标识分组通知的分组键。应将其视为不透明值。
**类型：** 字符串
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `notifications_count`

**描述：** 作为此通知组一部分的个人通知总数。
**类型：** 整数
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `type`

**描述：** 导致此通知组中通知的事件类型。
**类型：** 字符串 (可枚举 oneOf)
`mention` = 有人在其嘟文中提到了你
`status` = 你启用了通知的人发布了嘟文
`reblog` = 有人转发了你的某条嘟文
`follow` = 有人关注了你
`follow_request` = 有人请求关注你
`favourite` = 有人喜欢了你的某条嘟文
`poll` = 你投票或创建的投票已结束
`update` = 你与之交互的嘟文已被编辑
`admin.sign_up` = 有人注册了（可根据具体配置发送给管理员）
`admin.report` = 已提交新的举报
`severed_relationships` = 由于管理或屏蔽事件，你的一些关注关系已被切断
`moderation_warning` = 审核员已对你的帐户采取行动或向你发送了警告
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `most_recent_notification_id`

**描述：** 通知组中最新通知的 ID。
**类型：** 字符串
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `page_min_id` {{%optional%}}

**描述：** 当前页面中表示的此通知组中最旧通知的 ID。这仅在分页浏览通知组时返回。在轮询新通知时很有用。
**类型：** 字符串
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `page_max_id` {{%optional%}}

**描述：** 当前页面中表示的此通知组中最新通知的 ID。这仅在分页浏览通知组时返回。在轮询新通知时很有用。
**类型：** 字符串
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `latest_page_notification_at` {{%optional%}}

**描述：** 在当前页面中，此通知组中最新通知的创建日期。这仅在分页浏览通知组时返回。
**类型：** ([Datetime](/api/datetime-format#datetime)) 字符串
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `sample_account_ids`

**描述：** 最近触发此通知组中通知的某些帐户的 ID。
**类型：** 字符串数组
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `status_id` {{%optional%}}

**描述：** 作为通知对象的 [Status]({{< relref "entities/Status" >}}) 的 ID。当通知的 `type` 为 `favourite`、`reblog`、`status`、`mention`、`poll` 或 `update` 时附加。
**类型：** 字符串
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `report` {{%optional%}}

**描述：** 作为通知对象的举报。当通知的 `type` 为 `admin.report` 时附加。
**类型：** [Report]({{< relref "entities/Report" >}})
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `event` {{%optional%}}

**描述：** 导致关注关系断开的事件摘要。当通知的 `type` 为 `severed_relationships` 时附加。
**类型：** [RelationshipSeveranceEvent]({{< relref "entities/RelationshipSeveranceEvent" >}})
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

#### `moderation_warning` {{%optional%}}

**描述：** 导致通知的管理警告。当通知的 `type` 为 `moderation_warning` 时附加。
**类型：** [AccountWarning]({{< relref "entities/AccountWarning" >}})
**版本历史：**
4.3.0-beta.1 - 添加
4.3.0-beta.2 - 弃用

### 示例

TODO

---

## 另请参考

{{< page-relref ref="methods/grouped_notifications" caption="分组通知 API 方法的最终版本" >}}

{{< page-relref ref="methods/notifications" caption="单个通知 API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2_alpha/notifications_controller.rb" caption="app/controllers/api/v2_alpha/notifications_controller.rb" >}}

{{< translation-status-zh-cn raw_title="notifications API alpha methods" raw_link="/methods/notifications_alpha/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
