---
title: ActivityPub compliance
description: What objects and properties of the ActivityPub spec Mastodon supports
menu:
  docs:
    parent: development
    weight: 5
---

## APIs

- Mastodon supports the server-to-server part of the [ActivityPub spec](https://www.w3.org/TR/activitypub/).
- It implements the [HTTP signatures spec](https://tools.ietf.org/html/draft-cavage-http-signatures-10) for authentication of inbox deliveries.
- Mastodon also supports [Linked Data Signatures](https://w3c-dvcg.github.io/ld-signatures/) for forwarded payloads.

## Restrictions

- All object IDs must use the `https://` schema.
- Servers must offer a [WebFinger](https://tools.ietf.org/html/rfc7033) endpoint for turning usernames into actors.
- Activities attributed to an actor must have an ID on the same host as the actor.

## Activities

|Supported activity|Supported objects|Notes|
|------------------|-----------------|-----|
|`Accept`|`Follow`|The `object` of the `Follow` is expected to be an actor from the receiving server|
|`Add`|`Note`|Only the actor's own objects and only to the actor's featured collection URI as `target`|
|`Announce`|`Object`|Any object supported by `Create` is supported here|
|`Block`|`Object`|The `object` is expected to point to an actor from the receiving server|
|`Create`|`Note`, `Article`, `Image`, `Video`||
|`Delete`|`Object`|Only the actor's own objects will be deleted, such as anything created before
|`Flag`|`Object`|The `object` is expected to point to one or multiple objects originating on the receiving server|
|`Follow`|`Object`|The `object` is expected to point to an actor from the receiving server|
|`Like`|`Object`|The `object` is expected to be something created on the receiving server|
|`Move`|`Object`|Only the actor's own actor object can be moved to another actor object at `target`|
|`Reject`|`Follow`|The `object` of the `Follow` is expected to be an actor from the receiving server|
|`Remove`|`Note`|Only the actor's own objects and only from the actor's featured collection URI as `origin`|
|`Undo`|`Accept`, `Announce`, `Block`, `Follow`, `Like`||
|`Update`|`Object`|Only the actor's own actor object can be updated|

## Extensions
### Featured collection

What is known in Mastodon as "pinned toots", or statuses that are always featured at the top of people's profiles, is implemented using an extra property `featured` on the actor object that points to a `Collection` of objects. Example:

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
        
    {
      "toot": "http://joinmastodon.org/ns#",
      "featured": {
        "@id": "toot:featured",
        "@type": "@id"
      }
    }
  ],

  "id": "https://example.com/@alice",
  "type": "Person",
  "featured": "https://example.com/@alice/collections/featured"
}
```

### Custom emojis

Mastodon supports arbitrary emojis, that is, small images uploaded by admins and invokable via shortcodes. For this, an `Emoji` type is used. These emojis are listed in the `tag` property just like `Mention` and `Hashtag` objects, since they are entities that affect how the text is rendered. Example:

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
        
    {
      "toot": "http://joinmastodon.org/ns#",
      "Emoji": "toot:Emoji"
    }
  ],

  "id": "https://example.com/@alice/hello-world",
  "type": "Note",
  "content": "Hello world :Kappa:",
  "tag": [
    {
      "id": "https://example.com/emoji/123",
      "type": "Emoji",
      "name": ":Kappa:",
      "icon": {
        "type": "Image",
        "mediaType": "image/png",
        "url": "https://example.com/files/kappa.png"
      }
    }
  ]
}
```

### Focal points

Mastodon supports setting a focal point on uploaded images, so that wherever that image is displayed, the focal point stays in view. This is implemented using an extra property `focalPoint` on the `Image` objects. The property is simply an array of two floating points between 0 and 1. Example:

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
        
    {
      "toot": "http://joinmastodon.org/ns#",
      "focalPoint": {
        "@container": "@list",
        "@id": "toot:focalPoint"
      }
    }
  ],

  "id": "https://example.com/@alice/hello-world",
  "type": "Note",
  "content": "A picture attached!",
  "attachment": [
    {
      "type": "Image",
      "mediaType": "image/png",
      "url": "https://example.com/files/cats.png",
      "focalPoint": [
        0.55,
        0.43
      ]
    }
  ]
}
```