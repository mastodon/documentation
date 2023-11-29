---
title: 升级到新版本
menu:
  docs:
    weight: 70
    parent: admin
---

{{< hint style="info" >}}
当一个新的Mastodon版本释出后，它将出现在[GitHub releases页面](https://github.com/mastodon/mastodon/releases)。请注意：运行来自`main`分支的未释出代码，虽然可以进行，但不推荐这样做。
{{< /hint >}}

Mastodon版本与git tags一致。在尝试升级之前，请至[GitHub releases页面](https://github.com/mastodon/mastodon/releases)查找所需版本。该页面包含了一个**更新日专**，其中描述你需要了解的所有差异，以及**特定的升级指令**。

开始之前，切换至`mastodon`用户：

```bash
su - mastodon
```

并转至Mastodon根目录：

```bash
cd /home/mastodon/live
```

下载相应版本代码，这里假定版本为`v3.1.2`：

```bash
git fetch --tags
git checkout v3.1.2
```

现在，执行GitHub版本发布说明中的升级指令。因为不同的版本有不同的指令，所以本页面将不包括任何指令。

{{< hint style="info" >}}
从旧版本升级时，你可以安全的跳过中间版本。你无需单独检出他们。然而，你确实需要追踪每一个版本的升级指令。大多数指令都是重叠的，你只需要确保每条至少执行一次即可。
{{< /hint >}}

当你执行完版本发布说明中的指令后，切换回root用户：

```bash
exit
```

重启**后台worker**：

```bash
systemctl restart mastodon-sidekiq
```

并重载**web进程**：

```bash
systemctl reload mastodon-web
```

{{< hint style="info" >}}
`reload`操作是零下线时间的重启（restart），也被称为“分阶段重启（phased restart）”。因此，Mastodon升级通常不需要为计划下线而提前发布公告。罕见情况下，你可以改用`restart`操作，但你的用户将感到（短暂的）服务中断。
{{< /hint >}}

罕见情况下，**streaming API** 服务也会被更新并需要重启：

```bash
systemctl restart mastodon-streaming
```

{{< hint style="danger" >}}
更新streaming API服务非常罕见，在大多数版本中，*不*需要重启它。重启streaming API将导致服务器负载增加，因为断线的用户会尝试重连或改用REST API轮询。因此请尽量避免重启streaming API服务
{{< /hint >}}

{{< hint style="success" >}}
**就这样！** 您现在正在运行新版本的Mastodon。
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Upgrading to a new release" raw_link="/admin/upgrading/" last_tranlation_time="2020-05-04" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
