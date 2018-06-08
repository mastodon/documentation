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

And update localization files after adding new strings with:

    yarn manage:translations

You can check code quality with:

    rubocop

## OpenBSD

Follow the Linux setup as described above, but with these considerations:

- If you use a Ruby version manager (chruby, rbenv, rvm, etc.), you _must_
  configure Ruby with `CC=clang CXX=clang++`. This instructs Ruby to use that
  compiler when compiling native C gems.
- Many native C gems need to be told about `/usr/local`. You can do this by
  configuring a `build.gem_name` value using `bundle config`.
- Any C gem that uses mkmf.rb's `pkg_config` method might fail if the linker
  produces warnings, as happens when a library links with `sprintf(3)`. The
  `cld3` gem uses `pkg_config('protobuf')`; if you have protobuf installed but
  it cannot be found while building the gem, this is likely the problem. You
  will need to directly modify `mkmf.rb` to get this to install.

The bundle configuration as of Mastodon 2.0's Gemfile:

```sh
bundle config build.nokogiri --use-system-libraries --with-xml2-include=/usr/local/include/libxml2/ --with-opt-include=/usr/local/include --with-xslt-include=/usr/local/include/libxslt --with-exslt-include=/usr/local/include/libexslt --with-xml2-lib=/usr/local/lib
bundle config build.charlock_holmes --with-icu-dir=/usr/local --with-opt-dir=/usr/local
bundle config build.idn-ruby --with-idn-dir=/usr/local
```

Modify `mfmk.rb`:

```
@@ -655,7 +655,7 @@
   end
 
   def try_ldflags(flags, opts = {})
-    try_link(MAIN_DOES_NOTHING, flags, {:werror => true}.update(opts))
+    try_link(MAIN_DOES_NOTHING, flags, {:werror => false}.update(opts))
   end
 
   def append_ldflags(flags, *opts)
```

## Mac

These are self-contained instructions for setting up a development environment on a macOS system. It is assumed that you’ve cloned your fork of Mastodon to a local working directory and that you are in Terminal and in that directory.

### Prerequisites

- Get [Xcode](https://developer.apple.com/xcode/) Command Line Tools:

	```
	xcode-select --install
	```

- Get [Homebrew](https://brew.sh) and use it to install the other dependencies:

	```
	brew install imagemagick ffmpeg yarn postgresql redis rbenv nodejs protobuf libidn screen
	```

- Configure Rbenv:

	```
	rbenv init
	rbenv install 2.5.0
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
	export PGDATA=/usr/local/var/postgres
	screen -dmS postgres /usr/local/bin/postgres
	createdb
	/usr/local/bin/psql
	```
	
	(You can shut down the db later by running `screen -r postgres` and inside the postgres shell `ctrl+c`.)

	In the prompt:

	```
	CREATE USER mastodon CREATEDB;
	\q
	```

### Installation

```
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

## Development tips

You can use a localhost->world tunneling service like [ngrok](https://ngrok.com) if you want to test federation, **however** that should not be your primary mode of operation. If you want to have a permanently federating server, set up a proper instance on a VPS with a domain name, and simply keep it up to date with your own fork of the project while doing development on localhost.

Ngrok and similar services give you a random domain on each start up. This is good enough to test how the code you're working on handles real-world situations. But as soon as your domain changes, for everybody else concerned you're a different instance than before.

Generally, federation bits are tricky to work on for exactly this reason - it's hard to test. And when you are testing with a disposable instance you are polluting the databases of the real servers you're testing against, usually not a big deal but can be annoying. The way I have handled this so far was thus: I have used ngrok for one session, and recorded the exchanges from its web interface to create fixtures and test suites. From then on I've been working with those rather than live servers.

I advise to study the existing code and the RFCs before trying to implement any federation-related changes. It's not *that* difficult, but I think "here be dragons" applies because it's easy to break.

If your development environment is running remotely (e.g. on a VPS or virtual machine), setting the `REMOTE_DEV` environment variable will swap your instance from using "letter opener" (which launches a local browser) to "letter opener web" (which collects emails and displays them at /letter_opener ).
