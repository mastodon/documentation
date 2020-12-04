---
title: Czym jest Mastodon?
description: Witamy w dokumentacji Mastodona!
menu:
  docs:
    weight: -99
---

{{< youtube id="IPSbNdBmWKE" caption="Wideo wprowadzające, wyjaśniające podstawowe koncepcje Mastodona z użyciem ładnych animacji" >}}

## Czym jest mikroblog? {#microblogging}

Tak jak blogowaniem nazwiemy publikowanie aktualności na stronie, **mikroblogowanie** to publikowanie mniejszych aktualności na strumieniu aktualności na własnym profilu. Możesz publikować wpisy tekstowe, dodatkowo umieszczając media takie jak zdjęcia, dźwięk, filmy czy ankiety. Mastodon pozwala na obserwowanie znajomych i poznawanie nowych.

## Czym jest federacja? {#federation}

**Federacja** jest rodzajem decentralizacji. Zamiast jednej centralnej usługi z której korzystają wszyscy, jest tu wiele niezależnych usług, z których może korzystać dowolna liczba osób.

| Stopień decentralizacji | Przykłady |
| :--- | :--- |
| Scentralizowane | Twitter, Facebook, Instagram |
| Sfederowane | E-mail, XMPP, sieci komórkowe, fizyczna poczta |
| Dystrybuowane | BitTorrent, IPFS, Scuttlebutt |

Serwer Mastodona może funkcjonować samodzielnie. Tak jak na tradycyjnej stronie, ludzie mogą się zarejestrować, publikować tam wiadomości i rozmawiać z innymi. _W przeciwieństwie_ do tradycyjnej strony, serwery Mastodona wzajemnie komunikują się ze sobą, pozwalając swoim użytkownikom na wzajemną komunikację – tak jak mając konto na Gmailu możesz napisać mail do kogoś na Outlooku, Fastmail, Protonmail czy serwerze dowolnego dostawcy, tak długo jak znasz jego e-mail, **możesz wspomnieć lub napisać wiadomość do użytkownika dowolnego serwera, jeśli znasz jego adres**.

{{< figure src="/assets/image%20%289%29.png" caption="Od lewej do prawej: Scentralizowana, Sfederowana, Dystrybuowana" >}}



## Czym jest ActivityPub? {#fediverse}

Mastodon używa standaryzowanego, otwartego protokołu aby implementować federację. Nazywa się on **ActivityPub**. Dowolne oprogramowanie które również implementuje ActivityPub może komunikować się z Mastodonem, tak jak serwery Mastodona komunikują sie między sobą.

**Fediwersum** \(„sfederowane uniwersum”, z ang. „fediverse”\) to nazwa dla wszystkich stron mogących komunikować się wzajemnie w Internecie z użyciem ActivityPub. Zaliczają się do tego wszystkie serwery Mastodona, ale też inne implementacje:

* Pleroma, modularny silnik mikroblogowy,
* Pixelfed, sfederowana platforma do udostępniania zdjęć, pozwalająca na tworzenie i dzielenie się i przeglądanie wpisów multimedialnych,
* Misskey, zawierające mikroblog wraz z dostosowywalnym panelem,
* PeerTube, pozwalające publikować filmy na kanałach,
* Plume, pozwalające na publikowanie dłuższych artykułów,
* i wiele więcej, wliczając to nawet osobiste strony internetowe!

Fediwersum nie jest marką, częściej usłyszysz „zaobserwuj mnie na Mastodonie” niż „zaobserwuj mnie w Fediwersum”, choć to drugie jest technicznie bardziej poprawne.

## Praktyczne konsekwencje {#implications}

### Wybór dostawcy usługi i regulaminu {#choice}

