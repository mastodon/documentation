---
title: Bearcaps
description: A URI scheme combining URLs with a Bearer token needed to access them.
menu:
  docs:
    weight: 60
    parent: spec
---

## What are bearcaps? {#intro}

In certain cases, resources may not be publically available and may require a token to successfully fetch them. This is typically done by using an HTTP `Authorization` header containing a `Bearer` token, like so:

```http
GET https://example.com/foo
Authorization: Bearer <token>
```

Bearcaps allow for a way to link to a resource with the token included, like so:

```
bear:?t=<token>&u=https://example.com/foo'
```

To translate a bearcap to an HTTP request, make a request to the `u` parameter and attach the `t` parameter as a `Bearer` token in the `Authorization` header.

## How are bearcaps used in Mastodon? {#usage}

As of v3.3.0, Mastodon supports dereferencing bearcaps in a received Activity. Bearcaps are not used for sending any Activity yet.
