---
title: 全文搜索
summary: 设置Elasticsearch来搜索自己发出的嘟文、自己喜欢的嘟文、自己的书签和自己被提及的嘟文。
menu:
  docs:
    weight: 10
    parent: admin-optional
---

当有可用Elasticsearch时，Mastodon支持全文搜索。Mastodon的全文搜索允许登录用户从他们自己的嘟文、他们喜欢的嘟文、他们的书签和他们被提及的嘟文中查找相应结果。Mastodon有意禁用了在全数据库搜索任意关键词的功能。

## 安装 Elasticsearch {#install}

Elasticsearch 需要 Java runtime。如果你还没有安装 Java，请立刻安装上它。以下操均假定你已经登录为`root`用户：

```bash
apt install openjdk-8-jre-headless
```

添加Elasticsearch官方软件仓库至apt：

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-6.x.list
apt update
```

现在，你可以安装 Elasticsearch：

```bash
apt install elasticsearch
```

{{< hint style="warning" >}}
**安全警告：** 默认情况下，Elasticsearch仅绑定于localhost，即无法从外部网络访问。你可以通过查看 `/etc/elasticsearch/elasticsearch.yml` 中的 `network.host` 来检查 Elasticsearch 绑定了哪些地址。考虑到由于缺乏认证层，任何能访问 Elasticsearch 的人都可以读取或修改里面的数据。因此，确保访问安全非常重要。如[主要安装说明](../../prerequisites/#install-a-firewall-and-only-whitelist-ssh-http-and-https-ports)中所述，防火墙建议仅暴露了22、80、443端口。如果你是一个多主机配置，你必须知道如何保证内部流量安全。
{{< /hint >}}
{{< hint style="danger" >}}
**安全警告:** 由于近期Elasticsearch所使用的`log4j`库被披露出[安全漏洞](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228)，使用了旧版本`log4j`(`2.0`到`2.14.1`)的ES可能会受到影响。如果使用了这些版本的`log4j`，请参阅 [此 issue](https://github.com/elastic/elasticsearch/issues/81618#issuecomment-991000240) 来暂时缓解此问题。
{{< /hint >}}

启动 Elasticsearch：

```bash
systemctl enable elasticsearch
systemctl start elasticsearch
```

## 配置 Mastodon {#config}

编辑 `.env.production`，添加如下变量：

```bash
ES_ENABLED=true
ES_HOST=localhost
ES_PORT=9200
```

如果你同一台机器上运行多个Mastodon服务器，你计划让它们使用同一个Elasticsearch，请确保他们都配置了互不重复的 `REDIS_NAMESPACE` 以分别他们的索引。如果你需要覆盖Elasticsearch索引前缀，你可以直接设置 `ES_PREFIX`。


保存新设置之后，使用如下命令创建Elasticsearch索引：

```bash
RAILS_ENV=production bundle exec rake chewy:upgrade
```

重启Mastodon进程以使新配置生效：

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

现在，新的嘟文将会被写入Elasticsearch索引。最后一步是导入所有旧有数据。这将花费很长一段时间：

```bash
RAILS_ENV=production bundle exec rake chewy:sync
```

{{< hint style="warning" >}}
**兼容性提示：** Ruby 2.6.0 由于已知Bug，无法进行上述操作。其它Ruby版本，例如：2.6.1，并不存在这个问题。
{{< /hint >}}

## 其它语言的搜索优化

### 中文搜索优化 {#chinese-search-optimize}

Elasticsearch默认使用标准分析器，这对于中文来说可能并不太适合。为了提高搜索体验，你可以安装特定语言的专用分析器。在创建Elasticsearch索引之前执行：


安装 [elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik)、[elasticsearch-analysis-stconvert](https://github.com/medcl/elasticsearch-analysis-stconvert) 插件至 Elasticsearch。

并对源码做出如下修改：

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

{{< translation-status-zh-cn raw_title="Full-text search" raw_link="/admin/optional/elasticsearch/" last_tranlation_time="2020-05-05" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
