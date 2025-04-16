---
title: 升级到新版本
menu:
  docs:
    weight: 70
    parent: admin
---

{{< hint style="info" >}}
当 Mastodon 发布新版本时，它会出现在[ GitHub 发布页面](https://github.com/mastodon/mastodon/releases) 上。请注意，虽然可以运行 `main` 分支中的未发布代码，但不推荐这样做。
{{< /hint >}}

### 自动更新验证 {#automated_checks}

从 v4.2.0 版本开始，Mastodon 将自动检查可用更新并通知服务器上拥有 `DevOps` 权限的用户。

这通过每 30 分钟在后台获取 `https://api.joinmastodon.org/update-check?version=<current_version>` 来实现。 `current_version` 省略了构建元数据（如果版本字符串中含有`+`，则为第一个 `+` 之后的所有内容）。例如，如果你的版本是 `4.3.0-beta2+my-fork`，Mastodon 将查询 `https://api.joinmastodon.org/update-check?version=4.3.0-beta2`。

你可以通过设置 `UPDATE_CHECK_URL` 环境变量来更改 Mastodon 查询的 URL。你也可以通过将此环境变量设置为空字符串来完全禁用此行为，但我们强烈建议不要这样做，除非你通过其他方式关注 Mastodon 更新，因为 Mastodon 偶尔会发布必须及时应用的关键安全更新。

### 升级步骤

Mastodon 的发布版本对应 git 标签。在尝试升级之前，请在[ GitHub 发布页面](https://github.com/mastodon/mastodon/releases) 上查看所需的发布版本。该页面将包含**变更日志**，描述关于新版本不同之处的所有信息，以及**特定的升级说明**。

首先，切换到`mastodon`用户：

```bash
su - mastodon
```

并转到 Mastodon 根目录：

```bash
cd /home/mastodon/live
```

下载发布版本的代码，假设版本为`v3.1.2`：

```bash
git fetch --tags
git checkout v3.1.2
```

现在执行[ GitHub 上该版本的发行说明](https://github.com/mastodon/mastodon/releases) 中包含的升级说明。由于不同的发布版本需要不同的说明，我们不在此页面上包含任何说明。

{{< hint style="info" >}}
从旧版本升级时，你可以安全地跳过中间版本。你不需要单独检出它们。但是，你需要跟随每个版本的说明。大多数说明的步骤是重复的，你只需确保至少执行一次所有内容。
{{< /hint >}}

在执行完发布说明中的指令后，切回 root 用户：

```bash
exit
```

重启**后台工作进程**：

```bash
systemctl restart mastodon-sidekiq
```

并重新加载 **Web 进程**：

```bash
systemctl reload mastodon-web
```

{{< hint style="info" >}}
`reload` 操作是一种零停机重启，也称为"分阶段重启"。因此，Mastodon 升级通常不需要提前通知用户计划停机。在极少数情况下，你可以使用 `restart` 操作代替，但用户会感受到（短暂的）服务中断。
{{< /hint >}}

**流式 API** 服务器也会更新并需要重启，这将导致所有已连接的客户端断开连接，可能增加服务器负载：

```bash
systemctl restart mastodon-streaming
```

{{< hint style="danger" >}}
重启流式 API 会增加服务器负载，因为断开连接的客户端会尝试重新连接或改为轮询 REST API，所以尽可能避免这样做。
{{< /hint >}}

{{< hint style="success" >}}
**以上就是所有步骤！**你现在正在运行新版本的 Mastodon。
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Upgrading to a new release" raw_link="/admin/upgrading/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
