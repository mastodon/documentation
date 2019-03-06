---
title: Vie privée
description: Aperçu des fonctionnalités de Mastodon en rapport à la vie privée et leurs implications
menu:
  docs:
    parent: usage
    weight: 3
---

## Niveaux de publication

|Niveau|Timelines publiques|Permalien|Page de profil public|Timeline personnelle|
|-----|:--------------:|:-------:|:----------:|:--------:|
|Public|{{< yes >}}|{{< yes >}}|{{< yes >}}|{{< yes >}}|
|Non-listé|{{< no >}}|{{< yes >}}|{{< yes >}}|{{< yes >}}|
|Abonné·e·s seulement|{{< no >}}|{{< no >}}|{{< no >}}|{{< yes >}}|
|Direct|{{< no >}}|{{< no >}}|{{< no >}}|{{< no >}}|

Peu importe le niveau utilisé, chaque utilisateur·ice mentionné·e pourra voir le message dans ses notifications.

**Ne partagez pas d'informations sensibles ou dangereuses par messages directs**. Mastodon n'est pas une messagerie instantanée chiffrée comme Signal ou Wire, les administrateur·ice·s des instances de l'expéditeur et du destinataire ont accès à la base de données de leurs instances et peuvent donc lire les messages. Utilisez donc les messages privés avec autant d'attention que vous feriez avec les DM Twitter, MP Discord et autres.

## Verrouiller un compte

Pour s'assurer que les posts privés (abonné·e·s seulement) le restent, vous devez verrouiller votre compte --sinon, n'importe qui pourrait vous suivre et voir vos posts précédents. Verrouiller son compte sur Mastodon ne fait qu'une chose : ajouter une étape de validation avant de pouvoir vous suivre.

Une fois verrouillé, avant que quelqu'un puisse devenir votre abonné·e, vous recevrez une demande de suivi, que vous pouvez soit accepter soit refuser.

Gardez à l'esprit que la possibilité de rendre privés ses posts se fait au cas par cas et non sur tout le compte, il n'y a donc aucun moyen de rendre instantanément les posts antérieurs privés.

## Bloquer et masquer
### Masquer les boosts

Si vous masquez les boosts de quelqu'un, vous ne les verrez pas dans votre timeline personnelle.

### Masquer quelqu'un

Quand vous masquez quelqu'un, vous avez la possibilité de masquer ou non les notifications venant de cette personne. Masquer quelqu'un sans pour autant masquer les notifications enlève de votre vue l'utilisateur·ice :

- Vous ne verrez pas la personne dans votre timeline personnelle
- Vous ne verrez pas les autres partager ses posts
- Vous ne verrez pas les autres mentionner cette personne
- Vous ne verrez pas la personne dans les timelines publiques

Si vous choisissez également de masquer les notifications de cette personne, vous ne recevrez pas de notifications de cette personne.

La personne masquée ne sait à aucun moment qu'elle est masquée.

### Bloquer quelqu'un

Le blocage enlève de votre vue une personne :

- Vous ne verrez pas la personne dans votre timeline personnelle
- Vous ne verrez pas les autres partager ses posts
- Vous ne verrez pas les autres mentionner cette personne
- Vous ne verrez pas la personne dans les timelines publiques
- Vous ne verrez pas les notifications de cette personne

De plus, du côté de la personne bloquée :

- Elle est obligée de ne plus vous suivre
- Elle ne peut pas vous suivre
- Elle ne verra pas les autres partager vos messages
- Elle ne vous verra plus dans les timelines publiques

Si vous et la personne bloquée êtes sur la même instance, elle ne pourra plus voir vos posts en regardant votre profil tout en étant connecté.

### Masquer toute une instance

Si vous masquez une instance entière :

- Vous ne verrez pas les posts de cette instance sur les timelines publiques
- Vous ne verrez pas les autres partager les posts de cette instance dans votre timeline personnelle
- Vous ne verrez pas les notifications de cette instance
- Vous perdrez les abonné·e·s que vous aviez potentiellement sur cette instance
