---
title: Troubleshooting errors
menu:
  docs:
    weight: 120
    parent: admin
    identifier: admin-troubleshooting
---

## **I see an error page that says something went wrong. How do I find out what’s wrong?**

All error messages with stack traces are written to the system log. When using systemd, the logs of each systemd service can be browsed with `journalctl -u mastodon-web` (substitute with the correct service name). When using Docker, it’s similar: `docker logs mastodon_web_1` (substitute with the correct container name).

Specific details of server-side errors are _never_ displayed to the public, as they can reveal what your setup looks like internally and give attackers clues on how to get in, or how to abuse the system more efficiently.

Each response from Mastodon’s web server carries a header with a unique request ID, which is also reflected in the logs. By inspecting the headers of the error page, you can easily find the corresponding stack trace in the log.

## **I'm not seeing much in my logs. How do I enable additional logging/debugging information?**

By default your logs will show `info` level logging. To see more debugging messages, you can your `.env.production` file to increase the level, for the relevant service:

- **Web/Sidekiq:** Set the value of `RAILS_LOG_LEVEL` to `debug` and then restart the service that you're attempting to troubleshoot.
- **Streaming:** Set the value of `LOG_LEVEL` to `silly` and then restart the service that you're attempting to troubleshoot.

More information on other logging levels for these option can be found on the [Configuring your environment](https://docs.joinmastodon.org/admin/config) page.

The `debug` or `silly` levels can be very verbose and you should take care to change the log level back to a lower level, once you have completed your troubleshooting.

## **After an upgrade to a newer version, some pages look weird, like they have unstyled elements. Why?**

Check that you have run `RAILS_ENV=production bin/rails assets:precompile` after the upgrade, and restarted Mastodon’s web process, because it looks like it’s serving outdated stylesheets and scripts. It’s also possible that the precompilation fails due to a lack of RAM, as webpack is unfortunately extremely memory-hungry. If that is the case, make sure you have some swap space assigned. Alternatively, it’s possible to precompile the assets on a different machine, then copy over the `public/packs` directory.

## **After an upgrade to a newer version, some requests fail and the logs show error messages about missing columns or tables. Why?**

Check that you have run `RAILS_ENV=production bin/rails db:migrate` after the upgrade, because it looks like Mastodon’s code is accessing a newer or older database schema. If you are using PgBouncer, make sure this one command connects directly to PostgreSQL, as PgBouncer does not support the kind of table locks that are used within migrations.

## **I am trying to run a `tootctl` or `rake`/`rails` command, but all I get is an error about uninitialized constants. What’s wrong?**

Check that you are specifying the correct environment with `RAILS_ENV=production` before the command. By default, the environment is assumed to be development, so the code tries to load development-related gems. However, in production environments, we avoid installing those gems, and that’s where the error comes from.

## **I encountered a compilation error while executing `RAILS_ENV=production bundle exec rails assets:precompile`, but no more information is given. How to fix it?**

Usually, it's because your server ran out of memory while compiling assets. Use a swapfile or increase the swap space to increase the memory capacity. Run `RAILS_ENV=production bundle exec rake tmp:cache:clear` to clear cache, then execute `RAILS_ENV=production bundle exec rails assets:precompile` to compile again. Make sure you clear the cache after a compilation error, or it will show "Everything's OK" but leave the assets unchanged.

## **I am getting this error: `Read-only file system @ dir_s_mkdir`. Why?**

By default, Mastodon makes use of [systemd's sandboxing capabilities](https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Sandboxing) in a way that disallows writing outside of `/home/mastodon`. If Mastodon is installed elsewhere, you may need to allow `mastodon-sidekiq` and `mastodon-web` to write to a custom directory:
1. Add parameter `ReadWritePaths` to files `/etc/systemd/system/mastodon-sidekiq.service` and `/etc/systemd/system/mastodon-web.service`. Example - `ReadWritePaths=/example/mastodon/live`.
2. run `systemctl stop mastodon-sidekiq mastodon-web`
3. run `systemctl daemon-reload`
4. run `systemctl start mastodon-sidekiq mastodon-web`
