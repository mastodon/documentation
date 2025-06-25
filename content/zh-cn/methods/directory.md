---
title: directory API 方法
description: 你的网站所知的用户目录。
menu:
  docs:
    weight: 20
    name: directory
    parent: methods-instance
    identifier: methods-directory
aliases: [
  "/methods/directory",
  "/api/methods/directory",
  "/methods/instance/directory",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 查看用户目录 {#get}

```http
GET /api/v1/directory HTTP/1.1
```

列出目录中可见的用户。

**返回：** [Account]({{< relref "entities/account" >}})数组\
**OAuth：** 公开\
**版本历史：**\
3.0.0 - 添加

#### 请求

##### 查询参数

offset
: 数字。跳过前 n 个结果。

limit
: 数字。加载多少个用户。默认为 40 个用户。最多 80 个用户。

order
: 字符串。使用 `active` 按最近发布的嘟文排序（默认），或者使用 `new` 按用户的创建时间降序排序。

local
: 布尔值。若为 true，则仅返回本站帐户。

#### 响应
##### 200: OK

limit=2 的示例结果

```json
[
  {
    "id": "796927",
    "username": "eternalNo3",
    "acct": "eternalNo3@best-friends.chat",
    "display_name": "ESD＠┓（谷）┏",
    // ...
  },
  {
    "id": "787648",
    "username": "ariel",
    "acct": "ariel@best-friends.chat",
    "display_name": "あやっしー🧜🏻‍♀️",
    // ...
  }
]
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/directories_controller.rb" caption="app/controllers/api/v1/directories_controller.rb" >}}

{{< translation-status-zh-cn raw_title="directory API methods" raw_link="/methods/directory/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
