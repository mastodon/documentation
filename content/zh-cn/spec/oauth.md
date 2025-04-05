---
title: OAuth
description: 一种基于令牌的互联网认证和授权开放标准
menu:
  docs:
    weight: 50
    parent: spec
---

## 什么是 OAuth？ {#intro}

Mastodon API 有许多方法需要客户端的身份验证或用户的授权。这是通过 OAuth 2.0 完成的，OAuth 2.0 是 [RFC 6749](https://tools.ietf.org/html/rfc6749) 中描述的一种授权框架，它允许第三方应用程序通过使用标准化的授权流程，代表资源所有者获得对 HTTP 服务的有限访问权限，该流程生成一个客户端访问令牌，用于 HTTP 请求。

要获取 Mastodon 站点的 OAuth 令牌，请确保允许用户在登录前指定要连接的域名。使用该域名[获取客户端 ID/密钥]({{< relref "methods/apps#create" >}})，然后[继续执行正常的 OAuth 2 流程]({{< relref "methods/oauth" >}})。

## OAuth 2 客户端类型 {#client-types}

OAuth 2 根据客户端与授权服务器安全认证的能力（即，维护客户端凭据机密性的能力）定义了两种客户端类型：`confidential`（机密）和 `public`（公共）。机密客户端可以使用[客户端凭据授权流程]({{<relref "client/token#flow" >}})，而公共客户端则不能。

目前，Mastodon 仅支持机密客户端，但[正在进行相关工作](https://github.com/mastodon/mastodon/pull/30329)以添加对公共客户端的支持。

## 已实现的 OAuth 2 端点 {#implementation}

以下描述摘自 [Doorkeeper 文档](https://github.com/doorkeeper-gem/doorkeeper/wiki/API-endpoint-descriptions-and-examples)。Mastodon 使用 Doorkeeper 来实现 OAuth 2。有关如何使用这些端点的更多信息，请查看 [OAuth 的 API 文档]({{< relref "methods/oauth" >}})。

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/config/initializers/doorkeeper.rb" caption="Doorkeeper 配置初始化器" >}}

### 授权服务器元数据端点 ([RFC 8414](https://www.rfc-editor.org/rfc/rfc8414.html)) {#authorization-server-metadata}

返回一个 JSON 文档，表示 Mastodon 中 OAuth 2 服务器的配置。信息包括注册[应用]({{% relref "methods/apps#create" %}})或请求[访问令牌]({{% relref "methods/oauth#token" %}})时可用的 `scopes`、请求访问令牌时可以使用的 `grant_types_supported`，以及与 Mastodon OAuth 服务器交互的各种端点，例如 `authorization_endpoint` 和 `token_endpoint`。

**版本历史：**\
4.3.0 - 添加

{{< page-relref ref="methods/oauth#authorization-server-metadata" caption="GET /.well-known/oauth-authorization-server" >}}

### 动态客户端注册端点 ([RFC 7591](https://www.rfc-editor.org/rfc/rfc7591.html)) {#dynamic-client-registration}

目前，Mastodon 不支持动态客户端注册协议，但支持用于注册 OAuth 应用程序的专有端点。

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

### 授权端点 ([RFC 6749 Section 3.1](https://www.rfc-editor.org/rfc/rfc6749.html#section-3.1)) {#authorization}

向用户显示授权表单。如果获得批准，将创建并返回授权码，然后重定向到所需的 `redirect_uri`，如果请求了 `urn:ietf:wg:oauth:2.0:oob`，则直接显示授权码。

{{< page-relref ref="methods/oauth#authorize" caption="GET /oauth/authorize" >}}

### 令牌获取端点 ([RFC 6749 Section 3.2](https://www.rfc-editor.org/rfc/rfc6749.html#section-3.2)) {#token}

获取访问令牌。Mastodon 支持以下 OAuth 2 流程：

授权流程
: 供最终用户使用

客户端凭据流程
: 供不代表用户操作的应用程序使用

Mastodon 历史上一直支持密码授权流程，但由于安全问题，OAuth 2 规范作者[不建议使用](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics#name-resource-owner-password-cre)密码授权流程，并且该流程已从 Mastodon 的未来版本中删除。相反，建议你为该用户创建一个 OAuth 应用程序，并使用生成的访问令牌与 API 交互。

{{< page-relref ref="methods/oauth#token" caption="POST /oauth/token" >}}

### 令牌撤销端点 ([RFC 7009 Section 2](https://www.rfc-editor.org/rfc/rfc7009.html#section-2)) {#revoke}

在此处使用客户端凭据来撤销访问令牌。

{{< page-relref ref="methods/oauth#revoke" caption="POST /oauth/revoke" >}}

## OAuth 2 安全注意事项

### 授权码交换证明密钥 (PKCE) {#pkce}

在执行 OAuth 2 [授权流程]({{< relref ref="methods/oauth#authorize" >}})时，你可以采用一种额外的安全机制，以提高用户重定向回你的应用程序时授权码的安全性。这被称为授权码交换证明密钥，或 PKCE（发音为 pixie），Mastodon 4.3.0 及更高版本支持此功能。

我们建议，按照 [OAuth 2 安全最佳实践](https://www.ietf.org/archive/id/draft-ietf-oauth-security-topics-27.html#name-pkce)，将 PKCE 与授权流程一起用于机密客户端和公共客户端。

{{< caption-link url="https://oauth.net/2/pkce/" caption="在 OAuth.net 网站上了解更多关于 PKCE 的信息" >}}

### 状态参数 {#state-parameter}

在执行 OAuth 2 [授权流程]({{< relref ref="methods/oauth#authorize" >}})时，你可以使用授权端点的 [`state` 参数](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1)  来防止混淆和跨站请求伪造攻击。完成 OAuth 授权流程后，此参数将通过重定向 URI 原样返回到你的服务器。

还可以使用此参数通过授权流程将任意信息传递到你的服务器。如果你使用 `state` 参数，建议你在完成授权流程（即，将授权码交换为访问令牌）之前比较或验证状态值。

## 常见问题 {#gotchas}

- 使用 Mastodon 的 REST API 注册应用时，有一个 `scopes` 参数。当与 OAuth 端点交互时，你必须改用 `scope` 参数，并且此参数的值必须是注册应用时指定的 `scopes` 的子集。你不能包含原始集合中没有的任何内容。
- 使用 Mastodon 的 REST API 注册应用时，有一个 `redirect_uris` 参数。当与 OAuth 端点交互时，你必须改用 `redirect_uri` 参数，并且此参数的值必须是注册应用时指定的 `redirect_uris` 之一。

{{< translation-status-zh-cn raw_title="OAuth" raw_link="/spec/oauth/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
