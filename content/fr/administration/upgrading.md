---
title: Mettre à jour son instance
description: Comment mettre à jour Mastodon vers une version plus récente
menu:
  docs:
    parent: administration
    weight: 5
---

Quand une nouvelle version de Mastodon est publiée, elle apparaît sur la [page des versions sur GitHub](https://github.com/tootsuite/mastodon/releases). Notez toutefois qu'exécuter du code de la branche `master` (et donc pas prêt pour le grand public) est dans la plupart des cas non recommandé.

Les versions de Mastodon correspondent aux étiquettes git. Tout d'abord, connectez-vous avec l'utilisateur `mastodon` :

```sh
su - mastodon
```

Allez à la racine du répertoire contenant Mastodon :

```sh
cd /home/mastodon/live
```

Téléchargez le code de la dernière version, en supposant ici que la dernière version se nomme `v2.5.0` :

```sh
git fetch --tags
git checkout v2.5.0
```

La page des versions contient une liste des modifications et nouveautés apportées par une version, et en dessous, les instructions pour réaliser la mise à jour (en anglais). Si la dernière version nécessite par exemple de recompiler les ressources web, vous exécuteriez cette commande :

```sh
RAILS_ENV=production bundle exec rails assets:precompile
```

Après avoir exécuté toutes les instructions spécifiques à la dernière version, il ne reste plus qu'à redémarrer Mastodon. *Habituellement*, l'API de streaming n'est pas mise à jour et ne nécessite pas de redémarrage. La redémarrer pourrait causer une charge inhabituellement haute sur le serveur, il est donc conseillé d'éviter de le faire le plus possible.

Déconnectez-vous pour retourner à l'utilisateur root :

```sh
exit
```

Vous devriez redémarrer Sidekiq :

```sh
systemctl restart mastodon-sidekiq
```

Et vous devriez recharger le processus web pour éviter une période d'indisponibilité de l'instance :

```sh
systemctl reload mastodon-web
```

**C'est tout !** Vous utilisez désormais la dernière version de Mastodon.
