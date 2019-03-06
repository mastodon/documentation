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

Bientôt.

## Connexion via LDAP/PAM/CAS/SAML

Bientôt.

