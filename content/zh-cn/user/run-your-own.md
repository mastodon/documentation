---
title: 运行你自己的站点
description:
menu:
  docs:
    weight: 9999
    parent: user
---

## 为什么要运行你自己的 Mastodon 站点？

- 完全掌控你在网络上的声音，不受任何其他人的规则或突发奇想的约束。 你的站点是你的财产，由你制定规则。 只要你想让它存在，它就会一直存在。
- 你 *并非* 在你自己的站点上孤立存在。 你可以关注任何其他站点上的任何人，他们也可以关注你，你可以像在同一站点上一样交换消息。
- 你可以限制注册，只允许自己一个人使用该站点，并像运营个人（微型）博客一样运行它，也可以维护一个仅供家人或朋友使用的邀请制社区，或者运行一个任何人都可以注册的站点，这完全取决于你！

{{< hint style="warning" >}}
请注意，提供公共互联网服务涉及审核工作和社区管理，并且站点规模越大，此类工作就越复杂。
{{< /hint >}}

## 那么，你想运行自己的 Mastodon 站点吗？

以下是你需要的：

- 一个**域名**。 这是你和其他人访问你的站点的方式，也是你和你的用户在网络上被识别的方式。

  **如何获取**： Namecheap，Gandi，以及无数其它域名注册商。 需要支付年度费用，费用取决于域名选择。
- 一台 **VPS**（虚拟专用服务器）。 它需要可以运行 Mastodon 代码，并且始终连接到互联网。

  **如何获取**： DigitalOcean，Hetzner，Exoscale，Scaleway，以及无数其它托管服务提供商。 需要支付月度或年度费用，费用取决于硬件规格。
- 一个 **电子邮件服务提供商**。 Mastodon 需要通过电子邮件发送确认链接和各种通知，托管你自己的 SMTP 服务器虽然可行，但要做到可靠比使用第三方提供商困难得多。

  **如何获取**： Mailgun，SparkPost，Postmark，Sendgrid，以及无数其它提供SMTP API的电子邮件托管服务提供商。 需要根据发送的电子邮件量支付月度费用。
- 可选项：**对象存储提供商**。 Mastodon 可以将你和你的用户上传的文件保存在运行它的 VPS 的硬盘驱动器上，但是，硬盘驱动器的容量通常不是无限的，并且后续难以升级。 对象存储提供商为你提供事实上无限的计量式文件存储。

  **如何获取**： Amazon S3，Exoscale，Wasabi，Google Cloud，以及任何提供 S3 兼容或 OpenStack Swift 兼容 API 的服务。 需要根据存储的文件数量以及访问频率支付月度费用。

存在许多**专门的 Mastodon 托管服务提供商**，如果你有兴趣让别人来处理所有技术方面的问题，你可以选择它们，它们会负责处理上述许多甚至所有方面。 通常你仍然需要购买自己的域名。 其中一些提供商包括：

{{< caption-link url="https://masto.host" caption="Masto.host" >}}

{{< caption-link url="https://hostdon.jp" caption="Hostdon" >}}

{{< caption-link url="https://app.spacebear.ee/mastodon" caption="Spacebear" >}}

{{< caption-link url="https://ossrox.org" caption="Ossrox" >}}

{{< caption-link url="https://weingaertner-it.de" caption="Weingärtner IT" >}}

{{< caption-link url="https://fedi.monster/" caption="Fedi.monster" >}}

{{< caption-link url="https://cloudplane.org" caption="Cloudplane" >}}

{{< caption-link url="https://ungleich.ch/u/products/mastodon-hosting/" caption="ungleich.ch" >}}

对于那些没有经验或不希望安装和维护软件的人来说，托管解决方案非常棒。 但是，负责你自己的硬件上的所有组件可以更好地控制扩展、性能和进行自定义。

Mastodon 可以很好地进行横向扩展。 如果你的需求超过了单台机器的容量，可以将 Mastodon 分割成多个应用服务器、后台工作进程、多个 Redis 后端和 PostgreSQL 副本 —— 但是一键安装无法完成这些。

如果你有兴趣自己安装所有内容，请继续阅读：

{{< page-ref page="admin/prerequisites" >}}

{{< translation-status-zh-cn raw_title="Running your own server" raw_link="/user/run-your-own/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
