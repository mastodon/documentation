---
title: ActivityPub
description: A decentralized social networking protocol based upon the ActivityStreams 2.0 data format and JSON-LD.
menu:
  docs:
    weight: 10
    parent: spec
---

{{< hint style="warning" >}}
Sample payloads will be added at a future date.
{{< /hint >}}

## Status federation {#status}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/lib/activitypub/activity.rb" caption="app/lib/activitypub/activity.rb" >}}

### Supported activities for statuses

* Create = transformed into a status and saved into database
* Delete = removes a status from the database
* Like = transformed into a favourite on a status
* Announce = transformed into a boost on a status
* Flag = transformed into a report to the moderation team.
* Update = only supported on polls. Used to refresh vote count.
* Undo = undo a previous Like or Announce.

### Payloads

The first-class Object types supported by Mastodon are `Note` and `Question`.

* Notes are transformed into regular statuses.
* Questions are transformed into a poll status.

Some other Object types are converted as best as possible. The transformer uses `content` if available, or `name` if not, in order to generate status text. The `url` will be appended. The `summary` property will be used as the CW text. The `icon` will be used as a thumbnail.

* Article
* Page
* Image
* Audio
* Video
* Event

## Profile federation {#profile}

### Supported activities for profiles

* Follow = Indicate interest in receiving status updates from a profile.
* Accept/Reject = used to approve or deny Follow activities. Unlocked accounts will automatically reply with an Accept, while locked accounts can manually choose whether to approve or deny a follow request.
* Add/Remove = manage pinned posts and featured collections.
* Block = Signal to a remote server that they should hide your profile from that user. Not guaranteed.
* Flag = report user
* Update = refresh account details
* Move = migrate followers from one account to another. Requires alsoKnownAs to be set in both directions.
* Delete = remove an account from the database, as well as all of their statuses.
* Undo = undo a previous Follow, Accept Follow, or Block.

### Properties used

| Property | Interpretation |
| :--- | :--- |
| preferredUsername | Used for Webfinger lookup. Must be unique on the domain, and must correspond to a Webfinger `acct:` URI. |
| name | Used as profile display name. |
| summary | Used as profile bio. |
| type | Assumed to be Person. If type is Application or Service, it will be interpreted as a bot flag. |
| url | Used as profile link. |
| icon | Used as profile avatar. |
| image | Used as profile header. |
| manuallyApprovesFollowers | Will be shown as a locked account. |
| discoverable | Will be shown in the profile directory. See [Discoverability flag]({{< relref "activitypub.md#discoverable" >}}). |
| publicKey | Required for signatures. See [Public key]({{< relref "activitypub.md#public-key" >}}). |
| featured | Pinned posts. See [Featured collection]({{< relref "activitypub.md#featured" >}}). |
| attachment | Used for profile fields. See [Profile metadata]({{< relref "activitypub.md#profile-metadata" >}}) and [Identity proofs]({{< relref "activitypub.md#identityproof" >}}). |
| alsoKnownAs | Required for Move activity. |

## HTML sanitization {#sanitization}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/lib/sanitize_config.rb" caption="app/lib/sanitize\_config.rb" >}}

 Mastodon sanitizes incoming HTML in order to not break assumptions for API client developers. Supported elements include `<p>`, `<span>`, `<br>`, and `<a>`. Unsupported elements will be converted to `<p>`.The sanitizer will keep classes if they begin with microformats prefixes or are semantic classes:

* h-\*
* p-\*
* u-\*
* dt-\*
* e-\*
* mention
* hashtag
* ellipsis
* invisible

## JSON-LD Namespacing {#namespaces}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/lib/activitypub/adapter.rb" caption="app/lib/activitypub/adapter.rb" >}}

### Mastodon extensions \(`toot:`\) {#toot}

Contains definitions for Mastodon features.

* toot:Emoji
* toot:IdentityProof
* toot:blurhash
* toot:focalPoint
* toot:featured
* toot:featuredTags
* toot:discoverable
* toot:suspended
* toot:votersCount

### ActivityStreams extensions \(`as:`\) {#as}

Contains ActivityStreams extended properties that have been proposed but not officially adopted yet.

* as:Hashtag
* as:alsoKnownAs
* as:manuallyApprovesFollowers
* as:movedTo
* as:sensitive

### W3ID Security Vocabulary \(`sec:`\) {#sec}

Contains properties used for HTTPS Signatures and Linked Data Signatures. Also used for identity proofs. See [Security]({{< relref "security.md" >}}) for more information.

* sec:publicKey
* sec:publicKeyPem
* sec:owner
* sec:signature
* sec:signatureValue

