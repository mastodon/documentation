---
title: Security issues and responsible disclosure
description: What to do if you found a serious bug
menu:
  docs:
    weight: 9999
    parent: dev
---

If you believe you've identified a security vulnerability in Mastodon (a bug that allows something to happen that shouldn't be possible), you should either [open a security issue on GitHub](https://github.com/mastodon/mastodon/security/advisories/new) or send the report to **security@joinmastodon.org**.

We do not provide a bug bounty program at the moment.

You should *not* report such issues on public GitHub issues or in other public spaces to give us time to publish a fix for the issue without exposing Mastodon's users to increased risk.

{{< hint style="info" >}}
A "vulnerability in Mastodon" is a vulnerability in the code distributed through our main source code repository on GitHub. Vulnerabilities that are specific to a given installation (e.g. misconfiguration) should be reported to the owner of that installation and not us.
{{< /hint >}}
