---
title: accounts
description: Methods concerning user accounts and related information.
menu:
  docs:
    weight: 20
    parent: methods
    identifier: methods-accounts
---

## Account credentials

{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts" title="Register an account" >}}
{{< api-method-description >}}

Creates a user and account records. Returns an account access token for the app that initiated the request. The app should save this token for later, and should wait for the user to confirm their account by clicking a link in their email inbox.

**Returns:** Token\
**OAuth:** App token + `write:accounts`\
**Version history:**\
2.7.0 - added\
3.0.0 - added `reason` parameter

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;app token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="reason" type="string" required=false >}}
Text that will be reviewed by moderators if registrations require manual approval.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="username" type="string" required=true >}}
The desired username for the account
{{< endapi-method-parameter >}}
{{< api-method-parameter name="email" type="string" required=true >}}
The email address to be used for login
{{< endapi-method-parameter >}}
{{< api-method-parameter name="password" type="string" required=true >}}
The password to be used for login
{{< endapi-method-parameter >}}
{{< api-method-parameter name="agreement" type="boolean" required=true >}}
Whether the user agrees to the local rules, terms, and policies. These should be presented to the user in order to allow them to consent before setting this parameter to TRUE.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="locale" type="string" required=true >}}
The language of the confirmation email that will be sent
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/verify_credentials" title="Verify account credentials" >}}
{{< api-method-description >}}

Test to make sure that the user token works.

**Returns:** the user's own Account with Source\
**OAuth**: User token + `read:accounts`\
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
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Note the extra `source` property, which is not visible on accounts other than your own. Also note that plain-text is used within `source` and HTML is used for their corresponding properties such as `note` and `fields`.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "14715",
  "username": "trwnh",
  "acct": "trwnh",
  "display_name": "infinite love ⴳ",
  "locked": false,
  "bot": false,
  "created_at": "2016-11-24T10:02:12.085Z",
  "note": "<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/at\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/at</span><span class=\"invisible\"></span></a> or <a href=\"https://paypal.me/trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">paypal.me/trwnh</span><span class=\"invisible\"></span></a></p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence<br />- #1 ami cole fan account</p><p>:fatyoshi:</p>",
  "url": "https://mastodon.social/@trwnh",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/014/715/original/34aa222f4ae2e0a9.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/014/715/original/34aa222f4ae2e0a9.png",
  "header": "https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg",
  "header_static": "https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg",
  "followers_count": 821,
  "following_count": 178,
  "statuses_count": 33120,
  "last_status_at": "2019-11-24T15:49:42.251Z",
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": "",
    "note": "i have approximate knowledge of many things. perpetual student. (nb/ace/they)\r\n\r\nxmpp/email: a@trwnh.com\r\nhttps://trwnh.com\r\nhelp me live: https://liberapay.com/at or https://paypal.me/trwnh\r\n\r\n- my triggers are moths and glitter\r\n- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise\r\n- dm me if i did something wrong, so i can improve\r\n- purest person on fedi, do not lewd in my presence\r\n- #1 ami cole fan account\r\n\r\n:fatyoshi:",
    "fields": [
      {
        "name": "Website",
        "value": "https://trwnh.com",
        "verified_at": "2019-08-29T04:14:55.571+00:00"
      },
      {
        "name": "Sponsor",
        "value": "https://liberapay.com/at",
        "verified_at": "2019-11-15T10:06:15.557+00:00"
      },
      {
        "name": "Fan of:",
        "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo's Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
        "verified_at": null
      },
      {
        "name": "Main topics:",
        "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i'm just here to hang out and talk to cool people!",
        "verified_at": null
      }
    ],
    "follow_requests_count": 0
  },
  "emojis": [
    {
      "shortcode": "fatyoshi",
      "url": "https://files.mastodon.social/custom_emojis/images/000/023/920/original/e57ecb623faa0dc9.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/023/920/static/e57ecb623faa0dc9.png",
      "visible_in_picker": true
    }
  ],
  "fields": [
    {
      "name": "Website",
      "value": "<a href=\"https://trwnh.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-08-29T04:14:55.571+00:00"
    },
    {
      "name": "Sponsor",
      "value": "<a href=\"https://liberapay.com/at\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/at</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-11-15T10:06:15.557+00:00"
    },
    {
      "name": "Fan of:",
      "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&apos;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
      "verified_at": null
    },
    {
      "name": "Main topics:",
      "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i&apos;m just here to hang out and talk to cool people!",
      "verified_at": null
    }
  ]
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Your credential verification will fail if the token is invalid or incorrect.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=403 >}}
{{< api-method-response-example-description >}}

