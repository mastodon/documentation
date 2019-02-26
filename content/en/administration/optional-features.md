---
title: Optional features
description: How to enable Mastodon's optional features
menu:
  docs:
    parent: administration
    weight: 5
---

## Full-text search

Mastodon supports full-text search when it ElasticSearch is available. Mastodon's full-text search allows logged in users to find results from their own toots, their favourites, and their mentions. It deliberately does not allow searching for arbitrary strings in the entire database.

### Install ElasticSearch

ElasticSearch requires a Java runtime. If you don't have Java already installed, do it now. Assuming you are logged in as `root`:

    apt install openjdk-8-jre-headless

Add the official ElasticSearch repository to apt:

    wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
    echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-6.x.list
    apt update

Now you can install ElasticSearch:

    apt install elasticsearch

> **Security warning:** By default, ElasticSearch is supposed to bind to localhost only, i.e. be inaccessible from the outside network. You can check which address ElasticSearch binds to by looking at `network.host` within `/etc/elasticsearch/elasticsearch.yml`. Consider that anyone who can access ElasticSearch can access and modify any data within it, as there is no authentication layer. So it's really important that the access is secured. Having a firewall that only exposes the 22, 80 and 443 ports is advisable, as outlined in the [main installation instructions]({{< relref "installation.md" >}}). If you have a multi-host setup, you must know how to secure internal traffic.

To start ElasticSearch:

    systemctl enable elasticsearch
    systemctl start elasticsearch

### Setup Mastodon

Edit `.env.production` to add the following variables:

```bash
ES_ENABLED=true
ES_HOST=localhost
ES_PORT=9200
```

If you have multiple Mastodon servers on the same machine, and you are planning to use the same ElasticSearch installation for all of them, make sure that all of them have unique `REDIS_NAMESPACE` in their configurations, to differentiate the indices. If you need to override the prefix of the ElasticSearch index, you can set `ES_PREFIX` directly.

After saving the new configuration, create the index in ElasticSearch with:

    RAILS_ENV=production bundle exec rake chewy:upgrade

Then restart Mastodon processes for the new configuration to take effect:

    systemctl restart mastodon-sidekiq
    systemctl reload mastodon-web

Now new statuses will be written to the ElasticSearch index. The last step is importing all of the old data as well. This might take a long while:

    RAILS_ENV=production bundle exec rake chewy:sync

> **Compatibility note:** There is a known bug in Ruby 2.6.0 that prevents the above task from working. Other versions of Ruby, such as 2.6.1, are fine.

## Hidden services

Mastodon can be served through Tor as an onion service. This will give you a *.onion address that can only be used while connected to the Tor network.

### Installing Tor

First Tor's Debian archive needs to be added to apt.

```
deb https://deb.torproject.org/torproject.org stretch main
deb-src https://deb.torproject.org/torproject.org stretch main
```

Next add the gpg key.

```bash
curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
```

Finally install the required packages.

```bash
apt install tor deb.torproject.org-keyring
```

### Configure Tor

Edit the file at `/etc/tor/torrc` and add the following configuration.

```bash
HiddenServiceDir /var/lib/tor/mastodon/
HiddenServiceVersion 3
HiddenServicePort 80 127.0.0.1:80
```

Restart tor.

```bash
sudo service tor restart
```

Your tor hostname can now be found at `/var/lib/tor/mastodon/hostname`. This will work _if_ you are serving Mastodon over port 80 and _if_ it is the only site you are serving on your web server.

### Configuring a multi-host server

If you have multiple domains on your web server you will need to tell your web server how to serve the tor hostname. In the configuration file for your Mastodon web configuration add an additional hostname entry. e.g. for Nginx

```bash
server {
  …
  servername mastodon.myhosting.com qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion
  …
}
```

### Serve Tor over http

While it may be tempting to serve your Tor version of Mastodon over https it is not good idea. See [this](https://blog.torproject.org/facebook-hidden-services-and-https-certs) blog post from the Tor Project about why https certificates do not add value. Since you cannot get an SSL cert for an onion domain, you will also be plagued with certificate errors when trying to use your Mastodon instance.

The solution is to serve your Mastodon instance over http, but only for Tor.

Consider the following example Nginx configuration.

```
server {
  listen 80;
  server_name mastodon.myhosting.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name mastodon.myhomsting.com;
  …
}
```

Add a new server entry that duplicates the ssl entry, but defines it to use port 80 with your onion hostname.

```
server {
  listen 80;
  server_name mastodon.myhosting.com;
  return 301 https://$host$request_uri;
}

server {
  listen 80;
  server_name qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion;
  …
}

server {
  listen 443 ssl http2;
  server_name mastodon.myhosting.com;
  …
}
```

Restart your web server.

```bash
service nginx restart
```

You can also see [this Server Fault](https://serverfault.com/a/373661) answer for a more [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) solution.

## Login via LDAP/PAM/CAS/SAML

TODO

