---
title: streaming API methods
description: >-
  Subscribe to server-sent events for real-time updates via a long-lived HTTP
  connection or via WebSocket.
menu:
  docs:
    weight: 40
    name: streaming
    parent: methods-timelines
    identifier: methods-streaming
aliases: [
  "/methods/streaming",
  "/api/methods/streaming",
  "/methods/timelines/streaming",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Event types and payloads {#events}

`update`
: A new Status has appeared. Payload contains a [Status]({{< relref "entities/Status" >}}) cast to a string. Available since v1.0.0

`delete`
: A status has been deleted. Payload contains the String ID of the deleted Status. Available since v1.0.0

`notification`
: A new notification has appeared. Payload contains a [Notification]({{< relref "entities/Notification" >}}) cast to a string. Available since v1.4.2

`filters_changed`
: Keyword filters have been changed. Either does not contain a payload (for WebSocket connections), or contains an undefined payload (for HTTP connections). Available since v2.4.3

`conversation`
: A direct conversation has been updated. Payload contains a [Conversation]({{< relref "entities/Conversation" >}}) cast to a string. Available since v2.6.0

`announcement`
: An announcement has been published. Payload contains an [Announcement]({{< relref "entities/Announcement" >}}) cast to a string. Available since v3.1.0

`announcement.reaction`
: An announcement has received an emoji reaction. Payload contains a Hash (with `name`, `count`, and `announcement_id`) cast to a string. Available since v3.1.0

`announcement.delete`
: An announcement has been deleted. Payload contains the String ID of the deleted Announcement. Available since v3.1.0

`status.update`
: A Status has been edited. Payload contains a [Status]({{< relref "entities/Status" >}}) cast to a string. Available since v3.5.0

`encrypted_message`
: An encrypted message has been received. Implemented in v3.2.0 but currently unused

## Streaming timelines/categories {#streams}

`public`
: All public posts known to the server. Analogous to the federated timeline. Available since v1.0.0

`public:media`
: All public posts known to the server, filtered for media attachments. Analogous to the federated timeline with "only media" enabled. Available since v2.4.0

`public:local`
: All public posts originating from this server. Analogous to the local timeline. Available since v1.1

`public:local:media`
: All public posts originating from this server, filtered for media attachments. Analogous to the local timeline with "only media" enabled. Available since v2.4.0

`public:remote`
: All public posts originating from other servers. Available since v3.1.4

`public:remote:media`
: All public posts originating from other servers, filtered for media attachments. Available since v3.1.4

`hashtag`
: All public posts using a certain hashtag. Available since v1.0.0

`hashtag:local`
: All public posts using a certain hashtag, originating from this server. Available since v1.1

`user`
: Events related to the current user, such as home feed updates and notifications. Available since v1.0.0

`user:notification`
: Notifications for the current user. Available since v1.4.2

`list`
: Updates to a specific list. Available since v2.1.0

`direct`
: Updates to direct conversations. Available since v2.4.0

---

## About HTTP server-sent events {#http}

Your application can use a [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) endpoint to receive updates in real-time. Server-sent events is an incredibly simple transport method that relies entirely on chunked-encoding transfer; in other words, the HTTP connection is kept open and receives new data periodically.

The stream will contain events as well as heartbeat comments. Lines that begin with a colon (`:`) can be ignored by parsers. For example, the connection may be kept alive with a heartbeat comment:

```text
:thump
```

Generally, events have this structure:

```text
event: <name>
data: <payload>
```

---

## Check if the server is alive {#health}

```http
GET /api/v1/streaming/health HTTP/1.1
```

Verify that the streaming service is alive before connecting to it

**Returns:** String\
**OAuth:** Public\
**Version history:**\
2.5.0 - added

#### Response
##### 200: OK

The streaming service is alive

```text
OK
```

---

## Watch your home timeline and notifications {#user}

```http
GET /api/v1/streaming/user HTTP/1.1
```

Returns events that are relevant to the authorized user, i.e. home timeline and notifications

**Returns:** `update`, `delete`, `notification`, `filters_changed`, `announcement`, `announcement.reaction`, `announcement.delete`, `status.update`\
**OAuth:** User token + `read:statuses` + `read:notifications`\
**Version history:**\
1.0.0 - added\
1.4.2 - now returns `notification`\
2.4.3 - now returns `filters_changed`\
3.1.0 - now returns `announcement`, `announcement.reaction`, `announcement.delete`\
3.5.0 - now returns `status.update`


#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Events

An example update to the home timeline:

```text
event: update
data: {"id":"108914327388663283","created_at":"2022-08-30T23:05:46.839Z","in_reply_to_id":"108914298452377720","in_reply_to_account_id":"107946650784398271","sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","url":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://pl.nulled.red/users/disarray\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>disarray</span></a></span> glad i was able to help","filtered":[],"reblog":null,"account":{"id":"464472","username":"freon","acct":"freon@letsalllovela.in","display_name":"freon","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2018-08-18T00:00:00.000Z","note":"tech archaeologist, unix weenie<br><a class=\"hashtag\" href=\"https://letsalllovela.in/tag/nobot\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#nobot</a>","url":"https://letsalllovela.in/users/freon","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","header":"https://files.mastodon.social/cache/accounts/headers/000/464/472/original/2e94bd33745f86a6.gif","header_static":"https://files.mastodon.social/cache/accounts/headers/000/464/472/static/2e94bd33745f86a6.png","followers_count":37,"following_count":41,"statuses_count":18442,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"pronouns","value":"emacs/xemacs (or he/they)","verified_at":null},{"name":"age","value":"23.66667","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"107946650784398271","username":"disarray","url":"https://pl.nulled.red/users/disarray","acct":"disarray@pl.nulled.red"}],"tags":[],"emojis":[],"card":null,"poll":null}
```

An example notification:

```text
event: notification
data: {"id":"68739215","type":"mention","created_at":"2022-08-30T23:09:54.070Z","account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":12,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"mastodon","value":"<a href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@trwnh@mastodon.social</a>","verified_at":null}]},"status":{"id":"108914343542683797","created_at":"2022-08-30T23:09:52.359Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://pl.nulled.red/objects/64b196c6-3bc5-44d5-8ffb-f760235ee6ca","url":"https://pl.nulled.red/objects/64b196c6-3bc5-44d5-8ffb-f760235ee6ca","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>trwnh</span></a></span> test","filtered":[],"reblog":null,"account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":12,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"mastodon","value":"<a href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@trwnh@mastodon.social</a>","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"14715","username":"trwnh","url":"https://mastodon.social/@trwnh","acct":"trwnh"}],"tags":[],"emojis":[],"card":null,"poll":null}}
```

An example filter change:

```text
event: filters_changed
data: undefined
```

An example announcement:

```text
event: announcement
data: {"id":"1","content":"<p>test</p>","starts_at":null,"ends_at":null,"all_day":true,"published_at":"2022-11-15T15:55:22.452Z","updated_at":"2022-11-15T15:55:22.528Z","mentions":[],"statuses":[],"tags":[],"emojis":[],"reactions":[]}
```

An example announcement reaction:

```text
event: announcement.reaction
data: {"name":"🤔","count":1,"announcement_id":"1"}
```

An example announcement delete:

```text
event: announcement.delete
data: 1
```

An example status edit:

```text
event: status.update
data: {"id":"109348677773283527","created_at":"2022-11-15T16:06:48.410Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"http://mastodon.local/users/admin/statuses/109348677773283527","url":"http://mastodon.local/@admin/109348677773283527","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:07:29.023Z","content":"<p>edited</p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"109334860508022726","username":"admin","acct":"admin","display_name":"","locked":false,"bot":false,"discoverable":null,"group":false,"created_at":"2022-11-13T00:00:00.000Z","note":"","url":"http://mastodon.local/@admin","avatar":"http://mastodon.local/avatars/original/missing.png","avatar_static":"http://mastodon.local/avatars/original/missing.png","header":"http://mastodon.local/headers/original/missing.png","header_static":"http://mastodon.local/headers/original/missing.png","followers_count":0,"following_count":0,"statuses_count":4,"last_status_at":"2022-11-15","noindex":false,"emojis":[],"fields":[]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"pinned":false,"filtered":[]}
```

---

## Watch your notifications {#notification}

```http
GET /api/v1/streaming/user/notification HTTP/1.1
```

Returns events for received notifications

**Returns:** `notification`\
**OAuth:** User token + `read:statuses` + `read:notifications`\
**Version history:**\
1.4.2 - added

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Events

An example notification:

```text
event: notification
data: {"id":"68739215","type":"mention","created_at":"2022-08-30T23:09:54.070Z","account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":12,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"mastodon","value":"<a href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@trwnh@mastodon.social</a>","verified_at":null}]},"status":{"id":"108914343542683797","created_at":"2022-08-30T23:09:52.359Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://pl.nulled.red/objects/64b196c6-3bc5-44d5-8ffb-f760235ee6ca","url":"https://pl.nulled.red/objects/64b196c6-3bc5-44d5-8ffb-f760235ee6ca","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>trwnh</span></a></span> test","filtered":[],"reblog":null,"account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":12,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"mastodon","value":"<a href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@trwnh@mastodon.social</a>","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"14715","username":"trwnh","url":"https://mastodon.social/@trwnh","acct":"trwnh"}],"tags":[],"emojis":[],"card":null,"poll":null}}
```

---

## Watch the federated timeline {#public}

```http
GET /api/v1/streaming/public HTTP/1.1
```

Returns all public statuses

**Returns:** `update`, `delete`, `status.update`\
**OAuth:** Public, or app token + `read:statuses`\
**Version history:**\
1.0.0 - added\
2.4.0 - add `only_media` parameter\
3.5.0 - now returns `status.update`

#### Request
##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

only_media
: Boolean. If true, return only statuses with media attachments.

#### Events

An example update to the federated timeline:

```text
event: update
data: {"id":"108914354907984653","created_at":"2022-08-30T23:12:47.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mstdn.jp/users/aiueohisama/statuses/108914354891945610","url":"https://mstdn.jp/@aiueohisama/108914354891945610","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p>処女の子が「処女だからキモい絡み方しちゃうかもだけど許して🥺」なんて言ってるのわたしは見たことない、童貞の甘えだよそれは 嫌われたくないなら最低限のマナーくらい身につけた方がいい</p>","reblog":null,"account":{"id":"272619","username":"aiueohisama","acct":"aiueohisama@mstdn.jp","display_name":"💎🌻陽菜💙💛","locked":false,"bot":false,"discoverable":false,"group":false,"created_at":"2017-04-15T00:00:00.000Z","note":"<p>とっても素直で真面目なOLでし！</p>","url":"https://mstdn.jp/@aiueohisama","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/272/619/original/573669a325c87b8b.jpeg","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/272/619/original/573669a325c87b8b.jpeg","header":"https://files.mastodon.social/cache/accounts/headers/000/272/619/original/5d5dad59a9fd1531.jpeg","header_static":"https://files.mastodon.social/cache/accounts/headers/000/272/619/original/5d5dad59a9fd1531.jpeg","followers_count":182,"following_count":20,"statuses_count":1128,"last_status_at":"2022-08-30","emojis":[],"fields":[]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null,"filter_results":[]}
```

An example delete:

```text
event: delete
data: 107214471804101576
```

An example status edit:

```text
event: status.update
data: {"id":"109348684737626801","created_at":"2022-11-15T16:08:30.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://ruby.social/users/chrismo/statuses/109348684454557541","url":"https://ruby.social/@chrismo/109348684454557541","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:10:43.000Z","content":"<p><a href=\"https://ruby.social/tags/musicTuesday\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>musicTuesday</span></a> </p><p>Here's a solo <a href=\"https://ruby.social/tags/piano\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>piano</span></a> track of mine called Gravity Assist</p><p><a href=\"https://ruby.social/tags/neoclassical\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>neoclassical</span></a> (<a href=\"https://ruby.social/tags/jazz\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>jazz</span></a> ish)</p><p><a href=\"https://cstudios.bandcamp.com/track/celestia-gravity-assist-no-19-var-2\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">cstudios.bandcamp.com/track/ce</span><span class=\"invisible\">lestia-gravity-assist-no-19-var-2</span></a></p>","reblog":null,"account":{"id":"795442","username":"chrismo","acct":"chrismo@ruby.social","display_name":"chrismo","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2019-04-25T00:00:00.000Z","note":"<p>i mash keys</p>","url":"https://ruby.social/@chrismo","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","header":"https://static-cdn.mastodon.social/headers/original/missing.png","header_static":"https://static-cdn.mastodon.social/headers/original/missing.png","followers_count":40,"following_count":62,"statuses_count":42,"last_status_at":"2022-11-15","emojis":[],"fields":[{"name":"web","value":"clabs.org","verified_at":null},{"name":"github","value":"github.com/chrismo","verified_at":null},{"name":"twitter","value":"twitter.com/the_chrismo","verified_at":null},{"name":"bandcamp","value":"cstudios.bandcamp.com","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"MUSICTUESDAY","url":"https://mastodon.social/tags/MUSICTUESDAY"},{"name":"piano","url":"https://mastodon.social/tags/piano"},{"name":"neoclassical","url":"https://mastodon.social/tags/neoclassical"},{"name":"jazz","url":"https://mastodon.social/tags/jazz"}],"emojis":[],"card":null,"poll":null}
```

---

## Watch the local timeline {#public-local}

```http
GET /api/v1/streaming/public/local HTTP/1.1
```

Returns all local public statuses

**Returns:** `update`, `delete`, `status.update`\
**OAuth:** Public, or app token + `read:statuses`\
**Version history:**\
1.1.0 - added\
2.4.0 - add `only_media` parameter\
3.5.0 - now returns `status.update`

#### Request
##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

only_media
: Boolean. If true, return only statuses with media attachments.

#### Events

An example update to the local timeline:

```text
event: update
data: {"id":"108914398911648589","created_at":"2022-08-30T23:23:58.863Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/trwnh/statuses/108914398911648589","url":"https://mastodon.social/@trwnh/108914398911648589","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p>test</p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"14715","username":"trwnh","acct":"trwnh","display_name":"infinite love ⴳ","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2016-11-24T00:00:00.000Z","note":"<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>","url":"https://mastodon.social/@trwnh","avatar":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","avatar_static":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","header":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","followers_count":2520,"following_count":266,"statuses_count":59817,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"Website","value":"<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>","verified_at":"2019-08-29T04:14:55.571+00:00"},{"name":"Portfolio","value":"<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>","verified_at":"2021-02-11T20:34:13.574+00:00"},{"name":"Fan of:","value":"Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)","verified_at":null},{"name":"What to expect:","value":"talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null}
```

An example delete:

```text
event: delete
data: 108914398911648589
```

An example status edit:

```
event: status.update
data: {"id":"109348699525106378","created_at":"2022-11-15T16:12:20.310Z","in_reply_to_id":"109348674754176227","in_reply_to_account_id":"30437","sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/gregpak/statuses/109348699525106378","url":"https://mastodon.social/@gregpak/109348699525106378","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:12:41.694Z","content":"<p>By default, in Feedly it just shows a thumbnail of the images in a post, though. And NetNewsWire doesn&#39;t show any image, boo! Gotta find an RSS reader that&#39;ll show a full sized image automatically without requiring a clickthrough... any suggestions would be very welcome, thanks!</p>","reblog":null,"account":{"id":"30437","username":"gregpak","acct":"gregpak","display_name":"Greg Pak","locked":false,"bot":false,"discoverable":false,"group":false,"created_at":"2017-04-02T00:00:00.000Z","note":"<p>Comic book writer &amp; filmmaker. Mech Cadet Yu, Planet Hulk, Darth Vader, Ronin Island, Princess Who Saved. Get vaxxed, get out the vote. He/Him.<br /><a href=\"https://mastodon.social/tags/Comics\" class=\"mention hashtag\" rel=\"tag\">#<span>Comics</span></a> <a href=\"https://mastodon.social/tags/ComicBooks\" class=\"mention hashtag\" rel=\"tag\">#<span>ComicBooks</span></a> <a href=\"https://mastodon.social/tags/writing\" class=\"mention hashtag\" rel=\"tag\">#<span>writing</span></a> <a href=\"https://mastodon.social/tags/AmWriting\" class=\"mention hashtag\" rel=\"tag\">#<span>AmWriting</span></a> <a href=\"https://mastodon.social/tags/photography\" class=\"mention hashtag\" rel=\"tag\">#<span>photography</span></a>  <a href=\"https://mastodon.social/tags/BelieveInFilm\" class=\"mention hashtag\" rel=\"tag\">#<span>BelieveInFilm</span></a></p>","url":"https://mastodon.social/@gregpak","avatar":"https://files.mastodon.social/accounts/avatars/000/030/437/original/9a71f06d6e285f32.jpg","avatar_static":"https://files.mastodon.social/accounts/avatars/000/030/437/original/9a71f06d6e285f32.jpg","header":"https://files.mastodon.social/accounts/headers/000/030/437/original/1f589d01e13340bc.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/030/437/original/1f589d01e13340bc.jpg","followers_count":2307,"following_count":279,"statuses_count":818,"last_status_at":"2022-11-15","noindex":false,"emojis":[],"fields":[{"name":"Website/Blog","value":"<a href=\"https://gregpak.com/\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">gregpak.com/</span><span class=\"invisible\"></span></a>","verified_at":"2022-11-04T19:59:52.817+00:00"},{"name":"Newsletter","value":"<a href=\"https://gregpak.com/newsletter\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">gregpak.com/newsletter</span><span class=\"invisible\"></span></a>","verified_at":"2022-11-04T19:59:58.287+00:00"},{"name":"Shop","value":"<a href=\"https://gregpakshop.com/pages/about-us\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">gregpakshop.com/pages/about-us</span><span class=\"invisible\"></span></a>","verified_at":"2022-11-07T05:50:02.310+00:00"}]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null}
```

---

## Watch for remote statuses {#public-remote}

```http
GET /api/v1/streaming/public/remote HTTP/1.1
```

Returns all public statuses from remote servers.

**Returns:** `update`, `delete`, `status.update`\
**OAuth:** Public, or app token + `read:statuses`\
**Version history:**\
3.1.4 - added\
3.5.0 - now returns `status.update`

#### Request
##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

only_media
: Boolean. If true, return only statuses with media attachments.

#### Events

An example update:

```text
event: update
data: {"id":"108914354907984653","created_at":"2022-08-30T23:12:47.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mstdn.jp/users/aiueohisama/statuses/108914354891945610","url":"https://mstdn.jp/@aiueohisama/108914354891945610","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p>処女の子が「処女だからキモい絡み方しちゃうかもだけど許して🥺」なんて言ってるのわたしは見たことない、童貞の甘えだよそれは 嫌われたくないなら最低限のマナーくらい身につけた方がいい</p>","reblog":null,"account":{"id":"272619","username":"aiueohisama","acct":"aiueohisama@mstdn.jp","display_name":"💎🌻陽菜💙💛","locked":false,"bot":false,"discoverable":false,"group":false,"created_at":"2017-04-15T00:00:00.000Z","note":"<p>とっても素直で真面目なOLでし！</p>","url":"https://mstdn.jp/@aiueohisama","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/272/619/original/573669a325c87b8b.jpeg","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/272/619/original/573669a325c87b8b.jpeg","header":"https://files.mastodon.social/cache/accounts/headers/000/272/619/original/5d5dad59a9fd1531.jpeg","header_static":"https://files.mastodon.social/cache/accounts/headers/000/272/619/original/5d5dad59a9fd1531.jpeg","followers_count":182,"following_count":20,"statuses_count":1128,"last_status_at":"2022-08-30","emojis":[],"fields":[]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null,"filter_results":[]}
```

An example delete:

```text
event: delete
data: 107214471804101576
```

An example status edit:

```text
event: status.update
data: {"id":"109348684737626801","created_at":"2022-11-15T16:08:30.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://ruby.social/users/chrismo/statuses/109348684454557541","url":"https://ruby.social/@chrismo/109348684454557541","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:10:43.000Z","content":"<p><a href=\"https://ruby.social/tags/musicTuesday\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>musicTuesday</span></a> </p><p>Here's a solo <a href=\"https://ruby.social/tags/piano\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>piano</span></a> track of mine called Gravity Assist</p><p><a href=\"https://ruby.social/tags/neoclassical\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>neoclassical</span></a> (<a href=\"https://ruby.social/tags/jazz\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>jazz</span></a> ish)</p><p><a href=\"https://cstudios.bandcamp.com/track/celestia-gravity-assist-no-19-var-2\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">cstudios.bandcamp.com/track/ce</span><span class=\"invisible\">lestia-gravity-assist-no-19-var-2</span></a></p>","reblog":null,"account":{"id":"795442","username":"chrismo","acct":"chrismo@ruby.social","display_name":"chrismo","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2019-04-25T00:00:00.000Z","note":"<p>i mash keys</p>","url":"https://ruby.social/@chrismo","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","header":"https://static-cdn.mastodon.social/headers/original/missing.png","header_static":"https://static-cdn.mastodon.social/headers/original/missing.png","followers_count":40,"following_count":62,"statuses_count":42,"last_status_at":"2022-11-15","emojis":[],"fields":[{"name":"web","value":"clabs.org","verified_at":null},{"name":"github","value":"github.com/chrismo","verified_at":null},{"name":"twitter","value":"twitter.com/the_chrismo","verified_at":null},{"name":"bandcamp","value":"cstudios.bandcamp.com","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"MUSICTUESDAY","url":"https://mastodon.social/tags/MUSICTUESDAY"},{"name":"piano","url":"https://mastodon.social/tags/piano"},{"name":"neoclassical","url":"https://mastodon.social/tags/neoclassical"},{"name":"jazz","url":"https://mastodon.social/tags/jazz"}],"emojis":[],"card":null,"poll":null}
```

---

## Watch the public timeline for a hashtag {#hashtag}

```http
GET /api/v1/streaming/hashtag HTTP/1.1
```

Returns all public statuses for a particular hashtag

**Returns:** `update`, `delete`, `status.update`\
**OAuth:** Public, or app token + `read:statuses`\
**Version history:**\
1.0.0 - added\
3.5.0 - now returns `status.update`

#### Request
##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

tag
: {{<required>}} String. The name of the hashtag to watch.

#### Events

An example update to the hashtag timeline:

```text
event: update
data: {"id":"108914430312582020","created_at":"2022-08-30T23:31:58.006Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/trwnh/statuses/108914430312582020","url":"https://mastodon.social/@trwnh/108914430312582020","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p><a href=\"https://mastodon.social/tags/test\" class=\"mention hashtag\" rel=\"tag\">#<span>test</span></a></p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"14715","username":"trwnh","acct":"trwnh","display_name":"infinite love ⴳ","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2016-11-24T00:00:00.000Z","note":"<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>","url":"https://mastodon.social/@trwnh","avatar":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","avatar_static":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","header":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","followers_count":2520,"following_count":266,"statuses_count":59817,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"Website","value":"<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>","verified_at":"2019-08-29T04:14:55.571+00:00"},{"name":"Portfolio","value":"<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>","verified_at":"2021-02-11T20:34:13.574+00:00"},{"name":"Fan of:","value":"Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)","verified_at":null},{"name":"What to expect:","value":"talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"test","url":"https://mastodon.social/tags/test"}],"emojis":[],"card":null,"poll":null}
```

An example delete:

```text
event: delete
data: 108914430312582020
```

An example status edit:

```text
event: status.update
data: {"id":"109348684737626801","created_at":"2022-11-15T16:08:30.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://ruby.social/users/chrismo/statuses/109348684454557541","url":"https://ruby.social/@chrismo/109348684454557541","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:10:43.000Z","content":"<p><a href=\"https://ruby.social/tags/musicTuesday\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>musicTuesday</span></a> </p><p>Here's a solo <a href=\"https://ruby.social/tags/piano\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>piano</span></a> track of mine called Gravity Assist</p><p><a href=\"https://ruby.social/tags/neoclassical\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>neoclassical</span></a> (<a href=\"https://ruby.social/tags/jazz\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>jazz</span></a> ish)</p><p><a href=\"https://cstudios.bandcamp.com/track/celestia-gravity-assist-no-19-var-2\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">cstudios.bandcamp.com/track/ce</span><span class=\"invisible\">lestia-gravity-assist-no-19-var-2</span></a></p>","reblog":null,"account":{"id":"795442","username":"chrismo","acct":"chrismo@ruby.social","display_name":"chrismo","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2019-04-25T00:00:00.000Z","note":"<p>i mash keys</p>","url":"https://ruby.social/@chrismo","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","header":"https://static-cdn.mastodon.social/headers/original/missing.png","header_static":"https://static-cdn.mastodon.social/headers/original/missing.png","followers_count":40,"following_count":62,"statuses_count":42,"last_status_at":"2022-11-15","emojis":[],"fields":[{"name":"web","value":"clabs.org","verified_at":null},{"name":"github","value":"github.com/chrismo","verified_at":null},{"name":"twitter","value":"twitter.com/the_chrismo","verified_at":null},{"name":"bandcamp","value":"cstudios.bandcamp.com","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"MUSICTUESDAY","url":"https://mastodon.social/tags/MUSICTUESDAY"},{"name":"piano","url":"https://mastodon.social/tags/piano"},{"name":"neoclassical","url":"https://mastodon.social/tags/neoclassical"},{"name":"jazz","url":"https://mastodon.social/tags/jazz"}],"emojis":[],"card":null,"poll":null}
```

---

## Watch the local timeline for a hashtag {#hashtag-local}

```http
GET /api/v1/streaming/hashtag/local HTTP/1.1
```

Returns all local public statuses for a particular hashtag

**Returns:** `update`, `delete`, `status.update`\
**OAuth:** Public, or app token + `read:statuses`\
**Version history:**\
1.1.0 - added\
3.5.0 - now returns `status.update`

#### Request
##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

tag
: {{<required>}} String. The name of the hashtag to watch.

#### Events

An example update to the local hashtag timeline:

```text
event: update
data: {"id":"108914430312582020","created_at":"2022-08-30T23:31:58.006Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/trwnh/statuses/108914430312582020","url":"https://mastodon.social/@trwnh/108914430312582020","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p><a href=\"https://mastodon.social/tags/test\" class=\"mention hashtag\" rel=\"tag\">#<span>test</span></a></p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"14715","username":"trwnh","acct":"trwnh","display_name":"infinite love ⴳ","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2016-11-24T00:00:00.000Z","note":"<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>","url":"https://mastodon.social/@trwnh","avatar":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","avatar_static":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","header":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","followers_count":2520,"following_count":266,"statuses_count":59817,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"Website","value":"<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>","verified_at":"2019-08-29T04:14:55.571+00:00"},{"name":"Portfolio","value":"<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>","verified_at":"2021-02-11T20:34:13.574+00:00"},{"name":"Fan of:","value":"Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)","verified_at":null},{"name":"What to expect:","value":"talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"test","url":"https://mastodon.social/tags/test"}],"emojis":[],"card":null,"poll":null}
```

An example delete:

```text
event: delete
data: 108914430312582020
```

An example status edit:

```text
event: status.update
data: {"id":"108914430312582020","created_at":"2022-08-30T23:32:12.006Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/trwnh/statuses/108914430312582020","url":"https://mastodon.social/@trwnh/108914430312582020","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p><a href=\"https://mastodon.social/tags/test\" class=\"mention hashtag\" rel=\"tag\">#<span>test</span></a> but edited</p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"14715","username":"trwnh","acct":"trwnh","display_name":"infinite love ⴳ","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2016-11-24T00:00:00.000Z","note":"<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>","url":"https://mastodon.social/@trwnh","avatar":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","avatar_static":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","header":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","followers_count":2520,"following_count":266,"statuses_count":59817,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"Website","value":"<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>","verified_at":"2019-08-29T04:14:55.571+00:00"},{"name":"Portfolio","value":"<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>","verified_at":"2021-02-11T20:34:13.574+00:00"},{"name":"Fan of:","value":"Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)","verified_at":null},{"name":"What to expect:","value":"talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"test","url":"https://mastodon.social/tags/test"}],"emojis":[],"card":null,"poll":null}
```

---

## Watch for list updates {#list}

```http
GET /api/v1/streaming/list HTTP/1.1
```

Returns statuses for a list

**Returns:** `update`, `delete`, `status.update`\
**OAuth:** User token + `read:statuses`\
**Version history:**\
2.1.0 - added\
3.5.0 - now returns `status.update`

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

list
: {{<required>}} String. The ID of the list to watch.

#### Events

An example update to the list timeline:

```text
event: update
data: {"id":"108914327388663283","created_at":"2022-08-30T23:05:46.839Z","in_reply_to_id":"108914298452377720","in_reply_to_account_id":"107946650784398271","sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","url":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://pl.nulled.red/users/disarray\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>disarray</span></a></span> glad i was able to help","filtered":[],"reblog":null,"account":{"id":"464472","username":"freon","acct":"freon@letsalllovela.in","display_name":"freon","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2018-08-18T00:00:00.000Z","note":"tech archaeologist, unix weenie<br><a class=\"hashtag\" href=\"https://letsalllovela.in/tag/nobot\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#nobot</a>","url":"https://letsalllovela.in/users/freon","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","header":"https://files.mastodon.social/cache/accounts/headers/000/464/472/original/2e94bd33745f86a6.gif","header_static":"https://files.mastodon.social/cache/accounts/headers/000/464/472/static/2e94bd33745f86a6.png","followers_count":37,"following_count":41,"statuses_count":18442,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"pronouns","value":"emacs/xemacs (or he/they)","verified_at":null},{"name":"age","value":"23.66667","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"107946650784398271","username":"disarray","url":"https://pl.nulled.red/users/disarray","acct":"disarray@pl.nulled.red"}],"tags":[],"emojis":[],"card":null,"poll":null}
```

An example delete:

```text
event: delete
data: 108914398911648589
```

An example status edit:

```text
event: status.update
data: {"id":"108914327388663283","created_at":"2022-08-30T23:05:53.839Z","in_reply_to_id":"108914298452377720","in_reply_to_account_id":"107946650784398271","sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","url":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://pl.nulled.red/users/disarray\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>disarray</span></a></span> glad i was able to help","filtered":[],"reblog":null,"account":{"id":"464472","username":"freon","acct":"freon@letsalllovela.in","display_name":"freon","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2018-08-18T00:00:00.000Z","note":"tech archaeologist, unix weenie<br><a class=\"hashtag\" href=\"https://letsalllovela.in/tag/nobot\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#nobot</a>","url":"https://letsalllovela.in/users/freon","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","header":"https://files.mastodon.social/cache/accounts/headers/000/464/472/original/2e94bd33745f86a6.gif","header_static":"https://files.mastodon.social/cache/accounts/headers/000/464/472/static/2e94bd33745f86a6.png","followers_count":37,"following_count":41,"statuses_count":18442,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"pronouns","value":"emacs/xemacs (or he/they)","verified_at":null},{"name":"age","value":"23.66667","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"107946650784398271","username":"disarray","url":"https://pl.nulled.red/users/disarray","acct":"disarray@pl.nulled.red"}],"tags":[],"emojis":[],"card":null,"poll":null}
```

---

## Watch for direct messages {#direct}

```http
GET /api/v1/streaming/direct HTTP/1.1
```

Returns events for received direct messages.

**Returns:** `conversation`\
**OAuth:** User token + `read:statuses`\
**Version history:**\
2.4.0 - added\
2.6.0 - now returns `conversation` instead of `update`

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Events

#### Events

An example conversation being updated:

```text
event: conversation
data: {"id":"819516","unread":true,"accounts":[{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/975674b2caa61034.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/975674b2caa61034.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":362,"last_status_at":"2022-11-13","emojis":[],"fields":[]}],"last_status":{"id":"109346889330629417","created_at":"2022-11-15T08:31:57.476Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"direct","language":null,"uri":"https://pl.nulled.red/objects/c869c5be-c184-4706-a45d-3459d9aa711c","url":"https://pl.nulled.red/objects/c869c5be-c184-4706-a45d-3459d9aa711c","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"test <span class=\"h-card\"><a class=\"u-url mention\" href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>trwnh</span></a></span>","filtered":[],"reblog":null,"account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/975674b2caa61034.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/975674b2caa61034.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":362,"last_status_at":"2022-11-13","emojis":[],"fields":[]},"media_attachments":[],"mentions":[{"id":"14715","username":"trwnh","url":"https://mastodon.social/@trwnh","acct":"trwnh"}],"tags":[],"emojis":[],"card":null,"poll":null}}
```

---

## Establishing a WebSocket connection {#websocket}

```http
wss://mastodon.example/api/v1/streaming
```

**Returns:** Stream of [Event](#events)\
**OAuth:** Public, or user token + `read` (or `read:statuses` and/or `read:notifications`)\
**Version history:**\
3.3.0 - added

Open a multiplexed WebSocket connection to receive events.

##### Parameters

{{< hint style="info" >}}
Query parameters are recommended for single-purpose connections, but parameters may also be provided by sending a JSON-encoded payload over the WebSocket connection with `type` parameter.

Example subscription to local statuses containing the hashtag `#foo`:

```json
{ "type": "subscribe", "stream": "hashtag:local", "tag": "foo" }
```

Example unsubscription from user updates:

```json
{ "type": "unsubscribe", "stream": "user" }
```
{{</hint>}}

access_token
: {{<required>}} String. A user-authorized OAuth token.

stream
: {{<required>}} String. The stream to watch for events. See [Streams](#streams) for possible values.

list
: String. When `stream` is set to `list`, use this parameter to specify the list ID.

tag
: String. When `stream` is set to `hashtag` or `hashtag:local`, use this parameter to specify the tag name.

type
: String. For JSON-encoded payloads sent to the server, specify either `subscribe` or `unsubscribe` in order to manage the events that you wish to receive.


##### Events

Events are JSON-encoded. If an invalid access token is provided, the connection will be closed immediately. If your server has enabled limited federation mode or authorized-fetch mode, then an access token must be provided in order to receive events.

An example update to the public timeline:

```json
{
  "stream": [
    "public"
  ],
  "event": "update",
  "payload": "{\"id\":\"108913983692647032\",\"created_at\":\"2022-08-30T21:38:22.000Z\",\"in_reply_to_id\":\"108913981098896721\",\"in_reply_to_account_id\":\"1081104\",\"sensitive\":false,\"spoiler_text\":\"\",\"visibility\":\"public\",\"language\":\"en\",\"uri\":\"https://fosstodon.org/users/tobtobxx/statuses/108913983628474640\",\"url\":\"https://fosstodon.org/@tobtobxx/108913983628474640\",\"replies_count\":0,\"reblogs_count\":0,\"favourites_count\":0,\"edited_at\":null,\"content\":\"<p>And now I can't exit the inner nvim because I mapped escape to the parent vim instance 😂</p>\",\"reblog\":null,\"account\":{\"id\":\"1081104\",\"username\":\"tobtobxx\",\"acct\":\"tobtobxx@fosstodon.org\",\"display_name\":\"TobTobXX\",\"locked\":false,\"bot\":false,\"discoverable\":true,\"group\":false,\"created_at\":\"2020-01-10T00:00:00.000Z\",\"note\":\"<p>Young tech enthusiast. Likes software (and also general, just not work-) minimalsim. Constantly trying to escape big-tech software.<br>Other hobbies include making music, stargazing, math and recently chess, but there's a lot that piques my interest and a lot left to learn out there.</p><p>„Of course, every house is constructed by someone, but the one who constructed all things is God.“ (Hebrews 3:4 [nwt18])</p>\",\"url\":\"https://fosstodon.org/@tobtobxx\",\"avatar\":\"https://files.mastodon.social/cache/accounts/avatars/001/081/104/original/230a8d0fb54e249b.png\",\"avatar_static\":\"https://files.mastodon.social/cache/accounts/avatars/001/081/104/original/230a8d0fb54e249b.png\",\"header\":\"https://static-cdn.mastodon.social/headers/original/missing.png\",\"header_static\":\"https://static-cdn.mastodon.social/headers/original/missing.png\",\"followers_count\":150,\"following_count\":216,\"statuses_count\":2447,\"last_status_at\":\"2022-08-30\",\"emojis\":[],\"fields\":[{\"name\":\"📍 Lives in:\",\"value\":\"Switzerland (CET: UTC+1 or CEST: UTC+2)\",\"verified_at\":null},{\"name\":\"🔑 GPG  key:\",\"value\":\"EA23 42C5 3EBF 2A2D 985C  416A 12AC 3D47 52E2 FA2E\",\"verified_at\":null}]},\"media_attachments\":[],\"mentions\":[],\"tags\":[],\"emojis\":[],\"card\":null,\"poll\":null}"
}
```

{{< hint style="warning" >}}
Note that while the event is JSON-encoded, the `payload` is string-encoded and escaped, so it must be parsed and loaded as JSON from that string.
{{</hint>}}

An example delete event from the public timeline:

```json
{
  "stream": [
    "public"
  ],
  "event": "delete",
  "payload": "106692867363994015"
}
```

An example filter change by the user:

```json
{
  "stream": [
    "user"
  ],
  "event": "filters_changed"
}
```

{{< hint style="warning" >}}
Note that the `payload` property is not present for `filters_changed` events.
{{</hint>}}

## See also

### Streaming server

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/streaming/index.js" caption="streaming/index.js" >}}

### Backend event publishing

Streaming timelines are maintained in Redis, and are published to Redis via `redis.publish()`

#### Status events

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/fan_out_on_write_service.rb" caption="app/services/fan_out_on_write_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/remove_status_service.rb" caption="app/services/remove_status_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/batched_remove_status_service.rb" caption="app/services/batched_remove_status_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/push_conversation_worker.rb" caption="app/workers/push_conversation_worker.rb" >}}

#### User events

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/feed_manager.rb" caption="app/lib/feed_manager.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/push_update_worker.rb" caption="app/workers/push_update_worker.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/notify_service.rb" caption="app/services/notify_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/custom_filter.rb" caption="app/models/custom_filter.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/publish_scheduled_announcement_worker.rb" caption="app/workers/publish_scheduled_announcement_worker.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/publish_announcement_reaction_worker.rb" caption="app/workers/publish_announcement_reaction_worker.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/unpublish_announcement_worker.rb" caption="app/workers/unpublish_announcement_worker.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/push_encrypted_message_worker.rb" caption="app/workers/push_encrypted_message_worker.rb" >}}

### Streaming client

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/javascript/mastodon/stream.js" caption="app/javascript/mastodon/stream.js" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/javascript/mastodon/actions/streaming.js" caption="app/javascript/mastodon/actions/streaming.js" >}}