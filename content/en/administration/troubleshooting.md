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