---
title: Suggestion
description: 表示一个推荐关注的帐户以及推荐的原因。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/suggestion",
  "/entities/Suggestion",
  "/api/entities/suggestion",
  "/api/entities/Suggestion",
]
---

## 示例

```json
{
  "source": "staff",
  "account": {
    "id": "109031732217496096",
    "username": "alice",
    "acct": "alice",
    // ...
  }
}
```

## 属性

### `source` {#source}

**描述：** 推荐此帐户的原因。\
**类型：** 字符串 (可枚举的 oneOf)\
`staff` = 此帐户由你的实例的管理团队手动推荐\
`past_interactions` = 你之前与此帐户互动过\
`global` = 此帐户在过去 30 天内拥有大量的转嘟、喜欢或活跃的本站关注者\
**版本历史：**\
3.4.0 - 添加\
4.3.0 - 已弃用，请改用 `sources`

### `sources` {#sources}

**描述：** 推荐此帐户的一系列原因。 这取代了 `source`\
**类型：** 字符串数组 (可枚举的 oneOf)\
`featured` = 此帐户由你的管理团队手动推荐。 相当于 `source` 的 `staff` 值\
`most_followed` = 此帐户拥有许多活跃的本站关注者\
`most_interactions` = 此帐户在过去 30 天内有很多转嘟和喜欢\
`similar_to_recently_followed` = 此帐户的账户与你最近关注的帐户相似\
`friends_of_friends` = 此帐户被你关注的人关注\
**版本历史：**\
4.3.0 - 添加

### `account` {#account}

**描述：** 推荐关注的帐户。\
**类型：** [帐户]({{< relref "entities/Account" >}})\
**版本历史：**\
3.4.0 - 添加

## 参见

{{< page-relref ref="methods/suggestions#v2" caption="GET /api/v2/suggestions" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/suggestion_serializer.rb" caption="app/serializers/rest/suggestion_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/account_suggestions.rb" caption="app/models/account_suggestions.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/account_suggestions/" caption="app/models/account_suggestions/" >}}

{{< translation-status-zh-cn raw_title="Suggestion" raw_link="/entities/Suggestion/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
