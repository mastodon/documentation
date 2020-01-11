---
title: Code structure
menu:
  docs:
    weight: 30
    parent: dev
---

{{< hint style="danger" >}}
This page is under construction.
{{< /hint >}}

### Code structure {#structure"}

The following overview should not be seen as complete or authoritative, but as a rough guidance to help you find your way in the application.

#### Ruby {#ruby"}

| Path | Description |
| :--- | :--- |
| `app/controllers` | Code that binds business logic to templates |
| `app/helpers` | Code that can be used from views, i.e. common operations |
| `app/lib` | Code that doesn’t fit in the other categories |
| `app/models` | Code that represents data entities |
| `app/serializers` | Code that generates JSON from models |
| `app/services` | Complex logical operations involving multiple models |
| `app/views` | Templates for generating HTML or other output |
| `app/workers` | Code that executes outside the request-response cycle |
| `spec` | Automated test suite |

#### JavaScript {#javascript"}

| Path | Description |
| :--- | :--- |
| `app/javascript/mastodon` | Code for the multi-column React.js application |
| `app/javascript/packs` | Code for non-React.js pages |

#### CSS and other assets {#assets"}

| Path | Description |
| :--- | :--- |
| `app/javascript/images` | Images |
| `app/javascript/styles` | Code that turns into CSS via Sass |

#### Localizations {#localizations"}

| Path | Description |
| :--- | :--- |
| `config/locales` | Server-side localizations in the YML format |
| `app/javascript/mastodon/locales` | Client-side localizations in the JSON format |

### Localization maintenance {#localization-maintenance"}

All locale files are normalized to ensure consistent formatting and key order, which minimizes changesets in version control.

| Command | Description |
| :--- | :--- |
| `i18n-tasks normalize` | Normalize server-side translations |
| `yarn run manage:translations` | Normalize client-side translations |

