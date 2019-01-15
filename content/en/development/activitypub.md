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

|Supported activity|Supported objects|
|------------------|-----------------|
|`Accept`|`Follow`|
|`Add`|`Note`|
|`Announce`|`Object`|
|`Block`|`Object`|
|`Create`|`Note`, `Article`, `Image`, `Video`|
|`Delete`|`Object`|
|`Flag`|`Object`|
|`Follow`|`Object`|
|`Like`|`Object`|
|`Move`|`Object`|
|`Reject`|`Follow`|
|`Remove`|`Note`|
|`Undo`|`Accept`, `Announce`, `Block`, `Follow`, `Like`|
|`Update`|`Object`|

As far as the `Create` activity is concerned, only `Note` is a first-class citizen in Mastodon, because Mastodon is a microblogging engine. For other types of supported objects, Mastodon internally creates a toot representation, for example, an `Article` becomes a toot with the `title` and `url` of the original object, as users are expected to navigate to the original URL to read the article with rich text formatting. For `Image` and `Video` objects, the `title` is likewise used to fill the content of the toot, with the original file attached to the toot.

The `Flag` activity allows reporting content on another server, and its `object` can be either one or more actors, or one or more objects attributed to various actors. The `Add` and `Remove` activities only work with [featured collections](#featured-collection). The `Delete` activity can be used to delete all local data of the sender when the `object` of it is the sender. The `Update` activity can only be used to update the profile of the sender. Likewise, the `Move` activity allows re-assigning followers from the sender (`object`) to another actor (`target`), but only if the other actor references the sender in the `alsoKnownAs` property.

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