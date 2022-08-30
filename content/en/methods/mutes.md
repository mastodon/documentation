---
title: mutes
description: 'View your mutes. See also accounts/:id/{mute,unmute}'
menu:
  docs:
    weight: 30
    parent: methods-accounts
aliases: [/methods/accounts/mutes/]
---

## View muted accounts {#get}

Accounts the user has muted.

**Returns:** Array of Account\
**OAuth:** User token + `read:mutes` or `follow`\
**Version history:**\
0.0.0 - added\
3.3.0 - added `mute_expires_at`. both `min_id` and `max_id` can be used at the same time now

```http
GET https://mastodon.example/api/v1/mutes HTTP/1.1
```

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

min_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: String. Maximum number of results to return. Defaults to 40.

#### Response
##### 200: Success

Sample response with limit=2. The ID of mutes is private, so parse the HTTP `Link` header to find links to next and previous pages.

```http
Link: <https://mastodon.social/api/v1/mutes?limit=2&max_id=317646>; rel="next", <https://mastodon.social/api/v1/mutes?limit=2&since_id=317647>; rel="prev"
```

```javascript
[
  {
    "id": "963076",
    "username": "Simia91",
    "acct": "Simia91",
    "display_name": "",
    "locked": false,
    "bot": false,
    "created_at": "2019-11-07T10:31:17.428Z",
    "note": "<p></p>",
    "url": "https://mastodon.social/@Simia91",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/963/076/original/30d3e0502c419cca.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/963/076/original/30d3e0502c419cca.png",
    "header": "https://files.mastodon.social/accounts/headers/000/963/076/original/53ba9b1ad4922418.jpg",
    "header_static": "https://files.mastodon.social/accounts/headers/000/963/076/original/53ba9b1ad4922418.jpg",
    "followers_count": 18,
    "following_count": 73,
    "statuses_count": 640,
    "last_status_at": "2019-11-19T15:14:47.088Z",
    "mute_expires_at": null,
    "emojis": [],
    "fields": []
  },
  {
    "id": "1001524",
    "username": "hakogamae",
    "acct": "hakogamae",
    "display_name": "Hakogamae 🔞",
    "locked": false,
    "bot": false,
    "created_at": "2019-11-15T13:01:55.538Z",
    "note": "<p>This blog is going to be about what I don&apos;t know -- what&apos;s the diff between good for me and not? </p><p>I always to make reasonable choices, but I&apos;ve been wrong many times.  Maybe I&apos;ll get better by simply working at it slowly.</p><p>&quot;If I have the belief that I can do it,<br />I shall surely acquire the capacity to<br />do it even if I may not have it at the<br />beginning.&quot; -- Gandhi</p><p>My name -- Hakogamae -- comes from the Japanese Kanji  Radical 22 匚部 meaning &quot;box.&quot;  I&apos;m in a box now.</p><p>At Humblr, I was Fslowly</p>",
    "url": "https://mastodon.social/@hakogamae",
    "avatar": "https://files.mastodon.social/accounts/avatars/001/001/524/original/dd6ab3001057a144.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/001/001/524/original/dd6ab3001057a144.jpg",
    "header": "https://files.mastodon.social/accounts/headers/001/001/524/original/09187eeac3fa6d0d.jpg",
    "header_static": "https://files.mastodon.social/accounts/headers/001/001/524/original/09187eeac3fa6d0d.jpg",
    "followers_count": 23,
    "following_count": 0,
    "statuses_count": 137,
    "last_status_at": "2019-11-21T18:44:25.570Z",
    "mute_expires_at": null,
    "emojis": [],
    "fields": [
      {
        "name": "Men",
        "value": "living, alive",
        "verified_at": null
      },
      {
        "name": "Carpe diem",
        "value": "匚部",
        "verified_at": null
      },
      {
        "name": "Photographs",
        "value": "capturing time",
        "verified_at": null
      },
      {
        "name": "Feedback",
        "value": "always helps",
        "verified_at": null
      }
    ]
  }
]
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/mutes_controller.rb" caption="app/controllers/api/v1/mutes_controller.rb" >}}

{{< page-relref ref="methods/accounts#mute" caption="POST /api/v1/accounts/:id/mute" >}}

{{< page-relref ref="methods/accounts#unmute" caption="POST /api/v1/accounts/:id/unmute" >}}