Your user account is currently disabled, missing a confirmed email address, or pending approval.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="disabled" >}}
```javascript
{
  "error": "Your login is currently disabled"
}
```
{{< endtab >}}

{{< tab title="unconfirmed" >}}
```javascript
{
  "error": "Your login is missing a confirmed e-mail address"
}
```
{{< endtab >}}

{{< tab title="unapproved" >}}
```javascript
{
  "error": "Your login is currently pending approval"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="patch" host="https://mastodon.example" path="/api/v1/accounts/update_credentials" title="Update account credentials" >}}
{{< api-method-description >}}

Update the user's display and preferences.

**Returns:** the user's own Account with Source\
**OAuth:** User token + `write:accounts`\
**Version history:**\
1.1.1 - added\
2.3.0 - added `locked` parameter\
2.4.0 - added `source[privacy,sensitive]` parameters\
2.7.0 - added `discoverable` parameter

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="discoverable" type="string" required=false >}}
Whether the account should be shown in the profile directory.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="bot" type="boolean" required=false >}}
Whether the account has a bot flag.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="display_name" type="string" required=false >}}
The display name to use for the profile.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="note" type="string" required=false >}}
The account bio.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="avatar" type="string" required=false >}}
Avatar image encoded using multipart/form-data
{{< endapi-method-parameter >}}
{{< api-method-parameter name="header" type="string" required=false >}}
Header image encoded using multipart/form-data
{{< endapi-method-parameter >}}
{{< api-method-parameter name="locked" type="boolean" required=false >}}
Whether manual approval of follow requests is required.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="source\[privacy\]" type="string" required=false >}}
Default post privacy for authored statuses.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="source\[sensitive\]" type="boolean" required=false >}}
Whether to mark authored statuses as sensitive by default.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="source\[language\]" type="string" required=false >}}
Default language to use for authored statuses. \(ISO 6391\)
{{< endapi-method-parameter >}}
{{< api-method-parameter name="fields_attributes" type="array" required=false >}}
Profile metadata `name` and `value`. \(By default, max 4 fields and 255 characters per property/value\)
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

You should use accounts/verify_credentials to first obtain plaintext representations from within the `source` parameter, then allow the user to edit these plaintext representations before submitting them through this API. The server will generate the corresponding HTML.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "14715",
  "username": "trwnh",
  "acct": "trwnh",
  "display_name": "infinite love ⴳ",
  "locked": false,
  "bot": false,
  "created_at": "2016-11-24T10:02:12.085Z",
  "note": "<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/at\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/at</span><span class=\"invisible\"></span></a> or <a href=\"https://paypal.me/trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">paypal.me/trwnh</span><span class=\"invisible\"></span></a></p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence<br />- #1 ami cole fan account</p><p>:fatyoshi:</p>",
  "url": "https://mastodon.social/@trwnh",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/014/715/original/34aa222f4ae2e0a9.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/014/715/original/34aa222f4ae2e0a9.png",
  "header": "https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg",
  "header_static": "https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg",
  "followers_count": 834,
  "following_count": 182,
  "statuses_count": 33760,
  "last_status_at": "2019-12-01T00:12:08.731Z",
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": "",
    "note": "i have approximate knowledge of many things. perpetual student. (nb/ace/they)\r\n\r\nxmpp/email: a@trwnh.com\r\nhttps://trwnh.com\r\nhelp me live: https://liberapay.com/at or https://paypal.me/trwnh\r\n\r\n- my triggers are moths and glitter\r\n- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise\r\n- dm me if i did something wrong, so i can improve\r\n- purest person on fedi, do not lewd in my presence\r\n- #1 ami cole fan account\r\n\r\n:fatyoshi:",
    "fields": [
      {
        "name": "Website",
        "value": "https://trwnh.com",
        "verified_at": "2019-08-29T04:14:55.571+00:00"
      },
      {
        "name": "Sponsor",
        "value": "https://liberapay.com/at",
        "verified_at": "2019-11-15T10:06:15.557+00:00"
      },
      {
        "name": "Fan of:",
        "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo's Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
        "verified_at": null
      },
      {
        "name": "Main topics:",
        "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i'm just here to hang out and talk to cool people!",
        "verified_at": null
      }
    ],
    "follow_requests_count": 0
  },
  "emojis": [
    {
      "shortcode": "fatyoshi",
      "url": "https://files.mastodon.social/custom_emojis/images/000/023/920/original/e57ecb623faa0dc9.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/023/920/static/e57ecb623faa0dc9.png",
      "visible_in_picker": true
    }
  ],
  "fields": [
    {
      "name": "Website",
      "value": "<a href=\"https://trwnh.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-08-29T04:14:55.571+00:00"
    },
    {
      "name": "Sponsor",
      "value": "<a href=\"https://liberapay.com/at\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/at</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-11-15T10:06:15.557+00:00"
    },
    {
      "name": "Fan of:",
      "value": "Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&apos;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)",
      "verified_at": null
    },
    {
      "name": "Main topics:",
      "value": "systemic analysis, design patterns, anticapitalism, info/tech freedom, theory and philosophy, and otherwise being a genuine and decent wholesome poster. i&apos;m just here to hang out and talk to cool people!",
      "verified_at": null
    }
  ]
}
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


## Retrieve information

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/:id" title="Account" >}}
{{< api-method-description >}}

View information about a profile.

**Returns:** Account\
**OAuth:** Public\
**Version history:**\
0.0.0 - added\
2.4.0 - returns 410 if account is suspended\
3.3.0 - returns an Account with `suspended: true` instead of 410

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Account record will be returned. Note that `acct` of local users does not include the domain name.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="Local user" >}}
```javascript
{
  "id": "1",
  "username": "Gargron",
  "acct": "Gargron",
  "display_name": "Eugen",
  "locked": false,
  "bot": false,
  "created_at": "2016-03-16T14:34:26.392Z",
  "note": "<p>Developer of Mastodon and administrator of mastodon.social. I post service announcements, development updates, and personal stuff.</p>",
  "url": "https://mastodon.social/@Gargron",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
  "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
  "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/c91b871f294ea63e.png",
  "followers_count": 318699,
  "following_count": 453,
  "statuses_count": 61013,
  "last_status_at": "2019-11-30T20:02:08.277Z",
  "emojis": [],
  "fields": [
    {
      "name": "Patreon",
      "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
      "verified_at": null
    },
    {
      "name": "Homepage",
      "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-07-15T18:29:57.191+00:00"
    }
  ]
}
```
{{< endtab >}}

{{< tab title="Remote user" >}}
```javascript
{
  "id": "23634",
  "username": "noiob",
  "acct": "noiob@awoo.space",
  "display_name": "shork",
  "locked": false,
  "bot": false,
  "created_at": "2017-02-08T02:00:53.274Z",
  "note": "<p>:ms_rainbow_flag:​ :ms_bisexual_flag:​ :ms_nonbinary_flag:​ <a href=\"https://awoo.space/tags/awoo\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>awoo</span></a>.space <a href=\"https://awoo.space/tags/admin\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>admin</span></a> ~ <a href=\"https://awoo.space/tags/bi\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>bi</span></a> ~ <a href=\"https://awoo.space/tags/nonbinary\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>nonbinary</span></a> ~ compsci student ~ likes video <a href=\"https://awoo.space/tags/games\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>games</span></a> and weird/ old electronics and will post obsessively about both ~ avatar by <span class=\"h-card\"><a href=\"https://weirder.earth/@dzuk\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>dzuk</span></a></span></p>",
  "url": "https://awoo.space/@noiob",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "header": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "header_static": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "followers_count": 553,
  "following_count": 405,
  "statuses_count": 28982,
  "last_status_at": "2019-12-01T00:39:57.264Z",
  "emojis": [
    {
      "shortcode": "ms_rainbow_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/028/691/original/6de008d6281f4f59.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/028/691/static/6de008d6281f4f59.png",
      "visible_in_picker": true
    },
    {
      "shortcode": "ms_bisexual_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/050/744/original/02f94a5fca7eaf78.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/050/744/static/02f94a5fca7eaf78.png",
      "visible_in_picker": true
    },
    {
      "shortcode": "ms_nonbinary_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/105/099/original/8106088bd4782072.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/105/099/static/8106088bd4782072.png",
      "visible_in_picker": true
    }
  ],
  "fields": [
    {
      "name": "Pronouns",
      "value": "they/them",
      "verified_at": null
    },
    {
      "name": "Alt",
      "value": "<span class=\"h-card\"><a href=\"https://cybre.space/@noiob\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>noiob</span></a></span>",
      "verified_at": null
    },
    {
      "name": "Bots",
      "value": "<span class=\"h-card\"><a href=\"https://botsin.space/@darksouls\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>darksouls</span></a></span>, <span class=\"h-card\"><a href=\"https://botsin.space/@nierautomata\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>nierautomata</span></a></span>, code for <span class=\"h-card\"><a href=\"https://botsin.space/@awoobot\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>awoobot</span></a></span>",
      "verified_at": null
    },
    {
      "name": "Website",
      "value": "<a href=\"http://shork.xyz\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">http://</span><span class=\"\">shork.xyz</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-11-23T20:25:47.907+00:00"
    }
  ]
}
```
{{< endtab >}}

{{< tab title="Suspended user" >}}
```javascript
{
  "id": "14",
  "username": "stigatle",
  "acct": "stigatle@quitter.no",
  "display_name": "",
  "locked": false,
  "bot": false,
  "discoverable": false,
  "group": false,
  "created_at": "2016-03-18T10:04:51.700Z",
  "note": "",
  "url": "https://quitter.no/stigatle",
  "avatar": "https://mastodon.social/avatars/original/missing.png",
  "avatar_static": "https://mastodon.social/avatars/original/missing.png",
  "header": "https://mastodon.social/headers/original/missing.png",
  "header_static": "https://mastodon.social/headers/original/missing.png",
  "followers_count": 0,
  "following_count": 0,
  "statuses_count": 0,
  "last_status_at": null,
  "suspended": true,
  "emojis": [],
  "fields": []
}
```
{{< endtab >}}

{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

If the instance is in whitelist mode and the Authorization header is missing or invalid
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "This API requires an authenticated user"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Account does not exist
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=410 >}}
{{< api-method-response-example-description >}}

Account is suspended
{{< endapi-method-response-example-description >}}


```markup

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/:id/statuses" title="Statuses" >}}
{{< api-method-description >}}

