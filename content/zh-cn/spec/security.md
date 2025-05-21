---
title: 安全性
description: 基于 HTTP 和 JSON-LD 的公钥加密与支持的签名方案。
menu:
  docs:
    weight: 30
    parent: spec
---

## HTTP 签名 {#http}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/request.rb" caption="app/lib/request.rb" >}}

[HTTP 签名](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures) 是一项通过在 HTTP 请求中使用 `Signature:` 标头来签署 HTTP 消息的规范。为了验证接收到的任何活动是否由生成该活动的行为体所创作，Mastodon 要求使用 HTTP 签名。启用安全模式后，所有 GET 请求也需要 HTTP 签名。

对于任何传入 Mastodon 的 HTTP 请求，都应附加 Signature 头：

```http
Signature: keyId="https://my.example.com/actor#main-key",headers="(request-target) host date",signature="Y2FiYW...IxNGRiZDk4ZA=="
```

`Signature:` 头的三个部分可以分解如下：

```http
Signature:
  keyId="https://my.example.com/actor#main-key",
  headers="(request-target) host date",
  signature="Y2FiYW...IxNGRiZDk4ZA=="
```

`keyId` 应与行为体和用于生成 `signature` 的密钥相对应，`signature` 的值等于 `headers` 中的所有参数连接在一起并由密钥签名，然后进行 Base64 编码后得到的值。有关行为体密钥的更多信息，请查看 [ActivityPub > 公钥]({{< relref "activitypub#publicKey" >}})。一个示例密钥如下所示：

```json
"publicKey": {
    "id": "https://my.example.com/actor#main-key",
    "owner": "https://my.example.com/actor",
    "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvXc4vkECU2/CeuSo1wtn\nFoim94Ne1jBMYxTZ9wm2YTdJq1oiZKif06I2fOqDzY/4q/S9uccrE9Bkajv1dnkO\nVm31QjWlhVpSKynVxEWjVBO5Ienue8gND0xvHIuXf87o61poqjEoepvsQFElA5ym\novljWGSA/jpj7ozygUZhCXtaS2W5AD5tnBQUpcO0lhItYPYTjnmzcc4y2NbJV8hz\n2s2G8qKv8fyimE23gY1XrPJg+cRF+g4PqFXujjlJ7MihD9oqtLGxbu7o1cifTn3x\nBfIdPythWu5b4cujNsB3m3awJjVmx+MHQ9SugkSIYXV0Ina77cTNS0M2PYiH1PFR\nTwIDAQAB\n-----END PUBLIC KEY-----\n"
 },
```

