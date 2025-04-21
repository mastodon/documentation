---
title: timelines API方法
description: 读取和查看嘟文的时间线。
menu:
  docs:
    weight: 40
    name: timelines
    parent: methods
    identifier: methods-timelines
aliases: [
  "/methods/timelines",
  "/api/methods/timelines",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看公共时间线 {#public}

```http
GET /api/v1/timelines/public HTTP/1.1
```

查看公开嘟文。

**返回：** [Status]({{<relref "entities/status">}}) 数组\
**OAuth：** 允许公开调用。 若实例已禁用公共预览，则需要应用令牌 + `read:statuses`。\
**版本历史：**\
0.0.0 - 添加\
2.3.0 - 添加 `only_media`\
2.6.0 - 添加 `min_id`\
3.0.0 - 若公共预览已禁用，则需要身份验证\
3.1.4 - 添加 `remote`\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

#### 请求

##### 标头

Authorization
: 提供此标头以及 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

local
: 布尔值。 是否仅显示本站嘟文？ 默认为 false。

remote
: 布尔值。 是否仅显示外站嘟文？ 默认为 false。

only_media
: 布尔值。 是否仅显示附有媒体的嘟文？ 默认为 false。

max_id
: 字符串。 返回的所有结果将小于此 ID。 事实上设置了结果的上限。

since_id
: 字符串。 返回的所有结果将大于此 ID。 事实上设置了结果的下限。

min_id
: 字符串。 返回与此 ID 相邻且更新的结果。 事实上在此 ID 处设置游标并向前分页。

limit
: 整数。 要返回的最大结果数。 默认为 20 个嘟文。 最多 40 个嘟文。

#### 响应
##### 200: OK

带有 limit=2 的示例 API 调用

```json
[
  {
    "id": "103206804533200177",
    "created_at": "2019-11-26T23:27:31.000Z",
    // ...
    "visibility": "public",
    // ...
  },
  {
    "id": "103206804086086361",
    "created_at": "2019-11-26T23:27:32.000Z",
    // ...
    "visibility": "public",
    // ...
  }
]
```

---

## 查看话题标签时间线 {#tag}

```http
GET /api/v1/timelines/tag/:hashtag HTTP/1.1
```

查看包含给定话题标签的公开嘟文。

**返回：** [Status]({{<relref "entities/status">}}) 数组\
**OAuth：** 允许公开调用。 若实例已禁用公共预览，则需要应用令牌 + `read:statuses`。\
**版本历史：**\
0.0.0 - 添加\
2.3.0 - 添加 `only_media`\
2.6.0 - 添加 `min_id`\
2.7.0 - 为其他标签添加 `any[]`、`all[]`、`none[]`\
3.0.0 - 若公共预览已禁用，则需要身份验证\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`。 添加 `remote`

#### 请求

##### 路径参数

:hashtag
: {{<required>}} 字符串。 话题标签的名称（不包括#符号）。

##### 标头

Authorization
: 提供此标头以及 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

any[]
: 字符串数组。 返回包含其中**任何一个**话题标签的嘟文。

all[]
: 字符串数组。 返回同时包含**所有**话题标签的嘟文。

none[]
: 字符串数组。 返回不包含其中**任何一个**话题标签的嘟文。

local
: 布尔值。 是否仅返回本站嘟文？ 默认为 false。

remote
: 布尔值。 是否仅返回外站嘟文？ 默认为 false。

only_media
: 布尔值。 是否仅返回附有媒体的嘟文？ 默认为 false。

max_id
: 字符串。 返回的所有结果将小于此 ID。 事实上设置了结果的上限。

since_id
: 字符串。 返回的所有结果将大于此 ID。 事实上设置了结果的下限。

min_id
: 字符串。 返回与此 ID 相邻且更新的结果。 事实上在此 ID 处设置游标并向前分页。

limit
: 整数。 要返回的最大结果数。 默认为 20 个嘟文。 最多 40 个嘟文。

#### 响应
##### 200: OK

话题标签 #cats 的时间线示例，limit=2

```json
[
  {
    "id": "103206185588894565",
    "created_at": "2019-11-26T20:50:15.866Z",
    // ...
    "visibility": "public",
    // ...
    "content": "<p><a href=\"https://mastodon.social/tags/cats\" class=\"mention hashtag\" rel=\"tag\">#<span>cats</span></a></p>",
    // ...
    "tags": [
      {
        "name": "cats",
        "url": "https://mastodon.social/tags/cats"
      }
    ],
    // ...
  },
  {
    "id": "103203659567597966",
    "created_at": "2019-11-26T10:07:49.000Z",
    // ...
    "visibility": "public",
    // ...
    "content": "<p>Caught on the hop. 😺 </p><p><a href=\"https://chaos.social/tags/Qualit%C3%A4tskatzen\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Qualitätskatzen</span></a> <a href=\"https://chaos.social/tags/cats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>cats</span></a> <a href=\"https://chaos.social/tags/mastocats\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>mastocats</span></a> <a href=\"https://chaos.social/tags/catsofmastodon\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>catsofmastodon</span></a> <a href=\"https://chaos.social/tags/Greece\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Greece</span></a> <a href=\"https://chaos.social/tags/Agistri\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Agistri</span></a><br>(photo: <span class=\"h-card\"><a href=\"https://chaos.social/@kernpanik\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>kernpanik</span></a></span> | license: CC BY-NC-SA 4.0)</p>",
    // ...
    "tags": [
      {
        "name": "qualitätskatzen",
        "url": "https://mastodon.social/tags/qualit%C3%A4tskatzen"
      },
      {
        "name": "cats",
        "url": "https://mastodon.social/tags/cats"
      },
      {
        "name": "mastocats",
        "url": "https://mastodon.social/tags/mastocats"
      },
      {
        "name": "catsofmastodon",
        "url": "https://mastodon.social/tags/catsofmastodon"
      },
      {
        "name": "greece",
        "url": "https://mastodon.social/tags/greece"
      },
      {
        "name": "agistri",
        "url": "https://mastodon.social/tags/agistri"
      }
    ],
    // ...
  }
]
```

##### 404: Not found

话题标签不存在

```json
{
  "error": "Record not found"
}
```

---

## 查看主页时间线 {#home}

```http
GET /api/v1/timelines/home HTTP/1.1
```

查看来自关注的用户和话题标签的嘟文。

**返回：** [Status]({{<relref "entities/status">}}) 数组\
**OAuth：** 用户 + `read:statuses`\
**版本历史：**\
0.0.0 - 添加\
2.6.0 - 添加 `min_id`\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`
4.0.0 - 由于用户现在可以关注话题标签，因此来自未关注用户的嘟文可能会出现在时间线中

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。 返回的所有结果将小于此 ID。 事实上设置了结果的上限。

since_id
: 字符串。 返回的所有结果将大于此 ID。 事实上设置了结果的下限。

min_id
: 字符串。 返回与此 ID 相邻且更新的结果。 事实上在此 ID 处设置游标并向前分页。

limit
: 整数。 要返回的最大结果数。 默认为 20 个嘟文。 最多 40 个嘟文。

#### 响应
##### 200: OK

将返回主页时间线中的嘟文

```json
[
  {
    "id": "103206791453397862",
    "created_at": "2019-11-26T23:24:13.113Z",
    // ...
  },
  // ...
]
```

##### 206: Partial content

正在重新生成主页信息流

```text
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

---

## 查看链接时间线 {#link}

```http
GET /api/v1/timelines/link?url=:url HTTP/1.1
```

查看包含指向指定的当前热门文章的链接的公开嘟文。 这仅列出来自选择加入发现功能的用户的嘟文。

**返回：** [Status]({{<relref "entities/status">}}) 数组\
**OAuth：** 允许公开调用。 若实例已禁用公共预览，则需要应用令牌 + `read:statuses`。\
**版本历史：**\
4.3.0 - 添加

#### 请求

##### 标头

Authorization
: 提供此标头以及 `Bearer <user token>`，以获得对此 API 方法的访问授权。

##### 查询参数

url
: {{<required>}} 字符串。热门文章的 URL。

max_id
: 字符串。 返回的所有结果将小于此 ID。 事实上设置了结果的上限。

since_id
: 字符串。 返回的所有结果将大于此 ID。 事实上设置了结果的下限。

min_id
: 字符串。 返回与此 ID 相邻且更新的结果。 事实上在此 ID 处设置游标并向前分页。

limit
: 整数。 要返回的最大结果数。 默认为 20 个嘟文。 最多 40 个嘟文。

#### 响应
##### 200: OK

##### 404: Not found

提供的 URL 当前不是热门文章链接。

```json
{
  "error": "Record not found"
}
```

---

## 查看列表时间线 {#list}

```http
GET /api/v1/timelines/list/:list_id HTTP/1.1
```

查看给定列表时间线中的嘟文。

**返回：** [Status]({{<relref "entities/status">}}) 数组\
**OAuth：** 用户令牌 + `read:lists`\
**版本历史：**\
2.1.0 - 添加\
2.6.0 - 添加 `min_id`\
3.3.0 - 现在可以同时使用 `min_id` 和 `max_id`

#### 请求

##### 路径参数

:list_id
: {{<required>}} 字符串。 数据库中列表的本站 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。 返回的所有结果将小于此 ID。 事实上设置了结果的上限。

since_id
: 字符串。 返回的所有结果将大于此 ID。 事实上设置了结果的下限。

min_id
: 字符串。 返回与此 ID 相邻且更新的结果。 事实上在此 ID 处设置游标并向前分页。

limit
: 整数。 要返回的最大结果数。 默认为 20 个嘟文。 最多 40 个嘟文。

#### 响应
##### 200: OK

将返回此列表中的嘟文。

```json
[
  {
    "id": "103206791453397862",
    "created_at": "2019-11-26T23:24:13.113Z",
    // ...
  },
  // ...
]
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你并未拥有该列表或该列表不存在

```json
{
  "error": "Record not found"
}
```

---

## 查看私信时间线 {{%deprecated%}} {#direct}

```http
GET /api/v1/timelines/direct HTTP/1.1
```

查看你的帐户或通知中可见性设置为 "direct" 的嘟文。

**返回：** [Status]({{<relref "entities/status">}}) 数组\
**OAuth：** 用户令牌 + `read:statuses`\
**版本历史：**\
x.x.x - 添加\
2.6.0 - 添加 `min_id`。 已弃用，推荐使用 [Conversations API]({{<relref "methods/conversations">}})\
3.0.0 - 移除

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头以及 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 查询参数

max_id
: 字符串。 返回的所有结果将小于此 ID。 事实上设置了结果的上限。

since_id
: 字符串。 返回的所有结果将大于此 ID。 事实上设置了结果的下限。

min_id
: 字符串。 返回与此 ID 相邻且更新的结果。 事实上在此 ID 处设置游标并向前分页。

limit
: 整数。 要返回的最大结果数。 默认为 20 个嘟文。 最多 40 个嘟文。

#### 响应
##### 200: OK

由你撰写或提及了你的带有 `direct` 可见性的嘟文。 嘟文不按对话分组，而是按时间顺序返回。

```json
[
  {
    "id": "103206185588894565",
    "created_at": "2019-11-26T20:50:15.866Z",
    // ...
    "visibility": "direct",
    // ...
  },
  // ...
]
```

##### 401: Unauthorized

Authorization 标头无效或缺失。

```json
{
  "error": "The access token is invalid"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/timelines/home_controller.rb" caption="app/controllers/api/v1/timelines/home_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/timelines/list_controller.rb" caption="app/controllers/api/v1/timelines/list_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/timelines/public_controller.rb" caption="app/controllers/api/v1/timelines/public_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/timelines/tag_controller.rb" caption="app/controllers/api/v1/timelines/tag_controller.rb" >}}

{{< translation-status-zh-cn raw_title="timelines API methods" raw_link="/methods/timelines/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
