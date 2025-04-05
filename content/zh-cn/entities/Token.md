---
title: Token
description: 表示用于与 API 进行身份验证和执行操作的 OAuth 令牌。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/token",
  "/entities/Token",
  "/api/entities/token",
  "/api/entities/Token",
]
---

## 示例

```json
{
  "access_token": "ZA-Yj3aBD8U8Cm7lKUp-lm9O9BmDgdhHzDeqsY8tlL0",
  "token_type": "Bearer",
  "scope": "read write follow push",
  "created_at": 1573979017
}
```

## 属性

### `access_token` {#access_token}

**描述:** 用于授权的 OAuth 令牌。\
**类型:** 字符串\
**版本历史:**\
0.1.0 - 添加

### `token_type` {#token_type}

**描述:** OAuth 令牌类型。 Mastodon 使用 `Bearer` 令牌。\
**类型:** 字符串\
**版本历史:**\
0.1.0 - 添加

### `scope` {#scope}

**描述:** 此令牌授予的 OAuth 作用域，以空格分隔。\
**类型:** 字符串\
**版本历史:**\
0.1.0 - 添加

### `created_at` {#created_at}

**描述:** 令牌生成的时间。\
**类型:** Number (UNIX 时间戳)\
**版本历史:**\
0.1.0 - 添加

## 另请参阅

{{< page-relref ref="oauth-scopes" caption="OAuth 作用域" >}}

{{< page-relref ref="methods/oauth" caption="oauth 方法" >}}

{{< page-ref page="client/token" >}}

{{< page-ref page="client/authorized" >}}

{{< translation-status-zh-cn raw_title="Token" raw_link="/entities/Token/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
