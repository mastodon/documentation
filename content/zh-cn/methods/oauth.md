---
title: OAuth API 方法
description: 生成和管理 OAuth 令牌。
menu:
  docs:
    weight: 10
    name: oauth
    parent: methods-apps
    identifier: methods-oauth
aliases: ["/methods/oauth", "/api/methods/oauth", "/methods/apps/oauth"]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 授权用户 {#authorize}

```http
GET /oauth/authorize HTTP/1.1
```

向用户显示授权表单。若获得批准，将创建并返回授权码，然后重定向到所需的 `redirect_uri`，或者若请求了 `urn:ietf:wg:oauth:2.0:oob`，则显示授权码。授权码可以在请求令牌并获得对用户级方法的访问权限时使用。

**返回:** 字符串（URL）或 HTML 响应\
**OAuth:** 公开\
**版本历史记录:**\
0.1.0 - 添加\
2.6.0 - 添加 `force_login`\
3.5.0 - 添加 `lang`
4.3.0 - 添加 PKCE 参数支持

#### 请求

##### 查询参数

response_type
: {{<required>}} 字符串。应设置为等于 `code`。

client_id
: {{<required>}} 字符串。客户端 ID，在应用注册期间获得。

redirect_uri
: {{<required>}} 字符串。设置一个 URI 以将用户重定向到该 URI。若此参数设置为 `urn:ietf:wg:oauth:2.0:oob`，则将显示授权码。必须与应用注册期间声明的 `redirect_uris` 之一匹配。

scope
: 字符串。请求的 [OAuth 作用域]({{< relref "api/oauth-scopes" >}})列表，由空格分隔（若使用查询参数，则由加号分隔）。必须是应用注册期间声明的 `scopes` 的子集。若未提供，则默认为 `read`。

state
: 字符串。任意值，用于在用户授权或拒绝授权请求时传递到你的服务。

code_challenge
: 字符串。授权请求的 [PKCE 代码质询]({{< relref "spec/oauth#pkce" >}})。

code_challenge_method
: 字符串。必须是 `S256`，因为这是 Mastodon 支持的唯一代码质询方法，用于 PKCE。

force_login
: 布尔值。强制用户重新登录，这对于从同一实例使用多个帐户进行授权是必要的。

lang
: 字符串。用于呈现授权表单的 ISO 639-1 双字符语言代码。

#### 响应

##### 200: OK

授权码将作为名为 `code` 的查询参数返回。

{{< hint style="warning" >}}
将 `code` 查询参数视为密码，你应确保它未记录在请求日志中。
{{< /hint >}}

```http
redirect_uri?code=qDFUEaYrRK5c-HNmTCJbAzazwLRInJ7VHFat0wcMgCU
```

若使用了 state 参数，那么当客户端被重定向时，它也将出现在 URI 中。

```http
redirect_uri?code=qDFUEaYrRK5c-HNmTCJbAzazwLRInJ7VHFat0wcMgCU&state=example
```

##### 400: Client error

若授权码不正确或已被使用，则请求将失败。

```json
{
  "error": "invalid_grant",
  "error_description": "提供的授权许可无效、已过期、已撤销、与授权请求中使用的重定向 URI 不匹配，或者已颁发给另一个客户端。"
}
```

---

## 获取令牌 {#token}

```http
POST /oauth/token HTTP/1.1
```

获取访问令牌，用于非公开 API 调用。

**返回:** [令牌]({{< relref "entities/token" >}})\
**OAuth:** 公开\
**版本历史记录:**\
0.1.0 - 添加
4.3.0 - 添加 PKCE 参数支持

#### 请求

##### 表单数据参数

grant_type
: {{<required>}} 字符串。若提供了 `code` 以获得用户级访问权限，则设置为等于 `authorization_code`。否则，设置为等于 `client_credentials` 以仅获得应用级别访问权限。

code
: {{<required>}} 字符串。用户授权码，从 [授权请求](#authorize) 获得批准后的重定向中获得。若 `redirect_uri` 为 `urn:ietf:wg:oauth:2.0:oob`，则也可以选择向用户显示。

client_id
: {{<required>}} 字符串。客户端 ID，在应用注册期间获得。

client_secret
: {{<required>}} 字符串。客户端密钥，在应用注册期间获得。

redirect_uri
: {{<required>}} 字符串。必须与 [授权请求](#authorize) 期间使用的 `redirect_uri` 匹配。

code_verifier
: 字符串。若在授权请求期间使用了 [PKCE]({{< relref "spec/oauth#pkce" >}})，则为必填项。这是用于使用授权请求的 `code_challenge_method` 创建 `code_challenge` 的代码验证器。

scope
: 字符串。当 `grant_type` 设置为 `client_credentials` 时，为请求的 OAuth 作用域列表，以空格分隔（若使用查询参数，则用加号分隔）。必须是在创建应用时请求的作用域的子集。若省略，则默认为 `read`。当 `grant_type` 为 `authorization_code` 时，无效。

#### 响应

##### 200: OK

存储此 `access_token` 以供以后与需要身份验证的方法一起使用。令牌应作为 HTTP `Authorization` 标头传递，值为 `Bearer <access_token>`。

{{< hint style="warning" >}}
将 `access_token` 视为密码。我们建议你在将其存储在缓存中时对其进行加密，以防止凭据泄露。\
\
此外，你应确保不记录 `code` 参数。
{{< /hint >}}

```json
{
  "access_token": "ZA-Yj3aBD8U8Cm7lKUp-lm9O9BmDgdhHzDeqsY8tlL0",
  "token_type": "Bearer",
  "scope": "read write follow push",
  "created_at": 1573979017
}
```

##### 400: Client error

若你尝试请求注册应用时未包含的作用域，则请求将失败。

```json
{
  "error": "invalid_scope",
  "error_description": "请求的作用域无效、未知或格式不正确。"
}
```

##### 401: Unauthorized

若 client_id 和 client_secret 不匹配或无效，则请求将失败。

```json
{
  "error": "invalid_grant",
  "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
}
```

---

## 撤销令牌 {#revoke}

```http
POST /oauth/revoke HTTP/1.1
```

撤销访问令牌，使其不再有效。

**返回:** 空\
**OAuth:** 公开\
**版本历史记录:**\
0.1.0 - 添加

#### 请求

##### 表单数据参数

client_id
: {{<required>}} 字符串。客户端 ID，在应用注册期间获得。

client_secret
: {{<required>}} 字符串。客户端密钥，在应用注册期间获得。

token
: {{<required>}} 字符串。先前获得的令牌，将被设置为无效。

#### 响应

##### 200: OK

若你拥有提供的令牌，则 API 调用将提供一个空响应。此操作是幂等的，因此多次调用此 API 仍将返回 OK。

```json
{}
```

##### 403: Forbidden

若你提供了一个你并未拥有的令牌，或者根本没有提供任何令牌，则 API 调用将返回 403 错误。

```json
{
  "error": "unauthorized_client",
  "error_description": "You are not authorized to revoke this token"
}
```

---

## 发现 OAuth 实例配置 {#authorization-server-metadata}

```http
GET /.well-known/oauth-authorization-server HTTP/1.1
```

返回 Mastodon 实例的 OAuth 2 授权实例元数据，按 [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414#section-3.2) 规范要求定义。

我们包括了 `app_registration_endpoint` 的附加非标准属性，该属性是指 [POST /api/v1/apps]({{% relref ref="methods/apps#create" %}}) 端点，因为我们目前不支持用于 [动态客户端注册](https://oauth.net/2/dynamic-client-registration/) 的标准 `registration_endpoint` 端点。

此端点公开的属性可以帮助你更好地与 Mastodon API 集成，例如允许协商不同 Mastodon 版本中的 `scopes`。

{{< hint style="info" >}}
**示例:** 你希望使用 `profile` 作用域，但也想支持没有该作用域且需要 `read:accounts` 的旧版 Mastodon 实例。你可以通过向此端点发出请求来发现实例是否支持该作用域。
{{< /hint >}}

**返回:** 如上所述的 JSON\
**OAuth:** 公开\
**版本历史记录:**\
4.3.0 - 添加

#### 响应

##### 200: OK

```json
{
  "issuer": "https://social.example/",
  "service_documentation": "https://docs.joinmastodon.org/",
  "authorization_endpoint": "https://social.example/oauth/authorize",
  "token_endpoint": "https://social.example/oauth/token",
  "app_registration_endpoint": "https://social.example/api/v1/apps",
  "revocation_endpoint": "https://social.example/oauth/revoke",
  "scopes_supported": [
    "read",
    "write",
    "write:accounts",
    "write:blocks",
    "write:bookmarks",
    "write:conversations",
    "write:favourites",
    "write:filters",
    "write:follows",
    "write:lists",
    "write:media",
    "write:mutes",
    "write:notifications",
    "write:reports",
    "write:statuses",
    "read:accounts",
    "read:blocks",
    "read:bookmarks",
    "read:favourites",
    "read:filters",
    "read:follows",
    "read:lists",
    "read:mutes",
    "read:notifications",
    "read:search",
    "read:statuses",
    "follow",
    "push",
    "profile",
    "admin:read",
    "admin:read:accounts",
    "admin:read:reports",
    "admin:read:domain_allows",
    "admin:read:domain_blocks",
    "admin:read:ip_blocks",
    "admin:read:email_domain_blocks",
    "admin:read:canonical_email_blocks",
    "admin:write",
    "admin:write:accounts",
    "admin:write:reports",
    "admin:write:domain_allows",
    "admin:write:domain_blocks",
    "admin:write:ip_blocks",
    "admin:write:email_domain_blocks",
    "admin:write:canonical_email_blocks"
  ],
  "response_types_supported": ["code"],
  "response_modes_supported": ["query", "fragment", "form_post"],
  "code_challenge_methods_supported": [
    "S256"
  ],
  "grant_types_supported": [
    "authorization_code",
    "client_credentials"
  ],
  "token_endpoint_auth_methods_supported": [
    "client_secret_basic",
    "client_secret_post"
  ]
}
```

##### 较旧的 Mastodon 版本 – 404: 未找到

在 4.3.0 之前的 Mastodon 版本上，请求此端点将导致 `404 Not Found` 错误。

此时，你需要“猜测”该实例支持的内容，而不是动态发现支持的 OAuth 2 端点、授权流程和作用域。

你可能希望回退到 [实例元数据端点]({{% relref ref="methods/instance#v2" %}})，尝试通过解析 `version` 字作用域来发现实例正在运行的 Mastodon 版本；但是，这提供的保证非常脆弱，不建议使用。

---

## 另请参考

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/authorizations_controller.rb" caption="app/controllers/oauth/authorizations_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/authorized_applications_controller.rb" caption="app/controllers/oauth/authorized_applications_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/oauth/tokens_controller.rb" caption="app/controllers/oauth/tokens_controller.rb" >}}

{{< translation-status-zh-cn raw_title="OAuth API methods" raw_link="/methods/oauth/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
