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
You will be running the commands as root. If you aren’t already root, switch to root: `sudo -i`

{{< hint style="info" >}}
It's advised to reed the [security section](https://docs.docker.com/engine/security/) of the docker documentation.
{{< /hint >}}

## Setup {#setup}

### Retrieve the last mastodon release {#retrieve-the-last mastodon-release}

```sh
# Clone Mastodon git repo
git clone https://github.com/mastodon/mastodon.git
# Change directory to Mastodon
cd mastodon
# Checkout to the latest stable branch
git checkout $(git tag -l | grep '^v[0-9.]*$' | sort -V | tail -n 1)
```

{{< hint style="info" >}}
If you want to enable ElasticSearch uncomment the `es` service in the `docker-compose.yml`.

If you want to enable federation with Tor instances uncomment the `tor` and the `privoxy` service in `docker-compose.yml`.
And and the following environment variable to the `.env.production`:

```sh
http_hidden_proxy=http://privoxy:8118
ALLOW_ACCESS_TO_HIDDEN_SERVICE=true
```
{{< /hint >}}

### Generation of the `.env.production` file {#generation-of-the-`.env.production`-file}

To generate your `.env.production` file you have several options :
- Use the interactive setup wizard (recommended)
- Use the .env.production.sample
- Consult the [full config option list](https://docs.joinmastodon.org/admin/config/) and add the ones you need.


First start the **postgres** db and the **redis**.

```sh
# Pull all the images so you can work quickly later in the documentation
docker compose pull
# Start the Postgresql and the Redis database in detached mod
docker compose up db redis -d
```

By default, the db is configured without a password and with the other default parameters. If you wish to add a password to the db, or use a different user, table etc., you need to modify the `docker-compose.yml` to add the correct variables for the **Postgres** container of the db service.

Then launch the configuration wizard, which will display the `.env.production`.

```sh
docker compose run --rm web bundle exec rake mastodon:setup
```

Fill in the required fields.  
Finally, copy the contents of the generated `.env` and paste it into the `.env.production` on your machine.  
Confirm the PostgreSQL setup.

{{< hint style="info" >}}
If for some reason you don't want to configure PostgreSQL now, you can run the following command later.
**Please note** this command requires the presence of the `.env.production` with the parameters to connect to the db:

```sh
docker compose run --rm web bundle exec rails db:setup
```
{{< /hint >}}

If you have chosen to configure the db with the `mastodon:setup` script, validate the creation of the admin account when requested and copy the generated password.

If the `mastodon:setup` script fails to initialize the db, add the variable `DISABLE_DATABASE_ENVIRONMENT_CHECK=1` in the container shell before re-running the command and validating the destruction of the database.

```sh
docker compose run -e "DISABLE_DATABASE_ENVIRONMENT_CHECK=1" --rm web bundle exec rake mastodon:setup
```

You can now start all the Mastodon instance components.

```sh
docker compose up -d
```

You can't access the Mastodon intance without configuring a reverse proxy like NGINX.

## Reverse-proxy configuration {#Proxy configuration}

### Creating a self-signed certificate

Create a self-signed certificate for your Mastodon instance.

```sh
DOMAIN_DNS='localhost'
openssl req --nodes -x509 -newkey rsa:4096 -keyout privkey.pem -out fullchain.pem -sha256 -days 365
mkdir -p "certs/live/$DOMAIN_DNS/"
mv fullchain.pem privkey.pem certs/live/$DOMAIN_DNS/
```

Fill in the requested fields, the Common Name field must be equal to the value of `LOCAL_DOMAIN` in the `.env.production`.

### Nginx config

Based on the [official configuration](https://github.com/mastodon/mastodon/blob/main/dist/nginx.conf), we modify a few elements to make the config work with docker.

```sh
DOMAIN_DNS='localhost'
cp dist/nginx.conf dist/nginx_dockerized.conf
sed -i "s/try_files \$uri =404;/try_files \$uri @proxy;/" dist/nginx_dockerized.conf
sed -i "s/server_name example.com;/\server_name $DOMAIN_DNS;/" dist/nginx_dockerized.conf
sed -i 's/server 127.0.0.1:3000/server web:3000/' dist/nginx_dockerized.conf
sed -i 's/server 127.0.0.1:4000/server streaming:4000/' dist/nginx_dockerized.conf
sed -i "s/# ssl_certificate\s*\/etc\/letsencrypt\/live\/example.com\/fullchain.pem;/ssl_certificate\t\/etc\/letsencrypt\/live\/$DOMAIN_DNS\/fullchain.pem;/" dist/nginx_dockerized.conf
sed -i "s/# ssl_certificate_key\s*\/etc\/letsencrypt\/live\/example.com\/privkey.pem;/ssl_certificate_key\t\/etc\/letsencrypt\/live\/$DOMAIN_DNS\/privkey.pem;/" dist/nginx_dockerized.conf

# Patch internal Host header forwarding
sed -i "s/Host \$host/Host $DOMAIN_DNS/" dist/nginx_dockerized.conf
```

Then start up the nginx container.

```sh
docker compose up nginx -d
```

Test the instance with a browser. https://<dns-name>`

## Finalization {#Finalization}

### 1st Connection with admin account

If you created the admin account with `mastodon:setup`, log in with the admin account email address and password. Change the default password. All that's left is to approve the admin account.  
If not, connect to the container, create the admin account and approve it.

```sh
docker exec -it <id-conteneur-web> bash

RAILS_ENV=production

tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role Owner

tootctl accounts approve admin # admin account username
```

### Admin account approval

Login to the container to validate the admin account:

```sh
docker exec -it <id-conteneur-web> bash
tootctl accounts approve admin # admin account username
```
