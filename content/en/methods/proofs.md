---
title: proofs API methods
summary: For use by identity providers.
menu:
  docs:
    weight: 100
    name: proofs
    parent: methods
    identifier: methods-proofs
aliases: [
  "/methods/proofs",
  "/api/methods/proofs",
  "/methods/accounts/proofs",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

{{< hint style="danger" >}}
**Deprecated**\
Identity proofs have been deprecated in 3.5.0 and newer. Previously, the only proof provider was Keybase, but development on Keybase has stalled entirely since it was acquired by Zoom.
{{< /hint >}}

## (REMOVED) View identity proofs {#get}

```http
GET /api/proofs HTTP/1.1
```

**Returns:** custom response defined by provider\
**OAuth:** Public\
**Version history:**\
2.8.0 - added

#### Request
##### Query parameters

provider
: String. The identity provider to be looked up. Currently only supports `keybase` (case-sensitive).

username
: String. The username on the selected identity provider.

#### Response
##### 200: OK

Looking up the `username` "gargron" via the "keybase" `provider`

```json
{
  "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
  "signatures": [
    {
      "sig_hash": "5cfc20c7018f2beefb42a68836da59a792e55daa4d118498c9b1898de7e845690f",
      "kb_username": "gargron"
    }
  ]
}
```

##### 404: Not found

No identity proof found for `username` on `provider`

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/pull/17045" caption="Remove Keybase integration (#17045)" >}}