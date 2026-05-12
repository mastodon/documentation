---
title: CollectionsWithAccountPreviews
description: A list of Collections with partial account data 
menu:
  docs:
    parent: entities
aliases: [
  "/entities/collectionswithaccountpreviews",
  "/entities/CollectionsWithAccountPreviews",
  "/api/entities/collectionswithaccountpreviews",
  "/api/entities/CollectionsWithAccountPreviews",
]
---

## Example

```json
{
  "collections": [
    {
      "id": "116131056935959117",
      "account_id": "113668893442515793",
      "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
      "url": "https://example.com/collections/116131056935959117",
      "name": "Excellent people",
      // ... full Collection entity
    },
    {
      "id": "116131351935851219",
      "account_id": "114182813422535512",
      "uri": "https://example.com/ap/114182813422535512/collections/116131351935851219",
      "url": "https://example.com/collections/116131351935851219",
      "name": "Film photographers",
      // ... full Collection entity
    }
  ],
  "partial_accounts": [
    {
      "id": "113668893442515793",
      // ... `PartialAccountWithAvatar` entity for the owner of the first collection
    },
    {
      "id": "114182813422535512",
      // ... `PartialAccountWithAvatar` entity for the owner of the second collection
    {
      "id": "112658193342215767",
      // ... `PartialAccountWithAvatar` entity for the first item in the first collection
    },
    // ...
  ],
}
```

## Attributes

### `collections` {#collections}

**Description:** A list of Collections.\
**Type:** Array of [Collection]({{< relref "entities/Collection" >}})\
**Version history:**\
4.6.0 - added

### `partial_accounts` {#partial_accounts}

**Description:** Partial account data for all owners of the Collections and a maximum of four entries per Collection, without duplicates.\
**Type:** Array of [PartialAccountWithAvatar]({{< relref "entities/Account#PartialAccountWithAvatar" >}})\
**Version history:**\
4.6.0 - added

## See also

{{< page-relref ref="entities/Collection" caption="Collection entity" >}}
{{< page-relref ref="entities/Account#PartialAccountWithAvatar" caption="PartialAccountWithAvatar entity" >}}
<!-- {{/*< page-relref ref="methods/collections" caption="collections API methods" >*/}} -->

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/collections_with_account_previews_serializer.rb" caption="app/serializers/rest/collections_with_account_previews_serializer.rb" >}}
