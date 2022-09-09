---
title: media
description: >-
  Attach media to authored statuses. See Using Mastodon > Posting toots >
  Attachments for more information about size and format limits.
menu:
  docs:
    weight: 10
    parent: methods-statuses
aliases: [/methods/statuses/media/]
---

## Upload media as an attachment (async) {#v2}

```http
POST https://mastodon.example/api/v2/media HTTP/1.1
```

Creates an attachment to be used with a new status. The full sized attachment will be processed asynchronously in the background.

**Returns:** [Attachment]({{< relref "entities/attachment" >}}), but without a URL\
**OAuth:** User token + `write:media`\
**Version history:**\
3.1.3 - added\
3.2.0 - add `thumbnail` parameter

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

file
: {{<required>}} Object. The file to be attached, encoded using multipart form data.

thumbnail
: Object. The custom thumbnail of the media to be attached, encoded using multipart form data.

description
: String. A plain-text description of the media, for accessibility purposes.

focus
: String. Two floating points \(x,y\), comma-delimited, ranging from -1.0 to 1.0. See [Focal points](#focal-points) below for more information.

#### Response
##### 202: Accepted

Attachment created successfully. Note that the Attachment's `url` will still be null, as the attachment is still being processed in the background.

```javascript
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

```javascript
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

File or file type is unsupported or invalid

```javascript
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

##### 500: Server error

Could not generate a thumbnail for the attachment

```javascript
{
  "error": "Error processing thumbnail for uploaded media"
}
```

---

## Get attachment {#get}

```http
GET https://mastodon.example/api/v1/media/:id HTTP/1.1
```

Get an Attachment, before it is attached to a status and posted, but after it is accepted for processing.

**Returns:** [Attachment]({{< relref "entities/attachment" >}})\
**OAuth:** User token + `write:media`\
**Version history:**\
3.1.3 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Attachment in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

The Attachment was processed

```javascript
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

The Attachment is still being processed

```javascript

```

##### 401: Unauthorized

Invalid or missing Authorization header.

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Attachment is not owned by you or does not exist

```javascript
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

There was an error processing the media attachment


```javascript
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

---

## Update attachment {#update}

```http
PUT https://mastodon.example/api/v1/media/:id HTTP/1.1
```

Update an Attachment's parameters, before it is attached to a status and posted.

**Returns:** Attachment\
**OAuth:** User token + `write:media`\
**Version history:**\
0.0.0 - added\
3.2.0 - added `thumbnail`

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the SOMETHING in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

thumbnail
: Object. The custom thumbnail of the media to be attached, encoded using multipart form data.

description
: String. A plain-text description of the media, for accessibility purposes.

focus
: String. Two floating points \(x,y\), comma-delimited, ranging from -1.0 to 1.0. See [Focal points](#focal-points) below for more information.

#### Response

##### 200: OK

Attachment with an updated `description`

```javascript
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

```javascript
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Attachment is not owned by you or does not exist

```javascript
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

```javascript
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

---

## (DEPRECATED) Upload media as an attachment {#v1}

```http
POST https://mastodon.example/api/v1/media HTTP/1.1
```

Creates an attachment to be used with a new status. This method will return after the full sized attachment is done processing.

**Returns:** [Attachment]({{< relref "entities/attachment" >}})\
**OAuth:** User token + `write:media`\
**Version history:**\
0.0.0 - added\
2.3.0 - add `focus` parameter\
3.1.3 - deprecated in favor of `POST /api/v2/media`, which is equal to v1 in all aspects, except it returns HTTP 202, and the returned JSON object has a url of null. This is because while the thumbnail is prepared synchronously, the full version of the media attachment will be processed in the background.\
3.2.0 - add `thumbnail` parameter

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

file
: {{<required>}} Object. The file to be attached, encoded using multipart form data.

thumbnail
: Object. The custom thumbnail of the media to be attached, encoded using multipart form data.

description
: String. A plain-text description of the media, for accessibility purposes.

focus
: String. Two floating points \(x,y\), comma-delimited, ranging from -1.0 to 1.0. See [Focal points](#focal-points) below for more information.

#### Response
##### 200: OK

Attachment created successfully. Note that the Attachment will be created even if the file is not understood correctly due to failed processing.

Sample response for a correct file:

```javascript
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

```javascript
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

```javascript
{
  "error": "The access token is invalid"
}
```

##### 422: Unprocessable entity

File or file type is unsupported or invalid

```javascript
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/media_controller.rb" caption="app/controllers/api/v1/media_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v2/media_controller.rb" caption="app/controllers/api/v2/media_controller.rb" >}}

### Focal points

Server-side preview images are never cropped, to support a variety of apps and user interfaces. Therefore, the cropping must be done by those apps. To crop intelligently, focal points can be used to ensure a certain section of the image is always within the cropped viewport. [See this guide on how focal points are defined.](https://github.com/jonom/jquery-focuspoint#1-calculate-your-images-focus-point) In summary, floating points range from -1.0 to 1.0, left-to-right or bottom-to-top. \(0,0\) is the center of the image. \(0.5, 0.5\) would be in the center of the upper-right quadrant. \(-0.5, -0.5\) would be in the center of the lower-left quadrant. For reference, thumbnails in the Mastodon frontend are most commonly 16:9.

{{< figure src="/assets/focal-points.jpg" caption="A demonstration of various focal points and their coordinates." >}}

