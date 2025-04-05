---
title: OAuth 令牌
description: 定义本文档中使用的令牌类型
menu:
  docs:
    weight: 15
    parent: api
---

## OAuth 令牌

Mastodon 支持两种不同的 OAuth 令牌类型：应用令牌和用户令牌。在本文档中，你将在 API 端点的 `OAuth` 字段中看到对这些令牌类型的引用。

`OAuth` 字段也引用了“Public”，在这种情况下，访问 API 端点无需提供 OAuth 访问令牌。

### 应用令牌

要接收应用令牌，你必须执行[客户端凭据授权流程]({{<relref "client/token#flow" >}})，这将为你提供一个令牌，该令牌可用于代表 OAuth 应用程序与 API 交互。目前，只有以下 API 端点接受此令牌类型：

- [`GET /api/v1/apps/verify_credentials`]({{<relref "methods/apps#verify_credentials" >}})
- [`POST /api/v1/accounts`]({{<relref "/methods/accounts#create" >}})

### 用户令牌

要创建用户令牌，你必须执行[授权码授权流程]({{<relref "client/authorized#flow">}})，这将为你提供一个与批准访问授权请求的用户关联的访问令牌。

许多 Mastodon API 需要用户令牌和特定的作用域才能访问。

{{< translation-status-zh-cn raw_title="OAuth Tokens" raw_link="/api/oauth-tokens/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
