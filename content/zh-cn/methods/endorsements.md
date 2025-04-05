---
title: endorsements API 方法
description: 在你自己的账户中推荐其他账户。另请参见 accounts/:id/{pin,unpin}
menu:
  docs:
    weight: 90
    name: endorsements
    parent: methods-accounts
    identifier: methods-endorsements
aliases: [
  "/methods/endorsements",
  "/api/methods/endorsements",
  "/methods/accounts/endorsements",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看当前推荐的账户 {#get}

```http
GET /api/v1/endorsements HTTP/1.1
```

用户当前在其账户中推荐的帐户。

**返回：** [Account]({{< relref "entities/account" >}})数组\
**OAuth：** 用户令牌 + `read:accounts`\
**版本历史：**\
2.5.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

since_id
: **内部参数。** 使用 HTTP `Link` 标头进行分页。

limit
: 整数。要返回的最大结果数。默认为 40 个帐户。最大 80 个帐户。

#### 响应

##### 200: OK

带有 limit=2 的示例调用。

```json
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

AccountPin ID 通常不会通过任何 API 响应公开，所以你必须解析 HTTP `Link` 标头才能加载较旧或较新的结果。有关更多信息，请参见[通过 API 响应进行分页]({{<relref "api/guidelines#pagination">}})。

```http
Link: <https://mastodon.example/api/v1/endorsements?limit=2&max_id=832844>; rel="next", <https://mastodon.example/api/v1/endorsements?limit=2&since_id=952529>; rel="prev"
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参考

{{< page-relref ref="methods/accounts#pin" caption="POST /api/v1/accounts/:id/pin" >}}

{{< page-relref ref="methods/accounts#unpin" caption="POST /api/v1/accounts/:id/unpin" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/endorsements_controller.rb" caption="app/controllers/api/v1/endorsements_controller.rb" >}}

{{< translation-status-zh-cn raw_title="endorsements API methods" raw_link="/methods/endorsements/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
