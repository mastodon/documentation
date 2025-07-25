---
title: Utwórz wpisy
description: Dzielenie się swoimi przemyśleniami nigdy nie było bardziej wygodne.
menu:
  docs:
    weight: 30
    parent: user
---

{{< figure src="assets/compose-with-cw.png" caption="Tworzenie wpisów z włączonym CW" >}}

## Tekst {#text}

Główna treść każdego wpisu może zostać utworzona z użyciem pola tekstowego. Domyślnym ograniczeniem ilości znaków jest 500 znaków.

### Odnośniki {#links}

{{< figure src="assets/compose-links.png" caption="Odnośniki muszą zaczynać się od http(s):// i są liczone jako 23 znaki niezależnie od ich długości." >}}

Jeżeli uwzględnisz w swoim wpisie odnośniki, muszą one zaczynać się od `http://` lub `https://`. Wszystkie odnośniki są traktowane, jakby miały 23 znaki, niezależnie od ich rzeczywistej długości, więc nie musisz korzystać z usług skracania odnośników. Właściwie to odradzamy korzystanie z nich.

### Wspominanie {#mentions}

{{< figure src="assets/compose-mentions.png" caption="Sugerowane wspomnienia dla lokalnych i zdalnych użytkowników." >}}

Możesz wspominać użytkowników, wprowadzając ich pełny adres, np. `@alicja@example.com`. Zauważ, że każde użycie `@słowo` zostanie zainterpretowane jako wspomnienie lokalnego użytkownika o nazwie `słowo`, jeżeli taki użytkownik istnieje. Tylko część zawierająca nazwę użytkownika będzie liczona do limitu długości wpisu – długość domeny nie jest liczona.

### Hashtagi {#hashtags}

{{< figure src="assets/compose-hashtags.png" caption="Hashtagi są sugerowane według częstości używania ich." >}}

Możesz używać `#hashtag`ów, aby Twoje wpisy były widoczne dla wszystkich, którzy wyszukują tego hashtagu. Hashtagi mogą zawierać tylko litery, cyfry i podkreślniki, ale nie mogą składać się z samych cyfr.

### Niestandardowe emoji {#emoji}

{{< figure src="assets/compose-custom-emoji.png" caption="Tablica niestandardowych emoji dostępnych na ekranie wyboru." >}}

Każdy serwer może oferować zestaw niestandardowych emoji, z których możesz korzystać jak na Discordzie. Możesz korzystać z nich, wpisując ich shortcode, np. `:thounking:` lub klikając na ikonę emoji w ekranie tworzenia wpisu i wybierając w kategorii „Niestandardowe”. Możesz też przeglądać i wyszukiwać standardowe emoji unicode.

## Załączniki {#attachments}

Możesz załączyć do wpisu pliki lub ankietę.

### Pliki {#media}

{{< figure src="assets/compose-media-attachment.png" caption="Miniaturka dla załączonych mediów, z możliwością usunięcia, edycji lub oznaczenia zawartości jako wrażliwą." >}}

Naciśnij ikonę spinacza, aby dodać plik do wpisu. Możesz załączyć:

* **Zdjęcia** (PNG, JPG, HEIF, WEBP, AVIF) **do 16MB**. Zdjęcia zostaną zmniejszone do 8.3 megapikseli (wystarczająco na obraz 3840x2160). Możesz załączyć maksymalnie 4 zdjęcia w jednym wpisie.
* **Animowane GIF-y** (GIFV) **do 16MB** są konwertowane do plików MP4 bez dźwięku. Wymiary GIF-a muszą być mniejsze niż 1MP (1280x720). Możesz też wysłać plik MP4 lub WebM bez dźwięku, który będzie zapętlany tak samo jak animowane GIF-y. Wpis może zawierać tylko jeden animowany GIF.
  * Statyczne pliki GIF mają te same limity, co animowane pliki GIF. Jeżeli masz problem z ich wysłaniem, musisz skonwertować je do innego obsługiwanego formatu plikow.
