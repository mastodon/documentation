---
title: WebFinger
description: 将 `user@domain` mentions 转换为 Actor 账户 URI。
menu:
  docs:
    weight: 20
    parent: spec
---

## 什么是 WebFinger，为何使用它？ {#intro}

在 Mastodon 中，账户可以托管在与你的账户相同的站点，也可以托管在一个完全不同的站点。同一个用户名可能会在不同的域名上使用。因此，一个完整的 Mastodon 用户 mentions 由用户名和域名两部分组成，格式为 `@username@domain`。实际上，`@user@example.com` 与 `@user@example.org` 是不同的。如果不包含域名，Mastodon 会尝试查找名为 `@username` 的本地用户。但是，为了通过 ActivityPub 将内容递送给某人，仅有 `@username@domain` mentions 是不够的 —— **必须首先将 mentions 转换为 HTTPS URI**，这样才能找到远程 Actor 的收件箱和发件箱。

于是就有了 WebFinger。如 [RFC 7033](https://tools.ietf.org/html/rfc7033) 所述，WebFinger 是一项规范，它定义了**一种在仅知道特定服务器上的 URI 的情况下解析资源链接的方法**。这使得任何人都能在无需事先知道资源确切地址的情况下查找资源的位置；例如，可以通过电子邮件或电话号码进行查找。此查找请求将被发往 `/.well-known/webfinger` 端点，并附带一个 `resource` 查询参数。Mastodon 使用的资源 URI 是 [RFC 7565](https://tools.ietf.org/html/rfc7565) 中描述的 `acct:` URI，其包含了托管在特定域名上的账户的用户名。

{{< hint style="danger" >}}
**由于 Mastodon 严重依赖 mentions 来定位其他账户，因此要与 Mastodon 完全互操作，WebFinger 是必需的。** 用户通常可以通过搜索直接的 HTTPS URI（如果知道对应的 URI 的话）或 `username@domain` 地址来加载账户，但 Mastodon 的内部逻辑几乎完全依赖于 `acct:` URI 或 `username@domain` 表示形式。如果一个 ActivityPub 实现不支持 WebFinger，那么搜索任何对象或账户都会失败，因为其作者无法被转换为本地数据库中的用户。
{{< /hint >}}

## WebFinger 流程示例 {#example}

假设我们想要查找托管在 `mastodon.social` 网站上的用户 `@Gargron`。

只需向该域名的 `/.well-known/webfinger` 端点发起请求，并将 `resource` 查询参数设置为 `acct:` URI 即可。

{{< code title="https://mastodon.social/.well-known/webfinger?resource=acct:gargron@mastodon.social" >}}
```json
{
  "subject": "acct:Gargron@mastodon.social",
  "aliases": [
    "https://mastodon.social/@Gargron",
    "https://mastodon.social/users/Gargron"
  ],
  "links": [
    {
      "rel": "http://webfinger.net/rel/profile-page",
      "type": "text/html",
      "href": "https://mastodon.social/@Gargron"
    },
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://mastodon.social/users/Gargron"
    },
    {
      "rel": "http://ostatus.org/schema/1.0/subscribe",
      "template": "https://mastodon.social/authorize_interaction?uri={uri}"
    }
  ]
}
```
{{< /code >}}

您可以解析此 JSON 响应，以查找具有您所需类型的链接。对于 ActivityPub 的 `id`，我们特别关注查找 `application/activity+json` 类型。

这样，我们就将 `@Gargron@mastodon.social` 转换为了 `https://mastodon.social/users/Gargron`，现在我们可以在需要时将此 URI 作为 `id`，通过 ActivityPub 进行交互。

{{< code title="示例活动" >}}
```json
{
"id": "https://social.example/activities/1",
"type": "Create",
"actor": "https://social.example/actors/1",
"object": {
    "id": "https://social.example/objects/1",
    "type": "Note",
    "content": "Hello, Gargron!"
},
"to": "https://mastodon.social/users/Gargron"
}
```
{{< /code >}}

请注意，在上面的示例中，`social.example` 并未使用与 Mastodon 相同的 URI 结构。因此，我们无法仅根据用户名和域名猜测出行为体的 `id`。但是，如果 `social.example` 支持 WebFinger，那么我们可以通过请求 `https://social.example/.well-known/webfinger?resource=acct:username@social.example` 并解析响应中类型为 `application/ld+json; profile="https://www.w3.org/ns/activitystreams"` 或 `application/activity+json` 的链接来获取此 `id`。此链接还应具有 `rel="self"` 的链接关系。

## Mastodon 对 WebFinger 的要求

处理格式为 `username@domain` 或 `@username@domain` 的账户时，Mastodon 将执行以下操作：

- 使用该用户名和域名构造一个 `acct:` URI
- 对该 `resource` 发起 WebFinger 请求

利用该 WebFinger 响应，Mastodon 将检查以下内容：

- `subject` 存在
- `links` 数组包含一个链接，其 `rel` 为 `self` 且 `type` 为 `application/ld+json; profile="https://www.w3.org/ns/activitystreams"` 或 `application/activity+json`
  - 此链接的 `href` 解析为一个 ActivityPub Actor

利用该 ActivityPub 行为体表示（行为体表示可能在没有初始 WebFinger 请求的情况下被直接提供），Mastodon 将执行以下操作：

- 获取 `preferredUsername` 和行为体所在服务器的主机名
- 使用该用户名和域名构造一个 `acct:` URI
- 对该 `resource` 发起 WebFinger 请求

如果 `subject` 与 `resource` 匹配，则流程在此停止。否则，如果 `subject` 包含不同的规范账户 URI，则 Mastodon 将对该规范账户 URI 执行额外的 WebFinger 请求，以确保这个新的 `resource` 链接到同一个 ActivityPub Actor，并检查相同的条件。

换句话说，以下情况是有效的：

- 向 `example.com` 请求资源 `acct:alice@example.com`，返回一个指向域名 `example.com` 上 Actor 的链接，其 `preferredUsername` 为 `alice`，并且 `subject` 与请求的 `resource` `acct:alice@example.com` 匹配。
- 向 `example.com` 请求资源 `acct:alice@example.com`，返回一个指向域名 `ap.example.com` 上 Actor 的链接，其 `preferredUsername` 为 `alice`。
  - ...然后，向 `ap.example.com` 请求资源 `acct:alice@ap.example.com`，返回的 `subject` 为 `acct:alice@example.com`，并链接到同一个行为体。

## 另请参阅

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/activitypub/fetch_remote_actor_service.rb" caption="app/services/activitypub/fetch_remote_actor_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/resolve_account_service.rb" caption="app/services/resolve_account_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/webfinger.rb" caption="app/lib/webfinger.rb" >}}

{{< translation-status-zh-cn raw_title="WebFinger" raw_link="/spec/webfinger/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
