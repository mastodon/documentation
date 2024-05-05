---
title: Conversation
summary: Represents a conversation with "direct message" visibility.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/conversation",
	"/entities/Conversation",
  "/api/entities/conversation",
	"/api/entities/Conversation",
]
---

## Example

```json
{
  "id": "418450",
  "unread": true,
  "accounts": [
    {
      "id": "482403",
      "username": "amic",
      "acct": "amic@nulled.red",
      // ...
    }
  ],
  "last_status": {
    "id": "103196583826321184",
    "created_at": "2019-11-25T04:08:24.000Z",
    "in_reply_to_id": "103196540587943467",
    "in_reply_to_account_id": "14715",
    // ...
  }
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the conversation in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
2.6.0 - added

### `unread` {#unread}

**Description:** Is the conversation currently marked as unread?\
**Type:** Boolean\
**Version history:**\
2.6.0 - added

### `accounts` {#accounts}

**Description:** Participants in the conversation.\
**Type:** Array of [Account]({{< relref "entities/Account" >}})\
**Version history:**\
2.6.0 - added

### `last_status` {#last_status}

**Description:** The last status in the conversation.\
**Type:** {{<nullable>}} [Status]({{< relref "entities/Status" >}})\
**Version history:**\
2.6.0 - added

## See also

{{< page-relref ref="methods/conversations" caption="conversations API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/conversation_serializer.rb" caption="app/serializers/rest/conversation_serializer.rb" >}}





