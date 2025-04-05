---
title: notifications API 方法
description: 接收关于你的帐户或嘟文的活动的通知。
menu:
  docs:
    weight: 50
    name: notifications
    parent: methods
    identifier: methods-notifications
aliases: [
  "/methods/notifications",
  "/api/methods/notifications",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 获取所有通知 {#get}

```http
GET /api/v1/notifications HTTP/1.1
```

关于用户的通知。此 API 返回包含指向下一页/上一页的链接的 Link 标头。但是，也可以使用查询参数和 `id` 值嘟文构造链接。

要过滤的类型包括：
- `mention` = 有人在他们的嘟文中提到了你
- `status` = 你启用了发嘟通知的账户发布了一条嘟文
- `reblog` = 有人转发了你的一条嘟文
- `follow` = 有人关注了你
- `follow_request` = 有人请求关注你
- `favourite` = 有人喜欢了你的一条嘟文
- `poll` = 你已投票或创建的投票已结束
- `update` = 你转发的嘟文已被编辑
- `admin.sign_up` = 有人注册了 (可以根据具体配置发送给管理员)
- `admin.report` = 已提交新的举报

**返回：** [Notification]({{< relref "entities/Notification" >}}) 数组\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
0.0.0 - 添加\
2.6.0 - 添加 `min_id`\
2.9.0 - 添加 `account_id`\
3.1.0 - 添加 `follow_request` 类型\
3.3.0 - 添加 `status` 类型；现在可以同时使用 `min_id` 和 `max_id`\
3.5.0 - 添加 `types`；添加 `update` 和 `admin.sign_up` 类型\
4.0.0 - 添加 `admin.report` 类型\
4.1.0 - 通知限制从15 （最大30）更改为40 （最大80）\
4.3.0 - 添加 `include_filtered` 参数

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 来获得对本 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。返回的所有结果将小于此 ID。事实上设置了结果的上限。

since_id
: 字符串。返回的所有结果将大于此 ID。事实上设置了结果的下限。

min_id
: 字符串。返回与此 ID 相邻且更新的结果。事实上在此 ID 处设置一个游标并向前分页。

limit
: 整数。要返回的最大结果数。默认为 40 个通知。最多 80 个通知。

types[]
: 字符串数组。要包含在结果中的类型。

exclude_types[]
: 字符串数组。要从结果中排除的类型。

account_id
: 字符串。仅返回从指定帐户收到的通知。

include_filtered
: 布尔值。是否包括被用户的 [NotificationPolicy]({{< relref "entities/NotificationPolicy" >}}) 筛选的通知。默认为 false。

#### 响应

使用 limit=2 的示例调用。

```http
GET https://mastodon.social/api/v1/notifications?limit=2 HTTP/1.1
Authorization: Bearer <user_token>
```

##### 200: OK

响应体包含一页通知。你可以使用 HTTP Link 标头进行进一步分页。

```http
Link: <https://mastodon.example/api/v1/notifications?max_id=34975535>; rel="next", <https://mastodon.example/api/v1/notifications?min_id=34975861>;
```

```json
[
  {
    "id": "34975861",
    "type": "mention",
    "created_at": "2019-11-23T07:49:02.064Z",
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    "status": {
      "id": "103186126728896492",
      "created_at": "2019-11-23T07:49:01.940Z",
      "in_reply_to_id": "103186038209478945",
      "in_reply_to_account_id": "14715",
      // ...
      "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
      // ...
      "account": {
        "id": "971724",
        "username": "zsc",
        "acct": "zsc",
        // ...
      },
      // ...
      "mentions": [
        {
          "id": "14715",
          "username": "trwnh",
          "url": "https://mastodon.social/@trwnh",
          "acct": "trwnh"
        }
      ],
      // ...
    }
  },
  {
    "id": "34975535",
    "type": "favourite",
    "created_at": "2019-11-23T07:29:18.903Z",
    "account": {
      "id": "297420",
      "username": "haskal",
      "acct": "haskal@cybre.space",
      // ...
    },
    "status": {
      "id": "103186046267791694",
      "created_at": "2019-11-23T07:28:34.210Z",
      "in_reply_to_id": "103186044372624124",
      "in_reply_to_account_id": "297420",
      // ...
      "account": {
        "id": "14715",
        "username": "trwnh",
        "acct": "trwnh",
        // ...
      }
    }
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

## 获取单个通知 {#get-one}

```http
GET /api/v1/notifications/:id HTTP/1.1
```

查看有关具有给定 ID 的通知的信息。

**返回：** [Notification]({{< relref "entities/Notification" >}})\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
0.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中通知的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

单个通知

```json
{
  "id": "34975861",
  "type": "mention",
  "created_at": "2019-11-23T07:49:02.064Z",
  "account": {
    "id": "971724",
    "username": "zsc",
    "acct": "zsc",
    // ...
  },
  "status": {
    "id": "103186126728896492",
    "created_at": "2019-11-23T07:49:01.940Z",
    "in_reply_to_id": "103186038209478945",
    "in_reply_to_account_id": "14715",
    // ...
    "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
    // ...
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    // ...
    "mentions": [
      {
        "id": "14715",
        "username": "trwnh",
        "url": "https://mastodon.social/@trwnh",
        "acct": "trwnh"
      }
    ],
    // ...
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

## 忽略所有通知 {#clear}

```http
POST /api/v1/notifications/clear HTTP/1.1
```

从实例清除所有通知。

**返回：** 空\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
0.0.0 - 添加

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

通知已成功清除。

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

---

## 忽略单个通知 {#dismiss}

```http
POST /api/v1/notifications/:id/dismiss HTTP/1.1
```

从实例忽略单个通知。

**返回：** 空\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
1.3.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中通知的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

成功忽略具有给定 ID 的通知

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

---

## 忽略单个通知 {{%removed%}} {#dismiss-deprecated}

```http
POST /api/v1/notifications/dismiss HTTP/1.1
```

从实例忽略单个通知。

**返回：** 空\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
0.0.0 - 可用\
1.3.0 - 弃用，推荐使用 [notifications/:id/dismiss](#dismiss)
3.0.0 - 移除

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 来获得对本 API 方法的访问授权。

##### 表单数据参数
id
: {{<required>}} 字符串。数据库中通知的 ID。

#### 响应

##### 200: OK

成功忽略具有给定 ID 的通知

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

---

## 获取未读通知的数量 {#unread-count}

```http
GET /api/v1/notifications/unread_count HTTP/1.1
```

获取当前用户的未读通知的（上限）数量。
若通知比 [通知已读标记]({{< relref "methods/markers" >}}) 更新，则认为该通知未读。
由于计数取决于参数，因此每次都会计算，因此这是一个相对较慢的操作（尽管比获取完整的相应通知更快），因此返回的通知数量受到限制。

**返回：** 具有单个 `count` 键的哈希\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

##### 查询参数

limit
: 整数。要返回的最大结果数。默认为 100 个通知。最多 1000 个通知。

types[]
: 字符串数组。应计入未读通知的通知类型。

exclude_types[]
: 字符串数组。不应计入未读通知的通知类型。

account_id
: 字符串。仅计算从指定帐户收到的未读通知。

#### 响应

##### 200: OK

响应体包含未读通知的上限计数。

```json
{
  "count": 42,
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

## 获取通知的筛选策略 {#get-policy}

```http
GET /api/v2/notifications/policy HTTP/1.1
```

用户的通知筛选策略。

**返回：** [NotificationPolicy]({{< relref "entities/NotificationPolicy" >}})\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

响应体包含用户当前的通知筛选策略。

```json
{
  "for_not_following": "accept",
  "for_not_followers": "accept",
  "for_new_accounts": "accept",
  "for_private_mentions": "drop",
  "for_limited_accounts": "filter",
  "summary": {
    "pending_requests_count": 0,
    "pending_notifications_count": 0
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

## 更新通知的筛选策略

```http
PATCH /api/v2/notifications/policy HTTP/1.1
```

更新用户的通知筛选策略。

**返回：** [NotificationPolicy]({{< relref "entities/NotificationPolicy" >}})\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

#### 表单数据参数

for_not_following
: 字符串。是 `accept`，`filter` 还是 `drop` 来自用户未关注的帐户的通知。`drop` 将完全阻止通知对象的创建（但不阻止底层活动），`filter` 将导致通知被标记为已过滤，而 `accept` 不会影响其处理。

for_not_followers
: 字符串。是 `accept`，`filter` 还是 `drop` 来自未关注用户的帐户的通知。`drop` 将完全阻止通知对象的创建（但不阻止底层活动），`filter` 将导致通知被标记为已过滤，而 `accept` 不会影响其处理。

for_new_accounts
: 字符串。是 `accept`，`filter` 还是 `drop` 来自过去 30 天内创建的帐户的通知。`drop` 将完全阻止通知对象的创建（但不阻止底层活动），`filter` 将导致通知被标记为已过滤，而 `accept` 不会影响其处理。

for_private_mentions
: 字符串。是 `accept`，`filter` 还是 `drop` 来自私有提及的通知。`drop` 将完全阻止通知对象的创建（但不阻止底层活动），`filter` 将导致通知被标记为已过滤，而 `accept` 不会影响其处理。始终允许回复用户发起的私人提及以及用户关注的帐户，无论此值如何。

for_limited_accounts
: 字符串。是 `accept`，`filter` 还是 `drop` 来自被审核员限制的帐户的通知。`drop` 将完全阻止通知对象的创建（但不阻止底层活动），`filter` 将导致通知被标记为已过滤，而 `accept` 不会影响其处理。


#### 响应

##### 200: OK

响应体包含用户更新后的通知筛选策略。

```json
{
  "filter_not_following": false,
  "filter_not_followers": false,
  "filter_new_accounts": false,
  "filter_private_mentions": true,
  "summary": {
    "pending_requests_count": 0,
    "pending_notifications_count": 0
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

## 获取所有通知请求 {#get-requests}

```http
GET /api/v1/notifications/requests HTTP/1.1
```

被用户的策略过滤的通知的通知请求。此 API 返回包含指向下一页/上一页的链接的 Link 标头。

**返回：** [NotificationRequest]({{< relref "entities/NotificationRequest" >}}) 数组\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。返回的所有结果将小于此 ID。事实上设置了结果的上限。

since_id
: 字符串。返回的所有结果将大于此 ID。事实上设置了结果的下限。

min_id
: 字符串。返回与此 ID 相邻且更新的结果。事实上在此 ID 处设置一个游标并向前分页。

limit
: 整数。要返回的最大结果数。默认为 40 个通知请求。最多 80 个通知请求。

#### 响应

##### 200: OK

响应体包含一页通知请求。你可以使用 HTTP Link 标头进行进一步分页。

```http
Link: <https://mastodon.example/api/v1/notifications/requests?max_id=112456967201894256>; rel="next", <https://mastodon.example/api/v1/notifications/requests?min_id=112456967201894256>; rel="prev"
```

```json
[
  {
    "id": "112456967201894256",
    "created_at": "2024-05-17T14:45:41.171Z",
    "updated_at": "2024-05-17T14:45:41.171Z",
    "notifications_count": "1",
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    "last_status": {
      "id": "103186126728896492",
      "created_at": "2019-11-23T07:49:01.940Z",
      "in_reply_to_id": "103186038209478945",
      "in_reply_to_account_id": "14715",
      // ...
      "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
      // ...
      "account": {
        "id": "971724",
        "username": "zsc",
        "acct": "zsc",
        // ...
      },
      // ...
      "mentions": [
        {
          "id": "14715",
          "username": "trwnh",
          "url": "https://mastodon.social/@trwnh",
          "acct": "trwnh"
        }
      ],
      // ...
    }
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

## 获取单个通知请求 {#get-one-request}

```http
GET /api/v1/notifications/requests/:id HTTP/1.1
```

查看有关具有给定 ID 的通知请求的信息。

**返回：** [NotificationRequest]({{< relref "entities/NotificationRequest" >}})\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中通知的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

单个通知请求。

```json
  {
    "id": "112456967201894256",
    "created_at": "2024-05-17T14:45:41.171Z",
    "updated_at": "2024-05-17T14:45:41.171Z",
    "notifications_count": "1",
    "account": {
      "id": "971724",
      "username": "zsc",
      "acct": "zsc",
      // ...
    },
    "last_status": {
      "id": "103186126728896492",
      "created_at": "2019-11-23T07:49:01.940Z",
      "in_reply_to_id": "103186038209478945",
      "in_reply_to_account_id": "14715",
      // ...
      "content": "<p><span class=\"h-card\"><a href=\"https://mastodon.social/@trwnh\" class=\"u-url mention\">@<span>trwnh</span></a></span> sup!</p>",
      // ...
      "account": {
        "id": "971724",
        "username": "zsc",
        "acct": "zsc",
        // ...
      },
      // ...
      "mentions": [
        {
          "id": "14715",
          "username": "trwnh",
          "url": "https://mastodon.social/@trwnh",
          "acct": "trwnh"
        }
      ],
      // ...
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

## 接受单个通知请求 {#accept-request}

```http
POST /api/v1/notifications/requests/:id/accept HTTP/1.1
```

接受通知请求，这将把来自该用户的已过滤通知合并回主通知，并接受来自他们的所有未来通知。

**返回：** 空\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中通知的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

成功的调用将返回一个空对象。

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

---

## 忽略单个通知请求 {#dismiss-request}

```http
POST /api/v1/notifications/requests/:id/dismiss HTTP/1.1
```

忽略通知请求，这将隐藏对应的通知并不再将其计入待处理通知计数。

**返回：** 空\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中通知的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

成功调用将返回一个空对象。

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

---

## 接受多个通知请求 {#accept-multiple-requests}

```http
POST /api/v1/notifications/requests/accept HTTP/1.1
```

接受多个通知请求，这将把来自这些用户的已过滤通知合并回主通知，并接受来自他们的所有未来通知。

**返回：** 空\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 表单数据参数

":id[]
: {{<required>}} 字符串数组。数据库中通知请求的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

成功的调用将返回一个空对象。

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

---

## 忽略多个通知请求 {#dismiss-multiple-requests}

```http
POST /api/v1/notifications/requests/dismiss HTTP/1.1
```

忽略多个通知请求，这将隐藏对应的通知并不再将其计入待处理通知计数。

**返回：** 空\
**OAuth：** 用户令牌 + `write:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 表单数据参数

:id[]
: {{<required>}} 字符串数组。数据库中通知请求的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

成功调用将返回一个空对象。

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

---

## 检查接受的通知请求是否已合并 {#requests-merged}

```http
GET /api/v1/notifications/requests/merged
```

检查接受的通知请求是否已合并。
接受通知请求后系统将安排一个后台作业，将已过滤的通知合并回正常的通知列表。该过程完成后，客户端应尽快刷新通知列表。这是通过 `notifications_merged` 流事件传达的，但也可以使用此端点进行轮询。

***返回：** 具有单个布尔属性 `merged` 的哈希\
**OAuth：** 用户令牌 + `read:notifications`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user token>` 来获得对本 API 方法的访问授权。

#### 响应

##### 200: OK

成功的调用将返回是否已合并通知并准备好加载。

```json
{
  "merged": false
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

## 另请参考

{{< page-relref ref="methods/push" caption="push API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/notifications_controller.rb" caption="app/controllers/api/v1/notifications_controller.rb" >}}

{{< translation-status-zh-cn raw_title="notifications API methods" raw_link="/methods/notifications/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
