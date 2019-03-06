---
title: Migration de serveur
description: Comment migrer une instance Mastodon sur un nouveau serveur
menu:
  docs:
    parent: administration
    weight: 6
---

Parfois, pour des raisons diverses, vous avez besoin de migrer votre instance Mastodon d'un serveur à un autre. Heureusement, ce n'est pas une opération trop complexe, même si ça peut résulter en un petit temps où l'instance n'est pas utilisable.

**Note :** ce guide a été écrit avec l'utilisation d'Ubuntu Server en tête ; certaines opérations peuvent différer si vous utilisez un autre système d'exploitation.

Étapes basiques
----

1. Créez une nouvelle instance Mastodon en utilisant le [guide d'installation](/administration/installation/) (mais n'exécutez pas `mastodon:setup`).
2. Arrêtez Mastodon sur l'ancien serveur (par ex. `systemctl stop 'mastodon-*.service'`).
3. Sauvegardez et chargez la base de données PostgreSQL en suivant les instructions plus bas.
4. Copier les fichiers du dossier `system/` en suivant les instructions plus bas. (Note : si vous utilisez S3, vous pouvez passer cette étape.)
5. Copiez le fichier `.env.production`.
6. Exécutez `RAILS_ENV=production ./bin/tootctl feeds build` pour reconstruire les timelines personnelles de chaque utilisateur·ice.
7. Démarrez Mastodon sur le nouveau serveur.
8. Mettez à jour la zone DNS pour qu'elle pointe sur le nouveau serveur.
9. Mettez à jour ou copiez votre configuration Nginx, ré-exécutez LetsEncrypt si nécessaire.
10. Profitez de votre nouveau serveur !

Étapes détaillées
----

### Quelles données doivent être migrées

Prioritairement, vous devez copier ceci :

- Le dossier `~/live/public/system`, qui contient les photos et vidéos téléversées par les utilisateur·ice·s (si vous utilisez S3, vous n'avez pas à le faire)
- La base de données PostgreSQL (en utilisant [pg\_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html))
- Le fichier `~/live/.env.production`, qui contient la configuration de l'instance et ses variables secrètes

Moins important, vous voudrez probablement copier ces fichiers pour plus de commodité :

- La configuration nginx (sous `/etc/nginx/sites-available/default`)
- Les fichiers de services systemd (`/etc/systemd/system/mastodon-*.service`), qui peuvent contenir des modifications spécifiques à votre instance
- La configuration PgBouncer dans `/etc/pgbouncer` (si vous l'utilisez)

### Sauvegarder et charger PostgreSQL

Au lieu d'exécuter `mastodon:setup`, on va créer une base de données PostgreSQL vide 
en utilisant la base de données `template0` (qui est utile quand on restaure une sauvegarde PostgreSQL, 
[comme détaillé dans la documentation de pg\_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html#BACKUP-DUMP-RESTORE)).

Exécutez ceci en tant qu'utilisateur `mastodon` sur l'ancien serveur :

```bash
pg_dump -Fc mastodon_production -f backup.dump
```

Copiez le fichier `backup.dump` sur le nouveau serveur, en utilisant `rsync` ou `scp`. Puis, sur le nouveau serveur, 
créez une base de données vide en tant qu'utilisateur `mastodon` :

```bash
createdb -T template0 mastodon_production
```

Et importez-la :

```bash
pg_restore -U mastodon -n public --no-owner --role=mastodon \
  -d mastodon_production backup.dump
```

(Notez que si le nom d'utilisateur sur le nouveau serveur n'est pas `mastodon`, vous devriez changer les valeurs de 
`-U` AND `--role` dans la commande juste au-dessus. C'est pas grave si le nom d'utilisateur est différent entre les deux serveurs.)

### Copier les fichiers

Cela va sûrement prendre du temps, et vous voudrez sûrement éviter de recopier des fichiers inutilement, utiliser `rsync` est donc recommandé.
Sur l'ancien serveur, en tant qu'utilisateur `mastodon`, faites :

```bash
rsync -avz ~/live/public/system/ mastodon@exemple.fr:~/live/public/system/
```

Vous répèterez l'opération si jamais les fichiers sur l'ancien serveur devaient changer.

Vous devriez copier le fichier `.env.production`, qui contient des secrets nécessaires à l'instance.

Optionnellement, vous pouvez copier les fichiers de configuration nginx, systemd, et pgbouncer, ou les réécrire de zéro.

### Durant la migration

Vous pouvez modifier le fichier `~/live/public/500.html` sur l'ancien serveur si vous voulez afficher un joli message d'erreur et permettre de faire savoir aux utilisateur·ice·s qu'une migration est en cours.

Vous voudrez probablement modifier le TTL DNS pour quelque chose de plus petit (30 à 60 minutes) un jour à l'avance, la propagation DNS se fera ainsi plus rapidement quand vous aurez indiqué la nouvelle adresse IP.

### Après la migration

Vous pouvez aller sur [whatsmydns.net](http://whatsmydns.net/) pour voir la progression de la propagation DNS.
Pour ne pas attendre, vous pouvez toujours modifier votre propre fichier `/etc/hosts` pour pointer vers votre nouveau serveur et donc commencer à vous amuser avec avant les autres.
