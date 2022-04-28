---
title: IdentityProof
description: Represents a proof from an external identity provider.
menu:
  docs:
    parent: entities
---

```javascript
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
**Version history:** Added in 2.8.0

### `provider_username` {#provider_username}

**Description:** The account owner's username on the identity provider's service.\
**Type:** String\
**Version history:** Added in 2.8.0

### `profile_url` {#profile_url}

**Description:** The account owner's profile URL on the identity provider.\
**Type:** String \(URL\)\
**Version history:** Added in 2.8.0

### `proof_url` {#proof_url}

**Description:** A link to a statement of identity proof, hosted by the identity provider.\
**Type:** String \(URL\)\
**Version history:** Added in 2.8.0

### `updated_at` {#updated_at}

**Description:** When the identity proof was last updated.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:** Added in 2.8.0

## See also

* [GET /api/v1/accounts/:id/identity\_proofs]({{< relref "../methods/accounts/#identity-proofs" >}})
* /api/proofs
* [About identity proofs]({{< relref "../user/contacts.md#identity-proofs" >}})

{{< caption-link url="https://github.com/mastodon/mastodon/blob/master/app/serializers/rest/identity_proof_serializer.rb" caption="app/serializers/rest/identity\_proof\_serializer.rb" >}}





