---
title: 设置你的新实例
description: 安装 Mastodon 后需要做的事情
menu:
  docs:
    weight: 50
    parent: admin
---

## 创建管理员账户 {#admin}

### 在浏览器中创建 {#admin-gui}

在浏览器中注册后，你需要使用命令行给你新创建的账户授予管理员权限。假设你的用户名是 `alice`：

```bash
RAILS_ENV=production bin/tootctl accounts modify alice --role Owner
```

{{<hint style="warning">}}
在 Mastodon 4.0 之前，用户组被硬编码为 `user`、`moderator` 或 `admin` 之一。从 4.0 版本开始， Mastodon 有了一个可自定义的用户组系统，默认创建的用户组为 `Moderator`、`Admin` 和 `Owner`。自定义用户组的名称区分大小写。
{{</hint>}}

### 从命令行 {#admin-cli}

你可以使用命令行创建一个新账户。

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role Owner
```

终端将输出随机生成的密码。

## 填写站点信息 {#info}

登录后，转到**站点设置**页面（在**首选项** -> **管理**下）。理论上填写这些信息不是必须的，但对于运营一个面向人类的站点来说，这被认为是至关重要的。

| 设置 | 含义 |
| :--- | :--- |
| 联系人用户名 | 你的用户名，让人们知道谁拥有此站点 |
| 业务邮箱 | 一个电子邮件地址，方便被锁定在账户之外的人或没有账户的人联系你 |
| 实例描述 | 你为什么创建这个站点？它适合谁？它有什么不同？ |
| 自定义扩展信息 | 你可以在这里各种信息，但推荐放置**行为准则** |

填写完这些信息后，点击"保存更改"。

{{< translation-status-zh-cn raw_title="Setting up your new instance" raw_link="/admin/setup/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
