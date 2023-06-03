---
title: directory API methods
summary: A directory of profiles that your website is aware of.
menu:
  docs:
    weight: 20
    name: directory
    parent: methods-instance
    identifier: methods-directory
aliases: [
  "/methods/directory",
  "/api/methods/directory",
  "/methods/instance/directory",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View profile directory {#get}

```http
GET /api/v1/directory HTTP/1.1
```

List accounts visible in the directory.

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** Public\
**Version history:**\
3.0.0 - added

#### Request

##### Query parameters

offset
: Number. Skip the first n results.

limit
: Number. How many accounts to load. Defaults to 40 accounts. Max 80 accounts.

order
: String. Use `active` to sort by most recently posted statuses (default) or `new` to sort by most recently created profiles.

local
: Boolean. If true, returns only local accounts.

#### Response
##### 200: OK

Sample results with limit=2

```json
[
  {
    "id": "796927",
    "username": "eternalNo3",
    "acct": "eternalNo3@best-friends.chat",
    "display_name": "ESD＠┓（谷）┏",
    // ...
  },
  {
    "id": "787648",
    "username": "ariel",
    "acct": "ariel@best-friends.chat",
    "display_name": "あやっしー🧜🏻‍♀️",
    // ...
  }
]
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/directories_controller.rb" caption="app/controllers/api/v1/directories_controller.rb" >}}