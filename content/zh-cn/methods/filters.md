---
title: filters API 方法
description: 创建和管理过滤规则。
menu:
  docs:
    weight: 60
    name: filters
    parent: methods-accounts
    identifier: methods-filters
aliases: [
  "/methods/filters",
  "/api/methods/filters",
  "/methods/accounts/filters",
]
---

## 服务端 (v2) 方法 {#v2}

自 Mastodon 4.0 起，过滤规则可以包含多个关键词，并在服务端进行匹配。客户端会基于[嘟文的 `filtered` 属性]({{< relref "entities/Status#filtered" >}})应用过滤操作。

---

### 查看所有过滤规则 {#get}

```http
GET /api/v2/filters HTTP/1.1
```

获取当前用户的所有过滤规则的列表。

**返回：**[Filter]({{< relref "entities/Filter" >}}) 数组\
**OAuth:** 用户令牌 + `read:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "id": "20060",
    "title": "Remove Twitter crossposts from public timeline",
    "context": [
      "public"
    ],
    "expires_at": null,
    "filter_action": "hide",
    "keywords": [
        {
          "id": "1311",
          "keyword": "from birdsite",
          "whole_word": true
        },
        {
          "id": "1324",
          "keyword": "@twitter.com",
          "whole_word": false
        },
        {
          "id": "1325",
          "keyword": "https://t.co/",
          "whole_word": false
        }
    ],
    "statuses": []
  },
  // ...
]
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

### 查看特定过滤规则 {#get-one}

```http
GET /api/v2/filters/:id HTTP/1.1
```

获取当前用户的单条过滤规则。

**返回：**[Filter]({{< relref "entities/Filter" >}})\
**OAuth:** 用户令牌 + `read:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 Filter 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "20060",
  "title": "Remove Twitter crossposts from public timeline",
  "context": [
    "public"
  ],
  "expires_at": null,
  "filter_action": "hide",
  "keywords": [
    {
      "id": "1311",
      "keyword": "from birdsite",
      "whole_word": true
    },
    {
      "id": "1324",
      "keyword": "@twitter.com",
      "whole_word": false
    },
    {
      "id": "1325",
      "keyword": "https://t.co/",
      "whole_word": false
    }
  ],
  "statuses": []
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你并未拥有该过滤规则，或该过滤规则不存在

```json
{
  "error": "Record not found"
}
```

---

### 创建过滤规则 {#create}

```http
POST /api/v2/filters HTTP/1.1
```

使用给定参数创建过滤规则。

**返回：**[Filter]({{< relref "entities/Filter" >}})\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
4.0.0 - 添加\
4.4.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 5) - 将 `blur` 值添加到 `filter_action` 属性

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

title
: {{<required>}} 字符串。过滤组的名称。

context[]
: {{<required>}} 字符串数组。应在何处应用过滤规则。指定 `home`、`notifications`、`public`、`thread`、`account` 中的至少一个。

filter_action
: 字符串。匹配过滤规则时要应用的策略。指定 `warn`、`hide` 或 `blur`。

expires_in
: 整数。从现在开始，过滤规则应在多少秒后过期？

keywords_attributes[][keyword]
: 字符串。要添加到新创建的过滤规则的关键词。

keywords_attributes[][whole_word]
: 布尔值。关键词是否应考虑单词边界。

<!-- TODO: Remove when https://github.com/mastodon/mastodon/issues/21727 is fixed
keywords_attributes[][id]
: String. Will cause a 404 error if provided.

keywords_attributes[][_destroy]
: Boolean. Will cause the keyword to not be attached if provided.
-->

#### 响应

##### 200: OK

通过调用创建的 Filter 的示例：

```text
POST https://mastodon.example/api/v2/filters
?title=test
&context[]=public
&keywords_attributes[][keyword]=foo
&keywords_attributes[][whole_word]=false
&keywords_attributes[][keyword]=bar
&keywords_attributes[][whole_word]=true
```

```json
{
  "id": "25933",
  "title": "test",
  "context": [
    "public"
  ],
  "expires_at": null,
  "filter_action": "warn",
  "keywords": [
    {
      "id": "34978",
      "keyword": "foo",
      "whole_word": false
    },
    {
      "id": "34979",
      "keyword": "bar",
      "whole_word": true
    }
  ],
  "statuses": []
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

未指定过滤规则关键词 ID

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: Title can't be blank, Context can't be blank, Context None or invalid context supplied"
}
```

---

### 更新过滤规则 {#update}

```http
PUT /api/v2/filters/:id HTTP/1.1
```

使用给定参数更新过滤规则。

**返回：**[Filter]({{< relref "entities/Filter" >}})\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
4.0.0 - 添加\
4.4.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 5) - 将 `blur` 值添加到 `filter_action` 属性

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 Filter 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

