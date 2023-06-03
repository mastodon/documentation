---
title: 备份你的服务器
summary: 设置日常备份（可选，但并非如此）
menu:
  docs:
    weight: 80
    parent: admin
---

对于任何真实世界用途来说，你都应该保证日常备份Mastodon服务器。

## 概览 {#overview}

你所需要备份的东西，按重要程度排序：

1. PostgreSQL 数据库
2. `.env.production` 文件或等效文件中的应用密钥
3. 用户上传的文件
4. Redis 数据库

## 故障模式 {#failure}

人们通常要应对两种类型故障：硬件故障，诸如磁盘上数据损坏；以及人为软件故障，诸如误删特定文件。本文档中，仅考虑前一种类型。

丢失PostgreSQL数据库，那一切都完了。Mastodon将所有重要数据存储于PostgreSQL数据库中。如果数据库消失，那你服务器上所有的帐户、所有的嘟文、所有关注者都将随之消失。

如果你丢失了应用密钥，对你的用户而言，Mastodon的某些功能将停止工作。你服务器上的用户将被登出，双因子认证（2FA）将不可用，Web Push API订阅将停止工作。

如果你丢失了用户上传的文件，你将丢失头像、横幅、媒体附件，但Mastodon*仍会*继续工作。

丢失Redis数据库几乎是无害的：唯一不可逆的数据是Sidekiq队列及之前失败任务的重试计划。主页与列表时间流虽然存储于Redis，但它们可以使用tootctl再生成。

最好的备份是所谓的异地备份，即与Mastodon自身不在同一台计算机上存储的备份。如果你托管的服务器起火了，硬盘爆炸了，存储于同一硬件备份将不可用。

## 备份应用密钥 {#env}

应用密钥是最容易备份的，因为它们是不变的。你只需要将 `.env.production` 存储在安全的地方就可以了。

## 备份 PostgreSQL {#postgresql}

突然断电、硬盘故障、错误迁移数库库schema都会致使数据损坏。由于以上原因，推荐偶尔使用 `pg_dump` 或 `pg_dumpall` 备份数据库。

如果要求高可用性，可以使用热流拷贝（hot streaming replication）使第二台PostgreSQL服务器始终具有最新数据，并做好另一台服务器出现故障切换至此的准备。

## 备份用户上传的文件 {#media}

如果你使用外部对象存储，诸如Amazon S3、Google Cloud 或 Wasabi，你无需为怎么备份它们而担心。各自的公司将负责处理硬件故障。

如果你使用本地文件存储，复制体积巨大的 `public/system` 目录（默认存储上传文件的地方）。

## 备份 Redis {#redis}

备份Redis是很容易的。Redis会定期将数据写入`/var/lib/redis/dump.rdb`文件，你只需要复制这个文件就可以了。

{{< translation-status-zh-cn raw_title="Backing up your server" raw_link="/admin/backups/" last_tranlation_time="2020-05-06" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
