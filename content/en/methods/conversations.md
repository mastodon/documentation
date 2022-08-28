---
title: conversations
description: >-
  Direct conversations with other participants. (Currently, just threads
  containing a post with "direct" visibility.)
menu:
  docs:
    weight: 10
    parent: methods-timelines
aliases: [/methods/timelines/conversations/]
---

## View all conversations

```http
GET https://mastodon.example/api/v1/conversations HTTP/1.1
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
: String. Maximum number of results to return. Defaults to 20. Max 40.

#### Response

##### 200: Success

Truncated sample results of an API call with limit=2

```http
Link: <https://mastodon.social/api/v1/conversations?limit=2&max_id=108835003356700379>; rel="next", <https://mastodon.social/api/v1/conversations?limit=2&min_id=108888782724768580>; rel="prev"
```

```javascript
[
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
  },
  {
    "id": "418374",
    "unread": false,
    "accounts": [
      {
        "id": "464472",
        "username": "freon",
        "acct": "freon@letsalllovela.in",
        ...
      }
    ],
    "last_status": {
      "id": "103195253010396431",
      "created_at": "2019-11-24T22:29:56.331Z",
      "in_reply_to_id": "103195239650546339",
      "in_reply_to_account_id": "14715",
      ...
    }
  }
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## Remove a conversation {#delete}

```http
DELETE https://mastodon.example/api/v1/conversations/:id HTTP/1.1
```

Removes a conversation from your list of conversations.

**Returns:** empty object\
**OAuth:** User token + `write:conversations`\
**Version history:**\
2.6.0 - added

#### Request

##### Path parameters

:id
: ID of the conversation in the database

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: Success

```javascript
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

The conversation does not exist, or is not owned by you.

```javascript
{"error":"Record not found"}
```

---

## Mark a conversation as read {#read}

```http
POST https://mastodon.example/api/v1/conversations/:id/read HTTP/1.1
```

**Returns:** [Conversation]({{< relref "entities/conversation" >}})\
**OAuth:** User token + `write:conversations`\
**Version history:**\
2.6.0 - added

#### Request

##### Path parameters

:id
: ID of the conversation in the database

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: Success

The value of `unread` has been changed to false.

```javascript
{
  "id": "418450",
  "unread": false,
  "accounts": [
    {
      "id": "482403",
      ...
    }
  ],
  "last_status": {
    "id": "103196583826321184",
    ...
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

The conversation does not exist, or is not owned by you.

```javascript
{"error":"Record not found"}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/conversations_controller.rb" caption="app/controllers/api/v1/conversations_controller.rb" >}}