title
: 字符串。过滤组的名称。

context[]
: 字符串数组。应在何处应用过滤规则。指定 `home`、`notifications`、`public`、`thread`、`account` 中的至少一个。

filter_action
: 字符串。匹配过滤规则时要应用的策略。指定 `warn`、`hide` 或 `blur`。

expires_in
: 整数。从现在开始，过滤规则应在多少秒后过期？

keywords_attributes[][keyword]
: 字符串。要添加到新创建的过滤规则的关键词。

keywords_attributes[][whole_word]
: 布尔值。关键词是否应考虑单词边界。

keywords_attributes[][id]
: 字符串。提供现有关键词的 ID 以修改它，而不是创建新关键词。

keywords_attributes[][_destroy]
: 布尔值。若为 true，将删除具有给定 ID 的关键词。

#### 响应
##### 200: OK

示例调用：

```
PUT /api/v2/filters/25933
?keywords_attributes[][id]=34978
&keywords_attributes[][_destroy]=true
&keywords_attributes[][id]=34979
&keywords_attributes[][keyword]=baz
```

这将删除关键词 34978 ("foo")，并将关键词 34979 ("bar") 替换为新关键词 ("baz")

```json
{
  "id": "25933",
  "title": "test",
  "context": [
    "public"
  ],
  "expires_at": null,
  "filter_action": "warn",
  "keywords": [
    {
      "id": "34979",
      "keyword": "baz",
      "whole_word": true
    }
  ],
  "statuses": []
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有该过滤规则，或该过滤规则不存在。或者，在请求中提供了 `keywords_attributes[][id]`，但此 Filter 中没有具有给定 id 的关键词。

```json
{
  "error": "Record not found"
}
```

---

### 删除过滤规则 {#delete}

```http
DELETE /api/v2/filters/:id HTTP/1.1
```

删除具有给定 id 的过滤规则。

**返回：**空\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
4.0.0 - 添加

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 Filter 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

过滤规则已成功删除

```json
{}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有该过滤规则，或该过滤规则不存在。

```json
{
  "error": "Record not found"
}
```

---

### 查看添加到过滤规则的关键词 {#keywords-get}

```http
GET /api/v2/filters/:filter_id/keywords HTTP/1.1
```

列出附加到当前过滤规则的所有关键词。

