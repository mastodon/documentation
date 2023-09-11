---
title: conversations API methods
description: >-
  Direct conversations with other participants. (Currently, just threads
  containing a post with "direct" visibility.)
menu:
  docs:
    weight: 10
    name: conversations
    parent: methods-timelines
    identifier: methods-conversations
aliases: [
  "/methods/conversations",
  "/api/methods/conversations",
  "/methods/timelines/conversations",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View all conversations {#get}

```http
GET /api/v1/conversations HTTP/1.1
```

**Returns:** Array of [Conversation]({{< relref "entities/conversation" >}})\
**OAuth:** User token + `read:statuses`\
**Version history:**\
2.6.0 - added\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

min_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 20 conversations. Max 40 conversations.

#### Response

##### 200: OK

Truncated sample results of an API call with limit=2

```json
[
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
  },
  {
    "id": "418374",
    "unread": false,
    "accounts": [
      {
        "id": "464472",
        "username": "freon",
        "acct": "freon@letsalllovela.in",
        // ...
      }
    ],
    "last_status": {
      "id": "103195253010396431",
      "created_at": "2019-11-24T22:29:56.331Z",
      "in_reply_to_id": "103195239650546339",
      "in_reply_to_account_id": "14715",
      // ...
    }
  }
]
```

Because AccountConversation IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/conversations?limit=2&max_id=108835003356700379>; rel="next", <https://mastodon.example/api/v1/conversations?limit=2&min_id=108888782724768580>; rel="prev"
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Remove a conversation {#delete}

```http
DELETE /api/v1/conversations/:id HTTP/1.1
```

Removes a conversation from your list of conversations.

**Returns:** Empty\
**OAuth:** User token + `write:conversations`\
**Version history:**\
2.6.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Conversation in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

The conversation does not exist, or is not owned by you.

```json
{
  "error": "Record not found"
}
```

---

## Mark a conversation as read {#read}

```http
POST /api/v1/conversations/:id/read HTTP/1.1
```

**Returns:** [Conversation]({{< relref "entities/conversation" >}})\
**OAuth:** User token + `write:conversations`\
**Version history:**\
2.6.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Conversation in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The value of `unread` has been changed to false.

```json
{
  "id": "418450",
  "unread": false,
  "accounts": [
    {
      "id": "482403",
      // ...
    }
  ],
  "last_status": {
    "id": "103196583826321184",
    // ...
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

The conversation does not exist, or is not owned by you.

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/conversations_controller.rb" caption="app/controllers/api/v1/conversations_controller.rb" >}}