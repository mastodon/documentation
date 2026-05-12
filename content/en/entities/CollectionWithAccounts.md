---
title: CollectionWithAccounts
description: A curated Collection of accounts that a user recommends others to follow plus the full account data
menu:
  docs:
    parent: entities
aliases: [
  "/entities/collectionwithaccounts",
  "/entities/CollectionWithAccounts",
  "/api/entities/collectionwithaccounts",
  "/api/entities/CollectionWithAccounts",
]
---

## Example

```json
{
  "accounts": [
    {
      "id": "113668893442515793",
      // ... Full `Account` entity for the collection owner
    },
    {
      "id": "112658193342215767",
      // ... Full `Account` entity for the first item in the collection
    },
    {
      "id": "117628196343117789",
      // ... Full `Account` entity for the second item in the collection
    }
  ],
  "collection": {
    "id": "116131056935959117",
    "account_id": "113668893442515793",
    "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
    "url": "https://example.com/collections/116131056935959117",
    "name": "Excellent people",
    "description": "Well worth following",
    "language": "en",
    "local": true,
    "sensitive": false,
    "discoverable": true,
    "tag": {
      "name": "discovery",
      "url": "https://example.com/tags/discovery"
    },
    "item_count": 2,
    "items": [
      {
        "id": "116141056635954112",
        "account_id": "112658193342215767",
        "state": "accepted",
        "created_at": "2026-02-25T11:35:01.394Z"
      },
      {
        "id": "116141051635254139",
        "account_id": "117628196343117789",
        "state": "pending",
        "created_at": "2026-02-25T11:35:01.394Z"
      }
    ],
    "created_at": "2026-02-25T11:35:01.394Z",
    "updated_at": "2026-02-25T11:37:38.182Z"
  }
}
```

## Attributes

### `accounts` {#account_id}

**Description:** Full account entities for the owner of the Collection and every account within the Collection.\
**Type:** Array of [Account]({{< relref "entities/Account" >}})\
**Version history:**\
4.6.0 - added

### `collection` {#collection}

**Description:** The actual Collection.\
**Type:** [Collection]({{< relref "entities/Collection" >}})\
**Version history:**\
4.6.0 - added


## See also

{{< page-relref ref="entities/Collection" caption="Collection entity" >}}
{{< page-relref ref="entities/Account" caption="Account entity" >}}
<!-- {{/*< page-relref ref="methods/collections" caption="collections API methods" >*/}} -->

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/collection_with_accounts_serializer.rb" caption="app/serializers/rest/collection_with_accounts_serializer.rb" >}}
