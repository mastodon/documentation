---
title: 运行自己的服务器
description:
menu:
  docs:
    weight: 9999
    parent: user
---

## 为什么你要运行自己的Mastodon服务器？

- 绝对控制自己在网络上的声音，不受制于任何人的规则或左右。你的服务器是你的财产，有你的规则。只要你想让它存在，它就会一直存在。
- 你在你自己的服务器上并*不是*孤立的。你可以在任何其他服务器上关注任何人，他们也可以关注你，你可以像在同一服务器上一样交换信息。
- 你可以限制注册人数，成为服务器上唯一的一个人，然后像个人（微博）博客一样运行，也可以为家人或朋友维护一个只有邀请函的社区，或者运行一个任何人都可以注册的服务器，这都由你自己决定。

{{< hint style="警告" >}}
请注意，提供公共互联网服务涉及到审核工作和社区管理，而且这些工作会随着服务器的扩大而变得更加复杂。
{{< /hint >}}

## 如果你想要运行自己的Mastodon服务器的话……

你需要这些：

- 一个**域名**。这是你和其他人访问你的服务器的方式，也是你和你的用户在网络上的识别方式。

  **如何获得**：Namecheap, Gandi 等任何域名注册商。自带的年费根据域名选择的不同而不同。
  
- 一个**VPS**。将运行Mastodon代码的东西，它将始终连接到互联网。

  **如何获得**：DigitalOcean, Hetzner, Exoscale, Scaleway 等任何主机提供商都可以。自带月费或年费，根据硬件规格不同，费用也不同。

- 一个**e-mail提供商**。Mastodon需要通过电子邮件发送确认链接和各种通知，而托管自己的SMTP服务器虽然可以，但比起简单地使用第三方提供商要可靠得多。

  **如何获得**：Mailgun，SparkPost，Postmark，Sendgrid，任何一个SMTP API的电子邮件托管提供商。每月的费用根据发送的邮件量而定。

- 可选：**对象存储提供商**。Mastodon可以将你和你的用户上传的文件保存在其运行的VPS的硬盘驱动器上，但是，硬盘驱动器通常不是无限的，而且以后很难升级。一个对象存储提供商几乎可以给你提供无限的Mastodon文件存储。

  **如何获得**：Amazon S3，Exoscale，Wasabi，Google Cloud，任何S3兼容或OpenStack Swift兼容的API的服务都可以。附带的月费是根据存储的文件数量以及访问的频率来计算的。

有一些**专门针对长毛象的主机提供商**，可以满足上述的许多要求，如果你有兴趣的话，你可以选择由别人来处理所有的技术问题。通常情况下，你仍然需要购买你自己的域名。一些这样的供应商是：

{{< caption-link url="https://masto.host" caption="Masto.host" >}}

{{< caption-link url="https://hostdon.jp" caption="Hostdon" >}}

{{< caption-link url="https://app.spacebear.ee/mastodon" caption="Spacebear" >}}

{{< caption-link url="https://nablahost.com/services/activitypub-hosting/" caption="Nablahost" >}}

托管式主机解决方案对于那些没有经验或没有安装和维护软件的人来说是非常好的。然而，使用自己的服务器可以使你更好地定制组件、规模和性能。

我们提供了一个**DigitalOcean 一键安装镜像**，通过交互式的安装向导，按照安装说明进行操作，基本上可以为你提供所有安装长毛象所需的东西。

{{< caption-link url="https://marketplace.digitalocean.com/apps/mastodon" caption="DigitalOcean 一键安装镜像" >}}

然而，这是在单机设置的情况下，长毛象可以很好地横向扩展。如果你的需求超出了单机的容量，长毛象可以被分成多个应用服务器、后台workers、多个Redis backends、PostgreSQL副本。如果你有上述需求，就不能使用一键安装镜像。

如果你有兴趣自己安装一切，[请点击这里进行](https://docs.joinmastodon.org/admin/prerequisites/)。

