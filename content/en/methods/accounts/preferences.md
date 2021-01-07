---
title: preferences
description: Preferred common behaviors to be shared across clients.
menu:
  docs:
    weight: 110
    parent: methods-accounts
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/preferences" title="View user preferences" >}}
{{< api-method-description >}}

Preferences defined by the user in their account settings.

**Returns:** Preferences by key and value\
**OAuth:** User token + `read:accounts`\
**Version history:**\
2.8.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "posting:default:visibility": "public",
  "posting:default:sensitive": false,
  "posting:default:language": null,
  "reading:expand:media": "default",
  "reading:expand:spoilers": false
}
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


