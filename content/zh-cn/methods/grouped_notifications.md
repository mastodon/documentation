---
title: Grouped notifications API 方法
description: 接收关于你的帐户或嘟文活动的已分组通知。
menu:
  docs:
    weight: 50
    name: grouped notifications
    parent: methods
    identifier: methods-grouped-notifications
aliases: [
  "/methods/grouped_notifications",
  "/api/methods/grouped_notifications",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

此页面介绍分组通知，我们在服务端实现了分组通知，以便：
- 分组在各个客户端之间保持一致
- 客户端不会遇到遍历整个页面但未产生任何新组的问题；通知已经在服务端进行了去重

API 的结构与非分组通知略有不同，因为大型通知组通常涉及相同的帐户，并且将帐户移动到根键可以避免大量重复，从而减少服务端的工作量并减轻网络负载。

## 获取所有分组通知 {#get-grouped}

```http
GET /api/v2/notifications HTTP/1.1
```

返回与用户相关的分组通知。此 API 返回包含指向下一页/上一页链接的 Link 标头。但是，链接也可以使用查询参数和 `id` 值嘟文构建。

在相近时间段内发生的类型为 `favourite`、`follow`、`reblog` 或 `admin.sign_up` 且类型和目标相同的通知将由实例赋予相同的 `group_key`，查询此端点将返回聚合通知，每个 `group_key` 只有一个对象。将来可能会对其他通知类型进行分组。客户端应使用 `grouped_types` 参数显式列出其支持显示分组通知的类型。

可筛选的类型包括：
- `mention` = 有人在他们的嘟文中提到了你
- `status` = 你启用了通知的人发布了嘟文
- `reblog` = 有人转发了你的一条嘟文
- `follow` = 有人关注了你
- `follow_request` = 有人请求关注你
- `favourite` = 有人喜欢了你的一条嘟文
- `poll` = 你已投票或创建的投票已结束
- `update` = 你转发的嘟文已被编辑
- `admin.sign_up` = 有人注册了（可以选择发送给管理员）
- `admin.report` = 已提交新举报

**返回：** [GroupedNotificationsResults](#GroupedNotificationsResults)\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加\
4.4.0 - 将 `admin.sign_up` 添加到分组通知类型

#### 请求

##### 标头

Authorization
: {{<required>}} 请提供带有 `Bearer <user token>` 的标头，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。返回的所有结果都将严格早于此通知 ID 的通知。事实上设置了结果的上限。

since_id
: 字符串。返回的所有结果都将严格晚于此通知 ID 的通知。事实上设置了结果的下限。

min_id
: 字符串。返回关于紧接在此通知 ID 之后的新通知的结果。事实上在此 ID 处设置一个游标并向前分页。

limit
: 整数。要返回的最大结果数。默认为 40 个通知组。最多 80 个通知组。

types[]
: 字符串数组。要包含在结果中的类型。

exclude_types[]
: 字符串数组。要从结果中排除的类型。

account_id
: 字符串。仅返回从指定帐户收到的通知。

expand_accounts
: 字符串。`full`（默认）或 `partial_avatars` 之一。当设置为 `partial_avatars` 时，某些帐户将不会在返回的 `accounts` 列表中完整呈现，而是以精简形式在 `partial_accounts` 列表中返回。通知组中最新的帐户始终在 `accounts` 属性中完整呈现。

grouped_types[]
: 字符串数组。限制可以分组的通知类型。若你的客户端不支持对某些通知类型进行分组，请使用此参数。若省略，实例将对它支持的所有类型的通知进行分组（目前为 `favourite`、`follow`、`reblog` 和 `admin.sign_up`）。若你不希望任何通知分组，请改用 [GET `/api/v1/notifications`]({{< relref "methods/notifications#get" >}})。在未提供此参数时会被分组的通知类型下的通知将作为具有唯一 `group_key` 的单个通知组返回，该 `group_key` 可以假定为 `ungrouped-{notification_id}` 的形式。请注意，流式 API 和单个通知 API 均不知晓此参数，并且将始终包含一个“正确的” `group_key`，该 `group_key` 可能与此处返回的内容不同，这意味着你可能必须忽略你不希望分组的通知的 `group_key`，并使用 `ungrouped-{notification_id}` 来保持一致性。

include_filtered
: 布尔值。是否包括用户[NotificationPolicy]({{< relref "entities/NotificationPolicy" >}})筛选的通知。默认为 false。

#### 响应

limit=2 的示例调用。

```http
GET https://mastodon.social/api/v2/notifications?limit=2 HTTP/1.1
Authorization: Bearer xxx
```

##### 200: OK

响应体包含一页分组通知。你可以使用 HTTP Link 标头进行进一步的分页。

```http
Link: <https://mastodon.social/api/v2/notifications?limit=2&max_id=196012>; rel="next", <https://mastodon.social/api/v2/notifications?limit=2&min_id=196014>; rel="prev";
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
GET /api/v2/notifications/:group_key HTTP/1.1
```

查看有关具有给定分组键的特定通知组的信息。

**返回：** [GroupedNotificationsResults](#GroupedNotificationsResults)\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### 请求

##### 路径参数

:group_key
: {{<required>}} 字符串。通知组的分组键。

##### 标头

Authorization
: {{<required>}} 请提供带有 `Bearer <user token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

成功后，返回一个带有单个通知组的 [GroupedNotificationsResults](#GroupedNotificationsResults)。

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

## 消除单个通知组 {#dismiss-group}

```http
POST /api/v2/notifications/:group_key/dismiss HTTP/1.1
```

从实例中消除单个通知组。

**返回：** 空\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### 请求

##### 路径参数

:group_key
: {{<required>}} 字符串。要丢弃的通知的分组键。

##### 标头

Authorization
: {{<required>}} 请提供带有 `Bearer <user token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

在成功请求后，具有给定分组键的通知将被成功消除。

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

## 获取通知组中所有通知的关联帐户 {#get-group-accounts}

```http
GET /api/v2/notifications/:group_key/accounts HTTP/1.1
```

**返回：** [Account]({{< relref "entities/Account" >}})数组\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### 请求

##### 路径参数

:group_key
: {{<required>}} 字符串。要从中获取帐户的通知的分组键。

##### 标头

Authorization
: {{<required>}} 请提供带有 `Bearer <user token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

```json
[
  {
    "id": "16",
    "username": "eve",
    "acct": "eve"
    // …
  },
  {
    "id": "3547",
    "username": "alice",
    "acct": "alice"
    // …
  }
]
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
GET /api/v2/notifications/unread_count HTTP/1.1
```

获取当前用户的未读通知组的（上限）数量。
若通知比[通知读取标记]({{< relref "methods/markers" >}})更新，则认为该通知未读。
由于计数取决于参数，因此每次请求都会重新计算该数值，因此这是一个相对较慢的操作（尽管比获取完整的相应通知更快），因此返回的通知数量受到限制。

**返回：** 带有单个 `count` 键的哈希\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史**:\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user token>` 的标头，以获得对此 API 方法的访问授权。

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
: 字符串数组。限制可以分组的通知类型。若你的客户端不支持对某些通知类型进行分组，请使用此参数。若省略，实例将对它支持的所有类型的通知进行分组（目前为 `favourite`、`follow` 和 `reblog`）。若你不想要任何通知分组，请改用 [GET `/api/v1/notifications/unread_count`]({{< relref "methods/notifications#unread-count" >}})。

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

**描述：** 分组通知引用的帐户。\
**类型：** [Account]({{< relref "entities/Account" >}})数组\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `partial_accounts` {{%optional%}}

**描述：** 分组通知引用的部分帐户。这些仅在使用 `expand_accounts=partial_avatars` 请求分组通知时返回。
**类型：** [PartialAccountWithAvatar](#PartialAccountWithAvatar)数组\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `statuses`

**描述：** 分组通知引用的嘟文。\
**类型：** [Status]({{< relref "entities/Status" >}})数组\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `notification_groups`

**描述：** 分组通知本身。
**类型：** [NotificationGroup](#NotificationGroup)\
**版本历史：**
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

### 示例

TODO

---

## `PartialAccountWithAvatar` 实体 {#PartialAccountWithAvatar}

这些是[Account]({{< relref "entities/Account" >}})的精简版本，仅包含显示头像列表以及其他一些有用的属性所需的内容。目的是减少昂贵的服务端序列化并减小通知组的网络载荷大小。

### 属性

#### `id`

**描述：** 帐户 ID。\
**类型：** 字符串（从整数转换，但不保证是数字）\
**版本历史：**\
4.3.0 - 添加

#### `acct`

**描述：** Webfinger 帐户 URI。对于本站用户，等于 `username`，对于外站用户，等于 `username@domain`。\
**类型：** 字符串\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `url`

**描述：** 用户账户页面的位置。\
**类型：** 字符串 (URL)\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `avatar`

**描述：** 显示在嘟文旁边和账户页中的图像图标。\
**类型：** 字符串 (URL)\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `avatar_static`

**描述：** 头像的静态版本。若其值为静态图像，则等于 `avatar`；若 `avatar` 是动画 GIF，则不同。\
**类型：** 字符串 (URL)\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `locked`

**描述：** 帐户是否手动批准关注请求。\
**类型：** 布尔值\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `bot`

**描述：** 指示该帐户可能执行自动操作，可能未被监控，或被标识为机器人。\
**类型：** 布尔值\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

### 示例

TODO

--

## `NotificationGroup` 实体 {#NotificationGroup}

### 属性

#### `group_key`

**描述：** 标识分组通知的分组键。应视为不透明的值。\
**类型：** 字符串\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `notifications_count`

**描述：** 构成此通知组的单个通知的总数。\
**类型：** 整数\\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `type`

**描述：** 导致此组中通知的事件类型。\
**类型：** 字符串（可枚举的 oneOf）\
`mention` = 有人在他们的嘟文中提到了你\
`status` = 你启用了通知的人发布了嘟文\
`reblog` = 有人转发了你的一条嘟文\
`follow` = 有人关注了你\
`follow_request` = 有人请求关注你\
`favourite` = 有人喜欢了你的一条嘟文\
`poll` = 你已投票或创建的投票已结束\
`update` = 你与之交互的嘟文已被编辑\
`admin.sign_up` = 有人注册了（可以选择发送给管理员）\
`admin.report` = 已提交新举报\
`severed_relationships` = 由于审核或屏蔽事件，你的一些关注关系已被切断\
`moderation_warning` = 管理员已对你的帐户采取措施或向你发送了警告\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `most_recent_notification_id`

**描述：** 组中最新通知的 ID。\
**类型：** 字符串\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `page_min_id` {{%optional%}}

**描述：** 当前页面中表示的此通知组中最旧通知的 ID。仅在分页浏览通知组时返回。在轮询新通知时很有用。\
**类型：** 字符串\
**版本历史：**
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `page_max_id` {{%optional%}}

**描述：** 当前页面中表示的此通知组中最新通知的 ID。仅在分页浏览通知组时返回。在轮询新通知时很有用。\
**类型：** 字符串\
**版本历史：**
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `latest_page_notification_at` {{%optional%}}

**描述：** 当前页面中此通知组中最新通知的创建日期。仅在分页浏览通知组时返回。\
**类型：** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史：**
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `sample_account_ids`

**描述：** 最近触发此通知组中通知的一些帐户的 ID。\
**类型：** 字符串数组\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `status_id` {{%optional%}}

**描述：** 作为通知对象的 [Status]({{< relref "entities/Status" >}})的 ID。当通知的 `type` 为 `favourite`、`reblog`、`status`、`mention`、`poll` 或 `update` 时附加。\
**类型：** 字符串\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `report` {{%optional%}}

**描述：** 作为通知对象的举报。当通知的 `type` 为 `admin.report` 时附加。\
**类型：** [Report]({{< relref "entities/Report" >}})\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `event` {{%optional%}}

**描述：** 导致关注关系被切断的事件的摘要。当通知的 `type` 为 `severed_relationships` 时附加。\
**类型：** [RelationshipSeveranceEvent]({{< relref "entities/RelationshipSeveranceEvent" >}})\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

#### `moderation_warning` {{%optional%}}

**描述：** 导致通知的管理警告。当通知的 `type` 为 `moderation_warning` 时附加。\
**类型：** [AccountWarning]({{< relref "entities/AccountWarning" >}})\
**版本历史：**\
4.3.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 2) - 添加

### 示例

TODO

---

## 另请参阅

{{< page-relref ref="methods/notifications" caption="Individual notification API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/notifications_controller.rb" caption="app/controllers/api/v2/notifications_controller.rb" >}}

{{< translation-status-zh-cn raw_title="Grouped notifications API methods" raw_link="/methods/grouped_notifications/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
