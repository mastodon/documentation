---
title: Installation
description: Comment installer Mastodon sur un serveur Ubuntu 18.04
menu:
  docs:
    parent: administration
    weight: 1
---

<img src="/setup.png" alt="" style="margin: 0; box-shadow: none">

## Configuration basique du serveur (facultatif)

Si vous configurez une nouvelle machine, il est recommandé de la sécuriser en premier lieu. En supposant que vous utilisez **Ubuntu 18.04** :

### Refuser les connections SSH par mot de passe (clés uniquement)

Assurez-vous tout d'abord que vous actuellement connecté à votre serveur en utilisant une clé SSH et non avec un mot de passe, sinon vous serez bloqué. La plupart des hébergeurs supportent l'envoi d'une clé SSH publique et configurent automatiquement la connexion à l'utilisateur root sur votre nouveau serveur via votre clé.

Ouvrez `/etc/ssh/sshd_config` et cherchez `PasswordAuthentication`. Assurez-vous que la ligne n'est pas commentée et qu'elle est réglée sur `no`. Si vous avez apporté des modifications au fichier, redémarrez sshd :

```sh
systemctl restart ssh
```

### Mettre à jour le système

```sh
apt update && apt upgrade -y
```

### Installer fail2ban pour bloquer les tentatives de connexion répétées

```sh
apt install fail2ban
```

Ouvrez `/etc/fail2ban/jail.local` et copiez-collez ceci à l'intérieur :

```ini
[DEFAULT]
destemail = votre@adresse_mail.ici
sendername = Fail2Ban

[sshd]
enabled = true
port = 22

[sshd-ddos]
enabled = true
port = 22
```

Enfin, redémarrez fail2ban :

```sh
systemctl restart fail2ban
```

### Installer un pare-feu et mettre uniquement sur liste blanche les ports SSH, HTTP et HTTPS

D'abord, installez iptables-persistent. Durant l'installation, il vous sera demandé si vous voulez conserver les directives actuelles--refusez.

```sh
apt install -y iptables-persistent
```

Ouvrez `/etc/iptables/rules.v4` et copiez-collez ceci à l'intérieur :

```
*filter

#  Autoriser tout trafic sur la boucle locale (lo0) et refuser tout trafic vers 127/8 qui n'utilise pas lo0
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT

#  Autoriser toutes les connexions entrantes établies
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  Autoriser tout le trafic sortan - vous pouvez modifier cette ligne pour n'autoriser qu'un certain type de trafic
-A OUTPUT -j ACCEPT

#  Autoriser les connexions HTTP et HTTPS de n'importe où (via les ports habituels pour les sites web et SSL)
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

#  Autoriser les connexions SSH
#  Le nombre juste après -dport doit être le même que celui défini dans sshd_config
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Autoriser le ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

#  Enregistrer les accès refusés par iptables
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  Rejeter toutes les autres connexions entrantes - par défaut, refuser tout ce qui n'est pas défini explicitement par la directive ALLOW
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

Avec iptables-persistent, cette configuration sera chargée à chaque redémarrage. Mais puisque nous n'allons pas redémarrer tout de suite, nous devons la charger manuellement pour cette fois :

```sh
iptables-restore < /etc/iptables/rules.v4
```

## Pré-requis

- Une machine exécutant **Ubuntu 18.04** sur laquelle vous avez un accès root
- Un **nom de domaine** (ou un sous-domaine) pour l'instance Mastodon, ex. `exemple.com`
- Un service d'envoi de courriel ou autre **serveur SMTP**

Vous exécuterez les commandes suivantes en tant qu'utilisateur root sur le serveur. Si vous n'êtes pas encore root, identifiez-vous :

```sh
sudo -i
```

### Dépôts de paquets système

Assurez-vous que curl est installé :

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

### Paquets système

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

### Installation de Ruby

Nous utiliserons rbenv pour gérer les différentes versions de Ruby, car c'est plus facile pour récupérer les bonnes versions et se mettre à jour quand une nouvelle version est publiée. rbenv doit être installé pour qu'un seul utilisateur, nous devons donc créer le compte utilisateur que Mastodon utilisera par la suite :

```sh
adduser --disabled-login mastodon
```

Nous pouvons ensuite nous identifier :

```sh
su - mastodon
```

Et procéder à l'installation de rbenv et rbenv-build:

```sh
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

Une fois ceci fait, nous pouvons installer la bonne version de Ruby :

