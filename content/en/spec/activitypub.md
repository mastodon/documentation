---
title: ActivityPub
summary: A decentralized social networking protocol based upon the ActivityStreams 2.0 data format and JSON-LD.
menu:
  docs:
    weight: 10
    parent: spec
---

## Status federation {#status}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/activity.rb" caption="app/lib/activitypub/activity.rb" >}}

### Supported activities for statuses

Create
: Transformed into a status and saved into database

Delete
: Removes a status from the database

Like
: Transformed into a favourite on a status

Announce
: Transformed into a boost on a status

Update
: Refresh vote count on polls. As of Mastodon 3.5.0: edit statuses when the `updated` timestamp is present.

Undo
: Undo a previous Like or Announce.

Flag
: Transformed into a report to the moderation team. See the [Reports](#Flag) extension for more information.

### Payloads

The first-class Object types supported by Mastodon are `Note` and `Question`.

- Notes are transformed into regular statuses.
- Questions are transformed into a poll status. See the [Polls](#Question) extension for more information.

Some other Object types are converted as best as possible:

- Article
- Page
- Image
- Audio
- Video
- Event

The transformer uses `content` if available, or `name` if not, in order to generate status text. The `url` will be appended. The `summary` property will be used as the CW text. The `icon` will be used as a thumbnail.

### HTML sanitization {#sanitization}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/sanitize_ext/sanitize_config.rb" caption="lib/sanitize_ext/sanitize_config.rb" >}}

Mastodon sanitizes incoming HTML in order to not break assumptions for API client developers. Supported elements will be kept as-is, and unsupported elements will be converted or removed. Supported attributes will be kept, and all other attributes will be stripped. The following elements and attributes are supported:
 
- `<p>`
- `<span>` (`class`)
- `<br>`
- `<a>` (`href`, `rel`, `class`)
- lists will be converted to `<p>`, and list items will be separated with `<br>`

Since Mastodon v4.2, the following elements and attributes are supported:

- `<p>`
- `<span>` (`class`)
- `<br>`
- `<a>` (`href`, `rel`, `class`)
- `<del>`
- `<pre>`
- `<code>`
- `<em>`
- `<strong>`
- `<b>`
- `<i>`
- `<u>`
- `<ul>`
- `<ol>` (`start`, `reversed`)
- `<li>` (`value`)
- `<blockquote>`
- headings will be converted to `<strong>` and then wrapped in `<p>`
 
The sanitizer will keep classes if they begin with microformats prefixes or are semantic classes:

- h-*
- p-*
- u-*
- dt-*
- e-*
- mention
- hashtag
- ellipsis
- invisible

Links will be kept if the protocol is supported, and converted to text otherwise. The following link protocols are supported:

- http
- https
- dat
- dweb
- ipfs
- ipns
- ssb
- gopher
- xmpp
- magnet
- gemini

### Properties used

content
: Used as status text

name
: Used as status text, if `content` is not provided on a transformed Object type

summary
: Used as CW text

sensitive
: Used to determine whether status media or text should be hidden by default. See the [Sensitive content](#sensitive) extension section for more information about `as:sensitive`

inReplyTo
: Used for threading a status as a reply to another status

published
: Used as status date

url
: Used for status permalinks, and also appended to status text for transformed Objects

attributedTo
: Used to determine the profile which authored the status

to/cc
: Used to determine audience and visibility of a status, in combination with mentions. See [Mentions for adddressing and notifications](#Mention)

tag
: Used to mark up mentions and hashtags.

tag[].type
: Either `Mention`, `Hashtag`, or `Emoji` is currently supported. See the [Hashtag](#Hashtag) and [Custom emoji](#Emoji) extension sections for more information

tag[].name
: The plain-text Webfinger address of a profile Mention (`@user` or `@user@domain`), or the plain-text Hashtag (`#tag`), or the custom Emoji shortcode (`:thounking:`)

tag[].href
: The URL of the actor or tag

attachment
: Used to include attached images, videos, or audio.

attachment[].url
: Used to fetch the media attachment

attachment[].summary
: Used as media description

attachment[].blurhash
: Used to generate a blurred preview image corresponding to the colors used within the image. See [Blurhash](#blurhash) for more details.

replies
: A Collection of statuses that are in reply to the current status. Up to 5 replies from the same server will be fetched upon discovery of a remote status, in order to resolve threads more fully. On Mastodon's side, the first page contains self-replies, and additional pages contain replies from other people.

#### Poll-specific properties

endTime
: The timestamp for when voting will close on the poll

closed
: The timestamp for when voting closed on the poll. The timestamp will likely match the `endTime` timestamp. If this property is present, the poll is assumed to be closed.

votersCount
: How many people have voted in the poll. Distinct from how many votes have been cast (in the case of multiple-choice polls)

oneOf
: Single-choice poll options

anyOf
: Multiple-choice poll options

oneOf/anyOf[].name
: The poll option's text

oneOf/anyOf[].replies.totalItems
: The poll option's vote count

## Profile federation {#profile}

### Supported activities for profiles

Follow
: Indicate interest in receiving status updates from a profile.

Accept/Reject
: Used to approve or deny Follow activities. Unlocked accounts will automatically reply with an Accept, while locked accounts can manually choose whether to approve or deny a follow request.

Add/Remove
: Manage pinned posts and featured collections.

Update
: Refresh account details

Delete
: Remove an account from the database, as well as all of their statuses.

Undo
: Undo a previous Follow, Accept Follow, or Block.

Block
: Signal to a remote server that they should hide your profile from that user. Not guaranteed. See [Remote blocking](#Block) for more information.

Flag
: Report a user to their moderation team. See the [Reports](#Flag) extension for more information.

Move
: Migrate followers from one account to another. Requires `alsoKnownAs` to be set on the new account pointing to the old account.

### Properties used

preferredUsername
: Used for Webfinger lookup. Must be unique on the domain, and must correspond to a Webfinger `acct:` URI.

name
: Used as profile display name.

summary
: Used as profile bio.

type
: Assumed to be Person. If type is Application or Service, it will be interpreted as a bot flag.

url
: Used as profile link.

icon
: Used as profile avatar.

image
: Used as profile header.

manuallyApprovesFollowers
: Will be shown as a locked account.

discoverable
: Will be shown in the profile directory. See [Discoverability flag](#discoverable).

publicKey
: Required for signatures. See [Public key](#publicKey).

featured
: Pinned posts. See [Featured collection](#featured).

attachment
: Used for profile fields. See [Profile metadata](#PropertyValue) and [Identity proofs](#IdentityProof).

alsoKnownAs
: Required for Move activity.

published
: When the profile was created.

## JSON-LD Contexts and Extensions {#contexts}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/adapter.rb" caption="app/lib/activitypub/adapter.rb" >}}

### Mastodon extensions (`toot:`) {#toot}

Base URI: `http://joinmastodon.org/ns#`

Contains definitions for Mastodon features.

- toot:Emoji (`http://joinmastodon.org/ns#Emoji`)
- toot:IdentityProof (`http://joinmastodon.org/ns#IdentityProof`)
- toot:blurhash (`http://joinmastodon.org/ns#blurhash`)
- toot:focalPoint (`http://joinmastodon.org/ns#focalPoint`)
- toot:featured (`http://joinmastodon.org/ns#featured`)
- toot:featuredTags (`http://joinmastodon.org/ns#featuredTags`)
- toot:discoverable (`http://joinmastodon.org/ns#discoverable`)
- toot:suspended (`http://joinmastodon.org/ns#suspended`)
- toot:votersCount (`http://joinmastodon.org/ns#votersCount`)

### ActivityStreams extensions (`as:`) {#as}

Base URI: `https://www.w3.org/ns/activitystreams#`

Contains ActivityStreams extended properties that have been proposed but not officially adopted yet.

- as:Hashtag (`https://www.w3.org/ns/activitystreams#Hashtag`)
- as:manuallyApprovesFollowers (`https://www.w3.org/ns/activitystreams#manuallyApprovesFollowers`)
- as:movedTo (`https://www.w3.org/ns/activitystreams#movedTo`)
- as:sensitive (`https://www.w3.org/ns/activitystreams#sensitive`)

### Schema.org extensions (`schema:`) {#schema}

Contains properties used for profile metadata.

Base URI: `http://schema.org#` (incorrect; should be `https://schema.org/`)

- [schema:PropertyValue (`http://schema.org#PropertyValue`, should be `https://schema.org/PropertyValue`)](https://schema.org/PropertyValue)
- [schema:value (`http://schema.org#value`, should be `https://schema.org/value`)](https://schema.org/value)

### W3ID Security Vocabulary (`sec:`) {#sec}

Context: [`https://w3id.org/security/v1`](https://w3id.org/security/v1)

Used for HTTPS Signatures. Also used for identity proofs. See [Security]({{< relref "spec/security" >}}) for more information.

- [sec:publicKey (`https://w3id.org/security#publicKey`)](https://w3id.org/security#publicKey)
- [sec:publicKeyPem (`https://w3id.org/security#publicKeyPem`)](https://w3id.org/security#publicKeyPem)
- [sec:owner (`https://w3id.org/security#owner`)](https://w3id.org/security#owner)
- [sec:signature (`https://w3id.org/security#signature`)](https://w3id.org/security#signature)
- [sec:signatureValue (`https://w3id.org/security#signatureValue`)](https://w3id.org/security#signatureValue)

#### W3ID Identity

Context: [`https://w3id.org/identity/v1`](https://w3id.org/identity/v1) (offline)

Used for Linked Data Signatures. See [Security > Linked Data Signatures]({{< relref "spec/security#ld" >}}) for more information.

- [dc:creator (`http://purl.org/dc/terms/creator`)](http://purl.org/dc/terms/creator)
- [dc:created (`http://purl.org/dc/terms/created`)](http://purl.org/dc/terms/created)
- [sec:signature (`https://w3id.org/security#signature`)](https://w3id.org/security#signature)
- [sec:signatureValue (`https://w3id.org/security#signatureValue`)](https://w3id.org/security#signatureValue)

## Extensions defined using ActivityStreams vocabulary

While the Activity Vocabulary defines a wide range of types and terms, ActivityPub only defines side effects for a subset of them. The following activity types have the following side effects when received in a Mastodon inbox.

### Remote blocking (`Block`) {#Block}

ActivityPub defines the `Block` activity for client-to-server (C2S) use-cases, but not for server-to-server (S2S) -- it recommends that servers SHOULD NOT deliver Block activities to their `object`. However, Mastodon will send this activity when a local user blocks a remote user. When Mastodon receives a `Block` activity where the `object` is an actor on the local domain, it will interpret this as a signal to hide the actor's profile and posts from the local user, as well as disallowing mentions of that actor by that local user.

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/bd06bb61-01e0-447a-9dc8-95915db9aec8",
  "type": "Block",
  "actor": "https://mastodon.example/users/alice",
  "object": "https://example.com/~mallory",
  "to": "https://example.com/~mallory"
}
```

### Reporting profiles and posts (`Flag`) {#Flag}

To report profiles and/or posts on remote servers, Mastodon will send a `Flag` activity from the instance actor. The `object` of this activity contains the user being reported, as well as any posts attached to the report. If a comment is attached to the report, it will be used as the `content` of the activity.

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/ccb4f39a-506a-490e-9a8c-71831c7713a4",
  "type": "Flag",
  "actor": "https://mastodon.example/actor",
  "content": "Please take a look at this user and their posts",
  "object": [
    "https://example.com/users/1",
    "https://example.com/posts/380590",
    "https://example.com/posts/380591"
  ],
  "to": "https://example.com/users/1"
}
```

### Account migration (`Move`) {#Move}

Mastodon uses the Move activity to signal that an account has migrated to a different account. For the migration to be considered valid, Mastodon checks that the new account has defined an alias pointing to the old account (via the `alsoKnownAs` property).

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/users/alice#moves/1",
  "actor": "https://mastodon.example/users/alice",
  "type": "Move",
  "object": "https://mastodon.example/users/alice",
  "target": "https://alice.com/users/109835986274379",
  "to": "https://mastodon.example/users/alice/followers"
}
```

### Polls {#Question}

{{< caption-link url="https://www.w3.org/TR/activitystreams-vocabulary/#questions" caption="Activity Vocabulary §5.4 - Representing Questions" >}}

The ActivityStreams Vocabulary specification describes loosely (non-normatively) how a question might be represented. Mastodon's implementation of polls is somewhat inspired by this section. The following implementation details can be observed:

- `Question` is used as an `Object` type instead of as an `IntransitiveActivity`; rather than being sent directly, it is wrapped in a `Create` just like any other status.
- Poll options are serialized using `oneOf` or `anyOf` as an array.
  - Each item in this array has no `id`, has a `type` of `Note`, and has a `name` representing the text of the poll option.
  - Each item in this array also has a `replies` property, representing the responses to this particular poll option. This node has no `id`, has a `type` of `Collection`, and has a `totalItems` property representing the total number of votes received for this option.

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "votersCount": "http://joinmastodon.org/ns#votersCount"
    }
  ],
  "id": "https://mastodon.example/users/alice/statuses/1009947848598745",
  "type": "Question",
  "content": "What should I eat for breakfast today?",
  "published": "2023-03-05T07:40:13Z",
  "endTime": "2023-03-06T07:40:13Z",
  "votersCount": 7,
  "anyOf": [
    {
      "type": "Note",
      "name": "apple",
      "replies": {
        "type": "Collection",
        "totalItems": 3
      }
    },
    {
      "type": "Note",
      "name": "orange",
      "replies": {
        "type": "Collection",
        "totalItems": 7
      }
    },
    {
      "type": "Note",
      "name": "banana",
      "replies": {
        "type": "Collection",
        "totalItems": 6
      }
    }
  ]
}
```

- Poll votes are serialized as `Create` activities, where the `object` is a `Note` with a `name` that exactly matches the `name` of the poll option. The `Note.inReplyTo` points to the URI of the `Question` object.
  - For multiple-choice polls, multiple activities may be sent. Votes will be counted if you have not previously voted for that option.

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/users/bob#votes/827163/activity",
  "to": "https://mastodon.example/users/alice",
  "actor": "https://mastodon.example/users/bob",
  "type": "Create",
  "object": {
    "id": "https://mastodon.example/users/bob#votes/827163",
    "type": "Note",
    "name": "orange",
    "attributedTo": "https://mastodon.example/users/bob",
    "to": "https://mastodon.example/users/alice",
    "inReplyTo": "https://mastodon.example/users/alice/statuses/1009947848598745"
  }
}
```
```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://mastodon.example/users/bob#votes/827164/activity",
  "to": "https://mastodon.example/users/alice",
  "actor": "https://mastodon.example/users/bob",
  "type": "Create",
  "object": {
    "id": "https://mastodon.example/users/bob#votes/827164",
    "type": "Note",
    "name": "banana",
    "attributedTo": "https://mastodon.example/users/bob",
    "to": "https://mastodon.example/users/alice",
    "inReplyTo": "https://mastodon.example/users/alice/statuses/1009947848598745"
  }
}
```

### Mentions for addressing and notifications {#Mention}

{{< caption-link url="https://www.w3.org/TR/activitystreams-vocabulary/#microsyntaxes" caption="Activity Vocabulary §5.6 - Mentions, Tags, and Other Common Social Microsyntaxes" >}}

In the ActivityStreams Vocabulary, `Mention` is a subtype of `Link` that is intended to represent the microsyntax of @mentions. The `tag` property is intended to add references to other Objects or Links. For Link tags, the `name` of the Link should be a substring of the natural language properties (`name`, `summary`, `content`) on that object. Wherever such a substring is found, it can be transformed into a hyperlink reference to the `href`.

However, Mastodon also uses `Mention` tags for addressing in some cases. Based on the presence or exclusion of Mention tags, and compared to the explicitly declared audiences in `to` and `cc`, Mastodon will calculate a visibility level for the post. Additionally, Mastodon requires Mention tags in order to generate a notification. (The mentioned actor must still be included within `to` or `cc` explicitly in order to receive the post.)

- `public`: Public statuses have the `as:Public` magic collection in `to`
- `unlisted`: Unlisted statuses have the `as:Public` magic collection in `cc`
- `private`: Followers-only statuses have an actor's follower collection in `to` or `cc`, but do not include the `as:Public` magic collection
- `limited`: Limited-audience statuses have actors in `to` or `cc`, at least one of which is not `Mention`ed in `tag`
- `direct`: Mentions-only statuses have actors in `to` or `cc`, all of which are `Mention`ed in `tag`

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/activity/create.rb" caption="app/lib/activitypub/activity/create.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/activitypub/parser/status_parser.rb" caption="app/lib/activitypub/parser/status_parser.rb" >}}

## Extensions not defined by ActivityStreams

The following features are defined using properties and types that are not defined by ActivityStreams.

### Public key {#publicKey}

Public keys are used for HTTP Signatures and Linked Data Signatures. This is implemented using an extra property `publicKey` on actor objects. See [Security]({{< relref "spec/security" >}}) for more information.

```json
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

What is known in Mastodon as “pinned statuses”, or statuses that are always featured at the top of people’s profiles, is implemented using an extra property `featured` on the actor object that points to a `Collection` of objects.

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "featured": {
        "@id": "http://joinmastodon.org/ns#featured",
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

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "featuredTags": {
        "@id": "http://joinmastodon.org/ns#featuredTags",
        "@type": "@id"
      }
    }
  ],

  "id": "https://example.com/@alice",
  "type": "Person",
  "featuredTags": "https://example.com/@alice/collections/tags"
}
```

### Profile metadata {#PropertyValue}

Mastodon supports arbitrary profile fields containing name-value pairs. This is implemented using the `attachment` property on actor objects, with objects in the array having a type of `PropertyValue` and a `value` property, both from the schema.org namespace.

{{<hint style="warning">}}
As noted above while listing the [schema.org @context extensions](#schema), Mastodon currently incorrectly expects and maps the term `schema` to the base URI `http://schema.org#` instead of to the base URI `https://schema.org/`. Therefore, JSON-LD processors who use the correct context definition will fail to process profile fields correctly.
{{</hint>}}

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "schema": "http://schema.org#",
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

{{< hint style="warning" >}}
This property is currently unused/deprecated due to the removal of Keybase support in Mastodon 3.5: <https://github.com/mastodon/mastodon/pull/17045>
{{</hint>}}

Mastodon supports integration with identity providers to prove that a profile is linked to a certain identity. This is implemented using the `attachment` property on actor objects, with objects in the array having a type of `IdentityProof` from the Mastodon namespace. The object also includes `signatureAlgorithm` and `signatureValue` from the W3ID Security Vocabulary namespace.

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1",
    {
      "IdentityProof": "http://joinmastodon.org/ns#IdentityProof"
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

Mastodon allows users to opt-in or opt-out of discoverability features like the profile directory. This flag may also be used as an indicator of the user's preferences toward being included in external discovery services, such as search engines or other indexing tools. If you are implementing such a tool, it is recommended that you respect this property if it is present. This is implemented using an extra property `discoverable` on objects.

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "discoverable": "http://joinmastodon.org/ns#discoverable"
    }
  ],
  "id": "https://mastodon.social/users/Gargron",
  "type": "Person",
  "discoverable": true
}
```

### Suspended flag {#suspended}

Mastodon reports whether a user was locally suspended, for better handling of these accounts. Suspended accounts in Mastodon return empty data. If a remote account is marked as suspended, it cannot be unsuspended locally. Suspended accounts can be targeted by activities such as Update, Undo, Reject, and Delete. This functionality is implemented using an extra property `suspended` on objects.

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "suspended": "http://joinmastodon.org/ns#suspended"
    }
  ],
  "id": "https://example.com/@eve",
  "type": "Person",
  "suspended": true
}
```

### Hashtags {#Hashtag}

Similar to the `Mention` subtype of Link already defined in ActivityStreams, Mastodon will use `Hashtag` as a subtype of Link in order to surface posts referencing some common topic identified by a string key. The Hashtag has a `name` containing the #hashtag microsyntax -- a `#` followed by a string sequence representing a topic. This is similar to the @mention microsyntax, where an `@` is followed by some string sequence representing a resource (where in Mastodon's case, this resource is expected to be an account). Mastodon will also normalize hashtags to be case-insensitive lowercase strings, performing ASCII folding and removing invalid characters.

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/hashtag_normalizer.rb" caption="app/lib/hashtag_normalizer.rb" >}}

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "Hashtag": "https://www.w3.org/ns/activitystreams#Hashtag"
    }
  ],
  "id": "https://example.com/some-post",
  "type": "Note",
  "attributedTo": "https://example.com",
  "content": "I love #cats",
  "tag": [
    {
      "type": "Hashtag",
      "name": "#cats",
      "href": "https://example.com/tagged/cats"
    }
  ]
}
```

### Custom emojis {#Emoji}

Mastodon supports arbitrary emojis by including a `tag` of the `Emoji` type. Handling of custom emojis is similar to handling of mentions and hashtags, where the `name` of the tagged entity is found as a substring of the natural language properties (`name`, `summary`, `content`) and then linked to the local representation of some resource or topic. In the case of emoji shortcodes, the `name` is replaced by the HTML for an inline image represented by the `icon` property (where `icon.url` links to the image resource).

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "Emoji": "http://joinmastodon.org/ns#Emoji",
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

Mastodon supports setting a focal point on uploaded images, so that wherever that image is displayed, the focal point stays in view. This is implemented using an extra property `focalPoint` on `Image` objects. The property is an array of two floating points between -1.0 and 1.0, with 0,0 being the center of the image, the first value being x (-1.0 is the left edge, +1.0 is the right edge) and the second value being y (-1.0 is the bottom edge, +1.0 is the top edge). See [API Guidelines > Focal points]({{< relref "api/guidelines#focal-points" >}}) for more information.

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "focalPoint": {
        "@container": "@list",
        "@id": "http://joinmastodon.org/ns#focalPoint"
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

{{< figure src="/assets/focal-points.jpg" caption="A demonstration of various focal points and their coordinates." >}}

The focal point of (-0.55, 0.43) in the example above corresponds to a point 55% to the left of center and 43% above center. This focal point should remain visible within the cropped thumbnail, if any cropping is done.

### Blurhash {#blurhash}

Mastodon generates colorful preview thumbnails for attachments. This is implemented using an extra property `blurhash` on `Image` objects. The property is a string generated by the [BlurHash algorithm](https://blurha.sh).

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    {
      "blurhash": "http://joinmastodon.org/ns#blurhash"
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

### Sensitive content {#sensitive}

Mastodon uses the `as:sensitive` extension property to mark certain posts as sensitive. When a post is marked as sensitive, any media attached to it will be hidden by default, and if a `summary` is present, the status `content` will be collapsed behind this summary. In Mastodon, this is known as a **content warning**.

## Other functionality

### Secure mode {#secure-mode}

When a Mastodon server runs in secure mode, all cross-server HTTP requests to it must be signed (in other words, even `GET` requests to public resources). That way, the Mastodon server can choose to reject requests from servers it has blocked and avoid "leaking" public information. Mastodon itself uses a dedicated system actor to sign such HTTP requests. See [Security]({{< relref "spec/security" >}}) for more details on HTTP signatures.

Secure mode is the foundation upon which "limited federation mode" is built. A Mastodon server in limited federation mode will only federate with servers its admin has explicitly allowed, and reject all other requests.

### Follower synchronization mechanism

Mastodon has a concept of "followers-only" posts, but expanding the followers collection is currently handled at the destination rather than at the origin (i.e., not with explicit addressing). Therefore, a mechanism to detect synchronization issues and correct them is needed. This mechanism must work on partial followers collections, rather than the full collection (which may not be public information).

When delivering a message to a remote user, an optional `Collection-Synchronization` HTTP header is attached, following the same syntax as the `Signature` header, with the following attributes:

- `collectionId` = MUST be the sender's `followers` collection
- `url` = a URL to a partial collection containing the identifiers of the sender's followers residing on the receiver's instance. MUST reside on the same domain as the actor itself, and SHOULD be only accessible with a signed query from the receiver's instance
- `digest` = hexadecimal representation of the XORed SHA256 digests of each of the identifiers in the partial collection

Example:

```http
POST https://mastodon.social/users/foo/inbox HTTP/1.1
Collection-Synchronization:
  collectionId="https://social.sitedethib.com/users/Thib/followers",
  url="https://social.sitedethib.com/users/Thib/followers_synchronization",
  digest="b08ab6951c7d6cc2b91e17ebd9557da7fae02489728e9332fcb3a97748244d50"
```

When a remote user attempts to GET the partial collection `url`, this request must be signed with HTTP signatures. Example:

```http
GET https://social.sitedethib.com/users/Thib/followers_synchronization HTTP/1.1
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