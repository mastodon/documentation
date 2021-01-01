---
title: proofs
description: For use by identity providers.
menu:
  docs:
    weight: 100
    parent: methods
---

{{< api-method method="get" host="https://mastodon.example" path="/api/proofs" title="View identity proof" >}}
{{< api-method-description >}}

**Returns:** custom response defined by provider\
**OAuth:** Public\
**Version history:**\
2.8.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="provider" type="string" required=false >}}
The identity provider to be looked up. Currently only supports `keybase` \(case-sensitive\)
{{< endapi-method-parameter >}}
{{< api-method-parameter name="username" type="string" required=false >}}
The username on the selected identity provider
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

`gargron` on `keybase`
{{< endapi-method-response-example-description >}}


```javascript
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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

No identity proof found for `username` on `provider`
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


