---
title: accounts API 方法
description: 关于账户和账户资料的方法。
menu:
  docs:
    weight: 20
    name: accounts
    parent: methods
    identifier: methods-accounts
aliases: [
  "/methods/accounts",
  "/api/methods/accounts"
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 注册账户 {#create}

```http
POST /api/v1/accounts HTTP/1.1
```

创建账户记录。返回发起请求的应用的账户访问令牌。应用应保存此令牌以供将来使用，并应等待用户通过点击其电子邮件收件箱中的链接来确认其账户。

OAuth 应用和创建的用户账户之间的关系将被存储。

**返回:** [Token]({{< relref "entities/token" >}})\
**OAuth:** 应用令牌 + `write:accounts`\
**版本历史:**\
2.7.0 - 添加\
3.0.0 - 添加 `reason` 参数\
3.4.0 - 向失败响应添加 `details`\
4.4.0 - 添加 `date_of_birth` 参数

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头与 `Bearer <app_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

username
: {{<required>}} 字符串。账户所需的用户名。

email
: {{<required>}} 字符串。用于登录的电子邮件地址。

password
: {{<required>}} 字符串。用于登录的密码。

agreement
: {{<required>}} 布尔值。用户是否同意本站规则、条款和政策。应向用户展示这些内容，以便他们在将此参数设置为 TRUE 之前表示同意。

locale
: {{<required>}} 字符串。将发送的确认电子邮件的语言。

reason
: 字符串。若注册需要手动批准，则版主将审查此文本。

date_of_birth
: 字符串 ([Date](/api/datetime-format#date))，若实例有最低年龄要求，则为必填。

#### 响应

##### 200: OK

```json
```

##### 401: Unauthorized

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

`details` 参数包含所有检测到的错误。其结构是一个哈希，键是错误的参数，值是找到的所有错误的数组。

错误响应示例：

```json
{
  "error": "Validation failed: Password can't be blank, Username must contain only letters, numbers and underscores, Agreement must be accepted",
  "details": {
    "password": [
      {
        "error": "ERR_BLANK",
        "description": "can't be blank"
      }
    ],
    "username": [
      {
        "error": "ERR_INVALID",
        "description": "must contain only letters, numbers and underscores"
      }
    ],
    "agreement": [
      {
        "error": "ERR_ACCEPTED",
        "description": "must be accepted"
      }
    ]
  }
}
```

你可能会遇到以下错误：

ERR_BLOCKED
: 当电子邮件提供商不被允许时出现

ERR_UNREACHABLE
: 当电子邮件地址无法通过 DNS（MX、A、AAAA）解析到任何 IP 时出现

ERR_TAKEN
: 当用户名或电子邮件已被占用时出现

ERR_RESERVED
: 当用户名被保留时出现，例如注册使用的用户名为“webmaster”或“admin”

ERR_ACCEPTED
: 当未接受协议时出现

ERR_BLANK
: 当未填写必填项时出现

ERR_INVALID
: 当某一项格式错误时，例如错误的字符或无效的电子邮件地址出现

ERR_TOO_LONG
: 当某一项超过字符数限制时出现

ERR_TOO_SHORT
: 当某一项低于字符数要求时出现

ERR_INCLUSION
: 当某一项的值不是允许的值之一时出现，例如填写了不受支持的语言

##### 429: Rate limited

```json
{
  "error": "请求过多"
}
```

---

## 验证账户凭据 {#verify_credentials}

```http
GET /api/v1/accounts/verify_credentials HTTP/1.1
```

测试以确保用户令牌有效。

**返回:** [CredentialAccount]({{< relref "entities/Account#CredentialAccount">}})\
**OAuth:** 用户令牌 + `profile` 或 `read:accounts`\
**版本历史:**\
0.0.0 - 添加
4.3.0 - 添加 `profile` 段

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头与 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

请注意额外的 `source` 属性，该属性在你自己的账户之外不可见。另请注意，纯文本用于 `source` 中，而 HTML 用于其相应的属性，例如 `note` 和 `fields`。

```json
{
  "id": "14715",
  "username": "trwnh",
  "acct": "trwnh",
  "display_name": "infinite love ⴳ",
  "locked": false,
  "bot": false,
  "created_at": "2016-11-24T10:02:12.085Z",
  "note": "<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/at\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/at</span><span class=\"invisible\"></span></a> or <a href=\"https://paypal.me/trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">paypal.me/trwnh</span><span class=\"invisible\"></span></a></p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence<br />- #1 ami cole fan account</p><p>:fatyoshi:</p>",
  "url": "https://mastodon.social/@trwnh",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/014/715/original/34aa222f4ae2e0a9.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/014/715/original/34aa222f4ae2e0a9.png",
  "header": "https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg",
  "header_static": "https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg",
  "followers_count": 821,
  "following_count": 178,
  "statuses_count": 33120,
  "last_status_at": "2019-11-24T15:49:42.251Z",
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": "",
    "note": "i have approximate knowledge of many things. perpetual student. (nb/ace/they)\r\n\r\nxmpp/email: a@trwnh.com\r\nhttps://trwnh.com\r\nhelp me live: https://liberapay.com/at or https://paypal.me/trwnh\r\n\r\n- my triggers are moths and glitter\r\n- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise\r\n- dm me if i did something wrong, so i can improve\r\n- purest person on fedi, do not lewd in my presence\r\n- #1 ami cole fan account\r\n\r\n:fatyoshi:",
    "fields": [
      {
        "name": "Website",
        "value": "https://trwnh.com",
        "verified_at": "2019-08-29T04:14:55.571+00:00"
      },
      {
        "name": "Sponsor",
        "value": "https://liberapay.com/at",
        "verified_at": "2019-11-15T10:06:15.557+00:00"
      },
      {
        "name": "Fan of:",
        "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo's Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
        "verified_at": null
      },
      {
        "name": "Main topics:",
        "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i'm just here to hang out and talk to cool people!",
        "verified_at": null
      }
    ],
    "follow_requests_count": 0
  },
  "emojis": [
    {
      "shortcode": "fatyoshi",
      "url": "https://files.mastodon.social/custom_emojis/images/000/023/920/original/e57ecb623faa0dc9.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/023/920/static/e57ecb623faa0dc9.png",
      "visible_in_picker": true
    }
  ],
  "fields": [
    {
      "name": "Website",
      "value": "<a href=\"https://trwnh.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-08-29T04:14:55.571+00:00"
    },
    {
      "name": "Sponsor",
      "value": "<a href=\"https://liberapay.com/at\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/at</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-11-15T10:06:15.557+00:00"
    },
    {
      "name": "Fan of:",
      "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&apos;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
      "verified_at": null
    },
    {
      "name": "Main topics:",
      "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i&apos;m just here to hang out and talk to cool people!",
      "verified_at": null
    }
  ]
}
```

##### 401: Unauthorized

若令牌无效或不正确，凭据验证将失败。

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

你的用户账户当前已禁用，缺少已验证的电子邮件地址或正在等待批准。

```json
{
  "error": "Your login is currently disabled"
}
```

```json
{
  "error": "Your login is missing a confirmed e-mail address"
}
```

```json
{
  "error": "Your login is currently pending approval"
}
```

##### 422: Unprocessable entity

令牌没有授权用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 更新账户凭据 {#update_credentials}

```http
PATCH /api/v1/accounts/update_credentials HTTP/1.1
```

更新用户的显示和偏好设置。

**返回:** 用户自己的 [Account]({{< relref "entities/Account">}})，带有 [`source`]({{< relref "entities/Account#source">}}) 属性\
**OAuth:** 用户令牌 + `write:accounts`\
**版本历史:**\
1.1.1 - 添加\
2.3.0 - 添加 `locked` 参数\
2.4.0 - 添加 `source[privacy,sensitive]` 参数\
2.4.2 - 添加 `source[language]` 参数\
2.7.0 - 添加 `discoverable` 参数\
4.1.0 - 添加 `hide_collections` 参数\
4.2.0 - 添加 `indexable` 参数\
4.4.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 3) - 添加 `attribution_domains` 参数

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头与 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

display_name
: 字符串。用于 profile 的昵称。

note
: 字符串。账户简介。

avatar
: 使用“multipart/form-data”编码的头像图片

header
: 使用“multipart/form-data”编码的横幅图片

locked
: 布尔值。是否需要手动批准关注请求。

bot
: 布尔值。账户是否具有机器人标志。

discoverable
: 布尔值。账户是否应被展示在用户列表中。

hide_collections
: 布尔值。是否隐藏关注者和关注的账户。

indexable
: 布尔值。公开嘟文是否应可供任何人搜索。

attribution_domains[]
: 字符串数组。允许授权该账户的网站域名。

fields_attributes
: 哈希。要设置的个人资料字段。在此哈希中，键是被强制转换为字符串的整数（尽管确切的整数并不重要），值是另一个包含 `name` 和 `value` 的哈希。默认情况下，最多 4 个字段。

fields_attributes[:index][name]
: 字符串。个人资料字段的名称。默认情况下，最多 255 个字符。

fields_attributes[:index][value]
: 字符串。个人资料字段的值。默认情况下，最多 255 个字符。

source[privacy]
: 字符串。默认发嘟可见性设置。可以是“public”、“unlisted”或“private”。

source[sensitive]
: 布尔值。是否默认将嘟文标记为敏感。

source[language]
: 字符串。新嘟文默认语言（ISO 6391）

#### 响应

##### 200: OK

要更新账户字段，你需要参照一下结构构造你的哈希，例如：

```json
{
  "fields_attributes": {
    "0": {
      "name": "Website",
      "value": "https://trwnh.com"
    },
    "1": {
      "name": "Sponsor",
      "value": "https://liberapay.com/at"
    },
    // ...
  }
}
```

作为查询参数，你的请求可能如下所示：

```http
PATCH https://mastodon.example/api/v1/accounts/update_credentials
?fields_attributes[0][name]=Website
&fields_attributes[0][value]=https://trwnh.com
&fields_attributes[1][name]=Sponsor
&fields_attributes[1][value]=https://liberapay.com/at
&...
```

请注意，整数索引实际上并不重要 - 字段将按提供的顺序填充。 例如：

```json
{
  "fields_attributes": {
    "420": {
      "name": "1st",
      "value": "field"
    },
    "69": {
      "name": "2nd",
      "value": "field"
    },
    "1312": {
      "name": "3rd",
      "value": "field"
    },
    "-99999999999999999999999999999999": {
      "name": "4th",
      "value": "field"
    },
  }
}
```

你应该使用 accounts/verify_credentials，首先从 `source` 参数中获取纯文本表示形式，然后允许用户编辑这些纯文本表示形式，然后再通过此 API 提交它们。实例将生成相应的 HTML。

```json
{
  "id": "14715",
  "username": "trwnh",
  "acct": "trwnh",
  "display_name": "infinite love ⴳ",
  "locked": false,
  "bot": false,
  "created_at": "2016-11-24T10:02:12.085Z",
  "note": "<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/at\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/at</span><span class=\"invisible\"></span></a> or <a href=\"https://paypal.me/trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">paypal.me/trwnh</span><span class=\"invisible\"></span></a></p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence<br />- #1 ami cole fan account</p><p>:fatyoshi:</p>",
  "url": "https://mastodon.social/@trwnh",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/014/715/original/34aa222f4ae2e0a9.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/014/715/original/34aa222f4ae2e0a9.png",
  "header": "https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg",
  "header_static": "https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg",
  "followers_count": 834,
  "following_count": 182,
  "statuses_count": 33760,
  "last_status_at": "2019-12-01T00:12:08.731Z",
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": "",
    "note": "i have approximate knowledge of many things. perpetual student. (nb/ace/they)\r\n\r\nxmpp/email: a@trwnh.com\r\nhttps://trwnh.com\r\nhelp me live: https://liberapay.com/at or https://paypal.me/trwnh\r\n\r\n- my triggers are moths and glitter\r\n- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise\r\n- dm me if i did something wrong, so i can improve\r\n- purest person on fedi, do not lewd in my presence\r\n- #1 ami cole fan account\r\n\r\n:fatyoshi:",
    "fields": [
      {
        "name": "Website",
        "value": "https://trwnh.com",
        "verified_at": "2019-08-29T04:14:55.571+00:00"
      },
      {
        "name": "Sponsor",
        "value": "https://liberapay.com/at",
        "verified_at": "2019-11-15T10:06:15.557+00:00"
      },
      {
        "name": "Fan of:",
        "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo's Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
        "verified_at": null
      },
      {
        "name": "Main topics:",
        "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i'm just here to hang out and talk to cool people!",
        "verified_at": null
      }
    ],
    "follow_requests_count": 0
  },
  "emojis": [
    {
      "shortcode": "fatyoshi",
      "url": "https://files.mastodon.social/custom_emojis/images/000/023/920/original/e57ecb623faa0dc9.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/023/920/static/e57ecb623faa0dc9.png",
      "visible_in_picker": true
    }
  ],
  "fields": [
    {
      "name": "Website",
      "value": "<a href=\"https://trwnh.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-08-29T04:14:55.571+00:00"
    },
    {
      "name": "Sponsor",
      "value": "<a href=\"https://liberapay.com/at\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/at</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-11-15T10:06:15.557+00:00"
    },
    {
      "name": "Fan of:",
      "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&apos;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
      "verified_at": null
    },
    {
      "name": "Main topics:",
      "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i&apos;m just here to hang out and talk to cool people!",
      "verified_at": null
    }
  ]
}
```

##### 401: Unauthorized

```json
{
  "error": "访问令牌无效"
}
```

##### 422: Unprocessable entity

令牌没有授权用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 获取账户 {#get}

```http
GET /api/v1/accounts/:id HTTP/1.1
```

查看账户信息。

**返回:** [Account]({{< relref "entities/Account">}})\
**OAuth:** 公开\
**版本历史:**\
0.0.0 - 添加\
2.4.0 - 若账户已封禁，则返回 410\
3.3.0 - 返回一个带有 `suspended: true` 的账户，而不是 410

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。数据库中账户的 ID。

##### 标头

Authorization
: 提供此标头与 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

将返回账户记录。请注意，本站用户的 `acct` 不包括域名。

###### 本站用户

```json
{
  "id": "1",
  "username": "Gargron",
  "acct": "Gargron",
  "display_name": "Eugen",
  "locked": false,
  "bot": false,
  "created_at": "2016-03-16T14:34:26.392Z",
  "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
  "url": "https://mastodon.social/@Gargron",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
  "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
  "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
  "followers_count": 318699,
  "following_count": 453,
  "statuses_count": 61013,
  "last_status_at": "2019-11-30T20:02:08.277Z",
  "emojis": [],
  "fields": [
    {
      "name": "Patreon",
      "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
      "verified_at": null
    },
    {
      "name": "Homepage",
      "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-07-15T18:29:57.191+00:00"
    }
  ]
}
```

###### 外站用户

```json
{
  "id": "23634",
  "username": "noiob",
  "acct": "noiob@awoo.space",
  "display_name": "shork",
  "locked": false,
  "bot": false,
  "created_at": "2017-02-08T02:00:53.274Z",
  "note": "<p>:ms_rainbow_flag:​ :ms_bisexual_flag:​ :ms_nonbinary_flag:​ <a href=\"https://awoo.space/tags/awoo\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>awoo</span></a>.space <a href=\"https://awoo.space/tags/admin\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>admin</span></a> ~ <a href=\"https://awoo.space/tags/bi\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>bi</span></a> ~ <a href=\"https://awoo.space/tags/nonbinary\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>nonbinary</span></a> ~ compsci student ~ likes video <a href=\"https://awoo.space/tags/games\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>games</span></a> and weird/ old electronics and will post obsessively about both ~ avatar by <span class=\"h-card\"><a href=\"https://weirder.earth/@dzuk\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>dzuk</span></a></span></p>",
  "url": "https://awoo.space/@noiob",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "header": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "header_static": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "followers_count": 553,
  "following_count": 405,
  "statuses_count": 28982,
  "last_status_at": "2019-12-01T00:39:57.264Z",
  "emojis": [
    {
      "shortcode": "ms_rainbow_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/028/691/original/6de008d6281f4f59.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/028/691/static/6de008d6281f4f59.png",
      "visible_in_picker": true
    },
    {
      "shortcode": "ms_bisexual_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/050/744/original/02f94a5fca7eaf78.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/050/744/static/02f94a5fca7eaf78.png",
      "visible_in_picker": true
    },
    {
      "shortcode": "ms_nonbinary_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/105/099/original/8106088bd4782072.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/105/099/static/8106088bd4782072.png",
      "visible_in_picker": true
    }
  ],
  "fields": [
    {
      "name": "Pronouns",
      "value": "they/them",
      "verified_at": null
    },
    {
      "name": "Alt",
      "value": "<span class=\"h-card\"><a href=\"https://cybre.space/@noiob\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>noiob</span></a></span>",
      "verified_at": null
    },
    {
      "name": "Bots",
      "value": "<span class=\"h-card\"><a href=\"https://botsin.space/@darksouls\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>darksouls</span></a></span>, <span class=\"h-card\"><a href=\"https://botsin.space/@nierautomata\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>nierautomata</span></a></span>, code for <span class=\"h-card\"><a href=\"https://botsin.space/@awoobot\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>awoobot</span></a></span>",
      "verified_at": null
    },
    {
      "name": "Website",
      "value": "<a href=\"http://shork.xyz\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">http://</span><span class=\"\">shork.xyz</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-11-23T20:25:47.907+00:00"
    }
  ]
}
```

###### 已封禁用户

```json
{
  "id": "14",
  "username": "stigatle",
  "acct": "stigatle@quitter.no",
  "display_name": "",
  "locked": false,
  "bot": false,
  "discoverable": false,
  "group": false,
  "created_at": "2016-03-18T10:04:51.700Z",
  "note": "",
  "url": "https://quitter.no/stigatle",
  "avatar": "https://mastodon.social/avatars/original/missing.png",
  "avatar_static": "https://mastodon.social/avatars/original/missing.png",
  "header": "https://mastodon.social/headers/original/missing.png",
  "header_static": "https://mastodon.social/headers/original/missing.png",
  "followers_count": 0,
  "following_count": 0,
  "statuses_count": 0,
  "last_status_at": null,
  "suspended": true,
  "emojis": [],
  "fields": []
}
```

##### 401: Unauthorized

若实例处于白名单模式，且 `Authorization` 标头缺失或无效。

```json
{
  "error": "此 API 需要已认证的用户"
}
```

##### 404: Not found

账户不存在。

```json
{
  "error": "记录未找到"
}
```

##### 410: Gone

账户已被封禁（版本 2.4.0 起至 3.3.0 止）。

---

## 获取多个账户信息 {#index}

```http
GET /api/v1/accounts HTTP/1.1
```

查看多个账户的信息。

**返回：** [Account]({{< relref "entities/Account">}}) 数组
**OAuth：** 公开
**版本历史：**
4.3.0 - 添加

#### 请求
##### 标头

##### 查询参数

id[]
: 字符串数组。数据库中账户的 ID。

##### 标头

Authorization
: 提供此标头并附带 `Bearer <用户令牌>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

