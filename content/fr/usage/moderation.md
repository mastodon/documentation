---
title: Modération
description: Aperçu des outils de modération de Mastodon
menu:
  docs:
    parent: usage
    weight: 4
---
## Modération individuelle

La modération dans Mastodon se fait toujours localement, c-à-d que les actions ne se verront que depuis l'instance où elles ont été prises. Un·e administrateur·ice ou modérateur·ice d'une instance ne peut s'en prendre à une personne d'une autre instance, ses actions n'ont de conséquences que sur la copie locale sur leur propre instance.

### Désactiver la connexion

Un compte Mastodon peut être désactivé. Cela empêche l'utilisateur·ice de faire quoi que ce soit avec son compte, mais tout ce qui a été posté reste là. Cette restriction est réversible, le compte peut être réactivé à tout moment. Cette restriction n'est disponible que pour les utilisateur·ice·s de votre instance.

### Silence

Un silence (masquage) sur Mastodon est comparable au sandbox en informatique. Un compte silencé n'apparaît pas aux personnes qui ne le suivaient pas auparavant. Le contenu est toujours là, et il peut toujours être trouvé en le cherchant, quand on clique sur la @mention ou quand on cherche dans sa propre liste d'abonnements, mais il est invisible pour les autres.

À ce stade, le silence n'affecte pas la fédération. Un compte localement silencé n'est *pas* silencé automatiquement sur les autres instances.

Cette restriction est réversible, le compte peut être dé-silencé à tout moment.

### Suspension

Une suspension sur Mastodon est synonyme de suppression. Le compte n'apparaît plus quand on le cherche, la page de profil disparaît, tous les posts, téléversements, liste d'abonnements et d'abonné·e·s, et toutes les autres données sont supprimées. Cette restriction est **irréversible**. Bien que le compte puisse être dé-suspendu, permettant ainsi à l'utilisateur·ice d'en regagner l'accès, les anciennes données sont définitivement effacées.

## Modération globale d'une instance

La modération individuelle d'un grand nombre de personnes d'une instance ayant une mauvaise attitude pouvant être épuisant, il est possible de modérer préventivement tous les utilisateur·ice·s de cette instance en utilisant un **blocage de domaine**, qui se décline en plusieurs degrés de sévérité.

### Rejet des médias

Quand cette option est activée, aucun fichier de cette instance sera accepté localement. Cela comprend les photos de profil, les bannières, les émojis personnalisés et les médias rattachés aux posts.

### Masquage

Applique un masquage sur tous les comptes passés et futurs de cette instance.

### Suspendre

Applique une suspension à tous les comptes passés et futurs de cette instance. Aucun contenu de cette instance sera stocké localement, à part les noms d'utilisateur.

## Mesures anti-spam

Il y a quelques mesures de base qui limitent le spam sur Mastodon :

- L'inscription requiert la confirmation de son adresse mail
- Le nombre d'inscriptions via la même adresse IP est limité

Toutefois, les spammeurs et spammeuses déterminé·e·s arriveront à passer outre ces mesures. Vous pouvez alors user du **blacklisting de domaines courriel**. Durant l'inscription, Mastodon cherche un enregistrement A ou MX dans le nom de domaine utilisé par l'adresse mail, c-à-d l'adresse IP du serveur mail, et vérifie si cette adresse n'est pas dans une blacklist générée dynamiquement.

### Blocage de serveur de courriel

Les spammeur·euse·s vont souvent utiliser plusieurs domaines de courriel pour que ça donne l'impression qu'iels utilisent plein de serveurs différents et qu'il serait donc plus difficile de tous les bloquer. Cependant, l'expérience montre que la plupart du temps tous ces domaines renvoient à la même adresse IP. Si vous voyez plein de spammeur·euse·s s'inscrire en même temps, vous pouvez vérifier si c'est le cas ici, soit en utilisant un service de recherche DNS en ligne, ou en utilisant l'utilitaire `dig` sur Linux, par exemple `dig 1.2.3.4` retournera tous les enregistrements DNS pour cette adresse IP. Si l'IP est la même pour tous les domaines mail, vous pouvez l'ajouter dans la blacklist de domaines de courriels.

### Blocage d'adresse IP

Il n'est pas possible de bloquer les visiteurs sur la base de leur adresse IP dans Mastodon en soi, et ce n'est pas une stratégie infaillible. Les adresses IP sont parfois partagées par différentes personnes (entreprise, école…) et peuvent parfois changer de propriétaire. Mais il est possible de bloquer des visiteurs sur la base de leur adresse IP dans Linux en utilisant un pare-feu. Voici un exemple avec `iptables` et `ipset` :

```bash
# Installez ipset
sudo apt install ipset
# Créez une blacklist nommée "spambots"
sudo ipset create spambots nethash
# Ajoutez 1.2.3.4 à la blacklist
sudo ipset add spambots 1.2.3.4
# Ajoutez une règle de pare-feu basée sur la blacklist
sudo iptables -I INPUT 1 -m set --match-set spambots src -j DROP
```

Prenez garde à ne pas vous interdire de connexion à votre serveur.
