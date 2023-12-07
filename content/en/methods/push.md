---
title: push API methods
description: >-
  Subscribe to and receive push notifications when a server-side notification is
  received, via the Web Push API
menu:
  docs:
    weight: 10
    name: push
    parent: methods-notifications
    identifier: methods-push
aliases: [
  "/methods/push",
  "/api/methods/push",
  "/methods/notifications/push",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## About the Web Push API {#about}

Mastodon natively supports the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). You can utilize the same mechanisms for your native app. Mastodon doesn't connect to Android’s and Apple’s proprietary notification gateways directly, so if you wish to use those you can use a proxy server that translates between the WebPush standard and those gateways. This can be implemented in such a way that the proxy server does not have access to the contents of the notifications. For an example, see [Mozilla’s reference web push server](https://github.com/mozilla-services/autopush), or one of the several relays developed by the Mastodon community specifically for this purpose:

* [toot-relay](https://github.com/DagAgren/toot-relay)
* [PushToFCM](https://github.com/tateisu/PushToFCM)
* [metatext-apns](https://github.com/metabolist/metatext-apns)

---

## Subscribe to push notifications {#create}

```http
POST /api/v1/push/subscription HTTP/1.1
```

Add a Web Push API subscription to receive notifications. Each access token can have one push subscription. If you create a new subscription, the old subscription is deleted.

**Returns:** [WebPushSubscription]({{< relref "entities/WebPushSubscription" >}})\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added\
3.3.0 - added `data[alerts][status]`\
3.4.0 - added `data[policy]`\
3.5.0 - added `data[alerts][update]` and `data[alerts][admin.sign_up]`\
4.0.0 - added `data[alerts][admin.report]`

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

data[alerts][mention]
: Boolean. Receive mention notifications? Defaults to false.

data[alerts][status]
: Boolean. Receive new subscribed account notifications? Defaults to false.

data[alerts][reblog]
: Boolean. Receive reblog notifications? Defaults to false.

data[alerts][follow]
: Boolean. Receive follow notifications? Defaults to false.

data[alerts][follow_request]
: Boolean. Receive follow request notifications? Defaults to false.

data[alerts][favourite]
: Boolean. Receive favourite notifications? Defaults to false.

data[alerts][poll]
: Boolean. Receive poll notifications? Defaults to false.

data[alerts][update]
: Boolean. Receive status edited notifications? Defaults to false.

data[alerts][admin.sign_up]
: Boolean. Receive new user signup notifications? Defaults to false. Must have a role with the appropriate permissions.

data[alerts][admin.report]
: Boolean. Receive new report notifications? Defaults to false. Must have a role with the appropriate permissions.

data[policy]
: String. Specify whether to receive push notifications from `all`, `followed`, `follower`, or `none` users.

#### Response
##### 200: OK

A new PushSubscription has been generated, which will send the requested alerts to your endpoint.

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Get current subscription {#get}

```http
GET /api/v1/push/subscription HTTP/1.1
```

View the PushSubscription currently associated with this access token.

**Returns:** [WebPushSubscription]({{< relref "entities/WebPushSubscription" >}})\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

A PushSubscription does not exist for this token.

```json
{
  "error": "Record not found"
}
```

---

## Change types of notifications {#update}

```http
PUT /api/v1/push/subscription HTTP/1.1
```

Updates the current push subscription. Only the data part can be updated. To change fundamentals, a new subscription must be created instead.

**Returns:** [WebPushSubscription]({{< relref "entities/WebPushSubscription" >}})\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added\
3.3.0 - added `data[alerts][status]`\
3.4.0 - added `policy`\
3.5.0 - added `data[alerts][update]` and `data[alerts][admin.sign_up]`\
4.0.0 - added `data[alerts][admin.report]`

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

data[alerts][mention]
: Boolean. Receive mention notifications? Defaults to false.

data[alerts][status]
: Boolean. Receive new subscribed account notifications? Defaults to false.

data[alerts][reblog]
: Boolean. Receive reblog notifications? Defaults to false.

data[alerts][follow]
: Boolean. Receive follow notifications? Defaults to false.

data[alerts][follow_request]
: Boolean. Receive follow request notifications? Defaults to false.

data[alerts][favourite]
: Boolean. Receive favourite notifications? Defaults to false.

data[alerts][poll]
: Boolean. Receive poll notifications? Defaults to false.

data[alerts][update]
: Boolean. Receive status edited notifications? Defaults to false.

data[alerts][admin.sign_up]
: Boolean. Receive new user signup notifications? Defaults to false. Must have a role with the appropriate permissions.

data[alerts][admin.report]
: Boolean. Receive new report notifications? Defaults to false. Must have a role with the appropriate permissions.

policy
: String. Specify whether to receive push notifications from `all`, `followed`, `follower`, or `none` users.

#### Response
##### 200: OK

Updating a PushSubscription to only receive mention alerts

```json
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

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

No existing PushSubscription for this token

```json
{
  "error": "Record not found"
}
```

---

## Remove current subscription {#delete}

```http
DELETE /api/v1/push/subscription HTTP/1.1
```

Removes the current Web Push API subscription.

**Returns:** Empty\
**OAuth:** User token + `push`\
**Version history:**\
2.4.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response

##### 200: OK

PushSubscription successfully deleted or did not exist previously

```json
{}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/push/subscriptions_controller.rb" caption="app/controllers/api/v1/push/subscriptions_controller.rb" >}}
