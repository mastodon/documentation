---
title: Collection
description: Represents a curated collection of accounts that a user recommends others to follow.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/collection",
  "/entities/Collection",
  "/entities/wrappedcollection",
  "/entities/WrappedCollection",
  "/api/entities/collection",
  "/api/entities/Collection",
  "/api/entities/wrappedcollection",
  "/api/entities/WrappedCollection",
]
---

## Example

```json
{
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
```

## Attributes

### `id` {#id}

**Description:** The collection id.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.6.0 - added

### `account_id` {#account_id}

**Description:** The id of the account that curates this Collection.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
4.6.0 - added

### `uri` {#uri}

**Description:** The Collection's ActivityPub identifier (used for federation).\
**Type:** String (URL)\
**Version history:**\
4.6.0 - added

### `url` {#url}

**Description:** The url of the Collection's HTML page (web interface URL).\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.6.0 - added

### `name` {#name}

**Description:** The name of the Collection.\
**Type:** String\
**Version history:**\
4.6.0 - added

### `description` {#description}

**Description:** An optional description of the Collection.\
**Type:** String (HTML)\
**Version history:**\
4.6.0 - added

### `language` {#language}

**Description:** Primary language of this Collection.\
**Type:** {{<nullable>}} String (ISO 639-1 two-letter language code) or null\
**Version history:**\
4.6.0 - added

### `local` {#local}

**Description:** Whether the Collection was created on this server or resides on a remote server.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `sensitive` {#sensitive}

**Description:** Whether the Collection has been marked as including sensitive content.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `discoverable` {#discoverable}

**Description:** Whether the Collection should show up on the owner's profile, in search results and recommendations.\
**Type:** Boolean\
**Version history:**\
4.6.0 - added

### `tag` {#tag}

**Description:** A single hashtag that describes this Collection.\
**Type:** {{<nullable>}} [ShallowTag]({{< relref "entities/ShallowTag" >}})\
**Version history:**\
4.6.0 - added

### `created_at` {#created_at}

**Description:** When the Collection was created.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
4.6.0 - added

### `updated_at` {#updated_at}

**Description:** When the Collection was last updated.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
4.6.0 - added

### `item_count` {#item_count}

**Description:** The number of items in this Collection.\
**Type:** Integer\
**Version history:**\
4.6.0 - added

### `items` {#items}

**Description:** The items in this Collection.\
**Type:** Array of [CollectionItem]({{< relref "entities/CollectionItem" >}})\
**Version history:**\
4.6.0 - added

## WrappedCollection entity {#WrappedCollection}

This is a regular [Collection]({{< relref "entities/Collection" >}}) in a wrapper object to make it extensible, consistent with [CollectionWithAccounts]({{< relref "entities/CollectionWithAccounts" >}}) and other parts of the API.

### Example

```json
{
  "collection": {
    "id": "116131056935959117",
    "account_id": "113668893442515793",
    "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
    "url": "https://example.com/collections/116131056935959117",
    "name": "Excellent people",
    // ...
  }
}
```

### `collection` {#collection}

**Description:** The actual Collection.\
**Type:** [Collection]({{< relref "entities/Collection" >}})\
**Version history:**\
4.6.0 - added

## Collections entity {#Collections}

This wraps a list of [Collection]({{< relref "entities/Collection" >}}) entities in an object to make it extensible and more consistent with other parts of the API.

### Example

```json
{
  "collections": [
    {
      "id": "116131056935959117",
      "account_id": "113668893442515793",
      "uri": "https://example.com/ap/113668893442515793/collections/116131056935959117",
      "url": "https://example.com/collections/116131056935959117",
      "name": "Excellent people",
      // ...
    },
    // ...
  ]
}
```

### `collections` {#collections}

**Description:**  A list of Collections.\
**Type:** Array of [Collection]({{< relref "entities/Collection" >}})\
**Version history:**\
4.6.0 - added

## See also

{{< page-relref ref="methods/collections" caption="collections API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/collection_serializer.rb" caption="app/serializers/rest/collection_serializer.rb" >}}
