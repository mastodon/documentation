---
title: PreviewCardAuthor
description: 表示富媒体预览卡片中的作者。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/PreviewCardAuthor",
]
---

## 属性

### `name` {#name}

**描述:** 原始资源的作者姓名。替换预览卡片中已弃用的 `author_name` 属性。\
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

### `url` {#url}

**描述:** 指向原始资源作者的链接。替换预览卡片中已弃用的 `author_url` 属性。\
**类型:** 字符串 (URL)\
**版本历史:**\
4.3.0 - 添加

### `account` {{%nullable%}} {#account}

**描述:** 作者的联邦宇宙账号。\
**类型:** [Account]({{< relref "entities/Account">}})\
**版本历史:**\
4.3.0 - 添加

## 另请参考

{{< page-relref ref="entities/PreviewCard#authors" caption="PreviewCard (`authors` 属性)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/preview_card_serializer.rb" caption="app/serializers/rest/preview_card_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="PreviewCardAuthor" raw_link="/entities/PreviewCardAuthor/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
