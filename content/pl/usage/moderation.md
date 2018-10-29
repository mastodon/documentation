---
title: Moderacja
description: Omówienie narzędzi moderacyjnych na Mastodonie
menu:
  docs:
    parent: usage
    weight: 4
---
## Indywidualność moderacji

Moderacja na Mastodonie zawsze działa lokalnie, tzn. tylko dla konkretnego serwera. Administrator lub moderator jednego serwera nie może wpłynąć na użytkownika innego serwera, a jedynie kopię jego profilu na swoim serwerze.

### Wyłączenie logowania

Konto na Mastodonie może zostać wyłączone. W ten sposób użytkownik nie może nic na nim zrobić, ale jego zawartość pozostaje nietknięta. To ograniczenie może zostać cofnięte w każdej chwili. Może zostać założone tylko na lokalnych użytkowników serwera.

### Wyciszenie

Wyciszenie na Mastodonie jest sposobem na jego odizolowanie. Wyciszone konto nie jest widoczne dla użytkowników, które go nie obserwują. Jego zawartość wciąż istnieje i może zostać znaleziona z użyciem wyszukiwarki, a autor wspomniany i śledzony, ale pozostaje niewidoczna.

Obecnie wyciszenie nie wpływa na federację. Lokalnie wyciszone konto *nie* jest automatycznie wyciszone na innych serwerach.

To ograniczenie jest odwracalne, wyciszenie możę zostać cofnięte w każdej chwili.

### Zawieszenie

Wyciszenie na Mastodonie jest równoznaczne z usunięciem go. Konto nie może zostać wyszukane, strona profilu, wraz ze wszystkimi jego wpisami, wysłanymi plikami i resztą danych zostają usunięte. To ograniczenie jest **nieodwracalne**. Choć zawieszenie może zostać cofnięte, a użytkownik może odzyskać konto, treść znika na zawsze.

## Moderacja całych serweróœ

Ponieważ samodzielne moderowanie dużej liczby użytkowników z nieprawidłowo zachowującego się serwera może być męczące, jest możliwa prewencyjna moderacja wszystkich użytkowników danego serwera nazywana **blokadą domeny**, która ma kilka poziomów swojego zakresu.

### Odrzucanie zawartości multimedialnej

Jeżeli ta opcja jest włączona, żadne pliki z danego serwera nie będą przetwarzane. Wliczane są w to awatary, obrazy nagłówka, niestandardowe emoji i załączniki multimedialne.

### Wyciszenie

Wycisza wszystkich obecnych i przyszłych użytkowników serwera.

### Zawieszenie

Zawiesza wszystkich obecnych i przyszłych użytkowników serwera. Nie jest przechowywana zawartość z serwera poza nazwami użytkowników.

## Sposoby na zapobieganie spamu

Istnieje kilka podstawowych sposobów na zapobieganie spamu na Mastodonie:

- Rejestracja wymaga potwierdzenia adresu e-mail
- Rejestracja jest ograniczana na podstawie adresu IP.

Doświadczony spamer może jednak ominąć je. Innym sposobem jest **czarna lista domen e-mail**. Podczas rejestracji, Mastodon sprawdza rekord A lub MX podanego adresu e-mail, np. adres IP serwera e-mail i porównuje ten adres e-mail z przechowywaną czarną listą.

### Blokowanie na podstawie serwerów e-mail

Spamerzy będą często używać innych domen e-maili, aby wyglądało to tak, jakby używali innych serwerów e-mail, które ciężko byłoby dodawać oddzielnie na czarną listę. Często jednak one wszystkie prowadzą do jednego adresu IP serwera e-mail. Jeżeli widzisz, że dużo spamerów rejestruje się w tym samym czasie, możesz to sprawdzić używając narzędzia wyszukiwania po DNS online lub korzystając z linuksowego narzędzia `dig` – np. `dig 1.2.3.4` wyświetli wszystkie rekordy DNS dla tego IP. Jeżeli zauważysz, że IP jest to samo dla wszystkich domen, możesz dodać je do czarnej listy domen e-mail.

### Blokowanie po IP

Nie jest możliwe zablokowanie odwiedzających po adresie IP z użyciem Mastodona i nie jest to zbyt dobre rozwiązanie. Adresy IP czasem są używane przez wiele osób, zmieniają się ich właściciele. Jest możliwe zablokowanie odwiedzających po adresie IP na Linuksie używając firewalla. Oto przykład korzystający z `iptables` i `ipset`:

```bash
# Zainstaluj ipset
sudo apt install ipset
# Utwórz czarną listę o nazwie „spambots”
sudo ipset create spambots nethash
# Dodaj 1.2.3.4 na czarną listę
sudo ipset add spambots 1.2.3.4
# Dodaj regułę firewalla opartą o czarną listę
sudo iptables -I INPUT 1 -m set --match-set spambots src -j DROP
```

Uważaj, aby nie zablokować siebie na własnym urządzeniu.
