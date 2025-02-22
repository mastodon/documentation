---
title: Qu’est-ce que Mastodon ?
description: Bienvenue sur la documentation de Mastodon !
menu:
  docs:
    weight: -99
---

## Qu’est-ce qu’un microblog ? {#microblog}

Un peu comme bloguer est l’acte de publier des actualités sur un site web, **microbloguer** est l’acte de publier des actualités plus concises vers un fil sur votre profil. Vous pouvez publier des messages texte, et y joindre des médias image, audio, video ou des sondages. Mastodon vous laisse suivre vos amis et en découvrir d’autres.

## Qu’est-ce que la fédération ? {#fédération}

La **Fédération** est une forme de décentralisation. Au lieu d’un unique service central que tout le monde utilise, il existe de multiples services, qu’un nombre indéfini de gens peut utiliser.

| Niveau de centralisation | Exemples |
| :--- | :--- |
| Centralisé | X, Facebook, Instagram |
| Fédéré | Email, XMPP, phone networks, physical mail |
| Distribué | BitTorrent, IPFS, Scuttlebutt |

Un site web Mastodon peut vivre isolément. Comme n’importe quel site web traditionnel, les gens peuvent s’y inscrire, publier des messages, envoyer des images et discuter uniquement avec les personnes du même site web. _A contrario_ des sites web traditionnels, les sites web Mastodon peuvent interopérer, laissant leurs utilisateurs communiquer de site web à site web. Tout comme vous pourriez envoyer un email depuis votre compte Gmail à quelqu’un utilisant Outlook, Fastmail, Protonmail, ou n’importe quel fournisseur d’email —tant que vous connaissez leur adresse de courriel, **vous pouvez citer ou contacter n’importe qui sur n’importe quel site web grâce à leur adresse**.

{{< figure src="assets/network-models.jpg" caption="De gauche à droite : Centralisé, Fédéré, Distribué" >}}

## Qu’est-ce qu’ActivityPub ? {#fediverse}

Mastodon utilise un protocole ouvert et standardisé pour implémenter sa fédération. Il s’appelle **ActivityPub**. Tout logiciel qui implémente à son tour sa féfération avec ActivityPub, peut immédiatement communiquer avec Mastodon, tout comme les sites web Mastodon peuvent communiquer entre eux.

Le **fediverse** (« federated universe », ou « univers fédéré » en français) est le nom qui englobe tous les sites web qui peuvent communiquer entre eux grâce à ActivityPub et le _World Wide Web_. Cela inclus tous les serveurs Mastodon, mais aussi d’autres implémentations :

- Pleroma, un moteur de microblogging modulaire
- Pixelfed, une plateforme d’échange d’images
- Misskey, qui inclut du microblog en plus d’un tableau de bord personnalisable
- PeerTube, qui permet de partager vos vidéos
- Plume, qui vous permet de publier des articles au format long
- Et bien plus, y compris des sites web personnels !

Le fediverse n’ayant pas de marque spécifique, vous entendrez probablement plus souvent « Suivez-moi sur Mastodon » que « Suivez-moi sur le fediverse », même si le dernier est techniquement plus correct.

## Implications pratiques {#implications}

### Choix du fournisseur et de la politique d’un service {#choix}

