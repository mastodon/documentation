---
title: Zmień swoje ustawienia
description: Dostosuj wszystko tak, jak lubisz.
menu:
  docs:
    weight: 70
    parent: user
---

## Dostosowywanie interfejsu użytkownika {#interface}

### Wybierz motyw {#theme}

Mastodon domyślnie korzysta z ciemnego motywu, ale może zostać wybrany też jasny lub wysokokontrastowy motyw.

{{< figure src="/assets/light-theme.jpg" caption="Jasny motyw Mastodona" >}}

### Wybierz układ {#layout}

Mastodon domyślnie wybiera prosty, jednokolumnowy układ z polem tworzenia wpisów po lewej i wyborem kolumny po prawej. Możesz wybrać zaawansowany interfejs, pozwalający na wyświetlanie i przypięcie wielu kolumn jednocześnie.

{{< figure src="/assets/advanced-web-ui.jpg" caption="Zaawansowany interfejs" >}}

W obu interfejsach aktualizacje ładują się, gdy tylko dostępne są nowe wpisy. Możesz włączyć Tryb spowolniony, który zamiast tego pokazuje na górze kolumny komunikat wskazujący liczbę nowych dostępnych wpisów, które zostaną załadowane po kliknięciu tego komunikatu.

Z uwagi na dostępność, autoodtwarzanie animowanych GIF-ów jest domyślnie wyłączone. Możesz włączyć animowane GIF-y, jeżeli chcesz widzieć animacje. Możesz też ograniczyć ilość animacji w UI.

Trendujące hashtagi mogą być wyświetlane lub ukryte pod kolumną „Rozpocznij” w zaawansowanym UI lub pod wyborem kolumn w uproszczonym UI \(tylko jeśli jest wystarczająco miejsca, aby je wyświetlić\).

### Dialogi potwierdzenia {#confirm}

Możesz wybrać, aby wymagać potwierdzenia przed wykonaniem pewnych akcji. Obecnie, potwierdzenia mogą zostać ustawione dla następujących działań:

* Cofnięcie obserwacji
* Udostępnienie
* Usunięcie

### Wrażliwa zawartość {#sensitive}

Domyślnie, media oznaczone jako wrażliwe są ukrywane i wymagają kliknięcia ich. Możesz wybrać, aby automatycznie ukrywać wszystkie media za taką nakładką, lub automatycznie pokazywać je, niezależnie czy są ustawione jako wrażliwe.

Ukryte i niezaładowane media używają kolorowych gradientów korzystających z algorytmu BlurHash, korzystającego z kolorów obrazu, lecz rozmywających detale. Te gradienty mogą być wyłączone.

{{< figure src="/assets/pl/blurhash.jpg" caption="Przykład miniaturki z blurhashem" >}}

Wpisy z ostrzeżeniami o zawartości są domyślnie zwijane, ale możesz wybrać aby zawsze wyświetlany był pełny wpis.

## Kontrolowanie powiadomień {#notifications}

### Wysyłanie e-maili {#email}

Możesz wybrać, aby dostawać powiadomienia e-mail według typów powiadomień, które otrzymujesz na Mastodonie. Możesz włączyć maile dla poszczególnych rodzajów powiadomień:

* Obserwacje
* Prośby o możliwość obserwacji
* Udostępnienia
* Ulubione
* Wspomnienia

Możesz też włączyć maile z przeglądami, które zawierają przegląd powiadomień otrzymanych podczas dłuższej nieaktywności.

### Ukrywanie niektórych powiadomień {#hide-notifications}

Możesz wybrać, aby nie otrzymywać powiadomień od osób, których nie obserwujesz, lub osób, które Cię nie obserwują. Sprawi to, że te odpowiedzi, polubienia, udostępnienia i inne interakcje nie będą Ci pokazywane.

Możesz też wybrać, aby nie otrzymywać powiadomień, gdy otrzymasz wiadomość bezpośrednią od osoby, której nie obserwujesz.

## Pozostałe {#misc}

Jeżeli zdecydujesz się wypisać się z indeksowania w wyszukiwarkach, flaga `noindex` zostanie dodana do strony Twojego profilu i Twoich wpisów.

Możesz ukryć swoją sieć, dzięki czemu lista obserwujących Cię i obserwowanych przez Ciebie będzie widoczna tylko dla Ciebie.

{{< figure src="/assets/pl/hidden-network.jpg" caption="Profil, którego właściciel zdecydował się ukryć swoją sieć" >}}

Jeżeli chcesz widzieć wpisy, które zostały udostępnione wielokrotnie na osi czasu, możesz wyłączyć grupowanie podbić w osiach czasu.

### Domyślne ustawienia wpisów {#posting}

Wpisy domyślnie są ustawiane jako publiczne. Możesz wybrać, aby nowe wpisy były domyślnie niewidoczne lub tylko dla obserwujących. Dla lepszego wyjaśnienia poziomów prywatności przeczytaj [Tworzenie wpisów &gt; Poziomy publikacji](../posting#privacy).

Domyślnie, język Twoich wpisów jest wykrywany automatycznie, ale to wykrywanie nie jest zbyt precyzyjne. Jeżeli piszesz głównie bądź tylko w jednym języku, możesz go tu ustawić.

Jeżeli często publikujesz zawartość wrażliwą, możesz wybrać, aby zawsze oznaczać Twoje media jako wrażliwe.

### Filtrowanie języków na publicznych osiach czasu {#languages}

Możesz wybrać, aby wyświetlały się jedynie wpisy w określonych językach, kiedy przeglądasz publiczne osie czasu. Pamiętaj jednak, że wykrywanie języków może być bardzo niedokładne i możesz wciąż widzieć wpisy w wyłączonym języku lub ominąć wpisy we włączonych językach.

