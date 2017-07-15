Najczęściej zadawane pytania (FAQ)
==================================

To FAQ w innych językach:

* [English](FAQ.md)
* [Español](FAQ_ESP.md)
* [日本語](FAQ_JA.md)

#### Czym jest Mastodon?

Mastodont jest prehistorycznym zwierzęciem, przodkiem mamuta. Wydaje dźwięk "toot."

#### Dlaczego ta nazwa – Mastodon?

Gargron (autor Mastodona) jest fanem zespołu progressive metalowego o tej samej nazwie. Stwierdził, że jest to fajne zwierzę/nazwa.

#### Na czym właściwie polega ta decentralizacja?

Decentralizacja może odbywać się na kilka sposobów. Mastodon opiera się na „federacji”. Myśl o tym jak o e-mailu, nie jak o BitTorrent. Jest wiele serwerów (zwanych instancjami), a posiadając konto na jednym z nich, możemy wchodzić w interakcje z członkami pozostałych instancji.

#### Jak (z technicznego punktu widzenia) wygląda ta federacja?

Korzystamy z zestawu protokołów OStatus

1. Webfinger do wyszukiwania użytkowników
2. Kanały Atom z rozszerzeniami ActivityStreams, Portable Contacts i Threads
3. PubSubHubbub do śledzenia tych kanałów Atom
4. Salmon dostarcza określone fragmenty kanałów Atom w odpowiednie miejsca (np. osobom biorącym udział w rozmowie, wspomnianym we wpisie, śledzącym daną osobę itp.)

#### Czym jest mastodon.social?

„Flagową” instancją prowadzoną przez Gargrona opartą na najnowszych wydaniach Mastodona. Docelowo nie będzie to jedyna instancja.

#### Co jeszcze jest częścią federacji?

Nazwijmy to „fediwersum” Istniało ono już wcześniej, w jego skład wchodziły serwery GNU social, Friendica, Hubzilla, Diaspora itp. Nie wszystkie z nich są ze sobą w pełni kompatybilne. Mastodon stara się być zgodny ze standardami, a kompatybilność z GNU social jest ważniejsza, niż w przypadku innychrozwiązań.

#### Próbowałem użyć klienta GNU social, aby połączyć się z Mastodonem. Dlaczego to nie zadziałało?

Chociaż Mastodon jest kompatybilny z GNU social pod względem komunikacji między serwerami, ma zupełnie inne API. Wskutek tego, aplikacje powstałe, aby obsługiwać GNU social, nie będą działać z Mastodonem. Powody tego są w połowie ideologiczne, w połowie techniczne.

Jest to opisane szczegółowo w angielskim FAQ

#### Jak jest opłacany Mastodon?

