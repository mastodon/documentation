---
title: PrivacyPolicy
description: Represents the privacy policy of the instance.
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

## Example

```json
{
  "updated_at": "2022-10-07T00:00:00+00:00",
  "content": "<p>This privacy policy describes how example.com (&quot;example.com&quot;, &quot;we&quot;, &quot;us&quot;) collects,\nprotects and uses the personally identifiable information you may provide\nthrough the example.com website or its API.</p>\n\n<h1>What information do we collect?</h1>\n\n<ul>\n<li><strong>Basic account information</strong>: If you register on this server, you may be\nasked to enter a username, an e-mail address and a password.</li>\n<li><strong>Posts, following and other public information</strong>: The list of people you\nfollow is listed publicly, the same is true for your followers.</li>\n<li><strong>Direct and followers-only posts</strong>: All posts are stored and processed on the\nserver. You may\ntoggle an option to approve and reject new followers manually in the settings.\n<strong>Please keep in mind that the operators of the server and any receiving\nserver may view such messages</strong>, and that recipients may screenshot, copy or\notherwise re-share them. <strong>Do not share any sensitive information over\nMastodon.</strong></li>\n<li><strong>IPs and other metadata</strong>: When you log in, we record the IP address you log\nin from, as well as the name of your browser application.</li>\n</ul>\n\n<hr>\n\n<p>This document is CC-BY-SA. Originally adapted from the <a href=\"https://github.com/discourse/discourse\">Discourse privacy\npolicy</a>.</p>\n"
}
```

## Attributes

### `updated_at` {#updated_at}

**Description:** A timestamp of when the privacy policy was last updated.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
4.0.0 - added

### `content` {#content}

**Description:** The rendered HTML content of the privacy policy.\
**Type:** String (HTML)\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/instance#privacy_policy" caption="GET /api/v1/instance/privacy_policy" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/privacy_policy_serializer.rb" caption="app/serializers/rest/privacy_policy_serializer.rb" >}}