---
title: apps API 方法
description: 注册可用于获取 OAuth 令牌的客户端应用。
menu:
  docs:
    weight: 10
    name: apps
    parent: methods
    identifier: methods-apps
aliases: ["/methods/apps", "/api/methods/apps"]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 创建一个应用 {#create}

```http
POST /api/v1/apps HTTP/1.1
```

创建一个新的应用以获取 OAuth2 凭据。

{{< hint style="danger" >}}
在 4.3 之前的 Mastodon 版本中，OAuth 应用可能会在特定条件下被“清理”并从数据库中移除，这意味着你的应用的 `client_id` 和 `client_secret` 将不会被 Mastodon 实例识别。\
这种自动删除应用的机制已在 Mastodon 4.3 中移除。\
\
对于低于 4.3 的 Mastodon 版本，解决方案之一是注册你的应用，然后立即请求一个 [Client Credential]({{< relref "client/Token#flow" >}}) 令牌，这将永久确保你的应用始终具有有效的访问令牌，并且不会被移除。
{{< /hint >}}

{{< hint style="info" >}}
目前，Mastodon 仅支持配置机密客户端，也就是说，你始终会在 [CredentialApplication]({{< relref "entities/Application#CredentialApplication" >}}) 实体中收到 `client_secret` 和 `client_secret_expires_at` 属性。\
\
有关更多信息，请参见：[OAuth 2 客户端类型]({{< relref "spec/oauth#client-types" >}})
{{< /hint >}}

**返回：** [CredentialApplication]({{< relref "entities/Application#CredentialApplication" >}})\
**OAuth：** 公开\
**版本历史：**\
0.0.0 - 添加\
2.7.2 - 现在返回 `vapid_key`\
4.3.0 - 弃用 `vapid_key`，请参见 [api/v2/instance]({{< relref "methods/Instance#v2">}})\
4.3.0 - 添加了对表单数据参数中多个 `redirect_uris` 的支持\
4.3.0 - 添加了 `redirect_uris` 响应属性\
4.3.0 - 弃用 `redirect_uri` 响应属性，因为若注册了多个 `redirect_uris`，这可能不是一个 URI，请改用 `redirect_uris`\
4.3.0 - 将实体类型从 [Application]({{< relref "entities/Application">}}) 更改为 [CredentialApplication]({{< relref "entities/Application#CredentialApplication">}})

#### 请求 {#create-request-example}

请求示例：

```
POST /api/v1/apps HTTP/1.1
Content-Type: application/json

{
  "client_name": "Test Application",
  "redirect_uris": ["https://app.example/callback", "https://app.example/register"],
  "scopes": "read write push",
  "website": "https://app.example"
}
```

##### 表单数据参数

client_name
: {{<required>}} 字符串。你的应用的名称。

redirect_uris
: {{<required>}} 字符串或字符串数组。授权后用户应重定向到的位置。要向用户显示授权码，而不是重定向到网页，请在此参数中使用 `urn:ietf:wg:oauth:2.0:oob`。

scopes
: 字符串。以空格分隔的作用域列表。若未提供，则默认为 `read`。有关可能的作用域列表，请参见 [OAuth 作用域]({{< relref "api/oauth-scopes" >}})。

website
: 字符串。你的应用主页的 URL。

#### 响应

##### 200: OK

将 `client_id` 和 `client_secret` 存储在你的缓存中，因为这些将用于获取 OAuth 令牌。

{{< hint style="warning" >}}
将 `client_id` 和 `client_secret` 属性视为密码。我们建议你在存储在缓存中时对其进行加密，以防止凭据泄露。
{{< /hint >}}

```json
{
  "id": "563419",
  "name": "Test Application",
  "website": "https://app.example",
  "scopes": ["read", "write", "push"],
  "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
  "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob"],
  "client_id": "TWhM-tNSuncnqN7DBJmoyeLnk6K3iJJ71KKXxgL1hPM",
  "client_secret": "ZEaFUFmF0umgBX1qKJDjaU99Q31lDkOU8NutzTOoliw"
}
```

或者使用多个重定向 URI：

```json
{
  "id": "563419",
  "name": "Test Application",
  "website": "https://app.example",
  "scopes": ["read", "write", "push"],
  "redirect_uri": "https://app.example/callback\nhttps://app.example/register",
  "redirect_uris": [
    "https://app.example/callback",
    "https://app.example/register"
  ],
  "client_id": "TWhM-tNSuncnqN7DBJmoyeLnk6K3iJJ71KKXxgL1hPM",
  "client_secret": "ZEaFUFmF0umgBX1qKJDjaU99Q31lDkOU8NutzTOoliw"
}
```

{{< hint style="info" >}}
自 4.3.0 起，以上示例中的 `redirect_uri` 属性被视为已被弃用，不应使用，而应使用 `redirect_uris` 属性。
{{< /hint >}}

##### 422: Unprocessable entity

若缺少必需的参数或格式不正确，则请求失败。

```json
{
  "error": "Validation failed: Redirect URI must be an absolute URI."
}
```

---

## 验证你的应用是否有效 {#verify_credentials}

```http
GET /api/v1/apps/verify_credentials HTTP/1.1
```

确认应用的 OAuth2 凭据是否有效。

**返回：** [Application]({{< relref "entities/application" >}})\
**OAuth：** 应用令牌\
**版本历史：**\
2.0.0 - 添加\
2.7.2 - 现在返回 `vapid_key`\
4.3.0 - 弃用 `vapid_key`，请参见 [api/v2/instance]({{< relref "methods/Instance#v2">}})\
4.3.0 - 移除需使用 `read` 作用域才能访问此 API 的要求，现在可以使用任何有效的应用令牌\
4.3.0 - 添加了 `scopes` 和 `redirect_uris` 属性

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <app_token>` 以获得对此 API 方法的访问授权。`<app_token>` 可以是从 [`/oauth/token`]({{< relref "methods/oauth#token" >}}) 返回的 `client_credential` 或 `access_token`。

#### 响应

##### 200: OK

若 Authorization 标头提供了有效的令牌，你应该看到你的应用作为 Application 实体返回。

```json
{
  "name": "Test Application",
  "website": "https://app.example",
  "scopes": ["read", "write", "push"],
  "redirect_uris": [
    "https://app.example/callback",
    "https://app.example/register"
  ]
}
```

##### 401: Unauthorized

若 Authorization 标头包含无效的令牌、格式不正确或不存在，则将返回提示授权失败的错误。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/apps_controller.rb" caption="app/controllers/api/v1/apps_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/apps/credentials_controller.rb" caption="app/controllers/api/v1/apps/credentials_controller.rb" >}}

{{< translation-status-zh-cn raw_title="apps API methods" raw_link="/methods/apps/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
