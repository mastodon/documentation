---
title: Token
description: Represents an OAuth token used for authenticating with the API and performing actions.
menu:
  docs:
    parent: entities
---

## Example

```javascript
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
**Version history:** Added in 0.1.0

### `token_type` {#token_type}

**Description:** The OAuth token type. Mastodon uses `Bearer` tokens.\
**Type:** String\
**Version history:** Added in 0.1.0

### `scope` {#scope}

**Description:** The OAuth scopes granted by this token, space-separated.\
**Type:** String\
**Version history:** Added in 0.1.0

### `created_at` {#created_at}

**Description:** When the token was generated.\
**Type:** Number \(UNIX Timestamp\)\
**Version history:** Added in 0.1.0

## See also

* [Example authorization code flow]({{< relref "../client/token.md#example-authorization-code-flow" >}})
* [OAuth Scopes]({{< relref "../api/oauth-scopes.md" >}})
* [POST /oauth/token]({{< relref "../methods/apps/oauth.md#obtain-a-token" >}})

{{< page-ref page="methods/apps/oauth.md" >}}



