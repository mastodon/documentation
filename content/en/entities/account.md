---
title: Account
description: Represents a user of Mastodon and their associated profile.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "id": "23634",
  "username": "noiob",
  "acct": "noiob@awoo.space",
  "display_name": "ikea shark fan account",
  "locked": false,
  "bot": false,
  "created_at": "2017-02-08T02:00:53.274Z",
  "note": "<p>:ms_rainbow_flag:​ :ms_bisexual_flagweb:​ :ms_nonbinary_flag:​ <a href=\"https://awoo.space/tags/awoo\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>awoo</span></a>.space <a href=\"https://awoo.space/tags/admin\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>admin</span></a> ~ <a href=\"https://awoo.space/tags/bi\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>bi</span></a> ~ <a href=\"https://awoo.space/tags/nonbinary\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>nonbinary</span></a> ~ compsci student ~ likes video <a href=\"https://awoo.space/tags/games\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>games</span></a> and weird/ old electronics and will post obsessively about both ~ avatar by <span class=\"h-card\"><a href=\"https://weirder.earth/@dzuk\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>dzuk</span></a></span></p>",
  "url": "https://awoo.space/@noiob",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "header": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "header_static": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "followers_count": 547,
  "following_count": 404,
  "statuses_count": 28468,
  "last_status_at": "2019-11-17T00:02:23.693Z",
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
      "value": "<span class=\"h-card\"><a href=\"https://botsin.space/@darksouls\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>darksouls</span></a></span>, <span class=\"h-card\"><a href=\"https://botsin.space/@nierautomata\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>nierautomata</span></a></span>, <span class=\"h-card\"><a href=\"https://mastodon.social/@fedi\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>fedi</span></a></span>, code for <span class=\"h-card\"><a href=\"https://botsin.space/@awoobot\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>awoobot</span></a></span>",
      "verified_at": null
    },
    {
      "name": "Website",
      "value": "<a href=\"http://shork.xyz\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">http://</span><span class=\"\">shork.xyz</span><span class=\"invisible\"></span></a>",
      "verified_at": "2019-11-10T10:31:10.744+00:00"
    }
  ]
}
```

## Base attributes

### **`id`** <a id="id"></a>

**Description:** The account id`header`.
**Type:** String \(cast from an integer, but not guaranteed to be a number\)
**Version history:** Added in 0.1.0

### `username` <a id="username"></a>

**Description:** The username of the account, not including domain.
**Type:** String
**Version history:** Added in 0.1.0

### `acct` <a id="acct"></a>

**Description:** The Webfinger account URI.
Equal to `username` for local users, or `username@domain` for remote users.
**Type:** String
**Version history:** Added in 0.1.0

### `url` <a id="url"></a>

**Description:** The location of the user's profile page.
**Type:** String \(HTTPS URL\)
**Version history:** Added in 0.1.0

## Display attributes

### `display_name` <a id="display_name"></a>

**Description:** The profile's display name.
**Type:** String
**Version history:** Added in 0.1.0

### `note` <a id="note"></a>

**Description:** The profile's bio / description.
**Type:** String
**Version history:** Added in 0.1.0

### `avatar` <a id="avatar"></a>

**Description:** An image icon that is shown next to statuses and in the profile.
**Type:** String \(URL\)
**Version history:** Added in 0.1.0

### `avatar_static` <a id="avatar_static"></a>

**Description:** A static version of the avatar.
Equal to `avatar` if its value is a static image; different if `avatar` is an animated GIF.
**Type:** String \(URL\)
**Version history:** Added in 1.1.2

### `header` <a id="header"></a>

**Description:** An image banner that is shown above the profile and in profile cards.
**Type:** String \(URL\)
**Version history:** Added in 0.1.0

### `header_static` <a id="header_static"></a>

**Description:** A static version of the header.
Equal to `header` if its value is a static image; different if `header` is an animated GIF.
**Type:** String \(URL\)
**Version history:** Added in 1.1.2

### `locked` <a id="locked"></a>

**Description:** Whether the account manually approves follow requests.
**Type:** Boolean
**Version history:** Added in 0.1.0

### `emojis` <a id="emojis"></a>

**Description:** Custom emoji entities to be used when rendering the profile. If none, an empty array will be returned.
**Type:** Array of [Emoji](emoji.md)
**Version history:** Added in 2.4.0

### `discoverable` <a id="discoverable"></a>

**Description:** Whether the account has opted into discovery features such as the profile directory.
**Type:** Boolean
**Version history:** Added in 3.1.0

## Statistical attributes 

### `created_at` <a id="created_at"></a>

**Description:** When the account was created.
**Type:** String \(ISO 8601 Datetime\)
**Version history:** Added in 0.1.0

### `statuses_count` <a id="statuses_count"></a>

**Description:** How many statuses are attached to this account.
**Type:** Number
**Version history:** Added in 0.1.0

### `followers_count` <a id="followers_count"></a>

**Description:** The reported followers of this profile.
**Type:** Number
**Version history:** Added in 0.1.0

### `following_count` <a id="following_count"></a>

**Description:** The reported follows of this profile.
**Type:** Number
**Version history:** Added in 0.1.0

## Optional attributes

### `moved` <a id="moved"></a>

**Description:** Indicates that the profile is currently inactive and that its user has moved to a new account.
**Type:** [Account](account.md)
**Version history:** Added in 2.1.0

### `fields` <a id="fields"></a>

**Description:** Additional metadata attached to a profile as name-value pairs.
**Type:** Array of [Field]({{< relref "field.md" >}})
**Version history:** Added in 2.4.0

### `bot` <a id="bot"></a>

**Description:** A presentational flag. Indicates that the account may perform automated actions, may not be monitored, or identifies as a robot.
**Type:** Boolean
**Version history:** Added in 2.4.0

### `source` <a id="source"></a>

**Description:** An extra entity to be used with API methods to [verify credentials](../methods/accounts/#verify-account-credentials) and [update credentials](../methods/accounts/#update-account-credentials).
**Type:** [Source](source.md)
**Version history:** Added in 2.4.0

## See also

{{< page-ref page="methods/accounts.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/account_serializer.rb" caption="app/serializers/rest/account\_serializer.rb" >}}





