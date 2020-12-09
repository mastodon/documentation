---
title: Korzystaj z funkcjonalności sieci
description: Obserwuj i rozmawiaj z osobami z dowolnego serwera.
menu:
  docs:
    weight: 40
    parent: user
---

## Przeglądanie zawartości z publicznych osi czasu {#timelines}

{{< figure src="/assets/image%20%2830%29.png" caption="Wpisy na publicznej osi czasu" >}}


Aby pozwolić na poznanie potencjalnie interesującej treści, Mastodon pozwala na przeglądanie wszystkich publicznych wpisów. Ponieważ nie ma tu danych współdzielonych między wszystkimi serwerami, nie możesz przeglądać _wszystkich_ publicznych wpisów. Kiedy przeglądasz **oś czasu federacji**, zobaczysz wszystkie wpisy, o których wie serwer. Istnieje wiele sposobów, aby Twój serwer dowiadywał się o wpisach, ale ogromna część z nich to po prostu wpisy osób śledzonych przez użytkowników Twojego serwera.

Istnieje sposób na filtrowane osi czasu federacji, aby wyświetlać tylko wpisy z Twojego serwera -- lokalna oś czasu. Pamiętaj, że „lokalna” odnosi się tu do serwera, nie położenia geograficznego.

## Interakcje z wpisami użytkowników {#actions}

{{< figure src="/assets/image%20%2821%29.png" caption="Rozszerzony widok może zostać załadowany po kliknięciu wpisu w osi czasu." >}}

Możesz dokonywać szybkich działań na wpisach bezpośrednio z osi czasu lub kliknąć wpis, aby zobaczyć rozszerzony widok zawierający szczegółowe informacje o nim, takie jak pełen czas dodania, liczba interakcji czy odpowiedzi w wątku, jeśli takie istnieją. Na wpisie można dokonać następujących działań:

* **Odpowiedz** na wpis klikając ikonę strzałki. Twój wpis pojawi się w wątku pod wpisem, na który odpowiadasz.
* **Podbij** wpis klikając ikonę strzałki cyklicznej. Wpis zostanie udostępniony na Twoim profilu.
* **Dodaj do ulubionych** wpis klikając na ikonę gwiazdki. Wpis zostanie dodany do Twojej listy ulubionych, a autor wpisu otrzyma powiadomienie o polubieniu wpisu.
* **Dodaj do zakładek** klikając na ikonę zakładki. Wpis zostanie dodany do Twojej prywatnej listy zakładek bez powiadamiania o tym kogokolwiek.
* Uzyskaj dostęp do **menu** z dodatkowymi opcjami, klikając ikonę wielokropka.

## Powiadomienia {#notifications}

{{< figure src="/assets/image%20%2850%29.png" caption="Kolumna powiadomień" >}}

Jeżeli inne osoby wejdą w interakcje z jednym z Twoich wpisów, otrzymasz powiadomienie zależące od rodzaju działania. Twoja kolumna powiadomień pozwala wyświetlić wszystkie powiadomienia, lub przefiltrować określone rodzaje powiadomień:

* **Wspomnienia:** otrzymywane, kiedy ktoś wspomniał o Tobie we wpisie.
* **Ulubione:** otrzymywane, kiedy ktoś dodał Twój wpis do ulubionych.
* **Podbicia:** otrzymywane, kiedy ktoś udostępnił jeden z Twoich wpisów.
* **Ankiety:** otrzymywane, kiedy zakończyła się ankieta, którą utworzyłeś(-aś) lub w której brałeś(-aś) udział.
* **Obserwacje:** otrzymywane, kiedy ktoś zaobserwował Twój profil.

## Obserwowanie profilów {#follow}

![](/assets/image%20%2811%29.png)

Tak długo, jak trafiasz na czyiś profil z poziomu interfejsu swojej aplikacji, np. interfejsu serwera, z którego korzystasz lub aplikacji mobilnej, możesz po prostu nacisnąć „Śledź” i nie zauważysz różnicy wynikającej z tego, czy ta osoba jest na Twoim serwerze.

