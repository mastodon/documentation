---
title: 使用帐户登录
description: 如何从用户处获取授权，并代表用户执行操作。
menu:
  docs:
    weight: 40
    parent: client
---

## 作用域说明 {#scopes}

当我们注册应用及授权用户时，我们需要明确定义生成的令牌将具有哪些权限。这通过使用 [OAuth 作用域]({{< relref "api/oauth-scopes" >}}) 来完成。每个 API 方法都有一个关联的作用域，只有当用于授权的令牌是通过对应的作用域生成的，才能调用该方法。

当授权用户时，`scope` 查询参数必须是我们创建应用时指定的作用域的子集。在我们的示例中，我们在创建应用时指定了 `read write push` 作为我们的作用域，但更好的做法是仅请求你的应用实际需要的 [细粒度作用域]({{< relref "api/oauth-scopes#granular-scopes" >}})。

有关作用域的完整列表，请查看 [OAuth 作用域]({{< relref "api/oauth-scopes" >}})。每个 API 方法的文档也将指定 OAuth [令牌类型]({{< relref "api/oauth-tokens" >}}) 和调用该方法所需的作用域。如果一个端点指定了 `read:statuses` 并且你具有 `read` 权限，那么你将能够调用该端点，因为作用域是分层的。

{{< page-relref ref="api/oauth-scopes" caption="OAuth 作用域" >}}

## **授权码流程示例** {#flow}

与之前的身份验证流程类似，但这次，我们还需要从用户处获取授权。

### 客户端 ID 与密钥 {#client}

在开始操作之前，如果你尚未注册客户端应用，请查看上一页的 [创建我们的应用]({{< relref "client/token#creating-our-application" >}}) 或直接转到 [POST /api/v1/apps]({{< relref "methods/apps#create" >}}) 以获取该方法的完整文档。我们将需要应用的 `client_id` 和 `client_secret`。

### 获得用户授权 {#login}

要获取用户授权，请在浏览器中请求 [GET /oauth/authorize]({{< relref "methods/oauth#authorize" >}}) 并使用以下查询参数：

```bash
https://mastodon.example/oauth/authorize
?client_id=CLIENT_ID
&scope=read+write+push
&redirect_uri=urn:ietf:wg:oauth:2.0:oob
&response_type=code
```

请注意以下几点：

* `client_id` 是在注册应用时获得的对应 `client_id`。
* `scope` 必须为我们的应用已注册的作用域的子集。最好只请求你所需要的作用域。 有关更多信息，请查看 [OAuth 作用域]({{< relref "api/oauth-scopes" >}})。
* `redirect_uri` 是我们的应用注册的 URI 之一。

在本示例中，我们仍然使用“非常规”方式，这意味着我们将不得不手动复制和粘贴结果代码，但如果你使用你控制的 URI 注册了你的应用，那么代码将通过你的重定向 URI 的请求处理程序作为参数 `code` 的值返回。有关这方面的更多信息，请查看 API 方法文档的响应部分。

{{< hint style="warning" >}}
你应该将 `code` 查询参数视为密码，确保它不会记录在请求日志中。
{{< /hint >}}

### 获取令牌 {#token}

获取授权 `code` 后，让我们获取一个访问令牌，该令牌将用于对授权用户的请求进行身份验证。为此，像以前一样使用 [POST /oauth/token]({{< relref "methods/oauth#token" >}})，但传递我们刚刚获得的授权码：

```bash
curl -X POST \
	-F 'grant_type=authorization_code' \
	-F 'client_id=your_client_id_here' \
	-F 'client_secret=your_client_secret_here' \
	-F 'redirect_uri=urn:ietf:wg:oauth:2.0:oob' \
	-F 'code=user_authzcode_here' \
	https://mastodon.example/oauth/token
```

请注意以下几点：

- 我们正在请求一个 `grant_type` 为 `authorization_code` 的令牌。
- `client_id` 和 `client_secret` 在你注册应用时已在响应体中提供。
- `redirect_uri` 必须是在注册应用时定义的 URI 之一。
- `code` 只能使用一次。如果你需要获取新令牌，你将需要用户通过重复上述 [授权用户]({{< relref "client/authorized#authorize-the-user" >}}) 步骤再次授权。

此方法的响应是一个 [令牌]({{< relref "entities/token" >}}) 实体。我们将需要 `access_token` 值。获得访问令牌后，将其保存在本地缓存中。

生成的访问令牌的 `scope` 将为在 [授权请求]({{< relref "client/authorized#login" >}}) 期间批准的作用域。

{{< hint style="warning" >}}
你应该将 `access_token` 视为密码。我们建议你在存储在缓存中时加密此值，以防止意外的凭据泄露。
{{< /hint >}}

