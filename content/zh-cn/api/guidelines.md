---
title: 指南与最佳实践
description: 实现 Mastodon 应用时需要注意的事项。
menu:
  docs:
    weight: 10
    parent: api
---

## 登录 {#login}

**用户必须能够从应用登录到任何 Mastodon 实例**。 这意味着你必须询问服务器的域名，并使用应用注册 API 动态获取 OAuth2 凭据。

{{< page-ref page="client/authorized" >}}

{{< page-relref ref="methods/oauth" caption="OAuth 方法" >}}

{{< page-relref ref="api/oauth-scopes" caption="OAuth 作用域" >}}

## 用户名 {#username}

**去中心化对于用户而言必须是透明的**。 用户应该能够看到给定的用户来自另一个服务器，例如，可以通过在某处显示他们的 `acct` 实现这一点。 请注意，对于本站用户，`acct` 等于 `username`，对于外站用户，`acct` 等于 `username@domain`。

## 处理和排序 ID {#id}

原始的 Mastodon 实体 ID 以整数形式生成并转换为字符串。 但是，这并不意味着 ID *是* 整数，也不应该将其转换为整数！ 这样做可能会因整数溢出而导致客户端应用崩溃，因此请**始终将 ID 视为字符串。**

话虽如此，由于 ID 是数字的字符串表示形式，因此仍然可以通过以下步骤轻松地按时间顺序对其进行排序：

1. 按大小排序。 较新的嘟文将具有更长的 ID。
2. 按字典顺序排序。 较新的嘟文在按位置比较时，至少会有一个数字更高。

## 通过 API 响应进行分页 {#pagination}

许多 API 方法允许你使用 `limit`、`max_id`、`min_id` 和 `since_id` 等参数进行分页以获取更多信息。

limit
: 要返回的最大结果数。 通常存在默认限制和最大限制； 这些限制将根据 API 方法而异。

max_id
: 字符串。 返回的所有结果都将小于此 ID。 该参数实际上设置了结果的上限。

since_id
: 字符串。 返回的所有结果都将大于此 ID。 该参数实际上设置了结果的下限。

min_id
: 字符串。 返回紧邻此 ID 之后的新结果。 该参数实际上在此 ID 处设置了游标，并据此游标向前分页。（自 v2.6.0 起可用。）

例如，我们可能会使用某些参数获取 `https://mastodon.example/api/v1/accounts/1/statuses`，并且在下列情况下，我们将分别获得以下结果：

- 设置 `?max_id=1` 将不返回任何嘟文，因为没有 ID 早于 `1` 的嘟文。
- 设置 `?since_id=1` 将返回最新的嘟文，因为自 `1` 以来已经有很多嘟文。
- 设置 `?min_id=1` 将返回最旧的嘟文，因为 `min_id` 设置了游标。

某些 API 方法作用于未在 API 响应中公开公开的实体 ID，并且仅为后端和数据库所知。（与这种情况有关的通常是引用其他实体的实体，例如引用帐户的 Follow 实体，或引用嘟文的 Favourite 实体等。）

为了解决这个问题，Mastodon 可能会返回指向“prev”和“next”页面的链接。 这些链接通过响应中的 HTTP `Link` 标头提供。 考虑以下虚构的 API 调用：

```http
GET https://mastodon.example/api/v1/endpoint HTTP/1.1
Authorization: Bearer <access_token>

Link: <https://mastodon.example/api/v1/endpoint?max_id=7163058>; rel="next", <https://mastodon.example/api/v1/endpoint?min_id=7275607>; rel="prev"
[
  {
    // some Entity
  },
  // more Entities in an Array
]
```

在这种情况下，你可以检索 `Link` 标头并解析它以查找指向较旧或较新页面的链接。 请记住以下规则：

- 这些链接将全部通过一个 `Link` 标头返回，并用逗号和空格 (`, `) 分隔
- 每个链接都包含一个 URL 和一个链接关系，用分号和空格 (`; `) 分隔
- URL 将用尖括号 (`<>`) 括起来，链接关系将用双引号 (`""`) 括起来，并以 `rel=` 为前缀。
- 链接关系的值将为 `prev` 或 `next`。

跟随 `next` 链接应显示较旧的结果。 跟随 `prev` 链接应显示较新的结果。

## 弃用 {#deprecations}

Mastodon 很少删除 API，但这种情况仍然会不时发生。 因此，建议及时了解 Mastodon 的发布版本，并留意已弃用的 API。

