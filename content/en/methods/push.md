---
title: push
description: >-
  Subscribe to and receive push notifications when a server-side notification is
  received, via the Web Push API
menu:
  docs:
    weight: 10
    parent: methods-notifications
aliases: [/methods/notifications/push/]
---

## About the Web Push API {#about}

Mastodon natively supports the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). You can utilize the same mechanisms for your native app. It requires running a proxy server that connects to Android’s and Apple’s proprietary notification gateways. However, the proxy server does not have access to the contents of the notifications. For a reference, see [Mozilla’s web push server](https://github.com/mozilla-services/autopush), or more practically, see:

* [toot-relay](https://github.com/DagAgren/toot-relay)
* [PushToFCM](https://github.com/tateisu/PushToFCM)
* [metatext-apns](https://github.com/metabolist/metatext-apns)

---

## Subscribe to push notifications {#create}

```http
POST https://mastodon.example/api/v1/push/subscription HTTP/1.1
```

Add a Web Push API subscription to receive notifications. Each access token can have one push subscription. If you create a new subscription, the old subscription is deleted.

**Returns:** [PushSubscription]({{< relref "entities/pushsubscription" >}})\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added\
3.4.0 - add `policy`

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

subscription[endpoint]
: {{<required>}} String. The endpoint URL that is called when a notification event occurs.

subscription[keys][p256dh]
: {{<required>}} String. User agent public key. Base64 encoded string of a public key from a ECDH keypair using the `prime256v1` curve.

subscription[keys][auth]
: {{<required>}} String. Auth secret. Base64 encoded string of 16 bytes of random data.

data[alerts][follow]
: Boolean. Receive follow notifications? Defaults to false.

data[alerts][favourite]
: Boolean. Receive favourite notifications? Defaults to false.

data[alerts][reblog]
: Boolean. Receive reblog notifications? Defaults to false.

data[alerts][mention]
: Boolean. Receive mention notifications? Defaults to false.

data[alerts][poll]
: Boolean. Receive poll notifications? Defaults to false.

policy
: String. Specify whether to receive push notifications from `all`, `followed`, `follower`, or `none` users.

#### Response
##### 200: OK

A new PushSubscription has been generated, which will send the requested alerts to your endpoint.

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

---

## Get current subscription {#get}

```http
GET https://mastodon.example/api/v1/push/subscription HTTP/1.1
```

View the PushSubscription currently associated with this access token.

**Returns:** [PushSubscription]({{< relref "entities/pushsubscription" >}})\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

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

##### 404: Not found

A PushSubscription does not exist for this token.

```javascript
{
  "error": "Record not found"
}
```

---

## Change types of notifications {#update}

```http
PUT https://mastodon.example/api/v1/push/subscription HTTP/1.1
```

Updates the current push subscription. Only the data part can be updated. To change fundamentals, a new subscription must be created instead.

**Returns:** [PushSubscription]({{< relref "entities/pushsubscription" >}})\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added
3.4.0 - add `policy`

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

data[alerts][follow]
: Boolean. Receive follow notifications? Defaults to false.

data[alerts][favourite]
: Boolean. Receive favourite notifications? Defaults to false.

data[alerts][reblog]
: Boolean. Receive reblog notifications? Defaults to false.

data[alerts][mention]
: Boolean. Receive mention notifications? Defaults to false.

data[alerts][poll]
: Boolean. Receive poll notifications? Defaults to false.

policy
: String. Specify whether to receive push notifications from `all`, `followed`, `follower`, or `none` users.

#### Response
##### 200: OK

Updating a PushSubscription to only receive mention alerts

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

##### 404: Not found

No existing PushSubscription for this token

```javascript
{
  "error": "Record not found"
}
```

---

## Remove current subscription {#delete}

```http
DELETE https://mastodon.example/api/v1/push/subscription HTTP/1.1
```

Removes the current Web Push API subscription.

**Returns:** none\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added

#### Request

##### Path parameters

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

PushSubscription successfully deleted or did not exist previously

```javascript
{}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/push/subscriptions_controller.rb" caption="app/controllers/api/v1/push/subscriptions_controller.rb" >}}