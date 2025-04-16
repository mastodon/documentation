---
title: media API 方法
description: >-
  将媒体附加到嘟文。有关大小和格式限制的更多信息，请参考“使用 Mastodon > 发布嘟文 > 附件”。
menu:
  docs:
    weight: 10
    name: media
    parent: methods-statuses
    identifier: methods-media
aliases: [
  "/methods/media",
  "/api/methods/media",
  "/methods/statuses/media",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 上传媒体为附件 (异步) {#v2}

```http
POST /api/v2/media HTTP/1.1
```

创建一个媒体附件，用于新发布嘟文。对于大型上传，完整大小的媒体附件将在后台异步处理。

**返回：** [MediaAttachment]({{< relref "entities/MediaAttachment" >}})，但没有 URL\
**OAuth：** 用户令牌 + `write:media`\
**版本历史：**\
3.1.3 - 添加\
3.2.0 - 添加 `thumbnail` 参数\
4.0.0 - 较小的媒体格式（图像）将同步处理并返回 200 而不是 202。较大的媒体格式（视频、gifv、音频）将继续异步处理并返回 202。

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

file
: {{<required>}} 对象。要附加的文件，使用 multipart form data 编码。该文件必须携带 MIME 类型。

thumbnail
: 对象。要附加的媒体的自定义缩略图，使用 multipart form data 编码。

description
: 字符串。媒体的纯文本描述，用于辅助功能。

focus
: 字符串。两个浮点数 (x,y)，以逗号分隔，段从 -1.0 到 1.0。有关更多信息，请参见[用于裁剪媒体缩略图的焦点]({{< relref "api/guidelines#focal-points" >}})。

#### 响应

##### 200: OK

MediaAttachment 创建成功，并且完整大小的文件已同步处理。

```json
{
  "id": "22348641",
  "type": "image",
  "url": "https://files.mastodon.social/media_attachments/files/022/348/641/original/e96382f26c72a29c.jpeg",
  "preview_url": "https://files.mastodon.social/media_attachments/files/022/348/641/small/e96382f26c72a29c.jpeg",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/4Zj6ewxzzzDi0g8JnZQ",
  "meta": {
    "focus": {
      "x": -0.42,
      "y": 0.69
    },
    "original": {
      "width": 640,
      "height": 480,
      "size": "640x480",
      "aspect": 1.3333333333333333
    },
    "small": {
      "width": 461,
      "height": 346,
      "size": "461x346",
      "aspect": 1.3323699421965318
    }
  },
  "description": "test uploaded via api",
  "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
}
```

##### 202: Accepted

MediaAttachment 创建成功，但完整大小的文件仍在处理中。请注意，MediaAttachment 的 `url` 仍然为 null，因为媒体仍在后台处理中。但是，`preview_url` 应该可用。使用 [`GET /api/v1/media/:id`](#get) 检查媒体附件的嘟文。

```json
{
  "id": "22348641",
  "type": "image",
  "url": null,
  "preview_url": "https://files.mastodon.social/media_attachments/files/022/348/641/small/cebc6d51be03e509.jpeg",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/4Zj6ewxzzzDi0g8JnZQ",
  "meta": {
    "focus": {
      "x": -0.69,
      "y": 0.42
    },
    "original": {
      "width": 640,
      "height": 480,
      "size": "640x480",
      "aspect": 1.3333333333333333
    },
    "small": {
      "width": 461,
      "height": 346,
      "size": "461x346",
      "aspect": 1.3323699421965318
    }
  },
  "description": "test uploaded via api",
  "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
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

不支持的文件或文件类型无效。

```json
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

##### 500: Server error

无法为附件生成缩略图

```json
{
  "error": "Error processing thumbnail for uploaded media"
}
```

---

## 获取媒体附件 {#get}

```http
GET /api/v1/media/:id HTTP/1.1
```

在媒体附件被接受和处理，但尚未被附加到嘟文中时获取媒体附件。使用此方法检查完整大小的媒体是否已完成处理。

**返回：** [MediaAttachment]({{< relref "entities/MediaAttachment" >}})\
**OAuth：** 用户令牌 + `write:media`\
**版本历史：**\
3.1.3 - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 MediaAttachment 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

#### 响应
##### 200: OK

媒体文件已处理，并且已处理媒体的 `url` 可用。

```json
{
  "id": "22348641",
  "type": "image",
  "url": "https://files.mastodon.social/media_attachments/files/022/348/641/original/e96382f26c72a29c.jpeg",
  "preview_url": "https://files.mastodon.social/media_attachments/files/022/348/641/small/e96382f26c72a29c.jpeg",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/4Zj6ewxzzzDi0g8JnZQ",
  "meta": {
    "focus": {
      "x": -0.42,
      "y": 0.69
    },
    "original": {
      "width": 640,
      "height": 480,
      "size": "640x480",
      "aspect": 1.3333333333333333
    },
    "small": {
      "width": 461,
      "height": 346,
      "size": "461x346",
      "aspect": 1.3323699421965318
    }
  },
  "description": "test uploaded via api, but updated",
  "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
}
```

##### 206: Partial content

媒体附件仍在处理中

```json

```

##### 401: Unauthorized

无效或缺失的 Authorization 标头。

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

该 MediaAttachment 不属于你或不存在

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

处理媒体附件时出错


```json
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

---

## 删除媒体附件 {#delete}

```http
DELETE /api/v1/media/:id
```

删除当前未附加到嘟文的媒体附件。

**返回：** 空\
**OAuth：** 用户令牌 + `write:media`\
**版本历史：**\
- 4.4.0 (`mastodon` [API 版本]({{< relref "entities/Instance#api-versions" >}}) 4) - 添加

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 MediaAttachment 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

## 更新媒体附件 {#update}

```http
PUT /api/v1/media/:id HTTP/1.1
```

更新 MediaAttachment 附加到嘟文并发布之前更新其参数。

**返回：** [MediaAttachment]({{< relref "entities/MediaAttachment" >}})\
**OAuth：** 用户令牌 + `write:media`\
**版本历史：**\
0.0.0 - 添加\
2.3.0 - 添加 `focus` 参数\
3.2.0 - 添加 `thumbnail`

#### 请求

##### 路径参数

:id
: {{<required>}} 字符串。数据库中 MediaAttachment 的 ID。

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

thumbnail
: 对象。要附加的媒体的自定义缩略图，使用 multipart form data 编码。

description
: 字符串。媒体的纯文本描述，用于辅助功能。

focus
: 字符串。两个浮点数 (x,y)，逗号分隔，段从 -1.0 到 1.0。有关更多信息，请参见[用于裁剪媒体缩略图的焦点]({{< relref "api/guidelines#focal-points" >}})。

#### 响应

##### 200: OK

带有已更新 `description` 的附件

```json
{
  "id": "22348641",
  "type": "image",
  "url": "https://files.mastodon.social/media_attachments/files/022/348/641/original/e96382f26c72a29c.jpeg",
  "preview_url": "https://files.mastodon.social/media_attachments/files/022/348/641/small/e96382f26c72a29c.jpeg",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/4Zj6ewxzzzDi0g8JnZQ",
  "meta": {
    "focus": {
      "x": -0.42,
      "y": 0.69
    },
    "original": {
      "width": 640,
      "height": 480,
      "size": "640x480",
      "aspect": 1.3333333333333333
    },
    "small": {
      "width": 461,
      "height": 346,
      "size": "461x346",
      "aspect": 1.3323699421965318
    }
  },
  "description": "test uploaded via api, but updated",
  "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
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

该媒体附件不属于你或不存在

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```json
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

---

## 上传媒体附件 (v1) {{%deprecated%}} {#v1}

```http
POST /api/v1/media HTTP/1.1
```

创建一个用于新嘟文的媒体附件。此方法将在完整大小的媒体完成处理后返回。

**返回：** [MediaAttachment]({{< relref "entities/MediaAttachment" >}})\
**OAuth：** 用户令牌 + `write:media`\
**版本历史：**\
0.0.0 - 添加\
2.3.0 - 添加 `focus` 参数\
3.1.3 - 弃用，推荐使用 [POST /api/v2/media](#v2)，该方法在所有方面都与 v1 相同，只是在正常情况下返回 HTTP 202，并且返回的 JSON 对象具有一个 null 的 url。这是因为虽然缩略图是同步准备的，但媒体附件的完整版本将在后台处理。\
3.2.0 - 添加 `thumbnail` 参数

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

file
: {{<required>}} 对象。要附加的文件，使用 multipart form data 编码。该文件必须具有 MIME 类型。

thumbnail
: 对象。要附加的媒体的自定义缩略图，使用 multipart form data 编码。

description
: 字符串。媒体的纯文本描述，用于辅助功能。

focus
: 字符串。两个浮点数 (x,y)，逗号分隔，段从 -1.0 到 1.0。有关更多信息，请参见[用于裁剪媒体缩略图的焦点]({{< relref "api/guidelines#focal-points" >}})。

#### 响应
##### 200: OK

附件创建成功。请注意，即使由于处理失败而无法正确理解文件，也会创建 MediaAttachment。

正确文件的示例响应：

```json
{
  "id": "22348641",
  "type": "image",
  "url": "https://files.mastodon.social/media_attachments/files/022/348/641/original/cebc6d51be03e509.jpeg",
  "preview_url": "https://files.mastodon.social/media_attachments/files/022/348/641/small/cebc6d51be03e509.jpeg",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/4Zj6ewxzzzDi0g8JnZQ",
  "meta": {
    "focus": {
      "x": -0.69,
      "y": 0.42
    },
    "original": {
      "width": 640,
      "height": 480,
      "size": "640x480",
      "aspect": 1.3333333333333333
    },
    "small": {
      "width": 461,
      "height": 346,
      "size": "461x346",
      "aspect": 1.3323699421965318
    }
  },
  "description": "test uploaded via api",
  "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
}
```

不正确文件的示例响应，这会导致“missing” url：

```json
{
  "id": "22348456",
  "type": "unknown",
  "url": "https://mastodon.social/files/original/missing.png",
  "preview_url": "https://mastodon.social/files/small/missing.png",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/Ao2nvQoQNHROpKgEyoA",
  "meta": {
    "focus": {
      "x": -0.69,
      "y": 0.42
    }
  },
  "description": "test uploaded via api",
  "blurhash": null
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

不支持的文件或文件类型无效。

```json
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

---

## 另请参考

{{< page-relref ref="methods/instance" caption="GET /api/v2/instance（用于获取配置限制）">}}

{{< page-relref ref="entities/instance#media_attachments" caption="Instance#configuration[media_attachments]">}}

{{< page-relref ref="api/guidelines#focal-points" caption="裁剪媒体缩略图的焦点" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/media_controller.rb" caption="app/controllers/api/v1/media_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/media_controller.rb" caption="app/controllers/api/v2/media_controller.rb" >}}

{{< translation-status-zh-cn raw_title="media API methods" raw_link="/methods/media/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
