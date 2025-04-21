---
title: reports API 方法
description: 向你的管理员举报有问题的用户。
menu:
  docs:
    weight: 70
    name: reports
    parent: methods-accounts
    identifier: methods-reports
aliases: [
  "/methods/reports",
  "/api/methods/reports",
  "/methods/accounts/reports",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 提交举报 {#post}

```http
POST /api/v1/reports HTTP/1.1
```

**返回:** [Report]({{< relref "entities/report" >}})\
**OAuth:** 用户令牌 + `write:reports`\
**版本历史:**\
1.1 - 添加\
2.3.0 - 添加 `forward` 参数\
3.5.0 - 添加 `category` 和 `rule_ids` 参数\
4.0.0 - 若提供了 `rule_ids`，则 `category` 现在是可选的\
4.2.0 - 添加 `legal` 类别

#### 请求
##### 标头

Authorization
: {{<required>}} 提供带有 `Bearer <user_token>` 的标头，以获得对此 API 方法的访问授权。

##### 表单数据参数

account_id
: {{<required>}} 字符串。要举报的帐户的 ID。

status_ids[]
: 字符串数组。你可以将嘟文附加到举报以提供其他上下文。

comment
: 字符串。举报的原因。默认最大长度为 1000 个字符。

forward
: 布尔值。若帐户是外站账户，是否应将举报转发给外站管理员？默认为 false。

category
: 字符串。指定举报是否由于 `spam` （骚扰信息）、`legal` （非法内容）、 `violation` （违反特定的实例规则） 或某些 `other` （其它）原因。默认为 `other`。若提供了 `rule_ids[]`，则将设置为 `violation`（无论你实际提供了何种类别）。

rule_ids[]
: 字符串数组。对于 `violation` 类别举报，指定所违反的确切规则的 ID。规则及其 ID 可通过 [GET /api/v1/instance/rules]({{< relref "methods/instance#rules" >}}) 和 [GET /api/v1/instance]({{< relref "methods/instance#get" >}}) 获得。有关更多信息，请参见 [处理和排序 ID]({{< relref "api/guidelines/#id" >}})。

#### 响应
##### 200: OK

提供了一个嘟文 ID 和一个类别为 `spam`，并带有评论的示例调用

```json
{
  "id": "48914",
  "action_taken": false,
  "action_taken_at": null,
  "category": "spam",
  "comment": "Spam account",
  "forwarded": false,
  "created_at": "2022-08-25T09:56:16.763Z",
  "status_ids": [
    "108882889550545820"
  ],
  "rule_ids": null,
  "target_account": {
    "id": "108366849347798387",
    "username": "Baluke",
    "acct": "Baluke",
    "display_name": "Baluke Dental Studios",
    "locked": false,
    "bot": false,
    "discoverable": false,
    "group": false,
    "created_at": "2022-05-26T00:00:00.000Z",
    "note": "<p>Baluke Dental Studios is a full service dental lab offering fabrication, staining, and digital services. Advanced technologies and a meticulous process ensure reduced chair time, lower costs, and better patient outcomes with beautiful smiles. Talk to a representative today.</p><p><a href=\"https://baluke.com/\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">baluke.com/</span><span class=\"invisible\"></span></a></p>",
    "url": "https://mastodon.social/@Baluke",
    "avatar": "https://files.mastodon.social/accounts/avatars/108/366/849/347/798/387/original/dbcfe99ed5def0f4.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/108/366/849/347/798/387/original/dbcfe99ed5def0f4.png",
    "header": "https://static-cdn.mastodon.social/headers/original/missing.png",
    "header_static": "https://static-cdn.mastodon.social/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 38,
    "last_status_at": "2022-08-25",
    "emojis": [],
    "fields": []
  }
}
```

##### 401: Unauthorized

无效或缺失的授权标头

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

举报未提交。

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

令牌没有授权用户

```json
{
  "error": "This method requires an authenticated user"
}
```

或者，`category` 设置为 `violation`，但提供了无效或缺失的 `rule_ids`

```json
{
  "error": "Validation failed: Rule ids does not reference valid rules"
}
```

或者（Mastodon 3.5），`category` 设置为 `violation` 之外的其他内容，但提供了一些 `rule_ids`

```json
{
  "error": "Validation failed: Rule ids must be blank"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/reports_controller.rb" caption="app/controllers/api/v1/reports_controller.rb" >}}

{{< translation-status-zh-cn raw_title="reports API methods" raw_link="/methods/reports/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
