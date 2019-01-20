---
title: Instalacja
description: Jak zainstalować Mastodona na serwerze z Ubuntu 18.04
menu:
  docs:
    parent: administration
    weight: 1
---

<img src="/setup.png" alt="" style="margin: 0; box-shadow: none">

## Podstawowa konfiguracja serwera (nieobowiązkowa)

Jeżeli konfigurujesz nowe urządzenie, zalecane jest zabezpieczenie go. Załóżmy, że korzystasz z **Ubuntu 18.04**:

### Nie pozwól na logowanie przez SSH z użyciem hasła (tylko kluczem)

Na początek upewnij się, że jesteś zalogowany(-a) z użyciem klucza, nie hasła – w przeciwnym razie zostaniesz zablokowany(-a). Wielu dostawców hostingu daje możliwość wysłania klucza publicznego i automatycznie konfiguruje logowanie użytkownika root z użyciem klucza.

Edytuj `/etc/ssh/sshd_config` i znajdź `PasswordAuthentication`. Upewnij się, że nie jest ono skomentowane i jest ustawione na `no`. Po dokonaniu zmian uruchom ponownie sshd:

```sh
systemctl restart ssh
```

### Aktualizacja pakietów systemowych

```sh
apt update && apt upgrade -y
```

### Instalacja fail2ban, aby blokował po wielu nieudanych próbach logowania

```sh
apt install fail2ban
```

Edytuj `/etc/fail2ban/jail.local` i dodaj:

```ini
[DEFAULT]
destemail = twój@email.tutaj
sendername = Fail2Ban

[sshd]
enabled = true
port = 22

[sshd-ddos]
enabled = true
port = 22
```

Na koniec, uruchom ponownie fail2ban:

```sh
systemctl restart fail2ban
```

### Zainstaluj firewall i odblokuj tylko porty SSH, HTTP i HTTPS

Na początek, zainstaluj iptables-persistent. Podczas instalacji zostaniesz zapytany(-a), czy chcesz pozostawić obecne zasady – odmów.

```sh
apt install -y iptables-persistent
```

Edytuj `/etc/iptables/rules.v4` i dodaj:z

```
*filter

#  Allow all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT

#  Accept all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  Allow all outbound traffic - you can modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

#  Allow HTTP and HTTPS connections from anywhere (the normal ports for websites and SSL).
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

#  Allow SSH connections
#  The -dport number should be the same port number you set in sshd_config
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

#  Log iptables denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  Reject all other inbound - default deny unless explicitly allowed policy
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

Dzięki iptables-persistent, ta konfiguracja będzie ładowana w trakcie uruchomienia systemu. Ponieważ nie zamierzamy go teraz uruchomić ponownie, załadujmy ją ręcznie:

```sh
iptables-restore < /etc/iptables/rules.v4
```

## Wymagania wstępne

- Urządzenie z systemem **Ubuntu 18.04** wraz z dostępem do roota
- **Domena** (lub subdomena) dla serwera Mastodona, np. `example.com`
- Usługa doręczania e-maili lub inny **serwer SMTP**

Wykonaj te polecenia jako root. Jeżeli nie jesteś obecnie na koncie roota, przełącz się na nie:

```sh
sudo -i
```

### Repozytoria systemu

Upewnij się, że curl jest zainstalowany:

```sh
apt install -y curl
```

#### Node.js

```sh
curl -sL https://deb.nodesource.com/setup_8.x | bash -
```

#### Yarn

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
```

### Pakiety systemowe

```sh
apt update
apt install -y \
  imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config nodejs gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm5 libgdbm-dev \
  nginx redis-server redis-tools postgresql postgresql-contrib \
  certbot yarn libidn11-dev libicu-dev libjemalloc-dev
```

### Instalacja Ruby

Będziemy korzystać z rbenv, aby zarządzać wersjami Ruby, ponieważ ułatwia to przejście na prawidłową wersję po pojawieniu się nowego wydania. rbenv musi zostać zainstalowany dla każdego użytkownika który będzie go używał osobno, więc zacznijmy od utworzenia użytkownika, na którym uruchomimy Mastodona:

```sh
adduser --disabled-login mastodon
```

Możemy teraz zalogować się na to konto:

```sh
su - mastodon
```

I przejść do instalacji rbenv i rbenv-build:

