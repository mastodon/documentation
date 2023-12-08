---
title: 什么是Mastodon？
description: 欢迎来到Mastodon文档！
menu:
  docs:
    weight: -99
---

## 什么是微博客？ {#microblogging}

类似于发布博客是将更新发布到网站上，**发布微博客**是将小的更新发布到你的个人信息流。你可以发布文本，也可以附加图片、音频、视频等媒体，或是发起投票。Mastodon可以让你发现并关注新的朋友们。

## 什么是联邦？ {#federation}

**联邦**是去中心化的一种形式。在联邦中，不是所有人共同使用一个中心服务，而是使用多个不限人数的服务器。

| 中心化等级 | 示例 |
| :--- | :--- |
| 中心化 | Twitter, Facebook, Instagram |
| 联邦式 | 电子邮件, XMPP, 电话网络, 邮政服务 |
| 分布式 | BitTorrent, IPFS, Scuttlebutt |

Mastodon站点可以独立运作。和传统网站一样，人们可以在上面注册、发布消息、上传图片、互相聊天。但与传统网站*不同*的是，Mastodon网站之间可以互动，让跨站用户互相交流，就好像只要你知道他们的电子邮件地址，你就可以从你的Gmail帐户发送电子邮件给使用Outlook、Fastmail、Protonmail或任何其他电子邮件供应商的用户。在Mastodon里，**你可以对任何人在任何网站上的地址进行“@”或私信**。

{{< figure src="assets/network-models.jpg" caption="上图从左到右依次为：集中式、联邦式、分布式" >}}

## ActivityPub是什么？ {#fediverse}

Mastodon使用一种标准化的、开放的协议来实现站点之间的互动，这种协议叫做**ActivityPub**。任何通过ActivityPub实现互联的软件都可以与Mastodon无缝通信，就像Mastodon站点之间的通信一样。

**联邦宇宙**（fediverse）是所有可以通过ActivityPub和互联网互相交流的网站的统称。这包括所有Mastodon服务器，但也包括其他的一些实现：

* Pleroma：一个模块化的微博客引擎
* Pixelfed：联邦式的图片分享平台，它可以让你分享和阅读媒体嘟文
* Misskey：包括一个可自定义界面的微博客
* PeerTube：它可以让你上传视频到频道
* Plume：它可以用来发布长篇文章
* 还有更多，包括许多个人网站！

**联邦宇宙**没有自己的所谓品牌，所以你可能更常听到“来关注我的Mastodon吧”而不是“来关注我的联邦宇宙吧”。虽说从技术上讲，后者的说法更准确。

## 实际影响因素 {#implications}

### 选择合适的服务提供者与用户政策 {#choice}

