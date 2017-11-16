Heroku guide
============

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?button-url=https://github.com/tootsuite/mastodon&template=https://github.com/tootsuite/mastodon)

Mastodon on [Heroku](https://heroku.com) requires more than one Dyno. In theory
and experience, running on free hobby Dynos is not practical for production use.
Running on Heroku's hobby Dynos and free add-on tiers has limited testing
purposes and is not recommended in production. See [#1275](https://github.com/tootsuite/mastodon/issues/1275)
for details.

## Limitations

Currently heroku setup has two main technical limitations:

- Animated GIF upload requires extra setup ([#1007](https://github.com/tootsuite/mastodon/issues/1007)).
- Streaming API requires extra setup ([#1119](https://github.com/tootsuite/mastodon/issues/1119)).
  

## Basic setup

Click the button above to start creating a Heroku app with the Mastodon repo as
the source. This tells Heroku to use the `app.json` file which does things like
prompt for config variables, set up the right buildpacks, run a postdeploy task,
and add the appropriate addons.

If you don't use the deploy button and app.json approach, you will need to do
some of that manually.

## Domain names and SSL

You can add your domain name to the Heroku app's setting, and then also use
Heroku's (free) auto renewal program for Lets Encrypt certificates, by
requesting a cert from the settings screen. You'll have to point your hostname
DNS at Heroku using the values heroku gives you on this screen, using whatever
method is appropriate for your DNS setup.

You should set the Heroku config vars of `LOCAL_DOMAIN` to your hostname, and
`LOCAL_HTTPS` to "true" as well.

## Email

Consider using [Mailgun](https://mailgun.com) or similar, who offer free plans
that should suit your interests. Look in `.env.production.sample` to see which SMTP variables you need to set.

Note: just adding the Mailgun add-on is not enough. You will need to verify Mailgun, at which point you can use the sandbox domain _IF_ you verify individual email addresses to send to, but if you want this to work with arbitrary email addresses, you will need to add and verify your own domain, which will require DNS changes. Adding your own domain also generates a new postmaster adddress and password, so complete this before editing config variables for best results.

## File storage

You will want Amazon S3 for file storage. The only exception is for development
purposes, where you may not care if files are not saved. Follow a guide online
for creating a free Amazon S3 bucket and Access Key, then enter the details.

If you deploy from the web, the format for all the S3 bits use Paperclip conventions:

S3 Bucket is just the name of the bucket, e.g. `bucketname` not the full ARN.

S3 Region is the AWS code for the region e.g. `ap-northeast-1` not the name of the city displayed on the AWS Dashboard.

To protect the privacy of the users of the your instance, you should have permissons on the your S3 bucket set to no-read and no-write for the public and non-application-specific AWS users, with only one authorized IAM user or group set up to be able to upload or display content. This is an example of an IAM policy used for the S3 bucket:

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "s3:ListAllMyBuckets"
                ],
                "Resource": [
                    "arn:aws:s3:::*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:*"
                ],
                "Resource": [
                    "arn:aws:s3:::mastodon",
                    "arn:aws:s3:::mastodon/*"
                ]
            }
        ]
    }


## Deployment

You can deploy from the Heroku web interface or from the command line. Run:

  `heroku run rails db:migrate`

after you first deploy to set up the first database.

To make yourself an admin, you may need to use the `heroku` CLI application after creating an account online:

  `heroku run rake mastodon:make_admin USERNAME=yourUsername`
