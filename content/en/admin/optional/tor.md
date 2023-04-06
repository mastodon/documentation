---
title: Hidden services
description: Serving Mastodon through TOR hidden services.
menu:
  docs:
    weight: 20
    parent: admin-optional
---

Mastodon can be served through Tor as an onion service. This will give you a `*.onion` address that can only be used while connected to the Tor network.

## Installing Tor {#install}

First Tor’s Debian archive needs to be added to apt.

```text
deb https://deb.torproject.org/torproject.org stretch main
deb-src https://deb.torproject.org/torproject.org stretch main
```

Next add the gpg key.

```bash
curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -
```

Finally install the required packages.

```bash
apt install tor deb.torproject.org-keyring
```

## Configure Tor {#configure}

Edit the file at `/etc/tor/torrc` and add the following configuration.

```text
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServiceVersion 3
HiddenServicePort 80 127.0.0.1:80
```

Restart tor.

```bash
sudo service tor restart
```

Your tor hostname can now be found at `/var/lib/tor/hidden_service/hostname`.

## Move your Mastodon configuration {#nginx}

We will need to tell Nginx about your Mastodon configuration twice. To keep things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) we need to move the Mastodon configuration into its own file that can be referenced.

Create a new file at `/etc/nginx/snippets/mastodon.conf`. Put all of your Mastodon configuration parameters in this file with the exception of the `listen`, `server_name`, `include` and all of the SSL options. Your new file may look something like this.

```nginx
add_header Referrer-Policy "same-origin";

keepalive_timeout    70;
sendfile             on;
client_max_body_size 80m;

root /home/mastodon/live/public;

# …

error_page 500 501 502 503 504 /500.html;

access_log /var/log/nginx/mastodon_access.log;
error_log /var/log/nginx/mastodon_error.log warn;
```

In place of your old Mastodon configuration add an include directive to this new configuration file.

Your Nginx configuration file will be left looking something like this.

```nginx
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

## Serve Tor over http {#http}

While it may be tempting to serve your Tor version of Mastodon over https it is not a good idea for most people. See [this](https://blog.torproject.org/facebook-hidden-services-and-https-certs) blog post from the Tor Project about why https certificates do not add value. Since you cannot get an SSL cert for an onion domain, you will also be plagued with certificate errors when trying to use your Mastodon instance. A Tor developer has more recently spelled out the reasons why serving a Tor service over https is not beneficial for most use cases [here](https://matt.traudt.xyz/posts/2017-12-02-dont-https-your-onions/).

The solution is to serve your Mastodon instance over http, but only for Tor. This can be added by prepending an additional configuration to your Nginx configuration.

```nginx
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

Note that the onion hostname has been prefixed with “mastodon.”. Your Tor address acts a wildcard domain. All subdomains will be routed through, and you can configure Nginx to respond to any subdomain you wish. If you do not wish to host any other services on your tor address you can omit the subdomain, or choose a different subdomain.

Here you can see the payoff of moving your mastodon configurations to a different file. Without this all of your configurations would have to be copied to both places. Any change to your configuration would have to be made both places.

Restart your web server.

```bash
service nginx restart
```

## Gotchas {#gotchas}

There are a few things you will need to be aware of. Certain redirects will push your users to https. They will have to manually replace the URL with http to continue.

Various resources, such as images, will still be offered through your regular non-Tor domain. How much of a problem this is will depend greatly on your user’s level of caution.

