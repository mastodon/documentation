---
title: directory
description: A directory of profiles that your website is aware of.
menu:
  docs:
    weight: 20
    parent: methods-instance
aliases: [/methods/instance/directory/]
---

## View profile directory {#get}

```http
GET https://mastodon.example/api/v1/directory HTTP/1.1
```

List accounts visible in the directory.

**Returns:** Array of [Account]({{< relref "entities/account" >}})\
**OAuth:** Public\
**Version history:**\
3.0.0 - added

#### Request

##### Query parameters

offset
: Number. How many accounts to skip before returning results. Default 0.

limit
: Number. How many accounts to load. Default 40.

order
: String. Use `active` to sort by most recently posted statuses (default) or `new` to sort by most recently created profiles.

local
: Boolean. If true, returns only local accounts.

#### Response
##### 200: Success

Sample results with limit=2

```javascript
[
  {
    "id": "796927",
    "username": "eternalNo3",
    "acct": "eternalNo3@best-friends.chat",
    "display_name": "ESD＠┓（谷）┏",
    ...
  },
  {
    "id": "787648",
    "username": "ariel",
    "acct": "ariel@best-friends.chat",
    "display_name": "あやっしー🧜🏻‍♀️",
    ...
  }
]
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/directories_controller.rb" caption="app/controllers/api/v1/directories_controller.rb" >}}