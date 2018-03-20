Push notifications
==================

Mastodon natively supports the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). You can utilize the same mechanisms for your native app. See also: [Mozilla's web push server](https://github.com/mozilla-services/autopush).

The other option involves using the Mastodon streaming API on behalf of the app's users, as a sort of proxy. See <https://github.com/Gargron/tusky-api> for an example.
