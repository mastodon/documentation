---
title: push
description: >-
  Subscribe to and receive push notifications when a server-side notification is
  received, via the Web Push API
menu:
  docs:
    weight: 10
    parent: methods-notifications
---

## Web Push API

Mastodon natively supports the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). You can utilize the same mechanisms for your native app. It requires running a proxy server that connects to Android’s and Apple’s proprietary notification gateways. However, the proxy server does not have access to the contents of the notifications. For a reference, see [Mozilla’s web push server](https://github.com/mozilla-services/autopush), or more practically, see:

* [toot-relay](https://github.com/DagAgren/toot-relay)
* [PushToFCM](https://github.com/tateisu/PushToFCM)

{{< api-method method="post" host="https://mastodon.example" path="/api/v1/push/subscription" title="Subscribe to push notifications" >}}
{{< api-method-description >}}

Add a Web Push API subscription to receive notifications. Each access token can have one push subscription. If you create a new subscription, the old subscription is deleted.

**Returns:** PushSubscription\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="subscription\[endpoint\]" type="string" required=true >}}
Endpoint URL that is called when a notification event occurs.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="subscription\[keys\]\[p256dh\]" type="string" required=true >}}
User agent public key. Base64 encoded string of public key of ECDH key using `prime256v1` curve.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="subscription\[keys\]\[auth\]" type="string" required=true >}}
Auth secret. Base64 encoded string of 16 bytes of random data.
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[follow\]" type="boolean" required=false >}}
Receive follow notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[favourite\]" type="boolean" required=false >}}
Receive favourite notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[reblog\]" type="boolean" required=false >}}
Receive reblog notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[mention\]" type="boolean" required=false >}}
Receive mention notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[poll\]" type="boolean" required=false >}}
Receive poll notifications?
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

A new PushSubscription has been generated, which will send the requested alerts to your endpoint.
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": 328183,
  "endpoint": "https://yourdomain.example/listener",
  "alerts": {
    "follow": true,
    "favourite": true,
    "reblog": true,
    "mention": true,
    "poll": true
  },
  "server_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/push/subscription" title="Get current subscription" >}}
{{< api-method-description >}}

View the PushSubscription currently associated with this access token.

**Returns:** PushSubscription\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": 328183,
  "endpoint": "https://yourdomain.example/listener",
  "alerts": {
    "follow": true,
    "favourite": true,
    "reblog": true,
    "mention": true,
    "poll": true
  },
  "server_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

A PushSubscription does not exist for this token.
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="put" host="https://mastodon.example" path="/api/v1/push/subscription" title="Change types of notifications" >}}
{{< api-method-description >}}

Updates the current push subscription. Only the data part can be updated. To change fundamentals, a new subscription must be created instead.

**Returns:** PushSubscription\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="data\[alerts\]\[follow\]" type="boolean" required=false >}}
Receive follow notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[favourite\]" type="boolean" required=false >}}
Receive favourite notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[reblog\]" type="boolean" required=false >}}
Receive reblog notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[mention\]" type="boolean" required=false >}}
Receive mention notifications?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="data\[alerts\]\[poll\]" type="boolean" required=false >}}
Receive poll notifications?
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Updating a PushSubscription to only receive mention alerts
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": 328183,
  "endpoint": "https://yourdomain.example/listener",
  "alerts": {
    "follow": false,
    "favourite": false,
    "reblog": false,
    "mention": true,
    "poll": false
  },
  "server_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

No existing PushSubscription for this token
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/push/subscription" title="Remove current subscription" >}}
{{< api-method-description >}}

Removes the current Web Push API subscription.

**Returns:** none\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

PushSubscription successfully deleted or did not exist previously
{{< endapi-method-response-example-description >}}


```javascript
{}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


