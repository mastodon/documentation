---
title: API 入门指南
description: '有关 REST API、HTTP 请求与响应，以及请求参数的入门知识。'
menu:
  docs:
    weight: 10
    parent: client
---

## REST 简介 {#rest}

Mastodon 通过 REST API 提供对其数据的访问通道。REST 代表具象状态传输规范（REpresentational State Transfer），但就我们的目的而言，只需将其视为根据请求发送和接收有关各种资源的信息即可。Mastodon REST API 使用 HTTP 进行请求，使用 JSON 作为其有效载荷。

## 了解 HTTP 请求和响应 {#http}

REST API 端点可以用某些 HTTP 方法调用，并且可以对同一端点使用多种方法。Mastodon API 通常会使用以下 HTTP 方法：

* **GET**：读取或查看资源。
* **POST**：向服务器发送信息。
* **PUT** \| **PATCH**：更新资源。
* **DELETE**：删除资源。

你喜欢的编程语言可能具有用来发出 HTTP 请求的实用程序或库。在本节中，示例将使用 cURL 实用程序，它是一个命令行实用程序，默认包含在许多操作系统中（命令名称 `curl`）。

使用 cURL 时，默认的 HTTP 方法是 GET，但你可以使用 `--request` 或 `-X` 标志指定要发出的请求类型；例如，`curl -X POST` 将发送 POST 请求而不是 GET 请求。你可能还想使用 `-i` 标志来包含可能作为响应的一部分返回的其他 HTTP 标头（如果这与用例相关）。

## 提供参数 {#parameters}

HTTP 请求可以包含各种不同的参数，但最值得注意的是，Mastodon API 可以接收查询字符串、表单数据和 JSON。

{{< hint style="info" >}}
API 同等程度地理解通过 POST 请求体提交的查询字符串、表单数据和 JSON。期望将查询字符串用于 GET 请求，将表单数据或 JSON 用于所有其他请求。
{{< /hint >}}

### 查询字符串 {#query-strings}

可以在请求 URL 的末尾附加查询字符串。可以通过先键入 ?，然后以 parameter=value 的格式附加它们。可以通过用 & 分隔来附加多个查询字符串。例如：

```bash
curl https://mastodon.example/endpoint?q=test&n=0
```

### 表单数据 {#form-data}

你可以单独发送数据，而不是使用查询字符串（使用查询字符串会更改 URL）。使用 cURL 时，可以通过使用 `--data` 或 `-d` 标志传递数据来完成这一点。可以像查询字符串一样一并发送数据，也可以使用多个数据标志作为键值对单独发送数据。你也可以使用 `--form` 或 `-F` 标志作为键值对，这也允许发送多部分数据，例如文件。请求示例：

```bash
# 将原始数据作为查询字符串发送
curl -X POST \
     -d 'q=test&n=0' \
     https://mastodon.example/endpoint
# 单独发送原始数据
curl -X POST \
     -d 'q=test' \
     -d 'n=0' \
     https://mastodon.example/endpoint
# 显式表单编码；允许使用多部分数据
curl -X POST \
     -F 'q=test' \
     -F 'n=0' \
     -F 'file=@filename.jpg' \
     https://mastodon.example/endpoint
```

### JSON {#json}

ECMA-404 中定义的 *JavaScript 对象表示法*。你可以查看 [JSON](https://www.json.org/) 的快速单页概述。

发送 JSON 与发送表单数据类似，但需要添加一个额外的标头来指定数据采用 JSON 格式。要使用 cURL 发送 JSON 请求，请使用标头将内容类型指定为 JSON，然后将 JSON 数据作为表单数据发送：

```bash
curl -X POST \
     -H 'Content-Type: application/json' \
     -d '{"parameter": "value"}' \
     https://mastodon.example/endpoint
```

## 数据类型 {#types}

### 多个值（数组） {#array}

必须使用括号符号对数组参数进行编码。例如，`array[]=foo&array[]=bar` 将转换为以下内容：

```ruby
array = [
  'foo',
  'bar',
]
```

使用 JSON 时，数组的格式如下：

```json
{
  "array": ["foo", "bar"]
}
```

### 嵌套参数（哈希） {#hash}

有些参数需要嵌套。为此，还必须使用括号表示法。例如，`source[privacy]=public&source[language]=en` 将转换为：

```ruby
source = {
  privacy: 'public',
  language: 'en',
}
```

使用 JSON 时，哈希的格式如下：

```json
{
  "source": {
    "privacy": "public",
    "language": "en"
  }
}
```

### 真与假（布尔值） {#boolean}

对于值 `0`、`f`、`F`、`false`、`FALSE`、`off`、`OFF`，布尔值将被认为是 false；对于空字符串，则认为未提供；对于所有其他值，则认为是 true。使用 JSON 数据时，请改用字面量 `true`、`false` 和 `null`。

### 文件 {#file}

文件上传必须使用 `multipart/form-data` 进行编码。

这也可能与数组结合使用。

## 如何使用 API 响应数据 {#responses}

Mastodon REST API 将返回 JSON 作为响应文本。它还会返回 HTTP 标头，这些标头可能有助于处理响应，以及 HTTP 状态代码，该代码应让你知道服务器如何处理请求。可能会出现以下 HTTP 状态代码：

- 200 = OK。请求已成功处理。
- 4xx = 客户端错误。你的请求不正确。最常见的是，你可能会看到 401 Unauthorized（未授权）、404 Not Found（未找到）、410 Gone（已删除）或 422 Unprocessed（无法处理）。
- 5xx = 服务器错误。处理请求时出现问题。最常见的是，你可能会看到 503 Unavailable（服务不可用）。

{{< translation-status-zh-cn raw_title="Getting started with the API" raw_link="/client/intro/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
