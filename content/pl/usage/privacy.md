---
title: Prywatność
overview: Omówienie funkcji dotyczących prywatności na Mastodonie i ich skutków
menu:
  docs:
    parent: usage
    weight: 3
---

## Poziomy prywatności

|Poziom|Publiczna oś czasu|Odnośnik bezpośredni|Widok profilu|Osi czasu|
|------|:----------------:|:------------------:|:-----------:|:-------:|
|Publiczny|{{< yes >}}|{{< yes >}}|{{< yes >}}|{{< yes >}}|
|Niewypisany|{{< no >}}|{{< yes >}}|{{< yes >}}|{{< yes >}}|
|Tylko dla śledzących|{{< no >}}|{{< no >}}|{{< no >}}|{{< yes >}}|
|Bezpośrednio|{{< no >}}|{{< no >}}|{{< no >}}|{{< no >}}|

Niezależnie od poziomu, każdy wspomniany użytkownik może zobaczyć wiadomość w powiadomieniach.

**Nie udostępniaj niebezpiecznych i wrażliwych informacji używając bezpośrednich wiadomości**. Mastodon nie jest aplikacją do szyfrowanych połączeń taką jak Signal i Wire, administrator bazy danych serwera nadawcy i odbiorcy ma dostęp do tekstu. Używaj ich z taką ostrożnością, jak prywatnych wiadomości na forach, Discordzie i Twitterze.

## Blokada konta

Aby mieć kontrolę nad tym, kto zobaczy wpisy tylko dla śledzących, musisz zablokować swoje konto – w innym przypadku, kazdy może zacząć Cię obserwować, aby zobaczyć Twoje starsze wpisy. Zablokowanie konta na Mastodonie dodaje krok autoryzacji do procesu śledzenia.

Po zablokowaniu konta, zanim ktoś będzie mógł zacząć Cię śledzić, otrzymasz prośbę o możliwość śledzenia, którą możesz przyjąć lub odrzucić.

Pamiętaj, że prywatność na Mastodonie odnosi się do poszczególnych kont, nie całego konta – nie istnieje sposób na natychmiastowe uczynienie wszystkich starszych wpisów prywatnymi.

## Blokowanie i wyciszanie
### Ukrywanie podbić

Jeżeli ukryjesz czyjeś podbicia, nie będziesz ich widzieć na osiach czasu.

### Wyciszanie

Gdy wyciszysz użytkownika, masz też możliwość wyciszenia powiadomień dotyczących go. Wyciszenie oznacza, że nie będziesz widzieć:

- wpisów użytkownika na Twoim strumieniu
- wpisów tego użytkownika podbitych przez innego
- wpisów użytkowników wspominających o nim
- wpisów użytkownika na publicznych osiach czasu

Jeżeli wyciszysz też powiadomienia, nie będziesz widzieć powiadomień od tego użytkownika.

Użytkownik nie może dowiedzieć się, że został wyciszony.

### Blokowanie

Blokowanie użytkownika ukrywa:

- wpisy użytkownika na Twoim strumieniu
- wpisy tego użytkownika podbitych przez innego
- wpisy użytkowników wspominających o nim
- wpisy użytkownika na publicznych osiach czasu
- powiadomienia od tego użytkownika

Dodatkowo, zablokowany użytkownik:

- zostaje zmuszony, aby przestał Cię zaobserwować
- nie może Cię zaobserwować
- nie zobaczy podbić Twoich wpisów od innych użytkowników
- nie zobaczy Twoich wpisów na publicznej osi czasu

Jeżeli korzystasz z tego serwera co zablokowany użytkownik, nie będzie on mógł zobaczyć Twoich wpisów będąc zablokowany.

### Ukrywanie całego serwera

Jeżeli ukryjesz cały serwer:

- nie zobaczysz wpisów z tego serwera na publicznej osi czasu
- nie zobaczysz podbić wpisów z tego serwera od innych użytkowników
- nie zobaczysz powiadomień z tego serwera
- utracisz wszystkie obserwacje użytkowników z tego serwera
