---
title: Conformité avec ActivityPub
description: Quels objets et propriétés de la spécification ActivityPub sont supportés par Mastodon
menu:
  docs:
    parent: development
    weight: 5
---

## Les API

- Mastodon supporte la partie serveur-à-serveur de la [spécification ActivityPub](https://www.w3.org/TR/activitypub/).
- Il implémente la [spécification des signatures HTTP](https://tools.ietf.org/html/draft-cavage-http-signatures-10) pour l'authentification des messages reçus.
- Mastodon supporte aussi [les signatures de Données Liées (Linked Data Signatures)](https://w3c-dvcg.github.io/ld-signatures/) pour les payloads transférés.

## Restrictions

- Tous les identifiants d'objets doivent utiliser `https://` comme protocole.
- Les instances doivent fournir un point d'entrée [WebFinger](https://tools.ietf.org/html/rfc7033) pour transformer les noms d'utilisateur·ice·s en acteurs.
- Les activités attribuées à un acteur doivent avoir un identifiant sur le même hôte que l'acteur.

## Activités

|Activité supportée|Objets supportés|
|------------------|-----------------|
|`Accept`|`Follow`|
|`Add`|`Note`|
|`Announce`|`Object`|
|`Block`|`Object`|
|`Create`|`Note`, `Article`, `Image`, `Video`, `Page`|
|`Delete`|`Object`|
|`Flag`|`Object`|
|`Follow`|`Object`|
|`Like`|`Object`|
|`Move`|`Object`|
|`Reject`|`Follow`|
|`Remove`|`Note`|
|`Undo`|`Accept`, `Announce`, `Block`, `Follow`, `Like`|
|`Update`|`Object`|

En ce qui concerne l'activité `Create`, seul l'objet `Note` est un objet de première classe dans Mastodon, puisque Mastodon est un service de microblogage. Pour les autres types d'objets supportés, Mastodon en crée une représentation sous la forme d'un pouet, par exemple, un `Article` ou `Page` devient un pouet avec le `name` et `url` de l'objet original, ce qui incitera les utilisateur·ice·s à aller sur l'URL originale pour lire l'article. Pour les objets `Image` et `Video`, le `name` est également utilisé pour remplir le contenu du pouet, avec le fichier original joint au pouet.

L'activité `Flag` permet de signaler un contenu d'une autre instance, et son `object` peut être soit un ou plusieurs acteurs, soit un ou plusieurs objets attribués à plusieurs acteurs. Les activités `Add` et `Remove` ne fonctionnent qu'avec les [collections mises en avant](#featured-collection). L'activité `Delete` peut être utilisé pour supprimer toutes les données locales de l'expéditeur·ice quand l'`object` de l'activité est l'expéditeur·ice. L'activité `Update` n'est utilisée que pour mettre à jour le profil de l'expéditeur·ice. De la même manière, l'activité `Move` autorise la migration des abonné·e·s de l'expéditeur·ice (`object`) à un autre acteur (`target`), mais seulement si cet acteur référence l'expéditeur·ice dans la propriété `alsoKnownAs`.

## Extensions
### Collection mise en avant

Ce qui est connu dans Mastodon comme des "toots épinglés", ou des statuts qui sont toujours affichés en haut des profils, est implémenté en utilisant une propriété supplémentaire nommée `featured` et associée à l'acteur de l'objet, cette propriété pointe vers une `Collection` d'objets. Par exemple :

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
        
    {
      "toot": "http://joinmastodon.org/ns#",
      "featured": {
        "@id": "toot:featured",
        "@type": "@id"
      }
    }
  ],

  "id": "https://exemple.fr/@alice",
  "type": "Person",
  "featured": "https://exemple.fr/@alice/collections/featured"
}
```

### Émojis personnalisés

Mastodon supporte les émojis personnalisés, de petites images téléversées par les administrateur·ice·s et invocables par des codes courts (:Kappa: par exemple). Pour ça, un type `Emoji` est utilisé. Ces émojis personnalisés sont listés dans la propriété `tag` comme les objets `Mention` et `Hashtag`, puisque ce sont des entités qui affectent la manière dont sera rendue le texte. Par exemple :

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
        
    {
      "toot": "http://joinmastodon.org/ns#",
      "Emoji": "toot:Emoji"
    }
  ],

  "id": "https://exemple.fr/@alice/hello-world",
  "type": "Note",
  "content": "Hello world :Kappa:",
  "tag": [
    {
      "id": "https://exemple.fr/emoji/123",
      "type": "Emoji",
      "name": ":Kappa:",
      "icon": {
        "type": "Image",
        "mediaType": "image/png",
        "url": "https://exemple.fr/files/kappa.png"
      }
    }
  ]
}
```

### Points de focale

Mastodon supporte la définition d'un point de focale sur les images téléversées, pour que peu importe où l'image est affichée, le point de focale reste le même. Cette fonctionnalité est implémentée en utilisant une propriété supplémentaire nommée `focalPoint` sur les objets `Image`. La propriété consiste en un tableau de deux nombres flottants entre 0 et 1. Par exemple :

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
        
    {
      "toot": "http://joinmastodon.org/ns#",
      "focalPoint": {
        "@container": "@list",
        "@id": "toot:focalPoint"
      }
    }
  ],

  "id": "https://exemple.fr/@alice/hello-world",
  "type": "Note",
  "content": "Une image est jointe à ce toot !",
  "attachment": [
    {
      "type": "Image",
      "mediaType": "image/png",
      "url": "https://exemple.fr/files/cats.png",
      "focalPoint": [
        0.55,
        0.43
      ]
    }
  ]
}
```