另请查看：[https://blog.joinmastodon.org/2018/07/how-to-make-friends-and-verify-requests/](https://blog.joinmastodon.org/2018/07/how-to-make-friends-and-verify-requests/)

### 创建 HTTP 签名 {#http-sign}

要创建 HTTP 签名，你必须定义要执行哈希和签名的标头。例如，考虑以下 GET 请求：

```http
GET /users/username/outbox HTTP/1.1
Host: mastodon.example
Date: 18 Dec 2019 10:08:46 GMT
Accept: application/ld+json; profile="https://www.w3.org/ns/activitystreams"
```

签名字符串使用 `headers` 中定义的 HTTP 标头的值构建，并用换行符连接。通常，你希望包括请求目标，以及主机和日期。如果没有提供 `Date:` 标头，Mastodon 会进行假定。对于上面的 GET 请求，为了使用 `headers="(request-target) host date"` 生成 `Signature:`，我们将生成以下字符串：

```text
(request-target): get /users/username/outbox
host: mastodon.example
date: 18 Dec 2019 10:08:46 GMT
```

请注意，我们不关心 `Accept:` 标头，因为我们不会在 `headers` 中指定它。

然后，使用 RSA-SHA256（使用 SHA-256 的 RSASSA-PKCS1-v1_5）对签名字符串执行哈希处理，并使用行为体的私钥进行签名。结果作为 `signature` 附加在 `Signature:` 头中。最终的请求如下所示：

```http
GET /users/username/inbox HTTP/1.1
Host: mastodon.example
Date: 18 Dec 2019 10:08:46 GMT
Accept: application/ld+json; profile="https://www.w3.org/ns/activitystreams"
Signature: keyId="https://my.example.com/actor#main-key",headers="(request-target) host date",signature="Y2FiYW...IxNGRiZDk4ZA=="
```

此请求在功能上等同于说 `https://my.example.com/actor` 正在请求 `https://mastodon.example/users/username/inbox`，并通过使用链接到 `keyId` 的私钥对 `(request-target)`、`Host:` 和 `Date:` 进行签名来证明他们发送了此请求，从而生成提供的 `signature`。

#### 签名 POST 请求和摘要标头 {#digest}

在向 Mastodon 发出 POST 请求时，你必须计算请求正文的 RSA-SHA256 摘要哈希，并将此哈希（以 base64 编码）包含在 `Digest:` 标头中。`Digest:` 标头也必须包含在 `Signature:` 标头的 `headers` 参数中。例如：

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

### 验证 HTTP 签名 {#http-verify}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/concerns/signature_verification.rb" caption="app/controllers/concerns/signature_verification.rb" >}}

考虑以下请求：

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

Mastodon 使用以下算法验证签名：

* 将 `Signature:` 分解为单独的参数。
* 从 `headers` 的值构造签名字符串。
* 获取 `keyId` 并解析为行为体的 `publicKey`。
* 对签名字符串执行 RSA-SHA256 哈希处理，并将其与用 `publicKey[publicKeyPem]` 解密的 Base64 解码后的 `signature` 进行比较。
* 使用 `Date:` 标头检查已签名的请求是否在过去 12 小时内发出。

## 关联数据签名 {#ld}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/linked_data_signature.rb" caption="app/lib/activitypub/linked_data_signature.rb" >}}

{{< hint style="warning" >}}
由于在草案阶段和规范最终确定阶段之间 JSON-LD `@context` 发生了更改，Mastodon 当前的 LD 签名实现已过时。Mastodon 期望 `type` 为 `RsaSignature2017`，而后来的草案通过命名空间 `https://w3id.org/security/v2` 定义了 `RsaSignature2018`。此外，整个 LD 签名规范已被 [可验证凭据完整性规范 1.0](https://w3c.github.io/vc-data-integrity/) 取代，该规范与早期 LD 签名规范在很大程度上不兼容。因此，不建议实现对 LD 签名的支持。
{{< /hint >}}

[关联数据签名 1.0](https://web.archive.org/web/20170923124140/https://w3c-dvcg.github.io/ld-signatures/) 是一项将加密签名附加到 JSON-LD 文档的草案规范。LD 签名在 Mastodon 中使用不广泛，但在以下情况下使用：

- 运行 [自毁]({{< relref "admin/tootctl#tootctl-self-destruct" >}}) 序列以将 Delete 活动发送到所有已知联合实例时，有效负载将使用 LD 签名，因为 HTTP 签名将不可用。接收服务器将通过针对本地缓存的行为体密钥验证签名来处理签名，因为 HTTP 服务器将不再托管旧的行为体信息。
- 接受来自中继的活动时。公共活动可以选择使用 LD 进行签名并发送给中继，这样任何订阅中继的服务器都不必手动从源重新获取活动。这可以防止潜在的无限多服务器尝试从你的实例加载嘟文。

### 创建 LD 签名 {#ld-sign}

要创建签名，Mastodon 使用附加到位于 `https://mastodon.example/users/username#main-key` 的行为体的密钥对。然后，它创建文档的 RSA-SHA256 哈希，使用密钥对对其进行签名，并对生成的输出进行 Base64 严格编码以派生 `signatureValue`。以下哈希将被合并到 JSON-LD 文档中：

```json
"signature": {
    "type": "RsaSignature2017",
    "creator": "https://mastodon.example/users/username#main-key",
    "created": "2019-12-08T03:48:33.901Z",
    "signatureValue": "s69F3mfddd99dGjmvjdjjs81e12jn121Gkm1"
}
```

### 验证 LD 签名 {#ld-verify}

要验证签名，Mastodon 使用以下算法：

* 确保 `signature` 存在且为哈希。
* 确保 `signature[type]` 为 `RsaSignature2017`。
* 获取 `signature[creator]` URI。确保创建者存在。
* 从 `signature` 中剥离 `type`、`id` 和 `signatureValue`，只留下 `signature[creator]` 和 `signature[created]`。
* 对 `signatureValue` 进行 Base64 解码，并根据 `signature[creator]` 中的公钥对其进行验证。

{{< translation-status-zh-cn raw_title="Security" raw_link="/spec/security/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
