---
title: IdentityProof
description: Represents a proof from an external identity provider.
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
Identity proofs have been deprecated in 3.5.0 and newer. Previously, the only proof provider was Keybase, but development on Keybase has stalled entirely since it was acquired by Zoom.
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

## Attributes

### `provider` {#provider}

**Description:** The name of the identity provider.\
**Type:** String\
**Version history:**\
2.8.0 - added

### `provider_username` {#provider_username}

**Description:** The account owner's username on the identity provider's service.\
**Type:** String\
**Version history:**\
2.8.0 - added

### `updated_at` {#updated_at}

**Description:** When the identity proof was last updated.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
2.8.0 - added

### `proof_url` {#proof_url}

**Description:** A link to a statement of identity proof, hosted by the identity provider.\
**Type:** String (URL)\
**Version history:**\
2.8.0 - added

### `profile_url` {#profile_url}

**Description:** The account owner's profile URL on the identity provider.\
**Type:** String (URL)\
**Version history:**\
2.8.0 - added

## See also

{{< page-relref ref="methods/accounts#identity_proofs" caption="GET /api/v1/accounts/:id/identity_proofs" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/pull/17045" caption="Remove Keybase integration (#17045)" >}}





