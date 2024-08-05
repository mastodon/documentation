---
title: DomainBlock
description: Represents a domain that is blocked by the instance.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/domainblock",
  "/entities/DomainBlock",
  "/api/entities/domainblock",
  "/api/entities/DomainBlock",
]
---

## Example

```json
{
  "domain":"daji******.com",
  "digest":"3752f63a7079d60c2de5dceb8bd7608e86a15544eb78a494a482041c3684b37f",
  "severity":"suspend",
  "comment":"Inappropriate content"
}
```

## Attributes

### `domain` {#domain}

**Description:** The domain which is blocked. This may be obfuscated or partially censored.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `digest` {#digest}

**Description:** The SHA256 hash digest of the domain string.\
**Type:** String (SHA256)\
**Version history:**\
4.0.0 - added

### `severity` {#severity}

**Description:** The level to which the domain is blocked.\
**Type:** String (Enumerable, oneOf)\
`silence` = Users from this domain will be hidden from timelines, threads, and notifications (unless you follow the user).\
`suspend` = Incoming messages from this domain will be rejected and dropped entirely.\
**Version history:**\
4.0.0 - added

### `comment` {{%optional%}} {#comment}

**Description:** An optional reason for the domain block.\
**Type:** String\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/instance#domain_blocks" caption="GET /api/v1/instance/domain_blocks" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/domain_block_serializer.rb" caption="app/serializers/rest/domain_block_serializer.rb" >}}