```sh
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 2.6.1
rbenv global 2.6.1
```

La version de gem fournie par défaut avec ruby_2.6.1 est incompatible avec la dernière version de bundler, nous devons donc mettre à jour gem :

```
gem update --system
```

Nous aurons aussi besoin d'installer bundler :

```sh
gem install bundler --no-document
```

Retournez sur root :

```sh
exit
```

## Configuration
### Mettre en place PostgreSQL
#### Configurer pour des performances optimales (facultatif)

Pour obtenir des performances optimales, vous pourriez utiliser [pgTune](https://pgtune.leopard.in.ua/#/) afin de générer une configuration adéquate et modifier les valeurs si nécessaire dans `/etc/postgresql/9.6/main/postgresql.conf` avant de redémarrer PostgreSQL avec `systemctl restart postgresql`

#### Créer un utilisateur

Vous devez créer un utilisateur PostgreSQL que Mastodon pourra utiliser. Il est plus facile de partir sur une authentification "ident" dans une configuration basique, c-à-d que l'utilisateur PostgreSQL n'a pas un mot de passe différent et peut être utilisé par l'utilisateur Linux portant le même nom.

Accédez à l'interface PostgreSQL :

```sh
sudo -u postgres psql
```

Là, exécutez ceci :

```
CREATE USER mastodon CREATEDB;
\q
```

C'est fait !

### Mettre en place Mastodon

C'est le moment de télécharger le code source de Mastodon. Connectez-vous à l'utilisateur mastodon :

```sh
su - mastodon
```

#### Récupérer le code

Utilisez git pour télécharger la dernière version stable de Mastodon :

```sh
git clone https://github.com/tootsuite/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

#### Installer les dernières dépendances

Maintenant, installez les dépendances Ruby et JavaScript :

```sh
bundle install \
  -j$(getconf _NPROCESSORS_ONLN) \
  --deployment --without development test
yarn install --pure-lockfile
```

#### Générer un fichier de configuration

Lancez l'assistant de configuration interactif :

```sh
RAILS_ENV=production bundle exec rake mastodon:setup
```

L'assistant va :

- Créer un fichier de configuration
- Compiler les ressources web
- Créer la base de données

Le fichier de configuration est enregistré sous le nom de `.env.production`. Vous pouvez le relire et le modifier à votre guise. Référez-vous à la [page de documentation]({{< relref "configuration.md" >}}) à ce sujet.

Nous en avons fini avec l'utilisateur mastodon, pour l'heure, passez à nouveau sur root :

```sh
exit
```

### Mettre en place nginx

Copiez le modèle de configuration pour nginx depuis le dossier contenant Mastodon :

```sh
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

Modifiez `/etc/nginx/sites-available/mastodon` pour remplacer `example.com` par votre propre nom de domaine, et apportez les autres modifications que vous auriez à faire.

Rechargez nginx pour que les modifications soient prises en compte :

```sh
systemctl reload nginx
```

### Obtenir un certificat SSL

Nous utiliserons Let's Encrypt pour obtenir un certificat SSL gratuitement :

```sh
certbot certonly --webroot -d example.com -w /home/mastodon/live/public/
```

Modifiez `/etc/nginx/sites-available/mastodon` pour dé-commenter et adapter à votre cas les lignes `ssl_certificate` et `ssl_certificate_key`.

Enfin, rechargez nginx pour que les modifications soient prises en compte :

```sh
systemctl reload nginx
```

Vous devriez pouvoir désormais visiter votre domaine dans un navigateur web et voir l'éléphant frappant l'ordinateur avec un message d'erreur. C'est parce que nous n'avons pas encore démarré le processus Mastodon.

### Mettre en place les services systemd

Copiez les modèles de fichiers service systemd depuis le dossier contenant Mastodon :

```sh
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

Ouvrez les fichiers et assurez-vous que le nom d'utilisateur et les chemins d'accès sont corrects :

- `/etc/systemd/system/mastodon-web.service`
- `/etc/systemd/system/mastodon-sidekiq.service`
- `/etc/systemd/system/mastodon-streaming.service`

Enfin, démarrez et activez les nouveaux services systemd :

```sh
systemctl start mastodon-web mastodon-sidekiq mastodon-streaming
systemctl enable mastodon-*
```

Ils démarreront automatiquement à chaque redémarrage de la machine.

**Hourra ! C'est enfin fini. Vous pouvez accéder à votre instance depuis votre navigateur !**
