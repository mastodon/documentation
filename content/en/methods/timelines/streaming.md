---
title: streaming
description: >-
  Subscribe to server-sent events for real-time updates via a long-lived HTTP
  connection or via WebSocket.
menu:
  docs:
    weight: 40
    parent: methods-timelines
---

Your application can use a [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) endpoint to receive updates in real-time. Server-sent events is an incredibly simple transport method that relies entirely on chunked-encoding transfer, i.e. the HTTP connection is kept open and receives new data periodically.

Alternatively, a WebSocket connection can also be established.

## Server-sent events \(HTTP\)

### Endpoints <a id="endpoints"></a>

#### GET /api/v1/streaming/health

Returns `OK` when streaming service is fine. Added in 2.5.0

#### GET /api/v1/streaming/user

Returns events that are relevant to the authorized user, i.e. home timeline and notifications

#### GET /api/v1/streaming/public

Returns all public statuses

#### GET /api/v1/streaming/public/local

Returns all local statuses

#### GET /api/v1/streaming/hashtag?tag=:hashtag

Returns all public statuses for a particular hashtag

#### GET /api/v1/streaming/hashtag/local?tag=:hashtag

Returns all local statuses for a particular hashtag

#### GET /api/v1/streaming/list?list=:list_id

Returns statuses for a list

#### GET /api/v1/streaming/direct

Returns all direct messages

### Stream contents <a id="stream-contents"></a>

The stream will contain events as well as heartbeat comments. Lines that begin with a colon \(`:`\) can be ignored by parsers, they are simply there to keep the connection open. Events have this structure:

```text
event: name
data: payload
```

## WebSocket <a id="websocket"></a>

For WebSockets, there is only one URL path \(`/api/v1/streaming`\). The access token as well as the endpoint you are interested in must be provided with query params, respectively `access_token` and `stream`. Query params `list` and `tag` are likewise supported for relevant endpoints.

Possible `stream` values:

* `user`
* `public`
* `public:local`
* `hashtag`
* `hashtag:local`
* `list`
* `direct`

WebSocket events have this structure:

```text
event: name
payload: payload
```

## Event types <a id="event-types"></a>

| Event | Description | What’s in the payload |
| :--- | :--- | :--- |
| `update` | A new status has appeared | [Status]({{< relref "../../entities/status.md" >}}) |
| `notification` | A new notification has appeared | [Notification]({{< relref "../../entities/notification.md" >}}) |
| `delete` | A status has been deleted | ID of the deleted status |
| `filters_changed` | Keyword filters have been changed |  |

The payload is a JSON-encoded string, not a JSON object itself.

{{< hint style="info" >}}

In case of `filters_changed` event, `payload` is not defined.
{{< /hint >}}