将返回请求的已验证且已被批准账户的 [Account]({{< relref "entities/Account">}}) 记录。若账户不存在或未确认，返回的记录数可能会少于请求的数量。

使用 `id[]=1&id[]=2` 的调用示例（当 ID 为 2 的账户不存在时）：

```json
[
  {
    "id": "1",
    "username": "Gargron",
    "acct": "Gargron",
    "display_name": "Eugen",
    "locked": false,
    "bot": false,
    "created_at": "2016-03-16T14:34:26.392Z",
    "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
    "url": "https://mastodon.social/@Gargron",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "followers_count": 318699,
    "following_count": 453,
    "statuses_count": 61013,
    "last_status_at": "2019-11-30T20:02:08.277Z",
    "emojis": [],
    "fields": [
      {
        "name": "Patreon",
        "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
        "verified_at": null
      },
      {
        "name": "Homepage",
        "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span></a>",
        "verified_at": "2019-07-15T18:29:57.191+00:00"
      }
    ]
  }
]
```

##### 401: Unauthorized

若实例处于白名单模式，且 `Authorization` 标头缺失或无效，则返回此错误。

```json
{
  "error": "This API requires an authenticated user"
}
```

---

## 获取账户的嘟文 {#statuses}

```http
GET /api/v1/accounts/:id/statuses HTTP/1.1
```

