---
title: Media Attachments Configuration
description: Instance configuration options for media uploads
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "media_attachments": {
    "supported_mime_types": [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "audio/wave",
    ],
    "image_size_limit": 10485760,
    "image_matrix_limit": 16777216,
    "video_size_limit": 41943040,
    "video_frame_rate_limit": 60,
    "video_matrix_limit": 2304000
  },
}
```

## Required attributes

### `supported_mime_types` {#supported_mime_types}

**Description:** Media file mimes that the instance supports.\
**Type:** Array of String\
**Version history:** Added in 3.5.0

### `image_size_limit` {#image_size_limit}

**Description:** Maximum permitted image upload file size.\
**Type:** Number\
**Version history:** Added in 3.5.0

### `image_matrix_limit` {#image_matrix_limit}

**Description:** Maximum permitted image upload pixel count (width multiplied by height).\
**Type:** Number\
**Version history:** Added in 3.5.0

### `video_size_limit` {#video_size_limit}

**Description:** Maximum permitted video upload file size.\
**Type:** Number\
**Version history:** Added in 3.5.0

### `video_frame_rate_limit` {#video_frame_rate_limit}

**Description:** Maximum permitted video upload frame rate.\
**Type:** Number\
**Version history:** Added in 3.5.0

### `video_matrix_limit` {#video_matrix_limit}

**Description:** Maximum permitted video upload pixel count (width multiplied by height).\
**Type:** Number\
**Version history:** Added in 3.5.0

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance\_serializer.rb" >}}





