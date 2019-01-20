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

Fediwesum nie jest marką, więc częściej usłyszysz „obserwuj mnie na Mastodonie”, niż „obserwuj mnie w Fediwersum”, choć to drugie jest bardziej poprawne technicznie.

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

Istnieje sposób na filtrowanie osi czasu, aby widzieć tylko publiczne wpisy ze swojego serwera – **lokalna oś czasu**. Pamiętaj, że „lokalna” odnosi się tu do serwera, nie położenia geograficznego.

### Finansowanie i monetyzacja

Serwery Mastodona są prowadzone przez różne, działające zupełnie niezależnie osoby lub organizacje. Oprogramowanie Mastodona nie zaimplementowało żadnego rozwiązania pozwalającego na monetyzację go.

Niektóre serwery oferują płatne konta, niektóre należą do firm, które już posiadają odpowiednią infrastrukturę, a większość serwerów finansowana jest przez użytkowników za pośrednictwem Patreona i podobnych usług. Jeżeli chcesz pomóc w utrzymaniu serwera, sprawdź czy istnieje sposób na przekazanie dotacji.

Rozwój Mastodona również jest finansowany przez społeczność na Patreonie. Odbywa się to bez udziału kapitału podwyższonego ryzyka.

### Podszywanie się i weryfikacja

Konto o tej samej nazwie użytkownika *może* zostać zarejestrowane na różnych serwerach, nie istnieje sposób na zajęcie ich wszystkich. Tak jak w przypadku adresów e-mail, nie oczekuj że `alice@hotmail.com` będzie tą samą osobą, co `alice@gmail.com`.

Ponieważ możesz samodzielnie hostować Mastodona, nie istnieje lepszy sposób na potwierdzenie swojej tożsamości niż hostowanie Mastodona na własnej domenie, której inni ufają.

Weryfikacja za okazaniem dokumentu i niebieski znaczek nie są możliwe na zdecentralizowanej usłudze. Możesz jednak potwerdzić, że odnośniki umieszczone w metadanych profilu należą do Ciebie. Jeżeli jeden z nich to Twoja osobista strona internetowa, może być to również sposób na weryfikację tożsamości tutaj.
