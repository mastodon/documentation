---
title: MediaAttachment
description: Represents a file or media attachment that can be added to a status.
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

## Example

### Image

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
  "description": "test media description",
  "blurhash": "UFBWY:8_0Jxv4mx]t8t64.%M-:IUWGWAt6M}"
}
```

### Video

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

### Audio

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

## Attributes

### `id` {#id}

**Description:** The ID of the attachment in the database.\
**Type:** String (cast from an integer but not guaranteed to be a number)\
**Version history:**\
0.6.0 - added

### `type` {#type}

**Description:** The type of the attachment.\
**Type:** String (Enumerable, oneOf)\
`unknown` = unsupported or unrecognized file type\
`image` = Static image\
`gifv` = Looping, soundless animation\
`video` = Video clip\
`audio` = Audio track\
**Version history:**\
0.6.0 - added\
2.9.1 - added `audio`

### `url` {#url}

**Description:** The location of the original full-size attachment.\
**Type:** String (URL)\
**Version history:**\
0.6.0 - added

### `preview_url` {#preview_url}

**Description:** The location of a scaled-down preview of the attachment.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
0.6.0 - added

### `remote_url` {#remote_url}

**Description:** The location of the full-size original attachment on the remote website.\
**Type:** {{<nullable>}} String (URL), or null if the attachment is local\
**Version history:**\
0.6.0 - added

### `meta` {#meta}

**Description:** Metadata returned by Paperclip.\
**Type:** Hash\
**Version history:**\
1.5.0 - added\
2.3.0 - added `meta.focus`

May contain subtrees `small` and `original`, as well as various other top-level properties.

More importantly, there may be another topl-level `focus` Hash object on images as of 2.3.0, with coordinates can be used for smart thumbnail cropping -- see [Focal points for cropped media thumbnails]({{< relref "api/guidelines#focal-points" >}}) for more.

### `description` {#description}

**Description:** Alternate text that describes what is in the media attachment, to be used for the visually impaired or when media attachments do not load.\
**Type:** {{<nullable>}} String, or null if alternate text was not provided for the media attachment\
**Version history:**\
2.0.0 - added

### `blurhash` {#blurhash}

**Description:** A hash computed by [the BlurHash algorithm](https://github.com/woltapp/blurhash), for generating colorful preview thumbnails when media has not been downloaded yet.\
**Type:** {{<nullable>}} String (Blurhash)\
**Version history:**\
2.8.1 - added

## Deprecated attributes

### `text_url` {#text_url}

**Description:** A shorter URL for the attachment.\
**Type:** String (URL)\
**Version history:**\
0.6.0 - added\
3.5.0 - removed

## See also

{{< page-relref ref="entities/Status#media_attachments" caption="Status (`media_attachments` attribute)" >}}

{{< page-relref ref="methods/media" caption="media API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/media_attachment_serializer.rb" caption="app/serializers/rest/media_attachment_serializer.rb" >}}