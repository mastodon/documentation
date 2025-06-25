---
title: 速率限制
description: 定义调用 REST API 的频率
menu:
  docs:
    weight: 30
    parent: api
---

## 响应头

速率限制信息将在响应头中返回：

`X-RateLimit-Limit`
: 在一个时间段内允许的请求数量

`X-RateLimit-Remaining`
: 你还可以发起的请求数量

`X-RateLimit-Reset`
: 你的速率限制何时重置的时间戳

{{< hint style="info" >}}
一个 API 方法可能会受到多个重叠的速率限制。 响应头会返回你最接近超过的那个限制的信息。
{{</ hint >}}

## 限制

默认情况下，以下限制是硬编码的：

### 每个帐户

所有端点和方法可以在 5 分钟内被调用 300 次。

#### 上传媒体

`POST /api/v1/media` 可以在 30 分钟内被调用 30 次。

#### 删除状态

`DELETE /api/v1/statuses/:id` 或 `POST /api/v1/statuses/:id/unreblog` 可以在 30 分钟内被调用 30 次。

### 每个 IP

所有端点和方法可以在 5 分钟内被调用 300 次。

#### 创建帐户

`POST /api/v1/accounts` 可以在 30 分钟内被调用 5 次。

{{< translation-status-zh-cn raw_title="Rate limits" raw_link="/api/rate-limits/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
