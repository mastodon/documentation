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

A user that is designated as `admin = TRUE` in the database is able to access a suite of administration tools, accessible from the sidebar under "Administration" from the preferences/edit profile page.

## Site settings

Your site settings are stored in the `settings` database table, and editable through the admin interface under "Administration" -> "Site settings".

You are able to set settings such as, among others:

- Site title
- Contact username
- Contact email
- Site description
- Site extended description

You may wish to use the extended description (shown at https://yourmastodon.instance/about/more ) to display content guidelines or a user agreement (see https://mastodon.social/about/more for an example).

## Confirming users manually

The following rake task:

    RAILS_ENV=production bundle exec rails mastodon:confirm_email USER_EMAIL=alice@alice.com

Will confirm a user manually, in case they don't have access to their confirmation email for whatever reason.

## Creating users while registration is closed

    RAILS_ENV=production bundle exec rails mastodon:add_user

This will guide you through creating a new user interactively. The user will get a confirmation e-mail.

## Activity monitoring

Munin graphs can be generated to track your instance activity.

* https://github.com/cquest/mastodon-munin-plugins
* https://framagit.org/framasoft/munin-plugins/tree/master/mastodon
* https://github.com/0xa/mastodon-munin

## Other admins

- There is a [Discourse messaging board](https://discourse.joinmastodon.org)
- There's a mailing list at https://lists.ffdn.org/wws/info/mastodon-admin.

Feel free to join for all your questions and to get some feedback from other admins!

## Instance directory

If you want your instance to appear on the instance picker on joinmastodon.org or the instance directory/wizard on instances.social, you can [submit it to instances.social here](https://instances.social/admin)
