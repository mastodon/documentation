---
title: Microformats
description: 一种开放的数据格式，利用 CSS 类来结构化你已有的 HTML。
menu:
  docs:
    weight: 40
    parent: spec
---

{{< hint style="info" >}}
从 v4.0.0 版本开始，嘟文和账户的 HTML 永久链接已被弃用并从 Mastodon 中移除。因此，Microformats 当前未在 Mastodon 中使用，也未由其生成。
{{< /hint >}}

## 什么是 microformats？ {#intro}

[Microformats 2.0](https://microformats.io/) 是一种标准，用于将元数据直接嵌入到 HTML 文档中。无需使用 API 进行只读目的，可以通过解析网页中的特定 CSS 类来提取信息。你只需查看页面即可获取这些信息，而不必单独从 API 请求相同的信息。使用 microformats 类可以对给定网页中的数据进行语义解析，并可用于生成 feed、卡片或数据的表示形式。

## Microformats 类 {#classes}

所有 microformats 类都使用前缀。前缀表示元素的类型，与层次结构无关。以下是 Mastodon 代码库中使用的 microformats 类。

### 根元素（`h-*`） {#h}

#### `h-feed` {#h-feed}

表示一个条目流。附加到账户的嘟文。也附加到详细嘟文视图中的父主题。

#### `h-entry` {#h-entry}

表示情景性的或带有时间戳的在线内容。附加到嘟文。

#### `h-cite` {#h-cite}

表示对另一个在线出版物的引用。附加到转嘟。也附加到嘟文详情视图中嘟文串内的其他嘟文。

#### `h-card` {#h-card}

表示一个人或组织。附加到昵称、用户名和头像的容器。也附加到提及。

### 纯文本属性（`p-*`） {#p}

#### `p-author` {#p-author}

在 `h-entry` 或 `h-cite` 中，表示条目的作者，并附加到昵称、用户名和头像的容器。

#### `p-name` {#p-name}

在 `h-feed` 中，表示 feed 的标题。附加到具有 `value` 属性的 `data` 元素。
在 `h-entry` 或 `h-cite` 中，表示条目的标题。在 Mastodon 中未使用。
在 `h-card` 中，表示个人或组织的纯文本名称。附加到昵称。

#### `p-in-reply-to` {#p-in-reply-to}

在嘟文详情的 `h-entry` 中，表示作为直接上级的嘟文。

#### `p-repost-of` {#p-repost-of}

在嘟文详情的 `h-entry` 中，表示作为转嘟且也是直接上级嘟文的嘟文。目前未使用，因为不能回复转嘟。

#### `p-comment` {#p-comment}

在嘟文详情的 `h-entry` 中，表示作为直接下级的嘟文。

### URL 属性（`u-*`） {#u}

#### `u-photo` {#u-photo}

在 `h-card` 中，表示账户图片。附加到头像图像。

#### `u-uid` {#u-uid}

在 `h-entry` 或 `h-cite` 中，表示通用唯一标识符。附加到时间戳链接。

#### `u-url` {#u-url}

在 `h-entry` 或 `h-cite` 中，表示嘟文永久链接。附加到时间戳链接。
在 `h-card` 中，表示账户永久链接。附加到昵称链接。

### 日期时间属性（`dt-*`） {#dt}

#### `dt-published` {#dt-published}

在 `h-entry` 或 `h-cite` 中，表示嘟文发布的日期和时间。附加到具有 `value` 属性的 `data` 元素。

### 元素树（`e-*`） {#e}

#### `e-content` {#e-content}

在 `h-entry` 或 `h-cite` 中，表示嘟文的内容。附加到嘟文内容。

## 附加类 {#mastodon}

这些元素由 Mastodon 附加，用于解析元数据，但从技术上讲不属于 Microformats 术语表的一部分。

#### `mention` {#mention}

表示应在应用内打开该链接，并带有来自 API 的关联提及数据。

#### `hashtag` {#hashtag}

表示应在应用内打开该链接，并带有来自 API 的关联话题标签数据。

{{< translation-status-zh-cn raw_title="Microformats" raw_link="/spec/microformats/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
