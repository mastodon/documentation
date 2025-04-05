---
title: 什么是 Mastodon？
description: 欢迎阅读 Mastodon 文档！
menu:
  docs:
    weight: -99
---

## 什么是微博？{#microblogging}

博客（blogging）是在网站上发布更新的行为。与之类似，**微博（microblogging）**则是在你的个人主页信息流中发布简短更新的行为。你可以发布纯文本贴文，也可以选择性地附上图片、音频、视频或投票等媒体。Mastodon 让你可以关注旧朋友并发现新朋友。

## 什么是联合？{#federation}

**联合**是去中心化的一种形式。它并非由单一的中央服务机构提供服务供所有人使用，而是存在多个服务，任何人都可以使用其中的任意一个。

| 中心化程度 | 示例 |
| :--- | :--- |
| 中心化 | Twitter、Facebook、Instagram |
| 联合式 | 电子邮件、XMPP、电话网络、实体邮件 |
| 分布式 | BitTorrent、IPFS、Scuttlebutt |

一个 Mastodon 站点可以像传统网站一样独立运行。人们可以在上面注册、发帖、上传图片以及相互交流。与传统网站*不同*的是，Mastodon 网站之间可以互通，不同站点的用户能够互相交流；就像你可以从 Gmail 账户向 Outlook、Fastmail、Protonmail 或任何其他电子邮件提供商的用户发送邮件一样，只要你知道对方的电子邮件地址，**你就可以使用任何网站上任何用户的地址来提及或私信他们**。

{{< figure src="assets/network-models.jpg" caption="从左到右：中心化、联合式、分布式" >}}

## 什么是 ActivityPub？{#fediverse}

Mastodon 使用一个标准化的开放协议来实现联合。这个协议叫做 **ActivityPub**。任何同样通过 ActivityPub 实现联合的软件都可以与 Mastodon 无缝通信，就像 Mastodon 网站之间可以互相通信一样。

**联邦宇宙**（“Fediverse”）是所有能够通过 ActivityPub 和互联网相互通信的网站的总称。这包括所有的 Mastodon 站点，也包括其它实现此协议的应用：

- Pleroma，一个模块化的微博引擎
- Pixelfed，联合式的图片分享平台，允许你分享和浏览媒体贴文
- Misskey，除微博功能外，还提供可定制的仪表盘
- PeerTube，允许你将视频上传到频道
- Plume，允许你发布篇幅更长的文章
- 还有更多，包括独立站点和私人网站！

联邦宇宙本身没有统一的品牌标识，所以你可能更常听到“在 Mastodon 上关注我”，而不是“在联邦宇宙关注我”，但严格来说，后者更准确。

## 实际影响 {#implications}

### 服务提供者和政策的选择 {#choice}

