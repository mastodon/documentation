---
title: Setting up a dev environment
description: Instructions on how to start developing for Mastodon.
menu:
  docs:
    weight: 20
    parent: dev
---

## Manual install from source {#manual}

You can follow the [pre-requisites instructions from the production guide]({{<relref "admin/install">}}), but do not create a `mastodon` user. You also don't have to install `nginx`, `certbot` and `python-certbot-nginx` as the development environment brings its own webserver. Setting up and running a development environment has been proven successful over WSL2 as well if you are on Windows.

### Setup {#setup}

Run the following commands in the project directory:

```sh
bundle install
yarn install
```

In the development environment, Mastodon will use PostgreSQL as the currently signed-in Linux user using the `ident` method. Ensure that you have created a PostgreSQL user and database for your current signed-in user:

```sh
sudo -u postgres createuser $YOUR_USERNAME_HERE --createdb
```

You can now create the databases `mastodon_development` and `mastodon_test`, load the schema into them, and create seed data defined in `db/seeds/` into `mastodon_development`.

```sh
RAILS_ENV=development bin/rails db:setup
```

You can now launch `http://localhost:3000` in your browser and log in with the default admin user (`admin@localhost` / `mastodonadmin`).

{{<hint style="warning">}}
By default, Mastodon will run on port 3000. If you configure a different port for it, the generated admin account will use that number as well.
{{</hint>}}

### Running {#running}

There are multiple processes that need to be run for the full set of Mastodon’s functionality, although they can be selectively omitted. To run all of them with just one command, you can install and use Foreman:

```sh
gem install foreman --no-document
bin/dev
```

This will start processes defined in `Procfile.dev`, which will give you: a Rails web server, a Vite server for assets, a streaming API server, and Sidekiq for background jobs. Of course, you can run any of those things stand-alone depending on your needs.

## Working with emails in development

In development mode, Mastodon will use a gem called [Letter Opener](https://github.com/ryanb/letter_opener) for "sending" emails, which allows you to debug emails in your browser, without actually having to send emails via an SMTP server.

In order to work with emails, you'll need Sidekiq, Redis and PostgreSQL running, and then emails can be viewed by visiting: `http://localhost:3000/letter_opener/`

If you're developing in docker, you'll need to set the `REMOTE_DEV=true` environment variable.

## Preparing to run tests

Set up the test database:

```sh
RAILS_ENV=test bin/rails db:setup
```

Generate test-mode precompiled assets:

```sh
RAILS_ENV=test bin/rails assets:precompile
```

## Useful commands for testing {#testing}

`RAILS_ENV=test bin/rspec`
: Run the Ruby test suite

`yarn run test`
: Run the JavaScript test suite

`bin/rubocop`
: Check the Ruby code for conformance with our code style

## Updating your development instance {#update}

`bundle install`
: Update Ruby gems and install any new dependencies

`yarn install`
: Update JavaScript packages and install any new dependencies

`RAILS_ENV=development bin/rails db:migrate`
: Run new database migrations for your development instance's database
