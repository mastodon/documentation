---
title: polls
description: >-
  View and vote on polls attached to statuses. To discover poll ID, you will
  need to GET a Status first and then check for a `poll` property.
menu:
  docs:
    weight: 20
    parent: methods-statuses
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/polls/:id" title="View a poll" >}}
{{< api-method-description >}}

**Returns:** Poll\
**OAuth:** Public if parent status is public. User token + `read:statuses` if parent status is private.\
**Version history:**\
2.8.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the poll in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "34830",
  "expires_at": "2019-12-05T04:05:08.302Z",
  "expired": true,
  "multiple": false,
  "votes_count": 10,
  "voters_count": null,
  "voted": true,
  "own_votes": [
    1
  ],
  "options": [
    {
      "title": "accept",
      "votes_count": 6
    },
    {
      "title": "deny",
      "votes_count": 4
    }
  ],
  "emojis": []
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Poll does not exist, or poll's parent status is private
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/polls/:id/votes" title="Vote on a poll" >}}
{{< api-method-description >}}

**Returns:** Poll\
**OAuth:** User token + `write:statuses`\
**Version history:**\
2.8.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the poll in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="choices\[\]" type="array" required=true >}}
Array of own votes containing index for each option \(starting from 0\)
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Poll was voted on
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "34873",
  "expires_at": "2019-12-05T11:16:17.426Z",
  "expired": false,
  "multiple": true,
  "votes_count": 5,
  "voters_count": null,
  "voted": true,
  "own_votes": [
    0,
    2,
    4,
    9,
    6
  ],
  "options": [
    {
      "title": "option 0",
      "votes_count": 1
    },
    {
      "title": "option 1",
      "votes_count": 0
    },
    {
      "title": "option 2",
      "votes_count": 1
    },
    {
      "title": "option 3",
      "votes_count": 0
    },
    {
      "title": "option 4",
      "votes_count": 1
    },
    {
      "title": "option 5",
      "votes_count": 0
    },
    {
      "title": "option 6",
      "votes_count": 1
    },
    {
      "title": "option 7",
      "votes_count": 0
    },
    {
      "title": "option 8",
      "votes_count": 0
    },
    {
      "title": "option 9",
      "votes_count": 1
    }
  ],
  "emojis": []
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

Poll does not exist, or poll's parent status is private
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

Already voted or poll is expired
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="already voted" >}}
```javascript
{
  "error": "Validation failed: You have already voted on this poll"
}
```
{{< endtab >}}

{{< tab title="expired" >}}
```javascript
{
  "error": "Validation failed: The poll has already ended"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


