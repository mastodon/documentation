---
title: 什么是长毛象？
description: 欢迎来到长毛象用户使用手册！
menu:
  docs:
    weight: -99
---

{{< bilibili id="21139681" caption="长毛象概念介绍视频" >}}

## 什么是微博客？ {#microblogging}

类似于发布博客，**微博客**是发布小段落的文字到你的个人信息流的一种方式。你可以发布文本，也可以附加图片、音频、视频等媒体，或是发起投票。长毛象可以让你发现并关注新的朋友们。

## 什么是联邦？ {#federation}

**联邦**是去中心化的一种形式。在联邦中，不是所有人共同使用一个中心服务，而是使用多个不限人数的服务器。

| 中心化等级 | 例子 |
| :--- | :--- |
| 中心化 | Twitter, Facebook, Instagram |
| 联邦式 | 电子邮件, XMPP, 电话网络, 邮政服务 |
| 分布式 | BitTorrent, IPFS, Scuttlebutt |

和传统网站一样，长毛象网站可以独立运作。人们可以在上面注册、发布消息、上传图片、互相聊天。但与传统网站*不同*的是，长毛象网站之间可以互动，让跨站用户互相交流，就好像只要你知道他们的电子邮件地址，你就可以从你的Gmail帐户发送电子邮件给使用Outlook、Fastmail、Protonmail或任何其他电子邮件供应商的用户。在长毛象里，**你可以对任何人在任何网站上的地址进行“@”或私信**。

{{< figure src="/assets/image%20%289%29.png" caption="上图从左到右依次为：集中式、联邦式、分布式" >}}

## ActivityPub是什么？ {#fediverse}

长毛象使用一种标准化的、开放的协议来实现站点之间的互动，这种协议叫做ActivityPub。任何通过ActivityPub实现互联的软件都可以与长毛象无缝通信，就像长毛象网站之间的通信一样。

**联邦宇宙**是所有可以通过ActivityPub和互联网互相交流的网站的统称。这包括所有长毛象服务器，但也可以通过其他平台实现联邦宇宙：

* Pleroma：一个模块化的微博引擎
* Pixelfed：分享和阅读媒体嘟文
* Misskey：包括微博和可定制的仪表盘
* PeerTube：可以让你上传视频到频道
* Plume：它可以用来发布长篇嘟文
* 除此之外，许多个人网站也支持ActivityPub！

**联邦宇宙**没有自己的所谓品牌，所以你可能更常听到“来关注我的长毛象吧”而不是“来关注我的联邦宇宙吧”。虽说从技术上讲，后者的说法更准确。

## 实际意义 {#implications}

### 自由地选择服务提供者和用户政策{#choice}

