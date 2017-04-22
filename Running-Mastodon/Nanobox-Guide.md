Nanobox Guide
=============

[Nanobox](https://nanobox.io/) lets you develop apps in an environment identical
to (or at least nearly so) the environment it will deploy to. It supports
deploying to [multiple cloud providers](https://github.com/nanobox-io/nanobox-provider-integrations),
so you have lots of choices about where your instance will run.

Development
-----------

You will need Nanobox installed, along with Docker if you're on Linux (Windows
and macOS can use Docker Native, but the bundled VirtualBox is more performant
while the Docker team works out some filesystem speed issues). The process is
simple - clone the repo, set a few variables with `nanobox evar add local
{VARIABLE}={value}` (see below on which ones need to be set), and run `nanobox
run` to get to a console. It will take some time to build your local dev
environment, but once it's done, simply set up the DB using `bundle exec rake
db:setup` as normal, and you're off.

Production
----------

To deploy, you'll need to create an application in [your Nanobox dashboard](https://dashboard.nanobox.io/apps)
(which requires a [Nanobox.io](https://dashboard.nanobox.io/users/register)
account), clone the repo (if you haven't already set up the local development
environment), set the new app as your deploy target with `nanobox remote add
{app-name}`, set up the variables below using either `nanobox evar add
{VARIABLE}={value}` or the app's dashboard, and then run `nanobox deploy`.

Updating
--------

To update, simply grab the latest tagged version with `git fetch && git checkout
$(git tag | tail -n 1)`, then re-run `nanobox deploy` - Nanobox automatically
handles the rest.

Environment Variables
---------------------

Mastodon will not run under Nanobox without first setting a handful of required
variables:

-   `RAILS_ENV` - set this to `production`, unless you're in development (this
    value is treated as `development` if it isn't set)

-   `NODE_ENV` - same as `RAILS_ENV`

-   `PAPERCLIP_SECRET` - set to a random string of characters; you can use
    `nanobox run bundle exec rake secret` to generate one

-   `SECRET_KEY_BASE` - set to a random string of characters; you can use
    `nanobox run bundle exec rake secret` to generate one

-   `OTP_SECRET` - set to a random string of characters; you can use `nanobox
    run bundle exec rake secret` to generate one

You can also set some optional values, which should override the defaults in
`.env.nanobox`:

-   `LOCAL_DOMAIN` - set to whatever domain you want to use as your instance
    name; defaults to `{app-name}.nanoapp.io`, which is provided by Nanobox for
    use as a CNAME target

-   `SINGLE_USER_MODE` - set this to `true` if you want to run a single-user
    instance; default is unset

And really any other setting you'd normally put into `.env.production`, such as:

-   `SMTP_SERVER` - your SMTP server's address; default is blank

-   `SMTP_PORT` - your SMTP server's port number; defaults to 587, which is
    almost always correct

-   `SMTP_LOGIN` - your SMTP username; default is blank

-   `SMTP_PASSWORD` - your SMTP password; default is blank

-   `SMTP_FROM_ADDRESS` - this instance's emails will come from this address;
    defaults to `notifications@{app-name}.nanoapp.io`

-   etc...