```sh
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

Po zakończeniu, możemy zainstalować prawidłową wersję Ruby:

```sh
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 2.5.3
rbenv global 2.5.3
```

Domyślna wersja gem dołączona do ruby_2.5.3 nie jest kompatybilna z najnowszym bundlerem, więc musimy zaktualizować gem:

```
gem update --system
```

Musimy też zainstalować bundler:

```sh
gem install bundler --no-document
```

Wróćmy na konto root:

```sh
exit
```

## Konfiguracja
### Konfiguracja PostgreSQL
#### Ustawienia wydajności (nieobowiązkowe)

Aby zwiększyć wydajność, możesz skorzystać z [pgTune](https://pgtune.leopard.in.ua/#/), aby wygenerować odpowiednie ustawienia i zmienić odpowiednie wartości w `/etc/postgresql/9.6/main/postgresql.conf` przed ponownym uruchomieniem PostgreSQL poleceniem `systemctl restart postgresql`

#### Tworzenie użytkownika

Musisz utowrzyć użytkownika PostgreSQL, z którego będzie mógł korzystać Mastodon. Najprościej użyć uwierzytelniania „ident” w prostym ustawieniu, tzn. użytkownik PostgreSQL nie będzie miał oddzielnego hasła i będzie mógł z niego korzystać linuksowy użytkownik o tej samej nazwie.

Przejdź do powłoki:

```sh
sudo -u postgres psql
```

Wykonaj:

```
CREATE USER mastodon CREATEDB;
\q
```

Gotowe!

### Konfiguracja Mastodona

Pora pobrać kod Mastodona. Przełącz się na użytkownika mastodon:

```sh
su - mastodon
```

#### Pobieranie kodu

Użyj narzędzia git, aby pobrać najnowsze stabilne wydanie Mastodona:

```sh
git clone https://github.com/tootsuite/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

#### Instalacja ostatnich zależności

Pora na instalację zależności używających Ruby i JavaScript:

```sh
bundle install \
  -j$(getconf _NPROCESSORS_ONLN) \
  --deployment --without development test
yarn install --pure-lockfile
```

#### Generowanie konfiguracji

Uruchom interaktywny konfigurator:

```sh
RAILS_ENV=production bundle exec rake mastodon:setup
```

W ten sposób:

- utworzysz plik konfiguracyjny
- wykonasz prekompilację zasobów
- utworzysz schemat bazy danych

Plik konfiguracyjny zostanie zapisany jako `.env.production`. Możesz przejrzeć i edytować go według swoich potrzeb. Możesz odwołać się do [documentacji konfiguracji]({{< relref "configuration.md" >}}).

Możesz wrócić na użytkownika root:

```sh
exit
```

### Konfiguracja nginx

Skopiuj przykładową konfigurację nginx z katalogu Mastodona:

```sh
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

Zedytuj `/etc/nginx/sites-available/mastodon` u zamień `example.com` na swoją domenę i dokonaj niezbędnych zmian.

Załaduj ponownie nginx, aby wprowadzić zmiany:

```sh
systemctl reload nginx
```

### Uzyskanie certyfikatu SSL

Skorzystamy z Let's Encrypt, aby uzyskać bezpłatny certyfikat SSL:

```sh
certbot certonly --webroot -d example.com -w /home/mastodon/live/public/
```

Możesz teraz zedytować `/etc/nginx/sites-available/mastodon`, aby zmodyfikowac wiersze `ssl_certificate` i `ssl_certificate_key`.

Załaduj ponownie nginx, aby wprowadzić zmiany:

```sh
systemctl reload nginx
```

W tym momencie, po odwiedzeniu domeny w przeglądarce powinieneś(-aś) zobaczyć stronę z błędem przedstawiającą słonia uderzającego w ekran komputera. To dlatego, że nie uruchomiliśmy jeszcze Mastodona.

### Konfiguracja usług systemd

Skopiuj szablony usług systemd z katalogu Mastodona:

```sh
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

Zedytuj następujące pliki, aby upewnić się czy nazwa użytkownika i ścieżki są prawidłowe:

- `/etc/systemd/system/mastodon-web.service`
- `/etc/systemd/system/mastodon-sidekiq.service`
- `/etc/systemd/system/mastodon-streaming.service`

Na koniec, uruchom i aktywuj nowe usługi systemd:

```sh
systemctl start mastodon-web mastodon-sidekiq mastodon-streaming
systemctl enable mastodon-*
```

Będą one automatycznie uruchamiane wraz z systemem.

**Hurra! To wszystko. Możesz teraz odwiedzić swoją domenę w przeglądarce!**
