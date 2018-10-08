---
title: Kroki po instalacji
description: Co zrobić po zakończeniu instalacji Mastodona
menu:
  docs:
    parent: administration
    weight: 3
---

## Korzystanie z interfejsu wiersza poleceń

Interfejs wiersza poleceń Mastodona jest plikiem wykonywalnym o nazwie `tootctl` znajdującym się w katalogu `bin` wewnątrz głównego katalogu Mastodona. Musisz określić, którego środowiska chcesz używać określając zmienną środowiskową `RAILS_ENV`. Jeżeli nie jesteś programistą korzystającą z urządzenia lokalnie, musisz użyć `RAILS_ENV=production`. Jeżeli masz pewność, że nigdy nie będziesz potrzebować innego środowiska, możesz dodać je dla ułatwienia do pliku `.bashrc`, np.:

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

Jeżeli tak zrobisz, nie będziesz musiał(-a) uwzględniać go cały czas. W przeciwnym razie, wywołania `tootctl` będą wyglądały tak, zakładająć że kod Mastodona znajduje się w katalogu `/home/mastodon/live`:

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

## Tworzenie konta administratora
### W przeglądarce

Po zarejestrowaniu się w przeglądarce, musisz użyć wiersza poleceń aby nadać nowo utworzonemu kontu prawa administratora. Załóżmy, że Twoja nazwa użytkownika to `alice`:

```bash
RAILS_ENV=production bin/tootctl accounts update alice --role admin
```

### W wierszu poleceń

Możesz utworzyć nowe konto używając interfejsu wiersza poleceń.

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role admin
```

W terminalu pojawi się wygenerowane losowo hasło.

## Wypełnianie informacji o serwerze

Po zalogowaniu się, przejdź na stronę **Ustawienia strony**. Mimo braku technicznego wymogu wypełnienia tych informacji, są one istotne dla użytkowników.

|Ustawienie|Opis|
|----------|----|
|Nazwa użytkownika do kontaktu|Twoja nazwa użytkownika, aby inni mogli wiedzieć, do kogo należy serwer|
|Służbowy adres e-mail|Twój adres e-mail, aby osoby które nie mogą się zalogować lub nie mają konta mogły się z Tobą skontaktować|
|Opis instancji|Dlaczego ten serwer powstał? Dla kogo jest on przeznaczony? Co czyni go wyjątkowym?|
|Niestandardowy opis strony|Możesz tu umieścić różnego rodzaju informacje, ale zalecane jest umieszczenie **zasad**|

Po wypełnieniu tych pól, naciśnij „Zapisz zmiany”.

## Ustawienie regularnych kopii zapasowych (nieobowiązkowe, choć nie do końca)

W przypadku rzeczywistego zastosowania, upewnij się że będziesz wykonywać kopie zapasowe serwera Mastodona.
For any real-world use, you should make sure to regularly backup your Mastodon server.

### Omówienie

Things that need to be backed up in order of importance:

1. Baza danych PostgreSQL
2. Tajne klucze aplikacji z pliku `.env.production` lub odpowiadającego mu
3. Pliki wysłane przez użytkowników
4. Baza danych Redis

### Tryby awaryjne

Istnieją dwa rodzaje niepowodzeń przed którymi większość osób choni się: awaria sprzętu, taka jak uszkodzenie danych na dysku i błąd oprogramowania lub człowieka, taki jak przypadkowe usunięcie części danych. W tej dokumentacji omówiony zostaje tylko pierwszy przypadek.

Utrata bazy danych PostgreSQL to najgorsza możliwość. Mastodon przechowuje tam wszystkie ważne dane. Jeżeli baza danych zniknie, wraz z nią znikną wszystkie konta i wpisy z Twojego serwera.

Jeżeli utracisz tajne klucze aplikacji, część funkcji Mastodona przestanie działać użytkownikom, zostaną wylogowani, uwierzytelnianie dwuetapowe nie będzie dostępne i subskrypcje Web Push API przestaną działać.

Jeżeli utracisz pliki wysłane przez użytkowników, znikną awatary, zdjęcia nagłówka i załączniki multimedialne, ale Mastodon wciąż *będzie* działać.

Utrata bazy danych Redis jest prawie bezbolesna: jedyne nieodwracalne dane to kolejki Sidekiq i zaplanowane ponowne próby nieudanych zadań. Strumienie list i osi czasu są przechowywane przez Redis, ale mogą zostać wygenerowane ponownie z użyciem tootctl.

Najlepsze kopie zapasowe to te na innym urządzeniu niż to, na którym uruchomiony jest Mastodon. Dla przykładu, jeżeli serwer spłonie, a dysk twardy wybuchnie, kopie zapasowe przechowywane na nim nie będą mogły zostać użyte…

### Kopia zapasowa tajnych kodów

Są one najprostsze do zabezpieczenia, ponieważ nigdy się nie zmieniają. Musisz tylko przechowywać `.env.production` w bezpiecznym miejscu.

### Kopia zapasowa PostgreSQL

PostgreSQL jest zagrożony utratą danych w wyniku utraty prądu, uszkodzeń dysku twardego i nieudanych migracji. Z tego powodu, zalecane jest tworzenie od czasu do czasu kopii zapasowej używając `pg_dump` lub `pg_dumpall`.

Gdy ważna jest dostępność w każdym momencie, możesz używać replikacji przez strumieniowanie, aby mieć drugi serwer PostgreSQL z zawsze aktualnymi danymi i móc przełączyć się na niego, jeżeli jeden serwer przestanie działać.

### Kopia zapasowa plików wysyłanych przez użytkowników

Jeżeli korzystasz z zewnętrznego dostawcy object storage takiego jak Amazon S3, Google Cloud lub Wasabi, nie musisz przejmować się tworzeniem kopii zapasowych. Te firmy są odpowiedzialne za radzenie sobie z awariami sprzętu.

Jeżeli przechowujesz pliki lokalnie, od Ciebie zależy, czy będziesz tworzyć kopie coraz większego katalogu `public/system`, gdzie domyślnie przechowywane są wysyłane pliki.

### Kopia zapasowa Redis

Tworzenie kopii zapasowej Redis jest proste. Redis regularnie zapisuje wszystko w `/var/lib/redis/dump.rdb`, jedynym pliku który powinieneś(-naś) gdzieś przechowywać.
