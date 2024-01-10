---
title: Security
description: Public key cryptography and supported signature schemes over HTTP and JSON-LD.
menu:
  docs:
    weight: 30
    parent: spec
---

## HTTP Signatures {#http}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/request.rb" caption="app/lib/request.rb" >}}

[HTTP Signatures](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures) is a specification for signing HTTP messages by using a `Signature:` header with your HTTP request. Mastodon requires the use of HTTP Signatures in order to validate that any activity received was authored by the actor generating it. When secure mode is enabled, all GET requests require HTTP signatures as well.

For any HTTP request incoming to Mastodon, the Signature header should be attached:

```http
Signature: keyId="https://my.example.com/actor#main-key",headers="(request-target) host date",signature="Y2FiYW...IxNGRiZDk4ZA=="
```

The three parts of the `Signature:` header can be broken down like so:

```http
Signature:
  keyId="https://my.example.com/actor#main-key",
  headers="(request-target) host date",
  signature="Y2FiYW...IxNGRiZDk4ZA=="
```

The `keyId` should correspond to the actor and the key being used to generate the `signature`, whose value is equal to all parameters in `headers` concatenated together and signed by the key, then Base64-encoded. See [ActivityPub > Public key]({{< relref "activitypub#publicKey" >}}) for more information on actor keys. An example key looks like this:

```json
"publicKey": {
    "id": "https://my.example.com/actor#main-key",
    "owner": "https://my.example.com/actor",
    "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvXc4vkECU2/CeuSo1wtn\nFoim94Ne1jBMYxTZ9wm2YTdJq1oiZKif06I2fOqDzY/4q/S9uccrE9Bkajv1dnkO\nVm31QjWlhVpSKynVxEWjVBO5Ienue8gND0xvHIuXf87o61poqjEoepvsQFElA5ym\novljWGSA/jpj7ozygUZhCXtaS2W5AD5tnBQUpcO0lhItYPYTjnmzcc4y2NbJV8hz\n2s2G8qKv8fyimE23gY1XrPJg+cRF+g4PqFXujjlJ7MihD9oqtLGxbu7o1cifTn3x\nBfIdPythWu5b4cujNsB3m3awJjVmx+MHQ9SugkSIYXV0Ina77cTNS0M2PYiH1PFR\nTwIDAQAB\n-----END PUBLIC KEY-----\n"
 },
```

