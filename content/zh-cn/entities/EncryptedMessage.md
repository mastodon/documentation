---
title: EncryptedMessage
description: 表示一条加密消息。
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
此实体当前未使用。
{{</hint>}}

## 示例

```json
```

## 属性

### `id` {#id}

**描述:** EncryptedMessage 在数据库中的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证是数字)\
**版本历史:**\
3.2.0 - 添加

### `account_id` {#account_id}

**描述:** 发送此消息的 Account 的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证是数字)\
**版本历史:**\
3.2.0 - 添加

### `device_id` {#device_id}

**描述:** 发送此消息的 Device 的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证是数字)\
**版本历史:**\
3.2.0 - 添加

### `type` {#type}

**描述:** 消息是预共享密钥消息（用于建立新会话）还是正常加密消息（现有会话的一部分）。\
**类型:** 字符串 (枚举类型, oneOf)\
`0` = 预共享密钥消息（用于建立新会话）\
`1` = 正常加密消息（现有会话的一部分）\
**版本历史:**\
3.2.0 - 添加

### `body` {#body}

**描述:** 加密的消息内容。\
**类型:** 字符串\
**版本历史:**\
3.2.0 - 添加

### `digest` {#digest}

**描述:** 消息的 HMAC SHA-256 摘要哈希值。\
**类型:** 字符串 (SHA256)\
**版本历史:**\
3.2.0 - 添加

### `message_franking` {#message_franking}

**描述:** 一个签名值，用于举报消息正文的内容。\
**类型:** 字符串\
**版本历史:**\
3.2.0 - 添加

### `created_at` {#created_at}

**描述:** 消息创建的时间戳。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
3.2.0 - 添加

## 参见

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/encrypted_message_serializer.rb" caption="app/serializers/rest/encrypted_message_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/pull/13820" caption="添加端到端加密 API (#13820)" >}}

{{< translation-status-zh-cn raw_title="EncryptedMessage" raw_link="/entities/EncryptedMessage/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
