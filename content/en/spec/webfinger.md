---
title: WebFinger
description: Translate `user@domain` mentions to actor profile URIs.
menu:
  docs:
    weight: 20
    parent: spec
---

## What is WebFinger, and why is it used? {#intro"}

On Mastodon, user profiles can be hosted either locally on the same website as yours, or remotely on a completely different website. The same username may be used on a different domain. Therefore, a Mastodon user's full mention consists of both the username and the domain, in the form `@username@domain`. In practical terms, `@user@example.com` is not the same as `@user@example.org`. If the domain is not included, Mastodon will try to find a local user named `@username`. However, in order to deliver to someone over ActivityPub, the `@username@domain` mention is not enough -- **mentions must be translated to an HTTPS URI first**, so that the remote actor's inbox and outbox can be found.

Enter WebFinger. WebFinger as described in [RFC 7033](https://tools.ietf.org/html/rfc7033) is a spec that defines **a method for resolving links to a resource**, given only a URI on a particular server. This allows anyone to look up where a resource is located without having to know its exact location beforehand; for example, by email or phone number. This lookup is directed at the endpoint `/.well-known/webfinger`, and a `resource` query parameter is passed along with the lookup. The resource URI used with Mastodon is the `acct:` URI as described in [RFC 7565](https://tools.ietf.org/html/rfc7565), with the username of a profile that is hosted on a particular domain.

{{< hint style="danger" >}}
**Because Mastodon heavily relies on mentions for addressing other profiles, WebFinger is required for fully interoperating with Mastodon.** Users can generally load profiles by searching for the direct HTTPS URI if they know it, or for the `username@domain` address, but Mastodon's internal logic depends almost completely on `acct`: URIs or `username@domain` representations. Searching for any objects or profiles from an ActivityPub implementation without WebFinger will fail because the author cannot be converted to a user in the local database.
{{< /hint >}}

## Sample WebFinger flow {#example"}

Suppose we want to lookup the user `@Gargron` hosted on the `mastodon.social` website.

Simply make a request to that domain's `/.well-known/webfinger` endpoint, with the `resource` query parameter set to an `acct:` URI.

{{< code title="https://mastodon.social/.well-known/webfinger?resource=acct:gargron@mastodon.social" >}}
```javascript
{
  "subject": "acct:Gargron@mastodon.social",
  "aliases": [
    "https://mastodon.social/@Gargron",
    "https://mastodon.social/users/Gargron"
  ],
  "links": [
    {
      "rel": "http://webfinger.net/rel/profile-page",
      "type": "text/html",
      "href": "https://mastodon.social/@Gargron"
    },
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://mastodon.social/users/Gargron"
    },
    {
      "rel": "http://ostatus.org/schema/1.0/subscribe",
      "template": "https://mastodon.social/authorize_interaction?uri={uri}"
    }
  ]
}
```
{{< /code >}}

You can parse this JSON response to find a link with your desired type. For ActivityPub `id`, we are interested in finding `application/activity+json` specifically.

This way, we have translated `@Gargron@mastodon.social` to `https://mastodon.social/users/Gargron` and we can now interact over ActivityPub by referring to this URI as `id` where appropriate.

{{< code title="Sample activity" >}}
```javascript
{
"id": "https://social.example/activities/1",
"type": "Create",
"actor": "https://social.example/actors/1",
"object": {
    "id": "https://social.example/objects/1",
    "type": "Note",
    "content": "Hello, Gargron!"
},
"to": "https://mastodon.social/users/Gargron"
}
```
{{< /code >}}

Note in the above example that `social.example` does not use the same URI structure as Mastodon. Thus, we cannot simply guess the actor `id` given only the username and domain. However, if `social.example` supports WebFinger, then we can get this `id`simply by requesting `https://social.example/.well-known/webfinger?resource=acct:username@social.example`and parsing the response for a link with the `application/activity+json` type.

