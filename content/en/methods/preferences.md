---
title: preferences
description: Preferred common behaviors to be shared across clients.
menu:
  docs:
    weight: 110
    parent: methods-accounts
aliases: [/methods/accounts/preferences/]
---

## View user preferences {#get}

```http
GET https://mastodon.example/api/v1/preferences HTTP/1.1
```

Preferences defined by the user in their account settings.

**Returns:** Preferences by key and value\
**OAuth:** User token + `read:accounts`\
**Version history:**\
2.8.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```javascript
{
  "posting:default:visibility": "public",
  "posting:default:sensitive": false,
  "posting:default:language": null,
  "reading:expand:media": "default",
  "reading:expand:spoilers": false
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/preferences_controller.rb" caption="app/controllers/api/v1/preferences_controller.rb" >}}