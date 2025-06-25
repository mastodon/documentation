---
title: PrivacyPolicy
description: 表示实例的隐私政策。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/privacypolicy",
  "/entities/PrivacyPolicy",
  "/api/entities/privacypolicy",
  "/api/entities/PrivacyPolicy",
]
---

## 示例

```json
{
  "updated_at": "2022-10-07T00:00:00+00:00",
  "content": "<p>This privacy policy describes how example.com (&quot;example.com&quot;, &quot;we&quot;, &quot;us&quot;) collects,\nprotects and uses the personally identifiable information you may provide\nthrough the example.com website or its API.</p>\n\n<h1>What information do we collect?</h1>\n\n<ul>\n<li><strong>Basic account information</strong>: If you register on this server, you may be\nasked to enter a username, an e-mail address and a password.</li>\n<li><strong>Posts, following and other public information</strong>: The list of people you\nfollow is listed publicly, the same is true for your followers.</li>\n<li><strong>Direct and followers-only posts</strong>: All posts are stored and processed on the\nserver. You may\ntoggle an option to approve and reject new followers manually in the settings.\n<strong>Please keep in mind that the operators of the server and any receiving\nserver may view such messages</strong>, and that recipients may screenshot, copy or\notherwise re-share them. <strong>Do not share any sensitive information over\nMastodon.</strong></li>\n<li><strong>IPs and other metadata</strong>: When you log in, we record the IP address you log\nin from, as well as the name of your browser application.</li>\n</ul>\n\n<hr>\n\n<p>This document is CC-BY-SA. Originally adapted from the <a href=\"https://github.com/discourse/discourse\">Discourse privacy\npolicy</a>.</p>\n"
}
```

## 属性

### `updated_at` {#updated_at}

**描述:** 隐私政策上次更新的时间戳。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.0.0 - 添加

### `content` {#content}

**描述:** 隐私政策的渲染后的 HTML 内容。\
**类型:** 字符串 (HTML)\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref ref="methods/instance#privacy_policy" caption="GET /api/v1/instance/privacy_policy" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/privacy_policy_serializer.rb" caption="app/serializers/rest/privacy_policy_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="PrivacyPolicy" raw_link="/entities/PrivacyPolicy/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
