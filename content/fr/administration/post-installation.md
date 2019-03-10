---
title: Opérations post-installation
description: Que faire après que l'installation de Mastodon soit terminée
menu:
  docs:
    parent: administration
    weight: 3
---

## Utiliser l'interface en ligne de commande

L'interface en ligne de commande de Mastodon réside dans un fichier exécutable nommé `tootctl`, dans le répertoire `bin`, à l'intérieur du dossier contenant Mastodon. Vous devez obligatoirement spécifier dans quel mode vous avez l'intention de l'invoquer, en spécifiant la variable d'environnement `RAILS_ENV`. Vous devez utiliser `RAILS_ENV=production`, sauf si vous êtes un·e développeur·euse qui travaillerait sur sa propre machine. Si vous êtes sûr·e que vous n'utiliserez pas d'autre mode que `production` (les autres étant `development`, `test`, ou `staging`), vous pouvez ajouter cette variable dans le fichier `.bashrc` pour plus de commodité :

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

Si vous faites ainsi, vous n'aurez pas à spécifier la variable à chaque fois. Sinon, les invocations de `tootctl` se passent généralement ainsi, en supposant que le code source de Mastodon réside dans `/home/mastodon/live` :

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

## Créer un compte administrateur
### Dans le navigateur

Après avoir s'être inscrit·e depuis le navigateur, vous devrez user de la ligne de commande pour donner à votre compte fraîchement créé les privilèges administrateur. En supposant que votre nom d'utilisateur est `alice` :

```bash
RAILS_ENV=production bin/tootctl accounts modify alice --role admin
```

### Depuis la ligne de commande

Vous pouvez créer un nouveau compte à partir de la ligne de commande.

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@exemple.fr \
  --confirmed \
  --role admin
```

Un mot de passé généré aléatoirement s'affichera dans le terminal.

## Remplir les infos de l'instance

Après vous être connecté, allez dans les paramètres, sur la page **Paramètres du site**, dans l'onglet Administration. Bien que techniquement il n'y ait pas d'obligation de fournir d'informations, c'est une tâche considérée comme cruciale quand il s'agit d'une instance dédiée à recevoir du monde dessus.

|Paramètre|Signification|
|-------|-------|
|Nom d'utilisateur·ice|Votre nom d'utilisateur·ice pour que les gens sachent à qui appartient l'instance|
|Adresse courriel publique|Une adresse mail pour que les gens ne pouvant se connecter, ou les gens qui voudraient se créer un compte, puissent vous contacter|
|Description de l'instance|Pourquoi avez-vous créé cette instance ? À qui est-elle destinée ? Qu'est-ce qui la rend différente ?  |
|Description étendue de l'instance|Vous pouvez mettre toutes sortes d'information dedans, mais mettre un **code de conduite** est recommandé. |

Une fois fini, appuyez sur "Enregistrer les modifications".

## Mettre en place des sauvegardes régulières (facultatif, mais pas vraiment non plus)

Pour toute utilisation en conditions réelles, vous devriez vous assurer de faire des sauvegardes régulières de votre instance Mastodon.

### Vue d'ensemble

Voici les choses qui doivent être sauvegardées par ordre d'importance :

1. La base de données PostgreSQL
2. Les secrets du fichier `.env.production` ou son équivalent
3. Les fichiers téléversés par les utilisateur·ice·s
4. La base de données Redis

### Types de défaillances

Il y a deux types de défaillances que les gens vont essayer d'éviter : la défaillance du matériel, comme la corruption des données sur le disque dur ; et l'erreur humaine et logicielle, comme une suppression involontaire des données. Dans cette documentation, on ne parlera que du premier type.

Une base de données PostgreSQL effacée ou perdue, et c'est le game over. Mastodon stocke toutes les données les plus importantes dans la base de données PostgreSQL. Si la base de données disparaît, tous les comptes, posts et abonné·e·s de votre instance disparaîtront avec.

Si vous perdez les secrets de configuration, certaines fonctionnalités de Mastodon cesseront de fonctionner, vos utilisateur·ice·s seront déconnectés, la double authentification (2FA) sera indisponible, les notifications push ne seront plus délivrées.

Si vous perdez les fichiers téléversés par les utilisateur·ice·s, vous perdrez les photos de profil, bannières et photos rattachés aux posts, mais Mastodon continuera de fonctionner.

Perdre la base de données Redis est presque inoffensif : les seules données irrécupérables seront le contenu des queues Sidekiq et les retentatives planifiées de tâches qui ont échouées. Les timelines personnelles et celles des listes sont stockées dans Redis, mais elles peuvent être refaites avec `tootctl`.

Les meilleures sauvegardes sont celles qui sont "hors-site", c-à-d des sauvegardes qui ne sont pas sur la même machine que celle où se trouve Mastodon. Si le serveur que vous utilisez prend feu et que le disque dur explose, les sauvegardes qui sont dessus ne seront pas d'une grande aide.

### Sauvegarder les secrets

Les secrets sont les plus simples à sauvegarder, puisqu'ils ne changent jamais. Vous n'avez qu'à sauvegarder `.env.production` dans un endroit sûr.

### Sauvegarder PostgreSQL

PostgreSQL encoure le risque d'avoir des données corrompues à cause d'une coupure de courant, un disque dur défectueux, et des schémas de migrations bâclés. Pour cette raison, faire une sauvegarde de temps en temps avec `pg_dump` ou `pg_dumpall` est recommandé.

Pour des configurations nécessitant une haute disponibilité, il est possible de répliquer la base de données afin d'avoir un deuxième serveur PostgreSQL avec des données constamment à jour, prêt à être utilisé si le premier est indisponible.

### Sauvegarder les fichiers téléversés par les utilisateur·ice·s

Si vous utilisez un fournisseur de stockage externe comme Amazon S3, Google Cloud ou Wasabi, vous n'avez pas besoin de vous inquiétez pour les sauvegardes. Ces entreprises sont responsables des défaillances matérielles.

Si vous stockez localement les fichiers, c'est à vous de faire des copies du volumineux dossier `public/system`, où les fichiers téléversés sont stockés par défaut.

### Sauvegarder Redis

Sauvegarder Redis est simple. Redis écrit régulièrement dans `/var/lib/redis/dump.rdb`, qui est le seul fichier que vous avez à récupérer.
