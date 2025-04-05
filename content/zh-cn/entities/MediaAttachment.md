---
title: MediaAttachment
description: 表示可以被添加到嘟文的的文件或媒体附件。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/attachment",
  "/entities/Attachment",
  "/entities/mediaattachment",
  "/entities/MediaAttachment",
  "/api/entities/attachment",
  "/api/entities/Attachment",
  "/api/entities/mediaattachment",
  "/api/entities/MediaAttachment",
]
---

## 示例

### 图像

```json
{
  "id": "22345792",
  "type": "image",
  "url": "https://files.mastodon.social/media_attachments/files/022/345/792/original/57859aede991da25.jpeg",
  "preview_url": "https://files.mastodon.social/media_attachments/files/022/345/792/small/57859aede991da25.jpeg",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/2N4uvkuUtPVrkZGysms",
  "meta": {
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
    },
    "focus": {
      "x": -0.27,
      "y": 0.51
    }
  },
  "description": "测试媒体描述文本",
  "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
}
```

### 视频

```json
{
  "id": "22546306",
  "type": "video",
  "url": "https://files.mastodon.social/media_attachments/files/022/546/306/original/dab9a597f68b9745.mp4",
  "preview_url": "https://files.mastodon.social/media_attachments/files/022/546/306/small/dab9a597f68b9745.png",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/wWd1HJIBmH1MZGDfg50",
  "meta": {
    "length": "0:01:28.65",
    "duration": 88.65,
    "fps": 24,
    "size": "1280x720",
    "width": 1280,
    "height": 720,
    "aspect": 1.7777777777777777,
    "audio_encode": "aac (LC) (mp4a / 0x6134706D)",
    "audio_bitrate": "44100 Hz",
    "audio_channels": "stereo",
    "original": {
      "width": 1280,
      "height": 720,
      "frame_rate": "6159375/249269",
      "duration": 88.654,
      "bitrate": 862056
    },
    "small": {
      "width": 400,
      "height": 225,
      "size": "400x225",
      "aspect": 1.7777777777777777
    }
  },
  "description": null,
  "blurhash": "U58E0g8_0M.94T?bIr00?bD%NGoM?bD%oLt7"
}
```

### GIFV

```json
{
  "id": "21130559",
  "type": "gifv",
  "url": "https://files.mastodon.social/media_attachments/files/021/130/559/original/bc84838f77991326.mp4",
  "preview_url": "https://files.mastodon.social/media_attachments/files/021/130/559/small/bc84838f77991326.png",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/2ICiasGyjezmi7cQYM8",
  "meta": {
    "length": "0:00:01.11",
    "duration": 1.11,
    "fps": 33,
    "size": "600x332",
    "width": 600,
    "height": 332,
    "aspect": 1.8072289156626506,
    "original": {
      "width": 600,
      "height": 332,
      "frame_rate": "100/3",
      "duration": 1.11,
      "bitrate": 1627639
    },
    "small": {
      "width": 400,
      "height": 221,
      "size": "400x221",
      "aspect": 1.8099547511312217
    }
  },
  "description": null,
  "blurhash": "URHT%Jm,2a1d%MRO%LozkrNH$*n*oMn$Rjt7"
}
```

### 音频

```json
{
  "id": "21165404",
  "type": "audio",
  "url": "https://files.mastodon.social/media_attachments/files/021/165/404/original/a31a4a46cd713cd2.mp3",
  "preview_url": "https://files.mastodon.social/media_attachments/files/021/165/404/small/a31a4a46cd713cd2.mp3",
  "remote_url": null,
  "text_url": "https://mastodon.social/media/5O4uILClVqBWx0NNgvo",
  "meta": {
    "length": "0:06:42.86",
    "duration": 402.86,
    "audio_encode": "mp3",
    "audio_bitrate": "44100 Hz",
    "audio_channels": "stereo",
    "original": {
      "duration": 402.860408,
      "bitrate": 166290
    }
  },
  "description": null,
  "blurhash": null
}
```

## 属性

### `id` {#id}

**描述:** 附件在数据库中的 ID。\
**类型:** 字符串 (从整数转换而来，但不保证为数字)\
**版本历史:**\
0.6.0 - 添加

### `type` {#type}

**描述:** 附件的类型。\
**类型:** 字符串 (可枚举，oneOf)\
`unknown` = 不支持或无法识别的文件类型\
`image` = 静态图像\
`gifv` = 循环播放、无声动画\
`video` = 视频剪辑\
`audio` = 音轨\
**版本历史:**\
0.6.0 - 添加\
2.9.1 - 添加 `audio`

### `url` {#url}

**描述:** 原始完整尺寸附件的位置。\
**类型:** 字符串 (URL)\
**版本历史:**\
0.6.0 - 添加

### `preview_url` {#preview_url}

**描述:** 附件的缩略图的位置。\
**类型:** {{<nullable>}} 字符串 (URL)\
**版本历史:**\
0.6.0 - 添加

### `remote_url` {#remote_url}

**描述:** 外站的完整尺寸原始附件的位置。\
**类型:** {{<nullable>}} 字符串 (URL)，如果附件是本站的，则为 null\
**版本历史:**\
0.6.0 - 添加

### `meta` {#meta}

**描述:** Paperclip 返回的元数据。\
**类型:** Hash\
**版本历史:**\
1.5.0 - 添加\
2.3.0 - 添加 `meta.focus`

可以包含 `small` 和 `original` 子树，及各种其他顶层属性。

更重要的是，从 2.3.0 开始，图像上可能还有另一个顶层 `focus` Hash 对象，其坐标可用于智能缩略图裁剪——请参阅[裁剪媒体缩略图的焦点]({{< relref "api/guidelines#focal-points" >}}) 获取更多信息。

### `description` {#description}

**描述:** 用于描述媒体附件内容的替代文本，适用于视障人士或媒体附件未加载时的情况。\
**类型:** {{<nullable>}} 字符串，如果未为媒体附件提供替代文本，则为 null\
**版本历史:**\
2.0.0 - 添加

### `blurhash` {#blurhash}

**描述:** 由 [BlurHash 算法](https://github.com/woltapp/blurhash) 计算的哈希值，用于在媒体尚未下载时生成彩色预览缩略图。\
**类型:** {{<nullable>}} 字符串 (Blurhash)\
**版本历史:**\
2.8.1 - 添加

### `text_url` {{%removed%}} {#text_url}

**描述:** 附件的短 URL。\
**类型:** 字符串 (URL)\
**版本历史:**\
0.6.0 - 添加\
3.5.0 - 移除

## 参见

{{< page-relref ref="entities/Status#media_attachments" caption="Status (`media_attachments` attribute)" >}}

{{< page-relref ref="methods/media" caption="media API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/media_attachment_serializer.rb" caption="app/serializers/rest/media_attachment_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="MediaAttachment" raw_link="/entities/MediaAttachment/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
