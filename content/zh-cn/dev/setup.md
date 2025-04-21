---
title: 设置开发环境
description: 关于如何开始为 Mastodon 进行开发的说明。
menu:
  docs:
    weight: 20
    parent: dev
---

## Vagrant 使用快速入门 {#vagrant}

为了方便起见，Mastodon 仓库包含一个 Vagrantfile，用于快速设置开发环境，无需手动配置。要使用此开发环境，请使用二进制可执行文件或通过包管理器安装 [Vagrant](https://vagrantup.com)。

安装 Vagrant 后，为方便起见，建议安装一个插件来自动更新你机器的 hosts 文件。这将允许你通过 `http://mastodon.local` 访问开发环境，而无需手动编辑 hosts 文件。为此，请执行以下操作：

```sh
vagrant plugin install vagrant-hostsupdater
```

然后可以启动虚拟机：

```sh
vagrant up
```

启动虚拟机后，你可以启动 Foreman 任务执行器来启动各种 Mastodon 进程：

```sh
vagrant ssh -c "cd /vagrant && foreman start"
```

Mastodon 进程完全启动后，你可以在浏览器中加载 `http://mastodon.local` 以访问 VM 中的 Mastodon 实例。你可以使用用户名 `admin@mastodon.local` 和密码 `mastodonadmin` 以默认管理员用户身份登录。

对源代码的任何更改将在保存文件后立即生效。

要将 VM 重置为全新状态，你可以销毁它并重新启动它：

```sh
vagrant destroy
vagrant up
```

## 从源代码手动安装 {#manual}

你可以按照[生产指南中的前提条件说明]({{<relref "admin/install">}})进行配置，但不要创建 `mastodon` 用户。你也不必安装 `nginx`、`certbot` 和 `python-certbot-nginx`，因为开发环境自带 Web 服务器。 如果你使用的是 Windows，在 WSL2 上设置和运行开发环境也已证明是可行的。

### 设置 {#setup}

在项目目录中运行以下命令：

```sh
bundle install
yarn install
```

在开发环境中，Mastodon 将使用 PostgreSQL 作为当前已登录的 Linux 用户，并使用 `ident` 方法。确保你已为当前已登录的用户创建了 PostgreSQL 用户和数据库：

```sh
sudo -u postgres createuser $YOUR_USERNAME_HERE --createdb
```

现在，你可以创建数据库 `mastodon_development` 和 `mastodon_test`，将 schema 加载到其中，并将 `db/seeds/` 中定义的种子数据加载到 `mastodon_development` 中。

```sh
rails db:setup
```

现在，你可以在浏览器中启动 `http://localhost:3000` 并使用默认管理员用户 (`admin@localhost` / `mastodonadmin`) 登录。

{{<hint style="warning">}}
默认情况下，Mastodon 将在端口 3000 上运行。如果你为其配置了其他端口，则生成的管理员帐户也将使用该端口号。
{{</hint>}}

### 运行 {#running}

需要运行多个进程才能实现 Mastodon 的全部功能，尽管可以选择性地省略它们。要仅使用一个命令运行所有进程，你可以安装并使用 Foreman：

```sh
gem install foreman --no-document
foreman start
```

这将启动 `Procfile.dev` 中定义的进程，这将为你提供：一个 Rails 服务端、一个 Webpack 服务端、一个流式 API 服务端和一个 Sidekiq。当然，你也可以根据需要单独运行任何这些进程。

## 在开发中使用电子邮件

在开发模式下，Mastodon 将使用一个名为 [Letter Opener](https://github.com/ryanb/letter_opener) 的 gem 来“发送”电子邮件，这允许你在浏览器中调试电子邮件，而无需通过 SMTP 服务器实际发送电子邮件。

为了使用电子邮件，你需要运行 Sidekiq、Redis 和 PostgreSQL，然后可以通过访问 `http://localhost:3000/letter_opener/` 来查看电子邮件。

如果你在 docker 中进行开发，则需要设置 `REMOTE_DEV=true` 环境变量。

## 用于测试的有用命令 {#testing}

`rspec`
: 运行 Ruby 测试套件

`yarn run test`
: 运行 JavaScript 测试套件

`rubocop`
: 检查 Ruby 代码是否符合我们的代码风格

## 更新你的开发实例 {#update}

`bundle install`
: 更新 Ruby gems 并安装任何新的依赖项

`yarn install`
: 更新 Javascript 包并安装任何新的依赖项

`RAILS_ENV=development rails db:migrate`
: 为你的开发实例的数据库运行新的数据库迁移

{{< translation-status-zh-cn raw_title="Setting up a dev environment" raw_link="/dev/setup/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
