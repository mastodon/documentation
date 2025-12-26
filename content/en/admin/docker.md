---
title: Run Mastodon inside Docker
description: Setting Mastodon environnement using docker compose.
menu:
  docs:
    weight: 30
    parent: admin
---

## Pre-requisites {#pre-requisites}

* A machine running **Ubuntu 24.04** or **Debian 13** that you have root access to
* A **domain name** (or a subdomain) for the Mastodon server, e.g. `example.com`
* An email delivery service or other **SMTP server**
* Latest Docker version installed with compose plugin 

{{< hint style="info" >}}
It's advised to reed the [security section](https://docs.docker.com/engine/security/) of the docker documentation.
{{< /hint >}}

You will be running the commands as root. If you aren’t already root, switch to root: `sudo -i`

### Creating the `mastodon` user {#creating-the-mastodon-user}

This is the user account under which Mastodon will live:

```bash
adduser --disabled-password mastodon
```

### System packages {#system-packages}

```bash
apt update
apt install -y certbot nginx python3-certbot-nginx
```

## Setup {#setup}

### Retrieve the last mastodon release {#retrieve-the-last mastodon-release}

```bash
su - mastodon
# Clone Mastodon git repo
git clone https://github.com/mastodon/mastodon.git live
# Change directory to Mastodon repo
cd live
# Checkout to the latest stable branch
git checkout $(git tag -l | grep '^v[0-9.]*$' | sort -V | tail -n 1) && exit
```

### Review the `docker-compose.yml` {#review-the-compose-file}
{{< hint style="info" >}}
If you want to enable ElasticSearch uncomment the `es` service in the `docker-compose.yml`.

If you want to enable federation with Tor instances uncomment the `tor` and the `privoxy` service in `docker-compose.yml`.
And and the following environment variable to the `.env.production`:

```bash
http_hidden_proxy=http://privoxy:8118
ALLOW_ACCESS_TO_HIDDEN_SERVICE=true
```
{{< /hint >}}

### Generation of the `.env.production` file {#generation-of-the-.env.production-file}

To generate your `.env.production` file you have several options :
- Use the interactive setup wizard (recommended)
- Use the .env.production.sample
- Consult the [full config option list](https://docs.joinmastodon.org/admin/config/) and add the ones you need.


First start the **postgres** db and the **redis**.

```bash
# Be sure to be root and in the /home/mastodon/live/ directory
# Pull all the images so you can work quickly later in the documentation
docker compose pull
# Start the Postgresql and the Redis database in detached mod
docker compose up db redis -d
```

By default, the db is configured without a password and with the other default parameters. If you wish to add a password to the db, or use a different user, table etc., you need to modify the `docker-compose.yml` to add the correct variables for the **Postgres** container of the db service.

Then launch the configuration wizard, which will display the `.env.production`.

```bash
docker compose run --rm web bundle exec rake mastodon:setup
```

Fill in the required fields.  
Finally, copy the contents of the generated `.env` and paste it into the `.env.production` on your machine.  

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

## Reverse-proxy configuration {#Proxy configuration}

To access the Mastodon web instance you need to configure a proxy, like Nginx.

The mastodon web and streaming service are listening on 127.0.0.1 so you need setup nginx to redirect the traffic from port 80 and 443 of you machine to the web and streaming container which are listening on 127.0.0.1.

### Acquiring an SSL certificate {#acquiring-an-ssl-certificate}

We’ll use Let’s Encrypt to get a free SSL certificate:

```bash
certbot certonly --nginx -d example.com
```

This will obtain the certificate, and save it in the directory `/etc/letsencrypt/live/example.com/`.

### Setting up NGINX {#setting-up-nginx}

Copy the configuration template for nginx from the Mastodon directory:

```bash
cp /root/mastodon/dist/nginx.conf /etc/nginx/sites-available/mastodon
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

3. Uncomment the `# try_files $uri @mastodon;` instruction in the `location ^~ /assets/`, `location ^~ /packs/` and `location ^~ /system/` scop.

Allow other users to traverse the mastodon user's home directory, so that nginx's `www-data` user can access asset files:

```bash
chmod o+x /home/mastodon
```

Restart nginx for the changes to take effect:

```bash
systemctl restart nginx
```

At this point, you should be able to visit your domain in the browser. If you didn't create the admin account with the wizard follow the additional step.

## Additional step {#Additional-step}
Connect to the web container and create the admin account, don't forget to approve the account.

```bash
docker compose exec -it web bash

tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role Owner

tootctl accounts approve alice

exit
```
