---
title: Cos'è Mastodon?
description: Benvenuto nella documentazione di Mastodon!
menu:
  docs:
    weight: -99
---

## Cos'è un microblog? {#microblogging}

Mentre il blogging è l'azione di pubblicare aggiornamenti su un sito web, il **microblogging** è l'azione di pubblicare piccoli aggiornamenti in una corrente di essi direttamente sul tuo profilo. Puoi pubblicare post testuali e volendo anche allegare contenuti multimediali come immagini, audio, video o sondaggi. Mastodon ti permette di seguire i tuoi amici e fartene dei nuovi.

## Cos'è la federazione? {#federation}

La **federazione** è un modello di decentralizzatione. Invece di un unico e centrale server che tutti utilizzano, ce ne sono svariati da cui chiunque può usufruire.

| Grado di centralizzazione | Esempi |
| :--- | :--- |
| Centralizzati | Twitter, Facebook, Instagram |
| Federati | Email, XMPP, rete telefonica, lettere fisiche |
| Distribuiti | BitTorrent, IPFS, Scuttlebutt |

Un sito come Mastodon può operare da solo. Proprio come un sito tradizionale, le persone si registrano, postano messaggi, caricano foto e chiaccherano tra di loro. _Diversamente_ da un sito tradizionale, i siti web come Mastodon possono cooperare, lasciando agli utenti di comunicare tra di loro; proprio come quando invii una email a qualcuno  dal tuo account Gmail, usando Outlook, Fastmail, PRotonmail, o un qualsiasi altro provider email, limitato dal fatto che tu sappia il loro indirizzo,  **puoi menzionare o messaggiare chiunque su ogni sito usando il loro indirizzo**.

{{< figure src="/assets/network-models.jpg" caption="From left to right: Centralized, Federated, Distributed" >}}



## Cos'è ActivityPub? {#fediverse}

Mastodon usa un protocollo standardizzato e aperto per poter implementare la federazione. Si chiama **ActivityPub**. Un qualsiasi software che implementa la federazione tramite ActivityPub può in modo semplice comunicare con Mastodon, proprio come i siti come Mastodon comunicano tra di loro.

