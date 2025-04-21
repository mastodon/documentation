---
title: featured_tags API 方法
description: 你的账户的精选话题标签。
menu:
  docs:
    weight: 100
    name: featured_tags
    parent: methods-accounts
    identifier: methods-featured_tags
aliases: [
  "/methods/featured_tags",
  "/api/methods/featured_tags",
  "/methods/accounts/featured_tags",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看你的账户的精选话题标签 {#get}

```http
GET /api/v1/featured_tags HTTP/1.1
```

列出你的账户中所有的精选话题标签。

**返回：** [FeaturedTag]({{< relref "entities/featuredtag" >}}) 数组\
**OAuth:** 用户令牌 + `read:accounts`\
**版本历史：**\
3.0.0 - 添加

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "id": "627",
    "name": "nowplaying",
    "url": "https://mastodon.social/@trwnh/tagged/nowplaying",
    "statuses_count": 70,
    "last_status_at": "2022-08-29T12:03:35.061Z"
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

## 添加精选话题标签 {#feature}

```http
POST /api/v1/featured_tags HTTP/1.1
```

向你的账户页添加一个精选话题标签。

**返回：** [FeaturedTag]({{< relref "entities/featuredtag" >}})\
**OAuth:** 用户令牌+ `write:accounts`\
**版本历史：**\
3.0.0 - 添加

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

name
: {{<required>}} 字符串。要突出显示的标签，不带井号。

#### 响应
##### 200: OK

将使用指定的 `name` 创建一个 FeaturedTag。

```json
{
  "id": "13174",
  "name": "circasurvive",
  "url": "https://mastodon.social/@trwnh/tagged/circasurvive",
  "statuses_count": 23,
  "last_status_at": "2021-10-22T14:47:35.357Z"
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

若 `name` 不是有效的话题标签，例如包含非法字符或仅包含数字，则返回此错误。

```json
{
  "error": "Validation failed: Tag is invalid"
}
```

---

## 取消精选话题标签 {#unfeature}

```http
DELETE /api/v1/featured_tags/:id HTTP/1.1
```

停止在你的账户页中展示对应的精选话题标签。

**返回：** 空\
**OAuth:** 用户令牌+ `write:accounts`\
**版本历史：**\
3.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 FeaturedTag 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

标签已取消突出显示。

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

该 FeaturedTag 不属于你或不存在

```json
{
  "error": "Record not found"
}
```

---

## 查看当前的精选话题标签 {#suggestions}

```http
GET /api/v1/featured_tags/suggestions HTTP/1.1
```

最多显示 10 个最近使用的精选话题标签。

**返回：** [Tag]({{< relref "entities/Tag" >}}) 数组\
**OAuth:** 用户令牌+ `read:accounts`\
**版本历史：**\
3.0.0 - 添加

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

下面是截断后的结果，仅展示第一个和最后一个话题标签。

```json
[
  {
    "name": "nowplaying",
    "url": "https://mastodon.social/tags/nowplaying",
    "history": [
      {
        "day": "1574553600",
        "uses": "200",
        "accounts": "31"
      },
      {
        "day": "1574467200",
        "uses": "272",
        "accounts": "39"
      },
      {
        "day": "1574380800",
        "uses": "345",
        "accounts": "40"
      },
      {
        "day": "1574294400",
        "uses": "366",
        "accounts": "46"
      },
      {
        "day": "1574208000",
        "uses": "226",
        "accounts": "32"
      },
      {
        "day": "1574121600",
        "uses": "217",
        "accounts": "42"
      },
      {
        "day": "1574035200",
        "uses": "214",
        "accounts": "34"
      }
    ]
  },
  // ...
  {
    "name": "mastothemes",
    "url": "https://mastodon.social/tags/mastothemes",
    "history": [
      {
        "day": "1574553600",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574467200",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574380800",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574294400",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574208000",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574121600",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574035200",
        "uses": "0",
        "accounts": "0"
      }
    ]
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

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/featured_tags_controller.rb" caption="app/controllers/api/v1/featured_tags_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/featured_tags/suggestions_controller.rb" caption="app/controllers/api/v1/featured_tags/suggestions_controller.rb" >}}

{{< translation-status-zh-cn raw_title="featured_tags API methods" raw_link="/methods/featured_tags/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
