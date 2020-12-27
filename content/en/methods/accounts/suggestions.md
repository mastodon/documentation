---
title: suggestions
description: >-
  Server-generated suggestions on who to follow, based on previous positive
  interactions.
menu:
  docs:
    weight: 120
    parent: methods-accounts
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/suggestions" title="Follow suggestions" >}}
{{< api-method-description >}}

Accounts the user has had past positive interactions with, but is not yet following.

**Returns:** Array of Account\
**OAuth:** User token + `read`\
**Version history:**\
2.4.3 - added

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
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample call with limit=2
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "332766",
    "username": "kaniini",
    "acct": "kaniini@pleroma.site",
    "display_name": ":abunhdhappyhop: :abunhdhappy: :abunhdhop: :abunhd: :abunhdhappyhop: :abunhdhappy:",
    "locked": false,
    "bot": false,
    "created_at": "2018-04-18T13:56:23.167Z",
    "note": "a friendly <a class=\"hashtag\" href=\"https://pleroma.site/tag/collectivist\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#collectivist</a> 🐰<br><br>destroyer of bloat @ <a class=\"hashtag\" href=\"https://pleroma.site/tag/pleroma\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#pleroma</a>, <a class=\"hashtag\" href=\"https://pleroma.site/tag/pkgconf\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#pkgconf</a>, <a class=\"hashtag\" href=\"https://pleroma.site/tag/audacious\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#audacious</a><br>slayer of techbros<br>previously <a class=\"hashtag\" href=\"https://pleroma.site/tag/alpinelinux\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#alpinelinux</a> core a few moons ago and <a class=\"hashtag\" href=\"https://pleroma.site/tag/debian\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#debian</a> much longer ago<br><br>she/her",
    "url": "https://pleroma.site/users/kaniini",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/332/766/original/9fae792e5af298f2.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/332/766/original/9fae792e5af298f2.png",
    "header": "https://files.mastodon.social/accounts/headers/000/332/766/original/fe176d8215ec0f36.jpeg",
    "header_static": "https://files.mastodon.social/accounts/headers/000/332/766/original/fe176d8215ec0f36.jpeg",
    "followers_count": 2442,
    "following_count": 473,
    "statuses_count": 19533,
    "last_status_at": "2019-11-14T01:38:32.193Z",
    "emojis": [
      {
        "shortcode": "abunhdhappyhop",
        "url": "https://files.mastodon.social/custom_emojis/images/000/137/036/original/e102b7869c930411.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/137/036/static/e102b7869c930411.png",
        "visible_in_picker": true
      },
      {
        "shortcode": "abunhdhappy",
        "url": "https://files.mastodon.social/custom_emojis/images/000/137/100/original/d47dd4a8a0a85e19.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/137/100/static/d47dd4a8a0a85e19.png",
        "visible_in_picker": true
      },
      {
        "shortcode": "abunhdhop",
        "url": "https://files.mastodon.social/custom_emojis/images/000/137/102/original/43fa2536760ea5d4.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/137/102/static/43fa2536760ea5d4.png",
        "visible_in_picker": true
      },
      {
        "shortcode": "abunhd",
        "url": "https://files.mastodon.social/custom_emojis/images/000/142/760/original/892a08e7de033e74.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/142/760/static/892a08e7de033e74.png",
        "visible_in_picker": true
      }
    ],
    "fields": []
  },
  {
    "id": "689455",
    "username": "interneteh",
    "acct": "interneteh@sunbeam.city",
    "display_name": "Sid",
    "locked": false,
    "bot": false,
    "created_at": "2019-01-17T00:10:11.059Z",
    "note": "<p>stay at home dad, painter by commission, sidewalk farmer, editor, socialist organizer, home chef, anxiety ridden, he/him</p>",
    "url": "https://sunbeam.city/@interneteh",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/689/455/original/e7a1ba67e373296e.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/689/455/original/e7a1ba67e373296e.png",
    "header": "https://files.mastodon.social/accounts/headers/000/689/455/original/2e83fd31bd530745.png",
    "header_static": "https://files.mastodon.social/accounts/headers/000/689/455/original/2e83fd31bd530745.png",
    "followers_count": 1180,
    "following_count": 1707,
    "statuses_count": 26320,
    "last_status_at": "2019-11-23T04:58:36.907Z",
    "emojis": [],
    "fields": []
  },
  {
    "id": "764276",
    "username": "Dee",
    "acct": "Dee@fedi.underscore.world",
    "display_name": "Dee 🧡",
    "locked": false,
    "bot": false,
    "created_at": "2019-03-15T17:22:26.925Z",
    "note": "This instance exists. People tell me I exist, but who knows?<br><br><br>enby :heart_nb: they/them<br><br>🌎 Alt: <span class=\"h-card\"><a class=\"u-url mention\" href=\"https://be.cutewith.me/users/DeeUnderscore\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>DeeUnderscore@be.cutewith.me</span></a></span> • A bot: <span class=\"h-card\"><a class=\"u-url mention\" href=\"https://beeping.town/users/cubeglobe\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>cubeglobe@beeping.town</span></a></span><br>💬 XMPP: deeunderscore@xmpp.zone<br>🔗 <a href=\"https://dee.underscore.world/about\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">https://dee.underscore.world/about</a>",
    "url": "https://fedi.underscore.world/users/Dee",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/764/276/original/86f6bddc26c4b1df.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/764/276/original/86f6bddc26c4b1df.png",
    "header": "https://files.mastodon.social/accounts/headers/000/764/276/original/c73f0e088c59145c.jpeg",
    "header_static": "https://files.mastodon.social/accounts/headers/000/764/276/original/c73f0e088c59145c.jpeg",
    "followers_count": 528,
    "following_count": 301,
    "statuses_count": 15611,
    "last_status_at": "2019-11-23T03:30:33.738Z",
    "emojis": [
      {
        "shortcode": "heart_nb",
        "url": "https://files.mastodon.social/custom_emojis/images/000/121/156/original/6eabf6eb2ae69bc9.png",
        "static_url": "https://files.mastodon.social/custom_emojis/images/000/121/156/static/6eabf6eb2ae69bc9.png",
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

Bad Authorization header
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
{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/suggestions/:account_id" title="Remove a suggestion" >}}
{{< api-method-description >}}

Remove an account from follow suggestions.

**Returns:** n/a\
**OAuth:** User token + `read`\
**Version history:**\
2.4.3 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
id of the account in the database to be removed from suggestions
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

A successful call will return an empty object. Note the call will be successful even if the account id provided is invalid or is not a suggested account.
{{< endapi-method-response-example-description >}}


```javascript
{}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
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


