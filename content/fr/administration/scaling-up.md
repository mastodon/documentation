---
title: Amélioration des performances
description: Comment améliorer Mastodon de manière horizontale pour gérer plus de requêtes
menu:
  docs:
    parent: administration
    weight: 4
---

## Gérer la simultanéité des processus

Mastodon possède trois types de processus :

- Web (Puma)
- API de streaming
- Tâches de fond (Sidekiq)

### Web (Puma)

Le processus web sert les requêtes HTTP à durée de vie courte sur la majorité de l'application. Les variables d'environnement suivantes contrôlent ce processus :

- `WEB_CONCURRENCY` définit le nombre de processus créés
- `MAX_THREADS` définit le nombre de threads par processus

Les threads se partagent la mémoire RAM du processus parent. Les processus se réservent de la mémoire RAM, même s'ils peuvent en partager entre eux via le copy-on-write. Un plus grand nombre de threads va faire monter votre processeur à 100% d'utilisation plus rapidement, un plus grand nombre de processus va remplir votre RAM plus rapidement.

Ces valeurs agissent sur le nombre de requêtes HTTP qui pourront être traitées simultanément.

En termes de rendement, avoir plus de processus est mieux qu'avoir plus de threads.

### API de streaming

L'API de streaming gère les connexions HTTP et WebSocket à durée de vie longue, à travers lesquelles les clients reçoivent en temps réel les mises à jour de statuts. Les variables d'environnement suivantes contrôlent ce processus :

- `STREAMING_CLUSTER_NUM` définit le nombre de processus créés
- `STREAMING_API_BASE_URL` définit l'URL de l'API de streaming

Un seul processus peut gérer un nombre considérable de connexions. L'API de streaming peut être hébergée sur un sous-domaine différent si vous le voulez, par exemple pour gagner du temps lorsque nginx relaie les connexions.

### Tâches de fond (Sidekiq)

Beaucoup de tâches dans Mastodon sont reléguées à l'arrière-plan afin de s'assurer que les requêtes HTTP soient rapidement traitées, et pour empêcher que des requêtes HTTP abandonnées n'affectent l'exécution de ces tâches. Sidekiq est un processus unique, avec un nombre définissable de threads.

#### Nombre de threads

Tandis que le nombre de threads dans le processus Web a un impact sur la réactivité de l'instance Mastodon pour l'utilisateur·ice final·e, le nombre de threads alloués aux tâches de fond a un impact sur la rapidité à laquelle les posts seront envoyés de l'instance aux autres, sur le temps qu'il faudra pour qu'un courriel soit expédié, etc.

Le nombre de threads n'est pas défini par une variable d'environnement ici, mais par un argument lors de l'invocation de Sidekiq, par exemple :

```sh
bundle exec sidekiq -c 15
```

ferait démarrer le processus sidekiq avec 15 threads. Gardez à l'esprit que chaque thread doit être en mesure de se connecter à la base de données PostgreSQL, ce qui signifie que le pool de connexions à la base de données doit être suffisamment large pour supporter tous les threads. La taille de ce pool est définie avec l'environnement de variable `DB_POOL` et doit être au moins égale au nombre de threads.

#### Queues

Sidekiq utilise différentes queues pour les tâches d'importance variable, où l'importance est définie par l'impact sur l'expérience utilisateur qu’aurait une queue dysfonctionnelle, par ordre décroissant.

|Queue|Importance|
|:---:|------------|
|`default`|Toutes les tâches qui affectent les utilisateur·ice·s de l'instance|
|`push`|La délivrance de contenus aux autres instances|
|`mailers`|L'envoi des courriels|
|`pull`|La récupération de contenus depuis d'autres instances|

Les queues par défaut et leurs priorités sont stockées dans `config/sidekiq.yml`, mais elles peuvent être outrepassées lors de l'invocation de Sidekiq via la ligne de commandes, par exemple :

```sh
bundle exec sidekiq -q default
```

n'exécutera que la queue `default`.

Sidekiq travaille d'une certaine façon avec les queues, il vérifie d'abord s'il y a des tâches à effectuer dans la première queue, et s'il n'y en a pas, il vérifie dans la queue suivante. Cela signifie que, si la première queue est pleine à craquer, les autres queues devront patienter.

En guise de solution, il est possible de démarrer plusieurs processus Sidekiq pour assurer une vraie exécution parallèle des queues, par exemple en créant plusieurs services systemd pour Sidekiq avec différents arguments.

## Mise en commun des transactions avec PgBouncer
### Pourquoi vous avez potentiellement besoin de PgBouncer

Si vous commencez à manquer de connexions vers PostgreSQL (la valeur par défaut étant de 100 connexions), alors vous pourriez trouver en PgBouncer une bonne solution. Cette section détaille des pièges récurrents ainsi que des exemples de configurations optimales pour Mastodon.

