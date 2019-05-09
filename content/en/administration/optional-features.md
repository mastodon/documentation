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
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServiceVersion 3
HiddenServicePort 80 127.0.0.1:80
```

Restart tor.

```bash
sudo service tor restart
```

Your tor hostname can now be found at `/var/lib/tor/hidden_service/hostname`.

### Move your Mastodon configuration

We will need to tell Nginx about your Mastodon configuration twice. To keep things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) we need to move the Mastodon configuration into its own file that can be referenced.

Create a new file at `/etc/nginx/snippets/mastodon.conf`. Put all of your Mastodon configuration parameters in this file with the exception of the `listen`, `server_name`, `include` and all of the SSL options. Your new file may look something like this.

```
add_header Referrer-Policy "same-origin";

keepalive_timeout    70;
sendfile             on;
client_max_body_size 80m;

root /home/mastodon/live/public;
…
error_page 500 501 502 503 504 /500.html;

access_log /var/log/nginx/mastodon_access.log;
error_log /var/log/nginx/mastodon_error.log warn;
```

In place of your old Mastodon configuration add an include directive to this new configuration file.

Your Nginx configuration file will be left looking something like this.

```
server {
  listen 80;
  server_name mastodon.myhosting.com;
  return 301 https://$server_name$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  list [::]:443 ssl http2;
  server_name mastodon.myhosting.com;
  include /etc/nginx/snippets/mastodon.conf;

  ssl_certificate /etc/letsencrypt/live/mastodon.myhosting.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mastodon.myhosting.com/privkey.pem;
}
```

### Serve Tor over http

While it may be tempting to serve your Tor version of Mastodon over https it is not a good idea for most people. See [this](https://blog.torproject.org/facebook-hidden-services-and-https-certs) blog post from the Tor Project about why https certificates do not add value. Since you cannot get an SSL cert for an onion domain, you will also be plagued with certificate errors when trying to use your Mastodon instance. A Tor developer has more recently spelled out the reasons why serving a Tor service over https is not beneficial for most use cases [here](https://matt.traudt.xyz/p/o44SnkW2.html).

The solution is to serve your Mastodon instance over http, but only for Tor. This can be added by pre-pending an additional configuration to your Nginx configuration.

```
server {
  listen 80;
  server_name mastodon.qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion;
  include /etc/nginx/snippets/mastodon.conf;
}

server {
  listen 80;
  server_name mastodon.myhosting.com;
  return 301 https://$server_name$request_uri;
}
 
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  list [::]:443 ssl http2;
  server_name mastodon.myhosting.com;
  include /etc/nginx/snippets/mastodon.conf;

  ssl_certificate /etc/letsencrypt/live/mastodon.myhosting.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mastodon.myhosting.com/privkey.pem;
}
```

Replace the long hash provided here with your Tor domain located in the file at `/var/lib/tor/hidden_service/hostname`.

Note that the onion hostname has been prefixed with "mastodon.". Your Tor address acts a wildcard domain. All subdomains will be routed through, and you can configure Nginx to respond to any subdomain you wish. If you do not wish to host any other services on your tor address you can omit the subdomain, or choose a different subdomain.

Here you can see the payoff of moving your mastodon configurations to a different file. Without this all of your configurations would have to be copied to both places. Any change to your configuration would have to be made both places.

Restart your web server.

```bash
service nginx restart
```

### Gotchas

There are a few things you will need to be aware of. Certain redirects will push your users to https.  They will have to manually replace the URL with http to continue.

Various resources, such as images, will still be offered through your regular non-Tor domain. How much of a problem this is will depend greatly on your user's level of caution.

## Login via LDAP/PAM/CAS/SAML

TODO