#### W3ID Identity

Contains a collection of terms from various namespaces, used for Linked Data Signatures.

* dc:creator
* dc:created
* sec:signature
* sec:signatureValue

### schema.org extensions \(`schema:`\) {#schema}

Contains properties used for profile metadata.

* schema:PropertyValue
* schema:value

## Extensions

### Public key {#publicKey}

Public keys are used for HTTPS Signatures and Linked Data Signatures. This is implemented using an extra property `publicKey` on actor objects. See [Security]({{< relref "security.md" >}}) for more information. Example:

```javascript
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1"
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "publicKey": {
    "id": "https://mastodon.social/users/Gargron#main-key",
    "owner": "https://mastodon.social/users/Gargron",
    "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvXc4vkECU2/CeuSo1wtn\nFoim94Ne1jBMYxTZ9wm2YTdJq1oiZKif06I2fOqDzY/4q/S9uccrE9Bkajv1dnkO\nVm31QjWlhVpSKynVxEWjVBO5Ienue8gND0xvHIuXf87o61poqjEoepvsQFElA5ym\novljWGSA/jpj7ozygUZhCXtaS2W5AD5tnBQUpcO0lhItYPYTjnmzcc4y2NbJV8hz\n2s2G8qKv8fyimE23gY1XrPJg+cRF+g4PqFXujjlJ7MihD9oqtLGxbu7o1cifTn3x\nBfIdPythWu5b4cujNsB3m3awJjVmx+MHQ9SugkSIYXV0Ina77cTNS0M2PYiH1PFR\nTwIDAQAB\n-----END PUBLIC KEY-----\n"
  }
}
```

### Featured collection {#featured}

What is known in Mastodon as “pinned toots”, or statuses that are always featured at the top of people’s profiles, is implemented using an extra property `featured` on the actor object that points to a `Collection` of objects. Example:

