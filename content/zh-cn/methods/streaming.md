---
title: streaming API 方法
description: >-
  通过 HTTP 长连接或 WebSocket 订阅实例发送的事件，以获取实时更新。
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

## 事件类型和有效载荷 {#events}

`update`
: 出现了一条新的嘟文。有效载荷包含一个被转换为字符串的 [Status]({{< relref "entities/Status" >}})。自 v1.0.0 起可用。

`delete`
: 嘟文已被删除。有效载荷包含已删除嘟文的字符串 ID。自 v1.0.0 起可用。

`notification`
: 出现了一条新的通知。有效载荷包含一个被转换为字符串的 [Notification]({{< relref "entities/Notification" >}})。自 v1.4.2 起可用。

`filters_changed`
: 关键词过滤规则已更改。要么不包含有效载荷（对于 WebSocket 连接），要么包含未定义的有效载荷（对于 HTTP 连接）。自 v2.4.3 起可用。

`conversation`
: 私信已更新。有效载荷包含一个被转换为字符串的 [Conversation]({{< relref "entities/Conversation" >}})。自 v2.6.0 起可用。

`announcement`
: 已发布公告。有效载荷包含一个被转换为字符串的 [Announcement]({{< relref "entities/Announcement" >}})。自 v3.1.0 起可用。

`announcement.reaction`
: 公告已收到表情回应。有效载荷包含一个哈希值（带有 `name`、`count` 和 `announcement_id`），并转换为字符串。自 v3.1.0 起可用。

`announcement.delete`
: 公告已被删除。有效载荷包含已删除公告的字符串 ID。自 v3.1.0 起可用。

`status.update`
: 嘟文已被编辑。有效载荷包含一个被转换为字符串的 [Status]({{< relref "entities/Status" >}})。自 v3.5.0 起可用。

`encrypted_message`
: 已收到加密消息。在 v3.2.0 中实现，但当前未使用。

`notifications_merged`
: 接受的通知请求已完成合并，应刷新通知列表。可以忽略有效载荷。自 v4.3.0 起可用。

## Streaming 时间线/类别 {#streams}

`public`
: 实例已知的所有公开嘟文。类似于跨站时间线。自 v1.0.0 起可用。

`public:media`
: 实例已知的所有公开嘟文，已筛选出带媒体附件的嘟文。类似于启用了“仅媒体”的跨站时间线。自 v2.4.0 起可用。

`public:local`
: 来自此实例的所有公开嘟文。类似于本站时间线。自 v1.1 起可用。

`public:local:media`
: 来自此实例的所有公开嘟文，已筛选出带媒体附件的嘟文。类似于启用了“仅媒体”的本站时间线。自 v2.4.0 起可用。

`public:remote`
: 来自其他实例的所有公开嘟文。自 v3.1.4 起可用。

`public:remote:media`
: 来自其他实例的所有公开嘟文，已筛选出带媒体附件的嘟文。自 v3.1.4 起可用。

`hashtag`
: 所有使用特定话题标签的公开嘟文。自 v1.0.0 起可用。

`hashtag:local`
: 所有使用特定话题标签的公开嘟文，来自此实例。自 v1.1 起可用。

`user`
: 与当前用户相关的事件，例如主页嘟文更新和通知。自 v1.0.0 起可用。

`user:notification`
: 当前用户的通知。自 v1.4.2 起可用。

`list`
: 特定列表的更新。自 v2.1.0 起可用。

`direct`
: 私信的更新。自 v2.4.0 起可用。

---

## 关于 HTTP 实例发送事件 {#http}

你的应用可以使用 [服务端发送事件](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) 端点来接收实时更新。服务端发送事件是一种极其简单的传输方法，完全依赖于分块编码传输；换句话说，HTTP 连接保持打开状态并定期接收新数据。

数据流流将包含事件以及心跳注释。解析器可以忽略以冒号 (`:`) 开头的行。例如，可以使用心跳注释来保持连接处于活动状态：

```text
:thump
```

通常，事件具有以下结构：

```text
event: <name>
data: <payload>
```

---

## 检查服务端是否在线 {#health}

```http
GET /api/v1/streaming/health HTTP/1.1
```

在连接到流服务之前，验证它是否在线。

**返回：** 字符串\
**OAuth：** 公开\
**版本历史：**\
2.5.0 - 新增

#### 响应
##### 200: OK

流式服务端在线

```text
OK
```

---

## 监测你的主页时间线和通知 {#user}

```http
GET /api/v1/streaming/user HTTP/1.1
```

返回与授权用户相关的事件，即主页时间线和通知

**返回：** `update`、`delete`、`notification`、`filters_changed`、`announcement`、`announcement.reaction`、`announcement.delete`、`status.update`\
**OAuth：** 用户令牌 + `read:statuses` + `read:notifications`\
**版本历史：**\
1.0.0 - 新增\
1.4.2 - 现在还会返回 `notification`\
2.4.3 - 现在还会返回 `filters_changed`\
3.1.0 - 现在还会返回 `announcement`、`announcement.reaction`、`announcement.delete`\
3.5.0 - 现在还会返回 `status.update`


#### 请求
##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 事件

主页时间线的更新示例：

