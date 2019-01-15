---
title: Troubleshooting
description: How to figure out what's wrong with your Mastodon installation
menu:
  docs:
    parent: administration
    weight: 99
---

**I see an error page that says something went wrong. How do I find out what's wrong?**

All error messages with stack traces are written to the system log. When using systemd, the logs of each systemd service can be browsed with `journalctl -u mastodon-web` (substitute with the correct service name). When using Docker, it's similar: `docker logs mastodon_web_1` (substitute with the correct container name).

Specific details of server-side errors are *never* displayed to the public, as they can reveal what your setup looks like internally and give attackers clues how to get in, or how to abuse the system more efficiently.

Each response from Mastodon's web server carries a header with a unique request ID, which is also reflected in the logs. By inspecting the headers of the error page, you can easily find the corresponding stack trace in the log.

**After an upgrade to a newer version, some pages look weird with unstyled elements**

Check that you have run `RAILS_ENV=production bin/rails assets:precompile` after the upgrade, and restarted Mastodon's web process, because it looks like it's serving outdated stylesheets and scripts. It's also possible that the precompilation fails due to a lack of RAM, as webpack is unfortunately extremely memory-hungry. If that is the case, make sure you have some swap space assigned. Alternatively, it's possible to precompile the assets on a different machine, then copy over the `public/packs` directory.

**After an upgrade to a newer version, some requests fail and the logs show error messages about missing columns or tables**

Check that you have run `RAILS_ENV=production bin/rails db:migrate` after the upgrade, because it looks like Mastodon's code is accessing a newer or older database schema.