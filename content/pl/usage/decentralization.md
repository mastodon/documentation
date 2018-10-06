---
title: Decentralizacja
description: W jaki sposób Mastodon jest zdecentralizowany i co to w praktyce oznacza
menu:
  docs:
    parent: usage
    weight: 2
---

Mastodon jest **sfederowaną** siecią społecznościową.

## Czym jest federacja?

**Federacja** to rodzaj decentralizacji. Zamiast jednego, centralnego serwera używanego przez wszystkich, istnieje wiele serwerów, z których każdy może korzystać.

|Rodzaj decentralizacji|Przykład|
|:--------------------:|--------|
|Scentralizowane|Twitter, Facebook, Instagram|
|Sfederowane|E-mail, XMPP|
|Dystrybuowane|BitTorrent, IPFS, Scuttlebutt|

Serwer Mastodona może działać samodzielnie. Tak jak na tradycyjnej stronie internetowej, można tam zarejestrować się, publikować wiadomości, wysyłać zdjęcia i rozmawiać z innymi. *W przeciwieństwie* do tradycyjnej strony internetowej, serwery Mastodona porozumiewają się ze sobą, pozwalając na wzajemną komunikację swoich użytkowników, tak jak możesz wysłać maila adresem GMaila do kogoś używającego Outlooka.

<figure>
  <img src="/decentralization.png" alt="" style="margin: 0; box-shadow: none">
  <figcaption><p>Od lewej do prawej: scentralizowana, sfederowana i dystrybuowana sieć</p></figcaption>
</figure>

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

### Browsing content

To allow you to discover potentially interesting content, Mastodon provides a way to browse all public posts. Well, there is no global shared state between all servers, so there is no way to browse *all* public posts. When you browse the **federated timeline**, you see all public posts that the server you are on knows about. There are various ways your server may discover posts, but the bulk of them will be from people that other users on your server follow.

There is a way to filter the federated timeline to view only public posts created on your server: The **local timeline**. Mind that "local" here refers to the server, not to a geographical location.

### Funding and monetization

All Mastodon servers are operated by different people or organizations completely independently. Mastodon does not implement any monetization strategies in the software.

Some server operators choose to offer paid accounts, some server operators are companies who can utilize their existing infrastructure, and most server operators rely on crowdfunding from their users via Patreon and similar services. So if you want to support the server hosting your account, check if it offers a way to donate.

Mastodon development is likewise crowdfunded via Patreon. No venture capital is involved.

### Impersonation and verification

The same username *can* be registered on different servers, there is no way to claim all of them ahead of time. Just like with e-mail, you should not expect `alice@hotmail.com` to be the same person as `alice@gmail.com`.

Because Mastodon can be self-hosted, there is no better way to verify your identity than to host Mastodon on your own domain, which people already trust.

Document-based verification and blue ticks are not possible without a central authority. However, Mastodon can cross-reference the links you put on your profile to prove that you are the real owner of those links. In case one of those links is your personal homepage that is known and trusted, it can serve as the next-best-thing to identity verification.
