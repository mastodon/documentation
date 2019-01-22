---
title: Migracja serwerów
description: Jak przenieść instancję Mastodona na inny serwer
menu:
  docs:
    parent: administration
    weight: 6
---

Czasami, z różnych powodów, możesz potrzebować przenieść swoją instancję Mastodona z jednego serwera na drugi. Na szczęście, nie jest to trudny proces, choć może spowodować niedostępność serwera przez trochę czasu.

**Uwaga:** ten przewodnik został napisany z myślą o Ubuntu Server, proces ten może przebiegać inaczej na innych konfiguracjach.

Podstawowe kroki
----

1. Skonfiguruj nowy serwer Mastodona w oparciu o [przewodnika instalacji](/administration/installation/) (nie uruchamiaj jednak `mastodon:setup`).
2. Zatrzymaj Mastodona na starym serwerze (np. `systemctl stop 'mastodon-*.service'`).
3. Wykonaj zrzut bazy danych Postgres i załaduj ją korzystając z poniższych instrukcji.
4. Wykonaj kopię plików `system/` korzystając z poniższych instrukcji. (jeżeli korzystasz z S3, możesz pominąć ten krok.)
5. Skopiuj plik `.env.production`.
6. Uruchom `RAILS_ENV=production ./bin/tootctl feeds build`, aby wygenerować oś czasu dla każdego użytkownika.
7. Uruchom Mastodona na nowym serwerze.
8. Zaktualizuj ustawienia DNS, aby kierowały na nowy serwer.
9. Zaktualizuj lub przenieś kopię konfiguracji Nginx, uruchom ponownie LetsEncrypt jeżeli to potrzebne.
10. Ciesz się nowym serwerem!

Szczegółowe omówienie
----

### Jakie dane muszą zostać przeniesione

Przede wszystkim, musisz przenieść następujące:

- Katalog `~/live/public/system`, który zawiera zdjęcia i filmy wysłane przez użytkowników (jeżeli korzystasz z S3, nie potrzebujesz tego)
- Bazę danych Postgres (korzystając z [pg\_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html))
- Plik `~/live/.env.production`, zawierający ustawienia serwera i tajne kody

Oprócz tego, możesz też dla ułatwienia skopiować następujące:
Less crucially, you'll probably also want to copy the following for convenience:

- Konfiguracja nginx (`/etc/nginx/sites-available/default`)
- Pliki konfiguracji systemd (`/etc/systemd/system/mastodon-*.service`), mogące zawierać poprawki serwera
- Konfigurację pgbouncer w `/etc/pgbouncer` (jeżeli go używasz)

### Wykonaj i załaduj zrzut Postgres

Zamiast uruchamiania `mastodon:setup`, utworzymy pustą bazę danych Postgres korzystając z bazy danych `template0` (przydatne przy przywracaniu zrzutów Postgres 
[jak to opisano w dokumentacji pg\_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html#BACKUP-DUMP-RESTORE)).

Uruchom następujące polecenie jako użytkownik `mastodon` na starym systemie:

```bash
pg_dump -Fc mastodon_production -f backup.dump
```

Przenieś plik `backup.dump` korzystając z `rsync` lub `scp`. Na nowym systemie utwórz nową bazę danych jako użytkownik `mastodon`:

```bash
createdb -T template0 mastodon_production
```

Później zaimportuj ją:

```bash
pg_restore -U mastodon -n public --no-owner --role=mastodon \
  -d mastodon_production backup.dump
```

(jeżeli nazwą użytkownika na nowym serwerze nie jest `mastodon`, powinieneś(-naś) zmienić wartości `-U` i `--role` powyżej. Nazwa użytkownika może się różnić pomiędzy dwoma serwerami.)
(Note that if the username is not `mastodon` on the new server, you should change the 
`-U` AND `--role` values above. It's okay if the username is different between the two servers.)

### Kopiowanie plików

Może to zająć trochę czasu, więc aby uniknąć niepotrzebnego kopiowania tego samego, zalecane jest użycie `rsync`.
Na poprzednim urządzeniu, jako użytkownik `mastodon`, wykonaj:

```bash
rsync -avz ~/live/public/system/ mastodon@example.com:~/live/public/system/
```

Musisz uruchomić to ponownie, jeżeli zmieni się jakiś z tych plików na poprzednim serwerze.

Powinieneś(-naś) też skopiować plik `.env.production` zawierający konfigurację i tajne kody.

Możesz skopiować pliki konfiguracyjne nginx, systemd i pgbouncer lub utworzyć je od nowa.

### Podczas migracji

Możesz zedytować stronę `~/live/public/500.html` na poprzednim serwerze, jeżeli chcesz wyświetlić informację powiadamiającą użytkowników o trwającej migracji.

Możesz też zmienić DNS TTL na małą wartość (30-60 minut) dzień wcześniej, aby serwery DNS szybko poznały nowy adres IP.

### Po migracji

Możesz użyć [whatsmydns.net](http://whatsmydns.net/), aby sprawdzić, jak przepiega proces propagacji DNS.
Aby przyspieszyć ten proces, możesz zedytować plik `/etc/hosts`, aby kierował na nowy serwer, dzięki czemu możesz zacząć korzystać z niego wcześniej.
