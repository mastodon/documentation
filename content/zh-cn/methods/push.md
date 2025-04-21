---
title: push API 方法
description: >-
  通过 Web Push API 订阅并接收服务端通知。
menu:
  docs:
    weight: 10
    name: push
    parent: methods-notifications
    identifier: methods-push
aliases: [
  "/methods/push",
  "/api/methods/push",
  "/methods/notifications/push",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 关于 Web Push API {#about}

Mastodon 原生支持 [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)。你可以为你的原生应用使用相同的机制。Mastodon 不直接连接到 Android 和 Apple 的专有通知网关，所以若你希望使用这些网关，你可以配置一个代理实例，在 WebPush 标准和这些网关之间进行转换。这可以以一种代理实例无法访问通知内容的方式来实现。例如，可以参考 [Mozilla 的 web push 参考实例](https://github.com/mozilla-services/autopush)，或者 Mastodon 社区专门为此目的开发的几个中继之一：

* [toot-relay](https://github.com/DagAgren/toot-relay)
* [PushToFCM](https://github.com/tateisu/PushToFCM)
* [metatext-apns](https://github.com/metabolist/metatext-apns)

---

## 订阅推送通知 {#create}

```http
POST /api/v1/push/subscription HTTP/1.1
```

添加 Web Push API 订阅以接收通知。每个访问令牌可以拥有一个推送订阅。若你创建一个新的订阅，旧的订阅将被删除。

**返回：** [WebPushSubscription]({{< relref "entities/WebPushSubscription" >}})\
**OAuth：** 用户令牌 + `push`\
**版本历史：**\
2.4.0 - 添加\
3.3.0 - 添加 `data[alerts][status]`\
3.4.0 - 添加 `data[policy]`\
3.5.0 - 添加 `data[alerts][update]` 和 `data[alerts][admin.sign_up]`\
4.0.0 - 添加 `data[alerts][admin.report]`\
4.3.0 - 添加了更严格的请求参数验证，无效的端点 URL 和订阅密钥现在将导致错误，在此之前这种行为将被接受，但会静默失败。\
4.4.0 - 添加 `subscription[standard]`

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

subscription[endpoint]
: {{<required>}} 字符串。发生通知事件时调用的端点 URL。

subscription[keys][p256dh]
: {{<required>}} 字符串。用户代理公钥。使用 `prime256v1` 曲线的 ECDH 密钥对中的公钥的 Base64 编码字符串。

subscription[keys][auth]
: {{<required>}} 字符串。身份验证密钥。16 字节随机数据的 Base64 编码字符串。

subscription[standard]
: 布尔值。是否遵循标准的 WebPush (RFC8030+RFC8291+RFC8292) 规范？若为否，则遵循传统的 WebPush（未发布的版本，RFC8291 的第 4 版草案和 RFC8292 的第 1 版草案）。默认为 false。

data[alerts][mention]
: 布尔值。是否接收提及通知？默认为 false。

data[alerts][status]
: 布尔值。是否接收新的已订阅帐户通知？默认为 false。

data[alerts][reblog]
: 布尔值。是否接收转嘟通知？默认为 false。

data[alerts][follow]
: 布尔值。是否接收关注通知？默认为 false。

data[alerts][follow_request]
: 布尔值。是否接收关注请求通知？默认为 false。

data[alerts][favourite]
: 布尔值。是否接收喜欢通知？默认为 false。

data[alerts][poll]
: 布尔值。是否接收投票通知？默认为 false。

data[alerts][update]
: 布尔值。是否接收嘟文编辑通知？默认为 false。

data[alerts][admin.sign_up]
: 布尔值。是否接收新用户注册通知？默认为 false。必须具有具有适当权限的用户组。

data[alerts][admin.report]
: 布尔值。是否接收新举报通知？默认为 false。必须具有具有适当权限的用户组。

data[policy]
: 字符串。指定是否接收来自 `all`（所有用户）、`followed`（关注的用户）、`follower`（关注者）或 `none`（无）用户的推送通知。

#### 响应
##### 200: OK

已生成新的 PushSubscription，它会将请求的提醒发送到你的端点。

```json
{
  "id": 328183,
  "endpoint": "https://yourdomain.example/listener",
  "standard": true,
  "alerts": {
    "follow": true,
    "favourite": true,
    "reblog": true,
    "mention": true,
    "poll": true
  },
  "server_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
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

## 获取当前订阅 {#get}

```http
GET /api/v1/push/subscription HTTP/1.1
```

查看当前与此访问令牌关联的 PushSubscription。

**返回：** [WebPushSubscription]({{< relref "entities/WebPushSubscription" >}})\
**OAuth：** 用户令牌 + `push`\
**版本历史：**\
2.4.0 - 添加

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": 328183,
  "endpoint": "https://yourdomain.example/listener",
  "standard": true,
  "alerts": {
    "follow": true,
    "favourite": true,
    "reblog": true,
    "mention": true,
    "poll": true
  },
  "server_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
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

此令牌不存在 PushSubscription。

```json
{
  "error": "Record not found"
}
```

---

## 更改通知类型 {#update}

```http
PUT /api/v1/push/subscription HTTP/1.1
```

更新当前的推送订阅。只能更新数据部分。要更改基本信息，必须创建一个新的订阅。

**返回：** [WebPushSubscription]({{< relref "entities/WebPushSubscription" >}})\
**OAuth：** 用户令牌 + `push`\
**版本历史：**\
2.4.0 - 添加\
3.3.0 - 添加 `data[alerts][status]`\
3.4.0 - 添加 `policy`\
3.5.0 - 添加 `data[alerts][update]` 和 `data[alerts][admin.sign_up]`\
4.0.0 - 添加 `data[alerts][admin.report]`

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

data[alerts][mention]
: 布尔值。是否接收提及通知？默认为 false。

data[alerts][status]
: 布尔值。是否接收新的已订阅帐户通知？默认为 false。

data[alerts][reblog]
: 布尔值。是否接收转嘟通知？默认为 false。

data[alerts][follow]
: 布尔值。是否接收关注通知？默认为 false。

data[alerts][follow_request]
: 布尔值。是否接收关注请求通知？默认为 false。

data[alerts][favourite]
: 布尔值。是否接收喜欢通知？默认为 false。

data[alerts][poll]
: 布尔值。是否接收投票通知？默认为 false。

data[alerts][update]
: 布尔值。是否接收嘟文编辑通知？默认为 false。

data[alerts][admin.sign_up]
: 布尔值。是否接收新用户注册通知？默认为 false。必须具有具有适当权限的用户组。

data[alerts][admin.report]
: 布尔值。是否接收新举报通知？默认为 false。必须具有具有适当权限的用户组。

policy
: 字符串。指定是否接收来自 `all`（所有用户）、`followed`（关注的用户）、`follower`（关注者）或 `none`（无）用户的推送通知。

#### 响应
##### 200: OK

更新 PushSubscription 以仅接收提及提醒

```json
{
  "id": 328183,
  "endpoint": "https://yourdomain.example/listener",
  "standard": true,
  "alerts": {
    "follow": false,
    "favourite": false,
    "reblog": false,
    "mention": true,
    "poll": false
  },
  "server_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
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

此令牌不存在 PushSubscription

```json
{
  "error": "Record not found"
}
```

---

## 删除当前订阅 {#delete}

```http
DELETE /api/v1/push/subscription HTTP/1.1
```

删除当前的 Web Push API 订阅。

**返回：** 空\
**OAuth：** 用户令牌 + `push`\
**版本历史：**\
2.4.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

PushSubscription 已成功删除或之前不存在

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

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/push/subscriptions_controller.rb" caption="app/controllers/api/v1/push/subscriptions_controller.rb" >}}

{{< translation-status-zh-cn raw_title="push API methods" raw_link="/methods/push/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
