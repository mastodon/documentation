# List of Rake tasks
The list of Rake tasks.

If you want to confirm all Rake tasks from command line interface, you can run the following.

```sh
bundle exec rails rake -T
```

**General usage note:** Remember that each command will be invoked in a particular environment (configuration, database). The default environment when nothing is specified is "development". In production, you usually prepend all commands with `RAILS_ENV=production` to opt into the production environment. This is not necessary if you're using the Docker images, because that environment variable is set in the image for you. Similarly, prepending `bundle exec` is not necessary when using Docker. The following invocations are equivalent:

Standalone: `RAILS_ENV=production bundle exec rake mastodon:users:admins`  
Docker: `docker-compose run --rm web rake mastodon:users:admins`

Furthermore, in the command, `rake` is interchangeable with `rails`

#### Administrative

|Task|Description|Usage|
|----|-----------|-----|
|mastodon:make_admin|Turn a user into an admin|USERNAME=yourname|
|mastodon:confirm_email|Confirm a user manually|USER_EMAIL=your@email|
|mastodon:add_user|Create new user|(Interactive)|
|mastodon:users:admins|List e-mails of all admins|
|mastodon:settings:open_registrations|Open up registrations|
|mastodon:settings:close_registrations|Close down registrations|

#### Media Storage

|Task|Description|Usage|
|----|-----------|-----|
|mastodon:media:remove_silenced|Purge all media uploads by silenced accounts. Completely removes records, as if their statuses never had attachments|
|mastodon:media:remove_remote|Remove local cache of remote media attachments older than some time period (defaults to 7 days). Removes only cache, record of an attachment existing remains|NUM_DAYS=7|

#### E-mails

|Task|Description|Usage|
|----|-----------|-----|
|mastodon:emails:digest|Sends out a personal digest to all eligible inactive users. Digest includes mentions since the last time the user was active. No e-mail is sent if there is no new content since last digest or user activity|

#### Misc

|Task|Description|Usage|
|----|-----------|-----|
|mastodon:push:clear| Normally, a subscription to a once-followed user remains forever, in case the user gets re-followed later. You can purge such subscriptions with 0 followers if you wish|
|mastodon:feeds:clear_all|Purge all home timelines from redis. Useful only for troubleshooting, when e.g. resetting database during development|
|mastodon:feeds:build|Regenerates home timelines for all active users. Useful only for troubleshooting, e.g. if you lost your redis database|
|mastodon:webpush:generate_vapid_key|Generates secrets for WebPush notifications|
 
#### Data migrations

These are one-off tasks for updating from one version of Mastodon to another. They are noted in the particular release's upgrade notes and are not relevant outside of that.

|Task|Description|Usage|
|----|-----------|-----|
|mastodon:media:set_unknown|Only relevant for a past release|
|mastodon:maintenance:update_counter_caches|Only relevant for a past release|
|mastodon:maintenance:add_static_avatars|Only relevant for a past release|
|mastodon:maintenance:prepare_for_foreign_keys|Only relevant for a past release|
