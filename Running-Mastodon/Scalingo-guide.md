Scalingo guide
==============

## Initial deployment

[![Deploy on Scalingo](https://cdn.scalingo.com/deploy/button.svg)](https://my.scalingo.com/deploy?source=https://github.com/tootsuite/mastodon#master)

1. Click the above button.
2. Fill in the options requested.
  * You can use a .scalingo.io domain, which will be simple to set up, or you can use a custom domain.
  * You will want Amazon S3 for file storage. The only exception is for development purposes, where you may not care if files are not saved. Follow a guide online for creating a free Amazon S3 bucket and Access Key, then enter the details.
  * If you want your Mastodon to be able to send emails, configure SMTP settings here (or later). Consider using [Mailgun](https://mailgun.com) or similar, who offer free plans that should suit your interests.
3. Deploy! The app should be set up, with a working web interface and database. You can change settings and manage versions from the Scalingo dashboard.
4. Register for an account on your instance, then use the `scalingo` CLI to make yourself admin: `scalingo -a yourapp run -e USERNAME=yourusername rails mastodon:make_admin`.
5. Configure site-specific settings as appropriate in Settings > Administration.
6. Everything is done.

## Using a custom domain

> Note: an SSL/TLS certificate will automatically be provisioned by Scalingo using Lets Encrypt.

1. Set a `CNAME` to the `scalingo.io` subdomain you created for your app.
2. Use the `scalingo` CLI to set up the virtual host: `scalingo -a yourapp domains-add example.com`

## Upgrading to newer versions of Mastodon

1. Install an SSH key in your Scalingo account: `scalingo -a yourapp keys-add keynamehere /path/to/key`
2. Check out the git repository Scalingo made for you.  For some reason, this will be empty by default.
3. Create a vendor branch in your git repository: `git checkout -b vendor`
4. Import the Mastodon sources of your choice, for example 1.3-stable: `git pull http://github.com/tootsuite/mastodon 1.3-stable`
5. Merge the vendor branch to master: `git checkout master && git merge vendor`
6. Push to Scalingo: `git push`.
   > Note: Once the new application is deployed, it will be in an inconsistent state.
7. Run rails database migrations: `scalingo -a yourapp run -e RAILS_ENV=production rails db:migrate`
8. Restart all containers: `scalingo -a yourapp restart`
9. Everything is done.
