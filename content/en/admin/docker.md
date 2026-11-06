---
title: Run Mastodon inside Docker
description: Setting up a Mastodon environment using Docker Compose.
menu:
  docs:
    weight: 30
    parent: admin
---

## Pre-requisites {#pre-requisites}

* A machine running **Ubuntu 24.04** or **Debian 13** that you have root access to
* A **domain name** (or a subdomain) for the Mastodon server, e.g. `example.com`
* An email delivery service or other **SMTP server**
* The latest **Docker Engine** version with the **Docker Compose plugin** installed

{{< hint style="info" >}}
Before proceeding, it's advised to read the [security section](https://docs.docker.com/engine/security/) of the Docker documentation.
{{< /hint >}}

We will be using `example.com` as the domain in the following example. Please remember to replace it with your own domain before running any commands.

You will be running the commands as root. If you aren’t already root, switch to root: `sudo -i`

### Creating the `mastodon` user {#creating-the-mastodon-user}

This is the user account under which Mastodon will live:

```bash
adduser --disabled-password mastodon
```

### System packages {#system-packages}

Install the packages required for HTTPS certificates and reverse proxying:

```bash
apt update
apt install -y certbot nginx python3-certbot-nginx
```

## Setup {#setup}

### Retrieving the latest Mastodon release {#retrieving-the-latest-mastodon-release}

Switch to the `mastodon` user and use git to download the latest stable release of Mastodon:

```bash
su - mastodon
# Clone Mastodon git repo
git clone https://github.com/mastodon/mastodon.git live
# Change directory to Mastodon repo
cd live
# Check out the latest stable release
git checkout $(git tag -l | grep '^v[0-9.]*$' | sort -V | tail -n 1) && exit
```

### Reviewing the `docker-compose.yml` file {#review-the-docker-compose-file}

The file is functional, but you may want to enable optional services depending on your use case.

**Elasticsearch**.  
If you want to enable Elasticsearch uncomment the `es` service in the `docker-compose.yml`.

**Federation with Tor instances**  
If you want to enable federation with Tor instances uncomment the `tor` and the `privoxy` service in `docker-compose.yml`.
Add the following environment variable to the `.env.production`:

```bash
http_hidden_proxy=http://privoxy:8118
ALLOW_ACCESS_TO_HIDDEN_SERVICE=true
```

### Generating the `.env.production` file {#generation-of-the-.env.production-file}

You can generate the `.env.production` file in several ways:
- Using the interactive setup wizard (**recommended**)
- Copying the .env.production.sample
- Consulting the [full config option list](https://docs.joinmastodon.org/admin/config/) and add the ones you need.

First start the **postgres** db and the **redis**.
Make sure you are **root** and in `/home/mastodon/live`:

```bash
# Pull all the images so you can work quickly later in the documentation
docker compose pull
# Start the Postgresql and the Redis database in detached mode
docker compose up -d db redis
```

By default, PostgreSQL is configured without a password and uses the default user and database defined in `docker-compose.yml`.  
If you wish to add a password to the database, or use a different user, table etc., you need to edit the `db` service in the `docker-compose.yml` to add the correct variables for the **Postgres** container.

You can now launch the configuration wizard. It will display the `.env.production` after a few questions.

```bash
docker compose run --rm web bundle exec rake mastodon:setup
```

Fill in the required fields.  
Finally, copy the contents of the generated `.env` and paste it into the `.env.production` on your host.  

Confirm the PostgreSQL setup.

{{< hint style="info" >}}
If for some reason you don't want to configure PostgreSQL now, you can run the following command later.
**Please note** this command requires the presence of the `.env.production` with the parameters to connect to the db:

```bash
docker compose run --rm web bundle exec rails db:setup
```
{{< /hint >}}

Validate the creation of the admin account when requested and copy the generated password.

If the `mastodon:setup` script fails to initialize the db, add the variable `DISABLE_DATABASE_ENVIRONMENT_CHECK=1` in the container shell before re-running the command and validating the destruction of the database.

```bash
docker compose run -e "DISABLE_DATABASE_ENVIRONMENT_CHECK=1" --rm web bundle exec rake mastodon:setup
```

You can now start all the Mastodon instance components.

```bash
docker compose up -d
```

## Reverse proxy configuration {#reverse-proxy-configuration}

To access the Mastodon web instance you must configure a reverse proxy, such as `nginx`.

The Mastodon web and streaming services listen on `127.0.0.1`. nginx will forward incoming traffic from port **80** and **443** of your host to these containers, which are listening on 127.0.0.1.

### Acquiring an SSL certificate {#acquiring-an-ssl-certificate}

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

    ```nginx
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;;
    ```

3. Uncomment the `# try_files $uri @mastodon;` instruction in the `location ^~ /assets/`, `location ^~ /packs/` and `location ^~ /system/` scopes.

Allow other users to traverse the mastodon user's home directory, so that nginx's `www-data` user can access asset files:

```bash
chmod o+x /home/mastodon
```

Restart nginx for the changes to take effect:

```bash
systemctl restart nginx
```

You should now be able to access your Mastodon instance in a web browser.

## Creating an administrator account manually {#creating-an-administrator-account-manually}

If you did not create an administrator account during the setup wizard, you can create one manually.

Connect to the web container and create the admin account, don't forget to approve the account.

```bash
docker compose exec -it web bash

tootctl accounts create alice \
  --email alice@example.com \
  --confirmed \
  --role Owner

tootctl accounts approve alice

exit
```
