---
title: streaming
description: >-
  Subscribe to server-sent events for real-time updates via a long-lived HTTP
  connection or via WebSocket.
menu:
  docs:
    weight: 40
    parent: methods-timelines
aliases: [/methods/timelines/streaming/]
---

## Event types and payloads {#events}

`update`
: A new Status has appeared. Payload contains a [Status]({{< relref "entities/status" >}}).

`notification`
: A new notification has appeared. Payload contains a [Notification]({{< relref "entities/notification" >}}).

`delete`
: A status has been deleted. Payload contains the String ID of the deleted status.

`filters_changed`
: Keyword filters have been changed. Either does not contain a payload (for WebSocket connections), or contains an undefined payload (for HTTP connections).

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

**Returns:** String\
**OAuth:** Public\
**Version history:**\
2.5.0 - added

Verify that the streaming service is alive before connecting to it

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

**Returns:** String\
**OAuth:** User token + `read:statuses` + `read:notifications`\
**Version history:**\
1.0.0 - added

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

---

## Watch the federated timeline {#public}

```http
GET /api/v1/streaming/public HTTP/1.1
```

Returns all public statuses

**Returns:** String\
**OAuth:** Public, or client token + `read:statuses`\
**Version history:**\
1.0.0 - added

#### Request
##### Headers

Authorization 
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

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

---

## Watch the local timeline {#public-local}

```http
GET /api/v1/streaming/public/local HTTP/1.1
```

Returns all local public statuses

**Returns:** String\
**OAuth:** Public, or client token + `read:statuses`\
**Version history:**\
1.0.0 - added

#### Request
##### Headers

Authorization 
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

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

---

## Watch the public timeline for a hashtag {#hashtag}

```http
GET /api/v1/streaming/hashtag HTTP/1.1
```

Returns all public statuses for a particular hashtag

**Returns:** String\
**OAuth:** Public, or client token + `read:statuses`\
**Version history:**\
1.0.0 - added

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


---

## Watch the local timeline for a hashtag {#hashtag-local}

```http
GET /api/v1/streaming/hashtag/local HTTP/1.1
```

Returns all local public statuses for a particular hashtag

**Returns:** String\
**OAuth:** Public, or client token + `read:statuses`\
**Version history:**\
1.0.0 - added

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

---

## Watch for list updates {#list}

```http
GET /api/v1/streaming/list HTTP/1.1
```

Returns statuses for a list

**Returns:** String\
**OAuth:** User token + `read:statuses`\
**Version history:**\
1.0.0 - added

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

---

## Watch for direct messages {#direct}

```http
GET /api/v1/streaming/direct HTTP/1.1
```

Returns events for received direct messages.

**Returns:** String\
**OAuth:** User token + `read:statuses`\
**Version history:**\
1.0.0 - added

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Events

#### Events

An example update to the direct timeline:

```text
event: update
data: {"id":"108914398911648590","created_at":"2022-08-30T23:23:58.863Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"direct",...
```

An example delete:

```text
event: delete
data: 108914398911648590
```

---

## Establishing a WebSocket connection {#websocket}

```http
wss://mastodon.example/api/v1/streaming
```

**Returns:** Event\
**OAuth:** Public, or user token + `read` (or `read:statuses` and/or `read:notifications`)\
**Version history:**\
3.3.0 - added

Open a multiplexed WebSocket connection to receive events.

### Parameters

{{< hint style="info" >}}
Query parameters are recommended for single-purpose connections, but parameters may also be provided by sending a JSON-encoded payload over the WebSocket connection with `type` parameter.

Example subscription to local statuses containing the hashtag `#foo`:

```javascript
{ "type": "subscribe", "stream": "hashtag:local", "tag": "foo" }
```

Example unsubscription from user updates:

```javascript
{ "type": "unsubscribe", "stream": "user" }
```
{{</hint>}}

access_token
: {{<required>}} String. A user-authorized OAuth token.

stream
: {{<required>}} String. The stream to watch for events. Possible values include `user`, `public`, `public:local`, `hashtag`, `hashtag:local`, `list`, and `direct`.

list
: String. When `stream` is set to `list`, use this parameter to specify the list ID.

tag
: String. When `stream` is set to `hashtag` or `hashtag:local`, use this parameter to specify the tag name.

type
: String. For JSON-encoded payloads sent to the server, specify either `subscribe` or `unsubscribe` in order to manage the events that you wish to receive.


### Events

Events are JSON-encoded. If an invalid access token is provided, the connection will be closed immediately. If your server has enabled limited federation mode or authorized-fetch mode, then an access token must be provided in order to receive events.

An example update to the public timeline:

```javascript
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

```javascript
{
  "stream": [
    "public"
  ],
  "event": "delete",
  "payload": "106692867363994015"
}
```

An example filter change by the user:

```javascript
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