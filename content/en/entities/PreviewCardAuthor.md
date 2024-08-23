---
title: PreviewCardAuthor
description: Represents an author in a rich preview card.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/PreviewCardAuthor",
]
---

## Attributes

### `name` {#name}

**Description:** The original resource author's name. Replaces the deprecated `author_name` attribute of the preview card.\
**Type:** String\
**Version history:**\
4.3.0 - added

### `url` {#url}

**Description:** A link to the author of the original resource. Replaces the deprecated `author_url` attribute of the preview card.\
**Type:** String (URL)\
**Version history:**\
4.3.0 - added

### `account` {{%nullable%}} {#account}

**Description:** The fediverse account of the author.\
**Type:** [Account]({{< relref "entities/Account">}})\
**Version history:**\
4.3.0 - added

## See also

{{< page-relref ref="entities/PreviewCard#authors" caption="PreviewCard (`authors` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/preview_card_serializer.rb" caption="app/serializers/rest/preview_card_serializer.rb" >}}
