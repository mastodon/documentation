---
title: 故障分析
menu:
  docs:
    weight: 120
    parent: admin
---

## **我看到一个故障页说一些东西出错了。我怎么找出哪里出错了？**

所有带堆栈追踪（stack traces）的错误信息都将会被写入系统日志。当使用systemd时，可使用 `journalctl -u mastodon-web`（替换以相应的服务名） 来浏览每个服务的日志。当使用Docker时，与之类似：`docker logs mastodon_web_1`（替换以相应的容器名）。

服务端详细错误信息将*永不会*公开显示，因为它们可能会暴露你的内部设置，并为攻击者提供线索，让他们了解如何更好的入侵或如何更高效的滥用。

来自Mastodon web服务器的每一个响应都带有独一无二的请求ID（request ID），该ID也将反映在日志中。通过检查错误页的请求头，你可以在日志中轻松找到与之对应的堆栈追踪（stack traces）。

## **升级新版本后，有些页面看起来很奇怪，就像它们含有未设置样式的元素一样。为什么？**

检查升级后，你是否运行 `RAILS_ENV=production bin/rails assets:precompile` 并重启Mastodon web 进程。因为这看起来像提供了过期的样式与脚本。这也有可能由于内存缺乏导致预编译失败，很不幸webpack会占用大量内存。如果是这个原因，请确保你已经分配了swap空间。另外，也可以在另一台机器上预编译静态文件，然后把它们复制至 `public/packs` 目录。

## **升级新版本后，一些请求失败了，日志中的错误信息是 missing columns or tables。为什么？**

检查升级后，你是否运行 `RAILS_ENV=production bin/rails db:migrate`。因为这看起来Mastodon代码访问了一个更新或更旧的数据库schema。如果你使用PgBouncer，请确保此命令直接连接PostgreSQL，因为PgBouncer不支持迁移过程中的锁表操作。

## **我试图运行 `tootctl` 或 `rake`/`rails` 命令，但我得到 uninitialized constants 错误信息。哪里出错了？**

检查你是否在命令前使用 `RAILS_ENV=production` 指定正确的环境。默认情况下，假定使用开发环境，因此代码尝试加载开发相关gem。然而，在生产环境中，我们避免安装这些gem。这就是错误的来源。

{{< translation-status-zh-cn raw_title="Troubleshooting errors" raw_link="/admin/troubleshooting/" last_tranlation_time="2020-05-08" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
