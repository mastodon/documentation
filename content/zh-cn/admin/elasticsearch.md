---
title: 配置全文搜索
description: 设置 Elasticsearch 以搜索嘟文(包括创建的嘟文、喜欢的嘟文和被提及的嘟文)、可公开索引的嘟文与账号
aliases:
- /admin/optional/elasticsearch
menu:
  docs:
    weight: 40
    parent: admin
---

当 Elasticsearch 可用时，Mastodon 支持全文搜索。强烈建议配置此功能。

Mastodon 的全文搜索允许已登录用户查找以下内容：
- 选择在搜索结果中显示的账号发布的公开嘟文
- 自己创建的嘟文
- 提及自己的嘟文
- 自己喜欢的嘟文
- 自己收藏的嘟文
- 账号(显示名称、用户名和简介)

全文搜索有意不允许在整个数据库中搜索任意字符串。

## 安装 Elasticsearch {#install}

{{< hint style="info" >}}
Mastodon 经过测试与 Elasticsearch 7 版本兼容。它理论上也支持 OpenSearch 以及 Elasticsearch 6 和 8 版本，但这些设置不受官方支持。
{{< /hint >}}

将 Elasticsearch 官方仓库添加到 apt：

```bash
wget -O /usr/share/keyrings/elasticsearch.asc https://artifacts.elastic.co/GPG-KEY-elasticsearch
echo "deb [signed-by=/usr/share/keyrings/elasticsearch.asc] https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list
```

现在你可以安装 Elasticsearch：

```bash
apt update
apt install elasticsearch
```

