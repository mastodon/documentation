---
title: Media attachments
menu:
  docs:
    parent: rest-api
    weight: 10
---

## POST /api/v1/media

Upload a media attachment that can be used with a new status.

Returns [Attachment]({{< relref "entities.md#attachment" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:media" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `file` | Media file encoded using `multipart/form-data` | Required |
| `description` | A plain-text description of the media for accessibility (max 420 chars) | Optional |
| `focus` | Two floating points, comma-delimited. See [focal points](#focal-points) | Optional |

## PUT /api/v1/media/:id

Update a media attachment. Can only be done before the media is attached to a status.

Returns [Attachment]({{< relref "entities.md#attachment" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:media" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `description` | A plain-text description of the media for accessibility (max 420 chars) | Optional |
| `focus` | Two floating points, comma-delimited. See [focal points](#focal-points) | Optional |

## Focal points

Server-side preview images are never cropped, to support a variety of apps and user interfaces. Therefore, the cropping must be done by those apps. To crop intelligently, focal points can be used to ensure a certain section of the image is always within the cropped viewport. [See this for how to let users select focal point coordinates](https://github.com/jonom/jquery-focuspoint#1-calculate-your-images-focus-point).
