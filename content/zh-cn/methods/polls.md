---
title: polls API 方法
description: >-
  查看和投票给附加到嘟文的投票。要发现投票 ID，你需要首先 GET 一个嘟文，然后检查 `poll` 属性。
menu:
  docs:
    weight: 20
    name: polls
    parent: methods-statuses
    identifier: methods-polls
aliases: [
  "/methods/polls",
  "/api/methods/polls",
  "/methods/statuses/polls",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看投票 {#get}

```http
GET /api/v1/polls/:id HTTP/1.1
```

查看附加到嘟文的投票。

**返回：** [Poll]({{< relref "entities/poll" >}})\
**OAuth:** 若上级嘟文是公开的，则为公开。若上级嘟文是私有的，则为用户令牌 + `read:statuses`。\
**版本历史：**\
2.8.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中投票的 ID。

##### 标头

Authorization
: 提供此标头，并使用 `Bearer <user_token>` 以获得对该 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "34830",
  "expires_at": "2019-12-05T04:05:08.302Z",
  "expired": true,
  "multiple": false,
  "votes_count": 10,
  "voters_count": null,
  "voted": true,
  "own_votes": [
    1
  ],
  "options": [
    {
      "title": "accept",
      "votes_count": 6
    },
    {
      "title": "deny",
      "votes_count": 4
    }
  ],
  "emojis": []
}
```

##### 404: Not found

投票不存在，或投票的上级嘟文是私有的

```json
{
  "error": "Record not found"
}
```

---

## 投票 {#vote}

```http
POST /api/v1/polls/:id/votes HTTP/1.1
```

投票给附加到嘟文的投票。

**返回：** [Poll]({{< relref "entities/poll" >}})\
**OAuth:** 用户令牌 + `write:statuses`\
**版本历史：**\
2.8.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中投票的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，并使用 `Bearer <user_token>` 以获得对该 API 方法的访问授权。

##### 表单数据参数

choices[]
: {{<required>}} 整数数组。将你自己的投票作为每个选项的索引提供（从 0 开始）。

#### 响应
##### 200: OK

已成功进行投票

```json
{
  "id": "34873",
  "expires_at": "2019-12-05T11:16:17.426Z",
  "expired": false,
  "multiple": true,
  "votes_count": 5,
  "voters_count": null,
  "voted": true,
  "own_votes": [
    0,
    2,
    4,
    9,
    6
  ],
  "options": [
    {
      "title": "option 0",
      "votes_count": 1
    },
    {
      "title": "option 1",
      "votes_count": 0
    },
    {
      "title": "option 2",
      "votes_count": 1
    },
    {
      "title": "option 3",
      "votes_count": 0
    },
    {
      "title": "option 4",
      "votes_count": 1
    },
    {
      "title": "option 5",
      "votes_count": 0
    },
    {
      "title": "option 6",
      "votes_count": 1
    },
    {
      "title": "option 7",
      "votes_count": 0
    },
    {
      "title": "option 8",
      "votes_count": 0
    },
    {
      "title": "option 9",
      "votes_count": 1
    }
  ],
  "emojis": []
}
```

##### 401: Unauthorized

无效或缺少授权标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

投票不存在，或投票的上级嘟文是私有的

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

投票已过期

```json
{
  "error": "Validation failed: The poll has already ended"
}
```

或者，你已经进行过投票

```json
{
  "error": "Validation failed: You have already voted on this poll"
}
```

---

## 另请参考

{{< page-relref ref="methods/statuses#create" caption="POST /api/v1/statuses (`poll` parameter)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/polls_controller.rb" caption="app/controllers/api/v1/polls_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/polls/votes_controller.rb" caption="app/controllers/api/v1/polls/votes_controller.rb" >}}

{{< translation-status-zh-cn raw_title="polls API methods" raw_link="/methods/polls/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