Mastodon 仅仅是一款可以驱动任何网站的软件，Mastodon 的潜在用户可以选择一个已有的 Mastodon 网站作为服务提供者，或者如果他们愿意，也可以创建自己的 Mastodon 网站。Mastodon 项目在 [joinmastodon.org](https://joinmastodon.org) 维护了一个推荐的服务提供者列表，可按类别和/或语言排序。有些网站的审核政策可能比其它站点更严格，例如要求对潜在的敏感内容使用特定标签；而有些网站的审核政策可能更为宽松，但列表中的网站都同意遵守 [Mastodon 站点公约](https://joinmastodon.org/covenant)，这意味着它们承诺积极审核仇恨言论、每日进行数据备份、至少配备一名紧急管理员，并在关闭服务前至少提前 3 个月通知用户。

> 维护让所有成员都感到安全的社区并非易事。Mastodon 为此提供了大量基础框架和工具，并将实现变革的力量从单一的商业实体转移到了社区自身手中。
>
> -- Eugen Rochko，2018年7月6日，[《将 Mastodon 关入笼中》](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> 中心化的社交媒体平台采用层级结构，规则及规则的执行方式，以及平台的开发和方向都由 CEO 决定 [...] 去中心化网络则有意放弃了平台所有者的控制权，因为它根本就没有所有者。
>
> -- Eugen Rochko，2018年12月30日，[《去中心化为何重要？》](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### 资金来源和商业模式 {#monetization}

Mastodon 网站由不同的人或组织完全独立运营。Mastodon 软件本身未实现任何商业变现策略。

一些服务器运营者选择提供付费账户，一些运营者是能够利用其现有基础设施的公司，一些则依靠用户通过 Patreon 及类似服务进行众筹，还有一些运营者是自负成本，为自己或许还有一些朋友维护个人站点。因此，如果你想支持托管你账户的服务器，请查看其是否提供了捐助途径。

Mastodon 的开发同样通过 [Patreon](https://patreon.com/mastodon) 和 [OpenCollective](https://opencollective.com/mastodon) 进行众筹。**没有任何风险投资参与。**

> 在我看来，“即时、公开、全球性的消息传递和对话”实际上就应该是_全球性_的。它应该分布在能够自我管理的独立组织和参与者之间。它应该是一种公共服务，没有为牟利而利用这些对话的动机。
>
> -- Eugen Rochko，2018年3月3日，[《Twitter 不是公共服务》](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### 不同软件间的互操作性 {#interoperability}

具体来说：想象一下，如果你能在自己的 Twitter 账户上关注某个 Instagram 用户，并直接评论他们的照片，而无需离开 Twitter。如果 Twitter 和 Instagram 是使用相同协议的联合式服务，这就可能实现。拥有 Mastodon 账户后，**你可以与其它任何兼容的站点进行交流，**_**即使它并非运行 Mastodon 软件**_。唯一的要求是该软件支持 ActivityPub 协议中允许创建贴文更新并与之互动的那部分功能的子集。要了解与 Mastodon 互通所需的技术规范详情，请参阅 [ActivityPub](spec/activitypub)、[WebFinger](spec/webfinger) 和 [安全性说明](spec/security)。要进一步了解 ActivityPub 能让我们实现什么，请参阅 [为什么 ActivityPub 是未来](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)。

> 所有这些平台各不相同，专注于不同的需求。然而，它们的基础是相同的：人们订阅他人以接收他们的帖文。因此，这些平台都是相互兼容的。
>
> -- Eugen Rochko，2018年6月27日，[《为什么 ActivityPub 是未来》](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

### 自由/开源软件 {#libre}

与专有服务不同，**任何人都有运行、研究、检查、复制、修改、分发和重用 Mastodon 源代码的完全自由，前提是他们必须保证任何衍生作品也享有同样的自由。**就像 Mastodon 用户可以选择他们的服务提供商一样，作为个人，你可以自由地为 Mastodon 贡献功能，或发布包含不同功能的 Mastodon 修改版本。这些修改版本，也被称为软件分支，同样需要维持与原始 Mastodon 项目相同的自由。例如，[glitch-soc](https://glitch-soc.github.io/docs/) 是一个添加了各种实验性功能的软件发行版。此外还存在许多个人分支，它们可能在主题样式上略有不同，或者对代码库进行了少量修改。因为 Mastodon 是尊重你自由的自由软件（libre software），像这样的个性化不仅是被允许的，而且是受鼓励的。

> 最根本的力量在于赋予人们创造自己的空间、自己的社区的能力，让他们能按自己的意愿修改软件，同时又不牺牲不同社区成员之间相互交流的能力。
>
> -- Eugen Rochko，2017年2月20日，[《构建社区的力量：对 Mark Zuckerberg 的回应》](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/)

> 去中心化是数字世界的生物多样性，是健康生态系统的标志。像 Fediverse 这样的去中心化网络允许不同的用户界面、不同的软件、不同的治理形式共存与合作。
>
> -- Eugen Rochko，2018年12月30日，[《去中心化为何重要？(Why does decentralization matter?)》](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

## 选择你的浏览路径 {#next-steps}

了解如何使用 Mastodon：

{{< page-ref page="user/signup" >}}

了解如何安装 Mastodon：

{{< page-ref page="admin/prerequisites" >}}

了解如何为 Mastodon 编写应用：

{{< page-ref page="client/intro" >}}

了解 Mastodon 后端以及如何做出贡献：

{{< page-ref page="dev/overview" >}}

{{< translation-status-zh-cn raw_title="What is Mastodon?" raw_link="/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
