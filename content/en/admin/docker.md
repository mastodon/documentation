---
title: Installing with Docker
description: Instructional guide on using Docker and docker-compose to run Mastodon
menu:
  docs:
    weight: 20
    parent: admin
---

## Docker

[![](https://images.microbadger.com/badges/version/tootsuite/mastodon.svg)](https://microbadger.com/images/tootsuite/mastodon "Get your own version badge on microbadger.com") [![](https://images.microbadger.com/badges/image/tootsuite/mastodon.svg)](https://microbadger.com/images/tootsuite/mastodon "Get your own image badge on microbadger.com")

The project now includes a `Dockerfile` and a `docker-compose.yml` file (which requires at least docker-compose version `1.10.0`).

## Prerequisites

- Working basic (Linux) server with Nginx (or Apache2; not officially supported).
- Recent stable version of [Docker](https://www.docker.com/community-edition).
- Recent stable version of [Docker-compose](https://github.com/docker/compose/releases/latest).

## Setting up

Clone Mastodon's repository.
    
    # Clone mastodon to ~/live directory
    git clone https://github.com/tootsuite/mastodon.git live
    # Change directory to ~/live
    cd ~/live
    # Checkout to the latest stable branch
    git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
    

Review the settings in `docker-compose.yml`. Note that it is **not default** to store the postgresql database and redis databases in a persistent storage location. If you plan on running your instance in production, you **must** uncomment the [`volumes` directive](https://github.com/tootsuite/mastodon/blob/972f6bc861affd9bc40181492833108f905a04b6/docker-compose.yml#L7-L16) in `docker-compose.yml`.

## Getting the Mastodon image

### Using a prebuilt image

If you're not making any local code changes or customizations on your instance, you can use a prebuilt Docker image to avoid the time and resource consumption of a build. Images are available from Docker Hub: https://hub.docker.com/r/tootsuite/mastodon/
    
To use the prebuilt images:

1. Open `docker-compose.yml` in your favorite text editor.
   1. Comment out the `build: .` lines for all images (web, streaming, sidekiq).
   2. Edit the `image: tootsuite/mastodon` lines for all images to include the release you want. The default is `latest` which is the most recent stable version, however it recommended to explicitly pin a version: If you wanted to use v2.2.0 for example, you would edit the lines to say: `image: tootsuite/mastodon:v2.2.0`
   3. Set a database password on the line with `POSTGRES_PASSWORD`. if it doesn't exist, add these two lines after `image: postgres:9.6-alpine`:
      ```
          environment:
            POSTGRES_PASSWORD: <your password here>
      ```
   4. Save the file and exit the text editor.
2. Run `cp .env.production.sample .env.production` to bootstrap the configuration. You will need to edit this file later.
3. Run `docker-compose build`. It will now pull the correct image from Docker Hub.
4. Set correct file-owner with `chown -R 991:991 public`

### Building your own image

You must build your own image if you've made any code modifications. To build your own image:

1. Open `docker-compose.yml` in your favorite text editor.
   1. Uncomment the `build: .` lines for all images (web, streaming, sidekiq) if needed.
   2. Save the file and exit the text editor.
2. Run `cp .env.production.sample .env.production` to bootstrap the configuration. You will need to edit this file later.
3. Run `docker-compose build`.
4. Set correct file-owner with `chown -R 991:991 public`

## Building the app

Now the image can be used to generate a configuration with:

    docker-compose run --rm web bundle exec rake mastodon:setup

This is an interactive wizard that will guide you through the basic and necessary options and generate new app secrets. At some point it will output your configuration, copy and paste that configuration into the `.env.production` file.

The wizard will setup the database schema and precompile assets. After it's done, you can launch Mastodon with:

    docker-compose up -d

## Configuration

Following that, make sure that you read the [production guide](Production-guide.md), beginning with the section that describes how to point Nginx to Mastodon.

The container has two volumes, for the assets and for user uploads, and optionally two more, for the postgresql and redis databases.

The default docker-compose.yml maps them to the repository's `public/assets` and `public/system` directories, you may wish to put them somewhere else. Likewise, the PostgreSQL and Redis images have data containers that you may wish to map somewhere where you know how to find them and back them up.

**Note**: The `--rm` option for docker-compose will remove the container that is created to run a one-off command after it completes. As data is stored in volumes it is not affected by that container clean-up.

## Running tasks

Running any of these tasks via docker-compose would look like this:

    docker-compose run --rm web bundle exec rake mastodon:media:clear

## Updating

This approach makes updating to the latest version a real breeze.

1. `git fetch` to download updates from the repository.
2. Now you need to tell git to use those updates. You have probably changed your `docker-compose.yml` file. Check with `git status`.
  - If the `docker-compose.yml` file is modified, run `git stash` to stash your changes.
3. `git checkout TAG_NAME` to use the tag code. (If you have committed changes, use `git merge TAG_NAME` instead, though this isn't likely.)
4. Only if you ran `git stash`, now run `git stash pop` to redo your changes to `docker-compose.yml`. Double check the contents of this file.
5. Build the updated Mastodon image. 
- If you are using a prebuilt image: First, edit the `image: tootsuite/mastodon` lines in `docker-compose.yml` to include the tag for the new version. E.g. `image: tootsuite/mastodon:v2.3.0`
- To pull the prebuilt image, or build your own from the updated code: `docker-compose build`
6. (optional) `docker-compose run --rm web bundle exec rake db:migrate` to perform database migrations. Does nothing if your database is up to date.
7. (optional) `docker-compose run --rm web bundle exec rake assets:precompile` to compile new JS and CSS assets.
8. Follow any other special instructions in the release notes.
9. `docker-compose up -d` to re-create (restart) containers and pick up the changes.