{{< hint style="warning" >}}
**安全警告：** 默认情况下， Elasticsearch 应仅绑定到 `localhost`，即无法从外部网络访问。你可以通过查看 `/etc/elasticsearch/elasticsearch.yml` 中的 `network.host` 来检查 Elasticsearch 绑定的地址。请考虑到任何能够访问 Elasticsearch 的人都可以访问和修改其中的任何数据，因为没有认证层。所以确保访问安全非常重要。建议使用防火墙，只开放 22、 80 和 443 端口，如[主安装说明](../../prerequisites/#install-a-firewall-and-only-whitelist-ssh-http-and-https-ports)中所述。如果你有多主机设置，你必须了解如何保护内部流量安全。
{{< /hint >}}

启动 Elasticsearch：

```bash
systemctl daemon-reload
systemctl enable --now elasticsearch
```

## 配置 Mastodon {#config}

编辑 `.env.production` 以添加以下变量：

```bash
ES_ENABLED=true
ES_HOST=localhost
ES_PORT=9200
ES_PRESET= # single_node_cluster, small_cluster或large_cluster
# ES_USER=
# ES_PASS=
```

_注意_：如果使用 TLS，请在主机名前加上 `https://`。例如：`https://elastic.example.com`。

### 选择正确的预设

`ES_PRESET` 的值取决于你的 Elasticsearch 规模，它将用于为你的索引设置最适合你设置的分片和副本数量：
- `single_node_cluster` 如果你的 Elasticsearch 集群中只有一个节点。索引将配置为无副本
- `small_cluster` 如果你的集群少于 6 个节点。索引将配置为单副本
- `large_cluster` 如果你的集群有 6 个或更多节点。索引将较之 `small_cluster` 配置更多的分片，以便它们可以分布在更多节点上

如果你在同一台机器上有多个 Mastodon 服务器，并且计划为所有这些服务器使用相同的 Elasticsearch 实例，请确保它们都在配置中设置了唯一的 `REDIS_NAMESPACE`，以区分索引。如果你需要覆盖 Elasticsearch 索引的前缀，可以直接设置 `ES_PREFIX`。

### 安全性

默认情况下，Elasticsearch 不处理任何认证，所有请求都以完全管理员权限进行。我们强烈建议你在集群上配置 Elasticsearch 安全功能。

要进行配置，请参考[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/security-minimal-setup.html)。它将指导你进行以下操作：
- 启用安全功能（`xpack.security.enabled: true`）
- 为内置用户创建密码

完成后，你可以创建自定义用户组供 Mastodon 连接。

例如（可以参考此段命令并使用你的 Elastic 管理员密码）：

```sh
curl -X POST -u elastic:admin_password "localhost:9200/_security/role/mastodon_full_access?pretty" -H 'Content-Type: application/json' -d'
{
  "cluster": ["monitor"],
  "indices": [{
    "names": ["*"],
    "privileges": ["read", "monitor", "write", "manage"]
  }]
}
'
```

[Elasticsearch用户组创建文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/security-api-put-role.html)

创建用户组后，你可以为Mastodon服务器创建用户，并为其分配用户组。

例如（请调整此片段以使用你的Elastic管理员密码，并自定义你新`mastodon`用户的密码）：

```sh
curl -X POST -u elastic:admin_password "localhost:9200/_security/user/mastodon?pretty" -H 'Content-Type: application/json' -d'
{
  "password" : "l0ng-r4nd0m-p@ssw0rd",
  "roles" : ["mastodon_full_access"]
}
'
```

[Elasticsearch用户创建文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/security-api-put-user.html)

完成后，你需要配置 Mastodon 使用新创建用户的凭据。

然后在 `.env.production` 中，调整你的配置：

```bash
ES_USER=mastodon
ES_PASS=l0ng-r4nd0m-p@ssw0rd
```

设置完成，你的 Elasticsearch 实例应该更安全了！

### 填充索引

保存新配置后，重启 Mastodon 进程使其生效：

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

现在是时候创建 Elasticsearch 索引并填充数据了：

```bash
su - mastodon
cd live
RAILS_ENV=production bin/tootctl search deploy
```

{{< hint style="info" >}}
创建 Elasticsearch 索引可能需要 JVM（Java 虚拟机）提供的更多内存。如果 Elasticsearch 在创建索引时崩溃，请尝试分配更多内存。

1. 在 `/etc/elasticsearch/jvm.options.d/` 目录下创建并打开一个文件（例如：`nano /etc/elasticsearch/jvm.options.d/ram.options`）
2. 添加以下文本并根据需求编辑分配的内存。根据经验， Elasticsearch 应使用你可用内存的25%-50%。请不要分配超过可用内存的内存量。
```
# Xms表示总堆空间的初始大小
# Xmx表示总堆空间的最大大小
# 两个值应该相同
-Xms2048m
-Xmx2048m
```
3. 保存文件。
4. 使用 `systemctl restart elasticsearch` 重启 Elasticsearch。
5. 重试创建 Elasticsearch 索引。如果 Elasticsearch 仍然崩溃，请尝试设置更高的数值。
{{< /hint >}}

## 其他语言的搜索优化
### 中文搜索优化 {#chinese-search-optimization}

标准分析器是 Elasticsearch 的默认分析器，但对于中文等某些语言来说，它可能不是最佳选择。要增强搜索体验，请考虑安装特定语言的分析器。在 Elasticsearch 中创建索引之前，请确保安装以下扩展：

- [elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik)
- [elasticsearch-analysis-stconvert](https://github.com/medcl/elasticsearch-analysis-stconvert)

然后按如下方式修改 Mastodon 的索引定义：

```diff
diff --git a/app/chewy/accounts_index.rb b/app/chewy/accounts_index.rb
--- a/app/chewy/accounts_index.rb
+++ b/app/chewy/accounts_index.rb
@@ -4,7 +4,7 @@ class AccountsIndex < Chewy::Index
   settings index: { refresh_interval: '5m' }, analysis: {
     analyzer: {
       content: {
-        tokenizer: 'whitespace',
+        tokenizer: 'ik_max_word',
         filter: %w(lowercase asciifolding cjk_width),
       },

diff --git a/app/chewy/statuses_index.rb b/app/chewy/statuses_index.rb
--- a/app/chewy/statuses_index.rb
+++ b/app/chewy/statuses_index.rb
@@ -16,9 +16,17 @@ class StatusesIndex < Chewy::Index
         language: 'possessive_english',
       },
     },
+    char_filter: {
+      tsconvert: {
+        type: 'stconvert',
+        keep_both: false,
+        delimiter: '#',
+        convert_type: 't2s',
+      },
+    },
     analyzer: {
       content: {
-        tokenizer: 'uax_url_email',
+        tokenizer: 'ik_max_word',
         filter: %w(
           english_possessive_stemmer
           lowercase
@@ -27,6 +35,7 @@ class StatusesIndex < Chewy::Index
           english_stop
           english_stemmer
         ),
+        char_filter: %w(tsconvert),
       },
     },
   }
diff --git a/app/chewy/tags_index.rb b/app/chewy/tags_index.rb
--- a/app/chewy/tags_index.rb
+++ b/app/chewy/tags_index.rb
@@ -2,10 +2,19 @@

 class TagsIndex < Chewy::Index
   settings index: { refresh_interval: '15m' }, analysis: {
+    char_filter: {
+      tsconvert: {
+        type: 'stconvert',
+        keep_both: false,
+        delimiter: '#',
+        convert_type: 't2s',
+      },
+    },
     analyzer: {
       content: {
-        tokenizer: 'keyword',
+        tokenizer: 'ik_max_word',
         filter: %w(lowercase asciifolding cjk_width),
+        char_filter: %w(tsconvert),
       },

       edge_ngram: {
```

{{< translation-status-zh-cn raw_title="Configuring full-text search" raw_link="/admin/elasticsearch/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
