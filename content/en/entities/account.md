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
  "note": "<p>:ms_rainbow_flag:​ :ms_bisexual_flagweb:​ :ms_nonbinary_flag:​ <a href=\"https://awoo.space/tags/awoo\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>awoo</span}.space <a href=\"https://awoo.space/tags/admin\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>admin</span} ~ <a href=\"https://awoo.space/tags/bi\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>bi</span} ~ <a href=\"https://awoo.space/tags/nonbinary\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>nonbinary</span} ~ compsci student ~ likes video <a href=\"https://awoo.space/tags/games\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>games</span} and weird/ old electronics and will post obsessively about both ~ avatar by <span class=\"h-card\"><a href=\"https://weirder.earth/@dzuk\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>dzuk</span}</span></p>",
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
      "value": "<span class=\"h-card\"><a href=\"https://cybre.space/@noiob\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>noiob</span}</span>",
      "verified_at": null
    },
    {
      "name": "Bots",
      "value": "<span class=\"h-card\"><a href=\"https://botsin.space/@darksouls\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>darksouls</span}</span>, <span class=\"h-card\"><a href=\"https://botsin.space/@nierautomata\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>nierautomata</span}</span>, <span class=\"h-card\"><a href=\"https://mastodon.social/@fedi\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>fedi</span}</span>, code for <span class=\"h-card\"><a href=\"https://botsin.space/@awoobot\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>awoobot</span}</span>",
      "verified_at": null
    },
    {
      "name": "Website",
      "value": "<a href=\"http://shork.xyz\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">http://</span><span class=\"\">shork.xyz</span><span class=\"invisible\"></span}",
      "verified_at": "2019-11-10T10:31:10.744+00:00"
    }
  ]
}
```

## Base attributes

### **`id`** {#id}

**Description:** The account id`header`.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:**\
0.1.0 - added

### `username` {#username}

**Description:** The username of the account, not including domain.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `acct` {#acct}

**Description:** The Webfinger account URI.
Equal to `username` for local users, or `username@domain` for remote users.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `url` {#url}

**Description:** The location of the user's profile page.\
**Type:** String \(HTTPS URL\)\
**Version history:**\
0.1.0 - added

## Display attributes

### `display_name` {#display_name}

**Description:** The profile's display name.\
**Type:** String\
**Version history:**\
0.1.0 - added

### `note` {#note}

**Description:** The profile's bio / description.\
**Type:** String \(HTML\)\
**Version history:**\
0.1.0 - added

### `avatar` {#avatar}

**Description:** An image icon that is shown next to statuses and in the profile.\
**Type:** String \(URL\)\
**Version history:**\
0.1.0 - added

### `avatar_static` {#avatar_static}

**Description:** A static version of the avatar.
Equal to `avatar` if its value is a static image; different if `avatar` is an animated GIF.\
**Type:** String \(URL\)\
**Version history:**\
1.1.2 - added

### `header` {#header}

**Description:** An image banner that is shown above the profile and in profile cards.\
**Type:** String \(URL\)\
**Version history:**\
0.1.0 - added

### `header_static` {#header_static}

**Description:** A static version of the header.
Equal to `header` if its value is a static image; different if `header` is an animated GIF.\
**Type:** String \(URL\)\
**Version history:**\
1.1.2 - added

### `locked` {#locked}

**Description:** Whether the account manually approves follow requests.\
**Type:** Boolean\
**Version history:**\
0.1.0 - added

### `emojis` {#emojis}

**Description:** Custom emoji entities to be used when rendering the profile. If none, an empty array will be returned.\
**Type:** Array of [Emoji]({{< relref "emoji.md" >}})\
**Version history:**\
2.4.0 - added

### `discoverable` {#discoverable}

**Description:** Whether the account has opted into discovery features such as the profile directory.\
**Type:** Boolean\
**Version history:**\
3.1.0 - added

## Statistical attributes 

### `created_at` {#created_at}

**Description:** When the account was created.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
0.1.0 - added

### `last_status_at` {#last_status_at}

**Description:** When the most recent status was posted.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.0.0 - added\
3.1.0 - now returns date only, no time


### `statuses_count` {#statuses_count}

**Description:** How many statuses are attached to this account.\
**Type:** Number\
**Version history:**\
0.1.0 - added

### `followers_count` {#followers_count}

**Description:** The reported followers of this profile.\
**Type:** Number\
**Version history:**\
0.1.0 - added

### `following_count` {#following_count}

**Description:** The reported follows of this profile.\
**Type:** Number\
**Version history:**\
0.1.0 - added

## Optional attributes

### `moved` {#moved}

**Description:** Indicates that the profile is currently inactive and that its user has moved to a new account.\
**Type:** [Account]({{< relref "account.md" >}})\
**Version history:**\
2.1.0 - added

### `fields` {#fields}

**Description:** Additional metadata attached to a profile as name-value pairs.\
**Type:** Array of [Field]({{< relref "field.md" >}})\
**Version history:**\
2.4.0 - added

### `bot` {#bot}

**Description:** A presentational flag. Indicates that the account may perform automated actions, may not be monitored, or identifies as a robot.\
**Type:** Boolean\
**Version history:**\
2.4.0 - added

### `source` {#source}

**Description:** An extra entity to be used with API methods to [verify credentials]({{< relref "../methods/accounts/#verify-account-credentials" >}}) and [update credentials]({{< relref "../methods/accounts/#update-account-credentials" >}}).\
**Type:** [Source]({{< relref "source.md" >}})\
**Version history:**\
2.4.0 - added

### `suspended` {#suspended}

**Description:** An extra entity returned when an account is suspended.\
**Type:** Boolean\
**Version history:**\
3.3.0 - added

### `mute_expires_at` {#mute_expires_at}

**Description:** When a timed mute will expire, if applicable.\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:**\
3.3.0 - added

## See also

{{< page-ref page="methods/accounts.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/account_serializer.rb" caption="app/serializers/rest/account\_serializer.rb" >}}





