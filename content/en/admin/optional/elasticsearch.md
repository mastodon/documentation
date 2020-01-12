---
title: Full-text search
description: Setting up ElasticSearch to search for statuses authored, favourited, or mentioned in.
menu:
  docs:
    weight: 10
    parent: admin-optional
---

Mastodon supports full-text search when it ElasticSearch is available. Mastodon’s full-text search allows logged in users to find results from their own toots, their favourites, and their mentions. It deliberately does not allow searching for arbitrary strings in the entire database.

## Installing ElasticSearch {#install}

ElasticSearch requires a Java runtime. If you don’t have Java already installed, do it now. Assuming you are logged in as `root`:

```bash
apt install openjdk-8-jre-headless
```

Add the official ElasticSearch repository to apt:

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-6.x.list
apt update
```

Now you can install ElasticSearch:

```bash
apt install elasticsearch
```

{{< hint style="warning" >}}
**Security warning:** By default, ElasticSearch is supposed to bind to localhost only, i.e. be inaccessible from the outside network. You can check which address ElasticSearch binds to by looking at `network.host` within `/etc/elasticsearch/elasticsearch.yml`. Consider that anyone who can access ElasticSearch can access and modify any data within it, as there is no authentication layer. So it’s really important that the access is secured. Having a firewall that only exposes the 22, 80 and 443 ports is advisable, as outlined in the [main installation instructions](). If you have a multi-host setup, you must know how to secure internal traffic.
{{< /hint >}}

To start ElasticSearch:

```bash
systemctl enable elasticsearch
systemctl start elasticsearch
```

## Configuring Mastodon {#config}

Edit `.env.production` to add the following variables:

```bash
ES_ENABLED=true
ES_HOST=localhost
ES_PORT=9200
```

If you have multiple Mastodon servers on the same machine, and you are planning to use the same ElasticSearch installation for all of them, make sure that all of them have unique `REDIS_NAMESPACE` in their configurations, to differentiate the indices. If you need to override the prefix of the ElasticSearch index, you can set `ES_PREFIX` directly.

After saving the new configuration, create the index in ElasticSearch with:

```bash
RAILS_ENV=production bundle exec rake chewy:upgrade
```

Then restart Mastodon processes for the new configuration to take effect:

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

Now new statuses will be written to the ElasticSearch index. The last step is importing all of the old data as well. This might take a long while:

```bash
RAILS_ENV=production bundle exec rake chewy:sync
```

{{< hint style="warning" >}}
**Compatibility note:** There is a known bug in Ruby 2.6.0 that prevents the above task from working. Other versions of Ruby, such as 2.6.1, are fine.
{{< /hint >}}