获取指定账户发布的嘟文。

**返回：** [Status]({{< relref "entities/status">}}) 数组
**OAuth：** 公开访问（仅限公开嘟文），或用户令牌 + `read:statuses`（用于访问用户有权查看的私密嘟文）
**版本历史：**
0.0.0 - 添加
1.4.2 - 添加 `only_media` 和 `exclude_replies`
1.6.0 - 添加 `pinned`
2.6.0 - 添加 `min_id`
2.7.0 - 添加 `exclude_reblogs` 并允许未经身份验证的使用
2.8.0 - 添加 `tagged` 参数
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。数据库中账户的 ID。

##### 标头

Authorization
: 提供此标头并附带 `Bearer <用户令牌>` 以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。返回的所有结果 ID 都将小于此 ID。事实上设置结果的上限。

since_id
: 字符串。返回的所有结果 ID 都将大于此 ID。事实上是设置结果的下限。

min_id
: 字符串。返回紧邻此 ID 之后的新结果。事实上在此 ID 设置游标并向前分页。

limit
: 整数。返回的最大结果数。默认为 20 条嘟文。最多 40 条嘟文。

only_media
: 布尔值。过滤没有附件的嘟文。

exclude_replies
: 布尔值。过滤回复给其他账户的嘟文。

exclude_reblogs
: 布尔值。过滤转嘟。

