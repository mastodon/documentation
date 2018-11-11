---
title: Installation
description: How to install Mastodon on an Ubuntu 18.04 server
menu:
  docs:
    parent: administration
    weight: 1
---

<img src="/setup.png" alt="" style="margin: 0; box-shadow: none">

## Basic server setup (optional)

If you are setting up a fresh machine, it is recommended that you secure it first. Assuming that you are running **Ubuntu 18.04**:

### Do not allow password-based SSH login (keys only)

First make sure you are actually logging in to the server using keys and not via a password, otherwise this will lock you out. Many hosting providers support uploading a public key and automatically set up key-based root login on new machines for you.

Edit `/etc/ssh/sshd_config` and find `PasswordAuthentication`. Make sure it's uncommented and set to `no`. If you made any changes, restart sshd:

```sh
systemctl restart ssh
```

### Update system packages

```sh
apt update && apt upgrade -y
```

### Install fail2ban so it blocks repeated login attempts

```sh
apt install fail2ban
```

Edit `/etc/fail2ban/jail.local` and put this inside:

```ini
[DEFAULT]
destemail = your@email.here
sendername = Fail2Ban

[sshd]
enabled = true
port = 22

[sshd-ddos]
enabled = true
port = 22
```

Finally restart fail2ban:

```sh
systemctl restart fail2ban
```

### Install a firewall and only whitelist SSH, HTTP and HTTPS ports

First, install iptables-persistent. During installation it will ask you if you want to keep current rules--decline.

```sh
apt install -y iptables-persistent
```

Edit `/etc/iptables/rules.v4` and put this inside:

```
*filter

#  Allow all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT

#  Accept all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  Allow all outbound traffic - you can modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

#  Allow HTTP and HTTPS connections from anywhere (the normal ports for websites and SSL).
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

#  Allow SSH connections
#  The -dport number should be the same port number you set in sshd_config
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

#  Log iptables denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  Reject all other inbound - default deny unless explicitly allowed policy
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

With iptables-persistent, that configuration will be loaded at boot time. But since we are not rebooting right now, we need to load it manually for the first time:

```sh
iptables-restore < /etc/iptables/rules.v4
```

## Pre-requisites

- A machine running **Ubuntu 18.04** that you have root access to
- A **domain name** (or a subdomain) for the Mastodon server, e.g. `example.com`
- An e-mail delivery service or other **SMTP server**

You will be running the commands as root. If you aren't already root, switch to root:

```sh
sudo -i
```

### System repositories

Make sure curl is installed first:

```sh
apt install -y curl
```

#### Node.js

```sh
curl -sL https://deb.nodesource.com/setup_8.x | bash -
```

#### Yarn

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
```

### System packages

```sh
apt update
apt install -y \
  imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config nodejs gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm5 libgdbm-dev \
  nginx redis-server redis-tools postgresql postgresql-contrib \
  certbot yarn libidn11-dev libicu-dev libjemalloc-dev
```

### Installing Ruby

We will be using rbenv to manage Ruby versions, because it's easier to get the right versions and to update once a newer release comes out. rbenv must be installed for a single Linux user, therefore, first we must create the user Mastodon will be running as:

```sh
adduser --disabled-login mastodon
```

We can then switch to the user:

```sh
su - mastodon
```

And proceed to install rbenv and rbenv-build:

```sh
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

Once this is done, we can install the correct Ruby version:

```sh
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 2.5.3
rbenv global 2.5.3
```

We'll also need to install bundler:

```sh
gem install bundler --no-ri --no-rdoc
```

Return to the root user:

```sh
exit
```

## Setup
### Setting up PostgreSQL
#### Performance configuration (optional)

For optimal performance, you may use [pgTune](https://pgtune.leopard.in.ua/#/) to generate an appropriate configuration and edit values in `/etc/postgresql/9.6/main/postgresql.conf` before restarting PostgreSQL with `systemctl restart postgresql`

#### Creating a user

You will need to create a PostgreSQL user that Mastodon could use. It is easiest to go with "ident" authentication in a simple setup, i.e. the PostgreSQL user does not have a separate password and can be used by the Linux user with the same username.

Open the prompt:

```sh
sudo -u postgres psql
```

In the prompt, execute:

```
CREATE USER mastodon CREATEDB;
\q
```

Done!

### Setting up Mastodon

It is time to download the Mastodon code. Switch to the mastodon user:

```sh
su - mastodon
```

#### Checking out the code

Use git to download the latest stable release of Mastodon:

```sh
git clone https://github.com/tootsuite/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

#### Installing the last dependencies

Now to install Ruby and JavaScript dependencies:

```sh
bundle install \
  -j$(getconf _NPROCESSORS_ONLN) \
  --deployment --without development test
yarn install --pure-lockfile
```

#### Generating a configuration

Run the interactive setup wizard:

```sh
RAILS_ENV=production bundle exec rake mastodon:setup
```

This will:

- Create a configuration file
- Run asset precompilation
- Create the database schema

The configuration file is saved as `.env.production`. You can review and edit it to your liking. Refer to the [documentation on configuration]({{< relref "configuration.md" >}}).

You're done with the mastodon user for now, so switch back to root:

```sh
exit
```

### Setting up nginx

Copy the configuration template for nginx from the Mastodon directory:

```sh
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

Then edit `/etc/nginx/sites-available/mastodon` to replace `example.com` with your own domain name, and make any other adjustments you might need.

Reload nginx for the changes to take effect:

```sh
systemctl reload nginx
```

### Acquiring a SSL certificate

We'll use Let's Encrypt to get a free SSL certificate:

```sh
certbot certonly --webroot -d example.com -w /home/mastodon/live/public/
```

You can now edit `/etc/nginx/sites-available/mastodon` to uncomment and adjust the `ssl_certificate` and `ssl_certificate_key` lines.

Then, reload nginx for the changes to take effect:

```sh
systemctl reload nginx
```

At this point you should be able to visit your domain in the browser and see the elephant hitting the computer screen error page. This is because we haven't started the Mastodon process yet.

### Setting up systemd services

Copy the systemd service templates from the Mastodon directory:

```sh
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

Then edit the files to make sure the username and paths are correct:

- `/etc/systemd/system/mastodon-web.service`
- `/etc/systemd/system/mastodon-sidekiq.service`
- `/etc/systemd/system/mastodon-streaming.service`

Finally, start and enable the new systemd services:

```sh
systemctl start mastodon-web mastodon-sidekiq mastodon-streaming
systemctl enable mastodon-*
```

They will now automatically start at boot time.

**Hurray! This is it. You can visit your domain in the browser now!**
