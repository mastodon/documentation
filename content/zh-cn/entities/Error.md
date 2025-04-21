---
title: Error
description: 表示一条错误消息。
menu:
  docs:
    parent: entities
aliases: [
	"/entities/error",
	"/entities/Error",
  "/api/entities/error",
	"/api/entities/Error",
]
---

## 示例

```json
{
  "error": "invalid_grant",
  "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
}
```

{{< hint style="info" >}}
**错误响应中最重要的是 HTTP 状态码。** 遵循标准语义。 错误的 body 是一个 JSON 对象，包含更多信息（如果可用）。
{{< /hint >}}

## 属性

### `error` {#error}

**描述:** 错误消息。\
**类型:** 字符串\
**版本历史:**\
0.6.0 - 添加

### `error_description` {{%optional%}} {#error_description}

**描述:** 错误的更长描述，主要与 OAuth API 一起提供。\
**类型:** 字符串\
**版本历史:**\
0.6.0 - 添加

## 可能的原因 {#reasons}

### 400 - 非法请求

#### ParameterMissing {#parameter-missing}

错误: {string}。 当 API 调用中缺少必需的参数时出现。

### 401 - 未授权 {#401}

#### require_authenticated_user! {#auth}

错误: 此 API 要求用户进行身份验证。 当实例处于安全模式时出现，该模式禁用 API 方法的所有公共使用。

### 403 - 禁止访问 {#403}

#### NotPermitted {#not-permitted}

错误: 不允许此操作。 尝试调用你没有权限的方法（例如管理或工作人员方法），或执行不允许你执行的操作（例如关注阻止你的用户）时出现。

#### current_user.disabled? {#disabled}

错误: 你的账户当前已被禁用。 当 OAuth 令牌的授权用户已由管理员禁用其帐户时出现。

#### !current_user.confirmed? {#unconfirmed}

错误: 你的账户缺少已确认的电子邮件地址。 当与 OAuth 令牌的授权用户的帐户关联的电子邮件地址尚未确认时出现。

#### !current_user.approved? {#unapproved}

错误: 你的账户当前正在等待批准。 当 OAuth 令牌的授权用户在需要批准注册的实例上注册，并且用户尚未由管理员批准其帐户时出现。

### 404 - 未找到 {#404}

#### RecordNotFound {#not-found}

错误: 未找到记录。 当实体记录不存在，或者授权用户不在私有实体的访问范围内时出现。

### 422 - 无法处理的实体 {#422}

#### RecordInvalid {#invalid}

错误: {string}。 当实体创建失败时可能会出现。

#### RecordNotUnique {#not-unique}

错误: 重复记录。 当你尝试置顶一个已置顶的帐户或嘟文时出现。

#### !current_user {#user-required}

错误: 此方法需要经过身份验证的用户。 尝试调用需要处理用户的 API 方法时，在使用没有授权用户的 OAuth 令牌（或根本没有令牌）时出现。

### 429 - 请求过于频繁 {#429}

错误: {translated string}。 当你超过速率限制时出现。 有关更多信息，请参见 [速率限制]({{< relref "api/rate-limits" >}})。

### 503 - 服务不可用 {#503}

#### UnexpectedResponseError {#unexpected-response}

错误: 无法获取外站数据。 当 Mastodon 调用返回错误的外站服务（例如来自另一个实例的 WebFinger）时出现。

#### SSLError {#ssl}

错误: 无法验证外站 SSL 证书。 调用外站服务时，但它具有无效的 SSL 证书时出现。

#### NetworkingError {#networking-error}

错误: 为你的请求提供服务时出现临时问题，请重试。 当对 S3 存储实例的调用失败时出现。

#### RaceConditionError {#race-condition}

错误: 为你的请求提供服务时出现临时问题，请重试。 由于实例端代码中存在争用情况导致错误时出现。

## 另请查看

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/base_controller.rb" caption="app/controllers/api/base_controller.rb" >}}

{{< translation-status-zh-cn raw_title="Error" raw_link="/entities/Error/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
