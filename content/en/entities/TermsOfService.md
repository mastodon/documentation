---
title: TermsOfService
description: Represents the terms of service of the instance.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/termsofservice",
  "/entities/TermsOfService",
  "/api/entities/termsofservice",
  "/api/entities/TermsOfService",
]
---

## Example

```json
{
  "effective_date": "2025-04-15",
  "effective": true,
  "content": "<p>Foo bar newer</p>\n",
  "succeeded_by": null
}
```

## Attributes

### `effective_date` {#effective_date}

**Description:** The date these terms of service are coming or have come in effect.\
**Type:** String ([Date](/api/datetime-format#date))\
**Version history:**\
4.4.0 - added

### `effective` {#effective}

**Description:** Whether these terms of service are currently in effect.\
**Type:** Boolean\
**Version history:**\
4.4.0 - added

### `content` {#content}

**Description:** The rendered HTML content of the terms of service.\
**Type:** String (HTML)\
**Version history:**\
4.4.0 - added

### `succeeded_by` {#succeeded_by}

**Description:** If there are newer terms of service, their effective date.\
**Type:** {{<nullable>}} String ([Date](/api/datetime-format#date))\
**Version history:**\
4.4.0 - added

## See also

{{< page-relref ref="methods/instance#terms_of_service" caption="GET /api/v1/instance/terms_of_service" >}}

{{< page-relref ref="methods/instance#terms_of_service_date" caption="GET /api/v1/instance/terms_of_service/:date" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/terms_of_service_serializer.rb" caption="app/serializers/rest/terms_of_service_serializer.rb" >}}