Puisque Mastodon est un logiciel qui peut être utilisé pour n’importe quel site web, ses utilisateurs potentiels ont l’option de choisir un fournisseur de service existant, ou de créer leur propre site web Mastodon s’ils le souhaitent. Le projet Mastodon maintient une liste des fournisseurs recommandés sur [joinmastodon.org](https://joinmastodon.org/fr), triable par langues et catégories. Certains sites web peuvent avoir des politiques de modération supplémentaires, comme l’identification explicite de contenu potentiellement sensible, et d’autres peuvent avoir des politiques de modération plus souples, mais les sites web listés adoptent tous la [convention du serveur Mastodon](https://joinmastodon.org/fr/covenant), qui signifie leur engagement à modérer activement les discours de haine, à faire des sauvegardes quotidiennes, à avoir au moins un administrateur de garde, et à fournir au moins trois mois de préavis en cas de fermeture.

> Maintenir des communautés dont tous les membres se sentent en sécurité n’est pas facile. Mastodon fournit une infrastructure logicielle et des outils pour y parvenir, et déplace le pouvoir de participer au changement d’une entité commerciale unique aux communautés elles-mêmes.
>
> -- Eugen Rochko, 6 juillet 2018, « [Cage the Mastodon](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/) »

> Une plateforme centralisée de réseau social a une structure hiérarchisée où les règles et leur applicatoin, ainsi que le développement et la direction de la plateforme, sont décidées par le PDG […] Un réseau décentralisé renonce délibéremment au contrôle de la plateforme par un propriétaire, en évitant tout bonnement d’en avoir un.
>
> -- Eugen Rochko, 30 décembre 2018, « [Why does decentralization matter?](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/) »

### Financement et monétisation {#monétisation}

Les sites web Mastodon sont opérés par différentes personnes ou organisations de manière indépendante. Mastodon n’inclut aucune stratégie de monétisation dans son logiciel.

Certains opérateurs choisissent d’offrir des comptes payants, certains opérateurs sont des entreprises qui peuvent utiliser leur infrastructure existante, certains opérateurs dépendent du financement participatif de leurs utilisateurs —via Patreon ou des services similaires, et d’autres opérateurs payent simplement un serveur personnel de leur poche, pour eux et peut-être pour leurs amis. Si vous souhaitez soutenir le serveur hébergeant votre compte, vérifiez s’il propose une manière de donner.

Le développement de Mastodon repose également sur un financement participatif, via [Patreon](https://patreon.com/mastodon) et [OpenCollective](https://opencollective.com/mastodon). **Aucun capital-risque n’est impliqué.**

> À mon avis, « une conversation instantanée, publique et globale » devrait, en réalité, être _globale_. Distribuée entre des oragnisations et des acteurs indépendants capables d’auto-gouvernance. Une utilité publique, sans intérêt à exploiter la conversation pour générer du profit.
>
> -- Eugen Rochko, 3 mars 2018, « [Twitter is not a public utility](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/) »

### Interopérabilité entre différents logiciels {#interopérabilité}

En pratique : Imaginez que vous puissiez suivre un utilisateur d’Instagram depuis votre compte X, et commenter leurs photos sans quitter votre compte. Si X et Instagram étaient des services fédérés qui utilisent le même protocole, cela serait possible. Avec un compte Mastodon, **vous pouvez communiquer avec n’importe quel site web compatible, _même s’il n’utilise pas Mastodon_**. Tout ce qui est nécessaire est que le logiciel repose sur les mêmes parties du protocole d’ActivityPub qui permettent de créer et interagir avec des messages. Pour en savoir plus sur les spécifications techniques nécessaires à une interopérabilité avec Mastodon, voir [ActivityPub](spec/activitypub), [WebFinger](spec/webfinger), et [Security](spec/security). Pour plus de lecture sur ce qu’ActivityPub nous permet de faire, voir _[Why ActivityPub is the future](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)_.

> Toutes ces plateformes sont différentes et se concentrent sur des besoins différents. Cependant, la fondation est toujours la même : des gens qui s’abonnent pour recevoir des messages d’autres personnes. Et donc, elles sont compatibles.
>
> -- Eugen Rochko, 27 juin 2018, « [Why ActivityPub is the future](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/) »

### Logiciel libre {#libre}

Au contraire des services propriétaires, **n’importe qui a une liberté absolue de faire fonctionner, d’étudier, d’auditer, de copier, de modifier, de distribuer et de réutiliser le code source de Mastodon, sous réserve que l’on garantisse les mêmes libertés pour toute œuvre dérivée**. Tout comme les utilisateurs de Mastodon peuvent choisir leurs fournisseurs, vous êtes libre, en tant qu’individu, de contribuer aux fonctionnalités de Mastodon ou de publier une version modifiée de Mastodon qui inclut des fonctionnalités différentes. Ces versions modifiées, également appelées _forks_ [ou _scissions_] logiciels, sont nécessaires pour maintenir les mêmes libertés que le projet Mastodon original. Par exemple, [glitch-soc](https://glitch-soc.github.io/docs/) est un fork qui ajoute diverses fonctionnalités expérimentales. Plusieurs autres forks existent également, avec peut-être un thème légèrement modifié, ou incluant des modifications infimes au code source. Vu que Mastodon est un logiciel libre qui respecte votre liberté, ces types de personnalisation ne sont pas seulement autorisés, mais encouragés.

> Le pouvoir suprême est de donner la possibilité aux personnes de créer leurs propres espaces, leurs propres communautés, de modifier le logiciel comme bon leur semble, mais sans sacrifier la possibilité qu’ont les gens de différentes communautés d’interagir entre eux.
>
> -- Eugen Rochko, 20 février 2017, « [The power to build communities: A response to Mark Zuckerberg](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/) »

> La décentralisation est la biodiversité du monde numérique, la marque de fabrique d’un écosystème sain. Un réseau décentralisé comme le fediverse permet à différentes interfaces, différents logiciels, différentes formes de gouvernances de co-exister et coopérer.
>
> -- Eugen Rochko, 30 décembre 2018, « [Why does decentralization matter?](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/) »

<!-- TODO: Translate those pages before linking to them.

## Choisissez votre chemin {#étape-suivante}

Apprenez comment utiliser Mastodon :

{{< page-ref page="user/signup" >}}

Apprenez comment installer Mastodon :

{{< page-ref page="admin/prerequisites" >}}

Apprenez comment développer une application pour Mastodon :

{{< page-ref page="client/intro" >}}

Découvrez le backend de Mastodon et comment contribuer :

{{< page-ref page="dev/overview" >}}

-->
