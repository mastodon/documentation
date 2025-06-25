---
title: Account
description: 表示 Mastodon 的一个账户及其相关的账户。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/source/",
  "/entities/Source/",
  "/entities/field/",
  "/entities/Field/",
  "/entities/account",
  "/entities/Account",
  "/entities/credentialaccount",
  "/entities/CredentialAccount",
  "/entities/mutedaccount",
  "/entities/MutedAccount",
  "/api/entities/source/",
  "/api/entities/Source/",
  "/api/entities/field/",
  "/api/entities/Field/",
  "/api/entities/account",
  "/api/entities/Account",
  "/api/entities/credentialaccount",
  "/api/entities/CredentialAccount",
  "/api/entities/mutedaccount",
  "/api/entities/MutedAccount",
]
---

## 示例

```json
{
  "id": "23634",
  "username": "noiob",
  "acct": "noiob@awoo.space",
  "display_name": "ikea shark fan account",
  "locked": false,
  "bot": false,
  "created_at": "2017-02-08T02:00:53.274Z",
  "attribution_domains": ["example.com", "example.net"],
  "note": "<p>:ms_rainbow_flag:​ :ms_bisexual_flagweb:​ :ms_nonbinary_flag:​ <a href=\"https://awoo.space/tags/awoo\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>awoo</span}.space <a href=\"https://awoo.space/tags/admin\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>admin</span} ~ <a href=\"https://awoo.space/tags/bi\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>bi</span} ~ <a href=\"https://awoo.space/tags/nonbinary\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>nonbinary</span} ~ compsci student ~ likes video <a href=\"https://awoo.space/tags/games\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>games</span} and weird/ old electronics and will post obsessively about both ~ avatar by <span class=\"h-card\"><a href=\"https://weirder.earth/@dzuk\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>dzuk</span}</span></p>",
  "url": "https://awoo.space/@noiob",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "header": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "header_static": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "followers_count": 547,
  "following_count": 404,
  "statuses_count": 28468,
  "last_status_at": "2019-11-17",
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
      "value": "<span class=\"h-card\"><a href=\"https://cybre.space/@noiob\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>noiob</span}</span>",
      "verified_at": null
    },
    {
      "name": "Bots",
      "value": "<span class=\"h-card\"><a href=\"https://botsin.space/@darksouls\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>darksouls</span}</span>, <span class=\"h-card\"><a href=\"https://botsin.space/@nierautomata\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>nierautomata</span}</span>, <span class=\"h-card\"><a href=\"https://mastodon.social/@fedi\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>fedi</span}</span>, code for <span class=\"h-card\"><a href=\"https://botsin.space/@awoobot\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>awoobot</span}</span>",
      "verified_at": null
    },
    {
      "name": "Website",
      "value": "<a href=\"http://shork.xyz\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">http://</span><span class=\"\">shork.xyz</span><span class=\"invisible\"></span}",
      "verified_at": "2019-11-10T10:31:10.744+00:00"
    }
  ]
}
```

## 属性

### `id` {#id}

**描述:** 帐户 ID。\
**类型:** 字符串（从整数转换而来，但不保证一定是数字）\
**版本历史:**\
0.1.0 - 添加

### `username` {#username}

**描述:** 帐户的用户名，不包含域名。\
**类型:** 字符串\
**版本历史:**\
0.1.0 - 添加

### `acct` {#acct}

**描述:** Webfinger 帐户 URI。对于本站用户，等于 `username`；对于外站用户，等于 `username@domain`。\
**类型:** 字符串\
**版本历史:**\
0.1.0 - 添加

### `url` {#url}

**描述:** 账户页的位置。\
**类型:** 字符串 (URL)\
**版本历史:**\
0.1.0 - 添加

### `display_name` {#display_name}

**描述:** 账户的昵称。\
**类型:** 字符串\
**版本历史:**\
0.1.0 - 添加

### `note` {#note}

**描述:** 账户的简介或描述。\
**类型:** 字符串 (HTML)\
**版本历史:**\
0.1.0 - 添加

### `avatar` {#avatar}

**描述:** 一个图像图标，显示在嘟文旁边和账户中。\
**类型:** 字符串 (URL)\
**版本历史:**\
0.1.0 - 添加

### `avatar_static` {#avatar_static}

**描述:** 头像的静态版本。如果其值为静态图像，则等于 `avatar`；如果 `avatar` 是动画 GIF，则不同。\
**类型:** 字符串 (URL)\
**版本历史:**\
1.1.2 - 添加