pinned
: 布尔值。仅筛选置顶的嘟文。默认为 false，包含所有嘟文。置顶嘟文在返回结果的顺序中没有特殊优先级。

tagged
: 字符串。筛选使用了特定话题标签的嘟文。

#### 响应
##### 200: OK

```json
[
  {
    "id": "108880211901672326",
    "created_at": "2022-08-24T22:29:46.493Z",
    "in_reply_to_id": "108880209317577809",
    "in_reply_to_account_id": "103641",
    "sensitive": false,
    // ...
  },
  // ...
]
```

##### 401: Unauthorized

若实例处于白名单模式，且 `Authorization` 标头缺失或无效，则返回此错误。

白名单模式的响应示例：

```json
{
  "error": "This API requires an authenticated user"
}
```

2.7.0 版本之前的响应示例：

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

账户不存在。

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

账户已被封禁（版本 2.4.0 起至 3.3.0 止）。

---

## 获取账户的关注者 {#followers}

```http
GET /api/v1/accounts/:id/followers HTTP/1.1
```

获取关注指定账户的用户列表，前提是该账户所有者未隐藏其社交关系网络。

**返回：** [Account]({{< relref "entities/Account">}}) 数组
**OAuth：** 公开访问
**版本历史：**
0.0.0 - 添加
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`
4.0.0 - 不再需要应用令牌 + `read:accounts`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。数据库中账户的 ID。

##### 标头

Authorization
: 提供此标头并附带 `Bearer <用户令牌>` 以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。返回的最大结果数。默认为 40 个账户。最多 80 个账户。

#### 响应
##### 200: OK

limit=2 的输出示例。

```json
[
  {
    "id": "1020382",
    "username": "atul13061987",
    "acct": "atul13061987",
    "display_name": "",
    // ...
  },
  {
    "id": "1020381",
    "username": "linuxliner",
    "acct": "linuxliner",
    "display_name": "",
    // ...
  }
]
```

由于关注关系 ID 通常不会通过任何 API 响应公开，你需要解析 HTTP `Link` 标头来加载更早或更新的结果。更多信息请参见 [通过 API 响应分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/accounts/14715/followers?limit=2&max_id=7486869>; rel="next", <https://mastodon.example/api/v1/accounts/14715/followers?limit=2&since_id=7489740>; rel="prev"
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失，或者实例处于白名单模式且你的令牌未获得用户授权。

白名单模式的响应示例：

```json
{
  "error": "This API requires an authenticated user"
}
```

标头缺失或令牌无效的响应示例：

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

账户不存在。

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

账户已被封禁（版本 2.4.0 起至 3.3.0 止）。

---

## 获取账户正在关注的用户 {#following}

```http
GET /api/v1/accounts/:id/following HTTP/1.1
```

获取指定账户正在关注的用户列表，前提是该账户所有者未隐藏其社交关系网络。

**返回：** [Account]({{< relref "entities/Account">}}) 数组
**OAuth：** 公开访问
**版本历史：**
0.0.0 - 添加
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`
4.0.0 - 不再需要应用令牌 + `read:accounts`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。数据库中账户的 ID。

