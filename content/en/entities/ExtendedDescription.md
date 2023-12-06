---
title: ExtendedDescription
description: Represents an extended description for the instance, to be shown on its about page.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/extendeddescription",
  "/entities/ExtendedDescription",
  "/api/entities/extendeddescription",
  "/api/entities/ExtendedDescription",
]
---

## Example

```json
{
  "updated_at":"2022-11-03T04:09:07Z",
  "content":"<p>For inquiries not related specifically to the operation of this server, such as press inquiries, please contact <a href=\"mailto:press@joinmastodon.org\">press@joinmastodon.org</a>.</p>\n\n<h2>Funding</h2>\n\n<p>This server is crowdfunded by <a href=\"https://patreon.com/mastodon\">Patreon donations</a>. For a list of sponsors, see <a href=\"https://joinmastodon.org/sponsors\">joinmastodon.org</a>.</p>\n\n<h2>Reporting and moderation</h2>\n\n<p>When reporting accounts, please make sure to include at least a few posts that show rule-breaking behaviour, when applicable. If there is any additional context that might help make a decision, please also include it in the comment. This is especially important when the content is in a language nobody on the moderation team speaks.</p>\n\n<p>We usually handle reports within 24 hours. Please mind that you are not notified when a report you have made has led to a punitive action, and that not all punitive actions are externally visible. For first time offenses, we may opt to delete offending content, escalating to harsher measures on repeat offenses.</p>\n\n<h2>Impressum</h2>\n\n<p>Mastodon gGmbH<br>\nMühlenstraße 8a<br>\n14167 Berlin<br>\nGermany</p>\n\n<p>E-Mail-Adresse: hello@joinmastodon.org</p>\n\n<p>Vertretungsberechtigt: Eugen Rochko (Geschäftsführer)</p>\n\n<p>Umsatzsteuer Identifikationsnummer (USt-ID): DE344258260</p>\n\n<p>Handelsregister<br>\nGeführt bei: Amtsgericht Charlottenburg<br>\nNummer: HRB 230086 B</p>\n"
}
```

## Attributes

### `updated_at` {#updated_at}

**Description:** A timestamp of when the extended description was last updated.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

### `content` {#content}

**Description:** The rendered HTML content of the extended description.\
**Type:** String (HTML)\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/instance#extended_description" caption="GET /api/v1/instance/extended_description" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/extended_description_serializer.rb" caption="app/serializers/rest/extended_description_serializer.rb" >}}