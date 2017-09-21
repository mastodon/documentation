Development guide
=================

**Don't use Docker to do development**. It's a quick way to get Mastodon running in production, it's **really really inconvenient for development**. Normally in Rails development environment you get hot reloading of backend code and on-the-fly compilation of assets like JS and CSS, but you lose those benefits by compiling a Docker image. If you want to contribute to Mastodon, it is worth it to simply set up a proper development environment.

## Linux

In fact, all you need is described in the [production guide](Production-guide.md), **with the following exceptions**. You **don't** need:

- Nginx
- Systemd
- An `.env.production` file. If you need to set any environment variables, you can use an `.env` file
  - Use `LOCAL_HTTPS=false` if developing on the same machine
- To prefix any commands with `RAILS_ENV=production` since the default environment is "development" anyway
- Any cronjobs

The command to install Ruby project dependencies is the following:

    bundle install

Install JavaScript dependencies with this command:

    yarn install --pure-lockfile

By default the development environment wants to connect to a `mastodon_development` database on localhost using your user/ident to login to Postgres (i.e. not a md5 password)

To setup the `mastodon_development` database, run:

    bundle exec rails db:setup

You can then run Mastodon with:

    bundle exec rails server

Since 1.4, we are using Webpack, which in development environment needs to be started as well as the command above:

    ./bin/webpack-dev-server
    
Another, optional approach to managing the different processes starting (Rails, Webpack, Sidekiq, and the Streaming API) is to use the foreman tool.

    gem install foreman
    foreman start

Finally, open `http://localhost:3000` in your browser.

By default, your development environment will have an admin account created for you to use - the email address will be `admin@YOURDOMAIN` (e.g. admin@localhost:3000) and the password will be `mastodonadmin`.

You can run tests with:

    rspec

You can check localization status with:

    i18n-tasks health

You can check code quality with:

    rubocop

## Mac

These are self-contained instructions for setting up a development environment on a macOS system. It is assumed that you’ve cloned your fork of Mastodon to a local working directory and that you are in Terminal and in that directory.

### Prerequisites

- Get [Xcode](https://developer.apple.com/xcode/) Command Line Tools:

	```
	xcode-select --install
	```

- Get [Homebrew](https://brew.sh) and use it to install the other dependencies:

	```
	brew install imagemagick ffmpeg yarn postgresql redis rbenv nodejs protobuf
	```

- Configure Rbenv:

	```
	rbenv init
	rbenv install 2.4.1
	```

- Install/configure bundler to use your local rbenv:

	```
	gem update --system
	gem install bundler
	rbenv rehash
	```

- Configure [PostgreSQL](https://www.postgresql.org):

	```
	initdb /usr/local/var/postgres -E utf8
	createdb
	export PGDATA=/usr/local/var/postgres
	/usr/local/bin/postgres
	/usr/local/bin/psql
	```

	In the prompt:

	```
	CREATE USER mastodon CREATEDB;
	\q
	```

### Installation

```
brew install libidn
bundle install --with development
yarn install --pure-lockfile
gem install foreman --no-ri --no-rdoc
bundle exec rails db:setup
bin/rails assets:precompile
```

### Running

In separate Terminal windows/tabs:

1. Start PostgreSQL: `/usr/local/bin/postgres`
2. Start Redis: `redis-server`
3. Start Mastodon (from the Mastodon folder): `foreman start`

Go to http://localhost:3000 to see your development instance.

Admin account is `admin@localhost:3000`. Password is `mastodonadmin`.

## Bash on Windows

_**Note:** Mastodon was not designed for Bash on Windows and may break. The dev team may not have access to Windows boxes and may not be able to help you if it breaks._

To run Mastodon on [Bash on Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/about), you can follow the Ubuntu instructions with some small tweaks.

First off, `rbenv` doesn't work, so you must follow [Dave Rupert's Ruby on Rails tutorial](http://daverupert.com/2016/06/ruby-on-rails-on-bash-on-ubuntu-on-windows/), except instead of Ruby 2.3 you will want 2.4.1, so do:

    sudo apt-add-repository ppa:brightbox/ruby-ng
    sudo apt update
    sudo apt install ruby2.4 ruby2.4-dev ruby-switch

Second off, `ffmpeg` isn't available by default and so you must run:

    sudo add-apt-repository ppa:mc3man/trusty-media
    sudo apt-get update
    sudo apt-get dist-upgrade
    sudo apt-get install ffmpeg

## Development tips

You can use a localhost->world tunneling service like [ngrok](https://ngrok.com) if you want to test federation, **however** that should not be your primary mode of operation. If you want to have a permanently federating server, set up a proper instance on a VPS with a domain name, and simply keep it up to date with your own fork of the project while doing development on localhost.

Ngrok and similar services give you a random domain on each start up. This is good enough to test how the code you're working on handles real-world situations. But as soon as your domain changes, for everybody else concerned you're a different instance than before.

Generally, federation bits are tricky to work on for exactly this reason - it's hard to test. And when you are testing with a disposable instance you are polluting the databases of the real servers you're testing against, usually not a big deal but can be annoying. The way I have handled this so far was thus: I have used ngrok for one session, and recorded the exchanges from its web interface to create fixtures and test suites. From then on I've been working with those rather than live servers.

I advise to study the existing code and the RFCs before trying to implement any federation-related changes. It's not *that* difficult, but I think "here be dragons" applies because it's easy to break.

If your development environment is running remotely (e.g. on a VPS or virtual machine), setting the `REMOTE_DEV` environment variable will swap your instance from using "letter opener" (which launches a local browser) to "letter opener web" (which collects emails and displays them at /letter_opener ).
