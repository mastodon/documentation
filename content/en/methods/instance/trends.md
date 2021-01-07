---
title: trends
description: View hashtags that are currently being used more frequently than usual.
menu:
  docs:
    weight: 10
    parent: methods-instance
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/trends" title="Trending tags" >}}
{{< api-method-description >}}

Tags that are being used more frequently within the past week.

**Returns:** Array of Tag with History\
**OAuth:** Public\
**Version history:**\
3.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="limit" type="number" required=false >}}
Maximum number of results to return. Defaults to 10.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "name": "hola",
    "url": "https://mastodon.social/tags/hola",
    "history": [
      {
        "day": "1574726400",
        "uses": "13",
        "accounts": "10"
      },
      ...
    ]
  },
  {
    "name": "SaveDotOrg",
    "url": "https://mastodon.social/tags/SaveDotOrg",
    "history": [
      {
        "day": "1574726400",
        "uses": "9",
        "accounts": "9"
      },
      ...
    ]
  },
  {
    "name": "introduction",
    "url": "https://mastodon.social/tags/introduction",
    "history": [
      {
        "day": "1574726400",
        "uses": "15",
        "accounts": "14"
      },
      ...
    ]
  },
  ...
]
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


