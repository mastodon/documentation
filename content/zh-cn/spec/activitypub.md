---
title: ActivityPub
description: 基于 ActivityStreams 2.0 数据格式和 JSON-LD 的去中心化社交网络协议。
menu:
  docs:
    weight: 10
    parent: spec
---

## 嘟文的联合 {#status}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/activity.rb" caption="app/lib/activitypub/activity.rb" >}}

### 嘟文支持的 Activity 类型

Create
: 转换为嘟文并保存到数据库中

Delete
: 从数据库中删除嘟文

Like
: 转换为嘟文的点赞

Announce
: 转换为嘟文的转发

Update
: 刷新投票计数（针对投票）。自 Mastodon 3.5.0 起：当存在 `updated` 时间戳时，编辑嘟文。

Undo
: 撤销之前的 Like 或 Announce。

Flag
: 转换为向审核团队的举报。更多信息请查看 [举报](#Flag) 扩展。

### 载荷

Mastodon 主要支持的对象类型为 `Note` 和 `Question`。

- Notes 会转换为常规嘟文。
- Questions 会转换为投票嘟文。更多信息请查看 [投票](#Question) 扩展。

某些其他对象类型会尽可能地进行转换：

- Article
- Page
- Image
- Audio
- Video
- Event

转换器会使用 `content` 属性（如果可用），否则使用 `name` 属性来生成嘟文文本。 `url` 属性将会被追加到文本之后。 `summary` 属性将被用作内容警告 (CW) 文本。 `icon` 属性将被用作缩略图。

### HTML 清洗 {#sanitization}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/sanitize_ext/sanitize_config.rb" caption="lib/sanitize_ext/sanitize_config.rb" >}}

Mastodon 会清洗接收到的 HTML，以避免破坏 API 客户端开发者的假设。受支持的元素将保持原样，不受支持的元素将被转换或移除。受支持的属性将被保留，所有其他属性将被剥离。以下是支持的元素和属性：

- `<p>`
- `<span>` (`class`)
- `<br>`
- `<a>` (`href`, `rel`, `class`)
- 列表将会被转换为 `<p>`，并且列表项之间会用 `<br>` 分隔

自 Mastodon v4.2 起，支持以下元素和属性：

- `<p>`
- `<span>` (`class`)
- `<br>`
- `<a>` (`href`, `rel`, `class`)
- `<del>`
- `<pre>`
- `<code>`
- `<em>`
- `<strong>`
- `<b>`
- `<i>`
- `<u>`
- `<ul>`
- `<ol>` (`start`, `reversed`)
- `<li>` (`value`)
- `<blockquote>`
- 标题将会被转换为 `<strong>`，然后包裹在 `<p>` 中

清洗器会保留以 microformats 前缀开头或属于语义类的 class：

- h-*
- p-*
- u-*
- dt-*
- e-*
- mention
- hashtag
- ellipsis
- invisible

如果链接协议受支持，则链接将被保留，否则将被转换为文本。以下是受支持的链接协议：

- http
- https
- dat
- dweb
- ipfs
- ipns
- ssb
- gopher
- xmpp
- magnet
- gemini

### 使用的属性

content
: 用作嘟文文本

name
: 用作嘟文文本（如果要转换的对象类型没有提供 `content`）

summary
: 用作内容警告 (CW) 文本

sensitive
: 用于确定嘟文媒体或文本是否应默认隐藏。有关 `as:sensitive` 的更多信息，请查看 [敏感内容](#sensitive) 扩展部分

inReplyTo
: 用于将嘟文作为回复串联到另一个嘟文

published
: 用作嘟文日期

url
: 用于嘟文永久链接，并且也会附加到转换对象的文本中

attributedTo
: 用于确定嘟文的作者的账户

to/cc
: 结合 mentions 一起使用，以确定嘟文的受众和可见性。请查看 [用于寻址和通知的 Mentions](#Mention)

tag
: 用于标记 mentions 和 hashtags。

tag[].type
: 当前支持 `Mention`、`Hashtag` 或 `Emoji`。有关更多信息，请查看 [话题标签](#Hashtag) 和 [自定义表情](#Emoji) 扩展部分

tag[].name
: 账户 Mention 的纯文本 Webfinger 地址（`@user` 或 `@user@domain`）、纯文本话题标签（`#tag`）或自定义 Emoji 短代码（`:thounking:`）

tag[].href
: 请求体或标签的 URL

attachment
: 用于包含附加的图片、视频或音频。

attachment[].url
: 用于获取媒体附件

attachment[].summary
: 用作媒体描述

attachment[].blurhash
: 用于生成与图像中使用的颜色相对应的模糊预览图像。有关更多详细信息，请查看 [Blurhash](#blurhash)。

replies
: 回复当前嘟文的嘟文集合。为了更完整地解析嘟文串，在发现外站嘟文后，将从同一实例获取最多 5 条回复。在 Mastodon 侧，第一页包含嘟文作者自己的回复，而之后的页面包含来自其他人的回复。

likes
: 用于表示为此嘟文收到的 `Like` 活动的集合。Mastodon 目前不公开实际的活动。

likes.totalItems
: 此嘟文收到的点赞数。

shares
: 用于表示为此嘟文收到的 `Announce` 活动的集合。Mastodon 目前不公开实际的活动。

shares.totalItems
: 此嘟文收到的 `Announce` 活动的数量。

#### 投票特定的属性

endTime
: 投票结束的时间戳

closed
: 投票结束的时间戳。该时间戳很可能与 `endTime` 时间戳匹配。如果此属性存在，则假定投票已结束。

votersCount
: 参与投票的人数，与已投出的票数（在多项选择投票的情况下）不同

oneOf
: 单项选择投票选项

anyOf
: 多项选择投票选项

oneOf/anyOf[].name
: 投票选项的文本

oneOf/anyOf[].replies.totalItems
: 投票选项的投票数

## 账户的联合 {#profile}

### 账户支持的 Activity 类型

Follow
: 表示对接收来自账户的嘟文更新感兴趣。

Accept/Reject
: 用于批准或拒绝 Follow 活动。未锁嘟的帐户将自动回复 Accept，而锁嘟的帐户可以手动选择是批准还是拒绝关注请求。

Add/Remove
: 管理置顶嘟文和精选内容。

Update
: 刷新帐户详细信息

Delete
: 从数据库中删除帐户及其所有嘟文。

Undo
: 撤销之前的 Follow、Accept Follow 或 Block。

Block
: 向外站实例发出信号，表明应对该用户隐藏你的账户。不作生效保证。有关更多信息，请查看 [外站屏蔽](#Block)。

Flag
: 向对方审核团队举报用户。有关更多信息，请查看 [举报](#Flag) 扩展。

Move
: 将关注者从一个帐户迁移到另一个帐户。要求在新帐户上设置指向旧帐户的 `alsoKnownAs`。

### 使用的属性

preferredUsername
: 用于 Webfinger 查找。必须在此域上唯一存在，且必须对应于 Webfinger `acct:` URI。

name
: 用作账户显示名称。

summary
: 用作账户简介。

type
: 假定为 Person。如果类型为 Application 或 Service，则将其解释为机器人标志。

url
: 用作账户链接。

icon
: 用作账户头像。

image
: 用作账户标题。

manuallyApprovesFollowers
: 将显示为锁嘟的帐户。

discoverable
: 将显示在账户目录中。请查看 [可发现标志](#discoverable)。

indexable
: 此帐户的嘟文可以被索引以进行全文搜索。请查看 [可索引标志](#indexable)。

publicKey
: 签名必需的属性。请查看 [公钥](#publicKey)。

featured
: 置顶嘟文。请查看 [特色收藏集](#featured)。

attachment
: 用于账户字段。请查看 [账户元数据](#PropertyValue) 和 [身份证明](#IdentityProof)。

alsoKnownAs
: Move 活动必需。

published
: 账户的创建时间。

memorial
: 该帐户是否为悼念帐户。

suspended
: 该帐户当前是否被封禁。

attributionDomains
: 允许在已发布的嘟文中使用此 actor 的 `fediverse:creator` 的域。

## JSON-LD 上下文和扩展 {#contexts}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/adapter.rb" caption="app/lib/activitypub/adapter.rb" >}}

### Mastodon 扩展 (`toot:`) {#toot}

基础 URI: `http://joinmastodon.org/ns#`

包含用于 Mastodon 功能的术语。

- toot:Emoji (`http://joinmastodon.org/ns#Emoji`)
- toot:IdentityProof (`http://joinmastodon.org/ns#IdentityProof`)
- toot:attributionDomains (`http://joinmastodon.org/ns#attributionDomains`)
- toot:blurhash (`http://joinmastodon.org/ns#blurhash`)
- toot:discoverable (`http://joinmastodon.org/ns#discoverable`)
- toot:featured (`http://joinmastodon.org/ns#featured`)
- toot:featuredTags (`http://joinmastodon.org/ns#featuredTags`)
- toot:focalPoint (`http://joinmastodon.org/ns#focalPoint`)
- toot:indexable (`http://joinmastodon.org/ns#indexable`)
- toot:memorial (`http://joinmastodon.org/ns#memorial`)
- toot:suspended (`http://joinmastodon.org/ns#suspended`)
- toot:votersCount (`http://joinmastodon.org/ns#votersCount`)

### ActivityStreams 扩展 (`as:`) {#as}

基础 URI: `https://www.w3.org/ns/activitystreams#`

包含已提出但尚未被正式采用的 ActivityStreams 扩展属性。

- as:Hashtag (`https://www.w3.org/ns/activitystreams#Hashtag`)
- as:manuallyApprovesFollowers (`https://www.w3.org/ns/activitystreams#manuallyApprovesFollowers`)
- as:movedTo (`https://www.w3.org/ns/activitystreams#movedTo`)
- as:sensitive (`https://www.w3.org/ns/activitystreams#sensitive`)

### Schema.org 扩展 (`schema:`) {#schema}

包含用于账户元数据的属性。

基础 URI: `http://schema.org#` (错误; 应为 `https://schema.org/`)

- [schema:PropertyValue (`http://schema.org#PropertyValue`, 应该是 `https://schema.org/PropertyValue`)](https://schema.org/PropertyValue)
- [schema:value (`http://schema.org#value`, 应该是 `https://schema.org/value`)](https://schema.org/value)

### W3ID 安全词汇 (`sec:`) {#sec}

上下文：[`https://w3id.org/security/v1`](https://w3id.org/security/v1)

用于 HTTPS 签名。也用于身份证明。有关更多信息，请查看 [安全]({{< relref "spec/security" >}})。

- [sec:publicKey (`https://w3id.org/security#publicKey`)](https://w3id.org/security#publicKey)
- [sec:publicKeyPem (`https://w3id.org/security#publicKeyPem`)](https://w3id.org/security#publicKeyPem)
- [sec:owner (`https://w3id.org/security#owner`)](https://w3id.org/security#owner)
- [sec:signature (`https://w3id.org/security#signature`)](https://w3id.org/security#signature)
- [sec:signatureValue (`https://w3id.org/security#signatureValue`)](https://w3id.org/security#signatureValue)

#### W3ID 身份

上下文：[`https://w3id.org/identity/v1`](https://w3id.org/identity/v1) (离线)

用于链接数据签名。有关更多信息，请查看 [安全 > 链接数据签名]({{< relref "spec/security#ld" >}})。

- [dc:creator (`http://purl.org/dc/terms/creator`)](http://purl.org/dc/terms/creator)
- [dc:created (`http://purl.org/dc/terms/created`)](http://purl.org/dc/terms/created)
- [sec:signature (`https://w3id.org/security#signature`)](https://w3id.org/security#signature)
- [sec:signatureValue (`https://w3id.org/security#signatureValue`)](https://w3id.org/security#signatureValue)

## 使用 ActivityStreams 词汇表定义的扩展

虽然 Activity 术语表定义了各种类型和术语，但 ActivityPub 仅为其中的一部分定义了副作用。以下 Activity 类型在 Mastodon 收件箱中收到时具有以下副作用。

### 外站屏蔽 （`Block`） {#Block}

ActivityPub 为客户端到服务端 (C2S) 用例定义了 `Block` 活动，但不适用于服务端到服务端 (S2S) — 它建议实例不应将 Block 活动传递给其 `object`。但是，当本站用户屏蔽外站用户时，Mastodon 将发送此活动。当 Mastodon 收到 `object` 是本站域名上的 actor 的 `Block` 活动时，它会将其解释为信号，以对本站用户隐藏对应 actor 的账户和嘟文，以及禁止该本站用户提及该 actor。

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/bd06bb61-01e0-447a-9dc8-95915db9aec8",
  "type": "Block",
  "actor": "https://mastodon.example/users/alice",
  "object": "https://example.com/~mallory",
  "to": "https://example.com/~mallory"
}
```

### 举报账户和嘟文 （`Flag`） {#Flag}

要举报外站实例上的账户和/或嘟文，Mastodon 将向实例 actor 发送 `Flag` 活动。此活动的 `object` 包含被举报的用户以及任何附加到该举报的嘟文。如果举报附有评论，它将用作活动的 `content`。

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/ccb4f39a-506a-490e-9a8c-71831c7713a4",
  "type": "Flag",
  "actor": "https://mastodon.example/actor",
  "content": "请查看此用户及其嘟文",
  "object": [
    "https://example.com/users/1",
    "https://example.com/posts/380590",
    "https://example.com/posts/380591"
  ],
  "to": "https://example.com/users/1"
}
```

### 帐户迁移 （`Move`） {#Move}

Mastodon 使用 Move 活动来指示帐户已迁移到另一个帐户。为了使迁移被视为有效，Mastodon 检查新帐户是否（通过 `alsoKnownAs` 属性）设置了指向旧帐户的别名。

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/users/alice#moves/1",
  "actor": "https://mastodon.example/users/alice",
  "type": "Move",
  "object": "https://mastodon.example/users/alice",
  "target": "https://alice.com/users/109835986274379",
  "to": "https://mastodon.example/users/alice/followers"
}
```

### 投票 {#Question}

{{< caption-link url="https://www.w3.org/TR/activitystreams-vocabulary/#questions" caption="Activity Vocabulary §5.4 - Representing Questions" >}}

ActivityStreams 词汇表规范松散地（非规范地）描述了如何表示问题。 Mastodon 的投票实现受到该节的启发。可以观察到以下实现细节：

- `Question` 被用作 `Object` 类型而不是作为 `IntransitiveActivity`；它不像任何其它嘟文一样被直接发送，而是被包装在 `Create` 中。
- 投票选项使用 `oneOf` 或 `anyOf` 序列化为一个数组。
  - 此数组中的每个项目都没有 `id`、具有 `Note` 类型，并且具有表示投票选项文本的 `name`。
  - 此数组中的每个项目还具有一个 `replies` 属性，表示对该特定投票选项的响应。此节点没有 `id`、具有 `Collection` 类型，并且具有表示此选项收到的总票数的 `totalItems` 属性。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "votersCount": "http://joinmastodon.org/ns#votersCount"
    }
  ],
  "id": "https://mastodon.example/users/alice/statuses/1009947848598745",
  "type": "Question",
  "content": "我今天早餐应该吃什么？",
  "published": "2023-03-05T07:40:13Z",
  "endTime": "2023-03-06T07:40:13Z",
  "votersCount": 7,
  "anyOf": [
    {
      "type": "Note",
      "name": "苹果",
      "replies": {
        "type": "Collection",
        "totalItems": 3
      }
    },
    {
      "type": "Note",
      "name": "橙子",
      "replies": {
        "type": "Collection",
        "totalItems": 7
      }
    },
    {
      "type": "Note",
      "name": "香蕉",
      "replies": {
        "type": "Collection",
        "totalItems": 6
      }
    }
  ]
}
```

- 投票被序列化为 `Create` 活动，其中 `object` 是一个 `Note`，其 `name` 与投票选项的 `name` 完全匹配。 `Note.inReplyTo` 指向 `Question` 对象的 URI。
  - 对于多选投票，可能会发送多个活动。如果你之前没有投票选择该选项，则将计入投票。

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/users/bob#votes/827163/activity",
  "to": "https://mastodon.example/users/alice",
  "actor": "https://mastodon.example/users/bob",
  "type": "Create",
  "object": {
    "id": "https://mastodon.example/users/bob#votes/827163",
    "type": "Note",
    "name": "橙子",
    "attributedTo": "https://mastodon.example/users/bob",
    "to": "https://mastodon.example/users/alice",
    "inReplyTo": "https://mastodon.example/users/alice/statuses/1009947848598745"
  }
}
```
```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/users/bob#votes/827164/activity",
  "to": "https://mastodon.example/users/alice",
  "actor": "https://mastodon.example/users/bob",
  "type": "Create",
  "object": {
    "id": "https://mastodon.example/users/bob#votes/827164",
    "type": "Note",
    "name": "香蕉",
    "attributedTo": "https://mastodon.example/users/bob",
    "to": "https://mastodon.example/users/alice",
    "inReplyTo": "https://mastodon.example/users/alice/statuses/1009947848598745"
  }
}
```

### 用于寻址和通知的 Mentions {#Mention}

{{< caption-link url="https://www.w3.org/TR/activitystreams-vocabulary/#microsyntaxes" caption="Activity Vocabulary §5.6 - Mentions, Tags, and Other Common Social Microsyntaxes" >}}

在 ActivityStreams 术语表中，`Mention` 是 `Link` 的一个子类型，旨在表示 @mentions 的微语法。 `tag` 属性旨在添加对其他 Object 或 Link 的引用。对于 Link 标签，Link 的 `name` 应该是该对象上自然语言属性（`name`、`summary`、`content`）的子字符串。只要找到这样的子字符串，它就可以被转换为指向 `href` 的超链接引用。

但是，Mastodon 也在某些情况下使用 `Mention` 标签进行寻址。根据 Mention 标签的存在或缺失情况，以及与 `to` 和 `cc` 中显式声明的接收方的比较结果，Mastodon 将计算嘟文的可见性级别。此外，Mastodon 需要 Mention 标签才能生成通知。（要提及的 actor 仍必须被显式包含在 `to` 或 `cc` 中才能接收嘟文。）

- `public`：公开嘟文在 `to` 中具有 `as:Public` 特殊集合
- `unlisted`：未列出的嘟文在 `cc` 中具有 `as:Public` 特殊集合
- `private`：仅关注者可见的嘟文在 `to` 或 `cc` 中具有 actor 的关注者集合，但不包括 `as:Public` 魔术集合
- `limited`：部分人可见的嘟文在 `to` 或 `cc` 中具有 actor，其中至少有一个未在 `tag` 中被 `Mention`
- `direct`：仅提及嘟文在 `to` 或 `cc` 中具有 actor，所有 actor 都在 `tag` 中被 `Mention`

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/activity/create.rb" caption="app/lib/activitypub/activity/create.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/parser/status_parser.rb" caption="app/lib/activitypub/parser/status_parser.rb" >}}

## ActivityStreams 未定义的扩展

以下功能使用 ActivityStreams 未定义的属性和类型定义。

### 公钥 {#publicKey}

公钥用于 HTTP 签名和链接数据签名。这是通过 actor 对象上的额外属性 `publicKey` 实现的。有关更多信息，请查看 [安全]({{< relref "spec/security" >}})。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1"
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "publicKey": {
    "id": "https://mastodon.social/users/Gargron#main-key",
    "owner": "https://mastodon.social/users/Gargron",
    "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvXc4vkECU2/CeuSo1wtn\nFoim94Ne1jBMYxTZ9wm2YTdJq1oiZKif06I2fOqDzY/4q/S9uccrE9Bkajv1dnkO\nVm31QjWlhVpSKynVxEWjVBO5Ienue8gND0xvHIuXf87o61poqjEoepvsQFElA5ym\novljWGSA/jpj7ozygUZhCXtaS2W5AD5tnBQUpcO0lhItYPYTjnmzcc4y2NbJV8hz\n2s2G8qKv8fyimE23gY1XrPJg+cRF+g4PqFXujjlJ7MihD9oqtLGxbu7o1cifTn3x\nBfIdPythWu5b4cujNsB3m3awJjVmx+MHQ9SugkSIYXV0Ina77cTNS0M2PYiH1PFR\nTwIDAQAB\n-----END PUBLIC KEY-----\n"
  }
}
```

### 特色内容 {#featured}

Mastodon 中被称为“置顶嘟文”的嘟文（或始终在人们的账户顶部显示的嘟文），是使用 actor 对象上的附加属性 `featured` 实现的，该属性指向对象的 `Collection`。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "featured": {
        "@id": "http://joinmastodon.org/ns#featured",
        "@type": "@id"
      }
    }
  ],

  "id": "https://example.com/@alice",
  "type": "Person",
  "featured": "https://example.com/@alice/collections/featured"
}
```

### 特色话题标签 {#featuredTags}

Mastodon 允许用户在其账户页上突出显示特定的话题标签，以便于浏览，作为一种可发现性机制。这是通过 actor 对象上的附加属性 `featuredTags` 实现的，该属性专门指向 `Hashtag` 对象的 `Collection`。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "featuredTags": {
        "@id": "http://joinmastodon.org/ns#featuredTags",
        "@type": "@id"
      }
    }
  ],

  "id": "https://example.com/@alice",
  "type": "Person",
  "featuredTags": "https://example.com/@alice/collections/tags"
}
```

### 账户元数据 {#PropertyValue}

Mastodon 支持包含名称-值对的任意账户字段。这是通过 actor 对象上的 `attachment` 属性实现的，数组中的对象具有 `PropertyValue` 类型和 `value` 属性，这两者都来自 schema.org 命名空间。

{{<hint style="warning">}}
如以上在列出 [schema.org @context 扩展](#schema) 时所述，Mastodon 当前错误地期望并将术语 `schema` 映射到基础 URI `http://schema.org#` 而不是基础 URI `https://schema.org/`。因此，使用正确的上下文定义的 JSON-LD 处理器将无法正确处理账户字段。
{{</hint>}}

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "schema": "http://schema.org#",
      "PropertyValue": "schema:PropertyValue",
      "value": "schema:value"
    }
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "attachment": [
    {
      "type": "PropertyValue",
      "name": "Patreon",
      "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span}"
    },
    {
      "type": "PropertyValue",
      "name": "Homepage",
      "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span}"
    }
  ]
}
```

### 身份证明 {{%deprecated%}} {#IdentityProof}

{{< hint style="warning" >}}
由于在 Mastodon 3.5 中删除了 Keybase 支持，因此当前未使用/已弃用此属性：<https://github.com/mastodon/mastodon/pull/17045>
{{</hint>}}

Mastodon 支持与身份提供商集成，以证明账户已链接到某个身份。这是通过 actor 对象上的 `attachment` 属性实现的，数组中的对象具有来自 Mastodon 命名空间的 `IdentityProof` 类型。该对象还包括来自 W3ID 安全术语表命名空间的 `signatureAlgorithm` 和 `signatureValue`。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1",
    {
      "IdentityProof": "http://joinmastodon.org/ns#IdentityProof"
    }
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "attachment": [
    {
      "type": "IdentityProof",
      "name": "gargron",
      "signatureAlgorithm": "keybase",
      "signatureValue": "5cfc20c7018f2beefb42a68836da59a792e55daa4d118498c9b1898de7e845690f"
    }
  ]
}
```

### 可发现标志 {#discoverable}

Mastodon 允许用户选择加入或退出可发现性功能，例如账户目录。此标志也可用作用户对被包含到外部发现服务中的偏好的指示。如果你要实现此类工具，建议你该属性存在时尊重它设定的值。这是使用映射到账户的对象的附加属性 `discoverable` 实现的。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "discoverable": "http://joinmastodon.org/ns#discoverable"
    }
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "discoverable": true
}
```

### 可索引标志 {#indexable}

Mastodon 允许用户选择加入或退出索引功能，例如公开嘟文的全文搜索。如果你要实现此类工具，建议你该属性存在时尊重它设定的值。这是使用映射到账户的对象的附加属性 `indexable` 实现的。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "indexable": "http://joinmastodon.org/ns#indexable"
    }
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "indexable": true
}
```

### 已被封禁标志 {#suspended}

Mastodon 举报用户是否在本站被封禁，以便更好地处理这些帐户。 Mastodon 中被封禁的帐户会返回空数据。如果外站帐户被标记为已被封禁，则无法在本站取消封禁。被封禁的帐户可以成为 Update、Undo、Reject 和 Delete 等活动的目标。此功能使用对象的附加属性 `suspended` 实现。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "suspended": "http://joinmastodon.org/ns#suspended"
    }
  ],
  "id": "https://example.com/@eve",
  "type": "Person",
  "suspended": true
}
```

### 悼念标志 {#memorial}

Mastodon 举报用户的账户是否处于悼念状态，以便更好地处理这些帐户。 Mastodon 中的悼念帐户会返回正常数据，但会在顶部显示相应提示，指示该帐户是悼念帐户。此功能使用对象的附加属性 `memorial` 实现。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "memorial": "http://joinmastodon.org/ns#memorial"
    }
  ],
  "id": "https://example.com/@alice",
  "type": "Person",
  "memorial": true
}
```

### 话题标签 {#Hashtag}

与 ActivityStreams 中已定义的 Link 的 `Mention` 子类型类似，Mastodon 将使用 `Hashtag` 作为 Link 的子类型，以便显示嘟文，这些嘟文引用由字符串格式的键标识的某些常见话题。 Hashtag 具有一个 `name`，其中包含 #hashtag 微语法——一个 `#`，后跟一个表示话题的字符串序列。这类似于 @mention 微语法，其中一个 `@` 后跟一个表示资源的字符串序列（Mastodon 的实现预期此资源是一个帐户）。 Mastodon 还会将话题标签规范化为不区分大小写的字符串，执行 ASCII 折叠并删除无效字符。

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/hashtag_normalizer.rb" caption="app/lib/hashtag_normalizer.rb" >}}

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "Hashtag": "https://www.w3.org/ns/activitystreams#Hashtag"
    }
  ],
  "id": "https://example.com/some-post",
  "type": "Note",
  "attributedTo": "https://example.com",
  "content": "我喜欢 #猫",
  "tag": [
    {
      "type": "Hashtag",
      "name": "#cats",
      "href": "https://example.com/tagged/cats"
    }
  ]
}
```

### 自定义表情 {#Emoji}

Mastodon 通过包含 `Emoji` 类型的 `tag` 来支持任意表情符号。自定义表情符号的处理方式类似于提及（mention）和话题标签（hashtag），即在自然语言属性（`name`、`summary`、`content`）中找到被标记实体的 `name` 作为子字符串，然后将其链接到某个资源或主题的本地表示。对于表情符号短代码（shortcodes），`name` 会被替换为由 `icon` 属性表示的内联图像的 HTML（其中 `icon.url` 链接到图像资源）。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "Emoji": "http://joinmastodon.org/ns#Emoji",
    }
  ],

  "id": "https://example.com/@alice/hello-world",
  "type": "Note",
  "content": "Hello world :kappa:",
  "tag": [
    {
      "id": "https://example.com/emoji/123",
      "type": "Emoji",
      "name": ":kappa:",
      "icon": {
        "type": "Image",
        "mediaType": "image/png",
        "url": "https://example.com/files/kappa.png"
      }
    }
  ]
}
```

### 焦点 {#focalPoint}

Mastodon 支持在上传的图片上设置焦点，这样无论图片在哪里显示，焦点都会保持在视口内。这是通过在 `Image` 对象上使用一个额外的 `focalPoint` 属性来实现的。该属性是一个包含两个介于 -1.0 和 1.0 之间的浮点数的数组，其中 0,0 代表图像中心，第一个值是 x 坐标（-1.0 是左边缘，+1.0 是右边缘），第二个值是 y 坐标（-1.0 是底边缘，+1.0 是顶边缘）。更多信息请参见 [API 指引 > 焦点]({{< relref "api/guidelines#focal-points" >}})。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "focalPoint": {
        "@container": "@list",
        "@id": "http://joinmastodon.org/ns#focalPoint"
      }
    }
  ],

  "id": "https://example.com/@alice/hello-world",
  "type": "Note",
  "content": "此嘟文有一张附图！",
  "attachment": [
    {
      "type": "Image",
      "mediaType": "image/png",
      "url": "https://example.com/files/cats.png",
      "focalPoint": [
        -0.55,
        0.43
      ]
    }
  ]
}
```

{{< figure src="/assets/focal-points.jpg" caption="演示各种焦点及其坐标。" >}}

上例中的焦点 (-0.55, 0.43) 对应于图像中心点左侧 55%、上方 43% 的位置。如果进行了任何裁剪，此焦点应在裁剪后的缩略图中保持可见。

### Blurhash {#blurhash}

Mastodon 会为附件生成彩色的预览缩略图。这是通过在 `Image` 对象上使用一个额外的 `blurhash` 属性来实现的。该属性是由 [BlurHash 算法](https://blurha.sh) 生成的一个字符串。

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "blurhash": "http://joinmastodon.org/ns#blurhash"
    }
  ],

  "id": "https://example.com/@alice/hello-world",
  "type": "Note",
  "content": "此嘟文有一张附图！",
  "attachment": [
    {
      "type": "Image",
      "mediaType": "image/png",
      "url": "https://example.com/files/cats.png",
      "blurhash": "UBL_:rOpGG-oBUNG,qRj2so|=eE1w^n4S5NH"
    }
  ]
}
```

### 敏感内容 {#sensitive}

Mastodon 使用 `as:sensitive` 扩展属性来标记某些嘟文为敏感内容。当一条嘟文被标记为敏感时，其附加的任何媒体都将默认隐藏，并且如果存在 `summary`，嘟文的 `content` 将被折叠在该摘要后面。在 Mastodon 中，这被称为**内容警告**。

## 其他功能

### 安全模式 {#secure-mode}

当 Mastodon 实例在安全模式下运行时，所有对其发起的跨站 HTTP 请求都必须进行签名（换句话说，即使是对公开资源的 `GET` 请求也需要签名）。这样，Mastodon 实例可以选择拒绝来自其已阻止的实例的请求，避免“泄露”公共信息。Mastodon 本身使用一个专用的系统行为体（system actor）来签名此类 HTTP 请求。有关 HTTP 签名的更多详细信息，请查看 [安全]({{< relref "spec/security" >}})。

安全模式是构建“有限联合模式”的基础。处于有限联合模式下的 Mastodon 实例将只与其管理员明确允许的实例进行联合，并拒绝所有其他请求。

### 关注者同步机制

Mastodon 具有“仅关注者可见”嘟文的概念，但目前关注者集合的扩展是在接收方处理，而不是在发送方处理（即，不使用显式寻址）。因此，需要一种机制来检测同步问题并进行纠正。该机制必须能够处理部分关注者集合，而不是完整的集合（完整集合可能不是公开信息）。此集合之所以是部分的，是因为它只包含来自特定实例的关注者，但它必须包含所有这些关注者。如果某个关注者从集合中被遗漏，将导致该关注关系被断开。

在向外站用户递送消息时，会附加一个可选的 `Collection-Synchronization` HTTP 标头，其语法与 `Signature` 标头相同，包含以下属性：

- `collectionId` = 必须是发送者的 `followers` 集合
- `url` = 指向一个部分集合的 URL，该集合包含发送者所有位于接收方实例上的关注者的标识符。必须与行为体（actor）本身位于同一域，并且应该只能通过来自接收方实例的签名查询进行访问
- `digest` = 部分集合中每个标识符的 SHA256 摘要进行异或运算后得到的十六进制表示

示例：

```http
POST https://mastodon.social/users/foo/inbox HTTP/1.1
Collection-Synchronization:
  collectionId="https://social.sitedethib.com/users/Thib/followers",
  url="https://social.sitedethib.com/users/Thib/followers_synchronization",
  digest="b08ab6951c7d6cc2b91e17ebd9557da7fae02489728e9332fcb3a97748244d50"
```

当外站用户尝试 GET 部分集合 `url` 时，此请求必须使用 HTTP 签名进行签名。示例：

```http
GET https://social.sitedethib.com/users/Thib/followers_synchronization HTTP/1.1
Signature: ... # 来自 mastodon.social 上某个账户的签名

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://social.sitedethib.com/users/Thib/followers?domain=mastodon.social",
  "type": "OrderedCollection",
  "orderedItems": [
    "https://mastodon.social/users/Gargron"
  ]
}
```

{{< translation-status-zh-cn raw_title="ActivityPub" raw_link="/spec/activitypub/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
