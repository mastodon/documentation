---
title: Configuring full-text search
description: Setting up Elasticsearch to search for statuses (authored, favourited, or mentioned), public indexable status, and accounts
aliases:
- /admin/optional/elasticsearch
menu:
  docs:
    weight: 40
    parent: admin
---

Mastodon supports full-text search when Elasticsearch is available. It is strongly recommended to configure this feature.

Mastodon’s full-text search allows logged-in users to find results from:
- public statuses from accounts that opted into appearing in search results
- their own statuses
- their mentions
- their favourites
- their bookmarks
- accounts (display name, usernames and bios)

It deliberately does not allow searching for arbitrary strings in the entire database.

## Installing Elasticsearch {#install}

{{< hint style="info" >}}
Mastodon is tested with Elasticsearch version 7. It should support OpenSearch, as well as Elasticsearch versions 6 and 8, but those setups are not officially supported.
{{< /hint >}}

Elasticsearch requires a Java runtime. If you don’t have Java already installed, do it now. Assuming you are logged in as `root`:

```bash
apt install openjdk-17-jre-headless
```

Add the official Elasticsearch repository to apt:

```bash
wget -O /usr/share/keyrings/elasticsearch.asc https://artifacts.elastic.co/GPG-KEY-elasticsearch
echo "deb [signed-by=/usr/share/keyrings/elasticsearch.asc] https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list
```

Now you can install Elasticsearch:

```bash
apt update
apt install elasticsearch
```

{{< hint style="warning" >}}
**Security warning:** By default, Elasticsearch is supposed to bind to localhost only, i.e. be inaccessible from the outside network. You can check which address Elasticsearch binds to by looking at `network.host` within `/etc/elasticsearch/elasticsearch.yml`. Consider that anyone who can access Elasticsearch can access and modify any data within it, as there is no authentication layer. So it’s really important that the access is secured. Having a firewall that only exposes the 22, 80 and 443 ports is advisable, as outlined in the [main installation instructions](../../prerequisites/#install-a-firewall-and-only-whitelist-ssh-http-and-https-ports). If you have a multi-host setup, you must know how to secure internal traffic.
{{< /hint >}}

To start Elasticsearch:

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
ES_PRESET= # single_node_cluster, small_cluster or large_cluster
# ES_USER=
# ES_PASS=
```

_Note_: If using TLS, prepend the hostname with `https://`. For example: `https://elastic.example.com`.

### Choosing the correct preset

The value for `ES_PRESET` depends on the size of your Elasticsearch and will be used to set the number of shards and replicas for your indices to the best value for your setup:
- `single_node_cluster` if you only have one node in your Elasticsearch cluster. Indices will be configured without any replica
- `small_cluster` if you have less than 6 nodes in your cluster. Indices will be configured with 1 replica
- `large_cluster` if you have 6 or more nodes in your cluster. Indices will be configured with more shards than with the `small_cluster` setting, to allow them to be distributed over more nodes

If you have multiple Mastodon servers on the same machine, and you are planning to use the same Elasticsearch installation for all of them, make sure that all of them have unique `REDIS_NAMESPACE` in their configurations, to differentiate the indices. If you need to override the prefix of the Elasticsearch indices, you can set `ES_PREFIX` directly.

### Security

By default, Elasticsearch does not handle any authentication and every request is made with full admin permission. We strongly advise you to configure Elasticsearch security features on your cluster.

To configure it, please refer [to the official documentation](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/security-minimal-setup.html). It will guide you through:
- Enabling the security features (`xpack.security.enabled: true`)
- Creating passwords for built-in users

Once done, you can create a custom role for Mastodon to connect.

For example (please adapt this snippet to use your Elastic admin password):

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

[Elasticsearch documentation for role creation](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/security-api-put-role.html)

Once the role is created, you can create a user for the Mastodon server to use, and assign it the role.

For example (please adapt this snippet to use your Elastic admin password, and customize your new user `mastodon` user password):

```sh
curl -X POST -u elastic:admin_password "localhost:9200/_security/user/mastodon?pretty" -H 'Content-Type: application/json' -d'
{
  "password" : "l0ng-r4nd0m-p@ssw0rd",
  "roles" : ["mastodon_full_access"]
}
'
```

[Elasticsearch documentation for user creation](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/security-api-put-user.html)

Once this is done, you need to configure Mastodon to use the credentials for your newly created user.

In `.env.production`, adjust your configuration:

```bash
ES_USER=mastodon
ES_PASS=l0ng-r4nd0m-p@ssw0rd
```

You are all set, and your Elasticsearch server should be much more secure!

### Populate the indices

After saving the new configuration, restart Mastodon processes for it to take effect:

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

Now it's time to create the Elasticsearch indices and fill them with data:

```bash
su - mastodon
cd live
RAILS_ENV=production bin/tootctl search deploy
```

## Search optimization for other languages
### Chinese search optimization {#chinese-search-optimization}

The standard analyzer is the default for Elasticsearch, but for some languages like Chinese it may not be the optimal choice. To enhance the search experience, consider installing a language-specific analyzer. Before creating indices in Elasticsearch, be sure to install the following extensions:

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
