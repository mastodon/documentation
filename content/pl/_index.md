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

**Federacja** jest rodzajem decentralizacji. Zamiast jednej centralnej usługi, z której korzystają wszyscy, jest tu wiele niezależnych usług, z których może korzystać dowolna liczba osób.

| Stopień decentralizacji | Przykłady |
| :--- | :--- |
| Scentralizowane | Twitter, Facebook, Instagram |
| Sfederowane | E-mail, XMPP, sieci komórkowe, fizyczna poczta |
| Dystrybuowane | BitTorrent, IPFS, Scuttlebutt |

Serwer Mastodona może funkcjonować samodzielnie. Tak jak na tradycyjnej stronie, ludzie mogą się zarejestrować, publikować tam wiadomości i rozmawiać z innymi. W przeciwieństwie do tradycyjnej strony, serwery Mastodona wzajemnie komunikują się ze sobą, pozwalając swoim użytkownikom na wzajemną komunikację – tak, jak mając konto na Gmailu, możesz napisać mail do kogoś na Outlooku, Fastmail, Protonmail czy serwerze dowolnego dostawcy, tak długo, jak znasz jego e-mail, **możesz wspomnieć lub napisać wiadomość do użytkownika dowolnego serwera, jeśli znasz jego adres**.

{{< figure src="/assets/network-models.jpg" caption="Od lewej do prawej: Scentralizowana, Sfederowana, Dystrybuowana" >}}



## Czym jest ActivityPub? {#fediverse}

Mastodon używa standaryzowanego, otwartego protokołu, aby implementować federację. Nazywa się on **ActivityPub**. Dowolne oprogramowanie, które również implementuje ActivityPub, może komunikować się z Mastodonem, tak jak serwery Mastodona komunikują się między sobą.

**Fediwersum** \(„sfederowane uniwersum”, z ang. „fediverse”\) to nazwa dla wszystkich stron mogących komunikować się wzajemnie w Internecie z użyciem ActivityPub. Zaliczają się do tego wszystkie serwery Mastodona, ale też inne implementacje:

* Pleroma, modularny silnik mikroblogowy,
* Pixelfed, sfederowana platforma do udostępniania zdjęć, pozwalająca na tworzenie, dzielenie się i przeglądanie wpisów multimedialnych,
* Misskey, zawierające mikroblog wraz z dostosowywalnym panelem,
* PeerTube, pozwalające publikować filmy na kanałach,
* Plume, pozwalające na publikowanie dłuższych artykułów,
* i wiele więcej, wliczając to nawet osobiste strony internetowe!

Fediwersum nie jest marką, częściej usłyszysz „zaobserwuj mnie na Mastodonie” niż „zaobserwuj mnie w Fediwersum”, choć to drugie jest technicznie bardziej poprawne.

## Praktyczne konsekwencje {#implications}

### Wybór dostawcy usługi i regulaminu {#choice}

