---
title: Aktualizacja do nowego wydania
description: Jak zaktualizować Mastodona do nowszej wersji
menu:
  docs:
    parent: administration
    weight: 5
---

Kiedy pojawia się nowa wersja Mastodona, możesz znaleźć ją na [stronie wydań na GitHubie](https://github.com/tootsuite/mastodon/releases). Pamiętaj, że korzystanie z niewydanego kodu z gałęzi `master` jest możliwe, choć nie jest zalecane.

Wydania Mastodona są przyporządkowanem tagom gita. Na początek, zaloguj się na użytkownika `mastodon`:

```sh
su - mastodon
```

Przejdź do głównego katalogu Mastodona:

```sh
cd /home/mastodon/live
```

Pobierz kod wydania, zakładając że nowa wersja nazywa się `v2.5.0`:

```sh
git fetch --tags
git checkout v2.5.0
```

Strona wydania zawiera listę zmian, a pod nią instrukcje aktualizacji. Dowiesz się, jak wykonać ją. Na przykład, jeżeli jest wspomniane, że musisz skompilować ponownie zasoby, powinieneś(-naś) wykonać:

```sh
RAILS_ENV=production bundle exec rails assets:precompile
```

Po wykonaniu instrukcji dotyczących wydania, pozostaje uruchomić ponownie Mastodona. *Zwykle* API strumieniowania nie jest aktualizowane, więc nie wymaga ono ponownego uruchomienia. Ponowne uruchomienie API strumieniowania może wywołać niezwykle wysokie obciążenie serwera, więc zalecane jest unikanie go.

Wróć na konto root:

```sh
exit
```

Uruchom ponownie Sidekiq:

```sh
systemctl restart mastodon-sidekiq
```

Załaduj ponownie proces sieciowy, aby uniknąć niedostępności serwera:

```sh
systemctl reload mastodon-web
```

**To wszystko!** Twój serwer używa teraz nowej wersji Mastodona!
