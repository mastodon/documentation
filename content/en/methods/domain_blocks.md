---
title: domain_blocks API methods
description: Manage a user's blocked domains.
menu:
  docs:
    weight: 50
    name: domain_blocks
    parent: methods-accounts
    identifier: methods-domain_blocks
aliases: [
  "/methods/domain_blocks",
  "/api/methods/domain_blocks",
  "/methods/accounts/domain_blocks"]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Get domain blocks {#get}

```http
GET /api/v1/domain_blocks HTTP/1.1
```

View domains the user has blocked.

**Returns:** Array of String\
**OAuth:** User token + `read:blocks` or `follow`\
**Version:**\
1.4.0 - added\
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
: Integer. Maximum number of results to return. Defaults to 100 domain blocks. Max 200 domain blocks.

#### Response
##### 200: OK

Sample call with limit=2.

```json
["nsfw.social","artalley.social"]
```

Because AccountDomainBlock IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/domain_blocks?limit=2&max_id=16194>; rel="next", <https://mastodon.example/api/v1/domain_blocks?limit=2&since_id=16337>; rel="prev"
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Block a domain {#block}

```http
POST /api/v1/domain_blocks HTTP/1.1
```

Block a domain to:
- hide all public posts from it
- hide all notifications from it
- remove all followers from it
- prevent following new users from it (but does not remove existing follows)

**Returns:** Empty\
**OAuth:** User token + `write:blocks` or `follow`\
**Version:**\
1.4.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

domain
: {{<required>}} String. Domain to block.

#### Response
##### 200: OK

If the call was successful, an empty object will be returned. Note that the call will be successful even if the domain is already blocked, or if the domain does not exist, or if the domain is not a domain.

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

##### 422: Unprocessable entity

If `domain` is not provided, the request will fail.

```json
{
  "error": "Validation failed: Domain can't be blank"
}
```

If `domain` contains spaces, the request will fail.

```json
{
  "error": "Validation failed: Domain is not a valid domain name"
}
```

---

## Unblock a domain {#unblock}

```http
DELETE /api/v1/domain_blocks HTTP/1.1
```

Remove a domain block, if it exists in the user's array of blocked domains.

**Returns:** Empty\
**OAuth:** User token + `write:blocks` or `follow`\
**Version history:**\
1.4.0 - added

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

domain
: {{<required>}} String. Domain to unblock.

#### Response
##### 200: OK

If the call was successful, an empty object will be returned. Note that the call will be successful even if the domain was not previously blocked.

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

##### 422: Unprocessable entity

If `domain` is not provided, the request will fail.

```json
{
  "error": "Validation failed: Domain can't be blank"
}
```

If `domain` contains spaces, the request will fail.

```json
{
  "error": "Validation failed: Domain is not a valid domain name"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/domain_blocks_controller.rb" caption="app/controllers/api/v1/domain_blocks_controller.rb" >}}