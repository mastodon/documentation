# Mastodon Production Guide

**Disclaimer:**

This guide was written for [Ubuntu Server 16.04](https://www.ubuntu.com/server), you may run into issues if you are using another operating system. We are welcoming contributions for guides to other distributions.

This document is also written with the expectation that you have a technical level high enough to administrate Linux servers.

## What is this guide?

This guide is a walk through of the setup process of a [Mastodon](https://github.com/tootsuite/mastodon/) instance.

We use example.com to represent a domain or sub-domain. Example.com should be replaced with your instance domain or sub-domain.

## Prerequisites

You will need the following for this guide:

- A server running [Ubuntu Server 16.04](https://www.ubuntu.com/server).
- Root access to the server.
- A domain or sub-domain to use for the instance.

## DNS

DNS records should be added before anything is done on the server.

The records added are:

-  A record (IPv4 address) for example.com
-  AAAA record (IPv6 address) for example.com

> ### A Helpful And Optional Note
>
> Using `tmux` when following through with this guide will be helpful.
>
>
> Not only will this help you not lose your place if you are disconnected, it will let you have multiple terminal windows open for switching contexts (root user versus the mastodon user).
>
> You can install [tmux](https://github.com/tmux/tmux/wiki) from the package manager:
>
> ```sh
> apt -y install tmux
> ```

## Dependency Installation

All dependencies should be installed as root.

### node.js Repository

You will need to add an external repository so we can have the version of [node.js](https://nodejs.org/en/) required.

We run this script to add the repository:

```sh
apt -y install curl
curl -sL https://deb.nodesource.com/setup_6.x | bash -
```

The [node.js](https://nodejs.org/en/) repository is now added.

###  Yarn Repository

Another repository needs to be added so we can get the version of [Yarn](https://yarnpkg.com/en/) used by [Mastodon](https://github.com/tootsuite/mastodon/).

This is how you add the repository:

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt update
```

### Various Other Dependencies

Now you need to install [Yarn](https://yarnpkg.com/en/) plus some more software.

#### Explanation of the dependencies

- imagemagick - Mastodon uses imagemagick for image related operations
- ffmpeg - Mastodon uses ffmpeg for conversion of GIFs to MP4s
- libprotobuf-dev and protobuf-compiler - Mastodon uses these for language detection
- nginx - nginx is our frontend web server
- redis-* - Mastodon uses redis for its in-memory data structure store
- postgresql-* - Mastodon uses PostgreSQL as it's SQL database
- nodejs - Node is used for Mastodon's streaming API
- yarn - Yarn is a Node.js package manager
- Other -dev packages, g++ - these are needed for the compilation of Ruby using ruby-build.

```sh
apt -y install imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git-core g++ libprotobuf-dev protobuf-compiler pkg-config nodejs gcc autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev nginx redis-server redis-tools postgresql postgresql-contrib letsencrypt yarn libidn11-dev libicu-dev
```

### Dependencies That Need To Be Added As A Non-Root User

Let us create this user first:

```sh
adduser mastodon
```

Log in as the `mastodon` user:


```sh
sudo su - mastodon
```

We will need to set up [`rbenv`](https://github.com/rbenv/rbenv) and [`ruby-build`](https://github.com/rbenv/ruby-build):

```sh
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
# Restart shell
exec bash
# Check if rbenv is correctly installed
type rbenv
# Install ruby-build as rbenv plugin
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

Now that [`rbenv`](https://github.com/rbenv/rbenv) and [`ruby-build`](https://github.com/rbenv/ruby-build) are installed, we will install the
[Ruby](https://www.ruby-lang.org/en/) version which [Mastodon](https://github.com/tootsuite/mastodon/) uses. That version will also need to be enabled.

To enable [Ruby](https://www.ruby-lang.org/en/), run:

```sh
rbenv install 2.4.1
rbenv global 2.4.1
```

**This will take some time. Go stretch for a bit and drink some water while the commands run.**

### node.js And Ruby Dependencies

Now that [Ruby](https://www.ruby-lang.org/en/) is enabled, we will clone the [Mastodon git repository](https://github.com/tootsuite/mastodon/) and install the [Ruby](https://www.ruby-lang.org/en/) and [node.js](https://nodejs.org/en/) dependancies.

Run the following to clone and install:

```sh
# Return to mastodon user's home directory
cd ~
# Clone the mastodon git repository into ~/live
git clone https://github.com/tootsuite/mastodon.git live
# Change directory to ~live
cd ~/live
# Checkout to the latest stable branch
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
# Install bundler
gem install bundler
# Use bundler to install the rest of the Ruby dependencies
bundle install --deployment --without development test
# Use yarn to install node.js dependencies
yarn install --pure-lockfile
```

That is all we need to do for now with the `mastodon` user, you can now `exit` back to root.

## PostgreSQL Database Creation

[Mastodon](https://github.com/tootsuite/mastodon/) requires access to a [PostgreSQL](https://www.postgresql.org) instance.

Create a user for a [PostgreSQL](https://www.postgresql.org) instance:

```
# Launch psql as the postgres user
sudo -u postgres psql

# In the following prompt
CREATE USER mastodon CREATEDB;
\q
```

**Note** that we do not set up a password of any kind, this is because we will be using ident authentication. This allows local users to access the database without a password.

## nginx Configuration

You need to configure [nginx](http://nginx.org) to serve your [Mastodon](https://github.com/tootsuite/mastodon/) instance.

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
  client_max_body_size 0;

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
letsencrypt certonly --standalone -d example.com
```

After that successfully completes, we will use the webroot method. This requires [nginx](http://nginx.org) to be running:

```sh
systemctl start nginx
# The letsencrypt tool will ask if you want issue a new cert, please choose that option
letsencrypt certonly --webroot -d example.com -w /home/mastodon/live/public/
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
letsencrypt renew
systemctl reload nginx
```

Save and exit the file.

Make the script executable and restart the cron daemon so that the script runs daily:

```sh
chmod +x /etc/cron.daily/letsencrypt-renew
systemctl restart cron
```

That is it. Your server will renew your [Let's Encrypt](https://letsencrypt.org/) certificate.

## Mastodon Application Configuration

We will configure the Mastodon application.

For this we will switch to the `mastodon` system user:


```sh
sudo su - mastodon
```

Change directory to `~live` and edit the [Mastodon](https://github.com/tootsuite/mastodon/) application configuration:

```sh
cd ~/live
cp .env.production.sample .env.production
nano .env.production
```

For the purposes of this guide, these are the values to be edited:

```
# Your Redis host
REDIS_HOST=127.0.0.1
# Your Redis port
REDIS_PORT=6379
# Your PostgreSQL host
DB_HOST=/var/run/postgresql
# Your PostgreSQL user
DB_USER=mastodon
# Your PostgreSQL DB name
DB_NAME=mastodon_production
# Leave DB password empty
DB_PASS=
# Your DB_PORT
DB_PORT=5432

# Your instance's domain
LOCAL_DOMAIN=example.com
# We have HTTPS enabled
LOCAL_HTTPS=true

# Application secrets
# Generate each with `RAILS_ENV=production bundle exec rake secret`
PAPERCLIP_SECRET=
SECRET_KEY_BASE=
OTP_SECRET=

# Web Push VAPID keys
# Generate with `RAILS_ENV=production bundle exec rake mastodon:webpush:generate_vapid_key`
VAPID_PRIVATE_KEY=
VAPID_PUBLIC_KEY=

# All SMTP details, Mailgun and Sparkpost have free tiers
SMTP_SERVER=
SMTP_PORT=
SMTP_LOGIN=
SMTP_PASSWORD=
SMTP_FROM_ADDRESS=
```

We now need to set up the [PostgreSQL](https://www.postgresql.org) database for the first time:

```sh
RAILS_ENV=production bundle exec rails db:setup
```

Then we will need to precompile all CSS and JavaScript files:

```sh
RAILS_ENV=production bundle exec rails assets:precompile
```

**The assets precompilation takes a couple minutes, so this is a good time to take another break.**

## Mastodon systemd Service Files

We will need three [systemd](https://github.com/systemd/systemd) service files for each Mastodon service.

Now switch back to the root user.

For the [Mastodon](https://github.com/tootsuite/mastodon/) web workers service place the following in `/etc/systemd/system/mastodon-web.service`:

```
[Unit]
Description=mastodon-web
After=network.target

[Service]
Type=simple
User=mastodon
WorkingDirectory=/home/mastodon/live
Environment="RAILS_ENV=production"
Environment="PORT=3000"
ExecStart=/home/mastodon/.rbenv/shims/bundle exec puma -C config/puma.rb
ExecReload=/bin/kill -SIGUSR1 $MAINPID
TimeoutSec=15
Restart=always

[Install]
WantedBy=multi-user.target
```

For [Mastodon](https://github.com/tootsuite/mastodon/) background queue service, place the following in `/etc/systemd/system/mastodon-sidekiq.service`:

```
[Unit]
Description=mastodon-sidekiq
After=network.target

[Service]
Type=simple
User=mastodon
WorkingDirectory=/home/mastodon/live
Environment="RAILS_ENV=production"
Environment="DB_POOL=5"
ExecStart=/home/mastodon/.rbenv/shims/bundle exec sidekiq -c 5 -q default -q mailers -q pull -q push
TimeoutSec=15
Restart=always

[Install]
WantedBy=multi-user.target
```

For the [Mastodon](https://github.com/tootsuite/mastodon/) streaming API service place the following in `/etc/systemd/system/mastodon-streaming.service`:

```
[Unit]
Description=mastodon-streaming
After=network.target

[Service]
Type=simple
User=mastodon
WorkingDirectory=/home/mastodon/live
Environment="NODE_ENV=production"
Environment="PORT=4000"
ExecStart=/usr/bin/npm run start
TimeoutSec=15
Restart=always

[Install]
WantedBy=multi-user.target
```

Now you need to enable all of these services:

```sh
systemctl enable /etc/systemd/system/mastodon-*.service
```

Now start the services:

```sh
systemctl start mastodon-*.service
```

Check that they are properly running:

```sh
systemctl status mastodon-*.service
```

That is all! If everything was done correctly, a [Mastodon](https://github.com/tootsuite/mastodon/) instance will appear when you visit `https://example.com` in a web browser.

Congratulations and welcome to the fediverse!
