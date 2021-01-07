---
title: directory
description: A directory of profiles that your website is aware of.
menu:
  docs:
    weight: 20
    parent: methods-instance
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/directory" title="View profile directory" >}}
{{< api-method-description >}}

List accounts visible in the directory.

**Returns:** Array of Account\
**OAuth:** Public\
**Version history:**\
3.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="offset" type="string" required=false >}}
How many accounts to skip before returning results. Default 0.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
How many accounts to load. Default 40.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="order" type="string" required=false >}}
`active` to sort by most recently posted statuses \(default\) or `new` to sort by most recently created profiles.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="local" type="boolean" required=false >}}
Only return local accounts.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample results with limit=2
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "796927",
    "username": "eternalNo3",
    "acct": "eternalNo3@best-friends.chat",
    "display_name": "ESD＠┓（谷）┏",
    ...
  },
  {
    "id": "787648",
    "username": "ariel",
    "acct": "ariel@best-friends.chat",
    "display_name": "あやっしー🧜🏻‍♀️",
    ...
  }
]
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


