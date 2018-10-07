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

W praktyce – wyobraź sobie, że możesz obserwować użytkownika Instagrama ze swojego konta na Twitterze i komentować jego zdjęcia z tego konta. Gdyby Twitter i Instagram były sfederowanymi usługami, byłoby to możliwe.

## Fediwersum

Mastodon korzysta ze standaryzowanego, otwartego protokołu aby zaimplementować federację. Nazywa się on ActivityPub. Każde oprogramowanie, które zaimplementowało federację przez ActivityPub może komunikować się z Mastodonem, tak jak serwery Mastodona komunikują się ze sobą.

**Fediwersum** („sfederowane uniwersum”) to nazwa, którą określamy wszystkie serwery mogące się ze sobą komunikować. Wliczają się w to wszystkie serwery Mastodona wraz z innymi implementacjami, np.:

- Misskey
- Pleroma
- PeerTube
- Plume
- i wiele więcej

Fediwesum nie jest marką, więc częściej usłyszysz „obserwuj mnie na Mastodonie”, niż „obserwuj mnie w Fediwersum”, choć to drugie jest bardziej poprawne technicznie..

## Co to w praktyce oznacza
### Wspominanie o innych

Nazwy użytkownika na Mastodonie składają się z dwóch części:

- Lokalna nazwa użytkownika, np. `alice`
- Domena serwera, np. `example.com`

To tak jak adres e-mail. Dla ułatwienia, Mastodon pozwala na ominięcie drugiej części nazwy użytkownika, kiedy wspominasz o osobie na tym samym serwerze, ale pamiętaj – dzieląc się swoją nazwą z innymi, musisz uwzględnić domenę, aby mogli Cię łatwo znaleźć.

|{{< no >}}|{{< yes >}}|
|:--------:|:---------:|
|Nazywam się @alice na Mastodonie!|Nazywam się @alice@example.com na Mastodonie!|

Formularz wyszukiwania na Mastodonie pozwala na znalezienie użytkowników zarówno korzystając z adresów takich jak powyższy, jak i odnośników do profili, więc możesz udostępniać tę wersję, którą wolisz.

### Obserwowanie innych

Jeżeli możesz spotkać osobę w interfejsie aplikacji, np. interfejsie sieciowym swojego serwera lub aplikacji mobilnej, możesz po prostu nacisnąć „śledź” – nie zauważysz różnicy, gdy ya osoba nie używa tego samego serwera.

Jeżeli jednak napotkasz publiczny profil osoby z innego serwera, zauważysz przeszkodę – dla tego serwera jesteś anonimowym odwiedzającym.

Kiedy naciśniesz „śledź”, pojawi się formularz z zapytaniem o pełną nazwę użytkownika (przede wszystkim część zawierającą domenę). W ten sposób zostaniesz przekierowany(-a) na swój serwer, gdzie jesteś zalogowany(-a) i możesz zaobserwować tę osobę.

Zauważysz podobny formularz, gdy spróbujesz odpowiedzieć, podbić lub dodać do ulubionych wpis z publicznej strony na innym serwerze.

### Przeglądanie zawartości

Aby pozwolić na poznawanie zawartości, która może Cię zainteresować, Mastodon oferuje sposób na przeglądanie wszystkich publicznych wpisów. No dobra, nie istnieje dzielona pomiędzy wszystkimi serwerami oś czasu, więc nie możesz zobaczyć *wszystkich* publicznych wpisów. Kiedy przeglądasz **oś czasu federacji**, widzisz wszystkie publiczne wpisy znane przez serwer. Jest wiele sposobów, na które serwer może poznać wpisy, ale większość z nich pojawia się tam dlatego, że inni użytkownicy serwera śledzą ich autorów.

There is a way to filter the federated timeline to view only public posts created on your server: The **local timeline**. Mind that "local" here refers to the server, not to a geographical location.

### Funding and monetization

All Mastodon servers are operated by different people or organizations completely independently. Mastodon does not implement any monetization strategies in the software.

Some server operators choose to offer paid accounts, some server operators are companies who can utilize their existing infrastructure, and most server operators rely on crowdfunding from their users via Patreon and similar services. So if you want to support the server hosting your account, check if it offers a way to donate.

Mastodon development is likewise crowdfunded via Patreon. No venture capital is involved.

### Impersonation and verification

The same username *can* be registered on different servers, there is no way to claim all of them ahead of time. Just like with e-mail, you should not expect `alice@hotmail.com` to be the same person as `alice@gmail.com`.

Because Mastodon can be self-hosted, there is no better way to verify your identity than to host Mastodon on your own domain, which people already trust.

Document-based verification and blue ticks are not possible without a central authority. However, Mastodon can cross-reference the links you put on your profile to prove that you are the real owner of those links. In case one of those links is your personal homepage that is known and trusted, it can serve as the next-best-thing to identity verification.
