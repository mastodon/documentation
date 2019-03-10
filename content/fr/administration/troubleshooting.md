---
title: Résolution de problèmes
description: Comment trouver ce qui ne va pas avec votre instance Mastodon
menu:
  docs:
    parent: administration
    weight: 99
---

**Je vois une page d'erreur qui dit que quelque chose ne s'est pas bien passé. Comment je fais pour savoir ce qui ne va pas ?**

Tous les messages d'erreur avec des stack traces sont inscrits dans le log système. Si vous utilisez systemd, les logs de chaque service systemd peuvent être lus avec `journalctl -u mastodon-web` (remplacez avec le nom du service désiré). Si vous utilisez Docker, c'est à peu près pareil : `docker logs mastodon_web_1` (remplacez avec le nom du conteneur désiré).

Le détail des erreurs côté serveur n'est *jamais* donné au public, puisqu'il peut révéler comment votre instance est configurée et cela peut donner aux attaquants des indices pour s'infiltrer dans le système ou mieux en abuser.

Chaque réponse du serveur web Mastodon est accompagné d'un header avec un identifiant de requête unique, qui apparaît dans les logs. En inspectant les headers de la page d'erreur, vous pourrez facilement retrouver la stack trace correspondante dans les logs.

**Après avoir mis à jour vers une version supérieure, quelques pages s'affichent bizarrement. Pourquoi ?**

Vérifier que vous avez exécuté `RAILS_ENV=production bin/rails assets:precompile` après la mise à jour, et redémarré le processus web de Mastodon, puisqu'il semble que le processus envoie encore des feuilles de style et des scripts périmés. Il se peut aussi que la précompilation ait échouée à cause d'un manque de mémoire RAM, webpack prenant malheureusement beaucoup trop de mémoire. Si c'est le cas, assurez-vous d'avoir un espace swap de disponible. Sinon, il est possible de pré-compiler les ressources web sur une autre machine, et de les copier ensuite dans le dossier `public/packs`.

**Après avoir mis à jour vers une version supérieure, certaines requêtes échouent et les logs montrent des messages d'erreurs à propos de colonnes ou tables manquantes. Pourquoi ?**

Vérifiez que vous avez exécuté `RAILS_ENV=production bin/rails db:migrate` après la mise à jour, puisqu'il semble que votre Mastodon essaye d'accéder à un schéma de base de données plus ancien ou plus récent que prévu. Si vous utilisez PgBouncer, assurez-vous que cette commande le connecte directement à PostgreSQL, puisque PgBouncer ne supporte pas vraiment les verrouillages de tables qui sont utilisés lors des mises à jour.

**J'essaye d'exécuter une commande `tootctl` ou `rake`/`rails`, mais tout ce que j'obtiens est une erreur à propos de constantes non initialisées. Qu'est-ce qui ne va pas ?**

Vérifiez que vous avez mis `RAILS_ENV=production` avant le début de votre commande. Par défaut, Mastodon s'exécute dans un environnement supposé être de développement, donc il essaye de charger des gemmes Ruby liées au développement. Cependant, dans un environnement de production, on évite d'installer ces gems Ruby, et c'est de là que vient l'erreur.
