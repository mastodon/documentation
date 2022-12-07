---
title: Suggestion
description: Represents a suggested account to follow and an associated reason for the suggestion.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/suggestion",
  "/entities/Suggestion",
  "/api/entities/suggestion",
  "/api/entities/Suggestion",
]
---

## Example

```json
{
  "source": "staff",
  "account": {
    "id": "109031732217496096",
    "username": "alice",
    "acct": "alice",
    // ...
  }
}
```

## Attributes

### `source` {#source}

**Description:** The reason this account is being suggested.\
**Type:** String (Enumerable oneOf)\
`staff` = This account was manually recommended by your administration team\
`past_interactions` = You have interacted with this account previously\
`global` = This account has many reblogs, favourites, and active local followers within the last 30 days\
**Version history:**\
3.4.0 - added

### `account` {#account}

**Description:** The account being recommended to follow.\
**Type:** [Account]({{< relref "entities/Account" >}})\
**Version history:**\
3.4.0 - added

## See also

{{< page-relref ref="methods/suggestions#v2" caption="GET /api/v2/suggestions" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/suggestion_serializer.rb" caption="app/serializers/rest/suggestion_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/account_suggestions.rb" caption="app/models/account_suggestions.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/account_suggestions/" caption="app/models/account_suggestions/" >}}

