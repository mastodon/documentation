---
title: PreviewCard
description: Represents a rich preview card that is generated using OpenGraph tags from a URL.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/card",
  "/entities/Card",
  "/entities/previewcard",
  "/entities/PreviewCard",
  "/api/entities/card",
  "/api/entities/Card",
  "/api/entities/previewcard",
  "/api/entities/PreviewCard",
]
---

## Examples

### Video

```json
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
  "embed_url": "",
  "blurhash": "UvK0HNkV,:s9xBR%njog0fo2W=WBS5ozofV@"
}
```

### Photo

```json
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
  "embed_url": "https://live.staticflickr.com/65535/49088768431_6a4322b3bb_b.jpg",
  "blurhash": "UnE{@jt6M_oIAhjYs+ayT2WBf9ayRkkDXAj["
}
```

### Link

```json
{
  "url": "https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code",
  "title": "‘I lost my £193,000 inheritance – with one wrong digit on my sort code’",
  "description": "When Peter Teich’s money went to another Barclays customer, the bank offered £25 as a token gesture",
  "type": "link",
  "authors": [],
  "author_name": "",
  "author_url": "",
  "provider_name": "",
  "provider_url": "",
  "html": "",
  "width": 0,
  "height": 0,
  "image": null,
  "embed_url": "",
  "blurhash": null
}
```

## Attributes

### `url` {#url}

**Description:** Location of linked resource.\
**Type:** String (URL)\
**Version history:**\
1.0.0 - added

### `title` {#title}

**Description:** Title of linked resource.\
**Type:** String\
**Version history:**\
1.0.0 - added

### `description` {#description}

**Description:** Description of preview.\
**Type:** String\
**Version history:**\
1.0.0 - added

### `type` {#type}

**Description:** The type of the preview card.\
**Type:** String (Enumerable, oneOf)\
`link` = Link OEmbed\
`photo` = Photo OEmbed\
`video` = Video OEmbed\
`rich` = iframe OEmbed. Not currently accepted, so won't show up in practice.\
**Version history:**\
1.3.0 - added

### `authors` {#authors}

**Description:** Fediverse account of the authors of the original resource.\
**Type:** Array of PreviewCardAuthor\
**Version history:**\
4.3.0 - added

### `author_name` {#author_name}

**Description:** The author of the original resource.\
**Type:** String\
**Version history:**\
1.3.0 - added

### `author_url` {#author_url}

**Description:** A link to the author of the original resource.\
**Type:** String (URL)\
**Version history:**\
1.3.0 - added

### `provider_name` {#provider_name}

**Description:** The provider of the original resource.\
**Type:** String\
**Version history:**\
1.3.0 - added

### `provider_url` {#provider_url}

**Description:** A link to the provider of the original resource.\
**Type:** String (URL)\
**Version history:**\
1.3.0 - added

### `html` {#html}

**Description:** HTML to be used for generating the preview card.\
**Type:** String (HTML)\
**Version history:**\
1.3.0 - added

### `width` {#height}

**Description:** Width of preview, in pixels.\
**Type:** Integer\
**Version history:**\
1.3.0 - added

### `height` {#height}

**Description:** Height of preview, in pixels.\
**Type:** Integer\
**Version history:**\
1.3.0 - added

### `image` {#image}

**Description:** Preview thumbnail.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
1.0.0 - added

### `embed_url` {#embed_url}

**Description:** Used for photo embeds, instead of custom `html`.\
**Type:** String (URL)\
**Version history:**\
2.1.0 - added

### `blurhash` {#blurhash}

**Description:** A hash computed by [the BlurHash algorithm](https://github.com/woltapp/blurhash), for generating colorful preview thumbnails when media has not been downloaded yet.\
**Type:** {{<nullable>}} String\
**Version history:**\
3.2.0 - added

## Trends::Link entity attributes {#trends-link}

```json
{
  "url": "https://www.nbcnews.com/specials/plan-your-vote-2022-elections/index.html",
  "title": "Plan Your Vote: 2022 Elections",
  "description": "Everything you need to know about the voting rules where you live, including registration, mail-in voting, changes since 2020, and more.",
  "type": "link",
  "author_name": "NBC News",
  "author_url": "",
  "provider_name": "NBC News",
  "provider_url": "",
  "html": "",
  "width": 400,
  "height": 225,
  "image": "https://files.mastodon.social/cache/preview_cards/images/045/027/478/original/0783d5e91a14fd49.jpeg",
  "embed_url": "",
  "blurhash": "UcQmF#ay~qofj[WBj[j[~qof9Fayofofayay",
  "history": [
    {
      "day": "1661817600",
      "accounts": "7",
      "uses": "7"
    },
    {
      "day": "1661731200",
      "accounts": "23",
      "uses": "23"
    },
    {
      "day": "1661644800",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1661558400",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1661472000",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1661385600",
      "accounts": "0",
      "uses": "0"
    },
    {
      "day": "1661299200",
      "accounts": "0",
      "uses": "0"
    }
  ]
}
```

### `history` {#history}

**Description:** Usage statistics for given days (typically the past week).\
**Type:** Array of Hash\
**Version history:**\
3.5.0 - added

#### `history[][day]` {#history-day}

**Description:** UNIX timestamp on midnight of the given day.\
**Type:** String (UNIX timestamp)\
**Version history:**\
3.5.0 - added

#### `history[][accounts]` {#history-accounts}

**Description:** The counted accounts using the link within that day.\
**Type:** String (cast from an integer)\
**Version history:**\
3.5.0 - added

#### `history[][uses]` {#history-uses}

**Description:** The counted statuses using the link within that day.\
**Type:** String (cast from an integer)\
**Version history:**\
3.5.0 - added

## See also

{{< page-relref ref="entities/Status#card" caption="Status (`card` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/preview_card_serializer.rb" caption="app/serializers/rest/preview_card_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/trends/link_serializer.rb" caption="app/serializers/rest/trends/link_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/trends/links.rb" caption="app/models/trends/links.rb" >}}
