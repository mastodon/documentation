---
title: Status
description: 表示帐户发布的嘟文。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/mention",
  "/entities/Mention",
  "/entities/status",
  "/entities/Status",
  "/api/entities/mention",
  "/api/entities/Mention",
  "/api/entities/status",
  "/api/entities/Status",
]
---

## 示例

```json
{
  "id": "103270115826048975",
  "created_at": "2019-12-08T03:48:33.901Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/Gargron/statuses/103270115826048975",
  "url": "https://mastodon.social/@Gargron/103270115826048975",
  "replies_count": 5,
  "reblogs_count": 6,
  "favourites_count": 11,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "bookmarked": false,
  "content": "<p>&quot;I lost my inheritance with one wrong digit on my sort code&quot;</p><p><a href=\"https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">theguardian.com/money/2019/dec</span><span class=\"invisible\">/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code</span}</p>",
  "reblog": null,
  "application": {
    "name": "Web",
    "website": null
  },
  "account": {
    "id": "1",
    "username": "Gargron",
    "acct": "Gargron",
    "display_name": "Eugen",
    "locked": false,
    "bot": false,
    "discoverable": true,
    "group": false,
    "created_at": "2016-03-16T14:34:26.392Z",
    "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
    "url": "https://mastodon.social/@Gargron",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
    "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
    "followers_count": 322930,
    "following_count": 459,
    "statuses_count": 61323,
    "last_status_at": "2019-12-10T08:14:44.811Z",
    "emojis": [],
    "fields": [
      {
        "name": "Patreon",
        "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span}",
        "verified_at": null
      },
      {
        "name": "Homepage",
        "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span}",
        "verified_at": "2019-07-15T18:29:57.191+00:00"
      }
    ]
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": {
    "url": "https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code",
    "title": "‘I lost my £193,000 inheritance – with one wrong digit on my sort code’",
    "description": "When Peter Teich’s money went to another Barclays customer, the bank offered £25 as a token gesture",
    "type": "link",
    "author_name": "",
    "author_url": "",
    "provider_name": "",
    "provider_url": "",
    "html": "",
    "width": 0,
    "height": 0,
    "image": null,
    "embed_url": ""
  },
  "poll": null
}
```

## 属性

### `id` {#id}

**描述:** 数据库中嘟文的 ID。\
**类型:** 字符串（从整数转换而来，但不保证是数字）\
**版本历史:**\
0.1.0 - 添加

### `uri` {#uri}

**描述:** 用于联合的嘟文 URI。\
**类型:** 字符串\
**版本历史:**\
0.1.0 - 添加

### `created_at` {#created_at}

**描述:** 此嘟文创建的日期。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
0.1.0 - 添加

### `account` {#account}

**描述:** 撰写此嘟文的帐户。\
**类型:** [Account]({{< relref "entities/Account" >}})\
**版本历史:**\
0.1.0 - 添加

### `content` {#content}

**描述:** HTML 格式的嘟文内容。\
**类型:** 字符串 (HTML)\
**版本历史:**\
0.1.0 - 添加

### `visibility` {#visibility}

**描述:** 此嘟文的可见性。\
**类型:** 字符串（可枚举的 oneOf 类型）\
`public` = 公开可见，显示在公共时间线中。\
`unlisted` = 公开可见，但不包含在公共时间线中。\
`private` = 仅对关注者以及任何被提及的用户可见。\
`direct` = 仅对被提及的用户可见。\
**版本历史:**\
0.9.9 - 添加

### `sensitive` {#sensitive}

**描述:** 此嘟文是否标记为敏感内容？\
**类型:** 布尔值\
**版本历史:**\
0.9.9 - 添加

### `spoiler_text` {#spoiler_text}

**描述:** 主题或摘要，嘟文内容将被折叠在该文本之后，直到被展开为止。\
**类型:** 字符串\
**版本历史:**\
1.0.0 - 添加

### `media_attachments` {#media_attachments}

**描述:** 附加到此嘟文的媒体。\
**类型:** [MediaAttachment]({{< relref "entities/MediaAttachment" >}}) 数组\
**版本历史:**\
0.6.0 - 添加

### `application` {{%optional%}} {#application}

**描述:** 用于发布此嘟文的应用。\
**类型:** 哈希\
**版本历史:**\
0.9.9 - 添加

#### `application[name]` {#application-name}

**描述:** 发布此嘟文的应用的名称。\
**类型:** 字符串\
**版本历史:**\
0.9.9 - 添加

#### `application[website]` {#application-website}

**描述:** 与发布此嘟文的应用关联的网站。\
**类型:** {{<nullable>}} 字符串 (URL) 或 null\
**版本历史:**\
0.9.9 - 添加\
3.5.1 - this property is now nullable

### `mentions` {#mentions}