Statuses posted to the given account.

**Returns:** Array of Status\
**OAuth:** Public \(for public statuses only\), or user token + `read:statuses` \(for private statuses the user is authorized to see\)\
**Version history:**\
0.0.0 - added\
2.6.0 - add `min_id`\
2.7.0 - add `exclude_reblogs` and allow unauthed use\
2.8.0 - add `tagged` parameter

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=false >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Instance is in whitelist mode or running a version of Mastodon older than 2.7.0, and the Authorization header is invalid or missing
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="whitelist" >}}
```javascript
{
  "error": "This API requires an authenticated user"
}
```
{{< endtab >}}

{{< tab title="pre-2.7.0" >}}
```javascript
{
  "error": "The access token is invalid"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Account is deleted or does not exist
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=410 >}}
{{< api-method-response-example-description >}}

Account is suspended
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/:id/followers" title="Followers" >}}
{{< api-method-description >}}

Accounts which follow the given account, if network is not hidden by the account owner.

**Returns:** Array of Account\
**OAuth:** App token + `read:accounts`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;app token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="number" required=false >}}
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample output with limit=2. Because the ID of follow relationships is not generally used or provided with any API calls, an HTTP `Link` header is used instead to indicate next and previous pages. You will have to parse this header yourself to extract the paging URLs.
{{< endapi-method-response-example-description >}}


```javascript
Link: <https://mastodon.social/api/v1/accounts/14715/followers?limit=2&max_id=7486869>; rel="next", <https://mastodon.social/api/v1/accounts/14715/followers?limit=2&since_id=7489740>; rel="prev"

