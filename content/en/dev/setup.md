---
title: Setting up a dev environment
description: Instructions on how to start developing for Mastodon.
menu:
  docs:
    weight: 20
    parent: dev
---

### Pre-requisites {#prerequisites}

You can follow the [pre-requisites instructions from the production guide](https://docs.joinmastodon.org/admin/install/), but do not create a `mastodon` user. You also don't have to install `nginx`, `certbot` and `python-certbot-nginx` as the development environment brings its own webserver. Setting up and running a development environment has been proven successful over WSL2 as well if you are on Windows.

### Setup {#setup}

Run following commands in the project directory `bundle install`, `yarn install`.

In the development environment, Mastodon will use PostgreSQL as the currently signed-in Linux user using the `ident` method, which usually works out of the box. The one command you need to run is `rails db:setup` which will create the databases `mastodon_development` and `mastodon_test`, load the schema into them, and then create seed data defined in `db/seed.rb` in `mastodon_development`. The only seed data is an admin account with the credentials `admin@localhost:3000` / `mastodonadmin`.

> Please keep in mind, by default Mastodon will run on port 3000. If you configure a different port for it, the generated admin account will use that number.

If `rails db:setup` gives you the Postgres error:

    ActiveRecord::NoDatabaseError: FATAL:  role "your_user_name" does not exist

(where `your_user_name` is your username), then run:

    sudo -u postgres createuser your_user_name --createdb

This will create the necessary Postgres user with the permission to create a database.

### Running {#running}

There are multiple processes that need to be run for the full set of Mastodon’s functionality, although they can be selectively omitted. To run all of them with just one command, you can install Foreman with `gem install foreman --no-document` and then use:

```text
foreman start
```

In the Mastodon directory. This will start processes defined in `Procfile.dev`, which will give you: A Rails server, a Webpack server, a streaming API server, and Sidekiq. Of course, you can run any of those things stand-alone depending on your needs.

### Testing {#testing}

| Command | Description |
| :--- | :--- |
| `rspec` | Run the Ruby test suite |
| `yarn run test` | Run the JavaScript test suite |
| `rubocop` | Check the Ruby code for conformance with our code style |

