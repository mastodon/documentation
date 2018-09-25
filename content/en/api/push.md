---
title: Web Push API
overview: How to use the Web Push API in Mastodon to receive push notifications in a native or browser app
menu:
  docs:
    parent: api
    weight: 5
---

Mastodon natively supports the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). You can utilize the same mechanisms for your native app. It requires running a proxy server that connects to Android's and Apple's proprietary notification gateways. However, the proxy server does not have access to the contents of the notifications. For a reference, see [Mozilla's web push server](https://github.com/mozilla-services/autopush), or more practically, see:

- [toot-relay](https://github.com/DagAgren/toot-relay)
- [PushToFCM](https://github.com/tateisu/PushToFCM)

Using the Web Push API requires your app to have the `push` scope.
