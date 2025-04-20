---
title: Instance
description: 表示在此域名上运行的 Mastodon 实例。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/instance",
  "/entities/Instance",
  "/api/entities/instance",
  "/api/entities/Instance",
]
---

## 示例

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
      "streaming": "wss://mastodon.social",
      "about": "https://mastodon.social/about",
      "privacy_policy": "https://mastodon.social/privacy-policy",
      "terms_of_service": "https://mastodon.social/terms-of-service"
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
    "reason_required": false,
    "message": null,
    "min_age": 16
  },
  "api_versions": {
    "mastodon": 1,
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

## 属性

### `domain` {#domain}

**描述:** 实例的域名。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `title` {#title}

**描述:** 站点的标题。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `version` {#version}

**描述:** 实例上安装的 Mastodon 版本。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `source_url` {#source_url}

**描述:** 根据 AGPL 许可要求，运行在此实例上的软件的源代码的 URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
4.0.0 - 添加

### `description` {#description}

**描述:** 管理员定义的简短纯文本描述。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `usage` {#usage}

**描述:** 此实例的使用数据。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

#### `usage[users]` {#users}

**描述:** 与此实例上的用户相关的使用数据。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `usage[users][active_month]` {#active_month}

**描述:** 过去 4 周内的活跃用户数。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

### `thumbnail` {#thumbnail}

**描述:** 用于表示此实例的图像。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

#### `thumbnail[url]` {#thumbnail-url}

**描述:** 缩略图图像的 URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
4.0.0 - 添加

#### `thumbnail[blurhash]` {{<optional>}} {#blurhash}

**描述:** 一种由 [BlurHash 算法](https://github.com/woltapp/blurhash) 计算出的哈希值，用于在媒体尚未下载时生成彩色预览缩略图。\
**类型:** 字符串 (Blurhash)\
**版本历史:**\
4.0.0 - 添加

#### `thumbnail[versions]` {{<optional>}} {#thumbnail-versions}

**描述:** 指向缩放分辨率图像的链接，适用于高 DPI 屏幕。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `thumbnail[versions][@1x]` {{<optional>}} {#1x}

**描述:** 1x 分辨率的缩略图图像的 URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
4.0.0 - 添加

##### `thumbnail[versions][@2x]` {{<optional>}} {#2x}

**描述:** 2x 分辨率的缩略图图像的 URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
4.0.0 - 添加

### `icon` {#icon}

**描述:** 为此实例配置的图标的可用尺寸变体的列表。\
**类型:** [InstanceIcon](#InstanceIcon) 数组\
**版本历史:**\
4.3.0 - 添加

### `languages` {#languages}

**描述:** 网站及其工作人员的主要语言。\
**类型:** 字符串 (ISO 639-1 双字符代码) 数组\
**版本历史:**\
4.0.0 - 添加

### `configuration` {#configuration}

**描述:** 此网站的配置值和限制。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

#### `configuration[urls]` {#urls}

**描述:** 客户端应用感兴趣的 URL。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `configuration[urls][streaming]` {#streaming}

**描述:** 用于连接到流式 API 的 Websockets URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
4.0.0 - 添加

##### `configuration[urls][about]` {#about_url}

**描述:** 实例“关于”页面的 URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
4.4.0 - 添加

##### `configuration[urls][privacy_policy]` {#privacy_policy}

**描述:** 实例隐私政策页面的 URL。\
**类型:** 字符串 (URL) 或 null\
**版本历史:**\
4.4.0 - 添加

##### `configuration[urls][terms_of_service]` {#terms_of_service}

**描述:** 实例当前服务条款页面的 URL。\
**类型:** {{<nullable>}} 字符串 (URL)\
**版本历史:**\
4.4.0 - 添加


### `configuration[vapid][public_key]` {#vapid_public_key}
**描述:** 实例的 VAPID 公钥，用于推送通知，与 [WebPushSubscription#server_key]({{< relref "entities/WebPushSubscription#server_key" >}}) 相同。\
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

#### `configuration[accounts]` {#accounts}

**描述:** 与帐户相关的限制。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `configuration[accounts][max_featured_tags]` {#max_featured_tags}

**描述:** 每个帐户允许的最大精选话题标签数。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[accounts][max_pinned_statuses]` {#max_pinned_statuses}

**描述:** 每个帐户允许的最大置顶嘟文数。\
**类型:** 整数\
**版本历史:**\
4.3.0 - 添加

#### `configuration[statuses]` {#statuses}

**描述:** 与撰写嘟文相关的限制。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `configuration[statuses][max_characters]` {#max_characters}

**描述:** 每条嘟文允许的最大字符数。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[statuses][max_media_attachments]` {#max_media_attachments}

**描述:** 可以添加到嘟文的最大媒体附件数。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[statuses][characters_reserved_per_url]` {#characters_reserved_per_url}

**描述:** 嘟文中的每个 URL 将被假定为占用的字符数。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

#### `configuration[media_attachments]` {#media_attachments}

**描述:** 有关将接受哪些附件的提示。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `configuration[media_attachments][supported_mime_types]` {#supported_mime_types}

**描述:** 包含可以上传的 MIME 类型。\
**类型:** 字符串数组\
**版本历史:**\
4.0.0 - 添加

##### `configuration[media_attachments][description_limit]` {#description_limit}

**描述:** 描述的最大大小（以字符为单位）。\
**类型:** 整数\
**版本历史:**\
4.4.0 - 添加

##### `configuration[media_attachments][image_size_limit]` {#image_size_limit}

**描述:** 任何上传图像的最大大小（以字节为单位）。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[media_attachments][image_matrix_limit]` {#image_matrix_limit}

**描述:** 图像上传的最大像素数（宽度乘以高度）。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[media_attachments][video_size_limit]` {#video_size_limit}

**描述:** 任何上传视频的最大大小（以字节为单位）。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[media_attachments][video_frame_rate_limit]` {#video_frame_rate_limit}

**描述:** 任何上传视频的最大帧速率。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[media_attachments][video_matrix_limit]` {#video_matrix_limit}

**描述:** 视频上传的最大像素数（宽度乘以高度）。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

#### `configuration[polls]` {#polls}

**描述:** 与投票相关的限制。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `configuration[polls][max_options]` {#max_options}

**描述:** 每个投票最多允许的选项数。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[polls][max_characters_per_option]` {#max_characters_per_option}

**描述:** 每个投票选项允许的字符数。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[polls][min_expiration]` {#min_expiration}

**描述:** 允许的最短投票持续时间（以秒为单位）。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

##### `configuration[polls][max_expiration]` {#max_expiration}

**描述:** 允许的最长投票持续时间（以秒为单位）。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

#### `configuration[translation]` {#translation}

**描述:** 与翻译相关的提示。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `configuration[translation][enabled]` {#translation-enabled}

**描述:** 此实例是否提供 Translations API。\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

### `registrations`

**描述:** 有关注册此网站的信息。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

#### `registrations[enabled]` {#registrations-enabled}

**描述:** 是否启用注册。\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

#### `registrations[approval_required]` {#approval_required}

**描述:** 注册是否需要管理员批准。\
**类型:** 布尔值\
**版本历史:**\
4.0.0 - 添加

#### `registrations[message]` {#registrations-message}

**描述:** 注册关闭时显示的自定义消息。\
**类型:** {{<nullable>}} 字符串 (HTML) or null\
**版本历史:**\
4.0.0 - 添加

#### `registrations[min_age]` {#registrations-min_age}

**描述:** 若配置，则为注册所需的最小年龄。\
**类型:** {{<nullable>}} 整数或 null\
**版本历史:**\
4.4.0 - 添加

#### `registrations[reason_required]` {#registrations-reason_required}

**描述:** 注册是否需要用户提供加入理由。仅当 `registrations[approval_required]` 为 true 时适用。\
**类型:** {{<nullable>}} 布尔值\
**版本历史:**\
4.4.0 - 添加

### `api_versions` {#api-versions}

**描述:** 有关此实例实现的 API 版本的信息。它至少包含一个 `mastodon` 属性，其他实现可能具有自己的附加属性。\
**类型:** Hash\
**版本历史:**\
4.3.0 - 添加

### `api_versions[mastodon]`

**描述:** 此实例实现的 API 版本号。 从 Mastodon v4.3.0 开始，API 更改将附带一个版本号，客户端可以根据此值进行检查。\
**类型:** 整数\
**版本历史:**\
4.3.0 - 添加

### `contact` {#contact}

**描述:** 与联系网站代表相关的提示。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

#### `contact[email]` {#contact-email}

**描述:** 可以发送消息以询问或举报问题的电子邮件地址。\
**类型:** 字符串 (Email)\
**版本历史:**\
4.0.0 - 添加

#### `contact[account]` {#contact-account}

**描述:** 可以通过网络联系以询问或举报问题的帐户。\
**类型:** {{<nullable>}} [Account]({{< relref "entities/Account" >}}) or null\
**版本历史:**\
4.0.0 - 添加

### `rules` {#rules}

**描述:** 此网站的规则的详细列表。\
**类型:** [Rule]({{< relref "entities/Rule" >}}) 数组\
**版本历史:**\
4.0.0 - 添加

## InstanceIcon 属性 {#InstanceIcon}

### `src` {#src}

**描述:** 此图标的 URL。\
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

### `size` {#size}

**描述:** 此图标的大小。\
**类型:** 字符串 (格式形如 `12x34`, 其中 `12` 是图标宽度，`34` 是图标高度)\
**版本历史:**\
4.3.0 - 添加

## 参见

{{< page-relref ref="methods/instance#v2" caption="GET /api/v2/instance" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Instance" raw_link="/entities/Instance/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
