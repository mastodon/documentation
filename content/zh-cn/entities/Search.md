---
title: Search
description: 表示搜索结果。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/results",
  "/entities/Results",
  "/entities/search",
  "/entities/Search",
  "/api/entities/results",
  "/api/entities/Results",
  "/api/entities/search",
  "/api/entities/Search",
]
---

## 示例

关于 q=cats limit=2 的搜索结果采样片段

```json
{
  "accounts": [
    {
      "id": "180744",
      "username": "catstar",
      "acct": "catstar@catgram.jp",
      "display_name": "catstar",
      // ...
    },
    {
      "id": "214293",
      "username": "catsareweird",
      "acct": "catsareweird",
      "display_name": "Cats Are Weird",
      // ...
    }
  ],
  "statuses": [
    {
      "id": "103085519055545958",
      "created_at": "2019-11-05T13:23:09.000Z",
      // ...
      "content": "<p>cats<br>cats never change</p>",
      // ...
    },
    {
      "id": "101068121469614510",
      "created_at": "2018-11-14T06:31:48.000Z",
      // ...
      "spoiler_text": "Cats",
      // ...
      "content": "<p>Cats are inherently good at self-care. </p><p><a href=\"https://mspsocial.net/tags/cats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>cats</span}</p>",
      // ...
    },
    // ...
  ],
  "hashtags": [
    {
      "name": "cats",
      "url": "https://mastodon.social/tags/cats",
      "history": [
        {
          "day": "1574553600",
          "uses": "10",
          "accounts": "9"
        },
        // ...
      ]
    },
    {
      "name": "catsofmastodon",
      "url": "https://mastodon.social/tags/catsofmastodon",
      "history": [
        {
          "day": "1574553600",
          "uses": "6",
          "accounts": "5"
        },
        // ...
      ]
    }
  ]
}
```

## 属性

### `accounts` {#accounts}

**描述:** 与给定关键词匹配的帐户。\
**类型:** [Account]({{< relref "entities/Account" >}}) 数组\
**版本历史:**\
1.1.0 - 添加

### `statuses` {#statuses}

**描述:** 与给定关键词匹配的嘟文。\
**类型:** [Status]({{< relref "entities/Status" >}}) 数组\
**版本历史:**\
1.1.0 - 添加

### `hashtags` {#hashtags}

**描述:** 与给定关键词匹配的话题标签。\
**类型:** [Tag]({{< relref "entities/Tag" >}}) 数组\
**版本历史:**\
1.1.0 - 添加\
2.4.1 - v1/search 已弃用，因为它返回字符串数组。添加了返回标签数组的 v2/search。\
3.0.0 - 删除了 v1/search

## 参见

{{< page-relref ref="methods/search" caption="搜索 API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/search_serializer.rb" caption="app/serializers/rest/search_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Search" raw_link="/entities/Search/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