* **Filmy** (MP4, M4V, MOV, WebM) **do 99MB**. Filmy zostaną transkodowane do H.264 MP4 o maksymalnej przepustowości 1300kbps i liczby 120 klatek na sekundę. Wpis może zawierać tylko jeden film.
* **Dźwięk** (MP3, OGG, WAV, FLAC, OPUS, AAC, M4A, 3GP) **do 99MB**. Dźwięk zostanie transkodowany do MP3 z użyciem V2 VBR (około 192kbps). Wpis może zawierać tylko jeden plik dźwiękowy.

#### Edytowanie mediów {#edit}

{{< figure src="assets/edit-media.png" caption="Edytuj media, aby dodać opis zawartości lub wybrać punkt skupienia dla miniaturki podglądu." >}}

Po kliknięciu „Edytuj” na miniaturze załącznika, możesz załadować okno, które pozwoli na dodanie opisu mediów lub wybranie punktu skupienia. Choć jest to nieobowiązkowe, dobrze jest dodawać opis, który krótko opisze, co przedstawiane jest na mediach. Te opisy będą widoczne, gdy nie uda się załadować mediów z jakiegoś powodu, lub gdy ktoś korzysta z czytnika zawartości ekranu, lub innej technologii wspomagającej. Ustawienie punktu skupienia jest również nieobowiązkowe, ale sprawi, że miniaturka wygląda lepiej, jeżeli zdjęcie nie jest wyświetlane w proporcji 16:9.

### Ankiety {#polls}

{{< figure src="assets/compose-polls.png" caption="Ankieta z dwoma opcjami, wygasająca po jednym dniu" >}}

Naciśnij na ikonę wykresu, aby załączyć ankietę do wpisu.

* Możesz dodać maksymalnie 4 opcje. Każda może zawierać 25 znaków.
* Ankiety są domyślnie jednokrotnego wyboru. Naciśnij na przycisk wyboru, aby przełączyć ją na ankietę wielokrotnego wyboru.
* Ankiety mogą kończyć się po 5 minutach, 30 minutach, godzinie, 6 godzinach, dniu, 3 dniach lub tygodniu.

## Poziomy publikacji {#privacy}

| Poziom | Publiczne osie czasu | Odnośnik bezpośredni | Widok profilu | Domowe osi czasu |
| :--- | :--- | :--- | :--- | :--- |
| Publiczny | Tak | Tak | Tak | Tak |
| Niewidoczny | Nie | Tak | Tak | Tak |
| Tylko dla śledzących | Nie | Zalogowani na tym samym serwerze | W aplikacji lub zalogowani | Tak |
| Bezpośrednio | Nie | Zalogowani i wspomnieni | W aplikacji lub zalogowani | Nie |

