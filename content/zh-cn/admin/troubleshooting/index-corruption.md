---
title: 数据库索引损坏
description: 如何从数据库索引损坏中恢复。
menu:
  docs:
    weight: 10
    parent: admin-troubleshooting
---

一个比较常见的配置问题可能导致整个数据库的索引损坏。本页尝试解释为什么会发生这种情况以及如何修复它。

## 语言数据与排序规则 {#explanation}

数据库中的文本值，如用户名或状态标识符，使用所谓的排序规则进行比较，这些规则定义了字符的排序方式和大小写转换方式。
在设置数据库时，Mastodon 会使用数据库服务器的默认语言设置，包括默认排序规则，这通常由操作系统的设置决定。

不幸的是，在2018年末，一次 `glibc` 更新改变了许多区域设置的排序规则，这意味着使用受影响的语言设置的数据库现在会以不同方式排序文本值。
由于数据库索引依赖于它们所索引的值的排序的算法结构，一些索引可能会变得不一致。

更多信息：https://wiki.postgresql.org/wiki/Locale_data_changes https://postgresql.verite.pro/blog/2018/08/27/glibc-upgrade.html

## 我是否受到这个问题的影响？ {#am-i-affected}

如果你的数据库未使用 `C` 或 `POSIX` 作为其排序规则（你可以通过 `SELECT datcollate FROM pg_database WHERE datname = current_database();` 检查），
并且你曾经使用过 glibc 2.28 之前的版本，并且在更新到 glibc 2.28 或更新版本后没有立即重新索引你的数据库，那么你的索引可能不一致。

{{< hint style="info" >}}
你可能是因为 PgHero 警告"重复索引"而找到此页面的。虽然这类警告有时可能表明部署或更新 Mastodon 时出现问题，**但它们与数据库索引损坏无关，也不表明数据库存在任何功能问题**。
{{< /hint >}}

你可以使用 [PostgreSQL 的 `amcheck` 模块](https://www.postgresql.org/docs/10/amcheck.html)检查你的索引是否一致：作为数据库服务器的超级用户，连接到你的 Mastodon 数据库并执行以下命令（这可能需要一段时间）：

```SQL
CREATE EXTENSION IF NOT EXISTS amcheck;
SELECT bt_index_check(c.oid)
FROM pg_index i
JOIN pg_class c ON i.indexrelid = c.oid
WHERE c.relname IN ('index_account_domain_blocks_on_account_id_and_domain',
  'index_account_proofs_on_account_and_provider_and_username',
  'index_accounts_on_username_and_domain_lower', 'index_accounts_on_uri',
  'index_accounts_on_url', 'index_conversations_on_uri',
  'index_custom_emoji_categories_on_name',
  'index_custom_emojis_on_shortcode_and_domain',
  'index_devices_on_access_token_id', 'index_domain_allows_on_domain',
  'index_domain_blocks_on_domain', 'index_email_domain_blocks_on_domain',
  'index_invites_on_code', 'index_markers_on_user_id_and_timeline',
  'index_media_attachments_on_shortcode', 'index_preview_cards_on_url',
  'index_statuses_on_uri', 'index_tags_on_name_lower',
  'index_tombstones_on_uri', 'index_unavailable_domains_on_domain',
  'index_users_on_email', 'index_webauthn_credentials_on_external_id'
);
```

如果出现错误，则你的数据库已损坏，需要修复。如果没有错误，你可能需要执行更复杂的检查以确保。
与之前的检查不同，这些更复杂的检查在运行时会锁表，从而影响实例的可用性。

```SQL
CREATE EXTENSION IF NOT EXISTS amcheck;
SELECT bt_index_parent_check(c.oid)
FROM pg_index i
JOIN pg_class c ON i.indexrelid = c.oid
WHERE c.relname IN ('index_account_domain_blocks_on_account_id_and_domain',
  'index_account_proofs_on_account_and_provider_and_username',
  'index_accounts_on_username_and_domain_lower', 'index_accounts_on_uri',
  'index_accounts_on_url', 'index_conversations_on_uri',
  'index_custom_emoji_categories_on_name',
  'index_custom_emojis_on_shortcode_and_domain',
  'index_devices_on_access_token_id', 'index_domain_allows_on_domain',
  'index_domain_blocks_on_domain', 'index_email_domain_blocks_on_domain',
  'index_invites_on_code', 'index_markers_on_user_id_and_timeline',
  'index_media_attachments_on_shortcode', 'index_preview_cards_on_url',
  'index_statuses_on_uri', 'index_tags_on_name_lower',
  'index_tombstones_on_uri', 'index_unavailable_domains_on_domain',
  'index_users_on_email', 'index_webauthn_credentials_on_external_id'
);
```

如果执行成功，没有返回错误，你的数据库应该是一致的，你可以安全地忽略 Mastodon 在运行 `db:migrate` 时发出的警告。

## 修复问题 {#fixing}

如果你受到影响但不采取行动，随着时间推移，你的数据库可能会变得越来越不一致。因此，尽快修复这个问题非常重要。

Mastodon 3.2.2 及更高版本附带了一个半交互式脚本，以尽可能良好的方式修复这些损坏。如果你使用的是早期版本，请先更新到 3.2.2。由于这些损坏的存在，可能在运行数据库迁移到 3.2.2 时会失败，但数据库应该会变成一个可以被 Mastodon 3.2.2 附带的维护工具恢复的状态。

在尝试修复数据库之前，**停止 Mastodon 并备份你的数据库**。然后，在**Mastodon 仍处于停止状态**的情况下，运行维护脚本：

```
RAILS_ENV=production bin/tootctl maintenance fix-duplicates
```

该脚本将遍历数据库以自动查找重复项并修复它们。在某些情况下，这些操作是破坏性的。在最具破坏性的情况下，你将被要求选择要保留的记录和要丢弃的记录。在所有情况下，搜索整个数据库中的重复项是一项极其耗时的操作。

{{< hint style="warning" >}}
在某些情况下，重复记录可能有无法调和的冲突（例如两个不同的本站用户共享相同的用户名）。在这些情况下，去重操作可能是**部分破坏性的**，你将被询问哪些记录保持不变，哪些记录将被更改。
因此，此脚本是半交互式的。在所有情况下，搜索整个数据库中的重复项是一项极其耗时的操作。
{{< /hint >}}

{{< hint style="danger" >}}
**由于维护脚本将暂时移除索引， Mastodon 必须在整个过程中完全停止，以防止出现其他重复项。**
{{< /hint >}}

## 避免问题

要避免这个问题，请在任何 libc 更新后立即重新索引你的数据库。
[SQL 命令 `REINDEX`](https://www.postgresql.org/docs/current/sql-reindex.html)
或
[`reindexdb` 命令行工具](https://www.postgresql.org/docs/current/app-reindexdb.html)
可能对此有用。

{{< translation-status-zh-cn raw_title="Database index corruption" raw_link="/admin/troubleshooting/index-corruption/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