```text
event: update
data: {"id":"108914327388663283","created_at":"2022-08-30T23:05:46.839Z","in_reply_to_id":"108914298452377720","in_reply_to_account_id":"107946650784398271","sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","url":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://pl.nulled.red/users/disarray\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>disarray</span></a></span> glad i was able to help","filtered":[],"reblog":null,"account":{"id":"464472","username":"freon","acct":"freon@letsalllovela.in","display_name":"freon","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2018-08-18T00:00:00.000Z","note":"tech archaeologist, unix weenie<br><a class=\"hashtag\" href=\"https://letsalllovela.in/tag/nobot\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#nobot</a>","url":"https://letsalllovela.in/users/freon","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","header":"https://files.mastodon.social/cache/accounts/headers/000/464/472/original/2e94bd33745f86a6.gif","header_static":"https://files.mastodon.social/cache/accounts/headers/000/464/472/static/2e94bd33745f86a6.png","followers_count":37,"following_count":41,"statuses_count":18442,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"pronouns","value":"emacs/xemacs (or he/they)","verified_at":null},{"name":"age","value":"23.66667","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"107946650784398271","username":"disarray","url":"https://pl.nulled.red/users/disarray","acct":"disarray@pl.nulled.red"}],"tags":[],"emojis":[],"card":null,"poll":null}
```

通知示例：

```text
event: notification
data: {"id":"68739215","type":"mention","created_at":"2022-08-30T23:09:54.070Z","account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":12,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"mastodon","value":"<a href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@trwnh@mastodon.social</a>","verified_at":null}]},"status":{"id":"108914343542683797","created_at":"2022-08-30T23:09:52.359Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://pl.nulled.red/objects/64b196c6-3bc5-44d5-8ffb-f760235ee6ca","url":"https://pl.nulled.red/objects/64b196c6-3bc5-44d5-8ffb-f760235ee6ca","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>trwnh</span></a></span> test","filtered":[],"reblog":null,"account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":12,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"mastodon","value":"<a href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@trwnh@mastodon.social</a>","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"14715","username":"trwnh","url":"https://mastodon.social/@trwnh","acct":"trwnh"}],"tags":[],"emojis":[],"card":null,"poll":null}}
```

过滤规则修改的示例：

```text
event: filters_changed
data: undefined
```

公告示例：

```text
event: announcement
data: {"id":"1","content":"<p>test</p>","starts_at":null,"ends_at":null,"all_day":true,"published_at":"2022-11-15T15:55:22.452Z","updated_at":"2022-11-15T15:55:22.528Z","mentions":[],"statuses":[],"tags":[],"emojis":[],"reactions":[]}
```

公告回应示例：

```text
event: announcement.reaction
data: {"name":"🤔","count":1,"announcement_id":"1"}
```

公告删除示例：

```text
event: announcement.delete
data: 1
```

嘟文被编辑的示例：

```text
event: status.update
data: {"id":"109348677773283527","created_at":"2022-11-15T16:06:48.410Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"http://mastodon.local/users/admin/statuses/109348677773283527","url":"http://mastodon.local/@admin/109348677773283527","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:07:29.023Z","content":"<p>edited</p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"109334860508022726","username":"admin","acct":"admin","display_name":"","locked":false,"bot":false,"discoverable":null,"group":false,"created_at":"2022-11-13T00:00:00.000Z","note":"","url":"http://mastodon.local/@admin","avatar":"http://mastodon.local/avatars/original/missing.png","avatar_static":"http://mastodon.local/avatars/original/missing.png","header":"http://mastodon.local/headers/original/missing.png","header_static":"http://mastodon.local/headers/original/missing.png","followers_count":0,"following_count":0,"statuses_count":4,"last_status_at":"2022-11-15","noindex":false,"emojis":[],"fields":[]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"pinned":false,"filtered":[]}
```

---

## 监测你的通知 {#notification}

```http
GET /api/v1/streaming/user/notification HTTP/1.1
```

返回收到的通知的事件

**返回：** `notification`\
**OAuth：** 用户令牌 + `read:statuses` + `read:notifications`\
**版本历史：**\
1.4.2 - 新增

#### 请求
##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

#### 事件

通知示例：

```text
event: notification
data: {"id":"68739215","type":"mention","created_at":"2022-08-30T23:09:54.070Z","account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":12,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"mastodon","value":"<a href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@trwnh@mastodon.social</a>","verified_at":null}]},"status":{"id":"108914343542683797","created_at":"2022-08-30T23:09:52.359Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://pl.nulled.red/objects/64b196c6-3bc5-44d5-8ffb-f760235ee6ca","url":"https://pl.nulled.red/objects/64b196c6-3bc5-44d5-8ffb-f760235ee6ca","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>trwnh</span></a></span> test","filtered":[],"reblog":null,"account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/5396d516ae170bb0.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":12,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"mastodon","value":"<a href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@trwnh@mastodon.social</a>","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"14715","username":"trwnh","url":"https://mastodon.social/@trwnh","acct":"trwnh"}],"tags":[],"emojis":[],"card":null,"poll":null}}
```

---

## 监测跨站时间线 {#public}

```http
GET /api/v1/streaming/public HTTP/1.1
```

返回所有公开嘟文