### `header` {#header}

**描述:** 显示在账户上方和账户资料卡中的横幅图片。\
**类型:** 字符串 (URL)\
**版本历史:**\
0.1.0 - 添加

### `header_static` {#header_static}

**描述:** 横幅图片的静态版本。如果其值为静态图像，则等于 `header`；如果 `header` 是动画 GIF，则不同。\
**类型:** 字符串 (URL)\
**版本历史:**\
1.1.2 - 添加

### `locked` {#locked}

**描述:** 帐户是否手动批准关注请求。\
**类型:** 布尔值\
**版本历史:**\
0.1.0 - 添加

### `fields` {#fields}

**描述:** 附加到账户的其他元数据，以名称-值对的形式存在。\
**类型:** [Field](#Field) 的数组\
**版本历史:**\
2.4.0 - 添加

### `emojis` {#emojis}

**描述:** 在渲染账户时要使用的自定义表情实体。\
**类型:** [CustomEmoji]({{< relref "entities/CustomEmoji" >}}) 数组\
**版本历史:**\
2.4.0 - 添加

### `bot` {#bot}

**描述:** 表示该帐户可能执行自动操作、可能未被监控或标识为机器人。\
**类型:** 布尔值\
**版本历史:**\
2.4.0 - 添加

### `group` {#group}

**描述:** 表示该帐户代表一个组用户组。\
**类型:** 布尔值\
**版本历史:**\
3.1.0 - 添加

### `discoverable` {#discoverable}

**描述:** 帐户是否已选择加入账户目录等发现功能。\
**类型:** {{<nullable>}} 布尔值\
**版本历史:**\
3.1.0 - 添加

### `noindex` {{%optional%}} {#noindex}

**描述:** 该用户是否已选择不被搜索引擎索引。\
**类型:** {{<nullable>}} 布尔值\
**版本历史:**\
4.0.0 - 添加

### `moved` {{%optional%}} {#moved}

**描述:** 表示该账户当前处于非活动状态，并且其用户已转移到新帐户。\
**类型:** {{<nullable>}} [Account]({{< relref "entities/Account" >}})，如果账户被封禁，则为 null。\
**版本历史:**\
2.1.0 - 添加

### `suspended` {{%optional%}} {#suspended}

**描述:** 仅当帐户被封禁时才返回的额外属性。\
**类型:** 布尔值\
**版本历史:**\
3.3.0 - 添加

### `limited` {{%optional%}} {#limited}

**描述:** 一个额外的属性，仅当帐户被隐藏时才会返回。如果为真，则表示应将帐户隐藏并在账户页显示警告。\
**类型:** 布尔值\
**版本历史:**\
3.5.3 - 添加

### `created_at` {#created_at}

**描述:** 帐户的创建时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
0.1.0 - 添加\
3.4.0 - 现在解析为午夜，而不是确切的时间

### `last_status_at` {#last_status_at}

**描述:** 发布最新嘟文的时间。\
**类型:** {{<nullable>}} 字符串 ([Date](/api/datetime-format#date))，如果没有嘟文则为 null\
**版本历史:**\
3.0.0 - 添加\
3.1.0 - 现在只返回日期，没有时间

### `statuses_count` {#statuses_count}

**描述:** 此帐户拥有多少条嘟文。\
**类型:** 整数\
**版本历史:**\
0.1.0 - 添加

### `followers_count` {#followers_count}

**描述:** 本实例举报的此账户的关注者数量。\
**类型:** 整数\
**版本历史:**\
0.1.0 - 添加

### `following_count` {#following_count}

**描述:** 本实例举报的此账户的关注数量。\
**类型:** 整数\
**版本历史:**\
0.1.0 - 添加

## CredentialAccount 实体属性 {#CredentialAccount}

```json
{
  "id": "14715",
  "username": "trwnh",
  "acct": "trwnh",
  "display_name": "infinite love ⴳ",
  // ...
  "attribution_domains": ["example.com", "example.net"],
  "note": "<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>",
  // ...
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": "",
    "note": "i have approximate knowledge of many things. perpetual student. (nb/ace/they)\r\n\r\nxmpp/email: a@trwnh.com\r\nhttps://trwnh.com\r\nhelp me live: https://liberapay.com/trwnh or paypal\r\n\r\n- my triggers are moths and glitter\r\n- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise\r\n- dm me if i did something wrong, so i can improve\r\n- purest person on fedi, do not lewd in my presence",
    "fields": [
      {
        "name": "Website",
        "value": "https://trwnh.com",
        "verified_at": "2019-08-29T04:14:55.571+00:00"
      },
      {
        "name": "Portfolio",
        "value": "https://abdullahtarawneh.com",
        "verified_at": "2021-02-11T20:34:13.574+00:00"
      },
      {
        "name": "Fan of:",
        "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo's Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
        "verified_at": null
      },
      {
        "name": "What to expect:",
        "value": "talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i'm just here to hang out and talk to cool people! and to spill my thoughts.",
        "verified_at": null
      }
    ],
    "follow_requests_count": 5
  },
  // ...
  "fields": [
    {
      "name": "Website",
      "value": "<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-08-29T04:14:55.571+00:00"
    },
    {
      "name": "Portfolio",
      "value": "<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2021-02-11T20:34:13.574+00:00"
    },
    {
      "name": "Fan of:",
      "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
      "verified_at": null
    },
    {
      "name": "What to expect:",
      "value": "talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.",
      "verified_at": null
    }
  ],
  "role": {
    "id": "-99",
    "name": "",
    "permissions": "65536",
    "color": "",
    "highlighted": false
  }
}
```

### `attribution_domains` {#attribution_domains}

**描述:** 允许对帐户进行标记的网站域。\
**类型:** 字符串数组\
**版本历史:**\
4.4.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 3) - 添加

### `source` {#source}

**描述:** 一个额外的属性，其中包含要与 API 方法一起使用的源值，这些方法[验证凭据]({{< relref "methods/accounts#verify_credentials" >}})和[更新凭据]({{< relref "methods/accounts#update_credentials" >}})。\
**类型:** 哈希\
**版本历史:**\
2.4.0 - 添加

#### `source[note]` {#source-note}

**描述:** 账户简介，采用纯文本而不是 HTML。\
**类型:** 字符串\
**版本历史:**\
1.5.0 - 添加

#### `source[fields]` {#source-fields}

**描述:** 关于帐户的元数据。\
**类型:** [Field](#Field) 数组\
**版本历史:**\
2.4.0 - 添加

#### `source[privacy]` {#source-privacy}

**描述:** 用于新嘟文的默认嘟文隐私值。\
**类型:** 字符串（可枚举，oneOf）\
`public`=公开嘟文\
`unlisted`=未列出嘟文\
`private`=仅关注者可见嘟文\
`direct`=私下提及嘟文\
**版本历史:**\
1.5.0 - 添加

#### `source[sensitive]` {#source-sensitive}

**描述:** 默认情况下是否应将新嘟文标记为敏感。\
**类型:** 布尔值\
**版本历史:**\
1.5.0 - 添加

#### `source[language]` {#source-language}

**描述:** 新嘟文的默认发布语言。\
**类型:** 字符串（ISO 639-1 语言双字母代码）或空字符串\
**版本历史:**\
2.4.2 - 添加

#### `source[follow_requests_count]` {#follow_requests_count}

**描述:** 待处理的关注请求数。\
**类型:** 整数\
**版本历史:**\
3.0.0 - 添加

### `role` {#role}

**描述:** 分配给当前授权用户的用户组。\
**类型:** [Role]({{< relref "entities/Role" >}})\
**版本历史:**\
4.0.0 - 添加

## MutedAccount 实体属性 {#MutedAccount}

### `mute_expires_at` {#mute_expires_at}

**描述:** 定时隐藏到期的时间（如果适用）。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime))；如果隐藏是无限期的，则为 null\
**版本历史:**\
3.3.0 - 添加

## Field 实体属性 {#Field}

### `name` {#name}

**描述:** 给定字段的键值对的键。\
**类型:** 字符串\
**版本历史:**\
2.4.0 - 添加

### `value` {#value}

**描述:** 与 `name` 键关联的值。\
**类型:** 字符串 (HTML)\
**版本历史:**\
2.4.0 - 添加

### `verified_at` {#verified_at}

**描述:** 实例验证 rel="me" 链接的 URL 值的时间戳。\
**类型:** {{<nullable>}} 字符串 ([Datetime](/api/datetime-format#datetime))（如果 `value` 是经过验证的 URL）。否则，为 null。\
**版本历史:**\
2.6.0 - 添加

## 另请参考

{{< page-relref ref="methods/accounts" caption="accounts API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/account_serializer.rb" caption="app/serializers/rest/account_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/credential_account_serializer.rb" caption="app/serializers/rest/credential_account_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/muted_account_serializer.rb" caption="app/serializers/rest/muted_account_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Account" raw_link="/entities/Account/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
