---
title: Authentication
description: How to authenticate with OAuth 2 on Mastodon
menu:
  docs:
    parent: api
    weight: 1
---

Mastodon is federated, therefore you can't be expected to manually register your application on all potential servers your users might want to login on. For this reason, there is an open app registration API, so obtaining OAuth 2 credentials for OAuth 2 authorization can be automated.

Make sure that you allow your users to specify the domain they want to connect to before login. Use that domain to acquire a client id/secret for OAuth 2 and then proceed with normal OAuth 2 also using that domain to build the URLs.

Mastodon supports the following OAuth 2 flows:

- **Authorization code flow**: For end-users
- **Password grant flow**: For bots and other single-user applications
- **Client credentials flow**: For applications that do not act on behalf of users
