---
title: EncryptedMessage
description: Represents an encrypted message.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/encryptedmessage",
  "/entities/EncryptedMessage",
  "/entities/encryptedmessage",
  "/entities/EncryptedMessage",
]
draft: true
---

{{< hint style="info" >}}
This entity is currently unused.
{{</hint>}}

## Example

```json
```

## Attributes

### `id` {#id}

**Description:** The ID of the EncryptedMessage in the database.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
3.2.0 - added

### `account_id` {#account_id}

**Description:** The ID of the Account that sent this message.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
3.2.0 - added

### `device_id` {#device_id}

**Description:** The ID of the Device that sent this message.\
**Type:** String (cast from an integer, but not guaranteed to be a number)\
**Version history:**\
3.2.0 - added

### `type` {#type}

**Description:** Whether the message is a pre-key message (used to establish a new session) or a normally encrypted message (part of an existing session).\
**Type:** String (Enumerable, oneOf)\
`0` = Pre-key message (used to establish a new session)\
`1` = Normal encrypted message (part of an existing session)\
**Version history:**\
3.2.0 - added

### `body` {#body}

**Description:** The encrypted message content.\
**Type:** String\
**Version history:**\
3.2.0 - added

### `digest` {#digest}

**Description:** An HMAC SHA-256 digest hash of the message.\
**Type:** String (SHA256)\
**Version history:**\
3.2.0 - added

### `message_franking` {#message_franking}

**Description:** A signed value to be used when reporting the message body for its content.\
**Type:** String\
**Version history:**\
3.2.0 - added

### `created_at` {#created_at}

**Description:** A timestamp for when the message was created.\
**Type:** String (ISO 8601 Datetime)\
**Version history:**\
3.2.0 - added

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/encrypted_message_serializer.rb" caption="app/serializers/rest/encrypted_message_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/pull/13820" caption="Add end-to-end encryption API (#13820)" >}}