要在请求中使用它，请将 HTTP 标头 `Authorization: Bearer <access_token>` 添加到任何需要 OAuth 的 API 调用（即，不是公开可访问的）。

让我们通过调用 [GET /api/v1/accounts/verify_credentials]({{< relref "methods/accounts#verify_credentials" >}}) 来验证我们获得的凭据是否有效：

```bash
curl \
	-H 'Authorization: Bearer <access_token>' \
	https://mastodon.example/api/v1/accounts/verify_credentials
```

如果我们正确地获得了令牌并设置了请求格式，我们应该看到我们的详细信息按 [帐户]({{< relref "entities/account" >}}) 实体的格式返回给我们，其中包含 `source` 参数。

## 以授权用户身份执行操作 {#actions}

有了授权用户的 OAuth 令牌后，我们现在可以以该用户的身份执行令牌作用域内的任何操作。

### 发布和删除嘟文 {#statuses}

- 有关如何创建嘟文的信息，请查看 [POST /api/v1/statuses]({{< relref "methods/statuses#create" >}})。
  - 有关创建媒体附件的信息，请查看 [/api/v1/media]({{< relref "methods/media" >}})。
  - 有关管理计划嘟文的信息，请查看 [/api/v1/scheduled_statuses]({{< relref "methods/scheduled_statuses" >}})。

### 与时间线交互 {#timelines}

- 有关访问时间线的信息，请查看 [/api/v1/timelines]({{< relref "methods/timelines" >}})。
- 有关保存和加载时间线中的位置的信息，请查看 [/api/v1/markers]({{< relref "methods/markers" >}})。
- 有关对嘟文执行操作的信息，请查看 [/api/v1/statuses]({{< relref "methods/statuses" >}})。
  - 有关查看和参与投票的信息，请查看 [/api/v1/polls]({{< relref "methods/polls" >}})。
- 有关获取列表 ID 以与 [GET /api/v1/timelines/list/:list_id]({{< relref "methods/timelines#list" >}}) 一起使用的信息，请查看 [/api/v1/lists]({{< relref "methods/lists" >}})。
- 有关获取私下提及的信息，请查看 [/api/v1/conversations]({{< relref "methods/conversations" >}})。
- 有关喜欢列表的信息，请查看 [/api/v1/favourites]({{< relref "methods/favourites" >}})。
- 有关列出书签的信息，请查看 [/api/v1/bookmarks]({{< relref "methods/bookmarks" >}})。

### 与其他用户交互 {#accounts}

- 有关对其他用户执行操作的信息，请查看 [/api/v1/accounts]({{< relref "methods/accounts" >}})。
- 有关处理关注请求的信息，请查看 [/api/v1/follow_requests]({{< relref "methods/follow_requests" >}})。
- 有关隐藏列表的信息，请查看 [/api/v1/mutes]({{< relref "methods/mutes" >}})。
- 有关屏蔽列表的信息，请查看 [/api/v1/blocks]({{< relref "methods/blocks" >}})。

### 接收通知 {#notifications}

- 有关管理用户通知的信息，请查看 [/api/v1/notifications]({{< relref "methods/notifications" >}})。
- 有关订阅推送通知的信息，请查看 [/api/v1/push]({{< relref "methods/push" >}})。

### 发现功能 {#discovery}

- 有关查询资源的信息，请查看 [/api/v2/search]({{< relref "methods/search#v2" >}})。
- 有关推荐关注的账户的信息，请查看 [/api/v1/suggestions]({{< relref "methods/suggestions" >}})。

### 用户安全功能 {#safety}

- 有关管理过滤关键词的信息，请查看 [/api/v1/filters]({{< relref "methods/filters" >}})。
- 有关管理被屏蔽的实例的信息，请查看 [/api/v1/domain_blocks]({{< relref "methods/domain_blocks" >}})。
- 有关创建举报的信息，请查看 [/api/v1/reports]({{< relref "methods/reports" >}})。
- 有关审核操作的信息，请查看 [/api/v1/admin]({{< relref "methods/admin" >}})。

### 管理帐户信息 {#manage}

- 有关管理用户账户页中的特色帐户的信息，请查看 [/api/v1/endorsements]({{< relref "methods/endorsements" >}})。
- 有关管理用户账户页中的特色话题标签的信息，请查看 [/api/v1/featured_tags]({{< relref "methods/featured_tags" >}})。
- 有关读取用户设置的信息，请查看 [/api/v1/preferences]({{< relref "methods/preferences" >}})。

{{< translation-status-zh-cn raw_title="Logging in with an account" raw_link="/client/authorized/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
