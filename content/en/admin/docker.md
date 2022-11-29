---
title: Using Docker
description: How to run Mastodon with the included docker-compose.yml
menu:
  docs:
    parent: admin
    weight: 9999
---

We do not recommend admins use Docker Compose unless they have significant prior
experience running docker in production. In our experience helping hundreds of
admins troubleshoot and set up their server, there are many footguns and new
areas of complexity compared to the standard systemd workflow that the Mastodon
contributors are used to supporting.

If that's something you're comfortable with, lets get started.

## Setting up

Clone Mastodon's repository.
    
    # Clone mastodon to ~/live directory
    git clone https://github.com/mastodon/mastodon.git live
    # Change directory to ~/live
    cd ~/live
    # Checkout to the latest stable branch
    git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
    

Review the settings in `docker-compose.yml`. Note that it is **not default** to store the postgresql database and redis databases in a persistent storage location. If you plan on running your instance in production, you **must** uncomment the [`volumes` directive](https://github.com/mastodon/mastodon/blob/972f6bc861affd9bc40181492833108f905a04b6/docker-compose.yml#L7-L16) in `docker-compose.yml`.

## Getting the Mastodon image

### Using a prebuilt image

If you're not making any local code changes or customizations on your instance, you can use a prebuilt Docker image to avoid the time and resource consumption of a build. Images are available from Docker Hub: https://hub.docker.com/r/mastodon/mastodon/
    
To use the prebuilt images:

1. Open `docker-compose.yml` in your favorite text editor.
   1. Comment out the `build: .` lines for all images (web, streaming, sidekiq).
   2. Edit the `image: mastodon/mastodon` lines for all images to include the release you want. The default is `latest` which is the most recent stable version, however it recommended to explicitly pin a version: If you wanted to use v4.0.2 for example, you would edit the lines to say: `image: mastodon/mastodon:v4.0.2`
   3. Save the file and exit the text editor.
2. Run `cp .env.production.sample .env.production` to bootstrap the configuration. Edit the correct values now.
3. Run `docker-compose build`. It will now pull the correct image from Docker Hub.
4. Set correct file-owner with `sudo chown -R 991:991 public/system`

### Building your own image

You must build your own image if you've made any code modifications. To build your own image:

1. Open `docker-compose.yml` in your favorite text editor.
   1. Uncomment the `build: .` lines for all images (web, streaming, sidekiq) if needed.
   2. Save the file and exit the text editor.
2. Run `cp .env.production.sample .env.production` to bootstrap the configuration. Edit the correct values now.
3. Run `docker-compose build`.
4. Set correct file-owner with `chown -R 991:991 public`

## Building the app

Now the image can be used to generate a configuration with:

    docker-compose run --rm web bundle exec rake mastodon:setup

This is an interactive wizard that will guide you through the basic and necessary options and generate new app secrets. At some point it will output your configuration, copy and paste that configuration into the `.env.production` file.

The wizard will setup the database schema and precompile assets. After it's done, you can launch Mastodon with:

    docker-compose up -d

## Automatic nginx Configuration in Docker

You need to configure [nginx](http://nginx.org) to serve your [Mastodon](https://github.com/mastodon/mastodon/) instance using TLS.

If you prefer to run nginx within docker as well, follow these instructions, otherwise skip to [Manual nginx configuration](#manual-nginx-configuration-on-host) below.

We will use [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy) as an automated ingress proxy, and [acme-companion](https://github.com/nginx-proxy/acme-companion) as an automated certificate manager.

**Reminder: Replace all occurrences of example.com with your own instance's domain or sub-domain.**

Add the following under `web:` in docker-compose.yml

    environment:
        VIRTUAL_HOST: example.com
        LETSENCRYPT_HOST: example.com
        VIRTUAL_PORT: 3000

Restart the containers:

    docker-compose down
    docker-compose up -d

Run nginx proxy and bind to ports 80 and 443 (for http and https):

    docker run --detach \
        --name nginx-proxy \
        --publish 80:80 \
        --publish 443:443 \
        --volume certs:/etc/nginx/certs \
        --volume vhost:/etc/nginx/vhost.d \
        --volume html:/usr/share/nginx/html \
        --volume /var/run/docker.sock:/tmp/docker.sock:ro \
        nginxproxy/nginx-proxy

Run the nginx-proxy-acme-companion. This container automatically creates and renews TLS certificates:

**Reminder: Replace the email address with your email.**

    docker run --detach \
        --name nginx-proxy-acme \
        --volumes-from nginx-proxy \
        --volume /var/run/docker.sock:/var/run/docker.sock:ro \
        --volume acme:/etc/acme.sh \
        --env "DEFAULT_EMAIL=mail@example.com" \
        nginxproxy/acme-companion

Now connect these containers to your Mastodon external network:

    docker network connect mastodon_external_network nginx-proxy
    docker network connect mastodon_external_network nginx-proxy-acme

After a few minutes, your instance should be available at the domain specified with a valid LetsEncrypt certificate.

## Manual nginx Configuration on Host

Given a system with nginx installed.

**Reminder: Replace all occurrences of example.com with your own instance's domain or sub-domain.**

`cd` to `/etc/nginx/sites-available` and open a new file:

`nano /etc/nginx/sites-available/example.com.conf`

Copy and paste the following and make edits as necessary:

```nginx
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 80;
  listen [::]:80;
  server_name example.com;
  root /home/mastodon/live/public;
  # Useful for Let's Encrypt
  location /.well-known/acme-challenge/ { allow all; }
  location / { return 301 https://$host$request_uri; }
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name example.com;

  ssl_protocols TLSv1.2;
  ssl_ciphers HIGH:!MEDIUM:!LOW:!aNULL:!NULL:!SHA;
  ssl_prefer_server_ciphers on;
  ssl_session_cache shared:SSL:10m;

  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  keepalive_timeout    70;
  sendfile             on;
  client_max_body_size 80m;

  root /home/mastodon/live/public;

  gzip on;
  gzip_disable "msie6";
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

  add_header Strict-Transport-Security "max-age=31536000";

  location / {
    try_files $uri @proxy;
  }

  location ~ ^/(emoji|packs|system/accounts/avatars|system/media_attachments/files) {
    add_header Cache-Control "public, max-age=31536000, immutable";
    try_files $uri @proxy;
  }
  
  location /sw.js {
    add_header Cache-Control "public, max-age=0";
    try_files $uri @proxy;
  }

  location @proxy {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Proxy "";
    proxy_pass_header Server;

    proxy_pass http://127.0.0.1:3000;
    proxy_buffering off;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    tcp_nodelay on;
  }

  location /api/v1/streaming {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Proxy "";

    proxy_pass http://127.0.0.1:4000;
    proxy_buffering off;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    tcp_nodelay on;
  }

  error_page 500 501 502 503 504 /500.html;
}
```

Activate the [nginx](http://nginx.org) configuration added:

```sh
cd /etc/nginx/sites-enabled
ln -s ../sites-available/example.com.conf
```

This configuration makes the assumption you are using [Let's Encrypt](https://letsencrypt.org) as your TLS certificate provider.

**If you are going to be using Let's Encrypt as your TLS certificate provider, see the
next sub-section. If not edit the `ssl_certificate` and `ssl_certificate_key` values
accordingly.**

## Let's Encrypt

This section is only relevant if you are using [Let's Encrypt](https://letsencrypt.org/)
as your TLS certificate provider.

### Generation Of The Certificate

We need to generate Let's Encrypt certificates.

**Make sure to replace any occurrence of 'example.com' with your Mastodon instance's domain.**

Make sure that [nginx](http://nginx.org) is stopped at this point:

```sh
systemctl stop nginx
```

We will be creating the certificate twice, once with TLS SNI validation in standalone mode and the second time we will be using the webroot method. This is required due to the way
[nginx](http://nginx.org) and the [Let's Encrypt](https://letsencrypt.org/) tool works.

```sh
certbot certonly --standalone -d example.com
```

After that successfully completes, we will use the webroot method. This requires [nginx](http://nginx.org) to be running:

```sh
systemctl start nginx
# The certbot tool will ask if you want to keep the existing certificate or renew it. Choose to renew it.
certbot certonly --webroot -d example.com -w /home/mastodon/live/public/
```

### Automated Renewal Of Let's Encrypt Certificate

[Let's Encrypt](https://letsencrypt.org/) certificates have a validity period of 90 days.

You need to renew your certificate before the expiration date. Not doing so will make users of your instance unable to access the instance and users of other instances unable to federate with yours.

We can create a cron job that runs daily to do this:

```sh
nano /etc/cron.daily/letsencrypt-renew
```

Copy and paste this script into that file:

```sh
#!/usr/bin/env bash
certbot renew
systemctl reload nginx
```

Save and exit the file.

Make the script executable and restart the cron daemon so that the script runs daily:

```sh
chmod +x /etc/cron.daily/letsencrypt-renew
systemctl restart cron
```

That is it. Your server will renew your [Let's Encrypt](https://letsencrypt.org/) certificate.
