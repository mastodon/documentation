## Docker

[![](https://images.microbadger.com/badges/version/gargron/mastodon.svg)](https://microbadger.com/images/gargron/mastodon "Get your own version badge on microbadger.com") [![](https://images.microbadger.com/badges/image/gargron/mastodon.svg)](https://microbadger.com/images/gargron/mastodon "Get your own image badge on microbadger.com")

The project now includes a `Dockerfile` and a `docker-compose.yml` file (which requires at least docker-compose version `1.10.0`).

## Setting up

Review the settings in `docker-compose.yml`. Note that it is not default to store the postgresql database and redis databases in a persistent storage location,
so you may need or want to adjust the settings there.

Then, you need to fill in the `.env.production` file:

    cp .env.production.sample .env.production
    nano .env.production

Do NOT change the `REDIS_*` or `DB_*` settings when running with the default docker configurations.

You will need to fill in, at least: `LOCAL_DOMAIN`, `LOCAL_HTTPS`, `PAPERCLIP_SECRET`, `SECRET_KEY_BASE`, `OTP_SECRET`, and the `SMTP_*` settings.  To generate the `PAPERCLIP_SECRET`, `SECRET_KEY_BASE`, and `OTP_SECRET`, you may use:

    rake secret

## Building the app

Before running the first time, you need to build the images:

    docker-compose build

    docker-compose run --rm web rake secret

Do this once for each of those keys, and copy the result into the `.env.production` file in the appropriate field.

Then you should run the `db:migrate` command to create the database, or migrate it from an older release:

    docker-compose run --rm web rails db:migrate

Then, you will also need to precompile the assets:

    docker-compose run --rm web rails assets:precompile

before you can launch the docker image with:

    docker-compose up

If you wish to run this as a daemon process instead of monitoring it on console, use instead:

    docker-compose up -d

## Configuration

Then you may login to your new Mastodon instance by browsing to http://localhost:3000/

Following that, make sure that you read the [production guide](Production-guide.md). You are probably going to want to understand how
to configure Nginx to make your Mastodon instance available to the rest of the world.

The container has two volumes, for the assets and for user uploads, and optionally two more, for the postgresql and redis databases.

The default docker-compose.yml maps them to the repository's `public/assets` and `public/system` directories, you may wish to put them somewhere else. Likewise, the PostgreSQL and Redis images have data containers that you may wish to map somewhere where you know how to find them and back them up.

**Note**: The `--rm` option for docker-compose will remove the container that is created to run a one-off command after it completes. As data is stored in volumes it is not affected by that container clean-up.

## Running tasks

Running any of these tasks via docker-compose would look like this:

    docker-compose run --rm web rake mastodon:media:clear

## Updating

This approach makes updating to the latest version a real breeze.

1. `git pull` to download updates from the repository
2. `docker-compose build` to compile the Docker image out of the changed source files
3. (optional) `docker-compose run --rm web rails db:migrate` to perform database migrations. Does nothing if your database is up to date
4. (optional) `docker-compose run --rm web rails assets:precompile` to compile new JS and CSS assets
5. `docker-compose up -d` to re-create (restart) containers and pick up the changes