**返回：**[FilterKeyword]({{< relref "entities/FilterKeyword" >}}) 数组\
**OAuth:** 用户令牌 + `read:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:filter_id
: {{<required>}} 字符串。数据库中 Filter 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "id": "34979",
    "keyword": "baz",
    "whole_word": true
  },
  // ...
]
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有该过滤规则，或该过滤规则不存在。

```json
{
  "error": "Record not found"
}
```

---

### 将关键词添加到过滤规则 {#keywords-create}

```http
POST /api/v2/filters/:filter_id/keywords HTTP/1.1
```

将给定的关键词添加到指定的过滤规则

**返回：**[FilterKeyword]({{< relref "entities/FilterKeyword" >}})\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:filter_id
: {{<required>}} 字符串。数据库中 Filter 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

keyword
: {{<required>}} 字符串。要添加到过滤规则的关键词。

whole_word
: 布尔值。关键词是否应考虑单词边界。

#### 响应
##### 200: OK

```json
{
  "id": "35583",
  "keyword": "some",
  "whole_word": false
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有该过滤规则，或该过滤规则不存在。

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

未提供关键词

```json
{
  "error": "Validation failed: Keyword can't be blank"
}
```

---

### 查看单个关键词 {#keywords-get-one}

```http
GET /api/v2/filters/keywords/:id HTTP/1.1
```

通过给定的 id 获取一个过滤规则关键词。

**返回：**[FilterKeyword]({{< relref "entities/FilterKeyword" >}})\
**OAuth:** 用户令牌 + `read:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 FilterKeyword 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "34979",
  "keyword": "baz",
  "whole_word": true
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有该过滤规则，或者该过滤规则或过滤规则关键词不存在

```json
{
  "error": "Record not found"
}
```

---

### 编辑过滤规则中的关键词 {#keywords-update}

```http
PUT /api/v2/filters/keywords/:id HTTP/1.1
```

更新给定的过滤规则关键词。

**返回：**[FilterKeyword]({{< relref "entities/FilterKeyword" >}})\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 FilterKeyword 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

keyword
: {{<required>}} 字符串。要添加到过滤规则的关键词。

whole_word
: 布尔值。关键词是否应考虑单词边界。

#### 响应
##### 200: OK

关键词 "some" 已更新为关键词 "other"

```json
{
  "id": "35583",
  "keyword": "other",
  "whole_word": false
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有 FilterKeyword，或者它不存在

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

未提供关键词

```json
{
  "error": "Validation failed: Keyword can't be blank"
}
```

---

### 从过滤规则中删除关键词 {#keywords-delete}

```http
DELETE /api/v2/filters/keywords/:id HTTP/1.1
```

删除给定的过滤规则关键词。

**返回：**空\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 FilterKeyword 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

FilterKeyword 已成功删除

```json
{}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你并未拥有 FilterKeyword，或者它不存在

```json
{
  "error": "Record not found"
}
```

---

### 查看所有嘟文过滤规则 {#statuses-get}

```http
GET /api/v2/filters/:filter_id/statuses HTTP/1.1
```

获取此过滤规则中的所有嘟文过滤规则的列表。

**返回：**[FilterStatus]({{< relref "entities/FilterStatus" >}}) 数组\
**OAuth:** 用户令牌 + `read:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:filter_id
: {{<required>}} 字符串。数据库中 Filter 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
[
  {
    "id": "897",
    "status_id": "109416512469928632"
  },
  // ...
]
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有该过滤规则或该过滤规则不存在

```json
{
  "error": "Record not found"
}
```

---

### 将嘟文添加到过滤规则 {#statuses-add}

```http
POST /api/v2/filters/:filter_id/statuses HTTP/1.1
```

将对应嘟文添加到当前过滤规则。

**返回：**[FilterStatus]({{< relref "entities/FilterStatus" >}})\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:filter_id
: {{<required>}} 字符串。数据库中 Filter 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

status_id
: {{<required>}} 字符串。要添加到过滤规则的嘟文 ID。

#### 响应
##### 200: OK

在当前过滤规则中成功创建 FilterStatus

```json
{
  "id": "897",
  "status_id": "109416512469928632"
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有该过滤规则或该过滤规则不存在

```json
{
  "error": "Record not found"
}
```

---

### 查看单条嘟文过滤规则 {#statuses-get-one}

```http
GET /api/v2/filters/statuses/:id HTTP/1.1
```

获取单条嘟文过滤规则。

**返回：**[FilterStatus]({{< relref "entities/FilterStatus" >}})\
**OAuth:** 用户令牌 + `read:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 FilterStatus 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "897",
  "status_id": "109416512469928632"
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你未拥有 FilterStatus 或者它不存在

```json
{
  "error": "Record not found"
}
```

---

### 从过滤规则中删除嘟文 {#statuses-remove}

```http
DELETE /api/v2/filters/statuses/:id HTTP/1.1
```

从当前过滤规则中删除嘟文过滤规则。

**返回：**空\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
4.0.0 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 FilterStatus 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

FilterStatus 已成功删除

```json
{}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

你并未拥有 FilterStatus，或者它不存在

```json
{
  "error": "Record not found"
}
```

---

## 客户端 (v1) 方法 {#v1}

在 Mastodon 4.0 之前，过滤规则的匹配是在客户端完成的，并且过滤规则只能包含一个要过滤的短语。

---

### 查看你的过滤规则 {{%deprecated%}} {#get-v1}

```http
GET /api/v1/filters HTTP/1.1
```

**返回：**[V1::Filter]({{< relref "entities/V1_Filter" >}}) 的列表\
**OAuth:** 用户令牌 + `read:filters`\
**版本历史：**\
2.4.3 - 添加\
4.0.0 - 弃用。出于兼容目的，现在返回 V1::Filter 的列表，其中每个 V1::Filter 代表一个 FilterKeyword（`keyword` 在 `phrase` 属性中呈现）

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

不同上下文中各种过滤规则的摘录。

```json
[
  {
    "id": "6191",
    "phrase": ":eurovision2019:",
    "context": [
      "home"
    ],
    "whole_word": true,
    "expires_at": "2019-05-21T13:47:31.333Z",
    "irreversible": false
  },
  // ...
  {
    "id": "5580",
    "phrase": "@twitter.com",
    "context": [
      "home",
      "notifications",
      "public",
      "thread"
    ],
    "whole_word": false,
    "expires_at": null,
    "irreversible": true
  },
  // ...
]
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

---

### 查看单条过滤规则 {{%deprecated%}} {#get-one-v1}

```http
GET /api/v1/filters/:id HTTP/1.1
```

**返回：**[V1::Filter]({{< relref "entities/V1_Filter" >}})\
**OAuth:** 用户令牌 + `read:filters`\
**版本历史：**\
2.4.3 - 添加\
4.0.0 - 弃用。出于兼容性目的，现在返回一个 V1::Filter，它代表一个 FilterKeyword (`keyword` 显示在 `phrase` 属性中)。

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 FilterKeyword 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

```json
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": "2019-11-26T09:08:06.254Z",
  "irreversible": true
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

过滤规则 ID 不存在，或者不属于你

```json
{
  "error": "Record not found"
}
```

---

### 创建过滤规则 {{%deprecated%}} {#create-v1}

```http
POST /api/v1/filters HTTP/1.1
```

**返回：**[V1::Filter]({{< relref "entities/V1_Filter" >}})\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
2.4.3 - 添加\
3.1.0 - 向账户视图中的过滤规则添加了 `account` 上下文\
4.0.0 - 弃用。出于兼容性目的，现在返回一个 V1::Filter，它代表一个 FilterKeyword (`keyword` 显示在 `phrase` 属性中)。 此方法将创建一个仅包含一个 FilterKeyword 的 Filter。 Filter 的 `title` 和 FilterKeyword 的 `keyword` 将等于提供的 `phrase`。

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

phrase
: {{<required>}} 字符串。要过滤的正文文本。

context[]
: {{<required>}} 字符串数组。应在何处应用过滤规则。指定 `home`、`notifications`、`public`、`thread`、`account` 中的至少一个。

irreversible
: 布尔值。实例是否应不可逆地从主页和通知中删除匹配的实体？ 默认为 false。

whole_word
: 布尔值。过滤规则是否应考虑此关键词的单词边界？ 默认为 false。

expires_in
: 整数。 从现在开始计算，过滤规则应过期的秒数。 对于不过期的过滤规则为 `null`。

#### 响应
##### 200: OK

将返回新创建的过滤规则。

```json
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": "2019-11-26T09:08:06.254Z",
  "irreversible": true
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

若未正确提供短语：

```json
{
  "error": "Validation failed: Phrase can't be blank"
}
```

若未正确提供上下文:

```json
{
  "error": "Validation failed: Context can't be blank, Context None or invalid context supplied"
}
```

---

### 更新过滤规则 {{%deprecated%}} {#update-v1}

```http
PUT /api/v1/filters/:id HTTP/1.1
```

就地替换过滤规则的参数。

**返回：**[V1::Filter]({{< relref "entities/V1_Filter" >}})\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
2.4.3 - 添加\
3.1.0 - 向账户视图中的过滤规则添加了 `account` 上下文\
4.0.0 - 弃用。出于兼容性目的，现在返回一个 V1::Filter，它代表一个 FilterKeyword (`keyword` 显示在 `phrase` 属性中)。 若你尝试更改具有多个关键词的过滤规则的 `expires_in`、`irreversible` 或 `context`，此方法将返回错误。 更改 `phrase` 和 `whole_word` 始终是安全的。

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 FilterKeyword 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

##### 表单数据参数

phrase
: {{<required>}} 字符串。要过滤的正文文本。

context[]
: {{<required>}} 字符串数组。 指定 `home`、`notifications`、`public`、`thread` 或 `account` 中的至少一个。

irreversible
: 布尔值。实例是否应从主页和通知中不可逆地删除命中的实体？ 默认为 false。

whole_word
: 布尔值。过滤规则是否应考虑单词边界？ 默认为 false。

expires_in
: 整数。 从现在开始，过滤规则应过期的秒数。 否则，对于不过期的过滤规则为 `null`。

#### 响应
##### 200: OK

过滤规则已更新

```json
{
  "id": "8449",
  "phrase": "test",
  "context": [
    "home",
    "notifications",
    "public",
    "thread"
  ],
  "whole_word": false,
  "expires_at": null,
  "irreversible": true
}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

过滤规则不存在或不属于你

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

若未正确提供短语：

```json
{
  "error": "Validation failed: Phrase can't be blank"
}
```

若未正确提供上下文:

```json
{
  "error": "Validation failed: Context can't be blank, Context None or invalid context supplied"
}
```

---

### 删除过滤规则 {{%deprecated%}} {#delete-v1}

```http
DELETE /api/v1/filters/:id HTTP/1.1
```

**返回：**空\
**OAuth:** 用户令牌 + `write:filters`\
**版本历史：**\
2.4.3 - 添加\
4.0.0 - 弃用。 此方法将仅从其上级过滤规则中删除 FilterKeyword。 要删除上级过滤规则，你必须使用 v2 过滤规则 API。

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 Filter 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>` 以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

过滤规则已成功删除，因此将返回一个空对象。

```json
{}
```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

过滤规则不存在或不属于你

```json
{
  "error": "Record not found"
}
```

---

## 另请参考

{{< page-relref ref="api/guidelines#filters" caption="过滤规则实现指南" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/filters_controller.rb" caption="app/controllers/api/v2/filters_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/filters/keywords_controller.rb" caption="app/controllers/api/v1/filters/keywords_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/filters/statuses_controller.rb" caption="app/controllers/api/v1/filters/statuses_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/filters_controller.rb" caption="app/controllers/api/v1/filters_controller.rb" >}}

{{< translation-status-zh-cn raw_title="filters API methods" raw_link="/methods/filters/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
