Protocol extensions
===================

> **Note:** This document describes only additions to the OStatus protocol. The OStatus protocol is obsolete and Mastodon 1.6 and higher prefers ActivityPub, using OStatus only when nothing else is available.

Some functionality in Mastodon required some additions to the protocols to enable seamless federation of those features:

- [Federation of blocks/unblocks](#federation-of-blocksunblocks)
- [Federation of "sensitive" media](#federation-of-sensitive-material)
- [Federation of "content warnings"](#federation-of-content-warnings)
- [Federation of privacy features](#federation-of-privacy-features)
- [HTTP signatures](#http-signatures)

### Federation of blocks/unblocks

ActivityStreams was lacking verbs for block/unblock. Mastodon creates Salmon slaps for block and unblock events, which are not part of a user’s public feed, but are nevertheless delivered to the target user. The intent of these Salmon slaps is not to notify the target user, but to notify the target user’s server, so that it can perform any number of UX-related tasks such as removing the target user as a follower of the blocker, and/or displaying a message to the target user such as “You can’t follow this person because you’ve been blocked”

The Salmon slaps have the exact same structure as standard follow/unfollow slaps, the verbs are namespaced:

- `http://mastodon.social/schema/1.0/block`
- `http://mastodon.social/schema/1.0/unblock`

### Federation of sensitive material

Statuses can be marked as containing sensitive (or not safe for work) media. This is symbolized by a `<category term="nsfw" />` on the Atom entry

### Federation of content warnings

Content warnings are encoded in plain-text as the `<summary>` element.

### Federation of privacy features
#### Locked accounts and status privacy levels

Accounts and statuses have an access “scope”:

Accounts can be “private” or “public”. The former requires a follow request to be approved before a follow relationship can be established, the latter can be followed directly.

Statuses can be “private”, “unlisted” or “public”. Private must only be shown to the followers of the account or people mentioned in the status; public can be displayed publicly. Unlisted statuses may be displayed publicly but preferably outside of any spotlights e.g. “whole known network” or “public” timelines.

Namespace of the scope element is `http://mastodon.social/schema/1.0`. Example:

```xml
<entry>
  <!-- ... -->
  <author>
    <!-- ... -->
    <mastodon:scope>private</mastodon:scope>
  </author>
  <!-- ... -->
  <mastodon:scope>private</mastodon:scope>
</entry>
```

#### Follow requests

Mastodon uses the following Salmon slaps to signal a follow request, a follow request authorization and a follow request rejection:

- `http://activitystrea.ms/schema/1.0/request-friend`
- `http://activitystrea.ms/schema/1.0/authorize`
- `http://activitystrea.ms/schema/1.0/reject`

The activity object of the request-friend slap is the account in question. The activity object of the authorize and reject slaps is the original request-friend activity. Request-friend slap is sent to the locked account, when the end-user of that account decides, the authorize/reject decision slap is sent back to the requester.

### HTTP Signatures

A PuSH subscription request may be signed on behalf of a random local user of the instance. The `keyId` part of the signature is expected to be the `acct:` URI of the user. It doesn’t matter which user is used for the signing, because the main information to be carried here is which instance is doing the subscribing. That information is saved and used when sending out private statuses to subscribed instances. Only instances with authorized followers receive a user’s private statuses.

For example, bar.com subscribes to updates from alice@foo.com:

- If there is only the subscription and nothing else, bar.com receives public/unlisted statuses of alice@foo.com
- If alice@foo.com’s account is not locked and bob@bar.com sends a follow Salmon, bar.com will start receiving alice@foo.com’s private statuses
- If alice@foo.com’s account is locked and bob@bar.com sends a follow request, bar.com will only begin receiving alice@foo.com’s private statuses if and after alice accepts bob as a follower

> **Note:** Mastodon 2.0 and higher **does not** send any private or direct statuses through OStatus
