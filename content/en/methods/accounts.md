---
title: accounts API methods
description: Methods concerning accounts and profiles.
menu:
  docs:
    weight: 20
    name: accounts
    parent: methods
    identifier: methods-accounts
aliases: [
  "/methods/accounts",
  "/api/methods/accounts"
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Register an account {#create}

```http
POST /api/v1/accounts HTTP/1.1
```

Creates a user and account records. Returns an account access token for the app that initiated the request. The app should save this token for later, and should wait for the user to confirm their account by clicking a link in their email inbox.

**Returns:** [Token]({{< relref "entities/token" >}})\
**OAuth:** App token + `write:accounts`\
**Version history:**\
2.7.0 - added\
3.0.0 - added `reason` parameter\
3.4.0 - added `details` to failure response

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <app token>` to gain authorized access to this API method.

##### Form data parameters

username
: {{<required>}} String. The desired username for the account

email
: {{<required>}} String. The email address to be used for login

password
: {{<required>}} String. The password to be used for login

agreement
: {{<required>}} Boolean. Whether the user agrees to the local rules, terms, and policies. These should be presented to the user in order to allow them to consent before setting this parameter to TRUE.

locale
: {{<required>}} String. The language of the confirmation email that will be sent.

reason
: String. If registrations require manual approval, this text will be reviewed by moderators.

#### Response

##### 200: OK

```json
```

##### 401: Unauthorized

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

The `details` parameter contains all detected errors. Its structure is a Hash with the key being the erroneous parameter, and its value being an array of all errors found.

Example error response:

```json
{
  "error": "Validation failed: Password can't be blank, Username must contain only letters, numbers and underscores, Agreement must be accepted",
  "details": {
    "password": [
      {
        "error": "ERR_BLANK",
        "description": "can't be blank"
      }
    ],
    "username": [
      {
        "error": "ERR_INVALID",
        "description": "must contain only letters, numbers and underscores"
      }
    ],
    "agreement": [
      {
        "error": "ERR_ACCEPTED",
        "description": "must be accepted"
      }
    ]
  }
}
```

You may expect the following errors:

ERR_BLOCKED
: When e-mail provider is not allowed

ERR_UNREACHABLE
: When e-mail address does not resolve to any IP via DNS (MX, A, AAAA)

ERR_TAKEN
: When username or e-mail are already taken

ERR_RESERVED
: When a username is reserved, e.g. "webmaster" or "admin"

ERR_ACCEPTED
: When agreement has not been accepted

ERR_BLANK
: When a required attribute is blank

ERR_INVALID
: When an attribute is malformed, e.g. wrong characters or invalid e-mail address

ERR_TOO_LONG
: When an attribute is over the character limit

ERR_TOO_SHORT
: When an attribute is under the character requirement

ERR_INCLUSION
: When an attribute is not one of the allowed values, e.g. unsupported locale

##### 429: Rate limited

```json
{
  "error": "Too many requests"
}
```

---

## Verify account credentials {#verify_credentials}

```http
GET /api/v1/accounts/verify_credentials HTTP/1.1
```

Test to make sure that the user token works.

**Returns:** [CredentialAccount]({{< relref "entities/Account#CredentialAccount">}})\
**OAuth**: User token + `read:accounts`\
**Version history:**\
0.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

Note the extra `source` property, which is not visible on accounts other than your own. Also note that plain-text is used within `source` and HTML is used for their corresponding properties such as `note` and `fields`.

```json
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

##### 401: Unauthorized

Your credential verification will fail if the token is invalid or incorrect.

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

Your user account is currently disabled, missing a confirmed email address, or pending approval.

```json
{
  "error": "Your login is currently disabled"
}
```

```json
{
  "error": "Your login is missing a confirmed e-mail address"
}
```

```json
{
  "error": "Your login is currently pending approval"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Update account credentials {#update_credentials}

```http
PATCH /api/v1/accounts/update_credentials HTTP/1.1
```

Update the user's display and preferences.

**Returns:** the user's own [Account]({{< relref "entities/Account">}}) with [`source`]({{< relref "entities/Account#source">}}) attribute\
**OAuth:** User token + `write:accounts`\
**Version history:**\
1.1.1 - added\
2.3.0 - added `locked` parameter\
2.4.0 - added `source[privacy,sensitive]` parameters\
2.4.2 - added `source[language]` parameter\
2.7.0 - added `discoverable` parameter\
4.1.0 - added `hide_collections` parameter\
4.2.0 - added `indexable` parameter

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

display_name
: String. The display name to use for the profile. 

note
: String. The account bio.

avatar
: Avatar image encoded using `multipart/form-data`

header
: Header image encoded using `multipart/form-data`

locked
: Boolean. Whether manual approval of follow requests is required.

bot
: Boolean. Whether the account has a bot flag.

discoverable
: Boolean. Whether the account should be shown in the profile directory.

hide_collections
: Boolean. Whether to hide followers and followed accounts.

indexable
: Boolean. Whether public posts should be searchable to anyone.

fields_attributes
: Hash. The profile fields to be set. Inside this hash, the key is an integer cast to a string (although the exact integer does not matter), and the value is another hash including `name` and `value`. By default, max 4 fields.

fields_attributes[:index][name]
: String. The name of the profile field. By default, max 255 characters.

fields_attributes[:index][value]
: String. The value of the profile field. By default, max 255 characters.

source[privacy]
: String. Default post privacy for authored statuses. Can be `public`, `unlisted`, or `private`.

source[sensitive]
: Boolean. Whether to mark authored statuses as sensitive by default.

source[language]
: String. Default language to use for authored statuses (ISO 6391)

#### Response

##### 200: OK

To update account fields, you will need to construct your hash like so for example:

```json
{
  "fields_attributes": {
    "0": {
      "name": "Website",
      "value": "https://trwnh.com"
    },
    "1": {
      "name": "Sponsor",
      "value": "https://liberapay.com/at"
    },
    // ...
  }
}
```

As query parameters, your request may look something like this:

```http
PATCH https://mastodon.example/api/v1/accounts/update_credentials
?fields_attributes[0][name]=Website
&fields_attributes[0][value]=https://trwnh.com
&fields_attributes[1][name]=Sponsor
&fields_attributes[1][value]=https://liberapay.com/at
&...
```

Note that the integer index does not actually matter -- fields will be populated by the order in which they are provided. For example:

```json
{
  "fields_attributes": {
    "420": {
      "name": "1st",
      "value": "field"
    },
    "69": {
      "name": "2nd",
      "value": "field"
    },
    "1312": {
      "name": "3rd",
      "value": "field"
    },
    "-99999999999999999999999999999999": {
      "name": "4th",
      "value": "field"
    },
  }
}
```

You should use accounts/verify_credentials to first obtain plaintext representations from within the `source` parameter, then allow the user to edit these plaintext representations before submitting them through this API. The server will generate the corresponding HTML.

```json
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

##### 401: Unauthorized

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Get account {#get}

```http
GET /api/v1/accounts/:id HTTP/1.1
```

View information about a profile.

**Returns:** [Account]({{< relref "entities/Account">}})\
**OAuth:** Public\
**Version history:**\
0.0.0 - added\
2.4.0 - returns 410 if account is suspended\
3.3.0 - returns an Account with `suspended: true` instead of 410

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The Account record will be returned. Note that `acct` of local users does not include the domain name.

###### Local user

```json
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

###### Remote user

```json
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

###### Suspended user

```json
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

##### 401: Unauthorized

If the instance is in whitelist mode and the Authorization header is missing or invalid

```json
{
  "error": "This API requires an authenticated user"
}
```

##### 404: Not found

Account does not exist

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

Account is suspended (since 2.4.0 and until 3.3.0)

---

## Get account's statuses {#statuses}

```http
GET /api/v1/accounts/:id/statuses HTTP/1.1
```

Statuses posted to the given account.

**Returns:** Array of [Status]({{< relref "entities/status">}})\
**OAuth:** Public (for public statuses only), or user token + `read:statuses` (for private statuses the user is authorized to see)\
**Version history:**\
0.0.0 - added\
1.4.2 - add `only_media` and `exclude_replies`\
1.6.0 - add `pinned`\
2.6.0 - add `min_id`\
2.7.0 - add `exclude_reblogs` and allow unauthed use\
2.8.0 - add `tagged` parameter\
3.3.0 - both `min_id` and `max_id` can be used at the same time now

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id
: String. All results returned will be lesser than this ID. In effect, sets an upper bound on results.

since_id
: String. All results returned will be greater than this ID. In effect, sets a lower bound on results.

min_id
: String. Returns results immediately newer than this ID. In effect, sets a cursor at this ID and paginates forward.

limit
: Integer. Maximum number of results to return. Defaults to 20 statuses. Max 40 statuses.

only_media
: Boolean. Filter out statuses without attachments.

exclude_replies
: Boolean. Filter out statuses in reply to a different account.

exclude_reblogs
: Boolean. Filter out boosts from the response.

pinned
: Boolean. Filter for pinned statuses only. Defaults to false, which includes all statuses. Pinned statuses do not receive special priority in the order of the returned results.

tagged
: String. Filter for statuses using a specific hashtag.

#### Response
##### 200: OK

```json
[
  {
    "id": "108880211901672326",
    "created_at": "2022-08-24T22:29:46.493Z",
    "in_reply_to_id": "108880209317577809",
    "in_reply_to_account_id": "103641",
    "sensitive": false,
    // ...
  },
  // ...
]
```

##### 401: Unauthorized

If the instance is in whitelist mode and the Authorization header is missing or invalid

Sample response for whitelist mode:

```json
{
  "error": "This API requires an authenticated user"
}
```

Sample response before 2.7.0:

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Account does not exist

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

Account is suspended (since 2.4.0 and until 3.3.0)

---

## Get account's followers {#followers}

```http
GET /api/v1/accounts/:id/followers HTTP/1.1
```

Accounts which follow the given account, if network is not hidden by the account owner.

**Returns:** Array of [Account]({{< relref "entities/Account">}})\
**OAuth:** Public\
**Version history:**\
0.0.0 - added\
3.3.0 - both `min_id` and `max_id` can be used at the same time now\
4.0.0 - no longer requires an app token + `read:accounts`

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

min_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

Sample output with limit=2.

```json
[
  {
    "id": "1020382",
    "username": "atul13061987",
    "acct": "atul13061987",
    "display_name": "",
    // ...
  },
  {
    "id": "1020381",
    "username": "linuxliner",
    "acct": "linuxliner",
    "display_name": "",
    // ...
  }
]
```

Because Follow IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/accounts/14715/followers?limit=2&max_id=7486869>; rel="next", <https://mastodon.example/api/v1/accounts/14715/followers?limit=2&since_id=7489740>; rel="prev"
```

##### 401: Unauthorized

Invalid or missing Authorization header, or instance is in whitelist mode and your token is not authorized with a user

Sample response for whitelist mode:

```json
{
  "error": "This API requires an authenticated user"
}
```

Sample response with missing header or invalid token:

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Account does not exist

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

Account is suspended (since 2.4.0 and until 3.3.0)

---

## Get account's following {#following}

```http
GET /api/v1/accounts/:id/following HTTP/1.1
```

Accounts which the given account is following, if network is not hidden by the account owner.

**Returns:** Array of [Account]({{< relref "entities/Account">}})\
**OAuth:** Public\
**Version history:**\
0.0.0 - added\
3.3.0 - both `min_id` and `max_id` can be used at the same time now\
4.0.0 - no longer requires an app token + `read:accounts`

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

max_id 
: **Internal parameter.** Use HTTP `Link` header for pagination.

since_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

min_id
: **Internal parameter.** Use HTTP `Link` header for pagination.

limit
: Integer. Maximum number of results to return. Defaults to 40 accounts. Max 80 accounts.

#### Response
##### 200: OK

Sample output with limit=2.

```json
[
  {
    "id": "963410",
    "username": "gautambhatia",
    "acct": "gautambhatia",
    "display_name": "Gautam Bhatia",
    // ...
  },
  {
    "id": "1007400",
    "username": "seafrog",
    "acct": "seafrog@glitterkitten.co.uk",
    "display_name": "🐓🦃 Heck Partridge 🤠 🦆",
    // ...
]
```

Because Follow IDs are generally not exposed via any API responses, you will have to parse the HTTP `Link` header to load older or newer results. See [Paginating through API responses]({{<relref "api/guidelines#pagination">}}) for more information.

```http
Link: <https://mastodon.example/api/v1/accounts/1/followers?limit=2&max_id=7628164>; rel="next", <https://mastodon.example/api/v1/accounts/1/followers?limit=2&since_id=7628165>; rel="prev"
```

##### 401: Unauthorized

Invalid or missing Authorization header, or instance is in whitelist mode and your token is not authorized with a user

Sample response for whitelist mode:

```json
{
  "error": "This API requires an authenticated user"
}
```

Sample response with missing header or invalid token:

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Account does not exist

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

Account is suspended (since 2.4.0 and until 3.3.0)

---

## Get account's featured tags {#featured_tags}

```http
GET /api/v1/accounts/:id/featured_tags HTTP/1.1
```

Tags featured by this account.

**Returns:** Array of [FeaturedTag]({{< relref "entities/featuredtag">}})\
**OAuth:** Public\
**Version history:**\
3.3.0 - added

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
[
  {
    "id": "627",
    "name": "nowplaying",
    "statuses_count": 36,
    "last_status_at": "2019-11-15T07:14:43.524Z"
  }
]
```

---

## Get lists containing this account {#lists}

```http
GET /api/v1/accounts/:id/lists HTTP/1.1
```

User lists that you have added this account to.

**Returns:** Array of [List]({{< relref "entities/list">}})\
**OAuth:** User token + `read:lists`\
**Version history:**\
2.1.0 - added

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

If the account is part of any lists, those entities will be returned. If the account is not part of any of your lists, then an empty array will be returned.

```json
[
  {
    "id": "13694",
    "title": "dev"
  }
]
```

```json
[]
```

##### 401: Unauthorized

Invalid or missing Authorization header, or instance is in whitelist mode and your token is not authorized with a user

Sample response for whitelist mode:

```json
{
  "error": "This API requires an authenticated user"
}
```

Sample response with missing header or invalid token:

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Account does not exist

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

Account is suspended (since 2.4.0 and until 3.3.0)

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Follow account {#follow}

```http
POST /api/v1/accounts/:id/follow HTTP/1.1
```

Follow the given account. Can also be used to update whether to show reblogs or enable notifications.

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User token + `write:follows`\
**Version history:**\
0.0.0 - added\
3.3.0 - added `notify`\
3.5.0 - deprecated `follow` scope. now additionally accepts `write`\
4.0.0 - added `languages`

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

reblogs
: Boolean. Receive this account's reblogs in home timeline? Defaults to true.

notify
: Boolean. Receive notifications when this account posts a status? Defaults to false.

languages
: Array of String (ISO 639-1 language two-letter code). Filter received statuses for these languages. If not provided, you will receive this account's posts in all languages.

#### Response
##### 200: OK

Successfully followed, or account was already followed

```json
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

##### 403: Forbidden

Trying to follow someone that you block or that blocks you

```json
{
  "error": "This action is not allowed"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Unfollow account {#unfollow}

```http
POST /api/v1/accounts/:id/unfollow HTTP/1.1
```

Unfollow the given account.

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User token + `write:follows`\
**Version history:**\
0.0.0 - added\
3.5.0 - deprecated `follow` scope. now additionally accepts `write`

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Successfully unfollowed, or account was already not followed

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Remove account from followers {#remove_from_followers}

```http
POST /api/v1/accounts/:id/remove_from_followers HTTP/1.1
```

Remove the given account from your followers.

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User token + `write:follows`\
**Version history:**\
3.5.0 - added

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Successfully removed from followers, or account was already not following you

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Block account {#block}

```http
POST /api/v1/accounts/:id/block HTTP/1.1
```

Block the given account. Clients should filter statuses from this account if received (e.g. due to a boost in the Home timeline)

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User token + `write:blocks`\
**Version history:**\
0.0.0 - added\
3.5.0 - deprecated `follow` scope. now additionally accepts `write`

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Successfully blocked, or account was already blocked

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Unblock account {#unblock}

```http
POST /api/v1/accounts/:id/unblock HTTP/1.1
```

Unblock the given account.

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User token + `write:blocks`\
**Version history:**\
0.0.0 - added\
3.5.0 - deprecated `follow` scope. now additionally accepts `write`

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Successfully unblocked, or account was already not blocked

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Mute account {#mute}

```http
POST /api/v1/accounts/:id/mute HTTP/1.1
```

Mute the given account. Clients should filter statuses and notifications from this account, if received (e.g. due to a boost in the Home timeline).

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User token + `write:mutes`\
**Version history:**\
0.0.0 - added\
3.3.0 - added `duration`\
3.5.0 - deprecated `follow` scope. now additionally accepts `write`

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

notifications
: Boolean. Mute notifications in addition to statuses? Defaults to true.

duration
: Number. How long the mute should last, in seconds. Defaults to 0 (indefinite).

#### Response
##### 200: OK

Successfully muted, or account was already muted. Note that you can call this API method again with notifications=false to update the relationship so that only statuses are muted.

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Unmute account {#unmute}

```http
POST /api/v1/accounts/:id/unmute HTTP/1.1
```

Unmute the given account.

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User token + `write:mutes`\
**Version history:**\
0.0.0 - added\
3.5.0 - deprecated `follow` scope. now additionally accepts `write`

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Successfully unmuted, or account was already unmuted

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Feature account on your profile {#pin}

```http
POST /api/v1/accounts/:id/pin HTTP/1.1
```

Add the given account to the user's featured profiles. (Featured profiles are currently shown on the user's own public profile.)

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User token + `write:accounts`\
**Version history:**\
2.5.0 - added\
4.0.0 - calling this method is now idempotent

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Successfully endorsed, or was already endorsing.

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 403: Forbidden

Token is missing a required scope

```json
{
  "error": "This action is outside the authorized scopes"
}
```

##### 422: Unprocessable entity

You are not following this account

```json
{
  "error": "Validation failed: You must be already following the person you want to endorse"
}
```

Alternatively, the token is not authorized with a user

```json
{
  "error": "This method requires an authenticated user"
}
```

Alternatively (prior to 4.0), the account may already be endorsed

```json
{
  "error": "Duplicate record"
}
```

##### 500: Server error

Can sometimes be returned if the account already endorsed.

---

## Unfeature account from profile {#unpin}

```http
POST /api/v1/accounts/:id/unpin HTTP/1.1
```

Remove the given account from the user's featured profiles.

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User + `write:accounts`\
**Version history:**\
2.5.0 - added

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

Successfully unendorsed, or account was already not endorsed

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Set private note on profile {#note}

```http
POST /api/v1/accounts/:id/note HTTP/1.1
```

Sets a private note on a user.

**Returns:** [Relationship]({{< relref "entities/relationship">}})\
**OAuth:** User + `write:accounts`\
**Version history:**\
3.2.0 - added

#### Request
##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

comment
: String. The comment to be set on that user. Provide an empty string or leave out this parameter to clear the currently set note.

#### Response
##### 200: OK

Successfully updated profile note

```json
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

Successfully removed profile note

```json
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
  "note": ""
}
```

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Check relationships to other accounts {#relationships}

```http
GET /api/v1/accounts/relationships HTTP/1.1
```

Find out whether a given account is followed, blocked, muted, etc.

**Returns:** Array of [Relationship]({{< relref "entities/Relationship">}})\
**OAuth:** User token + `read:follows`\
**Version history:**\
0.0.0 - added\
4.3.0 - added `with_suspended` parameter

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

id[]
: Array of String. Check relationships for the provided account IDs.

with_suspended
: Boolean. Whether relationships should be returned for suspended users, defaults to false.

#### Response
##### 200: OK

Sample call with `id[]=1&id[]=2`

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Find familiar followers {#familiar_followers}

```http
GET /api/v1/accounts/familiar_followers HTTP/1.1
```

Obtain a list of all accounts that follow a given account, filtered for accounts you follow.

**Returns:** Array of [FamiliarFollowers]({{< relref "entities/FamiliarFollowers">}})\
**OAuth:** User token + `read:follows`\
**Version history:**\
3.5.0 - added

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

id[]
: Array of String. Find familiar followers for the provided account IDs.

#### Response
##### 200: OK

Sample call with `id[]=1&id[]=2`

```json
[
  {
    "id":"1",
    "accounts":[
      {
        "id":"1087990",
        "username":"moss",
        "acct":"moss@goblin.camp",
        // ...
      },
      {
        "id":"1092723",
        "username":"vivianrose",
        "acct":"vivianrose",
        // ...
      },
      // ...
    ]
  },
  {
    "id":"2",
    "accounts":[]
  }
]
```

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## Search for matching accounts {#search}

```http
GET /api/v1/accounts/search HTTP/1.1
```

Search for matching accounts by username or display name.

**Returns:** Array of [Account]({{< relref "entities/Account">}})\
**OAuth:** User token + `read:accounts`\
**Version history:**\
0.0.0 - added\
2.8.0 - add `limit`, `offset` and `following`

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

q
: {{<required>}} String. Search query for accounts.

limit
: Integer. Maximum number of results. Defaults to 40 accounts. Max 80 accounts.

offset
: Integer. Skip the first n results.

resolve
: Boolean. Attempt WebFinger lookup. Defaults to false. Use this when `q` is an exact address.

following
: Boolean. Limit the search to users you are following. Defaults to false.

#### Response
##### 200: OK

Accounts matching "trwnh" in username or display name

```json
[
  {
    "id": "14715",
    "username": "trwnh",
    "acct": "trwnh",
    "display_name": "infinite love ⴳ",
    // ...
  },
  {
    "id": "418714",
    "username": "trwnh",
    "acct": "trwnh@pixelfed.social",
    "display_name": "Abdullah Tarawneh",
    // ...
  },
  {
    "id": "419674",
    "username": "trwnh",
    "acct": "trwnh@write.as",
    "display_name": "trwnh",
    // ...
  },
  // ...
]
```

##### 503: Service Unavailable

resolve=true, but the domain part of the user@domain address is not a currently live website

```json
{
  "error": "Remote data could not be fetched"
}
```

---

## Lookup account ID from Webfinger address {#lookup}

```http
GET /api/v1/accounts/lookup HTTP/1.1
```

Quickly lookup a username to see if it is available, skipping WebFinger resolution.

**Returns:** [Account]({{< relref "entities/Account">}})\
**OAuth:** Public\
**Version history:**\
3.4.0 - added

#### Request
##### Query parameters

acct
: {{<required>}} String. The username or Webfinger address to lookup.

#### Response
##### 200: OK

Sample call with `?acct=trwnh`

```json
{
  "id": "14715",
  "username": "trwnh",
  "acct": "trwnh",
  "display_name": "infinite love ⴳ",
  "locked": false,
  // ...
}
```

Sample call with `?acct=trwnh@pixelfed.social`

```json
{
  "id": "418714",
  "username": "trwnh",
  "acct": "trwnh@pixelfed.social",
  "display_name": "Abdullah Tarawneh",
  "locked": false,
  // ...
}
```

##### 404: Not found

Username or address does not map to an account

```json
{
  "error": "Record not found"
}
```

---

## (DEPRECATED) Identity proofs {#identity_proofs}

```http
GET /api/v1/accounts/:id/identity_proofs HTTP/1.1
```

**Returns:** Array of [IdentityProof]({{< relref "entities/identityproof">}})\
**OAuth:** User token\
**Version history:**\
2.8.0 - added\
3.5.0 - deprecated. now returns an empty array.

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Account in the database.

#### Response
##### 200: OK

```json
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

##### 404: Not found

Account does not exist

```json
{
  "error": "Record not found"
}
```

##### 410: Gone

Account is suspended (since 2.4.0 and until 3.3.0)

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts_controller.rb" caption="app/controllers/api/v1/accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/credentials_controller.rb" caption="app/controllers/api/v1/accounts/credentials_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/familiar_followers_controller.rb" caption="app/controllers/api/v1/accounts/familiar_followers_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/featured_tags_controller.rb" caption="app/controllers/api/v1/accounts/featured_tags_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/follower_accounts_controller.rb" caption="app/controllers/api/v1/accounts/follower_accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/following_accounts_controller.rb" caption="app/controllers/api/v1/accounts/following_accounts_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/identity_proofs_controller.rb" caption="app/controllers/api/v1/accounts/identity_proofs_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/lists_controller.rb" caption="app/controllers/api/v1/accounts/lists_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/lookup_controller.rb" caption="app/controllers/api/v1/accounts/lookup_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/notes_controller.rb" caption="app/controllers/api/v1/accounts/notes_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/pins_controller.rb" caption="app/controllers/api/v1/accounts/pins_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/relationships_controller.rb" caption="app/controllers/api/v1/accounts/relationships_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/search_controller.rb" caption="app/controllers/api/v1/accounts/search_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/accounts/statuses_controller.rb" caption="app/controllers/api/v1/accounts/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/account_statuses_filter.rb" caption="app/models/account_statuses_filter.rb" >}}
