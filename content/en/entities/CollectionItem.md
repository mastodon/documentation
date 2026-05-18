---
title: CollectionItem
description: Represents a single item in a Collection.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/collectionitem",
  "/entities/CollectionItem",
  "/api/entities/collectionitem",
  "/api/entities/CollectionItem",
]
---

## Example

```json
{
  "id": "116141056635954112",
  "account_id": "112658193342215767",
  "state": "accepted",
  "created_at": "2026-02-25T11:35:01.394Z"
}
```

## Attributes

### `id` {#id}

**Description:** The item id.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.6.0 - added

### `account_id` {#account_id}

**Description:** The id of the account this item represents.\
**Type:** {{<nullable>}} String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.6.0 - added

### `state` {#state}

**Description:** The current state of the item.\
**Type:** String (Enumerable, oneOf)\
`pending` = The account's consent to be added to this Collection could not yet be verified.\
`accepted` = The account has consented to be featured in this Collection.\
**Version history:**\
4.6.0 - added

### `created_at` {#created_at}

**Description:** When the item was added to the collection.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
4.6.0 - added

## WrappedCollectionItem entity {#WrappedCollectionItem}

This is a regular [CollectionItem]({{< relref "entities/CollectionItem" >}}) in a wrapper object to make it consistent with [CollectionWithAccounts]({{< relref "entities/CollectionWithAccounts" >}}) and other parts of the API. 

### Example

```json
{
  "collection_item": {
    "id": "116141056635954112",
    "account_id": "112658193342215767",
    "state": "accepted",
    "created_at": "2026-02-25T11:35:01.394Z"
  }
}
```

### `collection` {#collection}

**Description:** The actual Collection.\
**Type:** [Collection]({{< relref "entities/Collection" >}})\
**Version history:**\
4.6.0 - added


## See also

<!-- {{/*< page-relref ref="methods/collections" caption="collections API methods" >*/}} -->

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/collection_item_serializer.rb" caption="app/serializers/rest/collection_item_serializer.rb" >}}
