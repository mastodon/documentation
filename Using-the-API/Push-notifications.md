Push notifications
==================

Mastodon natively supports the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). You can utilize the same mechanisms for your native app. For a reference, see [Mozilla's web push server](https://github.com/mozilla-services/autopush), and more practically, see:

- [toot-relay](https://github.com/DagAgren/toot-relay)
- [PushToFCM](https://github.com/tateisu/PushToFCM)

The relevant parts of the Mastodon REST API are:

- `GET|POST|PUT /api/v1/push/subscription` ([Documentation](API.md#adding-push-subscription))
- You need to request authorization for the `push` scope from the user to be able to use that API