See also: [https://blog.joinmastodon.org/2018/07/how-to-make-friends-and-verify-requests/](https://blog.joinmastodon.org/2018/07/how-to-make-friends-and-verify-requests/)

### Creating HTTP signatures {#http-sign}

To create an HTTP signature, you will have to define which headers are being hashed and signed. For example, consider the following GET request:

```http
GET /users/username/outbox HTTP/1.1
Host: mastodon.example
Date: 18 Dec 2019 10:08:46 GMT
Accept: application/ld+json; profile="https://www.w3.org/ns/activitystreams"
```

The signature string is constructed using the values of the HTTP headers defined in `headers`, joined by newlines. Typically, you will want to include the request target, as well as the host and the date. Mastodon assumes `Date:` header if none are provided. For the above GET request, to generate a `Signature:` with `headers="(request-target) host date"` we would generate the following string:

```text
(request-target): get /users/username/outbox
host: mastodon.example
date: 18 Dec 2019 10:08:46 GMT
```

Note that we don't care about the `Accept:` header because we won't be specifying it in `headers`.

The signature string is then hashed with RSA-SHA256 (RSASSA-PKCS1-v1_5 with SHA-256) and signed with the actor's private key. The resulting value is attached as `signature` within the `Signature:` header. The final request looks like this:

```http
GET /users/username/inbox HTTP/1.1
Host: mastodon.example
Date: 18 Dec 2019 10:08:46 GMT
Accept: application/ld+json; profile="https://www.w3.org/ns/activitystreams"
Signature: keyId="https://my.example.com/actor#main-key",headers="(request-target) host date",signature="Y2FiYW...IxNGRiZDk4ZA=="
```

This request is functionally equivalent to saying that `https://my.example.com/actor` is requesting `https://mastodon.example/users/username/inbox` and is proving that they sent this request by signing `(request-target)`, `Host:`, and `Date:` with their private key linked at `keyId`, resulting in the provided `signature`.

#### Signing POST requests and the Digest header {#digest}

When making a POST request to Mastodon, you must calculate the RSA-SHA256 digest hash of your request's body and include this hash (in base64 encoding) within the `Digest:` header. The `Digest:` header must also be included within the `headers` parameter of the `Signature:` header. For example:

```http
POST /users/username/inbox HTTP/1.1
HOST: mastodon.example
Date: 18 Dec 2019 10:08:46 GMT
Digest: sha-256=hcK0GZB1BM4R0eenYrj9clYBuyXs/lemt5iWRYmIX0A=
Signature: keyId="https://my.example.com/actor#main-key",headers="(request-target) host date digest",signature="Y2FiYW...IxNGRiZDk4ZA=="
Content-Type: application/ld+json; profile="https://www.w3.org/ns/activitystreams"

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "actor": "https://my.example.com/actor",
  "type": "Create",
  "object": {
    "type": "Note",
    "content": "Hello!"
  },
  "to": "https://mastodon.example/users/username"
}
```

### Verifying HTTP signatures {#http-verify}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/concerns/signature_verification.rb" caption="app/controllers/concerns/signature_verification.rb" >}}

Consider the following request:

```http
POST /users/username/inbox HTTP/1.1
Host: mastodon.example
Date: 18 Dec 2019 10:08:46 GMT
Digest: e37e179c75071a291f90a5fd4f848da87b491f1282f7bb8509ef2115b81ee0f4
Signature: keyId="https://my.example.com/actor#main-key",headers="(request-target) host date digest",signature="Y2FiYW...IxNGRiZDk4ZA=="
Content-Type: application/ld+json; profile="https://www.w3.org/ns/activitystreams"

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "actor": "https://my.example.com/actor",
  "type": "Create",
  "object": {
    "type": "Note",
    "content": "Hello!"
  }
  "to": "https://mastodon.example/users/username"
}
```

Mastodon verifies the signature using the following algorithm:

* Split `Signature:` into its separate parameters.
* Construct the signature string from the value of `headers`.
* Fetch the `keyId` and resolve to an actor's `publicKey`.
* RSA-SHA256 hash the signature string and compare to the Base64-decoded `signature` as decrypted by `publicKey[publicKeyPem]`.
* Use the `Date:` header to check that the signed request was made within the past 12 hours.

## Linked Data Signatures {#ld}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/linked_data_signature.rb" caption="app/lib/activitypub/linked_data_signature.rb" >}}

{{< hint style="warning" >}}
Mastodon's current implementation of LD Signatures is outdated due to a change in the JSON-LD `@context` between the drafting stage and finalization stage of the specification. Mastodon expects a `type` of `RsaSignature2017` while later drafts instead define `RsaSignature2018` via the namespace `https://w3id.org/security/v2`. Furthermore, the LD Signatures specification as a whole has been superseded by the [Verifiable Credential Data Integrity 1.0](https://w3c.github.io/vc-data-integrity/) specification, which is largely incompatible with the earlier LD Signature spec. For this reason, it is not advised to implement support for LD Signatures.
{{< /hint >}}

[Linked Data Signatures 1.0](https://web.archive.org/web/20170923124140/https://w3c-dvcg.github.io/ld-signatures/) was a draft specification for attaching cryptographic signatures to JSON-LD documents. LD Signatures are not used widely within Mastodon, but they are used in the following situations:

- When running a [self-destruct]({{< relref "admin/tootctl#tootctl-self-destruct" >}}) sequence to send Delete activities to all known peers, the payload will use LD Signatures because HTTP Signatures will not be available. Receiving servers will process the signature by validating it against the locally cached actor key, since the HTTP server will no longer be hosting old actor information.
- When accepting activities from a relay. Public activities can optionally be sent to a relay with LD Signatures, and any server subscribing to a relay does not have to manually refetch the activity from the origin. This prevents having potentially infinite servers attempt to load the status from your instance.

### Creating LD signatures {#ld-sign}

To create a signature, Mastodon uses the keypair attached to an actor at `https://mastodon.example/users/username#main-key`. It then creates an RSA-SHA256 hash of the document, signs it with the keypair, and Base64-strict-encodes the resulting output to derive a `signatureValue`. The following hash is merged into the JSON-LD document:

```json
"signature": {
    "type": "RsaSignature2017",
    "creator": "https://mastodon.example/users/username#main-key",
    "created": "2019-12-08T03:48:33.901Z",
    "signatureValue": "s69F3mfddd99dGjmvjdjjs81e12jn121Gkm1"
}
```

### Verifying LD signatures {#ld-verify}

To verify a signature, Mastodon uses the following algorithm:

* Make sure that a `signature` exists and is a hash.
* Make sure that `signature[type]` is `RsaSignature2017`.
* Fetch the `signature[creator]` URI. Make sure the creator exists.
* Strip `type`, `id`, and `signatureValue` from the `signature`, leaving only `signature[creator]` and `signature[created]`.
* Base64-decode the `signatureValue` and verify it against the public key in `signature[creator]`.

