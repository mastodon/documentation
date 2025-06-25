---
title: conversations API 方法
description: >-
  与其他参与者直接进行的会话。（目前仅包含具有“直接”可见性的嘟文的主题。）
menu:
  docs:
    weight: 10
    name: conversations
    parent: methods-timelines
    identifier: methods-conversations
aliases: [
  "/methods/conversations",
  "/api/methods/conversations",
  "/methods/timelines/conversations",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看所有会话 {#get}

```http
GET /api/v1/conversations HTTP/1.1
```

**返回：** [Conversations]({{< relref "entities/conversation" >}}) 数组\
**OAuth:** 用户令牌 + `read:statuses`\
**版本历史：**\
2.6.0 - 添加\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，并使用 `Bearer <user_token>` 来获得对此 API 方法的访问授权。

##### 查询参数

max_id 
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 20 个会话。最多 40 个会话。

#### 响应

##### 200: OK

使用 limit=2 截断结果的 API 调用结果示例如下：

```json
[
  {
    "id": "418450",
    "unread": true,
    "accounts": [
      {
        "id": "482403",
        "username": "amic",
        "acct": "amic@nulled.red",
        // ...
      }
    ],
    "last_status": {
      "id": "103196583826321184",
      "created_at": "2019-11-25T04:08:24.000Z",
      "in_reply_to_id": "103196540587943467",
      "in_reply_to_account_id": "14715",
      // ...
    }
  },
  {
    "id": "418374",
    "unread": false,
    "accounts": [
      {
        "id": "464472",
        "username": "freon",
        "acct": "freon@letsalllovela.in",
        // ...
      }
    ],
    "last_status": {
      "id": "103195253010396431",
      "created_at": "2019-11-24T22:29:56.331Z",
      "in_reply_to_id": "103195239650546339",
      "in_reply_to_account_id": "14715",
      // ...
    }
  }
]
```

由于通常不会通过任何 API 响应公开 AccountConversation ID，因此你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。 有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/conversations?limit=2&max_id=108835003356700379>; rel="next", <https://mastodon.example/api/v1/conversations?limit=2&min_id=108888782724768580>; rel="prev"
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## 删除一个会话 {#delete}

```http
DELETE /api/v1/conversations/:id HTTP/1.1
```

从你的会话列表中删除一个会话。

**返回：** 空白\
**OAuth:** 用户令牌 + `write:conversations`\
**版本历史：**\
2.6.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中会话的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，并使用 `Bearer <user_token>` 来获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

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

##### 404: Not found

该会话不存在，或者不属于你。

```json
{
  "error": "Record not found"
}
```

---

## 标记会话为已读 {#read}

```http
POST /api/v1/conversations/:id/read HTTP/1.1
```

**返回：** [Conversations]({{< relref "entities/conversation" >}})\
**OAuth:** 用户令牌 + `write:conversations`\
**版本历史：**\
2.6.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中会话的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，并使用 `Bearer <user_token>` 来获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

`unread` 的值已更改为 false。

```json
{
  "id": "418450",
  "unread": false,
  "accounts": [
    {
      "id": "482403",
      // ...
    }
  ],
  "last_status": {
    "id": "103196583826321184",
    // ...
  }
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

该会话不存在，或者不属于你。

```json
{
  "error": "Record not found"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/conversations_controller.rb" caption="app/controllers/api/v1/conversations_controller.rb" >}}

{{< translation-status-zh-cn raw_title="conversations API methods" raw_link="/methods/conversations/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