[
  {
    "id": "1020382",
    "username": "atul13061987",
    "acct": "atul13061987",
    "display_name": "",
    "locked": false,
    "bot": false,
    "created_at": "2019-12-04T07:17:02.745Z",
    "note": "<p></p>",
    "url": "https://mastodon.social/@atul13061987",
    "avatar": "https://mastodon.social/avatars/original/missing.png",
    "avatar_static": "https://mastodon.social/avatars/original/missing.png",
    "header": "https://mastodon.social/headers/original/missing.png",
    "header_static": "https://mastodon.social/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 2,
    "statuses_count": 0,
    "last_status_at": null,
    "emojis": [],
    "fields": []
  },
  {
    "id": "1020381",
    "username": "linuxliner",
    "acct": "linuxliner",
    "display_name": "",
    "locked": false,
    "bot": false,
    "created_at": "2019-12-04T07:15:56.426Z",
    "note": "<p></p>",
    "url": "https://mastodon.social/@linuxliner",
    "avatar": "https://mastodon.social/avatars/original/missing.png",
    "avatar_static": "https://mastodon.social/avatars/original/missing.png",
    "header": "https://mastodon.social/headers/original/missing.png",
    "header_static": "https://mastodon.social/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 2,
    "statuses_count": 0,
    "last_status_at": null,
    "emojis": [],
    "fields": []
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header, or instance is in whitelist mode and your token is not authorized with a user
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="header" >}}
```javascript
{
  "error": "The access token is invalid"
}
```
{{< endtab >}}

