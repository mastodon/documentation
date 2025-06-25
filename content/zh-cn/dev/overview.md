---
title: 技术概览
description: 关于 Mastodon 架构的描述。
menu:
  docs:
    weight: 10
    parent: dev
---

<style>
#TableOfContents {display: none}
</style>

Mastodon 是一个使用 React.js 前端的 Ruby on Rails 应用程序。 它遵循这些框架的标准实践，因此如果你已经熟悉 Rails 或 React.js，在这里你不会发现任何意外。

在开发环境中，使用 Mastodon 的最佳方式是在你的系统上安装所有依赖项，而不是使用 Docker 或 Vagrant。 你需要 Ruby、Node.js、PostgreSQL 和 Redis，这是 Rails 应用程序的一组相当标准的依赖项。

有关安装这些依赖项的教程可以在文档的“运行 Mastodon”部分中的“从源代码安装”页面上找到。 按照“运行 Mastodon”部分中的安装指南操作后，请查看“设置开发环境”页面，以获取有关如何配置开发环境的更多说明。

### 环境 {#environments}

“环境”是一组用于特定用例的配置值。 环境可能是：开发(development)，你通常打算在其中更改代码；测试(test)，你通常打算在其中运行自动化测试套件；暂存(staging)，旨在向最终用户预览代码；以及生产，旨在面向最终用户。 Mastodon 带有开发、测试和生产的配置。

`RAILS_ENV` 的默认值为 `development`，因此你无需设置任何额外的东西即可在开发模式下运行 Mastodon。 事实上，Mastodon 的所有配置都具有适用于开发环境的正确默认值，因此除非你需要自定义某些内容，否则你不需要 `.env` 文件。 以下是开发环境和生产环境之间的一些不同行为：

- 当你更改 Ruby 代码时，代码会自动重载，这意味着你无需重新启动 Rails 服务端进程即可查看更改
- 你遇到的所有错误的堆栈跟踪都会在浏览器中显示，而不是隐藏在通用错误页面之后
- Webpack 会持续运行，并在你更改任何前端文件时重新编译 JS 和 CSS 资源，并且页面会自动重新加载
- 默认禁用缓存
- 在 `db:seed` 期间会自动创建一个电子邮件为 `admin@localhost:3000` 且密码为 `mastodonadmin` 的管理员帐户

应该注意的是，与 Mastodon 一起分发的 Docker 配置针对生产环境进行了优化，因此极其不适合开发。 另一方面，Vagrant 配置专门用于开发环境，而不是生产用途。

{{< translation-status-zh-cn raw_title="Technical overview" raw_link="/dev/overview/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
