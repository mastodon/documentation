---
title: Installing from source
description: Instructional guide on creating your own Mastodon-powered website.
menu:
  docs:
    weight: 20
    parent: admin
---

## Pre-requisites {#pre-requisites}

* A machine running **Ubuntu 24.04** or **Debian 12** that you have root access to
* A **domain name** (or a subdomain) for the Mastodon server, e.g. `example.com`
* An email delivery service or other **SMTP server**

We will be using `example.com` as the domain in the following example. Please remember to replace it with your own domain before running any commands.

You will be running the commands as root. If you aren’t already root, switch to root: `sudo -i`

### System repositories {#system-repositories}

Make sure curl, wget, gnupg, apt-transport-https, lsb-release and ca-certificates are installed first:

```bash
apt install -y curl wget gnupg apt-transport-https lsb-release ca-certificates
```

#### Node.js {#node-js}

```bash
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
```

#### PostgreSQL {#postgresql}

```bash
wget -O /usr/share/keyrings/postgresql.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc
echo "deb [signed-by=/usr/share/keyrings/postgresql.asc] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/postgresql.list
```

### System packages {#system-packages}

```bash
apt update
apt install -y \
  imagemagick ffmpeg libvips-tools libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev \
  nginx nodejs redis-server redis-tools postgresql \
  certbot python3-certbot-nginx libidn11-dev libicu-dev libjemalloc-dev
```

#### Yarn {#yarn}

Enable `corepack` so that the correct version of `yarn` can be installed automatically:

```bash
corepack enable
```

### Creating the `mastodon` user {#creating-the-mastodon-user}

This is the user account under which Mastodon will run:

```bash
adduser --disabled-password mastodon
```

## Setup {#setup}

### Setting up PostgreSQL {#setting-up-postgresql}

#### Performance configuration (optional) {#performance-configuration-optional}

For optimal performance, you may use [pgTune](https://pgtune.leopard.in.ua/#/) to generate an appropriate configuration and edit values in `/etc/postgresql/17/main/postgresql.conf` before restarting PostgreSQL with `systemctl restart postgresql`.

#### Creating a user {#creating-a-user}

You will need to create a PostgreSQL user that Mastodon could use. It is easiest to go with “ident” authentication in a simple setup, i.e. the PostgreSQL user does not have a separate password and can be used by the Linux user with the same username.

Open the prompt:

```bash
sudo -u postgres psql
```

In the prompt, execute:

```sql
CREATE USER mastodon CREATEDB;
\q
```

Done!

### Setting up Mastodon {#setting-up-mastodon}

It is time to download the Mastodon code. Switch to the mastodon user:

```bash
su - mastodon
```

#### Checking out the code {#checking-out-the-code}

Use git to download the latest stable release of Mastodon:

```bash
git clone https://github.com/mastodon/mastodon.git live && cd live
git checkout $(git tag -l | grep '^v[0-9.]*$' | sort -V | tail -n 1)
```

#### Installing Ruby {#installing-ruby}

We will use rbenv to manage Ruby versions as it simplifies obtaining the correct versions and updating them when new releases are available.
Install rbenv and ruby-build:

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

Once this is done, we can install the correct Ruby version:

```bash
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install
```

#### Installing the last dependencies {#installing-the-last-dependencies}

Now to install Ruby and JavaScript dependencies:

```bash
bundle config deployment 'true'
bundle config without 'development test'
bundle install -j$(getconf _NPROCESSORS_ONLN)
yarn install
```

{{< hint style="info" >}}
The two `bundle config` commands are only needed the first time you're installing dependencies. If you're going to be updating or re-installing dependencies later, just `bundle install` will be enough.
{{< /hint >}}

#### Generating a configuration {#generating-a-configuration}

Run the interactive setup wizard:

```bash
RAILS_ENV=production bin/rails mastodon:setup
```

This will:

* Create a configuration file
* Run asset precompilation
* Create the database schema

The configuration file is saved as `.env.production`. You can review and edit it to your liking. Refer to the [documentation on configuration.]({{< relref "config" >}})

You’re done with the mastodon user for now, so switch back to root:

```bash
exit
```

### Acquiring an SSL certificate {#acquiring-a-ssl-certificate}

We’ll use Let’s Encrypt to get a free SSL certificate:

```bash
certbot certonly --nginx -d example.com
```

This will obtain the certificate, and save it in the directory `/etc/letsencrypt/live/example.com/`.

### Setting up nginx {#setting-up-nginx}

Copy the configuration template for nginx from the Mastodon directory:

```bash
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
rm /etc/nginx/sites-enabled/default
```

Then edit `/etc/nginx/sites-available/mastodon` to 

1. Replace `example.com` with your own domain name
2. Uncomment the `ssl_certificate` and `ssl_certificate_key` (ignore this step if you are bringing your own certificate):

    ```
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;;
    ```

3. Make any other adjustments you might need.

Allow other users to traverse the mastodon user's home directory, so that nginx's `www-data` user can access asset files:

```bash
chmod o+x /home/mastodon
```

Restart nginx for the changes to take effect:

```bash
systemctl restart nginx
```

At this point, you should be able to visit your domain in the browser and see the elephant hitting the computer screen error page. This is because we haven’t started the Mastodon process yet.

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
