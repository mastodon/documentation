---
title: Code structure
description: Where to find certain parts of the codebase.
menu:
  docs:
    weight: 30
    parent: dev
---

### Code structure {#structure}

The following overview should not be seen as complete or authoritative but as a rough guidance to help you find your way in the application.

#### Ruby {#ruby}

`app/controllers`
: Code that binds business logic to templates

`app/helpers`
: Code that can be used from views, i.e. common operations

`app/lib`
: Code that doesn’t fit in the other categories

`app/models`
: Representation of data entities and their associated methods

`app/policies`
: Permission checks and other validations, before calling related methods

`app/serializers`
: Code that generates JSON from models

`app/services`
: Complex logical operations involving multiple models

`app/views`
: Templates for generating HTML or other output

`app/workers`
: Code that executes outside the request-response cycle

`spec`
: Automated test suite

#### JavaScript {#javascript}

`app/javascript/mastodon`
: Code for the frontend React.js application

`app/javascript/packs`
: Code for non-React.js pages

#### CSS and other assets {#assets}

`app/javascript/images`
: Images

`app/javascript/styles`
: Code that turns into CSS via Sass

#### Localizations {#localizations}

`config/locales`
: Server-side localizations in the YML format

`app/javascript/mastodon/locales`
: Client-side localizations in the JSON format

All locale files are normalized to ensure consistent formatting and key order, which minimizes changesets in version control.

- Run `bundle exec i18n-tasks normalize` to normalize server-side translations
- Run `yarn run i18n:extract` to extract and normalize client-side translations into `en.json`
