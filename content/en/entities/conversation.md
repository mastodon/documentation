---
title: Conversation
description: Represents a conversation with "direct message" visibility.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "id": "418450",
  "unread": true,
  "accounts": [
    {
      "id": "482403",
      "username": "amic",
      "acct": "amic@nulled.red",
      ...
    }
  ],
  "last_status": {
    "id": "103196583826321184",
    "created_at": "2019-11-25T04:08:24.000Z",
    "in_reply_to_id": "103196540587943467",
    "in_reply_to_account_id": "14715",
    ...
  }
}
```

## Required attributes

### `id` {#id}

**Description:** Local database ID of the conversation.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:** Added in 2.6.0

### `accounts` {#accounts}

**Description:** Participants in the conversation.\
**Type:** Array of [Account](account.md)\
**Version history:** Added in 2.6.0

### `unread` {#unread}

**Description:** Is the conversation currently marked as unread?\
**Type:** Boolean\
**Version history:** Added in 2.6.0

## Optional attributes

### `last_status` {#last_status}

**Description:** The last status in the conversation, to be used for optional display.\
**Type:** [Status](status.md)\
**Version history:** Added in 2.6.0

## See also

{{< page-ref page="methods/timelines/conversations.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/conversation_serializer.rb" caption="app/serializers/rest/conversation\_serializer.rb" >}}





