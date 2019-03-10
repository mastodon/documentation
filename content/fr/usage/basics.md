---
title: Les bases
description: Aperçu des fonctions de base de Mastodon
menu:
  docs:
    parent: usage
    weight: 1
---
## Inscription

Vous devez choisir une instance sur laquelle s'inscrire, comme vous choisiriez un fournisseur d'adresse e-mail ou un royaume pour votre personnage dans World of Warcraft. L'instance hébergera votre compte et votre timeline.

Vous pouvez [parcourir une liste d'instance par catégorie et langue sur joinmastodon.org](https://joinmastodon.org/#getting-started).

## Modifier son profil
### Image, nom et biographie

- Vous pouvez téléverser une photo de profil
- Vous pouvez téléverser une bannière pour votre profil
- Vous pouvez définir un nom d'usage différent de votre nom d'utilisateur
- Vous pouvez vous présenter dans votre biographie
- Vous pouvez mentionner des gens et utiliser des hashtags ainsi que des émojis personnalisés dans votre biographie

### Les méta-données du profil

Les méta-données du profil sont un moyen d'ajouter des infos supplémentaires sur votre profil qui sera plus facile à lire. Vous disposez de 4 rangées dans lesquelles vous pouvez définir une étiquette et sa valeur. Par exemple :

|Étiquette|Valeur|
|-----|-------|
|Âge|25|
|Pays|Allemagne|
|Pronoms|il/lui|

C'est vous qui décidez de ce que vous mettez dedans. Les étiquettes et les valeurs peuvent contenir des @mentions, des #hashtags, des émojis personnalisés et des liens.

### Vérification de lien

Si vous mettez un lien dans les méta-données de votre profil, Mastodon vérifiera si le lien contient une indication renvoyant à votre profil Mastodon. Si c'est le cas, vous obtiendrez une coche à côté du lien, puisque vous avez prouvé que le lien vous appartient.

En coulisses, Mastodon cherche l'attribut `rel="me"` dans la page. Mastodon met également `rel="me"` dans les liens affichés dans les méta-données de profil.

## Envoyer un post
### Texte

- Vous disposez de 500 caractères
- Vous pouvez mentionner d'autres personnes comme `@alice` ou `@alice@exemple.fr`
- Quand vous mentionnez d'autres personnes, la partie `exemple.fr` du nom d'utilisateur n'est pas affichée dans le message final
- Si vous postez des liens, ils doivent commencer par `http://` ou `https://`
- Quand vous postez un ou plusieurs lien(s), ils compteront tous pour 23 caractères, peu importe la longueur du lien
- Vous pouvez utiliser des hashtags comme `#exemple` pour que les autres puissent trouver votre post via ce tag
- Vous pouvez ajouter un avertissement de contenu à votre post
- L'avertissement de contenu est en texte basique. Il ne peut contenir de mentions, de hashtags ou de liens.

### Médias

- Vous pouvez téléverser des images au format PNG et JPG
- Les GIFs téléversés sont convertis en vidéos sans son au format MP4, comme sur Imgur/Gfycat (GIFV)
- Vous pouvez également téléverser directement des MP4 ou WebM sans son (GIFV)
- Vous pouvez téléverser des vidéos au format MP4, WebM ou MOV
- La taille limite des images téléversées est de 8 Mo
- La taille limite des vidéos téléversées est de 40 Mo
- Les images plus grandes que 1280x1280 pixels sont rétrécies
- Tous les médias d'un post peuvent être cachés derrière un spoiler

### Émojis personnalisés

- Chaque serveur offre un set d’émojis personnalisés à utiliser, comme sur Discord
- Vous pouvez utiliser un émoji en appelant son code, comme `:thounking:`