Rozwój Mastodona i hosting instancji mastodon.social jest opłacany na [Patreonie (lub przez dotacje BTC/PayPal)](https://www.patreon.com/user?u=619786) Gargrona. Autor nie jest zainteresowany monetyzacją portalu ani płatnymi reklamami. Może zapewnić instalację/aktualizację Twojej instancji.

Społeczności powinny prowadzić własne instancje, aby rozdrobnić płatności. Opłacanie jednej instancji, gdyby każdy zdecydował się na korzystanie z niej, byłoby bardzo trudne.

#### To wygląda trochę jak Twitter, czym się one różnią?

Mastodon jest zdecentralizowany. Każdy właściciel instancji może ustalić własne zasady. Twitter jest scentralizowany, każdego obowiązują te same zasady.

#### Czym jest „federacja”?

Jest to grupa serwerów Mastodona i kompatybilnych serwisów, które dzielą ze sobą wpisy użytkowników.

#### Czym jest „instancja”?

Jest serwerem, na którym możesz założyć konto. Każda może mieć inne zasady, ponieważ każdy może założyć swoją.

#### Jak wybrać instancję?

[Istnieje wiele instancji](https://instances.mastodon.xyz/list) na każdą potrzebę. Dobrze jest spróbować kilku, aby sprawdzić, która z publicznych instancji spełnia Twoje oczekiwania. Rozmawiając na publicznej instancji, takiej jak [Mastodon.Social](https://mastodon.social) możesz dostać zaproszenie na instancję tematyczną.

Aby zobaczyć, o czym dyskutują członkowie różnych instancji, użyj [tego narzędzia](http://www.unmung.com/mastoview?url=mastodon.social&view=local) autorstwa [Kevina Marksa](https://mastodon.social/@kevinmarks).

#### Ile osób posiada konto na Mastodonie? Czy mogę to sprawdzić?

Oczywiście, wystarczy zaobserwować [@mastodonusercount@social.lou.lt](https://social.lou.lt/@mastodonusercount).

#### Mogę korzystać z tego na Androidzie?

Wypróbuj aplikację [Tusky](https://play.google.com/store/apps/details?id=com.keylesspalace.tusky).

#### Fajnie, ale chcę obsługę wielu kont naraz.

Wypróbuj [TootyFruity](https://play.google.com/store/apps/details?id=ch.kevinegli.tootyfruity221258).

#### A na iPhone?

Wypróbuj [Amaroq](https://itunes.apple.com/us/app/amaroq-for-mastodon/id1214116200). Safari też może być dobrym wyborem. ;)

#### Istnieją inne aplikacje mobilne/desktopowe/cli?

[Tak.](Apps.md)

#### Czy Tusky może ‘💇’? A co z “🔥”? Jak z “⛱” w Tusky?

Możesz zaobserwować Tusky'ego na [@Tusky@mastodon.social](https://mastodon.social/@Tusky), lub jego programistów [@Vavassor@mastodon.social](https://mastodon.social/@Vavassor) i [@daycode@mastodon.social](https://mastodon.social/@daycode).

#### Jak korzystać z wyszukiwania?

Możesz szukać ludzi i hashtagów, ale nie tekstu w postach. Użyj pola nad polem wprowadzania tekstu.

#### Jak wysłać prywatną wiadomość?"
Naciśnij ikonę globusa, aby uzyskać opcje prywatności.

#### Nie rozumiem różnicy między lokalnymi a federowanymi wpisami.

Wpisy (zwane tu często „tootami”) lokalne to te wysłane przez użytkowników Twojej instancji, a federowane to te z instancji, które zna używana przez Ciebie instancja.

#### Czy każda instancja federuje się z innymi?

Niektóre instancje są prywatne i nie federują się ze wszystkimi. Instancja może być zablokowana z innego powodu, np. gdy jest niezgodna z regulaminem tej instancji. Aby dowiedzieć się, jak wygląda to na Twojej instancji, przeczytaj jej opis, lub skontaktuj się z jej właścicielem.

#### Czy mogę posiadać więcej niż jedno konto? Czy mogę użyć tego samego adresu e-mail na innej instancji?

Dwa razy tak! Jeżeli stwierdzisz, że chcesz założyć konto na innej instancji, zrób to. Pamiętaj, że nie każda instancja zawsze pozwala na rejestrację.

#### Czy mogę zaimportować listę osób, które obserwuję na inną instancję?

Tak. Może to zająć trochę czasu, w zależności od instancji. W wypadku problemów, skontaktuj się z administratorem instancji.

#### Jak mogę zapobiec podszywaniu się pode mnie?

Ponieważ każdy może założyć konto o dowolnej nazwie na danej instancji, nie można temu łatwo zapobiec. Niektórzy posiadają własne, jednoosobowe instancje lub korzystają z [Keybase](https://keybase.io/).

#### Jak aktywować dwuetapowe uwierzytelnianie?

Jeżeli Twoja instancja obsługuje tą możliwość, możesz aktywować ją w ustawieniach. [2FA Mastodona](2FA.md) korzysta zarówno z kodów QR, jak i kluczy tekstowych.

#### Dlaczego nie widzę czyichś wpisów?

Może to być spowodowane wieloma przyczynami. Wpisy tego użytkownika mogą być widoczne tylko dla śledzących go, bądź użytkownik zablokował Cię.

#### Co jest teraz na czasie?

Możesz zobaczyć popularne treści, obserwując [@TrendingBot@mastodon.social](https://mastodon.social/@TrendingBot).

#### Czym jest “CW”?
“CW” oznacza “Content Warning”, czyli „Ostrzeżenie o zawartości”. Możesz oznaczać tym np. spoilery.

#### Jak działa opcja oznaczania wrażliwej zawartości (“NSFW”)?

Po dodaniu obrazu, możesz wybrać opcję NSFW, aby wyświetlenie obrazu wymagało kliknięcia na ostrzeżenie.

<a name="who-is-my-admin-and-how-do-i-contact-follow-them"></a>
#### Kto jest moim administratorem, jak mogę skontaktować się z nim/śledzić go?

Informacje kontaktowe, wraz z innymi informacjami o instancji powinny znajdować się w jej szczegółowym opisie.

#### Wszędzie widzę treści, które mi się nie podobają pochodzące z tej samej instancji, jak mogę je zablokować?

Odwiedź profil użytkownika tej instancji, w rozwijanym menu znajdziesz tą opcję.

Jeżeli Twoja instancja opiera się na starszej wersji Mastodona, nie zrobisz tego łatwo, możesz jednak skontaktować się z administratorem, aby zablokował tą instancję, lub zaktualizował mastodona.

#### Czy Mastodon jest moderowany?

Każda instancja ma własne zasady i jest moderowana w inny sposób. Dobrze jest poznać zasady swojej instancji.

#### Jak zgłosić nieodpowiednie treści?

Przy każdym poście widoczna jest ikona składająca się z trzech kropek. W rozwijanym menu możesz wybrać opcję służącą do zgłoszenia wpisu.

#### Jak zgłosić nękanie?

Jeżeli administrator Twojej instancji traktuje to poważnie, możesz zgłosić wpisy korzystając ze sposobu opisanego w poprzednim akapicie. Możesz też skontaktować się bezpośrednio z administratorem.

#### Czy wiadomości prywatne dotrą do użytkowników innych instancji?

Tak. Nie powinny być jednak wykorzystywane do przekazywania ważnych informacji, nie jest to bezpieczna metoda.

#### Mogę korzystać z hashtagów?

Tak! Hashtagi są tu wykorzystywane do wyszukiwania postów, często pomagają szukać postów, które możesz woleć ominąć (#POLITICS, #NSFW itp.).

#### Jak zweryfikować profil i uzyskać “✅”?

“✅” to tylko emoji, *just* for lulz. Mastodon nie posiada weryfikacji kont. Jak chcesz, możesz skopiować “✅” do swojej nazwy.

#### Czy mogę edytować wpis?

Przepraszamy, nie możesz. Możesz go jednak usunąć i napisać na nowo…

#### Czy jeżeli usunę wpis, zniknie on wszędzie?

Usunięcie postu spowoduje jego zniknięcie z lokalnej osi czasu. Może on jednak nie zniknąć, jeżeli został podbity przez użytkowników innej instancji.

#### Czy mogę zacytować wpis?

Jeszcze nie. Musisz skopiować i wkleić go do wpisu ręcznie.

#### Czy jeżeli moja instancja zniknie, stracę dane?

Tak.

#### Czy mogę zapisać swoje dane?

Tak, wejdź w Preferencje > Eksport danych.

#### Nie mogę zobaczyć wszystkich wpisów użytkownika innej instancji.

W rozszerzonym widoku, kliknij w jego awatar, znajdziesz się na stronie instancji, gdzie zobaczysz wszystkie publiczne wpisy użytkownika.

#### Jak mogę wyświetlić całą dyskusję?

Naciśnij zawartość wpisu, aby wyświetlić całą dyskusję.

#### Jak uzyskać link do wpisów?

Naciśnij prawym przyciskiem myszy na czas dodania wpisu. Możesz skopiować link.

#### Jak uzyskać link do mojego profilu?

Kliknij prawym przyciskiem na awatar. Możesz skopiować link.

#### Czy kliknięcie w #hashtag wyświetla wpisy lokalne, czy z federacji?

Z federacji.

#### Jeżeli wyciszę podbity wpis, kto zostanie wyciszony? Autor, czy osoba, która go podbiła?

Autor oryginalnego wpisu.

#### Mogę zobaczyć, o czym rozmawiają użytkownicy innych instancji?

Tak, spróbuj świetnego [narzędzia podglądu instancji](http://www.unmung.com/mastoview?url=mastodon.social&view=local).

#### Jak ukryć wpisy w językach, których nie rozumiem?

W ustawieniach znajdziesz opcję „Filtrowane języki”.

#### Czy automatyczne tłumaczenia są wspierane?

Jeszcze nie, ale istnieje [skrypt TamperMonkey](https://github.com/tomouchuu/mastodon-translate), który może spełnić Twoje oczekiwania.

#### Gdzie domyślnie pojawiają się wpisy?

Domyślnie, wysłane wpisy stają się publiczne, widoczne dla całej federacji. Możesz zmienić tą opcję w ustawieniach.

#### Jaki jest domyślny limit wielkości obrazów? Czy mogę go zmienić?

Domyślny limit to 8 MB, może być on jednak zmieniony przez właściciela instancji opcją `mastodon/app/models/media_attachment.rb`:

`  validates_attachment_size :file, less_than: 8.megabytes`

Zmień 8 na inną liczbę (w megabajtach).

#### Jak mogę założyć własną instancję?

Zobacz [Podręcznik użytkownika](../README.md) (w języku angielskim), pod nagłówkiem “Running Mastodon.”

#### Znalazłem błąd lub chciałbym zaproponować nową funkcję.

Możesz zgłaszać błędy lub sugestie [tutaj, na GitHubie.](https://github.com/tootsuite/mastodon/issues)

#### Znalazłem błąd w polskim tłumaczeniu Mastodona, gdzie mogę go zgłosić?

Skontaktuj się ze [mną](https://glitch.social/@MarcinMikolajczak), lub dokonaj zmiany samodzielnie.

#### Kto jest autorem polskiego tłumaczenia Mastodona?

Kolejność na podstawie liczby commitów:
[@m4sk1n](https://glitch.social/@MarcinMikolajczak), [@rysiekpl](https://mastodon.social/@rysiek)

Podziękowania dla Polaków z całego Fediwersum za wysyłanie swoich uwag dotyczących tłumaczenia.

#### Oryginalne FAQ posiada ilustracje. Dlaczego je zjadłeś?

Wkrótce wykonam je w języku polskim, na podstawie aktualnej wersji Mastodona.

#### Bardzo apetyczne FAQ, mogę prosić o dokładkę?

Proszę, to dla Ciebie. ;)

* [https://hastebin.com/raw/xuqogukimu](https://hastebin.com/raw/xuqogukimu)

* [https://github.com/ThomasLeister/masto-faq](https://github.com/ThomasLeister/masto-faq)

* [http://mastoguide.info/Pages/FAQindex.html](http://mastoguide.info/Pages/FAQindex.html)

* [https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7](https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7)

* [https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md)

---
To FAQ powstało dzięki [@Gargron](https://mastodon.social/@Gargron),  [@raccoon](https://mastodon.social/@Raccoon), [@upside](https://octodon.social/@upside), [@zacanger](https://mastodon.social/@zacanger), [@NthTensor](https://octodon.social/@NthTensor), [@ametlles](https://mastodon.social/@ametlles) i wielu innym członkom Fediwersum!
