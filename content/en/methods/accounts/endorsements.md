---
title: endorsements
description: 'Feature other profiles on your own profile. See also accounts/:id/{pin,unpin}'
menu:
  docs:
    weight: 90
    parent: methods-accounts
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/endorsements" title="View currently featured profiles" >}}
{{< api-method-description >}}

Accounts that the user is currently featuring on their profile.

**Returns:** Array of Account\
**OAuth:** User token + `read:accounts`\
**Version history:**\
2.5.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Maximum number of results to return. Defaults to 40.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
Internal parameter. Use HTTP `Link` header from response for pagination
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
Internal parameter. Use HTTP `Link` header from response for pagination.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample call with limit=2. Because endorsement ids are private, you must parse the HTTP Link header to find next and previous pages.
{{< endapi-method-response-example-description >}}


```javascript
Link: <https://mastodon.social/api/v1/endorsements?limit=2&max_id=832844>; rel="next", <https://mastodon.social/api/v1/endorsements?limit=2&since_id=952529>; rel="prev"

[
  {
    "id": "952529",
    "username": "alayna",
    "acct": "alayna@desvox.es",
    "display_name": "Alayna Desirae",
    "locked": true,
    "bot": false,
    "created_at": "2019-10-26T23:12:06.570Z",
    "note": "experiencing ________ difficulties<br>22y/o INFP in Oklahoma",
    "url": "https://desvox.es/users/alayna",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/952/529/original/6534122046d050d5.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/952/529/original/6534122046d050d5.png",
    "header": "https://files.mastodon.social/accounts/headers/000/952/529/original/496f1f817e042ade.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/952/529/original/496f1f817e042ade.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 955,
    "last_status_at": "2019-11-23T07:05:50.682Z",
    "emojis": [],
    "fields": []
  },
  {
    "id": "832844",
    "username": "a9",
    "acct": "a9@broadcast.wolfgirl.engineering",
    "display_name": "vivienne :collar: ",
    "locked": true,
    "bot": false,
    "created_at": "2019-06-12T18:55:12.053Z",
    "note": "borderline nsfw, considered a schedule I drug by nixon<br>waiting for the year of the illumos desktop",
    "url": "https://broadcast.wolfgirl.engineering/users/a9",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/832/844/original/ae1de0b8fb63d1c6.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/832/844/original/ae1de0b8fb63d1c6.png",
    "header": "https://files.mastodon.social/accounts/headers/000/832/844/original/5088e4a16e6d8736.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/832/844/original/5088e4a16e6d8736.png",
    "followers_count": 43,
    "following_count": 67,
    "statuses_count": 5906,
    "last_status_at": "2019-11-23T05:23:47.911Z",
    "emojis": [
      {
        "shortcode": "collar",
        "url": "https://files.mastodon.social/custom_emojis/images/000/106/920/original/80953b9cd96ec4dc.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/106/920/static/80953b9cd96ec4dc.png",
        "visible_in_picker": true
      }
    ],
    "fields": []
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

If Authorization header is not provided correctly
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


