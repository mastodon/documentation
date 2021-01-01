---
title: domain_blocks
description: View and update domain blocks.
menu:
  docs:
    weight: 50
    parent: methods-accounts
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/domain_blocks" title="Fetch domain blocks" >}}
{{< api-method-description >}}

View domains the user has blocked.

**Returns:** Array of strings\
**OAuth:** User token + `read:blocks` or `follow`\
**Version:**\
1.4.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
**Internal parameter.** Use HTTP Link header from response for pagination.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
**Internal parameter.** Use HTTP Link header from response for pagination.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Maximum number of results to return per page. Defaults to 40. NOTE: Pagination is done with the Link header from the response.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample call with limit=2. Because domain ids are not public, you must parse the HTTP Link header to access next and previous pages.
{{< endapi-method-response-example-description >}}


```javascript
Link: <https://mastodon.social/api/v1/domain_blocks?limit=2&max_id=16194>; rel="next", <https://mastodon.social/api/v1/domain_blocks?limit=2&since_id=16337>; rel="prev"

["nsfw.social","artalley.social"]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Incorrect Authorization header
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/domain_blocks" title="Block a domain" >}}
{{< api-method-description >}}

Block a domain to:
- hide all public posts from it
- hide all notifications from it
- remove all followers from it
- prevent following new users from it \(but does not remove existing follows\)

**Returns:** n/a\
**OAuth:** User token + ****`write:blocks` or `follow`\
**Version:**\
1.4.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="domain" type="string" required=true >}}
Domain to block.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

If the call was successful, an empty object will be returned. Note that the call will be successful even if the domain is already blocked or if the domain does not exist or if the domain is not a domain.
{{< endapi-method-response-example-description >}}


```javascript
{}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Incorrect Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

If `domain` is not provided or contains spaces, the request will fail.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="empty" >}}
```javascript
{
  "error": "Validation failed: Domain can't be blank"
}
```
{{< endtab >}}

{{< tab title="invalid" >}}
```javascript
{
  "error": "Validation failed: Domain is not a valid domain name"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/domain_blocks" title="Unblock a domain" >}}
{{< api-method-description >}}

Remove a domain block, if it exists in the user's array of blocked domains.

**Returns:** n/a\
**OAuth:** User token + `write:blocks` or `follow`\
**Version history:**\
1.4.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="domain" type="string" required=true >}}
Domain to unblock.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

If the call was successful, an empty object will be returned. Note that the call will be successful even if the domain was not previously blocked.
{{< endapi-method-response-example-description >}}


```javascript
{}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Incorrect Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

If `domain` is not provided or contains spaces, the request will fail.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="empty" >}}
```javascript
{
  "error": "Validation failed: Domain can't be blank"
}
```
{{< endtab >}}

{{< tab title="invalid domain" >}}
```javascript
{
  "error": "Validation failed: Domain is not a valid domain name"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


