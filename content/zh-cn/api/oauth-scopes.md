---
title: OAuth 作用域
description: 定义你对 API 拥有哪些权限
menu:
  docs:
    weight: 20
    parent: api
---

## OAuth 作用域

API 访问被划分为若干 OAuth 作用域，这些作用域基于 [访问令牌]({{< relref "api/oauth-tokens" >}}) 注册和请求的作用域，限制 API 客户端可以执行的操作。Mastodon 中的作用域是分层的。例如，如果你请求了 `read` 作用域，你将自动获得 `read:accounts` 的访问权限。然而，**我们建议你的应用程序尽可能请求最有限的作用域**，也就是说，如果你只需要对列表和当前用户账户详情的读取权限，那么你应该使用 `profile read:lists` 作为你的作用域，而不是 `read`。

{{< hint style="info" >}}
如果只是想检索当前已验证用户的详细信息，请使用 `profile` 作用域，该作用域只能访问 [`GET /api/v1/accounts/verify_credentials`]({{< relref "methods/accounts#verify_credentials" >}}) 端点。\
此作用域是在 Mastodon 4.3 中添加的，因此我们建议在使用此作用域时，遵循下面“发现给定 Mastodon 实例支持的 OAuth 作用域”的指引。
{{</ hint >}}

### 发现给定 Mastodon 实例支持的 OAuth 作用域

