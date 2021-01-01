---
title: oembed
description: For generating OEmbed previews.
menu:
  docs:
    weight: 110
    parent: methods
---

{{< api-method method="get" host="https://mastodon.example" path="/api/oembed" title="OEmbed as JSON" >}}
{{< api-method-description >}}

**Returns:** OEmbed metadata\
**OAuth:** Public\
**Version history:**\
1.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="url" type="string" required=true >}}
URL of a status
{{< endapi-method-parameter >}}
{{< api-method-parameter name="maxwidth" type="number" required=false >}}
width of the iframe. Defaults to 400
{{< endapi-method-parameter >}}
{{< api-method-parameter name="maxheight" type="number" required=false >}}
height of the iframe. Defaults to null
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Represents OEmbed "rich" preview, with associated iframe and metadata.
{{< endapi-method-response-example-description >}}


```javascript
{
  "type": "rich",
  "version": "1.0",
  "title": "New status by trwnh",
  "author_name": "infinite love ⴳ",
  "author_url": "https://mastodon.social/@trwnh",
  "provider_name": "mastodon.social",
  "provider_url": "https://mastodon.social/",
  "cache_age": 86400,
  "html": "<iframe src=\"https://mastodon.social/@trwnh/99664077509711321/embed\" class=\"mastodon-embed\" style=\"max-width: 100%; border: 0\" width=\"400\" allowfullscreen=\"allowfullscreen\"></iframe><script src=\"https://mastodon.social/embed.js\" async=\"async\"></script>",
  "width": 400,
  "height": null
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Status not found
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


