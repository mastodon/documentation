---
title: media API methods
summary: >-
  Attach media to authored statuses. See Using Mastodon > Posting toots >
  Attachments for more information about size and format limits.
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

## Upload media as an attachment (async) {#v2}

```http
POST /api/v2/media HTTP/1.1
```

Creates a media attachment to be used with a new status. The full sized media will be processed asynchronously in the background for large uploads.

**Returns:** [MediaAttachment]({{< relref "entities/MediaAttachment" >}}), but without a URL\
**OAuth:** User token + `write:media`\
**Version history:**\
3.1.3 - added\
3.2.0 - add `thumbnail` parameter\
4.0.0 - Smaller media formats (image) will be processed synchronously and return 200 instead of 202. Larger media formats (video, gifv, audio) will continue to be processed asynchronously and return 202.

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

file
: {{<required>}} Object. The file to be attached, encoded using multipart form data. The file must have a MIME type.

thumbnail
: Object. The custom thumbnail of the media to be attached, encoded using multipart form data.

description
: String. A plain-text description of the media, for accessibility purposes.

focus
: String. Two floating points (x,y), comma-delimited, ranging from -1.0 to 1.0. See [Focal points for cropping media thumbnails]({{< relref "api/guidelines#focal-points" >}}) for more information.

#### Response

##### 200: OK

MediaAttachment was created successfully, and the full-size file was processed synchronously.

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

MediaAttachment was created successfully, but the full-size file is still processing. Note that the MediaAttachment's `url` will still be null, as the media is still being processed in the background. However, the `preview_url` should be available. Use [`GET /api/v1/media/:id`](#get) to check the status of the media attachment.

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

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

File or file type is unsupported or invalid

```json
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

##### 500: Server error

Could not generate a thumbnail for the attachment

```json
{
  "error": "Error processing thumbnail for uploaded media"
}
```

---

## Get media attachment {#get}

```http
GET /api/v1/media/:id HTTP/1.1
```

Get a media attachment, before it is attached to a status and posted, but after it is accepted for processing. Use this method to check that the full-sized media has finished processing.

**Returns:** [MediaAttachment]({{< relref "entities/MediaAttachment" >}})\
**OAuth:** User token + `write:media`\
**Version history:**\
3.1.3 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the MediaAttachment in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The media file was processed, and a `url` to the processed media is available.

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

The media attachment is still being processed

```json

```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

MediaAttachment is not owned by you or does not exist

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

There was an error processing the media attachment


```json
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

---

## Update media attachment {#update}

```http
PUT /api/v1/media/:id HTTP/1.1
```

Update a MediaAttachment's parameters, before it is attached to a status and posted.

**Returns:** [MediaAttachment]({{< relref "entities/MediaAttachment" >}})\
**OAuth:** User token + `write:media`\
**Version history:**\
0.0.0 - added\
2.3.0 - add `focus` parameter\
3.2.0 - added `thumbnail`

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the MediaAttachment in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

thumbnail
: Object. The custom thumbnail of the media to be attached, encoded using multipart form data.

description
: String. A plain-text description of the media, for accessibility purposes.

focus
: String. Two floating points (x,y), comma-delimited, ranging from -1.0 to 1.0. See [Focal points for cropping media thumbnails]({{< relref "api/guidelines#focal-points" >}}) for more information.

#### Response

##### 200: OK

Attachment with an updated `description`

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

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Attachment is not owned by you or does not exist

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

## (DEPRECATED) Upload media as an attachment {#v1}

```http
POST /api/v1/media HTTP/1.1
```

Creates an attachment to be used with a new status. This method will return after the full sized media is done processing.

**Returns:** [MediaAttachment]({{< relref "entities/MediaAttachment" >}})\
**OAuth:** User token + `write:media`\
**Version history:**\
0.0.0 - added\
2.3.0 - add `focus` parameter\
3.1.3 - deprecated in favor of [POST /api/v2/media](#v2), which is equal to v1 in all aspects, except it returns HTTP 202, and the returned JSON object has a url of null. This is because while the thumbnail is prepared synchronously, the full version of the media attachment will be processed in the background.\
3.2.0 - add `thumbnail` parameter

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

file
: {{<required>}} Object. The file to be attached, encoded using multipart form data. The file must have a MIME type.

thumbnail
: Object. The custom thumbnail of the media to be attached, encoded using multipart form data.

description
: String. A plain-text description of the media, for accessibility purposes.

focus
: String. Two floating points (x,y), comma-delimited, ranging from -1.0 to 1.0. See [Focal points for cropping media thumbnails]({{< relref "api/guidelines#focal-points" >}}) for more information.

#### Response
##### 200: OK

Attachment created successfully. Note that the MediaAttachment will be created even if the file is not understood correctly due to failed processing.

Sample response for a correct file:

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

Sample response for an incorrect file, which results in a "missing" url:

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

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

File or file type is unsupported or invalid

```json
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

---

## See also

{{< page-relref ref="methods/instance" caption="GET /api/v2/instance (for obtaining configuration limits)">}}

{{< page-relref ref="entities/instance#media_attachments" caption="Instance#configuration[media_attachments]">}}

{{< page-relref ref="api/guidelines#focal-points" caption="Focal points for cropping media thumbnails" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/media_controller.rb" caption="app/controllers/api/v1/media_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/media_controller.rb" caption="app/controllers/api/v2/media_controller.rb" >}}