Ponieważ Mastodon jest po prostu oprogramowaniem, o które może opierać się dowolna strona, potencjalny użytkownik Mastodona może wybrać jeden z dostępnych serwerów Mastodona, lub założyć własny, jeżeli ma taką potrzebę. Projekt Mastodon prowadzi listę polecanych serwerów na [joinmastodon.org](https://joinmastodon.org), którą możesz sortować według kategorii lub języka. Część serwerów może mieć wykraczające dalej zasady, jak wymaganie korzystania z określonych tagów na zawartości wrażliwej, część może mieć luźniejszą politykę moderacyjną, ale wszystkie z nich zadeklarowały przyjęcie [Umowy społecznej hostujących Mastodona](https://joinmastodon.org/covenant), co oznacza, że zobowiązały się do aktywnej moderacji przeciwko mowie nienawiści, dokonywać dziennych kopii zapasowych, mieć przynajmniej jednego dodatkowego administratora i informować przynajmniej na 3 miesięcy w przypadku zamknięcia serwera.

> Zarządzanie społecznością tak, aby dawała bezpieczeństwo każdemu z jej członków, nie jest proste. Mastodon zawiera podstawę i wiele narzędzi pomagających w tym i przenosi odpowiedzialność z jednego komercyjnego podmiotu do samych społeczności.
>
> -- Eugen Rochko, 6 lipca 2018, [„Cage the Mastodon”](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> Scentralizowana platforma społecznościowa ma hierarchiczną strukturę, gdzie jej zasady i ich wymuszanie, jak i rozwój oraz kierunek rozwoju platformy są decyzją jej CEO \[...\] Zdecentralizowana sieć jest pozbawiona możliwości kontroli przez właściciela platormy, dzięki temu, że tego właściciela nie ma.
>
> -- Eugen Rochko, 30 grudnia 2018, [„Dlaczego decentralizacja ma znaczenie?”](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### Finansowanie i monetyzacja {#monetization}

Serwery Mastodona są zarządzane przez różne osoby bądź organizacje całkowicie niezależnie. Mastodon nie implementuje w oprogramowaniu żadnych możliwości monetyzacji.

Niektórzy operatorzy serwerów oferują płatne konta, część z nich to firmy, które korzystają z już posiadanej infrastruktury, część właścicieli serwerów polega na zbiórkach prowadzonych na Patreon lub podobnych usługach, wspieranych przez użytkowników, a część po prostu korzysta ze swoich pieniędzy, aby prowadzić serwer dla siebie, i może paru znajomych. Więc jeżeli chcesz pomóc właścicielowi serwera, na którym masz konto, sprawdź, czy oferuje on możliwość wsparcia finansowego.

Rozwój Mastodona jest finansowany społecznościowo na [Patreonie](https://patreon.com/mastodon) i [OpenCollective](https://opencollective.com/mastodon). **Nie ma tu udziału kapitału wysokiego ryzyka.**

> Moim zdaniem, „natychmiastowe, publiczne, globalne wiadomości i konwersacje” powinny być rzeczywiście __globalne__. Dystrybuowane pomiędzy niezależnymi organizacjami i podmiotami, które mogą zarządzać sobą. Narzędziem użyteczności publicznej, bez zachęt do nadużywania tych konwersacji dla zysku.
>
> -- Eugen Rochko, 3 marca 2018, [„Twitter nie jest narzędziem użyteczności publicznej”](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### Interoperacja między różnym oprogramowaniem {#interoperability}

W praktyce – wyobraź sobie, że możesz zaobserwować użytkownika Instagramu ze swojego konta na Twitterze i komentować jego zdjęcia nie opuszczając swojego konta. Gdyby Twitter i Instagram były sfederowanymi usługami korzystającymi z tego samego protokołu, to byłoby możliwe. Mając konto na Mastodonie, **możesz komunikować się z dowolnymi kompatybilnymi stronami,** _**nawet jeśli nie są oparte na Mastodonie**_. Wszystko, czego potrzeba to wsparcie tej samej części protokołu ActivityPub przez oprogramowanie, tzn. tworzenie i interakcja z tworzonymi wpisami. Aby dowiedzieć się więcej o technicznej specyfikacji wymaganej do interoperacji z Mastodonem, przeczytaj strony [ActivityPub](spec/activitypub), [WebFinger](spec/webfinger), i [Security](spec/security). Aby dowiedzieć się więcej o tym, na co pozwala nam ActivityPub, przeczytaj [Dlaczego ActivityPub to przyszłość](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/).

> Wszystkie z tych platform różnią się i skupiają się na innych potrzebach. Mimo tego podstawa jest taka sama – ludzie subskrybują innych ludzi, aby otrzymywać ich wpisy. I dlatego, wszystkie są kompatybilne.
>
> -- Eugen Rochko, 27 czerwca 2018, [„Dlaczego ActivityPub to przyszłość”](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

### Wolne/otwarte oprogramowanie {#libre}

W przeciwieństwie do własnościowych usług, **każdy może dowolnie uruchamiać, przeglądać, kopiować, modyfikować, dystrybuować i korzystać z kodu źródłowego Mastodona, jeżeli jego pochodna praca będzie udostępniana na tych samych zasadach.** Tak jak każdy użytkownik Mastodona może wybrać swojego dostawcę usługi, tak też każdy może dodawać nowe funkcje do Mastodona lub opublikować zmodyfikowaną wersję Mastodona o różniącej się funkcjonalności. Te zmodyfikowane wersje, zwane *forkami* muszą przestrzegać tych samych wolności, co oryginalny projekt Mastodon. Przykładowo, [glitch-soc](https://glitch-soc.github.io/docs/) to dystrybucja Mastodona dodająca różne eksperymentalne funkcje. Istnieje wiele forków przeznaczonych na konkretny serwer, zwykle różniących się lekko wyglądem lub zawierających niewielkie zmiany w kodzie. Ponieważ Mastodon jest wolnym oprogramowaniem chroniącym Twojej wolności, tego typu personalizacja jest nie tylko dozwolona, ale wręcz do niej zachęcamy.

> Właściwą siłą jest pozwolenie użytkownikom tworzyć własną przestrzeń, własne społeczności, modyfikować oprogramowanie do swoich potrzeb, nie pozbawiając ich możliwości wzajemnej komunikacji.
>
> -- Eugen Rochko, 20 lutego 2017, [„Siła do tworzenia społeczności – odpowiedź dla Marka Zuckerberga”](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/)

> Decentralizacja to odpowiednik bioróżnorodności w świecie cyfrowym, oznaką zdrowego ekosystemu. Zdecentralizowana sieć taka jak Fediwersum pozwala na koegzystowanie i współpracę różnych interfejsów, różnego oprogramowania i różnych form zarządzania.
>
> -- Eugen Rochko, 30 grudnia 2018, [„Dlaczego decentralizacja ma znaczenie?”](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

## Wybierz swoją drogę {#next-steps}

Naucz się korzystać z Mastodona:

{{< page-ref page="user/signup.md" >}}

Naucz się instalować Mastodona:

{{< page-ref page="admin/prerequisites.md" >}}

Naucz się tworzyć aplikacje dla Mastodona:

{{< page-ref page="client/intro.md" >}}

Naucz się o back-endzie Mastodona i dowiedz się jak wnieść swój wkład:

{{< page-ref page="dev/overview.md" >}}



