---
title: Configuration
description: Instance configuration options like limits and supported mime types.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "configuration": {
    "statuses": {
      "max_characters": 500,
      "max_media_attachments": 4,
      "characters_reserved_per_url": 23
    },
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
    "polls": {
      "max_options": 4,
      "max_characters_per_option": 50,
      "min_expiration": 300,
      "max_expiration": 2629746
    }
  },
}
```

### `statuses` {#statuses}

**Description:** Instance configuration options for statuses like character counts.\
**Type:** [Configuration]({{< relref "configuration-statuses.md" >}})\
**Version history:** Added in 3.5.0

### `media_attachments` {#media_attachments}

**Description:** Instance configuration options for media files like size limits and supported mime types.\
**Type:** [Configuration]({{< relref "configuration-media-attachments.md" >}})\
**Version history:** Added in 3.5.0

### `polls` {#polls}

**Description:** Instance configuration options for polls like option count and permitted durations.\
**Type:** [Configuration]({{< relref "configuration-polls.md" >}})\
**Version history:** Added in 3.5.0

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance\_serializer.rb" >}}





