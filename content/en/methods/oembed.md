---
title: oembed API methods
description: For generating OEmbed previews.
menu:
  docs:
    weight: 110
    name: oembed
    parent: methods
    identifier: methods-oembed
aliases: [
  "/methods/oembed",
  "/api/methods/oembed",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Get OEmbed info as JSON {#get}

```http
GET /api/oembed HTTP/1.1
```

**Returns:** OEmbed metadata\
**OAuth:** Public\
**Version history:**\
1.0.0 - added

#### Request
##### Query parameters

url
: {{<required>}} String. URL of a status.

maxwidth
: Number. Width of the iframe. Defaults to 400

maxheight
: Number. Height of the iframe. Defaults to null

#### Response
##### 200: OK

Represents OEmbed "rich" preview, with associated iframe and metadata.

```json
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

##### 404: Not found

Status not found for given URL

```json
{
  "error": "Record not found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/oembed_controller.rb" caption="app/controllers/api/oembed_controller.rb" >}}