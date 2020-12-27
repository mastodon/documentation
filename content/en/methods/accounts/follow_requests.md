---
title: follow_requests
description: View and manage follow requests.
menu:
  docs:
    weight: 80
    parent: methods-accounts
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/follow_requests" title="Pending Follows" >}}
{{< api-method-description >}}

**Returns:** Array of Account\
**OAuth:** User token + `read:follows` or `follow`\
**Version history:**\
0.0.0 - added

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
Maximum number of results to return. Defaults to 40. Paginate using the HTTP Link header.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Accounts that are requesting a follow
{{< endapi-method-response-example-description >}}


```javascript
Link: <https://mastodon.social/api/v1/follow_requests?max_id=23716836>; rel="next", <https://mastodon.social/api/v1/follow_requests?min_id=23716978>; rel="prev"

[
  {
    "id": "8889777",
    "username": "example",
    "acct": "example@social.example",
    ...
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/follow_requests/:id/authorize" title="Accept Follow" >}}
{{< api-method-description >}}

**Returns:** Relationship\
**OAuth:** User token + `write:follows` or `follow`\
**Version history:**\
0.0.0 - added\
3.0.0 - now returns Relationship instead of nothing

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=false >}}
ID of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Your Relationship with this account should be updated so that you are `followed_by` this account.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "8889777",
  "following": false,
  "showing_reblogs": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
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

No pending follow request from that user ID
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/follow_requests/:id/reject" title="Reject Follow" >}}
{{< api-method-description >}}

**Returns:** Relationship\
**OAuth:** User token + `write:follows` or `follow`\
**Version history:**\
0.0.0 - added\
3.0.0 - now returns Relationship instead of nothing

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=false >}}
ID of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Your Relationship with this Account should be unchanged.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "8889777",
  "following": false,
  "showing_reblogs": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
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

No pending follow request for that user ID
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


