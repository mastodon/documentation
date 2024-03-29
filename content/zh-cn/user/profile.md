---
title: 设置个人资料
description: 开始使用你的新帐户。
menu:
  docs:
    weight: 20
    parent: user
---

## 你的外观 {#appearance}

{{< figure src="assets/image%20%2829%29.png" caption="用户资料卡会显示你的用户名、头像和横幅图片" >}}

你可以在 设置 &gt; 配置文件 &gt; 外观 页面中配置你的个人资料显示外观。

### 昵称 {#name}

你的昵称会显示在你的Mastodon用户地址之前。默认情况下，你可以设置最多30个字符的昵称。

### 简介 {#bio}

自我简介是对你自己的简短描述，这会在你的个人资料上显示出来。默认情况下，你可以设置最多500个字符的自我简介。

### 头像 {#avatar}

你的头像是一个图标，会显示在你的嘟文旁边，作为你的视觉身份的一部分。头像文件大小限制 2.0 MB，只支持 PNG、GIF 或 JPG 格式。图片分辨率将会裁剪至 400x400px。

### 个人资料页横幅图片 {#header}

这个横幅图像会显示在你的个人资料页顶部，以及关注列表和帐户目录中的个人资料卡上。横幅图片文件大小限制 2.0 MB，只支持 PNG、GIF 或 JPG 格式。图片分辨率将会裁剪至 1500x500px。

## 账号标志 {#flags}

你可以在你的资料上设置特定的标志，让别人知道你会如何使用Mastodon。

![]({{ relUrl "/assets/image%20%281%29.png" }})

### 保护你的帐户（锁嘟） {#locked}

勾选 `保护你的帐户（锁嘟）` 后，两件事情将会发生：

* 新关注者不会被自动接受，你需要手动审核所有关注请求。
* 一个锁形图标会显示在你的个人页面上，让其他人知道他们的关注不会立即被接受。

### 机器人（bot）帐户 {#bot}

勾选 `这是一个机器人帐户` 后，将向你的个人资料页面上添加一个bot图标。此图标将让其他人知道你的帐户可能执行自动化活动，并且可能无人监控。其他的软件可能选择用不同方式对待bot账号，但是目前Mastodon只将bot标志作为一个视觉标识。

### 用户目录 {#discoverable}

勾选 `在本站用户目录中收录此账号` 后，将使你的个人资料可被通过浏览用户目录发现。

## 个人资料附加信息 {#fields}

个人资料附加信息是一种向你的配置文件添加易于浏览的额外信息的方式。你有4行可自定义标签和值。例如：

| 标签 | 内容 |
| :--- | :--- |
| 年龄 | 25 |
| 国家 | 德国 |
| Pronouns | he/him |
| 网站 | https://example.com |

在这里填写什么，完全取决于你自己。附加信息内容可以包含提及、标签、自定义表情和链接。

### 链接验证 {#verification}

没有中心化的权威，基于文件材料的验证和加V是不可能的。然而，Mastodon可以交叉引用你放置在个人资料中的链接，以证明你是这些链接的真正所有者。如果这些链接之一是你的已被他人知晓并信任个人主页，那么它可以作为身份验证的次好方法。

如果你把一个链接放在你的个人资料附加信息中，Mastodon会检查被链接的页面是否也链接到你的Mastodon个人资料页。如果是，你会在链接旁边得到一个验证通过的标记，确认你是该页面的所有者。

在后台，Mastodon将检查回链链接的`rel="me"`属性。同样的，放置在个人资料附加信息中的链接将会被附加上`rel="me"`属性。

{{< hint style="info" >}}
由于Mastodon可以自托管，因此没有比在已经被人们信任的域名之上托管一个Mastodon站点更好的方法来验证你的身份。
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Setting up your profile" raw_link="/user/profile/" last_tranlation_time="2020-05-02" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
