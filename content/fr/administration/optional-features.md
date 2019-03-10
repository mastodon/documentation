---
title: Fonctionnalités facultatives
description: Comment activer les fonctionnalités facultatives de Mastodon
menu:
  docs:
    parent: administration
    weight: 5
---

## Recherche plein-texte

Mastodon supporte la recherche plein-texte quand ElasticSearch est disponible. La recherche plein-texte permet aux utilisateur·ice·s connecté·e·s de chercher dans leurs propres pouets, favoris et mentions. Cependant, la recherche plein-texte empêche délibérément de chercher arbitrairement dans toute la base de données.

### Installer ElasticSearch

ElasticSearch requiert un environnement java. Si vous n'avez pas Java d'installé, faites-le maintenant. En supposant que vous êtes connecté en `root` :

    apt install openjdk-8-jre-headless

Ajoutez le dépôt logiciel officiel d'ElasticSearch :

    wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
    echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-6.x.list
    apt update

Vous pouvez désormais installer ElasticSearch:

    apt install elasticsearch

> **Avertissement de sécurité :** Par défaut, ElasticSearch est supposé se connecter à localhost uniquement, c-à-d être inaccessible depuis le réseau. Vous pouvez vérifier à quelle adresse ElasticSearch se connecte en regardant `network.host` dans le fichier `/etc/elasticsearch/elasticsearch.yml`. Considérez le fait que quiconque pouvant accéder à ElasticSearch sera en mesure de lire et de modifier n'importe quelle donnée à l'intérieur, puisqu'il n'y a pas de système d'authentification. C'est donc très important d'assurer la sécurité de la connexion. Avoir un pare-feu qui n'autorise que les ports 22, 80, et 443 est conseillé, comme expliqué dans [les instructions d'installation]({{< relref "installation.md" >}}). Si vous avez une instance répartie sur plusieurs serveurs, vous devez savoir comment sécuriser son trafic interne.

Pour démarrer ElasticSearch:

    systemctl enable elasticsearch
    systemctl start elasticsearch

### Configurer Mastodon

Modifiez `.env.production` pour ajouter les variables suivantes :

```bash
ES_ENABLED=true
ES_HOST=localhost
ES_PORT=9200
```

Si vous avez plusieurs instances Mastodon sur la même machine et que vous prévoyez d'utiliser la même installation d'ElasticSearch pour chacune d'entre elles, assurez-vous que chaque instance a un `REDIS_NAMESPACE` unique dans leur fichier de configuration, afin de différencier les index. Si vous avez besoin de passer outre le préfixe d'un index ElasticSearch, vous pouvez directement définir `ES_PREFIX`.

Après avoir sauvegardé le nouveau fichier de configuration, créez l'index dans ElasticSearch avec :

    RAILS_ENV=production bundle exec rake chewy:upgrade

Puis, redémarrez les processus Mastodon pour que la nouvelle configuration soit prise en compte :

    systemctl restart mastodon-sidekiq
    systemctl reload mastodon-web

Désormais, les nouveaux messages seront inscrits dans l'index ElasticSearch. La dernière étape est d'importer également toutes les anciennes données. Cela peut prendre du temps :

    RAILS_ENV=production bundle exec rake chewy:sync

## Services cachés (Tor)

Mastodon peut être accédé via Tor à l'aide d'un service caché. Cela vous donnera une addresse .onion qui ne peut être utilisée qu'en se connectant au réseau Tor.

### Installer Tor

Tout d'abord, le dépôt logiciel de Tor pour Debian doit être ajouté à apt.

```
deb https://deb.torproject.org/torproject.org stretch main
deb-src https://deb.torproject.org/torproject.org stretch main
```

Puis, ajoutez la clé GPG.

```bash
curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
```

Enfin, installez les paquets nécessaires.

```bash
apt install tor deb.torproject.org-keyring
```

### Configurer Tor

Modifiez le fichier `/etc/tor/torrc` et ajoutez la configuration suivante.

```bash
HiddenServiceDir /var/lib/tor/mastodon/
HiddenServiceVersion 3
HiddenServicePort 80 127.0.0.1:80
```

Redémarrez tor.

```bash
sudo service tor restart
```

Vous pouvez désormais récupérer votre adresse .onion dans le fichier `/var/lib/tor/mastodon/hostname`. Cela ne fonctionne _que_ si vous servez Mastodon à travers le port 80 et _que_ s'il s'agit du seul site que vous avez sur votre serveur.

### Configurer un serveur web multi-sites

Si vous avez plusieurs sites sur votre serveur web, vous devrez indiquer à votre serveur web comment servir l'adresse .onion. Dans le fichier de configuration du serveur web pour Mastodon, ajoutez une entrée additionnelle. Par exemple pour Nginx :

```bash
server {
  …
  server_name mastodon.myhosting.com qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion
  …
}
```

### Servir le service caché Tor via HTTP

Même s'il est tentant de servir votre Mastodon "caché" via HTTPS, ce n'est pas une bonne idée. Lisez [cet article de blog](https://blog.torproject.org/facebook-hidden-services-and-https-certs) du Tor Project pour savoir pourquoi les certificats SSL ne changent rien ici. Puisque vous ne pouvez pas obtenir de certificat SSL pour un .onion, vous seriez submergé d'erreurs de certificat quand vous utiliseriez votre instance Mastodon.

La solution est de servir votre instance Mastodon via HTTP, mais uniquement pour Tor.

Prenez pour exemple cette configuration Nginx.

```
server {
  listen 80;
  server_name mastodon.myhosting.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name mastodon.myhomsting.com;
  …
}
```

Ajoutez une nouvelle entrée `server` qui recopie celle ayant SSL (sans pour autant recopier les lignes concernant SSL), mais qui définit l'utilisation du port 80 avec votre adresse .onion.

```
server {
  listen 80;
  server_name mastodon.myhosting.com;
  return 301 https://$host$request_uri;
}

server {
  listen 80;
  server_name qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion;
  …
}

server {
  listen 443 ssl http2;
  server_name mastodon.myhosting.com;
  …
}
```

Redémarrez le serveur web.

```bash
service nginx restart
```

Vous pouvez également lire cette [réponse sur Server Fault](https://serverfault.com/a/373661) (en anglais) pour une solution plus [DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas).

## Connexion via LDAP/PAM/CAS/SAML

Bientôt.

