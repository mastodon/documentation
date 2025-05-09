---
title: statuses API 方法
description: 发布、互动和查看有关嘟文的信息。
menu:
  docs:
    weight: 30
    name: statuses
    parent: methods
    identifier: methods-statuses
aliases: [
  "/methods/statuses",
  "/api/methods/statuses",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 发布新嘟文 {#create}

```http
POST /api/v1/statuses HTTP/1.1
```

使用给定的参数发布嘟文。

**返回：** [Status]({{<relref "entities/status">}})。当存在 `scheduled_at` 时，返回 [ScheduledStatus]({{<relref "entities/scheduledstatus">}}) 。\
**OAuth:** 用户 + `write:statuses`\
**版本历史：**\
0.0.0 - 添加\
2.7.0 - 添加 `scheduled_at`\
2.8.0 - 添加 `poll`

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

Idempotency-Key
: 提供此标头，其中包含任何任意字符串，以防止重复提交相同的嘟文。考虑使用客户端生成的哈希或 UUID。幂等性密钥最多存储 1 小时。

##### 表单数据参数

status
: {{<required>}} 字符串。嘟文的文本内容。若提供了 `media_ids`，则此参数变为可选。若提供了 `status`，则 `poll` 是可选的。

media_ids[]
: {{<required>}} 字符串数组。包含要附加为媒体的附件 ID。若提供了此参数，则 `status` 变为可选，并且不能使用 `poll`。

poll[options][]
: {{<required>}} 字符串数组。投票的可能选项。若提供了此参数，则不能使用 `media_ids`，并且必须提供 `poll[expires_in]`。

poll[expires_in]
: {{<required>}} 整数。投票应保持开放的持续时间，以秒为单位。若提供了此参数，则不能使用 `media_ids`，并且必须提供 `poll[options]`。

poll[multiple]
: 布尔值。是否允许多选？默认为 false。

poll[hide_totals]
: 布尔值。是否在投票结束前隐藏投票数？默认为 false。

in_reply_to_id
: 字符串。若嘟文为回复，则为被回复嘟文的 ID。

sensitive
: 布尔值。是否将嘟文和附加的媒体标记为敏感内容？默认为 false。

spoiler_text
: 字符串。在实际内容之前显示的警告或主题文本。嘟文通常被折叠于此字段之后。

visibility
: 字符串。将发布的嘟文的可见性设置为 `public`、`unlisted`、`private`、`direct`。

language
: 字符串。此嘟文的 ISO 639 语言代码。

scheduled_at
: 字符串。嘟文计划发布的 [DateTime]({{<relref "api/datetime-format#datetime">}})。提供此参数将导致返回 ScheduledStatus 而不是 Status。必须至少在未来 5 分钟。

#### 响应
##### 200: OK

嘟文将使用选择的参数发布：

```json
{
  "id": "103254962155278888",
  "created_at": "2019-12-05T11:34:47.196Z",
  // ...
  "content": "<p>test content</p>",
  // ...
  "application": {
    "name": "test app",
    "website": null
  },
  // ...
}
```

若提供 scheduled_at ，则返回 ScheduledStatus：

```json
{
  "id": "3221",
  "scheduled_at": "2019-12-05T12:33:01.000Z",
  "params": {
    "text": "test content",
    "media_ids": null,
    "sensitive": null,
    "spoiler_text": null,
    "visibility": null,
    "scheduled_at": null,
    "poll": null,
    "idempotency": null,
    "in_reply_to_id": null,
    "application_id": 596551
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

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Text can't be blank"
}
```

---

## 查看单个嘟文 {#get}

```http
GET /api/v1/statuses/:id HTTP/1.1
```

获取有关嘟文的信息。

**返回：** [Status]({{< relref "entities/status" >}})\
**OAuth:** 公开嘟文为Public，私有嘟文为用户令牌 + `read:statuses`\
**版本历史：**\
0.0.0 - 添加\
2.7.0 - 公开嘟文不再需要令牌

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的 ID。

##### 标头

Authorization
: 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "1",
  "created_at": "2016-03-16T14:44:31.580Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/Gargron/statuses/1",
  "url": "https://mastodon.social/@Gargron/1",
  "replies_count": 7,
  "reblogs_count": 98,
  "favourites_count": 112,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "content": "<p>Hello world</p>",
  "reblog": null,
  "application": null,
  "account": {
    "id": "1",
    "username": "Gargron",
    "acct": "Gargron",
    "display_name": "Eugen",
    "locked": false,
    "bot": false,
    "created_at": "2016-03-16T14:34:26.392Z",
    "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
    "url": "https://mastodon.social/@Gargron",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "followers_count": 320472,
    "following_count": 453,
    "statuses_count": 61163,
    "last_status_at": "2019-12-05T03:03:02.595Z",
    "emojis": [],
    "fields": [
      {
        "name": "Patreon",
        "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
        "verified_at": null
      },
      {
        "name": "Homepage",
        "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span></a>",
        "verified_at": "2019-07-15T18:29:57.191+00:00"
      }
    ]
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": null
}
```

##### 401: Unauthorized

实例处于 authorized-fetch 模式。

```json
{
  "error": "This API requires an authenticated user"
}
```

##### 404: Not found

嘟文不存在或为私有嘟文。

```json
{
  "error": "Record not found"
}
```

---

## 查看多个嘟文 {#index}

```http
GET /api/v1/statuses HTTP/1.1
```

获取有关多条嘟文的信息。

**返回：** [Status]({{< relref "entities/status" >}}) 数组\
**OAuth:** 公开嘟文为公开，私有嘟文为用户令牌 + `read:statuses`\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 查询参数

id[]
: 字符串数组。数据库中嘟文的 ID。

##### 标头

Authorization
: 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

将返回请求嘟文的 [Status]({{< relref "entities/status" >}}) 记录。若请求的嘟文不存在或无法使用当前凭据访问，则记录数可能少于请求数。
当不存在 `id=2` 的嘟文时，使用 `id[]=1&id[]=2` 的示例调用返回：

```json
[
  {
    "id": "1",
    "created_at": "2016-03-16T14:44:31.580Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    "language": "en",
    "uri": "https://mastodon.social/users/Gargron/statuses/1",
    "url": "https://mastodon.social/@Gargron/1",
    "replies_count": 7,
    "reblogs_count": 98,
    "favourites_count": 112,
    "favourited": false,
    "reblogged": false,
    "muted": false,
    "bookmarked": false,
    "content": "<p>Hello world</p>",
    "reblog": null,
    "application": null,
    "account": {
      "id": "1",
      "username": "Gargron",
      "acct": "Gargron",
      "display_name": "Eugen",
      "locked": false,
      "bot": false,
      "created_at": "2016-03-16T14:34:26.392Z",
      "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
      "url": "https://mastodon.social/@Gargron",
      "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
      "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
      "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
      "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
      "followers_count": 320472,
      "following_count": 453,
      "statuses_count": 61163,
      "last_status_at": "2019-12-05T03:03:02.595Z",
      "emojis": [],
      "fields": [
        {
          "name": "Patreon",
          "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        },
        {
          "name": "Homepage",
          "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span></a>",
          "verified_at": "2019-07-15T18:29:57.191+00:00"
        }
      ]
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  }
]
```

##### 401: Unauthorized

实例处于 authorized-fetch 模式。

```json
{
  "error": "This API requires an authenticated user"
}
```

---

## 删除嘟文 {#delete}

```http
DELETE /api/v1/statuses/:id HTTP/1.1
```

删除你自己的某条嘟文。

**返回：** 具有源文本 `text` 以及 `poll` 或 `media_attachments` 的 [Status]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:statuses`\
**版本历史：**\
0.0.0 - 添加\
2.9.0 - 返回源属性，用于删除和重新编辑\
4.4.0 ( `mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 4) - 添加 `delete_media` 可选参数

#### 请求

##### 查询参数

delete_media
: 布尔值。是否立即删除嘟文的媒体附件。若省略或为 `false`，则媒体附件可能会保留大约 24 小时，以便可以在新嘟文中重复使用。

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

注意特殊属性 `text` 和 `poll` 或 `media_attachments`，它们可用于重新发布嘟文，例如，在删除和重新编辑功能的情况下。使用 [POST /api/v1/statuses](#create)，并使用 `text` 作为 `status` 参数的值， `media_attachments[n]["id"]` 作为 `media_ids` 数组参数，以及具有相应参数的 `poll` 属性（例如 `poll[multiple]` 和 `poll[options]`，每个用户输入都有一个新的 `poll[expires_in]` 和 `poll[hide_totals]`）。

删除带媒体附件的嘟文的示例：

```json
{
  "id": "103254193998341330",
  "created_at": "2019-12-05T08:19:26.052Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/trwnh/statuses/103254193998341330",
  "url": "https://mastodon.social/@trwnh/103254193998341330",
  "replies_count": 0,
  "reblogs_count": 0,
  "favourites_count": 0,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  "text": "test",
  "reblog": null,
  "application": {
    "name": "Web",
    "website": null
  },
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    // ...
  },
  "media_attachments": [
    {
      "id": "22345792",
      "type": "image",
      "url": "https://files.mastodon.social/media_attachments/files/022/345/792/original/57859aede991da25.jpeg",
      "preview_url": "https://files.mastodon.social/media_attachments/files/022/345/792/small/57859aede991da25.jpeg",
      "remote_url": null,
      "text_url": "https://mastodon.social/media/2N4uvkuUtPVrkZGysms",
      "meta": {
        "original": {
          "width": 640,
          "height": 480,
          "size": "640x480",
          "aspect": 1.3333333333333333
        },
        "small": {
          "width": 461,
          "height": 346,
          "size": "461x346",
          "aspect": 1.3323699421965318
        },
        "focus": {
          "x": -0.27,
          "y": 0.51
        }
      },
      "description": "test media description",
      "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
    }
  ],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": null
}
```

删除投票的示例：

```json
{
  "id": "103254222827484720",
  "created_at": "2019-12-05T08:26:45.958Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/trwnh/statuses/103254222827484720",
  "url": "https://mastodon.social/@trwnh/103254222827484720",
  "replies_count": 0,
  "reblogs_count": 0,
  "favourites_count": 0,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  "text": "test",
  "reblog": null,
  "application": {
    "name": "Web",
    "website": null
  },
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    // ...
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": {
    "id": "34858",
    "expires_at": "2019-12-06T08:26:45.945Z",
    "expired": false,
    "multiple": false,
    "votes_count": 1,
    "voters_count": 1,
    "voted": true,
    "own_votes": [],
    "options": [
      {
        "title": "test 1",
        "votes_count": 1
      },
      {
        "title": "test 2",
        "votes_count": 0
      }
    ],
    "emojis": []
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

##### 404: Not found

该嘟文不属于你或不存在

```json
{
  "error": "Record not found"
}
```

---

## 获取上下文中上级嘟文和子嘟文 {#context}

```http
GET /api/v1/statuses/:id/context HTTP/1.1
```

查看此嘟文在嘟文串中的上下嘟文。

**返回：** [Context]({{< relref "entities/context" >}})\
**OAuth:** 对于公开嘟文，限制为 40 个祖先和 60 个后代，最大深度为 20。对于用户令牌 + `read:statuses`，最多遍历 4,096 个祖先、4,096 个后代、无限深度和私有嘟文。\
**版本历史：**\
0.0.0 - 添加
4.0.0 - 限制未经身份验证的请求

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的 ID。

##### 标头

Authorization
: 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "ancestors": [
    {
      "id": "103188938570975982",
      "created_at": "2019-11-23T19:44:00.124Z",
      "in_reply_to_id": null,
      "in_reply_to_account_id": null,
      // ...
    },
    {
      "id": "103188971072973252",
      "created_at": "2019-11-23T19:52:23.398Z",
      "in_reply_to_id": "103188938570975982",
      "in_reply_to_account_id": "634458",
      // ...
    },
    {
      "id": "103188982235527758",
      "created_at": "2019-11-23T19:55:08.208Z",
      "in_reply_to_id": "103188971072973252",
      "in_reply_to_account_id": "14715",
      // ...
    }
  ],
  "descendants": [
    {
      "id": "103189026958574542",
      "created_at": "2019-11-23T20:06:36.011Z",
      "in_reply_to_id": "103189005915505698",
      "in_reply_to_account_id": "634458",
      // ...
    }
  ]
}
```

##### 404: Not found

嘟文是私有的或不存在

```json
{
  "error": "Record not found"
}
```

---

## 翻译嘟文 {#translate}

```http
POST /api/v1/statuses/:id/translate HTTP/1.1
```

将嘟文内容翻译成某种语言。

**返回：** [Translation]({{< relref "entities/translation" >}})\
**OAuth:** 应用令牌 + `read:statuses`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的 ID。

##### 表单数据参数

lang
: 字符串（ISO 639 语言代码）。嘟文内容将被翻译成此语言。默认为用户的当前语言设置。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

将西班牙语的具有内容警告和媒体的嘟文翻译成英语

```json
{
  "content": "<p>Hello world</p>",
  "spoiler_text": "Greatings ahead",
  "media_attachments": [
    {
      "id": 22345792,
      "description": "Status author waving at the camera"
    }
  ],
  "poll": null,
  "detected_source_language": "es",
  "provider": "DeepL.com"
}
```

将带有投票的嘟文翻译成英语

```json
{
  "content": "<p>Should I stay or should I go?</p>",
  "spoiler_text": null,
  "media_attachments": [],
  "poll": [
    {
      "id": 34858,
      "options": [
        {
          "title": "Stay"
        },
        {
          "title": "Go"
        }
      ]
    }
  ],
  "detected_source_language": "ja",
  "provider": "DeepL.com"
}
```

##### 404: Not found

嘟文是私有的或不存在

```json
{
  "error": "Record not found"
}
```

##### 503: 服务不可用

翻译请求失败

```json
{
  "error": "Service Unavailable"
}
```

---

## 查看谁转发了嘟文 {#reblogged_by}

```http
GET /api/v1/statuses/:id/reblogged_by HTTP/1.1
```

查看谁转发了给定的嘟文。

**返回：** [Account]({{< relref "entities/account" >}}) 数组\
**OAuth:** 可以公开查询公开嘟文。私有嘟文为用户令牌 + `read:statuses`。
**版本历史：**\
0.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的 ID。

##### 标头

Authorization
: 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 40 个帐户。最多 80 个帐户。

#### 响应
##### 200: OK

转发嘟文的帐户列表

```json
[
  {
    "id": "711345",
    "username": "Norman_Doors",
    "acct": "Norman_Doors@witches.live",
    // ...
  },
  // ...
]
```

由于通常无法提前知道转发嘟文 ID，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/statuses/109404970108594430/reblogged_by?limit=2&max_id=109406336446186031>; rel="next", <https://mastodon.example/api/v1/statuses/109404970108594430/reblogged_by?limit=2&since_id=109408462939099398>; rel="prev"
```

##### 404: Not found

嘟文不存在或为私有嘟文

```json
{
  "error": "Record not found"
}
```

---

## 查看谁喜欢了嘟文 {#favourited_by}

```http
GET /api/v1/statuses/:id/favourited_by HTTP/1.1
```

查看谁喜欢了给定的嘟文。

**返回：** [Account]({{< relref "entities/account" >}}) 数组\
**OAuth:** 可以公开查询公开嘟文。对私有嘟文为用户令牌 + `read:statuses`。\
**版本历史：**\
0.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的 ID。

##### 标头

Authorization
: 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 40 个帐户。最多 80 个帐户。

#### 响应
##### 200: OK

喜欢嘟文的帐户列表

```json
[
  {
    "id": "828600",
    "username": "fructose_dealer",
    "acct": "fructose_dealer@radical.town",
    // ...
  },
  // ...
]
```

由于喜欢 ID 通常不会通过任何 API 响应公开，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/statuses/109419880690343548/favourited_by?limit=1&max_id=53286827>; rel="next", <https://mastodon.example/api/v1/statuses/109419880690343548/favourited_by?limit=1&since_id=53286827>; rel="prev"
```

##### 404: Not found

嘟文不存在或为私有嘟文

```json
{
  "error": "Record not found"
}
```

---

## 喜欢嘟文 {#favourite}

```http
POST /api/v1/statuses/:id/favourite HTTP/1.1
```

将嘟文添加到你的喜欢列表。

**返回：** [Status]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:favourites`\
**版本历史：**\
0.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已成功发送喜欢或嘟文已被你喜欢

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": true,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Authorization 标头缺失或无效。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文

```json
{
  "error": "记录未找到"
}
```

---

## 取消喜欢一条嘟文 {#unfavourite}

```http
POST /api/v1/statuses/:id/unfavourite HTTP/1.1
```

从喜欢列表中移除一条嘟文。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:favourites`\
**版本历史：**\
0.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已取消喜欢嘟文或嘟文已不在喜欢列表中

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "访问令牌无效"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文

```json
{
  "error": "记录未找到"
}
```

---

## 转发一条嘟文 {#boost}

```http
POST /api/v1/statuses/:id/reblog HTTP/1.1
```

在你的账户上分享一条嘟文。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:statuses`\
**版本历史：**\
0.0.0 - 添加\
2.8.0 - 新增 `visibility` 参数

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

##### 表单数据参数

visibility
: 字符串。嘟文的可见性，除 `limited` 或 `direct` 之外均可（即 `public`、`unlisted`、`private`）。默认值为 public。目前在 UI 中未使用。

#### 响应
##### 200: OK

嘟文已被转发。请注意，顶层 ID 已更改。被转发嘟文的 ID 现在在 `reblog` 属性中。顶层 ID 是转嘟本身的 ID。还要注意，转发的嘟文不能被置顶。

```json
{
  "id": "103254401326800919",
  "created_at": "2019-12-05T09:12:09.625Z",
  // ...
  "favourited": false,
  "reblogged": true,
  "muted": false,
  "bookmarked": false,
  // ...
  "reblog": {
    "id": "99734435964706331",
    "created_at": "2018-03-23T17:38:40.700Z",
    // ...
    "favourited": false,
    "reblogged": true,
    "muted": false,
    "bookmarked": false,
    "pinned": false,
    // ...
  },
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "访问令牌无效"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文

```json
{
  "error": "记录未找到"
}
```

---

## 取消转发一条嘟文 {#unreblog}

```http
POST /api/v1/statuses/:id/unreblog HTTP/1.1
```

取消重新分享一条嘟文。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:statuses`\
**版本历史：**\
0.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

嘟文已取消转发或本就未被转发

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "访问令牌无效"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文

```json
{
  "error": "记录未找到"
}
```

---

## 将嘟文添加到书签 {#bookmark}

```http
POST /api/v1/statuses/:id/bookmark HTTP/1.1
```

私密地喜欢一条嘟文。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:bookmarks`\
**版本历史：**\
3.1.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

嘟文已被添加到书签或本就已被添加到书签

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": true,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "访问令牌无效"
}
```

---

## 从书签中移除嘟文 {#unbookmark}

```http
POST /api/v1/statuses/:id/unbookmark HTTP/1.1
```

从书签中移除一条嘟文。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:bookmarks`\
**版本历史：**\
3.1.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

嘟文已从书签中移除或本就未在书签中

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "访问令牌无效"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文。

```json
{
  "error": "记录未找到"
}
```

---

## 隐藏一个会话的通知 {#mute}

```http
POST /api/v1/statuses/:id/mute HTTP/1.1
```

不接收此嘟文所属的嘟文串的通知。目标嘟文串必须是你参与讨论的嘟文串。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:mutes`\
**版本历史：**\
1.4.2 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

以隐藏对应会话的通知，或该对话的通知本就已被隐藏

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": true,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "访问令牌无效"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文。

```json
{
  "error": "记录未找到"
}
```

---

## 取消隐藏会话通知 {#unmute}

```http
POST /api/v1/statuses/:id/unmute HTTP/1.1
```

重新开始接收此嘟文所属的嘟文串的通知。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:mutes`\
**版本历史：**\
1.4.2 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

已取消隐藏对应会话的通知，或该对话的通知本就未被隐藏

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "访问令牌无效"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文。

```json
{
  "error": "记录未找到"
}
```

---

## 将嘟文在账户页置顶 {#pin}

```http
POST /api/v1/statuses/:id/pin HTTP/1.1
```

将你的一条公开嘟文在账户页置顶。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:accounts`\
**版本历史：**\
1.6.0 - 添加\
3.5.0 - 现在可以置顶私密嘟文

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的本地ID。嘟文应由授权账户所撰写。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

嘟文已置顶。注意，该嘟文不是转发，并且其作者账户是你自己的。

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": true,
  // ...
  "reblog": null,
  // ...
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    // ...
  },
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文。

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

嘟文不属于你：

```json
{
  "error": "Validation failed: Someone else's post cannot be pinned"
}
```

在3.5.0之前，你不能置顶私密嘟文，因为私密嘟文无法从远程网站获取，且必须被递送。（3.5.0增加了一种机制，可以代表账户获取嘟文。）

```json
{
  "error": "Validation failed: Non-public toot cannot be pinned"
}
```

---

## 从账户页取消置顶嘟文 {#unpin}

```http
POST /api/v1/statuses/:id/unpin HTTP/1.1
```

将某个嘟文从你的账户页取消置顶。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:accounts`\
**版本历史：**\
1.6.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的本地ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

嘟文已被取消置顶或本就未被置顶

```json
{
  "id": "99734435964706331",
  "created_at": "2018-03-23T17:38:40.700Z",
  // ...
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  // ...
  "reblog": null,
  // ...
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    // ...
  },
  // ...
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "访问令牌无效"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文。

```json
{
  "error": "记录未找到"
}
```

---

## 编辑一条嘟文 {#edit}

```http
PUT /api/v1/statuses/:id HTTP/1.1
```

编辑给定的嘟文以更改其文本、敏感性、媒体附件或投票。请注意，编辑投票选项会重置投票。

**返回值：** [Staus]({{< relref "entities/status" >}})\
**OAuth:** 用户令牌 + `write:statuses`\
**版本历史：**\
3.5.0 - 添加\
4.0.0 - 新增 `language`

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的ID。

##### 标头

Authorization
: {{<required>}} 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

##### 表单数据参数

status
: 字符串。嘟文的纯文本内容。

spoiler_text
: 字符串。嘟文的主题或内容警告的纯文本。

sensitive
: 布尔值。嘟文是否应标记为敏感。

language
: 字符串。嘟文的 ISO 639 语言代码。

media_ids[]
: 字符串数组。包含要作为媒体附加的附件 ID。若提供，`status` 变为可选，`poll` 则不能使用。

media_attributes[][]
: 字符串数组。每个数组包括 id、description 和 focus。

poll[options][]
: 字符串数组。投票的可能选项。若提供，则不能使用 `media_ids`，并且必须提供 `poll[expires_in]`。

poll[expires_in]
: 整数。投票开放的时长，以秒为单位。若提供，则不能使用 `media_ids`，并且必须提供 `poll[options]`。

poll[multiple]
: 布尔值。允许多选？默认为 false。

poll[hide_totals]
: 布尔值。是否在投票结束前隐藏票数？默认为 false。

#### 响应
##### 200: OK

嘟文已成功编辑。

```json
{
  "id": "108942703571991143",
  "created_at": "2022-09-04T23:22:13.704Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/trwnh/statuses/108942703571991143",
  "url": "https://mastodon.social/@trwnh/108942703571991143",
  "replies_count": 3,
  "reblogs_count": 1,
  "favourites_count": 6,
  "edited_at": "2022-09-05T00:33:20.309Z",
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "pinned": false,
  "content": "<p>this is a status that has been edited multiple times to change the text, add a poll, and change poll options.</p>",
  "filtered": [],
  "reblog": null,
  "application": {
    "name": "SubwayTooter",
    "website": null
  },
  "account": {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    // ...
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": null
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not Found

嘟文不存在、私密或不属于你。

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Text can't be blank"
}
```

---

## 查看嘟文的编辑历史 {#history}

```http
GET /api/v1/statuses/:id/history HTTP/1.1
```

获取一条嘟文的所有已知版本，包括初始版本和当前嘟文。

**返回值：** [StatusEdit]({{< relref "entities/statusedit" >}}) 数组\
**OAuth:** 可公开查询公开嘟文，对私密嘟文则要求用户令牌 + `read:statuses`\
**版本历史：**\
3.5.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的本地ID。

##### 标头

Authorization
: 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "content": "<p>this is a status that will be edited</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-04T23:22:13.704Z",
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  },
  {
    "content": "<p>this is a status that has been edited</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-04T23:22:42.555Z",
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  },
  {
    "content": "<p>this is a status that has been edited twice</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-04T23:22:55.956Z",
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  },
  {
    "content": "<p>this is a status that has been edited three times. this time a poll has been added.</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-05T00:01:48.160Z",
    "poll": {
      "options": [
        {
          "title": "cool"
        },
        {
          "title": "uncool"
        },
        {
          "title": "spiderman"
        }
      ]
    },
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  },
  {
    "content": "<p>this is a status that has been edited three times. this time a poll has been added.</p>",
    "spoiler_text": "",
    "sensitive": false,
    "created_at": "2022-09-05T00:03:32.480Z",
    "poll": {
      "options": [
        {
          "title": "cool"
        },
        {
          "title": "uncool"
        },
        {
          "title": "spiderman (this option has been changed)"
        }
      ]
    },
    "account": {
      "id": "14715",
      "username": "trwnh",
      "acct": "trwnh",
      "display_name": "infinite love ⴳ",
      // ...
    },
    "media_attachments": [],
    "emojis": []
  }
]
```

##### 404: Not Found

嘟文不存在或为私密嘟文。

```json
{
  "error": "Record not found"
}
```

---

## 查看嘟文源文本 {#source}

```http
GET /api/v1/statuses/:id/source HTTP/1.1
```

获取嘟文的源属性以便编辑。

**返回值：** [StatusSource]({{< relref "entities/statussource" >}})\
**OAuth:** 应用程序令牌 + `read:statuses`\
**版本历史：**\
3.5.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的本地ID。

##### 标头

Authorization
: 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "108942703571991143",
  "text": "this is a status that will be edited",
  "spoiler_text": ""
}
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文。

```json
{
  "error": "Record not found"
}
```

---

## 获取预览卡片 {{%deprecated%}} {#card}

```http
GET /api/v1/statuses/:id/card HTTP/1.1
```

**返回值：** [PreviewCard]({{< relref "entities/PreviewCard" >}})\
**OAuth:** 可公开查询公开嘟文，对私密嘟文则要求用户令牌 + `read:statuses`\
**版本历史：**\
0.0.0 - 添加\
2.6.0 - 弃用，推荐使用嘟文实体中的 card 属性\
3.0.0 - 移除

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中嘟文的本地ID。

##### 标头

Authorization
: 使用 `Bearer <user_token>` 提供此标头以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "url": "https://www.youtube.com/watch?v=OMv_EPMED8Y",
  "title": "♪ Brand New Friend (Christmas Song!)",
  "description": "",
  "type": "video",
  "author_name": "YOGSCAST Lewis & Simon",
  "author_url": "https://www.youtube.com/user/BlueXephos",
  "provider_name": "YouTube",
  "provider_url": "https://www.youtube.com/",
  "html": "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/OMv_EPMED8Y?feature=oembed\" frameborder=\"0\" allowfullscreen=\"\"></iframe>",
  "width": 480,
  "height": 270,
  "image": "https://files.mastodon.social/preview_cards/images/014/179/145/original/9cf4b7cf5567b569.jpeg",
  "embed_url": ""
}
```

##### 404: Not Found

嘟文不存在或为私密嘟文。

```json
{
  "error": "Record not found"
}
```

---

## 另请参阅

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses_controller.rb" caption="app/controllers/api/v1/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/bookmarks_controller.rb" caption="app/controllers/api/v1/statuses/bookmarks_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/favourited_by_accounts_controller.rb" caption="app/controllers/api/v1/statuses/favourited_by_accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/favourites_controller.rb" caption="app/controllers/api/v1/statuses/favourites_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/histories_controller.rb" caption="app/controllers/api/v1/statuses/histories_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/mutes_controller.rb" caption="app/controllers/api/v1/statuses/mutes_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/pins_controller.rb" caption="app/controllers/api/v1/statuses/pins_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/reblogged_by_accounts_controller.rb" caption="app/controllers/api/v1/statuses/reblogged_by_accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/reblogs_controller.rb" caption="app/controllers/api/v1/statuses/reblogs_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/statuses/sources_controller.rb" caption="app/controllers/api/v1/statuses/sources_controller.rb" >}}

{{< translation-status-zh-cn raw_title="statuses API methods" raw_link="/methods/statuses/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