**返回：** `update`、`delete`、`status.update`\
**OAuth：** 用户令牌 + `read:statuses`\
**版本历史：**\
1.0.0 - 新增\
2.4.0 - 添加 `only_media` 参数\
3.5.0 - 现在返回 `status.update`
4.2.0 - 已更改为需要用户令牌，移除公开和应用令牌访问 [#23989](https://github.com/mastodon/mastodon/pull/23989)

#### 请求
##### 标头

Authorization
: 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

##### 查询参数

only_media
: 布尔值。若为 true，则仅返回带有媒体附件的嘟文。

#### 事件

跨站时间线的更新示例：

```text
event: update
data: {"id":"108914354907984653","created_at":"2022-08-30T23:12:47.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mstdn.jp/users/aiueohisama/statuses/108914354891945610","url":"https://mstdn.jp/@aiueohisama/108914354891945610","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p>処女の子が「処女だからキモい絡み方しちゃうかもだけど許して🥺」なんて言ってるのわたしは見たことない、童貞の甘えだよそれは 嫌われたくないなら最低限のマナーくらい身につけた方がいい</p>","reblog":null,"account":{"id":"272619","username":"aiueohisama","acct":"aiueohisama@mstdn.jp","display_name":"💎🌻陽菜💙💛","locked":false,"bot":false,"discoverable":false,"group":false,"created_at":"2017-04-15T00:00:00.000Z","note":"<p>とっても素直で真面目なOLでし！</p>","url":"https://mstdn.jp/@aiueohisama","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/272/619/original/573669a325c87b8b.jpeg","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/272/619/original/573669a325c87b8b.jpeg","header":"https://files.mastodon.social/cache/accounts/headers/000/272/619/original/5d5dad59a9fd1531.jpeg","header_static":"https://files.mastodon.social/cache/accounts/headers/000/272/619/original/5d5dad59a9fd1531.jpeg","followers_count":182,"following_count":20,"statuses_count":1128,"last_status_at":"2022-08-30","emojis":[],"fields":[]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null,"filter_results":[]}
```

删除示例：

```text
event: delete
data: 107214471804101576
```

嘟文被编辑的示例：

```text
event: status.update
data: {"id":"109348684737626801","created_at":"2022-11-15T16:08:30.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://ruby.social/users/chrismo/statuses/109348684454557541","url":"https://ruby.social/@chrismo/109348684454557541","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:10:43.000Z","content":"<p><a href=\"https://ruby.social/tags/musicTuesday\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>musicTuesday</span></a> </p><p>Here's a solo <a href=\"https://ruby.social/tags/piano\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>piano</span></a> track of mine called Gravity Assist</p><p><a href=\"https://ruby.social/tags/neoclassical\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>neoclassical</span></a> (<a href=\"https://ruby.social/tags/jazz\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>jazz</span></a> ish)</p><p><a href=\"https://cstudios.bandcamp.com/track/celestia-gravity-assist-no-19-var-2\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">cstudios.bandcamp.com/track/ce</span><span class=\"invisible\">lestia-gravity-assist-no-19-var-2</span></a></p>","reblog":null,"account":{"id":"795442","username":"chrismo","acct":"chrismo@ruby.social","display_name":"chrismo","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2019-04-25T00:00:00.000Z","note":"<p>i mash keys</p>","url":"https://ruby.social/@chrismo","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","header":"https://static-cdn.mastodon.social/headers/original/missing.png","header_static":"https://static-cdn.mastodon.social/headers/original/missing.png","followers_count":40,"following_count":62,"statuses_count":42,"last_status_at":"2022-11-15","emojis":[],"fields":[{"name":"web","value":"clabs.org","verified_at":null},{"name":"github","value":"github.com/chrismo","verified_at":null},{"name":"twitter","value":"twitter.com/the_chrismo","verified_at":null},{"name":"bandcamp","value":"cstudios.bandcamp.com","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"MUSICTUESDAY","url":"https://mastodon.social/tags/MUSICTUESDAY"},{"name":"piano","url":"https://mastodon.social/tags/piano"},{"name":"neoclassical","url":"https://mastodon.social/tags/neoclassical"},{"name":"jazz","url":"https://mastodon.social/tags/jazz"}],"emojis":[],"card":null,"poll":null}
```

---

## 监测本站时间线 {#public-local}

```http
GET /api/v1/streaming/public/local HTTP/1.1
```

返回所有本站公开嘟文

**返回：** `update`、`delete`、`status.update`\
**OAuth：** 用户令牌 + `read:statuses`\
**版本历史：**\
1.1.0 - 新增\
2.4.0 - 添加 `only_media` 参数\
3.5.0 - 现在返回 `status.update`
4.2.0 - 已更改为需要用户令牌，移除公开和应用令牌访问 [#23989](https://github.com/mastodon/mastodon/pull/23989)

#### 请求
##### 标头

Authorization
: 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

##### 查询参数

only_media
: 布尔值。若为 true，则仅返回带有媒体附件的嘟文。

#### 事件

本站时间线的一个更新示例如下：

```text
event: update
data: {"id":"108914398911648589","created_at":"2022-08-30T23:23:58.863Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/trwnh/statuses/108914398911648589","url":"https://mastodon.social/@trwnh/108914398911648589","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p>test</p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"14715","username":"trwnh","acct":"trwnh","display_name":"infinite love ⴳ","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2016-11-24T00:00:00.000Z","note":"<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>","url":"https://mastodon.social/@trwnh","avatar":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","avatar_static":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","header":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","followers_count":2520,"following_count":266,"statuses_count":59817,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"Website","value":"<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>","verified_at":"2019-08-29T04:14:55.571+00:00"},{"name":"Portfolio","value":"<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>","verified_at":"2021-02-11T20:34:13.574+00:00"},{"name":"Fan of:","value":"Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)","verified_at":null},{"name":"What to expect:","value":"talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null}
```

一个删除的示例如下：

```text
event: delete
data: 108914398911648589
```

一个嘟文编辑事件的示例如下：

```
event: status.update
data: {"id":"109348699525106378","created_at":"2022-11-15T16:12:20.310Z","in_reply_to_id":"109348674754176227","in_reply_to_account_id":"30437","sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/gregpak/statuses/109348699525106378","url":"https://mastodon.social/@gregpak/109348699525106378","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:12:41.694Z","content":"<p>By default, in Feedly it just shows a thumbnail of the images in a post, though. And NetNewsWire doesn&#39;t show any image, boo! Gotta find an RSS reader that&#39;ll show a full sized image automatically without requiring a clickthrough... any suggestions would be very welcome, thanks!</p>","reblog":null,"account":{"id":"30437","username":"gregpak","acct":"gregpak","display_name":"Greg Pak","locked":false,"bot":false,"discoverable":false,"group":false,"created_at":"2017-04-02T00:00:00.000Z","note":"<p>Comic book writer &amp; filmmaker. Mech Cadet Yu, Planet Hulk, Darth Vader, Ronin Island, Princess Who Saved. Get vaxxed, get out the vote. He/Him.<br /><a href=\"https://mastodon.social/tags/Comics\" class=\"mention hashtag\" rel=\"tag\">#<span>Comics</span></a> <a href=\"https://mastodon.social/tags/ComicBooks\" class=\"mention hashtag\" rel=\"tag\">#<span>ComicBooks</span></a> <a href=\"https://mastodon.social/tags/writing\" class=\"mention hashtag\" rel=\"tag\">#<span>writing</span></a> <a href=\"https://mastodon.social/tags/AmWriting\" class=\"mention hashtag\" rel=\"tag\">#<span>AmWriting</span></a> <a href=\"https://mastodon.social/tags/photography\" class=\"mention hashtag\" rel=\"tag\">#<span>photography</span></a>  <a href=\"https://mastodon.social/tags/BelieveInFilm\" class=\"mention hashtag\" rel=\"tag\">#<span>BelieveInFilm</span></a></p>","url":"https://mastodon.social/@gregpak","avatar":"https://files.mastodon.social/accounts/avatars/000/030/437/original/9a71f06d6e285f32.jpg","avatar_static":"https://files.mastodon.social/accounts/avatars/000/030/437/original/9a71f06d6e285f32.jpg","header":"https://files.mastodon.social/accounts/headers/000/030/437/original/1f589d01e13340bc.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/030/437/original/1f589d01e13340bc.jpg","followers_count":2307,"following_count":279,"statuses_count":818,"last_status_at":"2022-11-15","noindex":false,"emojis":[],"fields":[{"name":"Website/Blog","value":"<a href=\"https://gregpak.com/\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">gregpak.com/</span><span class=\"invisible\"></span></a>","verified_at":"2022-11-04T19:59:52.817+00:00"},{"name":"Newsletter","value":"<a href=\"https://gregpak.com/newsletter\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">gregpak.com/newsletter</span><span class=\"invisible\"></span></a>","verified_at":"2022-11-04T19:59:58.287+00:00"},{"name":"Shop","value":"<a href=\"https://gregpakshop.com/pages/about-us\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">gregpakshop.com/pages/about-us</span><span class=\"invisible\"></span></a>","verified_at":"2022-11-07T05:50:02.310+00:00"}]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null}
```

---

## 监测外站嘟文 {#public-remote}

```http
GET /api/v1/streaming/public/remote HTTP/1.1
```

返回来自外站实例的所有公开嘟文。

**返回：** `update`、`delete`、`status.update`\
**OAuth：** 用户令牌 + `read:statuses`\
**版本历史：**\
3.1.4 - 已添加\
3.5.0 - 现在返回 `status.update`
4.2.0 - 更改为需要用户令牌，移除了公开和应用令牌访问 [#23989](https://github.com/mastodon/mastodon/pull/23989)

#### 请求
##### 标头

Authorization
: 提供此标头以及 `Bearer <user_token>`，以获得对此 API 方法的授权访问。

##### 查询参数

only_media
: 布尔值。如果为true，则只返回包含媒体附件的嘟文。

#### 事件

一个更新的示例如下：

```text
event: update
data: {"id":"108914354907984653","created_at":"2022-08-30T23:12:47.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mstdn.jp/users/aiueohisama/statuses/108914354891945610","url":"https://mstdn.jp/@aiueohisama/108914354891945610","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p>処女の子が「処女だからキモい絡み方しちゃうかもだけど許して🥺」なんて言ってるのわたしは見たことない、童貞の甘えだよそれは 嫌われたくないなら最低限のマナーくらい身につけた方がいい</p>","reblog":null,"account":{"id":"272619","username":"aiueohisama","acct":"aiueohisama@mstdn.jp","display_name":"💎🌻陽菜💙💛","locked":false,"bot":false,"discoverable":false,"group":false,"created_at":"2017-04-15T00:00:00.000Z","note":"<p>とっても素直で真面目なOLでし！</p>","url":"https://mstdn.jp/@aiueohisama","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/272/619/original/573669a325c87b8b.jpeg","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/272/619/original/573669a325c87b8b.jpeg","header":"https://files.mastodon.social/cache/accounts/headers/000/272/619/original/5d5dad59a9fd1531.jpeg","header_static":"https://files.mastodon.social/cache/accounts/headers/000/272/619/original/5d5dad59a9fd1531.jpeg","followers_count":182,"following_count":20,"statuses_count":1128,"last_status_at":"2022-08-30","emojis":[],"fields":[]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null,"filter_results":[]}
```

一个删除的示例如下：

```text
event: delete
data: 107214471804101576
```

一个嘟文编辑事件的示例如下：

```text
event: status.update
data: {"id":"109348684737626801","created_at":"2022-11-15T16:08:30.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://ruby.social/users/chrismo/statuses/109348684454557541","url":"https://ruby.social/@chrismo/109348684454557541","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:10:43.000Z","content":"<p><a href=\"https://ruby.social/tags/musicTuesday\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>musicTuesday</span></a> </p><p>Here's a solo <a href=\"https://ruby.social/tags/piano\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>piano</span></a> track of mine called Gravity Assist</p><p><a href=\"https://ruby.social/tags/neoclassical\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>neoclassical</span></a> (<a href=\"https://ruby.social/tags/jazz\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>jazz</span></a> ish)</p><p><a href=\"https://cstudios.bandcamp.com/track/celestia-gravity-assist-no-19-var-2\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">cstudios.bandcamp.com/track/ce</span><span class=\"invisible\">lestia-gravity-assist-no-19-var-2</span></a></p>","reblog":null,"account":{"id":"795442","username":"chrismo","acct":"chrismo@ruby.social","display_name":"chrismo","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2019-04-25T00:00:00.000Z","note":"<p>i mash keys</p>","url":"https://ruby.social/@chrismo","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","header":"https://static-cdn.mastodon.social/headers/original/missing.png","header_static":"https://static-cdn.mastodon.social/headers/original/missing.png","followers_count":40,"following_count":62,"statuses_count":42,"last_status_at":"2022-11-15","emojis":[],"fields":[{"name":"web","value":"clabs.org","verified_at":null},{"name":"github","value":"github.com/chrismo","verified_at":null},{"name":"twitter","value":"twitter.com/the_chrismo","verified_at":null},{"name":"bandcamp","value":"cstudios.bandcamp.com","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"MUSICTUESDAY","url":"https://mastodon.social/tags/MUSICTUESDAY"},{"name":"piano","url":"https://mastodon.social/tags/piano"},{"name":"neoclassical","url":"https://mastodon.social/tags/neoclassical"},{"name":"jazz","url":"https://mastodon.social/tags/jazz"}],"emojis":[],"card":null,"poll":null}
```

---

## 监测特定话题标签的公共时间线 {#hashtag}

```http
GET /api/v1/streaming/hashtag HTTP/1.1
```

返回特定话题标签的所有公开嘟文。

**返回：** `update`、`delete`、`status.update`\
**OAuth：** 用户令牌 + `read:statuses`\
**版本历史：**\
1.0.0 - 已添加\
3.5.0 - 现在返回 `status.update`
4.2.0 - 更改为需要用户令牌，移除了公开和应用令牌访问 [#23989](https://github.com/mastodon/mastodon/pull/23989)

#### 请求
##### 标头

Authorization
: 提供此标头以及 `Bearer <user_token>`，以获得对此 API 方法的授权访问。

##### 查询参数

tag
: {{<required>}} 字符串。要监测的话题标签的名称。

#### 事件

话题标签时间线的一个更新示例如下：

```text
event: update
data: {"id":"108914430312582020","created_at":"2022-08-30T23:31:58.006Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/trwnh/statuses/108914430312582020","url":"https://mastodon.social/@trwnh/108914430312582020","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p><a href=\"https://mastodon.social/tags/test\" class=\"mention hashtag\" rel=\"tag\">#<span>test</span></a></p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"14715","username":"trwnh","acct":"trwnh","display_name":"infinite love ⴳ","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2016-11-24T00:00:00.000Z","note":"<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>","url":"https://mastodon.social/@trwnh","avatar":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","avatar_static":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","header":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","followers_count":2520,"following_count":266,"statuses_count":59817,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"Website","value":"<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>","verified_at":"2019-08-29T04:14:55.571+00:00"},{"name":"Portfolio","value":"<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>","verified_at":"2021-02-11T20:34:13.574+00:00"},{"name":"Fan of:","value":"Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)","verified_at":null},{"name":"What to expect:","value":"talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"test","url":"https://mastodon.social/tags/test"}],"emojis":[],"card":null,"poll":null}
```

一个删除的示例如下：

```text
event: delete
data: 108914430312582020
```

一个嘟文编辑事件的示例如下：

```text
event: status.update
data: {"id":"109348684737626801","created_at":"2022-11-15T16:08:30.000Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://ruby.social/users/chrismo/statuses/109348684454557541","url":"https://ruby.social/@chrismo/109348684454557541","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":"2022-11-15T16:10:43.000Z","content":"<p><a href=\"https://ruby.social/tags/musicTuesday\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>musicTuesday</span></a> </p><p>Here's a solo <a href=\"https://ruby.social/tags/piano\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>piano</span></a> track of mine called Gravity Assist</p><p><a href=\"https://ruby.social/tags/neoclassical\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>neoclassical</span></a> (<a href=\"https://ruby.social/tags/jazz\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>jazz</span></a> ish)</p><p><a href=\"https://cstudios.bandcamp.com/track/celestia-gravity-assist-no-19-var-2\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">cstudios.bandcamp.com/track/ce</span><span class=\"invisible\">lestia-gravity-assist-no-19-var-2</span></a></p>","reblog":null,"account":{"id":"795442","username":"chrismo","acct":"chrismo@ruby.social","display_name":"chrismo","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2019-04-25T00:00:00.000Z","note":"<p>i mash keys</p>","url":"https://ruby.social/@chrismo","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/795/442/original/12084217a7eb7513.png","header":"https://static-cdn.mastodon.social/headers/original/missing.png","header_static":"https://static-cdn.mastodon.social/headers/original/missing.png","followers_count":40,"following_count":62,"statuses_count":42,"last_status_at":"2022-11-15","emojis":[],"fields":[{"name":"web","value":"clabs.org","verified_at":null},{"name":"github","value":"github.com/chrismo","verified_at":null},{"name":"twitter","value":"twitter.com/the_chrismo","verified_at":null},{"name":"bandcamp","value":"cstudios.bandcamp.com","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"MUSICTUESDAY","url":"https://mastodon.social/tags/MUSICTUESDAY"},{"name":"piano","url":"https://mastodon.social/tags/piano"},{"name":"neoclassical","url":"https://mastodon.social/tags/neoclassical"},{"name":"jazz","url":"https://mastodon.social/tags/jazz"}],"emojis":[],"card":null,"poll":null}
```

---

## 监测本站时间线中特定的话题标签 {#hashtag-local}

```http
GET /api/v1/streaming/hashtag/local HTTP/1.1
```

返回特定话题标签的所有本站公开嘟文。

**返回：** `update`、`delete`、`status.update`\
**OAuth：** 用户令牌 + `read:statuses`\
**版本历史：**\
1.1.0 - 已添加\
3.5.0 - 现在返回 `status.update`
4.2.0 - 更改为需要用户令牌，移除了公开和应用令牌访问 [#23989](https://github.com/mastodon/mastodon/pull/23989)

#### 请求
##### 标头

Authorization
: 提供此标头以及 `Bearer <user_token>`，以获得对此 API 方法的授权访问。

##### 查询参数

tag
: {{<required>}} 字符串。要监测的话题标签的名称。

#### 事件

本站话题标签时间线的一个更新示例如下：

```text
event: update
data: {"id":"108914430312582020","created_at":"2022-08-30T23:31:58.006Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/trwnh/statuses/108914430312582020","url":"https://mastodon.social/@trwnh/108914430312582020","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p><a href=\"https://mastodon.social/tags/test\" class=\"mention hashtag\" rel=\"tag\">#<span>test</span></a></p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"14715","username":"trwnh","acct":"trwnh","display_name":"infinite love ⴳ","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2016-11-24T00:00:00.000Z","note":"<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>","url":"https://mastodon.social/@trwnh","avatar":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","avatar_static":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","header":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","followers_count":2520,"following_count":266,"statuses_count":59817,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"Website","value":"<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>","verified_at":"2019-08-29T04:14:55.571+00:00"},{"name":"Portfolio","value":"<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>","verified_at":"2021-02-11T20:34:13.574+00:00"},{"name":"Fan of:","value":"Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)","verified_at":null},{"name":"What to expect:","value":"talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"test","url":"https://mastodon.social/tags/test"}],"emojis":[],"card":null,"poll":null}
```

一个删除事件的示例：

```text
event: delete
data: 108914430312582020
```

一个嘟文编辑事件的示例：

```text
event: status.update
data: {"id":"108914430312582020","created_at":"2022-08-30T23:32:12.006Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://mastodon.social/users/trwnh/statuses/108914430312582020","url":"https://mastodon.social/@trwnh/108914430312582020","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"content":"<p><a href=\"https://mastodon.social/tags/test\" class=\"mention hashtag\" rel=\"tag\">#<span>test</span></a> but edited</p>","reblog":null,"application":{"name":"Web","website":null},"account":{"id":"14715","username":"trwnh","acct":"trwnh","display_name":"infinite love ⴳ","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2016-11-24T00:00:00.000Z","note":"<p>i have approximate knowledge of many things. perpetual student. (nb/ace/they)</p><p>xmpp/email: a@trwnh.com<br /><a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a><br />help me live: <a href=\"https://liberapay.com/trwnh\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">liberapay.com/trwnh</span><span class=\"invisible\"></span></a> or paypal</p><p>- my triggers are moths and glitter<br />- i have all notifs except mentions turned off, so please interact if you wanna be friends! i literally will not notice otherwise<br />- dm me if i did something wrong, so i can improve<br />- purest person on fedi, do not lewd in my presence</p>","url":"https://mastodon.social/@trwnh","avatar":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","avatar_static":"https://files.mastodon.social/accounts/avatars/000/014/715/original/e430cc93d56f5ac2.png","header":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","header_static":"https://files.mastodon.social/accounts/headers/000/014/715/original/5c6fc24edb3bb873.jpg","followers_count":2520,"following_count":266,"statuses_count":59817,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"Website","value":"<a href=\"https://trwnh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">trwnh.com</span><span class=\"invisible\"></span></a>","verified_at":"2019-08-29T04:14:55.571+00:00"},{"name":"Portfolio","value":"<a href=\"https://abdullahtarawneh.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">abdullahtarawneh.com</span><span class=\"invisible\"></span></a>","verified_at":"2021-02-11T20:34:13.574+00:00"},{"name":"Fan of:","value":"Punk-rock and post-hardcore (Circa Survive, letlive., La Dispute, THE FEVER 333)Manga (Yu-Gi-Oh!, One Piece, JoJo&#39;s Bizarre Adventure, Death Note, Shaman King)Platformers and RPGs (Banjo-Kazooie, Boktai, Final Fantasy Crystal Chronicles)","verified_at":null},{"name":"What to expect:","value":"talking about various things i find interesting, and otherwise being a genuine and decent wholesome poster. i&#39;m just here to hang out and talk to cool people! and to spill my thoughts.","verified_at":null}]},"media_attachments":[],"mentions":[],"tags":[{"name":"test","url":"https://mastodon.social/tags/test"}],"emojis":[],"card":null,"poll":null}
```

---

## 监测列表更新 {#list}

```http
GET /api/v1/streaming/list HTTP/1.1
```

返回列表的嘟文更新

**返回：**`update`，`delete`，`status.update`\
**OAuth：**用户令牌 + `read:statuses`\
**版本历史：**\
2.1.0 - 添加\
3.5.0 - 现在返回 `status.update`
4.2.0 - 更改为需要用户令牌，移除公开和应用程序令牌访问 [#23989](https://github.com/mastodon/mastodon/pull/23989)

#### 请求
##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的授权访问权限。

##### 查询参数

list
: {{<required>}} 字符串。 要监测的列表的 ID。

#### 事件

列表时间线的更新示例：

```text
event: update
data: {"id":"108914327388663283","created_at":"2022-08-30T23:05:46.839Z","in_reply_to_id":"108914298452377720","in_reply_to_account_id":"107946650784398271","sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","url":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://pl.nulled.red/users/disarray\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>disarray</span></a></span> glad i was able to help","filtered":[],"reblog":null,"account":{"id":"464472","username":"freon","acct":"freon@letsalllovela.in","display_name":"freon","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2018-08-18T00:00:00.000Z","note":"tech archaeologist, unix weenie<br><a class=\"hashtag\" href=\"https://letsalllovela.in/tag/nobot\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#nobot</a>","url":"https://letsalllovela.in/users/freon","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","header":"https://files.mastodon.social/cache/accounts/headers/000/464/472/original/2e94bd33745f86a6.gif","header_static":"https://files.mastodon.social/cache/accounts/headers/000/464/472/static/2e94bd33745f86a6.png","followers_count":37,"following_count":41,"statuses_count":18442,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"pronouns","value":"emacs/xemacs (or he/they)","verified_at":null},{"name":"age","value":"23.66667","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"107946650784398271","username":"disarray","url":"https://pl.nulled.red/users/disarray","acct":"disarray@pl.nulled.red"}],"tags":[],"emojis":[],"card":null,"poll":null}
```

一个删除事件的示例：

```text
event: delete
data: 108914398911648589
```

一个嘟文编辑事件的示例：

```text
event: status.update
data: {"id":"108914327388663283","created_at":"2022-08-30T23:05:53.839Z","in_reply_to_id":"108914298452377720","in_reply_to_account_id":"107946650784398271","sensitive":false,"spoiler_text":"","visibility":"unlisted","language":null,"uri":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","url":"https://letsalllovela.in/objects/e9cebb0c-7c75-414f-9608-20b5628e52d7","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"<span class=\"h-card\"><a class=\"u-url mention\" href=\"https://pl.nulled.red/users/disarray\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>disarray</span></a></span> glad i was able to help","filtered":[],"reblog":null,"account":{"id":"464472","username":"freon","acct":"freon@letsalllovela.in","display_name":"freon","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2018-08-18T00:00:00.000Z","note":"tech archaeologist, unix weenie<br><a class=\"hashtag\" href=\"https://letsalllovela.in/tag/nobot\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#nobot</a>","url":"https://letsalllovela.in/users/freon","avatar":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/000/464/472/original/bfc518d70cf6f13a.png","header":"https://files.mastodon.social/cache/accounts/headers/000/464/472/original/2e94bd33745f86a6.gif","header_static":"https://files.mastodon.social/cache/accounts/headers/000/464/472/static/2e94bd33745f86a6.png","followers_count":37,"following_count":41,"statuses_count":18442,"last_status_at":"2022-08-30","emojis":[],"fields":[{"name":"pronouns","value":"emacs/xemacs (or he/they)","verified_at":null},{"name":"age","value":"23.66667","verified_at":null}]},"media_attachments":[],"mentions":[{"id":"107946650784398271","username":"disarray","url":"https://pl.nulled.red/users/disarray","acct":"disarray@pl.nulled.red"}],"tags":[],"emojis":[],"card":null,"poll":null}
```

---

## 监测私信 {#direct}

```http
GET /api/v1/streaming/direct HTTP/1.1
```

返回接收到的私信的事件。

**返回：** `conversation`\
**OAuth：**用户令牌 + `read:statuses`\
**版本历史：**\
2.4.0 - 添加\
2.6.0 - 现在返回 `conversation` 而不是 `update`

#### 请求
##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的授权访问权限。

#### 事件

#### 事件

会话更新的示例：

```text
event: conversation
data: {"id":"819516","unread":true,"accounts":[{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/975674b2caa61034.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/975674b2caa61034.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":362,"last_status_at":"2022-11-13","emojis":[],"fields":[]}],"last_status":{"id":"109346889330629417","created_at":"2022-11-15T08:31:57.476Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"direct","language":null,"uri":"https://pl.nulled.red/objects/c869c5be-c184-4706-a45d-3459d9aa711c","url":"https://pl.nulled.red/objects/c869c5be-c184-4706-a45d-3459d9aa711c","replies_count":0,"reblogs_count":0,"favourites_count":0,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"test <span class=\"h-card\"><a class=\"u-url mention\" href=\"https://mastodon.social/@trwnh\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>trwnh</span></a></span>","filtered":[],"reblog":null,"account":{"id":"108892712797543112","username":"a","acct":"a@pl.nulled.red","display_name":"a","locked":false,"bot":true,"discoverable":false,"group":false,"created_at":"2022-08-27T00:00:00.000Z","note":"a (pleroma edition)","url":"https://pl.nulled.red/users/a","avatar":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/975674b2caa61034.png","avatar_static":"https://files.mastodon.social/cache/accounts/avatars/108/892/712/797/543/112/original/975674b2caa61034.png","header":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","header_static":"https://files.mastodon.social/cache/accounts/headers/108/892/712/797/543/112/original/f61d0382356caa0e.png","followers_count":0,"following_count":0,"statuses_count":362,"last_status_at":"2022-11-13","emojis":[],"fields":[]},"media_attachments":[],"mentions":[{"id":"14715","username":"trwnh","url":"https://mastodon.social/@trwnh","acct":"trwnh"}],"tags":[],"emojis":[],"card":null,"poll":null}}
```

---

## 建立 WebSocket 连接 {#websocket}

```http
wss://mastodon.example/api/v1/streaming
```

**返回：** [Events](#events)流\
**OAuth：** 用户令牌 + `read`（或 `read:statuses` 和/或 `read:notifications`）\
**版本历史：**\
3.3.0 - 添加
4.2.0 - 更改为需要用户令牌，移除公开和应用程序令牌访问 [#23989](https://github.com/mastodon/mastodon/pull/23989)

打开一个多路复用的 WebSocket 连接来接收事件。

#### 请求
##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的授权访问权限。

##### 参数

{{< hint style="info" >}}
建议对单用途连接使用查询参数，但也可以通过 WebSocket 连接发送带有 `type` 参数的 JSON 编码有效负载来提供参数。

订阅包含话题标签 `#foo` 的本站嘟文的示例：

```json
{ "type": "subscribe", "stream": "hashtag:local", "tag": "foo" }
```

取消订阅用户更新的示例：

```json
{ "type": "unsubscribe", "stream": "user" }
```
{{</hint>}}

access_token
: {{<required>}} 字符串。 用户授权的 OAuth 令牌。 替代 `Authorization` 标头。

stream
: {{<required>}} 字符串。 要监测事件的流。 有关可能的值，请参阅 [流](#streams)。

list
: 字符串。 当 `stream` 设置为 `list` 时，使用此参数指定列表 ID。

tag
: 字符串。 当 `stream` 设置为 `hashtag` 或 `hashtag:local` 时，使用此参数指定标签名称。

type
: 字符串。 对于发送到实例的 JSON 编码的有效负载，指定 `subscribe` 或 `unsubscribe` 以管理你希望接收的事件。

##### 事件

事件采用 JSON 编码。 如果提供了无效的访问令牌，连接将立即关闭。 如果你的实例启用了有限联合模式或授权获取模式，则必须提供访问令牌才能接收事件。

公开时间线的更新示例：

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
请注意，虽然事件是 JSON 编码的，但 `payload` 是按字符串编码和转义的，因此必须从该字符串解析并按 JSON 格式加载。 但是，对于 `delete` 和 `announcements.delete` 事件，有效负载是一个字符串，表示标识符，而不是 JSON 值。
{{</hint>}}

公共时间线的删除事件示例：

```json
{
  "stream": [
    "public"
  ],
  "event": "delete",
  "payload": "106692867363994015"
}
```

用户更改过滤规则的示例：

```json
{
  "stream": [
    "user"
  ],
  "event": "filters_changed"
}
```

{{< hint style="warning" >}}
请注意，`filters_changed` 事件不存在 `payload` 属性。 对于 `delete` 和 `announcements.delete`，有效负载是一个字符串，而不是对象。
{{</hint>}}

## 另请参阅

### 流式服务端

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/streaming/index.js" caption="streaming/index.js" >}}

### 后端事件发布

流式时间线在 Redis 中维护，并通过 `redis.publish()` 发布到 Redis。

#### 嘟文事件

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/fan_out_on_write_service.rb" caption="app/services/fan_out_on_write_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/remove_status_service.rb" caption="app/services/remove_status_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/batched_remove_status_service.rb" caption="app/services/batched_remove_status_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/push_conversation_worker.rb" caption="app/workers/push_conversation_worker.rb" >}}

#### 用户事件

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/feed_manager.rb" caption="app/lib/feed_manager.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/push_update_worker.rb" caption="app/workers/push_update_worker.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/notify_service.rb" caption="app/services/notify_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/models/custom_filter.rb" caption="app/models/custom_filter.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/publish_scheduled_announcement_worker.rb" caption="app/workers/publish_scheduled_announcement_worker.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/publish_announcement_reaction_worker.rb" caption="app/workers/publish_announcement_reaction_worker.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/unpublish_announcement_worker.rb" caption="app/workers/unpublish_announcement_worker.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/workers/push_encrypted_message_worker.rb" caption="app/workers/push_encrypted_message_worker.rb" >}}

### 流式客户端

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/javascript/mastodon/stream.js" caption="app/javascript/mastodon/stream.js" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/javascript/mastodon/actions/streaming.js" caption="app/javascript/mastodon/actions/streaming.js" >}}

{{< translation-status-zh-cn raw_title="streaming API methods" raw_link="/methods/streaming/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}

