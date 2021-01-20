---
title: Przenieś lub opuść konto
description: Zabierz swoje informacje i rób z nimi, co chcesz.
menu:
  docs:
    weight: 100
    parent: user
---

## Eksportuj informacje {#export}

{{< figure src="/assets/pl/export.png" caption="Strona eksportu danych w ustawieniach" >}}

W każdym momencie możesz odwiedzić Preferencje &gt; Eksportowanie danych i pobrać plik CSV zawierający obecnie obserwowane konta, Twoje obecne listy, blokowanych lub wyciszonych użytkowników, zablokowane domeny. Twoja lista obserwowanych, blokowanych, wyciszonych lub zablokowanych domen może zostać zaimportowana w Preferencje &gt; Importowanie danych, gdzie mogą one zostać połączone lub nadpisane.

Zażądanie archiwum wpisów lub mediów jest możliwe co 7 dni i mogą one zostać pobrane w formacie ActivityPub JSON. Mastodon obecnie nie obsługuje importowania wpisów lub mediów ze względu na ograniczenia techniczne, ale Twoje archiwum może zostać wyświetlone przez dowolne oprogramowanie, które potrafi parsować dokumenty ActivityPub.

## Przekierowanie lub przenoszenie profilu {#migration}

W dolnej części Preferencje &gt; Profil możesz znaleźć opcje powiązane z przekierowaniem lub migracją konta.

### Przekierowanie profilu {#redirect}

{{< figure src="/assets/pl/account-redirect.png" caption="Formularz przekierowania profilu" >}}

Przekierowanie konta wyłączy możliwość tworzenia z niego wpisów i wyświetli komunikat „przeniesiono profil”, wskazując na Twoje nowe konto. Każdy wyświetlający Twój nowy profil zobaczy tę informację i będzie wiedział, aby zaobserwować Twoje nowe konto. Obserwowanie przekierowanych kont nie jest możliwe. Przekierowanie może być anulowane w dowolnym momencie.

### Przenoszenie profilu {#move}

{{< figure src="/assets/pl/account-move.png" caption="Formularz przenoszenia profilu" >}}

Przenoszenie konta działa tak jak przekierowanie konta, ale również nieodwracalnie wymusi na obserwujących Twoje konto cofnięcie tej obserwacji i zaobserwowanie nowego konta, jeżeli oprogramowanie ich serwerów obsługuje aktywność Move. Twoje wpisy nie zostaną przeniesione z uwagi na ograniczenia techniczne. Istnieje też okres, w którego trakcie nie możesz ponownie migrować konta, więc uważaj, zanim użyjesz tej opcji!

### Aliasy konta {#aliases}

{{< figure src="/assets/pl/account-aliases.png" caption="Ekran zarządzania aliasami" >}}

Przeniesienie konta jest tylko możliwe, jeżeli powstał alias między dwoma kontami. Aliasy kont nie są obecnie używane w innych sytuacjach niż przeniesienie konta, gdzie musisz ustawić stare konto jako alias dla nowego konta przed rozpoczęciem przenoszenia. Samo ustawianie aliasu nie przynosi szkód i może być odwrócone.

## Usuwanie konta {#delete}

{{< figure src="/assets/pl/account-delete.png" caption="Formularz usunięcia konta" >}}

Na dole Preferencje &gt; Profil możesz znaleźć formularz usunięcia konta. Usunięcie konta jest nieodwracalne i sprawi, że zarówno Twój profil, jak i nazwa użytkownika nie będą mogły zostać później użyte.

