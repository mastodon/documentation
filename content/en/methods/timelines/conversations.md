---
title: conversations
description: >-
  Direct conversations with other participants. (Currently, just threads
  containing a post with "direct" visibility.)
menu:
  docs:
    weight: 10
    parent: methods-timelines
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/conversations" title="Show conversation" >}}
{{< api-method-description >}}

**Returns:** Array of Conversation\
**OAuth:** User token + `read:statuses`\
**Version history:**\
2.6.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Maximum number of results. Defaults to 20. Max 40.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Return results older than this ID. Use HTTP Link header to paginate.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
Return results newer than this ID. Use HTTP Link header to paginate.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="min_id" type="string" required=false >}}
Return results immediately newer than this ID. Use HTTP Link header to paginate.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Truncated sample results of an API call with limit=2
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/conversations/:id" title="Remove conversation" >}}
{{< api-method-description >}}

**Returns:** empty object\
**OAuth:** User token + `write:conversations`\
**Version history:**\
2.6.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the conversation in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

An empty object will be returned.
{{< endapi-method-response-example-description >}}


```javascript
{}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authentication header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

The conversation does not exist, or is not owned by you.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/conversations/:id/read" title="Mark as read" >}}
{{< api-method-description >}}

**Returns:** Conversation\
**OAuth:** User token + `write:conversations`\
**Version history:**\
2.6.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=false >}}
ID of the conversation in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

The value of `unread` has been changed to false.
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

The conversation does not exist, or is not owned by you.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


