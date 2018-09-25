---
title: Permissions
description: Overview of OAuth 2 access scopes in Mastodon
menu:
  docs:
    parent: api
    weight: 2
---

The API is divided up into access scopes:

|Scope|Parent(s)|Added in|
|:----|---------|:------:|
|`write`||0.9.0|
|`write:accounts`|`write`|2.4.3|
|`write:blocks`|`write`, `follow`|2.4.3|
|`write:favourites`|`write`|2.4.3|
|`write:filters`|`write`|2.4.3|
|`write:follows`|`write`, `follow`|2.4.3|
|`write:lists`|`write`|2.4.3|
|`write:media`|`write`|2.4.3|
|`write:mutes`|`write`, `follow`|2.4.3|
|`write:notifications`|`write`|2.4.3|
|`write:reports`|`write`|2.4.3|
|`write:statuses`|`write`|2.4.3|
|`read`||0.9.0|
|`read:accounts`|`read`|2.4.3|
|`read:blocks`|`read`, `follow`|2.4.3|
|`read:favourites`|`read`|2.4.3|
|`read:filters`|`read`|2.4.3|
|`read:follows`|`read`, `follow`|2.4.3|
|`read:lists`|`read`|2.4.3|
|`read:mutes`|`read`, `follow`|2.4.3|
|`read:notifications`|`read`|2.4.3|
|`read:reports`|`read`|2.4.3|
|`read:search`|`read`|2.4.3|
|`read:statuses`|`read`|2.4.3|
|`follow`||0.9.0|
|`push`||2.4.0|

The scopes are hierarchical, i.e. if you have access to `read`, you automatically have access to `read:accounts`. **It is recommended that you request as little as possible for your application.**

Multiple scopes can be requested at the same time: During app creation with the `scopes` param, and during the authorization phase with the `scope` query param (space-separate the scopes).

> **Note:** Mind the `scope` vs `scopes` difference. This is because `scope` is a standard OAuth parameter name, so it is used in the OAuth methods. Mastodon's own REST API uses the more appropriate `scopes`.

If you do not specify a `scope` in your authorization request, or a `scopes` in your app creation request, the resulting access token / app will default to `read` access.

The set of scopes saved during app creation must include all the scopes that you will request in the authorization request, otherwise authorization will fail.
