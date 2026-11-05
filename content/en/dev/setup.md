---
title: Setting up a dev environment
description: Instructions on how to start developing for Mastodon.
menu:
  docs:
    weight: 20
    parent: dev
---

## Development environment setup

To get a working Mastodon development environment, please refer to the [DEVELOPMENT.md](https://github.com/mastodon/mastodon/blob/main/docs/DEVELOPMENT.md) file in the repository.

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
