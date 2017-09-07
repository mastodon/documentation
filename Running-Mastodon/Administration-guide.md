Administration guide
====================

So, you have a working Mastodon instance... now what?

## Turning into an admin

The following rake task:

    RAILS_ENV=production bundle exec rails mastodon:make_admin USERNAME=alice

or, if using docker:

    docker-compose run --rm web rails mastodon:make_admin USERNAME=alice


Would turn the local user "alice" into an admin.

## Administration web interface

A user that is designated as `admin = TRUE` in the database is able to access a suite of administration tools:

* View, edit, silence, or suspend users - https://yourmastodon.instance/admin/accounts
* View PubSubHubbub subscriptions - https://yourmastodon.instance/admin/pubsubhubbub
* View domain blocks - https://yourmastodon.instance/admin/domain_blocks
* Sidekiq dashboard - https://yourmastodon.instance/sidekiq
* PGHero dashboard for PostgreSQL - https://yourmastodon.instance/pghero
* Edit site settings - https://yourmastodon.instance/admin/settings

## Site settings

Your site settings are stored in the `settings` database table, and editable through the admin interface at https://yourmastodon.instance/admin/settings.

You are able to set the following settings:

- Site title
- Contact username
- Contact email
- Site description
- Site extended description

You may wish to use the extended description (shown at https://yourmastodon.instance/about/more ) to display content guidelines or a user agreement (see https://mastodon.social/about/more for an example).

## Confirming Users Manually

The following rake task:

    RAILS_ENV=production bundle exec rails mastodon:confirm_email USER_EMAIL=alice@alice.com

or, in Docker,

    docker-compose run --rm web rails mastodon:confirm_email USER_EMAIL=alice@alice.com

Will confirm a user manually, in case they don't have access to their confirmation email for whatever reason.

## Clearing Unconfirmed Users Manually

    RAILS_ENV=production rake mastodon:users:clear
    
Will remove users that never confirmed their e-mail and never signed in, meaning they
only have a user record and an avatar record, with no files uploaded.

## Creating Users while Registration is Closed

    RAILS_ENV=production bundle exec rails c
    account = Account.create!(username: 'username')
    user = User.create!(email: 'email', password: 'password', account: account)
    user.confirm
    account.save!
    user.save!

This will create a new user as if they had walked through the registration process and confirmed their account, and will immediately be able to log in.  Make sure the user resets their password away from the temporary password you give them!

## Bulk Subscribing to Initilly Populate FTL
When an instance has been freshly created, it knows of very few accounts, and can only discover new ones and new servers via local users interacting with remote users. New local account entries will be constantly made as toots from currently-known accounts interact with or mention previously unknown accounts.

While waiting for local users to follow remote users will gradually populate the federated timeline, initial bulk subscribing can much more rapidly discover users your community is likely to be interested in., avoiding the "deserted wasteland" feeling of a crawling FTL. Once you've used a real account to follow a handful of active, worthwhile individuals on other servers, wait for a bit to accumulate known accounts from seeing them interact. While your server knows of these newly encountered accounts, we must subscribe to them if we want them to appear in our FTL.

The simplest approach is to just attempt to subscribe to every account you're not yet subscribed to. To do this, open an interactive rails console on your server:

    RAILS_ENV=production bundle exec rails c

or in docker:

    docker-compose run --rm web rails c

Then find all not-yet-subscribed-to accounts and bulk subscribe to them. THIS WILL ALMOST CERTAINLY RAPIDLY EXPAND THE SET OF KNOWN ACCOUNTS in a ballpark-exponential manner over multiple cycles, potentially resulting in excessive DB growth and FTL flooding if done too many times. Be Reasonable.
    
    uns = Account.where(subscription_expires_at: nil)
    Pubsubhubbub::SubscribeWorker.push_bulk(uns.partitioned.pluck(:id))


## Activity monitoring

Munin graphs can be generated to track your instance activity.

* https://github.com/cquest/mastodon-munin-plugins
* https://framagit.org/framasoft/munin-plugins/tree/master/mastodon
* https://github.com/0xa/mastodon-munin

## Mastodon-admin mailing list

There's a mailing list open for mastodon instance admins at
https://lists.ffdn.org/wws/info/mastodon-admin. Feel free to join that list for all your questions and to get some feedback 
from other admins!