##### 标头

Authorization
: 提供此标头并附带 `Bearer <用户令牌>` 以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

min_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。返回的最大结果数。默认为 40 个账户。最多 80 个账户。

#### 响应
##### 200: OK

limit=2 的输出示例。

```json
[
  {
    "id": "963410",
    "username": "gautambhatia",
    "acct": "gautambhatia",
    "display_name": "Gautam Bhatia",
    // ...
  },
  {
    "id": "1007400",
    "username": "seafrog",
    "acct": "seafrog@glitterkitten.co.uk",
    "display_name": "🐓🦃 Heck Partridge 🤠 🦆",
    // ...
]
```

由于关注关系 ID 通常不会通过任何 API 响应公开，你需要解析 HTTP `Link` 标头来加载更早或更新的结果。更多信息请参见 [通过 API 响应分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/accounts/1/followers?limit=2&max_id=7628164>; rel="next", <https://mastodon.example/api/v1/accounts/1/followers?limit=2&since_id=7628165>; rel="prev"
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失，或者实例处于白名单模式且你的令牌未获得用户授权。

白名单模式的响应示例：

```json
{
  "error": "This API requires an authenticated user"
}
```

标头缺失或令牌无效的响应示例：

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

账户不存在。

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

账户已被封禁（版本 2.4.0 起至 3.3.0 止）。

---

## 获取账户的精选话题标签 {#featured_tags}

```http
GET /api/v1/accounts/:id/featured_tags HTTP/1.1
```

获取此账户的精选话题标签。

**返回：** [FeaturedTag]({{< relref "entities/featuredtag">}}) 数组
**OAuth：** 公开
**版本历史：**
3.3.0 - 添加

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。数据库中账户的 ID。

##### 标头

Authorization
: 提供此标头并附带 `Bearer <用户令牌>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "id": "627",
    "name": "nowplaying",
    "statuses_count": 36,
    "last_status_at": "2019-11-15T07:14:43.524Z"
  }
]
```

---

## 获取包含此账户的列表 {#lists}

```http
GET /api/v1/accounts/:id/lists HTTP/1.1
```

获取你已将此账户添加到的用户列表。

**返回：** [List]({{< relref "entities/list">}}) 数组
**OAuth：** 用户令牌 + `read:lists`
**版本历史：**
2.1.0 - 添加

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。数据库中账户的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头并附带 `Bearer <用户令牌>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

若该账户属于任何列表，将返回这些列表的实体。若该账户不属于你的任何列表，则返回空数组。

```json
[
  {
    "id": "13694",
    "title": "dev"
  }
]
```

```json
[]
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失，或者实例处于白名单模式且你的令牌未获得用户授权。

白名单模式的响应示例：

```json
{
  "error": "This API requires an authenticated user"
}
```

标头缺失或令牌无效的响应示例：

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

账户不存在。

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

账户已被封禁（版本 2.4.0 起至 3.3.0 止）。

##### 422: Unprocessable entity

令牌没有授权用户。

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 关注账户 {#follow}

```http
POST /api/v1/accounts/:id/follow HTTP/1.1
```

关注指定账户。也可用于更新是否显示转嘟或启用通知。

**返回：** [Relationship]({{< relref "entities/relationship">}})
**OAuth：** 用户令牌 + `write:follows`
**版本历史：**
0.0.0 - 添加
3.3.0 - 添加 `notify`
3.5.0 - 弃用 `follow` 作用域。现在额外接受 `write`
4.0.0 - 添加 `languages`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。数据库中账户的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头并附带 `Bearer <用户令牌>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

reblogs
: 布尔值。是否在主页时间线上接收此账户的转嘟？默认为 true。

notify
: 布尔值。当此账户发布嘟文时是否接收通知？默认为 false。

languages[]
: 字符串数组（ISO 639-1 双字符语言代码）。根据设置的语言过滤接收到的嘟文。若未提供，你将接收此账户所有语言的嘟文。

#### 响应
##### 200: OK

成功关注，或账户已被关注。

```json
{
  "id": "3",
  "following": true,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 403: Forbidden

试图关注你屏蔽的或屏蔽你的用户。

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

令牌没有授权用户。

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 取消关注账户 {#unfollow}

```http
POST /api/v1/accounts/:id/unfollow HTTP/1.1
```

取消关注指定账户。

**返回：** [Relationship]({{< relref "entities/relationship">}})
**OAuth：** 用户令牌 + `write:follows`
**版本历史：**
0.0.0 - 添加
3.5.0 - 弃用 `follow` 作用域。现在额外接受 `write`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。数据库中账户的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头并附带 `Bearer <用户令牌>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

成功取消关注，或账户本未被关注。

```json
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 屏蔽账户 {#block}

```http
POST /api/v1/accounts/:id/block HTTP/1.1
```

屏蔽指定的账户。客户端应过滤来自此账户的嘟文（例如，由于主页时间线上的转嘟而收到的嘟文）。

**返回：** [Relationship]({{< relref "entities/relationship">}})\
**OAuth：** 用户令牌 + `write:blocks`\
**版本历史：**\
0.0.0 - 添加\
3.5.0 - 弃用了 `follow` 作用域。现在额外接受 `write`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。账户在数据库中的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

#### 响应
##### 200: OK

成功屏蔽，或账户已被屏蔽

```json
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": true,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 解除屏蔽账户 {#unblock}

```http
POST /api/v1/accounts/:id/unblock HTTP/1.1
```

解除对指定账户的屏蔽。

**返回：** [Relationship]({{< relref "entities/relationship">}})\
**OAuth：** 用户令牌 + `write:blocks`\
**版本历史：**\
0.0.0 - 添加\
3.5.0 - 弃用了 `follow` 作用域。现在额外接受 `write`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。账户在数据库中的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

#### 响应
##### 200: OK

成功解除屏蔽，或账户本就未被屏蔽

```json
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 隐藏账户 {#mute}

```http
POST /api/v1/accounts/:id/mute HTTP/1.1
```

隐藏指定的账户。客户端应过滤来自此账户的嘟文和通知（例如，由于主页时间线上的转嘟而收到的嘟文）。

**返回：** [Relationship]({{< relref "entities/relationship">}})\
**OAuth：** 用户令牌 + `write:mutes`\
**版本历史：**\
0.0.0 - 添加\
3.3.0 - 添加了 `duration`\
3.5.0 - 弃用了 `follow` 作用域。现在额外接受 `write`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。账户在数据库中的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

##### 表单数据参数

notifications
: 布尔值。除了嘟文之外是否也隐藏通知？默认为 true。

duration
: 数字。隐藏应持续多长时间（秒）。默认为 0（无限期）。

#### 响应
##### 200: OK

成功隐藏，或账户已被隐藏。请注意，你可以再次调用此 API 方法并设置 `notifications=false` 来更新关系，以便仅隐藏嘟文。

```json
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": true,
  "muting_notifications": true,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "访问令牌无效"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "此方法需要已认证的用户"
}
```

---

## 解除隐藏账户 {#unmute}

```http
POST /api/v1/accounts/:id/unmute HTTP/1.1
```

解除对指定账户的隐藏。

**返回：** [Relationship]({{< relref "entities/relationship">}})\
**OAuth：** 用户令牌 + `write:mutes`\
**版本历史：**\
0.0.0 - 添加\
3.5.0 - 弃用了 `follow` 作用域。现在额外接受 `write`

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。账户在数据库中的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

#### 响应
##### 200: OK

成功解除隐藏，或账户本就未被隐藏

```json
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "访问令牌无效"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "此方法需要已认证的用户"
}
```

---

## 在你的账户页中推荐账户 {#pin}

```http
POST /api/v1/accounts/:id/pin HTTP/1.1
```

将指定账户添加到用户的推荐账户中。（推荐的账户目前显示在用户自己的账户页上公开显示。）

**返回：** [Relationship]({{< relref "entities/relationship">}})\
**OAuth：** 用户令牌 + `write:accounts`\
**版本历史：**\
2.5.0 - 添加\
4.0.0 - 调用此方法现在是幂等的

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。账户在数据库中的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

#### 响应
##### 200: OK

成功推荐，或目标账户已被推荐。

```json
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": true
}
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "The access token is invalid"
}
```

##### 403: 禁止访问

令牌缺少必要的范围

```json
{
  "error": "This operation exceeds the authorization scope"
}
```

##### 422: Unprocessable entity

你没有关注此账户

```json
{
  "error": "Validation failed: You must be already following the person you want to endorse"
}
```

或者，令牌未获得用户授权

```json
{
  "error": "This method requires an authenticated user"
}
```

或者（4.0 版本之前），该账户可能已被推荐

```json
{
  "error": "Duplicate record"
}
```

##### 500: 服务器错误

有时在账户已被推荐时会返回此错误。

---

## 在账户页中取消推荐账户 {#unpin}

```http
POST /api/v1/accounts/:id/unpin HTTP/1.1
```

将指定账户从用户的推荐账户中移除。

**返回：** [Relationship]({{< relref "entities/relationship">}})\
**OAuth：** 用户 + `write:accounts`\
**版本历史：**\
2.5.0 - 添加

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。账户在数据库中的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

#### 响应
##### 200: OK

成功取消推荐，或账户本就未被推荐

```json
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 对指定账户设置私人备注 {#note}

```http
POST /api/v1/accounts/:id/note HTTP/1.1
```

对指定账户设置私人备注。

**返回：** [Relationship]({{< relref "entities/relationship">}})\
**OAuth：** 用户 + `write:accounts`\
**版本历史：**\
3.2.0 - 添加

#### 请求
##### 路径参数

:id
: {{<required>}} 字符串。账户在数据库中的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

##### 表单数据参数

comment
: 字符串。要对该账户设置的备注。提供空字符串或省略此参数以清除当前设置的备注。

#### 响应
##### 200: OK

成功更新账户备注

```json
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false,
  "note": "这是一条备注"
}
```

成功移除账户备注

```json
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false,
  "note": ""
}
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 检查与其他账户的关系 {#relationships}

```http
GET /api/v1/accounts/relationships HTTP/1.1
```

查明是否关注、屏蔽、隐藏了指定账户等。

**返回：** [Relationship]({{< relref "entities/Relationship">}}) 数组\
**OAuth：** 用户令牌 + `read:follows`\
**版本历史：**\
0.0.0 - 添加\
4.3.0 - 添加了 `with_suspended` 参数

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

##### 查询参数

id[]
: 字符串数组。检查与所提供的所有账户 ID 的关系。

with_suspended
: 布尔值。是否应返回已封禁用户的关系，默认为 false。

#### 响应
##### 200: OK

使用 `id[]=1&id[]=2` 的示例调用

```json
[
  {
    "id": "1",
    "following": true,
    "showing_reblogs": true,
    "notifying": false,
    "followed_by": true,
    "blocking": false,
    "blocked_by": false,
    "muting": false,
    "muting_notifications": false,
    "requested": false,
    "domain_blocking": false,
    "endorsed": false
  },
  {
    "id": "2",
    "following": false,
    "showing_reblogs": false,
    "notifying": false,
    "followed_by": false,
    "blocking": false,
    "blocked_by": false,
    "muting": false,
    "muting_notifications": false,
    "requested": false,
    "domain_blocking": false,
    "endorsed": false
  }
]
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 查找熟悉的关注者 {#familiar_followers}

```http
GET /api/v1/accounts/familiar_followers HTTP/1.1
```

获取关注指定账户的所有账户列表，并从中筛选出你关注的账户。

**返回：** [FamiliarFollowers]({{< relref "entities/FamiliarFollowers">}}) 数组\
**OAuth：** 用户令牌 + `read:follows`\
**版本历史：**\
3.5.0 - 添加

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，格式为 `Bearer <user_token>`，以获取对此 API 方法的访问授权。

##### 查询参数

id[]
: 字符串数组。查找所提供账户 ID 的熟悉关注者。

#### 响应
##### 200: OK

使用 `id[]=1&id[]=2` 的示例调用

```json
[
  {
    "id":"1",
    "accounts":[
      {
        "id":"1087990",
        "username":"moss",
        "acct":"moss@goblin.camp",
        // ...
      },
      {
        "id":"1092723",
        "username":"vivianrose",
        "acct":"vivianrose",
        // ...
      },
      // ...
    ]
  },
  {
    "id":"2",
    "accounts":[]
  }
]
```

##### 401: Unauthorized

`Authorization` 标头无效或缺失

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

令牌没有已授权的用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 搜索匹配的账户 {#search}

```http
GET /api/v1/accounts/search HTTP/1.1
```

通过用户名或昵称搜索匹配的账户。

**返回：** [A此count]({{< relref "entities/Account">}}) 数组
**OAuth 认证：** 用户令牌 + `read:accounts` 权限
**版本历史：**
0.0.0 - 添加
2.8.0 - 添加 `limit`、`offset` 和 `following`

#### 请求
##### 请求头

Authorization
: {{<required>}} （必填）提供此请求头，格式为 `Bearer <user_token>`，以获得对该 API 方法的授权访问权限。

##### 查询参数

q
: {{<required>}} （必填）字符串。账户的搜索查询。

limit
: 整数。最大结果数。默认为 40 个账户。最多 80 个账户。

offset
: 整数。跳过前 n 个结果。

resolve
: 布尔值。尝试 WebFinger 查询。默认为 false。当 `q` 是精确地址时使用此参数。

following
: 布尔值。将搜索范围限制为你关注的用户。默认为 false。

#### 响应
##### 200: OK

匹配用户名或昵称中包含 "trwnh" 的账户

```json
[
  {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    // ...
  },
  {
    "id": "418714",
    "username": "trwnh",
    "acct": "trwnh@pixelfed.social",
    "display_name": "Abdullah Tarawneh",
    // ...
  },
  {
    "id": "419674",
    "username": "trwnh",
    "acct": "trwnh@write.as",
    "display_name": "trwnh",
    // ...
  },
  // ...
]
```

##### 503: Service Unavailable

当 `resolve=true` 时，若 user@domain 地址中的域名部分当前不是一个有效的网站，则返回该响应

```json
{
  "error": "Remote data could not be fetched"
}
```

---

## 通过 Webfinger 地址查询账户 ID {#lookup}

```http
GET /api/v1/accounts/lookup HTTP/1.1
```

快速查询用户名以查看其是否可用，跳过 WebFinger 解析。

**返回：** [Account]({{< relref "entities/Account">}})
**OAuth 认证：** 公开
**版本历史：**
3.4.0 - 添加

#### 请求
##### 查询参数

acct
: {{<required>}} （必填）字符串。要查询的用户名或 Webfinger 地址。

#### 响应
##### 200: OK

使用 `?acct=trwnh` 的示例调用响应如下:

```json
{
  "id": "14715",
  "username": "trwnh",
  "acct": "trwnh",
  "display_name": "infinite love ⴳ",
  "locked": false,
  // ...
}
```

使用 `?acct=trwnh@pixelfed.social` 的示例调用响应如下:

```json
{
  "id": "418714",
  "username": "trwnh",
  "acct": "trwnh@pixelfed.social",
  "display_name": "Abdullah Tarawneh",
  "locked": false,
  // ...
}
```

##### 404: Not found

用户名或地址未映射到任何账户

```json
{
  "error": "记录未找到"
}
```

---

## 身份证明 {{%deprecated%}} {#identity_proofs}

```http
GET /api/v1/accounts/:id/identity_proofs HTTP/1.1
```

**返回：** [IdentityProof]({{< relref "entities/identityproof">}}) 数组
**OAuth 认证：** 用户令牌
**版本历史：**
2.8.0 - 添加
3.5.0 - 弃用。现在返回一个空数组。

#### 请求

##### 路径参数

:id
: {{<required>}} （必填）字符串。数据库中账户的 ID。

#### 响应
##### 200: OK (成功)

```json
[
  {
    "provider": "Keybase",
    "provider_username": "gargron",
    "updated_at": "2019-07-21T20:14:39.596Z",
    "proof_url": "https://keybase.io/gargron/sigchain#5cfc20c7018f2beefb42a68836da59a792e55daa4d118498c9b1898de7e845690f",
    "profile_url": "https://keybase.io/gargron"
  }
]
```

##### 404: Not Found

账户不存在

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

账户已被暂停（自 2.4.0 版本起，至 3.3.0 版本）

##### 422: Unprocessable Entity

令牌没有对应的授权用户

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## 另请参阅

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts_controller.rb" caption="app/controllers/api/v1/accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/credentials_controller.rb" caption="app/controllers/api/v1/accounts/credentials_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/familiar_followers_controller.rb" caption="app/controllers/api/v1/accounts/familiar_followers_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/featured_tags_controller.rb" caption="app/controllers/api/v1/accounts/featured_tags_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/follower_accounts_controller.rb" caption="app/controllers/api/v1/accounts/follower_accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/following_accounts_controller.rb" caption="app/controllers/api/v1/accounts/following_accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/identity_proofs_controller.rb" caption="app/controllers/api/v1/accounts/identity_proofs_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/lists_controller.rb" caption="app/controllers/api/v1/accounts/lists_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/lookup_controller.rb" caption="app/controllers/api/v1/accounts/lookup_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/notes_controller.rb" caption="app/controllers/api/v1/accounts/notes_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/pins_controller.rb" caption="app/controllers/api/v1/accounts/pins_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/relationships_controller.rb" caption="app/controllers/api/v1/accounts/relationships_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/search_controller.rb" caption="app/controllers/api/v1/accounts/search_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/statuses_controller.rb" caption="app/controllers/api/v1/accounts/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/account_statuses_filter.rb" caption="app/models/account_statuses_filter.rb" >}}

{{< translation-status-zh-cn raw_title="accounts API methods" raw_link="/methods/accounts/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