Wpisy mogą być opublikowane z jednym z czterech poziomów prywatności, jak opisano poniżej. Możesdz [ustawić domyślny poziom prywatności dla swoich wpisów](../preferences#posting) i zmieniać poziom prywatności tworzonych wpisów wybierając przycisk „Dostosuj widoczność wpisów” pod treścią wpisu. 

### Publiczny {#public}

Domyślna opcja.

* Każdy może zobaczyć Twój wpis z poziomu linku bezpośredniego bez logowania się.
* Twój wpis pojawi się w aplikacji na publicznych osiach czasu.
* Twoi obserwujący zobaczą ten wpis w swoich osiach czasu, a wszyscy oznaczeni zostaną o nim powiadomieni.
* Twój wpis może zostać udostępniony przez innych użytkowników.

### Niewidoczny {#unlisted}

Tak jak przy publicznym, ale z następującą różnicą:

* Twój wpis nie pojawi się w publicznych osiach czasu na Mastodonie.

### Tylko dla śledzących {#private}

Bardziej ograniczona opcja doręczania.

* Zobaczenie Twojego wpisu przez odnośnik bezpośredni wymaga zalogowania na tym samym serwerze, na którym ta osoba obserwuje Cię lub została wspomniana.
* Twój wpis nie wyświetla się w aplikacji nikomu, za wyjątkiem obserwujących i wspomnianych osób.
* Twoi obserwujący zobaczą Twój wpis w osiach czasu, a wspomnieni zobaczą ten wpis w powiadomieniach.
* Tylko Ty możesz udostępnić ten wpis.

{{< hint style="warning" >}}
Aby publikowanie prywatnych wpisów (tylko dla obserwujących) miało sens, musisz **zablokować swoje konto** – w przeciwnym razie każdy może zaobserwować Cię, aby przeglądać Twoje starsze wpisy.
{{< /hint >}}

{{< hint style="danger" >}}
Pamiętaj, że prywatność wpisów na Mastodonie dotyczy poszczególnych wpisów, a nie całego konta, więc **nie istnieje sposób na uczynienie starszych wpisów prywatnymi.**
{{< /hint >}}

### Bezpośrednio {#direct}

Wyślij wpis wyłącznie wspomnianym użytkownikom.

* Zobaczenie Twojego wpisu przez odnośnik bezpośredni jest możliwe na serwerze, na którym znajduje się osoba, na której ktoś został wspomniany.
* Twój wpis nie pokaże się w aplikacji nikomu, poza osobami wspomnianymi.
* Wspomniani otrzymają powiadomienie o wpisie. Nie pojawi się na domowej osi czasu.
* Twój wpis nie może zostać udostępniony.

{{< hint style="warning" >}}
**Nie dziel się niebezpiecznymi ani wrażliwymi informacjami z użyciem wiadomości bezpośrednich**. Mastodon nie jest aplikacją do szyfrowanych korespondencji jak Signal czy Wire, administratorzy bazy danych serwerów wysyłającego i odbiorców wiadomości mają dostęp do ich treści. Używaj ich z taką ostrożnością, jakbyś korzystał(-a) z wiadomości prywatnych na forum, Discordzie czy Twitterze.
{{< /hint >}}

## Widoczność odpowiedzi {#replies}

Twoje odpowiedzi będą pojawiały się na osi czasu Twoich obserwujących tylko jeżeli obserwują zarówno Ciebie, jak i osobę której obserwujesz.

Kilka uwag o tym:

* Nowy wpis zaczynający się `@wzmianką` **nie** jest traktowany jak odpowiedź, wiec będzie pojawiał się na stronie głównej wszystkich Twoich obserwujących.
* Widoczność wpisu (Publiczny, Niewidoczny, Tylko dla obserwujących) **nie** wpływa na widoczność na stronie głównej.
* Jeżeli Twój wpis jest publiczny i zawiera obserwowany hasztag, będzie wyświetlany na stronie głównej niezależnie od tego, czy jest odpowiedzią.
* Inne fediwersowe oprogramowanie może wyświetlać wszystkie Twoje odpowiedzi na stronie głównej, niezależnie komu odpowiadasz.

## Ostrzeżenia o zawartości (CW) i zawartość wrażliwa {#cw}

{{< figure src="assets/status-cw.png" caption="Wpis z CW oznaczony jako zawierający zawartość wrażliwą." >}}

Jedną z funkcji obecnych na Mastodonie, których możesz nie zobaczyć na innych platformach społecznościowych, jest możliwość załączenia ostrzeżenia o zawartości do Twoich wpisów. Kiedy obecne jest ostrzeżenie o zawartości, zawartość wpisu jest domyślnie zwinięta, a widoczny jest tylko tekst ostrzeżenia, tak jak linia tematu wiadomości email, i przycisk „zobacz więcej”. Może to zostać wykorzystane do podania podsumowania lub tytułu wpisu, lub podania skrótu poprzedniego wpisu z wątku.

Jeżeli załączone są media, pokaże się przy nich przełącznik pozwalający „oznaczyć zawartość multimedialną jako wrażliwą”. To domyślnie ukryje media za rozmytą miniaturką. Dodanie CW do wpisu automatycznie oznacza również media jako wrażliwe.
