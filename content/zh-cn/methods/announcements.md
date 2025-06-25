---
title: announcements API 方法
description: 用于管理设置的公告。
menu:
  docs:
    weight: 90
    name: announcements
    parent: methods-instance
    identifier: methods-announcements
aliases: [
  "/methods/announcements",
  "/api/methods/announcements",
  "/methods/instance/announcements",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看所有公告 {#get}

```http
GET /api/v1/announcements HTTP/1.1
```

查看管理员设置的所有当前生效的公告。

**返回：** [Announcement]({{< relref "entities/announcement">}}) 数组\
**OAuth:** 用户令牌\
**版本历史：**\
3.1.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

当前生效的公告

```json
[
  {
    "id": "8",
    "content": "<p>Looks like there was an issue processing audio attachments without embedded art since yesterday due to an experimental new feature. That issue has now been fixed, so you may see older posts with audio from other servers pop up in your feeds now as they are being finally properly processed. Sorry!</p>",
    "starts_at": null,
    "ends_at": null,
    "all_day": false,
    "published_at": "2020-07-03T01:27:38.726Z",
    "updated_at": "2020-07-03T01:27:38.752Z",
    "read": true,
    "mentions": [],
    "statuses": [],
    "tags": [],
    "emojis": [],
    "reactions": [
      {
        "name": "bongoCat",
        "count": 9,
        "me": false,
        "url": "https://files.mastodon.social/custom_emojis/images/000/067/715/original/fdba57dff7576d53.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/067/715/static/fdba57dff7576d53.png"
      },
      {
        "name": "thonking",
        "count": 1,
        "me": false,
        "url": "https://files.mastodon.social/custom_emojis/images/000/098/690/original/a8d36edc4a7032e8.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/098/690/static/a8d36edc4a7032e8.png"
      },
      {
        "name": "AAAAAA",
        "count": 1,
        "me": false,
        "url": "https://files.mastodon.social/custom_emojis/images/000/071/387/original/AAAAAA.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/071/387/static/AAAAAA.png"
      },
      {
        "name": "🤔",
        "count": 1,
        "me": true
      }
    ]
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

## 忽略公告 {#dismiss}

```http
POST /api/v1/announcements/:id/dismiss HTTP/1.1
```

允许用户将公告标记为已读。

**返回：** 空\
**OAuth:** 用户令牌 + `write:accounts`\
**版本历史：**\
3.1.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。 数据库中公告的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

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

##### 404: Not Found

具有给定iID的公告不存在

```json
{
  "error": "Record not found"
}
```

---

## 向公告添加回应 {#put-reactions}

```http
PUT /api/v1/announcements/:id/reactions/:name HTTP/1.1
```

使用表情对公告做出回应。

**返回：** 空\
**OAuth:** 用户令牌 + `write:favourites`\
**版本历史：**\
3.1.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。 数据库中公告的ID。

:name
: {{<required>}} 字符串。 Unicode 表情，或自定义表情的短代码。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

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

具有给定ID的公告不存在

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Name is not a recognized emoji"
}
```

---

## 从公告中删除回应 {#delete-reactions}

```http
DELETE /api/v1/announcements/:id/reactions/:name HTTP/1.1
```

撤消对公告的表情回应。

**返回：** 空\
**OAuth:** 用户令牌 + `write:favourites`\
**版本历史：**\
3.1.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。 数据库中公告的 ID。

:name
: {{<required>}} 字符串。 Unicode 表情，或自定义表情的短代码。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

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

具有给定 ID 的公告不存在

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Name is not a recognized emoji"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/announcements_controller.rb" caption="app/controllers/api/v1/announcements_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/announcements/reactions_controller.rb" caption="app/controllers/api/v1/announcements/reactions_controller.rb" >}}

{{< translation-status-zh-cn raw_title="announcements API methods" raw_link="/methods/announcements/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