Jeśli jednak przeglądasz czyiś publiczny profil z poziomu innego serwera, jest jedna przeszkoda — serwer widzi Cię jako anonimowego odwiedzającego. Nie przejmuj się! Możesz po prostu skopiować odnośnik do tego profilu lub jednego z jego wpisów i wkleić ten adres w pole wyszukiwania.

Jeżeli przeglądasz publiczny profil z innego serwera Mastodona, przeczytaj [Korzystanie z Mastodona zewnętrznie](../external/#interact).

## Wyszukiwanie {#search}

{{< figure src="/assets/image%20%2819%29.png" caption="Możliwość wyszukiwania jest dostępna na pasku bocznym." >}}

Podstawowe wyszukiwanie na Mastodonie pozwala zalogowanym użytkownikom na znalezienie wpisów zawierających określony hashtag, lub załadowanie użytkownika bądź wpisu znając adres jego profilu lub adres URL. Wyszukiwanie słowa wyświetli profile, których nazwy użytkowników lub nazwy wyszukiwania zawierają je, oraz hashtagi spełniające to kryterium.

{{< figure src="/assets/image%20%2839%29.png" caption="Przykład wpisu ładowanego bezpośrednio z adresu URL." >}}

{{< figure src="/assets/image%20%2823%29.png" caption="Przykład konta uzyskanego z wyszukiwania wyrazu „cats”." >}}

{{< figure src="/assets/image%20%2827%29.png" caption="Przykład hashtagu uzyskanego z wyszukiwania „cats”." >}}

Administratorzy mogą dodatkowo zainstalować wyszukiwanie pełnego tekstu. Wyszukiwanie pełnego tekstu na Mastodonie pozwala zalogowanym użytkownikom na wyszukiwanie wyników z własnych wpisów, własnych polubień, zakładek i wspomnień. Celowo nie pozwala na wyszukiwanie dowolnych wierszy znaków w całej bazie danych, aby ograniczyć możliwość nadużywania ten funkcji przez osoby szukające kontrowersyjnych treści do dogpilingu.

Obsługiwane są następujące operatory:

* **"pełne wyrażenie"** spróbuje znaleźć tekst będący zawartością cudzysłowu. W ten sposób odnajdziesz tylko pełne dopasowania, więc np. po wpisaniu `"Warszawa Praga"` znajdziesz tylko wpisy dotyczące tej warszawskiej dzielnicy.
* **-wyklucz** wykluczy słowo poprzedzone minusem. Pozwala to na przefiltrowanie części słów, więc na przykład `zwierzęta -koty` pozwoli Ci znaleźć wpisy o zwierzętach z wykluczeniem kotów.
* **+uwzględnij** włączy słowo po znaku plusa. To pozwala na wyszukiwanie wielu słów, które muszą być uwzględnione, więc np. `kot +pies` odnajdzie wpisy dotyczące jednocześnie kotów i psów.

## Rozmowy bezpośrednie {#direct}

{{< figure src="/assets/image%20%2812%29.png" caption="Lista konwersacji zawierających wiadomości bezpośrednie." >}}

Na Mastodonie, wiadomości bezpośrednie to po prostu wpisy o bezpośredniej widoczności. Widoczność może być wybrana dla poszczególnych wpisów, co pozwala na zmianę poziomu prywatności w późniejszym momencie w wątku. Kolumna wiadomości bezpośrednich wyświetla obecnie listę wszystkich konserwacji zawierających wiadomość bezpośrednią. Kliknięcie konwersacji załaduje powiązany wątek. 

{{< figure src="/assets/image%20%2857%29.png" caption="Wiadomość bezpośrednia w wątku." >}}

## Osie czasu list {#lists}

Listy są podzbiorami Twojej osi czasu. Możesz utworzyć listę, nadać jej nazwę i dodać do niej użytkowników, których obserwujesz.

![](/assets/image%20%2828%29.png)

Otwarcie listy załaduje jej oś czasu. Osie czasu listy zawierają wyłącznie wpisy członków tej listy, oraz odpowiedzi do Ciebie lub innych członków tej listy.

{{< figure src="/assets/image%20%285%29.png" caption="Oś czasu listy" >}}

