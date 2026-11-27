---
title: Relays
description: How to use relays to connect to more servers.
menu:
  docs:
    parent: admin
---

## What are relays?

A relay is another fediverse server that operates solely for the purpose of redistributing user content. Multiple Mastodon servers can connect to a single relay, sharing every new public post made on each server with the relay. The relay then forwards those posts to the other participants. This way, public posts appear in the public feeds and hashtags on those servers even from users who don't have followers there.

## What is sent to a relay?

A copy of each public post made after the relay has been enabled on your Mastodon server, as well as edits and deletions of those posts, public profile information updates (e.g. profile picture or display name) and account removals.

## Enabling a relay

Navigate to the **Administration > Relays** area and click **Add new relay**. Enter the handle of the relay actor, e.g. `relay@relay.infosec.exchange` (in versions of Mastodon prior to 5.0, you had to enter the inbox URL of the relay actor directly, e.g. `https://relay.infosec.exchange/inbox`) then modify the following options as you see fit:

### Participation level

By default, a relay is **bidirectional**. As described above, all servers that connect to a relay push their public posts to it, and the relay redistributes them between all participants. However, this comes with a downside, which is an increased rate of space consumption in the database, as your server has to store all of the new content received from the relay.

To help control this, you may switch to a **broadcast-only** mode. In this mode, your server will continue to push public posts to the relay, but will not accept any forwarded content from the relay. This is helpful if you just care about increasing the reach of your users, and not populating your public feeds with more content.

### Require user opt-in

By default, when you enable a relay for your server, all of your users' public posts start being shared with the relay. Users are not specifically informed of this, as the propagation of public content is generally considered uncontrolled.

There may be situations where you may want to give your users an informed choice about where their public posts go. Toggling **Require user opt-in** enables a section on the end-users' **Privacy and reach** page called **Relay preferences**. There, the opt-in relays are listed alongside an "Opt-in to sharing" checkbox.

Users' public posts, public profile updates, and so on are not sent to opt-in relays until the user has opted in through that page. Users can opt-out again afterwards, which sends a block activity to the relay actor informing the relay of this, in case the relay needs to do any data clean-up.

### Next steps

Once you have clicked **Save and enable**, a request is sent to the relay. Some relays do not accept new participants automatically, so it may not instantly appear as enabled in the admin interface, but show a pending status instead. You can disable or remove a relay at any time. You can have as many relays as you want, keeping in mind the computational and storage costs of doing so.

## Who is running relays?

Here is a non-exhaustive list of public relays:

- `relay@relay.infosec.exchange`
- `relay@relay.fedibird.com`

## For relay implementers

For the **Relay preferences** opt-in page, Mastodon renders the relay actors' `name` and `summary` (supporting HTML) properties, equivalent to any standard fediverse profile. If your relay has a privacy policy, it is recommended to include a link to it in the `summary`.
