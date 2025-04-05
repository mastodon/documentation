---
title: 迁移到新机器
description: 将你的 Mastodon 站点无损复制到新服务器。
menu:
  docs:
    weight: 90
    parent: admin
---

出于各种原因，你可能希望将 Mastodon 实例从一台服务器迁移到另一台。幸运的是，这个过程并不太困难，尽管可能会导致一些停机时间。

{{< hint style="info" >}}
本指南主要针对 Ubuntu Server 编写；对于其他配置环境，你的实际体验可能有所不同。
{{< /hint >}}

## 基本步骤 {#basic-steps}

1. 使用[生产环境配置指南]({{< relref "install" >}})设置新的 Mastodon 服务器（但不要运行`mastodon:setup`，只保持PostgreSQL服务运行）。
2. 停止旧服务器上的 Mastodon 服务（例如`systemctl stop 'mastodon-*.service'`）。
3. 使用下面的说明导出和加载 PostgreSQL 数据库。
4. 使用下面的说明复制 `system/` 文件。（注意：如果你使用 S3，可以跳过此步骤。）
5. 复制 `.env.production` 文件。
6. 保存 Redis 数据库，停止新旧机器上的 Redis 服务，并将 Redis 数据库从 `/var/lib/redis/` 复制到新服务器。
7. 运行 `RAILS_ENV=production bundle exec rails assets:precompile` 编译 Mastodon。
8. 在新服务器上启动 Mastodon 和 Redis。
9. 运行 `RAILS_ENV=production ./bin/tootctl feeds build` 为每个用户重建主时间线。
10. 运行 `RAILS_ENV=production ./bin/tootctl search deploy` 重建 Elasticsearch 索引（注意：如果你不使用 Elasticsearch，可以跳过此步骤。）
11. 更新 DNS 设置，指向新服务器。
12. 更新或复制 Nginx 配置，并根据需要重新运行 LetsEncrypt。
13. 享受你的新服务器！

## 详细步骤 {#detailed-steps}

### 停止 Mastodon 服务

```bash
systemctl stop 'mastodon-*.service'
```

### 需要迁移哪些数据 {#what-data-needs-to-be-migrated}

总体而言，你需要复制以下内容：

* `~/live/public/system` 目录，该目录包含用户上传的图片和视频（如果使用 S3，则不需要）
* PostgreSQL 数据库（使用 [pg_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html)）
* `~/live/.env.production` 文件，其中包含服务器配置和密钥
* `/var/lib/redis/` 目录中的 Redis 数据库，其中包含未处理的 Sidekiq 任务。

以下内容不太重要，但为方便起见，你可能仍然想要复制：

* nginx 配置（位于 `/etc/nginx/sites-available/mastodon`）
* 域名的 SSL 证书（若使用 LetsEncrypt，应位于 `/etc/letsencrypt/live/`）
* systemd 配置文件（`/etc/systemd/system/mastodon-*.service`），其中可能包含你的服务器调整和自定义
* `/etc/pgbouncer` 下的 PgBouncer 配置（如果你使用它）

### 导出与导入 PostgreSQL {#dump-and-load-postgresql}

我们不运行 `mastodon:setup`，而是使用 `template0` 数据库创建一个空的 PostgreSQL 数据库（这在还原 PostgreSQL 转储文件时很有用，[如 pg_dump 文档所述](https://www.postgresql.org/docs/9.1/static/backup-dump.html#BACKUP-DUMP-RESTORE)）。  

如果你的 PostgreSQL 用户使用密码，为方便起见，你可能希望在新系统上配置 `mastodon` 用户使用与旧系统相同的密码：

```bash
sudo -u postgres psql  
ALTER USER mastodon WITH PASSWORD 'YOUR_PASSWORD';  
\q
```

在旧系统上以 `mastodon` 用户身份运行：

```bash
pg_dump -Fc mastodon_production -f backup.dump
```

使用 `rsync` 或 `scp` 复制 `backup.dump` 文件。然后在新系统上，以 `mastodon` 用户身份创建一个空数据库：

```bash
createdb -T template0 mastodon_production
```

然后导入它（将 `-j#` 中的 `#` 替换为系统中的 CPU 数量以提高还原性能）：

```bash
pg_restore -Fc -j# -U mastodon -n public --no-owner --role=mastodon \
  -d mastodon_production backup.dump
```

（请注意，如果新服务器上的用户名不是 `mastodon`，你应该更改上面的 `-U` 和 `--role` 值。两个服务器之间可以使用不同的用户名。）

### 复制文件 {#copy-files}

这可能需要一些时间，为避免不必要的重复复制，建议使用 `rsync`。在旧机器上，以 `mastodon` 用户身份运行：

```bash
rsync -avz ~/live/public/system/ mastodon@example.com:~/live/public/system/
```

如果旧服务器上的任何文件发生更改，你需要重新运行此命令。  

你还应该复制 `.env.production` 文件，其中包含密钥。

在新机器上，确保 Redis 未运行，否则它可能会覆盖你尝试还原的转储文件。以 `root` 用户身份运行：

```bash
systemctl stop redis-server.service
```

现在复制你的 Redis 数据库（根据需要调整 Redis 数据库的位置）。在旧机器上，以 `root` 用户身份运行：

```bash
redis-cli SAVE
systemctl stop redis-server.service
rsync -avz /var/lib/redis/ root@example.com:/var/lib/redis
```

作为可选操作，你可以复制 nginx、systemd 和 PgBouncer 配置文件，或者从头重写它们。

### 迁移期间 {#during-migration}

你可以编辑旧机器上的 `~/live/public/500.html` 页面，以显示一条友好的错误消息，让现有用户知道迁移正在进行中。

你可能还想在提前一天将 DNS TTL 设置为较小的值（30-60分钟），这样一旦你将其指向新 IP 地址，DNS 就可以快速传播。

### 迁移后 {#after-migrating}

以mastodon用户身份运行以下命令：  

```bash
RAILS_ENV=production bundle exec rails assets:precompile  
```

现在以 root 用户身份运行以下命令：

```bash
systemctl daemon-reload
systemctl start redis-server  
systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming  
systemctl restart nginx
```

一旦服务器重新上线，你可以为用户重建主页时间线（这可能需要很长时间，取决于用户数量。）

```bash
RAILS_ENV=production ./bin/tootctl feeds build
```

如果你使用 Elasticsearch，请运行以下命令重建索引（这可能需要很长时间，取决于你拥有的状态数量。）

```bash
RAILS_ENV=production ./bin/tootctl search deploy
```

你可以查看 [whatsmydns.net](https://whatsmydns.net/) 以了解 DNS 传播的进度。要加速这个过程，你可以编辑自己的 `/etc/hosts` 文件，指向新服务器，这样你就可以提前开始使用它。

{{< translation-status-zh-cn raw_title="Migrating to a new machine" raw_link="/admin/migrating/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
