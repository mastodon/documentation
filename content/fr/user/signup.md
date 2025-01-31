---
title: Créer un compte
description: Trouver votre communauté idéale.
menu:
  docs:
    weight: 10
    parent: user
---

## Choisir une instance {#picker}

Vous devez choisir une instance pour vous y inscrire, comme vous choisiriez un fournisseur d’email, ou un royaume _World of Warcraft_ pour votre personnage. Le site web sera votre fournisseur de service, hébergeant votre compte, votre profil, et vore fil d’actualité local.

{{< hint style="info" >}}
Vous pouvez [parcourir une liste de serveurs par catégories et par langues sur joinmastodon.org](https://joinmastodon.org/#getting-started).
{{< /hint >}}

### Comprendre la politique d’une instance {#tos}

<!-- TODO: Update /about/more with /about on other pages. -->

Avant de vous inscrire à un service, il est important d’en comprendre la politique et les conditions d’utilisation. La politique d’une instance Mastodon se trouve généralement sur la page `/about/`, qui se trouve en cliquant « À propos  » sur la page d’accueil de cette instance, en étant déconnecté.

### Types d’inscriptions {#signup}

Mastodon permet aux personnes qui administrent une instance de définir un mode d’inscription parmi trois : inscriptions libres, sur invitation, et par approbation. 

#### Inscriptions libres {#open}

Certaines instances vous permettront de vous enregistrer immédiatement —validez simplement le formulaire d’inscription avec votre nom d’utilisateur, adresse de courriel, et mot de passem et vous pourrez utiliser votre compte.

#### Sur invitation {#invite}

Certaines instances désactivent le formulaire d’inscription, et demandent à la place que des liens d’invitation soient générés et partagés pour permettre aux gens de s’inscrire.

#### Inscription par approbation {#approval}

Certaines instances vous autorisent à remplir un formulaire d’inscription, mais avec un champ de formulaire supplémentaire pour expliquer pourquoi vous souhaitez rejoindre cette instance. Une fois le formulaire validé, votre compte doit être approuvé par un membre de l’équipe de modération avant de pouvoir l’utiliser. 

## Votre nom d’utilisateur et votre domaine {#address}

<!-- TODO: Replace username by address in the English version. -->

Les adresses Mastodon se composent de deux parties :

* Le nom local, e.g. `claude`
* Le domaine de l’instance, e.g. `example.com`

Tout comme une adresse de courriel. Par commodité, Mastodon vous permet d’omettre la seconde partie lorsque vous vous adressez à des personnes sur la même instance que vous, mais vous devez garder en tête que vous devez inclure le domaine pour partager votre compte à des tiers, ou vous trouver sera moins facile.

| Partager votre nom d’utilisateur |  |
| :--- | :--- |
| Je suis `@claude` sur Mastodon ! | Incorrect |
| Je suis `@claude@example.com` sur Mastodon ! | Correct |
| Je suis https://example.com/@claude sur Mastodon ! | Correct |

Le formulaire de recherche de Mastodon vous permettra de trouver quelqu’un, soit avec le format d’adresse précédent, soit le lien vers le profil de la personne. Vous pouvez donc partager ce dernier si vous préférez.

Le même nom d’utilisateur _peut_ être enregistré sur différentes instances —il n’y a aucun moyen de tous les réserver au préalable. Tout comme le courriel, ne vous attendez pas à ce que `claude@outlook.com` soit la même personne que `claude@gmail.com` ou `claude@yahoo.com`.
