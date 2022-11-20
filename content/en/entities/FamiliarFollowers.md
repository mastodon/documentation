---
title: FamiliarFollowers
description: Represents a subset of your follows who also follow some other user.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/familiarfollowers",
  "/entities/FamiliarFollowers",
  "/api/entities/familiarfollowers",
  "/api/entities/FamiliarFollowers",
]
---

## Example

```json
[
  {
    "id":"1",
    "accounts":[
      {
        "id":"1087990",
        "username":"moss",
        "acct":"moss@goblin.camp",
        // ...
      },
      {
        "id":"1092723",
        "username":"vivianrose",
        "acct":"vivianrose",
        // ...
      },
      // ...
    ]
  },
  {
    "id":"2",
    "accounts":[]
  }
]
```

## Attributes

### `id` {#id}

**Description:** The ID of the Account in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
3.5.0 - added

### `accounts` {#accounts}

**Description:** Accounts you follow that also follow this account.\
**Type:** Array of [Account]({{< relref "entities/Account" >}})\
**Version history:**\
3.5.0 - added

## See also

{{< page-relref ref="methods/accounts#familiar_followers" caption="GET /api/v1/accounts/:id/familiar_followers" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/familiar_followers_serializer.rb" caption="app/serializers/rest/familiar_followers_serializer.rb" >}}