Il **fediverso** (“l'universo dei federati”) è il nome per tutti i siti web che possono comunicare tra di loro attraverso ActivityPub e il World Wide Web. Che include tutti i server di Mastodon, ma anche altre implementazioni:

* Pleroma, un motore modulare di microblogging,
* Pixelfed, piattaforma di condivisione di immagine federata, che ti permette di condividere e visualizzare post multimediali,
* Misskey, che include microblogging insieme ad una dashboard personalizzabile,
* PeerTube, che ti permette di pubblicare video sui canali,
* Plume, che ti permette di pubblicare articoli più lunghi,
* e molto altro, inclusi siti personali e individuali!

Il fediverso non ha il suo brand, quindi potresti sentire più volte sentire “seguimi su Mastodon” invece di “seguimi sul fediverso”, ma tecnicamente quest'ultimo è più corretto.

## Implicazioni pratiche {#implications}

### Scelta del provider dei servizi e della policy {#choice}

Because Mastodon is just software that can be used to power any website, potential users of Mastodon have the option of choosing a service provider from already-existing Mastodon websites, or to create their own Mastodon website if they wish. The Mastodon project maintains a list of recommended service providers at [joinmastodon.org](https://joinmastodon.org), sortable by category and/or language. Some websites may have moderation policies that go beyond this, such as requiring the use of certain tags on potentially sensitive content, and some websites may have more relaxed moderation policies, but websites listed in the picker all agree to adopt the [Mastodon Server Covenant](https://joinmastodon.org/covenant), meaning that they pledge to actively moderate against hate speech, to take daily backups, to have at least one emergency admin, and to provide at least 3 months advance notice in case of shutdown.

> Maintaining communities that feel safe for all of its members is not easy. Mastodon provides a lot of foundational framework and tools for doing it, and shifts the power to effect change from one commercial entity to the communities themselves.
>
> -- Eugen Rochko, Jul 6 2018, ["Cage the Mastodon"](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> A centralized social media platform has a hierarchical structure where rules and their enforcement, as well as the development and direction of the platform, are decided by the CEO [...] A decentralized network deliberately relinquishes control of the platform owner, by essentially not having one.
>
> -- Eugen Rochko, Dec 30 2018, ["Why does decentralization matter?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### Funding and monetization {#monetization}

Mastodon websites are operated by different people or organizations completely independently. Mastodon does not implement any monetization strategies in the software.

Some server operators choose to offer paid accounts, some server operators are companies who can utilize their existing infrastructure, some server operators rely on crowdfunding from their users via Patreon and similar services, and some server operators are just paying out-of-pocket for a personal server for themselves and maybe some friends. So if you want to support the server hosting your account, check if it offers a way to donate.

Mastodon development is likewise crowdfunded via [Patreon](https://patreon.com/mastodon) and via [OpenCollective](https://opencollective.com/mastodon). **No venture capital is involved.**

> In my opinion, “instant, public, global messaging and conversation” should, in fact, be _global_. Distributed between independent organizations and actors who can self-govern. A public utility, without incentives to exploit the conversations for profit.
>
> -- Eugen Rochko, Mar 3 2018, ["Twitter is not a public utility"](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### Interoperability between different software {#interoperability}

In practical terms: Imagine if you could follow an Instagram user from your Twitter account and comment on their photos without leaving your account. If Twitter and Instagram were federated services that used the same protocol, that would be possible. With a Mastodon account, **you can communicate with any other compatible website,** _**even if it is not running on Mastodon**_. All that is necessary is that the software support the same subset of the ActivityPub protocol that allows for creating and interacting with status updates. To find out more about the technical specifications required to interoperate with Mastodon, see [ActivityPub](spec/activitypub), [WebFinger](spec/webfinger), and [Security](spec/security). To read more about what ActivityPub allows us to do, see [Why ActivityPub is the future](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/).

> All of these platforms are different and they focus on different needs. And yet, the foundation is all the same: people subscribing to receive posts from other people. And so, they are all compatible.
>
> -- Eugen Rochko, Jun 27 2018, ["Why ActivityPub is the future"](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

### Free/libre software {#libre}

Unlike proprietary services, **anyone has the complete freedom to run, examine, inspect, copy, modify, distribute, and reuse the Mastodon source code, provided they guarantee the same freedoms for any derivative work.** Just like how users of Mastodon can choose their service provider, you as an individual are free to contribute features to Mastodon or publish a modified version of Mastodon that includes different features. These modified versions, also known as software forks, are required to also uphold the same freedoms as the original Mastodon project. For example, [glitch-soc](https://glitch-soc.github.io/docs/) is a software distribution that adds various experimental features. Many individual forks exist as well, perhaps themed slightly differently or including small modifications to the codebase. Because Mastodon is libre software that respects your freedom, personalizations like this are not only allowed but encouraged.

> The ultimate power is in giving people the ability to create their own spaces, their own communities, to modify the software as they see fit, but without sacrificing the ability of people from different communities to interact with each other.
>
> -- Eugen Rochko, Feb 20 2017, ["The power to build communities: A response to Mark Zuckerberg"](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/)

> Decentralization is biodiversity of the digital world, the hallmark of a healthy ecosystem. A decentralized network like the fediverse allows different user interfaces, different software, different forms of government to co-exist and cooperate.
>
> -- Eugen Rochko, Dec 30 2018, ["Why does decentralization matter?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

## Choose your path {#next-steps}

Learn how to use Mastodon:

{{< page-ref page="user/signup" >}}

Learn how to install Mastodon:

{{< page-ref page="admin/prerequisites" >}}

Learn how to write an app for Mastodon:

{{< page-ref page="client/intro" >}}

Learn about the Mastodon backend and how to contribute:

{{< page-ref page="dev/overview" >}}



