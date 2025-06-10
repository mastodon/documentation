---
title: 注册帐户
description: 找到你理想的社区。
menu:
  docs:
    weight: 10
    parent: user
---

## 选择站点 {#picker}

你需要选择一个要注册的站点，就像你选择电子邮件提供商或你新用户组的魔兽世界服务器一样。该站点将成为你的服务提供者，托管你的帐户、个人资料和主页信息流。

{{< hint style="info" >}}
你可以[在 joinmastodon.org 上按类别和语言浏览站点列表](https://joinmastodon.org/#getting-started)。
{{< /hint >}}

### 了解站点的政策 {#tos}

在注册服务之前，了解其政策和使用条款非常重要。Mastodon 站点通常会在 `/about/more` 页面上列出其政策，你可以通过在未登录该站点时单击着陆页上的“了解更多”来找到该页面。

### 注册模式 {#signup}

Mastodon 允许站点管理员设置三种不同的注册模式之一：开放注册、邀请和审批模式。

#### 开放注册 {#open}

某些站点可能允许你立即注册——只需填写带有用户名、电子邮件地址和密码的注册信息，你就可以开始使用你的帐户。

#### 站点邀请 {#invite}

某些站点禁用注册表单，而是需要生成和共享邀请链接才能允许人们注册。

#### 基于审批的注册 {#approval}

某些站点允许你填写注册表单，但会添加一个额外的表单条目，用于说明你想要加入该站点的原因。提交表单后，你的帐户必须经过审核员的批准才能开始使用。

## 你的用户名和你的域名 {#address}

Mastodon 用户名实际上由两部分组成：

* 本站用户名，例如 `alice`
* 站点的域名，例如 `example.com`

就像电子邮件地址一样。为了方便起见，Mastodon 允许你在与你同站点的人通信时跳过第二部分，但是当你与其他人分享你的用户名时，你需要记住包含域名，否则他们将无法轻松地找到你。

| 分享你的用户名 |  |
| :--- | :--- |
| 我是 Mastodon 上的 `@alice`！ | 错误 |
| 我是 Mastodon 上的 `@alice@example.com`！ | 正确 |
| 我是 Mastodon 上的 https://example.com/@alice！ | 正确 |

Mastodon 中的搜索表单将通过上述地址形式或账户链接找到人员，因此如果你愿意，可以改为共享该链接。

相同的用户名 _可以_ 在不同的站点上注册——因为没有办法提前声明所有用户名。就像使用电子邮件一样，你不应期望 `alice@outlook.com` 与 `alice@gmail.com` 或 `alice@yahoo.com` 是同一个人。

{{< translation-status-zh-cn raw_title="Signing up for an account" raw_link="/user/signup/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
