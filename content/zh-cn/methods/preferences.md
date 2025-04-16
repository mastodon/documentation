---
title: preferences API 方法
description: 客户端间共享的通用默认行为。
menu:
  docs:
    weight: 110
    name: preferences
    parent: methods-accounts
    identifier: methods-preferences
aliases: [
  "/methods/preferences",
  "/api/methods/preferences",
  "/methods/accounts/preferences",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看用户偏好设置 {#get}

```http
GET /api/v1/preferences HTTP/1.1
```

用户在其帐户设置中定义的偏好设置。

**返回：** 按键和值返回偏好设置\
**OAuth：** 用户令牌 + `read:accounts`\
**版本历史：**\
2.8.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，并使用 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

```json
{
  "posting:default:visibility": "public",
  "posting:default:sensitive": false,
  "posting:default:language": null,
  "reading:expand:media": "default",
  "reading:expand:spoilers": false
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "访问令牌无效"
}
```

---

## 另请参阅

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/preferences_controller.rb" caption="app/controllers/api/v1/preferences_controller.rb" >}}

{{< translation-status-zh-cn raw_title="preferences API methods" raw_link="/methods/preferences/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
