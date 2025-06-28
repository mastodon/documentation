---
title: health API methods
description: Check the health of the web process for the instance.
menu:
  docs:
    weight: 40
    name: health
    parent: methods
    identifier: methods-health
aliases: [
  "/methods/health"
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Get basic health status as JSON {#get}

Check on the state of the web process for the Mastodon instance. This is useful for simple monitoring. The endpoint checks that the web process responds to requests. It also checks that it can successfully connect to the database, and to the cache.

Responses other than HTTP 200 should be interpreted as some element of the web process not being healthy.

```http
GET /health HTTP/1.1
```

**Returns:** Health status\
**OAuth:** Public\
**Version history:**\
3.0.0 - added

#### Request

##### Query parameters

none

#### Response

##### 200: OK

```json
{
  "status": "UP"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/health_controller.rb" caption="app/controllers/health_controller.rb" >}}
