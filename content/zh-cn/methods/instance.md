---
title: instance API 方法
description: Mastodon 站点的识别信息。
menu:
  docs:
    weight: 70
    name: instance
    parent: methods
    identifier: methods-instance
aliases: [
  "/methods/instance",
  "/api/methods/instance",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看实例信息 {#v2}

```http
GET /api/v2/instance
```

获取关于实例的通用信息。

**返回：** [Instance]({{< relref "entities/Instance" >}})\
**OAuth：** 公开\
**版本历史：**\
4.0.0 - 添加\
4.3.0 - 添加 `configuration.vapid.public_key`

#### 响应

##### 200: OK

```json
{
  "domain": "mastodon.social",
  "title": "Mastodon",
  "version": "4.0.0rc1",
  "source_url": "https://github.com/mastodon/mastodon",
  "description": "The original server operated by the Mastodon gGmbH non-profit",
  "usage": {
    "users": {
      "active_month": 123122
    }
  },
  "thumbnail": {
    "url": "https://files.mastodon.social/site_uploads/files/000/000/001/@1x/57c12f441d083cde.png",
    "blurhash": "UeKUpFxuo~R%0nW;WCnhF6RjaJt757oJodS$",
    "versions": {
      "@1x": "https://files.mastodon.social/site_uploads/files/000/000/001/@1x/57c12f441d083cde.png",
      "@2x": "https://files.mastodon.social/site_uploads/files/000/000/001/@2x/57c12f441d083cde.png"
    }
  },
  "icon": [
    {
      "src": "https://files.mastodon.social/site_uploads/files/000/000/003/36/accf17b0104f18e5.png",
      "size": "36x36"
    },
    {
      "src": "https://files.mastodon.social/site_uploads/files/000/000/003/72/accf17b0104f18e5.png",
      "size": "72x72"
    },
    {
      "src": "https://files.mastodon.social/site_uploads/files/000/000/003/192/accf17b0104f18e5.png",
      "size": "192x192"
    },
    {
      "src": "https://files.mastodon.social/site_uploads/files/000/000/003/512/accf17b0104f18e5.png",
      "size": "512x512"
    }
  ],
  "languages": [
    "en"
  ],
  "configuration": {
    "urls": {
      "streaming": "wss://mastodon.social"
    },
    "vapid": {
      "public_key": "BCkMmVdKDnKYwzVCDC99Iuc9GvId-x7-kKtuHnLgfF98ENiZp_aj-UNthbCdI70DqN1zUVis-x0Wrot2sBagkMc="
    },
    "accounts": {
      "max_featured_tags": 10,
      "max_pinned_statuses": 4
    },
    "statuses": {
      "max_characters": 500,
      "max_media_attachments": 4,
      "characters_reserved_per_url": 23
    },
    "media_attachments": {
      "supported_mime_types": [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/heic",
        "image/heif",
        "image/webp",
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/ogg",
        "audio/wave",
        "audio/wav",
        "audio/x-wav",
        "audio/x-pn-wave",
        "audio/vnd.wave",
        "audio/ogg",
        "audio/vorbis",
        "audio/mpeg",
        "audio/mp3",
        "audio/webm",
        "audio/flac",
        "audio/aac",
        "audio/m4a",
        "audio/x-m4a",
        "audio/mp4",
        "audio/3gpp",
        "video/x-ms-asf"
      ],
      "description_limit": 1500,
      "image_size_limit": 10485760,
      "image_matrix_limit": 16777216,
      "video_size_limit": 41943040,
      "video_frame_rate_limit": 60,
      "video_matrix_limit": 2304000
    },
    "polls": {
      "max_options": 4,
      "max_characters_per_option": 50,
      "min_expiration": 300,
      "max_expiration": 2629746
    },
    "translation": {
      "enabled": true
    }
  },
  "registrations": {
    "enabled": false,
    "approval_required": false,
    "message": null
  },
  "contact": {
    "email": "staff@mastodon.social",
    "account": {
      "id": "1",
      "username": "Gargron",
      "acct": "Gargron",
      "display_name": "Eugen 💀",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "group": false,
      "created_at": "2016-03-16T00:00:00.000Z",
      "note": "<p>Founder, CEO and lead developer <span class=\"h-card\"><a href=\"https://mastodon.social/@Mastodon\" class=\"u-url mention\">@<span>Mastodon</span></a></span>, Germany.</p>",
      "url": "https://mastodon.social/@Gargron",
      "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
      "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
      "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
      "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
      "followers_count": 133026,
      "following_count": 311,
      "statuses_count": 72605,
      "last_status_at": "2022-10-31",
      "noindex": false,
      "emojis": [],
      "fields": [
        {
          "name": "Patreon",
          "value": "<a href=\"https://www.patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        }
      ]
    }
  },
  "rules": [
    {
      "id": "1",
      "text": "Sexually explicit or violent media must be marked as sensitive when posting"
    },
    {
      "id": "2",
      "text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
    },
    {
      "id": "3",
      "text": "No incitement of violence or promotion of violent ideologies"
    },
    {
      "id": "4",
      "text": "No harassment, dogpiling or doxxing of other users"
    },
    {
      "id": "5",
      "text": "No content illegal in Germany"
    },
    {
      "id": "7",
      "text": "Do not share intentionally false or misleading information"
    }
  ]
}
```

---

## 连接的域名列表 {#peers}

```http
GET /api/v1/instance/peers HTTP/1.1
```

此实例已知的域名。

**返回：** 字符串数组\
**OAuth：** 公开\
**版本历史：**\
2.1.2 - 添加\
3.0.0 - 若实例处于白名单模式，则需要用户令牌

#### 请求

##### 标头

Authorization
: 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

```json
["tilde.zone","mspsocial.net",...,"conf.tube"]
```

##### 401: Unauthorized

若实例处于白名单模式，并且缺少或无效授权标头，则返回此错误。

```json
{
  "error": "This API requires an authenticated user"
}
```

---

## 每周活动 {#activity}

```http
GET /api/v1/instance/activity HTTP/1.1
```

过去 3 个月的实例活动，按周统计。

**返回：** 哈希数组\
**OAuth：** 公开\
**版本历史：**\
2.1.2 - 添加\
3.0.0 - 若实例处于白名单模式，则需要用户令牌

#### 请求

##### 标头

Authorization
: 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

数组中的每个哈希将包含以下属性：

week
: 字符串（UNIX 时间戳）。 一周的第一天午夜。

statuses
: 字符串（从整数转换）。 自本周开始以来创建的嘟文数。

logins
: 字符串（从整数转换）。 自本周开始以来的登录的用户数。

registrations
: 字符串（从整数转换）。 自本周开始以来的用户注册数。

```json
[
  {
    "week": "1574640000",
    "statuses": "37125",
    "logins": "14239",
    "registrations": "542"
  },
  {
    "week": "1574035200",
    "statuses": "244447",
    "logins": "28820",
    "registrations": "4425"
  },
  {
    "week": "1573430400",
    "statuses": "270615",
    "logins": "35388",
    "registrations": "8781"
  },
  {
    "week": "1572825600",
    "statuses": "309722",
    "logins": "44433",
    "registrations": "26165"
  },
  {
    "week": "1572220800",
    "statuses": "116227",
    "logins": "19739",
    "registrations": "2926"
  },
  {
    "week": "1571616000",
    "statuses": "119932",
    "logins": "19247",
    "registrations": "3188"
  },
  {
    "week": "1571011200",
    "statuses": "117892",
    "logins": "19164",
    "registrations": "3107"
  },
  {
    "week": "1570406400",
    "statuses": "109092",
    "logins": "18763",
    "registrations": "2986"
  },
  {
    "week": "1569801600",
    "statuses": "107554",
    "logins": "19614",
    "registrations": "2904"
  },
  {
    "week": "1569196800",
    "statuses": "118067",
    "logins": "19703",
    "registrations": "3295"
  },
  {
    "week": "1568592000",
    "statuses": "110199",
    "logins": "19791",
    "registrations": "3026"
  },
  {
    "week": "1567987200",
    "statuses": "106029",
    "logins": "19089",
    "registrations": "2769"
  }
]
```

##### 401: Unauthorized

若实例处于白名单模式，并且缺少或无效授权标头，则返回此错误。

```json
{
  "error": "This API requires an authenticated user"
}
```

---

## 规则列表 {#rules}

```http
GET /api/v1/instance/rules HTTP/1.1
```

此服务的用户应遵守的规则。

**返回：** [Rule]({{< relref "entities/rule" >}})数组\
**OAuth：** 公开\
**版本历史：**\
3.4.0 - 添加

#### 响应

##### 200: OK

```json
[
  {
    "id": "1",
    "text": "Sexually explicit or violent media must be marked as sensitive when posting"
  },
  {
    "id": "2",
    "text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
  },
  {
    "id": "3",
    "text": "No incitement of violence or promotion of violent ideologies"
  },
  {
    "id": "4",
    "text": "No harassment, dogpiling or doxxing of other users"
  },
  {
    "id": "5",
    "text": "No content illegal in Germany"
  },
  {
    "id": "7",
    "text": "Do not share intentionally false or misleading information"
  }
]
```

---

## 查看受限的实例 {#domain_blocks}

```http
GET /api/v1/instance/domain_blocks HTTP/1.1
```

获取已被屏蔽的域名列表。

**返回：** [DomainBlock]数组({{< relref "entities/DomainBlock" >}})\
**OAuth：** 公开，或者若仅限于用户，则为用户令牌\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 响应

##### 200: OK

此实例屏蔽的完整域名列表

```json
[
  {
    "domain": "birb.elfenban.de",
    "digest": "5d2c6e02a0cced8fb05f32626437e3d23096480b47efbba659b6d9e80c85d280",
    "severity": "suspend",
    "comment": "Third-party bots"
  },
  {
    "domain": "birdbots.leptonics.com",
    "digest": "ce019d8d32cce8e369ac4367f4dc232103e6f489fbdd247fb99f9c8a646078a4",
    "severity": "suspend",
    "comment": "Third-party bots"
  }
  // ...
]
```

##### 401: Unauthorized

若管理员选择向用户显示域名阻止列表，则提供无效或缺失的授权标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

管理员选择不向任何人显示域名阻止列表。 响应体为空； 只有 HTTP 404 错误代码相关。

```text

```

---

## 查看详细描述 {#extended_description}

```http
GET /api/v1/instance/extended_description HTTP/1.1
```

获取此实例的详细描述

**返回：** [ExtendedDescription]({{< relref "entities/ExtendedDescription" >}})\
**OAuth：** 公开\
**版本历史：**\
4.0.0 - 添加

#### 响应

##### 200: OK

```json
{
  "updated_at": "2022-11-03T04:09:07Z",
  "content": "<p>For inquiries not related specifically to the operation of this server, such as press inquiries, please contact <a href=\"mailto:press@joinmastodon.org\">press@joinmastodon.org</a>.</p>\n\n<h2>Funding</h2>\n\n<p>This server is crowdfunded by <a href=\"https://patreon.com/mastodon\">Patreon donations</a>. For a list of sponsors, see <a href=\"https://joinmastodon.org/sponsors\">joinmastodon.org</a>.</p>\n\n<h2>Reporting and moderation</h2>\n\n<p>When reporting accounts, please make sure to include at least a few posts that show rule-breaking behaviour, when applicable. If there is any additional context that might help make a decision, please also include it in the comment. This is especially important when the content is in a language nobody on the moderation team speaks.</p>\n\n<p>We usually handle reports within 24 hours. Please mind that you are not notified when a report you have made has led to a punitive action, and that not all punitive actions are externally visible. For first time offenses, we may opt to delete offending content, escalating to harsher measures on repeat offenses.</p>\n\n<h2>Impressum</h2>\n\n<p>Mastodon gGmbH<br>\nMühlenstraße 8a<br>\n14167 Berlin<br>\nGermany</p>\n\n<p>E-Mail-Adresse: hello@joinmastodon.org</p>\n\n<p>Vertretungsberechtigt: Eugen Rochko (Geschäftsführer)</p>\n\n<p>Umsatzsteuer Identifikationsnummer (USt-ID): DE344258260</p>\n\n<p>Handelsregister<br>\nGeführt bei: Amtsgericht Charlottenburg<br>\nNummer: HRB 230086 B</p>\n"
}
```

---

## 查看隐私政策 {#privacy_policy}

```http
GET /api/v1/instance/privacy_policy HTTP/1.1
```

获取此实例的隐私政策的内容。

**返回：** [PrivacyPolicy]({{< relref "entities/PrivacyPolicy" >}})\
**OAuth：** 公开\
**版本历史：**\
4.0.0 - 添加

#### 响应

##### 200: OK

```json
{
  "updated_at": "2022-10-07T00:00:00+00:00",
  "content": "<p>This privacy policy describes how example.com (&quot;example.com&quot;, &quot;we&quot;, &quot;us&quot;) collects,\nprotects and uses the personally identifiable information you may provide\nthrough the example.com website or its API.</p>\n\n<h1>What information do we collect?</h1>\n\n<ul>\n<li><strong>Basic account information</strong>: If you register on this server, you may be\nasked to enter a username, an e-mail address and a password.</li>\n<li><strong>Posts, following and other public information</strong>: The list of people you\nfollow is listed publicly, the same is true for your followers.</li>\n<li><strong>Direct and followers-only posts</strong>: All posts are stored and processed on the\nserver. You may\ntoggle an option to approve and reject new followers manually in the settings.\n<strong>Please keep in mind that the operators of the server and any receiving\nserver may view such messages</strong>, and that recipients may screenshot, copy or\notherwise re-share them. <strong>Do not share any sensitive information over\nMastodon.</strong></li>\n<li><strong>IPs and other metadata</strong>: When you log in, we record the IP address you log\nin from, as well as the name of your browser application.</li>\n</ul>\n\n<hr>\n\n<p>This document is CC-BY-SA. Originally adapted from the <a href=\"https://github.com/discourse/discourse\">Discourse privacy\npolicy</a>.</p>\n"
}
```

---

## 查看服务条款 {#terms_of_service}

```http
GET /api/v1/instance/terms_of_service HTTP/1.1
```

获取此实例的服务条款的内容（若已配置）。

**返回：** [TermsOfService]({{< relref "entities/TermsOfService" >}})  
**OAuth:** 公开  
**版本历史:**  
4.4.0 - 新增

#### 响应

##### 200: OK

```json
{
  "effective_date": "2025-04-15",
  "effective": true,
  "content": "<p>Foo bar newer</p>\n",
  "succeeded_by": null
}
```

##### 404: 未找到

本实例尚未配置服务条款。

```json
{
  "error": "Record not found"
}
```

---

## 查看特定版本的服务条款 {#terms_of_service_date}

```http
GET /api/v1/instance/terms_of_service/:date HTTP/1.1
```

获取本实例指定日期的服务条款内容（如有配置）。

**返回：** [TermsOfService]({{< relref "entities/TermsOfService" >}})  
**OAuth:** 公开  
**版本历史:**  
4.4.0 - 新增

#### 请求

##### 路径参数

:date  
: {{<required>}} 字符串。服务条款生效日期。

#### 响应

##### 200: OK

```json
{
  "effective_date": "2025-04-15",
  "effective": true,
  "content": "<p>Foo bar newer</p>\n",
  "succeeded_by": null
}
```

##### 404: Not found

未为此实例配置服务条款。

```json
{
  "error": "未找到记录"
}
```

---

## 查看翻译语言 {#translation_languages}

```http
GET /api/v1/instance/translation_languages HTTP/1.1
```

实例使用的翻译引擎支持的翻译语言对。

**返回：** 对象，源语言代码作为键，目标语言代码数组作为值。\
**OAuth：** 公开\
**版本历史：**\
4.2.0 - 添加

#### 响应

##### 200: OK

实例支持的所有源语言和目标语言对。

在以下示例响应中，显示支持将用英语（`en`）编写的嘟文翻译成德语（`de`）或西班牙语（`es`）。 源语言代码 `und` 表示实例支持自动检测具有空 `language` 属性的嘟文的语言，并将这些嘟文翻译成英式英语（`en-GB`）、德语或西班牙语。

```json
{
  "en": ["de", "es"],
  // [...]
  "und": ["en-GB", "de", "es"]
}
```

---

## 查看实例信息（v1）{{%deprecated%}} {#v1}

```http
GET /api/v1/instance HTTP/1.1
```

获取关于实例的通用信息。 请改用 [api/v2/instance]({{< relref "methods/Instance#v2">}})。

**返回：** [V1::Instance]({{< relref "entities/V1_Instance" >}})\
**OAuth：** 公开\
**版本历史：**\
1.1.0 - 添加\
3.0.0 - 若实例处于白名单模式，则需要用户令牌\
3.1.4 - 将 `invites_enabled` 添加到响应\
3.4.0 - 添加 `rules`\
3.4.2 - 添加 `configuration`\
4.0.0 - 弃用。 添加 `configuration[accounts]`。

#### 响应

##### 200: OK

```json
{
  "uri": "mastodon.social",
  "title": "Mastodon",
  "short_description": "The original server operated by the Mastodon gGmbH non-profit",
  "description": "",
  "email": "staff@mastodon.social",
  "version": "3.5.3",
  "urls": {
    "streaming_api": "wss://mastodon.social"
  },
  "stats": {
    "user_count": 812303,
    "status_count": 38151616,
    "domain_count": 25255
  },
  "thumbnail": "https://files.mastodon.social/site_uploads/files/000/000/001/original/vlcsnap-2018-08-27-16h43m11s127.png",
  "languages": ["en"],
  "registrations": false,
  "approval_required": false,
  "invites_enabled": true,
  "configuration": {
    "statuses": {
      "max_characters": 500,
      "max_media_attachments": 4,
      "characters_reserved_per_url": 23
    },
    "media_attachments": {
      "supported_mime_types": [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/ogg",
        "audio/wave",
        "audio/wav",
        "audio/x-wav",
        "audio/x-pn-wave",
        "audio/vnd.wave",
        "audio/ogg",
        "audio/vorbis",
        "audio/mpeg",
        "audio/mp3",
        "audio/webm",
        "audio/flac",
        "audio/aac",
        "audio/m4a",
        "audio/x-m4a",
        "audio/mp4",
        "audio/3gpp",
        "video/x-ms-asf"
      ],
      "image_size_limit": 10485760,
      "image_matrix_limit": 16777216,
      "video_size_limit": 41943040,
      "video_frame_rate_limit": 60,
      "video_matrix_limit": 2304000
    },
    "polls": {
      "max_options": 4,
      "max_characters_per_option": 50,
      "min_expiration": 300,
      "max_expiration": 2629746
    }
  },
  "contact_account":{
    "id":"1",
    "username":"Gargron",
    "acct":"Gargron",
    "display_name":"Eugen",
    "locked":false,
    "bot":false,
    "discoverable":true,
    "group":false,
    "created_at":"2016-03-16T00:00:00.000Z",
    "note":"\u003cp\u003eFounder, CEO and lead developer \u003cspan class=\"h-card\"\u003e\u003ca href=\"https://mastodon.social/@Mastodon\" class=\"u-url mention\"\u003e@\u003cspan\u003eMastodon\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e, Germany.\u003c/p\u003e",
    "url":"https://mastodon.social/@Gargron",
    "avatar":"https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
    "avatar_static":"https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
    "header":"https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "header_static":"https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "followers_count":118944,
    "following_count":305,
    "statuses_count":72309,
    "last_status_at":"2022-08-24",
    "emojis":[

    ],
    "fields":[
      {
        "name": "Patreon",
        "value": "\u003ca href=\"https://www.patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"\u003e\u003cspan class=\"invisible\"\u003ehttps://www.\u003c/span\u003e\u003cspan class=\"\"\u003epatreon.com/mastodon\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e",
        "verified_at": null
      }
    ]
  },
  "rules": [
    {
      "id": "1",
      "text": "Sexually explicit or violent media must be marked as sensitive when posting"
    },
    {
      "id": "2",
      "text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
    },
    {
      "id": "3",
      "text": "No incitement of violence or promotion of violent ideologies"
    },
    {
      "id": "4",
      "text": "No harassment, dogpiling or doxxing of other users"
    },
    {
      "id": "5",
      "text": "No content illegal in Germany"
    },
    {
      "id": "7",
      "text": "Do not share intentionally false or misleading information"
    }
  ]
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances_controller.rb" caption="app/controllers/api/v1/instances_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/activity_controller.rb" caption="app/controllers/api/v1/instances/activity_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/peers_controller.rb" caption="app/controllers/api/v1/instances/peers_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/rules_controller.rb" caption="app/controllers/api/v1/instances/rules_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/privacy_policies_controller.rb" caption="app/controllers/api/v1/instances/privacy_policies_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/terms_of_services_controller.rb" caption="app/controllers/api/v1/instances/terms_of_services_controller.rb" >}}

{{< translation-status-zh-cn raw_title="instance API methods" raw_link="/methods/instance/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
