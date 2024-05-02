---
title: Run Mastodon inside Docker
description: Setting Mastodon environnement using docker compose.
menu:
  docs:
    weight: 30
    parent: admin
---

# Mastodon configuration and environment variable generation {#Config and env variable generation}

```sh
# Clone Mastodon git repo
git clone https://github.com/tootsuite/mastodon.git
# Change directory to Mastodon
cd mastodon
# Checkout to the latest stable branch
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

In `docker-compose.yml` comment out the lines with `build: . ` for all images (web, streaming, sidekiq).  
Then start the **postgres** db and the **redis**.

```sh
docker compose run db redis
```

By default the db is configured without a password via the parameter `POSTGRES_HOST_AUTH_METHOD=trust` and with the other parameters by default. It is strongly recommended to add a password to the db and to use another user, a database other than the default one etc... it is necessary to modify the `docker-compose.yml` to add the right variables for the **Postgres** container of the db service. You can refere to [the official documentation](https://hub.docker.com/_/postgres)

Then get the ids of the 2 networks that will be created (`external_network` and `internal_network`). ( `docker network ls` ).  
Then run the configuration script that will create the `.env.production`.

```sh
docker-compose run -it --rm --network <id-net-internal> --network <id-net-external> web bundle exec rake mastodon:setup
```

Fill in the required fields.  
Finally, copy the contents of the generated `.env` and paste it into the `.env.production` on your machine.  
Confirm the initial db setup when ask for.

_If you don't want to configure the db now, you can run the following command later **Please note** this command requires the presence of the `.env.production` with the parameters to connect to the db:_.

```sh
docker-compose run --rm web bundle exec rails db:setup
```

If you have chosen to configure the db with the `mastodon:setup` script, validate the creation of the admin account when requested and copy the generated password.

If the `mastodon:setup` script fails to initialize the db, it is necessary to add the `DISABLE_DATABASE_ENVIRONMENT_CHECK=1` variable to the container shell before restarting the command and validating the destruction of the database. Or you can remove the Postgres docker container and delete the volumes, and start again the db service with a fresh container.

You can now start the Mastodon instance.

```sh
docker compose up -d
```

You can't access the Mastodon intance without configuring a reverse proxy like NGINX.

# Reverse-proxy configuration {#Reverse-proxy configuration}

## Creating a self-signed certificate {#Creating a self-signed certificate}

Create a self-signed certificate for your Mastodon instance, if you want you can also use `certbot` to generate a certificate if you have your own public domaine.

```sh
sudo mkdir -p /etc/letsencrypt/live/<DNS-NAIME>/
openssl req --nodes -x509 -newkey rsa:4096 -keyout privkey.pem -out fullchain.pem -sha256 -days 365
sudo chmod root:root privkey.pem
sudo chmod root:root fullchain.pem
sudo mv privkey.pem /etc/letsencrypt/live/<DNS-NAIME>/
sudo mv fullchain.pem /etc/letsencrypt/live/<DNS-NAIME>/
```

Fill in the requested fields, the `Common Name` field must be equal to the value of `LOCAL_DOMAIN` in the `.env.production`.

## Nginx config {#Nginx config}

Based on the [official configuration](https://github.com/mastodon/mastodon/blob/main/dist/nginx.conf), we modify a few elements to make the config work with docker.

- `sed -i "s/try_files \$uri =404;/try_files \$uri @proxy;/" ~/nginx/conf/mastodon.conf`
- `sed -i "s/server_name example.com;/\server_name <%WEB_DOMAIN%>;/" ~/nginx/conf/mastodon.con`
- `sed -i 's/server 127.0.0.1:3000/server web:3000/' ~/nginx/conf/mastodon.conf`
- `sed -i 's/server 127.0.0.1:4000/server streaming:4000/' ~/nginx/conf/mastodon.conf`
- `sed -i 's/# ssl_certificate\s*\/etc\/letsencrypt\/live\/example.com\/fullchain.pem;/ssl_certificate\t\/etc\/letsencrypt\/live\/<%DNS NAME%>\/fullchain.pem;/' ~/conf/mastodon.conf`
- `sed -i 's/# ssl_certificate_key\s*\/etc\/letsencrypt\/live\/example.com\/privkey.pem;/ssl_certificate_key\t\/etc\/letsencrypt\/live\/<%DNS NAME%>\/privkey.pem;/' ~/nginx/conf/mastodon.conf`

Then start up the nginx container.

```sh
docker run --name nginx -p 80:80 -p 443:443 --network <id-net-internal> --network <id-net-external> -v ~/nginx/conf:/etc/nginx/conf.d:ro -v /etc/letsencrypt:/etc/letsencrypt:ro -d nginx
```

Test the instance with a browser. https://<dns-name>`

# Finalization {#Finalization}

## 1st Connection with admin account {#1st Connection with admin account}

If you created the admin account with `mastodon:setup`, log in with the admin account email address and password. Change the default password. All that's left is to approve the admin account.  
If not, connect to the container, create the admin account and approve it.

```sh
docker exec -it <id-web-container> bash

RAILS_ENV=production

tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role Owner

tootctl accounts approve admin # pseudo du compte admin
```

## Admin account approval {#Admin account approval}

Login to the container to validate the admin account:

```sh
docker exec -it <id-web-container> bash
tootctl accounts approve admin # pseudo du compte admin
```
