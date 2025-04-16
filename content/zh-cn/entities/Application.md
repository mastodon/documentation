---
title: Application
description: 表示一个通过 REST API 访问帐户或发布嘟文的应用。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/application",
	"/entities/Application",
  "/api/entities/application",
	"/api/entities/Application",
]
---

## 示例

```json
{
  "name": "Test Application",
  "website": "https://app.example",
  "scopes": ["read", "write", "push"],
  "redirect_uri": "https://app.example/callback\nhttps://app.example/register",
  "redirect_uris": [
    "https://app.example/callback",
    "https://app.example/register"
  ]
}
```

## 属性

### `name` {#name}

**描述:** 你的应用的名称。\
**类型:** 字符串\
**版本历史:**\
0.9.9 - 添加

### `website` {{%optional%}} {#website}

**描述:** 与你的应用关联的网站。\
**类型:** {{<nullable>}} 字符串 (URL)\
**版本历史:**\
0.9.9 - 添加\
3.5.1 - this property is now nullable

### `scopes` {#scopes}

**描述:** 你的应用的作用域。按空格分隔的已注册的 `scopes` 字符串。\
**类型:** 字符串数组\
**版本历史:**\
4.3.0 - 添加

### `redirect_uris` {#redirect_uris}

**描述:** 你的应用的已注册重定向 URI。\
**类型:** 字符串数组 (数组中元素的值为 URL 或 `"urn:ietf:wg:oauth:2.0:oob"`)\
**版本历史:**\
4.3.0 - 添加

### `redirect_uri` {{%deprecated%}} {#redirect_uri}

**描述:** 你的应用的已注册重定向 URI。\
当注册了多个重定向 URI 时，可能包含 `\n` 字符。\
**类型:** 字符串\
**版本历史:**\
0.0.0 - 添加\
4.3.0 - 已弃用，推荐使用 [`redirect_uris`]({{< relref "entities/Application#redirect_uris" >}})，因为当注册了多个重定向 URI 时，此属性的值不是一个格式规范的 URI

### `vapid_key` {{%deprecated%}} {#vapid_key}

**描述:** 用于流式推送 API。与 [POST /api/v1/apps]({{< relref "methods/apps#create" >}}) 一同返回。等同于 [WebPushSubscription#server_key]({{< relref "entities/WebPushSubscription#server_key" >}}) 和 [Instance#vapid_public_key]({{< relref "entities/Instance#vapid_public_key" >}})\
**类型:** 字符串\
**版本历史:**\
2.8.0 - 添加\
4.3.0 - 已弃用，等待移除，请参阅 [api/v2/instance]({{< relref "methods/Instance#v2">}}) 以获取此值 (`configuration.vapid.public_key`)

## CredentialApplication 属性 {#CredentialApplication}

所有 [Application](#attributes) 属性以及以下属性：

### `client_id` {#client_id}

**描述:** 客户端 ID 密钥，用于获取 OAuth 令牌\
**类型:** 字符串\
**版本历史:**\
0.9.9 - 添加
4.3.0 - moved to `CredentialApplication` from `Application`

### `client_secret` {#client_secret}

**描述:** 客户端密钥，用于获取 OAuth 令牌\
**类型:** 字符串\
**版本历史:**\
0.9.9 - 添加
4.3.0 - moved to `CredentialApplication` from `Application`

### `client_secret_expires_at` {#client_secret_expires_at}

**描述:** 客户端密钥到期时间，目前始终返回 `0`，表示 OAuth 客户端不会过期\
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

## 参见

{{< page-relref ref="methods/apps" caption="应用 API 方法" >}}

{{< page-relref ref="entities/Status#application" caption="嘟文（`application` 属性）" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/application_serializer.rb" caption="app/serializers/rest/application_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/credential_application_serializer.rb" caption="app/serializers/rest/credential_application_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Application" raw_link="/entities/Application/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
