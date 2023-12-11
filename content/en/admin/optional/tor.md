---
title: Onion services
description: Serving Mastodon through Tor onion services.
menu:
  docs:
    weight: 20
    parent: admin-optional
---

Mastodon can be served through Tor as an onion service. This will give you a `*.onion` address that can only be used while connected to the Tor network.

## Installing Tor {#install}

See the instructions provided by the Tor Project [here](https://support.torproject.org/apt/tor-deb-repo/).

## Configure Tor {#configure}

Edit the file at `/etc/tor/torrc` and add the following configuration.

```text
HiddenServiceDir /var/lib/tor/onion_service/
HiddenServiceSingleHopMode 1
HiddenServiceNonAnonymousMode 1
HiddenServicePort 80 127.0.0.1:80
```

Restart Tor.

```bash
sudo service tor restart
```

Your Tor hostname can now be found at `/var/lib/tor/onion_service/hostname`.

## Move your Mastodon configuration {#nginx}

We will need to tell Nginx about your Mastodon configuration twice. To keep things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) we need to move the Mastodon configuration into its own file that can be referenced.

Create a new file at `/etc/nginx/snippets/mastodon.conf`. Put all of your Mastodon configuration parameters in this file with the exception of the `listen`, `server_name`, `include` and all of the SSL options. Include an `Onion-Location` header to let supporting browsers know that this service is also accessible from Tor. Your new file may look something like this.

```nginx
add_header Referrer-Policy "same-origin";
add_header Onion-Location mastodon.qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion$request_uri;

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
  server_name mastodon.example.com;
  return 301 https://$server_name$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  list [::]:443 ssl http2;
  server_name mastodon.example.com;
  include /etc/nginx/snippets/mastodon.conf;

  ssl_certificate /etc/letsencrypt/live/mastodon.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mastodon.example.com/privkey.pem;
}
```

## Serve Tor over HTTP {#http}

This section assumes that you want to expose your instance on both Tor and the public Internet *simultaneously*.

While it may be tempting to serve your Tor version of Mastodon over HTTPS, it isn't always ideal. This option is mostly useful for large companies that can produce their own certificates with their own company information. There is no Certificate Authority (CA) that provides them [for free](https://community.torproject.org/onion-services/advanced/https/), and there is also [a blog post from the Tor Project](https://blog.torproject.org/facebook-hidden-services-and-https-certs) that explains why HTTPS certificates are not really beneficial for security. On the other hand, Mastodon uses a lot of redirects to the HTTPS version of your site, where the presence of a validated certificate may make it easier for your users to use your instance on Tor without having to manually remove the `https://` prefix in URLs.

In this section, we will go over how to serve your Mastodon instance over HTTP, but for Tor **only**. This can be added by prepending an additional configuration to your existing Nginx configuration.

```nginx
server {
  listen 80;
  server_name mastodon.qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion;
  include /etc/nginx/snippets/mastodon.conf;
}

server {
  listen 80;
  server_name mastodon.example.com;
  return 301 https://$server_name$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  list [::]:443 ssl http2;
  server_name mastodon.example.com;
  include /etc/nginx/snippets/mastodon.conf;

  ssl_certificate /etc/letsencrypt/live/mastodon.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mastodon.example.com/privkey.pem;
}
```

Also update `.env.production`:

```text
ALTERNATE_DOMAINS=mastodon.qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion
```

Replace the long hash provided here with your Tor domain located in the file at `/var/lib/tor/onion_service/hostname`. This should also be reflected in the `Onion-Location` header in the snippets file.

Note that the onion hostname has been prefixed with “mastodon.”. Your Tor address acts as a wildcard domain. All subdomains will be routed through this, and you can configure Nginx to respond to any subdomain you wish. If you do not wish to host any other services on your Tor address you can omit the subdomain, or choose a different subdomain.

Here you can see the payoff of moving your Mastodon configurations to a different file. Without this, all of your configurations would have to be copied to both places. Any change to your configuration would have to be made in both places.

Restart your web server.

```bash
service nginx restart
```

## Gotchas {#gotchas}

There are a few things you will need to understand.

- As mentioned earlier, certain URLs in the Mastodon frontend will force your users to a HTTPS URL. They will have to manually replace the URL with HTTP to continue.
- Various resources, such as images, will **still** be offered through your regular clearnet domain. This could possibly be a problem, depending on how cautious your users want, try or need to be.
