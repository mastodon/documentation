---
title: 运营操作
summary: 处理不想要的用户与域名
menu:
  docs:
    weight: 110
    parent: admin
---

## 帐户管理 {#individual-moderation}

Mastodon运营操作始终作用于本地，即从特定服务器查看的内容。一台服务器管理员（admin）或运营员（moderator）不能影响另一台服务器上的用户，他们只能影响另一台服务器用户的本地服务器副本。

### 禁止登录（disable login） {#disable-login}

Mastodon可以被禁止登录。这样可以禁止用户对帐户进行任何操作，但是其帐户的内容仍保持不变。这个限制是可撤销的，任何时候都可以重新激活该用户。本限制仅适用于你服务器的本地用户。

### 隐藏（silence） {#silence-user}

在Mastodon，隐藏（silence）是沙箱（sandbox）的同义词。一个被隐藏的帐户不会出现在未关注该帐户的用户面前。该帐户所有内容仍存在，这些内容可以通过搜索查找到，该帐户可以被提及、被关注，但是这些内容是不可见的。

此外，隐藏操作不会影响联邦宇宙。一个本地隐藏了的帐户*不会*自动在其他服务器隐藏。

本限制是可撤销的，任何时间都可以去除该帐户的隐藏。

### 封禁（suspension） {#suspend-user}

在Mastodon，封禁（suspension）是删除（deletion）的同义词。该帐户不会出现在搜索之中，其用户资料页将消失，该帐户的所有嘟文，上传，关注者以及所有其它数据都将被移除。本限制是**不可逆的**。当一个帐户被解除屏蔽，用户可以重新控制帐户，但旧数据已经一去不复返了。

## 实例管理 {#server-wide-moderation}

由于使用帐户管理单独处理来自行为异常服务器的大量用户是让人精疲力竭的事，所以可以预清空来自特定服务器的所有用户，即所谓的**域名屏蔽（domain block）**。该操作有多个不同严厉程度。

### 拒绝接收媒体文件（reject media） {#reject-media}

当这个选项被激活，来自该服务器的文件将不会传递至本地。其包括头像、横幅、emoji及媒体附件。

### 隐藏（silence） {#silence-server}

对来自该服务器的所有帐户应用隐藏（silence）操作。

### 屏蔽（suspend） {#suspend-server}

对来自该服务器的所有帐户应用封禁（suspension）操作。本地将不储存除用户名外的任何数据。

## 反广告措施 {#spam-fighting-measures}

Mastodon有以下基本措施以阻止广告内容：

* 注册时需确认电子邮件地址
* 基于IP的注册频率限制

然而，专业广告发送者（spammer）将绕过这些措施。你可以应用的措施是**电子邮件域名屏蔽**。在注册期间，Mastodon将解析所给电子邮箱地址的A纪录或MX纪录，即电子邮件服务器的IP地址，并对照动态存储的黑名单中检查该IP地址。

### 屏蔽电子邮件域名 {#blocking-by-e-mail-server}

广告发送者（spammer）时常使用不同的电子邮件域名，以让他们看起来是使用许多不同的电子邮件服务器注册，而这些电子邮件域名很难被分别列入黑名单。但是，有时这些域名被解析到了同IP地址电子邮件服务器。如果你发现同一时间有大数广告发送者（spammer）注册，你可以使用在线DNS查询工具或 Linux `dig` 组件来检查，例如：`dig example.com` 将查询该域名的所有DNS A纪录。如果你注意到所有域名指向同一IP，你可以把它添加至电子邮件域名屏蔽列表中。

### 封禁IP {#blocking-by-ip}

Mastodon自身不支持基于IP地址的访问者屏蔽，这不是一个万无一失的策略。IP有时会被不同的人共享，并时常会易手。但可以使用 Linux 防火墙来基于IP地址屏蔽访问者。下面的例子需要使用 `iptables` 和 `ipset`：

```bash
# Install ipset
sudo apt install ipset
# Create blacklist named "spambots"
sudo ipset create spambots nethash
# Add 1.2.3.4 to the blacklist
sudo ipset add spambots 1.2.3.4
# Add firewall rule based on the blacklist
sudo iptables -I INPUT 1 -m set --match-set spambots src -j DROP
```

但是注意，不要把你自己封禁了。

{{< translation-status-zh-cn raw_title="Moderation actions" raw_link="/admin/moderation/" last_tranlation_time="2020-05-08" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
