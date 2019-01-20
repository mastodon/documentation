---
title: Rozwiązywanie problemów
description: Jak określić, co złego stało się z instalacją Mastodona
menu:
  docs:
    parent: administration
    weight: 99
---

**Widzę stronę informującą, że coś poszło nie tak. Jak mogę dowiedzieć się, co jest nie tak?**

Wszystkie informacje o błędach wraz ze „śladem stosu” zapisywane są w systemowym dzienniku. Jeżeli korzystasz z systemd, możesz uzyskać dziennik każdej usługi systemd używając `journalctl -u mastodon-web` (zamień na prawidłową nazwę usługi). Jeżeli korzystasz z Dockera, jest wygląda to podobnie: `docker logs mastodon_web_1` (zamień na prawidłową nazwę kontenera).

Szczegóły dotyczące błędów serwera *nigdy* nie są wyświetlane publicznie, ponieważ mogą one ujawnić jak wygląda konfiguracja od wewnątrz, mogące pomóc atakującym w dostaniu się do serwera lub bardziej skutecznym nadużywaniu systemu.

Każda odpowiedź z serwera Mastodona zawiera nagłówek z niepowtarzalnym identyfikatorem żądania, widocznym w logach. Sprawdzając nagłówek na stronie błędu, możesz łatwo odnaleźć odpowiedni ślad stosu w dzienniku.

**Po aktualizacji do nowej wersji, niektóre strony wyglądają dziwnie, jakby nie miały prawidłowego stylu. Dlaczego?**

Upewnij się, czy uruchomiłeś(-aś) `RAILS_ENV=production bin/rails assets:precompile` po aktualizacji i uruchomiłeś(-aś) ponownie proces sieciowy Mastodona, ponieważ prawdopodobnie serwer korzysta z nieaktualnych arkuszy stylów i skryptów. Możliwe też, że kompliacja nie powiodła się z powodu braku RAM-u, ponieważ webpack zużywa niestety ogromną ilość pamięci. Jeżeli jest to powodem, upewnij się, że serwer ma przydzielone trochę pamięci swap.
Możesz też skompilować te zasoby na innym urządzeniu i przenieść katalog `public/packs`.

**Po aktualizacji do nowej wersji, niektóre żądania kończą się niepowodzeniem lub zwracają informacje o brakujących kolumnach lub tablicach. Dlaczego?**

Upewnij się, że uruchomiłeś(-aś) `RAILS_ENV=production bin/rails db:migrate` po aktualizacji, ponieważ wygląda na to że kod Mastodona próbuje uzyskać dostęp do nowszego lub starszego schematu bazy danych. Jeżeli korzystasz z PgBouncera, upewnij się że to polecenie łączy się on bezpośrednio z PostgreSQL, ponieważ PgBouncer nie obsługuje rodzaju blokad tabeli używanych w trakcie migracji.

**Próbuję wykonać polecenie `tootctl` lub `rake`/`rails`, ale otrzymuję jedynie błąd dotyczący niezainicjalizowanych stałych. Co jest nie tak?**

Upewnij się, że określiłeś(-aś) prawidłowe środowisko używając `RAILS_ENV=production` przed poleceniem. Zwykle, polecenia te zakładają, że są uruchamiane w środowisku nieprodukcyjnym, więc kod próbuje załadować gemy przeznaczone dla programistów. W śtodowiskach produkcyjnych, unika się instalacji tych gemów, dlatego pojawiają się te błędy.