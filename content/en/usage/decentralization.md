---
title: Decentralization
menu:
  docs:
    parent: usage
    weight: 2
---

Mastodon is a **federated** social network.

## What is federation?

**Federation** is a form of decentralization. Instead of a single central node that all people use, there are multiple nodes, that any number of people can use.

|Grade of centralization|Examples|
|:---------------------:|--------|
|Centralized|Twitter, Facebook, Instagram|
|Federated|E-mail, XMPP|
|Distributed|BitTorrent, IPFS, Scuttlebutt|

A Mastodon server can operate alone. Just like a traditional website, people sign up on it, post messages, upload pictures and talk to each other. *Unlike* a traditional website, Mastodon servers can interoperate, letting their users communicate with each other, just like you can send an e-mail from your GMail address to someone from Outlook.

In practical terms: Imagine if you could follow an Instagram user from your Twitter account and comment on their photos without leaving your account. If Twitter and Instagram were federated services, that would be possible.

## The fediverse

Mastodon uses a standartized, open protocol to implement federation. It is called ActivityPub. Any software that likewise implements federation via ActivityPub can seamlessly communicate with Mastodon, just like Mastodon servers communicate with one another.

The **fediverse** ("federated universe") is the name for all servers that can communicate with each other. That includes all Mastodon servers, but also other implementations:

- Misskey
- Pleroma
- PeerTube
- Plume
- and many more

The fediverse does not have its own brand, so you will more often hear "follow me on Mastodon" than "follow me on the fediverse", but technically the latter is more correct.

## Practical implications
### Addressing people

Mastodon usernames actually consist of two parts:

- The local username, e.g. `alice`
- And the domain of the server, e.g. `example.com`

Just like an e-mail address. For convenience sake, Mastodon allows you to skip the second part when addressing people on the same server as you, but you have to keep in mind when sharing your username with other people, you need to include the domain or they won't be able to find you as easily.

|{{< no >}}|{{< yes >}}|
|:--------:|:---------:|
|I'm @alice on Mastodon!|I'm @alice@example.com on Mastodon!|

The search form in Mastodon will find people either with the above address form, or the link to the person's profile, so you can share that instead if you prefer.

### Following people

As long as you encounter a person within your app's user interface, e.g. the web interface on your home server, or your mobile app, you can just click "follow" and you won't notice a difference if that person is on your server or not.

However if you come across someone's public profile hosted on a different server, there's an obstacle: That server sees you as just another anonymous visitor.

So when you click "follow", a dialog will pop up asking you to enter your own full username (with the domain part, most importantly). This way, the dialog actually sends you back to your home server, where you are logged in and can really do stuff.

You will also notice that dialog when clicking on "reply", "boost" or "favourite" on public pages of other servers.
