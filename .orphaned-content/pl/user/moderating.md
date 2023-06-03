---
title: Radzenie sobie z niechcianą treścią
summary: Kontroluj co zobaczysz, dla bardziej przyjaznego doświadczenia.
menu:
  docs:
    weight: 50
    parent: user
---

## Filtrowanie wpisów {#filters}

Możliwe jest filtrowanie wpisów według określonych słów kluczowych lub fraz, aby były automatycznie ukrywane.

{{< figure src="assets/filter-list.jpg" caption="Przykład aktywnych filtrów dla różnych słów kluczowych w różnych kontekstach." >}}

Aby utworzyć i zarządzać filtrami, odwiedź Preferencje &gt; Filtry. Przycisk „Dodaj nowy filtr” pozwoli na utworzenie nowego filtru, a istniejące filtry mogą zostać edytowane lub usunięte. Istniejące filtry są podsumowane w tabeli.

{{< figure src="assets/filter-edit.jpg" caption="Filtry mogą mieć datę wyczerpania, określone konteksty, usuwanie po stronie serwera lub używać granic słów." >}}

Filtry mają następujące opcje:

### Słowa kluczowe lub frazy {#filter-phrase}

To ciąg znaków, który jest sprawdzany. Słowo kluczowe będzie wyszukiwane w zawartości wpisu, uwzględniając CW, opisy mediów i opcje ankiet.

### Wygasanie po czasie {#filter-expire}

Opcjonalnie możesz zastosować filtr tylko na określony okres. Wygasłe filtry nie są automatycznie usuwane, ale mogą być włączone ponownie, ustawiając nową datę wygaśnięcia (lub wyłączając wygasanie).

### Kontekst filtrów {#filter-context}

Wybierz, gdzie zostanie zastosowany filtr:
* Strona główna i listy – spełniające kryteria wpisy zostaną usunięte ze strony głównej i list
* Powiadomienia – spełniające kryteria powiadomienia nie będą wyświetlane
* Publiczne osie czasu – spełniające kryteria wpisy nie będą pojawiać się na lokalnych/sfederowanych osiach czasu
* Konwersacje – spełniające kryteria wpisy będą ukrywane w wątkach i szczegółowym widoku

### Usuwanie zamiast ukrywania {#filter-drop}

Filtrowanie zwykle odbywa się po stronie klienta, więc wyłączenie filtru sprawi, że filtrowane wpisu będą widoczne ponownie. Jeśli jednak włączysz „Usuwaj zamiast ukrywać”, pasujące wpisy będą całkowicie usuwane i nigdy nie zobaczysz ich w powiadomieniach lub na stronie głównej.

### Pełne słowa {#filter-whole}

Filtry zwykle są stosowane we wpisach zawierających wskazane znaki, niezależnie czy są one w środku słowa. Włączenie opcji „Całe słowo” sprawi, że filtr będzie działał tylko, jeżeli słowo jest otoczone przez spacje lub inne znaki niealfanumeryczne.

## Działania po stronie użytkownika {#blocking-and-muting}

{{< figure src="assets/profile-dropdown.jpg" caption="Menu wyboru profilu oferuje różnorodne działania." >}}

### Ukrywanie udostępnień {#hide-boosts}

Jeżeli ukryjesz czyjeś udostępnienia, nie zobaczysz ich udostępnień na stronie głównej. Dotyczy to tylko kont użytkowników, które obecnie obserwujesz.

### Wyciszanie {#mute}

{{< figure src="assets/muted.jpg" caption="Przykład wyciszonych kont." >}}

Przy wyciszeniu możesz zadecydować czy wyciszysz powiadomienia od tej osoby. Wyciszenie bez wyciszania powiadomień sprawi, że:

* Nie zobaczysz tego użytkownika na stronie głównej
* Nie zobaczysz innych osób, gdy udostępniają tego użytkownika
* Nie zobaczysz innych osób, gdy wspomniają o tym użytkowniku
* Nie zobaczysz tego użytkownika w publicznych osiach czasu

Jeżeli wybierzesz, aby wyciszyć też powiadomienia od tego użytkownika, nie będziesz dostawać też od niego powiadomień.

Wyciszenia mogą mieć dodatkowo czas, po którym wygasną.

Użytkownik nie może się dowiedzieć, że został wyciszony.

### Blokowanie {#block}

{{< figure src="assets/blocked.jpg" caption="Przykład zablokowanych kont." >}}

Blokowanie ukrywa użytkownika z Twojego widoku:

* Nie zobaczysz tego użytkownika na stronie głównej
* Nie zobaczysz innych osób, gdy udostępniają tego użytkownika
* Nie zobaczysz innych osób, gdy wspomniają o tym użytkowniku
* Nie zobaczysz tego użytkownika w publicznych osiach czasu
* Nie zobaczysz powiadomień od tego użytkownika

Dodatkowo, ze strony zablokowanego użytkownika:

* Użytkownik przestaje Cię obserwować
* Użytkownik nie może Cię zaobserwować ponownie
* Użytkownik nie zobaczy udostępnień Twoich wpisów przez innych
* Użytkownik nie zobaczy Cię w publicznych osiach czasu

Jeżeli jesteś na tym samym serwerze, na którym jest zablokowana osoba, ta osoba nie będzie mogła zobaczyć Twoich wpisów na Twoim profilu, gdy jest zalogowana.

### Ukrywanie całego serwera {#block-domain}

![]({{ relUrl "/assets/block-domain.png" }})

Jeżeli zablokujesz cały serwer:

* Nie zobaczysz wpisów z tego serwera na publicznych osiach czasu
* Nie zobaczysz udostępnień z tego serwera na stronie głównej
* Nie zobaczysz powiadomień z tego serwera
* Utracisz obserwujących z tego serwera

## Zgłaszanie nieodpowiedniej treści moderatorom {#report}

{{< figure src="assets/report-modal.jpg" caption="Okno zgłaszania pozwalające na wybór przykładowych wpisów, dodanie notatki czy przekierowanie zgłoszeń." >}}

Jeżeli zobaczysz wpis lub użytkownika naruszającego zasady Twojego serwera, możesz zgłosić użytkownika moderatorom swojego serwera. Wybranie opcji „Zgłoś” otworzy okno zgłaszania. Tam możesz (jest to wskazane) dodać notatkę, w której napiszesz, dlaczego zgłaszasz to konto. Możesz załączyć nieodpowiednie wpisy dla dodatkowego kontekstu zgłoszenia, a jeżeli naruszają one zasady zdalnego serwera, możesz przekierować zgłoszenie również do jego moderatorów.
