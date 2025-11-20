---
title: WebFinger
description: Translate `user@domain` mentions to actor profile URIs.
menu:
  docs:
    weight: 20
    parent: spec
---

## What is WebFinger, and why is it used? {#intro}

On Mastodon, user profiles can be hosted either locally on the same website as yours, or remotely on a completely different website. The same username may be used on a different domain. Therefore, a Mastodon user's full mention consists of both the username and the domain, in the form `@username@domain`. In practical terms, `@user@example.com` is not the same as `@user@example.org`. If the domain is not included, Mastodon will try to find a local user named `@username`. However, in order to deliver to someone over ActivityPub, the `@username@domain` mention is not enough -- **mentions must be translated to an HTTPS URI first**, so that the remote actor's inbox and outbox can be found.

Enter WebFinger. WebFinger as described in [RFC 7033](https://tools.ietf.org/html/rfc7033) is a spec that defines **a method for resolving links to a resource**, given only a URI on a particular server. This allows anyone to look up where a resource is located without having to know its exact location beforehand; for example, by email or phone number. This lookup is directed at the endpoint `/.well-known/webfinger`, and a `resource` query parameter is passed along with the lookup. The resource URI used with Mastodon is the `acct:` URI as described in [RFC 7565](https://tools.ietf.org/html/rfc7565), with the username of a profile that is hosted on a particular domain.

{{< hint style="danger" >}}
**Because Mastodon heavily relies on mentions for addressing other profiles, WebFinger is required for fully interoperating with Mastodon.** Users can generally load profiles by searching for the direct HTTPS URI if they know it, or for the `username@domain` address, but Mastodon's internal logic depends almost completely on `acct`: URIs or `username@domain` representations. Searching for any objects or profiles from an ActivityPub implementation without WebFinger will fail because the author cannot be converted to a user in the local database.
{{< /hint >}}

## Sample WebFinger flow {#example}

Suppose we want to lookup the user `@Gargron` hosted on the `mastodon.social` website.

Just make a request to that domain's `/.well-known/webfinger` endpoint, with the `resource` query parameter set to an `acct:` URI.

{{< code title="https://mastodon.social/.well-known/webfinger?resource=acct:gargron@mastodon.social" >}}
```json
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
```json
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

Note in the above example that `social.example` does not use the same URI structure as Mastodon. Thus, we cannot guess the actor `id` given only the username and domain. However, if `social.example` supports WebFinger, then we can get this `id` by requesting `https://social.example/.well-known/webfinger?resource=acct:username@social.example`and parsing the response for a link with the `application/ld+json; profile="https://www.w3.org/ns/activitystreams"` or `application/activity+json` type. This link should also have the link relation `rel="self"`.

## Mastodon's requirements for WebFinger

When given an account in the form `username@domain` or `@username@domain`, Mastodon will do the following:

- Construct an `acct:` URI using that username and domain
- Make a WebFinger request for that `resource`

Using that WebFinger response, Mastodon will check the following:

- The `subject` is present
- The `links` array contains a link with `rel` of `self` and `type` of either `application/ld+json; profile="https://www.w3.org/ns/activitystreams"` or `application/activity+json`
  - The `href` for this link resolves to an ActivityPub actor

Using that ActivityPub actor representation (which may be provided directly, without the initial WebFinger request), Mastodon will do the following:

- Take `preferredUsername` and the hostname of the actor's server
- Construct an `acct:` URI using that username and domain
- Make a WebFinger request for that `resource`

If the `subject` matches the `resource`, then the process stops here. Otherwise, if the `subject` contains a different canonical account URI, then Mastodon will perform an additional WebFinger request for that canonical account URI in order to ensure that this new `resource` links to the same ActivityPub actor with the same criteria being checked.

In other words, the following cases are valid:

- Asking `example.com` for the resource `acct:alice@example.com` yields a link to an actor on the domain `example.com` with a `preferredUsername` of `alice`, and the `subject` matches the requested resource `acct:alice@example.com`
- Asking `example.com` for the resource `acct:alice@example.com` yields a link to an actor on the domain `ap.example.com` with a `preferredUsername` of `alice`
  - ...then, asking `ap.example.com` for the resource `acct:alice@ap.example.com` yields a `subject` of `acct:alice@example.com` and a link to the same actor

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/activitypub/fetch_remote_actor_service.rb" caption="app/services/activitypub/fetch_remote_actor_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/services/resolve_account_service.rb" caption="app/services/resolve_account_service.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/webfinger.rb" caption="app/lib/webfinger.rb" >}}