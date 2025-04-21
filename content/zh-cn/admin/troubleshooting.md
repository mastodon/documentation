---
title: 故障排除
menu:
  docs:
    weight: 120
    parent: admin
    identifier: admin-troubleshooting
---

## **我看到一个错误页面，上面说出了问题。我怎样才能找出是什么问题？**

所有带有堆栈跟踪的错误消息都会写入系统日志。当使用 systemd 时，可以通过`journalctl -u mastodon-web`（请将 `mastodon-web` 替换为实际的正确服务名称）浏览每个 systemd 服务的日志。当使用 Docker 时，可以通过类似的命令 `docker logs mastodon_web_1`（请将 `mastodon_web_1` 替换为实际的正确容器名称）查看日志。

服务器端错误的具体详情_永远不会_向公众显示，因为它们可能会揭示你的内部设置情况，并为攻击者提供如何入侵或更有效地滥用系统的线索。

来自 Mastodon 网络服务器的每个响应都带有一个包含唯一请求 ID 的标头，这也将反映在日志中。通过检查错误页面的标头信息，你可以轻松在日志中找到相应的堆栈跟踪。

## **我在日志中看不到太多内容。如何启用额外的日志/调试信息？**

默认情况下，你的日志将显示 `info` 级别的日志记录。要查看更多调试消息，你可以修改 `.env.production` 文件以提高相关服务的级别：

- **Web/Sidekiq：**将 `RAILS_LOG_LEVEL` 的值设为 `debug`，然后重启你正在尝试排除故障的服务。
- **Streaming：**将 `LOG_LEVEL` 的值设为 `silly`，然后重启你正在尝试排除故障的服务。

有关这些选项的其他日志级别的更多信息，可以在[配置环境](https://docs.joinmastodon.org/admin/config)页面找到。

`debug` 或 `silly` 级别可能非常详细，因此在完成故障排除后，你应该注意将日志级别改回较低级别。

## **升级到较新版本后，某些页面看起来很奇怪，例如出现了没有任何样式的元素。为什么？**

请检查你是否在升级后运行了 `RAILS_ENV=production bin/rails assets:precompile`，并重启了 Mastodon 的 web 进程，因为它似乎正在提供过时的样式表和脚本。也可能是由于内存不足导致预编译失败，这是因为遗憾的是 webpack 非常消耗内存。如果是这种情况，请确保你分配了一些交换内存。或者，可以在不同的机器上预编译资源，然后复制 `public/packs` 目录。

## **升级到较新版本后，一些请求失败，日志显示关于缺少列或表的错误消息。为什么？**

检查你是否在升级后运行了 `RAILS_ENV=production bin/rails db:migrate`，因为看起来 Mastodon 的代码正在访问较新或较旧的数据库架构。如果你使用 PgBouncer，请确保此命令直接连接到 PostgreSQL，因为 PgBouncer 不支持迁移中使用的表锁定类型。

## **我尝试运行 `tootctl` 或 `rake`/`rails` 命令，但出现关于未初始化常量的错误。怎么回事？**

检查你是否在命令前指定了正确的环境变量 `RAILS_ENV=production`。默认情况下，环境被假定为开发环境，因此代码尝试加载与开发相关的gems。然而，在生产环境中，我们避免安装这些gems，这就是错误的来源。

## **在执行 `RAILS_ENV=production bundle exec rails assets:precompile` 时遇到编译错误，但没有提供更多信息。如何修复？**

这通常是因为你的服务器在编译资源时内存不足。使用交换文件或增加交换空间以增加内存容量。运行 `RAILS_ENV=production bundle exec rake tmp:cache:clear` 清除缓存，然后执行 `RAILS_ENV=production bundle exec rails assets:precompile` 重新编译。确保在编译错误后清除缓存，否则会显示"一切正常"但资源保持不变。

## **我收到这个错误：`Read-only file system @ dir_s_mkdir`。为什么？**

默认情况下，Mastodon使用[ systemd 的沙箱功能](https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Sandboxing)，这种方式不允许在 `/home/mastodon` 以外的位置执行写入。如果 Mastodon 安装在其他位置，你可能需要允许 `mastodon-sidekiq` 和 `mastodon-web` 写入自定义目录：
1. 在文件 `/etc/systemd/system/mastodon-sidekiq.service` 和 `/etc/systemd/system/mastodon-web.service` 中添加参数 `ReadWritePaths`。例如 - `ReadWritePaths=/example/mastodon/live`。
2. 执行 `systemctl stop mastodon-sidekiq mastodon-web`
3. 执行 `systemctl daemon-reload`
4. 执行 `systemctl start mastodon-sidekiq mastodon-web`

{{< translation-status-zh-cn raw_title="Troubleshooting errors" raw_link="/admin/troubleshooting/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