从 Mastodon 4.3.0 开始，增加了对 [RFC 8414](https://tools.ietf.org/html/rfc8414)'s `GET /.well-known/oauth-authorization-server` 终端的支持，允许你发现 Mastodon 实例支持的作用域（以及其他 OAuth 相关信息，例如终端和授权流程）。

我们建议使用此终端，以便为你的 OAuth 应用程序支持多个 Mastodon 版本。

如果你向 `GET /.well-known/oauth-authorization-server` 终端发出请求，并且返回 404，那么你可以认为该 Mastodon 实例运行的版本低于 4.3。在这种情况下，你需要查看你的应用程序需要的特定作用域，以及你希望支持的 Mastodon 版本范围内最低的通用作用域。

{{< hint style="info" >}}
**示例：** 你想使用 `profile` 作用域，但也想支持没有该作用域且需要 `read:accounts` 的旧 Mastodon 实例。你可以通过向此终端发出请求来发现实例是否支持该作用域。
{{< /hint >}}

{{< page-relref ref="methods/oauth#authorization-server-metadata" caption="GET /.well-known/oauth-authorization-server" >}}

### 可以同时请求多个作用域

在创建应用程序期间，你可以使用 `scopes` 参数指定多个以空格分隔的作用域。在授权阶段，你可以使用 `scope` 查询参数执行相同的操作。

{{< hint style="danger" >}}
在应用程序创建期间保存的作用域集必须包含你将在授权请求中请求的所有作用域，否则，授权将失败。
{{< /hint >}}

{{< hint style="info" >}}
请注意 `scope` 和 `scopes` 的区别。这是因为 `scope` 是一个标准的 OAuth 参数名称，因此它在 OAuth 方法中使用。Mastodon 自己的 REST API 使用更合适的 `scopes` 名称。
{{< /hint >}}

如果你没有在授权请求中指定 `scope`，或者在应用程序创建请求中指定 `scopes`，则生成的访问令牌/应用程序将被分配默认作用域。截至 Mastodon 4.3，当前为 `read`，但将来可能会更改。

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

### 版本历史 {#versions}

- 0.9.0 - 添加了 read、write、follow 作用域
- 2.4.0 - 添加了用于推送通知的 push 作用域
- 2.4.3 - 添加了细粒度作用域 [#7929](https://github.com/mastodon/mastodon/pull/7929)
- 2.6.0 - 弃用了 `read:reports`（未使用的存根） [#8736/adcf23f](https://github.com/mastodon/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f)
- 2.6.0 - 添加了 `write:conversations` [#9009](https://github.com/mastodon/mastodon/pull/9009)
- 2.9.1 - 添加了管理和审核作用域 [#9387](https://github.com/mastodon/mastodon/pull/9387)
- 3.1.0 - 添加了书签作用域 [#7107](https://github.com/mastodon/mastodon/pull/7107)
- 3.5.0 - 弃用了 `follow` 作用域，转而支持细粒度作用域 [#17678](https://github.com/mastodon/mastodon/pull/17678)
- 4.1.0 - 添加了用于阻止和允许的管理员作用域 [#20918](https://github.com/mastodon/mastodon/pull/20918)
- 4.3.0 - 添加了 `profile` 作用域，仅用于获取有关当前已验证用户的信息 [#29087](https://github.com/mastodon/mastodon/pull/29087), [#30357](https://github.com/mastodon/mastodon/pull/30357)

## 高级作用域列表

我们建议你使用下表中右栏显示的[细粒度作用域](#granular-scopes)，而不是使用以下作用域：

- `read`
- `write`
- `follow` {{%deprecated%}}
- `admin:read`
- `admin:write`

当只需要有关当前已验证用户的信息时，请使用 `profile` 作用域。

### `profile` {#profile}

仅授予对 [`GET /api/v1/accounts/verify_credentials`]({{< relref "methods/accounts#verify_credentials" >}}) 终端的访问权限。允许你仅检索有关当前已验证用户的信息。

### `read` {#read}

授予读取数据的权限，包括其他用户的数据。请求 `read` 也会授予下表中右栏所示的[细粒度作用域](#granular-scopes)。

### `write` {#write}

授予写入数据的权限。请求 `write` 也会授予下表中右栏所示的[细粒度作用域](#granular-scopes)。

### `push` {#push}

授予对 [Web Push API 订阅]({{< relref "methods/push" >}})的访问权限。在 Mastodon 2.4.0 中添加。

### `follow` {#follow}

{{< hint style="danger" >}}
**已弃用**\
此作用域已在 3.5.0 及更高版本中弃用。你应该单独请求[细粒度作用域](#granular-scopes)，或者根据需要请求 `read`/`write` 作用域。
{{< /hint >}}

授予管理关系的权限。请求 `follow` 也会授予下表中右栏所示的[细粒度作用域](#granular-scopes)。

### `admin:read` 和 `admin:write` {#admin}

用于管理和审核 API。在 Mastodon 2.9.1 中添加。

请求 `admin:read` 或 `admin:write` 也会授予下表中右栏所示的[细粒度作用域](#granular-scopes)。

{{< hint style="info" >}}
请注意，没有可用的单一 `admin` 作用域。
{{< /hint >}}

## 细粒度作用域 {#granular}

建议你使用细粒度作用域，除非你确实需要通过使用 `scope` 的 `read write follow push` 对所有内容进行完全访问。

| 作用域                     | 细粒度作用域                      |
| :------------------------ | :----------------------------------- |
| `profile`                 |                                      |
| `push`                    |                                      |
| `read`                    |                                      |
|                           | `read:accounts`                      |
|                           | `read:blocks`                        |
|                           | `read:bookmarks`                     |
|                           | `read:favourites`                    |
|                           | `read:filters`                       |
|                           | `read:follows`                       |
|                           | `read:lists`                         |
|                           | `read:mutes`                         |
|                           | `read:notifications`                 |
|                           | `read:search`                        |
|                           | `read:statuses`                      |
| `write`                   |                                      |
|                           | `write:accounts`                     |
|                           | `write:blocks`                       |
|                           | `write:bookmarks`                    |
|                           | `write:conversations`                |
|                           | `write:favourites`                   |
|                           | `write:filters`                      |
|                           | `write:follows`                      |
|                           | `write:lists`                        |
|                           | `write:media`                        |
|                           | `write:mutes`                        |
|                           | `write:notifications`                |
|                           | `write:reports`                      |
|                           | `write:statuses`                     |
| `follow` {{%deprecated%}} |                                      |
|                           | `read:follows`                       |
|                           | `write:follows`                      |
|                           | `read:blocks`                        |
|                           | `write:blocks`                       |
|                           | `read:mutes`                         |
|                           | `write:mutes`                        |
| `admin:read`              |                                      |
|                           | `admin:read:accounts`                |
|                           | `admin:read:reports`                 |
|                           | `admin:read:domain_allows`           |
|                           | `admin:read:domain_blocks`           |
|                           | `admin:read:ip_blocks`               |
|                           | `admin:read:email_domain_blocks`     |
|                           | `admin:read:canonical_email_blocks`  |
| `admin:write`             |                                      |
|                           | `admin:write:accounts`               |
|                           | `admin:write:reports`                |
|                           | `admin:write:domain_allows`          |
|                           | `admin:write:domain_blocks`          |
|                           | `admin:write:ip_blocks`              |
|                           | `admin:write:email_domain_blocks`    |
|                           | `admin:write:canonical_email_blocks` |

## 已删除的作用域 {#removed}

* Mastodon 3.2.0 到 4.3.0 版本确实支持用于端到端加密 API 的 `crypto` 作用域，但是，此功能从未被记录或完全实现，并且已从 4.3.0 版本中删除。使用该作用域注册的任何应用程序在服务器升级到 4.3.0 及更高版本时，都将被删除该作用域。

{{< translation-status-zh-cn raw_title="OAuth Scopes" raw_link="/api/oauth-scopes/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
