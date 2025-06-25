---
title: 迁移到新机器
description: 在不损失任何东西的情况下，把你的Mastodon复制安装至新的服务器上。
menu:
  docs:
    weight: 90
    parent: admin
---

有时，出于各种原因，你需要将你的Mastodon实例从一台服务器迁移至另一台。幸运的是，这个过程并不太困解，虽然这可能导致一段时间的下线。

{{< hint style="info" >}}
本篇指南基于Ubuntu Server编写；根据其他设置的不同，你的过程可能会有变化。
{{< /hint >}}

## 基本步骤 {#basic-steps}

1. 依照[产品指南]({{< relref "install" >}})安装新的Mastodon服务器（切记，不要运行 `mastodon:setup`）。
2. 停止旧服务器上的Mastodon（`systemctl stop 'mastodon-*.service'`）。
3. 依照如下指示，导出并导入PostgreSQL数据库。
4. 依照如下指示，复制 `system/` 目录下文件。（注意：如果你使用S3存储，你可以跳过此步）。
5. 复制 `.env.production` 文件。
6. 运行 `RAILS_ENV=production bundle exec rails assets:precompile` 编译 Mastodon。
7. 运行 `RAILS_ENV=production ./bin/tootctl feeds build` 重新构建每个用户的主页时间流。
8. 启动新服务器上的Mastodon。
9. 更新DNS设置，将其指向新服务器。
10. 更新或复制你的Nginx设置，如果必要的话可重获取LetsEncrypt证书。
11. 享受你的新服务器！

## 详细步骤 {#detailed-steps}

### 什么数据需要被迁移 {#what-data-needs-to-be-migrated}

你必须需要复制如下内容：

* `~/live/public/system`目录，里面包含了用户上传的图片与视频（如果使用S3，可跳过此步）
* PostgreSQL数据库（使用[pg_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html)）
* `~/live/.env.production`文件，里面包含了服务器配置与密钥

不太重要的部分，为了方便起见，你也可以复制如下内容：

* nginx配置文件（位于`/etc/nginx/sites-available/default`）
* systemd配置文件（`/etc/systemd/system/mastodon-*.service`），里面可能包括一些你服务器的调优与个性化
* PgBouncer配置文件，位于 `/etc/pgbouncer` （如果你使用PgBouncer的话）

### 导出并导入PostgreSQL数据库 {#dump-and-load-postgresql}

不要运行`mastodon:setup`，而是创建一个名为`template0`的空白PostgreSQL数据库（当导入PostgreSQL导出文件时，这是很有用的，参见[pg_dump文档](https://www.postgresql.org/docs/9.1/static/backup-dump.html#BACKUP-DUMP-RESTORE)）。

在你的旧系统，使用`mastodon`用户运行如下命令：

```bash
pg_dump -Fc mastodon_production -f backup.dump
```

使用 `rsync` 或 `scp` 复制 `backup.dump` 文件。然后在新系统，使用`mastodon`帐户创建一个空数据库：

```bash
createdb -T template0 mastodon_production
```

然后导入它：

```bash
pg_restore -U mastodon -n public --no-owner --role=mastodon \
  -d mastodon_production backup.dump
```

（注意：如果新服务器上的帐户名不是`mastodon`，你应当修改上面命令中 `-U` **和** `--role` 参数。两台服务器的用户名不同也可以。）

### 复制文件 {#copy-files}

本操作可能花费一些时间，若你希望避免不必要重复制，建议使用`rsync`。在你的旧机器上，使用`mastodon`用户，运行：

```bash
rsync -avz ~/live/public/system/ mastodon@example.com:~/live/public/system/
```

如果旧服务器上任何文件有改动，你需要重运行此命令。

你同样需要复制`.env.production`文件，该文件内含密钥。

可选的，你可以复制nginx、systemd、pgbouncer配置文件，或者从头开始重写它们。

### 迁移期间 {#during-migration}

你可以编辑旧机器上的`~/live/public/500.html`页面，如果你希望展示一个优雅的错误信息，让现有用户知晓正在进行迁移。

你也应该提前一天将DNS TTL设置为较小数值（30-60分钟）。这样当你把DNS指向新IP后，新纪录可以很快扩散开来。

### 迁移后 {#after-migrating}

你可以使用[whatsmydns.net](https://whatsmydns.net/)来查看DNS扩散的过程。为了跳过这个过程，你可以修改你自己的`/etc/hosts`文件，将其指向你的新服务器，这样你可以尽早开始使用新服务器。

{{< translation-status-zh-cn raw_title="Migrating to a new machine" raw_link="/admin/migrating/" last_tranlation_time="2020-05-06" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
