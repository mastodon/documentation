---
title: V1::Instance
description: 表示在此域名上运行的 Mastodon 软件实例。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/v1_instance",
  "/entities/V1_Instance",
  "/api/entities/v1_instance",
  "/api/entities/V1_Instance",
]
---

## 示例

```json
{
  "uri":"mastodon.social",
  "title":"Mastodon",
  "short_description":"The original server operated by the Mastodon gGmbH non-profit",
  "description":"",
  "email":"staff@mastodon.social",
  "version":"3.5.3",
  "urls":{
    "streaming_api":"wss://mastodon.social"
  },
  "stats":{
    "user_count":812303,
    "status_count":38151616,
    "domain_count":25255
  },
  "thumbnail":"https://files.mastodon.social/site_uploads/files/000/000/001/original/vlcsnap-2018-08-27-16h43m11s127.png",
  "languages":[
    "en"
  ],
  "registrations":false,
  "approval_required":false,
  "invites_enabled":true,
  "configuration":{
    "statuses":{
      "max_characters":500,
      "max_media_attachments":4,
      "characters_reserved_per_url":23
    },
    "media_attachments":{
      "supported_mime_types":[
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
      "image_size_limit":10485760,
      "image_matrix_limit":16777216,
      "video_size_limit":41943040,
      "video_frame_rate_limit":60,
      "video_matrix_limit":2304000
    },
    "polls":{
      "max_options":4,
      "max_characters_per_option":50,
      "min_expiration":300,
      "max_expiration":2629746
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
        "name":"Patreon",
        "value":"\u003ca href=\"https://www.patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"\u003e\u003cspan class=\"invisible\"\u003ehttps://www.\u003c/span\u003e\u003cspan class=\"\"\u003epatreon.com/mastodon\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e",
        "verified_at":null
      }
    ]
  },
  "rules":[
    {
      "id":"1",
      "text":"Sexually explicit or violent media must be marked as sensitive when posting"
    },
    {
      "id":"2",
      "text":"No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
    },
    {
      "id":"3",
      "text":"No incitement of violence or promotion of violent ideologies"
    },
    {
      "id":"4",
      "text":"No harassment, dogpiling or doxxing of other users"
    },
    {
      "id":"5",
      "text":"No content illegal in Germany"
    },
    {
      "id":"7",
      "text":"Do not share intentionally false or misleading information"
    }
  ]
}
```

## 属性

### `uri` {#uri}

**描述:** 实例的域名。\
**类型:** 字符串\
**版本历史:**\
1.1.0 - 添加

### `title` {#title}

**描述:** 网站的标题。\
**类型:** 字符串\
**版本历史:**\
1.1.0 - 添加

### `short_description` {#short_description}

**描述:** 由管理员定义的简短纯文本描述。\
**类型:** 字符串\
**版本历史:**\
2.9.2 - 添加

### `description` {#description}

**描述:** 允许使用 HTML 的 Mastodon 站点描述。\
**类型:** 字符串\
**版本历史:**\
1.1.0 - 添加

### `email` {#email}

**描述:** 可供任何咨询联系的电子邮件地址。\
**类型:** 字符串\
**版本历史:**\
1.1.0 - 添加

### `version` {#version}

**描述:** 实例上安装的 Mastodon 版本。\
**类型:** 字符串\
**版本历史:**\
1.3.0 - 添加

### `urls` {#urls}

**描述:** 客户端应用感兴趣的 URL。\
**类型:** Hash\
**版本历史:**\
1.4.2 - 添加

#### `urls[streaming_api]` {#streaming_api}

**描述:** 用于连接到流式 API 的 Websockets URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
1.4.2 - 添加

### `stats` {#stats}

**描述:** 关于实例包含多少信息的统计数据。\
**类型:** Hash\
**版本历史:**\
1.6.0 - 添加

#### `stats[user_count]` {#user_count}

**描述:** 此实例上的用户总数。\
**类型:** 整数\
**版本历史:**\
1.6.0 - 添加

#### `stats[status_count]` {#status_count}

**描述:** 此实例上的嘟文总数。\
**类型:** 整数\
**版本历史:**\
1.6.0 - 添加

#### `stats[domain_count]` {#domain_count}

**描述:** 此实例发现的域名总数。\
**类型:** 整数\
**版本历史:**\
1.6.0 - 添加

### `thumbnail` {#thumbnail}

**描述:** 网站的横幅图片。\
**类型:** {{<nullable>}} 字符串 (URL)\
**版本历史:**\
1.6.1 - 添加

