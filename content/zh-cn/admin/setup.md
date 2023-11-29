---
title: 配置你的新实例
description: 一些需要在安装完Mastodon做的事情
menu:
  docs:
    weight: 50
    parent: admin
---

## 创建一个管理员帐户 {#admin}

### 通过浏览器 {#admin-gui}

在通过浏览器完成帐户注册后，你需要使用命令行给你新创建的帐户以管理员特权。假设你帐户的用户名为`alice`：

```bash
RAILS_ENV=production bin/tootctl accounts modify alice --role Owner
```

### 通过命令行 {#admin-cli}

你可以使用命令行创建一个全新帐户。

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role Owner
```

一个随机密码将会显示在终端上。

## 填写站点信息 {#info}

登录后，打开**网站设置**页面。虽然从技术上来说无需填写这些信息，但对于操作服务器的人而言，这被认为是至关重要的。

| 设置 | 含意 |
| :--- | :--- |
| 用于联系的公开用户名 | 你的用户名，人们可以知道谁运营着这台服务器 |
| 用于联系的公开电子邮件地址 | 一个可以联系到你的电子邮件地址，可供那些帐户被锁或没有帐户的人使用 |
| 本站简介 | 你为什么启动这个站点？为谁运营？什么使它与众不同？ |
| 本站详细介绍 | 你可以在此放置各种信息，但建议放置**行为准则**。 |

填写完这些后，请点击“保存更改”。

{{< translation-status-zh-cn raw_title="Setting up your new instance" raw_link="/admin/setup/" last_tranlation_time="2020-05-04" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
