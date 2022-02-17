---
title: Install from source
description: Instructions for creating your own Mastodon-powered website.
menu:
  docs:
    weight: 20
    parent: admin
---

## Pre-requisites {#pre-requisites}

* A machine running **Ubuntu 18.04 or later** that you have root access to
* A **domain name** \(or a subdomain\) for the Mastodon server, e.g. `example.com`
* An e-mail delivery service or other **SMTP server**

You will be running the commands as root. If you aren’t already root, switch to root:

### System repositories {#system-repositories}

Make sure curl is installed first:

#### Node.js {#node-js}

```bash
curl -sL https://deb.nodesource.com/setup_12.x | bash -
```

#### Yarn {#yarn}

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
```

### System packages {#system-packages}

```bash
apt update
apt install -y \
  imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config nodejs gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev \
  nginx redis-server redis-tools postgresql postgresql-contrib \
  certbot python3-certbot-nginx yarn libidn11-dev libicu-dev libjemalloc-dev
```

### Installing Ruby {#installing-ruby}

We will be using rbenv to manage Ruby versions, because it’s easier to get the right versions and to update once a newer release comes out. rbenv must be installed for a single Linux user, therefore, first we must create the user Mastodon will be running as:

```bash
adduser --disabled-login mastodon
```

We can then switch to the user:

```bash
su - mastodon
```

And proceed to install rbenv and rbenv-build:

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

Once this is done, we can install the correct Ruby version:


```bash
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 2.7.2
rbenv global 2.7.2
```

We’ll also need to install bundler:

```bash
gem install bundler --no-document
```

Return to the root user:

```bash
exit
```

## Setup {#setup}

### Setting up PostgreSQL {#setting-up-postgresql}

Install PostGreSQL

```bash
apt install postgresql
```

#### Performance configuration \(optional\) {#performance-configuration-optional}

For optimal performance, you may use PostGreSQL with custom configuration values from [pgTune](https://pgtune.leopard.in.ua/#/) to generate an appropriate configuration. Paste parameters and edit values in `/etc/postgresql/12/main/postgresql.conf` before restarting PostgreSQL with `systemctl restart postgresql`

#### Creating a user {#creating-a-user}

You will need to create a PostgreSQL user that Mastodon could use. It is easiest to go with “ident” authentication in a simple setup,
where the PostGreSQL user credentials are shared with a Linux system user.
The PostGreSQL user uses the same credentials to log in to Mastodon.

Open the prompt:

```bash
sudo -u postgres psql
```

In the prompt, execute:

```sql
CREATE USER mastodon CREATEDB;
\q
```

### Setting up Mastodon {#setting-up-mastodon}

It is time to download the Mastodon code. Switch to the Mastodon user as root:

```bash
su - mastodon
```

#### Checking out the code {#checking-out-the-code}

Use git to download the latest stable release of Mastodon:

```bash
git clone https://github.com/tootsuite/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```



#### Installing the last dependencies {#installing-the-last-dependencies}

Now to install Ruby and JavaScript dependencies:

```bash
bundle config deployment 'true'
bundle config without 'development test'
bundle install -j$(getconf _NPROCESSORS_ONLN)
yarn install --pure-lockfile
```

{{< hint style="info" >}}
The two `bundle config` commands are only needed the first time you're installing dependencies. If you're going to be updating or re-installing dependencies later, just `bundle install` will be enough.
{{< /hint >}}

#### Generating a configuration {#generating-a-configuration}

Run the interactive setup wizard:

```bash
RAILS_ENV=production bundle exec rake mastodon:setup
```

This will:

* Create a configuration file
* Run asset precompilation
* Create the database schema

The configuration file is saved as `.env.production`. You can review and edit it to your liking. Refer to the [documentation on configuration.]({{< relref "config.md" >}})

You’re done with the mastodon user for now, so switch back to root:

```bash
exit
```

### Setting up nginx {#setting-up-nginx}

Copy the configuration template for nginx from the Mastodon directory:

```bash
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

Then edit `/etc/nginx/sites-available/mastodon` to replace `example.com` with your own domain name, and make any other adjustments you might need.

Reload nginx for the changes to take effect:

### Acquiring a SSL certificate {#acquiring-a-ssl-certificate}

We’ll use Let’s Encrypt to get a free SSL certificate:

```bash
certbot --nginx -d example.com
```

This will obtain the certificate, automatically update `/etc/nginx/sites-available/mastodon` to use the new certificate, and reload nginx for the changes to take effect.

At this point you should be able to visit your domain in the browser and see the elephant hitting the computer screen error page. This is because we haven’t started the Mastodon process yet.

### Setting up systemd services {#setting-up-systemd-services}

Copy the systemd service templates from the Mastodon directory:

```sh
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

If you deviated from the defaults at any point, check that the username and paths are correct: 

```sh
$EDITOR /etc/systemd/system/mastodon-*.service
```

Finally, start and enable the new systemd services:

```sh
systemctl daemon-reload
systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming
```

They will now automatically start at boot.

{{< hint style="success" >}}
**Hurray! This is it. You can visit your domain in the browser now!**
{{< /hint >}}