**描述:** 在嘟文内容中提及的用户。\
**类型:** [Status::Mention](#Mention) 数组\
**版本历史:**\
0.6.0 - 添加

### `tags` {#tags}

**描述:** 在嘟文内容中使用的话题标签。\
**类型:** [Status::Tag](#Tag) 数组\
**版本历史:**\
0.6.0 - 添加

### `emojis` {#emojis}

**描述:** 渲染嘟文内容时要使用的自定义表情。\
**类型:** [CustomEmoji]({{< relref "entities/CustomEmoji" >}}) 数组\
**版本历史:**\
2.0.0 - 添加

### `reblogs_count` {#reblogs_count}

**描述:** 此嘟文的被转发数。\
**类型:** 整数\
**版本历史:**\
0.1.0 - 添加

### `favourites_count` {#favorites_count}

**描述:** 此嘟文已收到的点赞数。\
**类型:** 整数\
**版本历史:**\
0.1.0 - 添加

### `replies_count` {#replies_count}

**描述:** 此嘟文已收到的回复数。\
**类型:** 整数\
**版本历史:**\
2.5.0 - 添加

### `url` {#url}

**描述:** 指向嘟文的 HTML 表示的链接。\
**类型:** {{<nullable>}} 字符串 (URL) 或 null\
**版本历史:**\
0.1.0 - 添加

### `in_reply_to_id` {#in_reply_to_id}

**描述:** 要回复的嘟文的 ID。\
**类型:** {{<nullable>}} 字符串（从整数转换而来，但不保证是数字）或 null\
**版本历史:**\
0.1.0 - 添加

### `in_reply_to_account_id` {#in_reply_to_account_id}

**描述:** 撰写要回复的嘟文的帐户的 ID。\
**类型:** {{<nullable>}} 字符串（从整数转换而来，但不保证是数字）或 null\
**版本历史:**\
0.1.0 - 添加

### `reblog` {#reblog}

**描述:** 要转发的嘟文。\
**类型:** {{<nullable>}} [Status]({{< relref "entities/status" >}}) 或 null\
**版本历史:**\
0.1.0 - 添加

### `poll` {#poll}

**描述:** 附加到嘟文的投票。\
**类型:** {{<nullable>}} [Poll]({{< relref "entities/Poll" >}}) 或 null\
**版本历史:**\
2.8.0 - 添加

### `card` {#card}

**描述:** 嘟文内容中包含的链接的预览卡片。\
**类型:** {{<nullable>}} [PreviewCard]({{< relref "entities/PreviewCard" >}}) 或 null\
**版本历史:**\
2.6.0 - 添加

### `language` {#language}

**描述:** 此嘟文的主要语言。\
**类型:** {{<nullable>}} 字符串（ISO 639 第 1 部分两位字母语言代码）或 null\
**版本历史:**\
1.4.0 - 添加

### `text` {#text}

**描述:** 嘟文的原始纯文本。当嘟文被删除时返回，而不是返回 `content`，因此用户可以从源文本中重新起草，而无需客户端从 HTML 内容中逆向得到原始文本。\
**类型:** {{<nullable>}} 字符串或 null\
**版本历史:**\
2.9.0 - 添加

### `edited_at` {#edited_at}

**描述:** 上次编辑嘟文的时间戳。\
**类型:** {{<nullable>}} ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
3.5.0 - 添加

### `favourited` {{%optional%}} {#favourited}

**描述:** 如果当前令牌具有授权用户：该授权用户是否喜欢了此嘟文？\
**类型:** 布尔值\
**版本历史:**\
0.1.0 - 添加

### `reblogged` {{%optional%}} {#reblogged}

**描述:** 如果当前令牌具有授权用户：该授权用户是否已转发此嘟文？\
**类型:** 布尔值\
**版本历史:**\
0.1.0 - 添加

### `muted` {{%optional%}} {#muted}

**描述:** 如果当前令牌具有授权用户：该授权用户是否隐藏了有关此嘟文的通知？\
**类型:** 布尔值\
**版本历史:**\
1.4.0 - 添加

### `bookmarked` {{%optional%}} {#bookmarked}

**描述:** 如果当前令牌具有授权用户：该授权用户是否已将此嘟文添加到书签？\
**类型:** 布尔值\
**版本历史:**\
3.1.0 - 添加

### `pinned` {{%optional%}} {#pinned}

**描述:** 如果当前令牌具有授权用户：该授权用户是否已置顶此嘟文？仅当嘟文可置顶时才会返回。\
**类型:** 布尔值\
**版本历史:**\
1.6.0 - 添加

### `filtered` {{%optional%}} {#filtered}

**描述:** 如果当前令牌具有授权用户：此嘟文命中的过滤规则和关键词。\
**类型:** [FilterResult]({{< relref "entities/FilterResult" >}}) 数组\
**版本历史:**\
4.0.0 - 添加

## Status::Mention 属性 {#Mention}

### `id` {#Mention-id}

**描述:** 被提及用户的帐户 ID。\
**类型:** 字符串（从整数类型转换而来，但不保证是数字）\
**版本历史:**\
0.6.0 - 添加

### `username` {#Mention-username}

**描述:** 被提及用户的用户名。\
**类型:** 字符串\
**版本历史:**\
0.6.0 - 添加

### `url` {#Mention-url}

**描述:** 被提及用户的账户位置。\
**类型:** 字符串 (URL)\
**版本历史:**\
0.6.0 - 添加

### `acct` {#Mention-acct}

**描述:** 被提及用户的 webfinger acct: URI。对于本站用户，等同于 `username`，对于外站用户，等同于 `username@domain`。\
**类型:** 字符串\
**版本历史:**\
0.6.0 - 添加

## Status::Tag 属性 {#Tag}

### `name` {#Tag-name}

**描述:** # 符号后的话题标签名。\
**类型:** 字符串\
**版本历史:**\
0.9.0 - 添加

### `url` {#Tag-url}

**描述:** 指向实例上话题标签的链接。\
**类型:** 字符串 (URL)\
**版本历史:**\
0.9.0 - 添加

## 参见

{{< page-relref ref="methods/accounts#statuses" caption="GET /api/v1/accounts/:id/statuses" >}}

{{< page-relref ref="methods/search#v2" caption="POST /api/v2/search/" >}}

{{< page-relref ref="methods/statuses" caption="statuses methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/status_serializer.rb" caption="app/serializers/rest/status_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Status" raw_link="/entities/Status/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
