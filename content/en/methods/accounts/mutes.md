---
title: mutes
description: 'View your mutes. See also accounts/:id/{mute,unmute}'
menu:
  docs:
    weight: 30
    parent: methods-accounts
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/mutes" title="Muted accounts" >}}
{{< api-method-description >}}

Accounts the user has muted.

**Returns:** Array of Account\
**OAuth:** User token + `read:mutes` or `follow`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Maximum number of results to return per page. Defaults to 40.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
**Internal parameter.** Use the HTTP Link header for pagination instead.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
**Internal parameter.** Use the HTTP Link header for pagination instead.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample response with limit=2. The id of mutes is private, so parse the HTTP `Link` header to find links to next and previous pages.
{{< endapi-method-response-example-description >}}


```javascript
Link: <https://mastodon.social/api/v1/mutes?limit=2&max_id=317646>; rel="next", <https://mastodon.social/api/v1/mutes?limit=2&since_id=317647>; rel="prev"

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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

If the Authorization header is not provided or contains an invalid token, the request will fail.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


