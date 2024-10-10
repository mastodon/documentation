---
title: OAuth Scopes
description: Defining what you have permission to do with the API
menu:
  docs:
    weight: 20
    parent: api
---

## OAuth Scopes

The API access is divided up into several OAuth scopes, these limit what an API client can do, based on the registered and requested scopes for the [Access Token]({{< relref "api/oauth-tokens" >}}). The scopes in Mastodon are hierarchical, for example, if you request the `read` scope, you automatically have access to `read:accounts`, however **we recommend that you request the most limited scopes as possible for your application**, i.e., if you only need read access to lists and the current user profile, then you should use `profile read:lists` as your scopes instead of `read`.

{{< hint style="info" >}}
To just retrieve the details of the currently authenticated user, use the `profile` scope, which can only access the [`GET /api/v1/accounts/verify_credentials`]({{< relref "methods/accounts#verify_credentials" >}}) endpoint.\
This scope was added in Mastodon 4.3, so we recommend using the "Discovering OAuth Scopes supported by a given Mastodon Server" guidance below when using this scope.
{{</ hint >}}

### Discovering OAuth Scopes supported by a given Mastodon Server

As of Mastodon 4.3.0, support for [RFC 8414](https://tools.ietf.org/html/rfc8414)'s `GET /.well-known/oauth-authorization-server` endpoint was added, allowing you to discover the scopes supported by the Mastodon server (as well as other OAuth related information such as the endpoints and grant flows).

We recommended using this endpoint in order to support multiple versions of Mastodon for your OAuth Application.

If you make a request to the `GET /.well-known/oauth-authorization-server` endpoint, and it returns a 404, then you can assume that the Mastodon server is running a version older than 4.3, in which case you'll need to look at the specific scopes your application needs and what the lowest common scopes are for the version range of Mastodon that you wish to support.

{{< hint style="info" >}}
**Example:** You want to use the `profile` scope, but also want to support older Mastodon servers that don't have that scope and would need `read:accounts` instead. You could discover whether a server supports that scope by making a request this endpoint.
{{< /hint >}}

{{< page-relref ref="methods/oauth#authorization-server-metadata" caption="GET /.well-known/oauth-authorization-server" >}}

### Multiple scopes can be requested at the same time

During application creation you can specify multiple space-separated scopes with the `scopes` parameter. During the authorization phase you can do the same with the `scope` query parameter.

{{< hint style="danger" >}}
The set of scopes saved during application creation must include all the scopes that you will request in the authorization request, otherwise, authorization will fail.
{{< /hint >}}

{{< hint style="info" >}}
Mind the `scope` vs `scopes` difference. This is because `scope` is a standard OAuth parameter name, so it is used in the OAuth methods. Mastodon’s own REST API uses the more appropriate `scopes` name instead.
{{< /hint >}}

If you do not specify `scope` in your authorization request, or `scopes` in your application creation request, the resulting access token/app will be assigned the default scope. This is currently `read` as of Mastodon 4.3, but is subject to change in the future.

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

### Version history {#versions}

- 0.9.0 - Added read, write, follow scopes
- 2.4.0 - Added push scope for push notifications
- 2.4.3 - Added granular scopes [#7929](https://github.com/mastodon/mastodon/pull/7929)
- 2.6.0 - Deprecated `read:reports` (unused stub) [#8736/adcf23f](https://github.com/mastodon/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f)
- 2.6.0 - Added `write:conversations` [#9009](https://github.com/mastodon/mastodon/pull/9009)
- 2.9.1 - Added administrative and moderation scopes [#9387](https://github.com/mastodon/mastodon/pull/9387)
- 3.1.0 - Added bookmark scopes [#7107](https://github.com/mastodon/mastodon/pull/7107)
- 3.5.0 - Deprecated `follow` scope in favour of granular scopes [#17678](https://github.com/mastodon/mastodon/pull/17678)
- 4.1.0 - Added admin scopes for blocks and allows [#20918](https://github.com/mastodon/mastodon/pull/20918)
- 4.3.0 - Added `profile` scope to obtain only information about the currently authenticated user [#29087](https://github.com/mastodon/mastodon/pull/29087), [#30357](https://github.com/mastodon/mastodon/pull/30357)

## List of high-level scopes

We recommend that you use the [granular scopes](#granular-scopes) shown in the right column of the table below, instead of using the following scopes:

- `read`
- `write`
- `follow` {{%deprecated%}}
- `admin:read`
- `admin:write`

When only the information about the currently authenticated user is required, use the `profile` scope.

### `profile` {#profile}

Grants access only to the [`GET /api/v1/accounts/verify_credentials`]({{< relref "methods/accounts#verify_credentials" >}}) endpoint. Allowing you to retrieve information about only the currently authenticated user.

### `read` {#read}

Grants access to read data, including other users. Requesting `read` will also grant [granular scopes](#granular-scopes) shown in the right column of the table below.

### `write` {#write}

Grants access to write data. Requesting `write` will also grant [granular scopes](#granular-scopes) shown in the right column of the table below.

### `push` {#push}

Grants access to [Web Push API subscriptions.]({{< relref "methods/push" >}}) Added in Mastodon 2.4.0.

### `follow` {#follow}

{{< hint style="danger" >}}
**Deprecated**\
This scope has been deprecated in 3.5.0 and newer. You should instead request the [granular scopes](#granular-scopes) individually, or request `read`/`write` scopes as needed.
{{< /hint >}}

Grants access to manage relationships. Requesting `follow` will also grant [granular scopes](#granular-scopes) shown in the right column of the table below.

### `admin:read` and `admin:write` {#admin}

Used for administrative and moderation APIs. Added in Mastodon 2.9.1.

Requesting `admin:read` or `admin:write` will also grant [granular scopes](#granular-scopes) shown in the right column of the table below.

{{< hint style="info" >}}
Note that there is no singular `admin` scope available.
{{< /hint >}}

## Granular scopes {#granular}

It is recommended that you make use of granular scopes, unless you really need full access to everything by using a `scope` of `read write follow push`.

| Scope                     | Granular Scopes                      |
| :------------------------ | :----------------------------------- |
| `profile`                 |                                      |
| `push`                    |                                      |
| `read`                    |                                      |
|                           | `read:accounts`                      |
|                           | `read:blocks`                        |
|                           | `read:bookmarks`                     |
|                           | `read:favourites`                    |
|                           | `read:filters`                       |
|                           | `read:follows`                       |
|                           | `read:lists`                         |
|                           | `read:mutes`                         |
|                           | `read:notifications`                 |
|                           | `read:search`                        |
|                           | `read:statuses`                      |
| `write`                   |                                      |
|                           | `write:accounts`                     |
|                           | `write:blocks`                       |
|                           | `write:bookmarks`                    |
|                           | `write:conversations`                |
|                           | `write:favourites`                   |
|                           | `write:filters`                      |
|                           | `write:follows`                      |
|                           | `write:lists`                        |
|                           | `write:media`                        |
|                           | `write:mutes`                        |
|                           | `write:notifications`                |
|                           | `write:reports`                      |
|                           | `write:statuses`                     |
| `follow` {{%deprecated%}} |                                      |
|                           | `read:follows`                       |
|                           | `write:follows`                      |
|                           | `read:blocks`                        |
|                           | `write:blocks`                       |
|                           | `read:mutes`                         |
|                           | `write:mutes`                        |
| `admin:read`              |                                      |
|                           | `admin:read:accounts`                |
|                           | `admin:read:reports`                 |
|                           | `admin:read:domain_allows`           |
|                           | `admin:read:domain_blocks`           |
|                           | `admin:read:ip_blocks`               |
|                           | `admin:read:email_domain_blocks`     |
|                           | `admin:read:canonical_email_blocks`  |
| `admin:write`             |                                      |
|                           | `admin:write:accounts`               |
|                           | `admin:write:reports`                |
|                           | `admin:write:domain_allows`          |
|                           | `admin:write:domain_blocks`          |
|                           | `admin:write:ip_blocks`              |
|                           | `admin:write:email_domain_blocks`    |
|                           | `admin:write:canonical_email_blocks` |

## Removed scopes {#removed}

* Mastodon versions from 3.2.0 to 4.3.0 did support a `crypto` scope for end-to-end encryption APIs, however, this functionality was never documented nor fully implemented, and has been removed as of version 4.3.0. Any applications registered with that scope will have the scope removed when the server is upgraded to 4.3.0 and above.