此外，为了帮助实施者发现已弃用的 API 的使用情况，Mastodon 4.4.0 使用了 [RFC9745](https://datatracker.ietf.org/doc/html/rfc9745) 中定义的 `Deprecation` 标头。 建议库和应用程序开发人员查找此标头并在其开发环境中显示警告，以便可以在这些已弃用的 API 被淘汰之前发现它们。

## 格式化 {#formatting}

无法从外站服务器获取纯文本内容，并且纯文本语法规则在 Mastodon 和其他 fediverse 应用程序之间可能差异很大。 对于某些属性，例如嘟文的内容，**Mastodon 提供经过清理的 HTML**。 有关更多详细信息，请查看 [HTML 清理]({{< relref "spec/activitypub#sanitization" >}})。 你可以预期一下标签出现在内容中：

* `<p>`
* `<br>`
* `<span>`
* `<a>`

{{< page-relref ref="spec/activitypub#sanitization" caption="ActivityPub > HTML 清理" >}}

### 提及、话题标签和自定义表情 {#tags}

提及和话题标签是 `<a>` 标签。 自定义表情符号保留其纯文本简码形式。 为了赋予这些实体语义含义并添加特殊处理，例如在应用内打开提及的账户而不是按网页打开， [Status]({{< relref "entities/Status" >}}) 中包含了对应的元数据，可以将其与特定标签匹配。

{{< page-relref ref="entities/Status" caption="嘟文实体" >}}

{{< page-relref ref="entities/Status#mentions" caption="嘟文#mentions" >}}

{{< page-relref ref="entities/Status#tags" caption="嘟文#tags" >}}

{{< page-relref ref="entities/Status#emojis" caption="嘟文#emojis" >}}

### 链接缩短 {#links}

Mastodon 中的链接不会使用 URL 缩短器缩短，并且强烈建议不要使用 URL 缩短器。 文本中的 URL 始终计为 23 个字符，旨在以可视化方式缩短。 为此，链接的标记如下所示：

```html
<a href="https://example.com/page/that/is/very/long">
  <span class="invisible">https://</span>
  <span class="ellipsis">example.com/page</span>
  <span class="invisible">/that/is/very/long</span>
</a>
```

带有 `invisible` 类的 span 可以隐藏。 中间的 span 旨在保持可见。 如果 URL 不是非常长，则它可能没有类； 否则，它将具有 `ellipsis` 类。 标记中未插入省略号 (`…`) 字符； 相反，如果你需要在应用中使用它，则应该自己插入它。

## 过滤规则 {#filters}

### 服务端过滤规则（v2，Mastodon 4.0 及更高版本） {#server-filtered}

如果过滤规则针对嘟文，则相应的 FilterResult 将包含在 `filtered` 属性中。 客户端应检查此属性是否存在任何匹配项，并使用它们来应用预期的过滤规则操作。

但是，客户端实现可能仍然希望在客户端执行自己的规则匹配，因为这将允许追溯应用过滤规则更改，而无需从服务器重新获取嘟文。 这样操作时，应用应注意不要忽略具有 `keyword_matches` 以外的其他属性的 `filtered` 条目，以便处理过滤系统的扩展（例如 `status_matches`）。

命中的过滤规则需要根据上下文（`home`、`notifications`、`public`、`thread` 或 `profile`）和到期日期进行过滤。

当至少一个被命中且正在生效的过滤规则在 `filter_action` 的值为 `hide` 时，则不应显示该嘟文。 否则，如果至少一个被命中且正在生效的过滤规则在 `filter_action` 的值为 `warn`，则应隐藏该嘟文并显示警告，并且应允许用户在被告知命中了哪些过滤规则后显示该嘟文（通过 `title` 而不是通过实际匹配的关键字来标识）。

为了进行扩展，`filter_action` 的未知值应被视为 `warn`。

### 客户端过滤（v1，Mastodon 4.0 之前） {#client-filtered}

客户端必须基于从 API 返回的过滤规则执行自己的文本过滤。 服务器将为 `home` 和 `notifications` 上下文应用 `irreversible` 过滤规则，但**其他任何内容仍由客户端过滤**！ 如果以某种方式未通过 `irreversible` 过滤规则删除嘟文，则客户端仍应对其进行过滤。

服务器不会删除过期的过滤规则。 它们应该不再生效，但它们仍然由服务器存储，因为用户可能会更新到期时间以重新启用该过滤规则。 用户最终可以删除这些过滤规则（如果他们希望这样做）。

如果 `whole_word` 为 true，则客户端应用应执行以下操作：

* 为你的应用定义“单词组成字符”。 在官方实现中，JavaScript 中为 `[A-Za-z0-9_]`，Ruby 中为 `[[:word:]]`。 Ruby 使用 POSIX 字符类（字母 | 标记 | 十进制数字 | 连接标点符号）。
* 如果短语以单词字符开头，且匹配范围之前的上一个字符是一个单词字符，则应将它的匹配范围视为未命中。
* 如果短语以单词字符结尾，且匹配范围之后的下一个字符是一个单词字符，则应将它的匹配范围视为未命中。

请查看 Mastodon 源代码中的 `app/javascript/mastodon/selectors/index.js` 和 `app/lib/feed_manager.rb` 以获取更多详细信息。

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/javascript/mastodon/selectors/index.js" caption="app/javascript/mastodon/selectors/index.js" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/feed_manager.rb" caption="app/lib/feed_manager.rb" >}}

## 用于裁剪媒体缩略图的焦点 {#focal-points}

服务器端的预览图像永远不会被裁剪，以便支持各种应用和用户界面。 因此，裁剪必须由应用完成。 为了智能地执行裁剪，可以使用焦点来确保图像的特定部分始终在裁剪后的视口内。 请查看[关于如何定义焦点的指南](https://github.com/jonom/jquery-focuspoint#1-calculate-your-images-focus-point)。 总之，浮点范围为 -1.0 到 1.0，从左到右或从下到上。 (0,0) 是图像的中心。 (0.5, 0.5) 将位于右上象限的中心。 (-0.5, -0.5) 将位于左下象限的中心。 作为参考，Mastodon 前端中的缩略图一般为 16:9。

{{< figure src="assets/focal-points.jpg" caption="各种焦点及其坐标的演示" >}}

{{< translation-status-zh-cn raw_title="Guidelines and best practices" raw_link="/api/guidelines/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
