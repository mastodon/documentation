## Docker

[![](https://images.microbadger.com/badges/version/gargron/mastodon.svg)](https://microbadger.com/images/gargron/mastodon "Get your own version badge on microbadger.com") [![](https://images.microbadger.com/badges/image/gargron/mastodon.svg)](https://microbadger.com/images/gargron/mastodon "Get your own image badge on microbadger.com")

The project now includes a `Dockerfile` and a `docker-compose.yml` file (which requires at least docker-compose version `1.10.0`).

## Prerequisites

- Working basic (Linux) server with Nginx (or Apache2; not officially supported).
- Recent stable version of [Docker](https://www.docker.com/community-edition).
- Recent stable version of [Docker-compose](https://github.com/docker/compose/releases/latest).

## Setting up

Clone Mastodon's repository.

    git clone https://github.com/tootsuite/mastodon
    cd mastodon

Review the settings in `docker-compose.yml`. Note that it is **not default** to store the postgresql database and redis databases in a persistent storage location. If you plan on running your instance in production, you **must** uncomment the [`volumes` directive](https://github.com/tootsuite/mastodon/blob/972f6bc861affd9bc40181492833108f905a04b6/docker-compose.yml#L7-L16) in `docker-compose.yml`.

Then, you need to fill in the `.env.production` file:

    cp .env.production.sample .env.production
    nano .env.production

Do NOT change the `REDIS_*` or `DB_*` settings when running with the default docker configurations.

You will need to fill in, at least: `LOCAL_DOMAIN`, `LOCAL_HTTPS`, and the `SMTP_*` settings.

## Getting the Mastodon image

### Using a prebuilt image

If you're not making any local code changes or customizations on your instance, you can use a prebuilt Docker image to avoid the time and resource consumption of a build. Images are available from Docker Hub: https://hub.docker.com/r/gargron/mastodon/
    
To use the prebuilt images:

1. Open `docker-compose.yml` in your favorite text editor.
2. Comment out the `build: .` lines for all images (web, streaming, sidekiq).
3. Edit the `image: gargron/mastodon` lines for all images to include the release you want. The default is `latest` which may not be a tagged release. If you wanted to use v2.2.0 for example, you would edit the lines to say: `image: gargron/mastodon:v2.2.0`
4. Save the file and exit the text editor.
4. Run `docker-compose build`. It will now pull the correct image from Docker Hub.

### Building your own image

You must build your own image if you've made any code modifications. To build your own image:

1. Open `docker-compose.yml` in your favorite text editor.
2. Uncomment the `build: .` lines for all images (web, streaming, sidekiq) if needed.
3. Save the file and exit the text editor.
3. Run `docker-compose build`.
    
## Building the app

Now the image can be used to generate secrets. Run the command below for each of `PAPERCLIP_SECRET`, `SECRET_KEY_BASE`, and `OTP_SECRET` then copy the results into the `.env.production` file:

    docker-compose run --rm web rake secret

To enable Web Push notifications, you should generate a private/public key pair and put them into your `.env.production` file. Run the command below to create `VAPID_PRIVATE_KEY` and `VAPID_PUBLIC_KEY` then copy the result into the `.env.production` file: 

    docker-compose run --rm web rake mastodon:webpush:generate_vapid_key

Then you should run the `db:setup` command to create the database:

    docker-compose run --rm web rake db:setup

Then, you will also need to precompile the assets:

    docker-compose run --rm web rake assets:precompile

before you can launch the docker image with:

    docker-compose up

If you wish to run this as a daemon process instead of monitoring it on console, use instead:

    docker-compose up -d

## Configuration

Then you may login to your new Mastodon instance by browsing to http://localhost:3000/

If you set `LOCAL_HTTPS` to true before, you have to prepare your TLS nginx first [production guide](Production-guide.md) because connecting to port 3000 redirects you to HTTPS. 

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

1. `git fetch` to download updates from the repository.
2. Now you need to tell git to use those updates. You have probably changed your `docker-compose.yml` file. Check with `git status`.
  - If the `docker-compose.yml` file is modified, run `git stash` to stash your changes.
3. `git checkout TAG_NAME` to use the tag code. (If you have committed changes, use `git merge TAG_NAME` instead, though this isn't likely.)
4. Only if you ran `git stash`, now run `git stash pop` to redo your changes to `docker-compose.yml`. Double check the contents of this file.
5. Build the updated Mastodon image. 
- If you are using a prebuilt image: First, edit the `image: gargron/mastodon` lines in `docker-compose.yml` to include the tag for the new version. E.g. `image: gargron/mastodon:v2.2.0`
- To pull the prebuilt image, or build your own from the updated code: `docker-compose build`
6. (optional) `docker-compose run --rm web rake db:migrate` to perform database migrations. Does nothing if your database is up to date.
7. (optional) `docker-compose run --rm web rake assets:precompile` to compile new JS and CSS assets.
8. Follow any other special instructions in the release notes.
9. `docker-compose up -d` to re-create (restart) containers and pick up the changes.