```javascript
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

### Featured tags {#featuredTags}

Mastodon allows users to feature specific hashtags on their profile for easy browsing, as a discoverability mechanism. This is implemented using an extra property `featuredTags` on the actor object that points to a `Collection` of `Hashtag` objects specifically.

```javascript
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "toot": "http://joinmastodon.org/ns#",
      "featuredTags": {
        "@id": "toot:featuredTags",
        "@type": "@id"
      }
    }
  ],

  "id": "https://example.com/@alice",
  "type": "Person",
  "featuredTags": "https://example.com/@alice/collections/tags"
}
```

### Custom emojis {#emoji}

Mastodon supports arbitrary emojis, that is, small images uploaded by admins and invokable via shortcodes. For this, an `Emoji` type is used. These emojis are listed in the `tag` property just like `Mention` and `Hashtag` objects, since they are entities that affect how the text is rendered. Example:

```javascript
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
  "content": "Hello world :kappa:",
  "tag": [
    {
      "id": "https://example.com/emoji/123",
      "type": "Emoji",
      "name": ":kappa:",
      "icon": {
        "type": "Image",
        "mediaType": "image/png",
        "url": "https://example.com/files/kappa.png"
      }
    }
  ]
}
```

### Focal points {#focalPoint}

Mastodon supports setting a focal point on uploaded images, so that wherever that image is displayed, the focal point stays in view. This is implemented using an extra property `focalPoint` on `Image` objects. The property is simply an array of two floating points between -1.0 and 1.0, with 0,0 being the center of the image, the first value being x \(-1.0 is the left edge, +1.0 is the right edge\) and the second value being y \(-1.0 is the bottom edge, +1.0 is the top edge\). See [Focal points]({{< relref "../methods/statuses/media.md#focal-points" >}}) for more information. Example:

```javascript
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
        -0.55,
        0.43
      ]
    }
  ]
}
```

### Blurhash {#blurhash}

Mastodon generates colorful preview thumbnails for attachments. This is implemented using an extra property `blurhash` on `Image` objects. The property is a string generated by the [BlurHash algorithm](https://blurha.sh). Example:

```javascript
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "toot": "http://joinmastodon.org/ns#",
      "blurhash": "toot:blurhash"
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
      "blurhash": "UBL_:rOpGG-oBUNG,qRj2so|=eE1w^n4S5NH"
    }
  ]
}
```

### Profile metadata {#PropertyValue}

Mastodon supports arbitrary profile fields containing name-value pairs. This is implemented using the `attachment` property on actor objects, with objects in the array having a type of `PropertyValue` and a `value` property, both from the schema.org namespace. Example:

```javascript
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "PropertyValue": "schema:PropertyValue",
      "value": "schema:value"
    }
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "attachment": [
    {
      "type": "PropertyValue",
      "name": "Patreon",
      "value": "<a href=\"https://www.patreon.com/mastodon\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span}"
    },
    {
      "type": "PropertyValue",
      "name": "Homepage",
      "value": "<a href=\"https://zeonfederated.com\" rel=\"me nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">zeonfederated.com</span><span class=\"invisible\"></span}"
    }
  ]
}
```

### Identity proofs {#IdentityProof}

Mastodon supports integration with identity providers to prove that a profile is linked to a certain identity. This is implemented using the `attachment` property on actor objects, with objects in the array having a type of `IdentityProof` from the Mastodon namespace. The object also includes `signatureAlgorithm` and `signatureValue` from the W3ID Security Vocabulary namespace. Example:

```javascript
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1",
    {
      "toot": "http://joinmastodon.org/ns#",
      "IdentityProof": "toot:IdentityProof"
    }
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "attachment": [
    {
      "type": "IdentityProof",
      "name": "gargron",
      "signatureAlgorithm": "keybase",
      "signatureValue": "5cfc20c7018f2beefb42a68836da59a792e55daa4d118498c9b1898de7e845690f"
    }
  ]
}
```

### Discoverability flag {#discoverable}

Mastodon allows users to opt-in or opt-out of discoverability features like the profile directory. This flag may also be used as an indicator of the user's preferences toward being included in external discovery services, such as search engines or other indexing tools. If you are implementing such a tool, it is recommended that you respect this property if it is present. This is implemented using an extra property `discoverable` on objects. Example:

```javascript
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "toot": "http://joinmastodon.org/ns#",
      "discoverable": "toot:discoverable"
    }
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "discoverable": true
}
```

### Suspended flag {#suspended}

Mastodon reports whether a user was locally suspended, for better handling of these accounts. Suspended accounts in Mastodon return empty data. If a remote account is marked as suspended, it cannot be unsuspended locally. Suspended accounts can be targeted by activities such as Update, Undo, Reject, and Delete. This functionality is implemented using an extra property `suspended` on objects. Example:

```javascript
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "toot": "http://joinmastodon.org/ns#",
      "suspended": "toot:suspended"
    }
  ],
  "id": "https://example.com/@eve",
  "type": "Person",
  "suspended": true
}
```

## Other functionality

### Secure mode {#secure-mode}

When a Mastodon server runs in secure mode, all cross-server HTTP requests to it must be signed (in other words, even `GET` requests to public resources). That way, the Mastodon server can choose to reject requests from servers it has blocked and avoid "leaking" public information. Mastodon itself uses a dedicated system actor to sign such HTTP requests. See [Security](../security) for more details on HTTP signatures.

Secure mode is the foundation upon which "limited federation mode" is built. A Mastodon server in limited federation mode will only federate with servers its admin has explicitly allowed, and reject all other requests.

### Follower synchronization mechanism

Mastodon has a concept of "followers-only" posts, but expanding the followers collection is currently handled at the destination rather than at the origin (i.e., not with explicit addressing). Therefore, a mechanism to detect synchronization issues and correct them is needed. This mechanism must work on partial followers collections, rather than the full collection (which may not be public information).

When delivering a message to a remote user, an optional `Collection-Synchronization` HTTP header is attached, following the same syntax as the `Signature` header, with the following attributes:

- `collectionId` = MUST be the sender's `followers` collection
- `url` = a URL to a partial collection containing the identifiers of the sender's followers residing on the receiver's instance. MUST reside on the same domain as the actor itself, and SHOULD be only accessible with a signed query from the receiver's instance
- `digest` = hexadecimal representation of the XORed SHA256 digests of each of the identifiers in the partial collection

Example:

```http
POST https://mastodon.social/users/foo/inbox
Collection-Synchronization:
  collectionId="https://social.sitedethib.com/users/Thib/followers",
  url="https://social.sitedethib.com/users/Thib/followers_synchronization",
  digest="b08ab6951c7d6cc2b91e17ebd9557da7fae02489728e9332fcb3a97748244d50"
```

When a remote user attempts to GET the partial collection `url`, this request must be signed with HTTP signatures. Example:

```http
GET https://social.sitedethib.com/users/Thib/followers_synchronization
Signature: ... # a signature from an account on mastodon.social

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://social.sitedethib.com/users/Thib/followers?domain=mastodon.social",
  "type": "OrderedCollection",
  "orderedItems": [
    "https://mastodon.social/users/Gargron"
  ]
}
```

