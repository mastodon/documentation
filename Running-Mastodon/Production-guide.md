Production guide
================

The following HTTP headers are already set internally and should not be set again:

```
'Server'                 => 'Mastodon',
'X-Frame-Options'        => 'DENY',
'X-Content-Type-Options' => 'nosniff',
'X-XSS-Protection'       => '1; mode=block',
```

## Nginx

Regardless of whether you go with the Docker approach or not, here is an example Nginx server configuration.

At a minimum, you'll want to replace any occurrence of `example.com` with your actual hostname, and `/home/mastodon/live/public` with the location of your actual mastodon `public/` directory.

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

  location ~ ^/(packs|system/media_attachments/files|system/accounts/avatars) {
    add_header Cache-Control "public, max-age=31536000, immutable";
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

## Running in production without Docker

It is recommended to create a special user for mastodon on the server (you could call the user `mastodon`), though remember to disable outside login for it. You should only be able to get into that user through `sudo -sHu mastodon`.

This command will create the user as needed:

    sudo useradd --system --user-group --shell /bin/false --create-home --home /home/mastodon mastodon

home can be changed as needed


## General dependencies

### Ubuntu / Debian

    sudo apt-get install imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev libreadline-dev file git curl build-essential libprotobuf-dev protobuf-compiler pkg-config
    curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update
    sudo apt-get install nodejs yarn

* **NOTE**: On Debian you have to first add the [Debian Backports](https://backports.debian.org/) repository to install `ffmpeg`.

### CentOS / RHEL

    sudo yum install libxml2-devel ImageMagick libxslt-devel readline-devel git curl file protobuf-compiler protobuf-devel
    sudo yum -y install epel-release
    sudo rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
    sudo rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
    sudo yum -y install ffmpeg ffmpeg-devel

    sudo yum group install "Development tools"
    curl -sL https://rpm.nodesource.com/setup_6.x | sudo bash -
    sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
    sudo yum install nodejs yarn

## Redis

### Ubuntu / Debian

    sudo apt-get install redis-server redis-tools

### CentOS / RHEL

    sudo yum install redis rubygem-redis

## Postgres

### Ubuntu / Debian

    sudo apt-get install postgresql postgresql-contrib

### CentOS / RHEL

    sudo yum install postgresql-server postgresql postgresql-contrib postgresql-devel

Initial Setup postgres:

    sudo postgresql-setup initdb
    sudo systemctl start postgresql
    sudo systemctl enable postgresql

### All Operating Systems:

Set up a user and database for Mastodon:

    sudo -u postgres psql

In the prompt:

    CREATE USER mastodon CREATEDB;
    \q

### Ubuntu 16.04

Under Ubuntu 16.04, you will need to explicitly enable ident authentication so that local users can connect to the database without a password:

```sh
    sudo sed -i '/^local.*postgres.*peer$/a host    all     all     127.0.0.1/32    ident' /etc/postgresql/9.?/main/pg_hba.conf
```

and install an ident daemon, which does not come installed by default:

    sudo apt-get install pidentd
    sudo systemctl enable pidentd
    sudo systemctl start pidentd
    sudo systemctl restart postgresql

### Debian 8

Under Debian 8, the default version of nginx available is too old to work with the above configuration file (as it uses http2). To install a newer version of nginx that supports http2 (v1.9.5+), you have to add the jessie-backports repo to your `sources.list.d`:

```bash
$ echo "deb http://ftp.debian.org/debian/ jessie-backports main" | sudo tee /etc/apt/sources.list.d/backports.list
$ sudo apt-get update
$ sudo apt-get install -t jessie-backports nginx
```

## Rbenv

It is recommended to use rbenv (exclusively from the `mastodon` user) to install the desired Ruby version. Follow the guides to [install rbenv][1] and [rbenv-build][2] (I recommend checking the [prerequisites][3] for your system on the rbenv-build project and installing them beforehand, obviously outside the unprivileged `mastodon` user)

[1]: https://github.com/rbenv/rbenv#installation
[2]: https://github.com/rbenv/ruby-build#installation
[3]: https://github.com/rbenv/ruby-build/wiki#suggested-build-environment

Then once `rbenv` is ready, install and enable the Ruby version for Mastodon using:

```
rbenv install 2.4.1
rbenv global 2.4.1
```

## Git

You need the `git-core` package installed on your system. If it is so, run the shell from the `mastodon` user:

    sudo -sHu mastodon

And enter the following commands:

    cd ~
    git clone https://github.com/tootsuite/mastodon.git live
    cd live
    git checkout $(git tag -l | sort -V | tail -n 1)

Then you can proceed to install project dependencies:

    gem install bundler
    bundle install --deployment --without development test
    yarn install --pure-lockfile

## Configuration

Then you have to configure your instance:

    cp .env.production.sample .env.production
    nano .env.production

Fill in the important data, like host/port of the redis database, host/port/username/password of the postgres database, your domain name, SMTP details (e.g. from Mailgun or equivalent transactional e-mail service, many have free tiers), whether you intend to use SSL, etc. If you need to generate secrets, you can use:

    RAILS_ENV=production bundle exec rake secret

To get a random string. If you are setting up on one single server (most likely), then `REDIS_HOST` is localhost and `DB_HOST` is `/var/run/postgresql`, `DB_USER` is `mastodon` and `DB_NAME` is `mastodon_production` while `DB_PASS` is empty because this setup will use the ident authentication method (system user "mastodon" maps to postgres user "mastodon").

Configuring the instance hostname:

- `LOCAL_DOMAIN` should be the domain/hostname of your instance. This is **absolutely required** as it is used for generating unique IDs for everything federation-related.
- `LOCAL_HTTPS` set it to `true` if HTTPS works on your website. This is used to generate canonical URLs, which is also important when generating and parsing federation-related IDs.

## Setup

And set up the database for the first time, this will create the tables and basic data:

    RAILS_ENV=production bundle exec rails db:setup

Finally, pre-compile all CSS and JavaScript files:

    RAILS_ENV=production bundle exec rails assets:precompile

## Systemd

Example systemd configuration for the web workers, to be placed in `/etc/systemd/system/mastodon-web.service`:

```systemd
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
TimeoutSec=15
Restart=always

[Install]
WantedBy=multi-user.target
```

Example systemd configuration for the background workers, to be placed in `/etc/systemd/system/mastodon-sidekiq.service`:

```systemd
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

Example systemd configuration file for the streaming API, to be placed in `/etc/systemd/system/mastodon-streaming.service`:

```systemd
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

This allows you to `sudo systemctl enable /etc/systemd/system/mastodon-*.service` and `sudo systemctl start mastodon-web.service mastodon-sidekiq.service mastodon-streaming.service` to get things going.

## Let's Encrypt

This section is only relevant if you are using [Let's Encrypt](https://letsencrypt.org/)
as your TLS certificate provider.

Other assumptions - Ubuntu 16.04, letsencrypt tool installed from distro repositories.

### Installation of tool

This is how you install the `letsencrypt` package:

`sudo apt -y install letsencrypt`

### Generation of certificate

This is the command you should use to generate a Let's Encrypt certificate.
Make sure to replace any instances of 'example.com' with your Mastodon instance's domain.

Additional note: This command will require that nginx or another web server is correctly
configured with your Mastodon instance's domain.

`letsencrypt certonly --webroot -d example.com -w /home/mastodon/live/public/`

### Automated renewal of Let's Encrypt certificate

Let's Encrypt certificates have a validity period of 90 days.

You need to renew your certificate before the expiration date. Failure to do so will
result in your users being unable to access your instance and other instances being unable 
to federate with yours.

We can do this with a cron job that runs daily:

`nano /etc/cron.daily/letsencrypt-renew`

Copy and paste this script into that file:

```
#!/usr/bin/env bash
letsencrypt renew
systemctl reload nginx
```

Save and exit the file.

Make the script executable and restart the cron daemon so that the script runs daily:
```
chmod +x /etc/cron.daily/letsencrypt-renew
systemctl restart cron
```

That is it. Your server will now automatically renew your Let's Encrypt certificate(s).

## Things to look out for when upgrading Mastodon

If you want a stable release for production use, you should use tagged releases. To checkout the latest available tagged version:

```sh
    cd ~mastodon/live/
    git fetch
    git checkout $(git tag -l | sort -V | tail -n 1)
```

As part of your deploy, you may need to run:

- `RAILS_ENV=production bundle exec rails db:migrate`

if anything in the `/db/` directory has changed, and/or

- `yarn install --pure-lockfile`
- `RAILS_ENV=production bundle exec rails assets:precompile`

if anything in the `/app/assets` directory changed.

Please read the [**release notes**](https://github.com/tootsuite/mastodon/releases/) when you upgrade,
they might contain specific instructions about how to update (and they always include information
about which new features the release has, and which bugs are fixed).

Also, Mastodon runs in memory, so you need to restart it before you see any changes (including new
precompiled assets). If you're using systemd, that would be:

```sh
    sudo systemctl restart mastodon-*.service
```
