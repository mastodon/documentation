---
title: Upgrading to a new release
menu:
  docs:
    weight: 70
    parent: admin
---

{{< hint style="info" >}}
When a new version of Mastodon is released, it appears on the [GitHub releases page](https://github.com/mastodon/mastodon/releases). Please note that running unreleased code from the `main` branch, while possible, is not recommended.
{{< /hint >}}

### Versioning

Generally speaking, Mastodon versioning is done in the spirit of [SemVer](https://semver.org), that is:

- Major versions (4.x to 5.x) may make backwards incompatible changes (aka "breaking changes")to how the application works or the API responds, or may make substantial changes to underlying system requirements
- Minor versions (4.1.x to 4.2.x) will add functionality in backwards compatible ways, may make minor dependency changes, etc
- Patch versions (4.2.1 to 4.2.2) will make backward compatible bug fixes, or add small enhancements

All releases will have accompanying release notes and changelogs, and reading those is the best way to be sure about the changes in a given release.

### Automatic update verification {#automated_checks}

Since v4.2.0, Mastodon will automatically check for available updates and notify the users of your server that have the `DevOps` permission.

This happens by fetching `https://api.joinmastodon.org/update-check?version=<current_version>` in the background every 30 minutes. `current_version` omits the build metadata (everything after the first `+`, if there is one, in the version string). For instance, if your version is `4.3.0-beta2+my-fork`, Mastodon will query `https://api.joinmastodon.org/update-check?version=4.3.0-beta2`.

You can change which URL Mastodon queries by setting the `UPDATE_CHECK_URL` environment variable. You can also completely disable this behavior by setting this environment variable to an empty string, although we strongly recommend against doing that unless you are keeping up with Mastodon updates in another way, as Mastodon occasionally releases critical security updates that must be applied in a timely fashion.

### Upgrade steps

Mastodon releases correspond to git tags. Before attempting an upgrade, look up the desired release on the [GitHub releases page](https://github.com/mastodon/mastodon/releases). The page will contain a **changelog** describing everything you need to know about what's different, as well as **specific upgrade instructions**.

To begin, switch to the `mastodon` user:

```bash
su - mastodon
```

And navigate to the Mastodon root directory:

```bash
cd /home/mastodon/live
```

Download the release’s code, assuming that the version is called `v3.1.2`:

```bash
git fetch --tags
git checkout v3.1.2
```

Now execute the upgrade instructions that are included in that version's release notes on GitHub. Because different releases require different instructions, we do not include any instructions on this page.

{{< hint style="info" >}}
You can safely skip deploying every single PATCH level (see above) version release when upgrading from an old version. You do not need to individually deploy them all. However, you should deploy at least one release from every MINOR version series. Most importantly, keep track of the instructions with each release or collection of releases. Most instructions overlap, you just need to make sure you execute everything at least once.
{{< /hint >}}

After you have executed the instructions from the release notes, switch back to root:

```bash
exit
```

Restart **background workers**:

```bash
systemctl restart mastodon-sidekiq
```

And reload the **web process**:

```bash
systemctl reload mastodon-web
```

{{< hint style="info" >}}
The `reload` operation is a zero-downtime restart, also called "phased restart". As such, Mastodon upgrades usually do not require any advance notice to users about planned downtime. In rare cases, you can use the `restart` operation instead, but there will be a (short) felt interruption of service for your users.
{{< /hint >}}

The **streaming API** server is also updated and requires a restart, doing so will result in all connected clients being disconnected, which can increase the load on your server:

```bash
systemctl restart mastodon-streaming
```

{{< hint style="danger" >}}
Restarting the streaming API leads to an increased load on your server as disconnected clients attempt to reconnect or poll the REST API instead, so avoid it whenever you can.
{{< /hint >}}

{{< hint style="success" >}}
**That’s all!** You’re running the new version of Mastodon now.
{{< /hint >}}
