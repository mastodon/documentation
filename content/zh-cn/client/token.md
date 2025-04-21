---
title: 获取客户端应用访问权限
description: 熟悉身份验证和授权的基础知识。
menu:
  docs:
    weight: 30
    parent: client
---

## 身份验证和授权 {#auth}

到目前为止，我们一直在处理公开可用的信息，但并非所有信息都是公开的。某些信息在查看之前需要获得许可，以便审计谁在请求该信息（并可能撤销或拒绝访问）。

这就是 [OAuth]({{< relref "spec/oauth" >}}) 发挥作用的地方。OAuth 是一种生成访问令牌的机制，该令牌可用于 _验证_ 请求来自特定客户端，并确保请求的操作已获得服务器访问控制策略的 _授权_。

## 创建应用 {#app}

我们需要做的第一件事是注册一个应用，以便稍后能够生成访问令牌。可以像这样创建应用：

```bash
curl -X POST \
	-F 'client_name=Test Application' \
	-F 'redirect_uris=urn:ietf:wg:oauth:2.0:oob' \
	-F 'scopes=read write push' \
	-F 'website=https://myapp.example' \
	https://mastodon.example/api/v1/apps
```

在上面的示例中，我们指定了客户端名称和网站，如果适用，它们将显示在状态中。但更重要的是，请注意以下两个参数：

- `redirect_uris` 被设置为“非常规”令牌生成，这意味着任何生成的令牌都必须手动复制和粘贴。该参数之所以称为 `redirect_uris`，是因为可以定义多个重定向 URI，但是在生成令牌时，我们需要提供一个包含在此列表中的 URI。
- `scopes` 允许我们定义稍后可以请求的权限。但是，稍后请求的范围需要是这些已注册范围的子集。有关更多信息，请查看 [OAuth 范围]({{< relref "api/oauth-scopes" >}})。

你还可以将 JSON 请求体 POST 到同一端点来创建应用，如[POST /api/v1/apps]({{< relref "methods/apps#create-request-example" >}}) 中所述。

{{< hint style="info" >}}
从 Mastodon 4.3.0 开始，你可以通过向 [`/.well-known/oauth-authorization-server`]({{< relref "methods/oauth#authorization-server-metadata" >}}) 端点发出请求来发现服务器支持哪些 `scopes` 以及其他信息。
{{< /hint >}}

我们应该看到返回了一个 [CredentialApplication]({{< relref "entities/application#CredentialApplication" >}}) 实体，但目前，我们只关心 `client_id` 和 `client_secret`。

`client_id` 和 `client_secret` 值将用于生成访问令牌，因此应将其缓存以供以后使用。有关注册应用程序的更多详细信息，请查看 [POST /api/v1/apps]({{< relref "methods/apps#create" >}})。

{{< hint style="warning" >}}
将 `client_id` 和 `client_secret` 属性视为密码。我们建议你在存储在缓存中时对其进行加密，以防止意外的凭据泄露。
{{< /hint >}}

## 身份验证代码示例 {#flow}

现在我们有了一个应用，让我们获取一个访问令牌，该令牌将以刚创建好的应用的身份令服务端验证我们的请求。为此，请使用 [POST /oauth/token]({{< relref "methods/oauth#token" >}}) 如下所示：

```bash
curl -X POST \
	-F 'client_id=your_client_id_here' \
	-F 'client_secret=your_client_secret_here' \
	-F 'redirect_uri=urn:ietf:wg:oauth:2.0:oob' \
	-F 'grant_type=client_credentials' \
	https://mastodon.example/oauth/token
```

请注意以下事项：

- 注册应用时，`client_id` 和 `client_secret` 已在响应体中提供。
- `redirect_uri` 必须是在注册应用时定义的 URI 之一。
- 我们正在请求 `client_credentials` 的 `grant_type`，默认情况下会为我们提供 `read` 范围。

此方法的响应是一个 [Token]({{< relref "entities/token" >}}) 实体。我们将需要 `access_token` 值。获得访问令牌后，将其保存在你的本地缓存中。

{{< hint style="warning" >}}
将 `access_token` 视为密码。我们建议你在存储在缓存中时加密此值，以防止意外的凭据泄露。
{{< /hint >}}

要在请求中使用它，请将 HTTP 标头 `Authorization: Bearer <access_token>` 添加到任何需要 OAuth 的 API 调用（即，不可公开访问的 API 调用）。

让我们通过调用 [GET /api/v1/apps/verify_credentials]({{< relref "methods/apps#verify_credentials" >}}) 来验证我们获得的凭据是否有效：

```bash
curl \
	-H 'Authorization: Bearer <access_token>' \
	https://mastodon.example/api/v1/apps/verify_credentials
```

如果我们已经获得了我们的令牌并正确格式化了我们的请求，我们应该看到我们的详细信息通过 [Application]({{< relref "entities/application" >}}) 实体返回给我们（不包括 `client_secret` 属性）。

## 我们可以用身份验证做什么 {#methods}

通过经过身份验证的客户端应用程序，我们可以查看帐户之间的关系，例如 [GET /api/v1/accounts/:id/following]({{< relref "methods/accounts#following" >}}) 和 [GET /api/v1/accounts/:id/followers]({{< relref "methods/accounts#followers" >}})。此外，某些实例可能要求对本来可以公开访问的方法进行身份验证，因此如果你之前在尝试使用公共方法时遇到任何身份验证错误，这些方法现在应该可以工作了。

{{< translation-status-zh-cn raw_title="Obtaining client app access" raw_link="/client/token/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
