---
title: Setting up a dev environment
description: Instructions on how to start developing for Mastodon.
menu:
  docs:
    weight: 20
    parent: dev
---

## Quick start with Vagrant {#vagrant}

For convenience, the Mastodon repository includes a Vagrantfile for quickly setting up a development environment without manual configuration. To use this development environment, install [Vagrant](https://vagrantup.com) using a binary executable or through your package manager.

Once you have Vagrant installed, for convenience, it is recommended to install a plugin to automatically update your machine's hosts file. This will allow you to access the dev environment at `http://mastodon.local` without manually editing the hosts file yourself. To do so:

```sh
vagrant plugin install vagrant-hostsupdater
```

The virtual machine can then be started:

```sh
vagrant up
```

Once the virtual machine has been started, you may launch the Foreman task executor to launch the various Mastodon processes:

```sh
vagrant ssh -c "cd /vagrant && foreman start"
```

Once the Mastodon processes have fully started up, you can load `http://mastodon.local` in your browser to access the Mastodon instance within the VM. You can log in as the default admin user with the username `admin@mastodon.local` and the password `mastodonadmin`.

Any changes to the source code will be reflected after saving your files.

To reset the VM to a fresh state, you can destroy it and bring it up again:

```sh
vagrant destroy
vagrant up
```

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
rails db:setup
```

You can now launch `http://localhost:3000` in your browser and log in with the default admin user (`admin@localhost` / `mastodonadmin`).

{{<hint style="warning">}}
By default, Mastodon will run on port 3000. If you configure a different port for it, the generated admin account will use that number as well.
{{</hint>}}

### Running {#running}

There are multiple processes that need to be run for the full set of Mastodon’s functionality, although they can be selectively omitted. To run all of them with just one command, you can install and use Foreman:

```sh
gem install foreman --no-document
foreman start
```

This will start processes defined in `Procfile.dev`, which will give you: A Rails server, a Webpack server, a streaming API server, and Sidekiq. Of course, you can run any of those things stand-alone depending on your needs.

## Working with emails in development

In development mode, Mastodon will use a gem called [Letter Opener](https://github.com/ryanb/letter_opener) for "sending" emails, which allows you to debug emails in your browser, without actually having to send emails via an SMTP server.

In order to work with emails, you'll need Sidekiq, Redis and PostgreSQL running, and then emails can be viewed by visiting: `http://localhost:3000/letter_opener/`

If you're developing in docker, you'll need to set the `REMOTE_DEV=true` environment variable.

## Useful commands for testing {#testing}

`rspec`
: Run the Ruby test suite

`yarn run test`
: Run the JavaScript test suite

`rubocop`
: Check the Ruby code for conformance with our code style

## Updating your development instance {#update}

`bundle install`
: Update Ruby gems and install any new dependencies

`yarn install`
: Update Javascript packages and install any new dependencies

`RAILS_ENV=development rails db:migrate`
: Run new database migrations for your development instance's database
