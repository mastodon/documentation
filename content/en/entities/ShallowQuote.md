---
title: ShallowQuote
description: Represents a quote or a quote placeholder, with the current authorization status.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/shallow_quote",
]
---

## Example

```json
{
  "state": "accepted",
  "quoted_status_id": "103270115826048975"
}
```

## Attributes

### `state` {#state}

**Description:** The state of the quote. Unknown values should be treated as `unauthorized`.\
**Type:** String (Enumerable, oneOf)\
`pending` = The quote has not been acknowledged by the quoted account yet, and requires authorization before being displayed.\
`accepted` = The quote has been accepted and can be displayed. This is one of the few cases where `quoted_status_id` is non-null.\
`rejected` = The quote has been explicitly rejected by the quoted account, and cannot be displayed.\
`revoked` = The quote has been previously accepted, but is now revoked, and thus cannot be displayed.\
`deleted` = The quote has been approved, but the quoted post itself has now been deleted.\
`unauthorized` = The quote has been approved, but cannot be displayed because the user is not authorized to see it.\
`blocked_account` = The quote has been approved, but should not be displayed because the user has blocked the account being quoted. This is one of the few cases where `quoted_status_id` is non-null.\
`blocked_domain` = The quote has been approved, but should not be displayed because the user has blocked the domain of the account being quoted. This is one of the few cases where `quoted_status_id` is non-null.\
`muted_account` = The quote has been approved, but should not be displayed because the user has muted the account being quoted. This is one of the few cases where `quoted_status_id` is non-null.
**Version history:**\
4.4.0 - added\
4.5.0 - added `blocked_account`, `blocked_domain` and `muted_account`

### `quoted_status_id` {#quoted_status_id}

**Description:** The identifier of the status being quoted. This will be `null`, unless the `state` attribute is one of `accepted`, `blocked_account`, `blocked_domain` or `muted_account`.\
**Type:** {{<nullable>}} String (cast from an integer but not guaranteed to be a number) or null\
**Version history:**\
4.4.0 - added

## See also

{{< page-relref ref="entities/quote" caption="Quote" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/shallow_quote_serializer.rb" caption="app/serializers/rest/shallow_quote_serializer.rb" >}}
