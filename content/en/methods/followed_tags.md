---
title: followed_tags
description: 
menu:
  docs:
    weight: 120
    parent: methods-accounts
    identifier: methods-followed_tags
aliases: ["/methods/followed_tags"]
---

<!--
TODO: 3.6.0
-->

## View all followed tags {#get}

```http
GET https://mastodon.example/api/v1/followed_tags HTTP/1.1
```

---

## See also

{{< page-relref ref="methods/tags#follow" caption="POST /api/v1/tags/:id/follow" >}}

{{< page-relref ref="methods/tags#unfollow" caption="POST /api/v1/tags/:id/unfollow" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/followed_tags_controller.rb" caption="app/controllers/api/v1/followed_tags_controller.rb" >}}