Ponieważ Mastodon jest po prostu oprogramowaniem o które może opierać się dowolna strona, potencjalny użytkownik Mastodona może wybrać jeden z dostępnych serwerów Mastodona, lub założyć własny, jeżeli ma taką potrzebę. Projekt Mastodon prowadzi listę polecanych serwerów na [joinmastodon.org](https://joinmastodon.org), którą możesz sortować według kategorii i/lub języka. Część serwerów może mieć wykraczające dalej zasady, jak wymaganie korzystania z określonych tagów na zawartości wrażliwej, część może mieć bardziej luźną politykę moderacyjną, ale wszystkie z nich zadeklarowały przyjęcie [Mastodon Server Covenant](https://joinmastodon.org/covenant), co oznacza że zobowiązały się do aktywnej moderacji przeciwko mowie nienawiści, dokonywać dziennych kopii zapasowych, mieć przynajmniej jednego dodatkowego administratora i informować przynajmniej na 3 miesięcy w przypadku zamknięcia serwera.

> Maintaining communities that feel safe for all of its members is not easy. Mastodon provides a lot of foundational framework and tools for doing it, and shifts the power to effect change from one commercial entity to the communities themselves.
>
> -- Eugen Rochko, 6 lipca 2018, ["Cage the Mastodon"](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> A centralized social media platform has a hierarchical structure where rules and their enforcement, as well as the development and direction of the platform, are decided by the CEO \[...\] A decentralized network deliberately relinquishes control of the platform owner, by essentially not having one.
>
> -- Eugen Rochko, 30 grudnia 2018, ["Dlaczego decentralizacja ma znaczenie?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### Finansowanie i monetyzacja {#monetization}

Serwery Mastodona są zarządzane przez różne osoby bądź organizacje całkowicie niezależnie. Mastodon nie implementuje w oprogramowaniu żadnych możliwości monetyzacji.

Niektórzy operatorzy serwerów oferują płatne konta, część z nich to firmy które korzystają z już posiadanej infrastrukturzy, część właścicieli serwerów polega na zbiórkach prowadzonych na Patreon lub podobnych usługach, wspieranych przez użytkowników, a część po prostu korzysta ze swoich pieniędzy, aby prowadzić serwer dla siebie i może paru znajomych. Więc jeżeli chcesz pomóc właścicielowi serwera na którym masz konto, sprawdź czy oferuje on możliwość wsparcia finansowego.

Rozwój Mastodona jest finansowany społecznościowo na [Patreonie](https://patreon.com/mastodon) i [OpenCollective](https://opencollective.com/mastodon). **Nie ma tu udzialu kapitału wysokiego ryzyka.**

> In my opinion, “instant, public, global messaging and conversation” should, in fact, be _global_. Distributed between independent organizations and actors who can self-govern. A public utility, without incentives to exploit the conversations for profit.
>
> -- Eugen Rochko, 3 marca 2018, ["Twitter nie jest narzędziem użyteczności publicznej"](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### Interoperacja między różnym oprogramowaniem {#interoperability}

W praktyce – wyobraź sobie że możesz zaobserwować użytkownika Instagramu ze swojego konta na Twitterze i komentować jego zdjęcia nie opuszczając swojego konta. Gdyby Twitter i Instagram były sfederowanymi usługami korzystającymi z tego samego protokołu, to byłoby możliwe. Mając konto na Mastodonie, **możesz komunikować się z dowolnymi kompatybilnymi stronami,** _**nawet jeśli nie są oparte na Mastodonie**_. All that is necessary is that the software support the same subset of the ActivityPub protocol that allows for creating and interacting with status updates. To find out more about the technical specifications required to interoperate with Mastodon, see [ActivityPub](spec/activitypub), [WebFinger](spec/webfinger), and [Security](spec/security). To read more about what ActivityPub allows us to do, see [Why ActivityPub is the future](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/).

> All of these platforms are different and they focus on different needs. And yet, the foundation is all the same: people subscribing to receive posts from other people. And so, they are all compatible.
>
> -- Eugen Rochko, 27 czerwca 2018, ["Dlaczego ActivityPub to przyszłość"](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

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

{{< page-ref page="user/signup.md" >}}

Learn how to install Mastodon:

{{< page-ref page="admin/prerequisites.md" >}}

Learn how to write an app for Mastodon:

{{< page-ref page="client/intro.md" >}}

Learn about the Mastodon backend and how to contribute:

{{< page-ref page="dev/overview.md" >}}



