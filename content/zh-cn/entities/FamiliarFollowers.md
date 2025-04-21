---
title: FamiliarFollowers
description: 表示你的关注者中，同时也关注了其他用户的子集。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/familiarfollowers",
  "/entities/FamiliarFollowers",
  "/api/entities/familiarfollowers",
  "/api/entities/FamiliarFollowers",
]
---

## 示例

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

## 属性

### `id` {#id}

**描述:** 数据库中账户的ID。\
**类型:** 字符串（从整数转换而来，但不保证一定是数字）\
**版本历史:**\
3.5.0 - 添加

### `accounts` {#accounts}

**描述:** 你关注的，并且也关注了这个账户的其他账户。\
**类型:** [Account]({{< relref "entities/Account" >}}) 数组\
**版本历史:**\
3.5.0 - 添加

## 另请参阅

{{< page-relref ref="methods/accounts#familiar_followers" caption="GET /api/v1/accounts/:id/familiar_followers" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/familiar_followers_serializer.rb" caption="app/serializers/rest/familiar_followers_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="FamiliarFollowers" raw_link="/entities/FamiliarFollowers/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
