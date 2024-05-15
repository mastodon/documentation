---
title: OAuth Scopes
description: Defining what you have permission to do with the API
menu:
  docs:
    weight: 20
    parent: api
---

## OAuth Scopes

The API is divided up into access scopes. The scopes are hierarchical, i.e. if you have access to `read`, you automatically have access to `read:accounts`. **It is recommended that you request as little as possible for your application.**

{{< hint style="info" >}}
If you just want to retrieve the basic details of the currently authenticated user, use the `read:me` scope, which can only access the [`GET /api/v1/accounts/verify_credentials`]({{< relref "methods/accounts#verify_credentials" >}}) endpoint.
{{</ hint >}}

### Discovering OAuth Scopes supported by a given Mastodon Server

As of Mastodon 4.3.0, we can make a request to `GET /.well-known/oauth-authorization-server` to discover the scopes supported by the Mastodon server (as well as other OAuth related information such as endpoints and grant flows).

It is recommended that you do this if you need to support multiple versions of Mastodon for your OAuth Application.

{{< page-relref ref="methods/oauth#authorization-server-metadata" caption="GET /.well-known/oauth-authorization-server" >}}

### Multiple scopes can be requested at the same time

During application creation with the `scopes` parameter you can specify multiple space-separated scopes, and during the authorization phase with the `scope` query parameter (space-separate the scopes).

{{< hint style="danger" >}}
The set of scopes saved during application creation must include all the scopes that you will request in the authorization request, otherwise, authorization will fail.
{{< /hint >}}

{{< hint style="info" >}}
Mind the `scope` vs `scopes` difference. This is because `scope` is a standard OAuth parameter name, so it is used in the OAuth methods. Mastodon’s own REST API uses the more appropriate `scopes`.
{{< /hint >}}

If you do not specify `scope` in your authorization request, or `scopes` in your application creation request, the resulting access token/app will be assigned the default scope. This is currently `read` as of Mastodon 4.3.0, but is subject to change in the future.

### Version history {#versions}

- 0.9.0 - read, write, follow
- 2.4.0 - push
- 2.4.3 - granular scopes added [#7929](https://github.com/mastodon/mastodon/pull/7929)
- 2.6.0 - `read:reports` deprecated (unused stub) [#8736/adcf23f](https://github.com/mastodon/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f)
- 2.6.0 - `write:conversations` added [#9009](https://github.com/mastodon/mastodon/pull/9009)
- 2.9.1 - Admin scopes added [#9387](https://github.com/mastodon/mastodon/pull/9387)
- 3.1.0 - Bookmark scopes added [#7107](https://github.com/mastodon/mastodon/pull/7107)
- 4.1.0 - Added admin scopes for blocks and allows [#20918](https://github.com/mastodon/mastodon/pull/20918)
- 4.3.0 - Added `read:me` scope for when you want just basic information about the currently authenticated account. [#29087](https://github.com/mastodon/mastodon/pull/29087)

## List of high-level scopes

We recommend that you use the [granular scopes](#granular) shown in the right column of the table below, instead of using the following scopes:

- `read`
- `write`
- `follow` (deprecated)
- `admin:read`
- `admin:write`

If you just want to retrieve the basic details of the currently authenticated user, use the `read:me` scope.

### `read:me` {#read-me}

Grants access only to the [`GET /api/v1/accounts/verify_credentials`]({{< relref "methods/accounts#verify_credentials" >}}) endpoint. Allowing you to retrieve information only about the currently authenticated account.

### `read` {#read}

Grants access to read data, including other users. Requesting `read` will also grant [granular scopes](#granular) shown in the right column of the table below.

### `write` {#write}

Grants access to write data. Requesting `write` will also grant [granular scopes](#granular) shown in the right column of the table below.

### `follow` {#follow}

{{< hint style="danger" >}}
**Deprecated**\
This scope has been deprecated in 3.5.0 and newer. You should instead request the [granular scopes](#granular) individually, or request `read`/`write` scopes as needed.
{{< /hint >}}

Grants access to manage relationships. Requesting `follow` will also grant [granular scopes](#granular) shown in the right column of the table below.

### `push` {#push}

Grants access to [Web Push API subscriptions.]({{< relref "methods/push" >}}) Added in Mastodon 2.4.0.

### `admin:read` and `admin:write` {#admin}

Used for administrative and moderation APIs. Added in Mastodon 2.9.1.

Requesting `admin:read` or `admin:write` will also grant [granular scopes](#granular) shown in the right column of the table below.

{{< hint style="info" >}}
Note that there is no singular `admin` scope available.
{{< /hint >}}

## Granular scopes {#granular}

It is recommended that you make use of granular scopes, unless you really need full access to everything by using a `scope` of `read write follow push`.

| Scope                 | Granular Scopes                      |
| :-------------------- | :----------------------------------- |
| `read`                |                                      |
|                       | `read:accounts`                      |
|                       | `read:blocks`                        |
|                       | `read:bookmarks`                     |
|                       | `read:favourites`                    |
|                       | `read:filters`                       |
|                       | `read:follows`                       |
|                       | `read:lists`                         |
|                       | `read:mutes`                         |
|                       | `read:notifications`                 |
|                       | `read:search`                        |
|                       | `read:statuses`                      |
|                       | `read:me`                            |
| `write`               |                                      |
|                       | `write:accounts`                     |
|                       | `write:blocks`                       |
|                       | `write:bookmarks`                    |
|                       | `write:conversations`                |
|                       | `write:favourites`                   |
|                       | `write:filters`                      |
|                       | `write:follows`                      |
|                       | `write:lists`                        |
|                       | `write:media`                        |
|                       | `write:mutes`                        |
|                       | `write:notifications`                |
|                       | `write:reports`                      |
|                       | `write:statuses`                     |
| `follow` (deprecated) |                                      |
|                       | `read:follows`                       |
|                       | `write:follows`                      |
|                       | `read:blocks`                        |
|                       | `write:blocks`                       |
|                       | `read:mutes`                         |
|                       | `write:mutes`                        |
| `push`                |                                      |
| `admin:read`          |                                      |
|                       | `admin:read:accounts`                |
|                       | `admin:read:reports`                 |
|                       | `admin:read:domain_allows`           |
|                       | `admin:read:domain_blocks`           |
|                       | `admin:read:ip_blocks`               |
|                       | `admin:read:email_domain_blocks`     |
|                       | `admin:read:canonical_email_blocks`  |
| `admin:write`         |                                      |
|                       | `admin:write:accounts`               |
|                       | `admin:write:reports`                |
|                       | `admin:write:domain_allows`          |
|                       | `admin:write:domain_blocks`          |
|                       | `admin:write:ip_blocks`              |
|                       | `admin:write:email_domain_blocks`    |
|                       | `admin:write:canonical_email_blocks` |