Notez que vous pouvez aller voir "PgHero" dans la partie administration de votre instance pour savoir combien de connexions à PostgreSQL sont actuellement utilisées. Habituellement, Mastodon utilise autant de connexions qu'il y a de threads dans Puma, Sidekiq et l'API de streaming réunis.

### Installer PgBouncer

Sur Debian et Ubuntu:

    sudo apt install pgbouncer

### Configurer PgBouncer
#### Définir un mot de passe

Tout d'abord, si l'utilisateur `mastodon` dans PostgreSQL n'a pas de mot de passe, vous devrez en définir un.

Voilà comment vous pourriez redéfinir le mot de passe :

    psql -p 5432 -U mastodon mastodon_production -w

Puis (évidemment, utilisez un autre mot de passe que le mot "password") :

    ALTER USER mastodon WITH PASSWORD 'password';

Puis faites `\q` pour quitter.

#### Configurer userlist.txt

Modifiez `/etc/pgbouncer/userlist.txt`

Du moment que vous spécifiez un utilisateur et un mot de passe dans pgbouncer.ini plus tard, les valeurs dans userlist.txt n'ont *pas* besoin de correspondre à de vrais utilisateurs dans PostgreSQL. Vous pouvez définir arbitrairement des utilisateurs et leurs mots de passe, mais vous pouvez aussi réutiliser les "vrais" identifiants pour plus de simplicité. Ajoutez l'utilisateur `mastodon` dans le fichier `userlist.txt` :

    "mastodon" "md5d75bb2be2d7086c6148944261a00f605"

On utilise ici le schéma MD5, où le mot de passe est juste la somme MD5 de `mot de passe + utilisateur` avec le préfixe `md5`. Par exemple, pour générer le hash avec l'utilisateur `mastodon` et le mot de passe `password`, vous pouvez faire :

```bash
# Ubuntu, Debian, etc.
echo -n "passwordmastodon" | md5sum
# macOS, OpenBSD, etc.
md5 -s "passwordmastodon"
```

Et vous n'avez plus qu'à ajouter `md5` au début de la ligne.

Vous voudrez aussi créer un administrateur `pgbouncer` afin de vous connecter à la base de données administrateur PgBouncer. Voici un exemple de fichier `userlist.txt` :

```
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
"pgbouncer" "md5a45753afaca0db833a6f7c7b2864b9d9"
```

Dans les deux cas le mot de passe est `password`.

#### Configurer pgbouncer.ini

Modifiez `/etc/pgbouncer/pgbouncer.ini`

Ajoutez une ligne en dessous de `[databases]` qui liste les bases de données PostgreSQL auxquelles vous voulez vous connecter. PgBouncer utilisera ici le même utilisateur/mot de passe et le même nom de base de données pour se connecter à PostgreSQL :

```ini
[databases]
mastodon_production = host=127.0.0.1 port=5432 dbname=mastodon_production user=mastodon password=password
```

Les variables `listen_addr` et `listen_port` indiquent à PgBouncer sur quelle adresse/port accepter les connexions. Ces valeurs par défaut sont convenables.

```ini
listen_addr = 127.0.0.1
listen_port = 6432
```

Mettez `md5` comme valeur pour `auth_type` (en supposant que vous utilisez le format MD5 dans `userlist.txt`) :

```ini
auth_type = md5
```

Assurez-vous que l'utilisateur `pgbouncer` est un administrateur :

```ini
admin_users = pgbouncer
```

**Ce qui suit est très important !** Le mode par défaut du pool de connexions est "par session", tandis que Mastodon utilise le mode "par transaction". Autrement dit, une connexion PostgreSQL est initiée quand une transaction est créée, et se ferme quand la transaction est terminée. Vous voudrez donc changez la valeur de la variable `pool_mode` de `session` à `transaction` :

```ini
pool_mode = transaction
```

