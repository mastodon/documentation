---
title: preferences API methods
description: Preferred common behaviors to be shared across clients.
menu:
  docs:
    weight: 110
    name: preferences
    parent: methods-accounts
    identifier: methods-preferences
aliases: [
  "/methods/preferences",
  "/api/methods/preferences",
  "/methods/accounts/preferences",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View user preferences {#get}

```http
GET /api/v1/preferences HTTP/1.1
```

Preferences defined by the user in their account settings.

**Returns:** Preferences by key and value\
**OAuth:** User token + `read:accounts`\
**Version history:**\
2.8.0 - added\
4.5.0 (`mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 7) - added `posting:default:quoted_policy`

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "posting:default:visibility": "public",
  "posting:default:sensitive": false,
  "posting:default:language": null,
  "posting:default:quote_policy": "followers",
  "reading:expand:media": "default",
  "reading:expand:spoilers": false
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/preferences_controller.rb" caption="app/controllers/api/v1/preferences_controller.rb" >}}