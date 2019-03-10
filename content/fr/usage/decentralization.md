---
title: Décentralisation
description: Comment Mastodon est décentralisé et ce que ça veut dire concrètement
menu:
  docs:
    parent: usage
    weight: 2
---

Mastodon est un réseau social **fédéré**.

## Qu'est-ce que la fédération ?

La **fédération** est une forme de décentralisation. Au lieu d'avoir un nœud de connexion unique que tout le monde utiliserait, il y en a plusieurs, que n'importe qui peut utiliser.

|Degrés de centralisation|Exemples|
|:---------------------:|--------|
|Centralisé|Twitter, Facebook, Instagram|
|Fédéré|E-mail, XMPP|
|Distribué|BitTorrent, IPFS, Scuttlebutt|

Une instance Mastodon peut opérer seule. Comme un site web traditionnel, les gens s'inscrivent dessus, postent des messages, envoient des photos et se parlent entre eux. *Contrairement* à un site web traditionnel, les instances Mastodon peuvent opérer entre elles, laissant leurs utilisateur·ice·s communiquer ensemble, comme vous enverriez un mail depuis votre adresse GMail à quelqu'un utilisant une adresse Outlook.

<figure>
  <img src="/decentralization.png" alt="" style="margin: 0; box-shadow: none">
  <figcaption><p>De gauche à droite : Centralisé, Fédéré, Distribué</p></figcaption>
</figure>

Concrètement : Imaginez si vous pouviez suivre quelqu'un sur Instagram depuis votre compte Twitter et commenter ses photos sans changer de compte ou d'application. Si Twitter et Instagram étaient des services fédérés, ce serait possible.

## Le Fediverse

Mastodon utilise un protocole ouvert et standardisé pour la fédération. Il se nomme ActivityPub. N'importe quel logiciel qui utilise également ActivityPub pour la fédération peut communiquer sans problèmes avec Mastodon, comme n'importe quelle instance Mastodon peut communiquer avec une autre.

Le **Fediverse** ("federated universe", univers fédéré) est le nom qu'on donne à l'ensemble des instances qui peuvent communiquer entre elles. Ça inclut toutes les instances Mastodon, mais également d'autres logiciels :

- Misskey
- Pleroma
- PeerTube
- Plume
- et plein d'autres encore

Le Fediverse n'a pas de logiciel spécifique associé, vous entendrez donc plus souvent "suivez-moi sur Mastodon" que "suivez-moi sur le Fediverse", bien que le deuxième soit techniquement plus approprié.

## Implications concrètes
### S'adresser à des gens

Les noms d'utilisateur sur Mastodon sont en deux parties :

- Le nom d'utilisateur local, ex. `alice`
- Et le nom de domaine de l'instance, ex. `exemple.fr`

Comme une adresse e-mail. Par commodité, Mastodon vous permet de zapper la deuxième partie du nom d'utilisateur quand vous vous adressez à des gens sur la même instance que vous, mais rappelez-vous que si vous partagez votre nom d'utilisateur à d'autres personnes, vous devrez donner le nom complet ou sinon elles auront du mal à vous trouver.

|{{< no >}}|{{< yes >}}|
|:--------:|:---------:|
|Je suis @alice sur Mastodon !|Je suis @alice@exemple.fr sur Mastodon !|

La barre de recherche dans Mastodon peut trouver des gens soit sous la forme `@nom@domaine.tld`, soit sous la forme d'un lien (`https://exemple.fr/@nom`), vous pouvez donc partager sous la forme qui vous convient le mieux.

### Suivre des gens

Tant que vous rencontrez quelqu'un via l'interface utilisateur de l'application, ex. l'interface web de votre instance, ou votre application mobile, vous avez juste à cliquer sur le bouton "Suivre" et vous ne verrez aucune différence si la personne est sur votre instance ou non.

Par contre, si vous arrivez sur la page publique d'une personne sur une autre instance, il y a un problème : l'instance vous voit comme un·e simple inconnu·e.

Quand vous cliquez sur "Suivre", une fenêtre va apparaître, vous demandant d'entrer votre nom d'utilisateur complet (avec la partie du nom de domaine, la plus importante). Ainsi, la fenêtre vous renverra sur votre instance et vous permettra de suivre la personne.

Vous verrez aussi cette fenêtre quand vous cliquez sur "Répondre", "Boost" ou "Mettre en favori" sur les pages publiques d'autres instances.

### Parcourir le contenu

Afin de vous permettre de découvrir du contenu potentiellement intéressant, Mastodon fournit un moyen de parcourir tous les posts publics. Enfin, il n'y pas pas d'accord global de partage du contenu entre toutes les instances, donc il n'y a pas vraiment de moyen de parcourir *tous* les posts publics. Quand vous parcourez la **timeline fédérée**, vous voyez tous les posts publics que l'instance sur laquelle vous êtes connaît. Il y a différentes façons de faire découvrir à votre instance des posts, mais la manière la plus simple est de suivre des gens d'autres instances.

Il y a un moyen de filtrer la timeline fédérée afin de ne voir que les posts publics faits à partir de votre instance : la **timeline locale**. Note que "locale" se réfère à l'instance, pas à une position géographique.

### Financement et monétisation

Toutes les instances Mastodon sont gérées par des personnes ou des organisations complètement différentes et indépendantes. Mastodon n'offre aucune solution de monétisation dans le logiciel.

Quelques administrateur·ice·s d'instances choisissent de fournir des comptes contre de l'argent. D'autres travaillent dans des entreprises ou des organismes du service public qui utilisent leur infrastructure déjà existante pour héberger leur instance. La plupart des administrateur·ice·s d'instances s'en réfèrent au crowdfunding via Patreon ou autre pour payer les frais de service. Si vous voulez soutenir l'instance qui héberge votre compte, cherchez s'il est fait mention d'un moyen de financer l'instance.

Le développement de Mastodon est financé par crowdfunding via Patreon. Aucun capital-risque n'est impliqué.

### Usurpation d'identité et vérification

Le même nom d'utilisateur *peut* être utilisé sur différentes instances, il n'y a aucun moyen de réclamer la propriété de chaque nom à l'avance. Comme avec les mails, vous ne devriez pas vous attendre à ce que `alice@hotmail.com` soit la même Alice que `alice@gmail.com`.

Puisque Mastodon peut être auto-hébergé, il n'y a de meilleur moyen de prouver son identité qu'en ayant une instance sur un nom de domaine vous appartenant, les gens y faisant déjà confiance.

La vérification d'identité via des documents et l'apposition d'une coche bleue à côté de son nom ne sont pas possible sans une autorité centralisée. Par contre, Mastodon peut croiser les liens que vous mettez sur votre profil pour prouver que vous détenez la propriété de ces liens. Si l'un de ces liens est votre page web personnelle qui est connue et donc de confiance, cela peut servir comme une alternative à la vérification d'identité.
