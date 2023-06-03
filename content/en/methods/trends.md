---
title: trends API methods
summary: View hashtags that are currently being used more frequently than usual.
menu:
  docs:
    weight: 10
    name: trends
    parent: methods-instance
    identifier: methods-trends
aliases: [
  "/methods/trends",
  "/api/methods/trends",
  "/methods/instance/trends",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View trending tags {#tags}

```http
GET /api/v1/trends/tags HTTP/1.1
```

Tags that are being used more frequently within the past week.

**Returns:** Array of [Tag]({{< relref "entities/Tag" >}})\
**OAuth:** Public\
**Version history:**\
3.0.0 - added\
3.5.0 - method signature changed from `GET /api/v1/trends` to `GET /api/v1/trends/tags`. The former is a deprecated alias that may be removed in the future.

#### Request

##### Query parameters

limit
: Integer. Maximum number of results to return. Defaults to 10 tags. Max 20 tags.

offset
: Integer. Skip the first n results.

#### Response
##### 200: OK

```json
[
  {
    "name": "hola",
    "url": "https://mastodon.social/tags/hola",
    "history": [
      {
        "day": "1574726400",
        "uses": "13",
        "accounts": "10"
      },
      // ...
    ]
  },
  {
    "name": "SaveDotOrg",
    "url": "https://mastodon.social/tags/SaveDotOrg",
    "history": [
      {
        "day": "1574726400",
        "uses": "9",
        "accounts": "9"
      },
      // ...
    ]
  },
  {
    "name": "introduction",
    "url": "https://mastodon.social/tags/introduction",
    "history": [
      {
        "day": "1574726400",
        "uses": "15",
        "accounts": "14"
      },
      // ...
    ]
  },
  // ...
]
```

---

## View trending statuses {#statuses}

```http
GET /api/v1/trends/statuses HTTP/1.1
```

Statuses that have been interacted with more than others.

**Returns:** Array of [Status]({{< relref "entities/Status" >}})\
**OAuth:** Public\
**Version history:**\
3.5.0 - added

#### Request
##### Query parameters

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

offset
: Integer. Skip the first n results.

#### Response
##### 200: OK

```json
[
  {
    "id": "108910940413327534",
    "created_at": "2022-08-30T08:44:26.366Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    // ...
    "content": "<p>In order to prevent such incidents from happening in the future, we are implementing a fixed set of internal guidelines which must be met before any media content can be shared on our social media platforms. The distribution of material which promotes a message of racism or sexism is unacceptable. We can do better and in the future we will do better.</p><p>We apologize again for this incident and can assure you that it will not happen again.</p><p>Your Tutanota Team</p>",
    // ...
  },
  // ...
]
```

---

## View trending links {#links}

```http
GET /api/v1/trends/links HTTP/1.1
```

Links that have been shared more than others.

**Returns:** Array of [Trends::Link]({{< relref "entities/PreviewCard#trends-link" >}})\
**OAuth:** Public\
**Version history:**\
3.5.0 - added

#### Request
##### Query parameters

limit
: Integer. Maximum number of results to return. Defaults to 10 links. Max 20 links.

offset
: Integer. Skip the first n results.

#### Response
##### 200: OK

```json
[
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
  },
  // ...
]
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/trends/links_controller.rb" caption="app/controllers/api/v1/trends/links_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/trends/statuses_controller.rb" caption="app/controllers/api/v1/trends/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/trends/tags_controller.rb" caption="app/controllers/api/v1/trends/tags_controller.rb" >}}