{{< tab title="whitelist" >}}
```javascript
{
  "error": "This API requires an authenticated user"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Account is deleted or does not exist
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=410 >}}
{{< api-method-response-example-description >}}

Account is suspended
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/:id/following" title="Following" >}}
{{< api-method-description >}}

Accounts which the given account is following, if network is not hidden by the account owner.

**Returns:** Array of Account\
**OAuth:** App token + `read:accounts`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;app token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="max_id" type="string" required=false >}}
**Internal parameter.** Use HTTP `Link` header for pagination.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="since_id" type="string" required=false >}}
**Internal parameter.** Use HTTP `Link` header for pagination.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Maximum number of results to return. Defaults to 40.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample output with limit=2. Because the ID of follow relationships is not generally used or provided with any API calls, an HTTP `Link` header is used instead to indicate next and previous pages. You will have to parse this header yourself to extract the paging URLs.
{{< endapi-method-response-example-description >}}


```javascript
Link: <https://mastodon.social/api/v1/accounts/1/followers?limit=2&max_id=7628164>; rel="next", <https://mastodon.social/api/v1/accounts/1/followers?limit=2&since_id=7628165>; rel="prev"

[
  {
    "id": "963410",
    "username": "gautambhatia",
    "acct": "gautambhatia",
    "display_name": "Gautam Bhatia",
    "locked": false,
    "bot": false,
    "created_at": "2019-11-07T13:06:57.442Z",
    "note": "<p>SF reader, editor, and writer.</p>",
    "url": "https://mastodon.social/@gautambhatia",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/963/410/original/d8e0fd5cefcf9687.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/963/410/original/d8e0fd5cefcf9687.jpg",
    "header": "https://mastodon.social/headers/original/missing.png",
    "header_static": "https://mastodon.social/headers/original/missing.png",
    "followers_count": 1900,
    "following_count": 52,
    "statuses_count": 183,
    "last_status_at": "2019-12-02T17:52:39.463Z",
    "emojis": [],
    "fields": []
  },
  {
    "id": "1007400",
    "username": "seafrog",
    "acct": "seafrog@glitterkitten.co.uk",
    "display_name": "🐓🦃 Heck Partridge 🤠 🦆",
    "locked": false,
    "bot": false,
    "created_at": "2019-11-19T18:46:49.977Z",
    "note": "<p>hi im elise!! this is scribblefrog's new account</p><p>she/her, 27</p>",
    "url": "https://glitterkitten.co.uk/@seafrog",
    "avatar": "https://files.mastodon.social/accounts/avatars/001/007/400/original/306cd22c1b118693.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/001/007/400/original/306cd22c1b118693.png",
    "header": "https://files.mastodon.social/accounts/headers/001/007/400/original/fd9728559f7265f5.jpeg",
    "header_static": "https://files.mastodon.social/accounts/headers/001/007/400/original/fd9728559f7265f5.jpeg",
    "followers_count": 168,
    "following_count": 223,
    "statuses_count": 944,
    "last_status_at": "2019-12-04T00:44:08.603Z",
    "emojis": [],
    "fields": [
      {
        "name": "gotdamb",
        "value": "frog",
        "verified_at": null
      },
      {
        "name": "whomst lov",
        "value": "the oceane",
        "verified_at": null
      }
    ]
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="header" >}}
```javascript
{
  "error": "The access token is invalid"
}
```
{{< endtab >}}

