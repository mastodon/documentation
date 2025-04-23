---
title: ShallowQuote
description: Represents a user-defined filter for determining which statuses should not be shown to the user.
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
  "status_id": "103270115826048975"
}
```

## Attributes

### `state` {#state}

**Description:** The state of the quote.\
**Type:** String (Enumerable, oneOf)\
`pending` = The quote has not been acknowledged by the quoted account yet, and requires authorization before being displayed.\
`accepted` = The quote has been accepted and can be displayed. This is the only case where `status_id` is non-null.\
`rejected` = The quote has been explicitly rejected by the quoted account, and cannot be displayed.\
`revoked` = The quote has been previously accepted, but is now revoked, and thus cannot be displayed.\
`deleted` = The quote has been approved, but the quoted post itself has now been deleted.\
`unauthorized` = The quote has been approved, but cannot be displayed because the user is not authorized to see it.
**Version history:**\
4.4.0 - added

### `status_id` {#status_id}

**Description:** The identifier of the status being quoted, if the quote has been accepted. This will be `null`, unless the `state` attribute is `accepted`.\
**Type:** {{<nullable>}} String (cast from an integer but not guaranteed to be a number) or null\
**Version history:**\
4.4.0 - added

## See also

{{< page-relref ref="entities/quote" caption="Quote" >}}
{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/shallow_quote_serializer.rb" caption="app/serializers/rest/shallow_quote_serializer.rb" >}}
