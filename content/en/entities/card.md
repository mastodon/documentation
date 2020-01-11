---
title: Card
description: Represents a rich preview card that is generated using OpenGraph tags from a URL.
menu:
  docs:
    parent: entities
---

{{< tabs >}}
{{< tab title="video" >}}
```javascript
{
  "url": "https://www.youtube.com/watch?v=OMv_EPMED8Y",
  "title": "♪ Brand New Friend (Christmas Song!)",
  "description": "",
  "type": "video",
  "author_name": "YOGSCAST Lewis & Simon",
  "author_url": "https://www.youtube.com/user/BlueXephos",
  "provider_name": "YouTube",
  "provider_url": "https://www.youtube.com/",
  "html": "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/OMv_EPMED8Y?feature=oembed\" frameborder=\"0\" allowfullscreen=\"\"></iframe>",
  "width": 480,
  "height": 270,
  "image": "https://files.mastodon.social/preview_cards/images/014/179/145/original/9cf4b7cf5567b569.jpeg",
  "embed_url": ""
}
```
{{< endtab >}}

{{< tab title="photo" >}}
```javascript
{
  "url": "https://www.flickr.com/photos/tomfenskephotography/49088768431/",
  "title": "Oregon",
  "description": "",
  "type": "photo",
  "author_name": "Tom Fenske Photography",
  "author_url": "https://www.flickr.com/photos/tomfenskephotography/",
  "provider_name": "Flickr",
  "provider_url": "https://www.flickr.com/",
  "html": "",
  "width": 1024,
  "height": 427,
  "image": "https://files.mastodon.social/preview_cards/images/014/287/139/original/651b1c6976817824.jpeg",
  "embed_url": "https://live.staticflickr.com/65535/49088768431_6a4322b3bb_b.jpg"
}
```
{{< endtab >}}

{{< tab title="link" >}}
```javascript
{
  "url": "https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code",
  "title": "‘I lost my £193,000 inheritance – with one wrong digit on my sort code’",
  "description": "When Peter Teich’s money went to another Barclays customer, the bank offered £25 as a token gesture",
  "type": "link",
  "author_name": "",
  "author_url": "",
  "provider_name": "",
  "provider_url": "",
  "html": "",
  "width": 0,
  "height": 0,
  "image": null,
  "embed_url": ""
}
```
{{< endtab >}}
{{< endtabs >}}

## Required attributes

### `url` {#url}

**Description:** Location of linked resource.\
**Type:** String \(URL\)\
**Version history:** Added in 1.0.0

### `title` {#title}

**Description:** Title of linked resource.\
**Type:** String\
**Version history:** Added in 1.0.0

### `description` {#description}

**Description:** Description of preview.\
**Type:** String\
**Version history:** Added in 1.0.0

### `type` {#type}

**Description:** The type of the preview card.\
**Type:** String \(Enumerable, oneOf\)\
`link` = Link OEmbed\
`photo` = Photo OEmbed\
`video` = Video OEmbed\
`rich` = iframe OEmbed. Not currently accepted, so won't show up in practice.\
**Version history:** Added in 1.3.0

## Optional attributes

### `author_name` {#author_name}

**Description:** The author of the original resource.\
**Type:** String\
**Version history:** Added in 1.3.0

### `author_url` {#author_url}

**Description:** A link to the author of the original resource.\
**Type:** String \(URL\)\
**Version history:** Added in 1.3.0

### `provider_name` {#provider_name}

**Description:** The provider of the original resource.\
**Type:** String\
**Version history:** Added in 1.3.0

### `provider_url` {#provider_url}

**Description:** A link to the provider of the original resource.\
**Type:** String \(URL\)\
**Version history:** Added in 1.3.0

### `html` {#html}

**Description:** HTML to be used for generating the preview card.\
**Type:** String \(HTML\)\
**Version history:** Added in 1.3.0

### `width` {#width}

**Description:** Width of preview, in pixels.\
**Type:** Number\
**Version history:** Added in 1.3.0

### `height` {#height}

**Description:** Height of preview, in pixels.\
**Type:** Number\
**Version history:** Added in 1.3.0

### `image` {#image}

**Description:** Preview thumbnail.\
**Type:** String \(URL\)\
**Version history:** Added in 1.0.0

### `embed_url` {#embed_url}

**Description:** Used for photo embeds, instead of custom `html`.\
**Type:** String \(URL\)\
**Version history:** Added in 2.1.0

## See also

{{< page-ref page="status.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/preview_card_serializer.rb" caption="app/serializers/rest/preview\_card\_serializer.rb" >}}

