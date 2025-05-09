---
title: 使用公开数据
description: 熟悉端点与实体。
menu:
  docs:
    weight: 20
    parent: client
---

现在，你已经知道如何使用 cURL 或你喜欢的编程语言的 HTTP 实用程序或库来构造 HTTP 请求，那么现在是时候了解端点和响应了。

## 关于端点 {#endpoints}

所有 HTTP 请求都是针对目标 URL 发出的。当你请求网站的数据时，你需要使用特定的 URL。根据 URL 的不同，你的请求将被 HTTP 服务器解释，并向你返回适当的响应。

本文的示例将使用虚构的 Mastodon 网站 mastodon.example，该网站托管在 `https://mastodon.example`。此网站的根目录为 `/`，特定的子目录和路径被称为端点。Mastodon 的 API 端点位于 `/api` 命名空间下，目前大多数方法都将其端点放置于 `/api/v1` 下。请求将按其 HTTP 方法和端点列出；例如，GET /api/v1/endpoint 应解释为对你域名上的该端点发出的 GET 请求，或者换句话说，`https://mastodon.example/api/v1/endpoint`。

## 获取公开时间线 {#timelines}

让我们来了解 Mastodon 公开数据最基础的用例之一——公共时间线。

我们可以尝试请求 [GET /api/v1/timelines/public]({{< relref "methods/timelines" >}})，如下所示：

```bash
curl https://mastodon.example/api/v1/timelines/public
```

哇，响应中有很多文本！公共时间线默认返回 20 条嘟文。

{{< hint style="danger" >}}
一些 Mastodon 实例可能会通过管理设置禁用对其时间线的公开访问。如果你的实例进行了这样的配置，那么你将收到错误响应。
{{</ hint >}}

我们可以使用 `limit` 参数来请求更少的内容。让我们尝试请求相同的端点，但这次限制为 2：

```bash
curl https://mastodon.example/api/v1/timelines/public?limit=2
```

这次我们的响应应该更容易管理。我们可以使用我们选择的实用程序解析或美化这个 JSON，我们应该看到响应类似这样：

```json
[
  {
    "id": "103206804533200177",
    "created_at": "2019-11-26T23:27:31.000Z",
    // ...
    "visibility": "public",
    // ...
  },
  {
    "id": "103206804086086361",
    "created_at": "2019-11-26T23:27:32.000Z",
    // ...
    "visibility": "public",
    // ...
  }
]
```

对于话题标签，我们可以通过调用 [GET /api/v1/timelines/tag/:hashtag]({{< relref "methods/timelines#tag" >}}) 来执行类似的操作——这里，冒号表示端点的这一部分是路径参数。对于 :hashtag，这意味着我们使用标签的名称（我们再次将返回的结果数限制为 2）：

```bash
curl https://mastodon.example/api/v1/timelines/tag/cats?limit=2
```

我们应该再次看到，在 [Status]({{< relref "entities/status" >}}) 实体的 JSON 数组中返回了 2 条嘟文。我们可以按数组，然后按对象解析 JSON。如果我们使用的是 Python，我们的代码可能如下所示：

```python
import requests
import json

response = requests.get("https://mastodon.example/api/v1/timelines/tag/cats?limit=2")
statuses = json.loads(response.text) # this converts the json to a python list of dictionary
assert statuses[0]["visibility"] == "public" # we are reading a public timeline
print(statuses[0]["content"]) # this prints the status text
```

{{< hint style="info" >}}
解析 JSON 并在你的程序中使用它超出了本教程的范围，因为它会因你选择的编程语言和你的程序设计方案而异。你可以查找有关如何在你选择的编程语言中与 JSON 一起使用的其他教程。
{{</ hint >}}

{{< hint style="info" >}}
[MastoVue](https://mastovue.glitch.me) 是一个应用示例，可让你浏览公开时间线。
{{</ hint >}}

## 获取公开帐户和嘟文 {#posts}

现在，我们熟悉了如何发出请求以及如何处理响应，你可以尝试更多公开数据。以下方法可能会引起你的兴趣：

* 一旦获取了帐户的 id，你就可以使用 [GET /api/v1/accounts/:id]({{< relref "methods/accounts" >}}) 来查看 [Account]({{< relref "entities/account" >}}) 实体。
  * 要查看该帐户发布的公开嘟文，你可以使用 [GET /api/v1/accounts/:id/statuses]({{< relref "methods/statuses" >}}) 并解析生成的 [Status]({{< relref "entities/status" >}}) 实体数组。
* 一旦获取了嘟文的 id，你就可以使用 [GET /api/v1/statuses/:id]({{< relref "methods/statuses#get-one" >}}) 来查看 Status 实体。
  * 你还可以使用 [GET /api/v1/statuses/:id/reblogged_by]({{< relref "methods/statuses#boosted_by" >}}) 查看谁转发了该嘟文，
  * 或 [GET /api/v1/statuses/:id/favourited_by]({{< relref "methods/statuses#favourited_by" >}}) 查看谁喜欢了该嘟文。
  * 请求 [GET /api/v1/statuses/:id/context]({{< relref "methods/statuses#context" >}}) 将向你显示该嘟文在对话串中的上级嘟文和下级嘟文。
  * 如果该嘟文附加了一个投票，你可以使用 [GET /api/v1/polls/:id]({{< relref "methods/polls" >}}) 单独查看该投票。

帐户和嘟文的 ID 是 Mastodon 网站数据库本地的，并且每个 Mastodon 网站都会有所不同。

## 获取公开实例数据 {#instance}

你可以使用匿名请求做的最后一件事是查看有关 Mastodon 实例的信息。

* 使用 [GET /api/v1/instance]({{< relref "methods/instance#fetch-instance" >}}) 查看常规信息，
  * 使用 [GET /api/v1/instance/peers]({{< relref "methods/instance#peers" >}}) 查看其联合列表，或
  * 使用 [GET /api/v1/instance/activity]({{< relref "methods/instance#activity" >}}) 查看其每周活动，或
  * 使用 [GET /api/v1/custom_emojis]({{< relref "methods/custom_emojis" >}}) 列出所有可用的自定义表情。
* 有关所有可用配置文件的目录，参见 [GET /api/v1/directory]({{< relref "methods/directory" >}})。
* 有关当前热门话题，参见 [GET /api/v1/trends]({{< relref "methods/trends" >}})。

{{< hint style="info" >}}
有关仅使用实例数据可以做什么的实际示例，请查看 [emojos.in](https://emojos.in/)，它允许你预览给定实例中的所有自定义表情符号。
{{</ hint >}}

{{< translation-status-zh-cn raw_title="Playing with public data" raw_link="/client/public/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
