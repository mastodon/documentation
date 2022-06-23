---
title: statuses
description: View statuses which are trending right now
menu:
  docs:
    weight: 5
    parent: methods-instance-trends
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/trends/statuses" title="Trending statuses" >}}
{{< api-method-description >}}

Statuses which are trending right now

**Returns:** Array of Statuses\
**OAuth:** Public\
**Version history:**\
3.5.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="limit" type="number" required=false >}}
Maximum number of results to return. Defaults to XX. #TODO to be clarified
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
        "id": "108524384522057653",
        "created_at": "2022-06-23T02:18:11.000Z",
        "in_reply_to_id": null,
        "in_reply_to_account_id": null,
        "sensitive": false,
        "spoiler_text": "",
        "visibility": "public",
        "language": "de",
        "uri": "https://mastodon.social/users/gargron/statuses/1",
        "url": "https://mastodon.social/@gargron/1",
        "replies_count": 0,
        "reblogs_count": 13,
        "favourites_count": 37,
        "edited_at": null,
        "content": "<p>Hola, this is a trending status.</p>",
        "reblog": null,
        "account": {
            "id": "1",
            "username": "Gargron",
            "acct": "Gargron",
            "display_name": "Eugen",
            ...
        },
        "media_attachments": [],
        "mentions": [],
        "tags": [],
        "emojis": [],
        "card": null,
        "poll": null
    }
]
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


