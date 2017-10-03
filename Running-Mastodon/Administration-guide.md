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

## Helping users in trouble

Under "Administration" -> "Accounts" you can find your users' accounts. You can:

- Manually confirm their account, in case they don't have access to their confirmation email for whatever reason
- Disable their two factor authentication, in case they lost access and backup codes
- Reset their password, which will send them an e-mail with a link to a form to set a new one

## Creating users while registration is closed

The following rake task:

    RAILS_ENV=production bundle exec rails mastodon:add_user

This will guide you through creating a new user interactively. The user will get a confirmation e-mail.

## Moderating content

You will e-mail notifications for new reports. Your users can report toots and accounts. You will find those reports under "Administration" -> "Reports". Your options for dealing with reports are as follows:

- Mark as resolved: Just dismiss the report without taking any action.
- Suspend the offender: This is the harshest option which will permanently remove all content from the user from your server and prevent them from posting again.
- Silence the offender: Comparable to shadowban or sandbox. This hides the user from anyone who isn't following them. The offender sees only other silenced accounts in the public timelines.
- Delete the offending toot(s).
- Switch the media sensitivity toggle on the offending toot(s).

When a whole instance is engaging in mass-scale hostile activity (spam, vandalism or harrassment), you can save yourself the effort of dealing with individual users by domain-blocking instead. You can create the following domain blocks:

- Severity: None. Doesn't actually do anything by itself. Useful for choosing the "reject media" option without any other effects.
- Severity: Silence. Applies silence (described in previous list) to all past and future accounts from the domain.
- Severity: Suspend: Applies suspend (described in previous list) to all past and future accounts from the domain.

Additionally you can toggle the "reject media" option. When enabled, media files from the domain will not be downloaded to your servers. That includes users' avatars and headers as well as media attachments for toots.

## Reactivating a previously deleted user

    RAILS_ENV=production bundle exec rails c
    # in rails console.
    account = Account.find_by(username: 'username', domain: nil)
    account.suspended = false
    user = User.create!(email: 'email', password: 'password', account: account)
    user.confirm
    account.save!
    user.save!

This will create a new user associated with the old account_id. They'll not have any followings, followers nor toots but depending on how much time has passed since the deletion, they might still appear in their old federated followers timeline. Previous federated toots might not have been deleted too.

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
