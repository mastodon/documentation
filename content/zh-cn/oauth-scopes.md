---
标题: 开放授权范围
描述: 定义你可以用API去做什么的权限
目录:
  文档:
    宽度: 10
    参数: api
---

## 开放授权范围

API 由接入范围分割。范围是分层的，即如果您有权访问 `read`，那么您就自动有权访问 `read:accounts`。**建议您尽可能少地为您的应用程序请求。**

可以同时请求多个范围：在应用程序创建期间使用 `scopes` 参数，以及在授权阶段使用 `scope` 查询参数 \(space-separate the scopes\)。

{{< hint style="info" >}}
注意`scope` 和 `scopes` 之间的区别。 这是因为 `scope` 是一条标准的开放授权参数名称， 因此它被用在开放授权方式中。 Mastodon’s自身的REST API 使用更适合的`scopes`。
{{< /hint >}}

如果您未在授权请求中指定 `scope`，或在应用创建请求中未指定`scopes`, 则生成的访问令牌/应用将默认为`read`访问。

创建app时保存的scope集合必须包含你在授权请求中请求的所有scope，否则授权将失败。

### 版本历史 {#各版本}

- 0.9.0 - 阅读, 写, 跟随
- 2.4.0 - 发布
- 2.4.3 - 粒状范围 [https://github.com/tootsuite/mastodon/pull/7929](https://github.com/tootsuite/mastodon/pull/7929)
- 2.6.0 - 阅读:弃用报告[https://github.com/tootsuite/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f](https://github.com/tootsuite/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f)
- 2.6.0 - 写:增加对话 [https://github.com/tootsuite/mastodon/pull/9009](https://github.com/tootsuite/mastodon/pull/9009)
- 2.9.1 - 增加管理范围 [https://github.com/tootsuite/mastodon/pull/9387](https://github.com/tootsuite/mastodon/pull/9387)
- 3.1.0 - 增加书签范围

## 范围列表

### `read` {#read}

Grants access to read data. Requesting `read` will also grant child scopes shown in the left column of the table below.

### `write` {#write}

Grants access to write data. Requesting `write` will also grant child scopes shown in the right column of the table below.

### `follow` {#follow}

Grants access to manage relationships. Requesting `follow` will also grant the following child scopes, shown in bold in the table:

* `read:blocks`, `write:blocks`
* `read:follows`, `write:follows`
* `read:mutes`, `write:mutes`

### `push` {#push}

Grants access to [Web Push API subscriptions.]({{< relref "../methods/notifications/push.md" >}}) Added in Mastodon 2.4.0.

### Admin scopes {#admin}

Used for moderation API. Added in Mastodon 2.9.1. The following granular scopes are available \(note that there is no singular `admin` scope\):

* `admin:read`
  * `admin:read:accounts`
  * `admin:read:reports`
* `admin:write`
  * `admin:write:accounts`
  * `admin:write:reports`

## Granular scopes {#granular}

| read | write |
| :--- | :--- |
| read:accounts | write:accounts |
| **read:blocks** | **write:blocks** |
| read:bookmarks | write:bookmarks |
|  | write:conversations |
| read:favourites | write:favourites |
| read:filters | write:filters |
| **read:follows** | **write:follows** |
| read:lists | write:lists |
|  | write:media |
| **read:mutes** | **write:mutes** |
| read:notifications | write:notifications |
|  | write:reports |
| read:search |  |
| read:statuses | write:statuses |

| admin:read | admin:write |
| :--- | :--- |
| admin:read:accounts | admin:write:accounts |
| admin:read:reports | admin:write:reports |
