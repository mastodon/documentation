---
title: IdentityProof
description: 表示来自外部身份提供者的证明。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/identityproof",
  "/entities/IdentityProof",
  "/api/entities/identityproof",
  "/api/entities/IdentityProof",
]
---

{{< hint style="danger" >}}
身份证明已在 3.5.0 及更高版本中弃用。 在此之前，唯一受支持的证明提供商是 Keybase，但自从被 Zoom 收购以来，Keybase 的开发已完全停滞。
{{< /hint >}}

```json
{
  "provider": "Keybase",
  "provider_username": "gargron",
  "updated_at": "2019-07-21T20:14:39.596Z",
  "proof_url": "https://keybase.io/gargron/sigchain#5cfc20c7018f2beefb42a68836da59a792e55daa4d118498c9b1898de7e845690f",
  "profile_url": "https://keybase.io/gargron"
}
```

## 属性

### `provider` {#provider}

**描述:** 身份提供者的名称。\
**类型:** 字符串\
**版本历史:**\
2.8.0 - 添加

### `provider_username` {#provider_username}

**描述:** 帐户所有者在身份提供者服务上的用户名。\
**类型:** 字符串\
**版本历史:**\
2.8.0 - 添加

### `updated_at` {#updated_at}

**描述:** 身份证明最近一次更新的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
2.8.0 - 添加

### `proof_url` {#proof_url}

**描述:** 指向身份证明声明的链接，由身份提供商托管。\
**类型:** 字符串 (URL)\
**版本历史:**\
2.8.0 - 添加

### `profile_url` {#profile_url}

**描述:** 帐户所有者在身份提供者上的账户 URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
2.8.0 - 添加

## 另请参考

{{< page-relref ref="methods/accounts#identity_proofs" caption="GET /api/v1/accounts/:id/identity_proofs" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/pull/17045" caption="Remove Keybase integration (#17045)" >}}

{{< translation-status-zh-cn raw_title="IdentityProof" raw_link="/entities/IdentityProof/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
