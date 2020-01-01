---
title: Upgrading to a new release
menu:
  docs:
    weight: 70
    parent: admin
---

{{< hint style="info" >}}
When a new version of Mastodon comes out, it appears on the [GitHub releases page](https://github.com/tootsuite/mastodon/releases). Please mind that running unreleased code from the `master` branch, while possible, is not recommended.
{{< /hint >}}

Mastodon releases correspond to git tags. First, switch to the `mastodon` user:

```bash
su - mastodon
```

And navigate to the Mastodon root directory:

Download the releases’s code, assuming that the version is called `v2.5.0`:

```bash
git fetch --tags
git checkout v2.5.0
```

**The release page contains a changelog, and below it, upgrade instructions**. This is where you would execute them, for example, if the release mentions that you need to re-compile assets, you would execute:

```bash
RAILS_ENV=production bundle exec rails assets:precompile
```

After you have executed all special release-specific instructions, the last thing remaining is restarting Mastodon. _Usually_ the streaming API is not updated, and therefore does not require a restart. Restarting the streaming API can lead to an unusually high load on the server, so it is advised to avoid it if possible.

Switch back to root:

```bash
exit
```

You would restart Sidekiq:

```bash
systemctl restart mastodon-sidekiq
```

And you would reload the web process to avoid downtime:

```bash
systemctl reload mastodon-web
```

**That’s all!** You’re running the new version of Mastodon now.

