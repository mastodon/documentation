---
title: Token
description: Represents an OAuth token used for authenticating with the API and performing actions.
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

## Example

```json
{
  "access_token": "ZA-Yj3aBD8U8Cm7lKUp-lm9O9BmDgdhHzDeqsY8tlL0",
  "token_type": "Bearer",
  "scope": "read write follow push",
  "created_at": 1573979017
}
```

## Attributes

### `access_token` {#access_token}

**Description:** An OAuth token to be used for authorization.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `token_type` {#token_type}

**Description:** The OAuth token type. Mastodon uses `Bearer` tokens.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `scope` {#scope}

**Description:** The OAuth scopes granted by this token, space-separated.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `created_at` {#created_at}

**Description:** When the token was generated.\
**Type:** Number (UNIX Timestamp)\
**Version history:**\
0.1.0 - added

## See also

{{< page-relref ref="oauth-scopes" caption="OAuth Scopes" >}}

{{< page-relref ref="methods/oauth" caption="oauth methods" >}}

{{< page-ref page="client/token" >}}

{{< page-ref page="client/authorized" >}}