{{< tab title="whitelist" >}}
```
{
  "error": "This API requires an authenticated user"
}
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Account is deleted or does not exist
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=410 >}}
{{< api-method-response-example-description >}}

Account is suspended
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/:id/featured_tags" title="Featured tags" >}}
{{< api-method-description >}}

Tags featured by this account.

**Returns:** Array of FeaturedTag\
**OAuth:** User token + `read:accounts`\
**Version history:**\
3.3.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "627",
    "name": "nowplaying",
    "statuses_count": 36,
    "last_status_at": "2019-11-15T07:14:43.524Z"
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
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

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/:id/lists" title="Lists containing this account" >}}
{{< api-method-description >}}

User lists that you have added this account to.

**Returns:** Array of List\
**OAuth:** User token + `read:lists`\
**Version history:**\
2.1.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
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

If the account is part of any lists, those entities will be returned. If the account is not part of any of your lists, then an empty array will be returned.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="part of lists" >}}
```javascript
[
  {
    "id": "13694",
    "title": "dev"
  }
]
```
{{< endtab >}}

{{< tab title="not in any lists" >}}
```javascript
[]
```
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Account with given id does not exist or is deleted
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=410 >}}
{{< api-method-response-example-description >}}

Account with given id is suspended
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/:id/identity_proofs" title="Identity proofs" >}}
{{< api-method-description >}}

**Returns:** Array of IdentityProof\
**OAuth:** User token\
**Version history:**\
2.8.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "provider": "Keybase",
    "provider_username": "gargron",
    "updated_at": "2019-07-21T20:14:39.596Z",
    "proof_url": "https://keybase.io/gargron/sigchain#5cfc20c7018f2beefb42a68836da59a792e55daa4d118498c9b1898de7e845690f",
    "profile_url": "https://keybase.io/gargron"
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Account with given id is deleted or does not exist
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=410 >}}
{{< api-method-response-example-description >}}

Account with given id is suspended
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "This method requires an authenticated user"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


## Perform actions on an account

{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/follow" title="Follow" >}}
{{< api-method-description >}}

Follow the given account. Can also be used to update whether to show reblogs or enable notifications.

**Returns:** Relationship\
**OAuth:** User token + `write:follows` or `follow`\
**Version history:**\
0.0.0 - added\
3.3.0 - added `notify`

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="reblogs" type="boolean" required=false >}}
Receive this account's reblogs in home timeline? Defaults to true.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="notify" type="boolean" required=false >}}
Receive notifications when this account posts a status? Defaults to false.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Successfully followed, or account was already followed
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "3",
  "following": true,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=403 >}}
{{< api-method-response-example-description >}}

Trying to follow someone that you block or that blocks you
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "This action is not allowed"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/unfollow" title="Unfollow" >}}
{{< api-method-description >}}

Unfollow the given account.

**Returns:** Relationship\
**OAuth:** User token + `write:follows` or `follow`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
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

Successfully unfollowed, or account was already not followed
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/block" title="Block" >}}
{{< api-method-description >}}

Block the given account. Clients should filter statuses from this account if received \(e.g. due to a boost in the Home timeline\)

**Returns:** Relationship\
**OAuth:** User token + `write:blocks` or `follow`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
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

Successfully blocked, or account was already blocked
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": true,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/unblock" title="Unblock" >}}
{{< api-method-description >}}

Unblock the given account.

**Returns:** Relationship\
**OAuth:** User token + `write:blocks` or `follow`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
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

Successfully unblocked, or account was already not blocked
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/mute" title="Mute" >}}
{{< api-method-description >}}

Mute the given account. Clients should filter statuses and notifications from this account, if received \(e.g. due to a boost in the Home timeline\).

**Returns:** Relationship\
**OAuth:** User token + `write:mutes` or `follow`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="notifications" type="boolean" required=false >}}
Mute notifications in addition to statuses? Defaults to true.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="duration" type="number" required=false >}}
How long the mute should last, in seconds. Defaults to 0 (indefinite).
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Successfully muted, or account was already muted. Note that you can call this API method again with notifications=false to update the relationship so that only statuses are muted.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": true,
  "muting_notifications": true,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/unmute" title="Unmute" >}}
{{< api-method-description >}}

Unmute the given account.

**Returns:** Relationship\
**OAuth:** User token + `write:mutes` or `follow`\
**Version history:**\
0.0.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
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

Successfully unmuted, or account was already unmuted
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "3",
  "following": false,
  "showing_reblogs": false,
  "notifying": false,
  "followed_by": false,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
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
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/pin" title="Feature on profile" >}}
{{< api-method-description >}}

Add the given account to the user's featured profiles. \(Featured profiles are currently shown on the user's own public profile.\)

**Returns:** Relationship\
**OAuth:** User token + `write:accounts`\
**Version history:**\
2.5.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
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

Successfully endorsed.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": true
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=403 >}}
{{< api-method-response-example-description >}}

Token is not authorized with a valid user or is missing a required scope
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "This action is outside the authorized scopes"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

You are not following this account
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Validation failed: You must be already following the person you want to endorse"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=500 >}}
{{< api-method-response-example-description >}}

Account already endorsed
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/unpin" title="Unfeature on profile" >}}
{{< api-method-description >}}

Remove the given account from the user's featured profiles.

**Returns:** Relationship\
**OAuth:** User + `write:accounts`\
**Version history:**\
2.5.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
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

Successfully unendorsed, or account was already not endorsed
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false
}
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
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/accounts/:id/note" title="User note" >}}
{{< api-method-description >}}

Sets a private note on a user.

**Returns:** Relationship\
**OAuth:** User + `write:accounts`\
**Version history:**\
3.2.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the account in the database
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="comment" type="string" required=false >}}
The comment to be set on that user. Provide an empty string or leave out this parameter to clear the currently set note.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Successfully updated user note
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "1",
  "following": true,
  "showing_reblogs": true,
  "notifying": false,
  "followed_by": true,
  "blocking": false,
  "blocked_by": false,
  "muting": false,
  "muting_notifications": false,
  "requested": false,
  "domain_blocking": false,
  "endorsed": false,
  "note": "this is a comment"
}
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
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


## General account actions

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/relationships" title="Check relationships to other accounts" >}}
{{< api-method-description >}}

Find out whether a given account is followed, blocked, muted, etc.

**Returns:** Array of Relationship\
**OAuth:** User token + `read:follows`\
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
{{< api-method-query-parameters >}}
{{< api-method-parameter name="id\[\]" type="array" required=true >}}
Array of account IDs to check
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Sample call with id\[\]=1&id\[\]=2
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "1",
    "following": true,
    "showing_reblogs": true,
    "notifying": false,
    "followed_by": true,
    "blocking": false,
    "blocked_by": false,
    "muting": false,
    "muting_notifications": false,
    "requested": false,
    "domain_blocking": false,
    "endorsed": false
  },
  {
    "id": "2",
    "following": false,
    "showing_reblogs": false,
    "notifying": false,
    "followed_by": false,
    "blocking": false,
    "blocked_by": false,
    "muting": false,
    "muting_notifications": false,
    "requested": false,
    "domain_blocking": false,
    "endorsed": false
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

Token does not have an authorized user
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "This method requires an authenticated user"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/accounts/search" title="Search for matching accounts" >}}
{{< api-method-description >}}

Search for matching accounts by username or display name.

**Returns:** Array of Account\
**OAuth:** User token + `read:accounts`\
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
{{< api-method-query-parameters >}}
{{< api-method-parameter name="q" type="string" required=true >}}
What to search for
{{< endapi-method-parameter >}}
{{< api-method-parameter name="limit" type="string" required=false >}}
Maximum number of results. Defaults to 40.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="resolve" type="string" required=false >}}
Attempt WebFinger lookup. Defaults to false. Use this when `q` is an exact address.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="following" type="string" required=false >}}
Only who the user is following. Defaults to false.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Accounts matching "trwnh" in username or display name
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    ...
  },
  {
    "id": "418714",
    "username": "trwnh",
    "acct": "trwnh@pixelfed.social",
    "display_name": "Abdullah Tarawneh",
    ...
  },
  {
    "id": "419674",
    "username": "trwnh",
    "acct": "trwnh@write.as",
    "display_name": "trwnh",
    ...
  },
  ...
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=503 >}}
{{< api-method-response-example-description >}}

resolve=true, but the domain part of the user@domain address is not a currently live website
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Remote data could not be fetched"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


