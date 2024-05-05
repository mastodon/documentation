---
title: 更多设置
summary: 邀请新用户，对你的联系人进行排序，并保护你的帐户。
menu:
  docs:
    weight: 80
    parent: user
---

## 生成邀请链接 {#invites}

{{< figure src="assets/image%20%2862%29.png" caption="从你的帐户设置中邀请别人加入本站" >}}

邀请链接可以被生成并与其他人分享，有些服务器需要邀请才能注册账号。在生成邀请链接时，你可以设置最多使用次数，以限制某个链接的使用次数，或者限制链接的可使用时间。邀请链接可以在任何时候停用。

## 关注管理 {#relationships}

{{< figure src="assets/image%20%2849%29.png" caption="所有与你互相关注并且没有启用迁移功能的用户，按最后一次活动时间排序" >}}

在设置中有关注管理器，你可以根据不同的标准，对和你有关的用户进行筛选和排序。

* **关系：** 你关注的、关注你的以及互相关注的账号。
* **帐户状态：** 用户是否已启用迁移功能。
* **帐户活动：** 用户在过去一个月内是否发布过信息。

你可以选择取消关注某些用户，或从你的关注者中删除某些用户，只需勾选方框并点击表头的相应按钮即可。

## 账号设置 {#account}

在帐户设置中，你可以更改你的电子邮件地址，设置新密码，注销活跃会话以及以授权应用，也可以启用双重认证。

## 身份验证 {#proofs}

个人资料附加信息的[链接验证](../profile#verification)是通过使用rel=me链接验证你的身份的一种方法，但Mastodon也支持一个更通用的身份验证子系统。目前，这个子系统唯一支持的身份验证提供商是Keybase。

### Keybase身份验证 {#keybase}

{{< figure src="assets/image%20%2860%29.png" caption="个人资料上的身份验证" >}}

首先，注册Keybase并生成或上传一个GPG公钥到你的Keybase帐户。接下来，进入“证明更多身份（prove more identities）”。找到你的实例，如果没有，请联系Keybase寻求帮助。选择你的Mastodon域名，输入你的用户名。你可以通过使用你的Mastodon账号进行授权，并发布验证消息，来验证你的身份。一旦你这样做了，身份验证就会建立，你的个人资料将会显示Keybase的身份验证。

{{< hint style="danger" >}}
**Keybase的身份验证是不可逆的。** Keybase使用不可变的签名链进行身份验证，所以一旦你在Keybase上验证了你的身份，你就不能删除它。你只能用你的相关私钥签署一个吊销信息来吊销你的验证。
{{< /hint >}}

{{< translation-status-zh-cn raw_title="More settings" raw_link="/user/contacts/" last_tranlation_time="2020-05-03" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