### `languages` {#languages}

**描述:** 网站及其工作人员的主要语言。\
**类型:** Array of String (ISO 639-1 双字母代码)\
**版本历史:**\
2.3.0 - 添加

### `registrations` {#registrations}

**描述:** 是否允许注册。\
**类型:** 布尔值\
**版本历史:**\
2.7.2 - 添加

### `approval_required` {#approval_required}

**描述:** 注册是否需要管理员批准。\
**类型:** 布尔值\
**版本历史:**\
2.9.2 - 添加

### `invites_enabled` {#invites_enabled}

**描述:** 是否启用了邀请。\
**类型:** 布尔值\
**版本历史:**\
3.1.4 - 添加

### `configuration` {#configuration}

**描述:** 此网站的配置值和限制。\
**类型:** Hash\
**版本历史:**\
3.4.2 - 添加

#### `configuration[accounts]` {#accounts}

**描述:** 与帐户相关的限制。\
**类型:** Hash\
**版本历史:**\
4.0.0 - 添加

##### `configuration[accounts][max_featured_tags]` {#max_featured_tags}

**描述:** 每个帐户允许的最大特色话题标签数。\
**类型:** 整数\
**版本历史:**\
4.0.0 - 添加

#### `configuration[statuses]` {#statuses}

**描述:** 与发布嘟文相关的限制。\
**类型:** Hash\
**版本历史:**\
3.4.2 - 添加

##### `configuration[statuses][max_characters]` {#max_characters}

**描述:** 每条嘟文允许的最大字符数。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[statuses][max_media_attachments]` {#max_media_attachments}

**描述:** 可以添加到嘟文的媒体附件的最大数量。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[statuses][characters_reserved_per_url]` {#characters_reserved_per_url}

**描述:** 嘟文中的每个 URL 将被假定占据的字符数。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

#### `configuration[media_attachments]` {#media_attachments}

**描述:** 有关可接受的媒体附件格式范围的提示。\
**类型:** Hash\
**版本历史:**\
3.4.2 - 添加

##### `configuration[media_attachments][supported_mime_types]` {#supported_mime_types}

**描述:** 包含可以上传的 MIME 类型。\
**类型:** 字符串数组\
**版本历史:**\
3.4.2 - 添加

##### `configuration[media_attachments][image_size_limit]` {#image_size_limit}

**描述:** 所有上传图像的最大大小（以字节为单位）。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[media_attachments][image_matrix_limit]` {#image_matrix_limit}

**描述:** 图像上传的最大像素数（宽度乘以高度）。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[media_attachments][video_size_limit]` {#video_size_limit}

**描述:** 所有上传视频的最大大小（以字节为单位）。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[media_attachments][video_frame_rate_limit]` {#video_frame_rate_limit}

**描述:** 所有上传视频的最大帧速率。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[media_attachments][video_matrix_limit]` {#video_matrix_limit}

**描述:** 视频上传的最大像素数（宽度乘以高度）。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

#### `configuration[polls]` {#polls}

**描述:** 与投票相关的限制。\
**类型:** Hash\
**版本历史:**\
3.4.2 - 添加

##### `configuration[polls][max_options]` {#max_options}

**描述:** 每次投票最多允许的选项数。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[polls][max_characters_per_option]` {#max_characters_per_option}

**描述:** 每个投票选项允许包含的字符数。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[polls][min_expiration]` {#min_expiration}

**描述:** 允许的最短投票持续时间（以秒为单位）。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

##### `configuration[polls][max_expiration]` {#max_expiration}

**描述:** 允许的最长投票持续时间（以秒为单位）。\
**类型:** 整数\
**版本历史:**\
3.4.2 - 添加

### `contact_account` {#contact_account}

**描述:** 可供联系的用户，作为 `email` 的替代方案。\
**类型:** {{<nullable>}} [Account]({{< relref "entities/Account" >}}) or null\
**版本历史:**\
2.3.0 - 添加

### `rules` {#rules}

**描述:** 此网站的规则的详细列表。\
**类型:** [Rule]({{< relref "entities/Rule" >}}) 的数组\
**版本历史:**\
3.4.0 - 添加

## 参见

{{< page-relref ref="methods/instance#v1" caption="GET /api/v1/instance" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/v1/instance_serializer.rb" caption="app/serializers/rest/v1/instance_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="V1::Instance" raw_link="/entities/V1_Instance/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
