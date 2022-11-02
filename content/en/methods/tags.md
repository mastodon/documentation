---
title: tags API methods
description: View information about or follow/unfollow hashtags.
menu:
  docs:
    weight: 120
    name: tags
    parent: methods-accounts
    identifier: methods-tags
aliases: ["/methods/tags"]
---

<!--
TODO: 4.0.0
-->

## View information about a single tag {#get}

```http
GET https://mastodon.example/api/v1/tags/:id HTTP/1.1
```

---

## Follow a hashtag {#follow}

```http
POST https://mastodon.example/api/v1/tags/:id/follow HTTP/1.1
```

---

## Unfollow a hashtag {#unfollow}

```http
POST https://mastodon.example/api/v1/tags/:id/unfollow HTTP/1.1
```

---

## See also

{{< page-relref ref="methods/followed_tags#get" caption="GET /api/v1/followed_tags" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/tags_controller.rb" caption="app/controllers/api/v1/tags_controller.rb" >}}

