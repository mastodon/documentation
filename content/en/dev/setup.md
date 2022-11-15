---
title: Setting up a dev environment
description: Instructions on how to start developing for Mastodon.
menu:
  docs:
    weight: 20
    parent: dev
---

### Pre-requisites {#prerequisites}

The following programs are required to be installed to develop Mastodon:

| Program | Debian package |
| :--- | :--- |
| Ruby | `ruby` and `ruby-dev` |
| PostgreSQL | `postgresql` and `libpq-dev` |
| Redis | `redis` |
| Bundle | `ruby-bundler` |
| Yarn | `yarnpkg` |
| libicu | `libicu-dev` |
| libidn | `libidn-dev` |
| libz | `libz-dev` |

To install all of the required packages on Debian:

```
# apt install ruby ruby-dev postgresql libpq-dev redis ruby-bundler yarnpkg libicu-dev libidn-dev libz-dev
```

### Setup {#setup}

First, enable the PostgreSQL and Redis services. This will depend on your operating system, but on Linux distributions using systemd (such as Debian, Fedora, and Arch Linux), it should be:

```
# systemctl start postgresql.service
# systemctl start redis.service
```

Then, run the following commands in the project directory::

```
$ bundle config set --local path 'vendor/bundle'
$ bundle install
$ export RAILS_ENV=development
$ bin/rails yarn:install
$ bin/rails webpacker:compile
$ bin/rails db:setup
```

> On Debian, `yarn` was renamed to `yarnpkg` due to a naming conflict. You may have to run `# ln -s yarnpkg /usr/bin/yarn`, because some scripts expect to find an executable called `yarn`.

> If the last command fails with "role <username> does not exist", try running `sudo -u postgres createuser <username> --createdb` to create a new PostgreSQL user with your username.

> You may wish to add `export RAILS_ENV=development` to your shell initialization file, as it must be run every time you want to develop Mastodon.

### Running {#running}

To run the development server:

```
$ bundle exec foreman start
```

Go to `localhost:3000` and log in with username `admin`, e-mail `admin@localhost:3000`, and password `mastodonadmin`.

### Testing {#testing}

| Command | Description |
| :--- | :--- |
| `rspec` | Run the Ruby test suite |
| `yarn run test` | Run the JavaScript test suite |
| `rubocop` | Check the Ruby code for conformance with our code style |
