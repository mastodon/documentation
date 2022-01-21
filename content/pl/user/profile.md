---
title: Dostosuj swój profil
description: Rozpocznij korzystanie z nowego konta.
menu:
  docs:
    weight: 20
    parent: user
---

## Wygląd Twojego profilu {#appearance}

{{< figure src="/assets/profile-cards.jpg" caption="Karta profilu składająca się z nazwy wyświetlanej, awataru i nagłówka" >}}

Możesz zmienić to, jak Twój profil wygląda u innych, kierując się do: Preferencje &gt; Profil &gt; Wygląd.

### Nazwa wyświetlana {#name}

Twoja nazwa wyświetlana jest widoczna dla innych przy Twoim adresie. Domyślnie możesz ustawić nazwę zawierającą do 30 znaków.

### Biogram {#bio}

Twój biogram to krótki opis Twojej osoby wyświetlana jako notatka na Twoim profilu. Domyślnie możesz ustawić biogram składający się maksymalnie z 500 znaków.

### Awatar {#avatar}

Twój awatar to ikona wyświetlana po lewej od Twoich wpisów i część Twojej wizualnej tożsamości. Możesz wysłać obraz PNG, GIF lub JPG w wielkości do 2MB jako awatar. Zostanie on zmniejszony do 400x400.

### Nagłówek {#header}

Twój nagłówek to baner wyświetlany na górze Twojego profilu, jak i na kartach profilu wyświetlanych w listach obserwacji czy katalogu profili. Możesz wysłać obraz PNG, GIF lub JPG w wielkości do 2MB jako nagłówek. Zostanie on zmniejszony do 1500x500.

## Flagi profilu {#flags}

Możesz oflagować swoje konto, aby poinformować innych, w jaki sposób korzystasz z Mastodona.

![](/assets/pl/bot-flag.jpg)

### Konto zablokowane {#locked}

Jeśli zablokujesz swoje konto, staną się dwie rzeczy:

* Nowi obserwujący nie będą automatycznie przyjmowani, będziesz musiał(a) ręcznie zatwierdzać ich.
* Ikona kłódki będzie widoczna dla innych, aby wiedzieli, że obserwacja nie zostanie automatycznie przyjęta.

### Konto bota {#bot}

Włączenie tej flagi doda ikonkę bota do Twojego profilu. Dzięki temu inni dowiedzą się, że Twój profil może dokonywać zautomatyzowanych działań i może nie być nadzorowany przez człowieka. Inne oprogramowanie może traktować profile botów w inny sposób, ale obecnie Mastodon jedynie wyróżnia boty wizualnie.

### Katalog profilów {#discoverable}

Udział w katalogu profilów sprawi, że Twój profil będzie mógł zostać odnaleziony przez tę funkcję, pozwalającą na przeglądanie profilów.

## Metadane profilu {#fields}

Metadane profilu to możliwość dodania do profilu dodatkowych, przejrzystych informacji. Masz cztery wiersze, w których możesz wpisać nazwę i zawartość pola. Na przykład:

| Nazwa | Zawartość |
| :--- | :--- |
| Wiek | 25 |
| Kraj | Niemcy |
| Zaimki | on/jego |
| Strona internetowa | https://example.com |

To, co tam wpiszesz, zależy wyłącznie od Ciebie. Zawartość może zawierać wspomnienia, hashtagi, niestandardowe emoji i odnośniki.

### Weryfikacja odnośników {#verification}

Weryfikacja z użyciem dokumentów potwierdzających tożsamość i niebieskie znaczki nie są możliwe bez centralnego zarządzania. Mastodon może krzyżowo powiązywać odnośniki z profilem, aby udowodnić, że jesteś ich rzeczywistym właścicielem. Jeżeli jeden z nich to link do Twojej osobistej strony internetowej, która budzi zaufanie, może to służyć jako prawie najlepsza metoda weryfikacji tożsamości.

Jeżeli umieścisz odnośnik w metadanych swojego profilu, Mastodon sprawdzi, czy powiązana strona zawiera odnośnik do Twojego profilu na Mastodonie. Jeżeli tak, otrzymasz znak weryfikacji przy tym odnośniku, ponieważ jesteś jego potwierdzonym właścicielem.

Mastodon sprawdza, czy odnośnik zawiera atrybut `rel="me"`. Tak samo, Mastodon dodaje `rel="me"` do odnośników w metadanych profilu.

{{< hint style="info" >}}
Ponieważ możesz hostować Mastodona na własnym serwerze, nie istnieje lepszy sposób na potwierdzenie swojej tożsamości niż hostowanie Mastodona na własnej domenie, której inni już ufają.
{{< /hint >}}