因为长毛象只是可以用于驱动任何网站的一款软件，长毛象的用户们可以自由地从现有的长毛象网站中选择一个入驻，或者如果用户愿意的话，也可以创建自己的长毛象网站。长毛象官方在 joinmastodon.org 上有一个列表，其中推荐了一系列长毛象站点，该列表可按类别与语言进行分类。一些网站可能有特定的管理政策，比如要求使用特定的标签覆盖可能敏感的内容，另一些网站的管理政策可能相对更宽松，但列表中列出所有的网站都需要同意采用《[长毛象服务器公约](https://joinmastodon.org/covenant)》，这意味着他们承诺积极处理并反对仇恨言论、采取每日备份、至少有一个应急管理员、并在关站前提供至少3个月预先通知。

> 维护所有成员都感到安全的社区并不容易。长毛象提供了许多基本的框架和工具，并将权力从一个商业实体转移到社区本身。
>
> -- Eugen Rochko, Jul 6 2018, ["Cage the Mastodon"](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> 一个集中式的社交媒体平台有一个层次结构，其中它们的规则和实施、以及平台的发展和方向，都是由CEO决定的……
>
> -- Eugen Rochko, Dec 30 2018, ["Why does decentralization matter?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### 资金和盈利{#monetization}

长毛象网站是由不同的人或组织完全独立运作的，没有在软件中实现任何盈利策略。

一些服务器的运营者选择自费运营、一些运营者可以利用现有的基础设施运营、一些运营者通过Patreon等平台向用户众筹资金、另一些运营者只是自费为自己和朋友搭建私人服务器。所以，如果你想支持服务器的运营者，记得看看它是否提供了捐赠的渠道。

长毛象的开发同样是通过Patreon和OpenCollective众筹的。**长毛象的开发不涉及风险投资**。

> 在我看来，“即时、公开、全球信息和对话” 实际上应该是全球性的。在独立组织和能够自我管理的行动者之间进行分配。这是一家公共事业公司，没有利用这些对话牟利的动机。
>
> -- Eugen Rochko, Mar 3 2018, ["Twitter is not a public utility"](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### 跨平台互联{#interoperability}

让我们想象一下，如果Twitter和Instagram使用相同协议的联合服务，那么你将可以从你的Twitter账户关注一个Instagram用户，并评论他们的照片。有了长毛象，*你可以与其他任何与之兼容的网站交流，即使那些网站不是在长毛象上运行*。这些网站的交互所需要的是支持ActivityPub协议的软件。要了解更多有关与长毛象互联所需的技术规范，请参阅[ActivityPub](https://docs.joinmastodon.org/spec/activitypub.md)、[WebFinger](https://docs.joinmastodon.org/spec/webfinger.md)和[Security](https://docs.joinmastodon.org/spec/security.md)。要了解更多关于ActivityPub的用处，请参阅[《为什么ActivityPub是未来》](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)。

> 所有这些平台都是不同的，它们关注不同的需求。然而，它们从根本上都是一样的：一些人订阅另一些人的帖子。因此可以说，它们都是兼容的。
>
> -- Eugen Rochko, Jun 27 2018, ["Why ActivityPub is the future"](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

### 免费/自由软件{#libre}

与专有服务不同的是，**任何人都可以完全自由地运行、检查、审核、复制、修改、分发和重用Mastodon源代码，前提是他们为任何派生版本赋予相同的许可协议自由度。**就像长毛象用户可以选择他们的服务提供者一样，你作为一个个体可以自由地向长毛象贡献功能，或者发布包含不同功能的修改版本。这些修改后的版本，也被称为软件分支，也需要像最初的长毛象项目一样维护同样的许可协议自由度。例如，glitch-soc是一个添加了各种实验特性的软件发行版。当然，这些分支也存在许多独立的fork，它们的主题可能略有不同，或者包含对代码库的小修改。因为长毛象是自由软件，尊重你的自由，像这样的个性化不仅是允许的，而且是鼓励的。

> 最终的目标是让人们能够创建自己的空间、自己的社区，以自己的想法修改软件，而不牺牲来自不同社区的人们相互交流的能力。
>
> -- Eugen Rochko, Feb 20 2017, ["The power to build communities: A response to Mark Zuckerberg"](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/)

> 去中心化是数字世界的生物多样性，是健康生态系统的标志。像fediversity这样的分散式网络允许不同的用户界面、不同的软件、不同形式的政府共存与合作。
>
> -- Eugen Rochko, Dec 30 2018, ["Why does decentralization matter?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

## 开始你的旅程吧！ {#next-steps}

学习如何使用长毛象：

{{< page-ref page="user/signup.md" >}}

学习如何安装长毛象：

{{< caption-link url="https://docs.joinmastodon.org/admin/prerequisites/" caption="准备你的服务器" >}}

学习如何为长毛象编写应用程序：

{{< caption-link url="https://docs.joinmastodon.org/client/intro/" caption="开始使用长毛象API" >}}

了解长毛象后端和如何作出贡献：

{{< caption-link url="https://docs.joinmastodon.org/dev/overview/" caption="技术概览" >}}

