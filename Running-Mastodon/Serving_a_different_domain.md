Using a different domain name for Mastodon and the users it serves
==================================================================

Mastodon users are primarily identified by a `user@example.org` handle, and you might want
this identifier to be the same as your email or jabber account, for instance.
However, in this case, you are almost certainly serving some web content on https://example.org already,
and you might want to use another domain (say `social.example.org`) for Mastodon itself.

Luckily, there is support in Mastodon for that, but it might be tricky to set up, and any error
might *prevent you from federating with other instances*.

This guide attempts to explain the different mechanisms involved in such a setup, walk you through the configuration,
and warn you about possible federation issues. It also assumes you have already read the [Production guide](Production-guide.md).

## Account identifiers

It is important to understand that for federation purposes, a user in Mastodon has two unique identifiers associated:
- A webfinger `acct:` URI, used for discovery and as a verifiable global name for the user across Mastodon instances.
  In our example, our account's `acct:` URI is `acct:user@example.org`
- An author/actor URI, used in every other aspect of federation. This is the way in which users are identified in
  OStatus, the underlying protocol used for federation with other Mastodon instances.
  In our case, it is `https://social.example.org/users/user`.
  It is not strictly required to be an URL, but they are in Mastodon's case to ease discovery of unknown remote accounts.

Both account identifiers are unique and required for Mastodon.
*An important risk if you set up your Mastodon instance incorrectly is to create two users (with different `acct:` URIs) with conflicting author/actor URIs*.

## Webfinger

As said earlier, each Mastodon user has an `acct:` URI, which is used for discovery and authentication.
When you add `@user@example.org`, a webfinger query is performed. This is done in two steps:
1. Querying `https://example.org/.well-known/host-meta` (where the domain of the URL matches the domain part of the `acct:` URI)
   to get information on how to perform the query.
   This file will indeed contain a URL template of the form `https://somedomain.org/.well-known/webfinger?resource={uri}` that
   will be used in the second step.
2. Fill the returned template with the `acct:` URI to be queried and perform the query:
   `https://somedomain.org/.well-known/webfinger?resource=acct:user@example.org`

## Configuring your Mastodon instance

*DO NOT ATTEMPT TO CONFIGURE YOUR INSTANCE THIS WAY IF YOU DID NOT UNDERSTAND THE ABOVE*

Also, make sure to check the known issues below.

### Configuring Mastodon itself

Mastodon has a two configuration variables in `.env.production` to enable using different domains for your users and Mastodon itself.
Those two variables are `LOCAL_DOMAIN` and `WEB_DOMAIN`. When the latter is not set, it defaults to the value of
`LOCAL_DOMAIN`.

*Be extra careful when configuring your Mastodon instance, as changing `LOCAL_DOMAIN` without changing `WEB_DOMAIN`
may cause remote instances to register different accounts with the same author/actor URI, which will result in federation issues!*

- `LOCAL_DOMAIN` is the domain for which your Mastodon instance has authority, it is the domain used in the `acct:` URI.
  In our example, `LOCAL_DOMAIN` would be set to `example.org`.
- `WEB_DOMAIN` is the domain used for any URL generated for your instance, including the author/actor URIs.
  In our case, that would be `social.example.org`.

### Configuring domain.org

Now, you have Mastodon running at `https://social.example.org` as well as a website at `https://example.org`.
If you recall how webfinger queries work, the first step is to query `https://example.org/.well-known/host-meta`,
which will contain an URL template.

Therefore, the easiest way to configure domain.org is to redirect `/.well-known/host-meta` to social.example.org.

With nginx, it would be as simple as adding:

```nginx
location = /.well-known/host-meta {
       return 301 https://social.example.org$request_uri;
}
location /api/ {
		rewrite ^(.*) https://social.example.com$request_uri permanent;
}
location  /about/ {
		rewrite ^(.*) https://social.example.com$request_uri permanent;
}

```

in example.org's server block.

## Known issues

There are a few known issues with Mastodon:

- Current mastodon instances won't correctly process inbound salmon requests from instances where `WEB_DOMAIN`!= `LOCAL_DOMAIN`,
  and will try resolving `acct:user@WEB_DOMAIN` instead of `acct:user@LOCAL_DOMAIN`.
  Fortunately, since v1.3.0, Mastodon will reply to `acct:user@WEB_DOMAIN` queries with the account informations for `acct:user@LOCAL_DOMAIN`, effectively working around this issue at the cost of an extra webfinger discovery per interaction.
- Mastodon does not actually use `WEB_DOMAIN` everywhere it should and will instead use whatever host it was accessed with.
  For this reason, your Mastodon instance should only be reachable on `WEB_DOMAIN` and not `LOCAL_DOMAIN` (HTTP redirects are fine, but avoid proxying from `LOCAL_DOMAIN` to `WEB_DOMAIN`)
- Remote Mastodon instances on v1.3.0, v1.3.1 or v1.3.2 from which you are following people won't PuSH new messages to your instance. This is a known bug, see [#2672](https://github.com/tootsuite/mastodon/issues/2672)
