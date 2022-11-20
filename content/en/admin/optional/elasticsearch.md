---
title: Full-text search
description: Setting up ElasticSearch to search for statuses authored, favourited, or mentioned in.
menu:
  docs:
    weight: 10
    parent: admin-optional
---

Mastodon supports full-text search when ElasticSearch is available. Mastodon’s full-text search allows logged in users to find results from their own statuses, their mentions, their favourites, and their bookmarks. It deliberately does not allow searching for arbitrary strings in the entire database.

## Installing ElasticSearch {#install}

ElasticSearch requires a Java runtime. If you don’t have Java already installed, do it now. Assuming you are logged in as `root`:

```bash
apt install openjdk-17-jre-headless
```

Add the official ElasticSearch repository to apt:

```bash
wget -O /usr/share/keyrings/elasticsearch.asc https://artifacts.elastic.co/GPG-KEY-elasticsearch
echo "deb [signed-by=/usr/share/keyrings/elasticsearch.asc] https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list
```

Now you can install ElasticSearch:

```bash
apt update
apt install elasticsearch
```

{{< hint style="warning" >}}
**Security warning:** By default, ElasticSearch is supposed to bind to localhost only, i.e. be inaccessible from the outside network. You can check which address ElasticSearch binds to by looking at `network.host` within `/etc/elasticsearch/elasticsearch.yml`. Consider that anyone who can access ElasticSearch can access and modify any data within it, as there is no authentication layer. So it’s really important that the access is secured. Having a firewall that only exposes the 22, 80 and 443 ports is advisable, as outlined in the [main installation instructions](../../prerequisites/#install-a-firewall-and-only-whitelist-ssh-http-and-https-ports). If you have a multi-host setup, you must know how to secure internal traffic.
{{< /hint >}}

{{< hint style="danger" >}}
**Security warning:** ElasticSearch versions between `2.0` and `2.14.1` are affected by an [exploit](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228) in the `log4j` library. If affected, please refer to the [temporary mitigation](https://github.com/elastic/elasticsearch/issues/81618#issuecomment-991000240) from the ElasticSearch issue tracker.
{{< /hint >}}

To start ElasticSearch:

```bash
systemctl daemon-reload
systemctl enable --now elasticsearch
```

## Configuring Mastodon {#config}

Edit `.env.production` to add the following variables:

```bash
ES_ENABLED=true
ES_HOST=localhost
ES_PORT=9200
```

If you have multiple Mastodon servers on the same machine, and you are planning to use the same ElasticSearch installation for all of them, make sure that all of them have unique `REDIS_NAMESPACE` in their configurations, to differentiate the indices. If you need to override the prefix of the ElasticSearch indices, you can set `ES_PREFIX` directly.

After saving the new configuration, restart Mastodon processes for it to take effect:

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

Now it's time to create the ElasticSearch indices and fill them with data:

```bash
su - mastodon
cd live
RAILS_ENV=production bin/tootctl search deploy
```

## Search optimization for other languages
### Chinese search optimization {#chinese-search-optimization}

The default analyzer of the ElasticSearch is the standard analyzer, which may not be the best especially for Chinese. To improve search experience, you can install a language specific analyzer. Before creating the indices in ElasticSearch, install the following ElasticSearch extensions:

- [elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik)
- [elasticsearch-analysis-stconvert](https://github.com/medcl/elasticsearch-analysis-stconvert)

And then modify Mastodon's index definition as follows:

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

