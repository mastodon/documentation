---
title: Bearcaps
description: 一种将 URL 与访问它们所需的 Bearer 令牌结合起来的 URI 方案。
menu:
  docs:
    weight: 60
    parent: spec
---

## 什么是 Bearcaps？ {#intro}

在某些情况下，资源可能不是公开可用的，可能需要令牌才能成功获取。这通常通过使用包含 `Bearer` 令牌的 HTTP `Authorization` 标头来完成，如下所示：

```http
GET https://example.com/foo
Authorization: Bearer <token>
```

Bearcaps 提供了一种链接到包含令牌的资源的方法，如下所示：

```
bear:?t=<token>&u=https://example.com/foo'
```

要将 bearcap 转换为 HTTP 请求，请向 `u` 参数发出请求，并将 `t` 参数作为 `Bearer` 令牌附加在 `Authorization` 标头中。

## Bearcaps 在 Mastodon 中如何使用？ {#usage}

从 v3.3.0 开始，Mastodon 支持在接收到的 Activity 中解引用 bearcaps。目前 Bearcaps 尚未用于发送任何 Activity。

{{< translation-status-zh-cn raw_title="Bearcaps" raw_link="/spec/bearcaps/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
