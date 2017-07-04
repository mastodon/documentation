# List of Rake tasks
The list of Rake tasks.

If you want to confirm all Rake tasks from command line interface, you can run the following.

```sh
bundle exec rails rake -T
```

## mastodon:daily
Execute daily tasks.

```sh
bundle exec rails mastodon:daily
```

## mastodon:make_admin
Turn a user into an admin, identified by the USERNAME environment variable.

```sh
bundle exec rails mastodon:make_admin USERNAME=alice
```

In the example above, the user `alice` is turned into an admin.

## mastodon:confirm_email
Manually confirms a user with associated user email address stored in USER_EMAIL environment variable.

```sh
bundle exec rails mastodon:confirm_email USER_EMAIL=alice@alice.com
```

In the example above, the registration of the user with the email `alice@alice.com` is completed.

## mastodon:add_user
Add a user by providing their email, username and initial password. The user will receive a confirmation email, then they must reset their password before logging in.

```sh
bundle exec rails mastodon:add_user
```

## mastodon:media:clear
Removes media attachments that have not been assigned to any status for longer than a day.

```sh
bundle exec rails mastodon:media:clear
```

## mastodon:media:remove_silenced
Remove media attachments attributed to silenced accounts.

```sh
bundle exec rails mastodon:media:remove_silenced
```

## mastodon:media:remove_remote
Remove cached remote media attachments that are older than a week.

```sh
bundle exec rails mastodon:media:remove_remote
```

## mastodon:media:set_unknown
Set unknown attachment type for remote-only attachments.

```sh
bundle exec rails mastodon:media:set_unknown
```

## mastodon:push:clear
Unsubscribes from PuSH updates of feeds nobody follows locally.

```sh
bundle exec rails mastodon:push:clear
```

## mastodon:push:refresh
Re-subscribes to soon expiring PuSH subscriptions.

```sh
bundle exec rails mastodon:push:refresh
```

## mastodon:feeds:clear
Clear timelines of inactive users.

```sh
bundle exec rails mastodon:feeds:clear
```

## mastodon:feeds:clear_all
Clears all timelines.

```sh
bundle exec rails mastodon:feeds:clear_all
```

## mastodon:emails:digest
Send out digest e-mails.

```sh
bundle exec rails mastodon:emails:digest
```

## mastodon:users:clear
Clear out unconfirmed users.

```sh
bundle exec rails mastodon:users:clear
```

## mastodon:users:admins
List all admin users.

```sh
bundle exec rails mastodon:users:admins
```

## mastodon:settings:open_registrations
Open registrations on this instance.

```sh
bundle exec rails mastodon:settings:open_registrations
```

## mastodon:settings:close_registrations
Close registrations on this instance.

```sh
bundle exec rails mastodon:settings:close_registrations
```

## mastodon:maintenance:update_counter_caches
Update counter caches.

```sh
bundle exec rails mastodon:maintenance:update_counter_caches
```

## mastodon:maintenance:add_static_avatars
Generate static versions of GIF avatars/headers.

```sh
bundle exec rails mastodon:maintenance:add_static_avatars
```

## mastodon:maintenance:prepare_for_foreign_keys
Ensure referencial integrity.

```sh
bundle exec rails mastodon:maintenance:prepare_for_foreign_keys
```
