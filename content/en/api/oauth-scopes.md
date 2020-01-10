---
title: OAuth Scopes
description: Defining what you have permission to do with the API
menu:
  docs:
    weight: 10
    parent: api
---

## OAuth Scopes

The API is divided up into access scopes. The scopes are hierarchical, i.e. if you have access to `read`, you automatically have access to `read:accounts`. **It is recommended that you request as little as possible for your application.**

Multiple scopes can be requested at the same time: During app creation with the `scopes` param, and during the authorization phase with the `scope` query param \(space-separate the scopes\).

{{< hint style="info" >}}
Mind the `scope` vs `scopes` difference. This is because `scope` is a standard OAuth parameter name, so it is used in the OAuth methods. Mastodon’s own REST API uses the more appropriate `scopes`.
{{< /hint >}}

If you do not specify a `scope` in your authorization request, or a `scopes` in your app creation request, the resulting access token / app will default to `read` access.

The set of scopes saved during app creation must include all the scopes that you will request in the authorization request, otherwise authorization will fail.

### Version history <a id="versions"></a>

- 0.9.0 - read, write, follow
- 2.4.0 - push
- 2.4.3 - granular scopes [https://github.com/tootsuite/mastodon/pull/7929](https://github.com/tootsuite/mastodon/pull/7929)
- 2.6.0 - read:reports deprecated \(unused stub\) [https://github.com/tootsuite/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f](https://github.com/tootsuite/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f)
- 2.6.0 - write:conversations added [https://github.com/tootsuite/mastodon/pull/9009](https://github.com/tootsuite/mastodon/pull/9009)
- 2.9.1 - Admin scopes added [https://github.com/tootsuite/mastodon/pull/9387](https://github.com/tootsuite/mastodon/pull/9387)
- 3.1.0 - Bookmark scopes added

## List of scopes

### `read` <a id="read"></a>

Grants access to read data. Requesting `read` will also grant child scopes shown in the left column of the table below.

### `write` <a id="write"></a>

Grants access to write data. Requesting `write` will also grant child scopes shown in the right column of the table below.

### `follow` <a id="follow"></a>

Grants access to manage relationships. Requesting `follow` will also grant the following child scopes, shown in bold in the table:

* `read:blocks`, `write:blocks`
* `read:follows`, `write:follows`
* `read:mutes`, `write:mutes`

### `push` <a id="push"></a>

Grants access to [Web Push API subscriptions.]({{< relref "../methods/notifications/push.md" >}}) Added in Mastodon 2.4.0.

### Admin scopes <a id="admin"></a>

Used for moderation API. Added in Mastodon 2.9.1. The following granular scopes are available \(note that there is no singular `admin` scope\):

* `admin:read`
  * `admin:read:accounts`
  * `admin:read:reports`
* `admin:write`
  * `admin:write:accounts`
  * `admin:write:reports`

## Granular scopes <a id="granular"></a>

| read | write |
| :--- | :--- |
| read:accounts | write:accounts |
| **read:blocks** | **write:blocks** |
| read:bookmarks | write:bookmarks |
|  | write:conversations |
| read:favourites | write:favourites |
| read:filters | write:filters |
| **read:follows** | **write:follows** |
| read:lists | write:lists |
|  | write:media |
| **read:mutes** | **write:mutes** |
| read:notifications | write:notifications |
|  | write:reports |
| read:search |  |
| read:statuses | write:statuses |

| admin:read | admin:write |
| :--- | :--- |
| admin:read:accounts | admin:write:accounts |
| admin:read:reports | admin:write:reports |

