---
title: Vue d'ensemble
description: Comment mettre en place un environnement de développement pour Mastodon
menu:
  docs:
    parent: development
    weight: 1
---

Mastodon est une application **Ruby on Rails** avec un front-end **React.js**. Il suit les standards utilisées par ces frameworks, si vous êtes déjà familier·ère avec Rails ou React.js, vous n'aurez pas de mauvaises surprises.

Le meilleur moyen de faire fonctionner Mastodon dans un environnement de développement est d'installer toutes les dépendances sur votre système, au lieu d'utiliser Docker ou Vagrant. Vous aurez besoin de Ruby, Node.js, PostgreSQL et Redis, ce qui est un set de dépendances relativement standard pour les applications Rails.

## Environnements

Un "environnement" est un set de valeurs de configuration destinés à un usage spécifique. Ces environnements sont : `development`, dans lequel vous modifiez du code ; `test`, dans lequel vous exécutez la suite automatisée de tests ; `staging`, qui permet de simuler en conditions quasi réelles ce qui serait utilisé par les utilisateur·ice·s ; et `production`, qui est destiné à être utilisé par le grand public. Mastodon fournit des configurations pour `development`, `test` et `production`.

La valeur par défaut de la variable `RAILS_ENV` est `development`, vous n'avez donc rien à faire pour exécuter Mastodon en mode développement. En fait, la configuration de Mastodon a des valeurs par défaut adaptées pour l'environnement de développement, vous n'avez donc pas besoin d'un fichier `.env` sauf si vous voulez customiser certaines choses. Voici les différences entre un environnement de développement et un environnement de production :

- Le code Ruby se recharge de lui-même quand vous le modifiez, ce qui signifie que vous n'avez pas besoin de redémarrer le serveur Rails pour voir vos changements
- Toutes les erreurs montrent les stack traces dans le navigateur, à la place d'une page d'erreur générique
- Webpack fonctionne sans interruption et recompile les ressources JS et CSS quand vous modifiez n'importe quel fichier front-end, et les pages se rechargent automatiquement
- La mise en cache est désactivée par défaut
- Un compte administrateur avec comme identifiant `admin@localhost:3000` et le mot de passe `mastodonadmin` est créé automatiquement durant l'exécution de la tâche `db:seed`

Il est à noter que la configuration Docker fournie avec Mastodon est optimisée pour l'environnement de production, et que c'est donc très déconseillé pour une utilisation dans le but de faire du développement. La configuration Vagrant, en revanche, est faite spécialement pour le développement et non pour un usage en production.

## Mise en place

Après avoir cloné le projet et vous être placé dans le répertoire fraîchement créé, exécutez `bundle install` puis `yarn install`.

Dans l'environnement de développement, Mastodon se connectera à PostgreSQL sous le nom de l'utilisateur Linux actuellement utilisé en employant la méthode `ident`, qui fonctionne directement dans la plupart des cas. La seule commande que vous avez à exécuter est `rails db:setup` qui va créer les bases de données `mastodon_development` et `mastodon_test`, charger le schéma associé, puis créer les données de bases pour `mastodon_development` qui sont définies dans le fichier `db/seed.rb`. Les seules données de bases sont le compte administrateur avec les identifiants `admin@localhost:3000` / `mastodonadmin`.

> Gardez à l'esprit que par défaut, Mastodon sera accessible depuis le port 3000. Si vous choisissez un port différent, le compte administrateur généré utilisera ce nombre.

## Exécution

Il y a plusieurs processus qui doivent être démarrés pour profiter de toutes les fonctionnalités de Mastodon, mais on peut décider de ne pas en démarrer certains au cas par cas. Pour les démarrer tous en une seule commande, vous pouvez installer Foreman avec `gem install foreman --no-document` puis utiliser :

    foreman start

dans le répertoire contenant Mastodon. Cela va démarrer les processus inscrits dans le fichier `Procfile.dev`, ce qui vous donnera : un serveur Rails, un serveur Webpack, l'API de streaming, et Sidekiq. Bien sûr, vous pouvez démarrer n'importe lequel de ces processus indépendamment en fonction de vos besoins.

## Tests

|Commande|Description|
|-------|-----------|
|`rspec`|Exécute la suite de tests Ruby|
|`yarn run test`|Exécute la suite de tests JavaScript|
|`rubocop`|Vérifie si le code Ruby est en conformité avec notre style de programmation|

## Les bibliothèques logicielles les plus utilisées

La connaissance et la compréhension de ces bibliothèques simplifiera le travail sur le code source de Mastodon.

### Ruby

- `haml`, un langage pour créer des templates
- `devise`, pour l'authentification
- `doorkeeper`, qui agit comme un fournisseur OAuth 2
- `paperclip`, pour l'envoi de fichiers et de pièces jointes
- `sidekiq`, pour les tâches de fond

### JavaScript

- `immutable`, pour les structures de données immuables
- `react`, pour effectuer le rendu de l'application web dynamique
- `react-redux`, pour gérer l'état de React
- `react-router-dom`, pour la navigation dans React
- `react-intl`, pour les traductions dans React

## Structure du code

Ce qui suit n'a pas vocation à faire autorité ou à être exhaustif, mais plus à être une aide pour vous aider à vous retrouver dans l'application.

### Ruby

|Chemin |Description|
|----|-----------|
|`app/controllers`|Code qui relie les opérations aux templates|
|`app/helpers`|Code qui peut être récupéré depuis les vues, c-à-d les opérations banales|
|`app/lib`|Code qui ne rentre pas dans les autres catégories|
|`app/models`|Code qui représente des entités de données|
|`app/serializers`|Code qui génère du JSON à partir de modèles|
|`app/services`|Opérations complexes qui impliquent plusieurs modèles|
|`app/views`|Les templates pour générer des fichiers HTML ou autre|
|`app/workers`|Code qui s'exécute en dehors du cycle "requête-réponse"|
|`spec`|Les suites automatisées de tests|

### JavaScript

|Chemin|Description|
|----|-----------|
|`app/javascript/mastodon`|Code pour l'application React.js multi-colonnes |
|`app/javascript/packs`|Code pour les pages non-React.js|

### CSS et autres ressources

|Chemin|Description|
|----|-----------|
|`app/javascript/images`|Images|
|`app/javascript/styles`|Code qui se transforme en CSS via Sass|

### Traductions

|Chemin|Description|
|----|-----------|
|`config/locales`|Fichiers de traductions côté serveur au format YML|
|`app/javascript/mastodon/locales`|Fichiers de traductions côté client au format JSON|

## Maintenance des traductions

Tous les fichiers de traduction sont normalisés pour assurer un formatage et un ordre des valeurs constant, ce qui minimise les différences dans Git.

|Commande|Description|
|-------|-----------|
|`i18n-tasks normalize`|Normalise les traductions côté serveur|
|`yarn run manage:translations`|Normalise les traductions côté client|
