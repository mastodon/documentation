---
title: 运行自己的服务器
description:
menu:
  docs:
    weight: 9999
    parent: user
---

## 为什么你要运行自己的Mastodon服务器？

- 绝对控制自己在网络上的声音，不受制于任何其他人的管理与左右。你的服务器是你的财产，受你的管理。只要你想让它存在，它就会一直存在。
- 你在你自己的服务器上并*不是*孤立的。你可以关注其他任意服务器上任何人，他们也可以关注你，你可以像在同一服务器上一样交换信息。
- 你可以限制注册人数，成为服务器上唯一的一个人，然后像个人（微）博客一样运行；也可以为家人或朋友维护一个邀请制的社区；或者运行一个任何人都可以注册的服务器。这都由你自己决定！

{{< hint style="warning" >}}
请注意，提供公共互联网服务涉及到审核工作和社区管理，而且这些工作会随着服务器的扩大而变得更加复杂。
{{< /hint >}}

## 如果你想要运行自己的Mastodon服务器……

你需要这些：

- 一个**域名**。这是你和其他人访问你的服务器的方式，也是你和你的用户在网络上的身份标识。

  **如何获得**：Namecheap, Gandi 等任何域名注册商。自带的年费根据域名选择的不同而不同。
  
- 一个**VPS**。将运行Mastodon代码的东西，它将始终连接到互联网。

  **如何获得**：DigitalOcean, Hetzner, Exoscale, Scaleway 等任何主机提供商都可以。自带月费或年费，根据硬件规格不同，费用也不同。

- 一个**电子邮件发送服务提供商**。Mastodon需要通过电子邮件发送确认链接和各种通知，自己托管一个SMTP服务器，虽然可行，但是相较使用第三方提供商，自己托管SMTP服务器要保证可靠是更加困难的。

  **如何获得**：Mailgun，SparkPost，Postmark，Sendgrid，任何一个提供SMTP API的电子邮件服务商。每月的费用根据发送的邮件量而定。

- 可选：**对象存储**。Mastodon可以将你和你的用户上传的文件保存在其运行的VPS的硬盘驱动器上，但是，硬盘驱动器通常不是无限的，而且后续很难升级扩容。对象存储实际上为你提供了无限制的计量文件存储。

  **如何获得**：Amazon S3，Exoscale，Wasabi，Google Cloud，任何提供S3兼容或OpenStack Swift兼容API的服务商都可以。每用费用取决于存储的文件数量及其访问频率。

有许多**Mastodon专用托管服务提供商**可以满足上述许多（全部）要求，如果你对让他人处理所有技术问题感兴趣的话，你可以选择使用。通常情况下，你仍然需要购买自己的域名。一些这样的提供商是：

{{< caption-link url="https://masto.host" caption="Masto.host" >}}

{{< caption-link url="https://hostdon.jp" caption="Hostdon" >}}

{{< caption-link url="https://app.spacebear.ee/mastodon" caption="Spacebear" >}}

全托管解决方案非常适合那些没有经验或不想安装和维护软件的人。然而，自己负责硬件的所有组件，可以让你在伸缩性、性能和自定义方面有更大的控制权。

我们提供了一个**DigitalOcean 一键安装镜像**，你可以把它放在DigitalOcean vps上，通过交互式的安装向导，遵照我们的安装说明，基本上可以为你提供所需的所有东西。

{{< caption-link url="https://marketplace.digitalocean.com/apps/mastodon" caption="DigitalOcean Mastodon一键安装镜像" >}}

然而，这只是假定单机的情况下安装。Mastodon可以很好地横向伸缩。如果你的需求超出了单机的容量，Mastodon可以被分成多个应用服务器、后台workers、多个Redis后端、PostgreSQL replicas。如果你有上述需求，就不能使用一键安装镜像。

如果你有兴趣自己安装一切，请点击这里：

{{< page-ref page="admin/prerequisites" >}}

{{< translation-status-zh-cn raw_title="Running your own server" raw_link="/user/run-your-own/" last_tranlation_time="2020-05-03" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