因为Mastodon只是可以用于驱动任何网站的软件，Mastodon的潜在用户拥有选择服务提供者的权利，用户可以从现有Mastodon站点中选择，或者如果用户愿意的话，也可以创建自己的Mastodon站点。Mastodon项目在 [joinmastodon.org](https://joinmastodon.org) 上维护了一个推荐服务提供者列表，该列表可按类别和/或语言进行排序。一些站点可能有额外的管理政策，例如要求对潜在敏感内容打上特定标签，另一些站点可能有更加宽松的管理政策，但是所有在列表中列出的站点均需遵守[《Mastodon服务器公约》](https://joinmastodon.org/covenant)，这意味着他们承诺积极处理并反对仇恨言论、每日进行备份、至少有一个应急管理员、关站前至少提前3个月发布关站通告。

> 维护一个让所有成员都感到安全的社区并不容易。Mastodon提供了很多基础性的框架和工具来完成这件事，并将改变的权力从一个商业实体转移到社区自己手中。
>
> -- Eugen Rochko, Jul 6 2018, [《将Mastodon关到笼子里去》](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> 一个中心化的社交媒体平台有一个等级结构，在这个结构中平台的规则及其实施，以及平台的发展方向都是由CEO决定的[……] 一个去中心化的网络有意放弃了对平台所有权的控制，从本质上来讲是没有平台所有者的。
>
> -- Eugen Rochko, Dec 30 2018, [《为什么去中心化很重要？》](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### 资金和盈利 {#monetization}

Mastodon站点是由不同的人或组织完全独立运营的。Mastodon没有在软件中实现任何盈利策略。

有的服务器运营者选择提供付费帐户；有的服务器运营者是公司，这样便可以利用他们现有的基础设施；有的服务器运营者通过Patreon及其类似服务来众筹资金；有的服务器运营者只是自掏腰包，为自己和朋友搭建私人服务器。所以，如果你想支持你帐户所在服务器的运营者，请检查一下它是否提供了捐赠渠道。

Mastodon的开发同样是通过[Patreon](https://patreon.com/mastodon)和[OpenCollective](https://opencollective.com/mastodon)众筹的。**不涉及风险投资。**

> 在我看来，“即时、公开、全球性的信息传递与交流” 实际上应该是*全球性的*。分布于能够自我管理的独立组织与行为者之中。一个公共设施，没有利用交流牟利的动机。
>
> -- Eugen Rochko, Mar 3 2018, [《推特不是公共设施》](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### 跨平台互联 {#interoperability}

实际上：你能否想象一下从你的推特帐户关注一个Instagram用户并在不离开你的帐户的情况下评论他们的照片。如果推特和Instagram是使用同样协议的联邦服务，那么这将是可能的。通过一个Mastodon帐户，**你可以与其他相兼容的网站通迅，** _**即使它并没有运行Mastodon**_。这些网站只需要它们的软件支持ActivityPub协议的相同子集，该协议子集允许创建消息和通过消息进行交互。想了解更多与Mastodon交互所需的技术规范，请参阅[ActivityPub](spec/activitypub)、[WebFinger](spec/webfinger)和[Security](spec/security)。想了解更多关于ActivityPub的用处，请参阅[《为什么ActivityPub是未来》](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)。

> 所有这些平台都是不同的，它们关注不同的需求。然而，它们的基石都是相同的：一些人订阅接收其他人的帖子。因此，它们都是相互兼容的。
>
> -- Eugen Rochko, Jun 27 2018, [《为什么ActivityPub是未来》](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

### 自由软件 {#libre}

与专有服务不同，**任何人都拥有运行，检查，审核，复制，修改，分发和重用Mastodon源代码的完全自由，只要他们保证任何衍生作品都具有同等的自由。** 就像Mastodon用户可以选择他们的服务提供者一样，你作为一个个体可以自由地向Mastodon贡献功能，或者发布包含不同功能的修改版本。这些修改后的版本，也被称为软件分支，被要求维持与Mastodon原始项目同等的自由。例如，[glitch-soc](https://glitch-soc.github.io/docs/)是一个添加了许多实验特性的软件发行版。除此而外，还有许多的独立分支存在，这些分支可能仅仅是主题稍微不同，或者包含对代码库的小修改。因为Mastodon是尊重你的自由的自由软件，像这样的个性化不仅是允许的，而且是鼓励的。

> 最终的力量在于让人们能够创建自己的空间、自己的社区，以自己的想法修改软件，但又不牺牲与来自不同社区的人们相互交流的能力。
>
> -- Eugen Rochko, Feb 20 2017, [《建立社区的力量：对马克·扎克伯格的回应》](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/)

> 去中心化是数字世界的生物多样性，是健康生态系统的标志。像联邦宇宙这样的去中心化网络允许不同的用户界面、不同的软件、不同形式的治理方式共存与合作。
>
> -- Eugen Rochko, Dec 30 2018, [《为什么去中心化很重要？》](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

## 开始你的旅程吧！ {#next-steps}

学习如何使用Mastodon：

{{< page-ref page="user/signup" >}}

学习如何安装Mastodon：

{{< page-ref page="admin/prerequisites" >}}

学习如何为Mastodon编写应用程序：

{{< page-ref page="client/intro" >}}

了解Mastodon后端以及如何向Mastodon项目做贡献：

{{< page-ref page="dev/overview" >}}

{{< translation-status-zh-cn raw_title="What is Mastodon?" raw_link="/" last_tranlation_time="2020-05-02" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