Ensuite, `max_client_conn` définit combien de connexions PgBouncer lui-même va accepter, et `default_pool_size` pose une limite sur le nombre de connexions à PostgreSQL qui pourront être initiées. (Dans PgHero, le nombre de connexions affichées correspondra à `default_pool_size` parce qu'il ignore la présence de PgBouncer.)

Les valeurs par défaut sont bonnes pour débuter, vous pourrez toujours les augmenter plus tard :

```ini
max_client_conn = 100
default_pool_size = 20
```

N'oubliez pas de recharger ou redémarrer PgBouncer après avoir sauvegardé vos modifications :

    sudo systemctl reload pgbouncer

#### Vérifier que tout fonctionne

Vous devriez être en mesure de vous connecter à PgBouncer de la même manière qu'avec PostgreSQL :

    psql -p 6432 -U mastodon mastodon_production

Et utiliser votre mot de passe pour vous connecter.

Vous pouvez aussi regarder les logs de PgBouncer ainsi :

    tail -f /var/log/postgresql/pgbouncer.log

#### Configurer Mastodon afin qu'il puisse communiquer avec PgBouncer

Dans le fichier `.env.production`, assurez-vous que la variable suivante est définie ainsi :

```bash
PREPARED_STATEMENTS=false
```

Vu qu'on fait une mise en commun des transactions, on ne peut pas utiliser des déclarations prédéfinies.

Ensuite, configurez Mastodon pour qu'il utilise le port 6432 (PgBouncer) au lieu du port 5432 (PostgreSQL) et vous devriez pouvoir utiliser votre instance par la suite :

```bash
DB_HOST=localhost
DB_USER=mastodon
DB_NAME=mastodon_production
DB_PASS=password
DB_PORT=6432
```

> **Hop hop hop !** Vous ne pouvez pas utiliser PgBouncer pour effectuer les tâches `db:migrate`. Mais il est facile de contourner le problème. Si PostgreSQL et PgBouncer sont sur la même machine, il suffit de définir `DB_PORT=5432` en plus de `RAILS_ENV=production` quand vous invoquez la tâche. Par exemple : `RAILS_ENV=production DB_PORT=5432 bundle exec rails db:migrate` (vous pouvez aussi définir `DB_HOST` si l'un des deux services n'est pas sur la même machine, etc.)

#### Administrer PgBouncer

La façon la plus simple de redémarrer PgBouncer est de faire ainsi :

    sudo systemctl restart pgbouncer

Mais si vous avez créé un utilisateur avec les droits administrateurs dans PgBouncer, vous pouvez aussi vous connecter en tant qu'administrateur :

    psql -p 6432 -U pgbouncer pgbouncer

Puis faire :

    RELOAD;

Et enfin quitter en faisant `\q`.

## Un Redis séparé pour le cache

Redis est largement utilisé à travers l'application, mais certaines utilisations de Redis sont plus importantes que d'autres. Les timelines personnelles et des listes, les queues Sidekiq ainsi que l'API de streaming sont fournies par Redis et ce sont des données importantes que vous ne voudriez pas perdre (même si cette perte peut être surmontée, contrairement à celle de la base de données PostgreSQL – ne la perdez jamais !). Cependant, Redis est aussi utilisé pour le cache volatile. Si vous en êtes arrivés au stade dans l'amélioration des performances où vous avez peur que Redis ne puisse tout gérer, vous pouvez utiliser une autre base de données Redis pour le cache. Dans l'environnement d'exécution, vous pouvez spécifier la variable `CACHE_REDIS_URL` ou des variables plus restreintes comme `CACHE_REDIS_HOST`, `CACHE_REDIS_PORT`, etc. Les variables non définies auront les valeurs par défaut, celles utilisées s'il n'y avait pas de deuxième cache.

Si vous voulez configurer la base de données Redis, vous pouvez vous débarrasser de l'écriture en arrière-plan des données sur le disque, puisque ce n'est pas très important si les données sont perdues au redémarrage, et vous pourrez ainsi économiser des accès lecture/écriture sur le disque. Vous pouvez également ajouter une limite d'utilisation de mémoire et une règle de suppression de données obsolètes, mais pour ça, il faudra lire cette page (en anglais) : [Using Redis as an LRU cache](https://redis.io/topics/lru-cache)

## Réplication des données

Pour réduire la charge sur votre serveur PostgreSQL, vous pourriez mettre en place une réplication des données (read replica). [Lisez ce guide pour voir un exemple](https://cloud.google.com/community/tutorials/setting-up-postgres-hot-standby). Vous pouvez utiliser la réplication dans Mastodon de différentes manières :

- L'API de streaming ne génère pas d'écritures sur le disque, vous pouvez donc connecter l'API directement au serveur répliquant. Mais puisque l'API n’interroge pas souvent la base de données, l'impact sur les performances sera moindre.
- Utiliser Makara dans les processus Web et Sidekiq, ainsi les écritures iront sur le serveur principal tandis que les lectures iront sur le serveur répliquant. Voyons cela plus en détail. 

Vous aurez à modifier le fichier `config/database.yml` et remplacer la section `production` ainsi :

```yml
production:
  <<: *default
  adapter: postgresql_makara
  prepared_statements: false
  makara:
    id: postgres
    sticky: true
    connections:
      - role: master
        blacklist_duration: 0
        url: postgresql://db_user:db_password@db_host:db_port/db_name
      - role: slave
        url: postgresql://db_user:db_password@db_host:db_port/db_name
```

Assurez-vous que les URL pointent au bon endroit. Vous pouvez ajouter plusieurs serveurs pour répliquer les données. Vous pouvez avoir PgBouncer installé sur le serveur hébergeant Mastodon, avec une configuration connectant PgBouncer à deux serveurs PostgreSQL différents en fonction du nom de la base de données appelée, par exemple "mastodon" irait sur le serveur principal et "mastodon_replica" irait sur le répliquant. Dans le fichier ci-dessus, les deux URL pointeraient sur PgBouncer avec le même utilisateur, le même mot de passe, le même hôte et port, mais avec un nom de base de données différent. Les possibilités sont infinies ! Pour plus d'informations sur Makara, [consultez leur documentation](https://github.com/taskrabbit/makara#databaseyml).
