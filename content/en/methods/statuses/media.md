---
title: media
description: >-
  Attach media to authored statuses. See Using Mastodon > Posting toots >
  Attachments for more information about size and format limits.
menu:
  docs:
    weight: 10
    parent: methods-statuses
---

{{< api-method method="post" host="https://mastodon.example" path="/api/v1/media" title="Upload media as attachment" >}}
{{< api-method-description >}}

Creates an attachment to be used with a new status.

**Returns:** Attachment\
**OAuth:** User token + `write:media`\
**Version history:**\
0.0.0 - added\
2.3.0 - add `focus` parameter\
3.1.3 - deprecated in favor of `POST /api/v2/media`, which is equal to v1 in all aspects, except it returns HTTP 202, and the returned JSON object has a url of null, because while the thumbnail is prepared synchronously, the full version of the media attachment will be processed in the background\
3.2.0 - add `thumbnail` parameter

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="file" type="object" required=true >}}
The file to be attached, using multipart form data.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="thumbnail" type="object" required=false >}}
The custom thumbnail of the media to be attached, using multipart form data.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="description" type="string" required=false >}}
A plain-text description of the media, for accessibility purposes.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="focus" type="string" required=false >}}
Two floating points \(x,y\), comma-delimited, ranging from -1.0 to 1.0
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Attachment created successfully. Note that the Attachment will be created even if the file is not understood correctly.
{{< endapi-method-response-example-description >}}


{{< tabs >}}
{{< tab title="file correct" >}}
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
{{< endtab >}}

{{< tab title="file not correct" >}}
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
{{< endtab >}}
{{< endtabs >}}
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

File or file type is unsupported or invalid
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


{{< api-method method="get" host="https://mastodon.example" path="/api/v1/media/:id" title="Update attachment" >}}
{{< api-method-description >}}

Get an Attachment, before it is attached to a status and posted, but after it is accepted for processing.

**Returns:** Attachment\
**OAuth:** User token + `write:media`\
**Version history:**\
3.1.3 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the Attachment entity to be updated
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="file" type="object" required=false >}}
The file to be attached, using multipart form data.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="description" type="string" required=false >}}
A plain-text description of the media, for accessibility purposes.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="focus" type="string" required=false >}}
Two floating points \(x,y\), comma-delimited ranging from -1.0 to 1.0
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
Attachment has been processed
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=206 >}}
{{< api-method-response-example-description >}}

Attachment is not yet ready
{{< endapi-method-response-example-description >}}


```javascript

```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Attachment does not exist, is deleted, or was not created by you
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

Error processing the media attachment
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


{{< api-method method="put" host="https://mastodon.example" path="/api/v1/media/:id" title="Update attachment" >}}
{{< api-method-description >}}

Update an Attachment, before it is attached to a status and posted.

**Returns:** Attachment\
**OAuth:** User token + `write:media`\
**Version history:**\
0.0.0 - added\
3.2.0 - added `thumbnail`


{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the Attachment entity to be updated
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="file" type="object" required=false >}}
The file to be attached, using multipart form data.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="thumbnail" type="object" required=false >}}
The custom thumbnail of the media to be attached, using multipart form data.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="description" type="string" required=false >}}
A plain-text description of the media, for accessibility purposes.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="focus" type="string" required=false >}}
Two floating points \(x,y\), comma-delimited ranging from -1.0 to 1.0
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


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
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

Attachment does not exist, is deleted, or was not created by you
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

File or file type is unsupported or invalid
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Validation failed: File content type is invalid, File is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


## Focal points

Server-side preview images are never cropped, to support a variety of apps and user interfaces. Therefore, the cropping must be done by those apps. To crop intelligently, focal points can be used to ensure a certain section of the image is always within the cropped viewport. [See this guide on how focal points are defined.](https://github.com/jonom/jquery-focuspoint#1-calculate-your-images-focus-point) In summary, floating points range from -1.0 to 1.0, left-to-right or bottom-to-top. \(0,0\) is the center of the image. \(0.5, 0.5\) would be in the center of the upper-right quadrant. \(-0.5, -0.5\) would be in the center of the lower-left quadrant. For reference, thumbnails in the Mastodon frontend are most commonly 16:9.

{{< figure src="/assets/focal-points.jpg" caption="A demonstration of various focal points and their coordinates." >}}

