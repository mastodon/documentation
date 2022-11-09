---
title: Admin::EmailDomainBlock
description: Represents an email domain that cannot be used to sign up.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-emaildomainblock",
  "/entities/Admin-EmailDomainBlock",
  "/entities/admin_emaildomainblock",
  "/entities/Admin_EmailDomainBlock",
  "/api/entities/admin-emaildomainblock",
  "/api/entities/Admin-EmailDomainBlock",
  "/api/entities/admin_emaildomainblock",
  "/api/entities/Admin_EmailDomainBlock",
]
---

{{< hint style="danger" >}}
This page is under construction.
{{< /hint >}}

## Example

<!-- TODO: sample response -->

```json

```

## Attributes

### `id` {#id}

**Description:** The ID of the DomainBlock in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.0.0 - added

### `domain` {#domain}

**Description:** The domain that is not allowed to federate.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `created_at` {#created_at}

**Description:** When the domain was allowed to federate.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
4.0.0 - added

### `history` {#history}
<!-- TODO: -->
**Description:** \
**Type:** \
**Version history:**\
4.0.0 - added

## See also

{{< page-relref page="methods/admin/email_domain_blocks" caption="admin/email_domain_blocks API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/email_domain_blocks_serializer.rb" caption="app/serializers/rest/admin/email_domain_blocks_serializer.rb" >}}