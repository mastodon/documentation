---
title: 备份你的服务器
description: 设置定期备份（可选，但实际上很必要）
menu:
  docs:
    weight: 80
    parent: admin
---

对于所有实际使用的场景，你都应确保定期备份你的 Mastodon 服务器。

## 概述 {#overview}

需要备份的内容按重要程度排序如下：

1. PostgreSQL 数据库
2. 来自 `.env.production` 文件或等效文件的应用密钥
3. 用户上传的文件
4. Redis 数据库

## 故障类别 {#failure}

人们通常会防范两种类型的故障：硬件故障，如磁盘数据损坏；以及人为和软件错误，如错误删除某特定数据。在本文档中，我们仅考虑前一种类型。

Mastodon 将所有最重要的数据存储在 PostgreSQL 数据库中。PostgreSQL 数据库的丢失将导致服务器完全故障，包括所有账户、嘟文与关注者信息。

如果你丢失了应用密钥，Mastodon 的某些功能将停止为用户工作，用户将被登出，双因素认证将不可用，且 Web Push API 订阅将停止工作。

如果丢失了用户上传的文件，你将丢失头像、资料卡横幅背景图和媒体附件，但 Mastodon 在未来仍能正常工作。

丢失 Redis 数据库几乎无害：唯一不可恢复的数据是 Sidekiq 队列的内容和先前失败任务的计划重试时间。主页和列表信息流存储在 Redis 中，但可以通过 tootctl 重新生成。

最好的备份是被称为异地备份的备份模式，即不存储在与 Mastodon 服务器本身相同的机器上的备份。如果你的服务器着火并且硬盘驱动器爆炸，存储在同一硬盘上的备份将没有太大用处。

## 备份应用密钥 {#env}

应用密钥是最容易备份的，因为它们从不变化。你只需将 `.env.production` 存储在安全的地方即可。

## 备份 PostgreSQL {#postgresql}

PostgreSQL 面临断电、硬盘驱动器故障与错误的架构迁移带来的数据损坏风险。因此，建议偶尔使用 `pg_dump` 或 `pg_dumpall` 进行备份。

对于高可用配置，可以使用热数据流式复制来拥有一个数据始终最新的第二PostgreSQL服务器，以便在另一服务器宕机时随时切换。

## 备份用户上传的文件 {#media}

如果你使用外部对象存储提供商，如亚马逊S3、谷歌云或 Wasabi，则无需担心备份这些文件。相应公司负责处理硬件故障。

如果你使用是本地文件存储，那么你需要自行对 `public/system` 这个大目录进行备份，该目录是上传文件的默认存储位置。

## 备份 Redis {#redis}

备份 Redis 很容易。Redis 定期写入 `/var/lib/redis/dump.rdb`，这是你唯一需要复制的文件。

{{< translation-status-zh-cn raw_title="Backing up your server" raw_link="/admin/backups/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
